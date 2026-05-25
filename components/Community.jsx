import { MessageCircle, ThumbsUp } from "lucide-react";
import { posts } from "../data/market";
import SectionTitle from "./SectionTitle";

export default function Community() {
  return (
    <section id="community" className="py-10">
      <SectionTitle eyebrow="주말 커뮤니티" title="장 닫힌 주말에도 대화는 계속됩니다" desc="월요일 예상, 인기 종목, 이번주 복기와 다음주 전략까지 투자자들의 온기가 모이는 공간입니다." />
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr_0.72fr]">
        <aside className="glass rounded-2xl p-5">
          <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">오늘 뜨는 게시판</p>
          {["월요일 예상", "반도체 토론", "우주주 라운지", "환율 체크"].map((name, index) => (
            <div key={name} className="mb-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 p-3 font-black dark:border-white/10 dark:bg-white/5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">{index + 1}</span>
              {name}
            </div>
          ))}
        </aside>
        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {["실시간 커뮤니티", "월요일 예상", "인기 종목 토론", "이번주 복기", "다음주 전략", "자유 게시판"].map((tab, index) => (
              <button key={tab} className={index === 0 ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950" : "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-black text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}>{tab}</button>
            ))}
          </div>
          <div className="space-y-3">
            {posts.map((post) => (
              <article key={post.title} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="mb-2 flex justify-between text-xs font-black text-emerald-700 dark:text-emerald-200"><span>{post.board}</span><span>{post.hot ? "방금 인기" : post.time}</span></div>
                <h3 className="font-black leading-7 text-slate-950 dark:text-white">{post.title}</h3>
                <div className="mt-3 flex gap-4 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1"><ThumbsUp className="h-4 w-4" />{post.likes}</span><span className="inline-flex items-center gap-1"><MessageCircle className="h-4 w-4" />{post.comments}</span></div>
              </article>
            ))}
          </div>
        </div>
        <aside className="glass rounded-2xl p-5">
          <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">실시간 온도</p>
          {[["반도체", "매수 관심", "up"], ["환율", "부담 확대", "down"], ["우주주", "언급 급증", "up"], ["코인", "관망 우세", "down"]].map(([label, value, tone]) => (
            <div key={label} className="mb-2 flex justify-between rounded-xl border border-slate-200 bg-white/70 p-3 text-sm font-black dark:border-white/10 dark:bg-white/5">
              <span>{label}</span><span className={tone === "up" ? "text-emerald-700 dark:text-emerald-200" : "text-rose-600 dark:text-rose-200"}>{value}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
