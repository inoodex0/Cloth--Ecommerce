import CampaignPage from "@/components/CampaignPage";

export const metadata = {
  title: "PUJA-2026 — Festive Collection | Loomora",
  description:
    "Shop the PUJA-2026 festive collection at Loomora — ethnic wear, party formals and kids styles with special discounts.",
};

export default function Puja2026Page() {
  return (
    <CampaignPage
      eyebrow="Durga Puja Special"
      title="PUJA-2026"
      off="UP TO 60% OFF"
      note="FESTIVE COLLECTION 2026"
      gradient="bg-[linear-gradient(135deg,#9a3412_0%,#c2410c_50%,#f59e0b_100%)]"
      cards={[
        {
          image: "/images/men/men.avif",
          label: "Men's Puja Casuals",
          sub: "Shirts, Polo & Denim",
          href: "/product/m-1",
        },
        {
          image: "/images/men/w-1.jpg",
          label: "Women's Puja Style",
          sub: "Floral Dresses & Kurti",
          href: "/product/w-2",
        },
        {
          image: "/images/men/w-4.jpg",
          label: "Kids Puja Fits",
          sub: "Colorful & Comfy",
          href: "/product/k-1",
        },
      ]}
      spotlights={[
        {
          image: "/images/women/m-2.jpg",
          label: "Men's Ethnic",
          sub: "Soft-tone panjabi",
          href: "/product/m-2",
        },
        {
          image: "/images/c-6.avif",
          label: "Party Blazers",
          sub: "Formal evening edit",
          href: "/product/m-7",
        },
        {
          image: "/images/c-8.avif",
          label: "Cozy Layers",
          sub: "Hoodies & Sweatshirts",
          href: "/product/m-11",
        },
      ]}
      dealTitle="Puja Special Deals"
      dealHref="/best-deals"
      deals={[
        { id: "w-2", oldPrice: 3600 },
        { id: "w-4", oldPrice: 3400 },
        { id: "m-7", oldPrice: 7900 },
        { id: "m-6", oldPrice: 4500 },
        { id: "k-5", oldPrice: 1990 },
        { id: "k-7", oldPrice: 3200 },
        { id: "w-9", oldPrice: 5200 },
        { id: "m-1", oldPrice: 2400 },
      ]}
    />
  );
}
