import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Pencil, Send, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useAuth } from "../app/providers";
import { createPostId, loadCommunityPosts, saveCommunityPosts } from "../lib/communityStore";
import { getLocalAuthor } from "../lib/localIdentity";

export default function CommunityBoard({
  boardId,
  categories,
  defaultPosts,
  emptyText = "아직 작성된 글이 없습니다.",
  lockedText = "로그인하면 글 작성과 댓글 참여가 가능해요."
}) {
  const { user } = useAuth();
  const [localAuthor, setLocalAuthor] = useState({ id: "", name: "익명 투자자" });
  const [posts, setPosts] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [openPostId, setOpenPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: categories[0] });
  const [editForm, setEditForm] = useState({ title: "", content: "", category: categories[0] });
  const [commentDrafts, setCommentDrafts] = useState({});
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    setLocalAuthor(getLocalAuthor());
  }, []);

  useEffect(() => {
    setPosts(loadCommunityPosts(defaultPosts, boardId).map((post) => normalizePost(post, categories[0])));
    setHydrated(true);
  }, [boardId, categories, defaultPosts]);

  useEffect(() => {
    if (hydrated) saveCommunityPosts(posts, boardId);
  }, [boardId, hydrated, posts]);

  const currentAuthorId = user?.id || localAuthor.id;
  const currentAuthorName = user?.user_metadata?.name || user?.email?.split("@")[0] || localAuthor.name || "익명 투자자";
  const canWrite = Boolean(currentAuthorId);

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

  const submitPost = (event) => {
    event.preventDefault();
    if (!canWrite) return;
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    const newPost = {
      id: createPostId(),
      title,
      content,
      category: form.category,
      likes: 0,
      dislikes: 0,
      reaction: null,
      authorId: currentAuthorId,
      author: currentAuthorName,
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
    if (!window.confirm("이 글을 삭제할까요?")) return;
    setPosts((current) => current.filter((post) => post.id !== postId));
    if (openPostId === postId) setOpenPostId(null);
  };

  const reactToPost = (postId, nextReaction) => {
    setPosts((current) => current.map((post) => {
      if (post.id !== postId) return post;
      return applyReaction(post, nextReaction);
    }));
  };

  const submitComment = (postId) => {
    if (!canWrite) return;
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: [
        {
          id: createPostId(),
          text,
          authorId: currentAuthorId,
          author: currentAuthorName,
          likes: 0,
          dislikes: 0,
          reaction: null,
          replies: [],
          createdAt: Date.now()
        },
        ...post.comments
      ]
    } : post));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const submitReply = (postId, commentId) => {
    if (!canWrite) return;
    const key = `${postId}:${commentId}`;
    const text = (replyDrafts[key] || "").trim();
    if (!text) return;

    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.map((comment) => comment.id === commentId ? {
        ...comment,
        replies: [
          {
            id: createPostId(),
            text,
            authorId: currentAuthorId,
            author: currentAuthorName,
            likes: 0,
            dislikes: 0,
            reaction: null,
            createdAt: Date.now()
          },
          ...(comment.replies || [])
        ]
      } : comment)
    } : post));
    setReplyDrafts((current) => ({ ...current, [key]: "" }));
    setReplyingTo(null);
  };

  const reactToComment = (postId, commentId, nextReaction) => {
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.map((comment) => comment.id === commentId ? applyReaction(comment, nextReaction) : comment)
    } : post));
  };

  const reactToReply = (postId, commentId, replyId, nextReaction) => {
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.map((comment) => comment.id === commentId ? {
        ...comment,
        replies: (comment.replies || []).map((reply) => reply.id === replyId ? applyReaction(reply, nextReaction) : reply)
      } : comment)
    } : post));
  };

  const deleteComment = (postId, commentId) => {
    if (!window.confirm("이 댓글을 삭제할까요?")) return;
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId)
    } : post));
  };

  const deleteReply = (postId, commentId, replyId) => {
    if (!window.confirm("이 답글을 삭제할까요?")) return;
    setPosts((current) => current.map((post) => post.id === postId ? {
      ...post,
      comments: post.comments.map((comment) => comment.id === commentId ? {
        ...comment,
        replies: (comment.replies || []).filter((reply) => reply.id !== replyId)
      } : comment)
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
          {!canWrite && <div className="mb-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 dark:bg-amber-300/10 dark:text-amber-100">{lockedText}</div>}
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <input disabled={!canWrite} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="제목을 입력하세요" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
            <select disabled={!canWrite} value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white">
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <textarea disabled={!canWrite} value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="시장 분위기와 투자 의견을 남겨보세요" rows={4} className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
          <div className="mt-3 flex justify-end">
            <button disabled={!canWrite} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:opacity-50 dark:bg-white dark:text-slate-950"><Send className="h-4 w-4" />작성</button>
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
          {visiblePosts.map((post) => {
            const isPostAuthor = post.authorId === currentAuthorId;
            return (
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
                      <ReactionButton type="like" active={post.reaction === "like"} count={post.likes} onClick={() => reactToPost(post.id, "like")} />
                      <ReactionButton type="dislike" active={post.reaction === "dislike"} count={post.dislikes || 0} onClick={() => reactToPost(post.id, "dislike")} />
                      <button type="button" onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className="inline-flex items-center gap-1 font-bold"><MessageCircle className="h-4 w-4" />{countComments(post)}</button>
                      {isPostAuthor && <button type="button" onClick={() => startEdit(post)} className="inline-flex items-center gap-1 font-bold"><Pencil className="h-4 w-4" />수정</button>}
                      {isPostAuthor && <button type="button" onClick={() => deletePost(post.id)} className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-200"><Trash2 className="h-4 w-4" />삭제</button>}
                    </div>
                  </>
                )}

                {openPostId === post.id && editingPostId !== post.id && (
                  <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{post.content}</p>
                    <CommentThread
                      post={post}
                      currentAuthorId={currentAuthorId}
                      canWrite={canWrite}
                      commentDraft={commentDrafts[post.id] || ""}
                      setCommentDraft={(value) => setCommentDrafts((current) => ({ ...current, [post.id]: value }))}
                      replyDrafts={replyDrafts}
                      setReplyDrafts={setReplyDrafts}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo}
                      onSubmitComment={() => submitComment(post.id)}
                      onSubmitReply={(commentId) => submitReply(post.id, commentId)}
                      onReactComment={(commentId, reaction) => reactToComment(post.id, commentId, reaction)}
                      onReactReply={(commentId, replyId, reaction) => reactToReply(post.id, commentId, replyId, reaction)}
                      onDeleteComment={(commentId) => deleteComment(post.id, commentId)}
                      onDeleteReply={(commentId, replyId) => deleteReply(post.id, commentId, replyId)}
                    />
                  </div>
                )}
              </article>
            );
          })}
          {visiblePosts.length === 0 && <EmptyState text={emptyText} />}
        </div>
      </div>
    </div>
  );
}

function ReactionButton({ active, count, onClick, type }) {
  const Icon = type === "like" ? ThumbsUp : ThumbsDown;
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center gap-1 font-bold ${active ? (type === "like" ? "text-emerald-700 dark:text-emerald-200" : "text-rose-600 dark:text-rose-200") : ""}`}>
      <Icon className="h-4 w-4" />
      {count}
    </button>
  );
}

function CommentThread({
  post,
  currentAuthorId,
  canWrite,
  commentDraft,
  setCommentDraft,
  replyDrafts,
  setReplyDrafts,
  replyingTo,
  setReplyingTo,
  onSubmitComment,
  onSubmitReply,
  onReactComment,
  onReactReply,
  onDeleteComment,
  onDeleteReply
}) {
  const comments = [...post.comments].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="mt-4">
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">아직 댓글이 없습니다. 첫 의견을 남겨보세요.</p>
        ) : comments.map((comment) => {
          const replyKey = `${post.id}:${comment.id}`;
          const replies = [...(comment.replies || [])].sort((a, b) => b.createdAt - a.createdAt);
          const isCommentAuthor = comment.authorId === currentAuthorId;

          return (
            <div key={comment.id} className="rounded-xl bg-slate-100 px-3 py-3 text-sm leading-6 dark:bg-white/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-950 dark:text-white">{comment.author}</p>
                  <p>{comment.text}</p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatTime(comment.createdAt)}</span>
                </div>
                {isCommentAuthor && <button type="button" onClick={() => onDeleteComment(comment.id)} className="shrink-0 text-xs font-black text-rose-600 dark:text-rose-200">삭제</button>}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-black text-slate-500 dark:text-slate-400">
                <ReactionButton type="like" active={comment.reaction === "like"} count={comment.likes} onClick={() => onReactComment(comment.id, "like")} />
                <ReactionButton type="dislike" active={comment.reaction === "dislike"} count={comment.dislikes || 0} onClick={() => onReactComment(comment.id, "dislike")} />
                <button type="button" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>답글</button>
              </div>

              {replyingTo === comment.id && (
                <div className="mt-3 flex gap-2">
                  <input disabled={!canWrite} value={replyDrafts[replyKey] || ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [replyKey]: event.target.value }))} placeholder={canWrite ? "답글을 입력하세요" : "로그인 후 답글을 쓸 수 있어요"} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
                  <button type="button" disabled={!canWrite} onClick={() => onSubmitReply(comment.id)} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50">등록</button>
                </div>
              )}

              {replies.length > 0 && (
                <div className="mt-3 space-y-2 border-l-2 border-emerald-200 pl-3 dark:border-emerald-300/30">
                  {replies.map((reply) => {
                    const isReplyAuthor = reply.authorId === currentAuthorId;
                    return (
                      <div key={reply.id} className="rounded-xl bg-white/80 px-3 py-2 dark:bg-slate-950/40">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold">{reply.author}</p>
                            <p>{reply.text}</p>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{formatTime(reply.createdAt)}</span>
                          </div>
                          {isReplyAuthor && <button type="button" onClick={() => onDeleteReply(comment.id, reply.id)} className="shrink-0 text-xs font-black text-rose-600 dark:text-rose-200">삭제</button>}
                        </div>
                        <div className="mt-2 flex gap-3 text-xs font-black text-slate-500 dark:text-slate-400">
                          <ReactionButton type="like" active={reply.reaction === "like"} count={reply.likes} onClick={() => onReactReply(comment.id, reply.id, "like")} />
                          <ReactionButton type="dislike" active={reply.reaction === "dislike"} count={reply.dislikes || 0} onClick={() => onReactReply(comment.id, reply.id, "dislike")} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <input disabled={!canWrite} value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSubmitComment(); }} placeholder={canWrite ? "댓글을 입력하세요" : "로그인 후 댓글을 쓸 수 있어요"} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400 disabled:opacity-60 dark:border-white/10 dark:bg-slate-950/60 dark:text-white" />
        <button type="button" disabled={!canWrite} onClick={onSubmitComment} className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50">등록</button>
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

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center dark:border-white/15 dark:bg-white/5">
      <p className="text-lg font-black text-slate-800 dark:text-white">아직 작성된 글이 없습니다</p>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
}

function applyReaction(item, nextReaction) {
  const current = item.reaction || null;
  let likes = item.likes || 0;
  let dislikes = item.dislikes || 0;

  if (current === nextReaction) {
    if (nextReaction === "like") likes = Math.max(0, likes - 1);
    if (nextReaction === "dislike") dislikes = Math.max(0, dislikes - 1);
    return { ...item, likes, dislikes, reaction: null };
  }

  if (current === "like") likes = Math.max(0, likes - 1);
  if (current === "dislike") dislikes = Math.max(0, dislikes - 1);
  if (nextReaction === "like") likes += 1;
  if (nextReaction === "dislike") dislikes += 1;

  return { ...item, likes, dislikes, reaction: nextReaction };
}

function normalizePost(post, fallbackCategory) {
  const comments = Array.isArray(post.comments) ? post.comments : [];
  return {
    ...post,
    category: post.category || fallbackCategory,
    likes: post.likes || 0,
    dislikes: post.dislikes || 0,
    reaction: post.reaction || null,
    authorId: post.authorId || "legacy-author",
    author: post.author || "익명 투자자",
    comments: comments.map(normalizeComment),
    createdAt: post.createdAt || Date.now(),
    updatedAt: post.updatedAt || null
  };
}

function normalizeComment(comment) {
  return {
    ...comment,
    likes: comment.likes || 0,
    dislikes: comment.dislikes || 0,
    reaction: comment.reaction || null,
    authorId: comment.authorId || "legacy-author",
    author: comment.author || "익명 투자자",
    replies: Array.isArray(comment.replies) ? comment.replies.map(normalizeReply) : [],
    createdAt: comment.createdAt || Date.now()
  };
}

function normalizeReply(reply) {
  return {
    ...reply,
    likes: reply.likes || 0,
    dislikes: reply.dislikes || 0,
    reaction: reply.reaction || null,
    authorId: reply.authorId || "legacy-author",
    author: reply.author || "익명 투자자",
    createdAt: reply.createdAt || Date.now()
  };
}

function countComments(post) {
  return post.comments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0);
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
