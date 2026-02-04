'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiLogOut,
  FiUser,
  FiBook,
  FiSettings
} from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { resourcesApi } from '@/lib/api'
import type { Resource } from '@/types/resource'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [activeTab, setActiveTab] = useState<'my-resources' | 'profile'>('my-resources')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user) {
      // 获取用户的资源
      const fetchUserResources = async () => {
        try {
          const data = await resourcesApi.getByUserId(user.id)
          setResources(data)
        } catch (error) {
          console.error('Failed to fetch user resources:', error)
        }
      }
      fetchUserResources()
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleAddResource = () => {
    router.push('/resources/add')
  }

  const handleEditResource = (id: string) => {
    router.push(`/resources/edit/${id}`)
  }

  const handleDeleteResource = async (id: string) => {
    if (confirm('确定要删除这个资源吗？')) {
      try {
        await resourcesApi.delete(id)
        setResources(resources.filter(r => r.id !== id))
        alert('删除成功！')
      } catch (error) {
        alert('删除失败，请稍后重试')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              {/* 用户信息 */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.role === 'admin' ? '管理员' : '成员'}
                </p>
                {user.department && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {user.department}
                  </p>
                )}
              </div>

              {/* 导航菜单 */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('my-resources')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'my-resources'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <FiBook size={20} />
                  <span>我的资源</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <FiUser size={20} />
                  <span>个人资料</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FiLogOut size={20} />
                  <span>退出登录</span>
                </button>
              </nav>
            </div>
          </div>

          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {activeTab === 'my-resources' && (
              <div>
                {/* 标题和添加按钮 */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    我的资源
                  </h1>
                  <button
                    onClick={handleAddResource}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FiPlus size={20} />
                    添加资源
                  </button>
                </div>

                {/* 资源列表 */}
                {resources.length === 0 ? (
                  <div className="card text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      还没有添加资源
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      点击上方按钮开始添加你的第一个资源
                    </p>
                    <button
                      onClick={handleAddResource}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <FiPlus size={20} />
                      添加资源
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="card">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                              {resource.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {resource.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{resource.category}</span>
                              <span>·</span>
                              <span>{resource.createdAt}</span>
                              <span>·</span>
                              <span>{resource.views} 浏览</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleEditResource(resource.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <FiEdit size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteResource(resource.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  个人资料
                </h1>
                <div className="card">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        用户名
                      </label>
                      <input
                        type="text"
                        value={user.username}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        姓名
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        邮箱
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {user.department && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          专业/部门
                        </label>
                        <input
                          type="text"
                          value={user.department}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        个人简介
                      </label>
                      <textarea
                        value={user.bio || ''}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="介绍一下自己..."
                      />
                    </div>

                    <button className="btn-primary">
                      保存修改
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
