import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode for React 19
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Production logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
}

export default nextConfig
