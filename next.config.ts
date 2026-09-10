import type { NextConfig } from "next";

// Hosted on Vercel at tattvastories.com — a normal Next app (App Router + /api
// route handlers). No static export, no basePath.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
