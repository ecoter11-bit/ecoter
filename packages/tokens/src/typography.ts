/**
 * Font families — canonical (Decision 016). These are what the site
 * actually renders (apps/website/src/app/layout.tsx, via next/font/google);
 * there is no separate "target" — this IS the target.
 */
export const fontFamily = {
  heading: 'Plus Jakarta Sans',
  body: 'Inter',
  mono: 'JetBrains Mono',
} as const

/**
 * Type scale — font-size/line-height/weight (+ letter-spacing where the
 * site already sets one) per semantic level. Mirrors packages/tokens/theme.css
 * `--text-*` / `--text-*--line-height` / `--text-*--font-weight` /
 * `--text-*--letter-spacing`. Keep both in sync — see theme.css header comment.
 *
 * Provenance:
 * - display, h1, h2, body, small, caption: EXTRACTED — match the sizes/weights
 *   already in consistent use across apps/website (Hero h1, section h2s,
 *   body text, and the pervasive text-sm/text-xs meta-text pattern), and the
 *   h1/h2 letter-spacing already set in apps/website/src/app/globals.css.
 * - h3: size EXTRACTED (text-2xl usage), letter-spacing EXTRACTED (globals.css
 *   h3 rule); the two aren't currently paired on the same element anywhere.
 * - h4, h5, h6: PROPOSED — no component uses a literal <h4>/<h5>/<h6> today.
 *   Sober linear interpolation between the extracted h3 and body levels,
 *   using the site's existing -0.01em base heading letter-spacing.
 */
export const typeScale = {
  display: {
    fontSize: '3.75rem', // 60px — Hero h1 desktop (lg:text-6xl)
    lineHeight: '1.1',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    status: 'in use',
  },
  h1: {
    fontSize: '2.25rem', // 36px — section heading desktop step (sm:text-4xl)
    lineHeight: '1.15',
    fontWeight: 800,
    letterSpacing: '-0.025em', // globals.css h1 rule
    status: 'in use',
  },
  h2: {
    fontSize: '1.875rem', // 30px — section heading mobile step (text-3xl)
    lineHeight: '1.2',
    fontWeight: 700,
    letterSpacing: '-0.02em', // globals.css h2 rule
    status: 'in use',
  },
  h3: {
    fontSize: '1.5rem', // 24px — extracted (text-2xl usage), see provenance note above
    lineHeight: '1.25',
    fontWeight: 700,
    letterSpacing: '-0.015em', // globals.css h3 rule
    status: 'in use',
  },
  h4: {
    fontSize: '1.25rem', // 20px — proposed
    lineHeight: '1.3',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    status: 'proposed',
  },
  h5: {
    fontSize: '1.125rem', // 18px — proposed
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    status: 'proposed',
  },
  h6: {
    fontSize: '1rem', // 16px — proposed
    lineHeight: '1.4',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    status: 'proposed',
  },
  body: {
    fontSize: '1rem', // 16px — text-base, the site's baseline
    lineHeight: '1.5',
    fontWeight: 400,
    status: 'in use',
  },
  small: {
    fontSize: '0.875rem', // 14px — text-sm, pervasive secondary/meta text
    lineHeight: '1.5',
    fontWeight: 400,
    status: 'in use',
  },
  caption: {
    fontSize: '0.75rem', // 12px — text-xs + font-medium/semibold (badges, labels)
    lineHeight: '1.4',
    fontWeight: 500,
    status: 'in use',
  },
} as const
