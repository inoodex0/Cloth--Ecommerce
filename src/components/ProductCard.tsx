import type { CatalogProduct } from "@/components/CatalogPageLayout";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-[#12509b] hover:shadow-md"
    >
      <div className="relative aspect-[4/5] bg-zinc-100">
        <Image
          src={product.src}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 32vw, (min-width: 400px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-[#12509b] px-2.5 py-1 text-[11px] font-bold text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-extrabold text-zinc-900">
            ৳ {product.price.toLocaleString()}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-sm font-medium text-red-500 line-through">
              ৳ {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3.5 w-3.5 rounded-sm border border-black/15 shadow-inner"
            style={{ backgroundColor: product.color }}
          />
          <span className="text-xs text-zinc-500">{product.category}</span>
        </div>

        <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-700 transition-colors group-hover:text-[#12509b]">
          {product.name}
        </p>
      </div>
    </Link>
  );
}
