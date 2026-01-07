import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
}

export function Hero({ title, subtitle, description, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 sm:py-28 lg:py-32">
      <Container>
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
