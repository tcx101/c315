import { supabase } from './supabase'

// 资源相关操作
export const resourcesApi = {
  // 获取所有资源
  async getAll() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      category: item.category,
      url: item.url,
      thumbnailUrl: item.thumbnail_url,
      tags: item.tags || [],
      contributor: {
        name: item.contributor_name,
        avatar: item.contributor_avatar
      },
      contributorId: item.contributor_id,
      createdAt: item.created_at.split('T')[0],
      views: item.views,
      likes: item.likes
    }))
  },

  // 获取用户的资源
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('contributor_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      category: item.category,
      url: item.url,
      thumbnailUrl: item.thumbnail_url,
      tags: item.tags || [],
      contributor: {
        name: item.contributor_name,
        avatar: item.contributor_avatar
      },
      contributorId: item.contributor_id,
      createdAt: item.created_at.split('T')[0],
      views: item.views,
      likes: item.likes
    }))
  },

  // 添加资源
  async create(resource: any, user: any) {
    const { data, error } = await supabase
      .from('resources')
      .insert({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        category: resource.category,
        url: resource.url,
        thumbnail_url: resource.thumbnailUrl || null,
        tags: resource.tags || [],
        contributor_id: user.id,
        contributor_name: user.name,
        contributor_avatar: user.avatar || null,
        views: 0,
        likes: 0
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 更新资源
  async update(id: string, resource: any) {
    const { data, error } = await supabase
      .from('resources')
      .update({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        category: resource.category,
        url: resource.url,
        thumbnail_url: resource.thumbnailUrl || null,
        tags: resource.tags || []
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // 删除资源
  async delete(id: string) {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// 用户相关操作（使用 Supabase Auth）
export const authApi = {
  // 注册
  async signUp(email: string, password: string, userData: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          name: userData.name,
          department: userData.department
        }
      }
    })

    if (error) throw error
    return data
  },

  // 登录
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  // 登出
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // 获取当前用户
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // 获取会话
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  }
}
