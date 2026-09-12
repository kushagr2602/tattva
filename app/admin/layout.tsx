import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="admin-nav">
        <div className="wrap admin-nav-inner">
          <span className="admin-nav-label">Tattva admin</span>
          <nav>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/new">Add product</Link>
            <Link href="/">View site</Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
