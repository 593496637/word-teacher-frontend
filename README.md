# 📚 每日单词老师 - 前端界面

> Daily Word Teacher Frontend - React + TypeScript + Vite

连接本地4111端口Mastra服务的纯前端React界面，提供AI驱动的个性化英语单词教学体验。

## 🎯 项目概览

这是一个现代化的React前端应用，专门设计用来与[每日单词老师后端服务](https://github.com/593496637/word-teacher-backend)配合使用。

### ✨ 核心功能

- 🤖 **AI驱动教学** - 连接Mastra + OpenAI GPT-4o-mini
- 🎭 **多种教学风格** - 幽默、严肃、生动、简单、详细
- 📱 **响应式设计** - 完美支持桌面和移动设备
- 🔄 **实时连接状态** - 智能检测后端服务状态
- 📖 **Markdown渲染** - 优雅展示AI生成的教学内容
- 🚀 **快速开始** - 内置常用单词快速选择

## 🛠️ 技术栈

- **React 18** - 现代React Hooks
- **TypeScript** - 完整类型安全
- **Vite** - 快速开发构建工具
- **CSS3** - 现代样式与动画
- **ESLint** - 代码质量保证

## 🚀 快速开始

### 1. 确保后端服务运行

首先确保后端Mastra服务正在运行：

```bash
# 在后端项目目录
cd word-teacher-backend
npm run dev
# 服务应该运行在 http://localhost:4111
```

### 2. 启动前端项目

```bash
# 克隆项目
git clone https://github.com/593496637/word-teacher-frontend.git
cd word-teacher-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 访问应用

打开浏览器访问: http://localhost:5173

## 📡 API 连接说明

### 连接配置

前端自动连接到本地后端服务：

- **后端地址**: `http://localhost:4111`
- **API端点**: `/api/agents/wordTeacher/generate`
- **AI模型**: OpenAI GPT-4o-mini

### 教学风格映射

前端风格选项与后端完全匹配：

| 前端选项 | 后端参数 | 说明 |
|---------|---------|------|
| 😄 幽默式 | `humorous` | 风趣有趣的教学 |
| 🎓 严肃式 | `serious` | 学术严谨的解释 |
| 🎨 生动式 | `vivid` | 形象比喻记忆 |
| 🌱 简单式 | `simple` | 通俗易懂语言 |
| 🔬 详细式 | `detailed` | 深入多角度分析 |

## 🎮 使用方法

### 1. 选择单词
- 手动输入英文单词
- 或点击快速开始选项

### 2. 选择教学风格
- 根据喜好选择教学风格
- 每种风格都有不同的教学特色

### 3. 获取AI教学内容
- 点击"开始AI教学"
- 等待连接Mastra服务
- 查看生成的个性化教学内容

## 🔧 开发指南

### 项目结构

```
src/
├── components/
│   └── WordInput.tsx          # 单词输入组件
├── services/
│   └── api.ts                 # API服务层
├── App.tsx                    # 主应用组件
├── App.css                    # 应用样式
├── main.tsx                   # 应用入口
└── index.css                  # 全局样式
```

### 核心组件说明

#### WordInput 组件
- 处理用户输入和选项选择
- 表单验证和错误处理
- 教学风格和级别选择

#### API 服务层
- 封装与后端Mastra服务的通信
- 自动处理错误和降级到演示模式
- 健康检查和连接状态管理

#### MarkdownDisplay 组件
- 渲染AI生成的Markdown教学内容
- 自定义样式确保最佳阅读体验

### 环境变量

无需额外配置环境变量，前端自动连接到 `localhost:4111`。

## 🐛 故障排除

### 常见问题

1. **无法连接到后端服务**
   - 确保后端服务在4111端口运行
   - 检查防火墙设置
   - 验证后端服务健康状态

2. **教学内容显示为演示模式**
   - 检查后端服务是否正常启动
   - 验证OpenAI API Key配置
   - 查看浏览器控制台错误信息

3. **样式显示异常**
   - 清除浏览器缓存
   - 确保所有CSS文件正常加载

### 调试技巧

- 打开浏览器开发者工具查看网络请求
- 检查控制台日志获取详细错误信息
- 验证后端API响应格式

## 📦 构建和部署

### 开发构建

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产构建
npm run lint         # 代码检查
```

### 生产部署

```bash
# 构建生产版本
npm run build

# 部署 dist/ 目录到你的静态文件服务器
# 例如: Netlify, Vercel, GitHub Pages 等
```

## 🔗 相关链接

- **后端仓库**: https://github.com/593496637/word-teacher-backend
- **Mastra 框架**: https://mastra.ai/
- **OpenAI API**: https://platform.openai.com/

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 此仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🎉 致谢

- Mastra AI Framework 团队
- OpenAI 提供的强大AI能力
- React 和 Vite 社区

---

**💡 提示**: 这是一个完全的前端项目，需要配合后端Mastra服务使用。确保两个服务都在运行以获得最佳体验！
