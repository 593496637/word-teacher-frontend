import React, { useState, useEffect } from 'react';
import { WordInput } from './components/WordInput';
import { wordTeacherAPI, WordRequest, WordTeacherResponse } from './services/api';
import './App.css';

// Markdown 渲染组件（简化版）
const MarkdownDisplay: React.FC<{ content: string }> = ({ content }) => {
  // 简单的 Markdown 解析和渲染
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // 标题处理
        if (line.startsWith('# ')) {
          return <h1 key={index} className="markdown-h1">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="markdown-h2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="markdown-h3">{line.substring(4)}</h3>;
        }
        
        // 列表处理
        if (line.startsWith('- ')) {
          return <li key={index} className="markdown-li">{line.substring(2)}</li>;
        }
        
        // 粗体处理
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 空行处理
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // 普通段落
        return (
          <p 
            key={index} 
            className="markdown-p"
            dangerouslySetInnerHTML={{ __html: boldText }}
          />
        );
      });
  };

  return <div className="markdown-content">{renderMarkdown(content)}</div>;
};

// 单词显示组件
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
      <MarkdownDisplay content={data.content} />
    </div>
    
    <div className="word-footer">
      <p className="timestamp">生成时间: {new Date(data.timestamp).toLocaleString('zh-CN')}</p>
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
      const response = await wordTeacherAPI.teachWord(request);
      setWordData(response);
      setState('display');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
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
              <h2>🤖 正在连接Mastra服务</h2>
              <p className="loading-text">正在调用4111端口获取AI生成的教学内容...</p>
              <div className="loading-details">
                <p>🔗 连接地址: http://localhost:4111</p>
                <p>🎯 API路径: /api/agents/wordTeacher/generate</p>
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
                  <li>确认防火墙没有阻止4111端口</li>
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
          📱 纯前端React界面 | 
          🤖 OpenAI GPT-4o-mini 驱动
        </p>
      </footer>
    </div>
  );
}

export default App;
