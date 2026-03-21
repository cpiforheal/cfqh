import { Image, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageCtaCard from '../../components/PageCtaCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { elevatedSurfaceCardStyle, pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
import { resolveMediaUrl } from '../../utils/media';

const defaultSuccessPage = fallbackContent.pages.success;
const defaultSuccessCases = fallbackContent.successCases;

function getInitialSuccessState() {
  return {
    site: fallbackContent.site,
    page: defaultSuccessPage,
    successCases: defaultSuccessCases
  };
}

function ResultChip(props) {
  return (
    <View
      style={{
        marginRight: '12rpx',
        marginBottom: '12rpx',
        padding: '10rpx 18rpx',
        borderRadius: ui.radius.pill,
        background: props.background || 'rgba(255,255,255,0.78)',
        border: '1rpx solid rgba(255,255,255,0.78)'
      }}
    >
      <Text style={{ fontSize: ui.type.note, color: props.color || '#6f7f97', fontWeight: 700 }}>{props.children}</Text>
    </View>
  );
}

function ProofStatCard(props) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: ui.radius.md,
        padding: '24rpx 18rpx',
        background: 'rgba(255,255,255,0.82)',
        border: '1rpx solid rgba(255,255,255,0.88)',
        boxShadow: '0 18rpx 36rpx rgba(171,179,194,0.14)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: '#7b8597', fontWeight: 700, marginBottom: '8rpx' }}>
        {props.label}
      </Text>
      <Text style={{ display: 'block', fontSize: '38rpx', color: ui.colors.text, fontWeight: 900, marginBottom: '8rpx', lineHeight: 1.12 }}>
        {props.value}
      </Text>
      <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.6 }}>
        {props.note}
      </Text>
    </View>
  );
}

function StoryListCard(props) {
  return (
    <View
      style={{
        ...surfaceCardStyle,
        padding: '24rpx 22rpx',
        borderRadius: ui.radius.md,
        marginBottom: props.isLast ? '0' : '16rpx',
        boxShadow: '0 18rpx 34rpx rgba(148,163,184,0.10)'
      }}
    >
      <View style={{ display: 'flex', alignItems: 'flex-start' }}>
        <View
          style={{
            width: '106rpx',
            flexShrink: 0,
            paddingTop: '4rpx'
          }}
        >
          <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#bc8d46', fontWeight: 800, marginBottom: '8rpx' }}>
            {props.year || '历年'}
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.note, color: '#7a879a', lineHeight: 1.5 }}>
            {props.category}
          </Text>
        </View>
        <View
          style={{
            width: '12rpx',
            marginRight: '16rpx',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: '12rpx',
              height: '12rpx',
              borderRadius: ui.radius.pill,
              background: '#d9b56c',
              marginTop: '12rpx',
              boxShadow: '0 0 0 8rpx rgba(217,181,108,0.14)'
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, marginBottom: '8rpx' }}>
            {props.title}
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.76 }}>
            {props.subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function SuccessPage() {
  const [content, setContent] = useState(getInitialSuccessState());
  const [, setLoadState] = useState({ source: 'fallback', error: '', updatedAt: '', revision: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('success')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultSuccessPage,
          successCases: payload.successCases && payload.successCases.length ? payload.successCases : defaultSuccessCases
        });
        setLoadState({
          source: payload.__meta?.source || 'cloud',
          error: '',
          updatedAt: payload.__meta?.updatedAt || '',
          revision: payload.__meta?.revision || ''
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setLoadState({
          source: 'error',
          error: error && error.message ? error.message : '云端内容读取失败',
          updatedAt: '',
          revision: ''
        });
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

  const hero = content.page?.hero || defaultSuccessPage.hero;
  const stats = content.page?.stats || defaultSuccessPage.stats;
  const stories = content.successCases || defaultSuccessCases;
  const cta = content.page?.cta || defaultSuccessPage.cta;
  const featuredStory = stories[0];
  const secondaryStories = stories.slice(1);
  const storyTags = useMemo(
    () =>
      Array.from(new Set((stories || []).flatMap((item) => [item.category, item.year ? `${item.year} 备考季` : '']).filter(Boolean))).slice(0, 5),
    [stories]
  );

  return (
    <View
      style={{
        ...pageStyle,
        background: 'linear-gradient(180deg, #f6f7fb 0%, #eef4ff 38%, #fafafa 100%)'
      }}
    >
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: ui.radius.hero,
          borderBottomRightRadius: ui.radius.hero,
          padding: `34rpx ${ui.spacing.page} 92rpx`,
          background: 'linear-gradient(180deg, #eff4ff 0%, #edf4ff 48%, #f8f8fb 100%)'
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: '-60rpx',
            top: '-30rpx',
            width: '248rpx',
            height: '248rpx',
            borderRadius: ui.radius.pill,
            background: 'rgba(255,214,126,0.24)'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '-70rpx',
            bottom: '-90rpx',
            width: '260rpx',
            height: '260rpx',
            borderRadius: ui.radius.pill,
            background: 'rgba(191,211,255,0.30)'
          }}
        />

        <View style={{ position: 'relative', zIndex: 2 }}>
          <View
            style={{
              display: 'inline-flex',
              padding: '10rpx 18rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: 'rgba(255,255,255,0.76)',
              border: '1rpx solid rgba(255,255,255,0.88)',
              marginBottom: '22rpx'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: '#7d89a6', fontWeight: 700 }}>{hero.chip}</Text>
          </View>

          <Text style={{ display: 'block', fontSize: ui.type.hero, lineHeight: 1.14, color: ui.colors.text, fontWeight: 900, marginBottom: '14rpx' }}>
            {hero.title}
          </Text>
          <Text
            style={{
              display: 'block',
              width: '560rpx',
              maxWidth: '100%',
              fontSize: ui.type.body,
              lineHeight: 1.8,
              color: '#617087',
              marginBottom: '26rpx'
            }}
          >
            {hero.desc}
          </Text>

          <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '24rpx' }}>
            {storyTags.map((item, index) => (
              <ResultChip
                key={item}
                background={index === 0 ? 'rgba(255,245,224,0.86)' : 'rgba(255,255,255,0.74)'}
                color={index === 0 ? '#a06a1d' : '#74829a'}
              >
                {item}
              </ResultChip>
            ))}
          </View>

          <View style={{ display: 'flex', justifyContent: 'space-between' }}>
            {stats.map((item, index) => (
              <View key={item.label} style={{ width: '31.5%' }}>
                <ProofStatCard label={item.label} value={item.value} note={item.note} />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#d8ad63">代表上岸案例</PageSectionTitle>
        {featuredStory ? (
          <View
            style={{
              ...elevatedSurfaceCardStyle,
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
              borderRadius: '38rpx',
              boxShadow: '0 28rpx 44rpx rgba(168,175,191,0.16)'
            }}
          >
            <Image
              src={resolveMediaUrl({
                url: featuredStory.coverUrl,
                seed: featuredStory.coverSeed || featuredStory._id || featuredStory.title,
                fallbackSize: '420/520'
              })}
              mode="aspectFill"
              style={{
                width: '220rpx',
                minHeight: '100%',
                flexShrink: 0
              }}
            />
            <View style={{ flex: 1, padding: '30rpx 26rpx' }}>
              <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16rpx' }}>
                <ResultChip background="#fff7ea" color="#a06a1d">
                  {featuredStory.year || '最新'}
                </ResultChip>
                {featuredStory.category ? (
                  <ResultChip background="#eef4ff" color="#5874a8">
                    {featuredStory.category}
                  </ResultChip>
                ) : null}
              </View>
              <Text style={{ display: 'block', fontSize: '40rpx', color: ui.colors.text, fontWeight: 900, lineHeight: 1.22, marginBottom: '12rpx' }}>
                {featuredStory.title}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.82, marginBottom: '22rpx' }}>
                {featuredStory.subtitle}
              </Text>
              <View
                style={{
                  padding: '18rpx 18rpx',
                  borderRadius: ui.radius.md,
                  background: 'linear-gradient(135deg, #fffaf0 0%, #f7f9ff 100%)',
                  border: '1rpx solid rgba(228,233,242,0.82)'
                }}
              >
                <Text style={{ display: 'block', fontSize: ui.type.note, color: '#876530', fontWeight: 700, marginBottom: '8rpx' }}>
                  为什么先看这个案例
                </Text>
                <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#6a768a', lineHeight: 1.7 }}>
                  它更像成果页的“代表样本”，让你先看到方向、执行方式和结果之间的关系，再去决定是否继续了解。
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>

      {secondaryStories.length ? (
        <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
          <PageSectionTitle lineColor="#d8ad63">更多结果记录</PageSectionTitle>
          {secondaryStories.map((item, index) => (
            <StoryListCard key={item._id || item.title} {...item} isLast={index === secondaryStories.length - 1} />
          ))}
        </View>
      ) : null}

      <PageCtaCard
        title={cta.title}
        desc={cta.desc}
        buttonText={cta.buttonText}
        footnote={cta.footnote}
        background="linear-gradient(135deg, #273654 0%, #18253f 100%)"
        orbColor="rgba(255,212,120,0.16)"
      />
    </View>
  );
}
