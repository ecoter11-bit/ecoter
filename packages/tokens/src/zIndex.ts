/**
 * Semantic z-index scale. PROPOSED — apps/website has no z-index usage today
 * (no overlapping-layer UI yet), so there's no existing value to extract.
 * Sober, coherent, gapped-by-100 convention so a new layer can be inserted
 * between two existing ones without renumbering everything.
 *
 * Not a Tailwind `@theme` namespace (Tailwind v4 has no themeable `--z-index-*`
 * — its z-* utilities are a fixed scale). Use these as plain custom properties
 * via inline style, e.g. `style={{ zIndex: 'var(--z-index-modal)' }}` — NOT
 * the Tailwind arbitrary-value syntax `z-[var(--z-index-modal)]`, which
 * Turbopack's dev-mode CSS parser fails to parse (prod build is unaffected,
 * but dev breaks on the `--` inside the brackets).
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  toast: 1400,
} as const
