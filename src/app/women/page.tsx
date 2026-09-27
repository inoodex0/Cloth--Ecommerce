import CatalogPageLayout from "@/components/CatalogPageLayout";
import { catalog } from "@/lib/catalog";

export const metadata = {
  title: "Women's Fashion & Clothing — Loomora",
  description: "Shop trendy women's sarees, kurti sets, tops, tunics, palazzos, and winter wear at Loomora.",
};

const topSubcategories = [
  "Womens Saree",
  "Womens Kurti",
  "Womens 2 Pcs Set",
  "Womens 3 Pcs Set",
  "Womens Tops",
  "Womens Tunic",
  "Womens Palazzo",
  "Womens Denim",
  "Womens Jacket",
  "Womens Nightwear",
  "Clothing & Fashion",
];

const categories = [
  "Womens Saree",
  "Womens Kurti",
  "Womens 2 Pcs Set",
  "Womens 3 Pcs Set",
  "Womens Tops",
  "Womens Palazzo",
  "Womens Denim",
  "Womens Cardigan",
  "Womens Jacket",
  "Womens Ethnic Wear",
  "Womens Winter Wear",
];

const brands = ["Loomora", "DHEU", "Loomora Women", "Loomora Signature"];

const products = catalog.filter((product) => product.id.startsWith("w-"));

export default function WomenPage() {
  return (
    <CatalogPageLayout
      title="Womens"
      topSubcategories={topSubcategories}
      categories={categories}
      brands={brands}
      products={products}
    />
  );
}
