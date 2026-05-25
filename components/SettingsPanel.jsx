import { Settings } from "lucide-react";

export default function SettingsPanel({ darkMode, setDarkMode }) {
  return (
    <div className="fixed right-4 top-4 z-50">
      <details className="group">
        <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-2xl border border-slate-200 bg-white/85 text-slate-950 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-white">
          <Settings className="h-5 w-5" />
        </summary>
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
          <p className="text-base font-black text-slate-950 dark:text-white">화면 설정</p>
          <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">기본은 밝은 화면입니다. 밤에 볼 때는 다크 모드를 켜보세요.</p>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">다크 모드</span>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="relative h-7 w-12 rounded-full bg-slate-300 transition dark:bg-emerald-300"
              aria-label="다크 모드 켜고 끄기"
            >
              <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition dark:translate-x-5" />
            </button>
          </div>
        </div>
      </details>
    </div>
  );
}
