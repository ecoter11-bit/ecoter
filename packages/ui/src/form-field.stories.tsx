import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from './form-field'
import { Input } from './input'
import { Textarea } from './textarea'
import { Select } from './select'

/**
 * Composition helper, not a styled primitive — wires `Label` + a control
 * slot + hint + error via a render-prop, so the same `FormField` works with
 * `Input`, `Textarea`, `Select`, or any custom control. Generates a stable
 * id with `useId()` and sets `aria-invalid`/`aria-describedby` on whatever
 * the render-prop returns.
 */
const meta = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

/** Every story below overrides `children`/`label` via `render` — `args` only exists to satisfy FormField's required-prop typing for Storybook's controls machinery. */
const placeholderArgs = { label: 'placeholder', children: () => null }

export const Default: Story = {
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <FormField label="Nome" required className="w-72">
      {(field) => <Input {...field} placeholder="Mario Rossi" />}
    </FormField>
  ),
}

export const WithHint: Story = {
  name: 'Con testo di aiuto',
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <FormField
      label="Azienda"
      hint="Facoltativo, se ti contatti a titolo personale"
      className="w-72"
    >
      {(field) => <Input {...field} placeholder="Nome azienda" />}
    </FormField>
  ),
}

/** Errore = `aria-invalid` sul controllo + `aria-describedby` verso il messaggio, `aria-live="polite"` — vedi commento in form-field.tsx. */
export const WithError: Story = {
  name: 'Con errore di validazione',
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <FormField
      label="Email"
      required
      error="Inserisci un indirizzo email valido"
      className="w-72"
    >
      {(field) => <Input {...field} type="email" defaultValue="non-un-indirizzo" />}
    </FormField>
  ),
}

export const WithTextarea: Story = {
  name: 'Con Textarea',
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <FormField label="Messaggio" required className="w-80">
      {(field) => <Textarea {...field} placeholder="Scrivi il tuo messaggio…" />}
    </FormField>
  ),
}

export const WithSelect: Story = {
  name: 'Con Select',
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <FormField label="Corso di interesse" className="w-80">
      {(field) => (
        <Select
          {...field}
          placeholder="Seleziona un corso…"
          items={[
            { label: 'RSPP – Modulo A', value: 'rspp-modulo-a' },
            { label: 'Auditor Interno ISO 9001', value: 'auditor-interno-iso-9001' },
          ]}
        />
      )}
    </FormField>
  ),
}

/** Uso reale — un estratto del form "Richiedi informazioni" (`/contatti`). */
export const RichiediInformazioni: Story = {
  name: 'Uso nel form contatti',
  args: placeholderArgs,
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid w-96 gap-5">
      <FormField label="Nome" required>
        {(field) => <Input {...field} placeholder="Mario Rossi" />}
      </FormField>
      <FormField label="Email" required error="Inserisci un indirizzo email valido">
        {(field) => <Input {...field} type="email" defaultValue="mario@" />}
      </FormField>
      <FormField label="Messaggio" required hint="Raccontaci le tue esigenze formative">
        {(field) => <Textarea {...field} placeholder="Scrivi il tuo messaggio…" />}
      </FormField>
    </div>
  ),
}
