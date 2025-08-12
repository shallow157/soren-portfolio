import '@/styles/mobile-force.css'
import '@/styles/globals.css'
import '@/styles/mobile-diagnostics.css'
import '@/styles/mobile-only.css'
import '@/styles/desktop-only.css'
import '@/styles/isolation-test.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import MobileInlineStyles from '@/components/MobileInlineStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 移动端内联CSS强制修复 - 确保移动端CSS一定生效 */}
      <style jsx global>{`
        @media screen and (max-width: 767px) {
          .mobile-inline-test {
            background-color: #ff9800 !important;
            color: white !important;
            padding: 16px !important;
            border-radius: 8px !important;
            text-align: center !important;
            font-weight: bold !important;
            margin: 16px !important;
            border: 3px solid #f57c00 !important;
            font-size: 14px !important;
            display: block !important;
            position: relative !important;
            z-index: 9999 !important;
          }

          .mobile-inline-test::before {
            content: "🟠 内联CSS生效！外部CSS文件未加载，继续用内联CSS修复" !important;
            display: block !important;
          }

          /* 外部CSS加载失败检测 */
          .mobile-css-test {
            background-color: #e91e63 !important;
            color: white !important;
            padding: 16px !important;
            border-radius: 8px !important;
            text-align: center !important;
            font-weight: bold !important;
            margin: 16px !important;
            border: 3px solid #c2185b !important;
            font-size: 14px !important;
            display: block !important;
          }

          .mobile-css-test::before {
            content: "🔴 外部CSS文件加载失败，使用内联CSS强制修复" !important;
            display: block !important;
          }

          .mobile-css-loaded {
            background-color: #4caf50 !important;
            color: white !important;
            padding: 12px !important;
            border-radius: 6px !important;
            text-align: center !important;
            font-weight: bold !important;
            margin: 12px 16px !important;
            font-size: 14px !important;
            display: block !important;
          }

          .mobile-css-loaded::before {
            content: "✅ 内联CSS修复系统已激活" !important;
            display: block !important;
          }

          .isolation-test {
            background-color: #2196f3 !important;
            color: white !important;
            padding: 16px !important;
            border-radius: 8px !important;
            text-align: center !important;
            font-weight: bold !important;
            margin: 16px !important;
            border: 2px solid #1976d2 !important;
            display: block !important;
          }

          .isolation-test::before {
            content: "🔵 内联样式隔离测试正常" !important;
            display: block !important;
          }

          /* 移动端基础样式强制重置 */
          * {
            box-sizing: border-box !important;
          }

          html {
            font-size: 16px !important;
            -webkit-text-size-adjust: 100% !important;
            -webkit-font-smoothing: antialiased !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            line-height: 1.5 !important;
            color: #333333 !important;
            background-color: #ffffff !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }

          /* 移动端夜间模式全局样式 */
          .dark body {
            background-color: #111827 !important;
            color: #f9fafb !important;
          }

          /* 修复强制文字颜色的夜间模式 */
          .dark .mobile-force-text {
            color: #f9fafb !important;
          }

          .dark p {
            color: #d1d5db !important;
          }

          /* 修复强制标题颜色的夜间模式 */
          .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
            color: #f9fafb !important;
          }

          /* 强制覆盖移动端项目部分夜间模式 */
          .dark .mobile-project-title-desktop {
            color: #f9fafb !important;
          }

          .dark .mobile-project-desc-desktop {
            color: #d1d5db !important;
          }

          .dark .mobile-project-card-desktop {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
          }

          .dark .mobile-tech-tag {
            background-color: #1e3a8a !important;
            color: #bfdbfe !important;
          }

          /* 移动端多语言响应式适配 - iPhone 12 Pro优化 */
          @media (max-width: 390px) {
            /* 英文状态下导航栏优化 */
            [lang="en"] .mobile-nav-item {
              padding: 0 6px !important;
              font-size: 11px !important;
              max-width: 50px !important;
              letter-spacing: -0.5px !important;
            }

            /* 中文状态下导航栏保持原样 */
            [lang="zh"] .mobile-nav-item {
              padding: 0 8px !important;
              font-size: 12px !important;
              max-width: 55px !important;
            }

            /* Hero区域文本优化 */
            .mobile-hero-greeting {
              font-size: 1.8rem !important;
              line-height: 1.2 !important;
            }

            .mobile-hero-name {
              margin-left: -8px !important;
              font-size: 2.2rem !important;
            }

            /* 英文状态下Hero文本调整 */
            [lang="en"] .mobile-hero-greeting {
              font-size: 1.6rem !important;
              letter-spacing: -0.5px !important;
            }

            [lang="en"] .mobile-hero-name {
              margin-left: -12px !important;
              font-size: 2rem !important;
              letter-spacing: -1px !important;
            }
          }

          /* iPhone 12 Pro专属断点优化 (375px) */
          @media (max-width: 375px) {
            /* 导航栏进一步压缩 */
            .mobile-nav-item {
              padding: 0 4px !important;
              font-size: 10px !important;
              max-width: 45px !important;
            }

            /* 英文状态下更激进的压缩 */
            [lang="en"] .mobile-nav-item {
              padding: 0 3px !important;
              font-size: 9px !important;
              max-width: 40px !important;
              letter-spacing: -0.8px !important;
            }

            /* Hero区域进一步优化 */
            .mobile-hero-greeting {
              font-size: 1.5rem !important;
            }

            .mobile-hero-name {
              margin-left: -15px !important;
              font-size: 1.8rem !important;
            }

            /* 英文状态下Hero区域更紧凑 */
            [lang="en"] .mobile-hero-greeting {
              font-size: 1.3rem !important;
              letter-spacing: -0.8px !important;
            }

            [lang="en"] .mobile-hero-name {
              margin-left: -18px !important;
              font-size: 1.6rem !important;
              letter-spacing: -1.2px !important;
            }
          }

          /* 字体特性控制和交互容错设计 */
          .mobile-nav-item {
            font-kerning: auto !important;
            word-break: break-word !important;
            min-height: 32px !important;
            min-width: 32px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            touch-action: manipulation !important;
          }

          /* 英文状态下的字体微调 */
          [lang="en"] .mobile-nav-item {
            letter-spacing: -0.3px !important;
            font-weight: 500 !important;
          }

          /* 中文状态下的字体微调 */
          [lang="zh"] .mobile-nav-item {
            letter-spacing: 0px !important;
            font-weight: 400 !important;
          }

          /* Hero区域文本容器弹性适配 */
          .mobile-hero-greeting, .mobile-hero-name {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }

          /* 英文状态下的Hero文本优化 */
          [lang="en"] .mobile-hero-greeting {
            font-kerning: auto !important;
            text-rendering: optimizeLegibility !important;
          }

          [lang="en"] .mobile-hero-name {
            font-kerning: auto !important;
            text-rendering: optimizeLegibility !important;
          }

          /* 高级玻璃拟态按钮设计 */
          .glass-button {
            background: rgba(255, 255, 255, 0.15) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .glass-button:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
          }

          /* 夜间模式下的玻璃效果 */
          .dark .glass-button {
            background: rgba(0, 0, 0, 0.2) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          }

          .dark .glass-button:hover {
            background: rgba(0, 0, 0, 0.3) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4) !important;
          }

          /* 更subtle的玻璃效果 - 视觉弱化版本 */
          .glass-button-subtle {
            background: rgba(255, 255, 255, 0.08) !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .glass-button-subtle:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1) !important;
          }

          /* 夜间模式下的subtle玻璃效果 */
          .dark .glass-button-subtle {
            background: rgba(0, 0, 0, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
          }

          .dark .glass-button-subtle:hover {
            background: rgba(0, 0, 0, 0.25) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3) !important;
          }

          /* 主题切换按钮的状态动效 */
          .theme-btn.light-mode {
            transform: rotate(0deg) !important;
          }

          .theme-btn.dark-mode {
            transform: rotate(180deg) !important;
          }

          /* 点击波纹效果 */
          .ripple {
            position: absolute !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.4) !important;
            transform: scale(0) !important;
            animation: ripple-animation 0.6s linear !important;
            pointer-events: none !important;
          }

          .dark .ripple {
            background: rgba(255, 255, 255, 0.2) !important;
          }

          @keyframes ripple-animation {
            to {
              transform: scale(2) !important;
              opacity: 0 !important;
            }
          }

          /* 导航栏hover效果优化 */
          .nav-item {
            position: relative;
            overflow: hidden;
          }

          /* 夜间模式切换过渡动画 */
          html {
            transition: background-color 0.3s ease, color 0.3s ease !important;
          }

          body {
            transition: background-color 0.3s ease, color 0.3s ease !important;
          }

          /* 社交链接样式 */
          .social-link {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          }

          .social-link:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
          }

          .dark .social-link {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
          }

          .dark .social-link:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
          }

          /* 侧边社交链接样式 */
          .social-link-side {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
            position: relative;
          }

          .social-link-side:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12) !important;
          }

          .dark .social-link-side {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
          }

          .dark .social-link-side:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
          }

          /* 侧边社交链接的tooltip效果 */
          .social-link-side::before {
            content: attr(aria-label);
            position: absolute;
            right: calc(100% + 12px);
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 50;
          }

          .social-link-side:hover::before {
            opacity: 1;
          }

          .dark .social-link-side::before {
            background: rgba(255, 255, 255, 0.9);
            color: #1f2937;
          }

          /* 移动端背景渐变优化 */
          @media (max-width: 767px) {
            .mobile-gradient-bg {
              background: linear-gradient(135deg,
                #f0f9ff 0%,
                #e0e7ff 25%,
                #fdf4ff 50%,
                #f0f9ff 75%,
                #e0e7ff 100%) !important;
            }

            .dark .mobile-gradient-bg {
              background: linear-gradient(135deg,
                #0f172a 0%,
                #1e1b4b 25%,
                #581c87 50%,
                #1e1b4b 75%,
                #0f172a 100%) !important;
            }
          }

          /* 移动端布局强制修复 */
          .block {
            display: block !important;
          }

          .md\\:hidden {
            display: block !important;
          }

          .hidden {
            display: none !important;
          }

          .md\\:block {
            display: none !important;
          }

          /* 移动端容器强制样式 */
          .mobile-force-visible {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .mobile-force-layout {
            display: block !important;
            width: 100% !important;
            padding: 16px !important;
            margin: 0 auto !important;
          }

          .mobile-force-spacing {
            padding: 16px !important;
            margin-bottom: 16px !important;
          }

          .mobile-force-bg {
            background-color: #f8f9fa !important;
            border-radius: 8px !important;
          }

          .mobile-force-text {
            color: #333333 !important;
            font-size: 16px !important;
            line-height: 1.6 !important;
            margin-bottom: 16px !important;
            word-wrap: break-word !important;
          }

          /* 移动端标题强制样式 */
          h1, h2, h3, h4, h5, h6 {
            color: #111111 !important;
            font-weight: bold !important;
            margin-bottom: 16px !important;
            line-height: 1.3 !important;
          }

          h1 {
            font-size: 28px !important;
          }

          h2 {
            font-size: 24px !important;
          }

          h3 {
            font-size: 20px !important;
          }

          p {
            color: #333333 !important;
            font-size: 16px !important;
            line-height: 1.6 !important;
            margin-bottom: 16px !important;
          }

          /* 移动端按钮强制样式 */
          button, .button {
            display: inline-block !important;
            padding: 12px 20px !important;
            background-color: #007bff !important;
            color: white !important;
            border: none !important;
            border-radius: 6px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            text-align: center !important;
            text-decoration: none !important;
            cursor: pointer !important;
            margin: 8px 4px !important;
          }

          /* 移动端图片强制样式 */
          img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 8px !important;
            margin-bottom: 16px !important;
          }

          /* 移动端表单强制样式 */
          input, textarea, select {
            width: 100% !important;
            padding: 12px 16px !important;
            border: 2px solid #ced4da !important;
            border-radius: 6px !important;
            font-size: 16px !important;
            margin-bottom: 16px !important;
            background-color: white !important;
          }

          /* 移动端表单夜间模式 */
          .dark input, .dark textarea, .dark select {
            background-color: #374151 !important;
            border-color: #4b5563 !important;
            color: #f9fafb !important;
          }
        }
      `}</style>

      <MobileInlineStyles />
      <ThemeProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}



