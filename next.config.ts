import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow static export for simple public hosting if needed
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
};

export default nextConfig;
