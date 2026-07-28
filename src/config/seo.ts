import type { Metadata } from 'next'
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
    'ISO 9001',
    'antincendio',
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
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.ogImage],
  },
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
