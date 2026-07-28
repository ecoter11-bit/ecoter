'use client'

import type { Variants, Transition } from 'framer-motion'

/* ─── Easing definitions ──────────────────────────────────────────────────── */
export const easings = {
  out: [0.0, 0.0, 0.2, 1.0] as const,
  in: [0.4, 0.0, 1.0, 1.0] as const,
  standard: [0.4, 0.0, 0.2, 1.0] as const,
  spring: [0.34, 1.56, 0.64, 1.0] as const,
} satisfies Record<string, readonly [number, number, number, number]>

/* ─── Transition presets ──────────────────────────────────────────────────── */
export const transitions: Record<string, Transition> = {
  fast: { duration: 0.15, ease: easings.standard },
  normal: { duration: 0.2, ease: easings.standard },
  medium: { duration: 0.3, ease: easings.out },
  slow: { duration: 0.5, ease: easings.out },
  deliberate: { duration: 0.8, ease: easings.out },
}

/* ─── Viewport config ─────────────────────────────────────────────────────── */
export const viewportOnce = { once: true, margin: '-5%' } as const

/* ─── Animation variants ──────────────────────────────────────────────────── */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.slow,
  },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.out },
  },
}

export const slideUpGentle: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easings.out },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.medium,
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
}

/* ─── Stagger container ───────────────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
}

/* ─── Page transition ─────────────────────────────────────────────────────── */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: easings.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: easings.in },
  },
}

/* ─── Dialog/Modal ────────────────────────────────────────────────────────── */
export const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: easings.out },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.15, ease: easings.in },
  },
}

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: easings.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: easings.in },
  },
}

/* ─── Sheet (mobile menu, sidebar) ───────────────────────────────────────── */
export const sheetFromRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: easings.out },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: easings.in },
  },
}

export const sheetFromBottom: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: easings.out },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: easings.in },
  },
}

/* ─── Accordion ───────────────────────────────────────────────────────────── */
export const accordionVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.25, ease: easings.out },
  },
}

/* ─── Hero sequence delays ────────────────────────────────────────────────── */
export const heroSequence = {
  overline: { delay: 0 },
  title1: { delay: 0.1 },
  title2: { delay: 0.18 },
  subtitle: { delay: 0.3 },
  cta: { delay: 0.45 },
  search: { delay: 0.6 },
  trust: { delay: 0.2 },
} as const
