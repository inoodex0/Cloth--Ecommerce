import { ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";

export type CollectionCard = {
  image: string;
  label: string;
  sub: string;
  href: string;
};

export type DealOffer = { id: string; oldPrice: number };

const sidebarLinks = [
  { label: "Men's Collection", href: "/men" },
  { label: "Women's Collection", href: "/women" },
  { label: "Kid's Collection", href: "/kids" },
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
      className="group relative block overflow-hidden rounded-2xl bg-zinc-100 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative w-full ${size === "lg" ? "aspect-square max-h-80" : "aspect-[4/3] max-h-64"}`}
      >
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes={
            size === "lg"
              ? "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
              : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
          }
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <p className="text-base font-bold text-white sm:text-lg">
            {card.label}
          </p>
          <p className="mt-0.5 text-xs font-medium text-white/80">
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
      className="group relative flex min-h-44 overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-[#12509b] hover:shadow-md"
    >
      {hasDiscount && (
        <span className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
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
          <span className="text-lg font-extrabold text-zinc-900">
            ৳ {product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm font-medium text-red-500 line-through">
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
  eyebrow: string;
  title: string;
  off: string;
  note: string;
  gradient: string;
  cards: CollectionCard[];
  spotlights: CollectionCard[];
  dealTitle: string;
  dealHref: string;
  deals: DealOffer[];
};

export default function CampaignPage({
  eyebrow,
  title,
  off,
  note,
  gradient,
  cards,
  spotlights,
  dealTitle,
  dealHref,
  deals,
}: CampaignPageProps) {
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

        {/* Campaign Banner */}
        <div
          className={`relative overflow-hidden rounded-2xl ${gradient} px-6 py-6 text-white sm:px-8 sm:py-7`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[7rem] font-black leading-none text-white/10 sm:block"
          >
            %
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
                {eyebrow}
              </span>
              <h1 className="mt-1.5 text-3xl font-black tracking-tight sm:text-4xl">
                {title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black text-[#12509b] sm:text-sm">
                {off}
              </span>
              <span className="rounded-full border border-white/60 px-4 py-1.5 text-xs font-semibold text-white/90 sm:text-sm">
                {note}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar + Collections */}
        <div className="flex gap-6 py-7">
          <aside className="hidden w-44 shrink-0 lg:block">
            <nav className="sticky top-32 space-y-3.5 border-r border-zinc-100 pr-4">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-serif text-base text-[#e08245] transition-colors hover:text-[#c96a2e] hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <CollectionTile key={card.label} card={card} size="lg" />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {spotlights.map((card) => (
                <CollectionTile key={card.label} card={card} size="sm" />
              ))}
            </div>

            {/* Festival Deals */}
            <section>
              <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
                  {dealTitle}
                </h2>
                <Link
                  href={dealHref}
                  className="flex items-center gap-1.5 text-sm font-bold text-[#12509b] transition-opacity hover:opacity-80 sm:text-base"
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
