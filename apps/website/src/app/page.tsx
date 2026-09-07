import {
  getAllCategoriesWithCount,
  getHomeFeaturedCourses,
} from '@/lib/content'
import {
  HeroSection,
  FeaturedCoursesSection,
  AreaFormativeSection,
  WhyEcoterSection,
  ComeFunzionaSection,
  FaqPreviewSection,
  CtaFinaleSection,
} from '@/components/sections'

export default function HomePage() {
  const categories = getAllCategoriesWithCount()
  const featuredCourses = getHomeFeaturedCourses()

  return (
    <>
      <HeroSection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <AreaFormativeSection categories={categories} />
      <WhyEcoterSection />
      <ComeFunzionaSection />
      <FaqPreviewSection />
      <CtaFinaleSection />
    </>
  )
}
