import '@/styles/mobile-force.css'
import '@/styles/globals.css'
import '@/styles/mobile-diagnostics.css'
import '@/styles/mobile-only.css'
import '@/styles/desktop-only.css'
import '@/styles/isolation-test.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
            content: "🟠 内联CSS测试：如果看到橙色背景，说明内联CSS生效" !important;
            display: block !important;
          }

          /* 移动端基础样式强制重置 */
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            background-color: #ffffff !important;
            color: #333333 !important;
          }

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
        }
      `}</style>

      <ThemeProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}



