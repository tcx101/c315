export interface Project {
  id: number
  title: string
  description: string
  image?: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'planned'
  year: string
  members?: string[]
  github?: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  avatar?: string
  email?: string
  github?: string
  skills?: string[]
}

export interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  author?: string
  image?: string
}

export interface RecruitmentForm {
  name: string
  email: string
  phone: string
  major: string
  grade: string
  skills: string
  motivation: string
  resume?: File | null
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  wechat?: string
  qq?: string
  github?: string
}
