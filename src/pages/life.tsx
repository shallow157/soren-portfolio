import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { useLanguage } from '../contexts/LanguageContext'
import Link from 'next/link'

export default function Life() {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const allPosts = [
    {
      id: 1,
      title: t('关于技术成长的思考', 'Thoughts on Technical Growth'),
      excerpt: t(
        '在这个快速发展的技术世界中，如何保持持续学习的动力和方向？分享一些个人的思考和体会，探讨如何在技术浪潮中保持初心，持续精进自己的技能。',
        'In this rapidly evolving tech world, how do we maintain motivation and direction for continuous learning? Sharing some personal thoughts and experiences on staying true to our original aspirations while continuously improving our skills.'
      ),
      date: "2025-07-25",
      category: t('技术感悟', 'Tech Insights'),
      readTime: t('8 分钟', '8 min read'),
      tags: ['成长', '学习', '技术']
    },
    {
      id: 2,
      title: t('远程工作的得与失', 'The Gains and Losses of Remote Work'),
      excerpt: t(
        '疫情改变了我们的工作方式，远程工作成为新常态。这种变化带来了什么？从效率提升到人际关系的变化，从工作生活平衡到职业发展的影响，让我们深入探讨这个话题。',
        'The pandemic changed how we work, making remote work the new normal. What changes has this brought? From efficiency improvements to changes in interpersonal relationships, from work-life balance to career development impacts.'
      ),
      date: "2025-06-15",
      category: t('工作思考', 'Work Thoughts'),
      readTime: t('6 分钟', '6 min read'),
      tags: ['远程工作', '效率', '平衡']
    },
    {
      id: 3,
      title: t('AI 时代的程序员', 'Programmers in the AI Era'),
      excerpt: t(
        '人工智能的快速发展对程序员意味着什么？我们应该如何应对这个变化？是威胁还是机遇？让我们从多个角度来分析这个时代给程序员带来的挑战和机会。',
        'What does the rapid development of AI mean for programmers? How should we respond to this change? Is it a threat or an opportunity? Let us analyze the challenges and opportunities this era brings to programmers from multiple perspectives.'
      ),
      date: "2025-03-21",
      category: t('社会热点', 'Social Trends'),
      readTime: t('10 分钟', '10 min read'),
      tags: ['AI', '程序员', '未来']
    }
  ]

  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const getCategoryColor = (category: string) => {
    if (category === t('技术感悟', 'Tech Insights')) {
      return 'from-green-500 to-emerald-500'
    } else if (category === t('工作思考', 'Work Thoughts')) {
      return 'from-purple-500 to-violet-500'
    } else {
      return 'from-blue-500 to-cyan-500'
    }
  }

  const getCategoryBg = (category: string) => {
    if (category === t('技术感悟', 'Tech Insights')) {
      return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    } else if (category === t('工作思考', 'Work Thoughts')) {
      return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
    } else {
      return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full opacity-20 blur-3xl"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-200 to-orange-200 dark:from-pink-800 dark:to-orange-800 rounded-full opacity-20 blur-3xl"
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 20, -20, 0],
              scale: [0.8, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {t('生活感悟', 'Life Insights')}
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {t(
                '记录思考与成长的点点滴滴，分享对技术、工作和生活的感悟。每一篇文章都是一次心灵的对话，每一个想法都值得被珍藏。',
                'Recording thoughts and growth, sharing insights about technology, work and life. Every article is a dialogue with the soul, every thought deserves to be treasured.'
              )}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* 文章列表 - 纵向排列 */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
        >
          {currentPosts.map((post, index) => (
            <motion.article 
              key={post.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
            >
              {/* 左侧装饰条 */}
              <motion.div 
                className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${getCategoryColor(post.category)}`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              />
              
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-transparent dark:from-gray-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-8 pl-12 relative z-10">
                <motion.div 
                  className="flex flex-wrap items-center gap-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <motion.span 
                    className={`px-3 py-1 text-sm rounded-full font-medium ${getCategoryBg(post.category)}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {post.category}
                  </motion.span>
                  <motion.span 
                    className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span 
                      className="mr-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      📅
                    </motion.span>
                    {post.date}
                  </motion.span>
                  <motion.span 
                    className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span 
                      className="mr-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      ⏱️
                    </motion.span>
                    {post.readTime}
                  </motion.span>
                </motion.div>
                
                <Link href={`/life/${post.id}`}>
                  <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ x: 8 }}
                  >
                    {post.title}
                  </motion.h2>
                </Link>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {post.excerpt}
                </motion.p>
                
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {post.tags?.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium"
                        variants={{
                          hidden: { opacity: 0, scale: 0 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <Link href={`/life/${post.id}`}>
                    <motion.div 
                      className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:translate-x-2 transition-transform duration-300"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t('阅读全文', 'Read More')}
                      <motion.svg 
                        className="w-5 h-5 ml-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 分页 */}
        {totalPages > 1 && (
          <motion.div 
            className="flex items-center justify-center mt-16 space-x-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg hover:shadow-xl'
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.05, y: -2 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg hover:shadow-xl'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: page * 0.1 }}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg hover:shadow-xl'
              }`}
              whileHover={currentPage !== totalPages ? { scale: 1.05, y: -2 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  )
}





