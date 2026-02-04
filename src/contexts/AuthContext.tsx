'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { authApi } from '@/lib/api'
import type { User } from '@/types/user'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  register: (data: any) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authApi.getSession()
        if (session?.user) {
          // 转换 Supabase 用户为我们的 User 类型
          setUser({
            id: session.user.id,
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
            email: session.user.email || '',
            name: session.user.user_metadata?.name || '',
            avatar: session.user.user_metadata?.avatar,
            role: session.user.user_metadata?.role || 'member',
            department: session.user.user_metadata?.department,
            joinDate: new Date(session.user.created_at).toISOString().split('T')[0],
            bio: session.user.user_metadata?.bio
          })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
          email: session.user.email || '',
          name: session.user.user_metadata?.name || '',
          avatar: session.user.user_metadata?.avatar,
          role: session.user.user_metadata?.role || 'member',
          department: session.user.user_metadata?.department,
          joinDate: new Date(session.user.created_at).toISOString().split('T')[0],
          bio: session.user.user_metadata?.bio
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { user: authUser } = await authApi.signIn(email, password)
      
      if (authUser) {
        return { success: true, message: '登录成功' }
      } else {
        return { success: false, message: '登录失败' }
      }
    } catch (error: any) {
      return { success: false, message: error.message || '登录失败，请检查邮箱和密码' }
    }
  }

  const logout = async () => {
    try {
      await authApi.signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const register = async (data: any) => {
    try {
      await authApi.signUp(data.email, data.password, {
        username: data.username,
        name: data.name,
        department: data.department
      })
      
      return { 
        success: true, 
        message: '注册成功！请检查邮箱验证链接后登录。' 
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: error.message || '注册失败，请稍后重试' 
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
