import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * `success` deliberately uses `brand-*` (the site's actual primary green)
 * rather than the generic `success` semantic scale — on this site "success"
 * and "primary action" are the same color by design (Decision: rebrand
 * palette), so a confirmation panel in a different green would read as
 * off-brand. `warning`/`error` use their own semantic scales, not the
 * `amber` *category* color (which is unrelated — it identifies
 * benessere-psico-sociale courses, not a UI warning state; verified they
 * are different hex families in packages/tokens/src/colors.ts).
 */
const alertVariants = cva('flex items-start gap-2.5 rounded-xl border p-4 text-sm', {
  variants: {
    tone: {
      success: 'border-brand-100 bg-brand-50/60 text-neutral-700',
      warning: 'border-warning-100 bg-warning-50 text-warning-600',
      error: 'border-error-100 bg-error-50 text-error-700',
    },
  },
  defaultVariants: {
    tone: 'warning',
  },
})

type AlertProps = React.ComponentPropsWithRef<'div'> &
  VariantProps<typeof alertVariants> & {
    /** Decorative — the message text always carries the meaning, same rule as Badge's `icon`. Consumer-supplied (no icon library dependency here, see accordion.tsx/badge.tsx for the same reasoning). */
    icon?: React.ReactNode
  }

function Alert({ tone, icon, className, children, role, ref, ...props }: AlertProps) {
  return (
    <div
      ref={ref}
      role={role ?? (tone === 'error' ? 'alert' : 'status')}
      data-slot="alert"
      className={cn(alertVariants({ tone, className }))}
      {...props}
    >
      {icon && (
        <span className="mt-0.5 shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  )
}

export { Alert, alertVariants }
export type { AlertProps }
