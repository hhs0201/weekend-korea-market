import Link from "next/link";
import clsx from "clsx";
import { stocks } from "../data/market";
import MiniChart from "./MiniChart";
import SectionTitle from "./SectionTitle";

export default function TrendingStocks({ watchlist, onToggleWatch }) {
  const korea = stocks.filter((stock) => stock.region === "국내");
  const global = stocks.filter((stock) => stock.region === "해외");
  const watched = stocks.filter((stock) => watchlist.includes(stock.ticker));

  return (
    <section id="stocks" className="py-10">
      <SectionTitle
        eyebrow="인기 종목"
        title="국내와 해외를 나눠 보는 주말 관심 종목"
        desc="종목을 누르면 전용 상세 페이지와 해당 종목 커뮤니티로 이동합니다."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <StockPanel title="월요일 한국장 체크" badge="KOSPI" tone="korea" stocks={korea} watchlist={watchlist} onToggleWatch={onToggleWatch} />
        <StockPanel title="밤사이 글로벌 관심" badge="NASDAQ" tone="global" stocks={global} watchlist={watchlist} onToggleWatch={onToggleWatch} />
      </div>
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
            {watched.map((stock) => (
              <Link key={stock.ticker} href={`/stocks/${stock.ticker}`} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 p-3 transition hover:border-emerald-300 dark:border-white/10 dark:bg-white/5">
                <div>
                  <strong>{stock.name}</strong>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stock.region} · {stock.ticker} · {stock.price}</p>
                </div>
                <span className={stock.trend === "up" ? "font-black text-emerald-700 dark:text-emerald-200" : "font-black text-rose-600 dark:text-rose-200"}>{stock.trend === "up" ? "관심 증가" : "변동 주의"}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StockPanel({ title, badge, tone, stocks: items, watchlist, onToggleWatch }) {
  return (
    <div className={clsx("glass overflow-hidden rounded-2xl border-2", tone === "korea" ? "border-emerald-300/50 bg-emerald-50/50 dark:bg-emerald-400/5" : "border-sky-300/50 bg-sky-50/50 dark:bg-sky-400/5")}>
      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/10">
        <div>
          <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">{tone === "korea" ? "국내" : "해외"}</p>
          <h3 className="text-xl font-black">{title}</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-200">{badge}</span>
      </div>
      <div className="grid gap-2 p-4">
        {items.map((stock) => {
          const watched = watchlist.includes(stock.ticker);
          return (
            <article key={stock.ticker} className="grid grid-cols-[1fr_auto_58px] items-center gap-3 rounded-xl border border-slate-200 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5 sm:grid-cols-[1fr_84px_62px]">
              <Link href={`/stocks/${stock.ticker}`} className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">{stock.ticker}</p>
                <h3 className="font-black">{stock.name}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stock.price} · 언급 {stock.mentions} · 점수 {stock.score}</p>
              </Link>
              <Link href={`/stocks/${stock.ticker}`} className="hidden sm:block">
                <MiniChart points={stock.trend === "up" ? "8,34 32,30 54,22 78,24 100,14 116,16" : "8,18 32,17 54,21 78,20 100,28 116,31"} trend={stock.trend} compact />
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
