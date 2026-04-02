import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://udemy-backend-j7bd.onrender.com/api/:path*`,
      },
    ];
  },
};

export default nextConfig;