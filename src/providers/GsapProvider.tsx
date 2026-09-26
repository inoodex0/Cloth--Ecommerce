"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GsapContextValue = { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger };

const GsapContext = createContext<GsapContextValue | null>(null);

const gsapValue: GsapContextValue = { gsap, ScrollTrigger };

export function GsapProvider({ children }: { children: ReactNode }) {
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
    };
  }, [lenis]);

  return <GsapContext.Provider value={gsapValue}>{children}</GsapContext.Provider>;
}

export function useGsap() {
  const context = useContext(GsapContext);
  if (!context) throw new Error("useGsap must be used within a <GsapProvider>");
  return context;
}
