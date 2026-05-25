import SectionTitle from "./SectionTitle";

export default function Sentiment() {
  return (
    <section id="sentiment" className="grid gap-5 py-10 lg:grid-cols-3">
      <div className="glass rounded-2xl p-6">
        <SectionTitle eyebrow="시장 감정" title="공포와 탐욕" desc="환율 부담은 남아 있지만 주말 투자심리는 탐욕 쪽으로 기울었습니다." />
        <div className="relative mx-auto mt-6 h-40 w-64">
          <div className="absolute inset-x-0 bottom-0 h-32 rounded-t-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300" />
          <div className="absolute inset-x-8 bottom-0 h-24 rounded-t-full bg-white dark:bg-slate-950" />
          <div className="absolute bottom-4 left-1/2 h-24 w-1 -translate-x-1/2 rotate-[34deg] rounded-full bg-slate-950 dark:bg-white" />
          <div className="absolute inset-x-0 bottom-4 text-center"><strong className="text-4xl font-black">72</strong><p className="text-sm font-black text-emerald-700 dark:text-emerald-200">탐욕 우위</p></div>
        </div>
      </div>
      <div className="glass rounded-2xl p-6">
        <SectionTitle eyebrow="월요일 투표" title="개장 예상" desc="커뮤니티는 강보합 출발에 가장 많이 베팅하고 있어요." />
        {[["상승 예상", 54, "bg-emerald-400"], ["보합 예상", 29, "bg-sky-400"], ["하락 예상", 17, "bg-rose-400"]].map(([label, value, color]) => (
          <div key={label} className="mt-4">
            <div className="mb-2 flex justify-between text-sm font-black"><span>{label}</span><span>{value}%</span></div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-6">
        <SectionTitle eyebrow="한국 투자자 온도" title="대화량 급증" desc="반도체와 AI 인프라 종목이 주말 대화량을 끌어올리고 있습니다." />
        <div className="grid grid-cols-2 gap-3">
          {[["실시간 접속", "24,812명"], ["오늘 게시글", "8,436개"], ["종목 언급", "41.2만회"], ["전략 공유", "3,918개"]].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><strong className="mt-2 block text-xl">{value}</strong></div>
          ))}
        </div>
      </div>
    </section>
  );
}
