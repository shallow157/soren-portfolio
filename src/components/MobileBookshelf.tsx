import { useBookStore } from '@/store/bookStore'

// 移动端书架组件 - 基于BookGrid但适配移动端
export default function MobileBookshelf() {
  const { books, categories, openBookModal } = useBookStore()

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
                    onClick={() => {
                      console.log('移动端书架点击:', book.title);
                      alert(`点击了书籍: ${book.title}`);
                      openBookModal(book);
                    }}
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
    </section>
  )
}
