import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Pencil, Send, ThumbsUp, Trash2, UserRound } from "lucide-react";
import { posts } from "../data/market";
import { createPostId, loadCommunityPosts, saveCommunityPosts } from "../lib/communityStore";
import SectionTitle from "./SectionTitle";

const categories = ["실시간 커뮤니티", "월요일 예상", "인기 종목 토론", "이번주 복기", "다음주 전략", "자유 게시판"];

const defaultProfile = {
  id: "local-user",
  name: "주말투자자",
  badge: "개인 투자자"
};

const defaultCommunityPosts = posts.map((post, index) => ({
  id: `seed-${index}`,
  title: post.title,
  content: "주말 시장 흐름을 같이 보면서 월요일 전략을 정리해보는 글입니다.",
  category: post.board,
  likes: post.likes,
  liked: false,
  author: index % 2 === 0 ? "반도체러" : "월요일대기중",
  authorBadge: index % 2 === 0 ? "관심종목 8개" : "커뮤니티 멤버",
  comments: [],
  createdAt: Date.now() - (index + 1) * 1000 * 60 * 4,
  updatedAt: null
}));

export default function Community() {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [openPostId, setOpenPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [profileDraft, setProfileDraft] = useState(defaultProfile.name);
  const [form, setForm] = useState({ title: "", content: "", category: categories[1] });
  const [editForm, setEditForm] = useState({ title: "", content: "", category: categories[1] });
  const [commentDrafts, setCommentDrafts] = useState({});

  useEffect(() => {
    setCommunityPosts(loadCommunityPosts(defaultCommunityPosts));
    const savedProfile = window.localStorage.getItem("weekend-korea-market-profile-v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setProfileDraft(parsed.name);
      } catch {
        setProfile(defaultProfile);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCommunityPosts(communityPosts);
  }, [communityPosts, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("weekend-korea-market-profile-v1", JSON.stringify(profile));
  }, [profile, hydrated]);

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = category === categories[0]
        ? communityPosts.length
        : communityPosts.filter((post) => post.category === category).length;
      return acc;
    }, {});
  }, [communityPosts]);

  const visiblePosts = useMemo(() => {
    return [...communityPosts]
      .filter((post) => selectedCategory === categories[0] || post.category === selectedCategory)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [communityPosts, selectedCategory]);

  const submitProfile = (event) => {
    event.preventDefault();
    const name = profileDraft.trim();
    if (!name) return;
    setProfile((current) => ({ ...current, name }));
  };

  const submitPost = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    const newPost = {
      id: createPostId(),
      title,
      content,
      category: form.category,
      likes: 0,
      liked: false,
      author: profile.name,
      authorBadge: profile.badge,
      comments: [],
      createdAt: Date.now(),
      updatedAt: null
    };

    setCommunityPosts((current) => [newPost, ...current]);
    setSelectedCategory(categories[0]);
    setOpenPostId(newPost.id);
    setForm({ title: "", content: "", category: form.category });
  };

  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setOpenPostId(post.id);
    setEditForm({ title: post.title, content: post.content, category: post.category });
  };

  const saveEditPost = (postId) => {
    const title = editForm.title.trim();
    const content = editForm.content.trim();
    if (!title || !content) return;

    setCommunityPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      title,
      content,
      category: editForm.category,
      updatedAt: Date.now()
    } : post));
    setEditingPostId(null);
  };

  const deletePost = (postId) => {
    setCommunityPosts((current) => current.filter((post) => post.id !== postId));
    if (openPostId === postId) setOpenPostId(null);
    if (editingPostId === postId) setEditingPostId(null);
  };

  const toggleLike = (postId) => {
    setCommunityPosts((current) => current.map((post) => {
      if (post.id !== postId) return post;
      const liked = !post.liked;
      return { ...post, liked, likes: Math.max(0, post.likes + (liked ? 1 : -1)) };
    }));
  };

  const submitComment = (postId) => {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    setCommunityPosts((current) => current.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        comments: [
          ...post.comments,
          {
            id: createPostId(),
            text,
            author: profile.name,
            likes: 0,
            liked: false,
            createdAt: Date.now()
          }
        ]
      };
    }));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
    setOpenPostId(postId);
  };

  const toggleCommentLike = (postId, commentId) => {
    setCommunityPosts((current) => current.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        comments: post.comments.map((comment) => {
          if (comment.id !== commentId) return comment;
          const liked = !comment.liked;
          return { ...comment, liked, likes: Math.max(0, comment.likes + (liked ? 1 : -1)) };
        })
      };
    }));
  };

  const deleteComment = (postId, commentId) => {
    setCommunityPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId)
    } : post));
  };

  return (
    <section id="community" className="py-10">
      <SectionTitle
        eyebrow="주말 커뮤니티"
        title="장 닫힌 주말에도 대화는 계속됩니다"
        desc="글을 쓰고, 댓글을 달고, 관심 있는 주제를 최신순으로 따라가며 월요일을 함께 준비합니다."
      />

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr_0.72fr]">
        <aside className="glass rounded-2xl p-5">
          <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">내 프로필</p>
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-slate-950 dark:text-white">{profile.name}</strong>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{profile.badge}</span>
              </div>
            </div>
            <form onSubmit={submitProfile} className="mt-3 flex gap-2">
              <input
                value={profileDraft}
                onChange={(event) => setProfileDraft(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
                placeholder="닉네임"
              />
              <button className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950">저장</button>
            </form>
          </div>

          <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">카테고리</p>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`mb-2 flex w-full items-center justify-between rounded-xl border p-3 text-left font-black ${
                selectedCategory === category
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100"
                  : "border-slate-200 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
              }`}
            >
              <span>{category}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-white/10 dark:text-slate-300">{categoryCounts[category] || 0}</span>
            </button>
          ))}
        </aside>

        <div className="glass rounded-2xl p-5">
          <PostForm form={form} setForm={setForm} onSubmit={submitPost} />

          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={selectedCategory === tab ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950" : "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-black text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}
              >
                {tab} {categoryCounts[tab] || 0}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visiblePosts.map((post) => (
              <article key={post.id} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                {editingPostId === post.id ? (
                  <EditPostForm
                    editForm={editForm}
                    setEditForm={setEditForm}
                    onCancel={() => setEditingPostId(null)}
                    onSave={() => saveEditPost(post.id)}
                  />
                ) : (
                  <>
                    <button type="button" onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className="block w-full text-left">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-black text-emerald-700 dark:text-emerald-200">
                        <span>{post.category}</span>
                        <span>{formatTime(post.createdAt)}{post.updatedAt ? " · 수정됨" : ""}</span>
                      </div>
                      <h3 className="font-black leading-7 text-slate-950 dark:text-white">{post.title}</h3>
                      <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{post.author} · {post.authorBadge}</p>
                    </button>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <button type="button" onClick={() => toggleLike(post.id)} className={`inline-flex items-center gap-1 font-bold ${post.liked ? "text-emerald-700 dark:text-emerald-200" : ""}`}>
                        <ThumbsUp className="h-4 w-4" />{post.likes}
                      </button>
                      <button type="button" onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className="inline-flex items-center gap-1 font-bold">
                        <MessageCircle className="h-4 w-4" />{post.comments.length}
                      </button>
                      <button type="button" onClick={() => startEditPost(post)} className="inline-flex items-center gap-1 font-bold">
                        <Pencil className="h-4 w-4" />수정
                      </button>
                      <button type="button" onClick={() => deletePost(post.id)} className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-200">
                        <Trash2 className="h-4 w-4" />삭제
                      </button>
                    </div>
                  </>
                )}

                {openPostId === post.id && editingPostId !== post.id && (
                  <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{post.content}</p>
                    <CommentList
                      post={post}
                      draft={commentDrafts[post.id] || ""}
                      setDraft={(value) => setCommentDrafts((current) => ({ ...current, [post.id]: value }))}
                      onSubmit={() => submitComment(post.id)}
                      onLike={(commentId) => toggleCommentLike(post.id, commentId)}
                      onDelete={(commentId) => deleteComment(post.id, commentId)}
                    />
                  </div>
                )}
              </article>
            ))}
            {visiblePosts.length === 0 && (
              <p className="rounded-xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                아직 이 카테고리에 글이 없습니다. 첫 글을 남겨보세요.
              </p>
            )}
          </div>
        </div>

        <aside className="glass rounded-2xl p-5">
          <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">실시간 온도</p>
          {[["반도체", "매수 관심", "up"], ["환율", "부담 확대", "down"], ["우주주", "언급 급증", "up"], ["코인", "관망 우세", "down"]].map(([label, value, tone]) => (
            <div key={label} className="mb-2 flex justify-between rounded-xl border border-slate-200 bg-white/70 p-3 text-sm font-black dark:border-white/10 dark:bg-white/5">
              <span>{label}</span>
              <span className={tone === "up" ? "text-emerald-700 dark:text-emerald-200" : "text-rose-600 dark:text-rose-200"}>{value}</span>
            </div>
          ))}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-black text-slate-950 dark:text-white">Supabase 전환 준비</p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">저장 로직은 별도 파일로 분리되어 있어 백엔드 연결 시 UI를 크게 바꾸지 않아도 됩니다.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function PostForm({ form, setForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-5 rounded-2xl border border-slate-200 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="제목을 입력하세요"
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
        />
        <select
          value={form.category}
          onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
        >
          {categories.slice(1).map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <textarea
        value={form.content}
        onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
        placeholder="주말 시장 분위기, 월요일 전략, 궁금한 종목 이야기를 남겨보세요"
        rows={4}
        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">작성한 글과 댓글은 이 브라우저에 저장됩니다.</p>
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950">
          <Send className="h-4 w-4" />
          작성
        </button>
      </div>
    </form>
  );
}

function EditPostForm({ editForm, setEditForm, onCancel, onSave }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-300/20 dark:bg-emerald-300/10">
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input
          value={editForm.title}
          onChange={(event) => setEditForm((current) => ({ ...current, title: event.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
        />
        <select
          value={editForm.category}
          onChange={(event) => setEditForm((current) => ({ ...current, category: event.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
        >
          {categories.slice(1).map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <textarea
        value={editForm.content}
        onChange={(event) => setEditForm((current) => ({ ...current, content: event.target.value }))}
        rows={4}
        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
      />
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black dark:border-white/10 dark:bg-white/5">취소</button>
        <button type="button" onClick={onSave} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950">저장</button>
      </div>
    </div>
  );
}

function CommentList({ post, draft, setDraft, onSubmit, onLike, onDelete }) {
  return (
    <div className="mt-4">
      <div className="space-y-2">
        {post.comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">아직 댓글이 없습니다. 첫 의견을 남겨보세요.</p>
        ) : post.comments.map((comment) => (
          <div key={comment.id} className="rounded-xl bg-slate-100 px-3 py-2 text-sm leading-6 dark:bg-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-950 dark:text-white">{comment.author}</p>
                <p>{comment.text}</p>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{formatTime(comment.createdAt)}</span>
              </div>
              <div className="flex shrink-0 gap-2 text-xs font-black">
                <button type="button" onClick={() => onLike(comment.id)} className={comment.liked ? "text-emerald-700 dark:text-emerald-200" : "text-slate-500 dark:text-slate-400"}>좋아요 {comment.likes}</button>
                <button type="button" onClick={() => onDelete(comment.id)} className="text-rose-600 dark:text-rose-200">삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSubmit();
          }}
          placeholder="댓글을 입력하세요"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
        />
        <button type="button" onClick={onSubmit} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white">등록</button>
      </div>
    </div>
  );
}

function formatTime(timestamp) {
  const diff = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}
