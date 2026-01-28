import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import type { Metadata } from 'next'
import { Nunito, Manrope, Caveat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_TRACKING_ID = 'G-41LSR9HJS9'

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
    default: 'Proyecto Margaret Hamilton | Escuela de Programación para Niños y Niñas en Cádiz',
    template: '%s | Proyecto Margaret Hamilton',
  },
  description:
    'Escuela de programación en Cádiz para niños y niñas de 6 a 12 años. Aprende Scratch y programación en colegios públicos. Talleres, cursos y eventos educativos sin ánimo de lucro. ¡Cerramos la brecha de género en tecnología!',
  keywords: [
    'programación para niños Cádiz',
    'clases de programación infantil',
    'aprender scratch Cádiz',
    'talleres de programación',
    'escuela de programación Cádiz',
    'cursos de programación niños',
    'educación tecnológica Cádiz',
    'colegios públicos Cádiz',
    'STEM para niños',
    'igualdad de género tecnología',
    'programación infantil',
    'actividades extraescolares programación',
    'Margaret Hamilton',
    'coding para niños',
    'robótica educativa Cádiz',
  ],
  authors: [{ name: 'Proyecto Margaret Hamilton Cádiz' }],
  creator: 'Proyecto Margaret Hamilton',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/images/logo/logoMH.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Proyecto Margaret Hamilton',
    title: 'Escuela de Programación para Niños y Niñas en Cádiz | Proyecto Margaret Hamilton',
    description:
      'Escuela de programación en Cádiz. Cursos de Scratch y coding para niños de 6 a 12 años en colegios públicos. Talleres educativos sin ánimo de lucro.',
    images: [
      {
        url: '/images/logo/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Proyecto Margaret Hamilton - Escuela de Programación para Niños y Niñas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto Margaret Hamilton - Programación para Niños Cádiz',
    description:
      'Escuela de programación en Cádiz. Aprende Scratch y coding en colegios públicos.',
    creator: '@proyectomargarethamilton',
    images: ['/images/logo/og-image.jpg'],
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
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
