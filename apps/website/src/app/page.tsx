import { getAllCategoriesWithCount } from '@/lib/content'
import {
  HeroSection,
  SearchSection,
  AreaFormativeSection,
  WhyEcoterSection,
  ComeFunzionaSection,
  FaqPreviewSection,
  CtaFinaleSection,
} from '@/components/sections'

export default function HomePage() {
  const categories = getAllCategoriesWithCount()

  return (
    <>
      <HeroSection />
      <SearchSection />
      <AreaFormativeSection categories={categories} />
      <WhyEcoterSection />
      <ComeFunzionaSection />
      <FaqPreviewSection />
      <CtaFinaleSection />
    </>
  )
}
