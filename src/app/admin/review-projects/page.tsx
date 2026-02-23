'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiClock, FiEye } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { projectApi } from '@/lib/projectApi'
import type { Project } from '@/types/project'

export default function ReviewProjectsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    } else if (user && user.role !== 'admin' && user.role !== 'leader') {
      router.push('/')
      alert('只有管理员和负责人可以访问此页面')
    } else if (user) {
      fetchProjects()
    }
  }, [user, isLoading, router])

  const fetchProjects = async () => {
    try {
      const data = await projectApi.getAll()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async (project: Project, status: 'approved' | 'rejected') => {
    if (!user) return

    let rejectReason = undefined
    if (status === 'rejected') {
      rejectReason = prompt('请输入拒绝原因：')
      if (!rejectReason) return
    }

    try {
      await projectApi.review(project.id, status, user.id, rejectReason)
      alert(status === 'approved' ? '已通过项目' : '已拒绝项目')
      fetchProjects()
    } catch (error) {
      alert('操作失败，请稍后重试')
    }
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.review_status === filter
  })

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'planned': return '计划中'
      default: return status
    }
  }

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
          项目审核
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
            待审核 ({projects.filter(p => p.review_status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            已通过 ({projects.filter(p => p.review_status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'rejected'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            已拒绝 ({projects.filter(p => p.review_status === 'rejected').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            全部 ({projects.length})
          </button>
        </div>

        {/* 项目列表 */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                暂无项目
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'pending' && '当前没有待审核的项目'}
                {filter === 'approved' && '还没有通过的项目'}
                {filter === 'rejected' && '还没有拒绝的项目'}
                {filter === 'all' && '还没有收到任何项目'}
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      
                      {/* 审核状态标签 */}
                      {project.review_status === 'pending' && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full text-sm flex items-center gap-1">
                          <FiClock size={14} />
                          待审核
                        </span>
                      )}
                      {project.review_status === 'approved' && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm flex items-center gap-1">
                          <FiCheck size={14} />
                          已通过
                        </span>
                      )}
                      {project.review_status === 'rejected' && (
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center gap-1">
                          <FiX size={14} />
                          已拒绝
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>提交者：{project.submitter_name}</span>
                      <span>年份：{project.year}</span>
                      <span>状态：{getStatusText(project.status)}</span>
                      <span>提交时间：{new Date(project.created_at).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 参与成员 */}
                {project.members && project.members.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">参与成员：</span>
                      {project.members.join('、')}
                    </p>
                  </div>
                )}

                {/* 链接 */}
                <div className="flex gap-4 mb-4 text-sm">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      演示链接 →
                    </a>
                  )}
                </div>

                {/* 详细内容（可展开） */}
                {project.content && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      <FiEye size={16} />
                      {expandedProject === project.id ? '收起详细内容' : '查看详细内容'}
                    </button>
                    {expandedProject === project.id && (
                      <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                          {project.content}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* 拒绝原因 */}
                {project.review_status === 'rejected' && project.reject_reason && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      <span className="font-medium">拒绝原因：</span>
                      {project.reject_reason}
                    </p>
                  </div>
                )}

                {/* 操作按钮 */}
                {project.review_status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReview(project, 'approved')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FiCheck size={18} />
                      通过项目
                    </button>
                    <button
                      onClick={() => handleReview(project, 'rejected')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <FiX size={18} />
                      拒绝项目
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
