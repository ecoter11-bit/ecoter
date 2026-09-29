import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode for React 19
  reactStrictMode: true,

  // Monorepo: trace files from the workspace root, not just this app
  outputFileTracingRoot: path.join(__dirname, '../../'),

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

  redirects: async () => [
    // MODIFICHE del 29/09/2026: la pagina "Catalogo" (in arrivo) del
    // bottone in home non serve più, al suo posto c'è il Calendario corsi.
    {
      source: '/catalogo',
      destination: '/calendario-corsi',
      permanent: true,
    },
    // MODIFICHE del 29/09/2026: Contatti ha solo i recapiti, il modulo per
    // chiedere informazioni su un corso è su /richiedi-informazioni. I
    // vecchi link delle schede (`/contatti?corso=<slug>`) portano lì: Next
    // passa da solo la query alla destinazione.
    {
      source: '/contatti',
      has: [{ type: 'query', key: 'corso' }],
      destination: '/richiedi-informazioni',
      permanent: true,
    },
  ],

  // Production logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
}

export default nextConfig
