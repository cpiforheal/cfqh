import { Image, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import CmsSyncBadge from '../../components/CmsSyncBadge';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
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

export default function SuccessPage() {
  const [content, setContent] = useState(getInitialSuccessState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '', updatedAt: '', revision: '' });

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

      <PageHero
        chip={hero.chip}
        title={hero.title}
        desc={hero.desc}
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

      <CmsSyncBadge source={loadState.source} updatedAt={loadState.updatedAt} revision={loadState.revision} />

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">上岸故事</PageSectionTitle>
        {stories.map((item, index) => (
          <View
            key={item._id || item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === stories.length - 1 ? '0' : ui.spacing.block,
              padding: '24rpx',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Image
              src={resolveMediaUrl({
                url: item.coverUrl,
                seed: item.coverSeed || item._id || item.title,
                fallbackSize: '200/200'
              })}
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
                  fontSize: ui.type.meta,
                  color: ui.colors.accent,
                  fontWeight: 700,
                  marginBottom: '6rpx'
                }}
              >
                {[item.year, item.category].filter(Boolean).join(' · ')}
              </Text>
              <Text
                style={{
                  display: 'block',
                  fontSize: ui.type.body,
                  color: ui.colors.textMuted,
                  lineHeight: 1.8
                }}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <PageCtaCard title={cta.title} desc={cta.desc} buttonText={cta.buttonText} footnote={cta.footnote} />
    </View>
  );
}
