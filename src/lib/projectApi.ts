import { supabase } from './supabase'
import type { Project, ProjectFormData } from '@/types/project'

export const projectApi = {
  // 获取所有已审核通过的项目（公开）
  async getApproved() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('review_status', 'approved')
      .order('year', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 获取单个项目详情
  async getById(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Project
  },

  // 获取当前用户提交的项目
  async getMyProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('submitted_by', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 提交新项目
  async submit(projectData: ProjectFormData, userId: string, userName: string) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        submitted_by: userId,
        submitter_name: userName,
        review_status: 'pending'
      })
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // 更新项目（仅限待审核的项目）
  async update(id: string, projectData: Partial<ProjectFormData>) {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .eq('review_status', 'pending')
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // 删除项目（仅限待审核的项目）
  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('review_status', 'pending')

    if (error) throw error
  },

  // 获取所有项目（管理员）
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 获取待审核的项目（管理员）
  async getPending() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('review_status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 审核项目（管理员）
  async review(id: string, status: 'approved' | 'rejected', reviewerId: string, rejectReason?: string) {
    const { data, error } = await supabase
      .from('projects')
      .update({
        review_status: status,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString(),
        reject_reason: rejectReason || null
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // 按年份筛选
  async getByYear(year: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('year', year)
      .eq('review_status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 按标签筛选
  async getByTag(tag: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .contains('tags', [tag])
      .eq('review_status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  // 按状态筛选
  async getByStatus(status: 'completed' | 'in-progress' | 'planned') {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', status)
      .eq('review_status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  }
}
