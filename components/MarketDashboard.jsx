import clsx from "clsx";
import { marketCards } from "../data/market";
import MiniChart from "./MiniChart";
import SectionTitle from "./SectionTitle";

export default function MarketDashboard() {
  return (
    <section id="market" className="py-10">
      <SectionTitle eyebrow="주말 시장판" title="월요일을 먼저 읽는 실시간 대시보드" desc="주요 선물, 코인, 환율, 국내 지수 예상 흐름을 한국 투자자 관점으로 빠르게 정리했습니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketCards.map((item) => (
          <article key={item.name} className="glass rounded-2xl p-5 transition hover:-translate-y-1">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.name}</p>
                <strong className="mt-2 block text-2xl font-black text-slate-950 dark:text-white">{item.value}</strong>
              </div>
              <span className={clsx("rounded-full px-3 py-1 text-sm font-black", item.trend === "up" ? "bg-emerald-400/15 text-emerald-700 dark:text-emerald-200" : "bg-rose-400/15 text-rose-600 dark:text-rose-200")}>{item.change}</span>
            </div>
            <MiniChart points={item.points} trend={item.trend} />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
