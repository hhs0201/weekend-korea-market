import { UserRound } from "lucide-react";

export default function UserAvatar({ user }) {
  const name = user?.user_metadata?.name || user?.email?.split("@")[0] || "투자자";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-2">
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name} 프로필`} className="h-9 w-9 rounded-full object-cover" />
      ) : (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">
          <UserRound className="h-4 w-4" />
        </span>
      )}
      <span className="hidden text-sm font-black text-slate-800 dark:text-slate-100 sm:block">{name}</span>
    </div>
  );
}
