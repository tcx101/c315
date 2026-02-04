'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiClock, FiUser } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { memberApplicationApi, memberApi } from '@/lib/memberApi'
import type { MemberApplication } from '@/types/member'

export default function ReviewApplicationsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  
  const [applications, setApplications] = useState<MemberApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user && user.role !== 'admin' && user.role !== 'leader') {
      router.push('/')
      alert('只有管理员和负责人可以访问此页面')
    } else if (user) {
      fetchApplications()
    }
  }, [user, isLoading, router])

  const fetchApplications = async () => {
    try {
      const data = await memberApplicationApi.getAll()
      setApplications(data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async (application: MemberApplication, status: 'approved' | 'rejected') => {
    if (!user) return

    try {
      await memberApplicationApi.review(application.id, status, user.id)

      // 如果审核通过，添加到正式成员
      if (status === 'approved') {
        await memberApi.add({
          user_id: application.user_id,
          username: application.username,
          name: application.name,
          email: application.email,
          role: 'member',
          department: application.department,
          grade: application.grade,
          skills: application.skills ? application.skills.split(',').map(s => s.trim()) : [],
          bio: application.motivation
        })
      }

      alert(status === 'approved' ? '已通过申请' : '已拒绝申请')
      fetchApplications()
    } catch (error) {
      alert('操作失败，请稍后重试')
    }
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  if (isLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user || (user.role !== 'admin' && user.role !== 'leader')) {
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          成员申请审核
        </h1>

        {/* 筛选器 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            待审核 ({applications.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            已通过 ({applications.filter(a => a.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'rejected'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            已拒绝 ({applications.filter(a => a.status === 'rejected').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            全部 ({applications.length})
          </button>
        </div>

        {/* 申请列表 */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                暂无申请
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'pending' && '当前没有待审核的申请'}
                {filter === 'approved' && '还没有通过的申请'}
                {filter === 'rejected' && '还没有拒绝的申请'}
                {filter === 'all' && '还没有收到任何申请'}
              </p>
            </div>
          ) : (
            filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {application.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {application.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.email}
                        </p>
                      </div>
                      
                      {/* 状态标签 */}
                      <div className="ml-auto">
                        {application.status === 'pending' && (
                          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full text-sm flex items-center gap-1">
                            <FiClock size={14} />
                            待审核
                          </span>
                        )}
                        {application.status === 'approved' && (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm flex items-center gap-1">
                            <FiCheck size={14} />
                            已通过
                          </span>
                        )}
                        {application.status === 'rejected' && (
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center gap-1">
                            <FiX size={14} />
                            已拒绝
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">手机号：</span>{application.phone || '未填写'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">专业：</span>{application.department || '未填写'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">年级：</span>{application.grade || '未填写'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">申请时间：</span>
                          {new Date(application.created_at).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    </div>

                    {application.skills && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          技能特长：
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.skills}
                        </p>
                      </div>
                    )}

                    {application.motivation && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          加入动机：
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.motivation}
                        </p>
                      </div>
                    )}

                    {/* 操作按钮 */}
                    {application.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleReview(application, 'approved')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FiCheck size={18} />
                          通过申请
                        </button>
                        <button
                          onClick={() => handleReview(application, 'rejected')}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FiX size={18} />
                          拒绝申请
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
