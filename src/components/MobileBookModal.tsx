import { useEffect, useState } from 'react'
import { useBookStore } from '@/store/bookStore'

// 诊断版移动端BookModal
export default function MobileBookModal() {
  const { selectedBook, isModalOpen, closeBookModal } = useBookStore()
  const [markdownContent, setMarkdownContent] = useState('')

  useEffect(() => {
    if (selectedBook && isModalOpen) {
      console.log('MobileBookModal: 开始加载', selectedBook.title)
      fetch(selectedBook.markdownPath)
        .then(response => response.text())
        .then(content => {
          setMarkdownContent(content)
          console.log('MobileBookModal: 加载成功')
        })
        .catch(error => {
          console.error('MobileBookModal: 加载失败', error)
          setMarkdownContent('加载失败')
        })
    }
  }, [selectedBook, isModalOpen])

  console.log('MobileBookModal渲染:', { selectedBook: selectedBook?.title, isModalOpen })

  return (
    <div className="md:hidden">
      {/* 永远显示的组件状态指示器 */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 10002,
          backgroundColor: 'green',
          color: 'white',
          padding: '5px',
          fontSize: '12px',
          border: '2px solid white'
        }}
      >
        📱 MobileBookModal已渲染<br/>
        selectedBook: {selectedBook?.title || 'null'}<br/>
        isModalOpen: {isModalOpen ? 'true' : 'false'}
      </div>

      {/* 条件显示的模态框 */}
      {selectedBook && isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(255,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeBookModal}
        >
          <div
            style={{
              backgroundColor: 'yellow',
              border: '5px solid red',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '90vw',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 style={{ fontSize: '24px', color: 'red', textAlign: 'center' }}>
              🔥 移动端模态框测试 🔥
            </h1>

            <button
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '10px'
              }}
              onClick={closeBookModal}
            >
              关闭
            </button>

            <div style={{ marginTop: '20px' }}>
              <h2>书籍: {selectedBook?.title}</h2>
              <div style={{ marginTop: '10px', maxHeight: '300px', overflow: 'auto' }}>
                {markdownContent || '正在加载...'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
