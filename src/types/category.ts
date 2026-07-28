export type CategorySeo = {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string[]
}

export type Category = {
  slug: string
  name: string
  description: string
  longDescription?: string
  icon: string
  image?: string
  order: number
  featured: boolean
  seo: CategorySeo
}

export type CategoryWithCount = Category & {
  courseCount: number
}
