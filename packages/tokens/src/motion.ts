export const duration = {
  instant: '75ms',
  fast: '150ms',
  normal: '200ms',
  medium: '300ms',
  slow: '500ms',
  deliberate: '800ms',
} as const

export const easing = {
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const
