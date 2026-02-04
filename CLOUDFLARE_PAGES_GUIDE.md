# Cloudflare Pages 部署教程

## 第一步：推送代码到 GitHub

### 1. 初始化 Git 仓库

```bash
# 在项目目录下执行
cd d:\stm32produce\c315

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: C315实验室网站"
```

### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`c315-website`（或其他名称）
3. 选择 **Public**（公开）
4. 不要勾选任何初始化选项
5. 点击 **Create repository**

### 3. 推送到 GitHub

```bash
# 添加远程仓库（替换成你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/c315-website.git

# 推送代码
git branch -M main
git push -u origin main
```

---

## 第二步：注册 Cloudflare 账号

1. 访问 https://dash.cloudflare.com/sign-up
2. 输入邮箱和密码
3. 验证邮箱
4. 登录成功

---

## 第三步：部署到 Cloudflare Pages

### 1. 进入 Pages 控制台

1. 登录 Cloudflare 后，点击左侧菜单 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

### 2. 连接 GitHub

1. 点击 **Connect GitHub**
2. 授权 Cloudflare 访问你的 GitHub
3. 选择 **All repositories** 或 **Only select repositories**
4. 如果选择后者，勾选 `c315-website` 仓库
5. 点击 **Install & Authorize**

### 3. 配置项目

#### 项目设置：
```
Project name: c315-website
Production branch: main
```

#### 构建设置：
```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
```

#### 环境变量（可选）：
```
NEXT_PUBLIC_SITE_NAME=C315实验室
NEXT_PUBLIC_SITE_URL=https://你的域名.pages.dev
```

### 4. 开始部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约 2-5 分钟）
3. 部署成功后会显示访问地址

---

## 第四步：访问网站

部署成功后，你会得到一个免费域名：

```
https://c315-website.pages.dev
```

或者类似：
```
https://c315-website-abc.pages.dev
```

---

## 第五步：绑定自定义域名（可选）

### 1. 购买域名

在阿里云、腾讯云等购买域名（约 50-100元/年）

### 2. 添加域名到 Cloudflare

1. 在 Cloudflare 控制台点击 **Add a site**
2. 输入你的域名
3. 选择 **Free** 计划
4. 按照提示修改域名的 DNS 服务器

### 3. 在 Pages 项目中绑定域名

1. 进入你的 Pages 项目
2. 点击 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入你的域名（如 `www.c315lab.com`）
5. 点击 **Continue**
6. Cloudflare 会自动配置 DNS 记录
7. 等待 SSL 证书生成（约 5-10 分钟）

---

## 第六步：自动部署

### 配置完成后，每次推送代码都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push origin main

# Cloudflare Pages 会自动检测并重新部署
```

---

## 常见问题

### Q1: 构建失败怎么办？

**检查构建日志：**
1. 进入 Pages 项目
2. 点击失败的部署
3. 查看 **Build log**

**常见问题：**
- Node.js 版本不对：在项目根目录创建 `.nvmrc` 文件
  ```
  18
  ```
- 依赖安装失败：检查 `package.json`

### Q2: 国内访问速度慢怎么办？

**方案1：使用 Cloudflare CDN**
- Cloudflare 自带全球 CDN
- 国内访问速度比 Vercel 快

**方案2：绑定自定义域名**
- 使用自己的域名
- 开启 Cloudflare 的中国网络优化

### Q3: 如何查看部署状态？

1. 进入 Pages 项目
2. 查看 **Deployments** 标签
3. 可以看到所有部署历史

### Q4: 如何回滚到之前的版本？

1. 进入 **Deployments**
2. 找到想要回滚的版本
3. 点击 **...** → **Rollback to this deployment**

---

## 优化建议

### 1. 配置环境变量

在 Pages 项目设置中添加：
```
Settings → Environment variables

NEXT_PUBLIC_SITE_NAME=C315实验室
NEXT_PUBLIC_SITE_URL=https://你的域名.pages.dev
```

### 2. 配置构建缓存

Cloudflare Pages 自动缓存 `node_modules`，加快构建速度

### 3. 配置重定向规则

创建 `public/_redirects` 文件：
```
/old-page  /new-page  301
/*  /index.html  200
```

---

## 性能对比

| 指标 | Cloudflare Pages | Vercel | Netlify |
|------|------------------|--------|---------|
| 国内访问速度 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 构建速度 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 免费额度 | 无限 | 100GB/月 | 100GB/月 |
| CDN 节点 | 全球 | 全球 | 全球 |
| 自动部署 | ✅ | ✅ | ✅ |

---

## 完整命令总结

```bash
# 1. 初始化并推送到 GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/c315-website.git
git push -u origin main

# 2. 访问 Cloudflare Pages 并连接 GitHub

# 3. 配置构建设置
# Framework: Next.js
# Build command: npm run build
# Output directory: .next

# 4. 部署完成！

# 5. 后续更新
git add .
git commit -m "更新内容"
git push origin main
# 自动重新部署
```

---

## 下一步

部署成功后，你可以：

1. ✅ 分享网站链接给同学
2. ✅ 绑定自定义域名
3. ✅ 配置 SEO 优化
4. ✅ 添加访问统计（Google Analytics）
5. ✅ 持续更新内容

---

## 需要帮助？

如果遇到问题：
1. 查看 Cloudflare Pages 文档：https://developers.cloudflare.com/pages/
2. 查看构建日志
3. 检查 GitHub 仓库是否正确推送

祝部署顺利！🚀
