import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Made to be kept — Tattva",
  description: "Why German silver gifting is the un-disposable gift: no single-use, refill and regift, built to last generations.",
};

export default function SustainabilityPage() {
  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Our motto</p>
          <h1>Made to be kept,<br />not thrown away.</h1>
          <p className="page-head-sub">
            The most sustainable gift is the one that never gets thrown away. German silver is exactly that.
          </p>
        </div>
      </section>

      <section className="wrap prose reveal">
        <p>
          Most festive gifting is designed to be opened once. Plastic hampers, cellophane, ribbon,
          a box that goes straight to the bin the next morning. A Tattva gift is the opposite. German
          silver doesn&apos;t rust or fade — the box that arrives full of mithai becomes the box on the
          dresser; the thali comes back out every Diwali; the platter hosts guests for years. One piece,
          many lives.
        </p>
      </section>

      <section className="wrap value-grid reveal">
        <Value title="No single-use" body="No plastic hamper, no wrapping waste. The gift is the keepsake, not the packaging around it." />
        <Value title="Refill & regift" body="Empty it, fill it again, pass it on. A dry-fruit box refills every season; a piece regifted only gathers more meaning." />
        <Value title="Built to outlast us" body="German silver is an alloy made to last generations — the kind of thing that becomes a family heirloom, not landfill." />
        <Value title="A second life, by design" body="Every piece in the catalogue lists how it gets reused after the occasion. We choose pieces that earn a permanent place at home." />
      </section>

      <section className="wrap prose reveal">
        <h2 className="prose-h">Caring for German silver</h2>
        <p>
          Wipe with a soft dry cloth after use, and store away from damp. A gentle polish now and then
          brings the shine back — no special chemicals needed. Treated kindly, a single piece easily
          outlives the occasion it was gifted for.
        </p>
        <div className="hero-cta" style={{ marginTop: "1.5rem" }}>
          <Link href="/catalogue" className="btn btn-primary">Browse the catalogue</Link>
        </div>
      </section>
    </>
  );
}

function Value({ title, body }: { title: string; body: string }) {
  return (
    <div className="value">
      <h3 className="value-title">{title}</h3>
      <p className="value-body">{body}</p>
    </div>
  );
}
