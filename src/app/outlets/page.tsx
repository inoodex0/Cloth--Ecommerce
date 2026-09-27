import type { Metadata } from "next";
import { directionsUrl, outlets } from "@/lib/outlets";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Outlets — Loomora",
  description:
    "Visit a Loomora Lifestyle outlet near you — Dhaka, Chattogram and Sylhet. Addresses, phone numbers and opening hours.",
};

const comingSoon = [
  { name: "Kohat Bazar", city: "Dhaka" },
  { name: "Narayanganj", city: "Chattogram Road" },
  { name: "Rajshahi", city: "Shaheb Bazar" },
];

const stats = [
  { value: "06", label: "Outlets" },
  { value: "03", label: "Cities" },
  { value: "7", label: "Days Open" },
];

export default function OutletsPage() {
  return (
    <div className="w-full bg-white">
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Outlets</span>
      </nav>

      <div className="px-4 pb-14">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0c3a75] text-white">
          {/* decorative rings */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 top-10 h-52 w-52 rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:22px_22px] opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 left-0 select-none whitespace-nowrap text-[9rem] font-black leading-none text-white/[0.05] sm:text-[12rem]"
          >
            LOOMORA
          </div>

          <div className="relative px-6 py-10 sm:px-12 sm:py-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-xs">
              <MapPin className="h-3.5 w-3.5" />
              Store Locator
            </span>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.05] sm:text-6xl">
              Loomora Lifestyle{" "}
              <span className="text-[#f2a06b]">Outlet</span> Kilombo
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Product gulo hate dekhe, porhe try kore nin — live collection,
              exchange policy ar in-store styling help ek jaygay.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OUTLET CARDS */}
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e08245]">
              Hamader Outlets
            </p>
            <h2 className="mt-1 text-2xl font-black text-zinc-900 sm:text-3xl">
              Nikater outlet khujun
            </h2>
          </div>
          <span className="hidden text-sm text-zinc-500 sm:block">
            Sob outlet open daily — 10 AM theke 9 PM
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outlets.map((outlet, index) => (
            <div
              key={outlet.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#12509b] hover:shadow-xl"
            >
              {/* top accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#12509b] via-[#2a7ad4] to-[#e08245]" />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-serif text-3xl font-bold italic leading-none text-[#e08245]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-black text-zinc-900 transition-colors group-hover:text-[#12509b]">
                      {outlet.area}
                    </h3>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {outlet.name}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12509b]/10 text-[#12509b] transition-colors group-hover:bg-[#12509b] group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  {outlet.address}
                  <br />
                  <span className="font-medium text-zinc-800">
                    {outlet.city}
                  </span>
                </p>

                <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-zinc-200 pt-4 text-sm">
                  <span className="flex items-center gap-2.5 text-zinc-700">
                    <Clock className="h-4 w-4 text-[#12509b]" />
                    {outlet.hours}
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Open Daily
                    </span>
                  </span>
                  <a
                    href={`tel:${outlet.phone.replace(/-/g, "")}`}
                    className="flex items-center gap-2.5 text-zinc-700 transition-colors hover:text-[#12509b]"
                  >
                    <Phone className="h-4 w-4 text-[#12509b]" />
                    {outlet.phone}
                  </a>
                </div>

                <div className="mt-5 flex gap-2.5 pt-1">
                  <a
                    href={directionsUrl(outlet)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#12509b] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0c3a75]"
                  >
                    <Navigation className="h-4 w-4" />
                    Directions
                  </a>
                  <a
                    href={`tel:${outlet.phone.replace(/-/g, "")}`}
                    aria-label={`Call ${outlet.area} outlet`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-zinc-500 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMING SOON */}
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-300 bg-[#f7f8fc] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e08245]">
                Coming Soon
              </p>
              <h2 className="mt-1 text-xl font-black text-zinc-900 sm:text-2xl">
                Notun outlet khule asche
              </h2>
            </div>
            <p className="text-sm text-zinc-500">
              Launch updates chan?{" "}
              <a
                href="tel:01712345678"
                className="font-semibold text-[#12509b] underline"
              >
                01712-345678
              </a>{" "}
              e call korun.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {comingSoon.map((place) => (
              <div
                key={place.name}
                className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-800">
                    {place.name}
                  </p>
                  <p className="text-xs text-zinc-500">{place.city}</p>
                </div>
                <span className="ml-auto rounded-full bg-[#e08245]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c96a2e]">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-[#12509b] px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-black sm:text-3xl">
            Visit korte chan — Convenience Stores o ache
          </h2>
          <p className="max-w-xl text-sm text-white/80">
            Same product, same price — 150+ partner convenience store e Loomora
            collection dekhte paben.
          </p>
          <Link
            href="/stores"
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#12509b] transition-colors hover:bg-zinc-100"
          >
            View Store Locations
          </Link>
        </div>
      </div>
    </div>
  );
}
