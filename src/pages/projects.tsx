import Layout from '../components/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Projects() {
  const { t } = useLanguage()

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const projects = [
    {
      id: 1,
      title: t('酒店预订取消率分析', 'Hotel Booking Cancellation Analysis'),
      description: t(
        '基于Kaggle酒店预订数据集，深入分析酒店预订业务特征和取消率影响因素。通过数据清洗、探索性分析和特征工程，构建XGBoost机器学习预测模型，准确率达到87%。结合SQL数据库设计和PowerBI可视化仪表板，为酒店管理层提供数据驱动的业务优化策略。',
        'Deep analysis of hotel booking patterns using Kaggle dataset. Built XGBoost prediction model with 87% accuracy through data cleaning, EDA and feature engineering. Combined with SQL database design and PowerBI dashboard to provide data-driven optimization strategies.'
      ),
      tech: ['Python', 'XGBoost', 'Pandas', 'Matplotlib', 'SQL', 'PowerBI'],
      github: 'https://github.com/shallow157/data_analysis_hotel_booking',
      highlights: [
        t('处理119,390条预订记录，32个特征变量', 'Processed 119,390 booking records with 32 features'),
        t('XGBoost模型准确率达到87%', 'XGBoost model achieved 87% accuracy'),
        t('识别出影响取消率的关键因素', 'Identified key factors affecting cancellation rates'),
        t('设计完整的数据库架构和BI仪表板', 'Designed complete database architecture and BI dashboard')
      ],
      category: t('机器学习', 'Machine Learning'),
      gradient: 'from-blue-500 to-purple-600',
      icon: '🏨'
    },
    {
      id: 2,
      title: t('淘宝用户行为数据分析', 'Taobao User Behavior Analysis'),
      description: t(
        '基于淘宝用户行为数据集，运用数据挖掘技术深入分析用户购买模式、行为路径和消费偏好。通过RFM模型进行用户分群，识别高价值客户群体，并构建用户画像体系。结合Tableau可视化工具，为电商平台提供精准营销策略和用户运营建议。',
        'Deep analysis of user behavior patterns using Taobao dataset. Applied data mining techniques to analyze purchase patterns, behavior paths and consumption preferences. Used RFM model for user segmentation and built user persona system. Combined with Tableau visualization for precise marketing strategies.'
      ),
      tech: ['MySQL', 'Tableau', 'Python', 'RFM模型', '数据挖掘', '用户画像'],
      github: 'https://github.com/shallow157/taobao_user_behavior_analysis',
      highlights: [
        t('处理1亿条用户行为数据', 'Processed 100M user behavior records'),
        t('构建完整的用户行为分析框架', 'Built comprehensive user behavior analysis framework'),
        t('RFM模型实现精准用户分群', 'RFM model for precise user segmentation'),
        t('Tableau可视化仪表板展示核心指标', 'Tableau dashboard displaying key metrics')
      ],
      category: t('数据挖掘', 'Data Mining'),
      gradient: 'from-green-500 to-teal-600',
      icon: '🛒'
    },
    {
      id: 3,
      title: t('《红海行动》豆瓣评论情感分析', 'Red Sea Action Movie Review Sentiment Analysis'),
      description: t(
        '运用Python网络爬虫技术获取豆瓣电影评论数据，结合自然语言处理和情感分析算法，深入挖掘观众对电影的真实评价和情感倾向。通过词频分析、情感极性判断和地域分布统计，全面解析电影口碑传播规律和观众反馈特征。',
        'Used Python web scraping to collect Douban movie reviews, combined with NLP and sentiment analysis algorithms to deeply analyze audience real evaluations and emotional tendencies. Through word frequency analysis, sentiment polarity judgment and regional distribution statistics.'
      ),
      tech: ['Python', 'Selenium', 'BeautifulSoup', 'Jieba', 'WordCloud', 'Matplotlib', 'Pandas'],
      github: 'https://github.com/shallow157/Red_Sea_Action_Analysis',
      highlights: [
        t('爬取数千条豆瓣电影评论数据', 'Scraped thousands of Douban movie reviews'),
        t('实现中文文本情感分析', 'Implemented Chinese text sentiment analysis'),
        t('词云可视化展示高频词汇', 'Word cloud visualization of high-frequency terms'),
        t('地域分布和评分趋势分析', 'Regional distribution and rating trend analysis')
      ],
      category: t('文本分析', 'Text Analysis'),
      gradient: 'from-red-500 to-orange-600',
      icon: '🎬'
    },
    {
      id: 4,
      title: t('四川省CPI时间序列分析', 'Sichuan Province CPI Time Series Analysis'),
      description: t(
        '基于四川省20年月度CPI数据，运用时间序列分析方法研究通胀变化规律。通过ARMA模型拟合CPI时间序列特征，运用VAR模型分析CPI与货币供应量M2的动态关系，并进行格兰杰因果检验和脉冲响应分析，为宏观经济政策制定提供实证支持。',
        'Based on 20 years of monthly CPI data from Sichuan Province, used time series analysis methods to study inflation patterns. Applied ARMA model to fit CPI characteristics, used VAR model to analyze dynamic relationship between CPI and M2, conducted Granger causality test and impulse response analysis.'
      ),
      tech: ['SAS', 'Python', 'ARMA模型', 'VAR模型', '格兰杰因果检验', '脉冲响应分析'],
      github: 'https://github.com/shallow157/sichuan_cpi_analysis',
      highlights: [
        t('20年月度经济数据分析', '20 years of monthly economic data analysis'),
        t('ARMA(2,1)模型拟合CPI时间序列', 'ARMA(2,1) model fitting CPI time series'),
        t('VAR模型揭示CPI与M2动态关系', 'VAR model revealing CPI-M2 dynamics'),
        t('格兰杰因果检验验证货币政策传导', 'Granger causality test validating policy transmission')
      ],
      category: t('时间序列', 'Time Series'),
      gradient: 'from-indigo-500 to-purple-600',
      icon: '📈'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
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
                  background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #10B981, #3B82F6)",
                  backgroundSize: "400% 400%",
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
                {t('项目作品集', 'Project Portfolio')}
              </motion.span>
            </motion.h1>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {t('数据分析与商业智能项目的完整展示，涵盖机器学习、数据挖掘、文本分析和时间序列分析等领域', 'Complete showcase of data analysis and business intelligence projects, covering machine learning, data mining, text analysis and time series analysis')}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* 项目列表 */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="space-y-16"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 relative group"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="md:flex">
                {/* 项目图标和类别 */}
                <motion.div 
                  className={`md:w-1/3 bg-gradient-to-r ${project.gradient} flex items-center justify-center p-12 relative overflow-hidden`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* 装饰圆圈 */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="text-center text-white relative z-10">
                    <motion.div 
                      className="text-7xl mb-6"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {project.icon}
                    </motion.div>
                    <motion.div 
                      className="text-xl font-bold tracking-wide"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    >
                      {project.category}
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* 项目详情 */}
                <div className="md:w-2/3 p-10 relative z-10">
                  <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    {project.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* 技术栈 */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <motion.span 
                        className="mr-2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        ⚡
                      </motion.span>
                      {t('技术栈', 'Tech Stack')}
                    </h3>
                    <motion.div 
                      className="flex flex-wrap gap-3"
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
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium shadow-md"
                          variants={{
                            hidden: { opacity: 0, scale: 0, y: 20 },
                            visible: { opacity: 1, scale: 1, y: 0 }
                          }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -4,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* 项目亮点 */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <motion.span 
                        className="mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✨
                      </motion.span>
                      {t('项目亮点', 'Key Highlights')}
                    </h3>
                    <motion.ul 
                      className="space-y-3"
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
                      {project.highlights.map((highlight, highlightIndex) => (
                        <motion.li 
                          key={highlightIndex} 
                          className="flex items-start text-gray-600 dark:text-gray-300"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          whileHover={{ x: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.span 
                            className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2.5 mr-4 flex-shrink-0"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: highlightIndex * 0.3
                            }}
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                  
                  {/* 项目链接 */}
                  <motion.div 
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                  >
                    <motion.a 
                      href={`/reports/${project.id}`}
                      className={`bg-gradient-to-r ${project.gradient} hover:shadow-2xl text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg font-medium`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('查看项目', 'View Project')}
                    </motion.a>
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Layout>
  )
}


