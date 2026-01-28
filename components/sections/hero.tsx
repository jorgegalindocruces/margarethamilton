import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  videoBackground?: string
  backgroundImage?: string
}

export function Hero({ title, subtitle, description, ctaPrimary, ctaSecondary, videoBackground, backgroundImage }: HeroProps) {
  const hasBackground = videoBackground || backgroundImage

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 sm:py-28 lg:py-32">
      {/* Image Background */}
      {backgroundImage && !videoBackground && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 z-10 bg-white/80" />
        </>
      )}

      {/* Video Background */}
      {videoBackground && (
        <>
          <div className="absolute inset-0 z-0">
            <iframe
              src={`https://player.vimeo.com/video/${videoBackground}?background=1&autoplay=1&loop=1&muted=1&quality=1080p`}
              className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-150"
              style={{ border: 'none' }}
              allow="autoplay; fullscreen"
              title="Video de fondo"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-white/75" />
        </>
      )}

      <Container className={hasBackground ? "relative z-20" : "relative"}>
        <div className="mx-auto max-w-4xl text-center">
          {subtitle && (
            <p className="mb-4 text-lg font-medium text-primary-600">{subtitle}</p>
          )}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 font-heading sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
              {description}
            </p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              {ctaPrimary && (
                <Link href={ctaPrimary.href}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {ctaPrimary.text}
                  </Button>
                </Link>
              )}
              {ctaSecondary && (
                <Link href={ctaSecondary.href}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {ctaSecondary.text}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
