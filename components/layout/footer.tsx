import { Container } from '@/components/ui/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import Link from 'next/link'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/proyectomargarethamilton', icon: '📷' },
  { name: 'X (Twitter)', href: 'https://twitter.com/proyectomargarethamilton', icon: '𝕏' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/proyectomargarethamilton', icon: '💼' },
]

const footerLinks = {
  navigation: [
    { name: 'Nuestra misión', href: '/nuestra-mision' },
    { name: 'Equipo', href: '/equipo' },
    { name: 'Blog', href: '/blog' },
    { name: 'Cursos', href: '/crea-tu-escuela' },
    { name: 'Contacto', href: '/contacta' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Brand & Mission */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <img
                  src="/images/logo/logo-blanco.svg"
                  alt="Proyecto Margaret Hamilton"
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mt-4 text-sm leading-relaxed">
                Desarrollamos el talento del futuro, inspirando a las niñas y niños de hoy
              </p>
              <div className="mt-6 flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl transition-colors hover:text-primary-400"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">Enlaces</h3>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                Suscríbete a nuestra newsletter
              </h3>
              <p className="text-sm mb-4">
                Recibe las últimas novedades del proyecto
              </p>
              <NewsletterForm sourcePath="footer" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col gap-4 text-sm sm:flex-row sm:justify-between">
              <div>
                <p className="font-medium text-white">Contacto</p>
                <p className="mt-1">proyectomargarethamilton@gmail.com</p>
                <p>Tel: 690 051 056</p>
                <p className="mt-2">Calle Fernández Ballesteros 2, Cádiz</p>
              </div>
              <div className="text-gray-400">
                <p>&copy; {new Date().getFullYear()} Proyecto Margaret Hamilton</p>
                <p className="mt-1">Sin ánimo de lucro</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
