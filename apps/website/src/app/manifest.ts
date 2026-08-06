import type { MetadataRoute } from 'next'
import { brand, neutral } from '@ecoter/tokens'
import { siteConfig } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: neutral[25],
    theme_color: brand[500],
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
