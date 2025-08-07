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
        }
      `}</style>

      <MobileInlineStyles />
      <MobileInlineStyles />
      <ThemeProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}



