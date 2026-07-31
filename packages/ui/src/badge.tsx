import type * as React from 'react'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * Text carries meaning; color is reinforcement only (WCAG 1.4.1) — every
 * badge always renders its label, never color/icon alone. All seven colors
 * are AA-verified (≥4.5:1) for every variant, see packages/ui/CLAUDE.md.
 */
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outline: '',
      },
      color: {
        neutral: '',
        brand: '',
        eco: '',
        success: '',
        warning: '',
        error: '',
        amber: '',
      },
      size: {
        sm: "h-5 gap-1 px-2 text-caption [&_svg:not([class*='size-'])]:size-3",
        md: "h-6 gap-1.5 px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    compoundVariants: [
      // ─── solid — bg color-500/600/700 (darkest AA-passing stop) + text-white, ≥5:1 ─
      { variant: 'solid', color: 'neutral', class: 'bg-neutral-700 text-white hover:brightness-90' },
      { variant: 'solid', color: 'brand', class: 'bg-brand-500 text-white hover:brightness-90' },
      { variant: 'solid', color: 'eco', class: 'bg-eco-600 text-white hover:brightness-90' },
      { variant: 'solid', color: 'success', class: 'bg-success-600 text-white hover:brightness-90' },
      { variant: 'solid', color: 'warning', class: 'bg-warning-600 text-white hover:brightness-90' },
      { variant: 'solid', color: 'error', class: 'bg-error-700 text-white hover:brightness-90' },
      { variant: 'solid', color: 'amber', class: 'bg-amber-700 text-white hover:brightness-90' },

      // ─── soft — bg color-50 (tint) + text color-600/700, AA ≥4.5:1. Hover
      // uses `brightness-95` (uniform, scales bg+text together) rather than
      // darkening only the background one tint stop further — a same-stop
      // bg shift dropped warning/amber below 4.5:1 on hover (verified: 4.75
      // → 4.42 for amber). brightness-95 keeps every color ≥4.5:1 on hover.
      { variant: 'soft', color: 'neutral', class: 'bg-neutral-100 text-neutral-700 hover:brightness-95' },
      { variant: 'soft', color: 'brand', class: 'bg-brand-50 text-brand-700 hover:brightness-95' },
      { variant: 'soft', color: 'eco', class: 'bg-eco-50 text-eco-600 hover:brightness-95' },
      { variant: 'soft', color: 'success', class: 'bg-success-50 text-success-600 hover:brightness-95' },
      { variant: 'soft', color: 'warning', class: 'bg-warning-50 text-warning-600 hover:brightness-95' },
      { variant: 'soft', color: 'error', class: 'bg-error-50 text-error-700 hover:brightness-95' },
      { variant: 'soft', color: 'amber', class: 'bg-amber-50 text-amber-700 hover:brightness-95' },

      // ─── outline — bg-white border color-500/600 (darker than soft's -50/
      // -100 tints: SC 1.4.11 needs ≥3:1 for UI-component boundaries, which
      // the tint stops don't clear, e.g. neutral-200 ≈1.36:1) + text
      // color-600/700, same shade as soft (bg is white, always ≥ soft's -50
      // contrast) ───────────────────────────────────────────────────────
      { variant: 'outline', color: 'neutral', class: 'border-neutral-500 bg-white text-neutral-700 hover:bg-neutral-50' },
      { variant: 'outline', color: 'brand', class: 'border-brand-300 bg-white text-brand-700 hover:bg-brand-50' },
      { variant: 'outline', color: 'eco', class: 'border-eco-500 bg-white text-eco-600 hover:bg-eco-50' },
      { variant: 'outline', color: 'success', class: 'border-success-600 bg-white text-success-600 hover:bg-success-50' },
      { variant: 'outline', color: 'warning', class: 'border-warning-600 bg-white text-warning-600 hover:bg-warning-50' },
      { variant: 'outline', color: 'error', class: 'border-error-500 bg-white text-error-700 hover:bg-error-50' },
      { variant: 'outline', color: 'amber', class: 'border-amber-700 bg-white text-amber-700 hover:bg-amber-50' },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'md',
    },
  }
)

type BadgeColor = NonNullable<VariantProps<typeof badgeVariants>['color']>

type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /** Decorative left icon — the text label always carries the meaning, the icon never stands alone. */
    icon?: React.ReactNode
  }

function Badge({
  className,
  render,
  variant = 'soft',
  color = 'neutral',
  size = 'md',
  icon,
  children,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    render,
    props: {
      'data-slot': 'badge',
      ...props,
      className: cn(badgeVariants({ variant, color, size, className })),
      children: (
        <>
          {icon && (
            <span data-slot="badge-icon" aria-hidden="true" className="inline-flex shrink-0">
              {icon}
            </span>
          )}
          {children}
        </>
      ),
    },
  })
}

export { Badge, badgeVariants }
export type { BadgeColor }
