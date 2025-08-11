import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@/contexts/ThemeContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const router = useRouter()

  // 导航项配置
  const navItems = [
    { name: t('首页', 'Home'), href: '/' },
    { name: t('项目', 'Projects'), href: '/projects' },
    { name: t('生活', 'Life'), href: '/life' },
    { name: t('关于', 'About'), href: '#about' },
  ]

  // 完全移除滚动相关的 useEffect
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold transition-colors text-gray-900 dark:text-white">
                Soren
              </h1>
            </div>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300"
                >
                  {item.name}
                </a>
              ))}

              {/* 主题切换按钮 */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-yellow-400 dark:hover:bg-gray-700"
                aria-label={t('切换主题', 'Toggle theme')}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* 语言切换按钮 */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 border border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-600"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>

            {/* 移动端导航 - 核心内容导航 */}
            <div className="md:hidden flex items-center space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm px-2 py-2 rounded transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {item.name}
                </a>
              ))}


            </div>
          </div>
        </div>
      </nav>
      
      <main className="text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  )
}












