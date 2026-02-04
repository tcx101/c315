import { createClient } from '@supabase/supabase-js'

// 使用默认值以支持静态导出构建
// 在运行时，这些值会从环境变量中读取
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
