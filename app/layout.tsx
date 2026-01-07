import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import type { Metadata } from 'next'
import { Nunito, Manrope, Caveat } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Proyecto Margaret Hamilton | Educación en Programación para Niñas y Niños',
    template: '%s | Proyecto Margaret Hamilton',
  },
  description:
    'Cerramos la brecha de género en tecnología desde la infancia. Escuelas de programación gratuitas en colegios públicos para niñas y niños de 6 a 12 años.',
  keywords: [
    'programación para niños',
    'educación tecnológica',
    'igualdad de género',
    'STEM',
    'scratch',
    'colegios públicos',
    'Margaret Hamilton',
  ],
  authors: [{ name: 'Proyecto Margaret Hamilton' }],
  creator: 'Proyecto Margaret Hamilton',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Proyecto Margaret Hamilton',
    title: 'Proyecto Margaret Hamilton | Educación en Programación para Niñas y Niños',
    description:
      'Cerramos la brecha de género en tecnología desde la infancia. Escuelas de programación gratuitas en colegios públicos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto Margaret Hamilton',
    description:
      'Cerramos la brecha de género en tecnología desde la infancia.',
    creator: '@proyectomargarethamilton',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // TODO: Reemplazar con el código real
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${nunito.variable} ${manrope.variable} ${caveat.variable}`}>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
