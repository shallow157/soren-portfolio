import { useEffect, useState } from 'react'
import { useBookStore } from '@/store/bookStore'

// 简化版移动端BookModal - 专门解决移动端显示问题
export default function MobileBookModal() {
  const { selectedBook, isModalOpen, closeBookModal } = useBookStore()
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(false)

  // 加载Markdown内容
  useEffect(() => {
    if (selectedBook && isModalOpen) {
      console.log('MobileBookModal: 开始加载内容', selectedBook.title)
      setLoading(true)
      fetch(selectedBook.markdownPath)
        .then(response => response.text())
        .then(content => {
          setMarkdownContent(content)
          setLoading(false)
          console.log('MobileBookModal: 内容加载成功')
        })
        .catch(error => {
          console.error('MobileBookModal: 加载失败', error)
          setMarkdownContent('加载失败，请稍后重试。')
          setLoading(false)
        })
    }
  }, [selectedBook, isModalOpen])

  // 如果没有选中书籍，不渲染
  if (!selectedBook) {
    console.log('MobileBookModal: selectedBook为空')
    return null
  }

  console.log('MobileBookModal渲染:', { 
    selectedBook: selectedBook.title, 
    isModalOpen,
    hasContent: !!markdownContent 
  })

  // 只在移动端显示，且模态框打开时显示
  if (!isModalOpen) {
    console.log('MobileBookModal: isModalOpen为false')
    return null
  }

  return (
    <div className="md:hidden">
      {/* 强制显示的测试模态框 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px'
        }}
        onClick={closeBookModal}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '95vw',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={closeBookModal}
          >
            ×
          </button>

          {/* 书籍信息 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', paddingRight: '40px' }}>
            <img 
              src={selectedBook.coverUrl} 
              alt={selectedBook.title}
              style={{ 
                width: '80px', 
                height: '110px', 
                objectFit: 'cover', 
                marginRight: '15px', 
                borderRadius: '6px' 
              }}
            />
            <div>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '8px', 
                color: '#333',
                lineHeight: '1.3'
              }}>
                📖 {selectedBook.title}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedBook.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* 内容区域 */}
          <div style={{ 
            maxHeight: '400px', 
            overflow: 'auto', 
            padding: '10px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '8px' 
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '14px', color: '#666' }}>加载读书笔记中...</div>
              </div>
            ) : (
              <div style={{ 
                fontSize: '14px', 
                lineHeight: '1.6', 
                color: '#333', 
                whiteSpace: 'pre-wrap' 
              }}>
                {markdownContent || '暂无读书笔记内容'}
              </div>
            )}
          </div>

          {/* 调试信息 */}
          <div style={{ 
            marginTop: '10px', 
            padding: '8px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            fontSize: '12px',
            color: '#1976d2'
          }}>
            📱 移动端模态框 | 书籍: {selectedBook.title} | 内容长度: {markdownContent.length}
          </div>
        </div>
      </div>
    </div>
  )
}
