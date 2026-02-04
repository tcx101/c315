'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'

const features = [
  {
    icon: FiCode,
    title: '前沿技术',
    description: '接触最新的技术栈和开发工具，参与实际项目开发',
  },
  {
    icon: FiUsers,
    title: '优秀团队',
    description: '与经验丰富的导师和优秀的同学一起学习成长',
  },
  {
    icon: FiAward,
    title: '竞赛机会',
    description: '参加各类科技竞赛，提升实践能力，获得荣誉',
  },
  {
    icon: FiTrendingUp,
    title: '职业发展',
    description: '积累项目经验，为未来的职业发展打下坚实基础',
  },
]

export default function Features() {
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
          <h2 className="section-title">为什么选择我们</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
