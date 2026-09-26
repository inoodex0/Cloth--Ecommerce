export type Category = { label: string; src: string };

export const popularCategories: Category[] = [
  { label: "New Arrivals", src: "/images/c-4.avif" },
  { label: "Bomber Jackets", src: "/images/c-1.avif" },
  { label: "Sweatshirts", src: "/images/c-2.avif" },
  { label: "Denim Jackets", src: "/images/c-3.avif" },
  { label: "Winter Wear", src: "/images/c-5.avif" },
  { label: "Blazers", src: "/images/c-6.avif" },
  { label: "T-Shirts", src: "/images/c-7.avif" },
  { label: "Hoodies", src: "/images/c-8.avif" },
  { label: "Shirts", src: "/images/c-9.avif" },
  { label: "Knitwear", src: "/images/c-10.avif" },
];

export function categorySlug(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function categoryHref(label: string) {
  return `/category/${categorySlug(label)}`;
}
