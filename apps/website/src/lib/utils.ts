import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('it-IT', options).format(
    typeof date === 'string' ? new Date(date) : date
  )
}

export function formatDateShort(date: string | Date): string {
  return formatDate(date, { day: '2-digit', month: 'short', year: 'numeric' })
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '…'
}

export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return count === 1 ? singular : plural
}

export function formatHours(hours: number): string {
  if (hours >= 8 && hours % 8 === 0) {
    const days = hours / 8
    return `${days} ${pluralize(days, 'giornata', 'giornate')} (${hours}h)`
  }
  return `${hours} ore`
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://academy.ecoter.it'
  return `${base}${path}`
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url)
}
