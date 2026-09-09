import Link from "next/link";
import { getProducts, getSiteImages } from "@/lib/catalogue";
import { site, whatsappLink } from "@/lib/site";
import Photo from "./components/Photo";
import ProductCard from "./components/ProductCard";
import { Toran, Motif } from "./components/decor";

export default function Home() {
  const products = getProducts();
  const { logo, heroBg } = getSiteImages();
  const featured = products.slice(0, 6);

  return (
    <>
      {/* ---- hero ---- */}
      <section
        className={`hero on-dark ${heroBg ? "hero-photo" : ""}`}
        style={heroBg ? { backgroundImage: `linear-gradient(105deg, rgba(15,42,32,0.94) 30%, rgba(15,42,32,0.55) 100%), url(${heroBg})` } : undefined}
      >
        <Toran />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">German Silver Gifting · Diwali · Weddings</p>
            <h1 className="hero-title">
              Where every gift<br /><em>becomes a story.</em>
            </h1>
            <p className="hero-sub">
              Tattva is a curated catalogue of handcrafted German silver — thalis, urlis, diyas,
              trousseau boxes and more. Browse, pick what suits the moment, and we&apos;ll put
              the package together with you.
            </p>
            <div className="hero-cta">
              <Link href="/catalogue" className="btn btn-primary">Browse the catalogue</Link>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost">
                Enquire on WhatsApp
              </a>
            </div>
            <p className="hero-note">No fixed prices — every order is quoted to the package.</p>
          </div>
          <div className="hero-plate engraved" aria-hidden>
            <Photo src={logo} alt="" width={210} height={210} className="hero-logo" fallback={<Motif />} />
            <span className="hero-plate-word">{site.owner}</span>
          </div>
        </div>
      </section>

      {/* ---- occasions strip ---- */}
      <section className="wrap strip reveal">
        <Occasion title="Diwali hampers" note="Repeatable gifts for a full guest list." />
        <Occasion title="Wedding & trousseau" note="Shagun pieces and heirloom boxes." />
        <Occasion title="Bulk & corporate" note="Consistent sets, quoted per quantity." />
      </section>

      {/* ---- featured ---- */}
      <section className="wrap catalogue">
        <div className="section-head reveal">
          <p className="eyebrow">The catalogue</p>
          <h2>A few pieces to start with</h2>
          <hr className="rule" />
        </div>
        <div className="grid">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="section-more reveal">
          <Link href="/catalogue" className="btn btn-ghost btn-ghost-dark">See the full catalogue →</Link>
        </div>
      </section>

      {/* ---- motto teaser ---- */}
      <section className="ethos-teaser on-dark reveal">
        <div className="wrap">
          <p className="eyebrow">Our motto</p>
          <h2 className="teaser-title">Made to be kept, not thrown away.</h2>
          <p className="teaser-body">
            German silver doesn&apos;t rust, fade or end up in a bin after one festival. One piece,
            many lives — a gift that keeps coming back out, year after year.
          </p>
          <Link href="/sustainability" className="btn btn-ghost">Why it lasts →</Link>
        </div>
      </section>

      {/* ---- about teaser ---- */}
      <section className="wrap about-teaser reveal">
        <p className="eyebrow">{site.owner}</p>
        <h2>An artist&apos;s eye behind every package</h2>
        <p className="teaser-body">
          Tattva is Manisha&apos;s — an artist and chef who spent years making these gifts for the
          people she loves, and now makes them for you. Every order comes with a handwritten story card.
        </p>
        <Link href="/about" className="btn btn-ghost btn-ghost-dark">Meet Manisha →</Link>
      </section>
    </>
  );
}

function Occasion({ title, note }: { title: string; note: string }) {
  return (
    <div className="occ">
      <h3 className="occ-title">{title}</h3>
      <p className="occ-note">{note}</p>
    </div>
  );
}
