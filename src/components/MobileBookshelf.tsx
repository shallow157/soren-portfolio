import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBookStore } from '@/store/bookStore'

// 移动端书架组件 - 基于BookGrid但适配移动端
export default function MobileBookshelf() {
  const { t } = useLanguage()
  const { books, categories, openBookModal } = useBookStore()

  // 按分类分组书籍
  const booksByCategory = categories.map(category => ({
    ...category,
    books: books.filter(book => book.category === category.name)
  }))

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 block md:hidden">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📚 我的书架
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            记录阅读足迹，分享读书心得
          </p>
        </motion.div>

        {/* 书籍分类网格 */}
        <div className="space-y-12">
          {booksByCategory.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              {/* 分类标题 */}
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.1 }}
              >
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </motion.div>

              {/* 移动端书籍网格 - 2列布局 */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {category.books.map((book, bookIndex) => (
                  <motion.div
                    key={book.id}
                    className="group cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: 30, scale: 0.9 },
                      animate: { opacity: 1, y: 0, scale: 1 }
                    }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      console.log('移动端书架点击:', book.title);
                      openBookModal(book);
                    }}
                  >
                    {/* 书籍封面 */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      
                      {/* 悬浮时的遮罩 */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          className="bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-white"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {t('点击阅读', 'Click to Read')}
                        </motion.div>
                      </div>
                    </div>

                    {/* 书籍信息 */}
                    <motion.div 
                      className="mt-3 text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: bookIndex * 0.1 + 0.3 }}
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
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
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            📖 {t('点击书籍查看完整读书笔记', 'Click books to view complete reading notes')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
