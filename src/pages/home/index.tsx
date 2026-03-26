import { Navigator, Text, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import SubjectPageShell from '../../components/SubjectPageShell';
import { getFallbackPublicContent, getPublicContent } from '../../services/content';
import type { HomePage, HomeQuickEntry, HomeResourceItem, HomeSubjectContent, OpenType } from '../../types/content';

const HOME_FALLBACK = getFallbackPublicContent('home').page as HomePage;

function normalizeOpenType(value: string | undefined): OpenType {
  return value === 'navigate' || value === 'switchTab' || value === 'redirectTo' || value === 'reLaunch' ? value : 'navigate';
}

function normalizeProgressPercent(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(0, Math.min(100, numeric));
}

function normalizeSubjectContent(subjectKey: 'math' | 'medical', source: Record<string, unknown> | undefined): HomeSubjectContent {
  const fallback = HOME_FALLBACK.subjects[subjectKey];
  const learningCard = ((source?.learningCard as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const quickEntries = Array.isArray(source?.quickEntries) ? source?.quickEntries : [];
  const resources = Array.isArray(source?.resources) ? source?.resources : [];

  return {
    learningCard: {
      ...fallback.learningCard,
      ...learningCard,
      actionOpenType: normalizeOpenType(String(learningCard.actionOpenType || fallback.learningCard.actionOpenType || 'navigate')),
      progressPercent: normalizeProgressPercent(learningCard.progressPercent, fallback.learningCard.progressPercent)
    },
    quickEntries: (quickEntries.length ? quickEntries : fallback.quickEntries).slice(0, 4).map((item, index) => {
      const fallbackItem = fallback.quickEntries[index] || fallback.quickEntries[0];
      const sourceItem = (item || {}) as Record<string, unknown>;
      return {
        ...fallbackItem,
        ...sourceItem,
        openType: normalizeOpenType(String(sourceItem.openType || fallbackItem.openType || 'navigate'))
      };
    }) as HomeQuickEntry[],
    resources: (resources.length ? resources : fallback.resources).slice(0, 2).map((item, index) => ({
      ...(fallback.resources[index] || fallback.resources[0]),
      ...((item || {}) as Record<string, unknown>)
    })) as HomeResourceItem[]
  };
}

function normalizeHomePage(data: Record<string, unknown> | null | undefined): HomePage {
  const source = (data || {}) as Record<string, unknown>;
  const header = ((source.header as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const subjects = ((source.subjects as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;

  return {
    header: {
      ...HOME_FALLBACK.header,
      title: String(header.title || HOME_FALLBACK.header.title),
      subtitle: String(header.subtitle || HOME_FALLBACK.header.subtitle),
      resourceSectionTitle: String(header.resourceSectionTitle || HOME_FALLBACK.header.resourceSectionTitle),
      resourceMoreText: String(header.resourceMoreText || HOME_FALLBACK.header.resourceMoreText)
    },
    subjects: {
      math: normalizeSubjectContent('math', subjects.math as Record<string, unknown> | undefined),
      medical: normalizeSubjectContent('medical', subjects.medical as Record<string, unknown> | undefined)
    }
  };
}

function getResourceTypeLabel(type: string) {
  return type === 'V' ? '公开课' : 'PDF资料';
}

function QuickEntryIcon(props: { kind: 'practice' | 'daily' | 'mock' | 'wrong'; accent: string; bg: string }) {
  const line = { background: props.accent };

  if (props.kind === 'practice') {
    return (
      <View
        style={{
          width: '76rpx',
          height: '76rpx',
          borderRadius: '22rpx',
          background: props.bg,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: '34rpx',
            height: '34rpx',
            borderRadius: '12rpx 12rpx 12rpx 4rpx',
            border: `3rpx solid ${props.accent}`,
            transform: 'rotate(-16deg)',
            position: 'relative'
          }}
        >
          <View style={{ position: 'absolute', right: '-8rpx', bottom: '-8rpx', width: '14rpx', height: '4rpx', borderRadius: '999rpx', ...line }} />
        </View>
      </View>
    );
  }

  if (props.kind === 'daily') {
    return (
      <View
        style={{
          width: '76rpx',
          height: '76rpx',
          borderRadius: '22rpx',
          background: props.bg,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: '36rpx',
            height: '36rpx',
            borderRadius: '999rpx',
            border: `3rpx solid ${props.accent}`,
            position: 'relative'
          }}
        >
          <View style={{ position: 'absolute', left: '50%', top: '4rpx', width: '4rpx', height: '12rpx', marginLeft: '-2rpx', borderRadius: '999rpx', ...line }} />
          <View
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '12rpx',
              height: '4rpx',
              marginLeft: '-1rpx',
              marginTop: '-2rpx',
              borderRadius: '999rpx',
              transform: 'rotate(-36deg)',
              transformOrigin: '0 50%',
              ...line
            }}
          />
          <View style={{ position: 'absolute', left: '50%', top: '-8rpx', width: '4rpx', height: '8rpx', marginLeft: '-2rpx', borderRadius: '999rpx', ...line }} />
        </View>
      </View>
    );
  }

  if (props.kind === 'mock') {
    return (
      <View
        style={{
          width: '76rpx',
          height: '76rpx',
          borderRadius: '22rpx',
          background: props.bg,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: '30rpx',
            height: '40rpx',
            borderRadius: '8rpx',
            border: `3rpx solid ${props.accent}`,
            position: 'relative'
          }}
        >
          <View style={{ position: 'absolute', left: '6rpx', top: '10rpx', width: '16rpx', height: '3rpx', borderRadius: '999rpx', ...line }} />
          <View style={{ position: 'absolute', left: '6rpx', top: '18rpx', width: '16rpx', height: '3rpx', borderRadius: '999rpx', ...line }} />
          <View style={{ position: 'absolute', left: '6rpx', top: '26rpx', width: '10rpx', height: '3rpx', borderRadius: '999rpx', ...line }} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: '76rpx',
        height: '76rpx',
        borderRadius: '22rpx',
        background: props.bg,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          width: '28rpx',
          height: '36rpx',
          borderRadius: '8rpx',
          border: `3rpx solid ${props.accent}`,
          position: 'relative'
        }}
      >
        <View style={{ position: 'absolute', left: '4rpx', right: '4rpx', top: '8rpx', height: '3rpx', borderRadius: '999rpx', ...line }} />
        <View style={{ position: 'absolute', left: '4rpx', right: '10rpx', top: '16rpx', height: '3rpx', borderRadius: '999rpx', ...line }} />
        <View
          style={{
            position: 'absolute',
            right: '-6rpx',
            top: '-8rpx',
            width: '14rpx',
            height: '14rpx',
            borderRadius: '999rpx',
            background: props.accent
          }}
        />
      </View>
    </View>
  );
}

function QuickEntry(props: HomeQuickEntry) {
  return (
    <Navigator url={props.url} openType={props.openType} hoverClass="none" style={{ width: '23.7%' }}>
      <View
        style={{
          borderRadius: '24rpx',
          padding: '16rpx 10rpx 18rpx',
          background: 'rgba(255,255,255,0.82)',
          border: '1rpx solid rgba(226,232,240,0.82)',
          boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.08)',
          backdropFilter: 'blur(18rpx)',
          minHeight: '170rpx',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <View style={{ marginBottom: '12rpx' }}>
          <QuickEntryIcon kind={props.kind} accent={props.accent} bg={props.bg} />
        </View>
        <Text style={{ display: 'block', fontSize: '20rpx', color: '#1f2937', fontWeight: 800, lineHeight: 1.35, textAlign: 'center' }}>{props.label}</Text>
        <Text style={{ display: 'block', marginTop: '6rpx', fontSize: '16rpx', color: '#8ea0ba', fontWeight: 600, lineHeight: 1.35, textAlign: 'center' }}>{props.note}</Text>
      </View>
    </Navigator>
  );
}

function ResourceCard(props: { item: HomeResourceItem; palette: { accentSoft: string; chipText: string } }) {
  return (
    <View
      style={{
        borderRadius: '30rpx',
        padding: '18rpx',
        background: 'rgba(255,255,255,0.9)',
        border: '1rpx solid rgba(226,232,240,0.84)',
        boxShadow: '0 14rpx 32rpx rgba(148,163,184,0.1)',
        display: 'flex',
        gap: '18rpx',
        alignItems: 'center',
        backdropFilter: 'blur(18rpx)'
      }}
    >
      <View
        style={{
          width: '136rpx',
          height: '136rpx',
          borderRadius: '24rpx',
          background: '#eff4fb',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: '46rpx', color: '#97a9c2', fontWeight: 700 }}>{props.item.type}</Text>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '34rpx',
            background: 'rgba(15,23,42,0.38)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: '16rpx', color: '#ffffff', fontWeight: 700 }}>{getResourceTypeLabel(props.item.type)}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ display: 'block', fontSize: '22rpx', color: '#0f172a', fontWeight: 900, lineHeight: 1.45 }}>{props.item.title}</Text>
        <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '18rpx', color: '#8ea0ba', fontWeight: 600 }}>{props.item.subtitle}</Text>
        <View style={{ display: 'flex', alignItems: 'center', gap: '12rpx', marginTop: '14rpx' }}>
          <View style={{ padding: '6rpx 14rpx', borderRadius: '999rpx', background: props.palette.accentSoft }}>
            <Text style={{ fontSize: '16rpx', color: props.palette.chipText, fontWeight: 800 }}>{props.item.chip}</Text>
          </View>
          <Text style={{ fontSize: '18rpx', color: '#94a3b8', fontWeight: 700 }}>{props.item.meta}</Text>
        </View>
      </View>
    </View>
  );
}

export default function HomePage() {
  const [page, setPage] = useState<HomePage>(() => HOME_FALLBACK);

  useEffect(() => {
    let active = true;

    getPublicContent('home')
      .then((payload) => {
        if (!active || !payload?.page) {
          return;
        }
        setPage(normalizeHomePage(payload.page as Record<string, unknown>));
      })
      .catch((error) => {
        console.warn('[home] 读取首页内容失败，继续使用回退内容', error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <SubjectPageShell
      title={page.header.title}
      subtitle={page.header.subtitle}
      children={({ subject, palette }) => {
        const subjectContent = page.subjects[subject];

        return (
          <View>
            <View
              style={{
                borderRadius: '34rpx',
                padding: '26rpx',
                background: 'rgba(255,255,255,0.9)',
                border: `1rpx solid ${palette.accentLine}`,
                boxShadow: `0 18rpx 36rpx ${palette.accentGlow}`,
                backdropFilter: 'blur(22rpx)',
                marginBottom: '24rpx'
              }}
            >
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18rpx' }}>
                <View>
                  <Text style={{ display: 'block', fontSize: '26rpx', color: '#0f172a', fontWeight: 900 }}>{subjectContent.learningCard.title}</Text>
                  <Text style={{ display: 'block', marginTop: '8rpx', fontSize: '20rpx', color: '#8ea0ba', fontWeight: 600 }}>
                    {subjectContent.learningCard.subtitle}
                  </Text>
                </View>
                <View style={{ padding: '10rpx 18rpx', borderRadius: '999rpx', background: palette.accentSoft }}>
                  <Text style={{ fontSize: '18rpx', color: palette.chipText, fontWeight: 800 }}>{subjectContent.learningCard.streakText}</Text>
                </View>
              </View>

              <View
                style={{
                  borderRadius: '26rpx',
                  padding: '20rpx 18rpx',
                  background: '#f4f7fb',
                  border: '1rpx solid rgba(226,232,240,0.82)',
                  marginBottom: '20rpx'
                }}
              >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16rpx' }}>
                  <Text style={{ fontSize: '22rpx', color: '#475569', fontWeight: 800 }}>{subjectContent.learningCard.taskLabel}</Text>
                  <Text style={{ fontSize: '22rpx', color: palette.accent, fontWeight: 900 }}>{subjectContent.learningCard.progressText}</Text>
                </View>
                <View style={{ height: '18rpx', borderRadius: '999rpx', background: '#d9e2ee', overflow: 'hidden' }}>
                  <View
                    style={{
                      width: `${subjectContent.learningCard.progressPercent}%`,
                      height: '18rpx',
                      borderRadius: '999rpx',
                      background: palette.accent
                    }}
                  />
                </View>
              </View>

              <Navigator
                url={subjectContent.learningCard.actionUrl}
                openType={subjectContent.learningCard.actionOpenType}
                hoverClass="none"
              >
                <View
                  style={{
                    height: '92rpx',
                    borderRadius: '24rpx',
                    background: palette.accent,
                    boxShadow: `0 18rpx 34rpx ${palette.accentGlow}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ fontSize: '30rpx', color: '#ffffff', fontWeight: 900 }}>{subjectContent.learningCard.actionText}</Text>
                </View>
              </Navigator>
            </View>

            <View style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', marginBottom: '30rpx' }}>
              {subjectContent.quickEntries.map((item, index) => (
                <QuickEntry key={`${subject}-${item.label}-${index}`} {...item} />
              ))}
            </View>

            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16rpx' }}>
              <Text style={{ fontSize: '26rpx', color: '#0f172a', fontWeight: 900 }}>{page.header.resourceSectionTitle}</Text>
              <Text style={{ fontSize: '18rpx', color: '#9aa9bf', fontWeight: 700 }}>{page.header.resourceMoreText}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: '14rpx' }}>
              {subjectContent.resources.map((item, index) => (
                <View key={`${subject}-${item.title}-${index}`}>
                  <ResourceCard item={item} palette={palette} />
                </View>
              ))}
            </View>
          </View>
        );
      }}
    />
  );
}
