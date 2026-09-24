import type * as React from 'react'

import { cn } from './lib/cn'

/**
 * Tasto della tastiera in un testo di aiuto ("Esc per chiudere", "Ctrl K").
 * È un elemento `<kbd>` vero, così i lettori di schermo che lo distinguono
 * lo leggono come tasto. Testo `neutral-600` su bianco (~6:1).
 */
function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex items-center rounded border border-neutral-200 bg-white px-1 py-0.5 font-mono text-xs leading-none text-neutral-600',
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
