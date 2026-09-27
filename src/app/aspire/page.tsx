import CampaignPage from "@/components/CampaignPage";

export const metadata = {
  title: "ASPIRE — Premium Line | Loomora",
  description:
    "ASPIRE by Loomora — handpicked premium ethnic wear, blazers, knitwear and signature pieces for the discerning.",
};

export default function AspirePage() {
  return (
    <CampaignPage
      eyebrow="The Premium Line"
      title="ASPIRE"
      off="EXCLUSIVE EDIT"
      note="HANDPICKED LUXURY PIECES"
      gradient="bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)]"
      cards={[
        {
          image: "/images/women/m-5.jpg",
          label: "Men's Signature",
          sub: "Premium panjabi edit",
          href: "/men",
        },
        {
          image: "/images/men/w-3.jpg",
          label: "Women's Couture",
          sub: "Designer kameez & sets",
          href: "/women",
        },
        {
          image: "/images/men/w-4.jpg",
          label: "Kid's Style",
          sub: "Mini fashion, max charm",
          href: "/kids",
        },
      ]}
      spotlights={[
        {
          image: "/images/c-6.avif",
          label: "Power Dressing",
          sub: "Blazers & Formals",
          href: "/men",
        },
        {
          image: "/images/c-5.avif",
          label: "Soft Layers",
          sub: "Knitwear collection",
          href: "/women",
        },
        {
          image: "/images/c-1.avif",
          label: "Bomber Edit",
          sub: "Street premium",
          href: "/men",
        },
      ]}
      dealTitle="The Aspire Edit"
      dealHref="/new-in"
      deals={[
        { id: "w-7", oldPrice: 27400 },
        { id: "w-8", oldPrice: 7900 },
        { id: "m-7", oldPrice: 5900 },
        { id: "w-5", oldPrice: 3800 },
        { id: "m-6", oldPrice: 2700 },
        { id: "w-9", oldPrice: 3600 },
        { id: "m-8", oldPrice: 2300 },
        { id: "k-9", oldPrice: 2100 },
      ]}
    />
  );
}
