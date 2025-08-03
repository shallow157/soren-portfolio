import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

export default function ReportPage() {
  const router = useRouter()
  const { id } = router.query
  const { t } = useLanguage()
  const [reportContent, setReportContent] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectMeta, setProjectMeta] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      loadReport(id as string)
    }
  }, [id])

  const loadReport = async (projectId: string) => {
    setLoading(true)
    
    // 根据项目ID获取对应的报告内容
    const reports = {
      '1': {
        title: t('酒店预订取消率分析报告', 'Hotel Booking Cancellation Analysis Report'),
        category: t('机器学习', 'Machine Learning'),
        gradient: 'from-blue-500 to-purple-600',
        icon: '🏨',
        tags: ['Python', 'XGBoost', 'SQL', 'PowerBI'],
        content: `# 酒店预订取消率分析报告

## 一、引言

本报告旨在深入分析酒店预订数据，探究影响酒店预订取消率的因素，特别是City Hotel取消率显著高于Resort Hotel的原因，并提出针对性的优化策略和解决方案，构建取消预测模型和动态策略模拟沙盘，以降低取消率，提高酒店收益。

> **项目来源**：本项目中的数据来源于Kaggle开放数据Hotel booking demand  
> **数据链接**：https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand

## 二、数据概览与预处理

### 2.1 数据集基本信息

| 指标 | 数值 |
|------|------|
| **数据规模** | 119,390条预订记录 |
| **时间跨度** | 2015年7月1日 - 2017年8月31日 |
| **酒店类型** | City Hotel（城市酒店）和Resort Hotel（度假酒店） |
| **字段数量** | 32个特征变量 |

### 2.2 数据质量分析

通过数据探索发现：
- 缺失值主要集中在agent、company、country等字段
- 存在异常值，如adr（平均日房价）出现负值
- 部分逻辑错误，如成人+儿童+婴儿总数为0的记录

### 2.3 数据预处理步骤

1. **缺失值处理**：对agent和company字段的缺失值填充为0
2. **异常值处理**：删除adr为负值和客人总数为0的记录
3. **特征工程**：
   - 创建total_guests（总客人数）
   - 创建booking_changes_flag（是否有预订变更）
   - 对分类变量进行编码

## 三、探索性数据分析

### 3.1 整体取消率分析

| 酒店类型 | 取消率 |
|----------|--------|
| **总体取消率** | 37.04% |
| **City Hotel取消率** | 41.73% |
| **Resort Hotel取消率** | 27.76% |
| **取消率差异** | 13.97个百分点 |

### 3.2 关键影响因素分析

#### 3.2.1 提前预订时间
- City Hotel平均提前预订时间：**104天**
- Resort Hotel平均提前预订时间：**92天**
- 提前预订时间越长，取消率越高

#### 3.2.2 押金政策
- 无押金政策取消率：**42.3%**
- 不可退款政策取消率：**99.2%**
- 押金政策对取消率影响显著

## 四、机器学习建模

### 4.1 模型选择与调优

选择**XGBoost**作为主要预测模型，原因：
- 处理类别不平衡问题效果好
- 特征重要性解释性强
- 预测性能优异

### 4.2 模型性能

| 指标 | 训练集 | 测试集 |
|------|--------|--------|
| **AUC** | 0.8919 | 0.9069 |
| **准确率** | - | 87.2% |
| **召回率** | - | 82.5% |
| **精确率** | - | 85.8% |

## 五、结论与建议

### 5.1 核心发现

1. **取消率差异显著**：City Hotel取消率比Resort Hotel高13.97个百分点
2. **关键影响因素**：提前预订时间、押金政策、分销渠道是主要驱动因素
3. **预测模型有效**：XGBoost模型能够准确识别高风险订单

### 5.2 商业价值

1. **收益优化**：通过预测模型识别高风险订单，提前采取干预措施
2. **库存管理**：基于取消率预测优化超售策略
3. **客户细分**：针对不同风险等级客户制定差异化策略

---

*本报告基于数据科学方法，为酒店行业提供了实用的取消率分析框架和预测工具。*`
      },
      '2': {
        title: t('某宝用户行为数据分析报告', 'Taobao User Behavior Analysis Report'),
        category: t('数据挖掘', 'Data Mining'),
        gradient: 'from-green-500 to-teal-600',
        icon: '🛒',
        tags: ['MySQL', 'Tableau', 'Python', 'RFM模型'],
        content: `# 某宝用户行为数据分析报告

## 一、项目背景与目标

### 1.1 项目背景

随着电子商务的快速发展，用户行为数据分析已成为提升用户体验、优化营销策略的重要手段。本项目基于某宝平台的用户行为数据集，通过MySQL数据库技术对海量用户行为数据进行清洗、分析和挖掘。

### 1.2 项目目标

- 完成**1亿条**用户行为数据的高效导入与预处理
- 从获客、留存、转化等多个维度进行用户行为分析
- 构建用户价值评估模型（**RFM模型**）
- 通过Tableau实现数据可视化，直观展示分析结果

## 二、数据来源与准备

### 2.1 数据集介绍

本项目使用的数据集为阿里云天池公开数据集"**User Behavior Data from Taobao for Recommendation**"，包含约1亿条用户行为记录。

### 2.2 数据字段说明

| 字段 | 说明 |
|------|------|
| **User ID** | 序列化后的用户ID |
| **Item ID** | 序列化后的商品ID |
| **Category ID** | 序列化后的商品所属类目ID |
| **Behavior type** | 行为类型（pv-浏览, buy-购买, cart-加购, fav-收藏） |
| **Timestamp** | 行为发生的时间戳 |

## 三、数据分析结果

### 3.1 基础统计分析

| 指标 | 数值 |
|------|------|
| **总记录数** | 100,150,807条 |
| **用户数** | 987,994人 |
| **商品数** | 4,162,024件 |
| **商品类别数** | 9,439个 |

### 3.2 行为类型分布

| 行为类型 | 占比 | 描述 |
|----------|------|------|
| **pv（浏览）** | 89.53% | 用户浏览商品页面 |
| **cart（加购）** | 5.52% | 用户将商品加入购物车 |
| **fav（收藏）** | 2.88% | 用户收藏商品 |
| **buy（购买）** | 2.07% | 用户完成购买 |

### 3.3 用户留存分析

| 留存周期 | 留存率 |
|----------|--------|
| **次日留存率** | 32.5% |
| **7日留存率** | 18.7% |
| **30日留存率** | 8.9% |

## 四、RFM用户分群分析

### 4.1 用户分群结果

| 用户群体 | 占比 | 特征描述 |
|----------|------|----------|
| **重要价值客户** | 8.2% | 高频次、高金额、近期活跃 |
| **重要发展客户** | 12.5% | 高金额但频次较低 |
| **重要保持客户** | 15.3% | 高频次但金额一般 |
| **重要挽留客户** | 6.8% | 高价值但近期不活跃 |
| **一般价值客户** | 28.7% | 各项指标均为中等水平 |
| **其他客户** | 28.5% | 低价值客户群体 |

## 五、结论与建议

### 5.1 主要结论

1. **用户活跃高峰**：晚上20-23点为用户活跃高峰时段
2. **留存率水平**：整体次日留存率处于中等水平，有提升空间
3. **转化漏斗**：多数用户需要经过多个环节才会完成购买
4. **价值用户**：通过RFM模型成功识别出高价值用户群体

### 5.2 运营建议

#### 📈 营销策略优化
1. 在用户活跃高峰时段（20-23点）加大促销活动投放
2. 针对次日流失用户设计个性化召回机制

#### 🛒 转化率提升
1. 简化购买流程，减少用户决策成本
2. 优化商品推荐算法，提高转化效率

#### 👥 用户分层运营
1. 对**重要价值客户**提供专属服务和优惠
2. 对**重要挽留客户**实施精准召回策略
3. 对**重要发展客户**推送高价值商品

---

*本报告基于大数据分析技术，为电商平台用户运营提供了科学的数据支撑和策略建议。*`
      },
      '3': {
        title: t('《红海行动》豆瓣评论分析报告', 'Red Sea Operation Douban Review Analysis'),
        category: t('文本分析', 'Text Analysis'),
        gradient: 'from-red-500 to-orange-600',
        icon: '🎬',
        tags: ['Python', 'NLP', 'Selenium', 'WordCloud'],
        content: `# 《红海行动》豆瓣评论数据分析报告

## 1. 项目概述

### 1.1 项目背景

电影作为文化消费的重要载体，其观众评论蕴含着丰富的市场反馈与情感倾向。《红海行动》作为中国军事题材电影的代表作，以其震撼的视觉效果和强烈的爱国主义情怀引发广泛讨论。本项目通过对豆瓣平台评论数据的挖掘，旨在剖析观众对影片的评价特征。

### 1.2 项目目标

- **数据收集**：爬取豆瓣《红海行动》短评数据，构建评论数据集
- **数据预处理**：清洗、标准化数据，提取关键特征
- **多维分析**：从评分分布、情感倾向、时间趋势等维度展开分析
- **可视化呈现**：通过图表、词云等方式直观展示分析结果

## 2. 数据来源与预处理

### 2.1 数据来源

| 项目 | 详情 |
|------|------|
| **平台** | 豆瓣电影 |
| **数据范围** | 《红海行动》短评区前600条评论 |
| **时间截止** | 2025年6月 |

### 2.2 数据字段说明

| 字段名 | 说明 | 示例 |
|--------|------|------|
| **scores** | 用户评分（1-5星转换为10-50分） | 40分 |
| **content** | 评论内容 | "震撼的军事大片..." |
| **time** | 评论时间 | 2018-02-16 |
| **user_citys** | 用户所在城市 | 北京 |
| **votes** | 评论获赞数 | 25 |

### 2.3 数据预处理流程

1. **格式规范化**：统一时间格式、评分标准化
2. **缺失值处理**：删除评论内容为空的记录
3. **异常值过滤**：移除明显的垃圾评论
4. **文本预处理**：分词、停用词处理

## 3. 数据分析与结果

### 3.1 评分分布分析

| 评分区间 | 占比 | 评价等级 |
|----------|------|----------|
| **40-50分（4-5星）** | 66.78% | 好评 ⭐⭐⭐⭐⭐ |
| **20-30分（2-3星）** | 21.69% | 中评 ⭐⭐⭐ |
| **10分以下（1星）** | 11.54% | 差评 ⭐ |

> **结论**：超六成观众给出好评，表明影片整体口碑优异，军事题材与爱国主义表达获得广泛认可。

### 3.2 情感分析结果

#### 3.2.1 好评关键词 🎯

| 关键词 | 频次 | 情感倾向 |
|--------|------|----------|
| **震撼** | 156次 | 极正面 |
| **真实** | 142次 | 正面 |
| **爱国** | 128次 | 正面 |
| **精彩** | 115次 | 正面 |

#### 3.2.2 差评关键词 ⚠️

| 关键词 | 频次 | 情感倾向 |
|--------|------|----------|
| **暴力** | 89次 | 负面 |
| **血腥** | 76次 | 负面 |
| **剧情** | 65次 | 中性偏负 |
| **逻辑** | 52次 | 负面 |

### 3.3 时空分布特征

#### 3.3.1 时间分布 📅

| 时间段 | 评论占比 | 特征 |
|--------|----------|------|
| **12-14时** | 28.5% | 午休高峰 |
| **22-24时** | 35.2% | 晚间高峰 |
| **其他时段** | 36.3% | 分散分布 |

#### 3.3.2 地域分布 🗺️

| 地区 | 评论量 | 好评率 |
|------|--------|--------|
| **北京** | 125条 | 72.8% |
| **上海** | 98条 | 69.4% |
| **广东** | 87条 | 71.3% |
| **其他** | 290条 | 64.1% |

> **发现**：一线城市评论量最高，好评率也相对更高。

## 4. 结论与建议

### 4.1 核心结论 📊

1. **口碑优异**：《红海行动》以高好评率确立军事题材标杆地位
2. **受众特征**：年轻群体为评论主力，晚间为主要互动时段
3. **地域差异**：经济发达地区参与度与认可度更高
4. **争议焦点**：暴力场景的适众性成为主要争议点

### 4.2 创作建议 🎬

#### 内容优化
- 在保持视觉冲击力的同时，**加强剧情逻辑**
- 平衡暴力场面与情感表达，提升适众性

#### 营销策略
- 针对不同地域文化特征制定**差异化宣传策略**
- 利用晚间时段进行重点推广

#### 产业发展
- 推动军事题材类型化细分
- 利用导演品牌效应，打造**系列军事IP**

---

*本报告通过数据挖掘技术，为电影市场分析和创作决策提供了科学依据。*`
      },
      '4': {
        title: t('四川省CPI与货币供应量分析报告', 'Sichuan CPI & Money Supply Analysis Report'),
        content: `# 四川省CPI与货币供应量时间序列分析报告

## 1. 研究背景与意义

### 1.1 研究背景

货币政策作为宏观经济调控的重要工具，其传导机制和效果一直是经济学研究的核心问题。本研究以四川省为例，运用时间序列分析方法，深入探讨**CPI与货币供应量M2**的相互关系。

### 1.2 研究意义

| 意义类型 | 具体内容 |
|----------|----------|
| **理论意义** | 验证货币数量论在地方层面的适用性 |
| **实践意义** | 为四川省宏观经济政策制定提供实证支持 |
| **方法意义** | 展示时间序列分析在经济研究中的应用 |

## 2. 数据来源与描述

### 2.1 数据来源

| 项目 | 详情 |
|------|------|
| **数据来源** | 中国人民银行、国家统计局四川调查总队 |
| **时间跨度** | 2000年1月-2020年12月 |
| **观测值** | 252个月度观测值 |
| **变量说明** | CPI（四川省居民消费价格指数）、M2（全国货币供应量） |

### 2.2 描述性统计

| 变量 | 均值 | 标准差 | 趋势特征 |
|------|------|--------|----------|
| **CPI** | 108.5 | 12.3 | 明显上升趋势 |
| **M2** | 89.7万亿元 | 67.8万亿元 | 明显上升趋势 |

## 3. 实证分析结果

### 3.1 单位根检验 📈

| 序列 | ADF统计量 | 结论 | 一阶差分 |
|------|-----------|------|----------|
| **CPI序列** | -2.156 | 非平稳 | ✅ 平稳 |
| **M2序列** | -1.892 | 非平稳 | ✅ 平稳 |

### 3.2 协整检验 🔗

**Johansen协整检验**结果显示：
- ✅ 存在**一个协整关系**
- 📊 长期均衡方程：**CPI = 0.567 × M2 + 常数项**
- 📈 货币供应量每增长1%，CPI长期内上升**0.567%**

### 3.3 VAR模型分析

建立**VAR(3)模型**，结果显示：

| 指标 | 数值 | 说明 |
|------|------|------|
| **模型拟合度** | R² = 0.89 | 拟合度良好 |
| **滞后期影响** | 3期显著 | M2对CPI有显著正向影响 |
| **传导滞后** | 约3个月 | 货币政策传导滞后期 |

### 3.4 格兰杰因果检验 🎯

| 因果关系 | F统计量 | P值 | 结论 |
|----------|---------|-----|------|
| **M2 → CPI** | 8.45 | p<0.01 | ✅ M2是CPI的格兰杰原因 |
| **CPI → M2** | 1.23 | p>0.1 | ❌ CPI不是M2的格兰杰原因 |

> **结论**：验证了货币供应量对通胀的**单向因果关系**

### 3.5 脉冲响应分析 📊

**M2正向冲击对CPI的影响**：
- 🔥 影响在第**3个月**达到峰值
- ⏱️ 持续约**12个月**
- 📈 累积效应与协整关系一致

## 4. 政策含义与建议

### 4.1 主要发现 🔍

1. **长期均衡**：四川省CPI与全国M2存在稳定的长期均衡关系
2. **因果关系**：货币供应量是CPI的格兰杰原因
3. **传导效应**：货币政策冲击对CPI的影响显著且持续
4. **政策影响**：地方CPI受全国货币政策影响显著

### 4.2 政策建议 💡

#### 宏观调控策略

| 建议类型 | 具体措施 |
|----------|----------|
| **前瞻性调控** | 基于M2增长率预测通胀趋势 |
| **精准调控** | 考虑货币政策传导的3个月滞后性 |
| **区域协调** | 关注地方通胀差异，制定差异化政策 |
| **预期管理** | 加强货币政策沟通，稳定市场预期 |

#### 实施路径

1. **监测预警**：建立CPI-M2动态监测体系
2. **政策协调**：加强央地政策协调机制
3. **风险防控**：提前识别通胀风险信号
4. **效果评估**：定期评估政策传导效果

## 5. 结论 📋

本研究通过严谨的时间序列分析，**验证了货币数量论在地方层面的适用性**。主要结论如下：

- 🎯 货币供应量与CPI存在**稳定的长期均衡关系**
- ⚡ 货币政策在通胀管理中发挥**重要作用**
- 🔧 需要加强货币政策的**前瞻性和精准性**
- 📊 研究为理解货币政策传导机制提供了**实证证据**

---

*本报告运用现代计量经济学方法，为货币政策制定和宏观经济调控提供了科学依据。*`
      }
    }

    const report = reports[projectId]
    if (report) {
      setProjectTitle(report.title)
      setReportContent(report.content)
    } else {
      setProjectTitle(t('报告未找到', 'Report Not Found'))
      setReportContent(t('抱歉，未找到对应的项目报告。', 'Sorry, the corresponding project report was not found.'))
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('返回项目列表', 'Back to Projects')}
          </Link>
        </div>

        {/* 报告头部 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {projectTitle}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z" />
              </svg>
              {t('数据分析报告', 'Data Analysis Report')}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* 报告内容 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-table:text-sm prose-th:bg-gray-50 dark:prose-th:bg-gray-700 prose-td:border-gray-200 dark:prose-td:border-gray-600">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{children}</h4>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 my-4 italic">{children}</blockquote>,
                  table: ({children}) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">{children}</table></div>,
                  th: ({children}) => <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{children}</th>,
                  td: ({children}) => <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{children}</td>,
                  code: ({children}) => <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                  ul: ({children}) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>,
                  li: ({children}) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                  p: ({children}) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{children}</p>,
                  strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                  em: ({children}) => <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
                }}
              >
                {reportContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="text-center mt-12">
          <Link href="/projects" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('返回项目列表', 'Back to Projects')}
          </Link>
        </div>
      </div>
    </Layout>
  )
}



