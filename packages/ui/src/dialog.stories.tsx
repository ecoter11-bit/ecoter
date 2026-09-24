import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { buttonVariants } from './button'
import { cn } from './lib/cn'

/**
 * Finestra modale su `@base-ui/react/dialog`. Da tastiera: Tab arriva al
 * bottone, Invio/Spazio apre, il focus entra nella finestra e resta
 * intrappolato lì (Tab e Maiusc+Tab girano tra i suoi elementi), Esc chiude
 * e il focus torna al bottone che l'ha aperta. Tutto dal primitivo, non
 * reimplementato: prova sulle storie qui sotto.
 */
const meta = {
  title: 'Components/Dialog',
  component: DialogPopup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['center', 'sheet'],
    },
  },
} satisfies Meta<typeof DialogPopup>

export default meta
type Story = StoryObj<typeof meta>

/* Sempre attraverso `cn()` (tailwind-merge): senza, sull'elemento restano
   sia il ring al 50% della base sia quello pieno della variante, e vince
   quello che il CSS generato mette dopo, oggi il 50% (~2:1 su bianco). */
const triggerClass = cn(buttonVariants({ variant: 'outline-brand' }))
const closeClass = cn(buttonVariants({ variant: 'outline' }))

export const Default: Story = {
  args: { placement: 'center' },
  render: (args) => (
    <Dialog>
      <DialogTrigger className={triggerClass}>Apri la finestra</DialogTrigger>
      <DialogPopup {...args} className="gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <DialogTitle>Richiesta inviata</DialogTitle>
          <DialogDescription>
            Ti rispondiamo entro un giorno lavorativo all&apos;indirizzo che
            ci hai lasciato.
          </DialogDescription>
        </div>
        <div className="flex justify-end">
          <DialogClose className={closeClass}>Chiudi</DialogClose>
        </div>
      </DialogPopup>
    </Dialog>
  ),
}

/** Pannello laterale da destra, a tutta altezza: la forma del menu mobile. */
export const Sheet: Story = {
  args: { placement: 'sheet' },
  render: (args) => (
    <Dialog>
      <DialogTrigger className={triggerClass}>Apri il menu</DialogTrigger>
      <DialogPopup {...args}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <DialogTitle>Menu</DialogTitle>
          <DialogClose className={closeClass}>Chiudi</DialogClose>
        </div>
        <nav aria-label="Menu di esempio" className="flex flex-col p-3">
          {['Soluzioni Aziendali', 'Chi Siamo', 'FAQ', 'Contatti'].map(
            (label) => (
              <a
                key={label}
                href="#"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                {label}
              </a>
            )
          )}
        </nav>
      </DialogPopup>
    </Dialog>
  ),
}

/** Le due forme una accanto all'altra, per confrontarle. */
export const AllPlacements: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger className={triggerClass}>center</DialogTrigger>
        <DialogPopup placement="center" className="gap-3 p-6">
          <DialogTitle>Finestra centrata</DialogTitle>
          <DialogDescription>Palette di ricerca, conferme.</DialogDescription>
          <DialogClose className={closeClass}>Chiudi</DialogClose>
        </DialogPopup>
      </Dialog>
      <Dialog>
        <DialogTrigger className={triggerClass}>sheet</DialogTrigger>
        <DialogPopup placement="sheet" className="gap-3 p-6">
          <DialogTitle>Pannello laterale</DialogTitle>
          <DialogDescription>Menu di navigazione su mobile.</DialogDescription>
          <DialogClose className={closeClass}>Chiudi</DialogClose>
        </DialogPopup>
      </Dialog>
    </div>
  ),
}
