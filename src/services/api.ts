// API 服务 - 连接本地4111端口Mastra服务

export interface WordRequest {
  word: string;
  style: 'humorous' | 'serious' | 'storytelling' | 'conversational' | 'academic';
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface WordTeacherResponse {
  word: string;
  style: string;
  enhancedContent: {
    introduction: string;
    pronunciation: {
      guide: string;
      tips: string;
    };
    meanings: Array<{
      partOfSpeech: string;
      explanation: string;
      examples: string[];
      memoryTricks: string[];
    }>;
    usage: {
      commonPhrases: string[];
      situations: string[];
    };
    funFacts?: string[];
    summary: string;
  };
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
      
      const response = await fetch(`${this.baseURL}/api/word-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Mastra服务响应错误: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Mastra服务响应成功:', data);
      
      return data;
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
    return {
      word: request.word,
      style: request.style,
      enhancedContent: {
        introduction: `欢迎学习单词 "${request.word}"！当前为演示模式，请启动你的4111端口Mastra服务以获得真实的AI教学内容。`,
        pronunciation: {
          guide: `/${request.word}/`,
          tips: '请启动4111端口Mastra服务获得真实发音指导'
        },
        meanings: [{
          partOfSpeech: '演示模式',
          explanation: `这是 "${request.word}" 的演示内容。连接4111端口获得真实的${request.style}风格教学。`,
          examples: [`This is a demo example for "${request.word}".`],
          memoryTricks: ['启动你的Mastra服务以获得真实的记忆技巧!']
        }],
        usage: {
          commonPhrases: ['demo phrase'],
          situations: ['在Mastra服务运行时使用']
        },
        funFacts: ['🔧 这是演示模式，启动4111端口Mastra服务获得有趣的知识!'],
        summary: `单词 "${request.word}" 的学习总结 - 演示模式，请启动Mastra服务体验完整功能。`
      },
      timestamp: new Date().toISOString(),
      success: true
    };
  }

  /**
   * 检查4111端口Mastra服务状态
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
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