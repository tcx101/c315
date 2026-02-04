import type { Metadata } from 'next'
import Link from 'next/link'
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'FreeRTOS串口数据存储项目 - C315实验室',
  description: '基于FreeRTOS和FAT文件系统的串口数据存储系统',
}

export default function MQTTProjectPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          返回项目列表
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* 项目标题 */}
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            FreeRTOS串口数据存储项目
          </h1>
          
          {/* 项目标签 */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
              FreeRTOS
            </span>
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
              FAT文件系统
            </span>
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
              串口通信
            </span>
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm">
              嵌入式
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
              已完成
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm">
              2024
            </span>
          </div>

          {/* 项目简介 */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              项目简介
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              本项目是一个基于FreeRTOS实时操作系统和FAT文件系统的串口数据存储系统。
              通过串口接收外部设备发送的数据，并利用FAT文件系统将数据持久化存储到SD卡或Flash存储器中。
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              项目采用FreeRTOS多任务管理机制，实现了数据接收、处理和存储的并行操作，
              确保系统的实时性和可靠性。适用于数据采集、日志记录、传感器数据存储等应用场景。
            </p>
          </div>

          {/* 技术特点 */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              技术特点
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span><strong>FreeRTOS多任务管理：</strong>采用实时操作系统，实现数据接收、处理和存储的并行操作</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span><strong>FAT文件系统：</strong>支持标准FAT32文件系统，方便数据管理和跨平台访问</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span><strong>串口通信：</strong>高效的串口数据接收机制，支持DMA传输和中断处理</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span><strong>数据缓冲机制：</strong>采用环形缓冲区，防止数据丢失，提高系统稳定性</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span><strong>可靠存储：</strong>支持SD卡和Flash存储，数据持久化保存</span>
              </li>
            </ul>
          </div>

          {/* 应用场景 */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              应用场景
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  数据采集系统
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  采集传感器数据并存储到SD卡，用于后续分析
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  日志记录
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  记录设备运行日志，方便故障排查和系统调试
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  GPS轨迹记录
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  存储GPS定位数据，记录设备移动轨迹
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  工业监控
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  实时记录工业设备的运行参数和状态信息
                </p>
              </div>
            </div>
          </div>

          {/* GitHub链接 */}
          <div className="card bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-2 border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white flex items-center">
                  <FiGithub className="mr-2" />
                  查看源代码
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  访问GitHub仓库查看完整代码和文档
                </p>
              </div>
              <a
                href="https://github.com/tcx101/MQTT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2 whitespace-nowrap"
              >
                <span>访问GitHub</span>
                <FiExternalLink />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
