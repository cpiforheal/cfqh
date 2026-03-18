import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageHomeButton from '../../../components/PageHomeButton';
import PageHero from '../../../components/PageHero';
import PageSectionTitle from '../../../components/PageSectionTitle';
import fallbackContent from '../../../data/contentFallback';
import { useCmsAutoRefresh } from '../../../hooks/useCmsAutoRefresh';
import { buildPastPapersMockPayload } from '../../../data/questionBankMock';
import { getPastPapersPageData, getQuestionBankPageConfig } from '../../../services/questionBank';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

const heroBackground = 'linear-gradient(135deg, #183754 0%, #18304a 58%, #102333 100%)';

function MiniMetric(props) {
  return (
    <View
      style={{
        minWidth: '160rpx',
        padding: '14rpx 16rpx',
        borderRadius: '20rpx',
        backgroundColor: 'rgba(255,255,255,0.12)',
        border: '1rpx solid rgba(255,255,255,0.14)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: '#c8d8eb', fontWeight: 700, marginBottom: '6rpx' }}>{props.label}</Text>
      <Text style={{ display: 'block', fontSize: ui.type.body, color: '#ffffff', fontWeight: 900 }}>{props.value}</Text>
    </View>
  );
}

function ToolButton(props) {
  return (
    <View
      onClick={props.onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: props.minWidth || '188rpx',
        height: '68rpx',
        padding: '0 22rpx',
        borderRadius: '22rpx',
        background: props.secondary ? '#ffffff' : 'linear-gradient(180deg, #38bdf8 0%, #2563eb 100%)',
        border: props.secondary ? '1rpx solid rgba(37,99,235,0.12)' : 'none',
        boxShadow: props.secondary ? 'none' : '0 12rpx 24rpx rgba(37,99,235,0.14)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ fontSize: ui.type.body, color: props.secondary ? '#1d4ed8' : '#ffffff', fontWeight: 800 }}>{props.children}</Text>
    </View>
  );
}

export default function PastPapersPage() {
  const [payload, setPayload] = useState(buildPastPapersMockPayload());
  const [pageConfig, setPageConfig] = useState(fallbackContent.pages.questionBank.pastPapersCard);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [activePaperId, setActivePaperId] = useState(payload.papers[0]?.id || '');

  const loadContent = useCallback(async () => {
    Taro.hideLoading();
    const [nextPayload, nextPageConfig] = await Promise.all([
      getPastPapersPageData(),
      getQuestionBankPageConfig()
    ]);

    setPayload(nextPayload);
    setPageConfig(nextPageConfig.pastPapersCard || fallbackContent.pages.questionBank.pastPapersCard);
    setActivePaperId((currentId) => {
      const visibleIds = new Set(nextPayload.papers.map((item) => item.id));
      return currentId && visibleIds.has(currentId) ? currentId : nextPayload.papers[0]?.id || '';
    });
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useCmsAutoRefresh(loadContent);

  const years = useMemo(() => ['all', ...payload.papers.map((item) => item.year)], [payload.papers]).filter(
    (value, index, list) => list.indexOf(value) === index
  );

  const visiblePapers = payload.papers.filter((item) => selectedYear === 'all' || item.year === selectedYear);
  const activePaper = visiblePapers.find((item) => item.id === activePaperId) || visiblePapers[0] || payload.papers[0];
  const activeQuestions = (activePaper?.questionIds || []).map((id) => payload.questionsById[id]).filter(Boolean);
  const totalQuestions = payload.papers.reduce((result, item) => result + item.questionIds.length, 0);

  function handleOpenPreview() {
    Taro.pageScrollTo({ scrollTop: 520, duration: 220 });
  }

  function handleStartPractice() {
    Taro.showToast({ title: '练习流程后续接入', icon: 'none' });
  }

  return (
    <View style={pageStyle}>
      <PageHero
        compact
        chip="考前冲刺"
        title={pageConfig.title || fallbackContent.pages.questionBank.pastPapersCard.title}
        desc={pageConfig.desc || fallbackContent.pages.questionBank.pastPapersCard.desc}
        background={heroBackground}
        bubbleColor="rgba(96,165,250,0.14)"
        headerRight={<PageHomeButton label="返回" />}
      >
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: '12rpx', marginBottom: pageConfig.note ? '12rpx' : '0' }}>
          <MiniMetric label="冲刺套数" value={`${payload.papers.length} 套`} />
          <MiniMetric label="可选批次" value={`${years.length - 1 || 0} 组`} />
          <MiniMetric label="题量总计" value={`${totalQuestions} 题`} />
        </View>
        {pageConfig.note ? (
          <Text style={{ display: 'block', fontSize: ui.type.note, color: '#dbeafe', fontWeight: 700 }}>
            {pageConfig.note}
          </Text>
        ) : null}
      </PageHero>

      <View style={{ margin: '-26rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: '28rpx',
            padding: '20rpx',
            boxShadow: '0 12rpx 26rpx rgba(37,99,235,0.08)'
          }}
        >
          <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18rpx', marginBottom: '16rpx' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ display: 'block', fontSize: ui.type.note, color: '#2563eb', fontWeight: 800, marginBottom: '8rpx' }}>当前套卷</Text>
              <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 900, marginBottom: '6rpx' }}>
                {activePaper?.title || '暂无试卷'}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted }}>
                当前筛选 {visiblePapers.length} 套 · 已选中 {activePaper?.questionIds.length || 0} 题
              </Text>
            </View>
            <View style={{ display: 'grid', gap: '10rpx' }}>
              <ToolButton onClick={handleOpenPreview}>查看套卷</ToolButton>
              <ToolButton secondary onClick={handleStartPractice}>
                立即刷题
              </ToolButton>
            </View>
          </View>

          <View style={{ display: 'flex', flexWrap: 'wrap', gap: '10rpx' }}>
            {years.map((year) => {
              const active = selectedYear === year;
              return (
                <View
                  key={String(year)}
                  onClick={() => setSelectedYear(year as number | 'all')}
                  style={{
                    padding: '10rpx 16rpx',
                    borderRadius: ui.radius.pill,
                    backgroundColor: active ? '#1d4ed8' : '#f8fbff',
                    border: active ? 'none' : '1rpx solid rgba(191,219,254,0.8)'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: active ? '#ffffff' : '#1e3a8a', fontWeight: 800 }}>
                    {year === 'all' ? '全部套卷' : `${year} 版`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={{ margin: '28rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#3b82f6" marginBottom="18rpx">
          套卷列表
        </PageSectionTitle>
        {visiblePapers.map((paper) => {
          const active = paper.id === activePaper?.id;
          return (
            <View
              key={paper.id}
              onClick={() => setActivePaperId(paper.id)}
              style={{
                ...surfaceCardStyle,
                marginBottom: '14rpx',
                borderRadius: '26rpx',
                padding: '20rpx 18rpx',
                border: active ? '1rpx solid rgba(59,130,246,0.18)' : '1rpx solid rgba(226,232,240,0.86)',
                background: active ? 'linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)' : ui.colors.surfaceGradient,
                boxShadow: active ? '0 12rpx 24rpx rgba(59,130,246,0.08)' : '0 8rpx 18rpx rgba(148,163,184,0.06)'
              }}
            >
              <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14rpx' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, marginBottom: '6rpx' }}>{paper.title}</Text>
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.65, marginBottom: '10rpx' }}>
                    {paper.description}
                  </Text>
                  <Text style={{ fontSize: ui.type.note, color: active ? '#2563eb' : ui.colors.textMuted, fontWeight: 700 }}>
                    {paper.questionIds.length} 题 · {active ? '当前选中' : '点按切换'}
                  </Text>
                </View>
                <View style={{ display: 'grid', justifyItems: 'end', gap: '10rpx' }}>
                  <Text
                    style={{
                      fontSize: ui.type.note,
                      color: active ? '#1d4ed8' : ui.colors.textSubtle,
                      backgroundColor: active ? '#dbeafe' : '#f1f5f9',
                      padding: '8rpx 14rpx',
                      borderRadius: ui.radius.pill,
                      fontWeight: 800
                    }}
                  >
                    {paper.year} 版
                  </Text>
                  <Text style={{ fontSize: ui.type.note, color: '#64748b' }}>{active ? '已展开' : '查看'}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {activePaper ? (
        <View style={{ margin: '28rpx 24rpx 0' }}>
          <PageSectionTitle lineColor="#3b82f6" marginBottom="18rpx">
            套卷预览
          </PageSectionTitle>
          <View
            style={{
              ...surfaceCardStyle,
              borderRadius: '28rpx',
              padding: '22rpx 20rpx',
              boxShadow: '0 12rpx 24rpx rgba(148,163,184,0.08)'
            }}
          >
            <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14rpx', marginBottom: '16rpx' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '6rpx' }}>{activePaper.title}</Text>
                <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.75 }}>
                  共 {activeQuestions.length} 题，先热身，再整套冲刺。
                </Text>
              </View>
              <ToolButton onClick={handleStartPractice}>立即刷题</ToolButton>
            </View>

            <View style={{ display: 'grid', gap: '10rpx' }}>
              {activeQuestions.map((question, index) => (
                <View
                  key={question.id}
                  style={{
                    padding: '16rpx 16rpx',
                    borderRadius: '22rpx',
                    backgroundColor: '#f8fbff',
                    border: '1rpx solid rgba(219,234,254,0.82)'
                  }}
                >
                  <Text style={{ display: 'block', fontSize: ui.type.note, color: '#2563eb', fontWeight: 800, marginBottom: '6rpx' }}>第 {index + 1} 题</Text>
                  <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, lineHeight: 1.58, fontWeight: 700 }}>{question.stem}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
