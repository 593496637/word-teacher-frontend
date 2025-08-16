// API 服务 - 连接本地4111端口Mastra服务

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
    // 连接本地4111端口Mastra服务
    this.baseURL = 'http://localhost:4111';
  }

  /**
   * 调用4111端口Mastra服务学习单词
   */
  async teachWord(request: WordRequest): Promise<WordTeacherResponse> {
    try {
      console.log('🔗 正在调用4111端口Mastra服务...', request);
      
      // 构建教学风格的中文描述
      const styleMap = {
        humorous: '幽默',
        serious: '严肃',
        vivid: '生动',
        simple: '简单',
        detailed: '详细'
      };
      
      const styleText = styleMap[request.style] || '生动';
      
      // 调用正确的 Mastra API 接口
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
        throw new Error(`Mastra服务响应错误: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Mastra服务响应成功:', data);
      
      // 转换 Mastra 响应格式为前端需要的格式
      const result: WordTeacherResponse = {
        word: request.word,
        style: request.style,
        content: data.text, // Mastra 返回的教学内容
        timestamp: new Date().toISOString(),
        success: true
      };
      
      return result;
    } catch (error) {
      console.error('❌ 调用Mastra服务失败:', error);
      
      // 返回演示数据
      return this.getMockResponse(request);
    }
  }

  /**
   * 演示数据 - 当4111端口服务不可用时使用
   */
  private getMockResponse(request: WordRequest): WordTeacherResponse {
    const mockContent = `# 单词教学：${request.word} (演示模式)

## 基础信息
- **拼写**: ${request.word}
- **教学风格**: ${request.style}
- **状态**: 演示模式

## 🔧 连接提示
当前为演示模式，请确保：
1. 你的 Mastra 后端服务正在运行 (\`npm run dev\`)
2. 服务运行在 http://localhost:4111
3. 检查网络连接和跨域设置

## 真实功能
连接到 Mastra 服务后，你将获得：
- 🎭 ${request.style}风格的教学内容
- 📖 完整的单词解释和例句
- 🧠 智能记忆技巧
- ✨ AI 生成的个性化内容

## 快速检查
在浏览器中访问：http://localhost:4111
`;

    return {
      word: request.word,
      style: request.style,
      content: mockContent,
      timestamp: new Date().toISOString(),
      success: true
    };
  }

  /**
   * 检查4111端口Mastra服务状态
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      // 尝试访问 Mastra 服务的健康检查接口
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
        return { status: 'online', message: '✅ 4111端口Mastra服务正常运行' };
      } else {
        return { status: 'error', message: '⚠️ 4111端口Mastra服务响应异常' };
      }
    } catch (error) {
      return { 
        status: 'offline', 
        message: '🔌 无法连接4111端口Mastra服务，当前使用演示模式' 
      };
    }
  }
}

// 导出API实例
export const wordTeacherAPI = new WordTeacherAPI();
