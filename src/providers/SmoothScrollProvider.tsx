"use client";

import "lenis/dist/lenis.css";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

function createLenisStore() {
  let instance: Lenis | null = null;
  const listeners = new Set<() => void>();

  return {
    get: () => instance,
    set(next: Lenis | null) {
      instance = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const SmoothScrollContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createLenisStore);

  const lenis = useSyncExternalStore(store.subscribe, store.get, () => null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    store.set(instance);

    let rafId = 0;
    const loop = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      store.set(null);
    };
  }, [store]);

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
