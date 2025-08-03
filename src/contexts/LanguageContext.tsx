import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (zh: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('zh')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 从路由获取当前语言
    const currentLanguage = (router.locale as Language) || 'zh'
    setLanguage(currentLanguage)
  }, [router.locale])

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh'
    setLanguage(newLanguage)
    // 使用 push 方法切换语言
    router.push(router.asPath, router.asPath, { 
      locale: newLanguage,
      scroll: false
    })
  }

  const t = (zh: string, en: string) => {
    return language === 'zh' ? zh : en
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'zh', toggleLanguage: () => {}, t: (zh, en) => zh }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
