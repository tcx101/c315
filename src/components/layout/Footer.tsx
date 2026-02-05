import Link from 'next/link'
import { FiGithub, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaWeixin, FaQq } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">关于我们</h3>
            <p className="text-sm leading-relaxed">
              C315实验室重组于2025年，专注于电子信息领域发展，涵盖嵌入式、PCB、电力电子、机器视觉等方向。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary-400 transition-colors">
                  团队成员
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary-400 transition-colors">
                  项目展示
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-primary-400 transition-colors">
                  加入我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FiMail className="text-primary-400" />
                <span className="text-sm">1902296058@qq.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMapPin className="text-primary-400" />
                <span className="text-sm">河南工程学院3号实验楼c区c315</span>
              </li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaWeixin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaQq size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} C315实验室. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
