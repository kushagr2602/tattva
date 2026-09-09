import Link from "next/link";
import Photo from "./Photo";
import { site, nav } from "@/lib/site";

// Shared across every page. `logo` is the server-resolved path ("" if not added).
export default function SiteHeader({ logo }: { logo: string }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brandlink" aria-label={site.brand}>
          <Photo src={logo} alt={site.brand} width={60} height={60} className="logo-img" fallback={null} />
          <span className="brandmark">{site.brand}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>

        <details className="nav-toggle">
          <summary aria-label="Menu"><span /><span /><span /></summary>
          <div className="nav-menu">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
