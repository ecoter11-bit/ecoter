import { SkipToContent } from './SkipToContent'
import { Header } from './Header'
import { Footer } from './Footer'

type SiteLayoutProps = {
  children: React.ReactNode
  privacyPolicyHref: string
  cookiePolicyHref: string
}

/**
 * Legal URLs are threaded in as props (not read here via `getSiteSettings()`)
 * because this component — like `Footer` — is re-exported from the shared
 * `@/components/layout` barrel that client components import `Container`
 * from. Any `fs`-touching import reachable from a barrel-exported module
 * breaks client bundling, even if the client component never renders this
 * one. Only the root `layout.tsx` (never imported by client code) reads
 * settings from disk.
 */
export function SiteLayout({
  children,
  privacyPolicyHref,
  cookiePolicyHref,
}: SiteLayoutProps) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        privacyPolicyHref={privacyPolicyHref}
        cookiePolicyHref={cookiePolicyHref}
      />
    </>
  )
}
