'use client'

import { Search, X } from 'lucide-react'

type Props = {
  onReset: () => void
  hasFilters: boolean
}

export function EmptyState({ onReset, hasFilters }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-neutral-100">
        <Search className="size-9 text-neutral-400" aria-hidden="true" />
      </div>
      <h3 className="mb-3 font-heading text-xl font-bold text-neutral-950">
        Nessun corso trovato
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-neutral-500">
        {hasFilters
          ? 'Nessun corso corrisponde ai filtri selezionati. Prova a modificare la ricerca o a rimuovere qualche filtro.'
          : 'Il catalogo non contiene ancora corsi pubblicati.'}
      </p>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-xs transition-all duration-200 hover:border-brand-600 hover:text-brand-700 hover:shadow-sm"
        >
          <X className="size-4" aria-hidden="true" />
          Rimuovi tutti i filtri
        </button>
      )}
    </div>
  )
}
