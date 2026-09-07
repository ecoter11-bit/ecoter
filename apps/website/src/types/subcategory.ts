export type Subcategory = {
  slug: string
  /** Slug della categoria padre (oggi sempre `sicurezza`). */
  parent: string
  name: string
  description: string
  icon: string
  order: number
}

export type SubcategoryWithCount = Subcategory & {
  courseCount: number
}
