"use client";

import {
  Check,
  ChevronDown,
  Heart,
  LayoutGrid,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type CollectionItem = {
  src: string;
  name: string;
  price: number;
  oldPrice?: number;
  color: string;
  tag: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  fabric?: string;
  brand?: string;
  length?: string;
  fit?: string;
  sleeve?: string;
  neck?: string;
  addition?: string[];
  festive?: string[];
  productType?: string;
  set?: string;
};

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
] as const;

const priceRanges = [
  { label: "0 to 500 ৳", min: 0, max: 500 },
  { label: "501 to 1000 ৳", min: 501, max: 1000 },
  { label: "1001 to 1500 ৳", min: 1001, max: 1500 },
  { label: "1501 to 2000 ৳", min: 1501, max: 2000 },
  { label: "2001 to 3000 ৳", min: 2001, max: 3000 },
  { label: "More than 3000 ৳", min: 3001, max: Number.POSITIVE_INFINITY },
];

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-zinc-900"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${
            open ? "-rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}

export default function CollectionGrid({
  items,
  themeColor = "#12509b",
  categoryName = "Collection",
}: {
  items: CollectionItem[];
  themeColor?: string;
  categoryName?: string;
}) {
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.tag)))],
    [items]
  );

  const [activeTag, setActiveTag] = useState("All");
  const [sort, setSort] = useState<string>("featured");
  const [gridCols, setGridCols] = useState<"4" | "5">("5");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
  const [priceIndex, setPriceIndex] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, string[]>
  >({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const isOpen = (key: string) => openSections[key] ?? true;

  const brandList = useMemo(
    () =>
      Array.from(
        new Set(
          items.map((item) => item.brand).filter((b): b is string => !!b)
        )
      ),
    [items]
  );

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !isOpen(key) }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleFacet = (key: string, value: string) => {
    setSelectedFacets((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const collectFacet = (key: keyof CollectionItem) =>
    Array.from(
      new Set(
        items.flatMap((item) => {
          const value = item[key];
          return Array.isArray(value)
            ? value
            : typeof value === "string"
              ? [value]
              : [];
        })
      )
    );

  const pageGender = categoryName === "Women" ? "Female" : "Male";

  const facetDefs: { key: string; title: string; options: string[] }[] = [
    {
      key: "size",
      title: "Size",
      options: Array.from(new Set(items.flatMap((item) => item.sizes ?? []))),
    },
    { key: "fabric", title: "Fabric", options: collectFacet("fabric") },
    { key: "length", title: "Length", options: collectFacet("length") },
    { key: "fit", title: "Fit Type", options: collectFacet("fit") },
    { key: "sleeve", title: "Sleeve", options: collectFacet("sleeve") },
    { key: "festive", title: "Festive", options: collectFacet("festive") },
    { key: "gender", title: "Gender", options: [pageGender] },
    { key: "addition", title: "Addition", options: collectFacet("addition") },
    {
      key: "productType",
      title: "Product Type",
      options: collectFacet("productType"),
    },
    { key: "neck", title: "Neck", options: collectFacet("neck") },
    { key: "set", title: "Set", options: collectFacet("set") },
  ];

  const toggleWishlist = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleQuickAdd = (item: CollectionItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedItem(item.name);
    setTimeout(() => {
      setAddedItem(null);
    }, 2200);
  };

  const visible = useMemo(() => {
    let list = [...items];

    if (activeTag !== "All") {
      list = list.filter((item) => item.tag === activeTag);
    }

    if (priceIndex !== null) {
      const range = priceRanges[priceIndex];
      list = list.filter(
        (item) => item.price >= range.min && item.price <= range.max
      );
    }

    if (selectedBrands.length > 0) {
      list = list.filter(
        (item) => item.brand && selectedBrands.includes(item.brand)
      );
    }

    for (const [key, values] of Object.entries(selectedFacets)) {
      if (values.length === 0) continue;
      if (key === "size") {
        list = list.filter((item) =>
          (item.sizes ?? []).some((size) => values.includes(size))
        );
      } else if (key === "gender") {
        list = list.filter(() => values.includes(pageGender));
      } else {
        list = list.filter((item) => {
          const raw = item[key as keyof CollectionItem];
          if (Array.isArray(raw)) {
            return raw.some((value) => values.includes(value as string));
          }
          return typeof raw === "string" && values.includes(raw);
        });
      }
    }

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "discount") {
      list.sort((a, b) => {
        const discA = a.oldPrice ? a.oldPrice - a.price : 0;
        const discB = b.oldPrice ? b.oldPrice - b.price : 0;
        return discB - discA;
      });
    }

    return list;
  }, [items, activeTag, sort, priceIndex, selectedBrands, selectedFacets, pageGender]);

  const heading = categoryName.endsWith("s")
    ? categoryName
    : `${categoryName}s`;

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      {/* Left Filter Sidebar */}
      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <FilterSection
          title="Categories"
          open={isOpen("categories")}
          onToggle={() => toggleSection("categories")}
        >
          <ul className="space-y-1.5">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`text-left text-sm transition-colors hover:underline ${
                    activeTag === tag
                      ? "font-bold"
                      : "text-[#2f6fbb] hover:text-[#12509b]"
                  }`}
                  style={activeTag === tag ? { color: themeColor } : undefined}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </FilterSection>

        {brandList.length > 0 && (
          <FilterSection
            title="Brands"
            open={isOpen("brands")}
            onToggle={() => toggleSection("brands")}
          >
            <ul className="space-y-2">
              {brandList.map((brand) => (
                <li key={brand}>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="h-4 w-4 rounded border-zinc-300"
                      style={{ accentColor: themeColor }}
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </FilterSection>
        )}

        <FilterSection
          title="Price"
          open={isOpen("price")}
          onToggle={() => toggleSection("price")}
        >
          <ul className="space-y-2">
            <li>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                <input
                  type="radio"
                  name="price-filter"
                  checked={priceIndex === null}
                  onChange={() => setPriceIndex(null)}
                  className="h-4 w-4 border-zinc-300"
                  style={{ accentColor: themeColor }}
                />
                All Prices
              </label>
            </li>
            {priceRanges.map((range, index) => (
              <li key={range.label}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                  <input
                    type="radio"
                    name="price-filter"
                    checked={priceIndex === index}
                    onChange={() => setPriceIndex(index)}
                    className="h-4 w-4 border-zinc-300"
                    style={{ accentColor: themeColor }}
                  />
                  {range.label}
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>

        {facetDefs.map((def) =>
          def.options.length > 0 ? (
            <FilterSection
              key={def.key}
              title={def.title}
              open={isOpen(def.key)}
              onToggle={() => toggleSection(def.key)}
            >
              <ul className="space-y-2">
                {def.options.map((option) => (
                  <li key={option}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={(selectedFacets[def.key] ?? []).includes(option)}
                        onChange={() => toggleFacet(def.key, option)}
                        className="h-4 w-4 rounded border-zinc-300"
                        style={{ accentColor: themeColor }}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </FilterSection>
          ) : null
        )}
      </aside>

      {/* Right Content */}
      <div className="min-w-0 space-y-6">
      {/* Toast Notification */}
      {addedItem && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-4 w-4 stroke-[3]" />
          </span>
          <span>
            Added <strong className="font-semibold text-white">{addedItem}</strong> to your bag!
          </span>
        </div>
      )}

      {/* Section Header: Title, Count, Sort & View */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
            {heading}
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            <strong className="font-bold text-zinc-700">{visible.length}</strong>{" "}
            Items Found
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="hidden text-zinc-500 sm:inline">Sort By:</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
              className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 outline-none transition-colors hover:border-zinc-300 focus:border-[#12509b] sm:text-sm"
            >
              {sorts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-zinc-500 sm:inline">View:</span>
            <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
              <button
                type="button"
                onClick={() => setGridCols("4")}
                aria-label="Comfortable grid"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                  gridCols === "4"
                    ? "bg-white text-[#12509b] shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols("5")}
                aria-label="Compact grid"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                  gridCols === "5"
                    ? "bg-white text-[#12509b] shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
                  <span className="h-1.5 w-1.5 rounded-[1px] bg-current" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div
        className={`grid grid-cols-2 gap-4 sm:gap-6 ${
          gridCols === "5"
            ? "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "md:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {visible.map((item) => {
          const discountPercent = item.oldPrice
            ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
            : 0;
          const isFavorited = !!wishlist[item.name];
          const availableSizes = item.sizes || ["S", "M", "L", "XL"];
          const currentSize = selectedSize[item.name] || availableSizes[0];

          return (
            <div
              key={`${item.src}-${item.name}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:shadow-xl"
            >
              {/* Image Container with Badges & Wishlist Button */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50">
                <Link href="/new-in" className="block h-full w-full">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Badges Overlay */}
                <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
                  {item.badge && (
                    <span className="rounded-md bg-[#12509b] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md">
                      {item.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-extrabold tracking-wider text-white shadow-md">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  onClick={(e) => toggleWishlist(item.name, e)}
                  className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 ${
                    isFavorited
                      ? "bg-rose-50 text-rose-600 shadow-md ring-1 ring-rose-200"
                      : "bg-white/80 text-zinc-600 hover:bg-white hover:text-rose-500 hover:shadow-md"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform active:scale-125 ${
                      isFavorited ? "fill-rose-600 stroke-rose-600" : ""
                    }`}
                  />
                </button>

                {/* Quick Add Overlay on Hover (Desktop) */}
                <div className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900/90 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-zinc-900 active:scale-[0.98]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-4">
                {/* Category & Color Indicator */}
                <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-medium tracking-wide uppercase text-[11px] text-zinc-400">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: item.color }}
                      title={`Color: ${item.color}`}
                    />
                  </div>
                </div>

                {/* Product Title */}
                <Link
                  href="/new-in"
                  className="group-hover:text-[#12509b] transition-colors"
                >
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-zinc-800 sm:text-base">
                    {item.name}
                  </h3>
                </Link>

                {/* Ratings preview */}
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-600">
                    {item.rating || "4.8"}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    ({item.reviews || 24})
                  </span>
                </div>

                {/* Price Section */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-black tracking-tight text-zinc-900 sm:text-xl">
                    ৳{item.price.toLocaleString()}
                  </span>
                  {item.oldPrice && (
                    <span className="text-xs font-semibold text-zinc-400 line-through">
                      ৳{item.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {item.oldPrice && (
                    <span className="ml-auto text-[11px] font-bold text-emerald-600">
                      Save ৳{(item.oldPrice - item.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Size Pills (Optional Visual Select) */}
                <div className="mt-3 flex items-center gap-1.5 border-t border-zinc-100 pt-3">
                  <span className="text-[11px] font-medium text-zinc-400">
                    Sizes:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedSize((prev) => ({
                            ...prev,
                            [item.name]: size,
                          }));
                        }}
                        className={`h-5 min-w-5 rounded px-1 text-[10px] font-bold transition-all ${
                          currentSize === size
                            ? "bg-[#12509b] text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Quick Add Button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-900 text-xs font-bold text-white transition-opacity active:opacity-90 sm:hidden"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Add to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {visible.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-zinc-800">
            No matching items found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-zinc-500 sm:text-sm">
            Try adjusting your search or category filter to discover our full
            collection.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTag("All");
              setPriceIndex(null);
              setSelectedBrands([]);
              setSelectedFacets({});
            }}
            className="mt-4 inline-flex h-9 items-center rounded-full bg-[#12509b] px-5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Value Pillars / Trust Badges */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50/80 to-sky-50/30 p-6 md:grid-cols-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12509b]/10 text-[#12509b]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">100% Authentic</h4>
            <p className="mt-0.5 text-xs text-zinc-500">Premium verified fabrics</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12509b]/10 text-[#12509b]">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">Fast Nationwide Delivery</h4>
            <p className="mt-0.5 text-xs text-zinc-500">Free shipping above ৳2,000</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12509b]/10 text-[#12509b]">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">7-Day Easy Return</h4>
            <p className="mt-0.5 text-xs text-zinc-500">Hassle-free replacement</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12509b]/10 text-[#12509b]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">Secure Payment</h4>
            <p className="mt-0.5 text-xs text-zinc-500">bKash, Nagad & Cards</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
