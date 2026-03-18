import { Image, Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageCtaCard from '../../components/PageCtaCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import SkeletonScreen from '../../components/SkeletonScreen';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
import { resolveMediaUrl } from '../../utils/media';

const defaultHomePage = fallbackContent.pages.home;
const defaultDirections = fallbackContent.directions;
const heroPresentationFallback = {
  chip: '江苏省专转本专业辅导',
  title: '专转本，一次就上岸',
  highlightTitle: '医护大类 & 高数专项 · 精细化教研体系',
  desc: '医护大类 + 高数专项双主线，让备考更稳、更清晰',
  tags: ['92%+ 上岸率', '全职答疑', '独立校区'],
  primaryButton: {
    text: '查看上岸学员案例',
    url: '/pages/success/index',
    openType: 'switchTab'
  },
  secondaryNote: '真实数据 · 可验证'
};
const overviewStatsPresentationFallback = [
  { value: '92.3%', label: '上岸率', note: '2025届实际数据' },
  { value: '1:8', label: '师生比', note: '小班精细化' },
  { value: '365天', label: '全年答疑', note: '全职坐班' }
];

function normalizeHomeHero(hero) {
  if (!hero) return heroPresentationFallback;

  const isLegacyHero =
    hero.chip === '江苏省专转本权威培训品牌' ||
    hero.title === '乘帆启航' ||
    hero.highlightTitle === '专注江苏专转本医护与高数精细化教研' ||
    hero.primaryButton?.text === '了解机构实力';

  if (!isLegacyHero) {
    return hero;
  }

  return {
    ...hero,
    ...heroPresentationFallback,
    backgroundImageUrl: hero.backgroundImageUrl,
    backgroundImageSeed: hero.backgroundImageSeed || 'university'
  };
}

function normalizeOverviewStats(stats) {
  const isLegacyStats =
    Array.isArray(stats) &&
    stats.length === 3 &&
    stats[0]?.value === '核心' &&
    stats[1]?.value === '精品' &&
    stats[2]?.value === '高';

  return isLegacyStats ? overviewStatsPresentationFallback : stats;
}

function normalizeHomePagePresentation(page) {
  if (!page) return defaultHomePage;

  return {
    ...page,
    hero: normalizeHomeHero(page.hero),
    overviewStats: normalizeOverviewStats(page.overviewStats)
  };
}

function compactText(text, maxLength) {
  if (!text) return '';
  const normalized = String(text).replace(/\s+/g, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trim()}...`;
}

function getDirectionMiniLabel(item) {
  const source = item?.chips?.[0] || item?.desc || item?.audience || item?.title || '';
  return compactText(source.replace(/^适合/, ''), 10);
}

function getQuickLinkTone(icon, index) {
  const toneMap = {
    compass: { accent: '#0369a1', background: '#e0f2fe' },
    daily: { accent: '#0f766e', background: '#ecfeff' },
    paper: { accent: '#115e59', background: '#ccfbf1' },
    wrongbook: { accent: '#0f766e', background: '#ecfeff' },
    building: { accent: '#7c3aed', background: '#f3e8ff' },
    team: { accent: '#be185d', background: '#fce7f3' },
    trophy: { accent: '#b45309', background: '#fef3c7' }
  };

  return (
    toneMap[icon] ||
    [toneMap.compass, toneMap.daily, toneMap.paper, toneMap.wrongbook][index] ||
    toneMap.compass
  );
}

function mapHomeDirections(page, allDirections) {
  const featuredIds = page?.featuredDirectionIds || [];
  const source = featuredIds.length
    ? featuredIds
        .map((id) => (allDirections || []).find((item) => item._id === id))
        .filter(Boolean)
    : (allDirections || []).filter((item) => item.isFeatured);

  return source.map((item) => ({
    title: item.name,
    tag: item.homeTag || item.featuredTag || '',
    tagColor: item.homeCard?.tagColor || '#0f766e',
    tagBackground: item.homeCard?.tagBackground || '#ecfeff',
    headerBackground: item.homeCard?.headerBackground || '#f0fdfa',
    iconColor: item.homeCard?.iconColor || '#0f766e',
    iconType: item.iconType === 'pulse' ? 'medical' : item.iconType,
    desc: item.summary || '',
    audience: item.audience || '',
    chips: item.chips || [],
    features: item.features || []
  }));
}

function getInitialHomeState() {
  return {
    site: fallbackContent.site,
    page: defaultHomePage,
    directions: defaultDirections
  };
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

  if (props.type === 'daily') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '38rpx',
            height: '38rpx',
            borderRadius: '10rpx',
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
              left: '6rpx',
              right: '6rpx',
              top: '10rpx',
              height: '2.5rpx',
              backgroundColor: lineColor,
              boxShadow: `0 8rpx 0 ${lineColor}, 0 16rpx 0 ${lineColor}`
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '8rpx',
              top: '-5rpx',
              width: '6rpx',
              height: '8rpx',
              borderRadius: '4rpx',
              backgroundColor: lineColor,
              boxShadow: `14rpx 0 0 ${lineColor}`
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'paper') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '34rpx',
            height: '42rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: '8rpx',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '7rpx',
              right: '7rpx',
              top: '10rpx',
              height: '2.5rpx',
              backgroundColor: lineColor,
              boxShadow: `0 9rpx 0 ${lineColor}, 0 18rpx 0 ${lineColor}`
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: '-2rpx',
              top: '8rpx',
              width: '10rpx',
              height: '10rpx',
              borderTopWidth: lineWidth,
              borderRightWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              transform: 'rotate(45deg)'
            }}
          />
        </View>
      </View>
    );
  }

  if (props.type === 'wrongbook') {
    return (
      <View style={commonWrap}>
        <View
          style={{
            width: '34rpx',
            height: '40rpx',
            borderWidth: lineWidth,
            borderStyle: 'solid',
            borderColor: lineColor,
            borderRadius: '8rpx 8rpx 6rpx 6rpx',
            position: 'relative',
            boxSizing: 'border-box'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: '8rpx',
              top: '8rpx',
              width: '16rpx',
              height: '11rpx',
              borderLeftWidth: lineWidth,
              borderBottomWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              transform: 'rotate(-45deg)'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '10rpx',
              bottom: '-2rpx',
              width: '10rpx',
              height: '10rpx',
              backgroundColor: props.background || '#ecfeff',
              borderLeftWidth: lineWidth,
              borderBottomWidth: lineWidth,
              borderStyle: 'solid',
              borderColor: lineColor,
              transform: 'rotate(-45deg)'
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
  const color = '#0f766e';
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
  const [content, setContent] = useState(getInitialHomeState());
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('home')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultHomePage,
          directions: (payload.directions && payload.directions.length ? payload.directions : defaultDirections)
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setIsLoading(false);
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

  const directions = useMemo(
    () => mapHomeDirections(content.page || defaultHomePage, content.directions || defaultDirections),
    [content]
  );

  // 显示骨架屏
  if (isLoading) {
    return <SkeletonScreen type="full" />;
  }

  const normalizedPage = normalizeHomePagePresentation(content.page || defaultHomePage);
  const hero = normalizedPage.hero || defaultHomePage.hero;
  const heroHasBackgroundImage = Boolean(hero.backgroundImageUrl);
  const stats = normalizedPage.overviewStats || defaultHomePage.overviewStats;
  const quickLinks = normalizedPage.quickLinks || defaultHomePage.quickLinks;
  const advantages = normalizedPage.advantages || defaultHomePage.advantages;
  const environmentCards = normalizedPage.environmentSection?.cards || defaultHomePage.environmentSection.cards;
  const cta = normalizedPage.cta || defaultHomePage.cta;
  const heroDesc = heroHasBackgroundImage ? compactText(hero.desc, 20) : '医护 + 高数双主线';
  const heroTags = (hero.tags || []).slice(0, 2);
  const featuredAdvantages = advantages.slice(0, 2);
  const visibleEnvironmentCards = environmentCards.slice(0, 2);
  const portalQuickLinks = Array.from({ length: 4 }, (_, index) => quickLinks[index] || defaultHomePage.quickLinks[index])
    .filter(Boolean)
    .map((item, index) => ({
      ...item,
      openType: item?.openType || 'navigate',
      icon: item?.icon || 'compass',
      ...getQuickLinkTone(item?.icon, index)
    }));
  const homeTone = {
    accent: '#0284c7',
    accentStrong: '#0369a1',
    accentLine: '#38bdf8',
    accentSoft: '#e0f2fe',
    accentSurface: '#f0f9ff',
    accentBorder: 'rgba(14,165,233,0.16)',
    accentShadow: 'rgba(56,189,248,0.16)',
    titleSubtle: '#475569',
    note: '#64748b'
  };

  return (
    <View style={pageStyle}>
      <View
        style={{
          overflow: 'hidden',
          borderBottomLeftRadius: '32rpx',
          borderBottomRightRadius: '32rpx',
          background: heroHasBackgroundImage ? '#ffffff' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }}
      >
        {heroHasBackgroundImage ? (
          <Image
            src={resolveMediaUrl({
              url: hero.backgroundImageUrl,
              seed: hero.backgroundImageSeed || 'university',
              fallbackSize: '900/700'
            })}
            mode="aspectFit"
            style={{
              display: 'block',
              width: '100%',
              height: '620rpx',
              backgroundColor: '#ffffff'
            }}
          />
        ) : null}

        <View
          style={{
            padding: heroHasBackgroundImage ? `30rpx ${ui.spacing.page} 52rpx` : `24rpx ${ui.spacing.page} 132rpx`
          }}
        >
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.chip,
              color: heroHasBackgroundImage ? homeTone.accentStrong : '#dbeafe',
              fontWeight: 700,
              letterSpacing: '1.5rpx',
              marginBottom: heroHasBackgroundImage ? '18rpx' : '26rpx'
            }}
          >
            {hero.chip}
          </Text>

          <View style={{ marginBottom: '18rpx' }}>
            <Text
              style={{
                display: 'block',
                fontSize: heroHasBackgroundImage ? '52rpx' : '50rpx',
                lineHeight: 1.14,
                color: heroHasBackgroundImage ? '#0f172a' : '#ffffff',
                fontWeight: 900,
                letterSpacing: '-1rpx'
              }}
            >
              {hero.title}
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: heroHasBackgroundImage ? '38rpx' : '46rpx',
                lineHeight: heroHasBackgroundImage ? 1.28 : 1.16,
                color: heroHasBackgroundImage ? homeTone.accentStrong : '#67e8f9',
                fontWeight: heroHasBackgroundImage ? 700 : 900,
                letterSpacing: '-1rpx',
                marginTop: heroHasBackgroundImage ? '12rpx' : '4rpx'
              }}
            >
              {hero.highlightTitle}
            </Text>
          </View>

          <Text
            style={{
              display: 'block',
              width: heroHasBackgroundImage ? '100%' : '500rpx',
              maxWidth: '100%',
              fontSize: ui.type.meta,
              lineHeight: heroHasBackgroundImage ? 1.9 : 1.8,
              color: heroHasBackgroundImage ? homeTone.titleSubtle : '#d8e1f2',
              marginBottom: heroHasBackgroundImage ? '28rpx' : '24rpx'
            }}
          >
            {heroDesc}
          </Text>

          <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18rpx' }}>
            <Navigator
              url={hero.primaryButton?.url || '/pages/about/index'}
              openType={hero.primaryButton?.openType || 'navigate'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '230rpx',
                height: '78rpx',
                padding: '0 28rpx',
                borderRadius: '24rpx',
                background: heroHasBackgroundImage
                  ? 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)'
                  : 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)',
                border: 'none',
                boxShadow: heroHasBackgroundImage
                  ? '0 12rpx 26rpx rgba(14,165,233,0.18)'
                  : '0 12rpx 24rpx rgba(14,165,233,0.18)',
                boxSizing: 'border-box'
              }}
            >
              <Text
                style={{
                  fontSize: ui.type.body,
                  color: '#ffffff',
                  fontWeight: 800
                }}
              >
                {hero.primaryButton?.text || '查看详情'}
              </Text>
            </Navigator>
          </View>

          <View style={{ display: 'flex', flexWrap: 'wrap' }}>
            {heroTags.map((item, index) => (
              <View
                key={item}
                style={{
                  marginRight: index === heroTags.length - 1 ? '0' : '12rpx',
                  marginBottom: '10rpx',
                  padding: heroHasBackgroundImage ? '10rpx 16rpx' : '9rpx 14rpx',
                  borderRadius: '999rpx',
                  backgroundColor: heroHasBackgroundImage ? '#f0f9ff' : 'rgba(255,255,255,0.10)',
                  border: heroHasBackgroundImage
                    ? '1rpx solid rgba(14,165,233,0.14)'
                    : '1rpx solid rgba(255,255,255,0.12)'
                }}
              >
                <Text
                  style={{
                    fontSize: ui.type.note,
                    color: heroHasBackgroundImage ? homeTone.accentStrong : '#d7def0',
                    fontWeight: 700
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: heroHasBackgroundImage ? '24rpx 24rpx 0' : '-60rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: '24rpx',
            padding: '18rpx 14rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
            border: `1rpx solid ${homeTone.accentBorder}`,
            boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.08)'
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
                    fontSize: ui.type.note,
                    color: ui.colors.textMuted,
                    fontWeight: 700,
                    marginBottom: '6rpx'
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '38rpx',
                    color: index === 0 ? homeTone.accentStrong : ui.colors.text,
                    fontWeight: 900,
                    lineHeight: 1.1
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: '34rpx 24rpx 0', display: 'flex', justifyContent: 'space-between' }}>
        {portalQuickLinks.map((item) => (
          <Navigator
            key={item.url}
            url={item.url}
            openType={item.openType || 'navigate'}
            hoverClass="none"
            style={{
              width: '23%',
              display: 'block',
              textAlign: 'center'
            }}
          >
            <View
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
                borderRadius: '24rpx',
                padding: '20rpx 10rpx 18rpx',
                boxShadow: '0 10rpx 18rpx rgba(148,163,184,0.05)',
                border: `1rpx solid ${homeTone.accentBorder}`
              }}
            >
              <QuickIcon type={item.icon} color={item.accent} background={item.background} />
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: '#0f172a',
                  fontWeight: 700,
                  marginBottom: '0'
                }}
              >
                {item.label}
              </Text>
            </View>
          </Navigator>
        ))}
      </View>

      <View style={{ margin: '36rpx 20rpx 0' }}>
        <PageSectionTitle lineColor={homeTone.accentLine}>热门方向</PageSectionTitle>
        {directions.map((item, index) => (
          <Navigator
            key={item.title}
            url="/pages/courses/index"
            openType="switchTab"
            style={{ display: 'block', marginBottom: index === directions.length - 1 ? '0' : '18rpx' }}
          >
            <View
              style={{
                background: index === 0 ? 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)' : '#ffffff',
                borderRadius: '24rpx',
                padding: '22rpx 20rpx 20rpx',
                minHeight: '196rpx',
                boxShadow: index === 0 ? `0 16rpx 30rpx ${homeTone.accentShadow}` : '0 10rpx 20rpx rgba(148,163,184,0.06)',
                border: `1rpx solid ${homeTone.accentBorder}`,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {index === 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    right: '-20rpx',
                    top: '-18rpx',
                    width: '140rpx',
                    height: '140rpx',
                    borderRadius: '999rpx',
                    backgroundColor: 'rgba(56,189,248,0.08)'
                  }}
                />
              ) : null}
              <View>
                <View style={{ display: 'flex', alignItems: 'center', marginBottom: '12rpx' }}>
                  <Text style={{ fontSize: ui.type.note, color: item.tagColor, fontWeight: 700 }}>
                    {item.tag}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: item.headerBackground,
                    borderRadius: '20rpx',
                    padding: '14rpx 14rpx',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <View style={{ marginRight: '16rpx', flexShrink: 0 }}>
                      <DirectionIcon type={item.iconType} color={item.iconColor} />
                    </View>
                    <Text style={{ fontSize: '30rpx', color: '#0f172a', fontWeight: 800, flex: 1 }}>{item.title}</Text>
                  </View>
                </View>
                {item.chips?.length ? (
                  <View
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      marginTop: '4rpx',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {item.chips.slice(0, 1).map((chip) => (
                      <View
                        key={chip}
                        style={{
                          marginTop: '10rpx',
                          padding: '6rpx 10rpx',
                          borderRadius: '999rpx',
                          backgroundColor: '#f8fafc',
                          border: `1rpx solid ${homeTone.accentBorder}`
                        }}
                      >
                        <Text style={{ fontSize: ui.type.note, color: '#475569', fontWeight: 700 }}>{chip}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text
                    style={{
                      display: 'block',
                      marginTop: '10rpx',
                      fontSize: ui.type.note,
                      color: ui.colors.textMuted,
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {getDirectionMiniLabel(item)}
                  </Text>
                )}
              </View>
              <View
                style={{
                  marginTop: '14rpx',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <View
                  style={{
                    minWidth: '148rpx',
                    height: '54rpx',
                    padding: '0 18rpx',
                    borderRadius: '999rpx',
                    background: index === 0 ? 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 100%)' : '#f0f9ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: index === 0 ? '#ffffff' : homeTone.accentStrong, fontWeight: 800 }}>
                    查看详情
                  </Text>
                </View>
              </View>
            </View>
          </Navigator>
        ))}

      </View>

      <View style={{ margin: '36rpx 24rpx 0' }}>
        <PageSectionTitle lineColor={homeTone.accentLine}>学习支持</PageSectionTitle>
        <View style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {featuredAdvantages.map((item) => (
            <View
              key={item.title}
              style={{
                width: '48.6%',
                marginBottom: '0',
                padding: '20rpx 18rpx 18rpx',
                borderRadius: '20rpx',
                background: '#ffffff',
                boxShadow: '0 8rpx 16rpx rgba(148,163,184,0.05)',
                border: `1rpx solid ${homeTone.accentBorder}`,
                boxSizing: 'border-box'
              }}
            >
              <View
                style={{
                  width: '38rpx',
                  height: '38rpx',
                  borderRadius: '12rpx',
                  backgroundColor: homeTone.accentSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14rpx'
                }}
              >
                <AdvantageIcon type={item.icon} />
              </View>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: ui.colors.text,
                  fontWeight: 800,
                  marginBottom: '0'
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <PageCtaCard
        title={cta.title}
        buttonText={cta.buttonText}
        margin="34rpx 24rpx 0"
        background="linear-gradient(135deg, #0f3b7a 0%, #0c6abf 100%)"
        orbColor="rgba(125,211,252,0.16)"
        buttonBackground="linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)"
        buttonTextColor="#0f3b7a"
        buttonShadow="0 12rpx 24rpx rgba(14,165,233,0.18)"
        compact
      />

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <View style={{ marginBottom: '14rpx' }}>
          <PageSectionTitle marginBottom="0" lineColor={homeTone.accentLine}>学习环境</PageSectionTitle>
        </View>

        <View
          style={{
            ...surfaceCardStyle,
            padding: '14rpx',
            borderRadius: '24rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'
          }}
        >
          <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10rpx' }}>
            {visibleEnvironmentCards.map((item) => (
              <View
                key={item.label}
                style={{
                  width: '48.5%',
                  height: '188rpx',
                  borderRadius: '20rpx',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Image
                  src={resolveMediaUrl({
                    url: item.imageUrl,
                    seed: item.imageSeed || item.seed,
                    fallbackSize: '400/320'
                  })}
                  mode="aspectFill"
                  style={{ width: '100%', height: '100%' }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '16rpx 18rpx',
                    background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.78) 100%)'
                  }}
                >
                  <Text style={{ color: '#ffffff', fontSize: ui.type.note, fontWeight: 700 }}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
