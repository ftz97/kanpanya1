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
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://padavwa.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;