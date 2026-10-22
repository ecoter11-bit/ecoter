import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { brand } from '@ecoter/tokens'
import { defaultMetadata } from '@/config/seo'
import { SiteLayout } from '@/components/layout'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { getSiteSettings } from '@/lib/content'
import { serializeJsonLd } from '@/lib/seo/json-ld'
import { buildSiteJsonLd } from '@/lib/seo/organization-schema'
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
  themeColor: brand[500],
}

/* ─── Root Layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = getSiteSettings()

  return (
    <html
      lang="it"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        {/* Trusted, build-time-generated JSON (site.json + siteConfig), not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildSiteJsonLd(settings)),
          }}
        />
        <MotionProvider>
          <SiteLayout
            privacyPolicyHref={settings.privacyPolicy}
            cookiePolicyHref={settings.cookiePolicy}
          >
            {children}
          </SiteLayout>
        </MotionProvider>
      </body>
    </html>
  )
}
