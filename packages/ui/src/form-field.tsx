import * as React from 'react'

import { Label } from './label'
import { cn } from './lib/cn'

type FormFieldRenderProps = {
  id: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
  'aria-required': boolean
}

type FormFieldProps = {
  label: React.ReactNode
  hint?: React.ReactNode
  error?: string
  required?: boolean
  className?: string
  /** Render-prop rather than `React.cloneElement` — works with any control (Input, Textarea, Select, or something ad-hoc) without FormField needing to know its shape, and keeps the id/aria wiring explicit at the call site instead of implicit prop-injection magic. */
  children: (fieldProps: FormFieldRenderProps) => React.ReactNode
}

/**
 * Label + control slot + hint + error, wired for WCAG 3.3.1/4.1.2: the
 * control gets `aria-invalid` and `aria-describedby` pointing at whichever
 * of hint/error is currently shown. The error paragraph is `aria-live="polite"`
 * (not `role="alert"`) — several fields can go invalid at once on submit,
 * and stacking assertive alerts for all of them at once is the more common
 * accessibility anti-pattern; polite regions announce in sequence instead.
 */
function FormField({
  label,
  hint,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = React.useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)} data-slot="form-field">
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-0.5 text-error-700" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        'aria-required': Boolean(required),
      })}

      {hint && !error && (
        <p id={hintId} className="text-xs text-neutral-600">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          aria-live="polite"
          className="text-xs font-medium text-error-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }
export type { FormFieldRenderProps }
