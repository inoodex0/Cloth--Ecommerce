"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const tiles = [
  { src: "/images/men/men.avif", label: "Men's Collection", href: "/men" },
  { src: "/images/women/women.avif", label: "Women's Collection", href: "/women" },
  { src: "/images/c-4.avif", label: "New Arrivals", href: "/new-in" },
  { src: "/images/c-5.avif", label: "Winter Wear", href: "/festival-26" },
];

export default function ExclusiveCollection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full px-4 pb-6">
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <Link
          href="/new-in"
          className="group relative block overflow-hidden rounded-xl bg-zinc-900"
        >
          <video
            ref={videoRef}
            src="/videos/cloth.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-center text-3xl font-extrabold uppercase tracking-wide text-white [text-shadow:0_2px_0_#12509b,0_4px_18px_rgba(0,0,0,0.45)] sm:text-5xl">
              Exclusive Collection
            </span>
          </div>
        </Link>

        <Link
          href="/accessories"
          className="group relative block min-h-[220px] overflow-hidden rounded-xl bg-zinc-100 lg:min-h-0"
        >
          <Image
            src="/images/d2564bd445814318be5042912c53d7ea.avif"
            alt="Sundry Blossom — Elevate Your Style"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative block overflow-hidden rounded-xl bg-zinc-100"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 pt-10 text-sm font-semibold text-white">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
