import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';

const stats = [
  { value: '高', label: '上岸率', note: '稳定表现' },
  { value: '精', label: '小班制', note: '节奏清晰' },
  { value: '强', label: '口碑力', note: '持续积累' }
];

const stories = [
  { title: '2025 上岸分享', desc: '医护方向高分录取案例', seed: 'success-2025' },
  { title: '2024 上岸分享', desc: '高数专项突破案例', seed: 'success-2024' },
  { title: '2023 上岸分享', desc: '跨考逆袭经验', seed: 'success-2023' }
];

export default function SuccessPage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <PageHero
        chip="办学成果"
        title="办学成果"
        desc="历年上岸表现与学员反馈持续积累，形成了稳定的提分路径和复盘案例。"
        background="linear-gradient(180deg, #30415d 0%, #15203b 58%, #0b152d 100%)"
        bubbleRight="-30rpx"
        bubbleTop="20rpx"
      />

      <View style={{ margin: '-54rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
            borderRadius: '36rpx',
            padding: '28rpx 18rpx 24rpx',
            boxShadow: '0 14rpx 30rpx rgba(148,163,184,0.12)',
            border: '1rpx solid rgba(226,232,240,0.82)'
          }}
        >
          <View style={{ display: 'flex', justifyContent: 'space-between' }}>
            {stats.map((item, index) => (
              <View
                key={item.label}
                style={{
                  flex: 1,
                  padding: '0 10rpx',
                  borderRight: index === stats.length - 1 ? 'none' : '1rpx solid #e2e8f0',
                  boxSizing: 'border-box'
                }}
              >
                <Text style={{ display: 'block', textAlign: 'center', fontSize: '24rpx', color: '#475569', fontWeight: 700, marginBottom: '8rpx' }}>
                  {item.label}
                </Text>
                <Text style={{ display: 'block', textAlign: 'center', fontSize: '42rpx', color: '#0f172a', fontWeight: 900, lineHeight: 1.1 }}>
                  {item.value}
                </Text>
                <Text style={{ display: 'block', textAlign: 'center', fontSize: '20rpx', color: '#64748b', marginTop: '8rpx' }}>
                  {item.note}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <PageSectionTitle>上岸故事</PageSectionTitle>
        {stories.map((item, index) => (
          <View
            key={item.title}
            style={{
              marginBottom: index === stories.length - 1 ? '0' : '16rpx',
              backgroundColor: '#ffffff',
              borderRadius: '32rpx',
              padding: '24rpx',
              boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
              border: '1rpx solid rgba(226,232,240,0.82)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image
              src={`https://picsum.photos/seed/${item.seed}/200/200`}
              mode="aspectFill"
              style={{ width: '116rpx', height: '116rpx', borderRadius: '24rpx', marginRight: '18rpx', flexShrink: 0 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ display: 'block', fontSize: '30rpx', color: '#0f172a', fontWeight: 800, marginBottom: '8rpx' }}>
                {item.title}
              </Text>
              <Text style={{ display: 'block', fontSize: '22rpx', color: '#64748b', lineHeight: 1.75 }}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <PageCtaCard
        title="成果来自体系化执行"
        desc="方向选择、课程安排、阶段测评、督学反馈与复盘执行持续协同，才能让上岸结果更稳定。"
        buttonText="了解上岸规划"
        footnote="路径规划 · 节奏管理 · 结果复盘"
      />
    </View>
  );
}
