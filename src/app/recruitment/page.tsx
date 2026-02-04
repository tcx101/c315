'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiCalendar, FiUsers, FiFileText } from 'react-icons/fi'

export default function RecruitmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    major: '',
    grade: '',
    skills: '',
    motivation: '',
    resume: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            报名成功！
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            我们已收到你的报名信息，会尽快与你联系。
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            继续浏览
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          加入我们
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          欢迎对技术充满热情的你加入C315实验室
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <FiCalendar className="text-primary-600 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              招新时间
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              全年开放 · 随时欢迎 🎉
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              只要你有热情，我们的大门永远敞开
            </p>
          </div>
          <div className="card text-center">
            <FiUsers className="text-primary-600 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              招新人数
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              不设上限 · 多多益善 🚀
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              优秀的你值得拥有一席之地
            </p>
          </div>
          <div className="card text-center">
            <FiFileText className="text-primary-600 mx-auto mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              招新要求
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              热爱技术 · 乐于学习 💡
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              零基础也没关系，我们一起成长
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              报名表单
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="请输入你的姓名"
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
                    专业 *
                  </label>
                  <input
                    type="text"
                    name="major"
                    required
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="计算机科学与技术"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  年级 *
                </label>
                <select
                  name="grade"
                  required
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
                  技能特长 *
                </label>
                <textarea
                  name="skills"
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="请简要介绍你掌握的技能和特长"
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
                  placeholder="为什么想加入C315实验室？"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  简历上传（可选）
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-sm text-gray-500 mt-1">
                  支持 PDF、Word 格式，文件大小不超过 5MB
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '提交中...' : '提交报名'}
              </button>
            </form>
          </div>

          <div className="mt-12 card bg-primary-50 dark:bg-primary-900/20">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              招新流程
            </h3>
            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">1.</span>
                <span>填写报名表单并提交</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">2.</span>
                <span>等待初审结果（3个工作日内）</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">3.</span>
                <span>参加面试（线上或线下）</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">4.</span>
                <span>收到录取通知</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">5.</span>
                <span>正式加入C315实验室</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
