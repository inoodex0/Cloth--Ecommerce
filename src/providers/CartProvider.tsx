"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  color: string;
  colorName?: string;
  src: string;
  size: string;
  qty: number;
};

export type AddToCartInput = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  color: string;
  colorName?: string;
  src: string;
  size?: string;
  qty?: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: AddToCartInput) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "loomora-cart";
const EMPTY: CartItem[] = [];

let state: CartItem[] = EMPTY;
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
      state = parsed;
      emit();
    }
  } catch {
    // corrupted storage — start empty
  }
}

function persist(next: CartItem[]) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked/full — cart still works in memory
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

function addItem(item: AddToCartInput) {
  const size = item.size ?? "FREE SIZE";
  const qty = item.qty ?? 1;
  const key = `${item.id}__${size}`;
  const existing = state.find((entry) => entry.key === key);

  if (existing) {
    persist(
      state.map((entry) =>
        entry.key === key ? { ...entry, qty: entry.qty + qty } : entry
      )
    );
    return;
  }

  persist([
    ...state,
    {
      key,
      id: item.id,
      name: item.name,
      price: item.price,
      oldPrice: item.oldPrice,
      color: item.color,
      colorName: item.colorName,
      src: item.src,
      size,
      qty,
    },
  ]);
}

function setQty(key: string, qty: number) {
  if (qty < 1) return;
  persist(
    state.map((entry) => (entry.key === key ? { ...entry, qty } : entry))
  );
}

function removeItem(key: string) {
  persist(state.filter((entry) => entry.key !== key));
}

function clear() {
  persist(EMPTY);
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, entry) => sum + entry.qty, 0);
    const subtotal = items.reduce(
      (sum, entry) => sum + entry.price * entry.qty,
      0
    );
    return { items, count, subtotal, addItem, setQty, removeItem, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
