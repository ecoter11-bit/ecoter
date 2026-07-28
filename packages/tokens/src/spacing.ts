/**
 * 8pt spacing scale — informational/JS use only (e.g. framer-motion offsets).
 *
 * The site does not define a custom `--spacing` override in globals.css; it
 * relies on Tailwind's default scale (base unit 0.25rem / 4px), whose steps
 * already land on 8pt multiples (p-2 = 8px, p-4 = 16px, p-8 = 32px, ...).
 * This scale is NOT wired into theme.css so the Tailwind base stays
 * untouched — no regression risk. Flagged as a default in the report.
 */
export const spacing = {
  0: '0px',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  8: '64px',
  10: '80px',
  12: '96px',
  16: '128px',
  20: '160px',
  24: '192px',
} as const
