import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="mb-4 text-brand-700 overline">404</p>
      <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-neutral-950">
        Pagina non trovata
      </h1>
      <p className="mb-8 max-w-md text-base text-neutral-600">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link
        href="/"
        className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700"
      >
        Torna alla homepage
      </Link>
    </div>
  )
}
