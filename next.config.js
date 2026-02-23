/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除 output: 'export'，因为我们有动态路由和数据库交互
  // output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // 环境变量
  env: {
    SITE_NAME: 'C315实验室',
    SITE_URL: 'https://c315-website.pages.dev',
  },
}

module.exports = nextConfig
