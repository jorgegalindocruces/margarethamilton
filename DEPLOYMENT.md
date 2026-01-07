# Guía de Deployment - Margaret Hamilton Project

## Despliegue en GitHub Pages

Este sitio está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions.

### Pasos para el primer deploy

#### 1. Preparar el repositorio

```bash
# Si aún no tienes un repositorio Git iniciado
git init
git add .
git commit -m "Initial commit: Static Next.js site"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

#### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** > **Pages**
3. En **Source**, selecciona: **GitHub Actions**
4. Guarda los cambios

#### 3. Verificar el workflow

El archivo `.github/workflows/deploy.yml` ya está configurado. En la próxima vez que hagas push a `main`, GitHub Actions:

1. Instalará las dependencias
2. Ejecutará `npm run build` (genera sitio estático en `/out`)
3. Desplegará automáticamente a GitHub Pages

#### 4. Ver el sitio desplegado

Una vez completado el workflow (2-3 minutos):
- Tu sitio estará disponible en: `https://tu-usuario.github.io/tu-repositorio/`
- Puedes ver el progreso en la pestaña **Actions** de tu repositorio

---

## Configurar dominio personalizado

### En GitHub Pages

1. Ve a **Settings** > **Pages**
2. En **Custom domain**, ingresa: `www.margarethamiltonproject.org`
3. Marca **Enforce HTTPS**
4. Guarda los cambios

### Configurar DNS

En tu proveedor de DNS (GoDaddy, Cloudflare, etc.), agrega estos registros:

```
Tipo: CNAME
Host: www
Valor: tu-usuario.github.io

Tipo: A (para el dominio raíz)
Host: @
Valores:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

**Nota:** Los cambios de DNS pueden tardar hasta 24 horas en propagarse.

---

## Configurar Formspree (opcional pero recomendado)

Los formularios del sitio usan Formspree. Para que funcionen:

### 1. Crear cuenta en Formspree

1. Ve a [formspree.io](https://formspree.io)
2. Regístrate (plan gratuito permite 50 envíos/mes)

### 2. Crear formularios

Crea 4 formularios en Formspree:
1. **Newsletter** - Para suscripciones
2. **Contacto** - Formulario de contacto general
3. **Voluntariado** - Solicitudes de voluntarios
4. **Donación** - Colaboraciones empresariales

### 3. Obtener Form IDs

Para cada formulario, copia el **Form ID** (formato: `xvgonrqy`)

### 4. Actualizar componentes

Edita estos archivos y reemplaza los Form IDs:

```typescript
// components/forms/newsletter-form.tsx
const response = await fetch('https://formspree.io/f/TU_FORM_ID', {

// components/forms/contact-form.tsx
const response = await fetch('https://formspree.io/f/TU_FORM_ID', {

// components/forms/volunteer-form.tsx
const response = await fetch('https://formspree.io/f/TU_FORM_ID', {

// components/forms/donation-form.tsx
const response = await fetch('https://formspree.io/f/TU_FORM_ID', {
```

### 5. Commit y push

```bash
git add .
git commit -m "Update Formspree form IDs"
git push origin main
```

El sitio se redesplegar automáticamente con los nuevos IDs.

---

## Actualizar contenido

### Agregar un nuevo post de blog

1. Crea un archivo en `content/blog/`:

```bash
touch content/blog/mi-nuevo-post.mdx
```

2. Edita el archivo con tu contenido:

```mdx
---
type: "blog"
slug: "mi-nuevo-post"
title: "Mi Nuevo Post"
excerpt: "Breve descripción"
date: "2026-01-07"
author: "Tu Nombre"
authorSlug: "tu-nombre"
category: "Categoría"
categorySlug: "categoria"
coverImage: "/images/blog/mi-post.jpg"
tags: ["tag1", "tag2"]
draft: false
---

# Contenido del post

Escribe aquí...
```

3. Si tienes imágenes, agrégalas a `public/images/blog/`

4. Commit y push:

```bash
git add .
git commit -m "Add new blog post: Mi Nuevo Post"
git push origin main
```

El sitio se actualizará automáticamente en 2-3 minutos.

### Otros tipos de contenido

- **Cursos:** `content/courses/mi-curso.mdx`
- **Eventos:** `content/events/mi-evento.mdx`
- **Equipo:** `content/team/nuevo-miembro.mdx`
- **Testimonios:** `content/testimonials/testimonio.mdx`
- **Colaboradores:** `content/partners/colaborador.mdx`

Ver archivos de ejemplo existentes para la estructura del frontmatter.

---

## Variables de entorno

El sitio solo necesita una variable de entorno para el sitemap:

### Desarrollo local

Crea `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Producción (GitHub Actions)

Ya está configurado en `.github/workflows/deploy.yml`:

```yaml
env:
  NEXT_PUBLIC_SITE_URL: https://www.margarethamiltonproject.org
```

Si cambias de dominio, actualiza este valor en el workflow.

---

## Monitorización y Analytics

### Google Analytics (opcional)

Para agregar Google Analytics:

1. Obtén tu ID de medición (G-XXXXXXXXXX)
2. Edita `app/layout.tsx`
3. Agrega el script de Google Analytics en el `<head>`

### Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Verifica la propiedad (método DNS o archivo HTML)
4. Envía tu sitemap: `https://www.margarethamiltonproject.org/sitemap.xml`

### Vercel Analytics (alternativa)

Si prefieres desplegar en Vercel en lugar de GitHub Pages:

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Vercel Analytics se activa automáticamente
3. No necesitas GitHub Actions

---

## Optimización de imágenes

Las imágenes están en `public/images/`. Para optimizar:

### Antes de subir imágenes

1. Redimensiona a tamaños apropiados:
   - Blog covers: 1200x630px
   - Course covers: 800x600px
   - Team avatars: 400x400px

2. Comprime con herramientas como:
   - [TinyPNG](https://tinypng.com)
   - [ImageOptim](https://imageoptim.com)
   - [Squoosh](https://squoosh.app)

### Formatos recomendados

- **JPEG** para fotografías
- **PNG** para logos y gráficos con transparencia
- **WebP** para mejor compresión (soportado por Next.js)

---

## Backup y versionado

### Código

Tu código está respaldado en GitHub. Recomendaciones:

- Crea tags para versiones importantes:
  ```bash
  git tag -a v1.0.0 -m "First production release"
  git push origin v1.0.0
  ```

- Usa ramas para features grandes:
  ```bash
  git checkout -b feature/nueva-seccion
  # ... hacer cambios ...
  git push origin feature/nueva-seccion
  # Crear Pull Request en GitHub
  ```

### Contenido

El contenido MDX también está versionado en Git. Para revertir cambios:

```bash
# Ver historial de un archivo
git log content/blog/mi-post.mdx

# Revertir a versión anterior
git checkout <commit-hash> content/blog/mi-post.mdx
git commit -m "Revert blog post changes"
git push origin main
```

---

## Troubleshooting

### El sitio no se despliega

1. Verifica el workflow en **Actions** > Ver el log del último run
2. Errores comunes:
   - Faltan dependencias: Revisa `package.json`
   - Error de TypeScript: Corre `npm run lint` localmente
   - Error de build: Corre `npm run build` localmente

### Los formularios no funcionan

1. Verifica que los Form IDs de Formspree sean correctos
2. Comprueba que no estés en el límite de envíos (50/mes en plan gratuito)
3. Revisa la consola del navegador para errores

### Las imágenes no cargan

1. Verifica que estén en `/public/images/`
2. Las rutas en MDX deben empezar con `/images/` (sin `/public`)
3. Nombres de archivo no pueden tener espacios ni caracteres especiales

### El sitemap no se genera

1. Verifica que `.env.local` tenga `NEXT_PUBLIC_SITE_URL`
2. Accede a `/sitemap.xml` en desarrollo para probar
3. En producción, GitHub Actions configura automáticamente la URL

---

## Costos

### Totalmente gratuito

- **GitHub Pages**: Gratis para repositorios públicos
- **GitHub Actions**: 2000 minutos/mes gratis
- **Formspree Free**: 50 envíos/mes

### Si necesitas más

- **Formspree Gold**: $10/mes (1000 envíos/mes)
- **Vercel Pro**: $20/mes (alternativa a GitHub Pages con analytics)

---

## Soporte

### Documentación oficial

- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)
- Formspree: [help.formspree.io](https://help.formspree.io)

### Contacto del proyecto

- Email: proyectomargarethamilton@gmail.com
- Instagram: [@proyectomargarethamilton](https://instagram.com/proyectomargarethamilton)
