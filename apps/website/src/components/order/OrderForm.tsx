'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Alert,
  buttonVariants,
} from '@ecoter/ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { orderFormSchema } from '@/lib/validation'
import type { ClientType, OrderFormErrors } from '@/lib/validation'
import type { SelectOption } from '@ecoter/ui'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/** Tutti i campi come stringhe controllate (più il consenso booleano): lo schema li rende opzionali a seconda del tipo cliente, lo stato del form no — così ogni input resta controllato per tutta la vita del componente. */
type FormState = {
  courseSlug: string
  clientType: ClientType
  companyName: string
  fullName: string
  vatNumber: string
  taxCode: string
  sdiCode: string
  pec: string
  billingStreet: string
  billingCap: string
  billingCity: string
  billingProvince: string
  email: string
  phone: string
  referent: string
  participants: string
  notes: string
  privacyConsent: boolean
  website: string
}

type Props = {
  /** Corso risolto da `?corso=<slug>`: quando c'è, il campo è precompilato e in sola lettura. */
  course?: { slug: string; title: string }
  /** Usate solo quando `course` è assente (link senza parametro o slug inesistente). */
  courseOptions: SelectOption[]
  privacyPolicyHref: string
}

const CLIENT_TYPE_OPTIONS = [
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
]

function emptyValues(courseSlug: string): FormState {
  return {
    courseSlug,
    clientType: 'azienda',
    companyName: '',
    fullName: '',
    vatNumber: '',
    taxCode: '',
    sdiCode: '',
    pec: '',
    billingStreet: '',
    billingCap: '',
    billingCity: '',
    billingProvince: '',
    email: '',
    phone: '',
    referent: '',
    participants: '1',
    notes: '',
    privacyConsent: false,
    website: '',
  }
}

export function OrderForm({ course, courseOptions, privacyPolicyHref }: Props) {
  const [values, setValues] = useState<FormState>(() =>
    emptyValues(course?.slug ?? '')
  )
  const [errors, setErrors] = useState<OrderFormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const errorBannerRef = useRef<HTMLDivElement>(null)
  const clientTypeLabelId = useId()

  const isCompany = values.clientType === 'azienda'

  /* Come nel form contatti: il focus va spostato dopo il render del banner —
   * chiamare `.focus()` subito dopo `setStatus('error')` colpirebbe un DOM in
   * cui il banner non esiste ancora. */
  useEffect(() => {
    if (status === 'error') {
      errorBannerRef.current?.focus()
    }
  }, [status, statusMessage])

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  /* Cambiando tipo cliente si azzerano i campi dell'altro ramo: restano
   * nascosti e non più validati, e un valore rimasto lì finirebbe comunque
   * nell'email (es. una ragione sociale su una richiesta da privato). */
  function changeClientType(next: ClientType) {
    setValues((prev) =>
      next === 'azienda'
        ? { ...prev, clientType: next, fullName: '' }
        : {
            ...prev,
            clientType: next,
            companyName: '',
            vatNumber: '',
            sdiCode: '',
            pec: '',
            referent: '',
          }
    )
    setErrors({})
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = orderFormSchema.safeParse(values)
    if (!result.success) {
      const nextErrors: OrderFormErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (typeof field === 'string' && !(field in nextErrors)) {
          nextErrors[field as keyof OrderFormErrors] = issue.message
        }
      }
      setErrors(nextErrors)
      setStatus('error')
      setStatusMessage('Controlla i campi evidenziati e riprova.')
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/ottieni-corso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const body = (await response.json()) as {
        ok: boolean
        message?: string
        errors?: OrderFormErrors
      }

      if (!response.ok || !body.ok) {
        setErrors(body.errors ?? {})
        setStatus('error')
        setStatusMessage(
          body.message ?? 'Invio non riuscito. Riprova più tardi.'
        )
        return
      }

      setStatus('success')
      setStatusMessage(
        'Abbiamo ricevuto la richiesta: ti ricontattiamo entro un giorno lavorativo per confermare date, modalità e fatturazione.'
      )
      setValues(emptyValues(course?.slug ?? ''))
    } catch {
      setStatus('error')
      setStatusMessage(
        'Impossibile contattare il server. Controlla la connessione e riprova.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-8 text-center"
      >
        <span
          className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white"
          aria-hidden="true"
        >
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="font-heading text-xl font-bold text-neutral-950">
          Richiesta inviata
        </h3>
        <p className="max-w-sm text-sm text-neutral-600">{statusMessage}</p>
        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className={cn(buttonVariants({ variant: 'outline-brand' }))}
          >
            Invia un&apos;altra richiesta
          </button>
          <Link
            href="/corsi"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            Torna al catalogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {status === 'error' && (
        <Alert
          ref={errorBannerRef}
          tone="error"
          icon={<AlertCircle className="size-4" />}
          aria-live="assertive"
          tabIndex={-1}
          className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {statusMessage}
        </Alert>
      )}

      {/* Corso */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-heading text-lg font-bold text-neutral-950">
          Corso
        </legend>

        {course ? (
          <FormField
            label="Corso richiesto"
            hint="Precompilato dalla pagina del corso"
          >
            {/* `readOnly` nativo, senza `aria-readonly`: l'attributo HTML è
             * già esposto come `readonly` nell'albero di accessibilità, la
             * versione ARIA sarebbe solo un duplicato. */}
            {(field) => (
              <Input
                {...field}
                value={course.title}
                readOnly
                className="bg-neutral-50 text-neutral-700"
              />
            )}
          </FormField>
        ) : (
          <FormField label="Corso richiesto" required error={errors.courseSlug}>
            {(field) => (
              <Select
                {...field}
                value={values.courseSlug}
                onValueChange={(value) => updateField('courseSlug', value)}
                placeholder="Seleziona un corso…"
                items={courseOptions}
              />
            )}
          </FormField>
        )}

        <FormField
          label="Numero partecipanti"
          required
          error={errors.participants}
          className="sm:max-w-[12rem]"
        >
          {(field) => (
            <Input
              {...field}
              type="number"
              inputMode="numeric"
              min={1}
              max={999}
              value={values.participants}
              onChange={(e) => updateField('participants', e.target.value)}
            />
          )}
        </FormField>
      </fieldset>

      {/* Dati di fatturazione */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-heading text-lg font-bold text-neutral-950">
          Dati di fatturazione
        </legend>

        <div className="flex flex-col gap-1.5">
          <span
            id={clientTypeLabelId}
            className="text-sm font-medium text-neutral-950"
          >
            Tipo cliente
            <span className="ml-0.5 text-error-700" aria-hidden="true">
              *
            </span>
          </span>
          <RadioGroup
            required
            variant="card"
            orientation="horizontal"
            options={CLIENT_TYPE_OPTIONS}
            value={values.clientType}
            onValueChange={(value) => changeClientType(value as ClientType)}
            aria-labelledby={clientTypeLabelId}
            aria-invalid={Boolean(errors.clientType)}
            aria-describedby={
              errors.clientType ? 'order-client-type-error' : undefined
            }
          />
          {errors.clientType && (
            <p
              id="order-client-type-error"
              aria-live="polite"
              className="text-xs font-medium text-error-700"
            >
              {errors.clientType}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {isCompany ? (
            <>
              <FormField
                label="Ragione sociale"
                required
                error={errors.companyName}
              >
                {(field) => (
                  <Input
                    {...field}
                    value={values.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="ECO-TER Srl"
                    autoComplete="organization"
                  />
                )}
              </FormField>

              <FormField
                label="Partita IVA"
                required
                error={errors.vatNumber}
                hint="11 cifre"
              >
                {(field) => (
                  <Input
                    {...field}
                    inputMode="numeric"
                    value={values.vatNumber}
                    onChange={(e) => updateField('vatNumber', e.target.value)}
                    placeholder="01234567890"
                  />
                )}
              </FormField>

              <FormField
                label="Codice fiscale"
                error={errors.taxCode}
                hint="Solo se diverso dalla partita IVA"
              >
                {(field) => (
                  <Input
                    {...field}
                    value={values.taxCode}
                    onChange={(e) => updateField('taxCode', e.target.value)}
                    placeholder="01234567890"
                  />
                )}
              </FormField>

              <FormField
                label="Persona di riferimento"
                required
                error={errors.referent}
              >
                {(field) => (
                  <Input
                    {...field}
                    value={values.referent}
                    onChange={(e) => updateField('referent', e.target.value)}
                    placeholder="Mario Rossi"
                    autoComplete="name"
                  />
                )}
              </FormField>
            </>
          ) : (
            <>
              <FormField
                label="Nome e cognome"
                required
                error={errors.fullName}
              >
                {(field) => (
                  <Input
                    {...field}
                    value={values.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Mario Rossi"
                    autoComplete="name"
                  />
                )}
              </FormField>

              <FormField
                label="Codice fiscale"
                required
                error={errors.taxCode}
                hint="16 caratteri"
              >
                {(field) => (
                  <Input
                    {...field}
                    value={values.taxCode}
                    onChange={(e) => updateField('taxCode', e.target.value)}
                    placeholder="RSSMRA80A01H501U"
                  />
                )}
              </FormField>
            </>
          )}
        </div>

        {isCompany && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Codice SDI"
              error={errors.sdiCode}
              hint="7 caratteri — in alternativa indica la PEC"
            >
              {(field) => (
                <Input
                  {...field}
                  value={values.sdiCode}
                  onChange={(e) => updateField('sdiCode', e.target.value)}
                  placeholder="ABC1234"
                  maxLength={7}
                />
              )}
            </FormField>

            <FormField label="PEC" error={errors.pec}>
              {(field) => (
                <Input
                  {...field}
                  type="email"
                  value={values.pec}
                  onChange={(e) => updateField('pec', e.target.value)}
                  placeholder="azienda@pec.it"
                />
              )}
            </FormField>
          </div>
        )}
      </fieldset>

      {/* Indirizzo di fatturazione */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-heading text-lg font-bold text-neutral-950">
          Indirizzo di fatturazione
        </legend>

        <FormField
          label="Via e numero civico"
          required
          error={errors.billingStreet}
        >
          {(field) => (
            <Input
              {...field}
              value={values.billingStreet}
              onChange={(e) => updateField('billingStreet', e.target.value)}
              placeholder="Via del Lavoro, 2"
              autoComplete="street-address"
            />
          )}
        </FormField>

        <div className="grid gap-5 sm:grid-cols-[8rem_1fr_8rem]">
          <FormField label="CAP" required error={errors.billingCap}>
            {(field) => (
              <Input
                {...field}
                inputMode="numeric"
                maxLength={5}
                value={values.billingCap}
                onChange={(e) => updateField('billingCap', e.target.value)}
                placeholder="40065"
                autoComplete="postal-code"
              />
            )}
          </FormField>

          <FormField label="Città" required error={errors.billingCity}>
            {(field) => (
              <Input
                {...field}
                value={values.billingCity}
                onChange={(e) => updateField('billingCity', e.target.value)}
                placeholder="Pianoro"
                autoComplete="address-level2"
              />
            )}
          </FormField>

          <FormField
            label="Provincia"
            required
            error={errors.billingProvince}
            hint="Sigla"
          >
            {(field) => (
              <Input
                {...field}
                maxLength={2}
                value={values.billingProvince}
                onChange={(e) =>
                  updateField('billingProvince', e.target.value.toUpperCase())
                }
                placeholder="BO"
                autoComplete="address-level1"
              />
            )}
          </FormField>
        </div>
      </fieldset>

      {/* Recapiti */}
      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-heading text-lg font-bold text-neutral-950">
          Recapiti
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Email" required error={errors.email}>
            {(field) => (
              <Input
                {...field}
                type="email"
                value={values.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="nome@azienda.it"
                autoComplete="email"
              />
            )}
          </FormField>

          <FormField label="Telefono" required error={errors.phone}>
            {(field) => (
              <Input
                {...field}
                type="tel"
                value={values.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+39 000 000 0000"
                autoComplete="tel"
              />
            )}
          </FormField>
        </div>

        <FormField
          label="Note"
          hint="Facoltativo — esigenze particolari, date preferite, nominativi dei partecipanti"
          error={errors.notes}
        >
          {(field) => (
            <Textarea
              {...field}
              value={values.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Scrivi qui eventuali richieste…"
              rows={4}
            />
          )}
        </FormField>
      </fieldset>

      {/* Honeypot — stesso pattern del form contatti: `hidden` lo tiene fuori
       * dall'albero di accessibilità e dall'ordine di tabulazione per gli
       * utenti reali, mentre i bot che compilano ogni input per nome ci
       * cascano comunque. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="order-website">Lascia questo campo vuoto</label>
        <input
          id="order-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField('website', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Checkbox
            required
            checked={values.privacyConsent}
            onCheckedChange={(checked) =>
              updateField('privacyConsent', checked)
            }
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent ? 'order-privacy-error' : undefined
            }
            label={
              <>
                Ho letto e accetto la{' '}
                {/* Nuova scheda anche se la destinazione è interna: stesso
                    motivo del ContactForm (non perdere i dati già inseriti).
                    Nessuna icona di link esterno, avviso via sr-only. */}
                <a
                  href={privacyPolicyHref}
                  target="_blank"
                  rel="noopener"
                  className="font-medium text-brand-700 underline decoration-brand-600 underline-offset-2 hover:text-brand-800 hover:decoration-brand-800"
                >
                  privacy policy
                  <span className="sr-only">
                    {' '}
                    (si apre in una nuova scheda)
                  </span>
                </a>
                *
              </>
            }
          />
          {errors.privacyConsent && (
            <p
              id="order-privacy-error"
              aria-live="polite"
              className="text-xs font-medium text-error-700"
            >
              {errors.privacyConsent}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-12 w-full gap-2 px-6 text-base font-semibold sm:w-fit'
          )}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Invio in corso…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Invia richiesta
            </>
          )}
        </button>
      </div>
    </form>
  )
}
