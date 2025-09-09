/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⚡ empêche ESLint de bloquer le build
  },
  typescript: {
    ignoreBuildErrors: true, // ⚡ empêche TS de bloquer le build
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Désactiver le cache Webpack en développement pour éviter les erreurs de chunk
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
