import { Bell, Moon } from "lucide-react";

export default function Header() {
  return (
    <nav className="flex h-20 items-center justify-between">
      <a href="#" className="flex items-center gap-3" aria-label="위켄드 코리아 마켓 홈">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg">
          <Moon className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-black text-slate-950 dark:text-white">위켄드 코리아 마켓</span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">주말 투자자 라운지</span>
        </span>
      </a>
      <div className="hidden items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-300 md:flex">
        <a href="#community">커뮤니티</a>
        <a href="#market">시장판</a>
        <a href="#briefing">AI 브리핑</a>
        <a href="#stocks">관심종목</a>
      </div>
      <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-black text-slate-950 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:flex">
        <Bell className="h-4 w-4" />
        월요일 알림
      </button>
    </nav>
  );
}
