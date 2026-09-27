import type { Metadata } from "next";
import { categoryHref, popularCategories } from "@/lib/categories";
import { BadgePercent, Handshake, LineChart, PackageCheck, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marketplace — Loomora",
  description:
    "Loomora Marketplace — everyday essentials, all in one place. Shop curated categories or sell your brand to 500K+ buyers.",
};

const steps = [
  {
    icon: PackageCheck,
    title: "1. List Your Products",
    desc: "Photos, price ar details submit korun — hamra review kore 48 ghore live kore dibo.",
  },
  {
    icon: Wallet,
    title: "2. We Handle the Sale",
    desc: "Payment, packaging ar delivery sob Loomora sambhalbe — apnar kaj only product ready kora.",
  },
  {
    icon: LineChart,
    title: "3. Get Paid Weekly",
    desc: "Every Sunday settlement — bKash, Nagad ba bank e direct cash-out.",
  },
];

const reasons = [
  {
    icon: Handshake,
    title: "500K+ Ready Buyers",
    desc: "Loomora er existing customer base te apnar product directly dekha pabe.",
  },
  {
    icon: BadgePercent,
    title: "Zero Upfront Cost",
    desc: "Listing free. Commission only jokhon product bikri hoy — kono hidden charge nei.",
  },
  {
    icon: PackageCheck,
    title: "Nationwide Logistics",
    desc: "64 jelay courier network ready — apni product bondho rekhe dilei hobe.",
  },
];

export default function MarketplacePage() {
  return (
    <div className="w-full bg-white">
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Marketplace</span>
      </nav>

      <div className="px-4 pb-12">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0c3a75] to-[#12509b] px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Loomora Marketplace
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            Everyday essentials, all in one place.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Curated fashion theke local brands er products — shob ek ghorai.
            Kinte chan naki bechte chan, dutoi ekhii kaj kore.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/new-in"
              className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#12509b] transition-colors hover:bg-zinc-100"
            >
              Shop Now
            </Link>
            <Link
              href="/account"
              className="rounded-md border border-white/70 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Start Selling
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-10">
          <h2 className="text-2xl font-black text-zinc-900">
            Seller hote chan? 3 step e shuru
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-zinc-200 bg-white p-6"
              >
                <step.icon className="h-7 w-7 text-[#e08245]" />
                <h3 className="mt-3 text-base font-bold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why */}
        <div className="mt-10 rounded-2xl bg-[#f7f8fc] px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-black text-zinc-900">
            Ki paye ben Loomora te
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-xl bg-white p-5 border border-zinc-200">
                <reason.icon className="h-6 w-6 text-[#12509b]" />
                <h3 className="mt-3 text-sm font-bold text-zinc-900">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/account"
              className="inline-block rounded-md bg-[#12509b] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Create Seller Account
            </Link>
          </div>
        </div>

        {/* Popular categories */}
        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-zinc-900">
              Popular Categories
            </h2>
            <Link
              href="/new-in"
              className="text-sm font-semibold text-[#e08245] transition-colors hover:text-[#c96a2e]"
            >
              View All →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {popularCategories.slice(0, 5).map((category) => (
              <Link
                key={category.label}
                href={categoryHref(category.label)}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100"
              >
                <Image
                  src={category.src}
                  alt={category.label}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8 text-sm font-bold text-white">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
