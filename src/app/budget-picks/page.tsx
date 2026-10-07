import CampaignPage from "@/components/CampaignPage";

export const metadata = {
  title: "Budget Picks — Styles Under ৳1000 | Loomora",
  description:
    "Budget Picks at Loomora — quality tees, sweatshirts and kids styles all under ৳1000, without compromising comfort.",
};

export default function BudgetPicksPage() {
  return (
    <CampaignPage
      eyebrow="Smart Shopping"
      title="Budget Picks"
      off="UNDER ৳1000"
      note="QUALITY THAT STAYS BUDGET"
      gradient="bg-[linear-gradient(135deg,#065f46_0%,#059669_55%,#34d399_100%)]"
      cards={[
        {
          image: "/images/men/men.avif",
          label: "Men's Under ৳999",
          sub: "Tees, Polo & Casuals",
          href: "/product/m-10",
        },
        {
          image: "/images/women/women.avif",
          label: "Women's Under ৳999",
          sub: "Kurti & Everyday wear",
          href: "/product/w-1",
        },
        {
          image: "/images/men/w-4.jpg",
          label: "Kids Under ৳999",
          sub: "Play-ready styles",
          href: "/product/k-5",
        },
      ]}
      spotlights={[
        {
          image: "/images/c-7.avif",
          label: "Budget Tees",
          sub: "Starting ৳490",
          href: "/product/k-2",
        },
        {
          image: "/images/c-2.avif",
          label: "Fleece Sweatshirt",
          sub: "Cozy on a budget",
          href: "/product/m-12",
        },
        {
          image: "/images/c-8.avif",
          label: "Everyday Hoodie",
          sub: "Warm & affordable",
          href: "/product/m-11",
        },
      ]}
      dealTitle="Cheapest Picks"
      dealHref="/best-deals"
      deals={[
        { id: "k-2", oldPrice: 790 },
        { id: "m-10", oldPrice: 1290 },
        { id: "k-10", oldPrice: 1190 },
        { id: "k-1", oldPrice: 990 },
        { id: "k-6", oldPrice: 1350 },
        { id: "k-5", oldPrice: 1390 },
      ]}
    />
  );
}
