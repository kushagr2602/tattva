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
  { eyebrow: "For weddings", category: "Wedding", title: "Wedding & Trousseau", note: "Shagun sets, return gifts and trousseau boxes." },
  { eyebrow: "For the mandir", category: "Pooja", title: "Pooja & Mandir", note: "Thalis, kalash and aarti pieces for daily prayer and festivals." },
  { eyebrow: "For festivals", category: "Diwali", title: "Diwali & Festive", note: "Diyas, dry-fruit platters and hampers for the whole guest list." },
  { eyebrow: "For the home", category: "Home & Table", title: "Home & Table", note: "Serveware, urlis and décor for the home." },
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
            <p className="eyebrow">Diwali · Weddings · Festive gifting</p>
            <h1 className="hero-title">
              Where every gift<br /><em>becomes a story.</em>
            </h1>
            <p className="hero-sub">
              Tattva makes silver gifts for Diwali, weddings and everyday occasions: thalis, urlis,
              diyas, trousseau boxes and more. Tell us the occasion and we&apos;ll help you put the
              package together.
            </p>
            <div className="hero-cta">
              <Link href="/catalogue" className="btn btn-primary">Browse the catalogue</Link>
              <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost">
                Enquire on WhatsApp
              </a>
            </div>
            <p className="hero-note">No fixed prices. Every order is quoted to the package.</p>
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
          Tattva (तत्त्व) is Sanskrit for essence, the true nature of a thing. We chose the name
          because a good gift isn&apos;t really about the object. It&apos;s about the person you give
          it to, and the occasion behind it.
        </p>
      </section>

      {/* ---- collections ---- */}
      <section className="wrap collections">
        <div className="section-head reveal">
          <p className="eyebrow">Shop by occasion</p>
          <h2>Browse the collections</h2>
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

      {/* ---- motto teaser ---- */}
      <section className="wrap ethos-teaser-light reveal">
        <p className="eyebrow">Our motto</p>
        <h2 className="teaser-title">Made to be kept, not thrown away.</h2>
        <p className="teaser-body">
          Silver won&apos;t rust or fade, or get thrown out after one festival. The same piece comes
          back out year after year, and can be refilled and regifted for as long as you own it.
        </p>
        <Link href="/sustainability" className="btn btn-ghost btn-ghost-dark">Why it lasts →</Link>
      </section>

      {/* ---- about teaser ---- */}
      <section className="about-teaser-band on-dark reveal">
        <div className="wrap">
          <p className="eyebrow">{site.owner}</p>
          <h2 className="teaser-title">Made by Manisha</h2>
          <p className="teaser-body">
            Tattva is run by Manisha, an artist and chef who spent years making these gifts for her
            own family and friends. Every order comes with a handwritten note from her.
          </p>
          <Link href="/about" className="btn btn-ghost">About Manisha →</Link>
        </div>
      </section>
    </>
  );
}
