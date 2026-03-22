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
    accentDeep: '#1f56f2',
    chipText: '#2f66ff',
    heroStart: '#edf3ff',
    heroEnd: '#ffffff',
    heroSoft: '#edf3ff',
    cardGlow: 'rgba(47,102,255,0.12)',
    consultButton: '#ffa41c',
    supportBg: 'linear-gradient(135deg, #24344f 0%, #1b2740 100%)'
  },
  medical: {
    accent: '#0ea59a',
    accentSoft: '#eefcf8',
    accentLine: '#d8f3eb',
    accentDeep: '#0c968c',
    chipText: '#0c9f92',
    heroStart: '#eefbf8',
    heroEnd: '#ffffff',
    heroSoft: '#eefbf8',
    cardGlow: 'rgba(14,165,154,0.12)',
    consultButton: '#ffa41c',
    supportBg: 'linear-gradient(135deg, #1f3144 0%, #18283a 100%)'
  }
};

const MATERIAL_DIRECTION_COPY = {
  math: {
    header: '高数资料按基础、强化、冲刺三段展开，切换节奏和成果页的高数路径保持同一条提分线。',
    packageIntro: '从主教材、同步训练到阶段测评，把“先搭框架，再练题型，最后稳考场”这一套节奏串起来。',
    supportPoints: ['先按当前阶段选套系，不必一开始把全部资料都堆满', '资料和课程、测评节奏是配套的，更容易形成连续复习惯性']
  },
  medical: {
    header: '医护资料把主干考点、记忆资料和整卷训练拆成阶段包，延续成果页医护路线的切换体验。',
    packageIntro: '把主干知识、口诀记忆和整卷模考按阶段装进同一套学习路径里，减少资料分散带来的断层感。',
    supportPoints: ['先确认基础薄弱点，再选更贴合的教材组合和记忆资料', '把资料节奏和练习节奏绑在一起，更适合医护内容的持续记忆']
  }
};

const MATERIAL_STAGE_COPY = {
  foundation: {
    label: '起步搭框架',
    summary: '先把主干知识和配套练习串成一条主线，适合从零起步或需要重新补基础的时候。',
    action: '先把框架搭起来'
  },
  reinforcement: {
    label: '专题做强化',
    summary: '用题型拆解、专题训练和易错复盘把知识从“会看”推进到“会做会稳”。',
    action: '开始强化提分'
  },
  sprint: {
    label: '临考稳状态',
    summary: '把整卷节奏、押题重点和速记资料压缩到最后阶段，帮助考前把状态收回来。',
    action: '进入考前冲刺'
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

function buildItemMap(items) {
  return Object.fromEntries((items || []).map((item) => [item._id, item]));
}

function DetailBlock(props) {
  return (
    <View
      style={{
        padding: '22rpx 20rpx',
        borderRadius: '22rpx',
        backgroundColor: '#f7f9fc',
        border: '1rpx solid rgba(226,234,242,0.96)',
        marginBottom: props.isLast ? '0' : '16rpx'
      }}
    >
      <Text style={{ display: 'block', fontSize: '20rpx', color: props.color, fontWeight: 800, marginBottom: '12rpx' }}>
        {props.label}
      </Text>
      <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.78, color: '#6b7d97' }}>{props.value}</Text>
    </View>
  );
}

function SupportPointIcon(props) {
  return (
    <View
      style={{
        width: '54rpx',
        height: '54rpx',
        borderRadius: '999rpx',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexShrink: 0
      }}
    >
      <Text style={{ fontSize: '24rpx', color: props.color, fontWeight: 900 }}>{props.children}</Text>
    </View>
  );
}

function getDirectionAvatar(direction) {
  return direction === 'medical' ? '护' : '高';
}

function getSupportSymbol(index) {
  if (index === 0) return '◎';
  if (index === 1) return '◈';
  return '◉';
}

export default function MaterialsPage() {
  const [content, setContent] = useState(getInitialMaterialsState());
  const [activeDirection, setActiveDirection] = useState(defaultMaterialsPage.directionTabs[0]?.key || 'math');
  const [activeStage, setActiveStage] = useState(defaultMaterialsPage.stageTabs[0]?.key || 'foundation');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);

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

  useEffect(() => {
    setIsSwitching(true);
    const timer = setTimeout(() => {
      setIsSwitching(false);
    }, 360);

    return () => clearTimeout(timer);
  }, [activeDirection, activeStage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsBreathing((value) => !value);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  const packageList = content.materialPackages?.length ? content.materialPackages : defaultMaterialPackages;
  const itemList = content.materialItems?.length ? content.materialItems : defaultMaterialItems;

  const currentPackage = useMemo(() => {
    const exact = packageList.find((item) => item.direction === activeDirection && item.stage === activeStage);
    if (exact) return exact;
    const byDirection = packageList.find((item) => item.direction === activeDirection);
    return byDirection || packageList[0] || null;
  }, [packageList, activeDirection, activeStage]);

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

  const resolvedDirection = currentPackage?.direction || activeDirection;
  const resolvedStage = currentPackage?.stage || activeStage;
  const theme = MATERIAL_THEME[resolvedDirection] || MATERIAL_THEME.math;
  const directionCopy = MATERIAL_DIRECTION_COPY[resolvedDirection] || MATERIAL_DIRECTION_COPY.math;
  const stageCopy = MATERIAL_STAGE_COPY[resolvedStage] || MATERIAL_STAGE_COPY.foundation;
  const currentStageLabel = stageTabs.find((item) => item.key === resolvedStage)?.label || '当前阶段';

  return (
    <View
      style={{
        ...pageStyle,
        paddingTop: '30rpx',
        paddingBottom: '56rpx',
        background: 'linear-gradient(180deg, #f7f8fb 0%, #f4f6fb 100%)'
      }}
    >
      <View style={{ padding: `0 ${ui.spacing.page} 28rpx` }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24rpx' }}>
          <View style={{ flex: 1, minWidth: 0, paddingRight: '18rpx' }}>
            <Text style={{ display: 'block', fontSize: '52rpx', lineHeight: 1.16, color: '#14233f', fontWeight: 900, marginBottom: '14rpx', letterSpacing: '-0.8rpx' }}>
              {page.header.title}
            </Text>
            <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.76, color: '#72839d' }}>{directionCopy.header}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '74rpx',
              padding: '0 20rpx',
              borderRadius: '999rpx',
              backgroundColor: 'rgba(255,255,255,0.92)',
              boxShadow: '0 10rpx 22rpx rgba(180,191,208,0.12)'
            }}
          >
            <SearchIcon />
            <Text style={{ marginLeft: '12rpx', fontSize: '20rpx', color: '#70829d', fontWeight: 700 }}>{page.header.searchLabel}</Text>
          </View>
        </View>

        <View style={{ display: 'flex', marginBottom: '18rpx' }}>
          {directionTabs.map((item) => {
            const active = item.key === activeDirection;
            const color = active ? '#ffffff' : '#5b6e88';
            return (
              <View
                key={item.key}
                onClick={() => setActiveDirection(item.key)}
                style={{
                  minWidth: '168rpx',
                  height: '68rpx',
                  marginRight: '14rpx',
                  padding: '0 22rpx',
                  borderRadius: '999rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? theme.accent : '#eff3f9',
                  boxShadow: active
                    ? isBreathing
                      ? `0 16rpx 30rpx ${theme.accentSoft}`
                      : `0 12rpx 24rpx ${theme.accentSoft}`
                    : 'none',
                  transform: active ? (isBreathing ? 'scale(1.03) translateY(-2rpx)' : 'scale(1) translateY(0)') : 'scale(1)',
                  transition: 'all 340ms ease'
                }}
              >
                <SegmentIcon type={item.icon} color={color} />
                <Text style={{ marginLeft: '12rpx', fontSize: '20rpx', color, fontWeight: 800 }}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ display: 'flex', flexWrap: 'wrap' }}>
          {stageTabs.map((item) => {
            const active = item.key === activeStage;
            return (
              <View
                key={item.key}
                onClick={() => setActiveStage(item.key)}
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
          padding: `28rpx ${ui.spacing.page} 0`,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.56) 0%, rgba(246,248,252,0.96) 100%)',
          borderTop: '1rpx solid rgba(223,229,239,0.88)'
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20rpx' }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <SparkIcon color={activeDirection === 'math' ? '#ff9800' : theme.accent} />
            <Text style={{ marginLeft: '16rpx', fontSize: '40rpx', color: '#1a2842', fontWeight: 900, letterSpacing: '-0.6rpx' }}>
              {page.mainSection.title}
            </Text>
          </View>
          <Text style={{ fontSize: '22rpx', color: '#9aa9c1', fontWeight: 700 }}>{page.mainSection.sideNote}</Text>
        </View>

        {currentPackage && (
          <View
            style={{
              overflow: 'hidden',
              borderRadius: '32rpx',
              background: `linear-gradient(180deg, ${theme.heroSoft} 0%, #ffffff 100%)`,
              border: '1rpx solid rgba(226,234,242,0.96)',
              boxShadow: '0 14rpx 30rpx rgba(145,158,178,0.12)',
              opacity: isSwitching ? 0.9 : 1,
              transform: isSwitching ? 'scale(0.988) translateY(6rpx)' : 'scale(1) translateY(0)',
              transition: 'opacity 340ms ease, transform 340ms ease, box-shadow 340ms ease'
            }}
          >
            <View
              style={{
                padding: '26rpx 24rpx 24rpx',
                background: `linear-gradient(180deg, ${theme.heroStart} 0%, ${theme.heroEnd} 100%)`
              }}
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '22rpx'
                }}
              >
                <View style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, marginRight: '16rpx' }}>
                  <View
                    style={{
                      width: '92rpx',
                      height: '92rpx',
                      borderRadius: '999rpx',
                      backgroundColor: resolvedDirection === 'math' ? 'rgba(47,102,255,0.14)' : 'rgba(14,165,154,0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '18rpx',
                      boxShadow: isBreathing ? `0 14rpx 24rpx ${theme.cardGlow}` : 'none',
                      transform: isBreathing ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 340ms ease, box-shadow 340ms ease'
                    }}
                  >
                    <Text style={{ fontSize: '42rpx', color: theme.accent, fontWeight: 900 }}>{getDirectionAvatar(resolvedDirection)}</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <View
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '138rpx',
                        height: '56rpx',
                        padding: '0 20rpx',
                        borderRadius: '16rpx',
                        backgroundColor: theme.accent,
                        marginBottom: '16rpx'
                      }}
                    >
                      <Text style={{ fontSize: '24rpx', color: '#ffffff', fontWeight: 800, letterSpacing: '0.4rpx' }}>{currentPackage.badge}</Text>
                    </View>

                    <Text style={{ display: 'block', fontSize: '42rpx', lineHeight: 1.24, color: '#13223e', fontWeight: 900, letterSpacing: '-0.8rpx', marginBottom: '10rpx' }}>
                      {currentPackage.title}
                    </Text>

                    <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                      <View
                        style={{
                          marginRight: '8rpx',
                          marginBottom: '8rpx',
                          padding: '8rpx 14rpx',
                          borderRadius: '12rpx',
                          border: '2rpx solid #d9e2ef',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <Text style={{ fontSize: '18rpx', color: '#70829d', fontWeight: 700 }}>{currentStageLabel}</Text>
                      </View>
                      <View
                        style={{
                          marginRight: '8rpx',
                          marginBottom: '8rpx',
                          padding: '8rpx 14rpx',
                          borderRadius: '12rpx',
                          border: '2rpx solid #d9e2ef',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <Text style={{ fontSize: '18rpx', color: '#70829d', fontWeight: 700 }}>{stageCopy.label}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column', marginLeft: '14rpx' }}>
                  <Text style={{ fontSize: '18rpx', color: '#9aacbf', fontWeight: 700, marginBottom: '10rpx' }}>{page.mainSection.sideNote}</Text>
                  <View
                    style={{
                      minWidth: '112rpx',
                      height: '58rpx',
                      padding: '0 16rpx',
                      borderRadius: '16rpx',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${theme.accent}14`
                    }}
                  >
                    <Text style={{ fontSize: '20rpx', color: theme.accentDeep, fontWeight: 900 }}>{currentStageLabel}</Text>
                  </View>
                </View>
              </View>

              <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.84, color: '#566985', marginBottom: '22rpx' }}>
                {directionCopy.packageIntro}
              </Text>

              <View style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20rpx' }}>
                {(currentPackage.features || []).map((item) => (
                  <View
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '8rpx',
                      marginBottom: '8rpx',
                      padding: '8rpx 14rpx',
                      borderRadius: '12rpx',
                      border: '2rpx solid #d9e2ef',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <View
                      style={{
                        width: '18rpx',
                        height: '18rpx',
                        borderRadius: '999rpx',
                        border: `3rpx solid ${theme.accent}`,
                        marginRight: '8rpx',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Text style={{ fontSize: '18rpx', color: '#70829d', fontWeight: 700 }}>{item}</Text>
                  </View>
                ))}
              </View>

              <View
                style={{
                  padding: '24rpx 22rpx',
                  borderRadius: '22rpx',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10rpx 22rpx rgba(153,167,187,0.1)',
                  marginBottom: '20rpx'
                }}
              >
                <View style={{ display: 'flex', alignItems: 'center', marginBottom: '18rpx' }}>
                  <Text style={{ fontSize: '18rpx', color: '#9aacbf', fontWeight: 700, marginRight: '12rpx' }}>套系节奏</Text>
                  <Text style={{ fontSize: '24rpx', color: theme.accentDeep, fontWeight: 900 }}>{currentStageLabel}</Text>
                </View>
                <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.78, color: '#566985' }}>
                  {stageCopy.summary}
                </Text>
              </View>

              <DetailBlock color={theme.accent} label="适合谁先用这套资料？" value={currentPackage.target} />
              <DetailBlock color={theme.accent} label="这套资料主要解决什么问题？" value={currentPackage.solves} isLast />
            </View>

            <View style={{ padding: '24rpx 0 0', borderTop: '1rpx solid rgba(229,235,242,0.96)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24rpx 20rpx' }}>
                <Text style={{ fontSize: '36rpx', color: '#1b2a45', fontWeight: 900, letterSpacing: '-0.4rpx' }}>{page.shelfSection.title}</Text>
                <Text style={{ fontSize: '22rpx', color: '#9aa9c1', fontWeight: 700 }}>{page.shelfSection.hint} ›</Text>
              </View>

              <ScrollView scrollX enhanced showScrollbar={false}>
                <View style={{ display: 'flex', padding: '0 18rpx 8rpx 18rpx', boxSizing: 'border-box' }}>
                  {shelfItems.map((item, index) => (
                    <View
                      key={item._id}
                      style={{
                        width: '270rpx',
                        marginRight: '18rpx',
                        opacity: isSwitching ? 0.92 : 1,
                        transform: isSwitching ? 'translateY(4rpx)' : 'translateY(0)',
                        transition: 'opacity 340ms ease, transform 340ms ease',
                        transitionDelay: `${index * 40}ms`
                      }}
                    >
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

              <View style={{ padding: '10rpx 24rpx 28rpx' }}>
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
                  <Text style={{ fontSize: '24rpx', color: '#ffffff', fontWeight: 900 }}>{stageCopy.action} 〉</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={{ padding: `34rpx ${ui.spacing.page} 0` }}>
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
            {page.consultBar.title}
          </Text>
          <Text style={{ display: 'block', fontSize: '22rpx', lineHeight: 1.74, color: 'rgba(226,232,240,0.82)', marginBottom: '24rpx' }}>
            {page.consultBar.desc}
          </Text>

          {directionCopy.supportPoints.map((item, index) => (
            <View
              key={item}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: index === directionCopy.supportPoints.length - 1 ? '0' : '18rpx'
              }}
            >
              <SupportPointIcon color={theme.accent}>{getSupportSymbol(index)}</SupportPointIcon>
              <Text style={{ flex: 1, fontSize: '20rpx', lineHeight: 1.72, color: 'rgba(226,232,240,0.72)', marginLeft: '16rpx' }}>{item}</Text>
            </View>
          ))}

          <View
            style={{
              height: '84rpx',
              borderRadius: '22rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.consultButton,
              boxShadow: '0 18rpx 34rpx rgba(255,164,28,0.24)',
              marginTop: '22rpx'
            }}
          >
            <Text style={{ fontSize: '28rpx', color: '#ffffff', fontWeight: 800 }}>{page.consultBar.buttonText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
