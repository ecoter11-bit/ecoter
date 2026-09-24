import { existsSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { ZodError } from 'zod'
import {
  courseFrontmatterSchema,
  categorySchema,
  subcategorySchema,
  siteSettingsSchema,
} from '@/lib/validation'
import {
  resolveSubcategory,
  SUBCATEGORIZED_CATEGORY,
} from '@/lib/content/subcategory-mapping'

const CONTENT_DIR = join(process.cwd(), 'content')
const COURSES_DIR = join(CONTENT_DIR, 'courses')
const CATEGORIES_DIR = join(CONTENT_DIR, 'categories')
const SUBCATEGORIES_DIR = join(CONTENT_DIR, 'subcategories')
const SETTINGS_FILE = join(CONTENT_DIR, 'settings', 'site.json')

let errors = 0
let validated = 0

/** Sotto-area risolta per ogni corso della categoria sotto-articolata,
 *  popolata da `validateCourses()` e verificata da
 *  `validateSubcategoryCoverage()`. */
const resolvedSubcategories = new Map<string, string | undefined>()

/** Slug delle sotto-aree definite in `content/subcategories/`. */
const knownSubcategories = new Set<string>()

function formatZodError(err: ZodError): string {
  return err.issues
    .map((issue) => `  - [${issue.path.join('.')}] ${issue.message}`)
    .join('\n')
}

function validateCourses(): void {
  if (!existsSync(COURSES_DIR)) {
    console.warn(`[WARN] Directory corsi non trovata: ${COURSES_DIR}`)
    return
  }

  const files = readdirSync(COURSES_DIR).filter((f) => f.endsWith('.mdx'))
  console.log(`\n📂 Corsi (${files.length} file)`)

  for (const filename of files) {
    const filepath = join(COURSES_DIR, filename)
    try {
      const raw = readFileSync(filepath, 'utf-8')
      const { data } = matter(raw)
      const fm = courseFrontmatterSchema.parse(data)
      if (fm.category === SUBCATEGORIZED_CATEGORY) {
        resolvedSubcategories.set(filename, resolveSubcategory(fm))
      }
      console.log(`  ✓ ${filename}`)
      validated++
    } catch (err) {
      errors++
      if (err instanceof ZodError) {
        console.error(`  ✗ ${filename}\n${formatZodError(err)}`)
      } else {
        console.error(`  ✗ ${filename}: ${String(err)}`)
      }
    }
  }
}

function validateCategories(): void {
  if (!existsSync(CATEGORIES_DIR)) {
    console.warn(`[WARN] Directory categorie non trovata: ${CATEGORIES_DIR}`)
    return
  }

  const files = readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith('.json'))
  console.log(`\n📂 Categorie (${files.length} file)`)

  for (const filename of files) {
    const filepath = join(CATEGORIES_DIR, filename)
    try {
      const raw = readFileSync(filepath, 'utf-8')
      const data: unknown = JSON.parse(raw)
      categorySchema.parse(data)
      console.log(`  ✓ ${filename}`)
      validated++
    } catch (err) {
      errors++
      if (err instanceof ZodError) {
        console.error(`  ✗ ${filename}\n${formatZodError(err)}`)
      } else {
        console.error(`  ✗ ${filename}: ${String(err)}`)
      }
    }
  }
}

function validateSubcategories(): void {
  if (!existsSync(SUBCATEGORIES_DIR)) {
    console.warn(
      `[WARN] Directory sotto-aree non trovata: ${SUBCATEGORIES_DIR}`
    )
    return
  }

  const files = readdirSync(SUBCATEGORIES_DIR).filter((f) =>
    f.endsWith('.json')
  )
  console.log(`
📂 Sotto-aree (${files.length} file)`)

  for (const filename of files) {
    const filepath = join(SUBCATEGORIES_DIR, filename)
    try {
      const raw = readFileSync(filepath, 'utf-8')
      const data: unknown = JSON.parse(raw)
      const sub = subcategorySchema.parse(data)
      if (`${sub.slug}.json` !== filename) {
        throw new Error(
          `slug "${sub.slug}" non corrisponde al nome del file (${filename})`
        )
      }
      knownSubcategories.add(sub.slug)
      console.log(`  ✓ ${filename}`)
      validated++
    } catch (err) {
      errors++
      if (err instanceof ZodError) {
        console.error(`  ✗ ${filename}
${formatZodError(err)}`)
      } else {
        console.error(`  ✗ ${filename}: ${String(err)}`)
      }
    }
  }
}

/**
 * Invariante del catalogo: ogni corso della categoria sotto-articolata sta in
 * esattamente una sotto-area esistente, e la somma dei conteggi per sotto-area
 * torna al totale della categoria. Senza questo controllo un corso nuovo con un
 * codice dal prefisso non mappato sparirebbe in silenzio dai risultati
 * raggruppati, invece di far fallire la validazione.
 */
function validateSubcategoryCoverage(): void {
  console.log(`
📂 Copertura sotto-aree (${SUBCATEGORIZED_CATEGORY})`)

  const total = resolvedSubcategories.size
  const perSubcategory = new Map<string, number>()
  let uncovered = 0

  for (const [filename, slug] of resolvedSubcategories) {
    if (!slug) {
      uncovered++
      errors++
      console.error(
        `  ✗ ${filename}: nessuna sotto-area risolta — serve un "code" con prefisso mappato oppure "subcategory" in frontmatter`
      )
      continue
    }
    if (!knownSubcategories.has(slug)) {
      uncovered++
      errors++
      console.error(
        `  ✗ ${filename}: sotto-area "${slug}" non definita in content/subcategories/`
      )
      continue
    }
    perSubcategory.set(slug, (perSubcategory.get(slug) ?? 0) + 1)
  }

  for (const [slug, count] of [...perSubcategory].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    console.log(`  • ${slug}: ${count}`)
  }

  const sum = [...perSubcategory.values()].reduce((a, b) => a + b, 0)
  if (uncovered === 0) {
    console.log(`  ✓ ${sum}/${total} corsi assegnati a una sotto-area`)
  }
}

function validateSettings(): void {
  if (!existsSync(SETTINGS_FILE)) {
    console.warn(`[WARN] File impostazioni non trovato: ${SETTINGS_FILE}`)
    return
  }

  console.log(`\n📂 Impostazioni sito`)

  try {
    const raw = readFileSync(SETTINGS_FILE, 'utf-8')
    const data: unknown = JSON.parse(raw)
    const settings = siteSettingsSchema.parse(data)
    console.log(`  ✓ site.json`)
    if (settings.contactInfoProvisional) {
      console.warn(
        `  ⚠ Recapiti contrassegnati come provvisori (contactInfoProvisional: true) — ${settings.contactInfoNote ?? 'da confermare prima del lancio.'}`
      )
    }
    validated++
  } catch (err) {
    errors++
    if (err instanceof ZodError) {
      console.error(`  ✗ site.json\n${formatZodError(err)}`)
    } else {
      console.error(`  ✗ site.json: ${String(err)}`)
    }
  }
}

console.log('🔍 ECO-TER Academy – Validazione contenuti\n')
validateCourses()
validateCategories()
validateSubcategories()
validateSubcategoryCoverage()
validateSettings()

console.log(`\n${'─'.repeat(40)}`)
if (errors === 0) {
  console.log(`✅ ${validated} file validati con successo`)
} else {
  console.error(`❌ ${errors} errori trovati su ${validated + errors} file`)
  process.exit(1)
}
