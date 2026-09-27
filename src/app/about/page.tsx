import type { Metadata } from "next";
import { Heart, Leaf, RefreshCcw, Truck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Loomora",
  description:
    "Loomora Lifestyle — quality fashion for men, women and kids at honest prices, delivered across Bangladesh since 2020.",
};

const stats = [
  { value: "500K+", label: "Happy Customers" },
  { value: "32+", label: "Curated Styles" },
  { value: "6", label: "Retail Outlets" },
  { value: "64", label: "Districts Delivered" },
];

const values = [
  {
    icon: Heart,
    title: "Quality First",
    desc: "Fabric theke stitching — sob kichhu hand-picked, pora pori QC pass na hole product list-e ashe na.",
  },
  {
    icon: Leaf,
    title: "Honest Pricing",
    desc: "Middleman khali. Factory theke directly store/load — tai premium quality accessible daame.",
  },
  {
    icon: Truck,
    title: "Delivery Nationwide",
    desc: "Dhaka te 2–3 din, all over Bangladesh te 5–7 din. Cash on delivery sob jelay available.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Exchange",
    desc: "Size na mile? Bill sahit 7 din er moddhe outlet ba through courier exchange korte parben.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">About Us</span>
      </nav>

      <div className="px-4 pb-12">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-[#12509b] via-[#1a5fb4] to-[#0c3a75] px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Since 2020
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            Fashion je support kore everyday life — that&apos;s Loomora.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Ekta chotto online store theke shuru — ekhon full lifestyle brand:
            menswear, womenswear, kids, accessories — quality fabric, fair
            price, ar delivery porjonto sob kichhu.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-6 text-center"
            >
              <p className="text-3xl font-black text-[#12509b]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-zinc-900">
              Amader Golpo
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
              <p>
                2020 e Dhaka er ekta chotto bhara-khana theke Loomora shuru
                hoyechilo — kew thik daame bhalo kapor paben, eta niyei kaj
                cholechilo. Prothom din theke ekta jinis fixed: quality na
                mille, product list-e rakhi na.
              </p>
              <p>
                Aj customer ra janena shudu — 6 ta outlet, 64 jelay delivery,
                ar online e 32+ curated styles. Jodi experience, trend ar
                affordability ek sathe chai — Loomora sei jayga.
              </p>
              <p>
                Porechi: premium fabric friendly daame, size guide clearly
                lekha, ar after-sales support — karon ekbarer kena na, lifetime
                er relationship chai.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-zinc-900">
              Amader Values
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-zinc-200 bg-[#f7f8fc] p-5"
                >
                  <value.icon className="h-6 w-6 text-[#12509b]" />
                  <h3 className="mt-3 text-sm font-bold text-zinc-900">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-[#f7f8fc] px-6 py-10 text-center">
          <h2 className="text-2xl font-black text-zinc-900">
            Ready to explore?
          </h2>
          <p className="max-w-xl text-sm text-zinc-600">
            Notun collection, campaign offer ar festival deals ek jaygatei
            dekhe nin.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/new-in"
              className="rounded-md bg-[#12509b] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Shop New In
            </Link>
            <Link
              href="/outlets"
              className="rounded-md border border-[#12509b] px-6 py-2.5 text-sm font-semibold text-[#12509b] transition-colors hover:bg-[#12509b] hover:text-white"
            >
              Visit an Outlet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
