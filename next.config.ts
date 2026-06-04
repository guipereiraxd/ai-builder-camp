// output: "export" generates a fully static site — no Node server needed at runtime.
// Lets us deploy to any static host (GitHub Pages, S3, Nginx) without a Next.js runtime.
// Side-effect: API routes and server-side dynamic rendering are unavailable.
//
// images.unoptimized: true is required for static export — Next.js image optimization
// needs a running server to transform images on-demand, which static hosts don't provide.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
