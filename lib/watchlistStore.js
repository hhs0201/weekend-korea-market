const STORAGE_KEY = "weekend-korea-market-watchlist-v1";

function keyForUser(userId) {
  return `${STORAGE_KEY}:${userId || "guest"}`;
}

export function loadWatchlist(userId) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(keyForUser(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(userId, tickers) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(keyForUser(userId), JSON.stringify(tickers));
}

// Future Supabase replacement:
// - select tickers from user_watchlists where user_id = auth.uid()
// - upsert/delete rows when toggling 관심
// The component API can stay the same: load by user id, save by user id.
