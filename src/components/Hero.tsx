"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type Slide = {
  src: string;
  title: string;
  href: string;
  kicker?: string;
  caption?: string;
};
const slides: Slide[] = [
  {
    src: "/hero/he-1.avif",
    kicker: "New Season",
    title: "fresh drops",
    caption: "Just landed — the latest styles to refresh your look",
    href: "/new-in",
  },
  {
    src: "/hero/he-2.avif",
    kicker: "Best Deals",
    title: "steal of a deal",
    caption: "Limited-time prices across the whole store",
    href: "/best-deals",
  },
  
  
  
 

];
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [paused]);
  return (
    <>
      <section className="grid w-full gap-4 px-4 py-4 lg:grid-cols-[1.7fr_1fr]">
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 lg:aspect-[1664/945]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={slideIndex === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 pb-14 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] sm:p-8 sm:pb-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90">
                {slide.kicker}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-2 hidden max-w-md text-sm text-white/90 sm:block sm:text-base">
                {slide.caption}
              </p>
              <Link
                href={slide.href}
                className="mt-4 inline-flex h-10 items-center rounded-full bg-[#12509b] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 [text-shadow:none]"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link
          href="/marketplace"
          className="group relative block h-36 overflow-hidden rounded-xl sm:h-44 lg:h-auto lg:flex-1"
        >
          <Image
            src="/images/c-2.avif"
            alt="Marketplace essentials"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5">
            <span className="text-2xl font-extrabold tracking-wide text-white sm:text-3xl">
              MARKETPLACE
            </span>
            <span className="mt-1 text-xs text-white/85 sm:text-sm">
              Everyday essentials, all in one place
            </span>
          </div>
        </Link>
        <Link
          href="/about"
          className="group relative flex h-36 items-center gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-r from-white to-sky-50 p-5 sm:h-44 lg:h-auto lg:flex-1"
        >
          <div className="min-w-0">
            <span className="block text-2xl font-extrabold text-[#12509b] sm:text-3xl">
              Loomora
            </span>
            <span className="mt-1 block text-sm font-medium text-zinc-600">
              Live Better Lifestyle
            </span>
            <span className="mt-2 block text-xs font-semibold text-[#12509b]">
              Shop the collection →
            </span>
          </div>
          <div className="relative hidden h-full flex-1 overflow-hidden rounded-lg sm:block">
            <Image
              src="/images/c-9.avif"
              alt="Loomora collection"
              fill
              sizes="200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <Link
          href="/new-in"
          className="group relative block h-36 overflow-hidden rounded-xl sm:h-44 lg:h-auto lg:flex-1"
        >
          <Image
            src="/images/c-1.avif"
            alt="Autumn verse collection"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-5">
            <span className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-orange-500 sm:text-3xl">
                autumn
              </span>
              <span className="font-serif text-xl italic text-amber-100 sm:text-2xl">
                verse
              </span>
            </span>
            <span className="mt-1 text-xs text-white/85 sm:text-sm">
              The season&apos;s biggest fashion drop
            </span>
          </div>
        </Link>
      </div>
      </section>
      <section className="w-full px-4 pb-6">
        <Link
          href="/accessories"
          aria-label="Sundry Blossom — Elevate Your Style"
          className="group block overflow-hidden rounded-xl bg-[#f0e6d9]"
        >
          <Image
            src="/images/lo-1.png"
            alt="Sundry Blossom — Elevate Your Style. Accessories for a brighter you."
            width={1664}
            height={945}
            sizes="100vw"
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      </section>
    </>
  );
}
