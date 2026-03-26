import { Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import SubjectPageShell from '../../components/SubjectPageShell';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';

const defaultMaterialsPage = fallbackContent.pages.materials;
const defaultMaterialPackages = fallbackContent.materialPackages;
const defaultMaterialItems = fallbackContent.materialItems;

function getInitialMaterialsState() {
  return {
    site: fallbackContent.site,
    page: defaultMaterialsPage,
    materialPackages: defaultMaterialPackages,
    materialItems: defaultMaterialItems
  };
}

function normalizeMaterialsPage(page) {
  if (!page || !page.header || !page.stageTabs) {
    return defaultMaterialsPage;
  }

  return {
    ...defaultMaterialsPage,
    ...page,
    header: { ...defaultMaterialsPage.header, ...(page.header || {}) },
    mainSection: { ...defaultMaterialsPage.mainSection, ...(page.mainSection || {}) },
    shelfSection: { ...defaultMaterialsPage.shelfSection, ...(page.shelfSection || {}) },
    consultBar: { ...defaultMaterialsPage.consultBar, ...(page.consultBar || {}) }
  };
}

function StageChip(props) {
  return (
    <View
      onClick={props.onClick}
      style={{
        padding: '14rpx 24rpx',
        borderRadius: '18rpx',
        background: props.active ? props.palette.accentSoft : 'rgba(255,255,255,0.82)',
        border: props.active ? `2rpx solid ${props.palette.accentLine}` : '1rpx solid rgba(203,213,225,0.88)',
        boxShadow: props.active ? `0 14rpx 26rpx ${props.palette.accentGlow}` : '0 10rpx 20rpx rgba(148,163,184,0.06)'
      }}
    >
      <Text style={{ fontSize: '20rpx', color: props.active ? props.palette.accentDeep : '#51657f', fontWeight: 800 }}>
        {props.label}
      </Text>
    </View>
  );
}

function FeaturePill(props) {
  return (
    <View
      style={{
        padding: '10rpx 18rpx',
        borderRadius: '999rpx',
        background: '#ffffff',
        border: `1rpx solid ${props.palette.accentLine}`
      }}
    >
      <Text style={{ fontSize: '18rpx', color: props.palette.accentDeep, fontWeight: 700 }}>{props.label}</Text>
    </View>
  );
}

function MaterialCard(props) {
  return (
    <View
      style={{
        borderRadius: '34rpx',
        padding: '20rpx',
        background: 'rgba(255,255,255,0.9)',
        border: '1rpx solid rgba(226,232,240,0.84)',
        boxShadow: '0 16rpx 32rpx rgba(148,163,184,0.1)',
        display: 'flex',
        gap: '20rpx',
        alignItems: 'center',
        backdropFilter: 'blur(18rpx)'
      }}
    >
      <View
        style={{
          width: '146rpx',
          height: '146rpx',
          borderRadius: '28rpx',
          background: `linear-gradient(135deg, ${props.item.accentStart} 0%, ${props.item.accentEnd} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <Text style={{ fontSize: '42rpx', color: '#ffffff', fontWeight: 900 }}>{String(props.item.type || '资').slice(0, 1)}</Text>
        <Text
          style={{
            position: 'absolute',
            bottom: '16rpx',
            fontSize: '16rpx',
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 700
          }}
        >
          {props.item.type}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ display: 'block', fontSize: '24rpx', color: '#0f172a', fontWeight: 900, lineHeight: 1.45 }}>{props.item.title}</Text>
        <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '18rpx', color: '#8ea0ba', fontWeight: 700 }}>
          {props.item.subtitle}
        </Text>
        <Text style={{ display: 'block', marginTop: '16rpx', fontSize: '18rpx', color: '#5c708c', lineHeight: 1.7 }}>
          {props.item.desc}
        </Text>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24rpx' }}>
          <Text style={{ fontSize: '20rpx', color: props.palette.accentDeep, fontWeight: 800 }}>{props.item.details}</Text>
          <View
            style={{
              minWidth: '148rpx',
              height: '62rpx',
              padding: '0 24rpx',
              borderRadius: '18rpx',
              background: '#16223a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 800 }}>查看资料</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function CoursesPage() {
  const [content, setContent] = useState(getInitialMaterialsState());
  const [activeStage, setActiveStage] = useState(defaultMaterialsPage.stageTabs[0]?.key || 'foundation');

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('materials')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: normalizeMaterialsPage(payload.page),
          materialPackages: payload.materialPackages?.length ? payload.materialPackages : defaultMaterialPackages,
          materialItems: payload.materialItems?.length ? payload.materialItems : defaultMaterialItems
        });
      })
      .catch(() => {
        if (!mounted) return;
        setContent(getInitialMaterialsState());
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

  const page = content.page || defaultMaterialsPage;
  const stageTabs = page.stageTabs || defaultMaterialsPage.stageTabs;
  const subtitle = `${page.mainSection.title} · ${page.shelfSection.title}`;

  return (
    <SubjectPageShell title={page.header.title} subtitle={subtitle}>
      {({ subject, palette }) => {
        const resolvedStage = stageTabs.some((item) => item.key === activeStage) ? activeStage : stageTabs[0]?.key || 'foundation';
        const packageList = content.materialPackages?.length ? content.materialPackages : defaultMaterialPackages;
        const itemList = content.materialItems?.length ? content.materialItems : defaultMaterialItems;
        const currentPackage =
          packageList
            .filter((item) => item.direction === subject && item.stage === resolvedStage)
            .sort((left, right) => (left.sort || 0) - (right.sort || 0))[0] || null;
        const currentItems = itemList
          .filter((item) => item.direction === subject && item.stage === resolvedStage)
          .sort((left, right) => (left.sort || 0) - (right.sort || 0));

        return (
          <View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '22rpx',
                gap: '18rpx'
              }}
            >
              <View>
                <Text style={{ display: 'block', fontSize: '24rpx', color: '#0f172a', fontWeight: 900 }}>{page.mainSection.title}</Text>
                <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '18rpx', color: '#8ea0ba', fontWeight: 700 }}>
                  {page.mainSection.sideNote}
                </Text>
              </View>
              <View
                style={{
                  height: '72rpx',
                  padding: '0 22rpx',
                  borderRadius: '999rpx',
                  background: 'rgba(255,255,255,0.9)',
                  border: '1rpx solid rgba(226,232,240,0.92)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10rpx 22rpx rgba(148,163,184,0.08)',
                  flexShrink: 0
                }}
              >
                <Text style={{ fontSize: '20rpx', color: '#70829d', fontWeight: 700 }}>{page.header.searchLabel}</Text>
              </View>
            </View>

            <View style={{ display: 'flex', gap: '14rpx', flexWrap: 'wrap', marginBottom: '22rpx' }}>
              {stageTabs.map((item) => (
                <StageChip
                  key={item.key}
                  label={item.label}
                  active={item.key === resolvedStage}
                  palette={palette}
                  onClick={() => setActiveStage(item.key)}
                />
              ))}
            </View>

            {currentPackage ? (
              <View
                style={{
                  borderRadius: '36rpx',
                  padding: '28rpx',
                  background: `linear-gradient(180deg, ${palette.accentSoft} 0%, rgba(255,255,255,0.98) 100%)`,
                  border: `1rpx solid ${palette.accentLine}`,
                  boxShadow: `0 20rpx 40rpx ${palette.accentGlow}`,
                  marginBottom: '22rpx'
                }}
              >
                <View style={{ display: 'flex', justifyContent: 'space-between', gap: '18rpx', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        minHeight: '48rpx',
                        padding: '0 18rpx',
                        borderRadius: '999rpx',
                        background: '#ffffff',
                        marginBottom: '18rpx'
                      }}
                    >
                      <Text style={{ fontSize: '18rpx', color: palette.accentDeep, fontWeight: 800 }}>{currentPackage.badge}</Text>
                    </View>
                    <Text style={{ display: 'block', fontSize: '30rpx', color: '#0f172a', fontWeight: 900, lineHeight: 1.4 }}>
                      {currentPackage.title}
                    </Text>
                    <Text style={{ display: 'block', marginTop: '10rpx', fontSize: '20rpx', color: '#53687f', lineHeight: 1.7 }}>
                      {currentPackage.target}
                    </Text>
                    <Text style={{ display: 'block', marginTop: '14rpx', fontSize: '18rpx', color: '#7b8ea5', lineHeight: 1.7 }}>
                      {currentPackage.solves}
                    </Text>
                  </View>
                </View>

                <View style={{ display: 'flex', flexWrap: 'wrap', gap: '12rpx', marginTop: '22rpx' }}>
                  {(currentPackage.features || []).map((item) => (
                    <FeaturePill key={item} label={item} palette={palette} />
                  ))}
                </View>
              </View>
            ) : null}

            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
              <Text style={{ fontSize: '26rpx', color: '#0f172a', fontWeight: 900 }}>{page.shelfSection.title}</Text>
              <Text style={{ fontSize: '18rpx', color: '#9aa9be', fontWeight: 700 }}>{page.shelfSection.hint}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '18rpx' }}>
              {currentItems.map((item) => (
                <MaterialCard key={item._id || item.title} item={item} palette={palette} />
              ))}
            </View>

            <View
              style={{
                marginTop: '24rpx',
                borderRadius: '30rpx',
                padding: '24rpx',
                background: '#1c2942',
                boxShadow: '0 20rpx 40rpx rgba(15,23,42,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20rpx'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ display: 'block', fontSize: '28rpx', color: '#ffffff', fontWeight: 900 }}>{page.consultBar.title}</Text>
                <Text style={{ display: 'block', marginTop: '10rpx', fontSize: '18rpx', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                  {page.consultBar.desc}
                </Text>
              </View>
              <View
                style={{
                  minWidth: '160rpx',
                  height: '72rpx',
                  padding: '0 22rpx',
                  borderRadius: '999rpx',
                  background: palette.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 900 }}>{page.consultBar.buttonText}</Text>
              </View>
            </View>
          </View>
        );
      }}
    </SubjectPageShell>
  );
}
