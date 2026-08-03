import { MDXRemote } from 'next-mdx-remote/rsc'

/**
 * Manual type-scale mapping instead of `@tailwindcss/typography` (`prose`) —
 * the plugin isn't installed anywhere in the monorepo, and course bodies use
 * a small, known subset of Markdown (##/###, bold, paragraphs, lists,
 * links), so hand-mapped elements stay token-only and match the site's
 * actual heading/body scale exactly.
 *
 * `##`/`###` in course body Markdown are demoted one level (→ `<h3>`/`<h4>`):
 * the page already wraps this content in a "Panoramica" `<h2>` (see
 * `src/app/corsi/[slug]/page.tsx`), so the body's own headings are
 * subsections of it, not siblings — rendering them as `<h2>` would produce a
 * flat, semantically wrong outline even though it reads fine visually.
 */
const components = {
  h2: (props: React.ComponentProps<'h3'>) => (
    <h3
      className="mt-10 mb-4 font-heading text-2xl font-bold text-neutral-950 first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<'h4'>) => (
    <h4
      className="mt-8 mb-3 font-heading text-lg font-bold text-neutral-950"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-neutral-600" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-neutral-950" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul
      className="mb-4 list-disc space-y-1.5 pl-5 text-neutral-600"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="mb-4 list-decimal space-y-1.5 pl-5 text-neutral-600"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
      {...props}
    />
  ),
}

type Props = {
  source: string
}

export function CourseMdxContent({ source }: Props) {
  return <MDXRemote source={source} components={components} />
}
