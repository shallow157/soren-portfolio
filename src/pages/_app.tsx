import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* CSS回退系统 - 确保移动端样式加载 */}
        <link rel="stylesheet" href="/fallback-mobile.css" />

        {/* 内联CSS测试 - 只在移动端生效 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 移动端专用样式 - 确保不影响桌面端 */
            @media (max-width: 768px) {
              .css-test-inline {
                background-color: #10b981 !important;
                color: white !important;
                padding: 8px 16px !important;
                border-radius: 4px !important;
                margin: 8px 0 !important;
                font-weight: 600 !important;
                text-align: center !important;
                display: block !important;
              }

              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                background-color: #f9fafb !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              .mobile-force-layout {
                display: block !important;
                width: 100% !important;
                padding: 16px !important;
              }

              .mobile-force-flex {
                display: -webkit-box !important;
                display: -webkit-flex !important;
                display: -ms-flexbox !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 16px !important;
              }
            }
          `
        }} />
      </Head>
      <ThemeProvider>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
      </ThemeProvider>
    </>
  )
}



