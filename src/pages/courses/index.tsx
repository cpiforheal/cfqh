import { Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageCtaCard from '../../components/PageCtaCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const defaultCoursesPage = fallbackContent.pages.courses;
const defaultDirections = fallbackContent.directions;

function normalizeCoursesPage(page) {
  if (!page) return defaultCoursesPage;

  const legacyCategories = ['全部方向', '医护大类', '高数专项', '更多筹备'];
  const legacyTitle = page.title === '开设方向';
  const legacySubtitle = String(page.subtitle || '').includes('精细化教研');
  const legacyCategoriesUsed =
    !Array.isArray(page.categories) ||
    page.categories.length < 3 ||
    legacyCategories.every((item, index) => page.categories?.[index] === item);
  const legacySuggestions =
    !Array.isArray(page.suggestions) ||
    !page.suggestions.length ||
    String(page.suggestions?.[0] || '').includes('护理/助产/临床背景');
  const legacyMoreSection =
    !page.moreSection ||
    page.moreSection.title === '更多专业方向' ||
    page.moreSection.tag === '筹备中';
  const missingCta = !page.cta?.title || !page.cta?.desc || !page.cta?.buttonText;

  return {
    ...page,
    title: legacyTitle ? defaultCoursesPage.title : page.title,
    subtitle: legacySubtitle ? defaultCoursesPage.subtitle : page.subtitle,
    categories: legacyCategoriesUsed ? defaultCoursesPage.categories : page.categories,
    suggestions: legacySuggestions ? defaultCoursesPage.suggestions : page.suggestions,
    moreSection: legacyMoreSection ? defaultCoursesPage.moreSection : page.moreSection,
    cta: missingCta ? { ...(page.cta || {}), ...defaultCoursesPage.cta } : page.cta
  };
}

function mapCourseCards(directions) {
  return (directions || []).map((item, index) => ({
    style: item.coursesCard?.style || 'light',
    tag: item.coursesCard?.tag || item.featuredTag || '',
    title: item.name,
    summary: item.summary || '',
    audience: item.audience || '',
    features: (item.features || []).slice(0, 3),
    chips: (item.chips || []).slice(0, 3),
    accent: item.coursesCard?.accent || '#4f7cff',
    background: item.coursesCard?.background || '#ffffff',
    iconBg: item.coursesCard?.iconBg || '#eef4ff',
    iconType: item.coursesCard?.iconType || 'grid',
    actionLabel: index === 0 ? '优先了解这条线' : '先看这条线'
  }));
}

function getInitialCoursesState() {
  return {
    page: normalizeCoursesPage(defaultCoursesPage),
    directions: defaultDirections
  };
}

function DirectionIcon(props) {
  if (props.type === 'pulse') {
    return (
      <View style={{ position: 'relative', width: '34rpx', height: '26rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: '12rpx',
            width: '8rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '7rpx',
            top: '6rpx',
            width: '5rpx',
            height: '11rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(25deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '13rpx',
            top: '12rpx',
            width: '6rpx',
            height: '3rpx',
            borderRadius: '999rpx',
            backgroundColor: props.color
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '18rpx',
            top: '6rpx',
            width: '5rpx',
            height: '11rpx',
            borderTopWidth: '3rpx',
            borderRightWidth: '3rpx',
            borderStyle: 'solid',
            borderColor: props.color,
            transform: 'rotate(-25deg)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: '12rpx',
            width: '9rpx',
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
        width: '30rpx',
        height: '34rpx',
        borderWidth: '3rpx',
        borderStyle: 'solid',
        borderColor: props.color,
        borderRadius: '6rpx',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      <View
        style={{
          position: 'absolute',
          left: '5rpx',
          top: '5rpx',
          width: '3rpx',
          height: '3rpx',
          backgroundColor: props.color,
          boxShadow: `7rpx 0 0 ${props.color}, 14rpx 0 0 ${props.color}, 0 7rpx 0 ${props.color}, 7rpx 7rpx 0 ${props.color}, 14rpx 7rpx 0 ${props.color}, 0 14rpx 0 ${props.color}, 7rpx 14rpx 0 ${props.color}, 14rpx 14rpx 0 ${props.color}`
        }}
      />
    </View>
  );
}

function DecisionHero(props) {
  return (
    <View
      style={{
        ...surfaceCardStyle,
        borderRadius: ui.radius.xl,
        padding: '34rpx 30rpx 30rpx',
        boxShadow: '0 20rpx 44rpx rgba(140, 174, 230, 0.16)',
        border: '1rpx solid rgba(209, 226, 255, 0.96)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: '-46rpx',
          top: '-56rpx',
          width: '250rpx',
          height: '250rpx',
          borderRadius: ui.radius.pill,
          background: 'radial-gradient(circle, rgba(172,208,255,0.42) 0%, rgba(172,208,255,0) 72%)'
        }}
      />
      <View
        style={{
          display: 'inline-flex',
          padding: '10rpx 18rpx',
          borderRadius: ui.radius.pill,
          backgroundColor: '#ebf4ff',
          marginBottom: '18rpx'
        }}
      >
        <Text style={{ fontSize: ui.type.meta, color: '#3b82f6', fontWeight: 800 }}>方向判断</Text>
      </View>

      <Text style={{ display: 'block', fontSize: ui.type.hero, lineHeight: 1.14, color: ui.colors.text, fontWeight: 900, marginBottom: '14rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.78, color: ui.colors.textMuted, marginBottom: '24rpx' }}>
        {props.subtitle}
      </Text>

      <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '22rpx' }}>
        {(props.categories || []).slice(0, 3).map((item, index) => (
          <View
            key={item}
            style={{
              marginRight: '14rpx',
              marginBottom: '12rpx',
              padding: index === 2 ? '16rpx 20rpx' : '18rpx 22rpx',
              borderRadius: '22rpx',
              background: index === 2 ? '#f8fbff' : 'linear-gradient(180deg, #f7fbff 0%, #edf5ff 100%)',
              border: index === 2 ? '1rpx solid rgba(217,227,240,0.95)' : '1rpx solid rgba(196,220,255,0.9)',
              boxShadow: index === 2 ? 'none' : '0 12rpx 22rpx rgba(161, 190, 230, 0.10)'
            }}
          >
            <Text style={{ fontSize: ui.type.body, color: index === 2 ? ui.colors.textMuted : ui.colors.text, fontWeight: 800 }}>{item}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          background: 'linear-gradient(180deg, #fbfdff 0%, #f3f8ff 100%)',
          borderRadius: ui.radius.lg,
          padding: '24rpx 22rpx',
          border: '1rpx solid rgba(218,231,250,0.95)'
        }}
      >
        {(props.suggestions || []).slice(0, 3).map((item, index) => (
          <View
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: index === Math.min((props.suggestions || []).length, 3) - 1 ? '0' : '16rpx'
            }}
          >
            <View
              style={{
                width: '16rpx',
                height: '16rpx',
                borderRadius: ui.radius.pill,
                backgroundColor: index === 2 ? '#cbd5e1' : '#60a5fa',
                marginRight: '14rpx',
                marginTop: '10rpx',
                flexShrink: 0
              }}
            />
            <Text style={{ flex: 1, fontSize: ui.type.body, lineHeight: 1.78, color: index === 2 ? ui.colors.textMuted : ui.colors.textSoft }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ActionStep(props) {
  return (
    <View
      style={{
        width: '31.8%',
        borderRadius: '24rpx',
        padding: '20rpx 18rpx',
        background: props.active ? 'linear-gradient(180deg, #eef4ff 0%, #ffffff 100%)' : '#ffffff',
        border: props.active ? '1rpx solid rgba(165,196,255,0.96)' : '1rpx solid rgba(226,232,240,0.92)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.meta, color: props.active ? '#3b82f6' : ui.colors.textMuted, fontWeight: 800 }}>
        {props.step}
      </Text>
      <Text style={{ display: 'block', marginTop: '12rpx', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, lineHeight: 1.35 }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.65 }}>
        {props.desc}
      </Text>
    </View>
  );
}

function ActionPlanCard() {
  return (
    <View
      style={{
        margin: `26rpx ${ui.spacing.pageCompact} 0`,
        ...surfaceCardStyle,
        borderRadius: ui.radius.xl,
        padding: '26rpx 24rpx 24rpx'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900 }}>先按这三步判断</Text>
      <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.body, lineHeight: 1.72, color: ui.colors.textMuted }}>
        先看自己更接近哪一条备考线，再确认课程安排，最后用一道题验证当前节奏是否合适。
      </Text>

      <View style={{ display: 'flex', justifyContent: 'space-between', marginTop: '22rpx' }}>
        <ActionStep step="第一步" title="先判断方向" desc="看自己更适合医护还是高数。" active />
        <ActionStep step="第二步" title="看课程安排" desc="确认课程节奏、资料和服务方式。" />
        <ActionStep step="第三步" title="去练题验证" desc="做一题或看错题，感受当前基础。" />
      </View>

      <View style={{ display: 'flex', justifyContent: 'space-between', marginTop: '22rpx' }}>
        <Navigator url="/pages/materials/index" hoverClass="none" style={{ display: 'block', width: '48.5%' }}>
          <View
            style={{
              height: '84rpx',
              borderRadius: '22rpx',
              background: '#eef4ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: ui.type.body, color: '#2754c5', fontWeight: 800 }}>先看课程安排</Text>
          </View>
        </Navigator>
        <Navigator url="/pages/study/index" openType="switchTab" hoverClass="none" style={{ display: 'block', width: '48.5%' }}>
          <View
            style={{
              height: '84rpx',
              borderRadius: '22rpx',
              background: 'linear-gradient(90deg, #2c4b84 0%, #18346b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 16rpx 28rpx rgba(24, 52, 107, 0.18)'
            }}
          >
            <Text style={{ fontSize: ui.type.body, color: '#ffffff', fontWeight: 800 }}>直接去练题</Text>
          </View>
        </Navigator>
      </View>
    </View>
  );
}

function DetailCard(props) {
  return (
    <View
      style={{
        position: 'relative',
        marginBottom: props.isLast ? '0' : '26rpx',
        borderRadius: ui.radius.xl,
        padding: '32rpx 28rpx 28rpx',
        background: 'linear-gradient(180deg, #ffffff 0%, #f6fbff 100%)',
        border: '1rpx solid rgba(214,229,248,0.96)',
        boxShadow: '0 24rpx 50rpx rgba(148,163,184,0.14)',
        overflow: 'hidden'
      }}
    >
      <View
        style={{
          position: 'absolute',
          inset: '0',
          background: `linear-gradient(135deg, ${props.background} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0.14
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '0',
          top: '34rpx',
          bottom: '34rpx',
          width: '10rpx',
          borderRadius: '0 999rpx 999rpx 0',
          background: `linear-gradient(180deg, ${props.accent} 0%, rgba(255,255,255,0.5) 100%)`
        }}
      />

      <View style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22rpx' }}>
        <View
          style={{
            display: 'inline-flex',
            padding: '10rpx 16rpx',
            borderRadius: '14rpx',
            backgroundColor: '#edf5ff'
          }}
        >
          <Text style={{ fontSize: ui.type.meta, color: props.accent, fontWeight: 800 }}>{props.tag}</Text>
        </View>
        <View
          style={{
            width: '78rpx',
            height: '78rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: props.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 14rpx 28rpx ${props.accent}1a`
          }}
        >
          <DirectionIcon type={props.iconType} color={props.accent} />
        </View>
      </View>

      <Text style={{ display: 'block', fontSize: '46rpx', lineHeight: 1.14, color: ui.colors.text, fontWeight: 900, marginBottom: '12rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.78, color: ui.colors.textMuted, marginBottom: '22rpx' }}>
        {props.summary}
      </Text>

      <View
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #fbfdff 0%, #f4f8ff 100%)',
          borderRadius: ui.radius.lg,
          padding: '22rpx 20rpx',
          border: '1rpx solid rgba(218,231,250,0.95)',
          marginBottom: '22rpx'
        }}
      >
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: props.accent, fontWeight: 800, marginBottom: '12rpx' }}>适合这类同学</Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.8, color: ui.colors.text }}>{props.audience}</Text>
      </View>

      <View style={{ marginBottom: '22rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, fontWeight: 800, marginBottom: '16rpx' }}>你会重点解决这些问题</Text>
        {(props.features || []).map((feature) => (
          <View key={feature} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '14rpx' }}>
            <View
              style={{
                width: '14rpx',
                height: '14rpx',
                borderRadius: ui.radius.pill,
                backgroundColor: props.accent,
                marginRight: '12rpx',
                marginTop: '10rpx',
                flexShrink: 0,
                boxShadow: `0 0 0 6rpx ${props.accent}14`
              }}
            />
            <Text style={{ flex: 1, fontSize: ui.type.body, lineHeight: 1.76, color: ui.colors.textSoft }}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '22rpx' }}>
        {(props.chips || []).map((chip) => (
          <View
            key={chip}
            style={{
              marginRight: '12rpx',
              marginBottom: '12rpx',
              padding: '12rpx 16rpx',
              borderRadius: '16rpx',
              backgroundColor: '#ffffff',
              border: '1rpx solid rgba(221,231,242,0.95)'
            }}
          >
            <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted, fontWeight: 700 }}>{chip}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          position: 'relative',
          borderTop: '1rpx solid rgba(226,232,240,0.96)',
          paddingTop: '20rpx',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flex: 1, minWidth: 0, paddingRight: '18rpx' }}>
          <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textSoft, fontWeight: 700 }}>
            建议下一步：先看课程安排，再去做一题验证自己现在的节奏。
          </Text>
          <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.note, color: ui.colors.textMuted }}>
            不用一次看很多说明，先完成这两步就够了。
          </Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Navigator url="/pages/materials/index" hoverClass="none" style={{ display: 'block', marginRight: '12rpx' }}>
            <View
              style={{
                minWidth: '154rpx',
                height: '68rpx',
                padding: '0 18rpx',
                borderRadius: ui.radius.pill,
                backgroundColor: '#eef4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: ui.type.note, color: '#315ec9', fontWeight: 800 }}>看课程安排</Text>
            </View>
          </Navigator>
          <Navigator url="/pages/study/index" openType="switchTab" hoverClass="none" style={{ display: 'block' }}>
            <View
              style={{
                minWidth: '142rpx',
                height: '68rpx',
                padding: '0 18rpx',
                borderRadius: ui.radius.pill,
                background: `linear-gradient(90deg, ${props.accent} 0%, #1d4ed8 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 14rpx 24rpx ${props.accent}1f`
              }}
            >
              <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 800 }}>{props.actionLabel}</Text>
            </View>
          </Navigator>
        </View>
      </View>
    </View>
  );
}

function MoreSection(props) {
  return (
    <View
      style={{
        margin: `22rpx ${ui.spacing.pageCompact} 40rpx`,
        borderRadius: ui.radius.xl,
        padding: '24rpx 24rpx 22rpx',
        background: 'linear-gradient(180deg, #fcfdff 0%, #f7f9fc 100%)',
        border: '1rpx solid rgba(230,236,244,0.96)'
      }}
    >
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14rpx' }}>
        <Text style={{ fontSize: ui.type.section, color: ui.colors.textSoft, fontWeight: 800 }}>{props.title}</Text>
        <View
          style={{
            padding: '8rpx 16rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: '#eef2f7'
          }}
        >
          <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted, fontWeight: 700 }}>{props.tag}</Text>
        </View>
      </View>
      <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.76, color: ui.colors.textMuted }}>{props.desc}</Text>
    </View>
  );
}

export default function CoursesPage() {
  const [content, setContent] = useState(getInitialCoursesState());

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('courses')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          page: normalizeCoursesPage(payload.page || defaultCoursesPage),
          directions: payload.directions && payload.directions.length ? payload.directions : defaultDirections
        });
      })
      .catch(() => {
        if (!mounted) return;
        setContent(getInitialCoursesState());
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = loadContent();
    return cleanup;
  }, [loadContent]);

  useCmsAutoRefresh(loadContent);

  const page = content.page || defaultCoursesPage;
  const directionCards = useMemo(() => {
    const featuredIds = page.featuredDirectionIds || [];
    const source = featuredIds.length
      ? featuredIds.map((id) => (content.directions || []).find((item) => item._id === id)).filter(Boolean)
      : content.directions || [];

    return mapCourseCards(source);
  }, [content.directions, page.featuredDirectionIds]);

  return (
    <View style={pageStyle}>
      <View style={{ margin: `28rpx ${ui.spacing.page} 0` }}>
        <DecisionHero title={page.title} subtitle={page.subtitle} categories={page.categories} suggestions={page.suggestions} />
      </View>

      <View style={{ marginTop: '34rpx' }}>
        <PageSectionTitle
          title='两条重点备考线'
          subtitle='先看自己更接近哪一条，再决定课程安排和训练节奏。'
        />
      </View>

      <ActionPlanCard />

      <View style={{ margin: `10rpx ${ui.spacing.pageCompact} 0` }}>
        {directionCards.map((item, index) => (
          <DetailCard key={item.title} {...item} isLast={index === directionCards.length - 1} />
        ))}
      </View>

      <PageCtaCard
        margin={`30rpx ${ui.spacing.page} 0`}
        title={page.cta?.title}
        desc={page.cta?.desc}
        buttonText={page.cta?.buttonText}
        footnote={page.cta?.footnote}
        background='linear-gradient(180deg, #102f6a 0%, #164494 100%)'
        orbColor='rgba(125, 185, 255, 0.18)'
        buttonBackground='linear-gradient(180deg, #ffffff 0%, #eef6ff 100%)'
        buttonTextColor='#0f3a81'
        buttonShadow='0 14rpx 28rpx rgba(8, 37, 82, 0.18)'
      />

      <MoreSection {...(page.moreSection || defaultCoursesPage.moreSection)} />
    </View>
  );
}
