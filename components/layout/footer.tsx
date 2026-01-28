import { Container } from '@/components/ui/container'
import { NewsletterForm } from '@/components/forms/newsletter-form'
import { getAssetPath } from '@/lib/assets'
import Link from 'next/link'

const InstagramIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
)

const XIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/proyectomargarethamilton', icon: InstagramIcon },
  { name: 'X (Twitter)', href: 'https://twitter.com/proyectomargarethamilton', icon: XIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/proyectomargarethamilton', icon: LinkedInIcon },
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
                  src={getAssetPath('/images/logo/logo-blanco.svg')}
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
                    className="text-gray-400 transition-colors hover:text-primary-400"
                    aria-label={link.name}
                  >
                    <link.icon />
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

          {/* Credits */}
          <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
            <p>
              Creado con mucho ❤️ por{' '}
              <a
                href="https://jorgegalindo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Jorge Galindo
              </a>
              , Natalia Bueno y la Asociación AEFAM
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
