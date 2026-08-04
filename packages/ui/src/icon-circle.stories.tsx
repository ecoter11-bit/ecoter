import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconCircle } from './icon-circle'

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
    {...props}
  >
    <path
      d="m12 2 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8-5.2-4.7 6.9-.7Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SIZES = ['sm', 'md', 'lg'] as const
const COLORS = ['neutral', 'brand', 'blue', 'eco', 'amber'] as const

/**
 * Decorative container — icona sempre `aria-hidden`, il testo accanto porta
 * il significato (WCAG 1.4.1). Tutti i colori solid sono verificati ≥5:1
 * (WCAG AA), stessa ricetta di `badge.tsx` (vedi packages/ui/CLAUDE.md).
 */
const meta = {
  title: 'Components/IconCircle',
  component: IconCircle,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
} satisfies Meta<typeof IconCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    color: 'brand',
    icon: <StarIcon />,
  },
}

export const Sizes: Story = {
  args: { icon: <StarIcon /> },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconCircle size="sm" color="brand" icon={<StarIcon />} />
      <IconCircle size="md" color="brand" icon={<StarIcon />} />
      <IconCircle size="lg" color="brand" icon={<StarIcon />} />
    </div>
  ),
}

export const Colors: Story = {
  args: { icon: <StarIcon /> },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {COLORS.map((color) => (
        <IconCircle key={color} color={color} icon={<StarIcon />} />
      ))}
    </div>
  ),
}

/**
 * Uso reale — card valore/step con hover (transform composto dal
 * consumatore via `className`, non incorporato nel componente): passa
 * `group` sul wrapper e `transition-transform group-hover:scale-110`
 * sull'istanza, come in WhyEcoterSection / ComeFunzionaSection.
 */
export const InCard: Story = {
  name: 'Uso reale (in una card)',
  args: { icon: <StarIcon /> },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="group flex max-w-xs flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-md">
      <IconCircle
        color="brand"
        icon={<StarIcon />}
        className="mb-5 transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="mb-2.5 font-heading text-base font-bold text-neutral-950">
        Approccio pratico
      </h3>
      <p className="text-sm leading-relaxed text-neutral-600">
        Casi reali e strumenti applicabili da subito in azienda, non solo
        teoria da manuale.
      </p>
    </div>
  ),
}

/**
 * Step numerato — cerchio + badge numero sovrapposto (composizione esterna,
 * come in ComeFunzionaSection: il badge numero non fa parte del componente).
 */
export const NumberedStep: Story = {
  name: 'Step numerato (composizione)',
  args: { icon: <StarIcon /> },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="relative w-fit">
      <IconCircle color="brand" icon={<StarIcon />} />
      <span
        className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-amber-400 text-caption font-bold text-brand-900"
        aria-hidden="true"
      >
        01
      </span>
    </div>
  ),
}
