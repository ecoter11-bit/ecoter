import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all select-none focus-visible:outline-hidden focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /**
         * Focus: on a filled button the base `border-ring` is the same green
         * as the fill, so it changes nothing, and the 50% ring alone measured
         * ~2:1 on white (under the 3:1 of SC 1.4.11). Solid ring with a 2px
         * offset instead — a white gap, then `--ring` at ~5:1 on white — the
         * same pattern the site header uses on its own links. Hover goes one
         * stop darker (`brand-700`, white text ~6.9:1): the old
         * `hover:bg-primary/80` blended toward white and left the label at
         * ~3.4:1.
         */
        default:
          'bg-primary text-primary-foreground hover:bg-brand-700 focus-visible:ring-ring focus-visible:ring-offset-2',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        /**
         * Brand-colored outline — same outline recipe as badge.tsx
         * (`border-brand-600 bg-white text-brand-700`, AA-verified), for a
         * secondary CTA that still reads as on-brand next to a `default`
         * primary action. Focus: the resting border already is `--ring`, so
         * the base `focus-visible:border-ring` changes nothing and the 50%
         * ring alone measured ~2:1 on white (under the 3:1 of SC 1.4.11).
         * The ring goes solid here instead: ~5:1 on white.
         */
        'outline-brand':
          'border-brand-600 bg-white text-brand-700 hover:bg-brand-50 focus-visible:ring-ring',
        /**
         * White outline for a CTA sitting on a dark surface (`neutral-950`, or
         * a photo behind a `neutral-950/75` scrim — see the website's
         * `CorsiInCalendarioSection`). The fill stays transparent on purpose:
         * every point of white added to the background lifts it toward the
         * text. Measured on the darkest-guaranteed case, a photo scrim whose
         * brightest composited pixel is L≈0.128 — white text reads 5.9:1 at
         * rest and 4.7:1 over `hover:bg-white/10`, both AA; a `/15` fill would
         * already fall to 4.2:1. The white border is ~5.9:1 against the same
         * background, clearing the 3:1 SC 1.4.11 asks of a component boundary.
         * Focus stays white on both parts, and both overrides are load-bearing
         * against the base recipe: `focus-visible:border-ring` would repaint
         * the border brand green (`#4a7c22`, ~1.2:1 on the scrim — it reads as
         * the border disappearing), and `ring-ring/50` would leave white at
         * 50% as the only indicator, ~2.8:1 against that same worst-case
         * background, under the 3:1 a focus indicator needs. At full opacity
         * the ring reads ~5.9:1.
         */
        'outline-inverse':
          'border-white bg-transparent text-white hover:bg-white/10 focus-visible:border-white focus-visible:ring-white',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive-muted-foreground hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
