import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-builder-camp",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
