import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { getProduct, getProducts, resolveImage } from "@/lib/catalogue";
import { siteUrl } from "@/lib/site";
import Photo from "../../components/Photo";
import ProductCard from "../../components/ProductCard";
import { Motif } from "../../components/decor";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) return { title: "Not found | Tattva" };
  const image = resolveImage(p.image); // basePath-prefixed; resolves to absolute via metadataBase
  return {
    title: `${p.name} | Tattva`,
    description: p.blurb,
    openGraph: {
      title: `${p.name} — Tattva`,
      description: p.blurb,
      url: `${siteUrl}/catalogue/${p.id}`,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <div className="wrap breadcrumb">
        <Link href="/catalogue">← Catalogue</Link>
      </div>

      <article className="wrap product">
        <div className={`product-media engraved ${product.fit === "contain" ? "media-contain" : ""}`}>
          <Photo src={product.image} alt={product.name} fill fit={product.fit}
            fallback={<div className="plate" aria-hidden><Motif /></div>} />
        </div>

        <div className="product-info">
          <span className="card-cat">{product.category}<i className="card-code">{product.code}</i></span>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-blurb">{product.blurb}</p>

          <div className="product-detail">
            <div>
              <span className="detail-label">Item code</span>
              <p>{product.code}</p>
            </div>
            <div>
              <span className="detail-label">Material</span>
              <p>Hand-finished silver, won&apos;t rust or fade, made to be kept.</p>
            </div>
            <div>
              <span className="detail-label">Second life</span>
              <p>{product.reuse}</p>
            </div>
            <div>
              <span className="detail-label">Best for</span>
              <p>{occasionFor(product.category)}</p>
            </div>
            <div>
              <span className="detail-label">Every order includes</span>
              <p>A handwritten story card from Manisha.</p>
            </div>
          </div>

          <div className="hero-cta">
            <Link
              href={`/enquire?item=${encodeURIComponent(`${product.name} (${product.code})`)}&url=${encodeURIComponent(`${siteUrl}/catalogue/${product.id}`)}`}
              className="btn btn-primary">
              Enquire about this
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-ghost-dark">How ordering works</Link>
          </div>
          <p className="reassure">It costs nothing to ask, and we usually have something bespoke in mind for you.</p>
          <p className="product-note">No fixed price, quoted to your occasion, quantity and packaging.</p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="wrap related">
          <div className="section-head">
            <p className="eyebrow">More in {product.category}</p>
            <h2>You might also like</h2>
            <hr className="rule" />
          </div>
          <div className="grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}

function occasionFor(category: string): string {
  switch (category) {
    case "Diwali": return "Diwali hampers, festival gifting and return gifts.";
    case "Wedding": return "Weddings, shagun, trousseau and housewarmings.";
    case "Pooja": return "Daily aarti, festivals and puja-room gifting.";
    default: return "Hosting, everyday use and thoughtful gifting.";
  }
}
