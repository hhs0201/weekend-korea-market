import { useState } from "react";
import { Mail, X } from "lucide-react";
import { useAuth } from "../app/providers";

export default function AuthModal({ open, onClose }) {
  const { authMessage, isSupabaseConfigured, signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  if (!open) return null;

  const submitEmail = async (event) => {
    event.preventDefault();
    setPending(true);
    await signInWithEmail(email.trim());
    setPending(false);
  };

  const submitGoogle = async () => {
    setPending(true);
    await signInWithGoogle();
    setPending(false);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-emerald-700 dark:text-emerald-200">로그인</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">주말 커뮤니티에 참여하기</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">로그인하면 글 작성, 댓글, 관심종목 저장을 사용자별로 관리할 수 있어요.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="로그인 닫기">
            <X className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={submitGoogle}
          disabled={pending}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-60 dark:bg-white dark:text-slate-950"
        >
          Google로 계속하기
        </button>

        <form onSubmit={submitEmail} className="mt-3">
          <label className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">이메일 로그인</label>
          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <button disabled={pending} className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-white disabled:opacity-60">전송</button>
          </div>
        </form>

        <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-500 dark:bg-white/5 dark:text-slate-400">
          {isSupabaseConfigured ? "Supabase 환경변수가 연결되어 실제 인증 흐름을 사용합니다." : "아직 Supabase 환경변수가 없어 로컬 체험 로그인으로 동작합니다. 앱은 그대로 실행됩니다."}
        </div>
        {authMessage && <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-emerald-200">{authMessage}</p>}
      </div>
    </div>
  );
}
