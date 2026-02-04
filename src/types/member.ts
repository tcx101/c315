// 成员申请类型
export interface MemberApplication {
  id: string
  user_id: string
  username: string
  name: string
  email: string
  department?: string
  phone?: string
  grade?: string
  skills?: string
  motivation?: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

// 正式成员类型
export interface Member {
  id: string
  user_id?: string
  username: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'leader' | 'member'
  department?: string
  grade?: string
  skills?: string[]
  bio?: string
  github_url?: string
  join_date: string
  created_at: string
}
