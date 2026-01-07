import { BlogCard } from '@/components/cards/blog-card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getBlogPostsByAuthor, getAllBlogAuthors, getTeamMemberBySlug } from '@/lib/content'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogAuthorPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const authors = getAllBlogAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: BlogAuthorPageProps): Promise<Metadata> {
  const authors = getAllBlogAuthors()
  const author = authors.find((a) => a.slug === params.slug)

  return {
    title: author ? `Posts de ${author.name}` : 'Autor',
    description: `Posts escritos por ${author?.name}`,
  }
}

export default function BlogAuthorPage({ params }: BlogAuthorPageProps) {
  const authors = getAllBlogAuthors()
  const authorInfo = authors.find((a) => a.slug === params.slug)

  if (!authorInfo) {
    notFound()
  }

  const posts = getBlogPostsByAuthor(params.slug)
  const teamMember = getTeamMemberBySlug(params.slug)

  return (
    <>
      <Section className="bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {teamMember?.avatarImage && (
              <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={teamMember.avatarImage}
                  alt={authorInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h1 className="mb-4 text-4xl font-bold text-gray-900 font-heading sm:text-5xl">
              {authorInfo.name}
            </h1>
            {teamMember?.role && (
              <p className="mb-4 text-lg text-primary-600 font-medium">{teamMember.role}</p>
            )}
            {teamMember?.bio && <p className="mb-6 text-gray-700">{teamMember.bio}</p>}
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
          <h2 className="mb-8 text-2xl font-bold text-gray-900 font-heading">
            Posts de {authorInfo.name}
          </h2>
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
                Este autor no tiene posts publicados todavía.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
