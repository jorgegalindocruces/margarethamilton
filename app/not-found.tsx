import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o ha sido movida.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-8xl font-bold text-primary-600 mb-4">404</p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
            Página no encontrada
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            Pero no te preocupes, puedes volver al inicio y seguir explorando.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
            <Link href="/contacta">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contactar
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">¿Buscabas alguna de estas páginas?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/nuestra-mision" className="text-primary-600 hover:text-primary-700 hover:underline">
                Nuestra misión
              </Link>
              <Link href="/equipo" className="text-primary-600 hover:text-primary-700 hover:underline">
                Equipo
              </Link>
              <Link href="/blog" className="text-primary-600 hover:text-primary-700 hover:underline">
                Blog
              </Link>
              <Link href="/crea-tu-escuela" className="text-primary-600 hover:text-primary-700 hover:underline">
                Crea tu escuela
              </Link>
              <Link href="/donacion" className="text-primary-600 hover:text-primary-700 hover:underline">
                Donaciones
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
