import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface CourseCardProps {
  slug: string
  courseNumber?: string
  title: string
  excerpt?: string
  coverImage?: string
  categoryTitle?: string
}

export function CourseCard({
  slug,
  courseNumber,
  title,
  excerpt,
  coverImage,
  categoryTitle,
}: CourseCardProps) {
  const displayTitle = courseNumber ? `${courseNumber}. ${title}` : title

  return (
    <Link href={`/cursos/${slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
        {coverImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          {categoryTitle && (
            <Badge variant="secondary" className="mb-3 w-fit">
              {categoryTitle}
            </Badge>
          )}
          <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {displayTitle}
          </h3>
          {excerpt && (
            <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
          )}
          <Button variant="primary" size="sm" className="mt-auto w-full">
            Ir al curso
          </Button>
        </div>
      </article>
    </Link>
  )
}
