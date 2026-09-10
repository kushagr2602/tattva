import type { NextConfig } from "next";

// Hosted on Vercel at tattvastories.com — a normal Next App Router app with
// /api route handlers.
// trailingSlash must be false (explicit): with it on, Next 308-redirects
// POST /api/* to the slash form and the admin functions break.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
