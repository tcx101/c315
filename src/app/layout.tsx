import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'C315实验室 - 欢迎加入我们',
  description: '专注电子信息领域，涵盖嵌入式、PCB、电力电子、机器视觉。加入C315实验室，开启你的电子工程之旅。',
  keywords: 'C315, 实验室, 招新, 嵌入式, PCB设计, 电力电子, 机器视觉, STM32, 电子信息',
  authors: [{ name: 'C315实验室团队' }],
  openGraph: {
    title: 'C315实验室 - 欢迎加入我们',
    description: '专注电子信息领域，涵盖嵌入式、PCB、电力电子、机器视觉。加入C315实验室，开启你的电子工程之旅。',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
