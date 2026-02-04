'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiMail } from 'react-icons/fi'

const teamMembers = [
  {
    id: 1,
    name: '雷万忠',
    role: '副教授 / 指导教师',
    description: '电力电子与新能源技术专家',
    email: 'leiwanzhong@haue.edu.cn',
  },
  {
    id: 2,
    name: '唐晨翔',
    role: '学生负责人',
    description: '嵌入式软件 · 边缘AI',
    github: 'https://github.com/tcx101',
  },
  {
    id: 3,
    name: '郭响雨',
    role: '学生负责人',
    description: '嵌入式软件 · 智能控制',
    github: 'https://github.com',
  },
]

export default function Team() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">团队成员</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {member.name[0]}
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      <FiMail size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
