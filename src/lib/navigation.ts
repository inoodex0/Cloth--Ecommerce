export type NavLink = {
  href: string;
  label: string;
  /** Always styled blue + underlined (sale/campaign links) */
  highlight?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "HOME" },
  { href: "/festival-26", label: "Loomora Fest70", highlight: true },
  { href: "/puja-2026", label: "PUJA-2026" },
  { href: "/aspire", label: "ASPIRE" },
  { href: "/budget-picks", label: "Budget Picks" },
  { href: "/best-deals", label: "Best Deals", highlight: true },
  { href: "/men", label: "Mens" },
  { href: "/women", label: "Womens" },
  { href: "/kids", label: "Kids" },
];
