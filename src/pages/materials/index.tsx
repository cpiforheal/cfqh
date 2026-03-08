import { ScrollView, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';

const tabs = ['全部资料', '高数系列', '医护系列', '考前冲刺'];

const overviewCards = [
  { value: '8+', label: '在售资料', note: '教材 / 习题 / 模拟 / 冲刺' },
  { value: '2', label: '核心方向', note: '高数 / 医护两大主线' },
  { value: '4', label: '资料类型', note: '按备考阶段拆分组合' }
];

const featuredSets = [
  {
    title: '高数资料套系',
    tag: '主推套装',
    accent: '#5b4dff',
    gradient: 'linear-gradient(135deg, #6658ff 0%, #29345f 100%)',
    desc: '覆盖基础梳理、专项训练、整卷模拟和考前冲刺，适合完整备考周期使用。',
    items: ['核心精讲', '题型训练', '全真模拟', '冲刺卷']
  },
  {
    title: '医护资料套系',
    tag: '方向资料',
    accent: '#0f172a',
    gradient: 'linear-gradient(135deg, #1f2f4f 0%, #0f172a 100%)',
    desc: '围绕专业课与公共课协同整理，便于医护类学员按阶段推进复习节奏。',
    items: ['核心讲义', '高频题型', '全真模拟', '冲刺卷']
  }
];

const groups = [
  {
    title: '高数系列',
    desc: '面向理工、经管类专转本考生，覆盖基础梳理、题型训练到考前冲刺。',
    accent: '#5b4dff',
    background: '#f7f5ff',
    shelfLabel: '高数资料书架',
    items: [
      {
        type: '教材',
        title: '高数核心精讲',
        stage: '基础阶段',
        subtitle: '公式体系 / 概念重建',
        desc: '围绕公式体系、核心概念和高频考点搭建完整知识框架。',
        contents: ['知识框架', '例题精讲', '阶段小结']
      },
      {
        type: '习题集',
        title: '高数题型训练',
        stage: '强化阶段',
        subtitle: '题型拆解 / 方法归纳',
        desc: '针对典型题型做拆解训练，适合日常刷题和阶段巩固。',
        contents: ['专项训练', '错题复盘', '解题方法']
      },
      {
        type: '模拟卷',
        title: '高数全真模拟卷',
        stage: '冲刺阶段',
        subtitle: '整卷训练 / 节奏校准',
        desc: '按照考试节奏设计整卷训练，帮助学员建立答题时间感。',
        contents: ['整卷练习', '答案解析', '时间分配']
      },
      {
        type: '冲刺卷',
        title: '高数考前冲刺卷',
        stage: '考前阶段',
        subtitle: '高频压缩 / 易错回看',
        desc: '聚焦最后阶段的高频点、易错点和压轴题型回顾。',
        contents: ['高频考点', '压轴回顾', '考前提示']
      }
    ]
  },
  {
    title: '医护系列',
    desc: '围绕护理、助产、临床等方向，覆盖专业课、公共课和阶段模考资料。',
    accent: '#0f172a',
    background: '#f8fafc',
    shelfLabel: '医护资料书架',
    items: [
      {
        type: '教材',
        title: '医护核心知识讲义',
        stage: '基础阶段',
        subtitle: '框架梳理 / 核心课协同',
        desc: '梳理解剖、生理、护理等核心课程框架，适合系统复习。',
        contents: ['知识梳理', '核心笔记', '重点归纳']
      },
      {
        type: '习题集',
        title: '医护高频题型集',
        stage: '强化阶段',
        subtitle: '专项刷题 / 高频整理',
        desc: '把高频考点拆成专项训练，便于阶段刷题与错题复盘。',
        contents: ['专项习题', '高频考点', '错题复盘']
      },
      {
        type: '模拟卷',
        title: '医护全真模拟卷',
        stage: '冲刺阶段',
        subtitle: '整卷模考 / 结构训练',
        desc: '按真实考试结构组卷，适合整卷检测与答题节奏训练。',
        contents: ['整卷模考', '答案解析', '分值结构']
      },
      {
        type: '冲刺卷',
        title: '医护考前冲刺卷',
        stage: '考前阶段',
        subtitle: '最后回看 / 高频压缩',
        desc: '聚焦考前高频考点压缩复习，方便最后阶段集中回看。',
        contents: ['考前压缩', '高频回顾', '冲刺提示']
      }
    ]
  }
];

function StatCard(props) {
  return (
    <View
      style={{
        width: '31.5%',
        background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
        borderRadius: '28rpx',
        padding: '22rpx 14rpx',
        boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
        border: '1rpx solid rgba(226,232,240,0.82)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', textAlign: 'center', fontSize: '38rpx', color: '#0f172a', fontWeight: 900, marginBottom: '8rpx' }}>
        {props.value}
      </Text>
      <Text style={{ display: 'block', textAlign: 'center', fontSize: '22rpx', color: '#334155', fontWeight: 700, marginBottom: '8rpx' }}>
        {props.label}
      </Text>
      <Text style={{ display: 'block', textAlign: 'center', fontSize: '18rpx', lineHeight: 1.5, color: '#64748b' }}>
        {props.note}
      </Text>
    </View>
  );
}

function FeaturedSetCard(props) {
  return (
    <View
      style={{
        width: '48.4%',
        background: props.gradient,
        borderRadius: '34rpx',
        padding: '26rpx 24rpx 24rpx',
        boxSizing: 'border-box',
        boxShadow: '0 18rpx 32rpx rgba(15,23,42,0.14)'
      }}
    >
      <View
        style={{
          display: 'inline-flex',
          padding: '8rpx 14rpx',
          borderRadius: '999rpx',
          backgroundColor: 'rgba(255,255,255,0.18)',
          marginBottom: '18rpx'
        }}
      >
        <Text style={{ fontSize: '18rpx', color: '#ffffff', fontWeight: 700 }}>{props.tag}</Text>
      </View>
      <Text style={{ display: 'block', fontSize: '30rpx', color: '#ffffff', fontWeight: 800, marginBottom: '12rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: '20rpx', lineHeight: 1.7, color: 'rgba(255,255,255,0.84)', marginBottom: '18rpx' }}>
        {props.desc}
      </Text>
      <View style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.items.map((item) => (
          <View
            key={item}
            style={{
              marginRight: '10rpx',
              marginBottom: '10rpx',
              padding: '8rpx 12rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.14)'
            }}
          >
            <Text style={{ fontSize: '18rpx', color: '#ffffff' }}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PreviewBookCard(props) {
  return (
    <View
      style={{
        width: '264rpx',
        marginRight: '18rpx',
        backgroundColor: '#ffffff',
        borderRadius: '30rpx',
        padding: '18rpx',
        boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
        border: '1rpx solid rgba(226,232,240,0.82)',
        boxSizing: 'border-box'
      }}
    >
      <View
        style={{
          height: '300rpx',
          borderRadius: '24rpx',
          background: props.gradient,
          padding: '20rpx 18rpx',
          boxSizing: 'border-box',
          marginBottom: '18rpx',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '8rpx 14rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(255,255,255,0.16)'
          }}
        >
          <Text style={{ fontSize: '18rpx', color: '#ffffff', fontWeight: 700 }}>{props.type}</Text>
        </View>
        <View>
          <Text style={{ display: 'block', fontSize: '28rpx', color: '#ffffff', fontWeight: 800, marginBottom: '10rpx' }}>
            {props.title}
          </Text>
          <Text style={{ display: 'block', fontSize: '18rpx', color: 'rgba(255,255,255,0.82)', marginBottom: '6rpx' }}>
            {props.subtitle}
          </Text>
          <Text style={{ display: 'block', fontSize: '18rpx', color: 'rgba(255,255,255,0.82)' }}>{props.stage}</Text>
        </View>
      </View>

      <Text style={{ display: 'block', fontSize: '24rpx', color: '#0f172a', fontWeight: 800, marginBottom: '8rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: '20rpx', color: '#64748b', lineHeight: 1.7, marginBottom: '14rpx' }}>
        {props.desc}
      </Text>
      <View style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.contents.map((item) => (
          <View
            key={item}
            style={{
              marginRight: '8rpx',
              marginBottom: '8rpx',
              padding: '8rpx 12rpx',
              borderRadius: '999rpx',
              backgroundColor: '#f1f5f9'
            }}
          >
            <Text style={{ fontSize: '18rpx', color: '#475569', fontWeight: 600 }}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function CatalogGroup(props) {
  return (
    <View
      style={{
        marginBottom: props.isLast ? '0' : '32rpx',
        backgroundColor: '#ffffff',
        borderRadius: '36rpx',
        padding: '30rpx 24rpx 26rpx',
        boxShadow: '0 14rpx 28rpx rgba(148,163,184,0.11)',
        border: '1rpx solid rgba(226,232,240,0.82)'
      }}
    >
      <View
        style={{
          backgroundColor: props.background,
          borderRadius: '26rpx',
          padding: '18rpx 18rpx',
          marginBottom: '24rpx'
        }}
      >
        <Text style={{ display: 'block', fontSize: '34rpx', color: '#0f172a', fontWeight: 800, marginBottom: '10rpx' }}>
          {props.title}
        </Text>
        <Text style={{ display: 'block', fontSize: '22rpx', color: '#64748b', lineHeight: 1.75, marginBottom: '14rpx' }}>
          {props.desc}
        </Text>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 14rpx',
            borderRadius: '999rpx',
            backgroundColor: '#ffffff'
          }}
        >
          <Text style={{ fontSize: '18rpx', color: props.accent, fontWeight: 700 }}>{props.shelfLabel}</Text>
        </View>
      </View>

      <ScrollView scrollX>
        <View style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {props.items.map((item, index) => (
            <PreviewBookCard
              key={item.title}
              {...item}
              gradient={
                index % 2 === 0
                  ? 'linear-gradient(135deg, ' + props.accent + ' 0%, #1d2b52 100%)'
                  : 'linear-gradient(135deg, #334155 0%, ' + props.accent + ' 100%)'
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function MaterialsPage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <PageHero
        chip="教材资料"
        title="自编资料体系"
        desc="围绕高数与医护两大方向，整理教材、习题集、模拟卷和考前冲刺卷，便于分阶段使用。"
        background="linear-gradient(180deg, #334266 0%, #17233f 56%, #0d1730 100%)"
        bubbleRight="-42rpx"
        bubbleTop="24rpx"
        bubbleSize="228rpx"
      />

      <View style={{ margin: '-54rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
            borderRadius: '34rpx',
            padding: '24rpx 20rpx',
            boxShadow: '0 14rpx 30rpx rgba(148,163,184,0.12)',
            border: '1rpx solid rgba(226,232,240,0.82)'
          }}
        >
          <ScrollView scrollX>
            <View style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              {tabs.map((item, index) => (
                <View
                  key={item}
                  style={{
                    marginRight: '14rpx',
                    padding: '16rpx 24rpx',
                    borderRadius: '999rpx',
                    backgroundColor: index === 0 ? '#0f172a' : '#f1f5f9'
                  }}
                >
                  <Text
                    style={{
                      fontSize: '22rpx',
                      color: index === 0 ? '#ffffff' : '#64748b',
                      fontWeight: 700
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={{ margin: '38rpx 24rpx 0' }}>
        <PageSectionTitle>套系总览</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {overviewCards.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </View>
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <PageSectionTitle>主推套装</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {featuredSets.map((item) => (
            <FeaturedSetCard key={item.title} {...item} />
          ))}
        </View>
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <PageSectionTitle>目录预览</PageSectionTitle>
        {groups.map((group, index) => (
          <CatalogGroup key={group.title} {...group} isLast={index === groups.length - 1} />
        ))}
      </View>

      <PageCtaCard
        title="先看资料目录，再选适合你的组合"
        desc="如果你想知道每本教材适合哪个阶段、配套什么题目训练，先沟通后再安排会更清楚。"
        buttonText="咨询资料详情"
        footnote="资料目录 · 使用建议 · 阶段搭配"
      />
    </View>
  );
}
