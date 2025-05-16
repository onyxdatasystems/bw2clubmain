import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  source: '/backend/:path*',
  destination: 'http://127.0.0.1:8000/:path*', // Laravel backend
  images: {
    domains: ['dashboard.codeparrot.ai'], // Add the domain here
  },
};

export default nextConfig;