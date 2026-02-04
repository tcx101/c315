import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-9xl font-bold text-primary-600">404</h1>
      <h2 className="text-3xl font-bold mb-4 mt-4">页面未找到</h2>
      <p className="text-gray-600 mb-8">抱歉，您访问的页面不存在。</p>
      <Link href="/" className="btn-primary">
        返回首页
      </Link>
    </div>
  )
}
