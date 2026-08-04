import { readFileSync } from 'fs'
import { join } from 'path'
import { siteSettingsSchema } from '@/lib/validation'
import type { SiteSettings } from '@/lib/validation'

const SETTINGS_PATH = join(process.cwd(), 'content', 'settings', 'site.json')

export function getSiteSettings(): SiteSettings {
  const raw = readFileSync(SETTINGS_PATH, 'utf-8')
  const data: unknown = JSON.parse(raw)
  return siteSettingsSchema.parse(data)
}
