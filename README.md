# Margaret Hamilton Project - Static Next.js Site

Sitio web 100% estático del Proyecto Margaret Hamilton construido con Next.js 14 y contenido basado en MDX.

## Stack Tecnológico

- **Next.js 14** (App Router) con TypeScript
- **TailwindCSS** para estilos
- **MDX** para gestión de contenido
- **Framer Motion** para animaciones
- **Formspree** para formularios
- **GitHub Pages** para hosting

## Características

✅ **100% Estático** - Sin base de datos ni backend
✅ **Contenido en MDX** - Archivos markdown con frontmatter
✅ **SEO Optimizado** - Sitemap, robots.txt y metadata dinámica
✅ **Formularios Funcionales** - Integración con Formspree
✅ **Deploy Automático** - GitHub Actions → GitHub Pages
✅ **Performance** - Generación estática en build time

## Requisitos Previos

- Node.js 18+ y npm
- Cuenta de GitHub (para GitHub Pages)
- Cuenta de Formspree (gratuita) - opcional pero recomendada

## Setup Local

### 1. Clonar e instalar dependencias

```bash
git clone <tu-repo-url>
cd MargaretHamilton
npm install
```

### 2. Configurar variable de entorno (opcional)

Crea un archivo `.env.local`:

```bash
# Solo necesario para SEO (sitemap)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Home
│   ├── nuestra-mision/      # Página misión
│   ├── equipo/              # Página equipo
│   ├── contacta/            # Página contacto
│   ├── donacion/            # Página donación
│   ├── blog/                # Blog
│   ├── blog-category/       # Filtro por categoría
│   ├── blog-author/         # Página autor
│   ├── crea-tu-escuela/     # Landing cursos
│   ├── cursos/              # Detalle curso
│   ├── events/              # Detalle evento
│   ├── sitemap.ts           # Generador sitemap
│   └── robots.ts            # Configuración robots.txt
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes UI base
│   ├── layout/              # Header, Footer, Nav
│   ├── sections/            # Hero, Features, Stats, etc
│   ├── forms/               # Formularios con Formspree
│   └── mdx/                 # Componentes MDX
├── content/                 # Contenido MDX
│   ├── blog/                # Posts del blog (.mdx)
│   ├── courses/             # Cursos (.mdx)
│   ├── events/              # Eventos (.mdx)
│   ├── team/                # Miembros equipo (.mdx)
│   ├── testimonials/        # Testimonios (.mdx)
│   └── partners/            # Colaboradores (.mdx)
├── lib/
│   ├── content/             # Parsers de contenido MDX
│   └── utils.ts             # Utilidades
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
└── public/                  # Assets estáticos
```

## Gestión de Contenido

Todo el contenido se gestiona mediante archivos MDX en `/content`. Cada tipo de contenido tiene su propia carpeta.

### Crear un post de blog

Crea un archivo en `content/blog/mi-post.mdx`:

```mdx
---
type: "blog"
slug: "mi-post"
title: "Mi Nuevo Post"
excerpt: "Descripción corta del post"
date: "2026-01-07"
author: "Nombre Autor"
authorSlug: "nombre-autor"
category: "Categoría"
categorySlug: "categoria"
coverImage: "/images/blog/mi-post.jpg"
tags: ["tag1", "tag2"]
draft: false
---

# Contenido del post

Escribe aquí el contenido en Markdown...
```

### Crear un curso

Crea un archivo en `content/courses/mi-curso.mdx`:

```mdx
---
type: "course"
slug: "mi-curso"
courseNumber: 1
title: "Título del Curso"
excerpt: "Descripción"
category: "Categoría"
categorySlug: "categoria"
coverImage: "/images/courses/curso.jpg"
googleDocUrl: "https://docs.google.com/..."
youtubeUrl: "https://youtube.com/..."
scratchUrl: "https://scratch.mit.edu/..."
draft: false
---

# Contenido del curso...
```

### Otros tipos de contenido

- **Eventos:** `content/events/evento.mdx`
- **Equipo:** `content/team/nombre.mdx`
- **Testimonios:** `content/testimonials/testimonio.mdx`
- **Colaboradores:** `content/partners/partner.mdx`

Ver archivos de ejemplo en cada carpeta para la estructura exacta del frontmatter.

## Formularios

Los formularios usan Formspree. Para configurarlos:

1. Crea una cuenta en [formspree.io](https://formspree.io)
2. Crea 4 formularios:
   - Newsletter
   - Contacto
   - Voluntariado
   - Donación
3. Actualiza los IDs en los componentes:
   - `components/forms/newsletter-form.tsx`
   - `components/forms/contact-form.tsx`
   - `components/forms/volunteer-form.tsx`
   - `components/forms/donation-form.tsx`

Busca `https://formspree.io/f/FORM_ID` y reemplaza con tus IDs.

## Deploy en GitHub Pages

### 1. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings > Pages
3. Source: GitHub Actions

### 2. Push a GitHub

```bash
git add .
git commit -m "Update content"
git push origin main
```

El workflow de GitHub Actions se ejecutará automáticamente y desplegará el sitio.

### 3. Dominio personalizado (opcional)

1. En Settings > Pages > Custom domain
2. Añade tu dominio: `www.margarethamiltonproject.org`
3. Configura los DNS según las instrucciones de GitHub

## Comandos útiles

```bash
npm run dev          # Desarrollo local
npm run build        # Build estático (genera /out)
npm run lint         # Linter
```

## SEO

- Metadata dinámica por página
- OpenGraph tags configurados
- Sitemap.xml generado automáticamente
- robots.txt configurado
- Optimización de imágenes (unoptimized para static export)

## Performance

- Generación estática (SSG)
- Sin dependencias de runtime
- Font optimization con next/font
- Code splitting automático
- Lazy loading de imágenes

## Licencia

Proyecto sin ánimo de lucro del Proyecto Margaret Hamilton.

## Contacto

- Web: https://www.margarethamiltonproject.org
- Email: proyectomargarethamilton@gmail.com
- Instagram: [@proyectomargarethamilton](https://instagram.com/proyectomargarethamilton)
