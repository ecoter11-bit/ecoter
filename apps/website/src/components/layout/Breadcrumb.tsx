'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  categorie: 'Categorie',
  soluzioni: 'Soluzioni',
  calendario: 'Calendario',
  'chi-siamo': 'Chi Siamo',
  risorse: 'Risorse',
  blog: 'Blog',
  faq: 'FAQ',
  contatti: 'Contatti',
  aziende: 'Aziende',
  professionisti: 'Professionisti',
  'enti-pubblici': 'Enti Pubblici',
  'in-house': 'In House',
  sicurezza: 'Sicurezza sul Lavoro',
  ambiente: 'Ambiente',
  'sistemi-di-gestione': 'Sistemi di Gestione',
  'benessere-psico-sociale': 'Benessere psico-sociale',
  download: 'Download',
  newsletter: 'Newsletter',
  certificazioni: 'Certificazioni',
  'note-legali': 'Note Legali',
  privacy: 'Privacy Policy',
  cookie: 'Cookie Policy',
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

  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol
        className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
        >
          <Link
            href="/"
            className="flex items-center transition-colors hover:text-foreground"
            itemProp="item"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <meta itemProp="name" content="Home" />
          <meta itemProp="position" content="1" />
        </li>

        {resolved.map((item, i) => {
          const isLast = i === resolved.length - 1

          return (
            <li
              key={item.href}
              className="flex items-center gap-1"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <ChevronRight
                className="h-3.5 w-3.5 text-neutral-300"
                aria-hidden="true"
              />
              {isLast ? (
                <span
                  className="font-medium text-foreground"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(i + 2)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
