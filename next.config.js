/** @type {import('next').NextConfig} */
const nextConfig = {
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
