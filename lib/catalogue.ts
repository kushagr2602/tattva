import fs from "node:fs";
import path from "node:path";
import { products, type Product } from "./products";
import { site, about } from "./site";

// Server-only image resolution: only return a path if the file exists in /public,
// and be forgiving about the extension (/products/x.jpg resolves to x.png/.jpeg/.webp).
const PUBLIC_DIR = path.join(process.cwd(), "public");

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function resolveImage(p: string): string {
  if (!p) return "";
  const stem = p.replace(/\.[^.]+$/, "");
  for (const c of [p, ...[".jpg", ".jpeg", ".png", ".webp"].map((e) => stem + e)]) {
    if (fs.existsSync(path.join(PUBLIC_DIR, c))) return BASE + c; // prefix for the URL, not the fs lookup
  }
  return "";
}

export function getProducts(): Product[] {
  return products.map((p) => ({ ...p, image: resolveImage(p.image) }));
}

export function getProduct(id: string): Product | undefined {
  const p = products.find((x) => x.id === id);
  return p ? { ...p, image: resolveImage(p.image) } : undefined;
}

export function getSiteImages() {
  return {
    logo: resolveImage(site.logo),
    aboutPhoto: resolveImage(about.photo),
    heroBg: resolveImage("/hero.jpg"),
  };
}
