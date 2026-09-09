import Link from "next/link";
import { site, nav, whatsappLink } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="footer on-dark">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <span className="brandmark">{site.brand}</span>
          <p className="footer-essence"><span className="deva">तत्त्व</span> the essence of a good gift</p>
          <p className="footer-tagline">{site.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <Link href="/codes">Item codes</Link>
        </nav>
        <div className="footer-contact">
          <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.instagram && <a href={site.instagram} target="_blank" rel="noopener">Instagram</a>}
        </div>
      </div>
    </footer>
  );
}
