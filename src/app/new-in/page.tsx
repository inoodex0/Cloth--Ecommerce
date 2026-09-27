import CatalogPageLayout from "@/components/CatalogPageLayout";
import { catalog } from "@/lib/catalog";

export const metadata = {
  title: "New In — Loomora",
  description:
    "Discover the latest arrivals at Loomora — new shirts, sarees, kurti sets, jackets, kids wear and more.",
};

const topSubcategories = [
  "Mens Polo",
  "Mens Jeans Pant",
  "Mens Jacket",
  "Mens Formal Shirt",
  "Womens Kurti",
  "Womens Saree",
  "Womens 2 Pcs Set",
  "Womens Tops",
  "Girls Frock",
  "Kids Winter Wear",
  "Kids Jacket",
];

const categories = [
  "Mens Polo",
  "Mens Jeans Pant",
  "Mens Jacket",
  "Mens Formal Shirt",
  "Mens Hoodie",
  "Womens Kurti",
  "Womens Saree",
  "Womens 2 Pcs Set",
  "Womens Tops",
  "Boys Polo",
  "Girls Frock",
  "Kids Winter Wear",
  "Kids Jacket",
  "Kids Sweatshirt",
];

const brands = [
  "Loomora",
  "DHEU",
  "Loomora Signature",
  "Loomora Women",
  "Loomora Kids",
];

const newInIds = [
  "m-1",
  "m-3",
  "m-6",
  "m-8",
  "m-11",
  "w-1",
  "w-2",
  "w-5",
  "w-8",
  "w-9",
  "k-1",
  "k-3",
  "k-6",
  "k-9",
  "k-10",
];

const products = catalog.filter((product) => newInIds.includes(product.id));

export default function NewInPage() {
  return (
    <CatalogPageLayout
      title="New In"
      topSubcategories={topSubcategories}
      categories={categories}
      brands={brands}
      products={products}
    />
  );
}
