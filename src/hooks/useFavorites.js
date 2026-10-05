import { useSyncExternalStore } from 'react';

const KEY = 'horizon_favorites';
const listeners = new Set();
const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};
let cache = read();

export function toggleFavorite(id) {
  const cur = read();
  localStorage.setItem(KEY, JSON.stringify(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  cache = read();
  listeners.forEach((l) => l());
}

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
export const useFavorites = () => useSyncExternalStore(subscribe, () => cache);
