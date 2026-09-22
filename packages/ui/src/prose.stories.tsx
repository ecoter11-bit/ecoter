import type { Meta, StoryObj } from '@storybook/react-vite'
import { Prose, ProseColophon } from './prose'

/**
 * Typography wrapper for running text: the consumer writes semantic HTML and
 * `Prose` supplies the scale. There is no `disabled` state (nothing here is
 * interactive except links) — tab through the story's links to see the real
 * `:focus-visible` outline and hover them for the color/decoration change;
 * both are declared on the component, not faked in these stories.
 */
const meta = {
  title: 'Components/Prose',
  component: Prose,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'sm'],
    },
  },
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof meta>

function SampleBody() {
  return (
    <>
      <p>
        Questa informativa illustra il trattamento dei dati personali raccolti
        tramite il sito <strong>ecoteracademy.it</strong>, inclusi quelli
        acquisiti mediante cookie tecnici e i moduli online eventualmente attivi
        sul sito.
      </p>

      <h2>Basi giuridiche del trattamento</h2>
      <p>
        Il trattamento si fonda, a seconda dei casi, su una o più delle seguenti
        basi:
      </p>
      <ul>
        <li>
          <strong>Esecuzione di misure precontrattuali o contrattuali:</strong>{' '}
          per rispondere alle richieste inviate tramite i moduli.
        </li>
        <li>
          <strong>Adempimento di obblighi di legge:</strong> in particolare
          fiscali, contabili e amministrativi.
        </li>
      </ul>

      <h3>Destinatari dei dati</h3>
      <p>
        L&apos;elenco aggiornato dei responsabili esterni è disponibile su
        richiesta ai recapiti del Titolare, indicati nella{' '}
        <a href="#privacy">privacy policy</a>.
      </p>

      <ProseColophon>Ultimo aggiornamento: 22 settembre 2026.</ProseColophon>
    </>
  )
}

export const Default: Story = {
  args: {
    size: 'default',
    children: <SampleBody />,
  },
  render: (args) => <Prose {...args} className="max-w-2xl" />,
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: <SampleBody />,
  },
  render: (args) => <Prose {...args} className="max-w-2xl" />,
}

export const AllSizes: Story = {
  args: { children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        {/* `neutral-600`, not `-500`: these captions are 12px normal weight,
            so they need the 4.5:1 of normal text (a11y addon flagged
            `neutral-500` at 3.81:1 on this canvas). */}
        <p className="mb-4 text-xs font-semibold tracking-wide text-neutral-600 uppercase">
          size=&quot;default&quot;
        </p>
        <Prose size="default">
          <SampleBody />
        </Prose>
      </div>
      <div>
        <p className="mb-4 text-xs font-semibold tracking-wide text-neutral-600 uppercase">
          size=&quot;sm&quot;
        </p>
        <Prose size="sm">
          <SampleBody />
        </Prose>
      </div>
    </div>
  ),
}

/**
 * The surface `Prose` actually ships on: the legal pages render it on
 * `bg-neutral-25`, not on white. Every contrast figure in the component's
 * review was computed against this background.
 */
export const OnPageSurface: Story = {
  args: { children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="bg-neutral-25 p-8">
      <Prose className="max-w-2xl">
        <SampleBody />
      </Prose>
    </div>
  ),
}
