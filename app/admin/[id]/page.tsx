import { notFound } from "next/navigation";
import { getProduct } from "@/lib/catalogue";
import ProductForm from "../ProductForm";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProduct(id);
  return { title: p ? `Edit ${p.name} | Tattva` : "Product not found | Tattva" };
}

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  return <ProductForm mode="edit" id={id} initial={product} />;
}
