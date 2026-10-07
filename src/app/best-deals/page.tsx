import { ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Best Deals — Loomora",
  description:
    "Grab the best deals at Loomora — discounted shirts, ethnic wear, winter wear, kids fashion and more.",
};

type Deal = {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  color: string;
  src: string;
};

type DealSection = {
  title: string;
  href: string;
  banner: {
    label: string;
    off: string;
    note: string;
    img?: string;
    gradient?: string;
  };
  deals: Deal[];
};

const sections: DealSection[] = [
  {
    title: "Men's Style Deals",
    href: "/men",
    banner: {
      label: "Men's Essentials",
      off: "UPTO 40% OFF",
      note: "STARTING ৳ 990",
      img: "/hero/he-2.avif",
    },
    deals: [
      {
        id: "m-1",
        name: "Mens Short Sleeves Polo Shirt - Slim Fit",
        price: 990,
        oldPrice: 1290,
        color: "#6b7280",
        src: "/images/men/men.avif",
      },
      {
        id: "m-3",
        name: "Mens Dark Wash Denim Pant - Slim Fit",
        price: 1590,
        oldPrice: 1990,
        color: "#1e3a8a",
        src: "/images/men/w-2.jpg",
      },
      {
        id: "m-6",
        name: "Mens Premium Rust Bomber Jacket - Regular Fit",
        price: 1690,
        oldPrice: 2500,
        color: "#b45309",
        src: "/images/c-1.avif",
      },
      {
        id: "m-8",
        name: "Mens Crisp Pure Egyptian Cotton White Shirt",
        price: 1450,
        oldPrice: 2100,
        color: "#ffffff",
        src: "/images/c-9.avif",
      },
      {
        id: "m-9",
        name: "Mens Classic Denim Trucker Jacket",
        price: 1799,
        oldPrice: 2199,
        color: "#1e3a8a",
        src: "/images/c-3.avif",
      },
      {
        id: "m-10",
        name: "Mens Heather Grey Cotton Crewneck Tee",
        price: 750,
        oldPrice: 1100,
        color: "#71717a",
        src: "/images/c-7.avif",
      },
    ],
  },
  {
    title: "Ethnic Wear Deals",
    href: "/women",
    banner: {
      label: "Eid & Puja Special",
      off: "UPTO 50% OFF",
      note: "FESTIVE COLLECTION",
      gradient:
        "bg-[linear-gradient(140deg,#7f1d1d_0%,#9f1239_55%,#e11d48_100%)]",
    },
    deals: [
      {
        id: "w-1",
        name: "Womens Floral Embroidered Kurti Set - Regular Fit",
        price: 2190,
        oldPrice: 3200,
        color: "#fda4af",
        src: "/images/women/women.avif",
      },
      {
        id: "w-2",
        name: "Womens Crimson Silk Traditional Handwoven Saree",
        price: 1290,
        oldPrice: 1550,
        color: "#dc2626",
        src: "/images/women/m-1.jpg",
      },
      {
        id: "w-3",
        name: "Womens Rose Festive Printed Saree with Zari Border",
        price: 1290,
        oldPrice: 1550,
        color: "#ec4899",
        src: "/images/women/m-2.jpg",
      },
      {
        id: "w-4",
        name: "Womens Pearl White Classic Festive Saree",
        price: 1290,
        oldPrice: 1550,
        color: "#e5e7eb",
        src: "/images/women/m-3.jpg",
      },
      {
        id: "w-5",
        name: "Womens 2 Pcs Pastel Ensemble Set - Regular Fit",
        price: 2450,
        oldPrice: 3500,
        color: "#f9a8d4",
        src: "/images/women/m-4.jpg",
      },
      {
        id: "w-6",
        name: "Womens Ethnic Festive Kurti & Trouser 2 Pcs Set",
        price: 2290,
        oldPrice: 2690,
        color: "#dc2626",
        src: "/images/women/m-5.jpg",
      },
    ],
  },
  {
    title: "Winter Wear Deals",
    href: "/new-in",
    banner: {
      label: "Cozy Season Sale",
      off: "UPTO 35% OFF",
      note: "STAY WARM, STAY STYLISH",
      gradient:
        "bg-[linear-gradient(140deg,#0c4a6e_0%,#12509b_55%,#38bdf8_100%)]",
    },
    deals: [
      {
        id: "w-7",
        name: "Womens Soft Cashmere Knit Cardigan - Rose",
        price: 21230,
        oldPrice: 27400,
        color: "#fda4af",
        src: "/images/c-10.avif",
      },
      {
        id: "w-8",
        name: "Womens Everyday Fleece Minimalist Sweatshirt",
        price: 5250,
        oldPrice: 6900,
        color: "#f5f5f4",
        src: "/images/c-2.avif",
      },
      {
        id: "w-10",
        name: "Womens Warm Cozy Winter Fleece Jacket",
        price: 1890,
        oldPrice: 2650,
        color: "#e11d48",
        src: "/images/c-5.avif",
      },
      {
        id: "m-11",
        name: "Mens Navy Fleece Hoodie & Denim Set",
        price: 1049,
        oldPrice: 1360,
        color: "#12509b",
        src: "/images/c-8.avif",
      },
      {
        id: "k-8",
        name: "Kids Cozy Knitted Cardigan Sweater",
        price: 1099,
        oldPrice: 1450,
        color: "#fda4af",
        src: "/images/c-10.avif",
      },
      {
        id: "k-10",
        name: "Kids Everyday Relaxed Fleece Sweatshirt",
        price: 750,
        oldPrice: 890,
        color: "#f5f5f4",
        src: "/images/c-2.avif",
      },
    ],
  },
  {
    title: "Kids Deals",
    href: "/kids",
    banner: {
      label: "Kids Collection",
      off: "UPTO 45% OFF",
      note: "FUN FOR EVERY AGE",
      img: "/hero/he-1.avif",
    },
    deals: [
      {
        id: "k-1",
        name: "Boys Cotton Pique Polo Shirt - Regular Fit",
        price: 590,
        oldPrice: 850,
        color: "#0f766e",
        src: "/images/men/w-1.jpg",
      },
      {
        id: "k-3",
        name: "Girls Floral Festive Printed Frock",
        price: 990,
        oldPrice: 1450,
        color: "#fda4af",
        src: "/images/women/women.avif",
      },
      {
        id: "k-4",
        name: "Girls 2 Pcs Pastel Traditional Kurti & Trouser Set",
        price: 1190,
        oldPrice: 1390,
        color: "#f9a8d4",
        src: "/images/women/m-4.jpg",
      },
      {
        id: "k-9",
        name: "Boys Classic Denim Trucker Jacket",
        price: 1350,
        oldPrice: 1890,
        color: "#1e3a8a",
        src: "/images/c-3.avif",
      },
      {
        id: "k-6",
        name: "Kids Warm Fleece Hoodie & Jogger Set",
        price: 850,
        oldPrice: 1150,
        color: "#12509b",
        src: "/images/c-8.avif",
      },
      {
        id: "k-2",
        name: "Boys Graphic Print Short Sleeve T-Shirt",
        price: 390,
        oldPrice: 490,
        color: "#71717a",
        src: "/images/c-7.avif",
      },
    ],
  },
];

function DealCard({ deal }: { deal: Deal }) {
  const save = deal.oldPrice - deal.price;

  return (
    <Link
      href={`/product/${deal.id}`}
      className="group relative flex min-h-52 overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-[#12509b] hover:shadow-md"
    >
      <span className="absolute left-0 top-0 z-10 rounded-br-lg bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
        Save ৳ {save}
      </span>

      <div className="relative w-2/5 shrink-0 bg-zinc-100">
        <Image
          src={deal.src}
          alt={deal.name}
          fill
          sizes="(min-width: 1280px) 15vw, (min-width: 640px) 30vw, 45vw"
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
            ৳ {deal.price.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-red-500 line-through">
            ৳ {deal.oldPrice.toLocaleString()}
          </span>
        </div>

        <span
          aria-hidden
          className="h-3.5 w-3.5 rounded-sm border border-black/15 shadow-inner"
          style={{ backgroundColor: deal.color }}
        />

        <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-700 transition-colors group-hover:text-[#12509b]">
          {deal.name}
        </p>
      </div>
    </Link>
  );
}

export default function BestDealsPage() {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 px-4 py-4 text-sm text-zinc-500">
        <Link href="/" className="transition-colors hover:text-[#12509b]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-zinc-800">Best Deals</span>
      </nav>

      <div className="space-y-6 px-4 pb-10">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-3xl bg-[#f5f6f8] p-5 sm:p-7"
          >
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_34rem]">
              <div className="flex min-w-0 flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                    {section.title}
                  </h2>
                  <Link
                    href={section.href}
                    className="flex items-center gap-2 text-base font-bold text-[#12509b] transition-opacity hover:opacity-80"
                  >
                    See More
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.deals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>

              <Link
                href={section.href}
                className="relative block min-h-64 overflow-hidden rounded-2xl xl:min-h-full"
              >
                {section.banner.img ? (
                  <>
                    <Image
                      src={section.banner.img}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 34rem, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 ${section.banner.gradient ?? ""}`}
                  />
                )}
                <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">
                    {section.banner.label}
                  </span>
                  <span className="text-4xl font-black tracking-tight sm:text-5xl">
                    {section.banner.off}
                  </span>
                  <span className="rounded-full border border-white/60 px-4 py-1 text-sm font-semibold">
                    {section.banner.note}
                  </span>
                </div>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
