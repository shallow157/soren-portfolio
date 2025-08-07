import { useState, useEffect } from 'react'
import { useBookStore } from '@/store/bookStore'

// 移动端书架组件 - 内嵌简单模态框
export default function MobileBookshelf() {
  const { books, categories } = useBookStore()

  // 简单的本地状态管理
  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [content, setContent] = useState('')

  // 简单的打开模态框函数
  const openModal = async (book: any) => {
    setSelectedBook(book)
    setShowModal(true)
    setContent('正在加载...')

    try {
      const response = await fetch(book.markdownPath)
      const text = await response.text()
      setContent(text)
    } catch (error) {
      setContent('加载失败')
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

      {/* 简单的移动端模态框 */}
      {showModal && selectedBook && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 10000,
            padding: '20px',
            overflow: 'auto'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '100%',
              margin: '0 auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img
                src={selectedBook.coverUrl}
                alt={selectedBook.title}
                style={{ width: '60px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
              />
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                  {selectedBook.title}
                </h2>
                <button
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowModal(false)}
                >
                  关闭
                </button>
              </div>
            </div>

            <div style={{
              maxHeight: '400px',
              overflow: 'auto',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '5px',
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}>
              {content}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
