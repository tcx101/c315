'use client'

export default function DebugEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const anonKeyPreview = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          🔧 环境变量调试
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Supabase 配置状态
          </h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                NEXT_PUBLIC_SUPABASE_URL
              </p>
              <div className="flex items-center gap-2">
                {supabaseUrl ? (
                  <>
                    <span className="text-green-600 dark:text-green-400">✅</span>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {supabaseUrl}
                    </code>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 dark:text-red-400">❌</span>
                    <span className="text-red-600 dark:text-red-400">未设置</span>
                  </>
                )}
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </p>
              <div className="flex items-center gap-2">
                {hasAnonKey ? (
                  <>
                    <span className="text-green-600 dark:text-green-400">✅</span>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {anonKeyPreview}
                    </code>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 dark:text-red-400">❌</span>
                    <span className="text-red-600 dark:text-red-400">未设置</span>
                  </>
                )}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                配置状态
              </p>
              {supabaseUrl && hasAnonKey ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-300 font-medium">
                    ✅ 环境变量配置正确
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                    如果仍然出现 &quot;Failed to fetch&quot; 错误，请检查：
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-400 mt-2 ml-4 list-disc">
                    <li>网络连接是否正常</li>
                    <li>Supabase 项目是否处于活动状态</li>
                    <li>是否有防火墙或代理阻止连接</li>
                  </ul>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-300 font-medium">
                    ❌ 环境变量未正确加载
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-2">
                    请按照以下步骤修复：
                  </p>
                  <ol className="text-sm text-red-700 dark:text-red-400 mt-2 ml-4 list-decimal">
                    <li>确认 .env.local 文件存在于项目根目录</li>
                    <li>确认文件中包含正确的 Supabase 配置</li>
                    <li>重启开发服务器（Ctrl+C 然后 npm run dev）</li>
                    <li>刷新此页面查看是否已加载</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-2 text-blue-800 dark:text-blue-300">
            📝 .env.local 文件格式
          </h2>
          <pre className="text-sm text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 p-4 rounded overflow-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
          </pre>
        </div>
      </div>
    </div>
  )
}
