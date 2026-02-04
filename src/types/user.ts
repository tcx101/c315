// 用户类型定义
export interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'member'
  department?: string
  joinDate: string
  bio?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  name: string
  department?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}
