import { ScrollView, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const defaultCoursesPage = fallbackContent.pages.courses;
const defaultDirections = fallbackContent.directions;

function mapCourseCards(directions) {
  return (directions || []).map((item) => ({
    style: item.coursesCard?.style || 'light',
    tag: item.coursesCard?.tag || item.featuredTag || '',
    title: item.name,
    audience: item.audience || '',
    features: item.features || [],
    chips: item.chips || [],
    accent: item.coursesCard?.accent || '#334155',
    background: item.coursesCard?.background || '#ffffff',
    iconBg: item.coursesCard?.iconBg || '#eef2f7',
    iconType: item.coursesCard?.iconType || 'grid'
  }));
}

function getInitialCoursesState() {
  return {
    page: defaultCoursesPage,
    directions: defaultDirections
  };
}

function FilterScroller(props) {
  return (
    <View
      style={{
        ...surfaceCardStyle,
        borderRadius: ui.radius.lg,
        padding: '24rpx 20rpx 22rpx',
        boxShadow: ui.shadow.cardRaised
      }}
    >
      <ScrollView scrollX>
        <View style={{ display: 'flex', whiteSpace: 'nowrap', marginBottom: '16rpx' }}>
          {(props.categories || []).map((item, index) => (
            <View
              key={item}
              style={{
                marginRight: '14rpx',
                padding: '16rpx 28rpx',
                borderRadius: '22rpx',
                backgroundColor: index === 0 ? ui.colors.text : '#eef2f7'
              }}
            >
              <Text
                style={{
                  fontSize: ui.type.body,
                  color: index === 0 ? '#ffffff' : ui.colors.textSubtle,
                  fontWeight: 800
                }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: '22rpx', color: '#94a3b8' }}>◀</Text>
        <View
          style={{
            flex: 1,
            height: '14rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: '#d1d5db',
            margin: '0 14rpx',
            overflow: 'hidden'
          }}
        >
          <View
            style={{
              width: '84%',
              height: '100%',
              borderRadius: ui.radius.pill,
              backgroundColor: '#8b8f97'
            }}
          />
        </View>
        <Text style={{ fontSize: '22rpx', color: '#94a3b8' }}>▶</Text>
      </View>
    </View>
  );
}

function SuggestionCard(props) {
  return (
    <View
      style={{
        background: 'linear-gradient(180deg, #edf1ff 0%, #e9eeff 100%)',
        borderRadius: ui.radius.lg,
        padding: '30rpx 28rpx 26rpx',
        border: '1rpx solid rgba(181,195,255,0.55)',
        boxShadow: ui.shadow.card
      }}
    >
      <View style={{ display: 'flex', alignItems: 'center', marginBottom: '16rpx' }}>
        <View
          style={{
            width: '34rpx',
            height: '34rpx',
            borderRadius: ui.radius.pill,
            border: `3rpx solid ${ui.colors.accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12rpx',
            boxSizing: 'border-box'
          }}
        >
          <Text style={{ fontSize: ui.type.meta, color: ui.colors.accent, fontWeight: 800 }}>?</Text>
        </View>
        <Text style={{ fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800 }}>不知道如何规划专业方向？</Text>
      </View>

      {(props.suggestions || []).map((item) => (
        <View key={item} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12rpx' }}>
          <Text style={{ fontSize: ui.type.body, color: ui.colors.accent, marginRight: '10rpx', marginTop: '4rpx' }}>•</Text>
          <Text style={{ flex: 1, fontSize: ui.type.body, color: '#4f46e5', lineHeight: 1.8 }}>{item}</Text>
        </View>
      ))}

      <View
        style={{
          marginTop: '18rpx',
          backgroundColor: '#ffffff',
          borderRadius: ui.radius.sm,
          padding: '22rpx 20rpx',
          border: '1rpx solid rgba(226,232,240,0.9)'
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: ui.type.body, color: ui.colors.accent, fontWeight: 800 }}>
          免费获取 1对1 专业规划 〉
        </Text>
      </View>
    </View>
  );
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
            backgroundColor: '#ffffff'
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
            borderColor: '#ffffff',
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
            backgroundColor: '#ffffff'
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
            borderColor: '#ffffff',
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
            backgroundColor: '#ffffff'
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
        borderColor: '#64748b',
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
          backgroundColor: '#64748b',
          boxShadow:
            '7rpx 0 0 #64748b, 14rpx 0 0 #64748b, 0 7rpx 0 #64748b, 7rpx 7rpx 0 #64748b, 14rpx 7rpx 0 #64748b, 0 14rpx 0 #64748b, 7rpx 14rpx 0 #64748b, 14rpx 14rpx 0 #64748b'
        }}
      />
    </View>
  );
}

function DetailCard(props) {
  const isDark = props.style === 'dark';

  return (
    <View
      style={{
        marginBottom: props.isLast ? '0' : '26rpx',
        background: isDark ? props.background : ui.colors.surface,
        borderRadius: ui.radius.xl,
        padding: '28rpx 26rpx 26rpx',
        border: isDark ? '1rpx solid rgba(91,77,255,0.22)' : '1rpx solid rgba(226,232,240,0.9)',
        boxShadow: isDark
          ? '0 18rpx 34rpx rgba(15,23,42,0.18)'
          : '0 16rpx 30rpx rgba(148,163,184,0.12)'
      }}
    >
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22rpx' }}>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 14rpx',
            borderRadius: '12rpx',
            backgroundColor: isDark ? 'rgba(91,77,255,0.18)' : '#eef2f7'
          }}
        >
          <Text
            style={{
              fontSize: '18rpx',
              color: isDark ? '#c7caff' : '#64748b',
              fontWeight: 700
            }}
          >
            {props.tag}
          </Text>
        </View>
        <View
          style={{
            width: '74rpx',
            height: '74rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: props.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DirectionIcon type={props.iconType} />
        </View>
      </View>

      <Text
        style={{
          display: 'block',
          fontSize: '48rpx',
          lineHeight: 1.08,
          color: isDark ? '#ffffff' : '#0f172a',
          fontWeight: 900,
          marginBottom: '26rpx'
        }}
      >
        {props.title}
      </Text>

      <View
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc',
          borderRadius: ui.radius.sm,
          padding: '22rpx 22rpx 20rpx',
          border: isDark ? '1rpx solid rgba(255,255,255,0.08)' : '1rpx solid rgba(226,232,240,0.9)',
          marginBottom: '26rpx'
        }}
      >
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: '12rpx' }}>
          <Text style={{ fontSize: ui.type.body, color: isDark ? '#b5c0ff' : ui.colors.textMuted, marginRight: '8rpx' }}>◎</Text>
          <Text style={{ fontSize: ui.type.body, color: isDark ? '#b5c0ff' : ui.colors.textMuted, fontWeight: 700 }}>适合学员</Text>
        </View>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.85, color: isDark ? '#ffffff' : ui.colors.text }}>
          {props.audience}
        </Text>
      </View>

      <View style={{ marginBottom: '22rpx' }}>
        <Text style={{ display: 'block', fontSize: ui.type.body, color: isDark ? '#b5c0ff' : ui.colors.textMuted, fontWeight: 700, marginBottom: '18rpx' }}>
          培养方式与内容
        </Text>
        {props.features.map((feature) => (
          <View key={feature} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '14rpx' }}>
            <Text style={{ fontSize: ui.type.body, color: props.accent, marginRight: '10rpx', marginTop: '4rpx' }}>⊙</Text>
            <Text style={{ flex: 1, fontSize: ui.type.body, lineHeight: 1.75, color: isDark ? '#e2e8f0' : ui.colors.textSubtle }}>
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingTop: '20rpx',
          borderTop: isDark ? '1rpx solid rgba(255,255,255,0.08)' : '1rpx solid rgba(226,232,240,0.9)'
        }}
      >
        {props.chips.map((chip) => (
          <View
            key={chip}
            style={{
              marginRight: '12rpx',
              marginBottom: '10rpx',
              padding: '12rpx 16rpx',
              borderRadius: '16rpx',
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc',
              border: isDark ? '1rpx solid rgba(255,255,255,0.06)' : '1rpx solid rgba(226,232,240,0.9)'
            }}
          >
            <Text style={{ fontSize: ui.type.meta, color: isDark ? '#dbe4ff' : ui.colors.textMuted, fontWeight: 700 }}>{chip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function CoursesPage() {
  const [content, setContent] = useState(getInitialCoursesState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('courses')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          page: payload.page || defaultCoursesPage,
          directions: (payload.directions && payload.directions.length ? payload.directions : defaultDirections)
        });
        setLoadState({
          source: payload.__meta?.source || 'cloud',
          error: ''
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setLoadState({
          source: 'error',
          error: error && error.message ? error.message : '云端内容读取失败'
        });
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = loadContent();
    return cleanup;
  }, []);

  useCmsAutoRefresh(loadContent);

  const categories = content.page?.categories || defaultCoursesPage.categories;
  const suggestions = content.page?.suggestions || defaultCoursesPage.suggestions;
  const directionCards = useMemo(() => {
    const featuredIds = content.page?.featuredDirectionIds || [];
    const source = featuredIds.length
      ? featuredIds
          .map((id) => (content.directions || []).find((item) => item._id === id))
          .filter(Boolean)
      : content.directions || [];

    return mapCourseCards(source);
  }, [content]);
  const moreSection = content.page?.moreSection || defaultCoursesPage.moreSection;

  return (
    <View style={pageStyle}>
      {loadState.error ? (
        <View
          style={{
            margin: '18rpx 24rpx 0',
            padding: '16rpx 18rpx',
            borderRadius: '18rpx',
            backgroundColor: '#fff7ed',
            border: '1rpx solid #fdba74'
          }}
        >
          <Text style={{ fontSize: ui.type.meta, color: '#9a3412', fontWeight: 700 }}>
            云端内容未加载成功：{loadState.error}
          </Text>
        </View>
      ) : null}

      <View style={{ padding: `28rpx ${ui.spacing.page} 0` }}>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 14rpx',
            borderRadius: '999rpx',
            backgroundColor: '#eef2ff',
            marginBottom: '14rpx'
          }}
        >
          <Text style={{ fontSize: ui.type.note, color: '#4f46e5', fontWeight: 700 }}>
            {loadState.source === 'local-preview' ? '本地预览' : loadState.source === 'cloud' ? '云端内容' : '本地内容'}
          </Text>
        </View>
        <Text style={{ display: 'block', fontSize: ui.type.hero, lineHeight: 1.12, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
          {content.page?.title || defaultCoursesPage.title}
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, lineHeight: 1.75, color: ui.colors.textMuted }}>
          {content.page?.subtitle || defaultCoursesPage.subtitle}
        </Text>
      </View>

      <View style={{ margin: `26rpx ${ui.spacing.page} 0` }}>
        <FilterScroller categories={categories} />
      </View>

      <View style={{ margin: `34rpx ${ui.spacing.page} 0` }}>
        <SuggestionCard suggestions={suggestions} />
      </View>

      <View style={{ margin: `34rpx ${ui.spacing.pageCompact} 0` }}>
        {directionCards.map((item, index) => (
          <DetailCard key={item.title} {...item} isLast={index === directionCards.length - 1} />
        ))}
      </View>

      <View
        style={{
          margin: `26rpx ${ui.spacing.pageCompact} 0`,
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: ui.radius.xl,
          padding: '34rpx 30rpx 30rpx',
          border: '1rpx solid rgba(226,232,240,0.95)'
        }}
      >
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
          <Text style={{ fontSize: ui.type.section, color: ui.colors.textSoft, fontWeight: 800 }}>{moreSection.title}</Text>
          <View
            style={{
              padding: '10rpx 18rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: '#e2e8f0'
            }}
          >
            <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted, fontWeight: 700 }}>{moreSection.tag}</Text>
          </View>
        </View>
        <Text style={{ display: 'block', width: '88%', fontSize: ui.type.body, lineHeight: 1.85, color: ui.colors.textSoft }}>
          {moreSection.desc}
        </Text>
      </View>
    </View>
  );
}
