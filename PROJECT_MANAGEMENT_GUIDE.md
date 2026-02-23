# 项目管理功能使用指南

## 📋 功能概述

已成功实现完整的项目管理系统，包括：
- ✅ 数据库表结构
- ✅ 项目提交功能
- ✅ 项目展示功能
- ✅ 项目审核功能
- ✅ 权限控制

## 🚀 部署步骤

### 1. 运行数据库迁移

在 Supabase 控制台执行迁移文件：

```bash
# 文件位置
supabase/migrations/006_create_projects_table.sql
```

或者使用 Supabase CLI：

```bash
supabase db push
```

### 2. 验证数据库

迁移完成后，数据库会自动：
- 创建 `projects` 表
- 设置行级安全策略（RLS）
- 插入示例项目数据（FreeRTOS串口数据存储）

### 3. 重启开发服务器

```bash
npm run dev
```

## 📖 使用流程

### 成员提交项目

1. **登录账号**
   - 访问 `/login` 登录

2. **提交项目**
   - 访问 `/projects` 页面
   - 点击右上角"提交项目"按钮
   - 或直接访问 `/projects/add`

3. **填写项目信息**
   - 项目名称 *（必填）
   - 项目简介 *（必填）
   - 项目详细介绍（支持 Markdown）
   - 项目状态：已完成/进行中/计划中
   - 项目年份 *（必填）
   - 技术标签 *（至少一个）
   - 参与成员（可选）
   - GitHub 链接（可选）
   - 演示链接（可选）
   - 项目封面图（可选）

4. **提交审核**
   - 点击"提交项目"
   - 等待管理员审核

### 管理员审核项目

1. **访问审核页面**
   - 管理员或负责人登录
   - 访问 `/admin/review-projects`

2. **查看待审核项目**
   - 默认显示"待审核"标签
   - 可查看项目详细信息
   - 可展开查看完整内容

3. **审核操作**
   - **通过**：点击"通过项目"按钮
   - **拒绝**：点击"拒绝项目"，输入拒绝原因

4. **审核后**
   - 通过的项目会显示在 `/projects` 页面
   - 拒绝的项目不会公开显示

### 查看项目展示

1. **访问项目页面**
   - 访问 `/projects`
   - 所有人都可以查看已审核通过的项目

2. **筛选功能**
   - 全部
   - 已完成
   - 进行中
   - 计划中

3. **项目信息**
   - 项目名称、简介
   - 技术标签
   - 参与成员
   - GitHub 和演示链接
   - 项目年份和状态

## 🔐 权限说明

### 普通用户
- ✅ 查看已审核通过的项目
- ✅ 提交新项目
- ✅ 查看自己提交的项目
- ✅ 编辑/删除自己的待审核项目

### 管理员/负责人
- ✅ 查看所有项目
- ✅ 审核项目（通过/拒绝）
- ✅ 所有普通用户权限

## 📁 文件结构

```
src/
├── app/
│   ├── projects/
│   │   ├── page.tsx              # 项目展示页面（已修改）
│   │   └── add/
│   │       └── page.tsx          # 项目提交页面（新建）
│   └── admin/
│       └── review-projects/
│           └── page.tsx          # 项目审核页面（新建）
├── lib/
│   └── projectApi.ts             # 项目 API（新建）
└── types/
    └── project.ts                # 项目类型定义（新建）

supabase/
└── migrations/
    └── 006_create_projects_table.sql  # 数据库迁移（新建）
```

## 🎯 核心功能

### 1. 数据库表结构

```sql
projects 表字段：
- id: UUID（主键）
- title: 项目名称
- description: 项目简介
- content: 详细内容（Markdown）
- image: 封面图
- tags: 技术标签数组
- status: 项目状态（completed/in-progress/planned）
- year: 项目年份
- members: 参与成员数组
- github_url: GitHub 链接
- demo_url: 演示链接
- submitted_by: 提交者 ID
- submitter_name: 提交者姓名
- review_status: 审核状态（pending/approved/rejected）
- reviewed_by: 审核人 ID
- reviewed_at: 审核时间
- reject_reason: 拒绝原因
- created_at: 创建时间
- updated_at: 更新时间
```

### 2. API 接口

```typescript
projectApi.getApproved()           // 获取已审核通过的项目
projectApi.getById(id)             // 获取单个项目
projectApi.getMyProjects(userId)   // 获取我的项目
projectApi.submit(data, userId)    // 提交项目
projectApi.update(id, data)        // 更新项目
projectApi.delete(id)              // 删除项目
projectApi.getAll()                // 获取所有项目（管理员）
projectApi.getPending()            // 获取待审核项目（管理员）
projectApi.review(id, status)      // 审核项目（管理员）
```

### 3. 行级安全策略（RLS）

- 所有人可查看已审核通过的项目
- 登录用户可提交项目
- 用户可查看/编辑/删除自己的待审核项目
- 管理员和负责人可查看和审核所有项目

## 🔧 常见问题

### Q: 提交项目后在哪里查看？
A: 提交后需要等待管理员审核。审核通过后会显示在 `/projects` 页面。

### Q: 如何修改已提交的项目？
A: 只能修改状态为"待审核"的项目。审核通过或拒绝后无法修改。

### Q: 谁可以审核项目？
A: 只有角色为 `admin` 或 `leader` 的用户可以审核。

### Q: 项目封面图如何上传？
A: 当前版本需要先将图片上传到图床，然后填写图片链接。

## 📝 后续优化建议

1. **图片上传功能**
   - 集成 Supabase Storage
   - 支持直接上传项目封面图

2. **项目详情页**
   - 创建独立的项目详情页面
   - 支持 Markdown 渲染

3. **项目编辑功能**
   - 允许管理员编辑已通过的项目
   - 添加项目编辑历史记录

4. **搜索和筛选**
   - 按标签搜索
   - 按年份筛选
   - 全文搜索

5. **统计功能**
   - 项目数量统计
   - 成员参与统计
   - 技术栈分布

## ✅ 测试清单

- [ ] 运行数据库迁移
- [ ] 验证示例项目已插入
- [ ] 测试项目提交功能
- [ ] 测试项目审核功能
- [ ] 测试项目展示页面
- [ ] 测试权限控制
- [ ] 测试筛选功能

## 🎉 完成！

现在你的 C315 实验室网站已经支持成员自己添加项目展示了！
