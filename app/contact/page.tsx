import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & ordering | Tattva",
  description: "How to order from Tattva: browse, message on WhatsApp, and we quote and pack your gift.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">How ordering works</p>
          <h1>Three steps, no checkout</h1>
          <p className="page-head-sub">
            We keep it personal. There&apos;s no cart, you tell us what you like, and we build the package with you.
          </p>
        </div>
      </section>

      <section className="wrap">
        <ol className="steps steps-light reveal">
          <Step n="01" title="Browse & shortlist" body="Go through the catalogue and note the pieces that fit the occasion and your budget." />
          <Step n="02" title="Message us" body="Send the shortlist on WhatsApp with the occasion, quantity and the date you need it by." />
          <Step n="03" title="We quote & pack" body="You get a price for the package, we confirm the details, and we hand over the finished gifts." />
        </ol>
      </section>

      <section className="wrap contact reveal">
        <div className="contact-inner engraved">
          <p className="eyebrow">Get in touch</p>
          <h2>Planning a Diwali order or a wedding?</h2>
          <p className="contact-sub">
            Custom and bulk orders welcome. The quickest way to reach us is WhatsApp.
          </p>
          <div className="hero-cta">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn btn-primary">
              Message on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-ghost btn-ghost-dark">Email {site.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="step reveal">
      <span className="step-n">{n}</span>
      <h3 className="step-title">{title}</h3>
      <p className="step-body">{body}</p>
    </li>
  );
}
