import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { defaultMetadata } from '@/config/seo'
import { SiteLayout } from '@/components/layout'
import './globals.css'

/* ─── Fonts ───────────────────────────────────────────────────────────────── */

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3E87',
}

/* ─── Root Layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
