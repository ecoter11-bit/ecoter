import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * Decorative icon-in-circle used across marketing sections (steps, feature
 * cards, value props). Colors reuse the exact AA-verified solid stops from
 * `badge.tsx` (bg-{color}-600/700 + text-white, ≥5:1) — see packages/ui/CLAUDE.md
 * "Ricetta colore" — not re-derived here.
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
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'brand',
    },
  }
)

type IconCircleColor = NonNullable<
  VariantProps<typeof iconCircleVariants>['color']
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
