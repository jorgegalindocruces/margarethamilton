import { DonationForm } from '@/components/forms/donation-form'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colabora con nosotros',
  description:
    'Ayuda al Proyecto Margaret Hamilton a llevar la programación gratuita a más niñas y niños en etapa escolar.',
}

export default function DonacionPage() {
  return (
    <>
      <Hero
        title="Invierte en el futuro"
        description="Ayúdanos a llevar la programación gratuita a más niñas y niños en etapa escolar"
      />

      {/* Intro */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              ¿Cómo puedes colaborar?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tu donación permite que niñas y niños de colegios públicos accedan a educación
              tecnológica de calidad de forma completamente gratuita. Cada aportación cuenta.
            </p>
          </div>
        </Container>
      </Section>

      {/* Options */}
      <Section variant="gray">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Patrocina una escuela
              </h3>
              <p className="mb-6 text-gray-700">
                Financia completamente una escuela en un colegio público, proporcionando
                material, formación y seguimiento durante todo el curso escolar.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Material completo para todos los estudiantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Formación de profesores voluntarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Seguimiento y apoyo continuo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Reconocimiento como patrocinador principal</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Donación empresarial
              </h3>
              <p className="mb-6 text-gray-700">
                Realiza una donación desde tu empresa para ayudar a financiar materiales,
                infraestructura y actividades del proyecto.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Deducción fiscal según legislación vigente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Certificado de donación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Reconocimiento en nuestra web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600">✓</span>
                  <span>Impacto social medible</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section>
        <Container size="md">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              Formulario de colaboración
            </h2>
            <p className="text-lg text-gray-600">
              Rellena el formulario y nos pondremos en contacto contigo para coordinar la
              colaboración
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <DonationForm />
          </div>
        </Container>
      </Section>

      {/* Campaign Info */}
      <Section variant="gray">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              Campaña en Goteo
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              También puedes colaborar a través de nuestra campaña de crowdfunding en Goteo,
              donde pequeñas aportaciones individuales hacen grandes cambios.
            </p>
            <a
              href="https://goteo.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Ver campaña en Goteo
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
