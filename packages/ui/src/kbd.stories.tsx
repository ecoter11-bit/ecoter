import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd } from './kbd'

/** Tasti nei testi di aiuto: suggerimenti di scorciatoie, legende. */
const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { children: 'Esc' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Uso reale: la legenda in fondo alla finestra di ricerca del sito. */
export const InUnaLegenda: Story = {
  name: 'In una legenda',
  render: () => (
    <p className="flex items-center gap-4 text-xs text-neutral-600">
      <span>
        <Kbd>↑</Kbd> <Kbd>↓</Kbd> per scegliere
      </span>
      <span>
        <Kbd>Invio</Kbd> per aprire
      </span>
      <span>
        <Kbd>Esc</Kbd> per chiudere
      </span>
    </p>
  ),
}
