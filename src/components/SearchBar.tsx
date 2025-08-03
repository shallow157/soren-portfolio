import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || t('搜索项目、技能或文章...', 'Search projects, skills or articles...')}
          className={`w-full px-4 py-3 pl-12 pr-4 rounded-full border-2 transition-all duration-300 
            ${isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
              : 'border-gray-300 dark:border-gray-600'
            } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:outline-none focus:ring-0`}
          whileFocus={{ scale: 1.02 }}
        />
        
        {/* 搜索图标 */}
        <motion.div
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300
            ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}
          animate={{ scale: isFocused ? 1.1 : 1 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>

        {/* 清除按钮 */}
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 搜索建议 */}
      <AnimatePresence>
        {isFocused && query.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('按 Enter 搜索', 'Press Enter to search')} "{query}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}
