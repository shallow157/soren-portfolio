/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 移除无效的 experimental.runtime 配置
  images: {
    domains: ['localhost'], // 添加允许的图片域名
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  // 优化构建
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig






