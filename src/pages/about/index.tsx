import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageIntroCard from '../../components/PageIntroCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import { darkPanelStyle, pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const values = [
  {
    title: '品牌理念',
    desc: '坚持“严管厚爱，教书育人”，把教研质量、学习管理和答疑服务作为同等重要的基础能力。'
  },
  {
    title: '服务体系',
    desc: '围绕方向规划、课程辅导、阶段测评、专项提升和全程督学，形成完整的备考支持链路。'
  }
];

const environmentImages = [
  { seed: 'campus1', label: '多媒体教室' },
  { seed: 'campus2', label: '标准化宿舍' }
];

export default function AboutPage() {
  return (
    <View style={pageStyle}>
      <PageHero
        chip="机构概览"
        title="关于我们"
        desc="专注专转本备考服务，以高标准教研、精细化管理和沉浸式学习环境作为机构的长期基础。"
        background="linear-gradient(180deg, #334266 0%, #18233f 56%, #0d1730 100%)"
        imageSeed="campus"
      />

      <PageIntroCard
        title="淮安启航专转本"
        desc="围绕方向规划、课程辅导、班级管理和日常答疑，帮助学员建立更稳定的备考节奏与执行路径。"
      />

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">品牌与服务</PageSectionTitle>
        {values.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === values.length - 1 ? '0' : ui.spacing.block,
              padding: '28rpx 24rpx'
            }}
          >
            <Text
              style={{
                display: 'block',
                fontSize: ui.type.cardTitle,
                color: ui.colors.text,
                fontWeight: 800,
                marginBottom: '10rpx'
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: ui.type.body,
                color: ui.colors.textMuted,
                lineHeight: 1.8
              }}
            >
              {item.desc}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          ...darkPanelStyle,
          margin: `${ui.spacing.section} ${ui.spacing.page} 0`,
          padding: '36rpx 30rpx 34rpx'
        }}
      >
        <Text
          style={{
            display: 'block',
            fontSize: '34rpx',
            color: '#ffffff',
            fontWeight: 900,
            marginBottom: '14rpx'
          }}
        >
          校区环境
        </Text>
        <Text
          style={{
            display: 'block',
            fontSize: ui.type.body,
            color: ui.colors.darkText,
            lineHeight: 1.78,
            marginBottom: '24rpx'
          }}
        >
          沉浸式学习与生活配套并行，让日常训练、复盘和答疑更专注，也让备考节奏更连续。
        </Text>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {environmentImages.map((item) => (
            <View
              key={item.label}
              style={{
                width: '48.5%',
                height: '200rpx',
                borderRadius: ui.radius.sm,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Image
                src={`https://picsum.photos/seed/${item.seed}/400/300`}
                mode="aspectFill"
                style={{ width: '100%', height: '100%' }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '14rpx 16rpx',
                  background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.82) 100%)'
                }}
              >
                <Text style={{ fontSize: ui.type.meta, color: '#ffffff', fontWeight: 700 }}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard
        title="先了解机构，再定备考路线"
        desc="如果你想先确认环境、管理方式、课程节奏和方向匹配，可以先预约一次机构沟通。"
        buttonText="预约机构咨询"
        footnote="环境了解 · 课程说明 · 方向建议"
      />
    </View>
  );
}
