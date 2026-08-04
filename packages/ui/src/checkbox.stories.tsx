import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'

/**
 * Built on `@base-ui/react/checkbox` — real `role="checkbox"`/keyboard
 * (Space to toggle) semantics from the primitive. The whole label text is
 * always part of the click/tap target (WCAG 2.5.5), not just the box —
 * interact with any story below to see focus and checked states live.
 */
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Iscrivimi alla newsletter',
  },
}

export const Checked: Story = {
  args: {
    label: 'Iscrivimi alla newsletter',
    defaultChecked: true,
  },
}

/** Consent-checkbox pattern used by the contact form — label content can include an inline link. */
export const WithLink: Story = {
  name: 'Con link (consenso privacy)',
  args: { label: 'placeholder — overridden by render' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Checkbox
      required
      label={
        <>
          Ho letto e accetto la{' '}
          <a href="/legal/privacy-policy" className="text-brand-700 underline">
            privacy policy
          </a>
        </>
      }
    />
  ),
}

export const Invalid: Story = {
  args: { label: 'placeholder — overridden by render' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Checkbox
      required
      aria-invalid
      label="Ho letto e accetto la privacy policy"
    />
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Non disponibile',
    disabled: true,
  },
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  args: { label: 'placeholder — overridden by render' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Primo (premi Tab)" />
      <Checkbox label="Secondo" />
    </div>
  ),
}
