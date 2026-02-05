import { supabase } from './supabase'
import type { MemberApplication, Member } from '@/types/member'
import { calculateGrade, estimateEnrollmentYear, getAcademicYear } from './gradeUtils'

// 成员申请相关操作
export const memberApplicationApi = {
  // 提交申请
  async submit(application: Partial<MemberApplication>) {
    const { data, error } = await supabase
      .from('member_applications')
      .insert({
        user_id: application.user_id,
        username: application.username,
        name: application.name,
        email: application.email,
        department: application.department,
        phone: application.phone,
        grade: application.grade,
        skills: application.skills,
        motivation: application.motivation,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 获取所有申请（管理员）
  async getAll() {
    const { data, error } = await supabase
      .from('member_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // 获取待审核申请
  async getPending() {
    const { data, error } = await supabase
      .from('member_applications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // 审核申请
  async review(id: string, status: 'approved' | 'rejected', reviewerId: string) {
    const { data, error } = await supabase
      .from('member_applications')
      .update({
        status,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 获取用户的申请状态
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('member_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}

// 成员相关操作
export const memberApi = {
  // 获取所有成员
  async getAll() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('join_date', { ascending: true })

    if (error) throw error
    return data
  },

  // 按角色获取成员
  async getByRole(role: 'admin' | 'leader' | 'member') {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('role', role)
      .order('join_date', { ascending: true })

    if (error) throw error
    return data
  },

  // 添加成员（审核通过后）
  async add(member: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .insert({
        user_id: member.user_id,
        username: member.username,
        name: member.name,
        email: member.email,
        avatar: member.avatar,
        role: member.role || 'member',
        department: member.department,
        grade: member.grade,
        skills: member.skills,
        bio: member.bio,
        github_url: member.github_url
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 更新成员信息
  async update(id: string, member: Partial<Member>) {
    const { data, error } = await supabase
      .from('members')
      .update(member)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 删除成员
  async delete(id: string) {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // 获取现任学生负责人
  async getCurrentLeaders() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('role', 'leader')
      .eq('is_current_leader', true)
      .order('display_order', { ascending: true })

    if (error) throw error
    return data || []
  },

  // 获取历任学生负责人
  async getFormerLeaders() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('role', 'leader')
      .eq('is_current_leader', false)
      .order('leader_end_date', { ascending: false })

    if (error) throw error
    return data || []
  },

  // 设置学生负责人
  async setLeader(memberId: string, termStart: string) {
    const termYear = getAcademicYear()

    const { data, error } = await supabase
      .from('members')
      .update({
        role: 'leader',
        is_current_leader: true,
        leader_start_date: termStart,
        leader_term: termYear
      })
      .eq('id', memberId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 卸任学生负责人
  async removeLeader(memberId: string, termEnd: string) {
    const { data, error } = await supabase
      .from('members')
      .update({
        role: 'member', // 降级为普通成员
        is_current_leader: false,
        leader_end_date: termEnd
      })
      .eq('id', memberId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 批量更新年级（手动触发）
  async batchUpdateGrades() {
    // 获取所有有入学年份的成员
    const { data: members, error: fetchError } = await supabase
      .from('members')
      .select('*')
      .not('enrollment_year', 'is', null)

    if (fetchError) throw fetchError

    // 计算新年级并更新
    const updates = members.map(member => {
      const newGrade = calculateGrade(member.enrollment_year!, member.enrollment_month || 9)
      const isGrad = newGrade === '已毕业'

      return supabase
        .from('members')
        .update({
          grade: newGrade,
          is_graduated: isGrad,
          graduation_year: isGrad ? new Date().getFullYear() : null
        })
        .eq('id', member.id)
    })

    await Promise.all(updates)
    return { success: true, count: updates.length }
  },

  // 迁移现有数据（添加入学年份）
  async migrateExistingData() {
    const { data: members, error } = await supabase
      .from('members')
      .select('*')
      .is('enrollment_year', null)

    if (error) throw error

    const updates = members.map(member => {
      if (!member.grade) return null

      const enrollmentYear = estimateEnrollmentYear(member.grade)

      return supabase
        .from('members')
        .update({
          enrollment_year: enrollmentYear,
          enrollment_month: 9
        })
        .eq('id', member.id)
    }).filter(Boolean)

    await Promise.all(updates)
    return { success: true, count: updates.length }
  }
}
