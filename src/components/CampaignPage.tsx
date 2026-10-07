"use client";

import { ArrowRight, ChevronDown, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/lib/catalog";

export type CollectionCard = {
  image: string;
  label: string;
  sub: string;
  href: string;
};

export type DealOffer = { id: string; oldPrice: number };

const sidebarLinks = [
  { label: "Mens Collection", href: "/men" },
  { label: "Womens Collection", href: "/women" },
  { label: "Kids Collection", href: "/kids" },
  { label: "Others Collection", href: "/new-in" },
];

function CollectionTile({
  card,
  size,
}: {
  card: CollectionCard;
  size: "lg" | "sm";
}) {
  return (
    <Link
      href={card.href}
      className="group relative block overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`relative w-full ${size === "lg" ? "aspect-[4/3] max-h-80" : "aspect-[16/10] max-h-64"}`}
      >
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute right-3.5 top-3.5 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-zinc-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="text-lg font-black tracking-tight text-white sm:text-xl">
            {card.label}
          </p>
          <p className="mt-1 text-xs font-medium text-white/80 sm:text-sm">
            {card.sub}
          </p>
        </div>
      </div>
    </Link>
  );
}

function DealCard({ id, oldPrice }: DealOffer) {
  const product = getProduct(id);
  if (!product) return null;

  const save = oldPrice - product.price;
  const hasDiscount = save > 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex min-h-44 overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#12509b]/40 hover:shadow-lg"
    >
      {hasDiscount && (
        <span className="absolute left-0 top-0 z-10 rounded-br-lg bg-gradient-to-r from-red-600 to-red-500 px-3 py-1.5 text-[11px] font-black text-white shadow-sm">
          Save ৳ {save.toLocaleString()}
        </span>
      )}

      <div className="relative w-2/5 shrink-0 bg-zinc-100">
        <Image
          src={product.src}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-1 items-center justify-center bg-slate-400/70 py-1.5 opacity-0 backdrop-blur-xs transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12509b] text-white">
            <Eye className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-black text-zinc-900">
            ৳ {product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm font-semibold text-red-500 line-through">
              ৳ {oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <span
          aria-hidden
          className="h-3.5 w-3.5 rounded-sm border border-black/15 shadow-inner"
          style={{ backgroundColor: product.color }}
        />

        <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-700 transition-colors group-hover:text-[#12509b]">
          {product.name}
        </p>
      </div>
    </Link>
  );
}

type CampaignPageProps = {
  eyebrow?: string;
  title: string;
  off?: string;
  note?: string;
  gradient?: string;
  cards: CollectionCard[];
  spotlights: CollectionCard[];
  dealTitle: string;
  dealHref: string;
  deals: DealOffer[];
};

export default function CampaignPage({
  title,
  cards,
  spotlights,
  dealTitle,
  dealHref,
  deals,
}: CampaignPageProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full bg-white">
      <div className="px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 py-4 text-sm text-zinc-500">
          <Link href="/" className="transition-colors hover:text-[#12509b]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-zinc-800">{title}</span>
        </nav>

        {/* Sidebar + Collections */}
        <div className="flex gap-6 py-8">
          <aside className="hidden w-52 shrink-0 lg:block">
            <nav className="sticky top-32 py-2">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-zinc-600"
                aria-expanded={open}
              >
                Collections
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 ${open ? "mt-5 max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
              >
                {sidebarLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block py-2.5 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-[#c17a5a] transition-colors hover:text-[#a85f3f]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 flex-1 space-y-6">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-[#e08245]" />
                <h2 className="text-xl font-black tracking-tight text-zinc-900 sm:text-2xl">
                  Shop by Category
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <CollectionTile key={card.label} card={card} size="lg" />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded-full bg-[#12509b]" />
                <h2 className="text-xl font-black tracking-tight text-zinc-900 sm:text-2xl">
                  Festive Spotlight
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {spotlights.map((card) => (
                  <CollectionTile key={card.label} card={card} size="sm" />
                ))}
              </div>
            </div>

            {/* Festival Deals */}
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-1.5 rounded-full bg-red-500" />
                  <h2 className="text-xl font-black tracking-tight text-zinc-900 sm:text-2xl">
                    {dealTitle}
                  </h2>
                </div>
                <Link
                  href={dealHref}
                  className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-[#12509b] transition-all hover:border-[#12509b] hover:shadow-sm sm:text-base"
                >
                  See More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {deals.map((deal) => (
                  <DealCard key={deal.id} {...deal} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
