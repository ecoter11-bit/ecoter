import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './alert'

function AlertTriangleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function AlertCircleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function CheckCircleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      {...props}
    >
      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  )
}

/**
 * Plain `<div>` + `cva` tone variants — no primitive needed (a callout box
 * has no interaction/state machine to get wrong). `role` defaults to
 * `"alert"` for `tone="error"` and `"status"` for the others; pass an
 * explicit `role`/`aria-live` when the consumer needs different behavior
 * (e.g. `ContactForm`'s error banner also takes focus on submit failure).
 */
const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Warning: Story = {
  args: {
    tone: 'warning',
    icon: <AlertTriangleIcon />,
    children: 'Recapiti provvisori — in attesa di conferma.',
  },
  render: (args) => <Alert {...args} className="w-96" />,
}

export const Error: Story = {
  args: {
    tone: 'error',
    icon: <AlertCircleIcon />,
    children: 'Controlla i campi evidenziati e riprova.',
  },
  render: (args) => <Alert {...args} className="w-96" />,
}

export const Success: Story = {
  args: {
    tone: 'success',
    icon: <CheckCircleIcon />,
    children: 'Richiesta inviata: ti risponderemo il prima possibile.',
  },
  render: (args) => <Alert {...args} className="w-96" />,
}

export const AllTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <Alert tone="success" icon={<CheckCircleIcon />}>
        Richiesta inviata con successo.
      </Alert>
      <Alert tone="warning" icon={<AlertTriangleIcon />}>
        Recapiti provvisori — in attesa di conferma.
      </Alert>
      <Alert tone="error" icon={<AlertCircleIcon />}>
        Controlla i campi evidenziati e riprova.
      </Alert>
    </div>
  ),
}
