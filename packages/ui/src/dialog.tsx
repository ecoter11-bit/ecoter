import type * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './lib/cn'

/**
 * Finestra modale su `@base-ui/react/dialog`. Dal primitivo arrivano focus
 * intrappolato dentro la finestra, chiusura con Esc e con clic fuori,
 * ritorno del focus al bottone che l'ha aperta, pagina sotto bloccata
 * (scroll, e `aria-hidden` su tutto ciò che sta fuori dalla finestra) e
 * `role="dialog"` con il nome preso dal `DialogTitle`. Niente di tutto
 * questo è reimplementato qui.
 *
 * Qui c'è solo la pelle: sfondo velato (`--surface-overlay`) e pannello, in
 * due `placement`:
 * - `center`: finestra in alto al centro (palette di ricerca, conferme);
 * - `sheet`: pannello laterale a tutta altezza da destra (menu mobile).
 *
 * Il pannello sta dentro `Dialog.Viewport`, un contenitore fisso grande
 * quanto lo schermo: il pannello non supera mai l'altezza visibile
 * (`max-h-full`), quindi su schermi bassi (telefono in orizzontale, zoom al
 * 400%) scorre il suo contenuto interno invece di finire fuori schermo.
 * Chi usa il `Dialog` dà all'area che scorre `min-h-0 flex-auto
 * overflow-y-auto`.
 *
 * Sfondo e contenitore stanno sullo stesso livello (`--z-index-modal`): una
 * seconda finestra aperta sopra la prima copre per intero la prima, sfondo
 * compreso.
 *
 * Le animazioni sono transizioni CSS sugli attributi `data-starting-style` /
 * `data-ending-style` del primitivo, alle durate dei token (`normal` 200ms,
 * `medium` 300ms per il pannello che attraversa lo schermo), spente con
 * `prefers-reduced-motion`.
 */
const Dialog = DialogPrimitive.Root

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

const dialogViewportVariants = cva('fixed inset-0 flex', {
  variants: {
    placement: {
      center: 'items-start justify-center px-4 pt-20 pb-4',
      sheet: 'justify-end',
    },
  },
  defaultVariants: {
    placement: 'center',
  },
})

const dialogPopupVariants = cva(
  'relative flex min-h-0 flex-col bg-white text-neutral-950 shadow-2xl outline-hidden motion-reduce:transition-none',
  {
    variants: {
      placement: {
        center:
          'max-h-full w-full max-w-2xl overflow-hidden rounded-2xl transition duration-200 ease-out data-ending-style:-translate-y-1 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:scale-98 data-starting-style:opacity-0',
        sheet:
          'h-full w-full max-w-xs transition-transform duration-300 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full',
      },
    },
    defaultVariants: {
      placement: 'center',
    },
  }
)

type DialogPopupProps = Omit<DialogPrimitive.Popup.Props, 'style'> &
  VariantProps<typeof dialogPopupVariants> & {
    style?: React.CSSProperties
  }

/**
 * Portale + sfondo + contenitore + pannello in un solo pezzo: ogni finestra
 * del sito li vuole tutti, nello stesso ordine. Sopra all'header fisso
 * grazie alla scala z-index semantica dei token (`--z-index-modal`).
 */
function DialogPopup({
  className,
  placement,
  children,
  ...props
}: DialogPopupProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-backdrop"
        className="fixed inset-0 min-h-dvh bg-(--surface-overlay) transition-opacity duration-200 ease-out motion-reduce:transition-none data-ending-style:opacity-0 data-starting-style:opacity-0"
        style={{ zIndex: 'var(--z-index-modal)' }}
      />
      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className={dialogViewportVariants({ placement })}
        style={{ zIndex: 'var(--z-index-modal)' }}
      >
        <DialogPrimitive.Popup
          data-slot="dialog-popup"
          className={cn(dialogPopupVariants({ placement }), className)}
          {...props}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('font-heading text-lg font-bold text-neutral-950', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-sm text-neutral-600', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  dialogPopupVariants,
}
