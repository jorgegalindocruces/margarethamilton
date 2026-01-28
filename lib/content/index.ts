import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, Event, Course, TeamMember, Testimonial, Partner, School } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

// Get basePath for production builds
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Apply basePath to local image paths
function withBasePath(imagePath: string | undefined): string | undefined {
  if (!imagePath) return imagePath
  // Only apply to local paths starting with /
  if (imagePath.startsWith('/') && !imagePath.startsWith('//')) {
    return `${basePath}${imagePath}`
  }
  return imagePath
}

// Generic function to read all files from a directory
function getFilesFromDirectory(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  return fs.readdirSync(fullPath).filter((file) => file.endsWith('.mdx'))
}

// Generic function to parse MDX file with image path processing
function parseMDXFile<T>(filePath: string, imageFields: string[] = []): T {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  // Apply basePath to specified image fields
  const processedData = { ...data }
  imageFields.forEach((field) => {
    if (processedData[field]) {
      processedData[field] = withBasePath(processedData[field])
    }
  })

  return {
    ...processedData,
    content,
  } as T
}

// ============ BLOG POSTS ============

export function getAllBlogPosts(): BlogPost[] {
  const files = getFilesFromDirectory('blog')

  const posts = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'blog', filename)
      return parseMDXFile<BlogPost>(filePath, ['coverImage'])
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return parseMDXFile<BlogPost>(filePath, ['coverImage'])
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => post.categorySlug === categorySlug)
}

export function getBlogPostsByAuthor(authorSlug: string): BlogPost[] {
  const allPosts = getAllBlogPosts()
  return allPosts.filter((post) => post.authorSlug === authorSlug)
}

export function getAllBlogCategories(): Array<{ slug: string; title: string; count: number }> {
  const posts = getAllBlogPosts()
  const categoriesMap = new Map<string, { slug: string; title: string; count: number }>()

  posts.forEach((post) => {
    if (!categoriesMap.has(post.categorySlug)) {
      categoriesMap.set(post.categorySlug, {
        slug: post.categorySlug,
        title: post.category,
        count: 0,
      })
    }
    const cat = categoriesMap.get(post.categorySlug)!
    cat.count++
  })

  return Array.from(categoriesMap.values()).sort((a, b) => a.title.localeCompare(b.title))
}

export function getAllBlogAuthors(): Array<{ slug: string; name: string; count: number }> {
  const posts = getAllBlogPosts()
  const authorsMap = new Map<string, { slug: string; name: string; count: number }>()

  posts.forEach((post) => {
    if (!authorsMap.has(post.authorSlug)) {
      authorsMap.set(post.authorSlug, {
        slug: post.authorSlug,
        name: post.author,
        count: 0,
      })
    }
    const author = authorsMap.get(post.authorSlug)!
    author.count++
  })

  return Array.from(authorsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

// ============ EVENTS ============

export function getAllEvents(): Event[] {
  const files = getFilesFromDirectory('events')

  const events = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'events', filename)
      return parseMDXFile<Event>(filePath, ['bannerImage'])
    })
    .filter((event) => !event.draft)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

  return events
}

export function getEventBySlug(slug: string): Event | null {
  const filePath = path.join(contentDirectory, 'events', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return parseMDXFile<Event>(filePath, ['bannerImage'])
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date()
  const events = getAllEvents().filter((event) => new Date(event.startsAt) >= now)

  return limit ? events.slice(0, limit) : events
}

// ============ COURSES ============

export function getAllCourses(): Course[] {
  const files = getFilesFromDirectory('courses')

  const courses = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'courses', filename)
      return parseMDXFile<Course>(filePath, ['coverImage'])
    })
    .filter((course) => !course.draft)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

  return courses
}

export function getCourseBySlug(slug: string): Course | null {
  const filePath = path.join(contentDirectory, 'courses', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return parseMDXFile<Course>(filePath, ['coverImage'])
}

export function getCoursesByCategory(categorySlug: string): Course[] {
  const allCourses = getAllCourses()
  return allCourses.filter((course) => course.categorySlug === categorySlug)
}

export function getAllCourseCategories(): Array<{ slug: string; title: string; count: number }> {
  const courses = getAllCourses()
  const categoriesMap = new Map<string, { slug: string; title: string; count: number }>()

  courses.forEach((course) => {
    if (!categoriesMap.has(course.categorySlug)) {
      categoriesMap.set(course.categorySlug, {
        slug: course.categorySlug,
        title: course.category,
        count: 0,
      })
    }
    const cat = categoriesMap.get(course.categorySlug)!
    cat.count++
  })

  return Array.from(categoriesMap.values()).sort((a, b) => a.title.localeCompare(b.title))
}

// ============ TEAM MEMBERS ============

export function getAllTeamMembers(): TeamMember[] {
  const files = getFilesFromDirectory('team')

  const members = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'team', filename)
      return parseMDXFile<TeamMember>(filePath, ['avatarImage'])
    })
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

  return members
}

export function getTeamMemberBySlug(slug: string): TeamMember | null {
  const filePath = path.join(contentDirectory, 'team', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  return parseMDXFile<TeamMember>(filePath, ['avatarImage'])
}

// ============ TESTIMONIALS ============

export function getAllTestimonials(): Testimonial[] {
  const files = getFilesFromDirectory('testimonials')

  const testimonials = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'testimonials', filename)
      return parseMDXFile<Testimonial>(filePath, ['avatarImage'])
    })
    .filter((testimonial) => testimonial.active)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

  return testimonials
}

// ============ PARTNERS ============

export function getAllPartners(): Partner[] {
  const files = getFilesFromDirectory('partners')

  const partners = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'partners', filename)
      return parseMDXFile<Partner>(filePath, ['logoImage'])
    })
    .filter((partner) => partner.active)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

  return partners
}

// ============ SCHOOLS ============

export function getAllSchools(): School[] {
  const files = getFilesFromDirectory('schools')

  const schools = files
    .map((filename) => {
      const filePath = path.join(contentDirectory, 'schools', filename)
      return parseMDXFile<School>(filePath, ['image'])
    })
    .filter((school) => school.active)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

  return schools
}
