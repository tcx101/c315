import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: '没有文件上传' },
        { status: 400 }
      )
    }

    // 验证文件类型
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: '不支持的文件类型' },
        { status: 400 }
      )
    }

    // 验证文件大小（5MB）
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: '文件大小超过限制' },
        { status: 400 }
      )
    }

    // 这里应该添加实际的文件保存逻辑
    // 例如：保存到云存储（阿里云OSS、腾讯云COS等）
    // const fileUrl = await uploadToCloud(file)

    const fileUrl = `/uploads/${file.name}`

    return NextResponse.json(
      { 
        success: true, 
        message: '文件上传成功',
        fileUrl 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('文件上传错误:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '文件上传失败' 
      },
      { status: 500 }
    )
  }
}
