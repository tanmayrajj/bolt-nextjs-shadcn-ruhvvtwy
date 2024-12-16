import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config for next.js */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
