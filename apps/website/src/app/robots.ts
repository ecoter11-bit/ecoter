import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Solo le API. `/_next/` deve restare aperto: ci sono CSS, JS e
        // immagini che Googlebot scarica per renderizzare le pagine.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
