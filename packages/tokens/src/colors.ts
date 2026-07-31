/**
 * Color tokens, mirroring packages/tokens/theme.css.
 * Keep these two files in sync manually until a codegen step exists (Phase 2).
 */

/**
 * ECO-TER canonical semantic palette. Rebrand (2026-07-31): Decision 016's
 * institutional-blue/technical-green values are superseded by the real
 * corporate palette, extracted from the parent company site
 * (sicurezzalavoroeambiente.it) and its logo (Ecoter-logo-01.svg, the one
 * asset carrying all five brand hues at full saturation). `blue` and
 * `technicalGreen` are historical Decision-016 names kept for continuity —
 * after this rebrand `blue` resolves to the brand green (`--primary`) and
 * `technicalGreen` to the teal accent (`eco-400`). Neither is referenced as
 * a Tailwind utility anywhere in the codebase (verified via grep), so the
 * name/hue mismatch is cosmetic, not a live bug.
 */
export const palette = {
  midnight: '#0a1628',
  slate: '#1c1f26',
  ice: '#fafbfc',
  white: '#ffffff',
  technicalGreen: '#49a6a7',
  blue: '#4a7c22',
} as const

/**
 * Brand — action green, extracted from the real corporate site/logo.
 * `500` (`#6fb933`) is the exact canonical brand hex (logo, icons, large
 * decorative surfaces) — on white it's ~2.4:1, below WCAG AA, so it is
 * NEVER used for text or a solid background carrying text. `600` is the
 * lightest stop that clears 4.5:1 on white (~5.0:1) — the real
 * `primary`/button/link-safe green. See packages/tokens/CLAUDE.md and the
 * Foundations "Colors" page for the full contrast table.
 */
export const brand = {
  50: '#f4fbef',
  100: '#e7f5db',
  200: '#ceebb7',
  300: '#b1df8b',
  400: '#90d25b',
  500: '#6fb933',
  600: '#4a7c22',
  700: '#3c641c',
  800: '#2e4c15',
  900: '#22380f',
  950: '#18280b',
} as const

/**
 * Blue — secondary brand color, extracted from the real logo (`#185fad`).
 * Used for the "sicurezza" category family (Decision 018). `500` is the
 * exact canonical hex and already clears 4.5:1 on white (~6.4:1) — unlike
 * `brand`, no darkened stand-in is needed for text/solid use.
 */
export const blue = {
  50: '#edf4fd',
  100: '#d2e5f9',
  200: '#a5caf3',
  300: '#6ba8ea',
  400: '#2d83e2',
  500: '#185fad',
  600: '#144f8f',
  700: '#104074',
  800: '#0c315a',
  900: '#092543',
  950: '#071b31',
} as const

/**
 * Eco — teal accent, extracted from the real logo (`#388081`). Same role as
 * before the rebrand ("used sparingly", tertiary accent) but recolored from
 * the old technical-green (#18b096) to the real brand teal. `500` is the
 * exact canonical hex — it clears 4.5:1 on white only barely (~4.6:1);
 * `600` (~6.6:1) is the safer text/solid stop already used by Badge.
 */
export const eco = {
  50: '#edf7f7',
  100: '#d4ecec',
  300: '#71c0c1',
  400: '#49a6a7',
  500: '#388081',
  600: '#2d6667',
  700: '#224e4e',
} as const

/**
 * Neutral — Warm Gray. `950` = `#313132`, the real corporate ink (verified
 * on the parent site — h2/body/links/footer all measured to this exact
 * hex). Every sitewide heading uses `text-neutral-950` directly, so this is
 * where "Ink #313132" actually lands for headings; `semantic.foreground`
 * (body text) carries the same hex.
 */
export const neutral = {
  25: '#fafbfc',
  50: '#f4f6f9',
  100: '#eceff3',
  200: '#d8dde5',
  300: '#bcc3ce',
  400: '#9ba2b0',
  500: '#7a8090',
  600: '#5c6275',
  700: '#44495a',
  800: '#2d3240',
  900: '#1c1f26',
  950: '#313132',
} as const

export const success = {
  50: '#f0fdf4',
  100: '#dcfce7',
  500: '#22a854',
  600: '#16713a',
} as const

export const warning = {
  50: '#fffbeb',
  100: '#fef3c7',
  500: '#d97706',
  600: '#b45309',
} as const

export const error = {
  50: '#fff5f5',
  100: '#fee2e2',
  500: '#ef4444',
  700: '#b91c1c',
} as const

/**
 * Amber — "oro/ambra" accent, derived from the real brand yellow (`#FFF200`,
 * exact hex from the logo, locked at `400`). Pure `#FFF200` is ~1.2:1 on
 * white — unusable for text at any size, so `700` (~5.9:1) is a same-hue
 * darkened stop for text/solid use, same role as before the rebrand (badge
 * text/solid/outline, underline, step numerals) but recolored from the old
 * orange-gold (#a16207-family) to the real corporate yellow's hue.
 */
export const amber = {
  50: '#fefef0',
  100: '#fefcdc',
  300: '#fdfab9',
  400: '#FFF200',
  500: '#c9c00d',
  600: '#968f13',
  /** Lightest same-hue stop that clears WCAG AA (4.5:1) for text/solid — ~5.9:1 on white, ~5.8:1 on amber-50. See `packages/ui/src/badge.tsx` (color="amber") and `categoryColors['benessere-psico-sociale']`. */
  700: '#6b6719',
} as const

/**
 * Category colors (Decision 018 macro-categories) — soft (tint bg) / solid
 * (bg + white text, AA-verified) / foreground (text on `soft`, AA-verified)
 * per macro-category, keyed by the Dec.018 taxonomy so this table doesn't
 * change shape when catalog slugs are restructured (see 2.3). App-layer
 * code maps *current* catalog slugs onto these four
 * (`apps/website/src/lib/badge-mappings.ts`).
 */
export const categoryColors = {
  sicurezza: { soft: blue[50], solid: blue[500], foreground: blue[700] },
  ambiente: { soft: brand[50], solid: brand[600], foreground: brand[700] },
  'sistemi-di-gestione': { soft: eco[50], solid: eco[600], foreground: eco[700] },
  'benessere-psico-sociale': { soft: amber[50], solid: amber[700], foreground: amber[700] },
} as const

/** Semantic role tokens — light theme (the site is light-only, dark mode disabled). */
export const semantic = {
  background: '#fafbfc',
  foreground: '#313132',
  card: '#ffffff',
  cardForeground: '#313132',
  popover: '#ffffff',
  popoverForeground: '#313132',
  primary: '#4a7c22',
  primaryForeground: '#ffffff',
  secondary: '#eceff3',
  secondaryForeground: '#313132',
  muted: '#f4f6f9',
  mutedForeground: '#7a8090',
  accent: '#edf7f7',
  accentForeground: '#224e4e',
  destructive: '#ef4444',
  /** Text color for destructive content on a tinted destructive background (`bg-destructive/10`) — `text-destructive` alone is ~3.2:1, below WCAG AA. This is `error.700`. */
  destructiveMutedForeground: '#b91c1c',
  border: '#d8dde5',
  input: '#d8dde5',
  ring: '#4a7c22',
} as const
