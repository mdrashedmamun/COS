/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
  // Compression
  compress: true,
  // Generate ETags for cache busting
  generateEtags: true,
  // PoweredByHeader
  poweredByHeader: false,
}

module.exports = nextConfig
