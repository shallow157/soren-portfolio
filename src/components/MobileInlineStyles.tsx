import React from 'react'

// 移动端内联样式组件 - 专门解决外部CSS文件加载失败问题
const MobileInlineStyles: React.FC = () => {
  return (
    <>
      {/* 移动端完整内联样式 - 绕过所有外部CSS加载问题 */}
      <style jsx global>{`
        @media screen and (max-width: 767px) {
          
          /* CSS加载失败诊断 */
          .css-load-failed {
            background-color: #f44336 !important;
            color: white !important;
            padding: 16px !important;
            border-radius: 8px !important;
            text-align: center !important;
            font-weight: bold !important;
            margin: 16px !important;
            border: 3px solid #d32f2f !important;
            font-size: 14px !important;
            display: block !important;
          }
          
          .css-load-failed::before {
            content: "❌ 外部CSS文件加载失败，已启用内联CSS应急方案" !important;
            display: block !important;
          }
          
          /* 移动端Hero区域内联样式 */
          .mobile-hero-inline {
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 20px !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            text-align: center !important;
          }
          
          .mobile-hero-content {
            max-width: 100% !important;
            padding: 20px !important;
          }
          
          .mobile-hero-title {
            font-size: 32px !important;
            font-weight: bold !important;
            margin-bottom: 16px !important;
            color: white !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
          }
          
          .mobile-hero-subtitle {
            font-size: 18px !important;
            margin-bottom: 24px !important;
            color: rgba(255,255,255,0.9) !important;
            line-height: 1.6 !important;
          }
          
          .mobile-hero-button {
            display: inline-block !important;
            padding: 14px 28px !important;
            background-color: #ffffff !important;
            color: #667eea !important;
            border: none !important;
            border-radius: 25px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            margin: 8px !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
            transition: all 0.3s ease !important;
          }
          
          .mobile-hero-button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
          }
          
          /* 移动端导航内联样式 */
          .mobile-nav-inline {
            background-color: #ffffff !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            padding: 16px !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
          }
          
          .mobile-nav-brand {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #333333 !important;
            text-align: center !important;
            margin-bottom: 16px !important;
          }
          
          .mobile-nav-menu {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          
          .mobile-nav-link {
            display: block !important;
            padding: 12px 16px !important;
            color: #333333 !important;
            text-decoration: none !important;
            border-radius: 8px !important;
            font-weight: 500 !important;
            text-align: center !important;
            background-color: #f8f9fa !important;
            transition: all 0.2s ease !important;
          }
          
          .mobile-nav-link:hover {
            background-color: #e9ecef !important;
            color: #007bff !important;
          }
          
          /* 移动端卡片内联样式 */
          .mobile-card-inline {
            background-color: #ffffff !important;
            border-radius: 16px !important;
            padding: 24px !important;
            margin: 16px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
            border: 1px solid #e9ecef !important;
          }
          
          .mobile-card-title {
            font-size: 20px !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 12px !important;
          }
          
          .mobile-card-text {
            font-size: 16px !important;
            color: #666666 !important;
            line-height: 1.6 !important;
            margin-bottom: 16px !important;
          }
          
          .mobile-card-button {
            display: inline-block !important;
            padding: 10px 20px !important;
            background-color: #007bff !important;
            color: white !important;
            border: none !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            text-decoration: none !important;
            cursor: pointer !important;
          }
          
          /* 移动端网格内联样式 */
          .mobile-grid-inline {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          
          .mobile-grid-2 {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          
          /* 移动端表单内联样式 */
          .mobile-form-inline {
            background-color: #ffffff !important;
            padding: 24px !important;
            border-radius: 12px !important;
            margin: 16px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
          }
          
          .mobile-form-title {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 20px !important;
            text-align: center !important;
          }
          
          .mobile-form-group {
            margin-bottom: 20px !important;
          }
          
          .mobile-form-label {
            display: block !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            color: #333333 !important;
            margin-bottom: 8px !important;
          }
          
          .mobile-form-input {
            width: 100% !important;
            padding: 14px 16px !important;
            border: 2px solid #e9ecef !important;
            border-radius: 8px !important;
            font-size: 16px !important;
            background-color: #ffffff !important;
            transition: border-color 0.2s ease !important;
          }
          
          .mobile-form-input:focus {
            outline: none !important;
            border-color: #007bff !important;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25) !important;
          }
          
          .mobile-form-button {
            width: 100% !important;
            padding: 16px !important;
            background-color: #007bff !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: background-color 0.2s ease !important;
          }
          
          .mobile-form-button:hover {
            background-color: #0056b3 !important;
          }
          
          /* 移动端页脚内联样式 */
          .mobile-footer-inline {
            background-color: #343a40 !important;
            color: white !important;
            padding: 32px 16px !important;
            text-align: center !important;
            margin-top: 40px !important;
          }
          
          .mobile-footer-text {
            font-size: 14px !important;
            color: rgba(255,255,255,0.8) !important;
            margin-bottom: 16px !important;
          }
          
          .mobile-footer-links {
            display: flex !important;
            justify-content: center !important;
            gap: 20px !important;
            margin-bottom: 20px !important;
          }
          
          .mobile-footer-link {
            color: rgba(255,255,255,0.8) !important;
            text-decoration: none !important;
            font-size: 14px !important;
          }
          
          .mobile-footer-link:hover {
            color: white !important;
          }
          
          /* 移动端动画内联样式 */
          .mobile-fade-in {
            animation: mobileFadeIn 0.6s ease-out !important;
          }
          
          @keyframes mobileFadeIn {
            from {
              opacity: 0 !important;
              transform: translateY(20px) !important;
            }
            to {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
          }
          
          .mobile-slide-up {
            animation: mobileSlideUp 0.8s ease-out !important;
          }
          
          @keyframes mobileSlideUp {
            from {
              opacity: 0 !important;
              transform: translateY(40px) !important;
            }
            to {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
          }
          
          /* 移动端滚动优化 */
          .mobile-scroll-container {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            max-height: 70vh !important;
          }
          
          /* 移动端响应式图片 */
          .mobile-responsive-img {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
            border-radius: 12px !important;
            margin-bottom: 20px !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
          }

          /* 移动端技能标签样式 */
          .mobile-skills-container {
            padding: 20px !important;
            background-color: #ffffff !important;
            border-radius: 16px !important;
            margin: 16px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
          }

          .mobile-skills-title {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 20px !important;
            text-align: center !important;
          }

          .mobile-skills-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
            margin-bottom: 20px !important;
          }

          .mobile-skills-grid-3 {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 8px !important;
          }

          .mobile-skill-tag {
            display: inline-block !important;
            padding: 8px 12px !important;
            background-color: #e3f2fd !important;
            color: #1976d2 !important;
            border-radius: 20px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            text-align: center !important;
            border: 1px solid #bbdefb !important;
            transition: all 0.2s ease !important;
          }

          .mobile-skill-tag:hover {
            background-color: #1976d2 !important;
            color: white !important;
            transform: translateY(-1px) !important;
          }

          .mobile-skill-tag.python {
            background-color: #fff3e0 !important;
            color: #f57c00 !important;
            border-color: #ffcc02 !important;
          }

          .mobile-skill-tag.ml {
            background-color: #f3e5f5 !important;
            color: #7b1fa2 !important;
            border-color: #ce93d8 !important;
          }

          .mobile-skill-tag.web {
            background-color: #e8f5e8 !important;
            color: #388e3c !important;
            border-color: #a5d6a7 !important;
          }

          .mobile-skill-tag.tool {
            background-color: #fce4ec !important;
            color: #c2185b !important;
            border-color: #f8bbd9 !important;
          }

          /* 移动端项目卡片样式 */
          .mobile-projects-container {
            padding: 20px !important;
            background-color: #ffffff !important;
            border-radius: 16px !important;
            margin: 16px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
          }

          .mobile-project-card {
            background-color: #f8f9fa !important;
            border-radius: 12px !important;
            padding: 16px !important;
            margin-bottom: 16px !important;
            border: 1px solid #e9ecef !important;
          }

          .mobile-project-title {
            font-size: 18px !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 8px !important;
          }

          .mobile-project-desc {
            font-size: 14px !important;
            color: #666666 !important;
            line-height: 1.5 !important;
            margin-bottom: 12px !important;
          }

          .mobile-project-tags {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }

          .mobile-project-tag {
            padding: 4px 8px !important;
            background-color: #e3f2fd !important;
            color: #1976d2 !important;
            border-radius: 12px !important;
            font-size: 10px !important;
            font-weight: 500 !important;
          }

          /* 移动端图书馆样式 */
          .mobile-library-container {
            padding: 20px !important;
            background-color: #ffffff !important;
            border-radius: 16px !important;
            margin: 16px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
          }

          .mobile-library-title {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #333333 !important;
            margin-bottom: 20px !important;
            text-align: center !important;
          }

          .mobile-books-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }

          .mobile-book-card {
            background-color: #f8f9fa !important;
            border-radius: 12px !important;
            padding: 16px !important;
            text-align: center !important;
            border: 1px solid #e9ecef !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
          }

          .mobile-book-card:hover {
            background-color: #e9ecef !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
          }

          .mobile-book-cover {
            width: 60px !important;
            height: 80px !important;
            background-color: #007bff !important;
            border-radius: 6px !important;
            margin: 0 auto 12px auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 12px !important;
            font-weight: bold !important;
          }

          .mobile-book-title {
            font-size: 14px !important;
            font-weight: 600 !important;
            color: #333333 !important;
            margin-bottom: 4px !important;
            line-height: 1.3 !important;
          }

          .mobile-book-author {
            font-size: 12px !important;
            color: #666666 !important;
          }

          /* 移动端段落间距优化 */
          .mobile-section {
            margin-bottom: 32px !important;
          }

          .mobile-section:last-child {
            margin-bottom: 0 !important;
          }
          
        }
      `}</style>
    </>
  )
}

export default MobileInlineStyles
