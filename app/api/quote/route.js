import { NextResponse } from "next/server";
import { stocks } from "../../../data/market";

const cache = globalThis.__weekendQuoteCache || new Map();
globalThis.__weekendQuoteCache = cache;

const CACHE_TTL = 45 * 1000;

export async function POST(request) {
  const apiKey = process.env.FINNHUB_API_KEY;
  const { tickers = [] } = await request.json().catch(() => ({ tickers: [] }));
  const requestedTickers = Array.isArray(tickers) ? [...new Set(tickers.map((ticker) => String(ticker).toUpperCase()))] : [];

  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "missing_api_key", quotes: {} });
  }

  const quotes = {};

  await Promise.all(requestedTickers.map(async (ticker) => {
    const stock = stocks.find((item) => item.ticker.toUpperCase() === ticker);
    if (!stock?.finnhubSymbol) return;

    const cached = cache.get(ticker);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      quotes[ticker] = cached.quote;
      return;
    }

    try {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(stock.finnhubSymbol)}&token=${apiKey}`, {
        next: { revalidate: 45 }
      });
      if (!response.ok) return;
      const data = await response.json();
      if (!data || typeof data.c !== "number" || data.c <= 0) return;

      const quote = {
        price: data.c,
        change: data.d || 0,
        changePercent: data.dp || 0,
        previousClose: data.pc || null,
        source: "finnhub",
        fetchedAt: Date.now()
      };
      cache.set(ticker, { quote, fetchedAt: Date.now() });
      quotes[ticker] = quote;
    } catch {
      // Client falls back to local live mock.
    }
  }));

  return NextResponse.json({ ok: true, quotes });
}
