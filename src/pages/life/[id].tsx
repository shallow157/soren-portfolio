import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

export default function ArticlePage() {
  const router = useRouter()
  const { id } = router.query
  const { t } = useLanguage()
  const [articleContent, setArticleContent] = useState('')
  const [articleTitle, setArticleTitle] = useState('')
  const [articleMeta, setArticleMeta] = useState({ date: '', category: '', readTime: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadArticle(id as string)
    }
  }, [id])

  const loadArticle = async (articleId: string) => {
    setLoading(true)
    
    const articles = {
      '1': {
        title: t('关于技术成长的思考', 'Thoughts on Technical Growth'),
        category: t('技术感悟', 'Tech Insights'),
        date: "2025-07-25",
        readTime: t('8 分钟阅读', '8 min read'),
        content: `# 关于技术成长的思考

> 在这个快速发展的技术世界中，如何保持持续学习的动力和方向？

## 写在前面

最近在整理自己的学习笔记时，突然意识到从开始写代码到现在，已经走过了好几个年头。回望这段路程，有过迷茫，有过兴奋，也有过挫折。今天想和大家分享一些关于技术成长的思考。

## 技术学习的三个阶段

### 🌱 初学阶段：好奇心驱动

还记得第一次让"Hello World"在屏幕上显示出来时的兴奋吗？那种**"原来计算机是这样工作的"**的惊喜感，是我们技术路上最珍贵的财富。

在这个阶段，我们像海绵一样吸收着各种知识：
- 语法规则、框架使用、工具配置
- 每一个小功能的实现都让人兴奋不已
- 经常熬夜调试代码，但乐在其中

**这个阶段最重要的是保持好奇心，不要害怕犯错。**

### 🚀 成长阶段：深度与广度的平衡

随着经验的积累，我们开始面临选择：是专精一个领域，还是广泛涉猎？

我的体会是：**先深后广，再深再广**。

- **深度**：选择一个主要方向深入研究，建立扎实的基础
- **广度**：了解相关技术栈，培养系统性思维
- **实践**：通过项目将知识串联起来

在这个阶段，我们开始：
- 关注代码质量，而不仅仅是功能实现
- 思考架构设计，考虑可维护性和扩展性
- 学会阅读源码，理解底层原理

### 🎯 进阶阶段：解决问题的艺术

当技术不再是障碍时，我们开始关注更高层次的问题：
- 如何设计优雅的解决方案？
- 如何平衡技术债务和业务需求？
- 如何在团队中分享知识和经验？

这个阶段的成长更多体现在：
- **系统性思维**：能够从全局角度思考问题
- **沟通能力**：将技术方案清晰地传达给他人
- **学习能力**：快速掌握新技术的能力

## 保持学习动力的几个方法

### 1. 设定小目标 🎯

不要一开始就想着成为"全栈大神"，而是：
- 这个月学会一个新的库
- 这周优化一个性能问题
- 今天读懂一段源码

**小目标更容易达成，成就感也更持续。**

### 2. 建立学习体系 📚

- **输入**：技术博客、开源项目、技术书籍
- **处理**：动手实践、记录笔记、思考总结
- **输出**：写博客、做分享、参与讨论

形成学习的闭环，知识才能真正内化。

### 3. 找到学习伙伴 👥

- 加入技术社区，参与讨论
- 找到志同道合的朋友，互相督促
- 参加技术聚会，扩展视野

**一个人走得快，一群人走得远。**

### 4. 保持好奇心 ✨

- 对新技术保持开放的心态
- 经常问"为什么"和"如何更好"
- 不满足于"能用就行"

## 技术之外的思考

### 业务理解的重要性

纯粹的技术能力只是基础，**理解业务需求，能够将技术与业务结合**，才是真正的核心竞争力。

- 多与产品、运营同事沟通
- 理解用户的真实需求
- 思考技术如何创造业务价值

### 软技能同样重要

- **沟通能力**：清晰表达技术方案
- **时间管理**：平衡学习与工作
- **抗压能力**：面对复杂问题时保持冷静

## 写在最后

技术成长是一个持续的过程，没有终点。重要的不是走得多快，而是**保持前进的方向和动力**。

每个人的成长路径都不同，但有几点是共通的：
- 保持好奇心和学习热情
- 注重实践，在项目中成长
- 建立自己的知识体系
- 与他人分享，在交流中进步

愿我们都能在技术的道路上，找到属于自己的节奏，享受成长的过程。

---

*如果这篇文章对你有帮助，欢迎分享给更多的朋友。让我们一起在技术的路上互相鼓励，共同成长。*`
      },
      '2': {
        title: t('远程工作的利与弊', 'Pros and Cons of Remote Work'),
        category: t('工作思考', 'Work Thoughts'),
        date: "2025-05-12",
        readTime: t('12 分钟阅读', '12 min read'),
        content: `# 远程工作的利与弊

> 疫情改变了我们的工作方式，远程工作成为新常态。但这真的适合所有人吗？

## 前言

三年前，如果有人告诉我，我会在家里的书桌前完成大部分工作，我可能会觉得这是天方夜谭。然而，疫情让远程工作从"可选项"变成了"必选项"，也让我们有机会深度体验这种工作模式。

经过两年多的远程工作实践，我想分享一些真实的感受和思考。

## 远程工作的优势 ✅

### 1. 时间自由度更高 ⏰

**最直观的好处就是省去了通勤时间。**

- 每天节省2-3小时的通勤时间
- 可以更灵活地安排工作时间
- 有更多时间陪伴家人或发展个人兴趣

我记得以前每天早上7点就要起床，匆匆忙忙赶地铁，晚上回到家已经精疲力尽。现在可以8点半起床，9点就开始工作，这种感觉真的很棒。

### 2. 工作环境可控 🏠

在家工作意味着你可以：
- 调节最舒适的温度和光线
- 播放自己喜欢的背景音乐
- 穿最舒服的衣服
- 随时泡茶或咖啡

### 3. 减少干扰，提高专注度 🎯

办公室里总是有各种干扰：
- 同事的闲聊
- 突然的会议
- 嘈杂的环境

在家工作可以创造一个更专注的环境，特别适合需要深度思考的工作。

### 4. 成本节约 💰

- 交通费用
- 外出就餐费用
- 职业装费用
- 其他办公室相关开支

## 远程工作的挑战 ❌

### 1. 沟通成本增加 📞

**最大的挑战可能就是沟通效率的下降。**

- 缺少面对面的即时沟通
- 文字交流容易产生误解
- 团队协作变得复杂
- 新人培养更加困难

有时候一个本来5分钟就能说清楚的问题，通过文字或视频可能需要半小时。

### 2. 工作与生活边界模糊 🏠💼

- 很难完全"下班"
- 家庭成员的干扰
- 工作空间与生活空间重叠
- 容易过度工作或工作效率低下

### 3. 孤独感和缺乏归属感 😔

- 缺少同事间的日常交流
- 错过团队建设活动
- 难以建立深层的工作关系
- 职业发展可能受限

### 4. 自律要求更高 💪

远程工作对个人的自律性要求很高：
- 需要自己安排时间
- 抵制各种诱惑（床、游戏、零食）
- 保持工作状态
- 主动学习和成长

## 如何更好地进行远程工作

### 1. 建立清晰的工作边界 📏

- 设置专门的工作区域
- 制定明确的工作时间
- 工作结束后关闭工作设备
- 与家人沟通工作时间安排

### 2. 投资工作环境 🖥️

- 舒适的椅子和桌子
- 良好的网络连接
- 合适的显示器和键盘
- 充足的光线

### 3. 保持有效沟通 💬

- 定期的团队会议
- 使用合适的沟通工具
- 主动分享工作进展
- 及时反馈和求助

### 4. 维护社交联系 👥

- 参加线上团建活动
- 与同事保持非工作交流
- 加入专业社群
- 定期线下聚会

## 远程工作适合什么样的人？

### 适合的特质：
- **自律性强**：能够自我管理和激励
- **沟通能力好**：善于通过各种方式表达
- **独立工作能力强**：不需要太多指导
- **技术适应性好**：熟悉各种协作工具

### 适合的工作类型：
- 编程开发
- 设计创作
- 文字工作
- 数据分析
- 在线教育

## 公司角度的考虑

### 优势：
- 降低办公成本
- 扩大人才招聘范围
- 提高员工满意度
- 减少员工流失

### 挑战：
- 管理难度增加
- 企业文化传承困难
- 团队协作效率可能下降
- 信息安全风险

## 未来的工作模式

我认为未来的工作模式可能是**混合式的**：

- **核心工作时间**：团队协作、重要会议
- **灵活工作时间**：个人深度工作
- **定期线下聚会**：团队建设、文化传承
- **项目导向**：根据项目需要调整工作方式

## 写在最后

远程工作不是万能的，也不是适合所有人的。它有明显的优势，也有不可忽视的挑战。

**关键是找到适合自己和团队的平衡点。**

对于个人来说：
- 诚实评估自己是否适合远程工作
- 不断提升自己的远程工作技能
- 保持开放的心态，适应变化

对于公司来说：
- 建立完善的远程工作制度
- 投资必要的技术和工具
- 关注员工的心理健康
- 保持企业文化的传承

远程工作改变了我们对"工作"的定义，也让我们重新思考工作与生活的关系。无论选择哪种工作方式，最重要的是找到让自己和团队都能高效、快乐工作的方法。

---

*你对远程工作有什么看法？欢迎在评论区分享你的经验和思考。*`
      },
      '3': {
        title: t('AI 时代的程序员', 'Programmers in the AI Era'),
        category: t('社会热点', 'Social Trends'),
        date: "2025-03-21",
        readTime: t('10 分钟阅读', '10 min read'),
        content: `# AI 时代的程序员

> 人工智能的快速发展对程序员意味着什么？我们应该如何应对这个时代的变化？

## 引言

ChatGPT 的横空出世，让整个科技界为之震撼。作为程序员，我们既兴奋于AI技术的突破，又不免担心：**AI会取代程序员吗？**

这个问题没有标准答案，但我想分享一些思考和观察。

## AI 对编程工作的影响

### 1. 代码生成能力的提升 🤖

现在的AI工具已经能够：
- 根据需求描述生成代码
- 自动补全复杂的代码逻辑
- 解释和优化现有代码
- 生成测试用例

**这确实提高了编程效率，但也改变了我们的工作方式。**

### 2. 调试和问题解决 🔍

AI在以下方面表现出色：
- 快速定位bug
- 提供多种解决方案
- 解释错误信息
- 推荐最佳实践

### 3. 学习和文档 📚

- 即时解答技术问题
- 生成代码注释和文档
- 提供学习路径建议
- 翻译技术文档

## 程序员的核心价值在哪里？

### 1. 问题理解和需求分析 🎯

**AI可以写代码，但它不能理解业务需求。**

- 与客户沟通，理解真实需求
- 将模糊的想法转化为具体的技术方案
- 平衡技术实现与业务目标
- 预见潜在的问题和风险

### 2. 系统设计和架构思维 🏗️

- 设计可扩展的系统架构
- 选择合适的技术栈
- 考虑性能、安全、维护性
- 制定技术发展路线

### 3. 创新和创造力 ✨

- 提出创新的解决方案
- 结合不同技术创造新价值
- 推动技术边界的突破
- 引领技术发展方向

### 4. 团队协作和领导力 👥

- 代码审查和质量把控
- 技术决策和风险评估
- 团队培养和知识传承
- 跨部门沟通协调

## 如何在AI时代保持竞争力？

### 1. 拥抱AI工具，提高效率 🚀

**不要抗拒AI，而要学会利用它。**

- 熟练使用各种AI编程助手
- 将AI作为提高效率的工具
- 学会与AI协作的最佳实践
- 保持对新AI工具的敏感度

### 2. 专注于高层次的技能 📈

- **系统思维**：从全局角度思考问题
- **业务理解**：深入了解所在行业
- **沟通能力**：清晰表达技术方案
- **学习能力**：快速适应新技术

### 3. 培养跨领域知识 🌐

- 了解产品设计和用户体验
- 学习数据分析和商业洞察
- 掌握项目管理技能
- 关注行业趋势和发展

### 4. 保持持续学习 📖

技术发展日新月异，特别是AI领域：
- 关注最新的AI技术发展
- 学习机器学习和深度学习基础
- 了解AI在各个领域的应用
- 参与开源项目和技术社区

## AI时代的新机会

### 1. AI应用开发 �

- 开发AI驱动的应用
- 集成AI服务到现有系统
- 优化AI模型的性能
- 构建AI工具和平台

### 2. AI工程师角色 ⚙️

- 数据工程和处理
- 模型训练和优化
- AI系统的部署和维护
- AI产品的设计和开发

### 3. AI伦理和安全 🛡️

- 确保AI系统的公平性
- 保护用户隐私和数据安全
- 防范AI系统的滥用
- 建立AI治理框架

## 对不同层次程序员的建议

### 初级程序员 🌱

- **不要过度依赖AI**：基础技能仍然重要
- **理解代码原理**：不只是复制粘贴
- **多做项目实践**：积累实际经验
- **培养解决问题的思维**

### 中级程序员 🚀

- **学会架构设计**：从单个功能到整个系统
- **提升业务理解**：技术与业务结合
- **培养团队协作能力**：代码审查、知识分享
- **关注技术趋势**：保持技术敏感度

### 高级程序员 🎯

- **成为技术领导者**：引导团队技术方向
- **培养商业思维**：技术决策与商业价值
- **投资于人际关系**：跨部门协作能力
- **思考技术的社会影响**：承担更大责任

## 行业变化的思考

### 编程教育的变革

- 更注重问题解决能力
- 强调系统思维和架构设计
- 增加跨学科知识
- 培养与AI协作的能力

### 软件开发流程的改变

- 更快的原型开发
- 更多的迭代和实验
- 更强调用户反馈
- 更注重产品价值

### 新的职业发展路径

- AI产品经理
- AI系统架构师
- 数据工程师
- AI伦理专家

## 写在最后

AI时代的到来，确实给程序员带来了挑战，但更多的是机会。

**关键不是担心被取代，而是如何进化。**

我们需要：
- 保持开放的心态，拥抱变化
- 专注于人类独有的能力
- 不断学习和适应新技术
- 思考技术的更大价值和意义

程序员的核心价值不在于写代码的速度，而在于：
- 理解问题的深度
- 设计方案的智慧
- 解决问题的创造力
- 推动世界进步的使命感

AI是我们的工具，不是我们的替代者。让我们一起在这个激动人心的时代，创造更大的价值。

---

*技术在变，但创造美好世界的初心不变。愿我们都能在AI时代找到自己的位置，发挥独特的价值。*`
      },
      '4': {
        title: t('梦憩随笔 -- 八月九日梦', 'Dream Reverie -- August 9th Dream'),
        category: t('生活随笔', 'Life Essays'),
        date: "2025-08-09",
        readTime: t('6 分钟阅读', '6 min read'),
        content: `# 梦憩随笔 -- 八月九日梦

> 桌子上的那摊东西起初只是模糊的褐影，细碎的嗡鸣伴着酸腐气味，无不提醒我——那颗苹果已然腐烂，这是在明确不过的事实。

我是刚睡醒，清晰地记得梦到了多年前喜欢的人，很可惜没有进一步发展， 在梦中关系倒是拉近了很多， 不过也有所距离。对于这理性，这在梦中仍保持的这份理性，我既惋惜又窃喜。这纯粹又稍显稚嫩的关系和感情，犹如度数不高的酒，让人迷醉，无法自拔。

醒来后后劲十足，感慨良多， 展开的聊天记录也抵不过时间的大清洗变的一片惨白，让人无奈。 曾几何时，QQ的SVIP正是我缓存聊天记录的工具，是封装青春记忆的钥匙， 也随着日月交替像桌子上放着说下次吃的苹果腐朽变质了。

## 时光与智慧

这些年，读了不少书走了不少路，认知可能有所增长，但是， 要说我智慧增长，说我没有光阴虚度，或说我光阴虚度，我是不敢立刻回答的。 智慧？ 不过是徒增狡黠罢了， 光阴？ 诶，算了… 诚然，在超市能买到新鲜的苹果，但它真的属于我吗？ 它还是那一颗苹果么？ 断然不是罢。

捏着纸巾拎起苹果的瞬间，果蝇群像被惊扰的水纹猛地散开，又在半秒内重新聚拢；用塑料袋裹起来，那股甜腻的酸腐味骤地变得浓烈，像打开了一瓶变质的果酒。

## 梦境与现实

在梦马上终结，就快要醒来得时候，突然就冒出了 **"夜深忽梦少年事，梦啼妆泪红阑干"** ， 情感真是单纯的纯粹的人与人之间的联系吧， 情感难续， 联系也就断了。 那利益呢？君子之交淡入清水，悠远绵长。  利益之交是小人之交，甘如甜酒， 一时之利罢了，猛烈而又短暂。

更何况，把前者看作水，那么后者就是火。 火的品质是对抗而非顺从，水的品质是顺从而非对抗， 火以作用为主，形体为次，水以形体为主，作用为次， 差别怎么能说不大呢？不过，"小人"与"君子"，"情感"与"利益"，各有各的品质，各有各的作用，我哪里分得清呢？

## 理性与感性

经济学中很多原理都是基于理性人（rational people）这个假设。 我想我一定时候处于感性与理智的交战中，前者处于上位，我就做梦，后者处于上位，我就狡黠。

这梦是7:30之前的梦，写到此处已经到了正午。**"神龟虽寿，犹有尽时"**，这微醺的状态马上解除，余味即将散尽，意识越来越清醒，梦境却愈来愈模糊。我是一边回忆梦境，一边用我这拙劣的可笑的遣词造句，到现在，已经不记得情景，只记得做过一个梦，连人——和我唱对角戏的那人，好像都忘了是谁。也罢。也罢。

## 青春与感悟

很感谢我们在梦中的几个小时，我一向睡眠质量比较差，很感谢你让我坚持了几小时！**"醉后不知天在水，满船清梦压星河"**，"做梦"和"醉酒"真的很像，幸运的是我酒量不好，所以我两个都经历过，"梦中无年岁"，梦中几个小时真的像是一年或是几年，如果我梦到的这个人也是现实中的，那理应也是几年青春吧！

果真如人们所说**"人不同同时拥有青春和对青春的感悟"**，"当时只道是寻常"，还以为"青春"是承载才子们满溢出的伤春悲秋的载体，只被我用来作为作文的引用，别无他用。

## 小小的发现

我突然发现我在思考构思时，有用一只手的手指去抠另一只手的手指的习惯，怪不得我的指甲像天蚕土豆（或者狼牙土豆），特别是食指。

就在我抠指甲构思的时候，瞥见了摆在地上看过的书，**"河水无处不在。无论在源头、河口、瀑布、船埠，还是在湍流中、大海里、山涧中。对于河水来说只有当下。既没有过去的影子，也没有未来的影子"**，"是的。我领悟到这个道理后，认出我的生活也是一条河。这条河用幻象，而非现实，隔开少年悉达多、成年悉达多和老年悉达多。悉达多的前世并非过去，死亡和重归梵天亦并非未来。没有过去，没有未来。一切都是本质和当下"。

## 尾声

桌子收拾干净了，可空气中还飘着点怅然若失的味道。两三只果蝇在那里打着转，像是父母去买菜，被留在还没结账的早餐店的小孩，望着豆浆和油条的热气，独自面对着空前的喧哗的寂静。日光渐斜，它们的影子拖得很长，带着点黄金时代落幕的慵懒。

---

*梦境如河水，只有当下。愿我们都能在感性与理性的交战中，找到属于自己的平衡。*`
      }
    }

    const article = articles[articleId as keyof typeof articles]
    if (article) {
      setArticleTitle(article.title)
      setArticleContent(article.content)
      setArticleMeta({
        date: article.date,
        category: article.category,
        readTime: article.readTime
      })
    } else {
      setArticleTitle(t('文章未找到', 'Article Not Found'))
      setArticleContent(t('抱歉，未找到对应的文章。', 'Sorry, the corresponding article was not found.'))
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{t('加载中...', 'Loading...')}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* 移动端布局 */}
      <div className="block md:hidden">
        <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <div className="px-4 py-8">
            {/* 移动端返回按钮 */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/life">
                <motion.button
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回生活感悟
                </motion.button>
              </Link>
            </motion.div>

            {/* 移动端文章内容 */}
            <motion.article
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 移动端文章头部 */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    {articleMeta.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                    📅 {articleMeta.date}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                    ⏱️ {articleMeta.readTime}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {articleTitle}
                </motion.h1>
              </div>

              {/* 移动端文章正文 - 参考电脑端配置 */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => (
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6 first:mt-0 pb-2 border-b border-gray-200 dark:border-gray-700">
                          {children}
                        </h1>
                      ),
                      h2: ({children}) => (
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-8 flex items-center">
                          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3" />
                          {children}
                        </h2>
                      ),
                      h3: ({children}) => (
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 mt-6">
                          {children}
                        </h3>
                      ),
                      h4: ({children}) => (
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 mt-4">
                          {children}
                        </h4>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 my-4 rounded-r-lg italic">
                          <div className="text-blue-900 dark:text-blue-100 text-sm">
                            {children}
                          </div>
                        </blockquote>
                      ),
                      p: ({children}) => (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                          {children}
                        </p>
                      ),
                      strong: ({children}) => (
                        <strong className="font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-700 px-1 rounded">
                          {children}
                        </strong>
                      ),
                      em: ({children}) => (
                        <em className="italic text-gray-800 dark:text-gray-200">
                          {children}
                        </em>
                      ),
                      ul: ({children}) => (
                        <ul className="list-disc list-inside space-y-2 my-4">
                          {children}
                        </ul>
                      ),
                      ol: ({children}) => (
                        <ol className="list-decimal list-inside space-y-2 my-4">
                          {children}
                        </ol>
                      ),
                      li: ({children}) => (
                        <li className="text-gray-700 dark:text-gray-300 text-sm">
                          {children}
                        </li>
                      ),
                      code: ({children}) => (
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono">
                          {children}
                        </code>
                      ),
                      table: ({children}) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-xs">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({children}) => (
                        <th className="px-3 py-2 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          {children}
                        </th>
                      ),
                      td: ({children}) => (
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-gray-300">
                          {children}
                        </td>
                      )
                    }}
                  >
                    {articleContent}
                  </ReactMarkdown>
                </div>
              </motion.div>
            </motion.article>

            {/* 移动端底部导航 */}
            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/life">
                <motion.div
                  className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回列表
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 桌面端布局 */}
      <div className="hidden md:block">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 返回按钮 */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/life">
              <motion.div 
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                whileHover={{ x: -4 }}
              >
                <motion.svg 
                  className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
                {t('返回文章列表', 'Back to Articles')}
              </motion.div>
            </Link>
          </motion.div>

          {/* 文章头部 */}
          <motion.header 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* 分类标签 */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span 
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {articleMeta.category}
              </motion.span>
            </motion.div>
            
            {/* 文章标题 */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {articleTitle}
              </motion.span>
            </motion.h1>
            
            {/* 装饰线 */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            
            {/* 文章元信息 */}
            <motion.div 
              className="flex items-center justify-center space-x-8 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div 
                className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg 
                  className="w-5 h-5 mr-2 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z" />
                </motion.svg>
                {articleMeta.date}
              </motion.div>
              <motion.div 
                className="flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg 
                  className="w-5 h-5 mr-2 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                {articleMeta.readTime}
              </motion.div>
            </motion.div>
          </motion.header>

          {/* 文章内容容器 */}
          <motion.article 
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 rounded-3xl" />
            
            {/* 主要内容区域 */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50 dark:border-gray-700/50">
              {/* 顶部装饰条 */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="p-8 lg:p-12">
                {/* 阅读进度条 */}
                <motion.div
                  className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
                  style={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                
                {/* 文章正文 */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => (
                        <motion.h1 
                          className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          {children}
                        </motion.h1>
                      ),
                      h2: ({children}) => (
                        <motion.h2 
                          className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6 flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4" />
                          {children}
                        </motion.h2>
                      ),
                      h3: ({children}) => (
                        <motion.h3 
                          className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          {children}
                        </motion.h3>
                      ),
                      blockquote: ({children}) => (
                        <motion.blockquote 
                          className="relative border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 my-8 rounded-r-xl shadow-lg"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="absolute top-4 left-4 text-blue-500 opacity-30">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                          </div>
                          <div className="relative z-10 italic text-blue-900 dark:text-blue-100 font-medium">
                            {children}
                          </div>
                        </motion.blockquote>
                      ),
                      p: ({children}) => (
                        <motion.p 
                          className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          {children}
                        </motion.p>
                      ),
                      strong: ({children}) => (
                        <strong className="font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-700 px-1 rounded">
                          {children}
                        </strong>
                      ),
                      ul: ({children}) => (
                        <motion.ul 
                          className="space-y-3 my-6"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          {children}
                        </motion.ul>
                      ),
                      li: ({children}) => (
                        <motion.li 
                          className="flex items-start text-gray-700 dark:text-gray-300"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 mr-3 flex-shrink-0" />
                          <span>{children}</span>
                        </motion.li>
                      ),
                      code: ({children}) => (
                        <code className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-2 py-1 rounded-md text-sm font-mono border border-gray-200 dark:border-gray-600">
                          {children}
                        </code>
                      )
                    }}
                  >
                    {articleContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.article>

          {/* 文章底部导航 */}
          <motion.div 
            className="mt-16 flex items-center justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/life">
              <motion.div 
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('返回列表', 'Back to List')}
              </motion.div>
            </Link>

            <motion.div 
              className="flex items-center space-x-4"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
              
              <motion.button
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </Layout>
  )
}



