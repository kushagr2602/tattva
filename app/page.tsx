import Link from "next/link";
import { getProducts, getSiteImages } from "@/lib/catalogue";
import { site, whatsappLink } from "@/lib/site";
import Photo from "./components/Photo";
import ProductCard from "./components/ProductCard";
import { Toran, Motif } from "./components/decor";

const OCCASIONS = [
  "Weddings", "Anniversaries", "Housewarmings", "Diwali", "Rakhi",
  "Naming ceremonies", "Corporate gifting", "Family celebrations",
];

const COLLECTIONS: { eyebrow: string; category: string; title: string; note: string }[] = [
  { eyebrow: "For beginnings", category: "Wedding", title: "Wedding & Trousseau", note: "Shagun sets, return gifts and heirloom boxes, chosen to be remembered." },
  { eyebrow: "For rituals", category: "Pooja", title: "Pooja & Mandir", note: "Thalis, kalash and aarti pieces that join the family's customs." },
  { eyebrow: "For festivals", category: "Diwali", title: "Diwali & Festive", note: "Diyas, dry-fruit platters and hampers for the whole guest list." },
  { eyebrow: "For the home", category: "Home & Table", title: "Home & Table", note: "Serveware, urlis and quiet décor for everyday elegance." },
];

const PILLARS = [
  { n: "01", title: "Craft", body: "Handworked silver, chosen for proportion, finish and feel." },
  { n: "02", title: "Celebration", body: "Made for weddings, festivals, housewarmings and milestones." },
  { n: "03", title: "Story", body: "A handwritten card and a piece tied to a person and a moment." },
  { n: "04", title: "Kept", body: "Designed to outlast the occasion — reused, regifted, remembered." },
];

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
            <p className="eyebrow">Objects of tradition · Stories for generations</p>
            <h1 className="hero-title">
              Where every gift<br /><em>becomes a story.</em>
            </h1>
            <p className="hero-sub">
              Tattva is a curated catalogue of handcrafted silver — thalis, urlis, diyas,
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

      {/* ---- occasion ticker ---- */}
      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[...OCCASIONS, ...OCCASIONS].map((o, i) => (
            <span key={i} className="ticker-item">{o}<i>✦</i></span>
          ))}
        </div>
      </div>

      {/* ---- brand meaning ---- */}
      <section className="wrap meaning reveal">
        <p className="eyebrow">The name</p>
        <h2 className="meaning-title">What <em>Tattva</em> means</h2>
        <p className="meaning-body">
          Tattva (तत्त्व) is Sanskrit for the <strong>essence</strong> of a thing — its truest nature,
          the element it is made of. A gift, at its best, is the same: not the object, but the meaning
          it carries — the relationship, the occasion, the memory held inside it. That is what every
          Tattva piece is chosen for.
        </p>
      </section>

      {/* ---- collections ---- */}
      <section className="wrap collections">
        <div className="section-head reveal">
          <p className="eyebrow">Occasion-led collections</p>
          <h2>Gifts for the moments that matter</h2>
          <hr className="rule" />
        </div>
        <div className="collection-grid">
          {COLLECTIONS.map((c) => (
            <Link key={c.category} href={`/catalogue?category=${encodeURIComponent(c.category)}`} className="collection reveal">
              <span className="collection-eyebrow">{c.eyebrow}</span>
              <h3 className="collection-title">{c.title}</h3>
              <p className="collection-note">{c.note}</p>
              <span className="collection-link">View collection →</span>
            </Link>
          ))}
        </div>
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

      {/* ---- four pillars ---- */}
      <section className="pillars on-dark reveal">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The Tattva idea</p>
            <h2>Four things every piece carries</h2>
          </div>
          <div className="pillar-grid">
            {PILLARS.map((p) => (
              <div key={p.n} className="pillar">
                <span className="pillar-n">{p.n}</span>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- motto teaser ---- */}
      <section className="wrap ethos-teaser-light reveal">
        <p className="eyebrow">Our motto</p>
        <h2 className="teaser-title">Made to be kept, not thrown away.</h2>
        <p className="teaser-body">
          A Tattva piece doesn&apos;t rust, fade or end up in a bin after one festival. One piece,
          many lives — a gift that keeps coming back out, year after year.
        </p>
        <Link href="/sustainability" className="btn btn-ghost btn-ghost-dark">Why it lasts →</Link>
      </section>

      {/* ---- about teaser ---- */}
      <section className="about-teaser-band on-dark reveal">
        <div className="wrap">
          <p className="eyebrow">{site.owner}</p>
          <h2 className="teaser-title">An artist&apos;s eye behind every package</h2>
          <p className="teaser-body">
            Tattva is Manisha&apos;s — an artist and chef who spent years making these gifts for the
            people she loves, and now makes them for you. Every order comes with a handwritten story card.
          </p>
          <Link href="/about" className="btn btn-ghost">Meet Manisha →</Link>
        </div>
      </section>
    </>
  );
}
