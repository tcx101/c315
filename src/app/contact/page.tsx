import type { Metadata } from 'next'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaWeixin, FaQq, FaGithub } from 'react-icons/fa'

export const metadata: Metadata = {
  title: '联系我们 - C315实验室',
  description: '联系C315实验室获取更多信息',
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          联系我们
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          有任何问题或建议，欢迎随时联系我们
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              联系方式
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiMail className="text-primary-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">邮箱</p>
                  <a href="mailto:lab@example.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                    lab@example.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiPhone className="text-primary-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">电话</p>
                  <p className="text-gray-600 dark:text-gray-300">123-4567-8900</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">地址</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    某某大学某某楼123室
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                社交媒体
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaWeixin size={24} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                >
                  <FaQq size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              办公时间
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>周一 - 周五</span>
                <span className="font-medium">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>周六</span>
                <span className="font-medium">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>周日</span>
                <span className="font-medium">休息</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>温馨提示：</strong>
                如需来访，请提前通过邮件或电话预约，以便我们更好地为您服务。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              常见问题
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  Q: 招新有专业限制吗？
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 pl-4">
                  A: 没有专业限制，我们欢迎所有对技术感兴趣的同学加入。
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  Q: 需要有编程基础吗？
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 pl-4">
                  A: 有基础更好，但不是必须的。我们会提供培训和指导。
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  Q: 每周需要投入多少时间？
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 pl-4">
                  A: 建议每周至少投入10-15小时，具体可以根据个人情况灵活安排。
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  Q: 可以参加多个项目吗？
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 pl-4">
                  A: 可以，但建议先专注于一个项目，熟悉流程后再参与其他项目。
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
