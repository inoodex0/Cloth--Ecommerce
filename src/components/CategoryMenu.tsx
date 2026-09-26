"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Category = { name: string; subcategories: string[] };

const categories: Category[] = [
  {
    name: "Clothing & Fashion",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Clothing",
      "Ethnic Wear",
      "Winter Wear",
      "Lingerie & Sleepwear",
    ],
  },
  {
    name: "Footwear",
    subcategories: [
      "Men's Shoes",
      "Women's Shoes",
      "Kids' Shoes",
      "Sandals & Slippers",
      "Sports Shoes",
      "Formal Shoes",
    ],
  },
  {
    name: "Fashion Accessories",
    subcategories: [
      "Bags & Luggage",
      "Watches",
      "Jewellery",
      "Belts",
      "Caps & Hats",
      "Sunglasses",
    ],
  },
  {
    name: "Lifestyle Accessories",
    subcategories: [
      "Wallets",
      "Keychains",
      "Umbrellas",
      "Travel Accessories",
      "Office Accessories",
      "Home Utilities",
    ],
  },
  {
    name: "Personal Care",
    subcategories: [
      "Grooming",
      "Shaving",
      "Hair Care",
      "Oral Care",
      "Feminine Hygiene",
      "Hand & Foot Care",
    ],
  },
  {
    name: "Health & Beauty",
    subcategories: [
      "Skincare",
      "Makeup",
      "Bath & Body",
      "Health Supplements",
      "Mother & Baby",
      "Fragrance",
    ],
  },
  {
    name: "Home Decor",
    subcategories: [
      "Wall Decor",
      "Lighting",
      "Clocks",
      "Curtains & Blinds",
      "Vases & Planters",
      "Candles & Fragrance",
    ],
  },
  {
    name: "Handicrafts",
    subcategories: [
      "Pottery & Ceramic",
      "Woodwork",
      "Metalwork",
      "Jute & Bamboo",
      "Embroidery",
      "Antique Pieces",
    ],
  },
  {
    name: "Appliance",
    subcategories: [
      "Kitchen Appliances",
      "Home Appliances",
      "Personal Appliances",
      "Air Care",
      "Small Appliances",
      "Appliance Accessories",
    ],
  },
  {
    name: "Gift Cards",
    subcategories: [
      "Digital Gift Cards",
      "Physical Gift Cards",
      "Customizable Cards",
      "Corporate Gifts",
    ],
  },
  {
    name: "Automotives & Motorbikes",
    subcategories: [
      "Car Care",
      "Bike Care",
      "Tyres & Rims",
      "Car Electronics",
      "Helmets",
      "Tools & Accessories",
    ],
  },
  {
    name: "Riding, Sports & Fitness",
    subcategories: [
      "Cycling",
      "Gym & Fitness",
      "Cricket",
      "Football",
      "Outdoor & Camping",
      "Sportswear",
    ],
  },
  {
    name: "Phones & Tablets",
    subcategories: [
      "Smartphones",
      "Tablets",
      "Wearables",
      "Power Banks",
      "Cases & Covers",
      "Mobile Accessories",
    ],
  },
  {
    name: "Food & Snacks",
    subcategories: [
      "Dry Food",
      "Beverages",
      "Chocolates & Sweets",
      "Bakery",
      "Organic Food",
      "Imported Food",
    ],
  },
  {
    name: "Books & Stationery Items",
    subcategories: [
      "Books",
      "Notebooks & Diaries",
      "Pens & Writing",
      "Art & Craft",
      "Office Supplies",
      "Gift Wraps",
    ],
  },
];

const FLYOUT_WIDTH = 240;

function toSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Flyout = { name: string; top: number; left: number };

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const [flyout, setFlyout] = useState<Flyout | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setFlyout(null), 140);
  };

  const closeAll = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(false);
    setFlyout(null);
    setExpanded(null);
  }, []);

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) closeAll();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeAll]);

  const openFlyout = (name: string, row: HTMLElement) => {
    cancelClose();
    const rect = row.getBoundingClientRect();
    const left =
      rect.right + FLYOUT_WIDTH > window.innerWidth
        ? Math.max(8, rect.left - FLYOUT_WIDTH)
        : rect.right;
    setFlyout({ name, top: rect.top, left });
  };

  useLayoutEffect(() => {
    const element = flyoutRef.current;
    if (!element || !flyout) return;
    const overflow = element.getBoundingClientRect().bottom - (window.innerHeight - 8);
    if (overflow > 0) element.style.top = `${flyout.top - overflow}px`;
  }, [flyout]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => (open ? closeAll() : setOpen(true))}
        aria-expanded={open}
        className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-[#12509b]"
      >
        <Menu className="h-4 w-4" />
        Shop By Category
      </button>

      {open && (
        <div
          data-lenis-prevent
          className="absolute left-0 top-full z-50 mt-1 max-h-[calc(100vh-9rem)] w-64 overflow-y-auto border border-zinc-200 bg-white py-2 shadow-xl"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              onMouseEnter={(event) => {
                if (canHover()) openFlyout(category.name, event.currentTarget);
              }}
              onMouseLeave={scheduleClose}
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/category/${toSlug(category.name)}`}
                  onClick={closeAll}
                  className="min-w-0 flex-1 truncate px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-[#12509b]"
                >
                  {category.name}
                </Link>
                <button
                  type="button"
                  aria-label={`Show subcategories for ${category.name}`}
                  aria-expanded={expanded === category.name}
                  onClick={(event) => {
                    const row = event.currentTarget.parentElement;
                    if (!row) return;
                    if (canHover()) {
                      openFlyout(category.name, row);
                    } else {
                      setExpanded((value) =>
                        value === category.name ? null : category.name,
                      );
                    }
                  }}
                  className="pr-3 text-zinc-400 transition-colors hover:text-[#12509b]"
                >
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      flyout?.name === category.name || expanded === category.name
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                </button>
              </div>

              {expanded === category.name && (
                <div className="bg-zinc-50 py-1">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      href={`/category/${toSlug(category.name)}/${toSlug(subcategory)}`}
                      onClick={closeAll}
                      className="block px-7 py-2 text-sm text-zinc-600 transition-colors hover:text-[#12509b]"
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {flyout && (
        <div
          ref={flyoutRef}
          style={{ top: flyout.top, left: flyout.left }}
          className="fixed z-[60] w-60 border border-zinc-200 bg-white py-2 shadow-xl"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {categories
            .find((category) => category.name === flyout.name)
            ?.subcategories.map((subcategory) => (
              <Link
                key={subcategory}
                href={`/category/${toSlug(flyout.name)}/${toSlug(subcategory)}`}
                onClick={closeAll}
                className="block px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-[#12509b]"
              >
                {subcategory}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
