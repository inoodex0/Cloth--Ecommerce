import ProductDetail from "@/components/ProductDetail";
import { catalog, getProduct } from "@/lib/catalog";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return { title: "Product Not Found — Loomora" };
  }

  return {
    title: `${product.name} — Loomora`,
    description: `Buy ${product.name} at Loomora. ${product.brand} • ৳${product.price}`,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const product = getProduct(id);
  if (!product) notFound();

  const price =
    typeof sp.price === "string" && !Number.isNaN(Number(sp.price))
      ? Number(sp.price)
      : undefined;
  const oldPrice =
    typeof sp.old === "string" && !Number.isNaN(Number(sp.old))
      ? Number(sp.old)
      : undefined;

  const prefix = product.category.split(" ")[0];
  const related = [
    ...catalog.filter(
      (item) => item.id !== product.id && item.category.startsWith(prefix)
    ),
    ...catalog.filter(
      (item) => item.id !== product.id && !item.category.startsWith(prefix)
    ),
  ].slice(0, 6);

  return (
    <ProductDetail
      product={product}
      related={related}
      price={price}
      oldPrice={oldPrice}
    />
  );
}
