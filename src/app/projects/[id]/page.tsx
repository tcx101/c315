'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiTag, FiUsers } from 'react-icons/fi'
import { projectApi } from '@/lib/projectApi'
import type { Project } from '@/types/project'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const data = await projectApi.getById(params.id)
      setProject(data)
    } catch (err: any) {
      console.error('Failed to fetch project:', err)
      setError('项目不存在或已被删除')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'in-progress': return '进行中'
      case 'planned': return '计划中'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
      case 'planned':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300'
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

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-custom">
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {error || '项目不存在'}
            </h3>
            <button
              onClick={() => router.push('/projects')}
              className="btn-primary mt-4"
            >
              返回项目列表
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-custom">
        {/* 返回按钮 */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <FiArrowLeft />
          返回
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* 项目封面图 */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* 项目标题和状态 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium flex items-center gap-2">
                <FiCalendar size={16} />
                {project.year}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {project.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {project.description}
            </p>

            {/* 链接按钮 */}
            <div className="flex gap-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FiGithub size={20} />
                  查看源码
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <FiExternalLink size={20} />
                  在线演示
                </a>
              )}
            </div>
          </div>

          {/* 技术标签 */}
          {project.tags && project.tags.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <FiTag />
                技术栈
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 参与成员 */}
          {project.members && project.members.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <FiUsers />
                参与成员
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.members.map((member) => (
                  <span
                    key={member}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 项目详细内容 */}
          {project.content && (
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                项目详情
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.content}
                </pre>
              </div>
            </div>
          )}

          {/* 项目信息 */}
          <div className="card mt-8 bg-gray-50 dark:bg-gray-800">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              项目信息
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">提交者：</span>
                <span className="text-gray-900 dark:text-white font-medium ml-2">
                  {project.submitter_name || '未知'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">创建时间：</span>
                <span className="text-gray-900 dark:text-white font-medium ml-2">
                  {new Date(project.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
