import type { Metadata } from 'next'
import { buildSocialMetadata } from '@/lib/seo/page-metadata'
import { siteConfig } from './site'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [
    'formazione professionale',
    'corsi sicurezza lavoro',
    'RSPP',
    'coordinatore sicurezza cantieri',
    'formazione aziendale',
    'ente di formazione accreditato',
    'corsi online',
    'attestati riconosciuti',
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Valgono per la home: le altre pagine li ridefiniscono con
  // `buildPageMetadata` (vedi `lib/seo/page-metadata.ts`).
  ...buildSocialMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
  }),
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
}

export type { Metadata }
