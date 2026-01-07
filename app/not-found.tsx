import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-7xl font-bold text-primary-600">404</p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
            Página no encontrada
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Lo sentimos, no pudimos encontrar la página que buscas.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button size="lg">Volver a inicio</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Ver blog
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
