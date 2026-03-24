import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import PageHomeButton from '../../../components/PageHomeButton';
import fallbackContent from '../../../data/contentFallback';
import { buildWrongBookMockPayload } from '../../../data/questionBankMock';
import type { PracticeSource, WrongBookItem } from '../../../data/questionBankMock';
import { useCmsAutoRefresh } from '../../../hooks/useCmsAutoRefresh';
import { getQuestionBankPageConfig, getWrongBookPageData } from '../../../services/questionBank';
import {
  appendLearningEvent,
  ensureAuthenticatedUser,
  getUserSession,
  subscribeUserSession
} from '../../../services/userIdentity';
import { elevatedSurfaceCardStyle, pageStyle, surfaceCardStyle, ui } from '../../../styles/ui';
import type { WrongBookCard as WrongBookCardConfig, WrongBookQueueSectionConfig } from '../../../types/content';

const sourceLabelMap = {
  daily: '每日练习',
  paper: '整卷训练',
  wrongbook: '错题回炉'
};

const statusToneMap = {
  '待复习': {
    text: '#b45309',
    bg: '#fff7ed',
    border: 'rgba(251,146,60,0.24)'
  },
  '今日新增': {
    text: '#2563eb',
    bg: '#eff6ff',
    border: 'rgba(96,165,250,0.24)'
  },
  '已掌握': {
    text: '#0f766e',
    bg: '#ecfeff',
    border: 'rgba(45,212,191,0.24)'
  }
};

function formatRelativeTime(dateText: string) {
  const target = new Date(dateText).getTime();
  if (!target) return '刚刚';

  const diff = Date.now() - target;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    return `${Math.max(1, Math.round(diff / minute))} 分钟前`;
  }

  if (diff < day) {
    return `${Math.max(1, Math.round(diff / hour))} 小时前`;
  }

  return `${Math.max(1, Math.round(diff / day))} 天前`;
}

function getPriorityReason(item: WrongBookItem | null) {
  if (!item) return '';
  if (item.reviewStatus === '今日新增') {
    return '今天刚暴露出的薄弱点，趁记忆还新鲜先补上。';
  }
  if (item.reviewStatus === '已掌握') {
    return '这题刚完成回炉，适合用解析快速确认是否真正吃透。';
  }
  if (item.wrongAttempts >= 2) {
    return `这题已经错过 ${item.wrongAttempts} 次，优先回炉更容易止损。`;
  }
  return '已经到了下一次回顾窗口，先做这一题最能稳住复盘节奏。';
}

function getEstimatedMinutes(item: WrongBookItem | null) {
  if (!item) return 0;
  if (item.question.stem.length > 40 || item.wrongAttempts >= 2) {
    return 4;
  }
  if (item.reviewStatus === '今日新增') {
    return 2;
  }
  return 3;
}

function getQuestionRoute(source: PracticeSource) {
  if (source === 'daily') {
    return '/pages/question-bank/daily-question/index';
  }
  return '/pages/question-bank/past-papers/index';
}

function getQueueStatusLabel(item: WrongBookItem, queueSection: WrongBookQueueSectionConfig) {
  if (item.reviewStatus === '今日新增') return queueSection.todayLabel;
  if (item.reviewStatus === '已掌握') return queueSection.masteredLabel;
  return queueSection.pendingLabel;
}

function StatusPill(props: { status: WrongBookItem['reviewStatus']; label: string }) {
  const tone = statusToneMap[props.status] || statusToneMap['待复习'];

  return (
    <View
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8rpx 16rpx',
        borderRadius: ui.radius.pill,
        backgroundColor: tone.bg,
        border: `1rpx solid ${tone.border}`,
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ fontSize: ui.type.note, color: tone.text, fontWeight: 800 }}>{props.label}</Text>
    </View>
  );
}

function MetricCard(props: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: '0',
        ...surfaceCardStyle,
        borderRadius: '26rpx',
        padding: '20rpx 18rpx',
        boxShadow: '0 8rpx 18rpx rgba(148,163,184,0.08)'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700, marginBottom: '10rpx' }}>
        {props.label}
      </Text>
      <Text
        style={{
          display: 'block',
          fontSize: props.highlight ? '50rpx' : '40rpx',
          lineHeight: 1,
          color: props.highlight ? '#ef4444' : ui.colors.text,
          fontWeight: props.highlight ? 900 : 800
        }}
      >
        {props.value}
      </Text>
    </View>
  );
}

function ActionButton(props: {
  label: string;
  onClick: () => void;
  secondary?: boolean;
  minWidth?: string;
}) {
  return (
    <View
      onClick={props.onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: props.minWidth || '196rpx',
        height: '82rpx',
        padding: '0 28rpx',
        borderRadius: '24rpx',
        background: props.secondary ? '#eef2ff' : 'linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%)',
        border: props.secondary ? '1rpx solid rgba(129,140,248,0.16)' : 'none',
        boxShadow: props.secondary ? 'none' : '0 16rpx 32rpx rgba(79,70,229,0.24)',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ fontSize: ui.type.button, color: props.secondary ? '#4338ca' : '#ffffff', fontWeight: 900 }}>
        {props.label}
      </Text>
    </View>
  );
}

function LockedEntryBadge() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((value) => !value);
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={{
        position: 'relative',
        width: '176rpx',
        height: '176rpx',
        margin: '8rpx auto 22rpx'
      }}
    >
      <View
        style={{
          position: 'absolute',
          inset: '0',
          borderRadius: '88rpx',
          background: 'rgba(99,102,241,0.10)',
          transform: pulse ? 'scale(1.08)' : 'scale(0.92)',
          opacity: pulse ? 0.28 : 0.72,
          transition: 'all 420ms ease'
        }}
      />
      <View
        style={{
          position: 'absolute',
          inset: '20rpx',
          borderRadius: '68rpx',
          background: 'rgba(129,140,248,0.12)',
          transform: pulse ? 'scale(0.94)' : 'scale(1.06)',
          opacity: pulse ? 0.82 : 0.42,
          transition: 'all 420ms ease'
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '104rpx',
          height: '104rpx',
          marginLeft: '-52rpx',
          marginTop: '-52rpx',
          borderRadius: '34rpx',
          background: 'linear-gradient(180deg, #ffffff 0%, #eef2ff 100%)',
          border: '1rpx solid rgba(129,140,248,0.18)',
          boxShadow: pulse ? '0 18rpx 36rpx rgba(99,102,241,0.16)' : '0 10rpx 20rpx rgba(99,102,241,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: pulse ? 'translateY(-4rpx)' : 'translateY(0)',
          transition: 'all 420ms ease'
        }}
      >
        <Text style={{ fontSize: '52rpx', lineHeight: 1, color: '#4f46e5', fontWeight: 900 }}>🔒</Text>
      </View>
    </View>
  );
}

export default function WrongBookPage() {
  const [session, setSession] = useState(() => getUserSession());
  const [payload, setPayload] = useState(() => buildWrongBookMockPayload(session.userId));
  const [pageConfig, setPageConfig] = useState<WrongBookCardConfig>(fallbackContent.pages.questionBank.wrongBookCard);
  const [expandedId, setExpandedId] = useState('');

  const loadContent = useCallback(async () => {
    Taro.hideLoading();
    const currentSession = getUserSession();
    setSession(currentSession);
    const [nextPayload, nextPageConfig] = await Promise.all([
      getWrongBookPageData(currentSession.userId),
      getQuestionBankPageConfig()
    ]);
    setPayload(nextPayload);
    setPageConfig(nextPageConfig.wrongBookCard || fallbackContent.pages.questionBank.wrongBookCard);
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    const unsubscribe = subscribeUserSession((nextSession) => {
      setSession(nextSession);
      loadContent();
    });
    return unsubscribe;
  }, [loadContent]);

  useEffect(() => {
    if (session.mode === 'user') {
      appendLearningEvent({
        eventType: 'view_wrong_book',
        pageKey: 'wrongBook',
        direction: 'medical',
        detail: {
          pendingReview: payload.summary.pendingReview,
          totalWrong: payload.summary.totalWrong
        }
      });
    }
  }, [payload.summary.pendingReview, payload.summary.totalWrong, session.mode, session.userId]);

  useCmsAutoRefresh(loadContent);

  const guestPreview = session.mode !== 'user';
  const focusItem = guestPreview ? null : payload.items.find((item) => item.reviewStatus !== '已掌握') || payload.items[0] || null;
  const queueItems = focusItem
    ? payload.items.filter((item) => item.question.id !== focusItem.question.id)
    : guestPreview
      ? []
      : payload.items;

  async function handleRetry(item: WrongBookItem | null = focusItem) {
    if (!item) return;
    const activeSession = await ensureAuthenticatedUser({
      content: '错题本会为你保存个人复习队列，登录后才能继续回炉练习。'
    });
    if (!activeSession) {
      return;
    }
    setSession(activeSession);
    await appendLearningEvent({
      eventType: 'open_wrong_book_retry',
      pageKey: 'wrongBook',
      direction: 'medical',
      questionId: item.question.id,
      detail: {
        source: item.latestRecord.source,
        reviewStatus: item.reviewStatus
      }
    });
    Taro.navigateTo({ url: getQuestionRoute(item.latestRecord.source) }).catch(() => {
      Taro.showToast({ title: '练习入口稍后接入', icon: 'none' });
    });
  }

  function toggleExplanation(questionId: string) {
    setExpandedId((current) => (current === questionId ? '' : questionId));
  }

  return (
    <View style={pageStyle}>
      <View style={{ padding: '24rpx 24rpx 0' }}>
        <View
          style={{
            ...elevatedSurfaceCardStyle,
            overflow: 'hidden',
            borderRadius: ui.radius.hero,
            padding: '26rpx 22rpx 24rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)'
          }}
        >
          <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20rpx', marginBottom: '22rpx' }}>
            <View style={{ flex: 1, minWidth: '0' }}>
              <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textSoft, fontWeight: 700, marginBottom: '8rpx' }}>
                复习任务页
              </Text>
              <Text style={{ display: 'block', fontSize: '48rpx', color: ui.colors.text, fontWeight: 900, lineHeight: 1.18, marginBottom: '10rpx' }}>
                {pageConfig.title || fallbackContent.pages.questionBank.wrongBookCard.title}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textSoft, lineHeight: 1.75 }}>
                {pageConfig.desc || fallbackContent.pages.questionBank.wrongBookCard.desc}
              </Text>
            </View>
            <PageHomeButton label="返回" />
          </View>

          <View style={{ display: 'flex', gap: '14rpx' }}>
            <MetricCard
              label={pageConfig.stats.pendingLabel || fallbackContent.pages.questionBank.wrongBookCard.stats.pendingLabel}
              value={payload.summary.pendingReview}
              highlight
            />
            <MetricCard
              label={pageConfig.stats.todayLabel || fallbackContent.pages.questionBank.wrongBookCard.stats.todayLabel}
              value={`+${payload.summary.todayUpdated}`}
            />
            <MetricCard
              label={pageConfig.stats.totalLabel || fallbackContent.pages.questionBank.wrongBookCard.stats.totalLabel}
              value={payload.summary.totalWrong}
            />
          </View>

          {pageConfig.note ? (
            <Text style={{ display: 'block', marginTop: '16rpx', fontSize: ui.type.meta, color: ui.colors.textSoft }}>
              {pageConfig.note}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ padding: '28rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900, marginBottom: '6rpx' }}>
              {pageConfig.taskSection.eyebrow || fallbackContent.pages.questionBank.wrongBookCard.taskSection.eyebrow}
            </Text>
            <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft }}>
              先完成这一题，再往下处理后面的复习队列。
            </Text>
          </View>
          <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700 }}>
            {focusItem ? `${pageConfig.taskSection.estimateLabel} ${getEstimatedMinutes(focusItem)} 分钟` : '暂无复习任务'}
          </Text>
        </View>

        <View
          style={{
            ...elevatedSurfaceCardStyle,
            borderRadius: '34rpx',
            padding: '22rpx',
            background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)',
            border: focusItem ? '1rpx solid rgba(99,102,241,0.18)' : '1rpx solid rgba(226,232,240,0.82)',
            boxShadow: '0 18rpx 42rpx rgba(99,102,241,0.12)'
          }}
        >
          {focusItem ? (
            <>
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16rpx', marginBottom: '18rpx' }}>
                <StatusPill
                  status={focusItem.reviewStatus}
                  label={getQueueStatusLabel(
                    focusItem,
                    pageConfig.queueSection || fallbackContent.pages.questionBank.wrongBookCard.queueSection
                  )}
                />
                <Text
                  style={{
                    padding: '10rpx 16rpx',
                    borderRadius: ui.radius.pill,
                    backgroundColor: '#eef2ff',
                    fontSize: ui.type.note,
                    color: '#6366f1',
                    fontWeight: 700
                  }}
                >
                  {sourceLabelMap[focusItem.latestRecord.source]}
                </Text>
              </View>

              <Text style={{ display: 'block', fontSize: '38rpx', color: ui.colors.text, fontWeight: 800, lineHeight: 1.5, marginBottom: '18rpx' }}>
                {focusItem.question.stem}
              </Text>

              <View
                style={{
                  display: 'flex',
                  gap: '12rpx',
                  marginBottom: '16rpx'
                }}
              >
                <View style={{ flex: 1, padding: '16rpx 18rpx', borderRadius: '22rpx', backgroundColor: '#f8fafc' }}>
                  <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 600, marginBottom: '6rpx' }}>
                    {pageConfig.taskSection.sourceLabel}
                  </Text>
                  <Text style={{ display: 'block', fontSize: ui.type.subtitle, color: ui.colors.textSubtle, fontWeight: 700 }}>
                    {sourceLabelMap[focusItem.latestRecord.source]}
                  </Text>
                </View>
                <View style={{ flex: 1, padding: '16rpx 18rpx', borderRadius: '22rpx', backgroundColor: '#f8fafc' }}>
                  <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 600, marginBottom: '6rpx' }}>
                    {pageConfig.taskSection.lastAnsweredLabel}
                  </Text>
                  <Text style={{ display: 'block', fontSize: ui.type.subtitle, color: ui.colors.textSubtle, fontWeight: 700 }}>
                    {formatRelativeTime(focusItem.latestRecord.answeredAt)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  padding: '18rpx 18rpx',
                  borderRadius: '24rpx',
                  background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)',
                  border: '1rpx solid rgba(129,140,248,0.12)',
                  marginBottom: '14rpx'
                }}
              >
                <Text style={{ display: 'block', fontSize: ui.type.note, color: '#6366f1', fontWeight: 700, marginBottom: '8rpx' }}>
                  {pageConfig.taskSection.reasonLabel}
                </Text>
                <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.72 }}>
                  {getPriorityReason(focusItem)}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12rpx',
                  marginBottom: '22rpx',
                  padding: '18rpx 18rpx',
                  borderRadius: '24rpx',
                  backgroundColor: '#f8fafc'
                }}
              >
                <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted, fontWeight: 700 }}>
                  {pageConfig.taskSection.answerLabel}
                </Text>
                <Text style={{ fontSize: ui.type.subtitle, color: '#ef4444', fontWeight: 800 }}>
                  {focusItem.latestRecord.answer}
                </Text>
              </View>

              <View style={{ display: 'flex', gap: '14rpx' }}>
                <ActionButton label={pageConfig.taskSection.primaryButtonText} onClick={() => handleRetry(focusItem)} />
                <ActionButton
                  label={expandedId === focusItem.question.id ? '收起解析' : pageConfig.taskSection.secondaryButtonText}
                  secondary
                  onClick={() => toggleExplanation(focusItem.question.id)}
                />
              </View>

              {expandedId === focusItem.question.id ? (
                <View
                  style={{
                    marginTop: '16rpx',
                    padding: '18rpx',
                    borderRadius: '24rpx',
                    backgroundColor: '#fffaf5',
                    border: '1rpx solid rgba(254,215,170,0.72)'
                  }}
                >
                  <Text style={{ display: 'block', fontSize: ui.type.note, color: '#c2410c', fontWeight: 800, marginBottom: '8rpx' }}>
                    正确答案：{focusItem.question.answer}
                  </Text>
                  <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.8 }}>
                    {focusItem.question.explanation}
                  </Text>
                </View>
              ) : null}
            </>
          ) : (
            <View style={{ padding: '24rpx 4rpx' }}>
              {guestPreview ? <LockedEntryBadge /> : null}
              <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
                {guestPreview ? '登录后生成你的错题复习队列' : pageConfig.queueSection.emptyTitle}
              </Text>
              <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.7 }}>
                {guestPreview ? '门户内容可以先浏览，但错题本、签到、收藏和学习记录会在轻登录后自动建立个人档案。' : pageConfig.queueSection.emptyDesc}
              </Text>
              {guestPreview ? (
                <View style={{ marginTop: '18rpx' }}>
                  <ActionButton
                    label="登录后查看我的错题"
                    onClick={async () => {
                      const activeSession = await ensureAuthenticatedUser({
                        content: '登录后会自动建立学习档案，并同步你的错题、签到和做题记录。'
                      });
                      if (activeSession) {
                        setSession(activeSession);
                        loadContent();
                      }
                    }}
                  />
                </View>
              ) : null}
            </View>
          )}
        </View>
      </View>

      <View style={{ padding: '30rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
          <Text style={{ fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900 }}>
            {pageConfig.queueSection.title}
          </Text>
          <Text style={{ fontSize: ui.type.note, color: '#818cf8', fontWeight: 700 }}>
            {pageConfig.queueSection.sortHint}
          </Text>
        </View>

        {queueItems.length ? (
          queueItems.map((item) => {
            const expanded = expandedId === item.question.id;

            return (
              <View
                key={item.question.id}
                style={{
                  ...surfaceCardStyle,
                  marginBottom: '16rpx',
                  borderRadius: '28rpx',
                  padding: '20rpx 18rpx',
                  border: `1rpx solid ${statusToneMap[item.reviewStatus].border}`,
                  boxShadow: '0 10rpx 20rpx rgba(148,163,184,0.08)'
                }}
              >
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12rpx', marginBottom: '14rpx' }}>
                  <View style={{ display: 'flex', alignItems: 'center', gap: '10rpx', flexWrap: 'wrap' }}>
                    <StatusPill
                      status={item.reviewStatus}
                      label={getQueueStatusLabel(
                        item,
                        pageConfig.queueSection || fallbackContent.pages.questionBank.wrongBookCard.queueSection
                      )}
                    />
                    <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700 }}>
                      {sourceLabelMap[item.latestRecord.source]}
                    </Text>
                  </View>
                  <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft }}>{formatRelativeTime(item.latestRecord.answeredAt)}</Text>
                </View>

                <Text style={{ display: 'block', fontSize: '30rpx', color: ui.colors.textSubtle, fontWeight: 700, lineHeight: 1.62, marginBottom: '12rpx' }}>
                  {item.question.stem}
                </Text>

                <View style={{ display: 'flex', alignItems: 'baseline', gap: '8rpx', marginBottom: '18rpx' }}>
                  <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700 }}>
                    {pageConfig.taskSection.answerLabel}
                  </Text>
                  <Text style={{ fontSize: ui.type.meta, color: ui.colors.textMuted }}>
                    {item.latestRecord.answer}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12rpx',
                    paddingTop: '16rpx',
                    borderTop: '1rpx solid rgba(226,232,240,0.88)'
                  }}
                >
                  <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft }}>
                    错因沉淀 {item.wrongAttempts} 次
                  </Text>
                  <View style={{ display: 'flex', gap: '10rpx' }}>
                    <ActionButton
                      label={expanded ? '收起' : pageConfig.taskSection.secondaryButtonText}
                      minWidth="148rpx"
                      secondary
                      onClick={() => toggleExplanation(item.question.id)}
                    />
                    <ActionButton
                      label={pageConfig.taskSection.primaryButtonText}
                      minWidth="148rpx"
                      onClick={() => handleRetry(item)}
                    />
                  </View>
                </View>

                {expanded ? (
                  <View
                    style={{
                      marginTop: '16rpx',
                      padding: '18rpx',
                      borderRadius: '24rpx',
                      backgroundColor: '#fffaf5',
                      border: '1rpx solid rgba(254,215,170,0.72)'
                    }}
                  >
                    <Text style={{ display: 'block', fontSize: ui.type.note, color: '#c2410c', fontWeight: 800, marginBottom: '8rpx' }}>
                      正确答案：{item.question.answer}
                    </Text>
                    <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted, lineHeight: 1.8 }}>
                      {item.question.explanation}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          })
        ) : (
          <View
            style={{
              ...surfaceCardStyle,
              borderRadius: '28rpx',
              padding: '30rpx 24rpx',
              textAlign: 'center'
            }}
          >
            <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 900, marginBottom: '10rpx' }}>
              {pageConfig.queueSection.emptyTitle}
            </Text>
            <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.7 }}>
              {pageConfig.queueSection.emptyDesc}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
