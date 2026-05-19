import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/kenakata-logo.png",
      },
    ];
  },
};

export default nextConfig;
