import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Search } from "lucide-react";
import { stocks } from "../data/market";
import { useLivePrices } from "../hooks/useLivePrices";
import MiniChart from "./MiniChart";
import SectionTitle from "./SectionTitle";

export default function TrendingStocks({ watchlist, onToggleWatch }) {
  const [activeRegion, setActiveRegion] = useState("국내");
  const [query, setQuery] = useState("");
  const { quotes, status } = useLivePrices(stocks);
  const watched = stocks.filter((stock) => watchlist.includes(stock.ticker));

  const filteredStocks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stocks.filter((stock) => {
      const matchesRegion = stock.region === activeRegion;
      const matchesQuery = !normalized || stock.name.toLowerCase().includes(normalized) || stock.ticker.toLowerCase().includes(normalized);
      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, query]);

  const noResult = query.trim() && filteredStocks.length === 0;

  return (
    <section id="stocks" className="py-10">
      <SectionTitle
        eyebrow="인기 종목"
        title="국내와 해외를 나눠 보는 주말 관심 종목"
        desc="종목명이나 티커로 검색하고, 종목을 누르면 전용 상세 페이지와 커뮤니티로 이동합니다."
      />

      <div className="glass mb-5 rounded-2xl p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2">
            {["국내", "해외"].map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={activeRegion === region ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950" : "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-black text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}
              >
                {region} {stocks.filter((stock) => stock.region === region).length}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="종목명 또는 티커 검색"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-bold outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
          </div>
        </div>
        <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          {status === "live" ? "Finnhub 실시간 가격을 반영 중입니다." : status === "delayed" ? "가격 API가 일시적으로 지연되어 mock 가격을 표시합니다." : "API 키가 없거나 연결 전이라 live mock 가격을 표시합니다."}
        </p>
      </div>

      {noResult ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center dark:border-white/15 dark:bg-white/5">
          <p className="text-lg font-black">등록되지 않은 종목입니다</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">검색어를 다시 확인하거나 관심종목 후보에 추가할 종목을 알려주세요.</p>
        </div>
      ) : (
        <StockPanel region={activeRegion} stocks={filteredStocks} quotes={quotes} watchlist={watchlist} onToggleWatch={onToggleWatch} />
      )}

      <div className="glass mt-5 rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">내 관심종목</p>
            <h3 className="text-xl font-black">월요일 전에 다시 볼 종목</h3>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-black text-emerald-700 dark:text-emerald-200">{watched.length}개</span>
        </div>
        {watched.length === 0 ? (
          <p className="leading-7 text-slate-500 dark:text-slate-400">관심을 누르면 여기에 종목이 담겨요. 주말에 다시 보고 싶은 종목만 가볍게 모아보세요.</p>
        ) : (
          <div className="grid gap-2">
            {watched.map((stock) => {
              const quote = quotes[stock.ticker];
              return (
                <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 p-3 transition hover:border-emerald-300 dark:border-white/10 dark:bg-white/5">
                  <div>
                    <strong>{stock.name}</strong>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{stock.region} · {stock.ticker} · {quote?.displayPrice || stock.price}</p>
                  </div>
                  <span className={(quote?.trend || stock.trend) === "up" ? "font-black text-emerald-700 dark:text-emerald-200" : "font-black text-rose-600 dark:text-rose-200"}>{quote?.displayChange || stock.change}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function StockPanel({ region, stocks: items, quotes, watchlist, onToggleWatch }) {
  return (
    <div className={clsx("glass overflow-hidden rounded-2xl border-2", region === "국내" ? "border-emerald-300/50 bg-emerald-50/50 dark:bg-emerald-400/5" : "border-sky-300/50 bg-sky-50/50 dark:bg-sky-400/5")}>
      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/10">
        <div>
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">{region}</p>
          <h3 className="text-xl font-black">{region === "국내" ? "월요일 한국장 체크" : "밤사이 글로벌 관심"}</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200">{items.length}개</span>
      </div>
      <div className="grid gap-2 p-4">
        {items.map((stock) => {
          const watched = watchlist.includes(stock.ticker);
          const quote = quotes[stock.ticker];
          const trend = quote?.trend || stock.trend;
          return (
            <article key={stock.ticker} className="grid grid-cols-[1fr_auto_58px] items-center gap-3 rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5 sm:grid-cols-[1fr_84px_62px]">
              <Link href={`/stocks/${stock.ticker}`} className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.ticker}</p>
                <h3 className="font-black">{stock.name}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{quote?.displayPrice || stock.price} · {quote?.displayChange || stock.change} · 점수 {stock.score}</p>
              </Link>
              <Link href={`/stocks/${stock.ticker}`} className="hidden sm:block">
                <MiniChart points={trend === "up" ? "8,34 32,30 54,22 78,24 100,14 116,16" : "8,18 32,17 54,21 78,20 100,28 116,31"} trend={trend} compact />
              </Link>
              <button
                type="button"
                onClick={() => onToggleWatch(stock.ticker)}
                className={watched ? "rounded-full bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200" : "rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"}
              >
                {watched ? "담김" : "관심"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
