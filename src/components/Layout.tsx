import React, { ReactNode, useEffect } from 'react'
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

  // 只在路由变化时滚动到顶部，语言切换时不滚动
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // 如果只是语言切换（路径相同），不滚动
      if (url === router.asPath) return
      window.scrollTo(0, 0)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const navItems = [
    { name: t('首页', 'Home'), href: '/' },
    { name: t('项目', 'Projects'), href: '#projects' },
    { name: t('生活', 'Life'), href: '/life' },
    { name: t('关于', 'About'), href: '#about' },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <nav className="shadow-sm border-b transition-colors duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold transition-colors text-gray-900 dark:text-white">
                Soren
              </h1>
            </div>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300"
                >
                  {item.name}
                </a>
              ))}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 dark:text-yellow-400 dark:hover:bg-gray-700"
                aria-label={t('切换主题', 'Toggle theme')}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 border border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-600"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
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










