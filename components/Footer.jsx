export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200 py-10 dark:border-white/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black">위켄드 코리아 마켓</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">장 닫힌 주말에도 투자자는 혼자가 아닙니다. 월요일을 기다리는 한국 투자자들의 시장 라운지.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-black text-slate-500 dark:text-slate-400">
          <a href="#briefing">AI 브리핑</a>
          <a href="#community">커뮤니티 원칙</a>
          <a href="#sentiment">투자심리</a>
          <a href="#market">시장 데이터</a>
        </div>
      </div>
    </footer>
  );
}
