"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  Heart,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  color: string;
  colorName?: string;
  src: string;
  badge?: string;
  sizes?: string[];
  fabric?: string;
  length?: string;
  fit?: string;
  sleeve?: string;
  neck?: string;
  addition?: string[];
  festive?: string[];
  productType?: string;
  set?: string;
};

export type CatalogProps = {
  title: string;
  topSubcategories: string[];
  categories: string[];
  brands: string[];
  products: CatalogProduct[];
  defaultCategory?: string;
};

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "0 to 500 ৳", min: 0, max: 500 },
  { label: "501 to 1000 ৳", min: 501, max: 1000 },
  { label: "1001 to 1500 ৳", min: 1001, max: 1500 },
  { label: "1501 to 2000 ৳", min: 1501, max: 2000 },
  { label: "2001 to 3000 ৳", min: 2001, max: 3000 },
  { label: "More than 3000 ৳", min: 3001, max: Infinity },
];

export default function CatalogPageLayout({
  title,
  topSubcategories,
  categories,
  brands,
  products,
}: CatalogProps) {
  // Filter States
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();
  const { has: isWishlisted, toggle: toggleWishlistItem } = useWishlist();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (product: CatalogProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      color: product.color,
      colorName: product.colorName,
      src: product.src,
      size: product.sizes?.[0],
    });
    setAddedItem(product.name);
    setTimeout(() => {
      setAddedItem(null);
    }, 2600);
  };

  // Collapsible Accordion States
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [selectedFacets, setSelectedFacets] = useState<
    Record<string, string[]>
  >({});
  const [facetOpen, setFacetOpen] = useState<Record<string, boolean>>({});

  const isFacetOpen = (key: string) => facetOpen[key] ?? true;

  const toggleFacetSection = (key: string) => {
    setFacetOpen((prev) => ({ ...prev, [key]: !isFacetOpen(key) }));
  };

  const handleFacetToggle = (key: string, value: string) => {
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

  const pageGender = title.toLowerCase().startsWith("women")
    ? "Female"
    : title.toLowerCase().startsWith("men")
      ? "Male"
      : null;

  const collectFacet = (key: keyof CatalogProduct) =>
    Array.from(
      new Set(
        products.flatMap((product) => {
          const value = product[key];
          return Array.isArray(value)
            ? value
            : typeof value === "string"
              ? [value]
              : [];
        })
      )
    );

  const facetDefs: { key: string; title: string; options: string[] }[] = [
    {
      key: "size",
      title: "Size",
      options: Array.from(
        new Set(products.flatMap((product) => product.sizes ?? []))
      ),
    },
    { key: "fabric", title: "Fabric", options: collectFacet("fabric") },
    { key: "length", title: "Length", options: collectFacet("length") },
    { key: "fit", title: "Fit Type", options: collectFacet("fit") },
    { key: "sleeve", title: "Sleeve", options: collectFacet("sleeve") },
    { key: "festive", title: "Festive", options: collectFacet("festive") },
    ...(pageGender ? [{ key: "gender", title: "Gender", options: [pageGender] }] : []),
    { key: "addition", title: "Addition", options: collectFacet("addition") },
    {
      key: "productType",
      title: "Product Type",
      options: collectFacet("productType"),
    },
    { key: "neck", title: "Neck", options: collectFacet("neck") },
    { key: "set", title: "Set", options: collectFacet("set") },
  ];

  const facetTitleMap = Object.fromEntries(
    facetDefs.map((def) => [def.key, def.title])
  );

  // Mobile Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistItem(id);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setSelectedSubcategory("All");
    setSelectedCategory("All");
    setSelectedBrands([]);
    setSelectedPriceRange(0);
    setSearchQuery("");
    setSortOption("default");
    setSelectedFacets({});
  };

  const hasActiveFilters =
    selectedSubcategory !== "All" ||
    selectedCategory !== "All" ||
    selectedBrands.length > 0 ||
    selectedPriceRange !== 0 ||
    searchQuery.trim() !== "" ||
    Object.values(selectedFacets).some((values) => values.length > 0);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Subcategory Filter
    if (selectedSubcategory !== "All") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === selectedSubcategory.toLowerCase() ||
          p.name.toLowerCase().includes(selectedSubcategory.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === selectedCategory.toLowerCase() ||
          p.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Brand Filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price Filter
    const activeRange = priceRanges[selectedPriceRange];
    if (activeRange && selectedPriceRange !== 0) {
      result = result.filter(
        (p) => p.price >= activeRange.min && p.price <= activeRange.max
      );
    }

    // Facet Filters (Size / Fabric / Fit / etc.)
    for (const [key, values] of Object.entries(selectedFacets)) {
      if (values.length === 0) continue;
      if (key === "size") {
        result = result.filter((p) =>
          (p.sizes ?? []).some((size) => values.includes(size))
        );
      } else if (key === "gender") {
        result = result.filter(() => pageGender && values.includes(pageGender));
      } else {
        result = result.filter((p) => {
          const raw = p[key as keyof CatalogProduct];
          if (Array.isArray(raw)) {
            return raw.some((value) => values.includes(value as string));
          }
          return typeof raw === "string" && values.includes(raw);
        });
      }
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOption === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    products,
    selectedSubcategory,
    selectedCategory,
    selectedBrands,
    selectedPriceRange,
    selectedFacets,
    pageGender,
    searchQuery,
    sortOption,
  ]);

  return (
    <div className="flex flex-1 flex-col bg-[#fafafa] font-sans">
      {/* 1. Top Subcategories Bar (Horizontal Scrollable Strip) */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white shadow-xs">
        <div className="flex w-full items-center gap-6 overflow-x-auto px-4 py-3 text-xs font-semibold tracking-wide text-zinc-700 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:text-sm">
          <button
            type="button"
            onClick={() => setSelectedSubcategory("All")}
            className={`whitespace-nowrap transition-colors ${
              selectedSubcategory === "All"
                ? "border-b-2 border-[#12509b] font-bold text-[#12509b] pb-0.5"
                : "hover:text-[#12509b]"
            }`}
          >
            All {title}
          </button>
          {topSubcategories.map((subcat) => (
            <button
              key={subcat}
              type="button"
              onClick={() => setSelectedSubcategory(subcat)}
              className={`whitespace-nowrap transition-colors ${
                selectedSubcategory === subcat
                  ? "border-b-2 border-[#12509b] font-bold text-[#12509b] pb-0.5"
                  : "hover:text-[#12509b]"
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Body Container with Left Sidebar & Products Grid */}
      <div className="w-full px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* LEFT SIDEBAR (Desktop) */}
          <aside className="hidden w-64 shrink-0 space-y-4 lg:block">
            {/* Categories Accordion */}
            <div className="rounded-md border border-zinc-200 bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                className="flex w-full items-center justify-between bg-zinc-50/70 px-4 py-3 text-base font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
              >
                <span>Categories</span>
                {catOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
              </button>

              {catOpen && (
                <div className="max-h-64 overflow-y-auto p-2 space-y-0.5 text-sm">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("All")}
                    className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                      selectedCategory === "All"
                        ? "bg-[#12509b]/10 font-bold text-[#12509b]"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-xs text-zinc-400">
                      ({products.length})
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter(
                      (p) =>
                        p.category.toLowerCase() === cat.toLowerCase() ||
                        p.name.toLowerCase().includes(cat.toLowerCase())
                    ).length;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${
                          isSelected
                            ? "bg-[#12509b]/10 font-bold text-[#12509b]"
                            : "text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="text-xs text-zinc-400">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="rounded-md border border-zinc-200 bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setBrandOpen(!brandOpen)}
                className="flex w-full items-center justify-between bg-zinc-50/70 px-4 py-3 text-base font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
              >
                <span>Brands</span>
                {brandOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
              </button>

              {brandOpen && (
                <div className="p-3 space-y-2 text-sm">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex cursor-pointer items-center gap-2.5 text-zinc-700 hover:text-zinc-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="h-4 w-4 rounded border-zinc-300 text-[#12509b] focus:ring-[#12509b]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Accordion */}
            <div className="rounded-md border border-zinc-200 bg-white overflow-hidden shadow-2xs">
              <button
                type="button"
                onClick={() => setPriceOpen(!priceOpen)}
                className="flex w-full items-center justify-between bg-zinc-50/70 px-4 py-3 text-base font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
              >
                <span>Price</span>
                {priceOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
              </button>

              {priceOpen && (
                <div className="p-3 space-y-2 text-sm">
                  {priceRanges.map((range, index) => (
                    <label
                      key={range.label}
                      className="flex cursor-pointer items-center gap-2.5 text-zinc-700 hover:text-zinc-900"
                    >
                      <input
                        type="radio"
                        name="price-filter"
                        checked={selectedPriceRange === index}
                        onChange={() => setSelectedPriceRange(index)}
                        className="h-4 w-4 border-zinc-300 text-[#12509b] focus:ring-[#12509b]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Facet Filter Accordions (Size, Fabric, Fit, ...) */}
            {facetDefs.map((def) =>
              def.options.length > 0 ? (
                <div
                  key={def.key}
                  className="rounded-md border border-zinc-200 bg-white overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFacetSection(def.key)}
                    className="flex w-full items-center justify-between bg-zinc-50/70 px-4 py-3 text-base font-bold text-zinc-800 transition-colors hover:bg-zinc-100"
                  >
                    <span>{def.title}</span>
                    {isFacetOpen(def.key) ? (
                      <ChevronUp className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-zinc-500" />
                    )}
                  </button>

                  {isFacetOpen(def.key) && (
                    <div className="p-3 space-y-2 text-sm">
                      {def.options.map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-2.5 text-zinc-700 hover:text-zinc-900"
                        >
                          <input
                            type="checkbox"
                            checked={(selectedFacets[def.key] ?? []).includes(
                              option
                            )}
                            onChange={() => handleFacetToggle(def.key, option)}
                            className="h-4 w-4 rounded border-zinc-300 text-[#12509b] focus:ring-[#12509b]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ) : null
            )}

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white py-2 text-sm font-semibold text-zinc-700 shadow-2xs transition-colors hover:bg-zinc-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear All Filters
              </button>
            )}
          </aside>

          {/* RIGHT PRODUCT AREA */}
          <main className="flex-1 min-w-0">
            {/* Top Toolbar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 bg-white p-4 rounded-md shadow-2xs">
              <div>
                <h1 className="text-xl font-extrabold text-zinc-900 sm:text-2xl">
                  {title}
                </h1>
                <p className="text-xs text-zinc-500">
                  {filteredProducts.length} Items Found
                </p>
              </div>

              {/* Controls (Sort, View Switch, Mobile Filter Toggle) */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 lg:hidden shadow-2xs"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter {hasActiveFilters ? "(Active)" : ""}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs text-zinc-600 sm:text-sm">
                  <span className="hidden sm:inline">Sort By:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    aria-label="Sort products"
                    className="h-8 rounded border border-zinc-300 bg-white px-2 text-xs font-medium text-zinc-700 outline-none focus:border-[#12509b]"
                  >
                    <option value="default">Default</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>

                {/* Grid View Switcher */}
                <div className="flex items-center gap-1 text-zinc-500">
                  <span className="text-xs hidden sm:inline">View:</span>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`rounded p-1 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#12509b] text-white"
                        : "hover:text-zinc-900"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`rounded p-1 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#12509b] text-white"
                        : "hover:text-zinc-900"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags Bar */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-zinc-500">
                  Active Filters:
                </span>
                {selectedSubcategory !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#12509b]/10 px-2.5 py-1 text-xs font-semibold text-[#12509b]">
                    Subcat: {selectedSubcategory}
                    <button
                      type="button"
                      onClick={() => setSelectedSubcategory("All")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#12509b]/10 px-2.5 py-1 text-xs font-semibold text-[#12509b]">
                    Cat: {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("All")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-800"
                  >
                    Brand: {brand}
                    <button
                      type="button"
                      onClick={() => handleBrandToggle(brand)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange !== 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-800">
                    Price: {priceRanges[selectedPriceRange].label}
                    <button
                      type="button"
                      onClick={() => setSelectedPriceRange(0)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {Object.entries(selectedFacets).flatMap(([key, values]) =>
                  values.map((value) => (
                    <span
                      key={`${key}-${value}`}
                      className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-800"
                    >
                      {facetTitleMap[key] ?? key}: {value}
                      <button
                        type="button"
                        onClick={() => handleFacetToggle(key, value)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                )}
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-red-600 underline hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* PRODUCT GRID */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 sm:gap-4">
                {filteredProducts.map((product) => {
                  const isFavorited = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col overflow-hidden rounded-md border border-zinc-200/90 bg-white shadow-2xs transition-shadow hover:shadow-md"
                    >
                      {/* Product Image Box */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4f4f4]">
                        <Link href={`/product/${product.id}`} className="block h-full w-full">
                          <Image
                            src={product.src}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>

                        {/* Top-left [New] Badge */}
                        {product.badge && (
                          <span className="absolute left-2 top-2 z-10 rounded bg-[#12509b] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                            {product.badge}
                          </span>
                        )}

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          aria-label="Add to wishlist"
                          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-zinc-600 opacity-0 backdrop-blur-xs transition-all group-hover:opacity-100 hover:text-red-500"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${
                              isFavorited ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Info & Price Section */}
                      <div className="flex flex-1 flex-col items-center justify-between p-3 text-center">
                        {/* Price */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-zinc-900">
                            ৳ {product.price}
                          </span>
                          {product.oldPrice && (
                            <span className="text-xs text-zinc-400 line-through">
                              ৳ {product.oldPrice}
                            </span>
                          )}
                        </div>

                        {/* Color Swatch Dot */}
                        <span
                          aria-hidden
                          className="my-1.5 block h-3.5 w-3.5 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: product.color }}
                          title={product.colorName || "Color"}
                        />

                        {/* Product Title */}
                        <Link
                          href={`/product/${product.id}`}
                          className="line-clamp-2 min-h-[2.5rem] text-xs font-medium text-zinc-700 transition-colors hover:text-[#12509b]"
                        >
                          {product.name}
                        </Link>

                        {/* Add to Cart Button */}
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(product, e)}
                          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#12509b] py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded-md border border-zinc-200 bg-white p-3 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-zinc-100">
                      <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-[#12509b] uppercase">
                        {product.category} • {product.brand}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900 truncate">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-base font-extrabold text-zinc-900">
                          ৳ {product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            ৳ {product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex shrink-0 items-center gap-1.5 rounded-md bg-[#12509b] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="shrink-0 rounded-md border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center">
                <Search className="h-10 w-10 text-zinc-400" />
                <h3 className="mt-3 text-base font-bold text-zinc-800">
                  No products match your filter
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Try clearing some filters to see more results.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-4 rounded-md bg-[#12509b] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:opacity-90"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add to Cart Toast */}
      {addedItem && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-4 w-4 stroke-[3]" />
          </span>
          <span>
            Added <strong className="font-semibold text-white">{addedItem}</strong>{" "}
            to your cart!
          </span>
          <Link
            href="/cart"
            className="ml-1 rounded bg-[#12509b] px-2 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
          >
            View Cart
          </Link>
        </div>
      )}

      {/* MOBILE FILTER MODAL / DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="ml-auto flex h-full w-4/5 max-w-sm flex-col bg-white p-5 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-base font-bold text-zinc-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="rounded p-1 text-zinc-500 hover:bg-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-5 text-sm">
              {/* Categories */}
              <div>
                <h4 className="font-bold text-base text-zinc-900 mb-2">Categories</h4>
                <div className="max-h-48 overflow-y-auto space-y-1 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1.5 rounded ${
                      selectedCategory === "All"
                        ? "bg-[#12509b] text-white font-bold"
                        : "text-zinc-700"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-2 py-1.5 rounded ${
                        selectedCategory === cat
                          ? "bg-[#12509b] text-white font-bold"
                          : "text-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-bold text-base text-zinc-900 mb-2">Brands</h4>
                <div className="space-y-2 text-sm">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-zinc-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-zinc-300 text-[#12509b]"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-bold text-base text-zinc-900 mb-2">Price Range</h4>
                <div className="space-y-2 text-sm">
                  {priceRanges.map((range, index) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-2 text-zinc-700"
                    >
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={selectedPriceRange === index}
                        onChange={() => {
                          setSelectedPriceRange(index);
                          setMobileFilterOpen(false);
                        }}
                        className="text-[#12509b]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Facet Filters */}
              {facetDefs.map((def) =>
                def.options.length > 0 ? (
                  <div key={def.key}>
                    <h4 className="font-bold text-base text-zinc-900 mb-2">
                      {def.title}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {def.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-zinc-700"
                        >
                          <input
                            type="checkbox"
                            checked={(selectedFacets[def.key] ?? []).includes(
                              option
                            )}
                            onChange={() => handleFacetToggle(def.key, option)}
                            className="rounded border-zinc-300 text-[#12509b]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-md bg-[#12509b] py-2.5 text-xs font-bold text-white shadow-2xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
