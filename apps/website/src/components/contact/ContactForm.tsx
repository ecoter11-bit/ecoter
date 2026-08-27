'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  Alert,
  buttonVariants,
} from '@ecoter/ui'
import { cn } from '@/lib/utils'
import { contactFormSchema } from '@/lib/validation'
import type { ContactFormValues, ContactFormErrors } from '@/lib/validation'
import type { SelectOption } from '@ecoter/ui'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Props = {
  courseOptions: SelectOption[]
  initialCourseSlug?: string
  privacyPolicyHref: string
}

const EMPTY_VALUES: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  courseInterest: '',
  message: '',
  privacyConsent: false,
  website: '',
}

export function ContactForm({
  courseOptions,
  initialCourseSlug,
  privacyPolicyHref,
}: Props) {
  const [values, setValues] = useState<ContactFormValues>({
    ...EMPTY_VALUES,
    courseInterest: initialCourseSlug ?? '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState<string>('')
  const firstErrorRef = useRef<HTMLDivElement>(null)

  /* Moves focus to the error banner once it actually renders — calling
   * `.focus()` synchronously right after `setStatus('error')` would target
   * the pre-update DOM (the banner doesn't exist yet), since state updates
   * aren't applied until after this effect's render. */
  useEffect(() => {
    if (status === 'error') {
      firstErrorRef.current?.focus()
    }
  }, [status, statusMessage])

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = contactFormSchema.safeParse(values)
    if (!result.success) {
      const nextErrors: ContactFormErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (typeof field === 'string' && !(field in nextErrors)) {
          nextErrors[field as keyof ContactFormErrors] = issue.message
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
      const response = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      const body = (await response.json()) as {
        ok: boolean
        message?: string
        errors?: ContactFormErrors
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
      setStatusMessage('Richiesta inviata: ti risponderemo il prima possibile.')
      setValues(EMPTY_VALUES)
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
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={cn(buttonVariants({ variant: 'outline-brand' }), 'mt-2')}
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === 'error' && (
        <Alert
          ref={firstErrorRef}
          tone="error"
          icon={<AlertCircle className="size-4" />}
          aria-live="assertive"
          tabIndex={-1}
          className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {statusMessage}
        </Alert>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nome e cognome" required error={errors.name}>
          {(field) => (
            <Input
              {...field}
              value={values.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Mario Rossi"
              autoComplete="name"
            />
          )}
        </FormField>

        <FormField label="Azienda" error={errors.company}>
          {(field) => (
            <Input
              {...field}
              value={values.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder="Nome azienda"
              autoComplete="organization"
            />
          )}
        </FormField>

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

        <FormField label="Telefono" error={errors.phone}>
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
        label="Corso o area di interesse"
        hint="Facoltativo — ci aiuta a risponderti più velocemente"
        error={errors.courseInterest}
      >
        {(field) => (
          <Select
            {...field}
            value={values.courseInterest}
            onValueChange={(value) => updateField('courseInterest', value)}
            placeholder="Seleziona un corso…"
            items={courseOptions}
          />
        )}
      </FormField>

      <FormField label="Messaggio" required error={errors.message}>
        {(field) => (
          <Textarea
            {...field}
            value={values.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Raccontaci le tue esigenze formative…"
            rows={5}
          />
        )}
      </FormField>

      {/* Honeypot — `hidden` (display:none) keeps it out of the accessibility
       * tree and tab order for real users without an off-screen-positioning
       * trick that risks widening the page's scrollable area. Bots that
       * parse raw HTML and autofill every input by field name still find
       * and fill it, which is what actually catches them. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Lascia questo campo vuoto</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField('website', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Checkbox
          required
          checked={values.privacyConsent}
          onCheckedChange={(checked) => updateField('privacyConsent', checked)}
          aria-invalid={Boolean(errors.privacyConsent)}
          aria-describedby={
            errors.privacyConsent ? 'privacy-consent-error' : undefined
          }
          label={
            <>
              Ho letto e accetto la{' '}
              <a
                href={privacyPolicyHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
              >
                privacy policy
                <ExternalLink className="size-3" aria-hidden="true" />
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
              *
            </>
          }
        />
        {errors.privacyConsent && (
          <p
            id="privacy-consent-error"
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
            Richiedi informazioni
          </>
        )}
      </button>
    </form>
  )
}
