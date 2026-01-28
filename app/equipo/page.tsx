import { VolunteerForm } from '@/components/forms/volunteer-form'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { getAllTeamMembers } from '@/lib/content'
import { getAssetPath } from '@/lib/assets'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipo de Voluntarios - Únete a Nuestro Proyecto Educativo',
  description:
    'Conoce al equipo de educadores voluntarios del Proyecto Margaret Hamilton en Cádiz. Profesionales apasionados enseñando programación y Scratch a niños en colegios públicos. Únete como voluntario y ayuda a cerrar la brecha digital.',
  keywords: [
    'voluntariado programación Cádiz',
    'educadores tecnología',
    'profesores voluntarios STEM',
    'equipo proyecto educativo',
    'ser voluntario programación niños',
  ],
}

export default function EquipoPage() {
  const teamMembers = getAllTeamMembers()

  return (
    <>
      <Hero
        title="Nuestro equipo de voluntarios"
        description="Personas apasionadas por la educación y la tecnología, trabajando juntas para cerrar la brecha de género"
        backgroundImage={getAssetPath('/images/misc/img-9982.jpg')}
      />

      {/* Team Members */}
      {teamMembers && teamMembers.length > 0 && (
        <Section>
          <Container>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.slug} className="text-center">
                  {member.avatarImage && (
                    <div className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full">
                      <Image
                        src={member.avatarImage}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-lg text-primary-600 font-medium">
                    {member.role}
                  </p>
                  {member.bio && <p className="text-gray-600">{member.bio}</p>}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Mission Statement */}
      <Section variant="gray">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              Desarrollamos el talento del futuro, inspirando a las niñas y niños de hoy
            </h2>
            <p className="text-lg text-gray-700">
              Nuestro equipo está formado por profesionales de diferentes áreas que dedican
              su tiempo a hacer realidad este proyecto educativo.
            </p>
          </div>
        </Container>
      </Section>

      {/* Volunteer Form */}
      <Section>
        <Container size="md">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading sm:text-4xl">
              Únete como voluntario
            </h2>
            <p className="text-lg text-gray-600">
              ¿Quieres formar parte del equipo? Rellena el formulario y nos pondremos en
              contacto contigo
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <VolunteerForm />
          </div>
        </Container>
      </Section>

      {/* Contact Info */}
      <Section variant="gray">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 font-heading">
              Información de contacto
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> proyectomargarethamilton@gmail.com
              </p>
              <p>
                <strong>Teléfono:</strong> 690 051 056
              </p>
              <p>
                <strong>Dirección:</strong> Calle Fernández Ballesteros 2, Cádiz
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
