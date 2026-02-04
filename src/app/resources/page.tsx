'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiVideo, 
  FiImage, 
  FiFileText, 
  FiLink, 
  FiSearch, 
  FiFilter,
  FiEye,
  FiHeart,
  FiDownload,
  FiExternalLink,
  FiUser
} from 'react-icons/fi'
import { resourcesApi } from '@/lib/api'
import type { Resource, ResourceType, ResourceCategory } from '@/types/resource'

// 真实资源数据
const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'STM32入门教程-2023版 细致讲解 中文字幕',
    description: '2023年最新版STM32入门教程，从零开始系统学习STM32单片机开发。课程内容包括开发环境搭建、GPIO控制、定时器、中断、串口通信、ADC/DAC、DMA等核心知识点。讲解细致，配有中文字幕，非常适合初学者入门学习。',
    type: 'video',
    category: '嵌入式开发',
    url: 'https://www.bilibili.com/video/BV1th411z7sn',
    thumbnailUrl: 'https://i0.hdslb.com/bfs/archive/d4a5b0d5c5e5f5e5f5e5f5e5f5e5f5e5f5e5f5e5.jpg',
    tags: ['STM32', '单片机', '入门教程', '2023版', '中文字幕', '嵌入式'],
    contributor: {
      name: 'C315实验室',
    },
    createdAt: '2025-02-04',
    views: 0,
    likes: 0
  },
  {
    id: '2',
    title: 'STM32入门教程 - 安装开发环境（优化重制）',
    description: 'STM32 HAL库开发环境搭建教程，优化重制版。详细讲解如何安装和配置STM32开发环境，包括Keil MDK、STM32CubeMX、驱动安装等步骤。适合零基础学习者，手把手教你搭建完整的STM32 HAL库开发环境。',
    type: 'video',
    category: '嵌入式开发',
    url: 'https://www.bilibili.com/video/BV1AsZGYtEA2',
    thumbnailUrl: 'https://i0.hdslb.com/bfs/archive/stm32-hal-setup.jpg',
    tags: ['STM32', 'HAL库', '开发环境', 'Keil', 'CubeMX', '环境搭建'],
    contributor: {
      name: 'C315实验室',
    },
    createdAt: '2025-02-04',
    views: 0,
    likes: 0
  }
]

const categories: ResourceCategory[] = [
  '嵌入式开发',
  'PCB设计',
  '电源电子',
  '机器视觉',
  '编程语言',
  '工具软件',
  '项目案例',
  '其他'
]

const resourceTypes: { type: ResourceType; label: string; icon: any }[] = [
  { type: 'video', label: '视频', icon: FiVideo },
  { type: 'image', label: '图片', icon: FiImage },
  { type: 'document', label: '文档', icon: FiFileText },
  { type: 'link', label: '链接', icon: FiLink },
  { type: 'article', label: '文章', icon: FiFileText }
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all')
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // 从 Supabase 获取资源数据
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourcesApi.getAll()
        setResources(data)
      } catch (error) {
        console.error('Failed to fetch resources:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResources()
  }, [])

  // 筛选资源
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: ResourceType) => {
    const typeInfo = resourceTypes.find(t => t.type === type)
    return typeInfo ? typeInfo.icon : FiFileText
  }

  const getTypeColor = (type: ResourceType) => {
    const colors = {
      video: 'text-red-600 bg-red-50 dark:bg-red-900/20',
      image: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      document: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      link: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      article: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    }
    return colors[type] || colors.document
  }

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载资源中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            开源资料库
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            汇聚实验室成员的知识与经验，共建共享技术资源
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索资源标题、描述或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* 筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2 justify-center"
            >
              <FiFilter size={20} />
              筛选
            </button>
          </div>

          {/* 筛选选项 */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card mb-4"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* 分类筛选 */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    资源分类
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | 'all')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">全部分类</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* 类型筛选 */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    资源类型
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as ResourceType | 'all')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">全部类型</option>
                    {resourceTypes.map(({ type, label }) => (
                      <option key={type} value={type}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* 结果统计 */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            找到 <span className="font-bold text-primary-600">{filteredResources.length}</span> 个资源
          </div>
        </div>

        {/* 资源列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type)
            
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* 缩略图或图标 */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg mb-4 overflow-hidden">
                  {resource.thumbnailUrl ? (
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <TypeIcon size={64} className="text-primary-600 opacity-50" />
                    </div>
                  )}
                  
                  {/* 类型标签 */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getTypeColor(resource.type)}`}>
                    <TypeIcon size={14} />
                    {resourceTypes.find(t => t.type === resource.type)?.label}
                  </div>
                </div>

                {/* 资源信息 */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* 分类 */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                      {resource.category}
                    </span>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 贡献者 */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {resource.contributor.avatar ? (
                      <img
                        src={resource.contributor.avatar}
                        alt={resource.contributor.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <FiUser className="w-6 h-6 p-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    )}
                    <span>{resource.contributor.name}</span>
                    <span className="text-gray-400">·</span>
                    <span>{resource.createdAt}</span>
                  </div>

                  {/* 统计信息 */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FiEye size={16} />
                      {resource.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiHeart size={16} />
                      {resource.likes}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                    >
                      <FiExternalLink size={16} />
                      查看资源
                    </a>
                    {resource.type === 'document' && (
                      <button className="btn-secondary px-4">
                        <FiDownload size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 空状态 */}
        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              没有找到相关资源
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              试试调整搜索条件或筛选选项
            </p>
          </div>
        )}

        {/* 贡献提示 */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-2 border-primary-200 dark:border-primary-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              💡 想要贡献资源？
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              如果你有优质的学习资料、项目经验或技术文档，欢迎分享到资料库！
            </p>
            <a href="/contact" className="btn-primary inline-block">
              联系我们提交资源
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
