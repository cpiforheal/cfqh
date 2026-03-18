import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import PageHomeButton from '../../../components/PageHomeButton';
import PageHero from '../../../components/PageHero';
import PageSectionTitle from '../../../components/PageSectionTitle';
import { buildWrongBookMockPayload } from '../../../data/questionBankMock';
import { getWrongBookPageData } from '../../../services/questionBank';
import { pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';

const heroBackground = 'linear-gradient(135deg, #4c2d12 0%, #3a2b18 56%, #1f2937 100%)';

function MiniMetric(props) {
  return (
    <View
      style={{
        minWidth: '154rpx',
        padding: '14rpx 16rpx',
        borderRadius: '20rpx',
        backgroundColor: 'rgba(255,255,255,0.12)',
        border: '1rpx solid rgba(255,255,255,0.14)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: '#f5d7bf', fontWeight: 700, marginBottom: '6rpx' }}>{props.label}</Text>
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
        background: props.secondary ? '#ffffff' : 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)',
        border: props.secondary ? '1rpx solid rgba(234,88,12,0.12)' : 'none',
        boxShadow: props.secondary ? 'none' : '0 12rpx 24rpx rgba(249,115,22,0.16)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ fontSize: ui.type.body, color: props.secondary ? '#9a3412' : '#ffffff', fontWeight: 800 }}>{props.children}</Text>
    </View>
  );
}

function SummaryCard(props) {
  return (
    <View
      style={{
        width: '31.5%',
        ...surfaceCardStyle,
        borderRadius: '22rpx',
        padding: '18rpx 12rpx',
        boxSizing: 'border-box',
        boxShadow: '0 8rpx 18rpx rgba(148,163,184,0.06)'
      }}
    >
      <Text style={{ display: 'block', textAlign: 'center', fontSize: ui.type.stat, color: ui.colors.text, fontWeight: 900, marginBottom: '6rpx' }}>
        {props.value}
      </Text>
      <Text style={{ display: 'block', textAlign: 'center', fontSize: ui.type.note, color: ui.colors.textMuted, fontWeight: 700 }}>{props.label}</Text>
    </View>
  );
}

export default function WrongBookPage() {
  const [payload, setPayload] = useState(buildWrongBookMockPayload());
  const [expandedId, setExpandedId] = useState('');

  useEffect(() => {
    Taro.hideLoading();
    getWrongBookPageData().then((result) => setPayload(result));
  }, []);

  const focusItem = payload.items.find((item) => item.reviewStatus === '待复习') || payload.items[0];

  function handleRetry() {
    Taro.showToast({ title: '重练流程后续接入', icon: 'none' });
  }

  function handleOpenFocus() {
    if (!focusItem) return;
    setExpandedId(focusItem.question.id);
    Taro.pageScrollTo({ scrollTop: 520, duration: 220 });
  }

  return (
    <View style={pageStyle}>
      <PageHero
        compact
        chip="复习任务"
        title="错题本"
        desc="先复习最该回看的那一题。"
        background={heroBackground}
        bubbleColor="rgba(251,146,60,0.14)"
        headerRight={<PageHomeButton label="返回" />}
      >
        <View style={{ display: 'flex', flexWrap: 'wrap', gap: '12rpx' }}>
          <MiniMetric label="待复习" value={`${payload.summary.pendingReview} 题`} />
          <MiniMetric label="今日新增" value={`${payload.summary.todayUpdated} 题`} />
          <MiniMetric label="累计错题" value={`${payload.summary.totalWrong} 题`} />
        </View>
      </PageHero>

      <View style={{ margin: '-26rpx 24rpx 0', position: 'relative', zIndex: 3 }}>
        <View
          style={{
            ...surfaceCardStyle,
            borderRadius: '28rpx',
            padding: '20rpx',
            boxShadow: '0 12rpx 26rpx rgba(249,115,22,0.08)'
          }}
        >
          <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18rpx', marginBottom: '18rpx' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ display: 'block', fontSize: ui.type.note, color: '#c2410c', fontWeight: 800, marginBottom: '8rpx' }}>下一条复习任务</Text>
              <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 900, marginBottom: '6rpx' }}>
                {focusItem ? focusItem.question.stem : '当前没有错题'}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted }}>
                {focusItem ? `来源 ${focusItem.latestRecord.source} · 上次作答 ${focusItem.latestRecord.answeredAt.slice(0, 10)}` : '继续保持当前状态'}
              </Text>
            </View>
            <View style={{ display: 'grid', gap: '10rpx' }}>
              <ToolButton onClick={handleRetry}>重新练习</ToolButton>
              <ToolButton secondary onClick={handleOpenFocus}>
                查看解析
              </ToolButton>
            </View>
          </View>

          <View style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SummaryCard value={payload.summary.totalWrong} label="累计错题" />
            <SummaryCard value={payload.summary.pendingReview} label="待复习" />
            <SummaryCard value={payload.summary.todayUpdated} label="今日新增" />
          </View>
        </View>
      </View>

      <View style={{ margin: '28rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#f97316" marginBottom="18rpx">
          错题列表
        </PageSectionTitle>
        {payload.items.map((item) => {
          const expanded = expandedId === item.question.id;

          return (
            <View
              key={item.question.id}
              style={{
                ...surfaceCardStyle,
                marginBottom: '14rpx',
                borderRadius: '26rpx',
                padding: '20rpx 18rpx',
                border: item.reviewStatus === '待复习' ? '1rpx solid rgba(251,146,60,0.18)' : '1rpx solid rgba(226,232,240,0.86)',
                boxShadow: '0 8rpx 18rpx rgba(148,163,184,0.06)'
              }}
            >
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12rpx', marginBottom: '12rpx' }}>
                <Text
                  style={{
                    fontSize: ui.type.note,
                    color: item.reviewStatus === '待复习' ? '#b45309' : '#0f766e',
                    backgroundColor: item.reviewStatus === '待复习' ? '#fff7ed' : '#ecfeff',
                    padding: '8rpx 14rpx',
                    borderRadius: ui.radius.pill,
                    fontWeight: 800
                  }}
                >
                  {item.reviewStatus}
                </Text>
                <Text style={{ fontSize: ui.type.note, color: ui.colors.textMuted }}>
                  {item.latestRecord.source} · {item.latestRecord.answeredAt.slice(0, 10)}
                </Text>
              </View>

              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, fontWeight: 800, lineHeight: 1.58, marginBottom: '8rpx' }}>
                {item.question.stem}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, marginBottom: '16rpx' }}>
                你的答案：{item.latestRecord.answer}
              </Text>

              <View style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10rpx' }}>
                <ToolButton minWidth="176rpx" onClick={handleRetry}>
                  重新练习
                </ToolButton>
                <ToolButton
                  minWidth="176rpx"
                  secondary
                  onClick={() => setExpandedId(expanded ? '' : item.question.id)}
                >
                  {expanded ? '收起解析' : '查看解析'}
                </ToolButton>
              </View>

              {expanded ? (
                <View
                  style={{
                    marginTop: '14rpx',
                    padding: '16rpx 16rpx',
                    borderRadius: '22rpx',
                    backgroundColor: '#fffaf5',
                    border: '1rpx solid rgba(254,215,170,0.74)'
                  }}
                >
                  <Text style={{ display: 'block', fontSize: ui.type.note, color: '#c2410c', fontWeight: 800, marginBottom: '8rpx' }}>
                    正确答案：{item.question.answer}
                  </Text>
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.78 }}>
                    {item.question.explanation}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
