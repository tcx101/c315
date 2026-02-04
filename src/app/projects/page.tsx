import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '项目展示 - C315实验室',
  description: '查看C315实验室完成的优秀项目',
}

const projects = [
  {
    id: 1,
    title: 'FreeRTOS串口数据存储',
    description: '基于FreeRTOS和FAT文件系统的串口数据存储系统，实现数据的可靠接收和持久化存储',
    tags: ['FreeRTOS', 'FAT文件系统', '串口通信', '嵌入式'],
    status: '已完成',
    year: '2024',
    link: '/projects/mqtt',
  },
]

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          项目展示
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          这里展示了C315实验室完成的部分优秀项目，涵盖嵌入式系统、PCB设计、电力电子、机器视觉等电子信息领域
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className="card hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
                  {project.year}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === '已完成'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                查看项目详情
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
