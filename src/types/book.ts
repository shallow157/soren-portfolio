// 书籍数据类型定义
export interface Book {
  id: string
  title: string
  category: string
  coverUrl: string
  markdownPath: string
  tags: string[]
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  color: string
  description?: string
}

// 书籍分类
export interface BookCategory {
  name: string
  color: string
  position: {
    y: number // 书架层级位置
  }
}

// 读书笔记内容
export interface BookNote {
  content: string
  tags: string[]
}
