import NavMegaMenu, { type MegaSection } from "@/components/NavMegaMenu";

const columns: MegaSection[][] = [
  [
    {
      heading: "Mens Top Wear",
      items: [
        "Mens Panjabi",
        "Mens Casual Shirt",
        "Mens Sherwani",
        "Mens Formal Shirt",
        "Mens Katua & Fatua",
        "Mens T-Shirt",
        "Mens Polo",
        "Mens Coti",
      ],
    },
  ],
  [
    {
      heading: "Mens Jacket",
      items: [
        "Mens Hoodie",
        "Mens Overcoat",
        "Mens Sweatshirt",
        "Mens Vest",
        "Mens Biker Jacket",
        "Mens Blazer",
        "Mens Denim",
      ],
    },
  ],
  [
    {
      heading: "Mens Bottom Wear",
      items: [
        "Mens Formal Pant",
        "Mens Chino Pant",
        "Mens Trouser",
        "Mens Jeans Pant",
        "Mens Cargo Pant",
        "Mens Joggers",
        "Mens Shorts",
        "Five Pocket Pant",
      ],
    },
  ],
  [
    { items: ["Mens Payjama", "Mens Lungi"] },
    {
      heading: "Mens Sports Wear",
      items: ["Mens Sports Wear Set", "Mens Jersey"],
    },
    { heading: "Mens Innerwear", items: ["Mens Innerwear"] },
    { heading: "Winter Collection" },
  ],
];

export default function MensMenu({ active }: { active: boolean }) {
  return (
    <NavMegaMenu
      label="Mens"
      active={active}
      columns={columns}
      image="/images/women/m-5.jpg"
      imageHref="/men"
    />
  );
}
