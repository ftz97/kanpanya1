// next.config.js (CommonJS)
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Désactiver explicitement le middleware
  experimental: {
    middlewareSourceMaps: false,
  },
};

module.exports = nextConfig;