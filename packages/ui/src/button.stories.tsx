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
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'outline-brand',
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
