import React, { useState, useEffect } from 'react';
import { WordInput } from './components/WordInput';
import { wordTeacherAPI, WordRequest, WordTeacherResponse } from './services/api';
import './App.css';

// 简化版显示组件
const SimpleWordDisplay: React.FC<{ data: WordTeacherResponse; onNewWord: () => void }> = ({ data, onNewWord }) => (
  <div className="word-display-container">
    <div className="word-display-header">
      <h1 className="word-title">{data.word}</h1>
      <button className="new-word-button" onClick={onNewWord}>学习新单词</button>
    </div>
    
    <div className="word-content">
      <div className="content-section">
        <h3>📝 简介</h3>
        <p>{data.enhancedContent.introduction}</p>
      </div>
      
      <div className="content-section">
        <h3>🔊 发音</h3>
        <p><strong>{data.enhancedContent.pronunciation.guide}</strong></p>
        <p>{data.enhancedContent.pronunciation.tips}</p>
      </div>
      
      <div className="content-section">
        <h3>📚 含义</h3>
        {data.enhancedContent.meanings.map((meaning, index) => (
          <div key={index} className="meaning-item">
            <h4>{meaning.partOfSpeech}</h4>
            <p>{meaning.explanation}</p>
            {meaning.examples.length > 0 && (
              <ul>
                {meaning.examples.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <div className="content-section">
        <h3>✨ 总结</h3>
        <p>{data.enhancedContent.summary}</p>
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
            </div>
          </div>
        );
        
      case 'display':
        return wordData ? <SimpleWordDisplay data={wordData} onNewWord={handleNewWord} /> : null;
        
      case 'error':
        return (
          <div className="error-container">
            <div className="error-card">
              <div className="error-icon">😔</div>
              <h2>连接遇到问题</h2>
              <p className="error-message">{error}</p>
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
        <p>连接本地4111端口Mastra服务 | 纯前端React界面</p>
      </footer>
    </div>
  );
}

export default App;