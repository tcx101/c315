// 资源类型定义
export type ResourceType = 'video' | 'image' | 'document' | 'link' | 'article'

export type ResourceCategory = 
  | '嵌入式开发'
  | 'PCB设计'
  | '电源电子'
  | '机器视觉'
  | '编程语言'
  | '工具软件'
  | '项目案例'
  | '其他'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  category: ResourceCategory
  url: string
  thumbnailUrl?: string
  tags: string[]
  contributor: {
    name: string
    avatar?: string
  }
  createdAt: string
  views: number
  likes: number
}

export interface ResourceFilter {
  type?: ResourceType
  category?: ResourceCategory
  searchQuery?: string
  tags?: string[]
}
