import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const stats = [
  { value: '高', label: '上岸率', note: '稳定表现' },
  { value: '精', label: '小班制', note: '节奏清晰' },
  { value: '强', label: '口碑力', note: '持续积累' }
];

const stories = [
  { title: '2025 上岸分享', desc: '医护方向高分录取案例与备考复盘。', seed: 'success-2025' },
  { title: '2024 上岸分享', desc: '高数专项突破案例与单科提升路径。', seed: 'success-2024' },
  { title: '2023 上岸分享', desc: '跨考逆袭经验与阶段执行心得。', seed: 'success-2023' }
];

export default function SuccessPage() {
  return (
    <View style={pageStyle}>
      <PageHero
        chip="办学成果"
        title="办学成果"
        desc="历年上岸表现和学员反馈持续积累，逐步沉淀出更稳定的提分路径与复盘经验。"
        background="linear-gradient(180deg, #30415d 0%, #15203b 58%, #0b152d 100%)"
        bubbleRight="-30rpx"
        bubbleTop="20rpx"
      />

      <View
        style={{
          margin: `-54rpx ${ui.spacing.page} 0`,
          position: 'relative',
          zIndex: 3
        }}
      >
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: ui.radius.lg,
            padding: '28rpx 18rpx 24rpx',
            boxShadow: ui.shadow.cardRaised
          }}
        >
          <View style={{ display: 'flex', justifyContent: 'space-between' }}>
            {stats.map((item, index) => (
              <View
                key={item.label}
                style={{
                  flex: 1,
                  padding: '0 10rpx',
                  borderRight: index === stats.length - 1 ? 'none' : `1rpx solid ${ui.colors.border}`,
                  boxSizing: 'border-box'
                }}
              >
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: ui.type.meta,
                    color: ui.colors.textSubtle,
                    fontWeight: 700,
                    marginBottom: '8rpx'
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '42rpx',
                    color: ui.colors.text,
                    fontWeight: 900,
                    lineHeight: 1.1
                  }}
                >
                  {item.value}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: ui.type.meta,
                    color: ui.colors.textMuted,
                    marginTop: '8rpx'
                  }}
                >
                  {item.note}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">上岸故事</PageSectionTitle>
        {stories.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === stories.length - 1 ? '0' : ui.spacing.block,
              padding: '24rpx',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image
              src={`https://picsum.photos/seed/${item.seed}/200/200`}
              mode="aspectFill"
              style={{
                width: '116rpx',
                height: '116rpx',
                borderRadius: ui.radius.sm,
                marginRight: '18rpx',
                flexShrink: 0
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.cardTitle,
                  color: ui.colors.text,
                  fontWeight: 800,
                  marginBottom: '8rpx'
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
          </View>
        ))}
      </View>

      <PageCtaCard
        title="成果来自体系化执行"
        desc="方向选择、课程安排、阶段测评、督学反馈与复盘执行持续协同，结果才会更稳定。"
        buttonText="了解上岸规划"
        footnote="路径规划 · 节奏管理 · 结果复盘"
      />
    </View>
  );
}
