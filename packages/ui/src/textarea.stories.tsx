import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  /** Bare Textarea, no visible `<Label>` in isolation — see input.stories.tsx for why `aria-label` is here. */
  args: {
    'aria-label': 'Campo di esempio',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
    rows: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Scrivi il tuo messaggio…',
  },
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const Filled: Story = {
  args: {
    defaultValue:
      'Vorremmo maggiori informazioni sul corso RSPP Modulo A per 5 dipendenti della nostra sede di Bologna.',
  },
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const Invalid: Story = {
  args: {
    defaultValue: 'ok',
    'aria-invalid': true,
  },
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const Disabled: Story = {
  args: {
    placeholder: 'Non modificabile',
    disabled: true,
  },
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Textarea
      aria-label="Campo di esempio"
      placeholder="Premi Tab per attivare"
      className="w-80"
    />
  ),
}
