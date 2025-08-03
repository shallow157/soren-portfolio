import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      // 简化检测逻辑，主要基于屏幕宽度
      const isSmallScreen = window.innerWidth < 768
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent)

      const mobile = isMobileDevice || isSmallScreen
      console.log('Mobile detection:', { isMobileDevice, isSmallScreen, mobile, width: window.innerWidth })

      setIsMobile(mobile)
      setIsLoaded(true)
    }

    // 延迟检测，确保DOM完全加载
    const timer = setTimeout(checkMobile, 100)
    window.addEventListener('resize', checkMobile)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return { isMobile, isLoaded }
}
