/**
 * Breakpoints — these are Tailwind v4's own defaults, NOT overridden anywhere
 * in theme.css (the site's sm:/md:/lg:/xl: usage already matches them
 * exactly, including apps/website's hand-rolled .container-default /
 * .section-padding media queries). Exported here only so JS consumers
 * (matchMedia, resize listeners) have one canonical source instead of
 * repeating the numbers.
 */
export const breakpoint = {
  sm: '40rem', // 640px
  md: '48rem', // 768px
  lg: '64rem', // 1024px
  xl: '80rem', // 1280px
  '2xl': '96rem', // 1536px
} as const

/**
 * Container max-width — mirrors `--container-content` in theme.css
 * (generates the `max-w-content` Tailwind utility). EXTRACTED from
 * apps/website's existing `.container-default` (`max-width: 1280px`),
 * which now reads this same custom property instead of a bare literal.
 */
export const container = {
  content: '80rem', // 1280px
} as const
