/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // 环境变量
  env: {
    SITE_NAME: 'C315实验室',
    SITE_URL: 'http://localhost:3000',
  },
}

module.exports = nextConfig
