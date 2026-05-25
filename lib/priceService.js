export function parseStaticPrice(stock) {
  const numeric = Number(String(stock.price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function parseStaticChange(stock) {
  const numeric = Number(String(stock.change || "0").replace("%", ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatPrice(stock, price) {
  if (stock.region === "국내") {
    return `${Math.round(price).toLocaleString("ko-KR")}원`;
  }

  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function formatChangePercent(value) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

export async function fetchQuotes(tickers) {
  const response = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickers })
  });

  if (!response.ok) throw new Error("quote_fetch_failed");
  return response.json();
}

export function makeInitialQuote(stock) {
  const changePercent = parseStaticChange(stock);

  return {
    price: parseStaticPrice(stock),
    changePercent,
    displayPrice: stock.price,
    displayChange: stock.change,
    trend: changePercent >= 0 ? "up" : "down",
    source: "mock"
  };
}

export function makeMockMove(stock, previousQuote) {
  const basePrice = previousQuote?.price || parseStaticPrice(stock);
  const drift = (Math.random() - 0.5) * 0.006;
  const nextPrice = Math.max(basePrice * (1 + drift), 0.01);
  const baseStatic = parseStaticPrice(stock) || nextPrice;
  const changePercent = ((nextPrice - baseStatic) / baseStatic) * 100 + parseStaticChange(stock) * 0.15;

  return {
    price: nextPrice,
    changePercent,
    displayPrice: formatPrice(stock, nextPrice),
    displayChange: formatChangePercent(changePercent),
    trend: changePercent >= 0 ? "up" : "down",
    source: "mock"
  };
}

export function normalizeApiQuote(stock, quote) {
  if (!quote?.price) return null;

  return {
    price: quote.price,
    changePercent: quote.changePercent || 0,
    displayPrice: formatPrice(stock, quote.price),
    displayChange: formatChangePercent(quote.changePercent || 0),
    trend: (quote.changePercent || 0) >= 0 ? "up" : "down",
    source: "finnhub"
  };
}
