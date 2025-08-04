import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookStore } from '@/store/bookStore'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

export default function BookModal() {
  const { selectedBook, isModalOpen, closeBookModal } = useBookStore()
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(false)

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
            className="relative w-full max-w-5xl max-h-[95vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
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

            <div className="flex flex-col md:flex-row flex-1 min-h-0">
              {/* 左侧：书籍封面和信息 */}
              <motion.div
                className="md:w-1/3 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex-shrink-0"
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
                className="md:w-2/3 flex flex-col min-h-0 flex-1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* 内容标题区域 */}
                <div className="p-6 pb-0 flex-shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedBook.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      读书笔记
                    </p>
                    <motion.div
                      className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      滚动查看更多
                    </motion.div>
                  </div>
                </div>

                {/* 可滚动的内容区域 */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
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
