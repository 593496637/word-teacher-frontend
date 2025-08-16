import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import '../markdown-enhanced.css'; // 导入增强样式

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * 增强的 Markdown 渲染器组件
 * 
 * 功能特性：
 * - 支持 GitHub Flavored Markdown (GFM)
 * - 代码语法高亮
 * - 自定义样式组件
 * - 表格、列表、引用等增强样式
 * - 响应式设计
 * - 任务列表支持
 * - 图片懒加载
 * - 外部链接安全处理
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = "enhanced-markdown" 
}) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 增强的标题组件
          h1: ({ children, ...props }) => (
            <h1 className="markdown-h1-enhanced" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="markdown-h2-enhanced" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="markdown-h3-enhanced" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="markdown-h4-enhanced" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="markdown-h5-enhanced" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="markdown-h6-enhanced" {...props}>
              {children}
            </h6>
          ),

          // 增强的段落组件
          p: ({ children, ...props }) => (
            <p className="markdown-p-enhanced" {...props}>
              {children}
            </p>
          ),

          // 增强的列表组件
          ul: ({ children, ...props }) => (
            <ul className="markdown-ul-enhanced" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="markdown-ol-enhanced" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="markdown-li-enhanced" {...props}>
              {children}
            </li>
          ),

          // 增强的强调组件
          strong: ({ children, ...props }) => (
            <strong className="markdown-strong-enhanced" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="markdown-em-enhanced" {...props}>
              {children}
            </em>
          ),

          // 增强的代码组件
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !match;
            
            if (isInline) {
              return (
                <code className="markdown-code-inline" {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <div className="code-block-wrapper" data-language={language}>
                <code className={`hljs ${className}`} {...props}>
                  {children}
                </code>
                {language && (
                  <span className="language-label">{language.toUpperCase()}</span>
                )}
              </div>
            );
          },

          // 增强的预格式化代码块
          pre: ({ children, ...props }) => (
            <pre className="markdown-pre-enhanced" {...props}>
              {children}
            </pre>
          ),

          // 增强的引用组件
          blockquote: ({ children, ...props }) => (
            <blockquote className="markdown-blockquote-enhanced" {...props}>
              {children}
            </blockquote>
          ),

          // 增强的表格组件
          table: ({ children, ...props }) => (
            <div className="markdown-table-wrapper">
              <table className="markdown-table-enhanced" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="markdown-thead-enhanced" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="markdown-tbody-enhanced" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="markdown-tr-enhanced" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="markdown-th-enhanced" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="markdown-td-enhanced" {...props}>
              {children}
            </td>
          ),

          // 增强的链接组件
          a: ({ children, href, ...props }) => (
            <a 
              className="markdown-link-enhanced" 
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),

          // 增强的图片组件
          img: ({ src, alt, ...props }) => (
            <div className="markdown-img-wrapper">
              <img 
                className="markdown-img-enhanced" 
                src={src} 
                alt={alt}
                loading="lazy"
                {...props}
              />
              {alt && <figcaption className="markdown-img-caption">{alt}</figcaption>}
            </div>
          ),

          // 增强的分隔线组件
          hr: ({ ...props }) => (
            <hr className="markdown-hr-enhanced" {...props} />
          ),

          // 删除线组件
          del: ({ children, ...props }) => (
            <del className="markdown-del-enhanced" {...props}>
              {children}
            </del>
          ),

          // 任务列表项（GFM 扩展）
          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  className="markdown-checkbox-enhanced"
                  checked={checked}
                  readOnly
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
