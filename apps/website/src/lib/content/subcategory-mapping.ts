/**
 * Derivazione della sotto-area di catalogo.
 *
 * Modulo puro e senza dipendenze (né fs né altri moduli di `content/`): è
 * importato sia dal parser dei corsi sia dal reader delle sotto-aree, e
 * tenerlo isolato evita un ciclo fra i due.
 *
 * La regola è deterministica e vive qui; le eccezioni vivono nel contenuto.
 * Un corso di sicurezza prende la sotto-area, nell'ordine:
 *
 *  1. dal campo `subcategory` in frontmatter, se presente — è la via per i
 *     pochi corsi storici senza `code` (antincendio, primo soccorso, RSPP
 *     modulo A);
 *  2. dal prefisso alfabetico del `code` di catalogo (A06 → `A`), secondo
 *     `CODE_PREFIX_TO_SUBCATEGORY`.
 *
 * Se nessuna delle due strade produce un risultato la sotto-area resta
 * `undefined` e `pnpm validate` fallisce: l'invariante "ogni corso di
 * sicurezza sta in esattamente una sotto-area" è verificata in CI, non
 * affidata alla buona volontà di chi aggiunge un corso.
 */

/** Categoria che usa le sotto-aree. Le altre restano volutamente piatte. */
export const SUBCATEGORIZED_CATEGORY = 'sicurezza'

/**
 * Prefisso del codice di catalogo → sotto-area. `E` (rischi specifici) e `F`
 * (impianti e attrezzature a pressione) confluiscono deliberatamente nella
 * stessa sotto-area: `F` conta un solo corso e appartiene allo stesso
 * discorso "valutazione di un rischio specifico".
 */
export const CODE_PREFIX_TO_SUBCATEGORY: Record<string, string> = {
  A: 'lavoratori-preposti-dirigenti',
  B: 'ruoli-abilitazioni',
  C: 'attrezzature',
  D: 'lavori-elettrici',
  E: 'rischi-specifici',
  F: 'rischi-specifici',
}

/** Prefisso alfabetico di un codice di catalogo (`A06` → `A`), se valido. */
export function codePrefix(code: string | undefined): string | undefined {
  if (!code) return undefined
  const match = /^([A-Z])\d+$/.exec(code.trim().toUpperCase())
  return match?.[1]
}

type ResolveInput = {
  category: string
  code?: string
  /** Valore esplicito da frontmatter, se presente. */
  subcategory?: string
}

/**
 * Sotto-area di un corso, o `undefined` se la categoria non ne usa (o se il
 * corso non è mappabile — condizione che `pnpm validate` segnala come errore).
 */
export function resolveSubcategory({
  category,
  code,
  subcategory,
}: ResolveInput): string | undefined {
  if (category !== SUBCATEGORIZED_CATEGORY) return undefined
  if (subcategory) return subcategory

  const prefix = codePrefix(code)
  return prefix ? CODE_PREFIX_TO_SUBCATEGORY[prefix] : undefined
}
