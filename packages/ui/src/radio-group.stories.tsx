import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './radio-group'

/**
 * Built on `@base-ui/react/radio-group` — real `role="radiogroup"` semantics,
 * roving tabindex and arrow-key selection from the primitive. The whole option
 * (control + text, and the whole box in the `card` variant) is the click/tap
 * target (WCAG 2.5.5).
 *
 * The group carries no label of its own: wrap it in a `<fieldset>`/`<legend>`
 * and point `aria-labelledby` at the legend — a `<label htmlFor>` cannot name
 * a `role="radiogroup"` container.
 */
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'card'] },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Tipo cliente',
    options: [
      { value: 'azienda', label: 'Azienda' },
      { value: 'privato', label: 'Privato' },
    ],
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'azienda',
  },
}

/** Variante `card`: l'intero riquadro è selezionabile, con descrizione secondaria. */
export const Card: Story = {
  name: 'Variante card',
  args: {
    variant: 'card',
    defaultValue: 'azienda',
    options: [
      {
        value: 'azienda',
        label: 'Azienda',
        description: 'Fattura intestata a una partita IVA',
      },
      {
        value: 'privato',
        label: 'Privato',
        description: 'Fattura intestata a una persona fisica',
      },
    ],
  },
}

/** Orientamento orizzontale — impila comunque sotto il breakpoint `sm`. */
export const Horizontal: Story = {
  name: 'Orizzontale',
  args: {
    variant: 'card',
    orientation: 'horizontal',
    defaultValue: 'azienda',
    options: [
      {
        value: 'azienda',
        label: 'Azienda',
        description: 'Fattura intestata a una partita IVA',
      },
      {
        value: 'privato',
        label: 'Privato',
        description: 'Fattura intestata a una persona fisica',
      },
    ],
  },
}

/** Nessuna opzione selezionata: la prima riceve il focus con Tab, le frecce selezionano. */
export const Vuoto: Story = {
  name: 'Nessuna selezione (tab + frecce)',
  args: {
    options: [
      { value: 'aula', label: 'In aula' },
      { value: 'online', label: 'Online' },
      { value: 'ibrido', label: 'Ibrido' },
    ],
  },
}

/** Stato di errore: `aria-invalid` sta sul gruppo, non sulla singola opzione. */
export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'azienda',
  },
}

/** Una singola opzione disabilitata dentro un gruppo attivo. */
export const OpzioneDisabilitata: Story = {
  name: 'Opzione disabilitata',
  args: {
    variant: 'card',
    defaultValue: 'azienda',
    options: [
      { value: 'azienda', label: 'Azienda' },
      {
        value: 'privato',
        label: 'Privato',
        description: 'Non disponibile per questo corso',
        disabled: true,
      },
    ],
  },
}
