import type { Metadata } from "next";
import {
  Backpack,
  Clock,
  Gem,
  Glasses,
  HardHat,
  ShoppingBag,
  Smile,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessories — Loomora",
  description:
    "Loomora Accessories — bags, watches, jewellery, caps and more coming soon. Browse fashion while you wait.",
};

const accessoryTypes = [
  { icon: Backpack, label: "Bags & Backpacks" },
  { icon: Clock, label: "Watches" },
  { icon: Gem, label: "Jewellery" },
  { icon: HardHat, label: "Caps & Hats" },
  { icon: Glasses, label: "Sunglasses" },
  { icon: Wallet, label: "Wallets" },
  { icon: ShoppingBag, label: "Totes & Clutches" },
  { icon: Smile, label: "Scarves" },
];

export default function AccessoriesPage() {
  return (
    <div className="w-full bg-white">
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Accessories</span>
      </nav>

      <div className="px-4 pb-12">
        <div className="rounded-2xl bg-gradient-to-r from-[#e08245] to-[#c96a2e] px-6 py-10 text-white sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
            Accessories
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            The finishing touch — coming soon
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            Bags, watches, jewellery ar onek kichhu loading-e — launch hole
            ekhanei live pabe. Tab te fashion collection browse korte parben.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {accessoryTypes.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12509b]/10 text-[#12509b]">
                <item.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-zinc-800">
                {item.label}
              </span>
              <span className="rounded-full bg-[#f7f8fc] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e08245]">
                Coming Soon
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-[#f7f8fc] px-6 py-10 text-center">
          <h2 className="text-xl font-black text-zinc-900">
            Ochena hoile fashion dekhe nen
          </h2>
          <p className="max-w-xl text-sm text-zinc-600">
            Ekhoni shuru holo Loomora Fest70 — panjabi, saree, kurti, kids wear
            somaste heavy discount-e.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/festival-26"
              className="rounded-md bg-[#12509b] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Shop Fest70
            </Link>
            <Link
              href="/new-in"
              className="rounded-md border border-[#12509b] px-6 py-2.5 text-sm font-semibold text-[#12509b] transition-colors hover:bg-[#12509b] hover:text-white"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
