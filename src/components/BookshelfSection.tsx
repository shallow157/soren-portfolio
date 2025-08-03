import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import BookModal from './BookModal'
import BookGrid from './BookGrid'

// 动态导入3D组件，避免SSR问题
const BookShelf = dynamic(() => import('./3d/BookShelf'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
})

export default function BookshelfSection() {
  const { t } = useLanguage()
  const [is3DView, setIs3DView] = useState(false) // 默认使用2D视图

  return (
    <>
      {/* 3D书架部分 */}
      <motion.section
        data-bookshelf
        className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 dark:bg-amber-800 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 标题部分 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t('我的书架', 'My Bookshelf')}
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('点击书籍查看读书笔记', 'Click on books to view reading notes')}
            </motion.p>

            {/* 视图切换按钮 */}
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  !is3DView
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setIs3DView(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📚 {t('网格视图', 'Grid View')}
              </motion.button>
              <motion.button
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  is3DView
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setIs3DView(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏛️ {t('3D书架', '3D Shelf')}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 书架内容 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {is3DView ? <BookShelf /> : <BookGrid />}
          </motion.div>

          {/* 使用说明 */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl mb-3">{is3DView ? '🖱️' : '📱'}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {is3DView
                    ? t('鼠标交互', 'Mouse Interaction')
                    : t('响应式设计', 'Responsive Design')
                  }
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {is3DView
                    ? t('拖拽旋转视角，滚轮缩放', 'Drag to rotate, scroll to zoom')
                    : t('适配各种屏幕尺寸', 'Adapts to all screen sizes')
                  }
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('分类浏览', 'Browse by Category')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('按文学、技术、成长分类展示', 'Organized by literature, tech, and growth')}
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl mb-3">📖</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('点击阅读', 'Click to Read')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('点击书籍查看详细笔记', 'Click books to view detailed notes')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 书籍模态框 */}
      <BookModal />
    </>
  )
}
