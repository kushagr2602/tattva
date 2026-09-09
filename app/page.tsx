import Link from "next/link";
import { getProducts, getSiteImages } from "@/lib/catalogue";
import { site } from "@/lib/site";
import Photo from "./components/Photo";
import ProductCard from "./components/ProductCard";
import { Toran, Motif, HeroBloom } from "./components/decor";

const OCCASIONS = [
  "Weddings", "Anniversaries", "Housewarmings", "Diwali", "Rakhi",
  "Naming ceremonies", "Corporate gifting", "Family celebrations",
];

const PROBLEMS: { problem: string; help: string }[] = [
  { problem: "A long guest list and no time.", help: "Send us the count and the occasion. We build matching gifts for everyone, in one go." },
  { problem: "Every gift feels generic.", help: "Handpicked pieces and a handwritten note from Manisha, so each one feels chosen, not bought." },
  { problem: "Not sure what suits the occasion.", help: "Tell us the relationship and the moment, and we put together a shortlist for you." },
  { problem: "A budget you don't want to overshoot.", help: "Options at every price. We quote to what works for you, with no pressure." },
  { problem: "You need it by a certain date.", help: "Share the deadline and we'll confirm what we can get to you in time." },
  { problem: "Tired of gifts that get thrown away.", help: "Silver that lasts for years and gets reused, not binned the next morning." },
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
  // Optional: a real hero.jpg photo backdrop if the user drops one in /public.
  const bg = heroBg;

  return (
    <>
      {/* ---- hero ---- */}
      <section
        className={`hero on-dark ${bg ? "hero-photo" : ""}`}
        style={bg ? { backgroundImage: `linear-gradient(105deg, rgba(15,42,32,0.93) 30%, rgba(15,42,32,0.5) 100%), url(${bg})` } : undefined}
      >
        <Toran />
        {!bg && <HeroBloom />}
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
              <Link href="/enquire" className="btn btn-ghost">Start an enquiry</Link>
            </div>
            <p className="reassure">Free to ask · No obligation · We usually reply within a few hours</p>
            <p className="hero-note">No fixed prices. Every order is quoted to the package.</p>
          </div>
          <div className="hero-plate" aria-hidden>
            <div className="arch-frame">
              <span className="arch-finial" />
              <Photo src={logo} alt="Tattva" fallback={<Motif />} />
            </div>
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

      {/* ---- how we help (problem -> solution) ---- */}
      <section className="wrap help reveal">
        <div className="section-head">
          <p className="eyebrow">How we help</p>
          <h2>Gifting, without the headache</h2>
          <hr className="rule" />
        </div>
        <div className="help-grid">
          {PROBLEMS.map((p) => (
            <div key={p.problem} className="help-card">
              <h3 className="help-problem">{p.problem}</h3>
              <p className="help-text">{p.help}</p>
            </div>
          ))}
        </div>
        <div className="section-more">
          <Link href="/enquire" className="btn btn-primary">Tell us your problem</Link>
          <p className="reassure">Free to ask · No obligation · We usually reply within a few hours</p>
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
