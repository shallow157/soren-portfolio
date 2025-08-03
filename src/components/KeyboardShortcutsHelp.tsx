import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface Shortcut {
  key: string
  description: string
  combo?: string[]
}

const shortcuts: Shortcut[] = [
  { key: '/', description: '聚焦搜索框' },
  { key: 'Esc', description: '取消聚焦/关闭弹窗' },
  { key: 'Home', description: '回到顶部' },
  { key: 'End', description: '滚动到底部' },
  { key: 'H', description: '显示快捷键帮助' },
  { key: '1', description: '跳转到项目' },
  { key: '2', description: '跳转到技能' },
  { key: '3', description: '跳转到书架' },
  { combo: ['Ctrl', 'K'], description: '快速搜索' }
]

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  // 监听ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        console.log('ESC键关闭快捷键帮助')
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown, true) // 使用捕获阶段
      return () => document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen])

  return (
    <>
      {/* 触发按钮 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={t('键盘快捷键', 'Keyboard Shortcuts')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </motion.button>

      {/* 快捷键帮助弹窗 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 背景遮罩 */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 弹窗内容 */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* 标题 */}
              <div className="flex items-center justify-between mb-6">
                <h3 id="shortcuts-title" className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('键盘快捷键', 'Keyboard Shortcuts')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  title={t('关闭', 'Close')}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 快捷键列表 */}
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.combo ? (
                        shortcut.combo.map((key, keyIndex) => (
                          <span key={keyIndex} className="flex items-center">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.combo!.length - 1 && (
                              <span className="mx-1 text-gray-400">+</span>
                            )}
                          </span>
                        ))
                      ) : (
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          {shortcut.key}
                        </kbd>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 提示 */}
              <motion.p
                className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('按 Esc 键关闭此窗口', 'Press Esc to close this window')}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
