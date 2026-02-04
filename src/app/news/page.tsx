import type { Metadata } from 'next'
import Link from 'next/link'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '新闻动态 - C315实验室',
  description: '了解C315实验室的最新动态和活动',
}

const newsItems = [
  {
    id: 1,
    title: '我院学子在第二十届全国大学生智能汽车竞赛全国总决赛中勇创佳绩',
    date: '2025-08-20',
    excerpt: '8月18日至20日，第二十届全国大学生智能汽车竞赛全国总决赛在杭州电子科技大学举行。学院4支代表队从全国3287支队伍中脱颖而出，最终斩获全国一等奖2项、全国二等奖2项，实现我院在该项赛事的历史性突破。在任鹏飞等老师的指导下，团队在平衡轮腿组和极速光电（龙芯）组荣获全国一等奖（国赛排名分别第14名和第18名），极速光电（NXP）组和双车跟随组获得全国二等奖（国赛排名分别第23名和第35名）。',
    category: '获奖',
    content: '详细内容...',
    link: 'http://dxgc.haue.edu.cn/info/1031/2961.htm',
  },
  {
    id: 2,
    title: '我院学子在2025年第十九届CIMC"西门子杯"中国智能制造挑战赛全国总决赛中勇获佳绩',
    date: '2025-08-19',
    excerpt: '2025年CIMC"西门子杯"中国智能制造挑战赛全国总决赛于2025年8月11日-15日在山西省太原市太原理工大学举行。经过三天半的激烈角逐与严格评审，我院代表队在工业嵌入式系统开发赛道荣获全国二等奖。由我校电气信息工程学院软件工程（智能物联）唐晨翔、张孟旭、雷颖同学组成的竞赛团队，在雷万忠老师指导下，迎难而上，通过精心备赛和顽强拼搏，最终斩获该赛道全国二等奖（总排名第65位），并取得河南省参赛队伍第4名的优异成绩。',
    category: '获奖',
    content: '详细内容...',
    link: 'http://dxgc.haue.edu.cn/info/1031/2957.htm',
  },
]

export default function NewsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          新闻动态
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          了解C315实验室的最新动态、活动和成就
        </p>

        <div className="max-w-4xl mx-auto space-y-6">
          {newsItems.map((news) => (
            <div key={news.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <FiCalendar className="text-gray-500" size={16} />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {news.date}
                  </span>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-xs">
                    {news.category}
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {news.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {news.excerpt}
              </p>
              
              {news.link ? (
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1 font-medium"
                >
                  <span>查看详情</span>
                  <FiArrowRight size={16} />
                </a>
              ) : (
                <Link
                  href={`/news/${news.id}`}
                  className="text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1 font-medium"
                >
                  <span>阅读全文</span>
                  <FiArrowRight size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
