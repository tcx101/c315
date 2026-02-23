export interface Project {
  id: string
  title: string
  description: string
  content?: string // Markdown格式的详细内容
  image?: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'planned'
  year: string
  members?: string[]
  github_url?: string
  demo_url?: string
  
  // 提交者信息
  submitted_by?: string
  submitter_name?: string
  
  // 审核相关
  review_status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  reject_reason?: string
  
  // 时间戳
  created_at: string
  updated_at: string
}

export interface ProjectFormData {
  title: string
  description: string
  content?: string
  image?: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'planned'
  year: string
  members?: string[]
  github_url?: string
  demo_url?: string
}
