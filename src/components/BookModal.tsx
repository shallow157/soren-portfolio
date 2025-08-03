import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useBookStore } from '@/store/bookStore'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

export default function BookModal() {
  const { selectedBook, isModalOpen, closeBookModal } = useBookStore()
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(false)

  // 滚动相关的refs和状态
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: contentRef })

  // 根据滚动位置计算封面区域的transform
  const headerY = useTransform(scrollY, [0, 200], [0, -100])
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0])
  const headerScale = useTransform(scrollY, [0, 200], [1, 0.8])

  // 加载Markdown内容
  useEffect(() => {
    if (selectedBook && isModalOpen) {
      setLoading(true)
      fetch(selectedBook.markdownPath)
        .then(response => response.text())
        .then(content => {
          setMarkdownContent(content)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error loading markdown:', error)
          setMarkdownContent('加载失败，请稍后重试。')
          setLoading(false)
        })
    }
  }, [selectedBook, isModalOpen])

  // 解析标签（从markdown第一行提取）
  const extractTags = (content: string) => {
    const firstLine = content.split('\n')[0]
    const tagMatch = firstLine.match(/#([^#\n]+)/g)
    return tagMatch ? tagMatch.map(tag => tag.replace('#', '').trim()) : []
  }

  // 获取正文内容（去除第一行标签）
  const getMainContent = (content: string) => {
    const lines = content.split('\n')
    return lines.slice(1).join('\n').trim()
  }

  if (!selectedBook) return null

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 背景遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookModal}
          />

          {/* 模态框内容 */}
          <motion.div
            className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* 关闭按钮 */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
              onClick={closeBookModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* 移动端：单列滚动布局 */}
            <div className="flex flex-col flex-1 min-h-0 md:hidden">
              <div
                ref={contentRef}
                className="flex-1 overflow-y-auto"
              >
                {/* 移动端封面和介绍区域 - 可以随滚动移动 */}
                <motion.div
                  className="relative"
                  style={{
                    y: headerY,
                    opacity: headerOpacity,
                    scale: headerScale
                  }}
                >
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="relative mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Image
                          src={selectedBook.coverUrl}
                          alt={selectedBook.title}
                          width={120}
                          height={180}
                          className="rounded-lg shadow-lg"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {selectedBook.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {selectedBook.author}
                        </p>
                        <div className="flex items-center justify-center mb-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                            {selectedBook.category}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                          {selectedBook.description}
                        </p>

                        {/* 滑动提示 */}
                        <motion.div
                          className="flex items-center justify-center text-gray-400 dark:text-gray-500"
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
                          </svg>
                          <span className="text-xs">向上滑动查看笔记</span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* 移动端笔记内容区域 */}
                <div className="p-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : markdownContent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdownContent}
                      </ReactMarkdown>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">暂无读书笔记</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 桌面端：保持原有的左右布局 */}
            <div className="hidden md:flex md:flex-row flex-1 min-h-0">
              {/* 左侧：书籍封面和信息 */}
              <motion.div 
                className="md:w-1/3 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center">
                  {/* 书籍封面 */}
                  <motion.div
                    className="relative w-48 h-64 mx-auto mb-4 rounded-lg overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={selectedBook.coverUrl}
                      alt={selectedBook.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </motion.div>

                  {/* 书籍标题 */}
                  <motion.h2 
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedBook.title}
                  </motion.h2>

                  {/* 分类标签 */}
                  <motion.span
                    className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    {selectedBook.category}
                  </motion.span>

                  {/* 标签列表 */}
                  {markdownContent && (
                    <motion.div 
                      className="flex flex-wrap gap-2 justify-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {extractTags(markdownContent).map((tag, index) => (
                        <motion.span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* 右侧：读书笔记内容 */}
              <motion.div
                className="md:w-2/3 flex flex-col min-h-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-6 overflow-y-auto flex-1">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <motion.div
                      className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <motion.div
                    className="prose prose-gray dark:prose-invert max-w-none"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                            {children}
                          </code>
                        )
                      }}
                    >
                      {getMainContent(markdownContent)}
                    </ReactMarkdown>
                  </motion.div>
                )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 辅助函数：从markdown内容中提取标签
function extractTags(content: string): string[] {
  const tagRegex = /#(\w+)/g
  const matches = content.match(tagRegex)
  return matches ? matches.map(tag => tag.slice(1)).slice(0, 5) : []
}

// 辅助函数：获取主要内容（去除标题等）
function getMainContent(content: string): string {
  // 简单处理，返回原内容
  return content
}
