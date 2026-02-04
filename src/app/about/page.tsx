import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 - C315实验室',
  description: '了解C315实验室的历史、使命和愿景',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          关于我们
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              C315实验室简介
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              C315实验室重组于2025年，是一个专注于电子信息领域发展的创新团队。
              我们致力于培养具有扎实理论基础和强大实践能力的电子信息人才，推动前沿技术的研究与应用。
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              实验室拥有完善的硬件设施和专业的技术平台，为成员提供了优质的学习和研究环境。
              我们鼓励创新思维，支持成员在电子信息领域深入探索，将理论知识转化为实际成果。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              技术方向
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-2 text-primary-600">嵌入式系统</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  单片机开发、RTOS应用、嵌入式Linux、STM32/ARM等微控制器技术
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-2 text-primary-600">PCB设计</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  电路原理图设计、PCB Layout、高速电路设计、信号完整性分析
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-2 text-primary-600">电力电子技术</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  电源设计、电机驱动、功率变换、新能源技术应用
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-2 text-primary-600">机器视觉</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  图像处理、目标检测与识别、OpenCV应用、智能视觉系统开发
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              实验室文化
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>开放包容：欢迎不同背景和专业的同学加入</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>团队协作：强调团队合作，共同成长</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>持续学习：鼓励成员不断学习新技术，提升能力</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span>实践导向：注重理论与实践相结合</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
