import type { NextConfig } from "next";

// GitHub Pages serves this project at kushagr2602.github.io/tattva, so a production
// build needs a base path. Dev (npm run dev) stays at the root for easy local viewing.
// If you ever move to a root domain (Vercel, custom domain), set basePath to "".
const basePath = process.env.NODE_ENV === "production" ? "/tattva" : "";

const nextConfig: NextConfig = {
  output: "export", // static HTML, works on GitHub Pages
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  // Exposed so image src paths (plain <img>, hero background) can be prefixed too.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
