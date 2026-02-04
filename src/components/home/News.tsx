'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'

const newsItems = [
  {
    id: 1,
    title: '我院学子在第二十届全国大学生智能汽车竞赛全国总决赛中勇创佳绩',
    date: '2025-08-20',
    excerpt: '学院4支代表队从全国3287支队伍中脱颖而出，斩获全国一等奖2项、全国二等奖2项，实现历史性突破...',
    category: '获奖',
    link: 'http://dxgc.haue.edu.cn/info/1031/2961.htm',
  },
  {
    id: 2,
    title: '我院学子在2025年第十九届CIMC"西门子杯"中国智能制造挑战赛全国总决赛中勇获佳绩',
    date: '2025-08-19',
    excerpt: '我校电气信息工程学院学子在工业嵌入式系统开发赛道荣获全国二等奖，取得河南省参赛队伍第4名的优异成绩...',
    category: '获奖',
    link: 'http://dxgc.haue.edu.cn/info/1031/2957.htm',
  },
]

export default function News() {
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
          <h2 className="section-title">新闻动态</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <FiCalendar size={16} />
                  <span>{news.date}</span>
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-xs">
                    {news.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {news.excerpt}
                </p>
                {news.link ? (
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1"
                  >
                    <span>查看详情</span>
                    <FiArrowRight size={16} />
                  </a>
                ) : (
                  <Link
                    href={`/news/${news.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1"
                  >
                    <span>阅读更多</span>
                    <FiArrowRight size={16} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/news" className="btn-primary">
              查看所有新闻
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
