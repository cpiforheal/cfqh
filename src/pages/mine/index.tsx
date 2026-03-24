import { Button, Navigator, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import PageSectionTitle from '../../components/PageSectionTitle';
import SkeletonScreen from '../../components/SkeletonScreen';
import {
  ensureAuthenticatedUser,
  getDailyLearningState,
  getUserSession,
  getWrongBookLearningState,
  subscribeUserSession
} from '../../services/userIdentity';
import { elevatedSurfaceCardStyle, pageStyle, surfaceCardStyle, ui } from '../../styles/ui';

function ProfileMetric(props: { label: string; value: string | number; note?: string }) {
  return (
    <View
      style={{
        width: '48.2%',
        ...surfaceCardStyle,
        borderRadius: '24rpx',
        padding: '22rpx 18rpx',
        marginBottom: '16rpx',
        boxSizing: 'border-box'
      }}
    >
      <Text style={{ display: 'block', fontSize: ui.type.note, color: ui.colors.textSoft, fontWeight: 700 }}>{props.label}</Text>
      <Text style={{ display: 'block', marginTop: '12rpx', fontSize: '40rpx', lineHeight: 1, color: ui.colors.text, fontWeight: 900 }}>
        {props.value}
      </Text>
      {props.note ? <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.55 }}>{props.note}</Text> : null}
    </View>
  );
}

function LinkRow(props: { title: string; desc: string; url: string; note?: string }) {
  return (
    <Navigator url={props.url} hoverClass="none" style={{ display: 'block', marginBottom: '16rpx' }}>
      <View
        style={{
          ...surfaceCardStyle,
          borderRadius: '24rpx',
          padding: '22rpx 20rpx'
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, minWidth: 0, paddingRight: '16rpx' }}>
            <Text style={{ display: 'block', fontSize: ui.type.cardTitle, color: ui.colors.text, fontWeight: 800 }}>{props.title}</Text>
            <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.note, color: ui.colors.textMuted, lineHeight: 1.65 }}>
              {props.desc}
            </Text>
            {props.note ? <Text style={{ display: 'block', marginTop: '10rpx', fontSize: ui.type.note, color: '#5b4dff', fontWeight: 700 }}>{props.note}</Text> : null}
          </View>
          <Text style={{ fontSize: '30rpx', color: '#94a3b8', fontWeight: 900 }}>›</Text>
        </View>
      </View>
    </Navigator>
  );
}

function ContinueCard(props: {
  eyebrow: string;
  title: string;
  desc: string;
  note: string;
  buttonText: string;
  url: string;
}) {
  return (
    <Navigator url={props.url} hoverClass="none" style={{ display: 'block' }}>
      <View
        style={{
          ...elevatedSurfaceCardStyle,
          borderRadius: '28rpx',
          padding: '26rpx 24rpx',
          background: 'linear-gradient(135deg, rgba(91,77,255,0.10) 0%, rgba(255,255,255,0.98) 35%, rgba(240,244,255,0.94) 100%)'
        }}
      >
        <Text style={{ display: 'block', fontSize: ui.type.note, color: '#5b4dff', fontWeight: 800 }}>{props.eyebrow}</Text>
        <Text style={{ display: 'block', marginTop: '12rpx', fontSize: ui.type.section, color: ui.colors.text, fontWeight: 900 }}>
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
        <View
          style={{
            marginTop: '20rpx',
            minWidth: '186rpx',
            height: '72rpx',
            padding: '0 24rpx',
            borderRadius: ui.radius.pill,
            background: 'linear-gradient(90deg, #5b4dff 0%, #7c83ff 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: ui.type.note, color: '#ffffff', fontWeight: 800 }}>{props.buttonText}</Text>
        </View>
      </View>
    </Navigator>
  );
}

export default function MinePage() {
  const [session, setSession] = useState(() => getUserSession());
  const [dailyState, setDailyState] = useState<any>(null);
  const [wrongBookState, setWrongBookState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authing, setAuthing] = useState(false);

  const loadContent = useCallback(async () => {
    const currentSession = getUserSession();
    setSession(currentSession);
    const [nextDailyState, nextWrongBookState] = await Promise.all([
      getDailyLearningState('medical', currentSession.userId),
      getWrongBookLearningState('medical', currentSession.userId)
    ]);
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

  async function handleEnableProfile() {
    if (authing) return;
    setAuthing(true);
    try {
      const nextSession = await ensureAuthenticatedUser({
        content: '开启后会自动保存你的错题、签到、做题记录和学习进度。'
      });
      if (nextSession) {
        setSession(nextSession);
        loadContent();
      }
    } finally {
      setAuthing(false);
    }
  }

  if (loading) {
    return <SkeletonScreen type="full" />;
  }

  const signInRecord = dailyState?.signInRecord || { signed: false, streakCount: 0 };
  const summary = wrongBookState?.summary || { pendingReview: 0, todayUpdated: 0, totalWrong: 0 };
  const continueTask = summary.pendingReview > 0
    ? {
        eyebrow: '今天继续这里',
        title: '先回炉错题',
        desc: `你还有 ${summary.pendingReview} 道题待复习，先把这批最该处理的题做掉，学习节奏会更稳。`,
        note: summary.todayUpdated > 0 ? `今天又新增了 ${summary.todayUpdated} 个薄弱点，处理完回炉题再继续新增训练。` : '系统已经按优先级排好顺序，进去后直接往下做就行。',
        buttonText: '进入错题本',
        url: '/pages/question-bank/wrong-book/index'
      }
    : {
        eyebrow: '今天继续这里',
        title: signInRecord.signed ? '继续做每日一题' : '先完成今日打卡',
        desc: signInRecord.signed
          ? '今天已经签到，接下来更适合继续做题保持手感。'
          : '还没有签到，先做一题并完成打卡，把今天的学习记录先建立起来。',
        note: '提交答案后，做题记录会自动沉淀到学习档案里。',
        buttonText: '进入每日一题',
        url: '/pages/question-bank/daily-question/index'
      };

  return (
    <View style={pageStyle}>
      <View style={{ margin: '24rpx 24rpx 0' }}>
        <View
          style={{
            ...elevatedSurfaceCardStyle,
            borderRadius: '34rpx',
            padding: '30rpx 24rpx',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(246,248,255,0.98) 42%, rgba(240,244,255,0.94) 100%)'
          }}
        >
          <Text style={{ display: 'block', fontSize: ui.type.note, color: '#5b4dff', fontWeight: 800, marginBottom: '12rpx' }}>
            我的学习
          </Text>
          <Text style={{ display: 'block', fontSize: ui.type.hero, color: ui.colors.text, fontWeight: 900, lineHeight: 1.12 }}>
            {session.mode === 'user' ? '学习档案已建立' : '先浏览，需要记录时再登录'}
          </Text>
          <Text style={{ display: 'block', marginTop: '12rpx', fontSize: ui.type.body, color: ui.colors.textMuted, lineHeight: 1.8 }}>
            {session.mode === 'user'
              ? '错题、签到、做题记录和学习轨迹都会自动挂到你的学习档案下，后面继续练题也会接着往下沉淀。'
              : '门户内容可以先匿名浏览。等你第一次提交题目、签到或打开错题本时，再轻登录并自动建立学习档案。'}
          </Text>
          <View
            style={{
              marginTop: '18rpx',
              padding: '16rpx 18rpx',
              borderRadius: '22rpx',
              backgroundColor: session.mode === 'user' ? '#eefcf6' : '#f8fafc',
              border: `1rpx solid ${session.mode === 'user' ? 'rgba(16,185,129,0.16)' : 'rgba(226,232,240,0.88)'}`
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: session.mode === 'user' ? '#047857' : ui.colors.textMuted, lineHeight: 1.7, fontWeight: 700 }}>
              当前身份：{session.mode === 'user' ? '已登录学习用户' : '访客模式'}
            </Text>
          </View>
          {session.mode !== 'user' ? (
            <Button
              onClick={handleEnableProfile}
              hoverClass="none"
              disabled={authing}
              style={{
                marginTop: '20rpx',
                height: '84rpx',
                borderRadius: '24rpx',
                background: 'linear-gradient(90deg, #5b4dff 0%, #7c83ff 100%)',
                color: '#ffffff',
                fontSize: ui.type.body,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none'
              }}
            >
              {authing ? '正在启用学习档案' : '开启学习档案'}
            </Button>
          ) : null}
        </View>
      </View>

      <View style={{ margin: '28rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">继续学习</PageSectionTitle>
        <ContinueCard {...continueTask} />
      </View>

      <View style={{ margin: '28rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">学习状态</PageSectionTitle>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <ProfileMetric label="连续签到" value={signInRecord.streakCount || 0} note={signInRecord.signed ? '今天已打卡' : '今天还没打卡'} />
          <ProfileMetric label="待复习" value={summary.pendingReview} note="错题回炉优先处理" />
          <ProfileMetric label="今日新增" value={summary.todayUpdated} note="今天新暴露的薄弱点" />
          <ProfileMetric label="累计错题" value={summary.totalWrong} note="长期沉淀的复盘资产" />
        </View>
      </View>

      <View style={{ margin: '28rpx 24rpx 0' }}>
        <PageSectionTitle lineColor="#7c83ff">常用入口</PageSectionTitle>
        <LinkRow
          title="错题本"
          desc="优先回炉当前最该复习的题，进去后直接按队列往下做。"
          note={summary.pendingReview > 0 ? `还有 ${summary.pendingReview} 题待处理` : '当前没有待复习题'}
          url="/pages/question-bank/wrong-book/index"
        />
        <LinkRow
          title="每日一题"
          desc="保持题感和节奏，提交后会自动沉淀到学习记录。"
          note={signInRecord.signed ? '今天已完成打卡' : '今天还可以顺手打卡'}
          url="/pages/question-bank/daily-question/index"
        />
        <LinkRow
          title="方向与课程"
          desc="如果你还没完全确定路线，可以先回到课程页继续判断当前更适合哪条备考线。"
          url="/pages/courses/index"
        />
      </View>
    </View>
  );
}
