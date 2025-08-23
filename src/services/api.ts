// API 服务 - 支持开发和生产环境

export interface WordRequest {
  word: string;
  style: 'humorous' | 'serious' | 'vivid' | 'simple' | 'detailed';
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface WordTeacherResponse {
  word: string;
  style: string;
  content: string; // Mastra 返回的 Markdown 格式教学内容
  timestamp: string;
  success: boolean;
  error?: string;
}

class WordTeacherAPI {
  private baseURL: string;

  constructor() {
    // 支持环境变量配置，默认为开发环境
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4111';
    console.log('🔗 API Base URL:', this.baseURL);
  }

  /**
   * 调用 Mastra 服务学习单词
   */
  async teachWord(request: WordRequest): Promise<WordTeacherResponse> {
    try {
      console.log('🔗 正在调用 Mastra 服务...', { baseURL: this.baseURL, request });
      
      // 构建教学风格的中文描述
      const styleMap = {
        humorous: '幽默',
        serious: '严肃',
        vivid: '生动',
        simple: '简单',
        detailed: '详细'
      };
      
      const styleText = styleMap[request.style] || '生动';
      
      // 使用正确的 Mastra API 端点：/api/agents/wordTeacher/generate
      const response = await fetch(`${this.baseURL}/api/agents/wordTeacher/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `请用${styleText}的方式教我单词 ${request.word}`
          }]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Mastra服务响应错误: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Mastra服务响应成功:', data);
      
      // 转换 Mastra 响应格式为前端需要的格式
      const result: WordTeacherResponse = {
        word: request.word,
        style: request.style,
        content: data.text || data.content || data.response || data, // 兼容不同的响应格式
        timestamp: new Date().toISOString(),
        success: true
      };
      
      return result;
    } catch (error) {
      console.error('❌ 调用Mastra服务失败:', error);
      
      // 根据环境决定是否返回演示数据
      if (import.meta.env.DEV) {
        return this.getMockResponse(request);
      } else {
        throw new Error(`无法连接到服务器: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    }
  }

  /**
   * 演示数据 - 仅在开发环境使用
   */
  private getMockResponse(request: WordRequest): WordTeacherResponse {
    const env = import.meta.env.VITE_APP_ENV || 'development';
    
    const mockContent = `# 单词教学：${request.word} (${env}环境演示)\n\n## 基础信息\n- **拼写**: ${request.word}\n- **教学风格**: ${request.style}\n- **环境**: ${env}\n- **API地址**: ${this.baseURL}\n\n## 🔧 连接提示\n当前为演示模式，请确保：\n1. 你的 Mastra 后端服务正在运行\n2. 服务运行在 ${this.baseURL}\n3. 检查网络连接和跨域设置\n\n## 环境变量配置\n\`\`\`bash\n# 开发环境\nVITE_API_BASE_URL=http://localhost:4111\n\n# 生产环境\nVITE_API_BASE_URL=https://api.lkkblog7.top\n\`\`\`\n\n## 真实功能\n连接到 Mastra 服务后，你将获得：\n- 🎭 ${request.style}风格的教学内容\n- 📖 完整的单词解释和例句\n- 🧠 智能记忆技巧\n- ✨ AI 生成的个性化内容\n\n## 快速检查\n在浏览器中访问：${this.baseURL}`;

    return {
      word: request.word,
      style: request.style,
      content: mockContent,
      timestamp: new Date().toISOString(),
      success: true
    };
  }

  /**
   * 检查 Mastra 服务状态
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      // 使用正确的 Mastra API 端点进行健康检查
      const response = await fetch(`${this.baseURL}/api/agents/wordTeacher/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: '测试连接'
          }]
        }),
      });
      
      if (response.ok) {
        return { 
          status: 'online', 
          message: `✅ Mastra服务正常运行 (${this.baseURL})` 
        };
      } else {
        return { 
          status: 'error', 
          message: `⚠️ Mastra服务响应异常 (${response.status})` 
        };
      }
    } catch {
      const env = import.meta.env.VITE_APP_ENV || 'development';
      return { 
        status: 'offline', 
        message: `🔌 无法连接Mastra服务 (${this.baseURL})${env === 'development' ? '，当前使用演示模式' : ''}` 
      };
    }
  }

  /**
   * 获取当前 API 配置信息
   */
  getConfig() {
    return {
      baseURL: this.baseURL,
      environment: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    };
  }
}

// 导出API实例
export const wordTeacherAPI = new WordTeacherAPI();