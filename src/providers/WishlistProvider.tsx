"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type WishlistContextValue = {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const STORAGE_KEY = "loomora-wishlist";
const EMPTY: string[] = [];

let state: string[] = EMPTY;
let storageLoaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function loadFromStorage() {
  if (storageLoaded) return;
  storageLoaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      state = parsed.filter((entry): entry is string => typeof entry === "string");
      emit();
    }
  } catch {
    // corrupted storage — start empty
  }
}

function persist(next: string[]) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked/full — wishlist still works in memory
  }
  emit();
}

function subscribe(listener: () => void) {
  loadFromStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function toggle(id: string) {
  persist(
    state.includes(id)
      ? state.filter((entry) => entry !== id)
      : [...state, id]
  );
}

function remove(id: string) {
  persist(state.filter((entry) => entry !== id));
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const ids = useSyncExternalStore(subscribe, () => state, () => EMPTY);

  const value = useMemo<WishlistContextValue>(
    () => ({
      ids,
      count: ids.length,
      has: (id: string) => ids.includes(id),
      toggle,
      remove,
    }),
    [ids]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
}
