import { Image, Navigator, Text, View } from '@tarojs/components';

const quickLinks = [
  { label: '机构介绍', url: '/pages/about/index', background: '#eef2ff' },
  { label: '开设方向', url: '/pages/courses/index', background: '#f1f5f9' },
  { label: '师资团队', url: '/pages/teachers/index', background: '#f1f5f9' },
  { label: '办学成果', url: '/pages/success/index', background: '#f1f5f9' }
];

const advantages = [
  { title: '全职教研团队', desc: '老师坐班答疑，课程内容与考纲变化同步更新。' },
  { title: '沉浸式学习环境', desc: '吃住学一体化管理，减少干扰，强化学习节奏。' },
  { title: '内部资料体系', desc: '围绕专转本核心考点整理，兼顾重点与易错题型。' },
  { title: '严格督学机制', desc: '阶段测评、复盘和提醒并行，帮助学员稳定推进。' }
];

const directions = [
  {
    title: '医护大类方向',
    tag: '优势王牌',
    tagColor: '#4f46e5',
    desc: '覆盖解剖、生理等核心课程与公共课同步辅导，适合目标明确的医护类学员。'
  },
  {
    title: '高数专项突破',
    tag: '重点建设',
    tagColor: '#0f172a',
    desc: '从基础梳理到冲刺刷题的系统提分路线，适合理工与经管类考生。'
  }
];

export default function HomePage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '32rpx' }}>
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: '56rpx',
          borderBottomRightRadius: '56rpx',
          backgroundColor: '#0f172a',
          padding: '64rpx 32rpx 112rpx'
        }}
      >
        <Image
          src="https://picsum.photos/seed/university/900/700"
          mode="aspectFill"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.22
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(15,23,42,0.18), rgba(15,23,42,0.92))'
          }}
        />
        <View style={{ position: 'relative', zIndex: 1 }}>
          <View
            style={{
              display: 'inline-flex',
              padding: '10rpx 20rpx',
              borderRadius: '999rpx',
              border: '1rpx solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(255,255,255,0.10)',
              marginBottom: '24rpx'
            }}
          >
            <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 500 }}>
              江苏专转本培训品牌
            </Text>
          </View>
          <Text
            style={{
              display: 'block',
              fontSize: '52rpx',
              lineHeight: 1.2,
              color: '#ffffff',
              fontWeight: 800,
              marginBottom: '20rpx'
            }}
          >
            专注江苏专转本
          </Text>
          <Text
            style={{
              display: 'block',
              fontSize: '26rpx',
              lineHeight: 1.7,
              color: '#cbd5e1',
              marginBottom: '40rpx'
            }}
          >
            聚焦医护与高数专项方向，用精细化教研、班级管理和答疑体系，帮助学员把备考路径走稳。
          </Text>
          <Navigator
            url="/pages/about/index"
            openType="switchTab"
            style={{
              display: 'inline-flex',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              fontSize: '26rpx',
              fontWeight: 700,
              padding: '22rpx 36rpx',
              borderRadius: '24rpx'
            }}
          >
            了解机构实力
          </Navigator>
        </View>
      </View>

      <View style={{ margin: '-72rpx 32rpx 0', position: 'relative', zIndex: 2 }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            borderRadius: '32rpx',
            padding: '28rpx 24rpx',
            boxShadow: '0 20rpx 40rpx rgba(148,163,184,0.18)'
          }}
        >
          {[
            { title: '核心', desc: '全职教研' },
            { title: '精品', desc: '小班督学' },
            { title: '高上岸', desc: '方向聚焦' }
          ].map((item) => (
            <View key={item.title} style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '36rpx',
                  fontWeight: 900,
                  color: '#0f172a'
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '20rpx',
                  color: '#64748b',
                  marginTop: '8rpx'
                }}
              >
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ display: 'flex', margin: '28rpx 32rpx 0', justifyContent: 'space-between' }}>
        {quickLinks.map((item) => (
          <Navigator
            key={item.url}
            url={item.url}
            openType="switchTab"
            style={{ width: '22%', textAlign: 'center' }}
          >
            <View
              style={{
                width: '96rpx',
                height: '96rpx',
                margin: '0 auto',
                borderRadius: '24rpx',
                backgroundColor: item.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  width: '24rpx',
                  height: '24rpx',
                  borderRadius: '999rpx',
                  backgroundColor: '#334155'
                }}
              />
            </View>
            <Text
              style={{
                display: 'block',
                fontSize: '22rpx',
                color: '#334155',
                marginTop: '12rpx',
                fontWeight: 500
              }}
            >
              {item.label}
            </Text>
          </Navigator>
        ))}
      </View>

      <View style={{ margin: '40rpx 32rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: '24rpx' }}>
          <View
            style={{
              width: '8rpx',
              height: '32rpx',
              borderRadius: '999rpx',
              backgroundColor: '#4f46e5',
              marginRight: '12rpx'
            }}
          />
          <Text style={{ fontSize: '34rpx', fontWeight: 700, color: '#0f172a' }}>四大办学优势</Text>
        </View>

        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {advantages.map((item) => (
            <View
              key={item.title}
              style={{
                width: '48%',
                backgroundColor: '#ffffff',
                borderRadius: '28rpx',
                border: '1rpx solid #f1f5f9',
                padding: '28rpx',
                marginBottom: '16rpx',
                boxSizing: 'border-box'
              }}
            >
              <View
                style={{
                  width: '28rpx',
                  height: '28rpx',
                  borderRadius: '999rpx',
                  backgroundColor: '#e0e7ff',
                  marginBottom: '16rpx'
                }}
              />
              <Text
                style={{
                  display: 'block',
                  fontSize: '26rpx',
                  color: '#0f172a',
                  fontWeight: 700,
                  marginBottom: '10rpx'
                }}
              >
                {item.title}
              </Text>
              <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.6, color: '#64748b' }}>
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ margin: '40rpx 32rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24rpx' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <View
              style={{
                width: '8rpx',
                height: '32rpx',
                borderRadius: '999rpx',
                backgroundColor: '#4f46e5',
                marginRight: '12rpx'
              }}
            />
            <Text style={{ fontSize: '34rpx', fontWeight: 700, color: '#0f172a' }}>沉浸式学习环境</Text>
          </View>
          <Navigator url="/pages/about/index" openType="switchTab">
            <Text style={{ fontSize: '22rpx', color: '#64748b' }}>查看更多</Text>
          </Navigator>
        </View>

        <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8rpx' }}>
          {[
            { label: '多媒体教室', seed: 'classroom1' },
            { label: '标准化宿舍', seed: 'dorm1' }
          ].map((item) => (
            <View
              key={item.label}
              style={{ width: '48.5%', height: '256rpx', borderRadius: '28rpx', overflow: 'hidden', position: 'relative' }}
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
                  backgroundColor: 'rgba(15,23,42,0.72)',
                  padding: '16rpx 20rpx'
                }}
              >
                <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 700 }}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: '256rpx', borderRadius: '28rpx', overflow: 'hidden', position: 'relative' }}>
          <Image
            src="https://picsum.photos/seed/library/700/400"
            mode="aspectFill"
            style={{ width: '100%', height: '100%' }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15,23,42,0.72)',
              padding: '16rpx 20rpx'
            }}
          >
            <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 700 }}>自习室与答疑区</Text>
          </View>
        </View>
      </View>

      <View style={{ margin: '40rpx 32rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: '24rpx' }}>
          <View
            style={{
              width: '8rpx',
              height: '32rpx',
              borderRadius: '999rpx',
              backgroundColor: '#4f46e5',
              marginRight: '12rpx'
            }}
          />
          <Text style={{ fontSize: '34rpx', fontWeight: 700, color: '#0f172a' }}>核心专业方向</Text>
        </View>

        {directions.map((item, index) => (
          <Navigator
            key={item.title}
            url="/pages/courses/index"
            openType="switchTab"
            style={{ display: 'block', marginBottom: index === 0 ? '12rpx' : '0' }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '28rpx',
                border: '1rpx solid #f1f5f9',
                padding: '32rpx'
              }}
            >
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14rpx' }}>
                <Text style={{ fontSize: '30rpx', color: '#0f172a', fontWeight: 700 }}>{item.title}</Text>
                <Text
                  style={{
                    fontSize: '20rpx',
                    color: '#ffffff',
                    fontWeight: 700,
                    backgroundColor: item.tagColor,
                    padding: '8rpx 14rpx',
                    borderRadius: '12rpx'
                  }}
                >
                  {item.tag}
                </Text>
              </View>
              <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.6, color: '#64748b', marginBottom: '12rpx' }}>
                {item.desc}
              </Text>
              <Text style={{ fontSize: '22rpx', color: item.tagColor, fontWeight: 500 }}>查看方向详情</Text>
            </View>
          </Navigator>
        ))}
      </View>

      <View
        style={{
          margin: '40rpx 32rpx 0',
          backgroundColor: '#0f172a',
          borderRadius: '32rpx',
          padding: '32rpx'
        }}
      >
        <Text style={{ display: 'block', fontSize: '34rpx', color: '#ffffff', fontWeight: 700, marginBottom: '12rpx' }}>
          免费学情评估
        </Text>
        <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.6, color: '#cbd5e1', marginBottom: '20rpx' }}>
          不确定适合哪个方向，或者想知道当前基础与目标院校之间差距，可以先做一次评估。
        </Text>
        <Navigator
          url="/pages/about/index"
          openType="switchTab"
          style={{
            display: 'inline-flex',
            backgroundColor: '#ffffff',
            padding: '20rpx 32rpx',
            borderRadius: '24rpx'
          }}
        >
          <Text style={{ fontSize: '26rpx', color: '#0f172a', fontWeight: 700 }}>预约咨询</Text>
        </Navigator>
      </View>
    </View>
  );
}
