import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'

interface CTAProps {
  title: string
  description?: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  backgroundImage?: string
}

export function CTA({ title, description, ctaPrimary, ctaSecondary, backgroundImage }: CTAProps) {
  return (
    <Section variant="primary" backgroundImage={backgroundImage} overlayOpacity="light">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mb-8 text-lg text-gray-700">{description}</p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href={ctaPrimary.href}>
              <Button size="lg" className="w-full sm:w-auto">
                {ctaPrimary.text}
              </Button>
            </Link>
            {ctaSecondary && (
              <Link href={ctaSecondary.href}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  {ctaSecondary.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
