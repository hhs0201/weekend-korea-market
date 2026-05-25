import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { useAuth } from "../app/providers";
import CommunityBoard from "./CommunityBoard";
import SectionTitle from "./SectionTitle";

const commonCategories = ["자유게시판", "실시간 수다", "환율/매크로"];
const emptyDefaultPosts = [];

export default function Community() {
  const { user } = useAuth();
  const [profileName, setProfileName] = useState("주말투자자");

  useEffect(() => {
    if (user?.user_metadata?.name) setProfileName(user.user_metadata.name);
    else if (user?.email) setProfileName(user.email.split("@")[0]);
  }, [user]);

  return (
    <section id="community" className="py-10">
      <SectionTitle
        eyebrow="공통 커뮤니티"
        title="장 닫힌 주말에도 대화는 계속됩니다"
        desc="자유게시판, 실시간 수다, 환율/매크로 게시판만 홈에 두고 종목 이야기는 각 종목 전용 커뮤니티로 분리했습니다."
      />
      <div className="mb-5 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <strong className="block text-slate-950 dark:text-white">{user ? profileName : "로그인 전"}</strong>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{user ? "커뮤니티 참여 가능" : "로그인하면 글과 댓글을 쓸 수 있어요"}</span>
          </div>
        </div>
      </div>
      <CommunityBoard
        boardId="common"
        categories={commonCategories}
        defaultPosts={emptyDefaultPosts}
        emptyText="아직 작성된 글이 없습니다. 첫 이야기를 남겨보세요."
      />
    </section>
  );
}
