import { Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getPublicContent } from '../../services/content';
import { pageStyle, ui } from '../../styles/ui';

const defaultSuccessPage = fallbackContent.pages.success;
const defaultSuccessCases = fallbackContent.successCases;

const SUCCESS_THEME = {
  math: {
    accent: '#2f66ff',
    accentSoft: '#eef4ff',
    accentLine: '#dbe6ff',
    accentDeep: '#1f56f2',
    scoreBg: 'rgba(78, 214, 151, 0.16)',
    scoreText: '#0b8d5b',
    heroSoft: '#edf3ff',
    supportBg: 'linear-gradient(135deg, #24344f 0%, #1b2740 100%)',
    supportIconBg: '#ffffff'
  },
  medical: {
    accent: '#0ea59a',
    accentSoft: '#eefcf8',
    accentLine: '#d9f3ea',
    accentDeep: '#0c968c',
    scoreBg: 'rgba(78, 214, 151, 0.16)',
    scoreText: '#0b8d5b',
    heroSoft: '#eefbf8',
    supportBg: 'linear-gradient(135deg, #1f3144 0%, #18283a 100%)',
    supportIconBg: '#ffffff'
  }
};

function getInitialState() {
  return {
    site: fallbackContent.site,
    page: defaultSuccessPage,
    successCases: defaultSuccessCases
  };
}

function normalizeSuccessPage(page) {
  if (!page || !page.header || !Array.isArray(page.directionTabs) || !Array.isArray(page.pathTabs)) {
    return defaultSuccessPage;
  }

  return {
    ...defaultSuccessPage,
    ...page,
    header: { ...defaultSuccessPage.header, ...(page.header || {}) },
    featuredSection: { ...defaultSuccessPage.featuredSection, ...(page.featuredSection || {}) },
    listSection: { ...defaultSuccessPage.listSection, ...(page.listSection || {}) },
    supportSection: {
      ...defaultSuccessPage.supportSection,
      ...(page.supportSection || {}),
      items: Array.isArray(page.supportSection?.items) && page.supportSection.items.length
        ? page.supportSection.items
        : defaultSuccessPage.supportSection.items
    },
    ctaByDirection: {
      math: { ...defaultSuccessPage.ctaByDirection.math, ...(page.ctaByDirection?.math || {}) },
      medical: { ...defaultSuccessPage.ctaByDirection.medical, ...(page.ctaByDirection?.medical || {}) }
    }
  };
}

function normalizeSuccessCases(cases) {
  if (!Array.isArray(cases) || !cases.length) {
    return defaultSuccessCases;
  }

  const hasLegacyShape = cases.some(
    (item) => !item?.direction || !Array.isArray(item?.pathTags) || !item?.studentName || !item?.startingScore || !item?.finalScore
  );

  return hasLegacyShape ? defaultSuccessCases : cases;
}

function SectionIcon(props) {
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

function SupportIcon(props) {
  return (
    <View
      style={{
        width: '76rpx',
        height: '76rpx',
        borderRadius: '999rpx',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.background
      }}
    >
      <Text style={{ fontSize: '30rpx', color: props.color, fontWeight: 800 }}>{props.children}</Text>
    </View>
  );
}

function getSupportSymbol(type) {
  if (type === 'pulse') return '∿';
  if (type === 'clipboard') return '▣';
  if (type === 'target') return '◎';
  return '◉';
}

export default function SuccessPage() {
  const [content, setContent] = useState(getInitialState());
  const [activeDirection, setActiveDirection] = useState(defaultSuccessPage.directionTabs[0]?.key || 'math');
  const [activePath, setActivePath] = useState(defaultSuccessPage.pathTabs[0]?.key || 'foundation');
  const [visibleCount, setVisibleCount] = useState(2);
  const [isSwitching, setIsSwitching] = useState(false);

  const loadContent = useCallback(() => {
    let mounted = true;

    getPublicContent('success')
      .then((payload) => {
        if (!mounted || !payload) return;
        setContent({
          site: payload.site || fallbackContent.site,
          page: normalizeSuccessPage(payload.page),
          successCases: normalizeSuccessCases(payload.successCases)
        });
      })
      .catch(() => {
        if (!mounted) return;
        setContent(getInitialState());
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

  const page = content.page || defaultSuccessPage;

  useEffect(() => {
    setVisibleCount(2);
  }, [activeDirection, activePath]);

  useEffect(() => {
    setIsSwitching(true);
    const timer = setTimeout(() => {
      setIsSwitching(false);
    }, 360);
    return () => clearTimeout(timer);
  }, [activeDirection, activePath]);

  const theme = SUCCESS_THEME[activeDirection] || SUCCESS_THEME.math;
  const cta = page.ctaByDirection?.[activeDirection] || defaultSuccessPage.ctaByDirection.math;

  const filteredCases = useMemo(() => {
    const source = content.successCases?.length ? content.successCases : defaultSuccessCases;
    return source
      .filter((item) => item.direction === activeDirection && (item.pathTags || []).includes(activePath))
      .sort((left, right) => (left.sort || 0) - (right.sort || 0));
  }, [content.successCases, activeDirection, activePath]);

  const fallbackDirectionCases = useMemo(() => {
    const source = content.successCases?.length ? content.successCases : defaultSuccessCases;
    return source
      .filter((item) => item.direction === activeDirection)
      .sort((left, right) => (left.sort || 0) - (right.sort || 0));
  }, [content.successCases, activeDirection]);

  const displayCases = filteredCases.length ? filteredCases : fallbackDirectionCases;
  const featuredCase = displayCases[0];
  const listCases = displayCases.slice(1, 1 + visibleCount);
  const hasMore = displayCases.length > 1 + visibleCount;

  return (
    <View
      style={{
        ...pageStyle,
        paddingTop: '30rpx',
        paddingBottom: '50rpx',
        background: 'linear-gradient(180deg, #f7f8fb 0%, #f4f6fb 100%)'
      }}
    >
      <View style={{ padding: `0 ${ui.spacing.page} 28rpx` }}>
        <Text style={{ display: 'block', fontSize: '52rpx', lineHeight: 1.16, color: '#14233f', fontWeight: 900, marginBottom: '14rpx', letterSpacing: '-0.8rpx' }}>
          {page.header.title}
        </Text>
        <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.76, color: '#72839d', marginBottom: '24rpx' }}>
          {page.header.subtitle}
        </Text>

        <View style={{ display: 'flex', marginBottom: '18rpx' }}>
          {(page.directionTabs || []).map((item) => {
            const active = item.key === activeDirection;
            return (
              <View
                key={item.key}
                onClick={() => setActiveDirection(item.key)}
                style={{
                  minWidth: '148rpx',
                  height: '68rpx',
                  marginRight: '14rpx',
                  borderRadius: '999rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? theme.accent : '#eff3f9',
                  boxShadow: active ? `0 12rpx 24rpx ${theme.accentSoft}` : 'none',
                  transition: 'all 340ms ease'
                }}
              >
                <Text style={{ fontSize: '20rpx', color: active ? '#ffffff' : '#5b6e88', fontWeight: 800 }}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ display: 'flex', flexWrap: 'wrap' }}>
          {(page.pathTabs || []).map((item) => {
            const active = item.key === activePath;
            return (
              <View
                key={item.key}
                onClick={() => setActivePath(item.key)}
                style={{
                  marginRight: '12rpx',
                  marginBottom: '10rpx',
                  padding: '12rpx 20rpx',
                  borderRadius: '16rpx',
                  border: active ? `3rpx solid ${theme.accent}` : '3rpx solid #dbe3f0',
                  backgroundColor: active ? `${theme.accent}08` : '#ffffff',
                  transition: 'all 340ms ease'
                }}
              >
                <Text style={{ fontSize: '20rpx', color: active ? theme.accent : '#70829d', fontWeight: 700 }}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View
        style={{
          padding: `24rpx ${ui.spacing.page} 0`,
          borderTop: '1rpx solid rgba(223,229,239,0.88)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.56) 0%, rgba(246,248,252,0.96) 100%)'
        }}
      >
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: '18rpx' }}>
          <SectionIcon color={activeDirection === 'math' ? '#ff9800' : theme.accent} />
          <Text style={{ marginLeft: '16rpx', fontSize: '40rpx', color: '#1a2842', fontWeight: 900, letterSpacing: '-0.6rpx' }}>
            {page.featuredSection.title}
          </Text>
        </View>

        {featuredCase ? (
          <View
            style={{
              overflow: 'hidden',
              borderRadius: '32rpx',
              background: `linear-gradient(180deg, ${theme.heroSoft} 0%, #ffffff 100%)`,
              border: '1rpx solid rgba(226,234,242,0.96)',
              boxShadow: '0 14rpx 30rpx rgba(145,158,178,0.12)',
              marginBottom: '24rpx',
              opacity: isSwitching ? 0.9 : 1,
              transform: isSwitching ? 'scale(0.988) translateY(6rpx)' : 'scale(1) translateY(0)',
                transition: 'opacity 340ms ease, transform 340ms ease, box-shadow 340ms ease'
            }}
          >
            <View style={{ padding: '26rpx 24rpx 24rpx' }}>
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '22rpx' }}>
                <View style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <View
                    style={{
                      width: '96rpx',
                      height: '96rpx',
                      borderRadius: '999rpx',
                      backgroundColor: activeDirection === 'math' ? 'rgba(47,102,255,0.14)' : 'rgba(14,165,154,0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '18rpx'
                    }}
                  >
                    <Text style={{ fontSize: '46rpx', color: theme.accent, fontWeight: 900 }}>{featuredCase.studentAvatarText}</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ display: 'block', fontSize: '42rpx', color: '#1a2842', fontWeight: 900, marginBottom: '12rpx' }}>
                      {featuredCase.studentName}
                    </Text>
                    <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(featuredCase.chips || []).map((item) => (
                        <View
                          key={item}
                          style={{
                            marginRight: '8rpx',
                            marginBottom: '8rpx',
                            padding: '8rpx 14rpx',
                            borderRadius: '12rpx',
                            border: '2rpx solid #d9e2ef',
                            backgroundColor: '#ffffff'
                          }}
                        >
                          <Text style={{ fontSize: '18rpx', color: '#70829d', fontWeight: 700 }}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column', marginLeft: '14rpx' }}>
                  <Text style={{ fontSize: '18rpx', color: '#9aacbf', fontWeight: 700, marginBottom: '10rpx' }}>{featuredCase.scoreLabel}</Text>
                  <View
                    style={{
                      minWidth: '104rpx',
                      height: '60rpx',
                      borderRadius: '16rpx',
                      padding: '0 16rpx',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.scoreBg
                    }}
                  >
                    <Text style={{ fontSize: '24rpx', color: theme.scoreText, fontWeight: 900 }}>{featuredCase.scoreGain}</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24rpx 22rpx',
                  borderRadius: '22rpx',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10rpx 22rpx rgba(153,167,187,0.1)',
                  marginBottom: '20rpx'
                }}
              >
                <View style={{ flex: 1, textAlign: 'center' }}>
                  <Text style={{ display: 'block', fontSize: '18rpx', color: '#9aacbf', fontWeight: 700, marginBottom: '8rpx' }}>
                    {featuredCase.startingLabel}
                  </Text>
                  <Text style={{ display: 'block', fontSize: '36rpx', color: '#2a3a55', fontWeight: 900 }}>{featuredCase.startingScore}</Text>
                </View>
                <Text style={{ fontSize: '36rpx', color: '#ccd6e4', fontWeight: 700, margin: '0 14rpx' }}>→</Text>
                <View style={{ flex: 1, textAlign: 'center' }}>
                  <Text style={{ display: 'block', fontSize: '18rpx', color: '#9aacbf', fontWeight: 700, marginBottom: '8rpx' }}>
                    {featuredCase.finalLabel}
                  </Text>
                  <Text style={{ display: 'block', fontSize: '40rpx', color: theme.scoreText, fontWeight: 900 }}>{featuredCase.finalScore}</Text>
                </View>
              </View>

              <View style={{ padding: '4rpx 8rpx 20rpx' }}>
                <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.84, color: '#566985' }}>
                  “{featuredCase.quote}”
                </Text>
              </View>

              <View
                style={{
                  padding: '22rpx 20rpx',
                  borderRadius: '22rpx',
                  backgroundColor: '#f7f9fc',
                  border: '1rpx solid rgba(226,234,242,0.96)',
                  marginBottom: '20rpx'
                }}
              >
                <Text style={{ display: 'block', fontSize: '20rpx', color: theme.accent, fontWeight: 800, marginBottom: '12rpx' }}>
                  适合谁参考此路径？
                </Text>
                <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.78, color: '#6b7d97' }}>
                  {featuredCase.fitAudience}
                </Text>
              </View>

              <View
                style={{
                  height: '88rpx',
                  borderRadius: '22rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: activeDirection === 'math' ? '#edf4ff' : '#eaf8f5'
                }}
              >
                <Text style={{ fontSize: '24rpx', color: theme.accent, fontWeight: 900 }}>{cta.title} 〉</Text>
              </View>
            </View>
          </View>
        ) : null}

        <View style={{ marginBottom: '22rpx' }}>
          {listCases.map((item) => (
            <View
              key={item._id}
              style={{
                padding: '22rpx 20rpx',
                borderRadius: '26rpx',
                backgroundColor: '#ffffff',
                border: '1rpx solid rgba(226,234,242,0.96)',
                boxShadow: '0 10rpx 20rpx rgba(148,160,180,0.08)',
                marginBottom: '16rpx',
                opacity: isSwitching ? 0.92 : 1,
                transform: isSwitching ? 'translateY(4rpx)' : 'translateY(0)',
                transition: 'opacity 340ms ease, transform 340ms ease'
              }}
            >
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14rpx' }}>
                <View style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                  <View
                    style={{
                      width: '66rpx',
                      height: '66rpx',
                      borderRadius: '999rpx',
                      backgroundColor: activeDirection === 'math' ? 'rgba(47,102,255,0.12)' : 'rgba(14,165,154,0.14)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '14rpx'
                    }}
                  >
                    <Text style={{ fontSize: '30rpx', color: theme.accent, fontWeight: 900 }}>{item.studentAvatarText}</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <View style={{ display: 'flex', alignItems: 'center', marginBottom: '10rpx' }}>
                      <Text style={{ fontSize: '22rpx', color: '#1d2d47', fontWeight: 900, marginRight: '12rpx' }}>{item.studentName}</Text>
                      <Text style={{ fontSize: '18rpx', color: '#9aacbf', fontWeight: 700 }}>{item.scoreLabel}</Text>
                    </View>
                    <Text style={{ fontSize: '26rpx', lineHeight: 1.5, color: '#283955', fontWeight: 800, marginBottom: '12rpx' }}>{item.listTitle}</Text>
                    <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(item.chips || []).slice(0, 2).map((chip) => (
                        <View key={chip} style={{ marginRight: '8rpx', marginBottom: '8rpx', padding: '8rpx 14rpx', borderRadius: '12rpx', backgroundColor: '#f3f6fb' }}>
                          <Text style={{ fontSize: '18rpx', color: '#72839d', fontWeight: 700 }}>{chip}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={{ fontSize: '22rpx', color: theme.scoreText, fontWeight: 900, marginLeft: '12rpx' }}>{item.finalScore}</Text>
              </View>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14rpx', borderTop: '1rpx solid rgba(230,236,243,0.96)' }}>
                <Text style={{ flex: 1, fontSize: '20rpx', lineHeight: 1.72, color: '#90a0b6', marginRight: '16rpx' }}>
                  适合：{item.listDesc}
                </Text>
                <Text style={{ fontSize: '20rpx', color: theme.accent, fontWeight: 800 }}>{item.detailButtonText} 〉</Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            height: '82rpx',
            borderRadius: '20rpx',
            border: '2rpx solid #dbe3f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            marginBottom: '34rpx'
          }}
          onClick={() => hasMore && setVisibleCount((count) => count + 2)}
        >
          <Text style={{ fontSize: '22rpx', color: '#6f819b', fontWeight: 800 }}>
            {hasMore ? page.listSection.loadMoreText : '已展示全部案例'}
          </Text>
        </View>

        <View
          style={{
            padding: '28rpx 24rpx 24rpx',
            borderRadius: '28rpx',
            background: theme.supportBg,
            opacity: isSwitching ? 0.94 : 1,
            transform: isSwitching ? 'scale(0.992) translateY(6rpx)' : 'scale(1) translateY(0)',
            transition: 'opacity 360ms ease, transform 360ms ease'
          }}
        >
          <Text style={{ display: 'block', fontSize: '42rpx', color: '#ffffff', fontWeight: 900, marginBottom: '12rpx' }}>
            {page.supportSection.title}
          </Text>
          <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.74, color: 'rgba(226,232,240,0.82)', marginBottom: '24rpx' }}>
            {page.supportSection.subtitle}
          </Text>

          {(page.supportSection.items || []).map((item, index) => (
            <View
              key={item.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: index === page.supportSection.items.length - 1 ? '0' : '24rpx'
              }}
            >
              <SupportIcon background={theme.supportIconBg} color={theme.accent}>
                {getSupportSymbol(item.icon)}
              </SupportIcon>
              <View style={{ flex: 1, marginLeft: '18rpx' }}>
                <Text style={{ display: 'block', fontSize: '22rpx', color: '#ffffff', fontWeight: 800, marginBottom: '8rpx' }}>
                  {item.title}
                </Text>
                <Text style={{ display: 'block', fontSize: '20rpx', lineHeight: 1.72, color: 'rgba(226,232,240,0.72)' }}>
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={{
              marginTop: '22rpx',
              paddingTop: '20rpx',
              borderTop: '1rpx solid rgba(255,255,255,0.12)'
            }}
          >
            <Text style={{ display: 'block', fontSize: '24rpx', color: '#ffffff', fontWeight: 900, marginBottom: '8rpx' }}>
              {cta.buttonText}
            </Text>
            <Text style={{ display: 'block', fontSize: '20rpx', lineHeight: 1.72, color: 'rgba(226,232,240,0.72)' }}>
              {cta.desc}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
