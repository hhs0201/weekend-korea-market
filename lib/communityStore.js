const STORAGE_KEY = "weekend-korea-market-community-v1";

// Storage boundary for the community feature.
// Replace these functions with Supabase/Firebase calls later without changing UI components.

export function loadCommunityPosts(defaultPosts) {
  if (typeof window === "undefined") return defaultPosts;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPosts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultPosts;
  } catch {
    return defaultPosts;
  }
}

export function saveCommunityPosts(posts) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function createPostId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `post-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
