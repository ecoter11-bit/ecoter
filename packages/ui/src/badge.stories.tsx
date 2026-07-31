import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const VARIANTS = ['solid', 'soft', 'outline'] as const
const COLORS = [
  'neutral',
  'brand',
  'eco',
  'success',
  'warning',
  'error',
  'amber',
] as const

/**
 * Text always carries the meaning (WCAG 1.4.1 — color is reinforcement, not
 * the only signal), and every variant × color combination below is verified
 * ≥4.5:1 (WCAG AA), see packages/ui/CLAUDE.md and packages/ui/src/badge.tsx.
 * Hover/focus-visible are real CSS states baked into the component — interact
 * live (mouse hover, Tab) on the "Come link/bottone" story to see them.
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'soft',
    color: 'brand',
    size: 'md',
    children: 'Sicurezza',
  },
}

/** Le tre varianti stile — stesso colore (brand), a confronto. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="solid" color="brand">
        Solid
      </Badge>
      <Badge variant="soft" color="brand">
        Soft
      </Badge>
      <Badge variant="outline" color="brand">
        Outline
      </Badge>
    </div>
  ),
}

/**
 * Matrice completa variante × colore. Ogni cella è verificata ≥4.5:1
 * (WCAG AA) — l'addon a11y non deve segnalare violazioni di contrasto su
 * nessuna delle 21 combinazioni.
 */
export const VariantColorMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="overflow-x-auto">
      <table className="border-separate border-spacing-3">
        <thead>
          <tr>
            <th className="text-left text-xs font-semibold text-neutral-500">
              &nbsp;
            </th>
            {VARIANTS.map((variant) => (
              <th
                key={variant}
                className="text-left text-xs font-semibold text-neutral-500 capitalize"
              >
                {variant}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map((color) => (
            <tr key={color}>
              <th className="pr-2 text-left text-xs font-semibold text-neutral-500 capitalize">
                {color}
              </th>
              {VARIANTS.map((variant) => (
                <td key={variant}>
                  <Badge variant={variant} color={color}>
                    {color}
                  </Badge>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" color="brand">
        Small
      </Badge>
      <Badge size="md" color="brand">
        Medium
      </Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" color="success" icon={<CheckIcon />}>
        Verificato
      </Badge>
      <Badge size="md" color="success" icon={<CheckIcon />}>
        Verificato
      </Badge>
      <Badge variant="solid" color="success" icon={<CheckIcon />}>
        Verificato
      </Badge>
    </div>
  ),
}

/**
 * Un Badge può diventare link o bottone passando `render`: usa `useRender`
 * di base-ui, quindi eredita davvero gli stati nativi dell'elemento
 * risultante — niente stati "finti" via classi extra. Prova hover e Tab.
 */
export const AsLinkOrButton: Story = {
  name: 'Come link/bottone (interagisci)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        variant="soft"
        color="brand"
        render={<a href="/corsi?cat=sicurezza" />}
      >
        Filtra per Sicurezza
      </Badge>
      <Badge
        variant="outline"
        color="neutral"
        render={<button type="button" />}
      >
        Rimuovi filtro
      </Badge>
      <Badge
        variant="soft"
        color="neutral"
        render={<button type="button" disabled />}
      >
        Non disponibile
      </Badge>
    </div>
  ),
}

/**
 * Uso reale nel catalogo — le stesse combinazioni renderizzate dalla
 * CourseCard: categoria (mappata a brand/eco/warning), livello (mappata a
 * success/warning/error) e "in evidenza" (amber). Vedi
 * apps/website/src/lib/badge-mappings.ts per la mappa slug → colore.
 */
export const UsoNelCatalogo: Story = {
  name: 'Uso nel catalogo',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-semibold text-neutral-500">
          Categoria
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" color="brand">
            Sicurezza
          </Badge>
          <Badge size="sm" color="warning">
            Antincendio
          </Badge>
          <Badge size="sm" color="eco">
            Qualità
          </Badge>
          <Badge size="sm" color="eco">
            Ambiente
          </Badge>
          <Badge size="sm" color="eco">
            Sistemi di Gestione
          </Badge>
          <Badge size="sm" color="brand">
            Management
          </Badge>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-neutral-500">Livello</p>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" color="success">
            Base
          </Badge>
          <Badge size="sm" color="warning">
            Intermedio
          </Badge>
          <Badge size="sm" color="error">
            Avanzato
          </Badge>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-neutral-500">
          In evidenza
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" color="amber">
            In evidenza
          </Badge>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-neutral-500">
          Card corso — badge combinati
        </p>
        <div className="flex max-w-xs flex-wrap items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4">
          <Badge size="sm" color="brand">
            Sicurezza
          </Badge>
          <Badge size="sm" color="success">
            Base
          </Badge>
          <Badge size="sm" color="amber">
            In evidenza
          </Badge>
        </div>
      </div>
    </div>
  ),
}
