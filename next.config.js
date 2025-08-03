/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // 为Cloudflare Pages优化
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // 暂时移除i18n以简化构建
  // i18n: {
  //   defaultLocale: 'zh',
  //   locales: ['zh', 'en'],
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig






