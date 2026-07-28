import { existsSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { ZodError } from 'zod'
import { courseFrontmatterSchema, categorySchema } from '@/lib/validation'

const CONTENT_DIR = join(process.cwd(), 'content')
const COURSES_DIR = join(CONTENT_DIR, 'courses')
const CATEGORIES_DIR = join(CONTENT_DIR, 'categories')

let errors = 0
let validated = 0

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
      courseFrontmatterSchema.parse(data)
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

console.log('🔍 ECOTER Academy – Validazione contenuti\n')
validateCourses()
validateCategories()

console.log(`\n${'─'.repeat(40)}`)
if (errors === 0) {
  console.log(`✅ ${validated} file validati con successo`)
} else {
  console.error(`❌ ${errors} errori trovati su ${validated + errors} file`)
  process.exit(1)
}
