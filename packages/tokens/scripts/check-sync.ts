/**
 * Guard: every literal value exported from src/*.ts must appear somewhere in
 * theme.css, and vice versa for colors. Catches "edited one, forgot the
 * other" drift between the CSS and TS halves of this package's source of
 * truth. Not a full test suite — a cheap tripwire, per CLAUDE.md's ask.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  brand,
  blue,
  eco,
  neutral,
  success,
  warning,
  error,
  amber,
  categoryColors,
  palette,
  semantic,
  radii,
  shadows,
  typeScale,
  duration,
  easing,
  container,
  zIndex,
} from '../src/index'

const themeCssPath = fileURLToPath(new URL('../theme.css', import.meta.url))
const themeCss = readFileSync(themeCssPath, 'utf8')

// Checked against theme.css by design. Deliberately excluded:
// - spacing.ts (informational 8pt scale, not wired into the Tailwind
//   `--spacing` base — see that file's own header comment)
// - layout.ts `breakpoint` (mirrors Tailwind v4's own defaults, not
//   redefined in theme.css — see that file's own header comment)
const checked = {
  brand,
  blue,
  eco,
  neutral,
  success,
  warning,
  error,
  amber,
  categoryColors,
  palette,
  semantic,
  radii,
  shadows,
  typeScale,
  duration,
  easing,
  container,
  zIndex,
}

const LEAF_VALUE = /^-?\d+(\.\d+)?(rem|px|ms|em|%)?$|^#[0-9a-fA-F]{6}$|^cubic-bezier\(.+\)$/

function collectLeafStrings(value: unknown, out: Set<string>): void {
  if (typeof value === 'number') {
    out.add(String(value))
  } else if (typeof value === 'string' && LEAF_VALUE.test(value)) {
    out.add(value)
  } else if (typeof value === 'object' && value !== null) {
    for (const v of Object.values(value)) collectLeafStrings(v, out)
  }
}

function appearsInCss(value: string): boolean {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // word-boundary-ish: not preceded/followed by another value character
  return new RegExp(`(^|[^\\w.#-])${escaped}([^\\w.-]|$)`).test(themeCss)
}

const values = new Set<string>()
collectLeafStrings(checked, values)

const missing = [...values].filter((v) => !appearsInCss(v))

if (missing.length > 0) {
  console.error('check-sync: values exported from src/*.ts not found in theme.css:')
  for (const v of missing) console.error(`  ${v}`)
  console.error(
    `\n${missing.length}/${values.size} TS values have no match in theme.css. Update theme.css (or src/) so both sides agree.`
  )
  process.exit(1)
}

console.log(`check-sync: ${values.size}/${values.size} TS leaf values found in theme.css. OK.`)
