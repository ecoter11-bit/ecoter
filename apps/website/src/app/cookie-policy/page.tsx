import type { Metadata } from 'next'
import Link from 'next/link'
import { Prose, ProseColophon } from '@ecoter/ui'
import { Container } from '@/components/layout'
import { absoluteUrl } from '@/lib/utils'

/**
 * Testo legale approvato — stessa provenienza e stesse regole della
 * `/privacy-policy` (vedi il commento lì). Nota per chi passerà di qui: il
 * § 4 dichiara che il sito non mostra alcun banner di consenso, perché usa
 * solo cookie tecnici. Introdurre analytics o servizi terzi significa
 * aggiornare *prima* questo testo e predisporre un meccanismo di consenso —
 * non aggiungere il banner e poi allineare l'informativa.
 */
const LAST_UPDATED = '22 settembre 2026'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Il sito ECO-TER Academy utilizza esclusivamente cookie tecnici: nessun cookie di profilazione, marketing o analitico e nessun banner di consenso.',
  alternates: {
    canonical: absoluteUrl('/cookie-policy'),
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <div className="border-b border-neutral-200 bg-white">
        <Container className="py-12 lg:py-16">
          <p className="mb-3 text-brand-700 overline">Informativa</p>
          <h1 className="max-w-2xl font-heading text-4xl font-light tracking-tight text-balance text-neutral-950 lg:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-neutral-600">
            Informativa sull&apos;utilizzo dei cookie del sito ecoteracademy.it
          </p>
        </Container>
      </div>

      <div className="bg-neutral-25">
        <Container className="section-padding">
          <Prose className="mx-auto max-w-3xl">
            <h2>1. Premessa</h2>
            <p>
              Questa informativa descrive l&apos;uso dei cookie sul sito{' '}
              <strong>ecoteracademy.it</strong>, in osservanza del Regolamento
              (UE) 2016/679 (GDPR) e della Direttiva 2002/58/CE (ePrivacy). Per
              il trattamento dei dati forniti tramite i moduli si rimanda alla{' '}
              <strong>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </strong>
              .
            </p>

            <h2>2. Titolare del trattamento</h2>
            <p>
              <strong>ECO-TER SRL</strong> — via del Lavoro, 2 — 40065 Pianoro
              (BO) — P.IVA 02252491200 —{' '}
              <a href="mailto:info@eco-ter.com">info@eco-ter.com</a> ·{' '}
              <a href="mailto:academy@eco-ter.com">academy@eco-ter.com</a>.
            </p>

            <h2>3. Quali cookie utilizza questo sito</h2>
            <p>
              Questo sito utilizza{' '}
              <strong>
                esclusivamente cookie tecnici / strettamente necessari
              </strong>
              , indispensabili al corretto funzionamento e alla sicurezza del
              sito (ad esempio gestione della sessione e della sicurezza
              dell&apos;infrastruttura).
            </p>
            <p>
              Questo sito <strong>non</strong> utilizza cookie di{' '}
              <strong>profilazione</strong>, di <strong>marketing</strong>, né
              strumenti <strong>analitici</strong> o di{' '}
              <strong>tracciamento</strong> di terze parti. Non sono integrati
              servizi esterni che installano cookie (i caratteri tipografici
              sono ospitati direttamente sul sito, non caricati da terze parti).
            </p>

            <h2>4. Consenso</h2>
            <p>
              Poiché il sito impiega <strong>solo cookie tecnici</strong>, ai
              sensi della normativa e delle Linee guida del Garante{' '}
              <strong>non è richiesto il consenso preventivo</strong> e non
              viene mostrato alcun banner di consenso ai cookie.
            </p>
            <p>
              Qualora in futuro venissero introdotti strumenti non tecnici (ad
              es. statistiche o servizi di terze parti), questa informativa sarà
              aggiornata e verrà predisposto un idoneo meccanismo di raccolta
              del consenso.
            </p>

            <h2>5. Base giuridica</h2>
            <p>
              I cookie tecnici sono utilizzati senza necessità di consenso, in
              quanto necessari a erogare il servizio della società
              dell&apos;informazione richiesto dall&apos;utente e a garantire la
              sicurezza del sito (art. 122 Codice Privacy; Direttiva ePrivacy).
            </p>

            <h2>6. Come gestire o eliminare i cookie</h2>
            <p>
              L&apos;utente può bloccare o eliminare i cookie dalle impostazioni
              del proprio browser. Guide ufficiali: Google Chrome, Safari,
              Mozilla Firefox, Microsoft Edge (v. sezione assistenza del
              rispettivo browser).
            </p>

            <h2>7. Modifiche</h2>
            <p>
              La presente informativa è soggetta a revisione periodica. Ogni
              variazione significativa sarà comunicata tramite questa pagina.
            </p>

            <ProseColophon>Ultimo aggiornamento: {LAST_UPDATED}.</ProseColophon>
          </Prose>
        </Container>
      </div>
    </>
  )
}
