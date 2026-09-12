import Link from "next/link";
import { getProducts } from "@/lib/catalogue";
import { Motif } from "../components/decor";

export const metadata = { title: "Admin dashboard | Tattva" };

// Server component: the same product data the public catalogue reads, so this
// list needs no password. Editing or deleting still requires it (enforced in
// /api/update and /api/delete).
export default function AdminDashboard() {
  const products = getProducts().slice().sort((a, b) => a.code.localeCompare(b.code));

  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Dashboard</p>
          <h1>Inventory</h1>
          <p className="page-head-sub">
            {products.length} product{products.length === 1 ? "" : "s"} on the site. Click any one to edit or remove it.
          </p>
        </div>
      </section>

      <section className="wrap admin-dash-wrap">
        <Link href="/admin/new" className="btn btn-primary" style={{ marginBottom: "1.75rem", display: "inline-flex" }}>
          + Add a new product
        </Link>

        <div className="admin-dash-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/admin/${p.id}`} className="admin-dash-card">
              <div className={`admin-dash-thumb ${p.fit === "contain" ? "media-contain" : ""}`}>
                {p.image
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={p.image} alt={p.name} />
                  : <div className="plate" aria-hidden><Motif small /></div>}
              </div>
              <div className="admin-dash-body">
                <span className="card-cat">{p.category}<i className="card-code">{p.code}</i></span>
                <h3 className="admin-dash-title">{p.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
