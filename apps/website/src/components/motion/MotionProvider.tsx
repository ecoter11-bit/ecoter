'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Global `prefers-reduced-motion` gate for every framer-motion animation
 * (whileInView, variants, AnimatePresence, gestures). With `reducedMotion:
 * "user"`, framer-motion collapses positional/transform values (x, y,
 * scale, rotate, height, ...) to an instant jump but leaves opacity
 * transitions untouched — content still fades in, it just doesn't move.
 * The CSS `prefers-reduced-motion` block in globals.css handles pure-CSS
 * animations (e.g. the hero mesh drift) separately; this covers the JS side.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
