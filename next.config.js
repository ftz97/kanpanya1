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
  // Configuration pour le déploiement
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Configuration des domaines
  async redirects() {
    return [
      {
        source: '/padavwa/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;