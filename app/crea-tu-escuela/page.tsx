import { CourseCard } from '@/components/cards/course-card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getAllCourses, getAllCourseCategories } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crea tu Escuela',
  description:
    'Accede a nuestro currículum completo con videos explicativos y materiales descargables para montar tu propia escuela de programación.',
}

export default function CreaTuEscuelaPage() {
  const allCourses = getAllCourses()
  const categories = getAllCourseCategories()

  // Group courses by category
  const coursesByCategory = categories.map((category) => ({
    ...category,
    courses: allCourses.filter((course) => course.categorySlug === category.slug),
  }))

  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 font-heading sm:text-5xl">
              Te enseñamos todo lo necesario para Montar tu propia escuela
            </h1>
            <p className="text-lg text-gray-600">
              Currículum completo, videos explicativos y materiales descargables
            </p>
          </div>
        </Container>
      </Section>

      {/* Courses by Category */}
      {coursesByCategory.map((category, index) => {
        if (category.courses.length === 0) return null

        return (
          <Section key={category.slug} variant={index % 2 === 0 ? 'default' : 'gray'}>
            <Container>
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
                    {category.title}
                  </h2>
                  <Badge variant="primary">{category.courses.length} cursos</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.courses.map((course) => (
                  <CourseCard
                    key={course.slug}
                    slug={course.slug}
                    courseNumber={course.courseNumber}
                    title={course.title}
                    excerpt={course.excerpt}
                    coverImage={course.coverImage}
                    categoryTitle={course.category}
                  />
                ))}
              </div>
            </Container>
          </Section>
        )
      })}

      {/* CTA */}
      <Section variant="primary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              ¿Quieres montar una escuela en tu colegio?
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              Te ayudamos con todo el proceso, desde la formación hasta el material
            </p>
            <Link
              href="/contacta"
              className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Contáctanos
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
