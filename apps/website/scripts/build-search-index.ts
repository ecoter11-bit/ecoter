import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { buildSearchIndex } from '@/lib/content/search'
import { getAllCategories } from '@/lib/content/categories'

const GENERATED_DIR = join(process.cwd(), 'content', 'generated')

if (!existsSync(GENERATED_DIR)) {
  mkdirSync(GENERATED_DIR, { recursive: true })
}

console.log('🔨 ECOTER Academy – Build search index\n')

const searchIndex = buildSearchIndex()
const searchIndexPath = join(GENERATED_DIR, 'search-index.json')
writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2), 'utf-8')
console.log(`✓ Search index: ${searchIndex.length} corsi → search-index.json`)

const categories = getAllCategories()
const categoriesPath = join(GENERATED_DIR, 'categories.json')
writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf-8')
console.log(`✓ Categorie: ${categories.length} categorie → categories.json`)

console.log(`\n✅ Build completato in ${GENERATED_DIR}`)
