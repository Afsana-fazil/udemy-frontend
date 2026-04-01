import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://udemy-backend-j7bd.onrender.com/api';
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;