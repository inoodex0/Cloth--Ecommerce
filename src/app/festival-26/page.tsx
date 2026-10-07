import CampaignPage from "@/components/CampaignPage";

export const metadata = {
  title: "Loomora Fest70 — Upto 70% Off | Loomora",
  description:
    "Celebrate Loomora Fest70 with upto 70% off on ethnic wear, festive kurti, saree, panjabi and kids festive collection.",
};

export default function Festival26Page() {
  return (
    <CampaignPage
      eyebrow="Sale is live — limited time"
      title="Loomora Fest70"
      off="UPTO 70% OFF"
      note="FREE DELIVERY ON ৳148+"
      gradient="bg-[linear-gradient(135deg,#7f1d1d_0%,#9f1239_55%,#e11d48_100%)]"
      cards={[
        {
          image: "/images/women/m-4.jpg",
          label: "Men's Collection",
          sub: "Panjabi, Kurta & More",
          href: "/product/m-2",
        },
        {
          image: "/images/men/w-2.jpg",
          label: "Women's Collection",
          sub: "Saree, Kurti & Salwar",
          href: "/product/w-3",
        },
        {
          image: "/images/men/w-4.jpg",
          label: "Kid's Collection",
          sub: "Frocks, Kurti & Sets",
          href: "/product/k-4",
        },
      ]}
      spotlights={[
        {
          image: "/images/women/women.avif",
          label: "Printed Kurti",
          sub: "Everyday festive chic",
          href: "/product/w-1",
        },
        {
          image: "/images/women/m-3.jpg",
          label: "Men's Panjabi",
          sub: "Festive classics",
          href: "/product/m-1",
        },
        {
          image: "/images/c-10.avif",
          label: "Winter Special",
          sub: "Cardigans & Jackets",
          href: "/product/w-7",
        },
      ]}
      dealTitle="Fest70 Hot Picks"
      dealHref="/best-deals"
      deals={[
        { id: "w-3", oldPrice: 4200 },
        { id: "w-4", oldPrice: 3900 },
        { id: "w-6", oldPrice: 6500 },
        { id: "w-1", oldPrice: 5600 },
        { id: "w-5", oldPrice: 6900 },
        { id: "k-7", oldPrice: 3900 },
        { id: "k-3", oldPrice: 2900 },
        { id: "k-4", oldPrice: 3300 },
      ]}
    />
  );
}
