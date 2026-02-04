'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">关于我们</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                我们的使命
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                C315实验室重组于2025年，专注于电子信息领域的技术研究与创新实践。
                我们在嵌入式系统、PCB设计、电力电子技术、机器视觉等方向深耕，
                致力于培养具有扎实理论基础和强大实践能力的电子信息人才。
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                在这里，你将有机会参与真实的电子项目开发，掌握从硬件设计到软件编程的全栈技能，
                与志同道合的伙伴一起成长，为未来在电子信息领域的发展打下坚实的基础。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-300">团队成员</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">20+</div>
                <div className="text-gray-600 dark:text-gray-300">完成项目</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-300">获奖荣誉</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
