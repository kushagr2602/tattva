"use client";

import { useState } from "react";
import { categories, type Category, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type Filter = "All" | Category;

// Client island: the category filter over a server-resolved product list.
export default function CatalogueGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter by occasion">
        {(["All", ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={`chip ${filter === c ? "chip-on" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {shown.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
