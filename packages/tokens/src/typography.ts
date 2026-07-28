/**
 * Font family tokens — NAMES only, no fonts are loaded here (Phase 1 will
 * wire the `target` families via next/font; `current` is what actually
 * renders today, set in apps/website/src/app/layout.tsx via next/font/google).
 */
export const typography = {
  heading: {
    current: 'Plus Jakarta Sans',
    target: 'General Sans, Sora',
  },
  body: {
    current: 'Inter',
    target: 'Inter',
  },
  mono: {
    current: 'JetBrains Mono',
    target: 'IBM Plex Mono',
  },
} as const
