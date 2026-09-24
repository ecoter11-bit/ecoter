/**
 * Ricerca dei corsi lato browser, per la finestra di ricerca dell'header.
 *
 * L'indice lo genera il build dai contenuti (`buildSearchIndex()` in
 * `lib/content/search.ts`) e lo serve `app/search-index.json/route.ts` come
 * file statico: la finestra lo scarica alla prima apertura e da lì cerca in
 * memoria, a ogni tasto, senza servizi esterni. Questo modulo è puro (niente
 * `fs`), così si può importare dai componenti client.
 */

/** Indirizzo dell'indice statico (vedi `app/search-index.json/route.ts`). */
export const SEARCH_INDEX_URL = '/search-index.json'

/** Una riga dell'indice: quello che serve per cercare e per mostrare il risultato. */
export type SearchIndexEntry = {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  /** Codice di catalogo (es. "C05"); i servizi di Benessere non ce l'hanno. */
  code?: string
  /** Slug e nome dell'area. */
  category: string
  categoryName: string
  /** Nome della sotto-area, solo per Sicurezza. */
  subcategoryName?: string
  targetAudience: string[]
  tags: string[]
}

/** Riga dell'indice con i campi già normalizzati, pronta per il confronto. */
export type PreparedEntry = {
  entry: SearchIndexEntry
  code: string
  title: string
  titleWords: string[]
  subtitleWords: string[]
  subtitle: string
  tagWords: string[]
  audienceWords: string[]
  areaWords: string[]
  excerptWords: string[]
  compact: string
}

export type CourseSearchResult = {
  entry: SearchIndexEntry
  score: number
}

/* Parole che non distinguono un corso dall'altro: in "corsi per preposti"
   conta solo "preposti" (qui ogni risultato è un corso). */
const STOPWORDS = new Set([
  'a',
  'ad',
  'agli',
  'ai',
  'al',
  'alla',
  'alle',
  'con',
  'corsi',
  'corso',
  'da',
  'dal',
  'dalla',
  'degli',
  'dei',
  'del',
  'della',
  'delle',
  'di',
  'e',
  'ed',
  'fra',
  'gli',
  'i',
  'il',
  'in',
  'la',
  'le',
  'lo',
  'nei',
  'nel',
  'nella',
  'o',
  'per',
  'su',
  'sul',
  'sulla',
  'tra',
  'un',
  'una',
  'uno',
])

/**
 * Minuscolo, senza accenti, punteggiatura trasformata in spazi:
 * "D.Lgs. 81/08" → "d lgs 81 08", "Sostenibilità" → "sostenibilita".
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function words(text: string | undefined): string[] {
  if (!text) return []
  const normalized = normalizeSearchText(text)
  return normalized ? normalized.split(' ') : []
}

/** Normalizza l'indice una volta sola, quando arriva, non a ogni tasto. */
export function prepareSearchIndex(
  entries: SearchIndexEntry[]
): PreparedEntry[] {
  return entries.map((entry) => {
    const title = normalizeSearchText(entry.title)
    const subtitle = normalizeSearchText(entry.subtitle ?? '')
    const all = [
      entry.code,
      entry.title,
      entry.subtitle,
      entry.categoryName,
      entry.subcategoryName,
      ...entry.targetAudience,
      ...entry.tags,
      entry.excerpt,
    ]
      .filter(Boolean)
      .join(' ')
    return {
      entry,
      code: normalizeSearchText(entry.code ?? ''),
      title,
      titleWords: title ? title.split(' ') : [],
      subtitle,
      subtitleWords: subtitle ? subtitle.split(' ') : [],
      tagWords: entry.tags.flatMap(words),
      audienceWords: entry.targetAudience.flatMap(words),
      areaWords: [
        ...words(entry.categoryName),
        ...words(entry.subcategoryName),
      ],
      excerptWords: words(entry.excerpt),
      compact: normalizeSearchText(all).replaceAll(' ', ''),
    }
  })
}

const hasPrefix = (list: string[], token: string) =>
  list.some((word) => word.startsWith(token))

/**
 * Punteggio di un termine su un corso: vale il campo migliore in cui
 * compare. Un codice identico batte tutto; poi titolo (parola intera prima
 * dell'inizio di parola: "PES" mette PES/PAV davanti a "pesca"), tag,
 * sottotitolo, destinatari, area, descrizione. Si confronta l'inizio delle
 * parole ("carrell" trova "carrelli"); dentro le parole solo per termini di almeno
 * 3 lettere, e come ultima risorsa sul testo senza spazi, così
 * "psicosociale" trova "psico-sociale".
 */
function tokenScore(item: PreparedEntry, token: string): number {
  if (item.code && item.code === token) return 100
  if (item.code && token.length >= 2 && item.code.startsWith(token)) return 30
  if (item.titleWords.includes(token)) return 14
  if (hasPrefix(item.titleWords, token)) return 12
  if (hasPrefix(item.tagWords, token)) return 7
  if (hasPrefix(item.subtitleWords, token)) return 6
  if (token.length >= 3 && item.title.includes(token)) return 5
  if (hasPrefix(item.audienceWords, token)) return 5
  if (hasPrefix(item.areaWords, token)) return 4
  if (token.length >= 3 && item.subtitle.includes(token)) return 3
  if (hasPrefix(item.excerptWords, token)) return 2
  if (token.length >= 4 && item.compact.includes(token)) return 1
  return 0
}

/**
 * Cerca nell'indice: ogni termine deve comparire da qualche parte (AND), il
 * punteggio è la somma dei punteggi dei termini, più un premio se l'intera
 * frase compare nel titolo. A parità di punteggio resta l'ordine
 * dell'indice, cioè quello del catalogo.
 */
export function searchCourseIndex(
  index: PreparedEntry[],
  query: string
): CourseSearchResult[] {
  const normalized = normalizeSearchText(query)
  if (!normalized) return []

  const allTokens = normalized.split(' ')
  const meaningful = allTokens.filter((token) => !STOPWORDS.has(token))
  const tokens = meaningful.length > 0 ? meaningful : allTokens
  const phrase = tokens.join(' ')

  const results: CourseSearchResult[] = []
  for (const item of index) {
    let score = 0
    let matchedAll = true
    for (const token of tokens) {
      const points = tokenScore(item, token)
      if (points === 0) {
        matchedAll = false
        break
      }
      score += points
    }
    if (!matchedAll) continue
    if (tokens.length > 1 && item.title.includes(phrase)) score += 15
    results.push({ entry: item.entry, score })
  }

  // `sort` è stabile: a parità di punteggio resta l'ordine del catalogo.
  return results.sort((a, b) => b.score - a.score)
}
