# 🚀 Cloudflare Pages 部署指南

本文档详细介绍如何将每日单词老师前端项目部署到 Cloudflare Pages。

## 📋 部署清单

### ✅ 已完成的配置

- [x] GitHub Actions 工作流 (`.github/workflows/deploy.yml`)
- [x] Vite 生产环境配置
- [x] 环境变量支持
- [x] 代码分割和优化

### 🔧 需要手动配置的步骤

1. **Cloudflare Pages 项目设置**
2. **GitHub Secrets 配置**
3. **自定义域名配置**（可选）

## 🎯 第一步：配置 Cloudflare Pages

### 1.1 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 导航到 **Pages** 页面
3. 点击 **"Create a project"**
4. 选择 **"Connect to Git"**

### 1.2 连接 GitHub 仓库

1. 选择 **GitHub** 作为 Git 提供商
2. 授权 Cloudflare 访问 GitHub
3. 选择 `word-teacher-frontend` 仓库
4. 配置构建设置：

```yaml
# 构建配置
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

### 1.3 环境变量配置

在 Cloudflare Pages 项目设置中添加：

```bash
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_APP_TITLE=每日单词老师
VITE_APP_ENV=production
```

## 🔑 第二步：配置 GitHub Secrets

### 2.1 获取 Cloudflare 凭据

**获取 API Token:**
1. 前往 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 **"Create Token"**
3. 选择 **"Cloudflare Pages:Edit"** 模板
4. 配置权限并创建 Token

**获取 Account ID:**
1. 在 Cloudflare Dashboard 右侧边栏找到 **"Account ID"**
2. 复制此 ID

**获取 Project Name:**
1. 前往 Cloudflare Pages
2. 复制你的项目名称

### 2.2 添加 GitHub Secrets

前往 GitHub 仓库设置 → **Secrets and variables** → **Actions**，添加：

```bash
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_PROJECT_NAME=your_project_name_here
VITE_API_BASE_URL=https://your-backend-domain.com
```

## 🌐 第三步：自定义域名（可选）

### 3.1 添加自定义域名

1. 在 Cloudflare Pages 项目中点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名（例如：`word-teacher.your-domain.com`）
4. 按照提示配置 DNS 记录

### 3.2 DNS 配置

在你的域名 DNS 设置中添加：

```dns
Type: CNAME
Name: word-teacher (或你选择的子域名)
Value: your-project.pages.dev
```

## 🔄 第四步：触发部署

### 4.1 自动部署

每次推送到 `main` 分支都会自动触发部署：

```bash
git add .
git commit -m "🚀 Deploy to production"
git push origin main
```

### 4.2 手动部署

你也可以在 GitHub Actions 中手动触发部署：

1. 前往 GitHub 仓库的 **Actions** 页面
2. 选择 **"Deploy to Cloudflare Pages"** 工作流
3. 点击 **"Run workflow"**

## 📊 第五步：监控部署

### 5.1 GitHub Actions 监控

在 GitHub **Actions** 页面可以查看：
- 构建日志
- 部署状态
- 错误信息

### 5.2 Cloudflare Pages 监控

在 Cloudflare Pages 项目中可以查看：
- 部署历史
- 性能指标
- 流量统计

## 🐛 常见问题排查

### 构建失败

**问题**: `npm ci` 失败
**解决**: 确保 `package-lock.json` 已提交到 Git

**问题**: 类型检查失败
**解决**: 运行 `npm run type-check` 修复 TypeScript 错误

**问题**: 代码检查失败
**解决**: 运行 `npm run lint` 修复 ESLint 错误

### 部署失败

**问题**: Cloudflare API Token 无效
**解决**: 重新生成 API Token 并更新 GitHub Secrets

**问题**: 环境变量未生效
**解决**: 检查变量名是否以 `VITE_` 开头

### 运行时错误

**问题**: API 连接失败
**解决**: 检查 `VITE_API_BASE_URL` 是否正确设置

**问题**: 静态资源 404
**解决**: 检查 Vite 构建配置中的 `base` 路径

## 📈 性能优化

### 构建优化

已启用的优化：
- ✅ 代码分割（vendor、markdown 单独打包）
- ✅ Terser 压缩
- ✅ 移除 console.log
- ✅ Tree shaking

### CDN 优化

Cloudflare Pages 自动提供：
- ✅ 全球 CDN 分发
- ✅ HTTP/2 和 HTTP/3
- ✅ 自动 HTTPS
- ✅ 边缘缓存

## 🔧 高级配置

### 自定义头部

在项目根目录创建 `_headers` 文件：

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### 重定向配置

在项目根目录创建 `_redirects` 文件：

```
# SPA 重定向
/*    /index.html   200

# API 代理（如果需要）
/api/*  https://your-backend-domain.com/api/:splat  200
```

## 📋 部署检查清单

部署前确认：

- [ ] 所有代码已提交到 `main` 分支
- [ ] GitHub Secrets 已正确配置
- [ ] 环境变量已设置
- [ ] 构建和测试通过
- [ ] 域名 DNS 已配置（如使用自定义域名）

部署后验证：

- [ ] 网站可正常访问
- [ ] API 连接正常
- [ ] 所有功能正常工作
- [ ] 移动端适配正常
- [ ] 性能指标良好

## 🎉 部署完成

恭喜！你的每日单词老师前端应用已成功部署到 Cloudflare Pages。

访问地址：
- **Cloudflare 默认域名**: `https://your-project.pages.dev`
- **自定义域名**: `https://your-custom-domain.com`

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 构建日志
2. 检查 Cloudflare Pages 部署日志
3. 确认所有配置步骤都已完成
4. 参考 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

---

*最后更新: 2025-08-16*
