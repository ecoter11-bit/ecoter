import { buildSearchIndex } from '@/lib/content/search'

/**
 * Indice della ricerca dell'header, come file JSON statico.
 *
 * Generato al build dai contenuti, come la sitemap: `force-static` perché in
 * Next 16 i route handler GET non sono in cache di default. Il browser lo
 * scarica alla prima apertura della ricerca e cerca in locale
 * (`lib/course-search.ts`), senza servizi esterni. `X-Robots-Tag: noindex`:
 * è un dato per la pagina, non una pagina da indicizzare.
 */
export const dynamic = 'force-static'

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: { 'X-Robots-Tag': 'noindex' },
  })
}
