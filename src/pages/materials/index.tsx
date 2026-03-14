import { ScrollView, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CmsSyncBadge from '../../components/CmsSyncBadge';
import PageCtaCard from '../../components/PageCtaCard';
import PageHero from '../../components/PageHero';
import PageSectionTitle from '../../components/PageSectionTitle';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const defaultMaterialsPage = fallbackContent.pages.materials;
const defaultMaterialSeries = fallbackContent.materialSeries;
const defaultMaterialItems = fallbackContent.materialItems;

function getInitialMaterialsState() {
  return {
    site: fallbackContent.site,
    page: defaultMaterialsPage,
    materialSeries: defaultMaterialSeries,
    materialItems: defaultMaterialItems
  };
}

function getSeriesGradient(accent, index) {
  const tone = accent || '#5b4dff';
  if (index % 2 === 0) {
    return `linear-gradient(135deg, ${tone} 0%, #29345f 100%)`;
  }

  return `linear-gradient(135deg, #1f2f4f 0%, ${tone} 100%)`;
}

function buildFeaturedSets(page, seriesList) {
  const featuredIds = page?.featuredSeriesIds || [];
  const source = featuredIds.length
    ? featuredIds.map((id) => (seriesList || []).find((item) => item._id === id)).filter(Boolean)
    : (seriesList || []).slice(0, 2);

  return source.map((item, index) => ({
    title: item.name,
    tag: item.tag || item.category || '资料套系',
    accent: item.accent || '#5b4dff',
    gradient: getSeriesGradient(item.accent, index),
    desc: item.summary || '',
    items: item.items || []
  }));
}

function buildCatalogGroups(seriesList, itemList) {
  return (seriesList || [])
    .map((series) => ({
      title: series.name,
      desc: series.summary || '',
      accent: series.accent || '#5b4dff',
      background: series.accent ? `${series.accent}12` : '#f7f5ff',
      shelfLabel: series.shelfLabel || `${series.name}书架`,
      items: (itemList || []).filter((item) => item.seriesId === series._id)
    }))
    .filter((group) => group.items.length);
}

function StatCard(props) {
  return (
    <View
      style={{
        width: '31.5%',
        ...surfaceCardStyle,
        borderRadius: ui.radius.sm,
        padding: '22rpx 14rpx',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', textAlign: 'center', fontSize: ui.type.stat, color: ui.colors.text, fontWeight: 900, marginBottom: '8rpx' }}>
        {props.value}
      </Text>
      <Text style={{ display: 'block', textAlign: 'center', fontSize: ui.type.body, color: ui.colors.textSubtle, fontWeight: 700, marginBottom: '8rpx' }}>
        {props.label}
      </Text>
      <Text style={{ display: 'block', textAlign: 'center', fontSize: ui.type.note, lineHeight: 1.6, color: ui.colors.textMuted }}>
        {props.note}
      </Text>
    </View>
  );
}

function FeaturedSetCard(props) {
  return (
    <View
      style={{
        width: '48.4%',
        background: props.gradient,
        borderRadius: ui.radius.lg,
        padding: '26rpx 24rpx 24rpx',
        boxSizing: 'border-box',
        boxShadow: '0 18rpx 32rpx rgba(15,23,42,0.14)'
      }}
    >
      <View
        style={{
          display: 'inline-flex',
          padding: '8rpx 14rpx',
          borderRadius: ui.radius.pill,
          backgroundColor: 'rgba(255,255,255,0.18)',
          marginBottom: '18rpx'
        }}
      >
        <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 700 }}>{props.tag}</Text>
      </View>
      <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: '#ffffff', fontWeight: 800, marginBottom: '12rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: ui.type.meta, lineHeight: 1.7, color: 'rgba(255,255,255,0.84)', marginBottom: '18rpx' }}>
        {props.desc}
      </Text>
      <View style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.items.map((item) => (
          <View
            key={item}
            style={{
              marginRight: '10rpx',
              marginBottom: '10rpx',
              padding: '8rpx 12rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: 'rgba(255,255,255,0.14)'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: '#ffffff' }}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PreviewBookCard(props) {
  return (
    <View
      style={{
        width: '264rpx',
        marginRight: '18rpx',
        ...surfaceCardStyle,
        borderRadius: ui.radius.md,
        padding: '18rpx',
        boxSizing: 'border-box'
      }}
    >
      <View
        style={{
          height: '300rpx',
          borderRadius: ui.radius.sm,
          background: props.gradient,
          padding: '20rpx 18rpx',
          boxSizing: 'border-box',
          marginBottom: '18rpx',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '8rpx 14rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: 'rgba(255,255,255,0.16)'
          }}
        >
          <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 700 }}>{props.type}</Text>
        </View>
        <View>
          <Text style={{ display: 'block', fontSize: ui.type.subtitle, color: '#ffffff', fontWeight: 800, marginBottom: '10rpx' }}>
            {props.title}
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.note, color: 'rgba(255,255,255,0.82)', marginBottom: '6rpx' }}>
            {props.subtitle}
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.note, color: 'rgba(255,255,255,0.82)' }}>{props.stage}</Text>
        </View>
      </View>

      <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 800, marginBottom: '8rpx' }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.7, marginBottom: '14rpx' }}>
        {props.desc}
      </Text>
      <View style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.contents.map((item) => (
          <View
            key={item}
            style={{
              marginRight: '8rpx',
              marginBottom: '8rpx',
              padding: '8rpx 12rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: '#f1f5f9'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: ui.colors.textSubtle, fontWeight: 600 }}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function CatalogGroup(props) {
  return (
    <View
      style={{
        marginBottom: props.isLast ? '0' : '32rpx',
        ...surfaceCardStyle,
        borderRadius: ui.radius.lg,
        padding: '30rpx 24rpx 26rpx',
        boxShadow: ui.shadow.cardRaised
      }}
    >
      <View
        style={{
          backgroundColor: props.background,
          borderRadius: ui.radius.sm,
          padding: '18rpx 18rpx',
          marginBottom: '24rpx'
        }}
      >
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 800, marginBottom: '10rpx' }}>
          {props.title}
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.78, marginBottom: '14rpx' }}>
          {props.desc}
        </Text>
        <View
          style={{
            display: 'inline-flex',
            padding: '8rpx 14rpx',
            borderRadius: ui.radius.pill,
            backgroundColor: '#ffffff'
          }}
        >
          <Text style={{ fontSize: ui.type.note, color: props.accent, fontWeight: 700 }}>{props.shelfLabel}</Text>
        </View>
      </View>

      <ScrollView scrollX>
        <View style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {props.items.map((item, index) => (
            <PreviewBookCard
              key={item.title}
              {...item}
              gradient={
                index % 2 === 0
                  ? 'linear-gradient(135deg, ' + props.accent + ' 0%, #1d2b52 100%)'
                  : 'linear-gradient(135deg, #334155 0%, ' + props.accent + ' 100%)'
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function MaterialsPage() {
  const [content, setContent] = useState(getInitialMaterialsState());
  const [loadState, setLoadState] = useState({ source: 'fallback', error: '', updatedAt: '', revision: '' });

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('materials')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: payload.page || defaultMaterialsPage,
          materialSeries: payload.materialSeries && payload.materialSeries.length ? payload.materialSeries : defaultMaterialSeries,
          materialItems: payload.materialItems && payload.materialItems.length ? payload.materialItems : defaultMaterialItems
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

  const hero = content.page?.hero || defaultMaterialsPage.hero;
  const tabs = content.page?.tabs || defaultMaterialsPage.tabs;
  const overviewCards = content.page?.overviewStats || defaultMaterialsPage.overviewStats;
  const featuredSets = useMemo(
    () => buildFeaturedSets(content.page || defaultMaterialsPage, content.materialSeries || defaultMaterialSeries),
    [content.page, content.materialSeries]
  );
  const groups = useMemo(
    () => buildCatalogGroups(content.materialSeries || defaultMaterialSeries, content.materialItems || defaultMaterialItems),
    [content.materialSeries, content.materialItems]
  );
  const cta = content.page?.cta || defaultMaterialsPage.cta;

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
        background="linear-gradient(180deg, #334266 0%, #17233f 56%, #0d1730 100%)"
        bubbleRight="-42rpx"
        bubbleTop="24rpx"
        bubbleSize="228rpx"
        imageUrl={hero.imageUrl}
        imageSeed={hero.imageSeed}
      />

      <View style={{ margin: `-54rpx ${ui.spacing.page} 0`, position: 'relative', zIndex: 4 }}>
        <View style={{ ...surfaceCardStyle, borderRadius: ui.radius.lg, padding: '24rpx 20rpx', boxShadow: ui.shadow.cardRaised }}>
          <ScrollView scrollX>
            <View style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              {tabs.map((item, index) => (
                <View
                  key={item}
                  style={{
                    marginRight: '14rpx',
                    padding: '16rpx 24rpx',
                    borderRadius: ui.radius.pill,
                    backgroundColor: index === 0 ? ui.colors.text : '#f1f5f9'
                  }}
                >
                  <Text
                    style={{
                      fontSize: ui.type.body,
                      color: index === 0 ? '#ffffff' : ui.colors.textMuted,
                      fontWeight: 700
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <CmsSyncBadge source={loadState.source} updatedAt={loadState.updatedAt} revision={loadState.revision} />

      <View style={{ margin: '38rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#8a92ff">套系总览</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {overviewCards.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">主推套装</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          {featuredSets.map((item) => (
            <FeaturedSetCard key={item.title} {...item} />
          ))}
        </View>
      </View>

      <View style={{ margin: `${ui.spacing.section} ${ui.spacing.page} 0` }}>
        <PageSectionTitle lineColor="#8a92ff">目录预览</PageSectionTitle>
        {groups.map((group, index) => (
          <CatalogGroup key={group.title} {...group} isLast={index === groups.length - 1} />
        ))}
      </View>

      <PageCtaCard
        title={cta.title}
        desc={cta.desc}
        buttonText={cta.buttonText}
        footnote={cta.footnote}
      />
    </View>
  );
}
