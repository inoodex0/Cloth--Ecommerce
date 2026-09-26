import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Men — Loomora",
};

export default function MenPage() {
  return (
    <div className="flex flex-1 flex-col bg-white font-sans">
      <section className="w-full px-4 py-6">
        <div className="grid items-stretch gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="/images/men/men.avif"
              alt="Men's collection"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-xl bg-gradient-to-br from-white to-sky-50 p-6 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#12509b]">
              New Season
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
              Men&apos;s Collection
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base">
              Crisp shirts, relaxed trousers and everyday essentials — built for
              the way you move.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/new-in"
                className="inline-flex h-10 items-center rounded-full bg-[#12509b] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Shop New In
              </Link>
              <Link
                href="/best-deals"
                className="inline-flex h-10 items-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#12509b] hover:text-[#12509b]"
              >
                Best Deals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
