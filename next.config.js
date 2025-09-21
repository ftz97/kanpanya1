/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Redirection intelligente (évite les boucles)
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://padavwa.com/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'kanpanya1.vercel.app',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
