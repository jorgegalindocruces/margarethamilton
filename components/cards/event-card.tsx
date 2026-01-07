import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  slug: string
  title: string
  description?: string
  bannerImage?: string
  startsAt?: string
  location?: string
  organizer?: string
}

export function EventCard({
  slug,
  title,
  description,
  bannerImage,
  startsAt,
  location,
  organizer,
}: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
        {bannerImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            <Image
              src={bannerImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="mb-4 text-gray-600 line-clamp-2">{description}</p>
          )}
          <div className="mt-auto space-y-2 text-sm text-gray-600">
            {startsAt && (
              <div className="flex items-center gap-2">
                <span className="font-medium">📅</span>
                <span>{formatDate(startsAt)}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <span className="font-medium">📍</span>
                <span>{location}</span>
              </div>
            )}
            {organizer && (
              <div className="flex items-center gap-2">
                <span className="font-medium">👤</span>
                <span>{organizer}</span>
              </div>
            )}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            Ver detalles
          </Button>
        </div>
      </article>
    </Link>
  )
}
