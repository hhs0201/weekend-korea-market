import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Pencil, Send, ThumbsUp, Trash2 } from "lucide-react";
import { useAuth } from "../app/providers";
import { createPostId, loadCommunityPosts, saveCommunityPosts } from "../lib/communityStore";

export default function CommunityBoard({
  boardId,
  categories,
  defaultPosts,
  emptyText = "아직 글이 없습니다. 첫 글을 남겨보세요.",
  lockedText = "로그인하면 글 작성과 댓글 참여가 가능해요."
}) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [openPostId, setOpenPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: categories[0] });
  const [editForm, setEditForm] = useState({ title: "", content: "", category: categories[0] });
  const [commentDrafts, setCommentDrafts] = useState({});

  useEffect(() => {
    setPosts(loadCommunityPosts(defaultPosts, boardId));
    setHydrated(true);
  }, [boardId, defaultPosts]);

  useEffect(() => {
    if (hydrated) saveCommunityPosts(posts, boardId);
  }, [boardId, hydrated, posts]);

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = posts.filter((post) => post.category === category).length;
      return acc;
    }, {});
  }, [categories, posts]);

  const visiblePosts = useMemo(() => {
    return [...posts]
      .filter((post) => post.category === selectedCategory)
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [posts, selectedCategory]);

  const authorName = user?.user_metadata?.name || user?.email?.split("@")[0] || "주말투자자";

  const submitPost = (event) => {
    event.preventDefault();
    if (!user) return;
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
      author: authorName,
      comments: [],
      createdAt: Date.now(),
      updatedAt: null
    };

    setPosts((current) => [newPost, ...current]);
    setSelectedCategory(form.category);
    setOpenPostId(newPost.id);
    setForm({ title: "", content: "", category: form.category });
  };

  const startEdit = (post) => {
    setEditingPostId(post.id);
    setOpenPostId(post.id);
    setEditForm({ title: post.title, content: post.content, category: post.category });
  };

  const saveEdit = (postId) => {
    const title = editForm.title.trim();
    const content = editForm.content.trim();
    if (!title || !content) return;
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, title, content, category: editForm.category, updatedAt: Date.now() } : post));
    setEditingPostId(null);
    setSelectedCategory(editForm.category);
  };

  const deletePost = (postId) => {
    setPosts((current) => current.filter((post) => post.id !== postId));
    if (openPostId === postId) setOpenPostId(null);
  };

  const togglePostLike = (postId) => {
    setPosts((current) => current.map((post) => {
      if (post.id !== postId) return post;
      const liked = !post.liked;
      return { ...post, liked, likes: Math.max(0, post.likes + (liked ? 1 : -1)) };
    }));
  };

  const submitComment = (postId) => {
    if (!user) return;
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: [...post.comments, { id: createPostId(), text, author: authorName, likes: 0, liked: false, createdAt: Date.now() }]
    } : post));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const toggleCommentLike = (postId, commentId) => {
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        const liked = !comment.liked;
        return { ...comment, liked, likes: Math.max(0, comment.likes + (liked ? 1 : -1)) };
      })
    } : post));
  };

  const deleteComment = (postId, commentId) => {
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId)
    } : post));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <aside className="glass rounded-2xl p-5">
        <p className="mb-3 text-sm font-black text-emerald-700 dark:text-emerald-200">게시판</p>
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
        <form onSubmit={submitPost} className="mb-5 rounded-2xl border border-slate-200 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
          {!user && <div className="mb-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:bg-amber-300/10 dark:text-amber-100">{lockedText}</div>}
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <input disabled={!user} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="제목을 입력하세요" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
            <select disabled={!user} value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white">
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <textarea disabled={!user} value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="주말 시장 분위기와 투자 의견을 남겨보세요" rows={4} className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
          <div className="mt-3 flex justify-end">
            <button disabled={!user} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-50 dark:bg-white dark:text-slate-950"><Send className="h-4 w-4" />작성</button>
          </div>
        </form>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950" : "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-black text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}>
              {category} {categoryCounts[category] || 0}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {visiblePosts.map((post) => (
            <article key={post.id} className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              {editingPostId === post.id ? (
                <EditForm categories={categories} editForm={editForm} setEditForm={setEditForm} onCancel={() => setEditingPostId(null)} onSave={() => saveEdit(post.id)} />
              ) : (
                <>
                  <button type="button" onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className="block w-full text-left">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-black text-emerald-700 dark:text-emerald-200"><span>{post.category}</span><span>{formatTime(post.createdAt)}{post.updatedAt ? " · 수정됨" : ""}</span></div>
                    <h3 className="font-black leading-7 text-slate-950 dark:text-white">{post.title}</h3>
                    <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{post.author}</p>
                  </button>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <button type="button" onClick={() => togglePostLike(post.id)} className={`inline-flex items-center gap-1 font-bold ${post.liked ? "text-emerald-700 dark:text-emerald-200" : ""}`}><ThumbsUp className="h-4 w-4" />{post.likes}</button>
                    <button type="button" onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className="inline-flex items-center gap-1 font-bold"><MessageCircle className="h-4 w-4" />{post.comments.length}</button>
                    <button type="button" onClick={() => startEdit(post)} className="inline-flex items-center gap-1 font-bold"><Pencil className="h-4 w-4" />수정</button>
                    <button type="button" onClick={() => deletePost(post.id)} className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-200"><Trash2 className="h-4 w-4" />삭제</button>
                  </div>
                </>
              )}

              {openPostId === post.id && editingPostId !== post.id && (
                <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{post.content}</p>
                  <div className="mt-4 space-y-2">
                    {post.comments.length === 0 ? <p className="text-sm text-slate-500 dark:text-slate-400">아직 댓글이 없습니다. 첫 의견을 남겨보세요.</p> : post.comments.map((comment) => (
                      <div key={comment.id} className="rounded-xl bg-slate-100 px-3 py-2 text-sm leading-6 dark:bg-white/10">
                        <div className="flex items-start justify-between gap-3">
                          <div><p className="font-bold">{comment.author}</p><p>{comment.text}</p><span className="text-xs text-slate-500 dark:text-slate-400">{formatTime(comment.createdAt)}</span></div>
                          <div className="flex shrink-0 gap-2 text-xs font-black"><button onClick={() => toggleCommentLike(post.id, comment.id)} className={comment.liked ? "text-emerald-700 dark:text-emerald-200" : ""}>좋아요 {comment.likes}</button><button onClick={() => deleteComment(post.id, comment.id)} className="text-rose-600 dark:text-rose-200">삭제</button></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input disabled={!user} value={commentDrafts[post.id] || ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter") submitComment(post.id); }} placeholder={user ? "댓글을 입력하세요" : "로그인 후 댓글을 쓸 수 있어요"} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
                    <button type="button" disabled={!user} onClick={() => submitComment(post.id)} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50">등록</button>
                  </div>
                </div>
              )}
            </article>
          ))}
          {visiblePosts.length === 0 && <p className="rounded-xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">{emptyText}</p>}
        </div>
      </div>
    </div>
  );
}

function EditForm({ categories, editForm, setEditForm, onCancel, onSave }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-300/20 dark:bg-emerald-300/10">
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input value={editForm.title} onChange={(event) => setEditForm((current) => ({ ...current, title: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
        <select value={editForm.category} onChange={(event) => setEditForm((current) => ({ ...current, category: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white">
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <textarea value={editForm.content} onChange={(event) => setEditForm((current) => ({ ...current, content: event.target.value }))} rows={4} className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
      <div className="mt-3 flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black dark:border-white/10 dark:bg-white/5">취소</button><button type="button" onClick={onSave} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-slate-950">저장</button></div>
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
