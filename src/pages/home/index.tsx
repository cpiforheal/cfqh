import { Image, Navigator, Text, View } from '@tarojs/components';

const stats = [
  { value: '核心', label: '教研团队', note: '全职坐班答疑' },
  { value: '精品', label: '小班督学', note: '关注每个学员' },
  { value: '高', label: '上岸率', note: '医护/高数方向' }
];

const quickLinks = [
  {
    label: '机构介绍',
    desc: '了解品牌实力',
    url: '/pages/about/index',
    icon: 'building',
    background: '#eef2ff',
    accent: '#5b4dff',
    cardBackground: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)'
  },
  {
    label: '开设方向',
    desc: '查看课程方向',
    url: '/pages/courses/index',
    icon: 'compass',
    background: '#f5f7fb',
    accent: '#475569',
    cardBackground: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
  },
  {
    label: '师资团队',
    desc: '认识核心老师',
    url: '/pages/teachers/index',
    icon: 'team',
    background: '#f5f7fb',
    accent: '#475569',
    cardBackground: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
  },
  {
    label: '办学成果',
    desc: '上岸案例展示',
    url: '/pages/success/index',
    icon: 'trophy',
    background: '#f5f7fb',
    accent: '#475569',
    cardBackground: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
  }
];

const advantages = [
  {
    icon: 'team',
    title: '全职教研团队',
    desc: '拒绝兼职走穴，老师全天候坐班答疑'
  },
  {
    icon: 'building',
    title: '独立封闭校区',
    desc: '吃住学一体化，排除外界一切干扰'
  },
  {
    icon: 'book',
    title: '自编内部教材',
    desc: '紧跟考纲变化，每年迭代辅助资料'
  },
  {
    icon: 'shield',
    title: '严格督学体系',
    desc: '班主任全程跟班，日清周测月考'
  }
];

const directions = [
  {
    title: '医护大类方向',
    tag: '优势王牌',
    tagColor: '#4f46e5',
    tagBackground: '#eef2ff',
    iconColor: '#5b4dff',
    iconType: 'medical',
    desc: '覆盖解剖、生理、护理等核心课程与公共课同步辅导，适合目标明确的医护类学员。'
  },
  {
    title: '高数专项突破',
    tag: '重点建设',
    tagColor: '#0f172a',
    tagBackground: '#e2e8f0',
    iconColor: '#334155',
    iconType: 'grid',
    desc: '从基础梳理到冲刺刷题的系统提分路线，适合理工与经管类考生。'
  }
];

const environmentCards = [
  { label: '多媒体教室', seed: 'classroom1' },
  { label: '标准化宿舍', seed: 'dorm1' },
  { label: '自习室与答疑区', seed: 'library' }
];

function SectionTitle(props) {
  return (
    <View style={{ display: 'flex', alignItems: 'center', marginBottom: '24rpx' }}>
      <View
        style={{
          width: '10rpx',
          height: '34rpx',
          borderRadius: '999rpx',
          backgroundColor: '#4f46e5',
          marginRight: '14rpx'
        }}
      />
      <Text style={{ fontSize: '34rpx', fontWeight: 800, color: '#0f172a' }}>{props.children}</Text>
    </View>
  );
}

function QuickIcon(props) {
  const commonWrap = {
    width: '88rpx',
    height: '88rpx',
    borderRadius: '26rpx',
    background: 'linear-gradient(180deg, #ffffff 0%, ' + props.background + ' 100%)',
    border: '1rpx solid rgba(226,232,240,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14rpx',
    boxShadow: '0 8rpx 18rpx rgba(148,163,184,0.10)'
  };

  const lineColor = props.color;
  const lineWidth = '2.5rpx';

  if (props.type === 'building') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '34rpx',
            height: '40rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: '6rpx',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '5rpx',
              bottom: '-3rpx',
              width: '8rpx',
              height: '14rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderBottomWidth: '0',
              borderRadius: '6rpx 6rpx 0 0',
              boxSizing: 'border-box'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '7rpx',
              top: '7rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: lineColor,
              boxShadow:
                '10rpx 0 0 ' +
                lineColor +
                ', 0 10rpx 0 ' +
                lineColor +
                ', 10rpx 10rpx 0 ' +
                lineColor +
                ', 0 20rpx 0 ' +
                lineColor +
                ', 10rpx 20rpx 0 ' +
                lineColor
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'compass') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '38rpx',
            height: '38rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '14rpx',
              top: '8rpx',
              width: '6rpx',
              height: '16rpx',
              borderTopLeftRadius: '10rpx',
              borderTopRightRadius: '10rpx',
              borderBottomLeftRadius: '10rpx',
              borderBottomRightRadius: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              transform: 'rotate(28deg)',
              boxSizing: 'border-box'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '16rpx',
              top: '14rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: lineColor
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'team') {
    return (
      <View style={commonWrap}>
        <View style={{ position: 'relative', width: '42rpx', height: '34rpx' }}>
          <View
            style={{
              position: 'absolute',
              left: '4rpx',
              top: '0',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: '4rpx',
              top: '0',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '0',
              top: '16rpx',
              width: '15rpx',
              height: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: '0',
              top: '16rpx',
              width: '15rpx',
              height: '10rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '14rpx',
              top: '5rpx',
              width: '9rpx',
              height: '9rpx',
              borderRadius: '999rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '11rpx',
              top: '18rpx',
              width: '19rpx',
              height: '11rpx',
              borderWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              borderTopWidth: '0',
              borderRadius: '0 0 999rpx 999rpx'
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={commonWrap}>
      <View
        style={{
          width: '42rpx',
          height: '40rpx',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: '8rpx',
            top: '7rpx',
            width: '24rpx',
            height: '15rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopWidth: '0',
            borderRadius: '0 0 12rpx 12rpx',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '4rpx',
            top: '6rpx',
            width: '7rpx',
            height: '7rpx',
            borderTopWidth: lineWidth,
            borderLeftWidth: lineWidth,
            borderBottomWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopLeftRadius: '8rpx',
            borderBottomLeftRadius: '8rpx',
            borderRightWidth: '0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '4rpx',
            top: '6rpx',
            width: '7rpx',
            height: '7rpx',
            borderTopWidth: lineWidth,
            borderRightWidth: lineWidth,
            borderBottomWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderTopRightRadius: '8rpx',
            borderBottomRightRadius: '8rpx',
            borderLeftWidth: '0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '18rpx',
            top: '23rpx',
            width: '5rpx',
            height: '9rpx',
            backgroundColor: lineColor,
            borderRadius: '999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '10rpx',
            bottom: '2rpx',
            width: '20rpx',
            height: '3rpx',
            backgroundColor: lineColor,
            borderRadius: '999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '14rpx',
            bottom: '6rpx',
            width: '12rpx',
            height: '5rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderBottomWidth: '0',
            borderRadius: '6rpx 6rpx 0 0',
            boxSizing: 'border-box'
          }}
        />
      </View>
    </View>
  );
}

function AdvantageIcon(props) {
  const color = '#5b4dff';
  const lineWidth = '2.5rpx';

  if (props.type === 'team') {
    return (
      <View style={{ position: 'relative', width: '38rpx', height: '30rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: '2rpx',
            top: '1rpx',
            width: '9rpx',
            height: '9rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '2rpx',
            top: '1rpx',
            width: '9rpx',
            height: '9rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '13rpx',
            top: '0',
            width: '10rpx',
            height: '10rpx',
            borderRadius: '999rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '15rpx',
            width: '14rpx',
            height: '9rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '15rpx',
            width: '14rpx',
            height: '9rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '10rpx',
            top: '16rpx',
            width: '18rpx',
            height: '10rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderTopWidth: '0',
            borderRadius: '0 0 999rpx 999rpx'
          }}
        />
      </View>
    );
  }

  if (props.type === 'building') {
    return (
      <View style={{ position: 'relative', width: '32rpx', height: '34rpx' }}>
        <View
          style={{
            width: '24rpx',
            height: '28rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: '5rpx',
            position: 'absolute',
            right: '0',
            bottom: '0',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '4rpx',
              top: '5rpx',
              width: '3rpx',
              height: '3rpx',
              borderRadius: '999rpx',
              backgroundColor: color,
              boxShadow: '7rpx 0 0 ' + color + ', 0 7rpx 0 ' + color + ', 7rpx 7rpx 0 ' + color
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '11rpx',
            height: '16rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRadius: '5rpx 5rpx 0 0',
            borderBottomWidth: '0',
            boxSizing: 'border-box'
          }}
        />
      </View>
    );
  }

  if (props.type === 'book') {
    return (
      <View style={{ position: 'relative', width: '34rpx', height: '28rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '2rpx',
            width: '15rpx',
            height: '22rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderRightWidth: '1rpx',
            borderRadius: '5rpx 0 0 5rpx',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '2rpx',
            width: '15rpx',
            height: '22rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: color,
            borderLeftWidth: '1rpx',
            borderRadius: '0 5rpx 5rpx 0',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '16rpx',
            top: '5rpx',
            width: '2rpx',
            height: '17rpx',
            backgroundColor: color,
            borderRadius: '999rpx'
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ position: 'relative', width: '30rpx', height: '34rpx' }}>
      <View
        style={{
          position: 'absolute',
          left: '5rpx',
          top: '3rpx',
          width: '20rpx',
          height: '22rpx',
          borderWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          borderRadius: '7rpx 7rpx 9rpx 9rpx',
          boxSizing: 'border-box'
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '12rpx',
          top: '11rpx',
          width: '6rpx',
          height: '5rpx',
          borderLeftWidth: lineWidth,
          borderBottomWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          transform: 'rotate(-45deg)'
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '12rpx',
          bottom: '0',
          width: '6rpx',
          height: '8rpx',
          borderLeftWidth: lineWidth,
          borderRightWidth: lineWidth,
          borderBottomWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: color,
          borderRadius: '0 0 4rpx 4rpx',
          boxSizing: 'border-box'
        }}
      />
    </View>
  );
}

function DirectionIcon(props) {
  if (props.type === 'medical') {
    return (
      <View
        style={{
          position: 'relative',
          width: '28rpx',
          height: '24rpx'
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: '0',
            top: '12rpx',
            width: '7rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '6rpx',
            top: '6rpx',
            width: '4rpx',
            height: '10rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(24deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '11rpx',
            top: '12rpx',
            width: '5rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '15rpx',
            top: '6rpx',
            width: '4rpx',
            height: '10rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(-24deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '0',
            top: '12rpx',
            width: '7rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        position: 'relative',
        width: '24rpx',
        height: '28rpx',
        borderWidth: '3rpx',
        borderStyle: 'solid',
        borderColor: props.color,
        borderRadius: '5rpx',
        boxSizing: 'border-box'
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: '4rpx',
          top: '4rpx',
          width: '3rpx',
          height: '3rpx',
          borderRadius: '1rpx',
          backgroundColor: props.color,
          boxShadow:
            '6rpx 0 0 ' +
            props.color +
            ', 12rpx 0 0 ' +
            props.color +
            ', 0 6rpx 0 ' +
            props.color +
            ', 6rpx 6rpx 0 ' +
            props.color +
            ', 12rpx 6rpx 0 ' +
            props.color +
            ', 0 12rpx 0 ' +
            props.color +
            ', 6rpx 12rpx 0 ' +
            props.color +
            ', 12rpx 12rpx 0 ' +
            props.color
        }}
      />
    </View>
  );
}

export default function HomePage() {
  return (
    <View style={{ minHeight: '100vh', backgroundColor: '#f3f5fb', paddingBottom: '48rpx' }}>
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: '64rpx',
          borderBottomRightRadius: '64rpx',
          padding: '28rpx 24rpx 120rpx',
          background:
            'linear-gradient(180deg, #2f3b5b 0%, #18233e 52%, #09142c 100%)'
        }}
      >
        <Image
          src="https://picsum.photos/seed/university/900/700"
          mode="aspectFill"
          style={{
            position: 'absolute',
            right: '-60rpx',
            bottom: '-10rpx',
            width: '440rpx',
            height: '560rpx',
            opacity: 0.18
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '-120rpx',
            top: '-80rpx',
            width: '340rpx',
            height: '340rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(99,102,241,0.18)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '-40rpx',
            top: '120rpx',
            width: '220rpx',
            height: '220rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(59,130,246,0.10)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: '84rpx',
            top: '296rpx',
            width: '8rpx',
            height: '128rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(15,23,42,0.4)'
          }}
        />

        <View style={{ position: 'relative', zIndex: 2, padding: '22rpx 10rpx 0' }}>
          <View
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8rpx 16rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: '1rpx solid rgba(255,255,255,0.22)',
              marginBottom: '34rpx'
            }}
          >
            <View
              style={{
                width: '12rpx',
                height: '12rpx',
                borderRadius: '999rpx',
                borderWidth: '2rpx',
                borderStyle: 'solid',
                borderColor: '#c7d2fe',
                marginRight: '10rpx'
              }}
            />
            <Text style={{ fontSize: '20rpx', color: '#e2e8f0', fontWeight: 600 }}>
              江苏省专转本权威培训品牌
            </Text>
          </View>

          <View style={{ marginBottom: '22rpx' }}>
            <Text
              style={{
                display: 'block',
                fontSize: '56rpx',
                lineHeight: 1.12,
                color: '#ffffff',
                fontWeight: 900,
                letterSpacing: '-1rpx'
              }}
            >
              专注江苏专转本
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: '54rpx',
                lineHeight: 1.14,
                color: '#7c83ff',
                fontWeight: 900,
                letterSpacing: '-1rpx',
                marginTop: '4rpx'
              }}
            >
              医护与高数精细化教研
            </Text>
          </View>

          <Text
            style={{
              display: 'block',
              width: '520rpx',
              maxWidth: '100%',
              fontSize: '24rpx',
              lineHeight: 1.95,
              color: '#d8e1f2',
              marginBottom: '34rpx'
            }}
          >
            秉承“严管厚爱，教书育人”的办学理念，以医护大类与高数专项为核心，为学员提供精准、高效的提分路径。
          </Text>

          <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Navigator
              url="/pages/about/index"
              openType="switchTab"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '238rpx',
                height: '82rpx',
                padding: '0 30rpx',
                borderRadius: '26rpx',
                background: 'linear-gradient(90deg, #5b4dff 0%, #4f46e5 100%)',
                boxShadow: '0 18rpx 36rpx rgba(79,70,229,0.35)',
                boxSizing: 'border-box'
              }}
            >
              <Text style={{ fontSize: '28rpx', color: '#ffffff', fontWeight: 800 }}>
                了解机构实力 →
              </Text>
            </Navigator>
            <Text
              style={{
                marginLeft: '18rpx',
                fontSize: '20rpx',
                color: '#cbd5e1',
                marginTop: '8rpx'
              }}
            >
              全日制集训 · 小班管理 · 跟踪答疑
            </Text>
          </View>
        </View>
      </View>

      <View style={{ margin: '-60rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
            borderRadius: '36rpx',
            padding: '28rpx 18rpx 24rpx',
            boxShadow: '0 14rpx 30rpx rgba(148,163,184,0.12)',
            border: '1rpx solid rgba(226,232,240,0.82)'
          }}
        >
          <View style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
            {stats.map((item, index) => (
              <View
                key={item.value}
                style={{
                  flex: 1,
                  padding: '0 10rpx',
                  borderRight: index === stats.length - 1 ? 'none' : '1rpx solid #e2e8f0',
                  boxSizing: 'border-box'
                }}
              >
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '24rpx',
                    color: '#475569',
                    fontWeight: 600,
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
                    color: '#0f172a',
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
                    fontSize: '20rpx',
                    color: '#64748b',
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

      <View style={{ margin: '34rpx 24rpx 0', display: 'flex', justifyContent: 'space-between' }}>
        {quickLinks.map((item) => (
          <Navigator
            key={item.url}
            url={item.url}
            openType="switchTab"
            style={{
              width: '23%',
              display: 'block',
              textAlign: 'center'
            }}
          >
            <View
              style={{
                background: item.cardBackground,
                borderRadius: '32rpx',
                padding: '22rpx 10rpx 22rpx',
                boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.10)',
                border: '1rpx solid rgba(226,232,240,0.85)'
              }}
            >
              <QuickIcon type={item.icon} color={item.accent} background={item.background} />
              <Text
                style={{
                  display: 'block',
                  fontSize: '24rpx',
                  color: item.accent,
                  fontWeight: 700,
                  marginBottom: '8rpx'
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: '18rpx',
                  color: '#64748b',
                  lineHeight: 1.5,
                  padding: '0 4rpx'
                }}
              >
                {item.desc}
              </Text>
            </View>
          </Navigator>
        ))}
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <SectionTitle>四大学习优势</SectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {advantages.map((item) => (
            <View
              key={item.title}
              style={{
                width: '48.2%',
                marginBottom: '16rpx',
                padding: '26rpx 24rpx 24rpx',
                borderRadius: '32rpx',
                background: 'linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)',
                boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.09)',
                border: '1rpx solid rgba(226,232,240,0.75)',
                boxSizing: 'border-box'
              }}
            >
              <View
                style={{
                  width: '42rpx',
                  height: '42rpx',
                  borderRadius: '14rpx',
                  backgroundColor: '#f6f7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18rpx'
                }}
              >
                <AdvantageIcon type={item.icon} />
              </View>
              <Text
                style={{
                  display: 'block',
                  fontSize: '30rpx',
                  color: '#0f172a',
                  fontWeight: 800,
                  marginBottom: '10rpx'
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: '22rpx',
                  lineHeight: 1.65,
                  color: '#64748b'
                }}
              >
                {item.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ margin: '42rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24rpx' }}>
          <SectionTitle>沉浸式学习环境</SectionTitle>
          <Navigator url="/pages/about/index" openType="switchTab">
            <Text style={{ fontSize: '22rpx', color: '#64748b', marginTop: '-18rpx' }}>查看更多</Text>
          </Navigator>
        </View>

        <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10rpx' }}>
          {environmentCards.slice(0, 2).map((item) => (
            <View
              key={item.label}
              style={{
                width: '48.5%',
                height: '270rpx',
                borderRadius: '32rpx',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Image
                src={`https://picsum.photos/seed/${item.seed}/400/320`}
                mode="aspectFill"
                style={{ width: '100%', height: '100%' }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '18rpx 22rpx',
                  background:
                    'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.82) 100%)'
                }}
              >
                <Text style={{ color: '#ffffff', fontSize: '24rpx', fontWeight: 700 }}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            height: '270rpx',
            borderRadius: '32rpx',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Image
            src={`https://picsum.photos/seed/${environmentCards[2].seed}/700/400`}
            mode="aspectFill"
            style={{ width: '100%', height: '100%' }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '18rpx 22rpx',
              background:
                'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.82) 100%)'
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: '24rpx', fontWeight: 700 }}>
              {environmentCards[2].label}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ margin: '42rpx 20rpx 0' }}>
        <SectionTitle>核心专业方向</SectionTitle>
        {directions.map((item, index) => (
          <Navigator
            key={item.title}
            url="/pages/courses/index"
            openType="switchTab"
            style={{ display: 'block', marginBottom: index === directions.length - 1 ? '0' : '24rpx' }}
          >
            <View
              style={{
                background: '#ffffff',
                borderRadius: '40rpx',
                padding: '44rpx 38rpx 40rpx',
                minHeight: '336rpx',
                boxShadow: '0 20rpx 38rpx rgba(148,163,184,0.15)',
                border: '1rpx solid rgba(226,232,240,0.92)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '34rpx' }}>
                  <View style={{ display: 'flex', alignItems: 'center', flex: 1, paddingRight: '20rpx' }}>
                    <View style={{ marginRight: '18rpx', flexShrink: 0 }}>
                      <DirectionIcon type={item.iconType} color={item.iconColor} />
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
                      fontWeight: 700,
                      flexShrink: 0
                    }}
                  >
                    {item.tag}
                  </Text>
                </View>
                <Text
                  style={{
                    display: 'block',
                    fontSize: '23rpx',
                    width: '84%',
                    lineHeight: 1.95,
                    color: '#64748b'
                  }}
                >
                  {item.desc}
                </Text>
              </View>
              <View
                style={{
                  marginTop: '28rpx',
                  paddingTop: '22rpx',
                  borderTop: '1rpx solid rgba(226,232,240,0.7)'
                }}
              >
                <Text style={{ fontSize: '24rpx', color: item.tagColor, fontWeight: 700 }}>查看方向详情 ›</Text>
              </View>
            </View>
          </Navigator>
        ))}
      </View>

      <View
        style={{
          margin: '42rpx 24rpx 0',
          borderRadius: '34rpx',
          padding: '36rpx 30rpx 34rpx',
          background: 'linear-gradient(135deg, #111d3f 0%, #0f1936 60%, #0a1229 100%)',
          boxShadow: '0 16rpx 30rpx rgba(15,23,42,0.18)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: '-56rpx',
            top: '-48rpx',
            width: '220rpx',
            height: '220rpx',
            borderRadius: '999rpx',
            backgroundColor: 'rgba(91,77,255,0.14)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '250rpx',
            top: '0',
            width: '1rpx',
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}
        />
        <Text
          style={{
            position: 'relative',
            display: 'block',
            fontSize: '40rpx',
            color: '#ffffff',
            fontWeight: 900,
            marginBottom: '14rpx'
          }}
        >
          免费学情评估
        </Text>
        <Text
          style={{
            position: 'relative',
            display: 'block',
            fontSize: '22rpx',
            lineHeight: 1.75,
            color: '#cbd5e1',
            marginBottom: '28rpx',
            width: '520rpx',
            maxWidth: '100%'
          }}
        >
          不确定适合哪个方向，或者想知道当前基础与目标院校之间差距，可以先做一次评估。
        </Text>
        <Navigator
          url="/pages/about/index"
          openType="switchTab"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '228rpx',
            height: '84rpx',
            padding: '0 30rpx',
            borderRadius: '26rpx',
            backgroundColor: '#ffffff',
            boxShadow: '0 12rpx 24rpx rgba(15,23,42,0.16)'
          }}
        >
          <Text style={{ fontSize: '26rpx', color: '#0f172a', fontWeight: 800 }}>预约咨询</Text>
        </Navigator>
        <Text
          style={{
            position: 'relative',
            display: 'block',
            marginTop: '18rpx',
            fontSize: '18rpx',
            color: '#94a3b8'
          }}
        >
          方向建议 · 学情诊断 · 备考规划
        </Text>
      </View>

      <Navigator
        url="/pages/about/index"
        openType="switchTab"
        style={{
          position: 'fixed',
          right: '26rpx',
          bottom: '182rpx',
          width: '96rpx',
          height: '96rpx',
          borderRadius: '999rpx',
          background: 'linear-gradient(180deg, #ff8a1f 0%, #ff6a00 100%)',
          boxShadow: '0 18rpx 34rpx rgba(255,106,0,0.40)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '116rpx',
            height: '116rpx',
            borderRadius: '999rpx',
            border: '1rpx solid rgba(255,186,120,0.24)'
          }}
        />
        <View
          style={{
            width: '40rpx',
            height: '40rpx',
            borderRadius: '999rpx',
            borderWidth: '4rpx',
            borderStyle: 'solid',
            borderColor: '#ffffff',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: '-4rpx',
              bottom: '-7rpx',
              width: '12rpx',
              height: '12rpx',
              borderBottom: '4rpx solid #ffffff',
              borderRight: '4rpx solid #ffffff',
              transform: 'rotate(42deg)'
            }}
          />
        </View>
      </Navigator>
    </View>
  );
}
