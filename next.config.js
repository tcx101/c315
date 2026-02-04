/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出，适合 Cloudflare Pages
  reactStrictMode: true,
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
  // 环境变量
  env: {
    SITE_NAME: 'C315实验室',
    SITE_URL: 'https://c315-website.pages.dev',
  },
}

module.exports = nextConfig
