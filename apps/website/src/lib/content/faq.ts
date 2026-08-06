import type { Faq } from '@/types'

/**
 * Single source of truth for FAQ content — consumed by the homepage teaser
 * (`FaqPreviewSection`) and the full `/faq` page, so the two never drift.
 * No `content/faq/*.json` yet (unauthored), so this lives as a plain module
 * like the rest of `src/lib/content/*` rather than a content file.
 */
export const FAQS: Faq[] = [
  {
    id: 'faq-1',
    question:
      'I corsi ECOTER Academy sono riconosciuti dalle autorità competenti?',
    answer:
      'Sì. Tutti i corsi sono progettati nel rispetto dei requisiti normativi vigenti (D.Lgs. 81/08, Accordo Stato-Regioni, ISO, D.M. 02/09/2021). Al termine di ogni percorso viene rilasciato un attestato di frequenza valido ai fini di legge.',
  },
  {
    id: 'faq-2',
    question: 'È possibile organizzare la formazione direttamente in azienda?',
    answer:
      "Il servizio in house è tra i più richiesti: i nostri docenti si recano nella vostra sede e svolgono il corso con il personale, adattando contenuti e orari alle esigenze operative dell'azienda.",
  },
  {
    id: 'faq-3',
    question: "Come ottengo l'attestato di partecipazione?",
    answer:
      "Al termine del corso, dopo aver verificato la presenza e superato eventuali verifiche di apprendimento previste dalla normativa, riceverai l'attestato. Per i corsi online il processo è automatizzato; per quelli in aula viene consegnato fisicamente o inviato via email in PDF.",
  },
  {
    id: 'faq-4',
    question:
      'Qual è la differenza tra formazione in aula e formazione online?',
    answer:
      'La formazione in aula consente interazione diretta con il docente ed è obbligatoria per alcune tipologie di corsi (es. antincendio con parte pratica). La formazione online (FAD) è flessibile e accessibile da qualsiasi dispositivo; è ammessa dalla normativa per la maggior parte dei percorsi teorici.',
  },
]
