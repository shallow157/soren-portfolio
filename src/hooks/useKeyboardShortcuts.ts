import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  action: () => void
  description: string
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 忽略在输入框中的按键（除了特定的快捷键）
    const target = event.target as HTMLElement
    const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true'

    // 查找匹配的快捷键
    const matchingShortcut = shortcuts.find(shortcut => {
      const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase()
      const ctrlMatch = !!shortcut.ctrlKey === event.ctrlKey
      const shiftMatch = !!shortcut.shiftKey === event.shiftKey
      const altMatch = !!shortcut.altKey === event.altKey
      const metaMatch = !!shortcut.metaKey === event.metaKey

      return keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch
    })

    if (matchingShortcut) {
      // 对于某些快捷键，即使在输入框中也要执行
      const allowInInput = ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

      if (!isInputElement || allowInInput.includes(matchingShortcut.key) || matchingShortcut.ctrlKey || matchingShortcut.metaKey) {
        if (matchingShortcut.preventDefault !== false) {
          event.preventDefault()
        }

        console.log(`执行快捷键: ${matchingShortcut.description}`)
        matchingShortcut.action()
      }
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// 预定义的快捷键
export const defaultShortcuts: KeyboardShortcut[] = [
  {
    key: '/',
    action: () => {
      console.log('尝试聚焦搜索框')
      const searchInput = document.querySelector('input[placeholder*="搜索"], input[placeholder*="Search"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
        searchInput.select()
        console.log('搜索框已聚焦')
      } else {
        console.log('未找到搜索框')
      }
    },
    description: '聚焦搜索框',
    preventDefault: true
  },
  {
    key: 'Escape',
    action: () => {
      console.log('执行 Escape 操作')

      // 首先检查是否有打开的模态框或弹窗
      const modals = document.querySelectorAll('[role="dialog"], .modal, [data-modal]')
      const hasOpenModal = Array.from(modals).some(modal => {
        const style = window.getComputedStyle(modal as Element)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })

      if (hasOpenModal) {
        // 尝试关闭模态框
        const closeButtons = document.querySelectorAll('[aria-label="Close"], [data-close], button[title*="关闭"], button[title*="Close"]')
        if (closeButtons.length > 0) {
          (closeButtons[0] as HTMLElement).click()
          return
        }
      }

      // 如果没有模态框，则取消当前聚焦
      const activeElement = document.activeElement as HTMLElement
      if (activeElement && activeElement.tagName !== 'BODY') {
        activeElement.blur()
        console.log('已取消聚焦')
      }
    },
    description: '取消聚焦/关闭弹窗'
  },
  {
    key: 'Home',
    action: () => {
      console.log('回到顶部')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    description: '回到顶部'
  },
  {
    key: 'End',
    action: () => {
      console.log('滚动到底部')
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    },
    description: '滚动到底部'
  },
  {
    key: 'h',
    action: () => {
      console.log('显示快捷键帮助')
      const helpButton = document.querySelector('[title*="快捷键"], [title*="Keyboard"]') as HTMLElement
      if (helpButton) {
        helpButton.click()
      }
    },
    description: '显示快捷键帮助'
  }
]
