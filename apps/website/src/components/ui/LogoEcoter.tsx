import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Intrinsic ratio of Ecoter-logo-01.svg (800×272). */
const LOGO_ASPECT_RATIO = 800 / 272

type EcoterLogoProps = {
  /** `color` = full brand-gradient lockup (light surfaces). `white` = flat white (dark surfaces). */
  variant?: 'color' | 'white'
  /** Rendered height in px — width is derived from the logo's intrinsic ratio. */
  height?: number
  className?: string
  priority?: boolean
}

export function EcoterLogo({
  variant = 'color',
  height = 36,
  className,
  priority = false,
}: EcoterLogoProps) {
  const width = Math.round(height * LOGO_ASPECT_RATIO)

  return (
    <Image
      src={
        variant === 'white'
          ? '/brand/ecoter-logo-white.svg'
          : '/brand/ecoter-logo.svg'
      }
      alt="ECO-TER Academy"
      width={width}
      height={height}
      priority={priority}
      className={cn('shrink-0', className)}
    />
  )
}

type AcademyTagProps = {
  className?: string
}

/** Small "Academy" wordmark suffix — pairs with EcoterLogo to disambiguate the training arm from the parent brand. */
export function AcademyTag({ className }: AcademyTagProps) {
  return (
    <span
      className={cn(
        'font-heading text-xs font-semibold tracking-[0.14em] uppercase',
        className
      )}
    >
      Academy
    </span>
  )
}
