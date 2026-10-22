/**
 * Serializza un oggetto JSON-LD per `<script type="application/ld+json">`.
 * `<` diventa `<`, come raccomanda la guida JSON-LD di Next: così un
 * testo che contiene `</script>` non può chiudere il tag.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
