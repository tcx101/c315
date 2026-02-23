'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { projectApi } from '@/lib/projectApi'
import type { ProjectFormData } from '@/types/project'

export default function AddProjectPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    content: '',
    image: '',
    tags: [],
    status: 'in-progress',
    year: new Date().getFullYear().toString(),
    members: [],
    github_url: '',
    demo_url: ''
  })
  
  const [tagInput, setTagInput] = useState('')
  const [memberInput, setMemberInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/projects/add')
    }
  }, [user, isLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const handleAddMember = () => {
    if (memberInput.trim() && !formData.members?.includes(memberInput.trim())) {
      setFormData({
        ...formData,
        members: [...(formData.members || []), memberInput.trim()]
      })
      setMemberInput('')
    }
  }

  const handleRemoveMember = (member: string) => {
    setFormData({
      ...formData,
      members: formData.members?.filter(m => m !== member) || []
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!user) {
        setError('请先登录')
        setIsSubmitting(false)
        return
      }

      // 验证必填字段
      if (!formData.title || !formData.description || !formData.year) {
        setError('请填写所有必填字段')
        setIsSubmitting(false)
        return
      }

      if (formData.tags.length === 0) {
        setError('请至少添加一个技术标签')
        setIsSubmitting(false)
        return
      }

      await projectApi.submit(formData, user.id, user.name || user.username)

      alert('项目提交成功！请等待管理员审核。')
      router.push('/projects')
    } catch (err: any) {
      setError(err.message || '提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
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
        <div className="max-w-4xl mx-auto">
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
            className="card"
          >
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              提交项目展示
            </h1>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 提交后需要管理员审核通过才会在项目展示页面显示
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本信息 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  项目名称 *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="如：FreeRTOS串口数据存储"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  项目简介 *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="简要描述项目的功能和特点（100字以内）"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  项目详细介绍
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="详细介绍项目的技术实现、应用场景等（支持Markdown格式）"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  支持Markdown格式，可以添加标题、列表、代码块等
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    项目状态 *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="completed">已完成</option>
                    <option value="in-progress">进行中</option>
                    <option value="planned">计划中</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    项目年份 *
                  </label>
                  <input
                    type="text"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* 技术标签 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  技术标签 *
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="输入技术标签，如：FreeRTOS、STM32等"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <FiPlus />
                    添加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary-800 dark:hover:text-primary-100"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 参与成员 */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  参与成员
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMember())}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="输入成员姓名"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                  >
                    <FiPlus />
                    添加
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.members?.map((member) => (
                    <span
                      key={member}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="hover:text-gray-800 dark:hover:text-gray-100"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 链接 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    GitHub链接
                  </label>
                  <input
                    type="url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    演示链接
                  </label>
                  <input
                    type="url"
                    name="demo_url"
                    value={formData.demo_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  项目封面图链接
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://..."
                />
              </div>

              {/* 提交按钮 */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '提交中...' : '提交项目'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
