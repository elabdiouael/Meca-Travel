import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo-ram.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // Zid hado dima kaykouno f unsplash
      }
    ],
  },
};

export default nextConfig;