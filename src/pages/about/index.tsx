import { Image, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import CmsSyncBadge from '../../components/CmsSyncBadge';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageIntroCard from '../../components/PageIntroCard';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';
import { resolveMediaUrl } from '../../utils/media';

const defaultAboutPage = fallbackContent.pages.about;

function getInitialAboutState() {
  return {
    site: fallbackContent.site,
    page: defaultAboutPage
  };
}

export default function AboutPage() {
  const [content, setContent] = useState(getInitialAboutState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '', updatedAt: '', revision: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('about')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultAboutPage
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

  const hero = content.page?.hero || defaultAboutPage.hero;
  const introCard = content.page?.introCard || defaultAboutPage.introCard;
  const values = content.page?.values || defaultAboutPage.values;
  const environmentImages = content.page?.environmentImages || defaultAboutPage.environmentImages;
  const cta = content.page?.cta || defaultAboutPage.cta;
  const site = content.site || fallbackContent.site;
  const contactRows = [
    { label: '联系电话', value: site.contactPhone },
    { label: '微信咨询', value: site.contactWechat },
    { label: '机构地址', value: site.address },
    { label: '服务时间', value: site.serviceHours }
  ].filter((item) => item.value);

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
        background="linear-gradient(180deg, #31415f 0%, #17233f 56%, #0d1730 100%)"
        imageUrl={hero.imageUrl}
        imageSeed={hero.imageSeed}
      />

      <PageIntroCard title={introCard.title} desc={introCard.desc} />

      <CmsSyncBadge source={loadState.source} updatedAt={loadState.updatedAt} revision={loadState.revision} />

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">机构理念</PageSectionTitle>
        {values.map((item, index) => (
          <View
            key={item.title}
            style={{
              ...surfaceCardStyle,
              marginBottom: index === values.length - 1 ? '0' : ui.spacing.block,
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

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">联系方式</PageSectionTitle>
        <View
          style={{
            ...surfaceCardStyle,
            padding: '28rpx 24rpx',
            borderRadius: ui.radius.lg
          }}
        >
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.section,
              color: ui.colors.text,
              fontWeight: 800,
              marginBottom: '8rpx'
            }}
          >
            {site.brandName || site.siteName}
          </Text>
          <Text
            style={{
              display: 'block',
              fontSize: ui.type.body,
              color: ui.colors.textMuted,
              lineHeight: 1.78,
              marginBottom: '20rpx'
            }}
          >
            {site.intro}
          </Text>
          {contactRows.map((item, index) => (
            <View
              key={item.label}
              style={{
                paddingBottom: index === contactRows.length - 1 ? '0' : '16rpx',
                marginBottom: index === contactRows.length - 1 ? '0' : '16rpx',
                borderBottom: index === contactRows.length - 1 ? 'none' : '1rpx solid rgba(226,232,240,0.9)'
              }}
            >
              <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, marginBottom: '6rpx' }}>{item.label}</Text>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>{item.value}</Text>
            </View>
          ))}
          {site.contactQrcodeUrl || site.contactQrcode ? (
            <View style={{ marginTop: '20rpx', alignItems: 'center', display: 'flex' }}>
              <Image
                src={site.contactQrcodeUrl || site.contactQrcode}
                mode="aspectFill"
                style={{
                  width: '160rpx',
                  height: '160rpx',
                  borderRadius: ui.radius.sm,
                  border: '1rpx solid rgba(226,232,240,0.95)'
                }}
              />
            </View>
          ) : null}
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">校区环境</PageSectionTitle>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: ui.radius.lg,
            padding: '24rpx',
            boxShadow: ui.shadow.cardRaised
          }}
        >
          <View style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {environmentImages.map((item) => (
              <View key={item.label} style={{ width: '48.2%', marginBottom: '16rpx' }}>
                <Image
                  src={resolveMediaUrl({
                    url: item.imageUrl,
                    seed: item.imageSeed || item.label,
                    fallbackSize: '400/300'
                  })}
                  mode="aspectFill"
                  style={{
                    width: '100%',
                    height: '180rpx',
                    borderRadius: ui.radius.sm,
                    marginBottom: '12rpx'
                  }}
                />
                <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 700 }}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <PageCtaCard title={cta.title} desc={cta.desc} buttonText={cta.buttonText} footnote={cta.footnote} />
    </View>
  );
}
