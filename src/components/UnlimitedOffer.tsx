import Image from "next/image";
import Link from "next/link";

const banners = [
  { src: "/images/women/m-1.jpg", label: "FESTIVAL 26", href: "/festival-26", overlay: true },
  { src: "/images/men/w-1.jpg", label: "NEW IN", href: "/new-in", overlay: true },
  { src: "/images/lo.png", label: "ACCESSORIES", href: "/accessories", overlay: false },
  { src: "/images/c-4.avif", label: "BEST DEALS", href: "/best-deals", overlay: true },
];

const offers = [
  { src: "/images/women/m-4.jpg", label: "Womens 2 Pcs Set", href: "/women" },
  { src: "/images/women/m-5.jpg", label: "Womens Ethnic", href: "/women" },
  { src: "/images/men/w-2.jpg", label: "Mens Shirts", href: "/men" },
  { src: "/images/men/w-3.jpg", label: "Mens Wear", href: "/men" },
  { src: "/images/c-7.avif", label: "T-Shirts", href: "/new-in" },
  { src: "/images/c-10.avif", label: "Knitwear", href: "/festival-26" },
];

export default function UnlimitedOffer() {
  return (
    <section className="w-full px-4 pb-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {banners.map((banner) => (
          <Link
            key={banner.label}
            href={banner.href}
            className="group relative block overflow-hidden rounded-xl bg-zinc-100"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={banner.src}
                alt={banner.label}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {banner.overlay && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-lg font-extrabold tracking-wide text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] sm:text-xl">
                  {banner.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>

      <h2 className="mb-4 mt-6 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        Unlimited Offer
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {offers.map((offer) => (
          <Link key={offer.label} href={offer.href} className="group flex flex-col gap-3">
            <span className="block overflow-hidden rounded-xl bg-zinc-100">
              <span className="relative block aspect-[4/3]">
                <Image
                  src={offer.src}
                  alt={offer.label}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </span>
            <span className="text-center text-sm font-semibold text-zinc-800 transition-colors group-hover:text-[#12509b]">
              {offer.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
