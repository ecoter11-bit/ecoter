'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { absoluteUrl, cn } from '@/lib/utils'
import { serializeJsonLd } from '@/lib/seo/json-ld'

export type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbProps = {
  items?: BreadcrumbItem[]
  className?: string
}

const SEGMENT_LABELS: Record<string, string> = {
  corsi: 'Corsi',
  soluzioni: 'Soluzioni',
  'chi-siamo': 'Chi Siamo',
  risorse: 'Risorse',
  faq: 'FAQ',
  contatti: 'Contatti',
  aziende: 'Aziende',
  sicurezza: 'Sicurezza sul Lavoro',
  ambiente: 'Ambiente',
  'benessere-psico-sociale': 'Benessere psico-sociale',
  newsletter: 'Newsletter',
}

function labelForSegment(segment: string): string {
  return (
    SEGMENT_LABELS[segment] ??
    segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  )
}

function buildItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`
    items.push({ label: labelForSegment(segment), href: currentPath })
  }

  return items
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname()
  const resolved = items ?? buildItems(pathname)

  if (resolved.length === 0) return null

  /* BreadcrumbList in JSON-LD, con gli stessi elementi visibili (Home compresa)
     e indirizzi assoluti. Prima erano microdati sugli elementi della lista. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Home', href: '' }, ...resolved].map(
      (item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: absoluteUrl(item.href),
      })
    ),
  }

  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      {/* Trusted JSON: etichette e indirizzi decisi dalle pagine, non input utente */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="flex items-center transition-colors hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </li>

        {resolved.map((item, i) => {
          const isLast = i === resolved.length - 1

          return (
            <li key={item.href} className="flex items-center gap-1">
              <ChevronRight
                className="h-3.5 w-3.5 text-neutral-300"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
