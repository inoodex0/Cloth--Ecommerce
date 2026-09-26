"use client";

import { categoryHref, popularCategories } from "@/lib/categories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

function animateScroll(scroller: HTMLDivElement, target: number, duration = 700) {
  const start = scroller.scrollLeft;
  const delta = target - start;
  if (delta === 0) return;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    scroller.scrollLeft = start + delta * eased;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function PopularCategories() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollOne = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("a");
    const step = (card ? card.offsetWidth : 200) + 20;
    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const target = Math.min(
      max,
      Math.max(0, scroller.scrollLeft + direction * step)
    );
    animateScroll(scroller, target);
  };

  return (
    <section className="w-full px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          Popular Categories
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollOne(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollOne(1)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        data-lenis-prevent
        className="flex gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {popularCategories.map((category) => (
          <Link
            key={category.label}
            href={categoryHref(category.label)}
            className="group/item flex w-36 shrink-0 flex-col items-center gap-3 sm:w-40"
          >
            <span className="relative block h-36 w-36 overflow-hidden rounded-full border border-zinc-100 bg-zinc-50 sm:h-40 sm:w-40">
              <Image
                src={category.src}
                alt={category.label}
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover/item:scale-105"
              />
            </span>
            <span className="text-center text-sm font-medium leading-snug text-zinc-800 sm:text-base">
              {category.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
