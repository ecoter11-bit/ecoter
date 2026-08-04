import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './select'

const FRUIT_ITEMS = [
  { label: 'Mela', value: 'mela' },
  { label: 'Pera', value: 'pera' },
  { label: 'Arancia', value: 'arancia' },
]

/**
 * Built on `@base-ui/react/select` for a custom-skinned popup that a native
 * `<select>` can't provide. Keyboard: Tab to the trigger, Enter/Space/Down
 * to open, Arrow keys to move between options, Enter to choose, Escape to
 * close without changing the value — all from the primitive, not
 * reimplemented here.
 */
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  /** Bare Select, no visible `<Label>` in isolation — see input.stories.tsx for why `aria-label` is here. */
  args: {
    'aria-label': 'Campo di esempio',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: FRUIT_ITEMS,
    placeholder: 'Scegli un frutto…',
  },
  render: (args) => <Select {...args} className="w-64" />,
}

export const Invalid: Story = {
  args: {
    items: FRUIT_ITEMS,
    placeholder: 'Scegli un frutto…',
    'aria-invalid': true,
  },
  render: (args) => <Select {...args} className="w-64" />,
}

export const Disabled: Story = {
  args: {
    items: FRUIT_ITEMS,
    placeholder: 'Non disponibile',
    disabled: true,
  },
  render: (args) => <Select {...args} className="w-64" />,
}

/** Uso reale — select "Corso/Area di interesse" nel form contatti (`/contatti`): pre-compilabile via `?corso=slug`, mostra il nome del corso invece dello slug grazie a `items`. */
export const AreaInteresse: Story = {
  name: 'Uso nel form contatti',
  args: { items: FRUIT_ITEMS },
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      aria-label="Corso o area di interesse"
      items={[
        { label: 'RSPP – Modulo A: Formazione Generale', value: 'rspp-modulo-a' },
        { label: 'HACCP – Formazione Addetti Alimentare', value: 'haccp-addetti-alimentare' },
        { label: 'Altro / non specificato', value: 'altro' },
      ]}
      defaultValue="rspp-modulo-a"
      className="w-72"
    />
  ),
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  args: { items: FRUIT_ITEMS },
  parameters: { controls: { disable: true } },
  render: () => (
    <Select
      aria-label="Campo di esempio"
      items={FRUIT_ITEMS}
      placeholder="Premi Tab, poi Invio"
      className="w-64"
    />
  ),
}
