import type { NextConfig } from "next";

// Hosted on Vercel at tattvastories.com — a normal Next App Router app with
// /api route handlers. (No static export, no basePath, no trailingSlash: the
// last of those 308-redirects POST /api/* and breaks the admin functions.)
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
