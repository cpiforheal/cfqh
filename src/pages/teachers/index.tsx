import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageIntroCard from '../../components/PageIntroCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const teachers = [
  { name: '张老师', role: '医护方向主讲', tag: '十年教研经验', seed: 'teacher-zhang' },
  { name: '李老师', role: '高数专项讲师', tag: '体系化提分', seed: 'teacher-li' },
  { name: '王老师', role: '公共课讲师', tag: '真题讲解', seed: 'teacher-wang' },
  { name: '赵老师', role: '班主任督学', tag: '全程跟踪', seed: 'teacher-zhao' }
];

const features = [
  { title: '全职坐班答疑', desc: '课程推进、答疑复盘与阶段督学同步进行，不让学习管理与课程脱节。' },
  { title: '专业课与公共课协同', desc: '不同方向老师共同参与课程规划，重点内容和训练节奏能互相对齐。' },
  { title: '班主任全程跟踪', desc: '日常管理、测评反馈和节奏提醒并行，帮助学员保持持续执行。' }
];

export default function TeachersPage() {
  return (
    <View style={pageStyle}>
      <PageHero
        chip="师资阵容"
        title="师资团队"
        desc="核心教研、一线主讲与班主任督学联动，覆盖专业课、公共课和备考管理的完整协作。"
        background="linear-gradient(180deg, #31415f 0%, #17233f 56%, #0d1730 100%)"
        imageSeed="lecture"
      />

      <PageIntroCard
        title="全职教研协同"
        desc="教学、答疑、督学与复盘协同推进，让课程与管理形成统一执行标准。"
      />

      <View style={{ margin: '38rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#8a92ff">核心优势</PageSectionTitle>
        {features.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === features.length - 1 ? '0' : ui.spacing.block,
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

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.pageCompact} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">老师阵容</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {teachers.map((teacher) => (
            <View
              key={teacher.name}
              style={{
                ...surfaceCardStyle,
                width: '48.2%',
                marginBottom: '18rpx',
                padding: '28rpx 24rpx',
                boxSizing: 'border-box'
              }}
            >
              <Image
                src={`https://picsum.photos/seed/${teacher.seed}/240/240`}
                mode="aspectFill"
                style={{
                  width: '112rpx',
                  height: '112rpx',
                  borderRadius: ui.radius.pill,
                  marginBottom: '18rpx'
                }}
              />
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.cardTitle,
                  color: ui.colors.text,
                  fontWeight: 800,
                  marginBottom: '8rpx'
                }}
              >
                {teacher.name}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: ui.colors.textMuted,
                  marginBottom: '16rpx'
                }}
              >
                {teacher.role}
              </Text>
              <View
                style={{
                  display: 'inline-flex',
                  padding: '10rpx 16rpx',
                  borderRadius: ui.radius.pill,
                  backgroundColor: ui.colors.accentSoft
                }}
              >
                <Text style={{ fontSize: ui.type.meta, color: ui.colors.accent, fontWeight: 700 }}>
                  {teacher.tag}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard
        title="先了解适合你的老师配置"
        desc="不同方向、不同基础的学员，适合的主讲与督学组合并不相同，先沟通再安排更稳。"
        buttonText="预约老师咨询"
        footnote="方向匹配 · 课程说明 · 督学方式"
      />
    </View>
  );
}
