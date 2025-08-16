import React, { useState } from 'react';
import { WordRequest } from '../services/api';

interface WordInputProps {
  onSubmit: (request: WordRequest) => void;
  loading: boolean;
}

// 更新教学风格，匹配后端 Mastra 服务
const TEACHING_STYLES = [
  { value: 'humorous', label: '😄 幽默式', description: '风趣有趣的教学，用笑话和有趣例子' },
  { value: 'serious', label: '🎓 严肃式', description: '学术严谨，注重准确性' },
  { value: 'vivid', label: '🎨 生动式', description: '形象比喻，善用故事记忆' },
  { value: 'simple', label: '🌱 简单式', description: '通俗易懂，朴实语言' },
  { value: 'detailed', label: '🔬 详细式', description: '深入分析，多角度解释' },
] as const;

const LEARNING_LEVELS = [
  { value: 'beginner', label: '🌱 初学者', description: '简单易懂' },
  { value: 'intermediate', label: '🌲 中级', description: '适中难度' },
  { value: 'advanced', label: '🌳 高级', description: '复杂分析' },
] as const;

export const WordInput: React.FC<WordInputProps> = ({ onSubmit, loading }) => {
  const [word, setWord] = useState('');
  const [style, setStyle] = useState<WordRequest['style']>('vivid'); // 默认生动风格
  const [level, setLevel] = useState<WordRequest['level']>('intermediate');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedWord = word.trim();
    if (!trimmedWord) {
      setError('请输入一个单词');
      return;
    }
    
    if (!/^[a-zA-Z'-]+$/.test(trimmedWord)) {
      setError('请输入有效的英文单词');
      return;
    }
    
    if (trimmedWord.length > 50) {
      setError('单词长度不能超过50个字符');
      return;
    }
    
    setError('');
    onSubmit({
      word: trimmedWord.toLowerCase(),
      style,
      level,
    });
  };

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    if (error) setError('');
  };

  const handleQuickStart = (quickWord: string) => {
    setWord(quickWord);
    setError('');
  };

  return (
    <div className="word-input-container">
      <div className="word-input-card">
        <div className="word-input-header">
          <h2 className="word-input-title">📚 每日单词老师</h2>
          <p className="word-input-subtitle">
            连接本地4111端口Mastra服务，获得GPT-4o-mini生成的个性化教学内容
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="word-input-form">
          <div className="input-group">
            <label htmlFor="word" className="input-label">
              💭 要学习的单词
            </label>
            <input
              id="word"
              type="text"
              value={word}
              onChange={handleWordChange}
              placeholder="例如: serendipity, adventure, innovation..."
              className={`word-input ${error ? 'error' : ''}`}
              disabled={loading}
              autoComplete="off"
              autoFocus
            />
            {error && <span className="error-message">{error}</span>}
            
            {/* 快速开始选项 */}
            <div className="quick-start">
              <span className="quick-start-label">🚀 快速开始:</span>
              <div className="quick-words">
                {['serendipity', 'adventure', 'innovation', 'resilience'].map((quickWord) => (
                  <button
                    key={quickWord}
                    type="button"
                    className="quick-word-btn"
                    onClick={() => handleQuickStart(quickWord)}
                    disabled={loading}
                  >
                    {quickWord}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">🎭 教学风格 (匹配Mastra后端)</label>
            <div className="style-grid">
              {TEACHING_STYLES.map((styleOption) => (
                <label
                  key={styleOption.value}
                  className={`style-option ${style === styleOption.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="style"
                    value={styleOption.value}
                    checked={style === styleOption.value}
                    onChange={(e) => setStyle(e.target.value as WordRequest['style'])}
                    disabled={loading}
                  />
                  <div className="style-content">
                    <span className="style-label">{styleOption.label}</span>
                    <span className="style-description">{styleOption.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">📊 学习级别</label>
            <div className="level-selector">
              {LEARNING_LEVELS.map((levelOption) => (
                <label
                  key={levelOption.value}
                  className={`level-option ${level === levelOption.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={levelOption.value}
                    checked={level === levelOption.value}
                    onChange={(e) => setLevel(e.target.value as WordRequest['level'])}
                    disabled={loading}
                  />
                  <div className="level-content">
                    <span className="level-label">{levelOption.label}</span>
                    <span className="level-description">{levelOption.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !word.trim()}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                连接Mastra服务中...
              </>
            ) : (
              <>
                <span>🚀</span>
                开始AI教学
              </>
            )}
          </button>
        </form>

        <div className="connection-info">
          <p className="connection-text">
            🔗 API地址: <code>http://localhost:4111/api/agents/wordTeacher/generate</code>
          </p>
          <p className="connection-text">
            🤖 AI模型: OpenAI GPT-4o-mini
          </p>
        </div>
      </div>
    </div>
  );
};
