const STORAGE_KEY = "weekend-korea-market-community-v2";

// Storage boundary for the community feature.
// Replace these functions with Supabase/Firebase calls later without changing UI components.

function storageKey(boardId = "common") {
  return `${STORAGE_KEY}:${boardId}`;
}

export function loadCommunityPosts(defaultPosts, boardId = "common") {
  if (typeof window === "undefined") return defaultPosts;

  try {
    const raw = window.localStorage.getItem(storageKey(boardId));
    if (!raw) return defaultPosts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

export function saveCommunityPosts(posts, boardId = "common") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(boardId), JSON.stringify(posts));
}

export function createPostId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `post-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
