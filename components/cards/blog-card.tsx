import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatShortDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt?: string
  coverImage?: string
  publishedAt: string
  authorName: string
  categoryTitle?: string
}

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  publishedAt,
  authorName,
  categoryTitle,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
        {coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            {categoryTitle && <Badge variant="primary">{categoryTitle}</Badge>}
            <span>{formatShortDate(publishedAt)}</span>
            <span>•</span>
            <span>{authorName}</span>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="mb-4 flex-1 text-gray-600 line-clamp-3">{excerpt}</p>
          )}
          <Button variant="outline" size="sm" className="mt-auto w-fit">
            Seguir Leyendo →
          </Button>
        </div>
      </article>
    </Link>
  )
}
