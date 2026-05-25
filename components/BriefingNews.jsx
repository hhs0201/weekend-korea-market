import { aiBriefs, news } from "../data/market";
import SectionTitle from "./SectionTitle";

export default function BriefingNews() {
  return (
    <section id="briefing" className="grid gap-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass rounded-2xl p-6">
        <SectionTitle eyebrow="AI 마켓 브리핑" title="오늘 밤 투자자들이 보는 핵심 흐름" desc="짧고 선명하게, 월요일 장 전에 필요한 맥락만 골랐습니다." />
        <div className="space-y-3">
          {aiBriefs.map((brief) => <p key={brief} className="rounded-xl border border-slate-200 bg-white/70 p-4 leading-7 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">{brief}</p>)}
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <SectionTitle eyebrow="위켄드 뉴스" title="주말에도 놓치면 아쉬운 시장 뉴스" desc="미국증시, 반도체, 환율, 코인까지 한눈에 읽히도록 정리했습니다." />
        <div className="grid gap-3 md:grid-cols-2">
          {news.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="h-20 w-24 shrink-0 rounded-lg bg-gradient-to-br from-emerald-200 to-rose-100 dark:from-emerald-400/20 dark:to-rose-400/20" />
              <div>
                <div className="mb-2 flex gap-2 text-xs font-black text-slate-500 dark:text-slate-400"><span className="text-emerald-700 dark:text-emerald-200">{item.category}</span><span>{item.time}</span></div>
                <h3 className="text-sm font-black leading-6 text-slate-950 dark:text-white">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
