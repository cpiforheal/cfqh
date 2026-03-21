import { ScrollView, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, ui } from '../../styles/ui';

const defaultMaterialsPage = fallbackContent.pages.materials;
const defaultMaterialPackages = fallbackContent.materialPackages;
const defaultMaterialItems = fallbackContent.materialItems;

const MATERIAL_THEME = {
  math: {
    accent: '#2f66ff',
    accentSoft: '#eef4ff',
    accentLine: '#dbe6ff',
    chipText: '#2f66ff',
    heroStart: '#f4f8ff',
    heroEnd: '#ffffff',
    cardGlow: 'rgba(47,102,255,0.12)',
    consultButton: '#ffa41c'
  },
  medical: {
    accent: '#0ea59a',
    accentSoft: '#eefcf8',
    accentLine: '#d8f3eb',
    chipText: '#0c9f92',
    heroStart: '#eefcf9',
    heroEnd: '#ffffff',
    cardGlow: 'rgba(14,165,154,0.12)',
    consultButton: '#ffa41c'
  }
};

function getInitialMaterialsState() {
  return {
    site: fallbackContent.site,
    page: defaultMaterialsPage,
    materialPackages: defaultMaterialPackages,
    materialItems: defaultMaterialItems
  };
}

function normalizeMaterialsPage(page) {
  if (!page || !page.header || !page.directionTabs || !page.stageTabs) {
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

function SearchIcon() {
  return (
    <View style={{ position: 'relative', width: '42rpx', height: '42rpx' }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '30rpx',
          height: '30rpx',
          borderRadius: '999rpx',
          border: '4rpx solid #6e82a0',
          boxSizing: 'border-box'
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: '2rpx',
          width: '16rpx',
          height: '4rpx',
          borderRadius: '999rpx',
          backgroundColor: '#6e82a0',
          transform: 'rotate(45deg)',
          transformOrigin: 'right center'
        }}
      />
    </View>
  );
}

function SparkIcon(props) {
  return (
    <View style={{ position: 'relative', width: '34rpx', height: '34rpx' }}>
      <View
        style={{
          position: 'absolute',
          left: '15rpx',
          top: 0,
          width: '4rpx',
          height: '34rpx',
          borderRadius: '999rpx',
          backgroundColor: props.color
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: '15rpx',
          width: '34rpx',
          height: '4rpx',
          borderRadius: '999rpx',
          backgroundColor: props.color
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '5rpx',
          top: '5rpx',
          width: '24rpx',
          height: '24rpx',
          borderRadius: '10rpx',
          border: `3rpx solid ${props.color}`,
          transform: 'rotate(45deg)',
          boxSizing: 'border-box'
        }}
      />
    </View>
  );
}

function SegmentIcon(props) {
  if (props.type === 'medical') {
    return (
      <View style={{ position: 'relative', width: '34rpx', height: '28rpx' }}>
        <View
          style={{
            position: 'absolute',
            left: '4rpx',
            top: '8rpx',
            width: '26rpx',
            height: '12rpx',
            border: `3rpx solid ${props.color}`,
            borderTopLeftRadius: '8rpx',
            borderTopRightRadius: '8rpx',
            borderBottomLeftRadius: '14rpx',
            borderBottomRightRadius: '14rpx',
            boxSizing: 'border-box'
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '12rpx',
            top: '2rpx',
            width: '10rpx',
            height: '8rpx',
            borderRadius: '0 0 4rpx 4rpx',
            borderLeft: `3rpx solid ${props.color}`,
            borderRight: `3rpx solid ${props.color}`,
            borderBottom: `3rpx solid ${props.color}`,
            boxSizing: 'border-box'
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ width: '34rpx', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {[0, 1, 2, 3].map((item) => (
        <View
          key={item}
          style={{
            width: '12rpx',
            height: '12rpx',
            borderRadius: '4rpx',
            border: `3rpx solid ${props.color}`,
            boxSizing: 'border-box',
            marginBottom: item < 2 ? '4rpx' : '0'
          }}
        />
      ))}
    </View>
  );
}

function SectionLine(props) {
  return (
    <View style={{ marginBottom: props.isLast ? '0' : '24rpx' }}>
      <View style={{ display: 'flex', alignItems: 'center', marginBottom: '10rpx' }}>
        <Text style={{ fontSize: '24rpx', color: '#8a99b2', marginRight: '10rpx' }}>{props.icon}</Text>
        <Text
          style={{
            fontSize: '20rpx',
            color: '#7f90aa',
            fontWeight: 700,
            letterSpacing: '0.4rpx',
            fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif'
          }}
        >
          {props.label}
        </Text>
      </View>
      <Text
        style={{
          display: 'block',
          fontSize: '28rpx',
          lineHeight: 1.72,
          color: '#4c5f7d',
          fontWeight: 600,
          fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif'
        }}
      >
        {props.value}
      </Text>
    </View>
  );
}

function buildItemMap(items) {
  return Object.fromEntries((items || []).map((item) => [item._id, item]));
}

export default function MaterialsPage() {
  const [content, setContent] = useState(getInitialMaterialsState());
  const [activeDirection, setActiveDirection] = useState(defaultMaterialsPage.directionTabs[0]?.key || 'math');
  const [activeStage, setActiveStage] = useState(defaultMaterialsPage.stageTabs[0]?.key || 'foundation');

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('materials')
      .then((payload) => {
        if (!mounted || !payload) return;
        const nextPage = normalizeMaterialsPage(payload.page);
        const nextPackages = payload.materialPackages?.length ? payload.materialPackages : defaultMaterialPackages;
        const nextItems = payload.materialItems?.length ? payload.materialItems : defaultMaterialItems;
        setContent({
          site: payload.site || fallbackContent.site,
          page: nextPage,
          materialPackages: nextPackages,
          materialItems: nextItems
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
  const directionTabs = page.directionTabs || defaultMaterialsPage.directionTabs;
  const stageTabs = page.stageTabs || defaultMaterialsPage.stageTabs;

  useEffect(() => {
    if (!directionTabs.some((item) => item.key === activeDirection)) {
      setActiveDirection(directionTabs[0]?.key || 'math');
    }
  }, [directionTabs, activeDirection]);

  useEffect(() => {
    if (!stageTabs.some((item) => item.key === activeStage)) {
      setActiveStage(stageTabs[0]?.key || 'foundation');
    }
  }, [stageTabs, activeStage]);

  const packageList = content.materialPackages?.length ? content.materialPackages : defaultMaterialPackages;
  const itemList = content.materialItems?.length ? content.materialItems : defaultMaterialItems;

  const currentPackage = useMemo(() => {
    const exact = packageList.find((item) => item.direction === activeDirection && item.stage === activeStage);
    if (exact) return exact;
    const byDirection = packageList.find((item) => item.direction === activeDirection);
    return byDirection || packageList[0] || null;
  }, [packageList, activeDirection, activeStage]);

  const theme = MATERIAL_THEME[currentPackage?.direction || activeDirection] || MATERIAL_THEME.math;
  const itemMap = useMemo(() => buildItemMap(itemList), [itemList]);

  const shelfItems = useMemo(() => {
    if (currentPackage?.contentItemIds?.length) {
      const ordered = currentPackage.contentItemIds.map((id) => itemMap[id]).filter(Boolean);
      if (ordered.length) return ordered;
    }

    return itemList
      .filter((item) => item.direction === (currentPackage?.direction || activeDirection) && item.stage === (currentPackage?.stage || activeStage))
      .sort((left, right) => (left.sort || 0) - (right.sort || 0));
  }, [currentPackage, itemList, itemMap, activeDirection, activeStage]);

  return (
    <View
      style={{
        ...pageStyle,
        paddingTop: '28rpx',
        paddingBottom: '56rpx',
        background: 'linear-gradient(180deg, #f7f9fc 0%, #f3f6fb 100%)'
      }}
    >
      <View style={{ padding: `0 ${ui.spacing.page}` }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28rpx' }}>
          <Text style={{ fontSize: '58rpx', color: '#14233f', fontWeight: 900, letterSpacing: '-1rpx' }}>{page.header.title}</Text>
          <View
            style={{
              width: '74rpx',
              height: '74rpx',
              borderRadius: '999rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.92)',
              boxShadow: '0 10rpx 22rpx rgba(180,191,208,0.12)'
            }}
          >
            <SearchIcon />
          </View>
        </View>

        <View
          style={{
            padding: '14rpx',
            borderRadius: '28rpx',
            backgroundColor: '#eef2f7',
            boxShadow: '0 10rpx 22rpx rgba(173,183,199,0.10)'
          }}
        >
          <View style={{ display: 'flex' }}>
            {directionTabs.map((item) => {
              const active = item.key === activeDirection;
              const color = active ? theme.accent : '#53657f';
              return (
                <View
                  key={item.key}
                  onClick={() => setActiveDirection(item.key)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '108rpx',
                    borderRadius: '24rpx',
                    backgroundColor: active ? '#ffffff' : 'transparent',
                    boxShadow: active ? '0 12rpx 26rpx rgba(148,163,184,0.16)' : 'none'
                  }}
                >
                  <SegmentIcon type={item.icon} color={color} />
                  <Text style={{ marginLeft: '14rpx', fontSize: '32rpx', color, fontWeight: 800 }}>{item.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ display: 'flex', marginTop: '26rpx', marginBottom: '22rpx' }}>
          {stageTabs.map((item) => {
            const active = item.key === activeStage;
            return (
              <View
                key={item.key}
                onClick={() => setActiveStage(item.key)}
                style={{
                  marginRight: '18rpx',
                  padding: '16rpx 30rpx',
                  borderRadius: '999rpx',
                  border: active ? `4rpx solid ${theme.accent}` : '3rpx solid #dbe3f0',
                  backgroundColor: active ? `${theme.accent}10` : '#ffffff',
                  boxShadow: active ? `0 12rpx 24rpx ${theme.cardGlow}` : 'none'
                }}
              >
                <Text style={{ fontSize: '26rpx', color: active ? theme.accent : '#5a6d89', fontWeight: 800 }}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View
        style={{
          padding: `28rpx ${ui.spacing.page} 0`,
          marginTop: '6rpx',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(245,247,252,0.92) 100%)',
          borderTop: '1rpx solid rgba(223,229,239,0.88)'
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20rpx' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <SparkIcon color={theme.accent} />
            <Text style={{ marginLeft: '16rpx', fontSize: '42rpx', color: '#1a2842', fontWeight: 900, letterSpacing: '-0.8rpx' }}>
              {page.mainSection.title}
            </Text>
          </View>
          <Text style={{ fontSize: '22rpx', color: '#9aa9c1', fontWeight: 700 }}>{page.mainSection.sideNote}</Text>
        </View>

        {currentPackage && (
          <View
            style={{
              overflow: 'hidden',
              borderRadius: '34rpx',
              backgroundColor: '#ffffff',
              boxShadow: '0 18rpx 40rpx rgba(143,156,178,0.16)',
              border: '1rpx solid rgba(228,234,242,0.96)'
            }}
          >
            <View
              style={{
                padding: '28rpx 30rpx 32rpx',
                background: `linear-gradient(180deg, ${theme.heroStart} 0%, ${theme.heroEnd} 100%)`
              }}
            >
              <View
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '144rpx',
                  height: '58rpx',
                  padding: '0 22rpx',
                  borderRadius: '16rpx',
                  backgroundColor: theme.accent,
                  marginBottom: '24rpx'
                }}
              >
                <Text style={{ fontSize: '28rpx', color: '#ffffff', fontWeight: 800, letterSpacing: '0.4rpx' }}>{currentPackage.badge}</Text>
              </View>

              <Text style={{ display: 'block', fontSize: '46rpx', lineHeight: 1.24, color: '#13223e', fontWeight: 900, marginBottom: '24rpx', letterSpacing: '-0.8rpx' }}>
                {currentPackage.title}
              </Text>

              <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '28rpx' }}>
                {(currentPackage.features || []).map((item) => (
                  <View
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '12rpx',
                      marginBottom: '12rpx',
                      padding: '12rpx 20rpx',
                      borderRadius: '16rpx',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <View
                      style={{
                        width: '22rpx',
                        height: '22rpx',
                        borderRadius: '999rpx',
                        border: `3rpx solid ${theme.accent}`,
                        marginRight: '10rpx',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Text style={{ fontSize: '20rpx', color: '#5b6f8b', fontWeight: 700 }}>{item}</Text>
                  </View>
                ))}
              </View>

              <SectionLine icon="◎" label="适合人群" value={currentPackage.target} />
              <SectionLine icon="¤" label="解决问题" value={currentPackage.solves} isLast />
            </View>

            <View style={{ padding: '24rpx 0 0', borderTop: '1rpx solid rgba(229,235,242,0.96)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30rpx 20rpx' }}>
                <Text style={{ fontSize: '36rpx', color: '#1b2a45', fontWeight: 900, letterSpacing: '-0.4rpx' }}>{page.shelfSection.title}</Text>
                <Text style={{ fontSize: '22rpx', color: '#9aa9c1', fontWeight: 700 }}>{page.shelfSection.hint} ›</Text>
              </View>

              <ScrollView scrollX enhanced showScrollbar={false}>
                <View style={{ display: 'flex', padding: '0 18rpx 8rpx 18rpx', boxSizing: 'border-box' }}>
                  {shelfItems.map((item) => (
                    <View key={item._id} style={{ width: '270rpx', marginRight: '18rpx' }}>
                      <View
                        style={{
                          height: '264rpx',
                          padding: '18rpx 18rpx 16rpx',
                          borderRadius: '22rpx',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          background: `linear-gradient(135deg, ${item.accentStart} 0%, ${item.accentEnd} 100%)`,
                          boxShadow: `0 18rpx 34rpx ${theme.cardGlow}`
                        }}
                      >
                        <View
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'flex-start',
                            minWidth: '98rpx',
                            height: '42rpx',
                            padding: '0 16rpx',
                            borderRadius: '12rpx',
                            backgroundColor: 'rgba(0,0,0,0.16)'
                          }}
                        >
                          <Text style={{ fontSize: '20rpx', color: '#ffffff', fontWeight: 800 }}>{item.type}</Text>
                        </View>
                        <Text style={{ fontSize: '24rpx', lineHeight: 1.46, color: '#ffffff', fontWeight: 800 }}>{item.title}</Text>
                      </View>
                      <Text style={{ display: 'block', marginTop: '16rpx', fontSize: '24rpx', lineHeight: 1.48, color: '#1a2943', fontWeight: 800 }}>
                        {item.title}
                      </Text>
                      <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '22rpx', lineHeight: 1.58, color: '#7a8ca5' }}>
                        {item.subtitle || item.desc}
                      </Text>
                      <Text style={{ display: 'block', marginTop: '6rpx', fontSize: '22rpx', lineHeight: 1.58, color: '#6f809a' }}>
                        {item.desc}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              <View style={{ padding: '10rpx 30rpx 28rpx' }}>
                <View
                  style={{
                    height: '16rpx',
                    borderRadius: '999rpx',
                    backgroundColor: '#d9d9d9',
                    opacity: 0.72,
                    margin: '0 22rpx 24rpx'
                  }}
                />
                <View
                  style={{
                    height: '86rpx',
                    borderRadius: '22rpx',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.accent,
                    boxShadow: `0 18rpx 32rpx ${theme.cardGlow}`
                  }}
                >
                  <Text style={{ fontSize: '26rpx', color: '#ffffff', fontWeight: 800 }}>获取完整套系 〉</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={{ padding: `34rpx ${ui.spacing.page} 0` }}>
        <View
          style={{
            padding: '28rpx 28rpx',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '30rpx',
            backgroundColor: 'rgba(255,255,255,0.88)',
            boxShadow: '0 14rpx 30rpx rgba(167,179,197,0.12)'
          }}
        >
          <View>
            <Text style={{ display: 'block', fontSize: '42rpx', color: '#172641', fontWeight: 900, marginBottom: '8rpx', letterSpacing: '-1rpx' }}>
              {page.consultBar.title}
            </Text>
            <Text style={{ display: 'block', fontSize: '24rpx', color: '#7d8ca3', fontWeight: 600 }}>
              {page.consultBar.desc}
            </Text>
          </View>
          <View
            style={{
              minWidth: '220rpx',
              height: '84rpx',
              padding: '0 24rpx',
              borderRadius: '999rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.consultButton,
              boxShadow: '0 18rpx 34rpx rgba(255,164,28,0.24)'
            }}
          >
            <Text style={{ fontSize: '28rpx', color: '#ffffff', fontWeight: 800 }}>{page.consultBar.buttonText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
