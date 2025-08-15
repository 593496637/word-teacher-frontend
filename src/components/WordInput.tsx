import React, { useState } from 'react';
import { WordRequest } from '../services/api';

interface WordInputProps {
  onSubmit: (request: WordRequest) => void;
  loading: boolean;
}

const TEACHING_STYLES = [
  { value: 'conversational', label: '🗣️ 对话式', description: '轻松聊天的方式' },
  { value: 'humorous', label: '😄 幽默式', description: '风趣有趣的教学' },
  { value: 'storytelling', label: '📚 故事式', description: '通过故事学习' },
  { value: 'serious', label: '🎓 严谨式', description: '专业权威的解释' },
  { value: 'academic', label: '🔬 学术式', description: '深度学术分析' },
] as const;

const LEARNING_LEVELS = [
  { value: 'beginner', label: '🌱 初学者', description: '简单易懂' },
  { value: 'intermediate', label: '🌲 中级', description: '适中难度' },
  { value: 'advanced', label: '🌳 高级', description: '复杂分析' },
] as const;

export const WordInput: React.FC<WordInputProps> = ({ onSubmit, loading }) => {
  const [word, setWord] = useState('');
  const [style, setStyle] = useState<WordRequest['style']>('conversational');
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

  return (
    <div className="word-input-container">
      <div className="word-input-card">
        <h2 className="word-input-title">🎯 每日单词老师</h2>
        <p className="word-input-subtitle">连接本地Mastra服务，获得AI生成的个性化学习内容</p>
        
        <form onSubmit={handleSubmit} className="word-input-form">
          <div className="input-group">
            <label htmlFor="word" className="input-label">
              要学习的单词
            </label>
            <input
              id="word"
              type="text"
              value={word}
              onChange={handleWordChange}
              placeholder="例如: serendipity"
              className={`word-input ${error ? 'error' : ''}`}
              disabled={loading}
              autoComplete="off"
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="input-group">
            <label className="input-label">教学风格</label>
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
            <label className="input-label">学习级别</label>
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
                正在调用Mastra服务...
              </>
            ) : (
              <>
                <span>🚀</span>
                开始学习
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};