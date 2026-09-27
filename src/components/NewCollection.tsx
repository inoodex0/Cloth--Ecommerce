"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Product = {
  src: string;
  name: string;
  price: number;
  color: string;
};

const products: Product[] = [
  { src: "/images/women/m-1.jpg", name: "Womens Saree", price: 1550, color: "#dc2626" },
  { src: "/images/women/m-2.jpg", name: "Womens Saree", price: 1550, color: "#ec4899" },
  { src: "/images/women/m-3.jpg", name: "Womens Saree", price: 1550, color: "#e5e7eb" },
  { src: "/images/women/m-4.jpg", name: "Womens 2 Pcs Set – Regular Fit", price: 2890, color: "#f9a8d4" },
  { src: "/images/women/m-5.jpg", name: "Womens Ethnic – Regular Fit", price: 2690, color: "#dc2626" },
  { src: "/images/women/women.avif", name: "Womens Floral Kurti Set", price: 2490, color: "#fda4af" },
  { src: "/images/men/men.avif", name: "Mens Patterned Shirt – Regular Fit", price: 2190, color: "#12509b" },
  { src: "/images/men/w-1.jpg", name: "Mens Casual – Regular Fit", price: 1550, color: "#12509b" },
  { src: "/images/men/w-2.jpg", name: "Mens Everyday Shirt", price: 1750, color: "#1e3a8a" },
  { src: "/images/men/w-3.jpg", name: "Mens Winter Essential", price: 2290, color: "#71717a" },
  { src: "/images/men/w-4.jpg", name: "Mens Classic Fit", price: 1990, color: "#1f2937" },
];

export default function NewCollection() {
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
    <section className="w-full bg-[#eef1fa] px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          New Collection
        </h2>
        <Link
          href="/new-in"
          className="flex items-center gap-2 text-sm font-semibold text-[#12509b] transition-opacity hover:opacity-80 sm:text-base"
        >
          See More
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <Link
              key={product.src}
              href="/new-in"
              className="group flex w-52 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md sm:w-56"
            >
              <div className="relative">
                <span className="absolute left-0 top-0 z-10 rounded-br-lg bg-[#12509b] px-2.5 py-1 text-xs font-semibold text-white">
                  New
                </span>
                <div className="relative aspect-[3/4] bg-[#f5f5f2]">
                  <Image
                    src={product.src}
                    alt={product.name}
                    fill
                    sizes="(min-width: 640px) 224px, 208px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 p-4">
                <span className="text-lg font-extrabold text-zinc-900">
                  ৳ {product.price}
                </span>
                <span
                  aria-hidden
                  className="block h-3.5 w-3.5 rounded-md border border-black/10"
                  style={{ backgroundColor: product.color }}
                />
                <span className="min-h-[2.5rem] text-center text-sm leading-snug text-zinc-700">
                  {product.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous products"
          onClick={() => scrollBy(-1)}
          className="absolute -left-1 top-[42%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 shadow-sm transition-colors hover:bg-white hover:text-zinc-700 sm:-left-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next products"
          onClick={() => scrollBy(1)}
          className="absolute -right-1 top-[42%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 shadow-sm transition-colors hover:bg-white hover:text-zinc-700 sm:-right-2"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, page) => (
          <button
            key={page}
            type="button"
            aria-label={`Go to products page ${page + 1}`}
            onClick={() => goToPage(page)}
            className={`h-2.5 rounded-full transition-all ${
              page === activePage ? "w-6 bg-orange-400" : "w-2.5 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
