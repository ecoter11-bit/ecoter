import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'

/**
 * Hover, focus-visible and active states are real CSS pseudo-classes baked
 * into the component's own Tailwind classes (see button.tsx) — interact with
 * any story below (mouse hover, Tab to focus) to see them live. The site is
 * light-only (no dark theme), so there is no dark-mode story to show.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // `outline-inverse` vive solo su fondo scuro: selezionandola dal control su
  // canvas bianco si vedrebbe bianco su bianco e sembrerebbe un bug.
  decorators: [
    (Story, ctx) =>
      ctx.args.variant === 'outline-inverse' ? (
        <div className="bg-neutral-950 p-10">
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'outline-brand',
        'outline-inverse',
        'secondary',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: [
        'default',
        'xs',
        'sm',
        'lg',
        'icon',
        'icon-xs',
        'icon-sm',
        'icon-lg',
      ],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Esplora i corsi',
  },
}

/**
 * Destructive uses `text-destructive-muted-foreground` (`@ecoter/tokens`
 * `error.700`, ~5.5:1 on `bg-destructive/10`) instead of `text-destructive`
 * (~3.2:1) — the a11y addon's "Violations" tab should show 0 for this story.
 */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outline-brand">Outline brand</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

/**
 * `outline-inverse` è l'unica variante che non vive su fondo chiaro: è pensata
 * per una superficie scura (`neutral-950` pieno, o una foto sotto una velatura
 * `neutral-950/75`), quindi sta in una storia sua con lo sfondo giusto invece
 * che in `AllVariants` — su bianco sarebbe bianco su bianco. Testo bianco
 * ~15:1 su `neutral-950`, ~5.9:1 sul caso peggiore della foto velata; il bordo
 * bianco copre SC 1.4.11 (≥3:1) come confine del componente.
 */
export const OutlineInverse: Story = {
  name: 'Outline inverse (fondo scuro)',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  render: () => (
    <div>
      <div className="flex flex-wrap items-center gap-4 bg-neutral-950 p-12">
        <Button variant="outline-inverse">Vedi tutti i corsi</Button>
        <Button variant="outline-inverse" size="lg">
          Large
        </Button>
        <Button variant="outline-inverse" disabled>
          Non disponibile
        </Button>
      </div>
      {/*
        Il fondo che decide davvero se la variante regge non è `neutral-950`
        pieno (~15:1, caso facile) ma una foto sotto la velatura
        `bg-neutral-950/75` delle fasce fotografiche del sito: nel punto più
        chiaro la foto è bianco pieno, quindi il caso peggiore si riproduce
        qui, solo con token, velando del 75% una superficie bianca. È su
        questo pannello che vanno letti addon-a11y, hover e focus.
      */}
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-neutral-950/75" />
        <div className="relative flex flex-wrap items-center gap-4 p-12">
          <Button variant="outline-inverse">
            Caso peggiore: foto velata al 75%
          </Button>
          <Button variant="outline-inverse" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Icona">
        ★
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    children: 'Non disponibile',
    disabled: true,
  },
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Primo</Button>
      <Button variant="outline">Secondo (premi Tab)</Button>
      <Button variant="ghost">Terzo</Button>
    </div>
  ),
}
