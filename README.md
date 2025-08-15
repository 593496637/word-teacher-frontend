# 🎯 每日单词老师 - 前端界面

> 纯React前端项目，连接本地4111端口Mastra服务的英语单词学习应用

## ✨ 功能特性

- 🎨 **现代化UI**: 玻璃拟态设计风格
- 🎭 **5种教学风格**: 幽默、严谨、故事、对话、学术
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🔗 **Mastra集成**: 连接本地4111端口服务
- 🔊 **语音播放**: 内置单词发音功能

## 🏗️ 技术架构

```
React前端 (3000端口) → API调用 → 本地Mastra服务 (4111端口)
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/593496637/word-teacher-frontend.git
cd word-teacher-frontend
```

### 2. 安装依赖
```bash
npm install
# 或者
pnpm install
```

### 3. 启动开发服务器
```bash
npm run dev
# 或者
pnpm dev
```

### 4. 访问应用
- 前端界面: http://localhost:3000
- 确保你的Mastra服务运行在: http://localhost:4111

## 🔧 开发脚本

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览构建结果
npm run lint       # 代码检查
npm run type-check # TypeScript类型检查
```

## 📁 项目结构

```
word-teacher-frontend/
├── src/
│   ├── components/     # React组件
│   ├── services/       # API服务
│   ├── App.tsx        # 主应用
│   ├── App.css        # 样式文件
│   └── main.tsx       # 入口文件
├── index.html         # HTML模板
├── package.json       # 项目配置
├── vite.config.ts     # Vite配置
└── tsconfig.json      # TypeScript配置
```

## 🔌 Mastra服务接口

前端会调用以下API接口：

```typescript
// POST /api/word-teacher
{
  "word": "hello",
  "style": "conversational", 
  "level": "intermediate"
}
```

期望响应格式请参考 `src/services/api.ts` 中的类型定义。

## 🎮 使用方法

1. 在输入框输入任何英文单词
2. 选择你喜欢的教学风格
3. 选择学习级别  
4. 点击"开始学习"
5. 查看AI生成的教学内容

## 🔍 故障排除

### 前端启动失败
- 检查Node.js版本 (需要18+)
- 删除node_modules重新安装依赖

### 无法连接4111端口
- 确认Mastra服务正在4111端口运行
- 检查浏览器控制台的网络请求
- 确认API接口路径正确

### 界面显示异常
- 清除浏览器缓存
- 检查浏览器控制台错误信息

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License