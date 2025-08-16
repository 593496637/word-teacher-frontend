import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist',
    // 生成源映射
    sourcemap: false,
    // 清理输出目录
    emptyOutDir: true,
    // 构建优化
    rollupOptions: {
      output: {
        // 代码分割
        manualChunks: {
          vendor: ['react', 'react-dom'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight', 'rehype-raw']
        }
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console.log
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // 开发服务器配置
  server: {
    port: 5173,
    host: true,
    // 代理配置（开发环境）
    proxy: {
      '/api': {
        target: 'http://localhost:4111',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // 预览服务器配置
  preview: {
    port: 4173,
    host: true
  },
  
  // 环境变量配置
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  
  // 静态资源处理
  assetsInclude: ['**/*.md'],
  
  // 别名配置
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
