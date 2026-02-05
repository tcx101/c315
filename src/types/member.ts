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

  // 年级管理相关字段
  enrollment_year?: number           // 入学年份（如 2023）
  enrollment_month?: number          // 入学月份（如 9）
  is_graduated?: boolean             // 是否已毕业
  graduation_year?: number           // 毕业年份

  // 负责人相关字段
  is_current_leader?: boolean        // 是否现任负责人
  leader_start_date?: string         // 担任负责人开始时间
  leader_end_date?: string           // 担任负责人结束时间
  leader_term?: string               // 任期描述（如"2023-2024"）

  // 显示控制
  display_order?: number             // 显示顺序（用于排序）
}
