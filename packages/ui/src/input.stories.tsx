import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

/**
 * Native `<input>` under the hood — focus-visible, disabled and placeholder
 * states are real CSS, interact with any story below to see them live.
 * Invalid state reads `aria-invalid` (not a separate `error` boolean prop),
 * so it composes directly with `FormField`, which sets it automatically.
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  /** These stories render a bare Input with no visible `<Label>` (real usage always pairs one — see `FormField`) — `aria-label` here is only to keep the Storybook a11y panel from flagging the expected "unlabelled in isolation" case as a false regression signal. */
  args: {
    'aria-label': 'Campo di esempio',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'password', 'number'],
    },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Mario Rossi',
  },
  render: (args) => <Input {...args} className="w-64" />,
}

export const Filled: Story = {
  args: {
    defaultValue: 'Mario Rossi',
  },
  render: (args) => <Input {...args} className="w-64" />,
}

/** `aria-invalid="true"` switches the border/ring to `error-500` — this is the exact attribute `FormField` sets on its control when an error is present. */
export const Invalid: Story = {
  args: {
    defaultValue: 'indirizzo-non-valido',
    'aria-invalid': true,
  },
  render: (args) => <Input {...args} className="w-64" />,
}

export const Disabled: Story = {
  args: {
    placeholder: 'Non modificabile',
    disabled: true,
  },
  render: (args) => <Input {...args} className="w-64" />,
}

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <Input type="text" aria-label="Testo" placeholder="Testo" />
      <Input type="email" aria-label="Email" placeholder="nome@azienda.it" />
      <Input type="tel" aria-label="Telefono" placeholder="+39 000 000 0000" />
    </div>
  ),
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <Input aria-label="Primo campo" placeholder="Primo (premi Tab)" />
      <Input aria-label="Secondo campo" placeholder="Secondo" />
    </div>
  ),
}
