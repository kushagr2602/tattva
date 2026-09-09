import type { NextConfig } from "next";

// STATIC_EXPORT=1 -> GitHub Pages build: fully static, served under /tattva.
// No flag (e.g. on Vercel) -> normal Next app at the domain root, so the /api
// serverless functions and /admin page work.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isExport ? "export" : undefined,
  basePath: isExport ? "/tattva" : "",
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: isExport ? "/tattva" : "" },
};

export default nextConfig;
