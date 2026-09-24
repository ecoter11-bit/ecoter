import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * Decorative icon-in-circle used across marketing sections (steps, feature
 * cards, value props). Colors reuse the exact AA-verified solid stops from
 * `badge.tsx` (bg-{color}-600/700 + text-white, ≥5:1) — see packages/ui/CLAUDE.md
 * "Ricetta colore" — not re-derived here. The one exception is `inverse`,
 * for a circle placed on an already colored surface (documented below).
 */
const iconCircleVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      size: {
        sm: "size-10 [&_svg:not([class*='size-'])]:size-4",
        md: "size-14 [&_svg:not([class*='size-'])]:size-6",
        lg: "size-16 [&_svg:not([class*='size-'])]:size-7",
      },
      color: {
        neutral: 'bg-neutral-700 text-white',
        brand: 'bg-brand-600 text-white',
        blue: 'bg-blue-600 text-white',
        eco: 'bg-eco-600 text-white',
        amber: 'bg-amber-700 text-white',
        /**
         * For a circle sitting on a surface that is already a solid color
         * (e.g. the `brand-600` area buttons in the website's home hero): a
         * 15% white veil and a white icon. Not an area color, so it stays out
         * of `IconCircleColor`. White icon on the composited veil: 3.7:1 over
         * `brand-600`, 4.8:1 over `brand-700` — above the 3:1 of SC 1.4.11
         * even though the icon is decorative. It disappears on white: use it
         * only on solid dark or saturated fills.
         */
        inverse: 'bg-white/15 text-white',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'brand',
    },
  }
)

/**
 * The area colors (solid fills). `inverse` is left out on purpose: it does
 * not identify an area, it only adapts the circle to a colored surface.
 */
type IconCircleColor = Exclude<
  NonNullable<VariantProps<typeof iconCircleVariants>['color']>,
  'inverse'
>

type IconCircleProps = React.ComponentProps<'div'> &
  VariantProps<typeof iconCircleVariants> & {
    icon: React.ReactNode
  }

function IconCircle({
  className,
  size,
  color,
  icon,
  ...props
}: IconCircleProps) {
  return (
    <div
      data-slot="icon-circle"
      className={cn(iconCircleVariants({ size, color, className }))}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
    </div>
  )
}

export { IconCircle, iconCircleVariants }
export type { IconCircleColor }
