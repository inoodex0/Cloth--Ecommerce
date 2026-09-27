import { OutletGrid } from "@/components/OutletGrid";
import type { Metadata } from "next";
import { BadgeCheck, Ruler, Shirt } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Store Locations — Loomora",
  description:
    "Find every Loomora store — addresses, opening hours and in-store services across Bangladesh.",
};

const services = [
  {
    icon: Ruler,
    title: "Free Alteration",
    desc: "Kinte gele length/fit issue? Basic alteration store e free.",
  },
  {
    icon: BadgeCheck,
    title: "Easy Exchange",
    desc: "7 din er moddhe bill sahit original outlet e exchange.",
  },
  {
    icon: Shirt,
    title: "Styling Help",
    desc: "Ready-made outfit match kore dewa in-store styling assist.",
  },
];

export default function StoresPage() {
  return (
    <div className="w-full bg-white">
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Store Locations</span>
      </nav>

      <div className="px-4 pb-12">
        <div className="rounded-2xl border border-zinc-200 bg-[#f7f8fc] px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e08245]">
            Store Locator
          </p>
          <h1 className="mt-2 text-3xl font-black text-zinc-900 sm:text-4xl">
            Store Locations
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Dhaka, Chattogram ar Sylhet e Loomora er 6 ta store — sob ekoi
            jagai online price, in-store availability ar same return policy.
          </p>
        </div>

        <div className="mt-8">
          <OutletGrid />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <service.icon className="h-6 w-6 text-[#12509b]" />
              <h2 className="mt-3 text-sm font-bold text-zinc-900">
                {service.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
