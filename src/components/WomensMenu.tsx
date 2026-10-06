import NavMegaMenu, { type MegaSection } from "@/components/NavMegaMenu";

const columns: MegaSection[][] = [
  [
    {
      heading: "Womens Top Wear",
      items: [
        "Single Ethnic",
        "Ethnic Set (2 & 3 Pcs)",
        "Fashion Tops",
        "Women Shirt",
        "Womens Tees and Tank",
        "Scarf",
        "Saree",
        "Maternity Wear",
        "Poncho",
        "Womens Jacket",
      ],
    },
  ],
  [
    {
      heading: "Womens Hoodie",
      items: [
        "Womens Biker Jacket",
        "Womens Sweatshirt",
        "Womens Sweater",
        "Womens Blazer",
        "Womens Overcoat",
        "Womens Denim",
      ],
    },
    {
      heading: "Womens Bottom Wear",
      items: ["Womens Pant", "Womens Chino Pant"],
    },
  ],
  [
    {
      heading: "Womens Jeans Pant",
      items: [
        "Womens Formal Pant",
        "Womens Cargo Pant",
        "Womens Joggers",
        "Womens Skirt",
        "Womens Palazzo",
        "Womens TROUSER",
      ],
    },
    { heading: "Womens Modest Wear" },
    { heading: "Womens Western Set", items: ["CO-ORD"] },
  ],
  [
    { heading: "Womens Sleepwear" },
    { heading: "Womens Jumpsuit" },
    { heading: "Womens Suit Set" },
    {
      heading: "Western",
      items: ["Midi Dress", "Western Gown", "Womens Shrug", "Womens Party Wear"],
    },
    { heading: "Winter Collection" },
  ],
];

export default function WomensMenu({ active }: { active: boolean }) {
  return (
    <NavMegaMenu
      label="Womens"
      active={active}
      columns={columns}
      image="/images/women/women.avif"
      imageHref="/women"
    />
  );
}
