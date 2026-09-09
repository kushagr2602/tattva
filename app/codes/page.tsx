import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Item codes | Tattva",
  description: "Reference list of every Tattva item and its code.",
};

export default function CodesPage() {
  const products = getProducts().slice().sort((a, b) => a.code.localeCompare(b.code));

  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Reference</p>
          <h1>Item codes</h1>
          <p className="page-head-sub">
            Every piece in the catalogue and its code. Use the code when placing or discussing an order.
          </p>
        </div>
      </section>

      <section className="wrap codes-wrap">
        <div className="codes-scroll">
          <table className="codes-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Item</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="codes-code">{p.code}</td>
                  <td><Link href={`/catalogue/${p.id}`}>{p.name}</Link></td>
                  <td>{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="codes-count">{products.length} items</p>
      </section>
    </>
  );
}
