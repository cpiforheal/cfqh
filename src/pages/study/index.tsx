import { Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PageSectionTitle from '../../components/PageSectionTitle';
import SkeletonScreen from '../../components/SkeletonScreen';
import fallbackContent from '../../data/contentFallback';
import { useCmsAutoRefresh } from '../../hooks/useCmsAutoRefresh';
import { getQuestionBankPageConfig } from '../../services/questionBank';
import {
  getDailyLearningState,
  getUserSession,
  getWrongBookLearningState,
  subscribeUserSession
} from '../../services/userIdentity';
import { elevatedSurfaceCardStyle, pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

const defaultQuestionBankPage = fallbackContent.pages.questionBank;

function MetricCard(props: { label: string; value: string | number; highlight?: boolean; note?: string }) {
  return (
    <View
      style={{
        width: '31.4%',
        ...surfaceCardStyle,
        borderRadius: '24rpx',
        padding: '20rpx 16rpx',
        minHeight: '150rpx',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700 }}>{props.label}</Text>
      <Text
        style={{
          display: 'block',
          marginTop: '14rpx',
          fontSize: props.highlight ? '44rpx' : '38rpx',
          lineHeight: 1,
          color: props.highlight ? '#ef4444' : ui.colors.text,
          fontWeight: 900
        }}
      >
        {props.value}
      </Text>
      {props.note ? (
        <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.5 }}>
          {props.note}
        </Text>
      ) : null}
    </View>
  );
}

function EntryCard(props: {
  eyebrow: string;
  title: string;
  desc: string;
  note: string;
  buttonText: string;
  url: string;
  primary?: boolean;
}) {
  return (
    <Navigator
      url={props.url}
      hoverClass="none"
      style={{ display: 'block', marginBottom: '18rpx' }}
    >
      <View
        style={{
          ...elevatedSurfaceCardStyle,
          borderRadius: '28rpx',
          padding: '26rpx 24rpx',
          background: props.primary
            ? 'linear-gradient(135deg, rgba(91,77,255,0.10) 0%, rgba(255,255,255,0.98) 35%, rgba(240,244,255,0.96) 100%)'
            : elevatedSurfaceCardStyle.background
        }}
      >
        <Text style={{ display: 'block', fontSize: ui.type.note, color: '#5b4dff', fontWeight: 800, marginBottom: '12rpx' }}>
          {props.eyebrow}
        </Text>
        <Text style={{ display: 'block', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900 }}>
          {props.title}
        </Text>
        <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.75 }}>
          {props.desc}
        </Text>
        <View
          style={{
            marginTop: '18rpx',
            padding: '16rpx 18rpx',
            borderRadius: '20rpx',
            backgroundColor: '#f8fafc',
            border: '1rpx solid rgba(226,232,240,0.86)'
          }}
        >
          <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSubtle, lineHeight: 1.6 }}>{props.note}</Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20rpx' }}>
          <Text style={{ fontSize: ui.type.note, color: ui.colors.textSoft }}>进入后直接开始，不需要先看长说明</Text>
          <View
            style={{
              minWidth: '176rpx',
              height: '68rpx',
              padding: '0 22rpx',
              borderRadius: ui.radius.pill,
              background: props.primary ? 'linear-gradient(90deg, #5b4dff 0%, #7c83ff 100%)' : '#eef2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: props.primary ? '#ffffff' : '#4338ca', fontWeight: 800 }}>
              {props.buttonText}
            </Text>
          </View>
        </View>
      </View>
    </Navigator>
  );
}

function TaskStepCard(props: {
  step: string;
  title: string;
  desc: string;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        width: '31.4%',
        ...surfaceCardStyle,
        borderRadius: '24rpx',
        padding: '20rpx 18rpx',
        minHeight: '174rpx',
        boxSizing: 'border-box',
        border: props.accent ? '1rpx solid rgba(124,131,255,0.22)' : '1rpx solid rgba(226,232,240,0.92)',
        background: props.accent ? 'linear-gradient(180deg, rgba(238,242,255,0.92) 0%, #ffffff 100%)' : surfaceCardStyle.background
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.meta, color: props.accent ? '#5b4dff' : ui.colors.textMuted, fontWeight: 800 }}>
        {props.step}
      </Text>
      <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800, lineHeight: 1.38 }}>
        {props.title}
      </Text>
      <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.65 }}>
        {props.desc}
      </Text>
    </View>
  );
}

export default function StudyPage() {
  const [session, setSession] = useState(() => getUserSession());
  const [pageConfig, setPageConfig] = useState(defaultQuestionBankPage);
  const [dailyState, setDailyState] = useState<any>(null);
  const [wrongBookState, setWrongBookState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadContent = useCallback(async () => {
    const currentSession = getUserSession();
    setSession(currentSession);
    const [nextConfig, nextDailyState, nextWrongBookState] = await Promise.all([
      getQuestionBankPageConfig(),
      getDailyLearningState('medical', currentSession.userId),
      getWrongBookLearningState('medical', currentSession.userId)
    ]);
    setPageConfig(nextConfig || defaultQuestionBankPage);
    setDailyState(nextDailyState);
    setWrongBookState(nextWrongBookState);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    const unsubscribe = subscribeUserSession(() => {
      loadContent();
    });
    return unsubscribe;
  }, [loadContent]);

  useCmsAutoRefresh(loadContent);

  const summary = wrongBookState?.summary || { pendingReview: 0, todayUpdated: 0, totalWrong: 0 };
  const signInRecord = dailyState?.signInRecord || { signed: false, streakCount: 0 };

  const primaryTask = useMemo(() => {
    if (summary.pendingReview > 0) {
      return {
        eyebrow: '当前优先任务',
        title: '先处理错题回炉',
        desc: `你现在还有 ${summary.pendingReview} 道题待复习，先把最该回炉的题做掉，再继续新增训练更稳。`,
        note: '系统会自动把优先级更高的题排在前面，进入后直接按队列推进即可。',
        buttonText: '进入错题本',
        url: '/pages/question-bank/wrong-book/index'
      };
    }

    return {
      eyebrow: '当前优先任务',
      title: '先完成今日一题',
      desc: signInRecord.signed
        ? '今天已经打卡，可以继续做每日一题保持题感和学习节奏。'
        : '先做一题并完成打卡，让今天的练习节奏先启动起来。',
      note: '题目提交后会自动进入学习记录；如果答错，系统会同步沉淀到错题本里。',
      buttonText: '进入每日一题',
      url: '/pages/question-bank/daily-question/index'
    };
  }, [signInRecord.signed, summary.pendingReview]);

  const followUpTask = summary.pendingReview > 0
    ? {
        eyebrow: '第二步',
        title: pageConfig.dailyQuestionCard.title || '每日一题',
        desc: signInRecord.signed
          ? '错题回炉后，继续做一题保持今天的题感，不需要再单独找入口。'
          : '如果还没打卡，错题回炉后顺手完成每日一题，把今天的学习节奏启动起来。',
        note: signInRecord.signed
          ? '今天已打卡，接下来更适合用每日一题维持手感。'
          : '做完还能顺手完成签到和记录沉淀。',
        buttonText: pageConfig.dailyQuestionCard.buttonText || '进入每日一题',
        url: '/pages/question-bank/daily-question/index'
      }
    : {
        eyebrow: '第二步',
        title: pageConfig.wrongBookCard.title || '错题本',
        desc: '今天做完新题后，记得回到错题本处理刚暴露出来的薄弱点，形成复盘闭环。',
        note: summary.totalWrong > 0 ? `现在累计已有 ${summary.totalWrong} 道错题沉淀。` : '一旦答错，系统会自动把题目沉淀进错题队列。',
        buttonText: pageConfig.wrongBookCard.buttonText || '回看错题',
        url: '/pages/question-bank/wrong-book/index'
      };

  if (loading) {
    return <SkeletonScreen type="full" />;
  }

  return (
    <View style={pageStyle}>
      <View style={{ margin: '24rpx 24rpx 0' }}>
        <View
          style={{
            ...elevatedSurfaceCardStyle,
            borderRadius: '34rpx',
            padding: '30rpx 24rpx',
            background: 'linear-gradient(135deg, rgba(248,250,255,0.98) 0%, rgba(255,255,255,1) 36%, rgba(240,244,255,0.98) 100%)'
          }}
        >
          <Text style={{ display: 'block', fontSize: ui.type.note, color: '#5b4dff', fontWeight: 800, marginBottom: '14rpx' }}>
            学习主线
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.hero, color: ui.colors.text, fontWeight: 900, lineHeight: 1.12 }}>
            题库练习
          </Text>
          <Text style={{ display: 'block', marginTop: '12rpx', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.8 }}>
            把练题、错题和签到收在同一条学习链路里。进入后先做当前最优先的一步，不需要自己再找入口。
          </Text>
          <View
            style={{
              marginTop: '20rpx',
              padding: '16rpx 18rpx',
              borderRadius: '22rpx',
              backgroundColor: session.mode === 'user' ? '#eefcf6' : '#f8fafc',
              border: `1rpx solid ${session.mode === 'user' ? 'rgba(16,185,129,0.16)' : 'rgba(226,232,240,0.88)'}`
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: session.mode === 'user' ? '#047857' : ui.colors.textMuted, lineHeight: 1.7, fontWeight: 700 }}>
              {session.mode === 'user'
                ? '学习档案已启用，你的签到、做题记录和错题回炉会自动沉淀。'
                : '现在可以先匿名浏览，提交题目或签到时会再轻登录并自动建立学习档案。'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ margin: '24rpx 24rpx 0', display: 'flex', justifyContent: 'space-between' }}>
        <MetricCard label="待复习" value={summary.pendingReview} highlight note="先处理这一批" />
        <MetricCard label="今日新增" value={summary.todayUpdated} note="今天新暴露的薄弱点" />
        <MetricCard label="累计错题" value={summary.totalWrong} note={signInRecord.signed ? `已连续打卡 ${signInRecord.streakCount || 0} 天` : '长期沉淀的复盘资产'} />
      </View>

      <View style={{ margin: '36rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">现在先做什么</PageSectionTitle>
        <EntryCard {...primaryTask} primary />
      </View>

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">今天这样推进</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TaskStepCard step="第一步" title={summary.pendingReview > 0 ? '先做回炉题' : '先做每日一题'} desc={summary.pendingReview > 0 ? '优先处理最该复习的薄弱点。' : '先把今天的练习节奏启动起来。'} accent />
          <TaskStepCard step="第二步" title={signInRecord.signed ? '继续保持题感' : '顺手完成打卡'} desc={signInRecord.signed ? '做一题或看解析，把练习延续下去。' : '提交后把今天的签到也一起完成。'} />
          <TaskStepCard step="第三步" title="再做整卷热身" desc="时间够的话，再做一套模拟卷检验状态。" />
        </View>
      </View>

      <View style={{ margin: '34rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">练习入口</PageSectionTitle>
        <EntryCard
          eyebrow="每日保持手感"
          title={pageConfig.dailyQuestionCard.title || '每日一题'}
          desc={pageConfig.dailyQuestionCard.desc || '固定练习题组，适合每天保持题感。'}
          note={signInRecord.signed ? '今天已完成签到，可以直接提交答案并记录到学习档案。' : '适合先启动今天的第一步，做完还能顺手完成打卡。'}
          buttonText={pageConfig.dailyQuestionCard.buttonText || '进入每日一题'}
          url="/pages/question-bank/daily-question/index"
        />
        <EntryCard
          eyebrow={followUpTask.eyebrow}
          title={followUpTask.title}
          desc={followUpTask.desc}
          note={followUpTask.note}
          buttonText={followUpTask.buttonText}
          url={followUpTask.url}
        />
        <EntryCard
          eyebrow="集中回炉薄弱点"
          title={pageConfig.wrongBookCard.title || '错题本'}
          desc={pageConfig.wrongBookCard.desc || '先做当前最该回炉的一题，再处理下方队列。'}
          note={`当前待复习 ${summary.pendingReview} 题，累计错题 ${summary.totalWrong} 题。`}
          buttonText={pageConfig.wrongBookCard.buttonText || '回看错题'}
          url="/pages/question-bank/wrong-book/index"
        />
        <EntryCard
          eyebrow="整卷热身与冲刺"
          title={pageConfig.pastPapersCard.title || '模拟题'}
          desc={pageConfig.pastPapersCard.desc || '按套练整卷，适合考前热身和节奏校准。'}
          note={pageConfig.pastPapersCard.note || '适合在每日练习之外，集中做一整套检验速度与稳定性。'}
          buttonText={pageConfig.pastPapersCard.buttonText || '进入模拟题'}
          url="/pages/question-bank/past-papers/index"
        />
      </View>
    </View>
  );
}
