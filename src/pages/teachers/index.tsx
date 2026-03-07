import { Image, Text, View } from '@tarojs/components';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';

const teachers = [
  { name: '张老师', role: '医护方向主讲', tag: '十年教研经验', seed: 'teacher-zhang' },
  { name: '李老师', role: '高数专项讲师', tag: '体系化提分', seed: 'teacher-li' },
  { name: '王老师', role: '公共课讲师', tag: '真题讲解', seed: 'teacher-wang' },
  { name: '赵老师', role: '班主任督学', tag: '全程跟踪', seed: 'teacher-zhao' }
];

const features = [
  { title: '全职坐班答疑', desc: '课程、答疑和阶段督学同步推进。' },
  { title: '专业课与公共课协同', desc: '不同方向老师共同参与课程规划。' },
  { title: '班主任全程跟踪', desc: '日常管理、测评反馈和节奏提醒并行。' }
];

export default function TeachersPage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <PageHero
        chip="师资阵容"
        title="师资团队"
        desc="核心教研、一线主讲与班主任督学联动，覆盖专业课、公共课和全程管理。"
        background="linear-gradient(180deg, #31415f 0%, #17233f 56%, #0d1730 100%)"
        imageSeed="lecture"
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
            全职教研协同
          </Text>
          <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.75, color: '#64748b' }}>
            教学、答疑、督学与复盘协同推进，不让课程和管理脱节。
          </Text>
        </View>
      </View>

      <View style={{ margin: '38rpx 24rpx 0' }}>
        <PageSectionTitle>核心优势</PageSectionTitle>
        {features.map((item, index) => (
          <View
            key={item.title}
            style={{
              marginBottom: index === features.length - 1 ? '0' : '14rpx',
              backgroundColor: '#ffffff',
              borderRadius: '30rpx',
              padding: '26rpx 24rpx',
              boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.09)',
              border: '1rpx solid rgba(226,232,240,0.8)'
            }}
          >
            <Text style={{ display: 'block', fontSize: '28rpx', color: '#0f172a', fontWeight: 800, marginBottom: '10rpx' }}>
              {item.title}
            </Text>
            <Text style={{ display: 'block', fontSize: '22rpx', color: '#64748b', lineHeight: 1.75 }}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View style={{ margin: '42rpx 20rpx 0' }}>
        <PageSectionTitle>老师阵容</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {teachers.map((teacher) => (
            <View
              key={teacher.name}
              style={{
                width: '48.2%',
                marginBottom: '18rpx',
                backgroundColor: '#ffffff',
                borderRadius: '34rpx',
                padding: '28rpx 24rpx',
                boxShadow: '0 16rpx 28rpx rgba(148,163,184,0.11)',
                border: '1rpx solid rgba(226,232,240,0.82)',
                boxSizing: 'border-box'
              }}
            >
              <Image
                src={`https://picsum.photos/seed/${teacher.seed}/240/240`}
                mode="aspectFill"
                style={{ width: '112rpx', height: '112rpx', borderRadius: '999rpx', marginBottom: '18rpx' }}
              />
              <Text style={{ display: 'block', fontSize: '30rpx', color: '#0f172a', fontWeight: 800, marginBottom: '8rpx' }}>
                {teacher.name}
              </Text>
              <Text style={{ display: 'block', fontSize: '22rpx', color: '#64748b', marginBottom: '16rpx' }}>{teacher.role}</Text>
              <View
                style={{
                  display: 'inline-flex',
                  padding: '10rpx 16rpx',
                  borderRadius: '999rpx',
                  backgroundColor: '#eef2ff'
                }}
              >
                <Text style={{ fontSize: '20rpx', color: '#4f46e5', fontWeight: 700 }}>{teacher.tag}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard
        title="先了解适合你的老师配置"
        desc="不同方向、不同基础的学员，适合的主讲与督学组合不同，先沟通再安排更稳。"
        buttonText="预约老师咨询"
        footnote="方向匹配 · 课程说明 · 督学方式"
      />
    </View>
  );
}
