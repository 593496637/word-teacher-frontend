import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { WordInput } from './components/WordInput';
import { wordTeacherAPI, WordRequest, WordTeacherResponse } from './services/api';
import './App.css';

// 专业 Markdown 渲染组件
const EnhancedMarkdownDisplay: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="enhanced-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 自定义标题样式
          h1: ({ children }) => (
            <h1 className="markdown-h1-enhanced">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="markdown-h2-enhanced">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="markdown-h3-enhanced">{children}</h3>
          ),
          // 自定义段落样式
          p: ({ children }) => (
            <p className="markdown-p-enhanced">{children}</p>
          ),
          // 自定义列表样式
          ul: ({ children }) => (
            <ul className="markdown-ul-enhanced">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="markdown-ol-enhanced">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="markdown-li-enhanced">{children}</li>
          ),
          // 自定义强调样式
          strong: ({ children }) => (
            <strong className="markdown-strong-enhanced">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="markdown-em-enhanced">{children}</em>
          ),
          // 自定义代码样式
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="markdown-code-inline">{children}</code>
            ) : (
              <code className={`markdown-code-block ${className}`}>{children}</code>
            );
          },
          // 自定义引用样式
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote-enhanced">{children}</blockquote>
          ),
          // 自定义表格样式
          table: ({ children }) => (
            <div className="markdown-table-wrapper">
              <table className="markdown-table-enhanced">{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// 单词显示组件（使用增强的 Markdown 渲染）
const WordDisplay: React.FC<{ data: WordTeacherResponse; onNewWord: () => void }> = ({ data, onNewWord }) => (
  <div className="word-display-container">
    <div className="word-display-header">
      <h1 className="word-title">{data.word}</h1>
      <div className="header-actions">
        <span className="style-badge">{data.style}风格</span>
        <button className="new-word-button" onClick={onNewWord}>学习新单词</button>
      </div>
    </div>
    
    <div className="word-content">
      <EnhancedMarkdownDisplay content={data.content} />
    </div>
    
    <div className="word-footer">
      <p className="timestamp">生成时间: {new Date(data.timestamp).toLocaleString('zh-CN')}</p>
      <div className="word-stats">
        <span className="stat-item">🤖 AI生成</span>
        <span className="stat-item">📝 Markdown格式</span>
        <span className="stat-item">🎭 {data.style}风格</span>
      </div>
    </div>
  </div>
);

type AppState = 'input' | 'loading' | 'display' | 'error';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [wordData, setWordData] = useState<WordTeacherResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const result = await wordTeacherAPI.checkHealth();
      setServerStatus(result.status === 'online' ? 'online' : 'offline');
    } catch (error) {
      setServerStatus('offline');
    }
  };

  const handleWordSubmit = async (request: WordRequest) => {
    setState('loading');
    setError('');
    
    try {
      console.log('🎯 开始学习单词:', request);
      const response = await wordTeacherAPI.teachWord(request);
      console.log('✅ 获得教学内容:', response);
      setWordData(response);
      setState('display');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      console.error('❌ 学习失败:', errorMessage);
      setError(errorMessage);
      setState('error');
    }
  };

  const handleNewWord = () => {
    setState('input');
    setWordData(null);
    setError('');
  };

  const handleRetry = () => {
    setState('input');
    setError('');
  };

  const renderContent = () => {
    switch (state) {
      case 'input':
        return <WordInput onSubmit={handleWordSubmit} loading={false} />;
        
      case 'loading':
        return (
          <div className="loading-container">
            <div className="loading-card">
              <div className="loading-spinner large"></div>
              <h2>🤖 AI老师正在准备教学内容</h2>
              <p className="loading-text">连接 Mastra 服务，调用 GPT-4o-mini 生成个性化内容...</p>
              <div className="loading-details">
                <p>🔗 API: http://localhost:4111/api/agents/wordTeacher/generate</p>
                <p>🧠 模型: OpenAI GPT-4o-mini</p>
                <p>📝 格式: Markdown</p>
              </div>
            </div>
          </div>
        );
        
      case 'display':
        return wordData ? <WordDisplay data={wordData} onNewWord={handleNewWord} /> : null;
        
      case 'error':
        return (
          <div className="error-container">
            <div className="error-card">
              <div className="error-icon">😔</div>
              <h2>连接遇到问题</h2>
              <p className="error-message">{error}</p>
              <div className="error-suggestions">
                <h3>💡 解决建议:</h3>
                <ul>
                  <li>确保 Mastra 后端服务正在运行 (<code>npm run dev</code>)</li>
                  <li>检查服务地址: <a href="http://localhost:4111" target="_blank" rel="noopener noreferrer">http://localhost:4111</a></li>
                  <li>确认 OpenAI API Key 配置正确</li>
                  <li>检查防火墙没有阻止4111端口</li>
                </ul>
              </div>
              <div className="error-actions">
                <button className="retry-button" onClick={handleRetry}>重新尝试</button>
                <button className="health-check-button" onClick={checkServerHealth}>检查服务状态</button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 每日单词老师</h1>
          <div className="server-status">
            <span className={`status-indicator ${serverStatus}`}></span>
            <span className="status-text">
              {serverStatus === 'checking' && '检查中...'}
              {serverStatus === 'online' && 'Mastra服务在线'}
              {serverStatus === 'offline' && '演示模式'}
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>
          🔗 连接本地4111端口Mastra服务 | 
          📱 React + TypeScript 前端 | 
          🤖 OpenAI GPT-4o-mini | 
          📝 React-Markdown 渲染
        </p>
      </footer>
    </div>
  );
}

export default App;
