import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Input } from './input'

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="story-label-input">Nome</Label>
      <Input id="story-label-input" placeholder="Mario Rossi" />
    </div>
  ),
}

/** `peer-disabled:` (baked into Label's own classes) dims the label to match a disabled control it's paired with via the `peer` class on the input. */
export const PairedWithDisabledControl: Story = {
  name: 'Con controllo disabilitato',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="story-label-disabled">Campo non disponibile</Label>
      <Input
        id="story-label-disabled"
        disabled
        placeholder="Non modificabile"
        className="peer"
      />
    </div>
  ),
}
