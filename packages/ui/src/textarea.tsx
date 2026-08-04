import type * as React from 'react'

import { cn } from './lib/cn'

/** Same recipe as `input.tsx` — see its comment for why this is a plain native-element wrapper, not a base-ui primitive. */
function Textarea({ className, rows = 5, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      rows={rows}
      data-slot="textarea"
      className={cn(
        'flex w-full resize-y rounded-lg border border-input bg-white px-3 py-2 text-sm text-neutral-950 transition-colors outline-none',
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

export { Textarea }
