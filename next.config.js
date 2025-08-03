/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 移除 output: 'export' 以支持服务端功能
  experimental: {
    runtime: 'edge', // 使用Edge Runtime以兼容Cloudflare Workers
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






