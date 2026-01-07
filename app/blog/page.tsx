import { BlogCard } from '@/components/cards/blog-card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getAllBlogPosts, getAllBlogCategories } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Lee las últimas historias, novedades e inspiración del Proyecto Margaret Hamilton.',
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const categories = getAllBlogCategories()

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 font-heading sm:text-5xl">
              Blog
            </h1>
            <p className="text-lg text-gray-600">
              Historias, novedades e inspiración del proyecto
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <Section className="border-b border-gray-200 py-8">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/blog">
                <Badge variant="default" className="cursor-pointer hover:bg-gray-200">
                  Todos
                </Badge>
              </Link>
              {categories.map((category) => (
                <Link key={category.slug} href={`/blog-category/${category.slug}`}>
                  <Badge variant="primary" className="cursor-pointer hover:bg-primary-200">
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Blog Posts Grid */}
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
                No hay posts publicados todavía. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
