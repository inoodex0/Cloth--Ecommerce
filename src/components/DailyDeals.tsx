"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Deal = {
  src: string;
  name: string;
  price: number;
  oldPrice: number;
  color: string;
  available: number;
};

const deals: Deal[] = [
  {
    src: "/images/c-1.avif",
    name: "Rust Bomber Jacket",
    price: 2000,
    oldPrice: 2500,
    color: "#b45309",
    available: 91,
  },
  {
    src: "/images/c-3.avif",
    name: "Classic Denim Trucker Jacket",
    price: 2199,
    oldPrice: 2500,
    color: "#1e3a8a",
    available: 96,
  },
  {
    src: "/images/c-2.avif",
    name: "Everyday White Sweatshirt",
    price: 6000,
    oldPrice: 6900,
    color: "#f5f5f4",
    available: 4,
  },
  {
    src: "/images/c-7.avif",
    name: "Grey Cotton Tee",
    price: 2690,
    oldPrice: 3500,
    color: "#71717a",
    available: 99,
  },
  {
    src: "/images/c-10.avif",
    name: "Knit Cardigan Rose",
    price: 23590,
    oldPrice: 27400,
    color: "#fda4af",
    available: 5,
  },
  {
    src: "/images/c-8.avif",
    name: "Hoodie & Denim Combo Set",
    price: 1224,
    oldPrice: 1360,
    color: "#12509b",
    available: 17,
  },
  {
    src: "/images/c-6.avif",
    name: "Crimson Blazer Formal",
    price: 4500,
    oldPrice: 5200,
    color: "#dc2626",
    available: 12,
  },
  {
    src: "/images/c-9.avif",
    name: "Crisp White Shirt",
    price: 1750,
    oldPrice: 2100,
    color: "#ffffff",
    available: 64,
  },
];

function msUntilMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return end.getTime() - now.getTime();
}

function formatParts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return [
    String(Math.floor(total / 3600)).padStart(2, "0"),
    String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    String(total % 60).padStart(2, "0"),
  ];
}

function Countdown() {
  const [parts, setParts] = useState(() => formatParts(msUntilMidnight()));

  useEffect(() => {
    const update = () => setParts(formatParts(msUntilMidnight()));
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold tracking-wider text-white/90">
        ENDS IN
      </span>
      {parts.map((part, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && (
            <span className="text-lg font-bold text-white">:</span>
          )}
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-base font-bold text-[#4438b8] sm:h-10 sm:w-10">
            {part}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function DailyDeals() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      setPages(Math.max(1, Math.ceil(scroller.scrollWidth / scroller.clientWidth)));
      setActivePage(Math.round(scroller.scrollLeft / scroller.clientWidth));
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  const goToPage = (page: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: page * scroller.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 pb-6">
      <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#4438b8_0%,#554ac6_45%,#6a5bd6_100%)] px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0px,transparent_70px,rgba(255,255,255,0.05)_70px,rgba(255,255,255,0.05)_130px)]"
        />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Daily Deals
            </h2>
            <Countdown />
          </div>

          <Link
            href="/best-deals"
            className="flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-85 sm:text-base"
          >
            See More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mt-5">
          <div
            ref={scrollerRef}
            data-lenis-prevent
            className="flex gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {deals.map((deal) => (
              <Link
                key={deal.name}
                href="/best-deals"
                className="group flex w-52 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md sm:w-56"
              >
                <div className="relative">
                  <span className="absolute left-0 top-0 z-10 flex items-center gap-1 rounded-br-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                    Save ৳ {deal.oldPrice - deal.price}
                    <Zap className="h-3 w-3 fill-current" />
                  </span>
                  <div className="relative aspect-square bg-zinc-50">
                    <Image
                      src={deal.src}
                      alt={deal.name}
                      fill
                      sizes="(min-width: 640px) 224px, 208px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-3.5">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-xl font-extrabold text-zinc-900">
                      ৳ {deal.price}
                    </span>
                    <span className="text-sm font-semibold text-red-500 line-through">
                      ৳ {deal.oldPrice}
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="mx-auto block h-3.5 w-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: deal.color }}
                  />

                  <p className="line-clamp-2 min-h-[2.5rem] text-center text-sm leading-snug text-zinc-700">
                    {deal.name}
                  </p>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-full rounded-full bg-[#12509b]"
                      style={{ width: `${Math.min(100, deal.available)}%` }}
                    />
                  </div>

                  <p className="text-center text-sm text-zinc-600">
                    Available :{" "}
                    <span className="font-bold text-[#12509b]">
                      {deal.available}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous deals"
            onClick={() => scrollBy(-1)}
            className="absolute -left-1 top-[38%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/85 text-zinc-700 shadow-sm transition-colors hover:bg-white sm:-left-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next deals"
            onClick={() => scrollBy(1)}
            className="absolute -right-1 top-[38%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/85 text-zinc-700 shadow-sm transition-colors hover:bg-white sm:-right-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to deals page ${page + 1}`}
              onClick={() => goToPage(page)}
              className={`h-2.5 rounded-full transition-all ${
                page === activePage ? "w-6 bg-orange-400" : "w-2.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
