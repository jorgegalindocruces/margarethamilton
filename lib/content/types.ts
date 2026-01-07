// Content types for MDX files

export interface BlogPost {
  type: 'blog'
  slug: string
  title: string
  excerpt?: string
  date: string
  author: string
  authorSlug: string
  category: string
  categorySlug: string
  coverImage?: string
  tags?: string[]
  draft: boolean
  content: string
}

export interface Event {
  type: 'event'
  slug: string
  title: string
  excerpt?: string
  startsAt: string
  endsAt?: string
  location?: string
  organizer?: string
  bannerImage?: string
  draft: boolean
  content: string
}

export interface Course {
  type: 'course'
  slug: string
  courseNumber?: string
  title: string
  excerpt?: string
  category: string
  categorySlug: string
  tags?: string[]
  coverImage?: string
  author?: string
  authorSlug?: string
  googleDocUrl?: string
  youtubeUrl?: string
  scratchUrl?: string
  orderIndex?: number
  draft: boolean
  content: string
}

export interface TeamMember {
  type: 'team'
  slug: string
  name: string
  role: string
  bio?: string
  avatarImage?: string
  orderIndex?: number
  content: string
}

export interface Testimonial {
  type: 'testimonial'
  slug: string
  name: string
  role?: string
  rating: number
  avatarImage?: string
  orderIndex?: number
  active: boolean
  content: string
}

export interface Partner {
  type: 'partner'
  slug: string
  name: string
  logoImage: string
  websiteUrl?: string
  orderIndex?: number
  active: boolean
  content: string
}

export type ContentItem = BlogPost | Event | Course | TeamMember | Testimonial | Partner
