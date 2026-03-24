import Taro from '@tarojs/taro';
import { Button, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import fallbackContent from '../../../data/contentFallback';
import { dailyPracticeCsvQuestions } from '../../../data/dailyPracticeCsvQuestions';
import { buildDailyQuestionMockPayload } from '../../../data/questionBankMock';
import { useCmsAutoRefresh } from '../../../hooks/useCmsAutoRefresh';
import { getDailyQuestionPageData, getQuestionBankPageConfig } from '../../../services/questionBank';
import {
  appendLearningEvent,
  ensureAuthenticatedUser,
  getUserSession,
  recordPracticeAction,
  recordSignInAction,
  subscribeUserSession
} from '../../../services/userIdentity';
import { pageStyle, ui } from '../../../styles/ui';

function goBackHome() {
  Taro.navigateBack({
    fail: () => {
      Taro.switchTab({ url: '/pages/home/index' });
    }
  });
}

function OptionRow(props) {
  return (
    <View
      onClick={props.onClick}
      onTap={props.onClick}
      onTouchEnd={props.onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '14rpx',
        padding: '14rpx 0',
        borderBottom: props.correct
          ? '1rpx solid rgba(15,118,110,0.18)'
          : props.wrong
          ? '1rpx solid rgba(239,68,68,0.14)'
          : '1rpx solid rgba(241,245,249,0.96)',
        backgroundColor: '#ffffff'
      }}
    >
      <View
        style={{
          width: '60rpx',
          height: '60rpx',
          borderRadius: '30rpx',
          backgroundColor: props.correct ? '#14b8a6' : props.wrong ? '#ef4444' : props.active ? '#14b8a6' : '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '16rpx',
          flexShrink: 0
        }}
      >
        <Text style={{ fontSize: ui.type.body, color: props.active || props.correct || props.wrong ? '#ffffff' : ui.colors.textSubtle, fontWeight: 800 }}>
          {props.id}
        </Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ display: 'block', fontSize: ui.type.body, color: ui.colors.text, lineHeight: 1.6, fontWeight: 700 }}>{props.text}</Text>
        {props.correct ? <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.note, color: '#0f766e', fontWeight: 800 }}>正确答案</Text> : null}
        {props.wrong ? <Text style={{ display: 'block', marginTop: '8rpx', fontSize: ui.type.note, color: '#dc2626', fontWeight: 800 }}>你的选择</Text> : null}
      </View>
    </View>
  );
}

function BottomBarAction(props) {
  return (
    <Button
      onClick={props.onClick}
      hoverClass="none"
      style={{
        width: props.wide ? '138rpx' : '118rpx',
        minHeight: '104rpx',
        padding: '0',
        margin: '0',
        background: 'transparent',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8rpx',
        lineHeight: 1.2
      }}
    >
      <Text
        style={{
          fontSize: '34rpx',
          lineHeight: 1,
          color: props.active ? '#4f46e5' : ui.colors.textSubtle,
          fontWeight: 800
        }}
      >
        {props.icon}
      </Text>
      <Text
        style={{
          fontSize: ui.type.note,
          color: props.active ? '#4338ca' : ui.colors.textMuted,
          fontWeight: 800
        }}
      >
        {props.label}
      </Text>
      {props.meta ? (
        <Text style={{ fontSize: '20rpx', color: ui.colors.textSubtle, fontWeight: 700 }}>
          {props.meta}
        </Text>
      ) : null}
    </Button>
  );
}

export default function DailyQuestionPage() {
  const [session, setSession] = useState(() => getUserSession());
  const [signInRecord, setSignInRecord] = useState(() => buildDailyQuestionMockPayload(session.userId).signInRecord);
  const [pageConfig, setPageConfig] = useState(fallbackContent.pages.questionBank.dailyQuestionCard);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedMap, setSubmittedMap] = useState<Record<string, boolean>>({});
  const [signed, setSigned] = useState(signInRecord.signed);
  const [submitting, setSubmitting] = useState(false);
  const [signing, setSigning] = useState(false);

  const questions = dailyPracticeCsvQuestions;
  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion?.id] || '';
  const submitted = Boolean(submittedMap[currentQuestion?.id]);
  const hasOfficialAnswer = Boolean((currentQuestion?.answer || '').trim());
  const isCorrect = submitted && hasOfficialAnswer && selectedOption === currentQuestion?.answer;
  const resultTone = submitted
    ? hasOfficialAnswer
      ? isCorrect
        ? 'correct'
        : 'wrong'
      : 'pending'
    : 'idle';

  const answeredCount = useMemo(
    () => Object.values(submittedMap).filter(Boolean).length,
    [submittedMap]
  );

  const loadPageConfig = useCallback(async () => {
    const currentSession = getUserSession();
    setSession(currentSession);
    const [nextPageConfig, nextDailyPayload] = await Promise.all([
      getQuestionBankPageConfig(),
      getDailyQuestionPageData(currentSession.userId)
    ]);
    setPageConfig(nextPageConfig.dailyQuestionCard || fallbackContent.pages.questionBank.dailyQuestionCard);
    setSignInRecord(nextDailyPayload.signInRecord);
    setSigned(Boolean(nextDailyPayload.signInRecord?.signed));
  }, []);

  useEffect(() => {
    loadPageConfig();
  }, [loadPageConfig]);

  useEffect(() => {
    const unsubscribe = subscribeUserSession((nextSession) => {
      setSession(nextSession);
      loadPageConfig();
    });
    return unsubscribe;
  }, [loadPageConfig]);

  useEffect(() => {
    if (session.mode === 'user') {
      appendLearningEvent({
        eventType: 'view_daily_question',
        pageKey: 'dailyQuestion',
        direction: 'medical',
        detail: { questionCount: questions.length }
      });
    }
  }, [session.mode, session.userId, questions.length]);

  useCmsAutoRefresh(loadPageConfig);

  function handleSelect(optionId: string) {
    if (submitted || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  }

  async function handleSubmit() {
    if (!currentQuestion) return;
    if (submitting) return;
    if (!selectedOption) {
      Taro.showToast({ title: '先选一个答案', icon: 'none' });
      return;
    }

    setSubmitting(true);
    try {
      const activeSession = await ensureAuthenticatedUser({
        content: '提交后会为你保存做题记录，并自动沉淀到错题与学习进度里。'
      });
      if (!activeSession) {
        return;
      }

      setSubmittedMap((prev) => ({
        ...prev,
        [currentQuestion.id]: true
      }));

      setSession(activeSession);
      await recordPracticeAction({
        questionId: currentQuestion.id,
        answer: selectedOption,
        isCorrect: hasOfficialAnswer ? selectedOption === currentQuestion.answer : true,
        source: 'daily',
        direction: 'medical'
      });
      await appendLearningEvent({
        eventType: 'submit_daily_question',
        pageKey: 'dailyQuestion',
        direction: 'medical',
        questionId: currentQuestion.id,
        detail: {
          selectedOption,
          hasOfficialAnswer,
          result: hasOfficialAnswer ? (selectedOption === currentQuestion.answer ? 'correct' : 'wrong') : 'saved'
        }
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSign() {
    if (signing) return;
    if (signed) {
      Taro.showToast({ title: '今天已打卡', icon: 'none' });
      return;
    }

    setSigning(true);
    try {
      const activeSession = await ensureAuthenticatedUser({
        content: '签到会和你的学习档案绑定，用于连续学习统计和任务提醒。'
      });
      if (!activeSession) {
        return;
      }

      const nextSignInRecord = await recordSignInAction();
      setSession(activeSession);
      setSigned(true);
      setSignInRecord(nextSignInRecord);
      await appendLearningEvent({
        eventType: 'sign_in',
        pageKey: 'dailyQuestion',
        direction: 'medical',
        detail: { streakCount: nextSignInRecord.streakCount }
      });
      Taro.showToast({ title: '今日已打卡', icon: 'success' });
    } finally {
      setSigning(false);
    }
  }

  function handleOpenAnalysis() {
    if (!submitted) {
      Taro.showToast({ title: '先提交答案', icon: 'none' });
      return;
    }
    Taro.pageScrollTo({ scrollTop: 1200, duration: 220 });
  }

  function handlePrev() {
    if (currentIndex === 0) {
      Taro.showToast({ title: '已经是第一题', icon: 'none' });
      return;
    }
    setCurrentIndex((value) => value - 1);
  }

  function handleNext() {
    if (currentIndex >= questions.length - 1) {
      Taro.showToast({ title: '已经是最后一题', icon: 'none' });
      return;
    }
    setCurrentIndex((value) => value + 1);
  }

  function handleSwiperChange(event) {
    setCurrentIndex(event.detail.current || 0);
  }

  const analysisBlock = submitted ? (
    <View
      style={{
        marginBottom: '14rpx',
        padding: '18rpx 18rpx',
        borderRadius: '26rpx',
        backgroundColor:
          resultTone === 'correct'
            ? '#ecfeff'
            : resultTone === 'wrong'
            ? '#fff7ed'
            : '#f8fafc',
        border:
          resultTone === 'correct'
            ? '1rpx solid rgba(45,212,191,0.24)'
            : resultTone === 'wrong'
            ? '1rpx solid rgba(251,146,60,0.24)'
            : '1rpx solid rgba(226,232,240,0.9)'
      }}
    >
      <Text
        style={{
          display: 'block',
          fontSize: ui.type.note,
          color:
            resultTone === 'correct'
              ? '#0f766e'
              : resultTone === 'wrong'
              ? '#c2410c'
              : ui.colors.textSubtle,
          fontWeight: 800,
          marginBottom: '8rpx'
        }}
      >
        {hasOfficialAnswer
          ? `${isCorrect ? '回答正确' : '回答错误'} · 正确答案 ${currentQuestion?.answer}`
          : '答案暂未开放 · 当前已记录你的选择'}
      </Text>
      <Text
        style={{
          display: 'block',
          fontSize: ui.type.meta,
          color:
            resultTone === 'correct'
              ? '#115e59'
              : resultTone === 'wrong'
              ? '#9a3412'
              : ui.colors.textMuted,
          lineHeight: 1.78
        }}
      >
        {hasOfficialAnswer
          ? currentQuestion?.explanation || '当前题目尚未补充解析。'
          : '这组每日练习当前使用固定题源，页面会先记录你的作答情况，后续如开放判题会直接在这里展示答案与解析。'}
      </Text>
    </View>
  ) : null;

  return (
    <View
      style={{
        ...pageStyle,
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        paddingBottom: '252rpx'
      }}
    >
      <View style={{ padding: '24rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
          <View onClick={goBackHome} style={{ display: 'flex', alignItems: 'center', minWidth: '96rpx', height: '60rpx' }}>
            <Text style={{ fontSize: '52rpx', color: ui.colors.text, lineHeight: 1, marginRight: '8rpx' }}>‹</Text>
            <Text style={{ fontSize: ui.type.note, color: ui.colors.textSubtle, fontWeight: 700 }}>返回</Text>
          </View>
          <Text style={{ fontSize: '42rpx', color: ui.colors.text, fontWeight: 900 }}>
            {pageConfig.title || fallbackContent.pages.questionBank.dailyQuestionCard.title}
          </Text>
          <View
            style={{
              minWidth: '136rpx',
              height: '56rpx',
              padding: '0 16rpx',
              borderRadius: ui.radius.pill,
              backgroundColor: '#ffffff',
              border: '1rpx solid rgba(226,232,240,0.86)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box'
            }}
          >
            <Text style={{ fontSize: ui.type.note, color: '#0f766e', fontWeight: 800 }}>{currentIndex + 1} / {questions.length}</Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18rpx 22rpx',
            borderRadius: '22rpx',
            backgroundColor: '#f8fafc',
            marginBottom: '16rpx'
          }}
        >
          <View>
            <Text style={{ display: 'block', fontSize: ui.type.note, color: '#0f766e', fontWeight: 800, marginBottom: '6rpx' }}>
              {pageConfig.desc || fallbackContent.pages.questionBank.dailyQuestionCard.desc}
            </Text>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted }}>
              {(pageConfig.note || fallbackContent.pages.questionBank.dailyQuestionCard.note || '当前使用固定题源') +
                ` · ${currentQuestion?.tags?.join(' / ') || '医护方向'}`}
            </Text>
          </View>
          <Text style={{ fontSize: ui.type.note, color: '#0f766e', fontWeight: 800 }}>
            已答 {answeredCount}/{questions.length}
          </Text>
        </View>

        <Swiper
          current={currentIndex}
          duration={280}
          onChange={handleSwiperChange}
          style={{ height: 'calc(100vh - 560rpx)' }}
        >
          {questions.map((question) => {
            const slideSelected = selectedAnswers[question.id] || '';
            const slideSubmitted = Boolean(submittedMap[question.id]);
            const slideHasOfficialAnswer = Boolean((question.answer || '').trim());
            return (
              <SwiperItem key={question.id}>
                <ScrollView scrollY style={{ height: '100%' }} showScrollbar={false}>
                    <View style={{ paddingRight: '2rpx', paddingBottom: '36rpx' }}>
                    <Text style={{ display: 'block', fontSize: ui.type.meta, color: '#0f766e', fontWeight: 800, marginBottom: '10rpx' }}>
                      单选题 · 第 {questions.findIndex((item) => item.id === question.id) + 1} 题
                    </Text>
                    <Text style={{ display: 'block', fontSize: '32rpx', color: ui.colors.text, fontWeight: 900, lineHeight: 1.58, marginBottom: '18rpx' }}>
                      {question.stem}
                    </Text>

	                    {question.options.map((option) => {
                      const active = slideSelected === option.id;
                      const correct = slideSubmitted && slideHasOfficialAnswer && question.answer === option.id;
                      const wrong = slideSubmitted && slideHasOfficialAnswer && active && question.answer !== option.id;

                      return (
                        <OptionRow
                          key={option.id}
                          id={option.id}
                          text={option.text}
                          active={active}
                          correct={correct}
                          wrong={wrong}
                          onClick={() => handleSelect(option.id)}
	                        />
	                      );
	                    })}
                    {question.id === currentQuestion?.id ? analysisBlock : null}
                  </View>
                </ScrollView>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
      <View
        style={{
          position: 'fixed',
          left: '0',
          right: '0',
          bottom: '0',
          padding: '12rpx 24rpx calc(env(safe-area-inset-bottom) + 10rpx)',
          backgroundColor: '#ffffff',
          borderTop: '1rpx solid rgba(226,232,240,0.86)',
          boxShadow: '0 -10rpx 28rpx rgba(15,23,42,0.06)',
          zIndex: 20
        }}
      >
        <View
          style={{
            position: 'relative',
            minHeight: '166rpx',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 8rpx'
          }}
        >
          <View style={{ width: '270rpx', display: 'flex', justifyContent: 'space-between' }}>
            <BottomBarAction
              icon="▦"
              label="题目"
              meta={`${currentIndex + 1}/${questions.length}`}
              active
              onClick={() => Taro.showToast({ title: `第 ${currentIndex + 1} 题`, icon: 'none' })}
            />
            <BottomBarAction icon="‹" label="上一题" onClick={handlePrev} />
          </View>

          <Button
            onClick={handleSign}
            hoverClass="none"
            style={{
              position: 'absolute',
              left: '50%',
              top: '-34rpx',
              transform: 'translateX(-50%)',
              width: '170rpx',
              height: '170rpx',
              margin: '0',
              padding: '0',
              borderRadius: '85rpx',
              border: '10rpx solid #ffffff',
              background: signed ? 'linear-gradient(180deg, #14b8a6 0%, #0f766e 100%)' : 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)',
              boxShadow: signed ? '0 18rpx 36rpx rgba(15,118,110,0.24)' : '0 18rpx 36rpx rgba(34,197,94,0.26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              zIndex: 3
            }}
          >
            <View style={{ display: 'grid', justifyItems: 'center', gap: '8rpx' }}>
              <Text style={{ fontSize: '34rpx', color: '#ffffff', fontWeight: 900 }}>
                {signing ? '...' : signed ? '已' : '签'}
              </Text>
              <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 800 }}>
                {signing ? '处理中' : signed ? '今日打卡' : '立即打卡'}
              </Text>
            </View>
          </Button>

          <View style={{ width: '290rpx', display: 'flex', justifyContent: 'space-between' }}>
            <BottomBarAction icon="›" label="下一题" onClick={handleNext} />
            <BottomBarAction
              icon="✓"
              label={submitted ? '解析' : '提交'}
              meta={submitted ? '查看本题解析' : submitting ? '正在提交...' : selectedOption ? '可提交' : '先选项'}
              active={submitted || Boolean(selectedOption)}
              wide
              onClick={submitted ? handleOpenAnalysis : handleSubmit}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
