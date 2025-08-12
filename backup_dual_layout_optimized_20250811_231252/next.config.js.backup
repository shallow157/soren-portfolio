/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 移除 output: 'export' 以支持服务端功能
  experimental: {
    // Edge Runtime配置已移除，使用默认配置
  },
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






