import { Image, Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  chip: '护理 / 助产 / 医护背景同学',
  title: '想冲江苏专转本？',
  highlightTitle: '先判断方向，再安排课程',
  desc: '第一次来先看方向和课程安排，已经开始备考就直接去题库练习，再把错题和签到沉淀到自己的学习档案里。',
  tags: ['92.3% 上岸率', '1:8 小班跟进', '独立校区学习'],
  primaryButton: {
    text: '了解课程安排',
    url: '/pages/courses/index',
    openType: 'switchTab'
  },
  secondaryNote: '先选方向，再做训练'
};
const overviewStatsPresentationFallback = [
  { value: '92.3%', label: '上岸率', note: '2025届实际数据' },
  { value: '1:8', label: '师生比', note: '小班精细化' },
  { value: '365天', label: '全年答疑', note: '全职坐班' }
];
const advantagesPresentationFallback = defaultHomePage.advantages || [];
const ctaPresentationFallback = defaultHomePage.cta || {};
const environmentSectionPresentationFallback = defaultHomePage.environmentSection || { cards: [] };

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

function normalizeHomeQuickLinks(quickLinks) {
  if (!Array.isArray(quickLinks) || !quickLinks.length) {
    return HOME_PORTAL_LINKS;
  }

  const normalizedLinks = quickLinks.slice(0, 4).map((item, index) => ({
    ...HOME_PORTAL_LINKS[index],
    ...item
  }));
  const labels = normalizedLinks.map((item) => String(item?.label || '').trim());
  const joinedLabels = labels.join('|');
  const legacyLabelSets = [
    '机构介绍|每日一题|模拟题|错题本',
    '热门方向|每日一题|模拟题|错题本',
    '热门方向|每日一题|历年真题|错题本',
    '机构介绍|开设方向|师资团队|办学成果'
  ];
  const shouldResetToPortalDefault =
    normalizedLinks.length < 4 ||
    legacyLabelSets.includes(joinedLabels) ||
    labels.includes('热门方向') ||
    labels.includes('历年真题');

  if (shouldResetToPortalDefault) {
    return HOME_PORTAL_LINKS;
  }

  return normalizedLinks;
}

function normalizeHomeAdvantages(advantages) {
  if (!Array.isArray(advantages) || !advantages.length) {
    return advantagesPresentationFallback;
  }

  const legacyAdvantageTitles = ['全职教研团队', '独立校区管理', '精细化教研', '督学管理'];
  const hasLegacyAdvantage = advantages.some((item) => legacyAdvantageTitles.includes(item?.title || ''));

  if (hasLegacyAdvantage) {
    return advantagesPresentationFallback;
  }

  if (advantages.length >= 4) {
    return advantages;
  }

  const existingTitles = new Set(
    advantages
      .map((item) => String(item?.title || '').trim())
      .filter(Boolean)
  );

  const merged = [...advantages];
  advantagesPresentationFallback.forEach((item) => {
    const title = String(item?.title || '').trim();
    if (merged.length >= 4 || !title || existingTitles.has(title)) {
      return;
    }
    existingTitles.add(title);
    merged.push(item);
  });

  return merged;
}

function normalizeHomeCta(cta) {
  if (!cta) {
    return ctaPresentationFallback;
  }

  const isLegacyCta =
    !cta.desc ||
    cta.buttonText === '查看上岸学员案例' ||
    cta.title === '还在纠结如何开始备考？';

  return isLegacyCta
    ? {
        ...cta,
        ...ctaPresentationFallback
      }
    : cta;
}

function normalizeEnvironmentSection(section) {
  if (!section || !Array.isArray(section.cards) || !section.cards.length) {
    return environmentSectionPresentationFallback;
  }

  return {
    ...section,
    cards: section.cards.slice(0, 2).map((item, index) => ({
      ...environmentSectionPresentationFallback.cards?.[index],
      ...item
    }))
  };
}

function normalizeHomePagePresentation(page) {
  if (!page) return defaultHomePage;

  return {
    ...page,
    hero: normalizeHomeHero(page.hero),
    overviewStats: normalizeOverviewStats(page.overviewStats),
    quickLinks: normalizeHomeQuickLinks(page.quickLinks),
    advantages: normalizeHomeAdvantages(page.advantages),
    environmentSection: normalizeEnvironmentSection(page.environmentSection),
    cta: normalizeHomeCta(page.cta)
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

function getDirectionTone(index) {
  const tones = [
    {
      tagColor: '#0f4c81',
      tagBackground: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(219,234,254,0.86) 100%)',
      headerBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(240,249,255,0.76) 100%)',
      iconColor: '#0284c7',
      buttonBackground: 'linear-gradient(90deg, #3b82c4 0%, #60a5d8 100%)',
      buttonTextColor: '#ffffff',
      glowColor: 'rgba(14,165,233,0.10)',
      cardBackground: 'linear-gradient(145deg, #fefeff 0%, #f4f9fd 26%, #e6f1f9 68%, #d7e8f5 100%)',
      cardBorder: 'rgba(148, 186, 214, 0.56)',
      cardShadow: '0 34rpx 64rpx rgba(148,163,184,0.28), 0 14rpx 28rpx rgba(148,163,184,0.16), inset 0 1rpx 0 rgba(255,255,255,0.96)',
      sideStripe: 'linear-gradient(180deg, #c2e2f4 0%, #8dc3e5 32%, #669fcd 72%, #4b7ba9 100%)',
      topGlow: 'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.96) 0%, rgba(226,238,248,0.60) 42%, rgba(96,165,216,0.08) 100%)',
      bottomGlow: 'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.88) 0%, rgba(205,224,240,0.40) 45%, rgba(96,165,216,0.06) 100%)',
      edgeHighlight: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.10) 100%)',
      surfaceGlow: 'linear-gradient(120deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.10) 46%, rgba(255,255,255,0.00) 100%)',
      panelBackground: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(244,249,253,0.80) 100%)',
      panelBorder: 'rgba(210,224,236,0.96)',
      panelShadow: '0 18rpx 34rpx rgba(148,163,184,0.12), inset 0 1rpx 0 rgba(255,255,255,0.94)',
      numberBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(236,244,249,0.84) 100%)',
      numberBorder: 'rgba(205,223,237,0.96)',
      numberShadow: '0 16rpx 28rpx rgba(148,163,184,0.16), inset 0 1rpx 0 rgba(255,255,255,0.98)',
      numberColor: '#0369a1',
      featureDot: '#5f95be',
      chipBackground: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(244,249,253,0.82) 100%)',
      chipBorder: 'rgba(210,224,236,0.92)',
      chipShadow: '0 12rpx 22rpx rgba(148,163,184,0.10)',
      buttonShadow: '0 18rpx 32rpx rgba(96,132,160,0.24)',
      buttonBorder: 'rgba(255,255,255,0.34)',
      descriptionTitle: '#075985'
    },
    {
      tagColor: '#1d4ed8',
      tagBackground: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(224,231,255,0.88) 100%)',
      headerBackground: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(238,242,255,0.78) 100%)',
      iconColor: '#2563eb',
      buttonBackground: 'linear-gradient(90deg, #5d7ec7 0%, #7f8ed9 100%)',
      buttonTextColor: '#ffffff',
      glowColor: 'rgba(37,99,235,0.08)',
      cardBackground: 'linear-gradient(145deg, #fffefe 0%, #f7f7fd 26%, #ebedfa 66%, #dfe3f3 100%)',
      cardBorder: 'rgba(180, 189, 225, 0.54)',
      cardShadow: '0 34rpx 64rpx rgba(148,163,184,0.26), 0 14rpx 28rpx rgba(148,163,184,0.14), inset 0 1rpx 0 rgba(255,255,255,0.96)',
      sideStripe: 'linear-gradient(180deg, #d7def8 0%, #aebce9 34%, #7f94cf 72%, #6377b6 100%)',
      topGlow: 'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.96) 0%, rgba(231,233,247,0.62) 44%, rgba(129,140,248,0.08) 100%)',
      bottomGlow: 'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.88) 0%, rgba(219,223,241,0.38) 45%, rgba(129,140,248,0.06) 100%)',
      edgeHighlight: 'linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.10) 100%)',
      surfaceGlow: 'linear-gradient(120deg, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.10) 48%, rgba(255,255,255,0.00) 100%)',
      panelBackground: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(246,247,252,0.82) 100%)',
      panelBorder: 'rgba(222,226,241,0.96)',
      panelShadow: '0 18rpx 34rpx rgba(148,163,184,0.12), inset 0 1rpx 0 rgba(255,255,255,0.94)',
      numberBackground: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(239,241,249,0.86) 100%)',
      numberBorder: 'rgba(221,225,240,0.96)',
      numberShadow: '0 14rpx 26rpx rgba(148,163,184,0.16), inset 0 1rpx 0 rgba(255,255,255,0.98)',
      numberColor: '#1d4ed8',
      featureDot: '#7b8eca',
      chipBackground: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(246,247,252,0.84) 100%)',
      chipBorder: 'rgba(222,226,241,0.92)',
      chipShadow: '0 12rpx 22rpx rgba(148,163,184,0.10)',
      buttonShadow: '0 18rpx 32rpx rgba(109,119,161,0.22)',
      buttonBorder: 'rgba(255,255,255,0.34)',
      descriptionTitle: '#1d4ed8'
    }
  ];

  return tones[index % tones.length];
}

function getQuickLinkTone(icon, index) {
  const toneMap = {
    compass: { accent: '#0f4c81', background: '#dbeafe' },
    daily: { accent: '#0f766e', background: '#ecfeff' },
    paper: { accent: '#1d4ed8', background: '#e0e7ff' },
    wrongbook: { accent: '#0369a1', background: '#e0f2fe' },
    building: { accent: '#0f4c81', background: '#dbeafe' },
    team: { accent: '#1d4ed8', background: '#e0e7ff' },
    trophy: { accent: '#0369a1', background: '#e0f2fe' }
  };

  return (
    toneMap[icon] ||
    [toneMap.compass, toneMap.daily, toneMap.paper, toneMap.wrongbook][index] ||
    toneMap.compass
  );
}

const HOME_PORTAL_LINKS = [
  { label: '方向判断', desc: '先看适合哪条线', url: '/pages/courses/index', openType: 'switchTab', icon: 'compass' },
  { label: '题库练习', desc: '去做每日一题', url: '/pages/study/index', openType: 'switchTab', icon: 'daily' },
  { label: '教材资料', desc: '看阶段资料安排', url: '/pages/materials/index', openType: 'navigate', icon: 'paper' },
  { label: '我的学习', desc: '查看错题和签到', url: '/pages/mine/index', openType: 'switchTab', icon: 'team' }
];

function mapHomeDirections(page, allDirections) {
  const featuredIds = page?.featuredDirectionIds || [];
  const source = featuredIds.length
    ? featuredIds
        .map((id) => (allDirections || []).find((item) => item._id === id))
        .filter(Boolean)
    : (allDirections || []).filter((item) => item.isFeatured);

  return source.map((item, index) => ({
    ...getDirectionTone(index),
    title: item.name,
    tag: item.homeTag || item.featuredTag || '',
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
  const site = content.site || fallbackContent.site;
  const hero = normalizedPage.hero || defaultHomePage.hero;
  const heroImageUrl = hero.backgroundImageUrl || '';
  const heroHasImage = Boolean(heroImageUrl);
  const stats = (normalizedPage.overviewStats || defaultHomePage.overviewStats).slice(0, 3);
  const advantages = (normalizedPage.advantages || defaultHomePage.advantages).slice(0, 4);
  const environmentCards = normalizedPage.environmentSection?.cards || defaultHomePage.environmentSection.cards;
  const cta = normalizedPage.cta || defaultHomePage.cta;
  const heroDesc = compactText(hero.desc, 46);
  const heroTags = (hero.tags || []).slice(0, 3);
  const featuredAdvantages = advantages;
  const visibleEnvironmentCards = environmentCards.slice(0, 2);
  const quickLinksSource = (normalizedPage.quickLinks || []).slice(0, 4);
  const portalQuickLinks = (quickLinksSource.length ? quickLinksSource : HOME_PORTAL_LINKS).map((item, index) => ({
    ...item,
    ...getQuickLinkTone(item.icon, index)
  }));
  const homeTone = {
    accent: '#0ea5e9',
    accentStrong: '#0f4c81',
    accentLine: '#38bdf8',
    accentSoft: '#e0f2fe',
    accentSurface: '#f8fbff',
    accentBorder: 'rgba(14,165,233,0.14)',
    accentShadow: 'rgba(14,165,233,0.14)',
    titleSubtle: '#475569',
    note: '#64748b'
  };

  return (
    <View style={pageStyle}>
      <View
        style={{
          margin: '24rpx 24rpx 0'
        }}
      >
        <View
          style={{
            ...surfaceCardStyle,
            overflow: 'hidden',
            borderRadius: '32rpx',
            padding: '30rpx 24rpx 32rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f4fbff 100%)',
            border: `1rpx solid ${homeTone.accentBorder}`,
            boxShadow: '0 18rpx 34rpx rgba(148,163,184,0.08)',
            position: 'relative'
          }}
        >
          {heroHasImage ? (
            <View
              style={{
                position: 'relative',
                margin: '-30rpx -24rpx 28rpx',
                padding: '26rpx 22rpx 18rpx',
                height: '432rpx',
                overflow: 'hidden',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,249,255,0.86) 42%, rgba(232,244,253,0.72) 100%)'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at 50% 10%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.72) 32%, rgba(255,255,255,0) 72%)'
                }}
              />
              <Image
                src={resolveMediaUrl({
                  url: heroImageUrl,
                  fallbackSize: '1200/760'
                })}
                mode="aspectFit"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  transform: 'scale(1.02)'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 48%, rgba(255,255,255,0.18) 76%, rgba(244,250,255,0.94) 100%)'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '42rpx',
                  background:
                    'linear-gradient(90deg, rgba(244,250,255,0.98) 0%, rgba(244,250,255,0.56) 52%, rgba(244,250,255,0.00) 100%)'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '42rpx',
                  background:
                    'linear-gradient(270deg, rgba(244,250,255,0.98) 0%, rgba(244,250,255,0.56) 52%, rgba(244,250,255,0.00) 100%)'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '24rpx',
                  right: '24rpx',
                  bottom: '18rpx',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    padding: '10rpx 18rpx',
                    borderRadius: '999rpx',
                    backgroundColor: 'rgba(255,255,255,0.84)',
                    boxShadow: '0 8rpx 16rpx rgba(15,76,129,0.08)'
                  }}
                >
                  <Text
                    style={{
                      fontSize: ui.type.note,
                      color: '#0f4c81',
                      fontWeight: 700
                    }}
                  >
                    校区实景与学习氛围
                  </Text>
                </View>
                <View
                  style={{
                    width: '76rpx',
                    height: '76rpx',
                    borderRadius: '38rpx',
                    backgroundColor: 'rgba(255,255,255,0.24)',
                    border: '1rpx solid rgba(255,255,255,0.42)',
                    boxSizing: 'border-box'
                  }}
                />
              </View>
            </View>
          ) : null}
          <Text
            style={{
              position: 'relative',
              display: 'inline-block',
              padding: '8rpx 18rpx',
              borderRadius: '999rpx',
              fontSize: ui.type.note,
              color: homeTone.accentStrong,
              fontWeight: 700,
              backgroundColor: '#e0f2fe',
              marginBottom: '20rpx'
            }}
          >
            {hero.chip}
          </Text>

          <View style={{ position: 'relative', marginBottom: '18rpx' }}>
            <Text
              style={{
                display: 'block',
                fontSize: '52rpx',
                lineHeight: 1.14,
                color: '#0f172a',
                fontWeight: 900,
                letterSpacing: '-1rpx'
              }}
            >
              {hero.title}
            </Text>
            <Text
              style={{
                display: 'block',
                fontSize: '38rpx',
                lineHeight: 1.26,
                color: homeTone.accentStrong,
                fontWeight: 800,
                letterSpacing: '-1rpx',
                marginTop: '8rpx'
              }}
            >
              {hero.highlightTitle}
            </Text>
          </View>

          <Text
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              maxWidth: '100%',
              fontSize: ui.type.meta,
              lineHeight: 1.8,
              color: homeTone.titleSubtle,
              marginBottom: '24rpx'
            }}
          >
            {heroDesc}
          </Text>

          <View style={{ position: 'relative', display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20rpx' }}>
            <Navigator
              url={hero.primaryButton?.url || '/pages/courses/index'}
              openType={hero.primaryButton?.openType || 'switchTab'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '240rpx',
                height: '80rpx',
                padding: '0 30rpx',
                borderRadius: '24rpx',
                background: 'linear-gradient(90deg, #0284c7 0%, #0ea5e9 100%)',
                boxShadow: '0 12rpx 24rpx rgba(14,165,233,0.18)',
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
                {hero.primaryButton?.text || '了解课程安排'}
              </Text>
            </Navigator>
          </View>

          <View style={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
            {heroTags.map((item, index) => (
              <View
                key={item}
                style={{
                  marginRight: index === heroTags.length - 1 ? '0' : '12rpx',
                  marginBottom: '10rpx',
                  padding: '9rpx 16rpx',
                  borderRadius: '999rpx',
                  backgroundColor: '#f0f9ff',
                  border: `1rpx solid ${homeTone.accentBorder}`
                }}
              >
                <Text
                  style={{
                    fontSize: ui.type.note,
                    color: homeTone.accentStrong,
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

      <View style={{ margin: '22rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: '24rpx',
            padding: '18rpx 14rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
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
                    fontSize: '38rpx',
                    color: index === 0 ? homeTone.accentStrong : ui.colors.text,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: '8rpx'
                  }}
                >
                  {item.value}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: ui.type.note,
                    color: ui.colors.textMuted,
                    fontWeight: 700
                  }}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <PageSectionTitle lineColor={homeTone.accentLine}>先从这里开始</PageSectionTitle>
        <Text
          style={{
            display: 'block',
            margin: '-2rpx 4rpx 18rpx',
            fontSize: ui.type.note,
            color: homeTone.note,
            lineHeight: 1.7
          }}
        >
          把首页最常用的四个动作先收在这里，进入后能更快知道下一步先点哪里。
        </Text>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {portalQuickLinks.map((item, index) => (
            <Navigator
              key={item.url}
              url={item.url}
              openType={item.openType || 'navigate'}
              hoverClass="none"
              style={{
                width: '48.4%',
                display: 'block',
                marginBottom: index > 1 ? '0' : '16rpx'
              }}
            >
              <View
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
                  borderRadius: '24rpx',
                  padding: '22rpx 18rpx 20rpx',
                  boxShadow: '0 10rpx 18rpx rgba(148,163,184,0.05)',
                  border: `1rpx solid ${homeTone.accentBorder}`,
                  minHeight: '188rpx',
                  boxSizing: 'border-box'
                }}
              >
                <QuickIcon type={item.icon} color={item.accent} background={item.background} />
                <Text
                  style={{
                    display: 'block',
                    fontSize: ui.type.body,
                    color: '#0f172a',
                    fontWeight: 800,
                    textAlign: 'center'
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    display: 'block',
                    marginTop: '10rpx',
                    fontSize: ui.type.note,
                    color: ui.colors.textMuted,
                    lineHeight: 1.6,
                    textAlign: 'center'
                  }}
                >
                  {item.desc}
                </Text>
              </View>
            </Navigator>
          ))}
        </View>
      </View>

      <View style={{ margin: '40rpx 20rpx 0' }}>
        <PageSectionTitle lineColor={homeTone.accentLine}>先判断方向</PageSectionTitle>
        <Text
          style={{
            display: 'block',
            margin: '-2rpx 4rpx 18rpx',
            fontSize: ui.type.note,
            color: homeTone.note,
            lineHeight: 1.7
          }}
        >
          首页先把最常见的两条备考线放在这里，先看自己更接近哪一条，再决定课程和练题节奏。
        </Text>
        {directions.map((item, index) => (
          <Navigator
            key={item.title}
            url="/pages/courses/index"
            openType="switchTab"
            style={{ display: 'block', marginBottom: index === directions.length - 1 ? '0' : '20rpx' }}
          >
            <View
              style={{
                background: item.cardBackground,
                borderRadius: '30rpx',
                padding: '28rpx 24rpx 24rpx',
                minHeight: '324rpx',
                boxShadow: item.cardShadow,
                border: `1rpx solid ${item.cardBorder}`,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '26rpx',
                  bottom: '26rpx',
                  width: '10rpx',
                  borderRadius: '0 999rpx 999rpx 0',
                  background: item.sideStripe,
                  boxShadow: index === 0 ? '0 0 18rpx rgba(14,165,233,0.32)' : '0 0 18rpx rgba(99,102,241,0.22)'
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '24rpx',
                  right: '24rpx',
                  top: '0',
                  height: '72rpx',
                  background: item.surfaceGlow,
                  opacity: 0.95
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '20rpx',
                  top: '18rpx',
                  width: '2rpx',
                  bottom: '18rpx',
                  background: item.edgeHighlight,
                  opacity: 0.95
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: '-34rpx',
                  top: '-26rpx',
                  width: '180rpx',
                  height: '180rpx',
                  borderRadius: '999rpx',
                  background: item.topGlow
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  right: '-22rpx',
                  bottom: '-42rpx',
                  width: '220rpx',
                  height: '140rpx',
                  borderRadius: '999rpx',
                  background: item.bottomGlow
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '30rpx',
                  bottom: '18rpx',
                  width: '180rpx',
                  height: '24rpx',
                  borderRadius: '999rpx',
                  background: index === 0 ? 'rgba(14,165,233,0.12)' : 'rgba(99,102,241,0.10)',
                  boxShadow: index === 0 ? '0 0 18rpx rgba(14,165,233,0.18)' : '0 0 18rpx rgba(99,102,241,0.16)'
                }}
              />
              <View>
                <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <View style={{ flex: 1, paddingRight: '18rpx' }}>
                    {item.tag ? (
                      <View style={{ display: 'flex', alignItems: 'center', marginBottom: '14rpx' }}>
                        <View
                          style={{
                            padding: '8rpx 14rpx',
                            borderRadius: '999rpx',
                            background: 'rgba(255,255,255,0.34)'
                          }}
                        >
                          <Text style={{ fontSize: ui.type.note, color: item.tagColor, fontWeight: 800 }}>
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    <View
                      style={{
                        background: 'rgba(255,255,255,0.26)',
                        borderRadius: '24rpx',
                        padding: '16rpx 16rpx',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <View style={{ display: 'flex', alignItems: 'center' }}>
                        <View style={{ marginRight: '16rpx', flexShrink: 0 }}>
                          <DirectionIcon type={item.iconType} color={item.iconColor} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ display: 'block', fontSize: '34rpx', color: '#0f172a', fontWeight: 900 }}>{item.title}</Text>
                          <Text
                            style={{
                              display: 'block',
                              marginTop: '8rpx',
                              fontSize: ui.type.meta,
                              color: homeTone.titleSubtle,
                              lineHeight: 1.65
                            }}
                          >
                            {compactText(item.audience || item.desc || '', 52)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      minWidth: '88rpx',
                      padding: '12rpx 0 10rpx',
                      borderRadius: '22rpx',
                      background: 'rgba(255,255,255,0.24)',
                      textAlign: 'center',
                      opacity: 0.9
                    }}
                  >
                    <Text style={{ display: 'block', fontSize: '20rpx', color: homeTone.note, fontWeight: 700, textAlign: 'center' }}>热门</Text>
                    <Text style={{ display: 'block', marginTop: '4rpx', fontSize: '36rpx', color: item.numberColor, fontWeight: 900, textAlign: 'center' }}>
                      0{index + 1}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: '18rpx',
                    borderRadius: '24rpx',
                    padding: '18rpx 18rpx',
                    background: 'rgba(255,255,255,0.22)',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <View
                    style={{
                      marginBottom: '12rpx',
                      paddingBottom: '12rpx'
                    }}
                  >
                    <Text style={{ display: 'block', fontSize: ui.type.note, color: item.descriptionTitle, fontWeight: 800 }}>适合先从哪里下手</Text>
                    <Text
                      style={{
                        display: 'block',
                        marginTop: '8rpx',
                        fontSize: ui.type.meta,
                        color: '#334155',
                        lineHeight: 1.72
                      }}
                    >
                      {compactText(item.desc || item.audience || '', 54)}
                    </Text>
                  </View>
                  {(item.features || []).slice(0, 2).map((feature) => (
                    <View key={feature} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '10rpx' }}>
                      <View
                        style={{
                          width: '10rpx',
                          height: '10rpx',
                          borderRadius: '999rpx',
                          backgroundColor: item.featureDot,
                          marginTop: '12rpx',
                          marginRight: '12rpx',
                          flexShrink: 0,
                          opacity: 0.72
                        }}
                      />
                      <Text
                        style={{
                          flex: 1,
                          fontSize: ui.type.note,
                          color: '#475569',
                          lineHeight: 1.7
                        }}
                      >
                        {compactText(feature, 28)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View
                style={{
                  marginTop: '18rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {item.chips?.length ? (
                  <View
                    style={{
                      flex: 1,
                      marginRight: '16rpx',
                      padding: '10rpx 14rpx',
                      borderRadius: '999rpx',
                      background: 'rgba(255,255,255,0.24)'
                    }}
                  >
                    <Text style={{ fontSize: ui.type.note, color: '#334155', fontWeight: 700 }}>
                      {compactText(item.chips[0], 16)}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      marginRight: '16rpx',
                      padding: '10rpx 14rpx',
                      borderRadius: '999rpx',
                      background: 'rgba(255,255,255,0.24)'
                    }}
                  >
                    <Text style={{ fontSize: ui.type.note, color: homeTone.note, fontWeight: 700 }}>
                      {getDirectionMiniLabel(item)}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    minWidth: '184rpx',
                    height: '64rpx',
                    padding: '0 22rpx',
                    borderRadius: '999rpx',
                    background: item.buttonBackground,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: item.buttonShadow,
                    border: `1rpx solid ${item.buttonBorder}`
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: item.buttonTextColor, fontWeight: 800 }}>
                    去看课程安排
                  </Text>
                </View>
              </View>
            </View>
          </Navigator>
        ))}

      </View>

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <View
          style={{
            borderRadius: '30rpx',
            padding: '28rpx 24rpx 26rpx',
            background: 'linear-gradient(135deg, #0f4c81 0%, #0284c7 100%)',
            boxShadow: '0 20rpx 36rpx rgba(14,165,233,0.20)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: '-44rpx',
              top: '-42rpx',
              width: '210rpx',
              height: '210rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(125,211,252,0.18)'
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '-30rpx',
              bottom: '-68rpx',
              width: '180rpx',
              height: '180rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.06)'
            }}
          />
          <View style={{ position: 'relative', zIndex: 2 }}>
            <View
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10rpx 16rpx',
                borderRadius: '999rpx',
                backgroundColor: 'rgba(255,255,255,0.18)',
                marginBottom: '18rpx'
              }}
            >
              <Text style={{ fontSize: ui.type.note, color: '#e0f2fe', fontWeight: 800 }}>先沟通，再决定怎么学</Text>
            </View>
            <Text
              style={{
                display: 'block',
                fontSize: ui.type.section,
                color: '#ffffff',
                fontWeight: 900
              }}
            >
              {cta.title}
            </Text>
            <Text
              style={{
                display: 'block',
                marginTop: '14rpx',
                fontSize: ui.type.note,
                lineHeight: 1.78,
                color: 'rgba(255,255,255,0.86)'
              }}
            >
              {compactText(cta.desc || '', 72)}
            </Text>
            <View
              style={{
                marginTop: '20rpx',
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {site.address ? (
                <View
                  style={{
                    marginRight: '12rpx',
                    marginBottom: '12rpx',
                    padding: '10rpx 14rpx',
                    borderRadius: '999rpx',
                    backgroundColor: 'rgba(255,255,255,0.14)',
                    border: '1rpx solid rgba(255,255,255,0.16)'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 700 }}>
                    {compactText(site.address, 16)}
                  </Text>
                </View>
              ) : null}
              {site.serviceHours ? (
                <View
                  style={{
                    marginBottom: '12rpx',
                    padding: '10rpx 14rpx',
                    borderRadius: '999rpx',
                    backgroundColor: 'rgba(255,255,255,0.14)',
                    border: '1rpx solid rgba(255,255,255,0.16)'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 700 }}>
                    咨询时间 {site.serviceHours}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: '6rpx' }}>
              <Navigator
                url="/pages/courses/index"
                openType="switchTab"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '220rpx',
                  height: '78rpx',
                  padding: '0 28rpx',
                  borderRadius: '999rpx',
                  background: 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)',
                  boxShadow: '0 12rpx 24rpx rgba(15,23,42,0.16)',
                  marginRight: '14rpx',
                  marginBottom: '10rpx'
                }}
              >
                <Text style={{ fontSize: ui.type.button, color: '#0f4c81', fontWeight: 800 }}>
                  {cta.buttonText}
                </Text>
              </Navigator>
              <Navigator
                url="/pages/study/index"
                openType="switchTab"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '196rpx',
                  height: '78rpx',
                  padding: '0 28rpx',
                  borderRadius: '999rpx',
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  border: '1rpx solid rgba(255,255,255,0.18)',
                  marginBottom: '10rpx'
                }}
              >
                <Text style={{ fontSize: ui.type.button, color: '#ffffff', fontWeight: 800 }}>
                  直接去练题
                </Text>
              </Navigator>
            </View>
          </View>
        </View>
      </View>

      <View style={{ margin: '36rpx 24rpx 0' }}>
        <PageSectionTitle lineColor={homeTone.accentLine}>学习支持</PageSectionTitle>
        <Text
          style={{
            display: 'block',
            margin: '-2rpx 2rpx 18rpx',
            fontSize: ui.type.note,
            color: homeTone.note,
            lineHeight: 1.7
          }}
        >
          这部分保留给第一次了解的同学快速判断，不需要每项都细看，只要先知道有人能帮你判断方向、盯住节奏就够了。
        </Text>
        <View>
          {featuredAdvantages.map((item, index) => {
            const isCompactAssessment = /学情评估/.test(String(item?.title || ''));

            return (
            <View
              key={item.title}
              style={{
                marginBottom: index === featuredAdvantages.length - 1 ? '0' : '16rpx',
                padding: isCompactAssessment ? '18rpx 18rpx 16rpx' : '22rpx 20rpx 20rpx',
                borderRadius: isCompactAssessment ? '22rpx' : '24rpx',
                background: isCompactAssessment
                  ? 'linear-gradient(145deg, #ffffff 0%, #fdfcff 24%, #f8fbff 58%, #f4f9ff 100%)'
                  : 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
                boxShadow: isCompactAssessment
                  ? '0 16rpx 28rpx rgba(148,163,184,0.08), 0 4rpx 10rpx rgba(255,255,255,0.72) inset'
                  : '0 16rpx 28rpx rgba(148,163,184,0.08)',
                border: isCompactAssessment ? '1rpx solid rgba(219,234,254,0.92)' : `1rpx solid ${homeTone.accentBorder}`,
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  right: '-26rpx',
                  top: '-30rpx',
                  width: '128rpx',
                  height: '128rpx',
                  borderRadius: '999rpx',
                  backgroundColor: isCompactAssessment
                    ? 'rgba(191,219,254,0.34)'
                    : index === 0
                      ? 'rgba(125,211,252,0.18)'
                      : 'rgba(191,219,254,0.24)'
                }}
              />
              {isCompactAssessment ? (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      left: '-22rpx',
                      bottom: '-28rpx',
                      width: '144rpx',
                      height: '144rpx',
                      borderRadius: '999rpx',
                      background: 'radial-gradient(circle at 50% 50%, rgba(253,224,71,0.26) 0%, rgba(255,255,255,0) 72%)'
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: '26rpx',
                      bottom: '18rpx',
                      width: '92rpx',
                      height: '36rpx',
                      borderRadius: '999rpx',
                      border: '1rpx dashed rgba(14,165,233,0.22)',
                      opacity: 0.8
                    }}
                  />
                </>
              ) : null}
              <View style={{ position: 'relative', zIndex: 2 }}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ display: 'flex', alignItems: 'center', flex: 1, paddingRight: '16rpx' }}>
                    <View
                      style={{
                        width: isCompactAssessment ? '48rpx' : '54rpx',
                        height: isCompactAssessment ? '48rpx' : '54rpx',
                        borderRadius: isCompactAssessment ? '16rpx' : '18rpx',
                        background: isCompactAssessment
                          ? 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(240,249,255,0.92) 100%)'
                          : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '14rpx',
                        boxShadow: isCompactAssessment
                          ? '0 10rpx 20rpx rgba(96,165,250,0.12)'
                          : '0 10rpx 20rpx rgba(148,163,184,0.10)'
                      }}
                    >
                      <AdvantageIcon type={item.icon} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          display: 'block',
                          fontSize: isCompactAssessment ? ui.type.note : ui.type.body,
                          color: ui.colors.text,
                          fontWeight: 800
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          display: 'block',
                          marginTop: '8rpx',
                          fontSize: ui.type.note,
                          color: '#475569',
                          lineHeight: 1.7
                        }}
                      >
                        {compactText(item.desc || '', isCompactAssessment ? 40 : 46)}
                      </Text>
                    </View>
                  </View>
                  {isCompactAssessment ? (
                    <View
                      style={{
                        minWidth: '104rpx',
                        padding: '10rpx 14rpx',
                        borderRadius: '999rpx',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(240,249,255,0.88) 100%)',
                        border: '1rpx solid rgba(191,219,254,0.88)',
                        boxShadow: '0 10rpx 18rpx rgba(125,211,252,0.10)',
                        textAlign: 'center'
                      }}
                    >
                      <Text style={{ display: 'block', fontSize: '18rpx', color: homeTone.accentStrong, fontWeight: 800, textAlign: 'center' }}>
                        新同学先看
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        minWidth: '78rpx',
                        padding: '10rpx 0',
                        borderRadius: '18rpx',
                        backgroundColor: 'rgba(255,255,255,0.72)',
                        border: `1rpx solid ${homeTone.accentBorder}`,
                        textAlign: 'center'
                      }}
                    >
                      <Text style={{ display: 'block', fontSize: '18rpx', color: homeTone.note, fontWeight: 700, textAlign: 'center' }}>支持</Text>
                      <Text style={{ display: 'block', marginTop: '4rpx', fontSize: '30rpx', color: homeTone.accentStrong, fontWeight: 900, textAlign: 'center' }}>
                        0{index + 1}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )})}
        </View>
      </View>

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <View style={{ marginBottom: '14rpx' }}>
          <PageSectionTitle marginBottom="0" lineColor={homeTone.accentLine}>校区环境</PageSectionTitle>
        </View>
        <Text
          style={{
            display: 'block',
            margin: '-2rpx 2rpx 16rpx',
            fontSize: ui.type.note,
            color: homeTone.note,
            lineHeight: 1.7
          }}
        >
          {site.address ? `${compactText(site.address, 18)}校区环境，支持先了解学习与住宿安排。` : '先确认环境是否适合自己，再决定是否继续深入了解。'}
        </Text>

        <View
          style={{
            ...surfaceCardStyle,
            padding: '14rpx',
            borderRadius: '24rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)'
          }}
        >
          <View>
            {visibleEnvironmentCards.map((item, index) => (
              <View
                key={item.label}
                style={{
                  width: '100%',
                  height: '268rpx',
                  borderRadius: '20rpx',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: index === visibleEnvironmentCards.length - 1 ? '0' : '14rpx',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                }}
              >
                {item.imageUrl ? (
                  <Image
                    src={resolveMediaUrl({
                      url: item.imageUrl,
                      fallbackSize: '800/520'
                    })}
                    mode="aspectFill"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ fontSize: ui.type.meta, color: homeTone.accentStrong, fontWeight: 700 }}>环境示意</Text>
                  </View>
                )}
                <View
                  style={{
                    position: 'absolute',
                    top: '16rpx',
                    left: '16rpx',
                    padding: '6rpx 12rpx',
                    borderRadius: '999rpx',
                    backgroundColor: item.imageUrl ? 'rgba(255,255,255,0.88)' : 'rgba(15,76,129,0.10)'
                  }}
                >
                  <Text
                    style={{
                      fontSize: ui.type.note,
                      color: item.imageUrl ? '#0f172a' : homeTone.accentStrong,
                      fontWeight: 700
                    }}
                  >
                    {item.imageUrl ? '实拍环境' : '环境示意'}
                  </Text>
                </View>
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
                  <Text
                    style={{
                      display: 'block',
                      marginTop: '8rpx',
                      color: 'rgba(255,255,255,0.82)',
                      fontSize: ui.type.meta
                    }}
                  >
                    {site.address ? `${compactText(site.address, 16)} · 支持到校了解` : '学习与住宿环境一体了解'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
