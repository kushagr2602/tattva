import Link from "next/link";
import { site, nav, whatsappLink } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="footer on-dark">
      <div className="wrap footer-grid">
        <div>
          <span className="brandmark">{site.brand}</span>
          <p className="footer-meta">{site.owner} · {site.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
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
