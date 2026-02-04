'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiBook, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '@/contexts/AuthContext'
import { memberApplicationApi } from '@/lib/memberApi'

export default function ApplyMemberPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    grade: '',
    skills: '',
    motivation: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [applicationStatus, setApplicationStatus] = useState<any>(null)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/apply-member')
    } else if (user) {
      // 检查是否已经申请过
      checkApplicationStatus()
      // 预填充用户信息
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }))
    }
  }, [user, isLoading, router])

  const checkApplicationStatus = async () => {
    if (!user) return
    
    try {
      const application = await memberApplicationApi.getByUserId(user.id)
      setApplicationStatus(application)
    } catch (error) {
      console.error('Failed to check application status:', error)
    } finally {
      setCheckingStatus(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      if (!formData.name || !formData.email || !formData.phone || !formData.motivation) {
        setError('请填写所有必填字段')
        setIsSubmitting(false)
        return
      }

      await memberApplicationApi.submit({
        user_id: user.id,
        username: user.username,
        ...formData
      })

      alert('申请提交成功！请等待管理员审核。')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || '提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || checkingStatus) {
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

  // 如果已经申请过
  if (applicationStatus) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              <div className="mb-6">
                {applicationStatus.status === 'pending' && (
                  <>
                    <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-yellow-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      申请审核中
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      你的成员申请已提交，正在等待管理员审核。
                    </p>
                  </>
                )}
                {applicationStatus.status === 'approved' && (
                  <>
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-green-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      申请已通过
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      恭喜！你已成为C315实验室的正式成员。
                    </p>
                  </>
                )}
                {applicationStatus.status === 'rejected' && (
                  <>
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-red-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      申请未通过
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      很遗憾，你的申请未通过审核。
                    </p>
                  </>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">申请信息</h3>
                <div className="text-left space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">姓名：</span>{applicationStatus.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">邮箱：</span>{applicationStatus.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">申请时间：</span>{applicationStatus.created_at.split('T')[0]}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">状态：</span>
                    {applicationStatus.status === 'pending' && '待审核'}
                    {applicationStatus.status === 'approved' && '已通过'}
                    {applicationStatus.status === 'rejected' && '未通过'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push('/')}
                className="btn-primary"
              >
                返回首页
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
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
              申请加入C315实验室
            </h1>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 提交申请后，需要指导教师或学生负责人审核通过后才能成为正式成员。
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本信息 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="请输入真实姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    邮箱 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    手机号 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="13800138000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    专业
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="如：软件工程"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  年级
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">请选择年级</option>
                  <option value="大一">大一</option>
                  <option value="大二">大二</option>
                  <option value="大三">大三</option>
                  <option value="大四">大四</option>
                  <option value="研一">研一</option>
                  <option value="研二">研二</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  技能特长
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="请简要介绍你掌握的技能和特长，如：C语言、Python、PCB设计等"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  加入动机 *
                </label>
                <textarea
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="为什么想加入C315实验室？你希望在实验室学到什么？"
                />
              </div>

              {/* 提交按钮 */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '提交中...' : '提交申请'}
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
