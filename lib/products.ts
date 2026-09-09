import productsJson from "@/content/products.json";

export type Category = "Diwali" | "Wedding" | "Pooja" | "Home & Table";

export const categories: Category[] = ["Diwali", "Wedding", "Pooja", "Home & Table"];

export type Product = {
  id: string;
  code: string; // item code / SKU, e.g. "TTV-014"
  name: string;
  category: Category;
  blurb: string;
  // The "second life", how the piece gets reused after the occasion.
  reuse: string;
  // Photo path under /public/products. The file is <id>.jpg by convention.
  image: string;
  // "cover" (fills, may crop) for landscape shots; "contain" (shown whole on a soft
  // ground) for tall/portrait shots. Set by check-framing.mjs / the admin AI.
  fit?: "cover" | "contain";
};

// Product data lives in content/products.json so the admin publish flow can append
// to it programmatically. Edit that file (or use /admin) to add products.
export const products: Product[] = productsJson as Product[];
