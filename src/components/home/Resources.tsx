'use client'

import { motion } from 'framer-motion'
import { FiBook, FiVideo, FiImage, FiFileText, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

const resourceCategories = [
  {
    icon: FiVideo,
    title: '视频教程',
    description: '精选技术视频教程',
    count: 15,
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: FiFileText,
    title: '技术文档',
    description: '详细的技术文档资料',
    count: 28,
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FiImage,
    title: '图文教程',
    description: '图文并茂的学习资料',
    count: 12,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FiBook,
    title: '项目案例',
    description: '实战项目经验分享',
    count: 20,
    color: 'from-purple-500 to-indigo-500'
  }
]

export default function ResourcesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            开源资料库
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            汇聚实验室成员的知识与经验，共建共享技术资源
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {category.description}
              </p>
              <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                {category.count} 个资源
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/resources"
            className="btn-primary inline-flex items-center gap-2"
          >
            浏览全部资源
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
