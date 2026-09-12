import ProductForm from "../ProductForm";

export const metadata = { title: "Add product | Tattva" };

export default function NewProduct() {
  return <ProductForm mode="new" />;
}
