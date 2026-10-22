import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

/**
 * Metadata di pagina con Open Graph e Twitter sempre completi.
 *
 * Next fonde i metadata dei segmenti in modo superficiale: una pagina che
 * definisce `openGraph` o `twitter` sostituisce l'intero oggetto del layout,
 * immagine compresa (prima le schede corso e le pagine del catalogo uscivano
 * senza `og:image`, e le pagine statiche ereditavano `og:url` e `og:title`
 * della home). Per questo ogni pagina passa da qui: canonical, `og:url` e
 * `twitter` nascono dallo stesso indirizzo e l'immagine c'è sempre.
 */

const OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: siteConfig.name,
}

type SocialInput = {
  /** Titolo completo, già con il nome del sito. */
  title: string
  description: string
  /** Indirizzo assoluto della pagina. */
  url: string
  type?: 'website' | 'article'
}

/** `openGraph` e `twitter` completi per un indirizzo assoluto. */
export function buildSocialMetadata({
  title,
  description,
  url,
  type = 'website',
}: SocialInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

type PageInput = {
  /** Titolo della pagina, senza il nome del sito (lo aggiunge il template). */
  title: string
  description: string
  /** Percorso della pagina, es. `/corsi/rspp-modulo-a`. */
  path: string
  type?: 'website' | 'article'
  /** `true`: il titolo resta com'è, senza " | ECO-TER Academy". */
  absoluteTitle?: boolean
}

/**
 * `title`, `description`, canonical, `openGraph` e `twitter` di una pagina.
 * Nei tag social il titolo è uguale al `<title>` (il template di `title` non
 * si applica da solo a `og:title`).
 */
export function buildPageMetadata({
  title,
  description,
  path,
  type,
  absoluteTitle = false,
}: PageInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    ...buildSocialMetadata({
      title: absoluteTitle
        ? title
        : siteConfig.seo.titleTemplate.replace('%s', title),
      description,
      url,
      type,
    }),
  }
}
