import { NextResponse } from "next/server";
import { stocks } from "../../../data/market";

const cache = globalThis.__weekendQuoteCache || new Map();
globalThis.__weekendQuoteCache = cache;

const CACHE_TTL = 45 * 1000;

function normalizeSymbol(symbol) {
  return String(symbol || "").trim().toUpperCase();
}

function resolveFinnhubSymbol(symbol) {
  const normalized = normalizeSymbol(symbol);
  const stock = stocks.find(
    (item) =>
      normalizeSymbol(item.ticker) === normalized ||
      normalizeSymbol(item.finnhubSymbol) === normalized
  );

  return {
    ticker: stock?.ticker || normalized,
    finnhubSymbol: stock?.finnhubSymbol || normalized
  };
}

function toClientQuote(symbol, quote) {
  return {
    ok: true,
    symbol,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changePercent,
    source: "finnhub"
  };
}

function classifyFinnhubError(status, body) {
  const normalizedBody = String(body || "").toLowerCase();

  if (status === 401 || status === 403 || normalizedBody.includes("invalid api key")) {
    return "invalid_api_key";
  }

  if (status === 429 || normalizedBody.includes("rate limit")) {
    return "rate_limited";
  }

  if (status === 404 || (normalizedBody.includes("symbol") && normalizedBody.includes("not"))) {
    return "symbol_not_found";
  }

  return "finnhub_http_error";
}

async function fetchFinnhubQuote(symbol) {
  const apiKey = process.env.FINNHUB_API_KEY;
  const normalized = normalizeSymbol(symbol);

  if (!normalized) {
    return { ok: false, reason: "missing_symbol" };
  }

  if (!apiKey) {
    return { ok: false, reason: "missing_api_key" };
  }

  const { ticker, finnhubSymbol } = resolveFinnhubSymbol(normalized);
  const cacheKey = normalizeSymbol(finnhubSymbol);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return toClientQuote(ticker, cached.quote);
  }

  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(finnhubSymbol)}&token=${apiKey}`;
    const response = await fetch(url, { next: { revalidate: 45 } });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("Finnhub quote HTTP status:", response.status);
      console.error("Finnhub quote HTTP body:", body);

      return { ok: false, reason: classifyFinnhubError(response.status, body) };
    }

    const data = await response.json();
    if (!data || typeof data.c !== "number" || data.c <= 0) {
      console.error("Finnhub quote HTTP status:", response.status);
      console.error("Finnhub quote HTTP body:", JSON.stringify(data));

      return { ok: false, reason: "symbol_not_found" };
    }

    const quote = {
      price: data.c,
      change: data.d || 0,
      changePercent: data.dp || 0,
      previousClose: data.pc || null,
      source: "finnhub",
      fetchedAt: Date.now()
    };

    cache.set(cacheKey, { quote, fetchedAt: Date.now() });

    return toClientQuote(ticker, quote);
  } catch (error) {
    console.error("Finnhub quote network error:", error?.message || error);
    return { ok: false, reason: "network_error" };
  }
}

export async function GET(request) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const result = await fetchFinnhubQuote(symbol);

  return NextResponse.json(result);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({ tickers: [] }));
  const requestedTickers = Array.isArray(body.tickers)
    ? [...new Set(body.tickers.map((ticker) => normalizeSymbol(ticker)).filter(Boolean))]
    : [];

  if (!requestedTickers.length) {
    return NextResponse.json({ ok: false, reason: "missing_symbol", quotes: {} });
  }

  const results = await Promise.all(requestedTickers.map((ticker) => fetchFinnhubQuote(ticker)));
  const quotes = {};

  results.forEach((result, index) => {
    if (!result.ok) return;
    quotes[requestedTickers[index]] = {
      price: result.price,
      change: result.change,
      changePercent: result.changePercent,
      source: result.source
    };
  });

  return NextResponse.json({
    ok: Object.keys(quotes).length > 0,
    reason: Object.keys(quotes).length > 0 ? undefined : "quote_unavailable",
    quotes
  });
}
