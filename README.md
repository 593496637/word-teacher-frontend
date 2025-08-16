# 📚 每日单词老师 - 前端项目

一个基于 **React + TypeScript + Vite** 的现代化英语单词学习应用，集成了专业的 Markdown 渲染和代码高亮功能。

## ✨ 最新更新

### 🎨 增强的 Markdown 渲染器

我们刚刚为项目添加了专业级的 Markdown 渲染功能：

- **🎯 代码语法高亮**：支持多种编程语言的语法高亮
- **📝 增强样式**：美观的标题、列表、引用、表格样式
- **🔗 智能链接**：外部链接自动在新窗口打开
- **📷 图片优化**：懒加载和响应式图片显示
- **✅ 任务列表**：支持 GitHub 风格的任务列表
- **📱 响应式设计**：完美适配移动端

## 🏗️ 项目架构

```
用户输入 → React前端 → Mastra HTTP API → Mastra Agent → 外部MCP服务 → 原始单词数据 → OpenAI润色 → 生动教学内容 → 用户
```

## 🔧 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **Markdown 渲染**：react-markdown + remark-gfm + rehype-highlight
- **样式方案**：CSS Modules + 自定义样式
- **代码高亮**：rehype-highlight (GitHub Dark Theme)
- **后端连接**：Mastra HTTP API (localhost:4111)

## 📦 核心依赖

```json
{
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "rehype-highlight": "^7.0.0",
  "rehype-raw": "^7.0.0"
}
```

## 🚀 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 类型检查
```bash
npm run type-check
```

## 📁 项目结构

```
src/
├── components/
│   ├── WordInput.tsx           # 单词输入组件
│   └── MarkdownRenderer.tsx    # 增强的 Markdown 渲染器 ✨
├── services/
│   └── api.ts                  # API 服务
├── App.tsx                     # 主应用组件
├── App.css                     # 主样式文件
├── highlight.css               # 代码高亮样式 ✨
├── markdown-enhanced.css       # Markdown 增强样式 ✨
└── main.tsx                    # 应用入口
```

## 🎨 Markdown 功能展示

### 代码高亮支持

支持多种编程语言的语法高亮：

```typescript
// TypeScript 示例
interface WordRequest {
  word: string;
  style: 'humorous' | 'academic' | 'storytelling';
  level: 'beginner' | 'intermediate' | 'advanced';
}
```

```python
# Python 示例
def teach_word(word: str, style: str) -> str:
    """AI 单词教学函数"""
    return f"Teaching {word} in {style} style"
```

### 增强的文本样式

- **粗体文本**：使用渐变背景突出显示
- *斜体文本*：带引号样式的优雅斜体
- `内联代码`：圆角背景的代码片段
- ~~删除线~~：带背景色的删除效果

### 美观的列表

- ✨ 自定义图标的无序列表
- 📝 清晰易读的层级结构
- 🎯 优雅的间距和对齐

1. 🔢 带表情符号的有序列表
2. 📋 专业的编号样式
3. 🎨 丰富的视觉效果

### 专业的引用样式

> 这是一个带有美观样式的引用块
> 
> 支持多行内容，拥有渐变背景和引号装饰

### 任务列表支持

- [x] ✅ 完成 Markdown 渲染器开发
- [x] ✅ 添加代码语法高亮
- [x] ✅ 实现响应式设计
- [ ] 🔄 添加复制代码功能
- [ ] 🔄 集成数学公式渲染

### 表格展示

| 功能 | 状态 | 描述 |
|------|------|------|
| 代码高亮 | ✅ 完成 | GitHub Dark 主题 |
| 表格样式 | ✅ 完成 | 悬停效果和斑马纹 |
| 响应式 | ✅ 完成 | 移动端适配 |
| 图片懒加载 | ✅ 完成 | 性能优化 |

## 🎯 核心组件

### MarkdownRenderer

```tsx
import { MarkdownRenderer } from './components/MarkdownRenderer';

// 基本使用
<MarkdownRenderer content={markdownContent} />

// 自定义样式
<MarkdownRenderer 
  content={markdownContent} 
  className="custom-markdown" 
/>
```

### 功能特性

- **🔧 可配置**：支持自定义 className
- **🎨 主题化**：基于 CSS 变量的主题系统
- **⚡ 性能优化**：图片懒加载，代码块优化
- **♿ 无障碍**：语义化标签，键盘导航支持
- **🌐 国际化**：支持多语言内容渲染

## 🔗 API 集成

### 连接本地 Mastra 服务

```typescript
// 默认连接地址
const API_BASE_URL = 'http://localhost:4111';

// API 端点
POST /api/agents/wordTeacher/generate
```

### 请求示例

```json
{
  "word": "serendipity",
  "style": "humorous",
  "level": "intermediate"
}
```

### 响应示例

```json
{
  "word": "serendipity",
  "style": "humorous",
  "content": "# 🎭 幽默学单词：Serendipity\n\n**发音**: /ˌserənˈdɪpəti/\n\n## 💡 定义\n意外发现有价值事物的能力...",
  "timestamp": "2025-08-16T11:00:00.000Z"
}
```

## 🎨 样式系统

### CSS 架构

```
src/
├── App.css                 # 主应用样式
├── highlight.css           # 代码高亮主题
└── markdown-enhanced.css   # Markdown 增强样式
```

### 主题变量

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #4a5568;
  --bg-color: #ffffff;
  --border-radius: 12px;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## 📱 响应式设计

### 断点系统

- **桌面端**: > 768px
- **平板端**: 768px - 480px
- **移动端**: < 480px

### 移动端优化

- 触摸友好的按钮尺寸
- 优化的文字大小和行高
- 简化的布局结构
- 手势操作支持

## 🔧 开发工具

### ESLint 配置

```javascript
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ]
};
```

### TypeScript 配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

## 🚀 部署指南

### 构建优化

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 环境变量

```env
VITE_API_BASE_URL=http://localhost:4111
VITE_APP_TITLE=每日单词老师
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 开启 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- **React 团队** - 优秀的前端框架
- **Vite 团队** - 快速的构建工具
- **react-markdown** - 强大的 Markdown 渲染库
- **Mastra 框架** - AI Agent 开发平台
- **OpenAI** - GPT-4o-mini 模型支持

---

## 📞 联系方式

- **作者**: 593496637
- **邮箱**: 593496637@qq.com
- **项目地址**: [GitHub Repository](https://github.com/593496637/word-teacher-frontend)

---

*最后更新: 2025-08-16*
