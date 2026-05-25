import { useEffect, useMemo, useState } from "react";
import { fetchQuotes, makeInitialQuote, makeMockMove, normalizeApiQuote } from "../lib/priceService";

export function useLivePrices(stocks) {
  const tickers = useMemo(() => stocks.map((stock) => stock.ticker), [stocks]);
  const [quotes, setQuotes] = useState(() => Object.fromEntries(stocks.map((stock) => [stock.ticker, makeInitialQuote(stock)])));
  const [status, setStatus] = useState("mock");

  useEffect(() => {
    setQuotes(Object.fromEntries(stocks.map((stock) => [stock.ticker, makeInitialQuote(stock)])));
  }, [stocks]);

  useEffect(() => {
    let cancelled = false;

    async function refreshQuotes() {
      try {
        const result = await fetchQuotes(tickers);
        if (cancelled) return;
        if (!result.ok) {
          setStatus("mock");
          return;
        }
        setQuotes((current) => {
          const next = { ...current };
          stocks.forEach((stock) => {
            const normalized = normalizeApiQuote(stock, result.quotes?.[stock.ticker]);
            if (normalized) next[stock.ticker] = normalized;
          });
          return next;
        });
        setStatus(Object.keys(result.quotes || {}).length ? "live" : "mock");
      } catch {
        if (!cancelled) setStatus("delayed");
      }
    }

    refreshQuotes();
    const interval = window.setInterval(refreshQuotes, 45 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [stocks, tickers]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuotes((current) => {
        const next = { ...current };
        stocks.forEach((stock) => {
          if (next[stock.ticker]?.source === "finnhub") return;
          next[stock.ticker] = makeMockMove(stock, next[stock.ticker]);
        });
        return next;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, [stocks]);

  return { quotes, status };
}
