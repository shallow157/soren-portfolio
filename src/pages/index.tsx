import Layout from '../components/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import BookshelfSection from '../components/BookshelfSection'
import SearchBar from '../components/SearchBar'
import BackToTop from '../components/BackToTop'
import KeyboardShortcutsHelp from '../components/KeyboardShortcutsHelp'
import { useKeyboardShortcuts, defaultShortcuts } from '../hooks/useKeyboardShortcuts'
export default function Home() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  // 移动端书籍模态框状态
  const [mobileBookModal, setMobileBookModal] = useState({
    isOpen: false,
    bookId: '',
    scrollY: 0
  })

  // 打开移动端书籍模态框
  const openMobileBookModal = (bookId: string) => {
    setMobileBookModal({
      isOpen: true,
      bookId,
      scrollY: 0
    })
    // 防止背景滚动
    document.body.style.overflow = 'hidden'
  }

  // 关闭移动端书籍模态框
  const closeMobileBookModal = () => {
    setMobileBookModal({
      isOpen: false,
      bookId: '',
      scrollY: 0
    })
    // 恢复背景滚动
    document.body.style.overflow = 'unset'
  }

  // 书籍数据
  const bookData: Record<string, { title: string; author: string; tags: string[]; notes: string }> = {
    vegetarian: {
      title: '素食者',
      author: '韩江',
      tags: ['女性主义', '韩国文学', '诺贝尔文学奖'],
      notes: `这是一部深刻探讨女性自主意识觉醒的作品。

## 主要思考

韩江通过英惠这个角色，展现了一个女性在父权社会中寻求自我解放的痛苦历程。素食不仅仅是饮食选择，更是对既定社会秩序的反抗。

## 印象深刻的片段

"我做了一个梦，梦见我站在一棵大树下..."

这个梦境象征着英惠内心深处对自由的渴望，对回归自然状态的向往。

## 个人感悟

这本书让我思考：
- 个体自由与社会规范的冲突
- 女性在传统社会中的处境
- 精神自由的代价

作者用极其细腻的笔触，描绘了一个女性精神世界的崩塌与重建。虽然结局令人心痛，但英惠的选择体现了对自我的坚持。`
    },
    solitude: {
      title: '百年孤独',
      author: '马尔克斯',
      tags: ['魔幻现实', '拉美文学', '家族史'],
      notes: `马尔克斯的这部巨作，用魔幻现实主义的手法，讲述了布恩迪亚家族七代人的兴衰史。

## 核心主题

孤独是这部作品的核心主题。每个人物都被困在自己的孤独中，无法真正理解和沟通。

## 写作技巧

- 循环往复的叙事结构
- 魔幻与现实的完美融合
- 象征主义的运用

## 深刻印象

"多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。"

这个开头堪称经典，时间的跳跃和回环，奠定了整部作品的基调。

## 个人思考

这本书让我明白，孤独是人类的宿命，但正是在孤独中，我们才能真正认识自己，创造属于自己的世界。`
    },
    '1984': {
      title: '1984',
      author: '乔治·奥威尔',
      tags: ['反乌托邦', '政治', '极权主义'],
      notes: `奥威尔的这部预言性作品，描绘了一个极权主义社会的恐怖图景。

## 核心概念

- **老大哥**：无处不在的监控
- **双重思想**：同时接受两个矛盾的观念
- **新话**：通过语言控制思想

## 现实意义

虽然写于1948年，但书中描述的很多现象在今天仍然具有警示意义：
- 信息监控
- 历史篡改
- 思想控制

## 经典语句

"战争即和平，自由即奴役，无知即力量。"

这句话完美诠释了极权社会的逻辑颠倒。

## 个人反思

这本书提醒我们要时刻警惕权力的滥用，保护个人自由和独立思考的能力。在信息时代，这种警醒尤为重要。`
    },
    norwegian: {
      title: '挪威的森林',
      author: '村上春树',
      tags: ['青春', '日本文学', '成长'],
      notes: `村上春树的这部青春小说，以细腻的笔触描绘了青春期的迷茫与成长。

## 故事背景

1960年代的日本，学生运动的时代背景下，主人公渡边彻的大学生活。

## 主要人物

- **渡边彻**：叙述者，理性而敏感
- **直子**：美丽而脆弱，最终选择了死亡
- **绿子**：活泼开朗，代表着生命力

## 主题探讨

### 死亡与生存
直子的死亡和绿子的生命力形成鲜明对比，象征着主人公在死亡与生存之间的选择。

### 青春的迷茫
每个人在青春期都会经历的困惑和选择，书中有很好的体现。

## 印象深刻的段落

"死不是生的对立面，而作为生的一部分永存。"

这句话深刻地表达了作者对生死的理解。

## 个人感悟

这本书让我重新思考青春、爱情和成长。每个人都要在人生的十字路口做出选择，而这些选择将决定我们成为什么样的人。`
    },
    threebody: {
      title: '三体',
      author: '刘慈欣',
      tags: ['硬科幻', '宇宙', '文明'],
      notes: `刘慈欣的科幻巨作，展现了宏大的宇宙观和深刻的哲学思考。

## 科学概念

### 三体问题
三个质量相当的天体在相互引力作用下的运动规律，这是一个经典的物理学难题。

### 降维打击
高维文明对低维文明的毁灭性打击，体现了技术差距的绝对性。

## 哲学思考

### 黑暗森林理论
宇宙就像一座黑暗森林，每个文明都是带枪的猎人。

### 文明的选择
面对生存威胁时，文明会做出什么样的选择？

## 人物分析

- **叶文洁**：复杂的人物，既是受害者也是背叛者
- **汪淼**：科学家的理性与人性的冲突
- **史强**：代表着人类的坚韧和智慧

## 个人思考

这本书让我重新思考人类在宇宙中的位置。我们既渺小又伟大，既脆弱又坚强。科技的发展带来希望，也带来威胁。

最重要的是，无论面对什么困难，人类都不应该放弃希望和尊严。`
    },
    foundation: {
      title: '基地',
      author: '阿西莫夫',
      tags: ['太空歌剧', '心理史学', '银河帝国'],
      notes: `阿西莫夫的基地系列是科幻文学的经典之作，构建了一个宏大的银河帝国世界。

## 核心概念

### 心理史学
通过数学方法预测大规模人群的行为，这是一个fascinating的概念。

### 基地计划
在银河帝国衰落时期，建立两个基地来缩短黑暗时代。

## 科幻设定

- 银河帝国的兴衰
- 科技与社会的关系
- 预言与自由意志的矛盾

## 哲学思考

### 历史的必然性
历史是否有其必然的发展规律？个人在历史洪流中的作用是什么？

### 科学与预言
科学能否预测未来？预言本身是否会改变未来？

## 个人感悟

这个系列让我思考：
- 文明的发展规律
- 个人与历史的关系
- 科学理性的力量和局限

阿西莫夫用严谨的逻辑和宏大的想象力，创造了一个令人信服的未来世界。`
    },
    sapiens: {
      title: '人类简史',
      author: '尤瓦尔·赫拉利',
      tags: ['历史', '人类学', '社会学'],
      notes: `赫拉利的这部作品，从宏观角度审视了人类文明的发展历程。

## 三大革命

### 认知革命
7万年前，智人开始能够谈论虚构的事物，这是人类文明的起点。

### 农业革命
1.2万年前，人类开始种植作物，从此改变了生活方式。

### 科学革命
500年前开始，人类开始承认自己的无知，开始寻求新知识。

## 核心观点

### 虚构的力量
人类能够相信共同的虚构故事（如宗教、国家、公司），这是大规模合作的基础。

### 进步的代价
每一次进步都有其代价，农业革命让人类更加辛苦，工业革命带来了环境问题。

## 对未来的思考

### 生物技术革命
基因工程、人工智能等技术将如何改变人类？

### 智人的未来
我们可能正在进化成一个新的物种——神人。

## 个人反思

这本书让我重新思考：
- 什么是进步？
- 人类的未来在哪里？
- 我们应该如何面对技术变革？

赫拉利提出的问题比答案更有价值，它们促使我们思考人类的本质和未来。`
    },
    thinking: {
      title: '思考，快与慢',
      author: '丹尼尔·卡尼曼',
      tags: ['心理学', '认知', '行为经济学'],
      notes: `卡尼曼的这部作品揭示了人类思维的两套系统，改变了我们对理性的理解。

## 两套思维系统

### 系统1：快思考
- 自动化、直觉性
- 快速但容易出错
- 基于经验和情感

### 系统2：慢思考
- 需要努力、逻辑性
- 慢但相对准确
- 基于分析和推理

## 认知偏误

### 可得性启发式
我们倾向于根据容易想到的例子来判断概率。

### 锚定效应
第一印象会影响后续的判断。

### 损失厌恶
损失带来的痛苦比同等收益带来的快乐更强烈。

## 实际应用

### 决策制定
了解认知偏误有助于做出更好的决策。

### 风险评估
我们往往高估小概率事件，低估大概率事件。

## 个人收获

这本书让我明白：
- 人类并非完全理性
- 直觉有时很准确，有时会误导我们
- 重要决策需要慢思考

最重要的是，认识到自己思维的局限性，这是智慧的开始。`
    }
  }

  // 获取书籍信息的辅助函数
  const getBookTitle = (bookId: string) => bookData[bookId]?.title || ''
  const getBookAuthor = (bookId: string) => bookData[bookId]?.author || ''
  const getBookTags = (bookId: string) => bookData[bookId]?.tags || []
  const getBookNotes = (bookId: string) => {
    const notes = bookData[bookId]?.notes || ''
    return notes.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h3 key={index} className="mobile-book-notes-h3">{line.replace('## ', '')}</h3>
      } else if (line.startsWith('### ')) {
        return <h4 key={index} className="mobile-book-notes-h4">{line.replace('### ', '')}</h4>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="mobile-book-notes-li">{line.replace('- ', '')}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="mobile-book-notes-p">{line}</p>
      }
    })
  }

  // 平滑滚动函数 - 处理移动端和桌面端的ID冲突
  const scrollToSection = (sectionId: string) => {
    // 获取所有匹配的元素
    const elements = document.querySelectorAll(`#${sectionId}`)

    if (elements.length > 0) {
      // 找到当前显示的元素（不是hidden的）
      let targetElement = null

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement
        const computedStyle = window.getComputedStyle(element)

        // 检查元素是否可见
        if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
          // 检查父容器是否可见（处理md:hidden和hidden md:block）
          let parent = element.parentElement
          let isVisible = true

          while (parent && parent !== document.body) {
            const parentStyle = window.getComputedStyle(parent)
            if (parentStyle.display === 'none') {
              isVisible = false
              break
            }
            parent = parent.parentElement
          }

          if (isVisible) {
            targetElement = element
            break
          }
        }
      }

      // 如果找到可见元素，滚动到它
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // 备用方案：使用第一个元素
        elements[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // 搜索功能
  const handleSearch = (query: string) => {
    console.log('🔍 搜索被调用:', query)

    // 如果查询为空，不执行搜索
    if (!query || query.trim() === '') {
      console.log('⚠️ 搜索查询为空')
      return
    }

    const lowerQuery = query.toLowerCase().trim()
    console.log('🔍 处理后的查询:', lowerQuery)

    // 根据搜索内容滚动到相关部分
    if (lowerQuery.includes('项目') || lowerQuery.includes('project')) {
      console.log('📂 跳转到项目部分')
      scrollToSection('projects')
    } else if (lowerQuery.includes('技能') || lowerQuery.includes('skill')) {
      console.log('🛠️ 跳转到技能部分')
      scrollToSection('skills')
    } else if (lowerQuery.includes('书') || lowerQuery.includes('book') || lowerQuery.includes('阅读') || lowerQuery.includes('reading')) {
      console.log('📚 跳转到书架部分')
      document.querySelector('[data-bookshelf]')?.scrollIntoView({ behavior: 'smooth' })
    } else if (lowerQuery.includes('关于') || lowerQuery.includes('about') || lowerQuery.includes('我')) {
      console.log('👤 跳转到关于我部分')
      scrollToSection('about')
    } else if (lowerQuery.includes('联系') || lowerQuery.includes('contact')) {
      console.log('📞 跳转到联系我部分')
      scrollToSection('contact')
    } else if (lowerQuery.includes('文章') || lowerQuery.includes('blog') || lowerQuery.includes('article')) {
      console.log('📝 跳转到文章部分')
      scrollToSection('blog')
    } else {
      // 如果没有匹配，显示提示
      console.log('❌ 未找到相关内容，请尝试搜索：项目、技能、书籍、关于我、联系我、文章')
      // 可以添加用户提示
      alert('未找到相关内容，请尝试搜索：项目、技能、书籍、关于我、联系我、文章')
    }
  }

  // 键盘快捷键
  useKeyboardShortcuts([
    ...defaultShortcuts,
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        console.log('Ctrl+K 快速搜索')
        const searchInput = document.querySelector('input[placeholder*="搜索"], input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      },
      description: '快速搜索'
    },
    {
      key: '1',
      action: () => {
        console.log('跳转到项目部分')
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      },
      description: '跳转到项目'
    },
    {
      key: '2',
      action: () => {
        console.log('跳转到技能部分')
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
      },
      description: '跳转到技能'
    },
    {
      key: '3',
      action: () => {
        console.log('跳转到书架部分')
        document.querySelector('[data-bookshelf]')?.scrollIntoView({ behavior: 'smooth' })
      },
      description: '跳转到书架'
    }
  ])

  // 动画变体
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  // 动画过渡配置
  const fadeTransition = { duration: 0.6, ease: "easeOut" }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const skillCard = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    whileHover: { 
      y: -10,
      transition: { duration: 0.3 }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        'service_io3k8bu',    // 您的 Service ID
        'template_1mx1sls',   // 您的 Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'dD19_yxO-Hs_UyFVU'   // 您的 Public Key
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <Layout>
      {/* 样式隔离验证指示器 - 开发时使用 */}
      <div className="breakpoint-indicator"></div>

      {/* 移动端版本 - 使用CSS媒体查询控制显示 */}
      <div className="block md:hidden mobile-force-visible mobile-force-layout">
        {/* 移动端内联CSS测试 - 最高优先级 */}
        <div className="mobile-inline-test">
          内联CSS测试
        </div>

        {/* CSS加载失败指示器 */}
        <div className="css-load-failed">
          外部CSS加载状态检测
        </div>

        {/* 移动端CSS强制诊断系统 */}
        <div className="mobile-css-test css-force-loaded">
          🔴 移动端CSS强制加载诊断 - 如果看到红色背景说明强制CSS生效
        </div>

        <div className="mobile-css-loaded">
          ✅ 移动端CSS修复系统已激活
        </div>

        {/* 移动端样式隔离测试 */}
        <div className="isolation-test">
          🔵 移动端样式隔离测试
        </div>

        {/* CSS加载状态检测 */}
        <div className="mobile-force-spacing mobile-force-bg">
          <h2 className="mobile-force-text">📊 CSS加载状态检测</h2>
          <p className="mobile-force-text">
            ✅ 内联CSS：正常工作（你能看到彩色框）<br/>
            ❌ 外部CSS：加载失败（只有内联样式生效）<br/>
            🔧 解决方案：使用内联CSS完全替代外部CSS
          </p>
        </div>

        {/* 移动端内容强制显示 */}
        <div className="mobile-force-spacing mobile-force-bg">
          <h1 className="mobile-force-text">移动端内容测试</h1>
          <p className="mobile-force-text">如果你能看到这段文字有正常的样式（不是纯文本），说明移动端内联CSS修复成功！</p>

          <h3 className="mobile-force-text">测试功能</h3>
          <button type="button">测试按钮</button>
          <p className="mobile-force-text">按钮应该有蓝色背景和白色文字</p>

          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '16px',
            borderRadius: '8px',
            margin: '16px 0',
            border: '1px solid #2196f3'
          }}>
            <p style={{
              color: '#1976d2',
              fontWeight: 'bold',
              margin: '0'
            }}>
              🎯 这个蓝色框使用内联style属性，应该始终显示正确
            </p>
          </div>
        </div>

        {/* 移动端Hero区域示例 - 使用内联样式 */}
        <div className="mobile-hero-inline mobile-fade-in">
          <div className="mobile-hero-content">
            <h1 className="mobile-hero-title">欢迎来到移动端</h1>
            <p className="mobile-hero-subtitle">
              这是使用内联CSS完全修复的移动端页面，
              不依赖任何外部CSS文件，确保在所有移动端浏览器中正常显示。
            </p>
            <a href="#" className="mobile-hero-button">开始探索</a>
          </div>
        </div>

        {/* 移动端卡片示例 */}
        <div className="mobile-card-inline mobile-slide-up">
          <h3 className="mobile-card-title">功能特性</h3>
          <p className="mobile-card-text">
            ✅ 内联CSS确保样式加载<br/>
            ✅ 响应式设计适配移动端<br/>
            ✅ 优化的触摸交互体验<br/>
            ✅ 快速加载和流畅动画
          </p>
          <button className="mobile-card-button">了解更多</button>
        </div>

        {/* 移动端表单示例 */}
        <div className="mobile-form-inline">
          <h3 className="mobile-form-title">联系我们</h3>
          <div className="mobile-form-group">
            <label className="mobile-form-label">姓名</label>
            <input type="text" className="mobile-form-input" placeholder="请输入您的姓名" />
          </div>
          <div className="mobile-form-group">
            <label className="mobile-form-label">邮箱</label>
            <input type="email" className="mobile-form-input" placeholder="请输入您的邮箱" />
          </div>
          <button className="mobile-form-button">提交</button>
        </div>
        {/* 移动端Hero区域 - 改进版 */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
          {/* 背景动画 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('你好，我是', 'Hello, I am')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 block mt-2">
                Soren
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t(
                '一名专注数据科学的分析师，致力于从数据中挖掘洞察，用智能分析驱动商业决策',
                'A data science analyst focused on extracting insights from data and driving business decisions through intelligent analysis'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('查看项目', 'View Projects')}
              </a>
              <a
                href="#about"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 py-3 rounded-full transition-colors"
              >
                {t('了解更多', 'Learn More')}
              </a>
            </div>

            {/* 滚动提示 */}
            <div className="mt-12">
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center mx-auto">
                <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端技能专长模块 - 更好看的版本 */}
        <div className="mobile-skills-container mobile-section">
          <h2 className="mobile-skills-title">🚀 技能专长</h2>
          <p style={{
            textAlign: 'center',
            color: '#666666',
            fontSize: '16px',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            专注于数据分析与商业智能技术栈
          </p>

          {/* 数据处理与分析 */}
          <div className="mobile-skill-card">
            <div className="mobile-skill-header">
              <span className="mobile-skill-icon">📊</span>
              <h3 className="mobile-skill-card-title">数据处理与分析</h3>
            </div>
            <p className="mobile-skill-desc">熟练使用多种数据处理工具进行数据清洗、分析和建模</p>
            <div className="mobile-skill-tags">
              <span className="mobile-skill-tag sky">Python</span>
              <span className="mobile-skill-tag emerald">R</span>
              <span className="mobile-skill-tag violet">SQL</span>
              <span className="mobile-skill-tag rose">SPSS</span>
            </div>
          </div>

          {/* 数据可视化 */}
          <div className="mobile-skill-card">
            <div className="mobile-skill-header">
              <span className="mobile-skill-icon">📈</span>
              <h3 className="mobile-skill-card-title">数据可视化</h3>
            </div>
            <p className="mobile-skill-desc">创建直观的数据可视化图表和交互式仪表板</p>
            <div className="mobile-skill-tags">
              <span className="mobile-skill-tag sky">PowerBI</span>
              <span className="mobile-skill-tag emerald">Tableau</span>
              <span className="mobile-skill-tag violet">Excel</span>
              <span className="mobile-skill-tag rose">Matplotlib</span>
            </div>
          </div>

          {/* 机器学习 */}
          <div className="mobile-skill-card">
            <div className="mobile-skill-header">
              <span className="mobile-skill-icon">🤖</span>
              <h3 className="mobile-skill-card-title">机器学习</h3>
            </div>
            <p className="mobile-skill-desc">构建和优化机器学习模型，解决实际业务问题</p>
            <div className="mobile-skill-tags">
              <span className="mobile-skill-tag sky">XGBoost</span>
              <span className="mobile-skill-tag emerald">Scikit-learn</span>
              <span className="mobile-skill-tag violet">TensorFlow</span>
              <span className="mobile-skill-tag rose">PyTorch</span>
            </div>
          </div>
        </div>

        {/* 移动端精选项目模块 - 更好看的版本 */}
        <div className="mobile-projects-container mobile-section">
          <h2 className="mobile-skills-title">💼 精选项目</h2>
          <p style={{
            textAlign: 'center',
            color: '#666666',
            fontSize: '16px',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            展示我在数据分析和机器学习领域的实践成果
          </p>

          {/* 项目1：酒店预订取消率分析 */}
          <div className="mobile-project-card-desktop">
            <div className="mobile-project-header">
              <span className="mobile-project-icon">🏨</span>
              <span className="mobile-project-category">机器学习</span>
            </div>
            <div className="mobile-project-content">
              <h3 className="mobile-project-title-desktop">酒店预订取消率分析</h3>
              <p className="mobile-project-desc-desktop">
                基于Kaggle酒店预订数据集，构建XGBoost机器学习预测模型，准确率达到87%。结合SQL数据库设计和PowerBI可视化仪表板。
              </p>
              <div className="mobile-project-tech-tags">
                <span className="mobile-tech-tag blue">Python</span>
                <span className="mobile-tech-tag blue">XGBoost</span>
                <span className="mobile-tech-tag blue">SQL</span>
                <span className="mobile-tech-tag blue">PowerBI</span>
              </div>
              <div className="mobile-project-actions">
                <a href="/reports/1" className="mobile-project-btn">查看项目</a>
                <a href="https://github.com/shallow157/data_analysis_hotel_booking" className="mobile-project-github">
                  <svg className="mobile-github-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 项目2：淘宝用户行为分析 */}
          <div className="mobile-project-card-desktop">
            <div className="mobile-project-header green">
              <span className="mobile-project-icon">🛒</span>
              <span className="mobile-project-category">数据分析</span>
            </div>
            <div className="mobile-project-content">
              <h3 className="mobile-project-title-desktop">淘宝用户行为分析</h3>
              <p className="mobile-project-desc-desktop">
                处理1亿条用户行为数据，构建完整的用户行为分析框架，RFM模型实现精准用户分群，Tableau可视化仪表板展示核心指标。
              </p>
              <div className="mobile-project-tech-tags">
                <span className="mobile-tech-tag green">MySQL</span>
                <span className="mobile-tech-tag green">Tableau</span>
                <span className="mobile-tech-tag green">Python</span>
                <span className="mobile-tech-tag green">RFM模型</span>
              </div>
              <div className="mobile-project-actions">
                <a href="/reports/2" className="mobile-project-btn green">查看项目</a>
                <a href="https://github.com/shallow157/data_analysis_taobao_user_behavior" className="mobile-project-github">
                  <svg className="mobile-github-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <a href="/projects" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}>
              查看所有项目
              <svg style={{marginLeft: '8px', width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* 移动端书架区域 - 专门的移动端设计 */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              📚 我的书架
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              分享一些读过的好书和思考
            </p>
          </div>

          {/* 移动端书籍网格 */}
          <div className="mobile-bookshelf-grid">
            {/* 文学类 */}
            <div className="mobile-book-category">
              <h3 className="mobile-category-title">📖 文学</h3>
              <div className="mobile-books-row">
                <div className="mobile-book-item" onClick={() => openMobileBookModal('vegetarian')}>
                  <div className="mobile-book-cover vegetarian">素食者</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">素食者</div>
                    <div className="mobile-book-author">韩江</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#女性主义</span>
                      <span className="mobile-book-tag">#韩国文学</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-book-item" onClick={() => openMobileBookModal('solitude')}>
                  <div className="mobile-book-cover solitude">百年孤独</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">百年孤独</div>
                    <div className="mobile-book-author">马尔克斯</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#魔幻现实</span>
                      <span className="mobile-book-tag">#拉美文学</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-book-item" onClick={() => openMobileBookModal('1984')}>
                  <div className="mobile-book-cover orwell">1984</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">1984</div>
                    <div className="mobile-book-author">乔治·奥威尔</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#反乌托邦</span>
                      <span className="mobile-book-tag">#政治</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-book-item" onClick={() => openMobileBookModal('norwegian')}>
                  <div className="mobile-book-cover norwegian">挪威的森林</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">挪威的森林</div>
                    <div className="mobile-book-author">村上春树</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#青春</span>
                      <span className="mobile-book-tag">#日本文学</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 科幻类 */}
            <div className="mobile-book-category">
              <h3 className="mobile-category-title">🚀 科幻</h3>
              <div className="mobile-books-row">
                <div className="mobile-book-item" onClick={() => openMobileBookModal('threebody')}>
                  <div className="mobile-book-cover threebody">三体</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">三体</div>
                    <div className="mobile-book-author">刘慈欣</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#硬科幻</span>
                      <span className="mobile-book-tag">#宇宙</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-book-item" onClick={() => openMobileBookModal('foundation')}>
                  <div className="mobile-book-cover foundation">基地</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">基地</div>
                    <div className="mobile-book-author">阿西莫夫</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#太空歌剧</span>
                      <span className="mobile-book-tag">#心理史学</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 成长类 */}
            <div className="mobile-book-category">
              <h3 className="mobile-category-title">🌱 成长</h3>
              <div className="mobile-books-row">
                <div className="mobile-book-item" onClick={() => openMobileBookModal('sapiens')}>
                  <div className="mobile-book-cover sapiens">人类简史</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">人类简史</div>
                    <div className="mobile-book-author">尤瓦尔·赫拉利</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#历史</span>
                      <span className="mobile-book-tag">#人类学</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-book-item" onClick={() => openMobileBookModal('thinking')}>
                  <div className="mobile-book-cover thinking">思考，快与慢</div>
                  <div className="mobile-book-info">
                    <div className="mobile-book-title">思考，快与慢</div>
                    <div className="mobile-book-author">丹尼尔·卡尼曼</div>
                    <div className="mobile-book-tags">
                      <span className="mobile-book-tag">#心理学</span>
                      <span className="mobile-book-tag">#认知</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-bookshelf-tip">
            <p>📖 点击书籍查看完整读书笔记</p>
          </div>
        </section>

        {/* 移动端书籍模态框 */}
        {mobileBookModal.isOpen && (
          <div className="mobile-book-modal-overlay" onClick={closeMobileBookModal}>
            <div className="mobile-book-modal" onClick={(e) => e.stopPropagation()}>
              {/* 模态框头部 - 会随着滚动变化 */}
              <div
                className="mobile-book-modal-header"
                style={{
                  transform: `scale(${Math.max(0.6, 1 - mobileBookModal.scrollY * 0.001)})`,
                  opacity: Math.max(0.3, 1 - mobileBookModal.scrollY * 0.002)
                }}
              >
                <button className="mobile-book-modal-close" onClick={closeMobileBookModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mobile-book-modal-cover">
                  <div className={`mobile-book-cover ${mobileBookModal.bookId}`}>
                    {getBookTitle(mobileBookModal.bookId)}
                  </div>
                </div>

                <div className="mobile-book-modal-info">
                  <h2 className="mobile-book-modal-title">{getBookTitle(mobileBookModal.bookId)}</h2>
                  <p className="mobile-book-modal-author">{getBookAuthor(mobileBookModal.bookId)}</p>
                  <div className="mobile-book-modal-tags">
                    {getBookTags(mobileBookModal.bookId).map((tag, index) => (
                      <span key={index} className="mobile-book-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 模态框内容 - 可滚动的笔记内容 */}
              <div
                className="mobile-book-modal-content"
                onScroll={(e) => {
                  const scrollY = e.currentTarget.scrollTop
                  setMobileBookModal(prev => ({ ...prev, scrollY }))
                }}
              >
                <div className="mobile-book-notes">
                  {getBookNotes(mobileBookModal.bookId)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 移动端最新文章部分 */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('最新文章', 'Latest Articles')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('分享技术心得与生活感悟', 'Sharing technical insights and life thoughts')}
              </p>
            </div>

            <div className="space-y-6">
              {/* 文章1：关于技术成长的思考 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-sm rounded-full">
                    {t('技术感悟', 'Tech Insights')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    2025-07-25
                  </span>
                </div>
                <Link href="/life/1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    {t('关于技术成长的思考', 'Thoughts on Technical Growth')}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {t(
                    '在这个快速发展的技术世界中，如何保持持续学习的动力和方向...',
                    'In this rapidly evolving tech world, how to maintain motivation for continuous learning...'
                  )}
                </p>
                <Link href="/life/1">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                    {t('阅读更多', 'Read More')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* 文章2：远程工作的利与弊 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                    {t('工作思考', 'Work Thoughts')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    2025-05-12
                  </span>
                </div>
                <Link href="/life/2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    {t('远程工作的利与弊', 'Pros and Cons of Remote Work')}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {t(
                    '疫情改变了我们的工作方式，远程工作成为新常态...',
                    'The pandemic changed our work patterns, remote work became the new normal...'
                  )}
                </p>
                <Link href="/life/2">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                    {t('阅读更多', 'Read More')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* 文章3：AI 时代的程序员 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {t('社会热点', 'Social Trends')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    2025-03-21
                  </span>
                </div>
                <Link href="/life/3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                    {t('AI 时代的程序员', 'Programmers in the AI Era')}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {t(
                    '人工智能的快速发展对程序员意味着什么？我们应该如何应对...',
                    'What does the rapid development of AI mean for programmers? How should we respond...'
                  )}
                </p>
                <Link href="/life/3">
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                    {t('阅读更多', 'Read More')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/life"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('查看所有文章', 'View All Articles')}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 移动端关于我部分 */}
        <section id="about" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('关于我', 'About Me')}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(
                  '我是一名充满热情的数据分析爱好者。我热爱发现数据之美，我喜欢用数据解决问题，用数据分析解决问题，用数据创造价值，并始终保持学习新技术的热情。',
                  'I am a passionate data analysis enthusiast. I love discovering the beauty of data, solving problems with data, creating value through data analysis, and always maintain enthusiasm for learning new technologies.'
                )}
              </p>
            </div>

            <div className="space-y-6">
              {/* 数据驱动 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('数据驱动', 'Data Driven')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('用数据说话，让洞察指导决策', 'Let data speak and insights guide decisions')}
                  </p>
                </div>
              </div>

              {/* 持续创新 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('持续创新', 'Continuous Innovation')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('拥抱新技术，探索无限可能', 'Embrace new technologies and explore infinite possibilities')}
                  </p>
                </div>
              </div>

              {/* 解决问题 */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('解决问题', 'Problem Solving')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('化复杂为简单，变挑战为机遇', 'Turn complexity into simplicity, challenges into opportunities')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 移动端联系我部分 */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('联系我', 'Contact Me')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('有任何想法或合作机会，欢迎联系', 'Feel free to reach out for any ideas or collaboration opportunities')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('姓名', 'Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('邮箱', 'Email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('消息', 'Message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? t('发送中...', 'Sending...') : t('发送消息', 'Send Message')}
                </button>
              </form>

              {submitStatus && (
                <div className={`mt-4 p-4 rounded-lg ${
                  submitStatus === 'success'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                }`}>
                  {submitStatus === 'success'
                    ? t('消息发送成功！', 'Message sent successfully!')
                    : t('发送失败，请稍后重试。', 'Failed to send. Please try again later.')
                  }
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 桌面端版本 - 使用CSS媒体查询控制显示 */}
      <div className="hidden md:block">
        {/* 桌面端样式隔离测试 */}
        <div className="isolation-test">
          桌面端样式隔离测试
        </div>

      {/* Hero Section with animated background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              variants={fadeInUp}
              transition={fadeTransition}
            >
              {t('你好，我是', 'Hello, I am')} 
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Soren
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
              transition={fadeTransition}
            >
              {t(
                '一名专注数据科学的分析师，致力于从数据中挖掘洞察，用智能分析驱动商业决策',
                'A data science analyst focused on extracting insights from data and driving business decisions through intelligent analysis'
              )}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={fadeInUp}
              transition={fadeTransition}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('查看项目', 'View Projects')}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('about')}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-4 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('了解更多', 'Learn More')}
              </motion.button>
            </motion.div>

            {/* 搜索栏 */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
        {/* 技能部分 */}
        <motion.section 
          id="skills" 
          className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 背景装饰元素 */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t('技能专长', 'Skills & Expertise')}
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('专注于数据分析与商业智能技术栈', 'Focused on data analysis and business intelligence technologies')}
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* 数据处理与分析 */}
              <motion.div 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                variants={skillCard}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="flex items-center mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="text-3xl mr-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    📊
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('数据处理与分析', 'Data Processing & Analysis')}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('熟练使用多种数据处理工具进行数据清洗、分析和建模', 'Proficient in various data processing tools for data cleaning, analysis and modeling')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    { name: 'Python', color: 'sky' },
                    { name: 'R', color: 'emerald' },
                    { name: 'SQL', color: 'violet' },
                    { name: 'SPSS', color: 'rose' }
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className={`px-3 py-1 ${
                        tech.color === 'sky' ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200' :
                        tech.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200' :
                        tech.color === 'violet' ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200' :
                        'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200'
                      } text-sm rounded-full font-medium`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              {/* 数据可视化 */}
              <motion.div 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                variants={skillCard}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="flex items-center mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="text-3xl mr-3"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    📈
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('数据可视化', 'Data Visualization')}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('创建直观美观的数据图表和交互式仪表板', 'Create intuitive and beautiful data charts and interactive dashboards')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    { name: 'Tableau', color: 'orange' },
                    { name: 'Power BI', color: 'yellow' },
                    { name: 'Matplotlib', color: 'indigo' },
                    { name: 'Seaborn', color: 'pink' }
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className={`px-3 py-1 ${
                        tech.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200' :
                        tech.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200' :
                        tech.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200' :
                        'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-200'
                      } text-sm rounded-full font-medium`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              {/* 数据库与工具 */}
              <motion.div 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                variants={skillCard}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="flex items-center mb-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="text-3xl mr-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    🗄️
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('数据库与工具', 'Database & Tools')}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('熟练掌握多种数据库系统和开发工具', 'Proficient in various database systems and development tools')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    { name: 'MySQL', color: 'sky' },
                    { name: 'PostgreSQL', color: 'teal' },
                    { name: 'MongoDB', color: 'slate' },
                    { name: 'Jupyter', color: 'amber' }
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className={`px-3 py-1 ${
                        tech.color === 'sky' ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200' :
                        tech.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200' :
                        tech.color === 'slate' ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200' :
                        'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
                      } text-sm rounded-full font-medium`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
        
      {/* Projects Section with enhanced animations */}
      <motion.section
        id="projects"
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t('精选项目', 'Featured Projects')}
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('展示我在数据分析和机器学习领域的实践成果', 'Showcasing my practical achievements in data analysis and machine learning')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* 项目1：酒店预订取消率分析 */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
              variants={skillCard}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="text-6xl text-white relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  🏨
                </motion.div>
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('机器学习', 'Machine Learning')}
                  </motion.span>
                </div>
              </div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {t('酒店预订取消率分析', 'Hotel Booking Cancellation Analysis')}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('基于Kaggle酒店预订数据集，构建XGBoost机器学习预测模型，准确率达到87%。结合SQL数据库设计和PowerBI可视化仪表板。', 'Built XGBoost prediction model with 87% accuracy using Kaggle hotel booking dataset. Combined with SQL database design and PowerBI dashboard.')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Python', 'XGBoost', 'SQL', 'PowerBI'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="/reports/1"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('查看项目', 'View Project')}
                  </motion.a>
                  <motion.div 
                    className="flex space-x-3"
                    variants={staggerContainer}
                  >
                    <motion.a 
                      href="https://github.com/shallow157/data_analysis_hotel_booking" 
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* 项目2：淘宝用户行为分析 */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
              variants={skillCard}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-500/20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="text-6xl text-white relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  🛒
                </motion.div>
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('数据挖掘', 'Data Mining')}
                  </motion.span>
                </div>
              </div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {t('淘宝用户行为分析', 'Taobao User Behavior Analysis')}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('处理1亿条用户行为数据，构建完整的用户行为分析框架，RFM模型实现精准用户分群，Tableau可视化仪表板展示核心指标。', 'Processed 100M user behavior records, built comprehensive analysis framework, RFM model for user segmentation, Tableau dashboard for key metrics.')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['MySQL', 'Tableau', 'Python', 'RFM模型'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-sm rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="/reports/2"
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('查看项目', 'View Project')}
                  </motion.a>
                  <motion.div 
                    className="flex space-x-3"
                    variants={staggerContainer}
                  >
                    <motion.a 
                      href="https://github.com/shallow157/taobao_user_behavior_analysis" 
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* 项目3：红海行动电影评论分析 */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
              variants={skillCard}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-48 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-500/20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="text-6xl text-white relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  🎬
                </motion.div>
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('文本分析', 'Text Analysis')}
                  </motion.span>
                </div>
              </div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {t('红海行动电影评论分析', 'Red Sea Action Movie Review Analysis')}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('爬取数千条豆瓣电影评论数据，实现中文文本情感分析，词云可视化展示高频词汇，地域分布和评分趋势分析。', 'Scraped thousands of Douban movie reviews, implemented Chinese text sentiment analysis, word cloud visualization and regional distribution analysis.')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Python', 'Selenium', 'Jieba', 'WordCloud'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-sm rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="/reports/3"
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('查看项目', 'View Project')}
                  </motion.a>
                  <motion.div 
                    className="flex space-x-3"
                    variants={staggerContainer}
                  >
                    <motion.a 
                      href="https://github.com/shallow157/Red_Sea_Action_Analysis" 
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* 项目4：四川CPI时间序列分析 */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
              variants={skillCard}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-500/20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="text-6xl text-white relative z-10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  📈
                </motion.div>
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {t('时间序列', 'Time Series')}
                  </motion.span>
                </div>
              </div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {t('四川CPI时间序列分析', 'Sichuan CPI Time Series Analysis')}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t('20年月度经济数据分析，ARMA(2,1)模型拟合CPI时间序列，VAR模型揭示CPI与M2动态关系，格兰杰因果检验验证货币政策传导。', '20 years of monthly economic data analysis, ARMA(2,1) model for CPI time series, VAR model revealing CPI-M2 dynamics, Granger causality test.')}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['SAS', 'Python', 'ARMA模型', 'VAR模型'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href="/reports/4"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('查看项目', 'View Project')}
                  </motion.a>
                  <motion.div 
                    className="flex space-x-3"
                    variants={staggerContainer}
                  >
                    <motion.a 
                      href="https://github.com/shallow157/sichuan_cpi_analysis" 
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* View All Projects Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.a 
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('查看所有项目', 'View All Projects')}
              <motion.svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* 3D书架部分 */}
      <BookshelfSection />

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="mb-20 py-20 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-800 rounded-full opacity-10"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-48 h-48 bg-pink-100 dark:bg-pink-800 rounded-full opacity-10"
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, rotateX: -15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('最新文章', 'Latest Articles')}
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mb-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('分享技术心得与生活感悟', 'Sharing technical insights and life thoughts')}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.article 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                initial: { opacity: 0, y: 50, rotateY: -10 },
                animate: { opacity: 1, y: 0, rotateY: 0 }
              }}
              whileHover={{ 
                y: -8,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="flex items-center justify-between mb-6 relative z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-sm rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {t('技术感悟', 'Tech Insights')}
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  2025-07-25
                </motion.span>
              </motion.div>
              
              <Link href="/life/1">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {t('关于技术成长的思考', 'Thoughts on Technical Growth')}
                </motion.h3>
              </Link>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t(
                  '在这个快速发展的技术世界中，如何保持持续学习的动力和方向...',
                  'In this rapidly evolving tech world, how to maintain motivation for continuous learning...'
                )}
              </motion.p>
              
              <Link href="/life/1">
                <motion.div 
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  {t('阅读更多', 'Read More')}
                  <motion.svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.article>

            <motion.article 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                initial: { opacity: 0, y: 50, rotateY: -10 },
                animate: { opacity: 1, y: 0, rotateY: 0 }
              }}
              whileHover={{ 
                y: -8,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="flex items-center justify-between mb-6 relative z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 text-sm rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {t('工作思考', 'Work Thoughts')}
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  2025-05-12
                </motion.span>
              </motion.div>
              
              <Link href="/life/2">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {t('远程工作的利与弊', 'Pros and Cons of Remote Work')}
                </motion.h3>
              </Link>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t(
                  '疫情改变了我们的工作方式，远程工作成为新常态...',
                  'The pandemic changed our work patterns, remote work became the new normal...'
                )}
              </motion.p>
              
              <Link href="/life/2">
                <motion.div 
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  {t('阅读更多', 'Read More')}
                  <motion.svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.article>

            <motion.article 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                initial: { opacity: 0, y: 50, rotateY: -10 },
                animate: { opacity: 1, y: 0, rotateY: 0 }
              }}
              whileHover={{ 
                y: -8,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="flex items-center justify-between mb-6 relative z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {t('社会热点', 'Social Trends')}
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  2025-03-21
                </motion.span>
              </motion.div>
              
              <Link href="/life/3">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {t('AI 时代的程序员', 'Programmers in the AI Era')}
                </motion.h3>
              </Link>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t(
                  '人工智能的快速发展对程序员意味着什么？我们应该如何应对...',
                  'What does the rapid development of AI mean for programmers? How should we respond...'
                )}
              </motion.p>
              
              <Link href="/life/3">
                <motion.div 
                  className="flex items-center text-blue-600 dark:text-blue-400 font-medium relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  {t('阅读更多', 'Read More')}
                  <motion.svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.article>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/life">
              <motion.div 
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('查看更多文章', 'View More Articles')}
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>



      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('关于我', 'About Me')}
            </motion.h2>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t(
                '我是一名充满热情的数据分析爱好者。我热爱发现数据之美，我喜欢用数据解决问题，用数据分析解决问题，用数据创造价值，并始终保持学习新技术的热情。',
                'I am a passionate data analysis enthusiast. I love discovering the beauty of data, solving problems with data, creating value through data analysis, and always maintain enthusiasm for learning new technologies.'
              )}
            </motion.p>
          </motion.div>

          {/* 个人特质卡片 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="text-5xl mb-4 relative z-10"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                📊
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t('数据驱动', 'Data Driven')}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t('用数据说话，让洞察指导决策', 'Let data speak and insights guide decisions')}
              </motion.p>
            </motion.div>

            <motion.div 
              className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="text-5xl mb-4 relative z-10"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, 15, -15, 0],
                  transition: { duration: 0.6 }
                }}
              >
                🚀
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t('持续创新', 'Continuous Innovation')}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t('拥抱新技术，探索无限可能', 'Embrace new technologies and explore infinite possibilities')}
              </motion.p>
            </motion.div>

            <motion.div 
              className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="text-5xl mb-4 relative z-10"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, 20, -20, 0],
                  transition: { duration: 0.7 }
                }}
              >
                💡
              </motion.div>
              <motion.h3 
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {t('解决问题', 'Problem Solving')}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {t('化复杂为简单，变挑战为机遇', 'Turn complexity into simplicity, challenges into opportunities')}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-1/4 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-10"
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -15, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-28 h-28 bg-pink-200 dark:bg-pink-800 rounded-full opacity-15"
            animate={{
              x: [0, -25, 25, 0],
              y: [0, 20, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('联系我', 'Contact Me')}
            </motion.h2>
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {t(
                '如果您对我感兴趣，或者有任何合作机会，欢迎与我联系',
                'If you are interested in me or have any collaboration opportunities, feel free to contact me'
              )}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-50" />
              
              <motion.h3 
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t('联系信息', 'Contact Information')}
              </motion.h3>
              
              <motion.div 
                className="space-y-6 relative z-10"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div 
                  className="flex items-center group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-white text-lg">@</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('邮箱', 'Email')}</p>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">shallowyang157@outlook.com</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: -360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-white text-lg">📱</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('电话', 'Phone')}</p>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">+86 181 9062 4259</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-white text-lg">📍</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('位置', 'Location')}</p>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {t('中国，成都', 'Chengdu, China')}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-50" />
              
              <motion.h3 
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t('发送消息', 'Send Message')}
              </motion.h3>
              
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('您的姓名', 'Your Name')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('您的邮箱', 'Your Email')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={t('您的消息', 'Your Message')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t('消息发送成功！', 'Message sent successfully!')}
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t('发送失败，请重试', 'Failed to send message, please try again')}
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 font-medium"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {isSubmitting ? t('发送中...', 'Sending...') : t('发送消息', 'Send Message')}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 返回顶部按钮 */}
      <BackToTop />

      {/* 键盘快捷键帮助 */}
      <KeyboardShortcutsHelp />
      </div>
    </Layout>
  )
}





















