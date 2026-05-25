export default function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-slate-950/90 p-2 text-xs font-black text-slate-300 shadow-2xl backdrop-blur md:hidden" aria-label="모바일 주요 메뉴">
      <a href="#community" className="flex flex-col items-center gap-1 text-emerald-200"><span>●</span><span>커뮤니티</span></a>
      <a href="#market" className="flex flex-col items-center gap-1"><span>↗</span><span>시장판</span></a>
      <a href="#stocks" className="flex flex-col items-center gap-1"><span>＋</span><span>관심</span></a>
      <a href="#sentiment" className="flex flex-col items-center gap-1"><span>◐</span><span>심리</span></a>
    </nav>
  );
}
