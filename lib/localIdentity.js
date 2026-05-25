const AUTHOR_KEY = "weekend-korea-market-author-v1";

export function getLocalAuthor() {
  if (typeof window === "undefined") {
    return { id: "server", name: "투자자" };
  }

  const saved = window.localStorage.getItem(AUTHOR_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.id) return parsed;
    } catch {
      // Fall through and create a new local author.
    }
  }

  const id = `local-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
  const author = { id, name: "익명 투자자" };
  window.localStorage.setItem(AUTHOR_KEY, JSON.stringify(author));
  return author;
}

export function saveLocalAuthorName(name) {
  const author = { ...getLocalAuthor(), name: name || "익명 투자자" };
  window.localStorage.setItem(AUTHOR_KEY, JSON.stringify(author));
  return author;
}
