import Link from "next/link";
import Photo from "./Photo";
import { Motif } from "./decor";
import type { Product } from "@/lib/products";

// Links to the product's own page. Used in both server pages and the client grid.
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalogue/${product.id}`} className="card reveal">
      <div className={`card-media engraved ${product.fit === "contain" ? "media-contain" : ""}`}>
        <Photo src={product.image} alt={product.name} fill fit={product.fit}
          fallback={<div className="plate" aria-hidden><Motif small /></div>} />
      </div>
      <div className="card-body">
        <span className="card-cat">{product.category}<i className="card-code">{product.code}</i></span>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-blurb">{product.blurb}</p>
        <p className="card-reuse"><span className="reuse-tag">Second life</span>{product.reuse}</p>
        <span className="card-link">View details →</span>
      </div>
    </Link>
  );
}
