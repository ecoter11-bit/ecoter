import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  size?: number
}

export function LogoMark({ className, size = 36 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="8" fill="#132A58" />
      {/* Top bar */}
      <rect x="8.5" y="9" width="19" height="3.5" rx="1.75" fill="white" />
      {/* Middle bar — shorter, eco-accented end */}
      <rect x="8.5" y="16.25" width="13" height="3.5" rx="1.75" fill="white" />
      {/* Bottom bar */}
      <rect x="8.5" y="23.5" width="19" height="3.5" rx="1.75" fill="white" />
      {/* Eco accent dot — aligns with middle bar */}
      <circle cx="26" cy="18" r="3" fill="#0F8F78" />
      <circle cx="26" cy="18" r="1.4" fill="#3ECDB4" />
    </svg>
  )
}

type LogoWordmarkProps = {
  className?: string
  inverted?: boolean
}

export function LogoWordmark({
  className,
  inverted = false,
}: LogoWordmarkProps) {
  return (
    <div className={cn('leading-none', className)}>
      <span
        className={cn(
          'block font-heading text-base font-bold tracking-tight',
          inverted ? 'text-white' : 'text-brand-800'
        )}
      >
        ECOTER
      </span>
      <span
        className={cn(
          'block text-[9px] font-semibold tracking-[0.12em] uppercase',
          inverted ? 'text-brand-300' : 'text-neutral-500'
        )}
      >
        Academy
      </span>
    </div>
  )
}
