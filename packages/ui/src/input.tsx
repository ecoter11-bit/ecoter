import type * as React from 'react'

import { cn } from './lib/cn'

/**
 * Native `<input>`, not a base-ui primitive — there's no accessibility
 * state machine to reimplement here (a labelled native input is already
 * fully accessible), so a styled wrapper is simpler and more robust than
 * routing through an abstraction built for it. Invalid state reads
 * `aria-invalid` (set by the consumer, e.g. FormField) rather than a
 * separate `error` prop — one source of truth for both the visual style
 * and the accessibility semantics.
 */
function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm text-neutral-950 transition-colors outline-none',
        'placeholder:text-neutral-600',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
        'aria-invalid:border-error-500 aria-invalid:focus-visible:border-error-500 aria-invalid:focus-visible:ring-error-500/30',
        className
      )}
      {...props}
    />
  )
}

export { Input }
