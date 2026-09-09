import Link from "next/link";
import { getProducts, getSiteImages } from "@/lib/catalogue";
import { whatsappLink } from "@/lib/site";
import { Toran } from "../components/decor";

export const metadata = { title: "Hero options preview | Tattva" };

// Temporary page to compare three hero layouts. Delete /app/preview once chosen.
export default function Preview() {
  const products = getProducts();
  const { logo } = getSiteImages();
  const bg = products.find((p) => p.id === "peacock-katori-set")?.image || products[0].image;
  const four = products.slice(0, 4);

  const copy = (
    <div className="hero-copy">
      <p className="eyebrow">Diwali · Weddings · Festive gifting</p>
      <h1 className="hero-title">Where every gift<br /><em>becomes a story.</em></h1>
      <p className="hero-sub">
        Tattva makes silver gifts for Diwali, weddings and everyday occasions: thalis, urlis,
        diyas, trousseau boxes and more.
      </p>
      <div className="hero-cta">
        <Link href="/catalogue" className="btn btn-primary">Browse the catalogue</Link>
        <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-ghost">Enquire on WhatsApp</a>
      </div>
    </div>
  );

  const archLogo = (
    <div className="hero-plate">
      <div className="arch-frame">
        <span className="arch-finial" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo ? <img src={logo} alt="Tattva" /> : null}
      </div>
    </div>
  );

  return (
    <>
      {/* ---------- Option A: product photo backdrop ---------- */}
      <div className="preview-label"><span>Option A</span> Product photo backdrop (arched logo)</div>
      <section className="hero on-dark hero-photo"
        style={{ backgroundImage: `linear-gradient(105deg, rgba(15,42,32,0.93) 30%, rgba(15,42,32,0.5) 100%), url(${bg})` }}>
        <Toran />
        <div className="wrap hero-grid">{copy}{archLogo}</div>
      </section>

      {/* ---------- Option B: product collage ---------- */}
      <div className="preview-label"><span>Option B</span> Product collage beside text (logo in header only)</div>
      <section className="hero on-dark">
        <Toran />
        <div className="wrap hero-grid">
          {copy}
          <div className="hero-collage">
            {four.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.id} src={p.image} alt={p.name} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Option C: product strip below hero ---------- */}
      <div className="preview-label"><span>Option C</span> Arched logo hero + product strip below</div>
      <section className="hero on-dark">
        <Toran />
        <div className="wrap hero-grid">{copy}{archLogo}</div>
      </section>
      <div className="hero-strip">
        {four.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.image} alt={p.name} />
        ))}
      </div>
    </>
  );
}
