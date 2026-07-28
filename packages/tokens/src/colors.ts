/**
 * Color tokens, mirroring packages/tokens/theme.css.
 * Keep these two files in sync manually until a codegen step exists (Phase 2).
 */

/** ECO-TER Decision Log semantic palette, aliased to current site values (see report for discrepancies). */
export const palette = {
  midnight: '#0a1628',
  slate: '#1c1f26',
  ice: '#fafbfc',
  white: '#ffffff',
  technicalGreen: '#18b096',
  blue: '#1e3e87',
} as const

export const brand = {
  50: '#e9eff8',
  100: '#c7d5ee',
  200: '#8fabda',
  300: '#5477bf',
  400: '#3557a3',
  500: '#1e3e87',
  600: '#1a3570',
  700: '#132a58',
  800: '#0e2040',
  900: '#0a1628',
  950: '#060d1f',
} as const

export const eco = {
  50: '#f0faf8',
  100: '#ccf0ea',
  300: '#3ecdb4',
  400: '#18b096',
  500: '#0f8f78',
  600: '#0d7361',
  700: '#0a5a4a',
} as const

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
  950: '#0f1114',
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

export const amber = {
  50: '#fffbeb',
  100: '#fef3c7',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
} as const

/** Semantic role tokens — light theme (the site is light-only, dark mode disabled). */
export const semantic = {
  background: '#fafbfc',
  foreground: '#1c1f26',
  card: '#ffffff',
  cardForeground: '#1c1f26',
  popover: '#ffffff',
  popoverForeground: '#1c1f26',
  primary: '#1e3e87',
  primaryForeground: '#ffffff',
  secondary: '#eceff3',
  secondaryForeground: '#1c1f26',
  muted: '#f4f6f9',
  mutedForeground: '#7a8090',
  accent: '#f0faf8',
  accentForeground: '#0a5a4a',
  destructive: '#ef4444',
  /** Text color for destructive content on a tinted destructive background (`bg-destructive/10`) — `text-destructive` alone is ~3.2:1, below WCAG AA. This is `error.700`. */
  destructiveMutedForeground: '#b91c1c',
  border: '#d8dde5',
  input: '#d8dde5',
  ring: '#5477bf',
} as const
