import type { Metadata } from "next";
import { getProducts } from "@/lib/catalogue";
import CatalogueGrid from "../components/CatalogueGrid";

export const metadata: Metadata = {
  title: "Catalogue — Tattva",
  description: "Handcrafted silver gifting — pooja thalis, dry-fruit platters, gift boxes and more.",
};

export default function CataloguePage() {
  const products = getProducts();
  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">The catalogue</p>
          <h1>Pick the pieces, we&apos;ll build the gift</h1>
          <p className="page-head-sub">
            No fixed prices — tell us the occasion and quantity, and we quote the whole package.
            Every piece is silver, made to be used long after the day.
          </p>
        </div>
      </section>
      <section className="wrap catalogue">
        <CatalogueGrid products={products} />
      </section>
    </>
  );
}
