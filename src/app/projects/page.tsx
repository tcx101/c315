'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiPlus, FiGithub, FiExternalLink } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { projectApi } from '@/lib/projectApi'
import type { Project } from '@/types/project'

export default function ProjectsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectApi.getApproved()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    return project.status === filter
  })

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

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              项目展示
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              这里展示了C315实验室完成的部分优秀项目，涵盖嵌入式系统、PCB设计、电力电子、机器视觉等电子信息领域
            </p>
          </div>
          
          {user && (
            <button
              onClick={() => router.push('/projects/add')}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus />
              提交项目
            </button>
          )}
        </div>

        {/* 筛选器 */}
        <div className="flex gap-4 mb-8">
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
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'completed'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            已完成 ({projects.filter(p => p.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'in-progress'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            进行中 ({projects.filter(p => p.status === 'in-progress').length})
          </button>
          <button
            onClick={() => setFilter('planned')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'planned'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            计划中 ({projects.filter(p => p.status === 'planned').length})
          </button>
        </div>

        {/* 项目列表 */}
        {filteredProjects.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              暂无项目
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              还没有{filter !== 'all' ? getStatusText(filter) : ''}项目
            </p>
            {user && (
              <button
                onClick={() => router.push('/projects/add')}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiPlus />
                提交第一个项目
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:scale-105 transition-transform duration-300 cursor-pointer h-full"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
                      {project.year}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {project.members && project.members.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        参与成员：{project.members.join('、')}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                      >
                        <FiGithub size={16} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                      >
                        <FiExternalLink size={16} />
                        <span>演示</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
