'use client'

import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Quiénes somos',
    href: '#',
    submenu: [
      { name: 'Nuestra misión', href: '/nuestra-mision' },
      { name: 'Nuestro equipo', href: '/equipo' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  { name: 'Monta tu escuela', href: '/crea-tu-escuela' },
  { name: 'Contactanos', href: '/contacta' },
  { name: 'Participa', href: '/donacion' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo/logoMH.svg"
              alt="Logo Proyecto Margaret Hamilton"
              className="h-10 w-auto"
            />
            <div className="text-xl font-heading font-bold text-primary-600">
              Proyecto Margaret Hamilton
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item, index) => {
              const isLastItem = index === navigation.length - 1

              return (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <button className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                        {item.name}
                      </button>
                      <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={cn(
                              'block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors',
                              pathname === subitem.href && 'bg-primary-50 text-primary-600'
                            )}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm font-medium transition-colors',
                        isLastItem
                          ? 'rounded-lg bg-primary-600 px-6 py-2.5 text-white hover:bg-primary-700'
                          : 'text-gray-700 hover:text-primary-600',
                        pathname === item.href && !isLastItem && 'text-primary-600'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item, index) => {
                const isLastItem = index === navigation.length - 1

                return (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="mt-2 ml-4 flex flex-col gap-2">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.href}
                              href={subitem.href}
                              className={cn(
                                'text-sm text-gray-600 hover:text-primary-600',
                                pathname === subitem.href && 'text-primary-600 font-medium'
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'text-sm font-medium transition-colors',
                          isLastItem
                            ? 'rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 text-center'
                            : 'text-gray-700 hover:text-primary-600',
                          pathname === item.href && !isLastItem && 'text-primary-600'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
