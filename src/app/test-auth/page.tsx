'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestAuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  const testSignUp = async () => {
    setResult(null)
    setError(null)
    
    try {
      console.log('开始注册...')
      console.log('Email:', email)
      console.log('Password:', password)
      console.log('Name:', name)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            username: email.split('@')[0]
          }
        }
      })

      console.log('注册结果:', data)
      console.log('注册错误:', error)

      if (error) {
        setError(error)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      console.error('捕获错误:', err)
      setError(err)
    }
  }

  const testSignIn = async () => {
    setResult(null)
    setError(null)
    
    try {
      console.log('开始登录...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.log('登录结果:', data)
      console.log('登录错误:', error)

      if (error) {
        setError(error)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      console.error('捕获错误:', err)
      setError(err)
    }
  }

  const checkSession = async () => {
    setResult(null)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.getSession()
      console.log('会话:', data)
      console.log('错误:', error)
      
      if (error) {
        setError(error)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError(err)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          🔧 Supabase Auth 测试
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="密码"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="姓名"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={testSignUp}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                测试注册
              </button>
              <button
                onClick={testSignIn}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                测试登录
              </button>
              <button
                onClick={checkSession}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                检查会话
              </button>
            </div>
          </div>
        </div>

        {/* 结果显示 */}
        {result && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-2 text-green-800 dark:text-green-300">
              ✅ 成功
            </h2>
            <pre className="text-sm text-green-700 dark:text-green-400 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* 错误显示 */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-2 text-red-800 dark:text-red-300">
              ❌ 错误
            </h2>
            <pre className="text-sm text-red-700 dark:text-red-400 overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        {/* 说明 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-300">
            📝 使用说明
          </h2>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <li>1. 填写邮箱、密码和姓名</li>
            <li>2. 点击"测试注册"查看注册结果</li>
            <li>3. 点击"测试登录"查看登录结果</li>
            <li>4. 打开浏览器控制台（F12）查看详细日志</li>
            <li>5. 检查 Supabase Dashboard 的 Authentication 设置</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
