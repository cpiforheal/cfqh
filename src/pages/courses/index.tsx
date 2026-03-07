import { ScrollView, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';

const categories = ['全部方向', '医护大类', '高数专项', '更多筹备'];

const directionCards = [
  {
    title: '医护大类方向',
    tag: '优势王牌',
    tagColor: '#4f46e5',
    tagBackground: '#eef2ff',
    iconColor: '#5b4dff',
    summary: '成熟教研体系，历届上岸率领先，适合目标明确的医护类学员。',
    features: ['解剖、生理、护理核心课', '公共课同步辅导', '阶段测评与督学反馈']
  },
  {
    title: '高数专项突破',
    tag: '重点建设',
    tagColor: '#0f172a',
    tagBackground: '#e2e8f0',
    iconColor: '#334155',
    summary: '从基础扫盲到冲刺拔高的系统提分路线，适合理工与经管类考生。',
    features: ['基础概念与公式重建', '典型题型专项训练', '错题复盘与节奏跟踪']
  }
];

const adviceCards = [
  {
    title: '方向选择建议',
    desc: '护理、助产、临床等背景建议优先医护方向；理工和经管类基础薄弱则优先高数专项。'
  },
  {
    title: '评估后再选',
    desc: '如果暂时不确定更适合哪条路线，建议先做一次学情评估，再制定备考规划。'
  }
];

export default function CoursesPage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <PageHero
        chip="方向规划"
        title="开设方向"
        desc="根据不同基础、专业背景和目标院校，提供聚焦方向与精细化提分路径。"
        background="linear-gradient(180deg, #334266 0%, #17233f 56%, #0d1730 100%)"
        bubbleRight="-50rpx"
        bubbleTop="40rpx"
        bubbleSize="230rpx"
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
              {categories.map((item, index) => (
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
        <PageSectionTitle>方向选择建议</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {adviceCards.map((item) => (
            <View
              key={item.title}
              style={{
                width: '48.2%',
                padding: '28rpx 24rpx',
                borderRadius: '30rpx',
                background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
                border: '1rpx solid rgba(226,232,240,0.82)',
                boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
                boxSizing: 'border-box'
              }}
            >
              <Text
                style={{
                  display: 'block',
                  fontSize: '28rpx',
                  color: '#0f172a',
                  fontWeight: 800,
                  marginBottom: '12rpx'
                }}
              >
                {item.title}
              </Text>
              <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.75, color: '#64748b' }}>
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ margin: '42rpx 20rpx 0' }}>
        <PageSectionTitle>核心方向</PageSectionTitle>
        {directionCards.map((item, index) => (
          <View
            key={item.title}
            style={{
              marginBottom: index === directionCards.length - 1 ? '0' : '24rpx',
              backgroundColor: '#ffffff',
              borderRadius: '40rpx',
              padding: '42rpx 38rpx 40rpx',
              minHeight: '336rpx',
              boxShadow: '0 20rpx 38rpx rgba(148,163,184,0.15)',
              border: '1rpx solid rgba(226,232,240,0.92)',
              boxSizing: 'border-box'
            }}
          >
            <View
              style={{
                backgroundColor: item.tagColor === '#4f46e5' ? '#f7f5ff' : '#f8fafc',
                borderRadius: '24rpx',
                padding: '18rpx 18rpx',
                marginBottom: '30rpx'
              }}
            >
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', alignItems: 'center', flex: 1, paddingRight: '18rpx' }}>
                  <View
                    style={{
                      width: '28rpx',
                      height: item.tagColor === '#4f46e5' ? '24rpx' : '28rpx',
                      borderWidth: item.tagColor === '#4f46e5' ? '0' : '3rpx',
                      borderStyle: 'solid',
                      borderColor: item.iconColor,
                      borderRadius: item.tagColor === '#4f46e5' ? '0' : '6rpx',
                      marginRight: '18rpx',
                      boxSizing: 'border-box',
                      position: 'relative'
                    }}
                  >
                    {item.tagColor === '#4f46e5' ? (
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '10rpx',
                          width: '7rpx',
                          height: '3rpx',
                          borderRadius: '999rpx',
                          backgroundColor: item.iconColor,
                          boxShadow: '11rpx 0 0 ' + item.iconColor + ', 19rpx 0 0 ' + item.iconColor
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          position: 'absolute',
                          left: '4rpx',
                          top: '4rpx',
                          width: '3rpx',
                          height: '3rpx',
                          borderRadius: '1rpx',
                          backgroundColor: item.iconColor,
                          boxShadow:
                            '6rpx 0 0 ' +
                            item.iconColor +
                            ', 12rpx 0 0 ' +
                            item.iconColor +
                            ', 0 6rpx 0 ' +
                            item.iconColor +
                            ', 6rpx 6rpx 0 ' +
                            item.iconColor +
                            ', 12rpx 6rpx 0 ' +
                            item.iconColor +
                            ', 0 12rpx 0 ' +
                            item.iconColor +
                            ', 6rpx 12rpx 0 ' +
                            item.iconColor +
                            ', 12rpx 12rpx 0 ' +
                            item.iconColor
                        }}
                      />
                    )}
                  </View>
                  <Text style={{ fontSize: '38rpx', color: '#0f172a', fontWeight: 800 }}>{item.title}</Text>
                </View>
                <Text
                  style={{
                    fontSize: '20rpx',
                    color: item.tagColor,
                    backgroundColor: item.tagBackground,
                    padding: '10rpx 18rpx',
                    borderRadius: '999rpx',
                    fontWeight: 700
                  }}
                >
                  {item.tag}
                </Text>
              </View>
            </View>

            <Text
              style={{
                display: 'block',
                width: '88%',
                fontSize: '23rpx',
                lineHeight: 1.95,
                color: '#64748b',
                marginBottom: '28rpx'
              }}
            >
              {item.summary}
            </Text>

            {item.features.map((feature) => (
              <View key={feature} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12rpx' }}>
                <View
                  style={{
                    width: '10rpx',
                    height: '10rpx',
                    borderRadius: '999rpx',
                    backgroundColor: item.iconColor,
                    marginRight: '12rpx',
                    marginTop: '10rpx',
                    flexShrink: 0
                  }}
                />
                <Text style={{ flex: 1, fontSize: '22rpx', color: '#475569', lineHeight: 1.75 }}>{feature}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <PageCtaCard
        title="先做方向评估"
        desc="不确定更适合医护还是高数，可以先做一次基础测评和目标院校评估，再定复习路线。"
        buttonText="获取方向建议"
        footnote="专业匹配 · 基础诊断 · 备考规划"
      />
    </View>
  );
}
