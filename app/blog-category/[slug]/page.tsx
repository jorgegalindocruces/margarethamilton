import { BlogCard } from '@/components/cards/blog-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getBlogPostsByCategory, getAllBlogCategories } from '@/lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogCategoryPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const categories = getAllBlogCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const categories = getAllBlogCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  return {
    title: category ? `${category.title} - Blog` : 'Categoría',
    description: `Posts de la categoría ${category?.title || ''}`,
  }
}

export default function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const categories = getAllBlogCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  const posts = getBlogPostsByCategory(params.slug)

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 font-heading sm:text-5xl">
              {category.title}
            </h1>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Volver al blog
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  publishedAt={post.date}
                  authorName={post.author}
                  categoryTitle={post.category}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">
                No hay posts en esta categoría todavía.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
