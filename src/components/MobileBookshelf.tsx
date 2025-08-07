import { useState, useEffect } from 'react'
import { useBookStore } from '@/store/bookStore'
import { useTheme } from '@/contexts/ThemeContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// 移动端书架组件 - 内嵌美化模态框
export default function MobileBookshelf() {
  const { books, categories } = useBookStore()
  const { theme } = useTheme()

  // 本地状态管理
  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])

  // 提取标签和主要内容的函数
  const extractTagsAndContent = (text: string) => {
    const lines = text.split('\n')
    const extractedTags: string[] = []
    const contentLines: string[] = []

    for (const line of lines) {
      // 匹配 #标签 格式
      const tagMatches = line.match(/#(\w+)/g)
      if (tagMatches) {
        tagMatches.forEach(tag => {
          const cleanTag = tag.substring(1) // 移除 # 号
          if (!extractedTags.includes(cleanTag)) {
            extractedTags.push(cleanTag)
          }
        })
        // 移除标签行，只保留内容
        const lineWithoutTags = line.replace(/#\w+/g, '').trim()
        if (lineWithoutTags) {
          contentLines.push(lineWithoutTags)
        }
      } else {
        contentLines.push(line)
      }
    }

    return {
      tags: extractedTags,
      content: contentLines.join('\n').trim()
    }
  }

  // 打开模态框函数
  const openModal = async (book: any) => {
    setSelectedBook(book)
    setShowModal(true)
    setContent('正在加载读书笔记...')
    setTags([])

    try {
      const response = await fetch(book.markdownPath)
      const text = await response.text()
      const { tags: extractedTags, content: mainContent } = extractTagsAndContent(text)
      setTags(extractedTags)
      setContent(mainContent)
    } catch (error) {
      setContent('加载失败，请稍后重试。')
    }
  }

  // 按分类分组书籍
  const booksByCategory = categories.map(category => ({
    ...category,
    books: books.filter(book => book.category === category.name)
  }))

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 md:hidden">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📚 我的书架
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            记录阅读足迹，分享读书心得
          </p>
          {/* 调试信息 */}
          <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded text-sm">
            📱 移动端书架组件已加载 - 书籍数量: {books.length}
          </div>
        </div>

        {/* 书籍分类网格 */}
        <div className="space-y-12">
          {booksByCategory.map((category) => (
            <div key={category.name}>
              {/* 分类标题 */}
              <div className="flex items-center mb-6">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>

              {/* 移动端书籍网格 - 2列布局 */}
              <div className="grid grid-cols-2 gap-4">
                {category.books.map((book) => (
                  <div
                    key={book.id}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onClick={() => openModal(book)}
                  >
                    {/* 书籍封面 */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 书籍信息 */}
                    <div className="p-3 text-center">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                        {book.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {book.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            📖 点击书籍查看完整读书笔记
          </p>
        </div>
      </div>

      {/* 美化的移动端读书笔记模态框 */}
      {showModal && selectedBook && (
        <div
          className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 ${
            theme === 'dark' ? 'bg-black/80' : 'bg-black/60'
          }`}
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className={`w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部区域 */}
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-start space-x-4">
                {/* 书籍封面 */}
                <div className="flex-shrink-0">
                  <img
                    src={selectedBook.coverUrl}
                    alt={selectedBook.title}
                    className="w-16 h-20 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* 书籍信息 */}
                <div className="flex-1 min-w-0">
                  <h2 className={`text-lg font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    📖 {selectedBook.title}
                  </h2>

                  {/* 标签区域 */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            theme === 'dark'
                              ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 关闭按钮 */}
                <button
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setShowModal(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className={`prose prose-sm max-w-none ${
                theme === 'dark' ? 'prose-invert' : 'prose-gray'
              }`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className={`text-lg font-bold mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className={`text-base font-semibold mb-2 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className={`text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className={`text-sm leading-relaxed mb-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className={`border-l-4 pl-4 italic my-4 text-sm ${
                        theme === 'dark'
                          ? 'border-blue-500 text-gray-400 bg-gray-900/50'
                          : 'border-blue-500 text-gray-600 bg-blue-50'
                      } rounded-r-lg py-2`}>
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 my-3 text-sm">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1 my-3 text-sm">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      } text-sm`}>
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {children}
                      </strong>
                    ),
                    code: ({ children }) => (
                      <code className={`px-2 py-1 rounded text-xs font-mono ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {children}
                      </code>
                    )
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
