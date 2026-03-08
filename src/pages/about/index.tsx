import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';

const values = [
  { title: '品牌理念', desc: '坚持“严管厚爱，教书育人”，强调教研与管理并重。' },
  { title: '服务体系', desc: '课程规划、阶段测评、专项提升和全程督学协同推进。' }
];

const environmentImages = [
  { seed: 'campus1', label: '多媒体教室' },
  { seed: 'campus2', label: '标准化宿舍' }
];

export default function AboutPage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <PageHero
        chip="机构概览"
        title="关于我们"
        desc="专注专转本备考服务，以高标准教研、精细化管理和沉浸式学习环境为核心。"
        background="linear-gradient(180deg, #334266 0%, #18233f 56%, #0d1730 100%)"
        imageSeed="campus"
      />

      <View style={{ margin: '-54rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
            borderRadius: '34rpx',
            padding: '28rpx 24rpx',
            boxShadow: '0 14rpx 30rpx rgba(148,163,184,0.12)',
            border: '1rpx solid rgba(226,232,240,0.82)'
          }}
        >
          <Text style={{ display: 'block', fontSize: '28rpx', color: '#0f172a', fontWeight: 800, marginBottom: '10rpx' }}>
            乘帆启航专转本
          </Text>
          <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.75, color: '#64748b' }}>
            围绕方向规划、课程辅导、班级管理和日常答疑，帮助学员建立更稳定的备考节奏。
          </Text>
        </View>
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <PageSectionTitle>品牌与服务</PageSectionTitle>
        {values.map((item, index) => (
          <View
            key={item.title}
            style={{
              marginBottom: index === values.length - 1 ? '0' : '16rpx',
              backgroundColor: '#ffffff',
              borderRadius: '32rpx',
              padding: '28rpx 24rpx',
              boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
              border: '1rpx solid rgba(226,232,240,0.82)'
            }}
          >
            <Text style={{ display: 'block', fontSize: '30rpx', color: '#0f172a', fontWeight: 800, marginBottom: '10rpx' }}>
              {item.title}
            </Text>
            <Text style={{ display: 'block', fontSize: '22rpx', color: '#64748b', lineHeight: 1.8 }}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          margin: '42rpx 24rpx 0',
          borderRadius: '34rpx',
          padding: '36rpx 30rpx 34rpx',
          background: 'linear-gradient(135deg, #111d3f 0%, #0f1936 60%, #0a1229 100%)',
          boxShadow: '0 16rpx 30rpx rgba(15,23,42,0.18)'
        }}
      >
        <Text style={{ display: 'block', fontSize: '36rpx', color: '#ffffff', fontWeight: 900, marginBottom: '14rpx' }}>
          校区环境
        </Text>
        <Text style={{ display: 'block', fontSize: '22rpx', color: '#cbd5e1', lineHeight: 1.75, marginBottom: '24rpx' }}>
          沉浸式学习与生活配套，让日常训练、复盘和答疑更专注、更连续。
        </Text>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {environmentImages.map((item) => (
            <View
              key={item.label}
              style={{ width: '48.5%', height: '200rpx', borderRadius: '24rpx', overflow: 'hidden', position: 'relative' }}
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
                <Text style={{ fontSize: '20rpx', color: '#ffffff', fontWeight: 700 }}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard
        title="先了解机构，再定备考路线"
        desc="如果你想先确认环境、管理方式、课程节奏和方向匹配，可以先约一次沟通。"
        buttonText="预约机构咨询"
        footnote="环境了解 · 课程说明 · 方向建议"
      />
    </View>
  );
}
