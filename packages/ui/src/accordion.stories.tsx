import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from './accordion'
import { Badge } from './badge'

/**
 * Built on `@base-ui/react/accordion` — full keyboard support (Tab to move
 * between triggers, Enter/Space to toggle) and ARIA wiring (`aria-expanded`,
 * `aria-controls`, heading semantics via `Accordion.Header`) come from the
 * primitive, not re-implemented here. Interact with any story below (Tab,
 * Enter/Space, mouse click) to see focus and open/close states live — the
 * a11y addon's "Violations" tab should show 0.
 */
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Accordion defaultValue={['a']}>
      <AccordionItem value="a">
        <AccordionTrigger>Cos&apos;è Base UI?</AccordionTrigger>
        <AccordionPanel>
          Una libreria di componenti React non stilizzati, pensata per design
          system e app di produzione.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Come inizio?</AccordionTrigger>
        <AccordionPanel>
          Consulta la guida &quot;Quick start&quot; nella documentazione — se
          hai già usato librerie unstyled, ti troverai a tuo agio.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Posso usarlo nel mio progetto?</AccordionTrigger>
        <AccordionPanel>
          Certo! È gratuito e open source.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

/** `multiple` (prop pass-through di Base UI) permette più pannelli aperti insieme, invece del default a pannello singolo. */
export const MultipleOpen: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion multiple defaultValue={['a', 'b']}>
      <AccordionItem value="a">
        <AccordionTrigger>Primo pannello</AccordionTrigger>
        <AccordionPanel>Aperto di default insieme al secondo.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Secondo pannello</AccordionTrigger>
        <AccordionPanel>Anche questo aperto di default.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Terzo pannello</AccordionTrigger>
        <AccordionPanel>Chiuso finché non lo apri.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion defaultValue={['a']}>
      <AccordionItem value="a">
        <AccordionTrigger>Pannello attivo</AccordionTrigger>
        <AccordionPanel>Contenuto normale.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Pannello disabilitato</AccordionTrigger>
        {/* Base UI: raggiungibile da Tab (focusableWhenDisabled, prassi APG corrente) ma non attivabile — prova a premere Invio. */}
        <AccordionPanel>Non attivabile da tastiera né mouse.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Uso reale — "Programma del corso" nella pagina di dettaglio corso
 * (`/corsi/[slug]`): titolo modulo + badge ore nel trigger, elenco argomenti
 * nel pannello.
 */
export const ProgrammaDelCorso: Story = {
  name: 'Uso nel dettaglio corso',
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion defaultValue={['modulo-a1']}>
      <AccordionItem value="modulo-a1">
        <AccordionTrigger>
          <span className="flex items-center justify-between gap-3">
            Modulo A1 – Il quadro normativo
            <Badge size="sm" color="neutral">
              4 ore
            </Badge>
          </span>
        </AccordionTrigger>
        <AccordionPanel>
          <ul className="space-y-2">
            {[
              'Il D.Lgs. 81/08: struttura e principi fondamentali',
              'Obblighi del datore di lavoro, dirigenti e preposti',
              'Responsabilità penali e civili in materia di sicurezza',
            ].map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden="true"
                />
                {topic}
              </li>
            ))}
          </ul>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="modulo-a2">
        <AccordionTrigger>
          <span className="flex items-center justify-between gap-3">
            Modulo A2 – I soggetti del sistema di prevenzione
            <Badge size="sm" color="neutral">
              4 ore
            </Badge>
          </span>
        </AccordionTrigger>
        <AccordionPanel>
          <ul className="space-y-2">
            {[
              'Il Servizio di Prevenzione e Protezione (SPP)',
              'Il Medico Competente e la sorveglianza sanitaria',
            ].map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600"
                  aria-hidden="true"
                />
                {topic}
              </li>
            ))}
          </ul>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const FocusVisible: Story = {
  name: 'Focus (tab per attivare)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion>
      <AccordionItem value="a">
        <AccordionTrigger>Primo (premi Tab)</AccordionTrigger>
        <AccordionPanel>Contenuto del primo pannello.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Secondo</AccordionTrigger>
        <AccordionPanel>Contenuto del secondo pannello.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}
