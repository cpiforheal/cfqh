import Taro from '@tarojs/taro';
import { ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { useMemo, useState } from 'react';
import { dailyPracticeCsvQuestions } from '../../../data/dailyPracticeCsvQuestions';
import { buildDailyQuestionMockPayload } from '../../../data/questionBankMock';
import { pageStyle, ui } from '../../../styles/ui';

function goBackHome() {
  Taro.navigateBack({
    fail: () => {
      Taro.switchTab({ url: '/pages/home/index' });
    }
  });
}

function FooterAction(props) {
  return (
    <View
      onClick={props.onClick}
      style={{
        width: '124rpx',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '10rpx',
        minHeight: '108rpx'
      }}
    >
      <Text
        style={{
          fontSize: '36rpx',
          lineHeight: 1,
          color: props.active ? '#ef4444' : ui.colors.textSubtle,
          fontWeight: 700
        }}
      >
        {props.icon}
      </Text>
      <Text
        style={{
          fontSize: ui.type.note,
          color: props.active ? '#ef4444' : ui.colors.textMuted,
          fontWeight: 700
        }}
      >
        {props.label}
      </Text>
      {props.meta ? (
        <Text style={{ fontSize: '20rpx', color: ui.colors.textSubtle, fontWeight: 600 }}>
          {props.meta}
        </Text>
      ) : null}
    </View>
  );
}

function CenterSignButton(props) {
  return (
    <View
      onClick={props.onClick}
      style={{
        position: 'absolute',
        left: '50%',
        top: '-44rpx',
        transform: 'translateX(-50%)',
        width: '164rpx',
        height: '164rpx',
        borderRadius: '82rpx',
        background: props.signed ? 'linear-gradient(180deg, #14b8a6 0%, #0f766e 100%)' : 'linear-gradient(180deg, #22c55e 0%, #16a34a 100%)',
        boxShadow: props.signed ? '0 18rpx 38rpx rgba(15,118,110,0.22)' : '0 18rpx 38rpx rgba(34,197,94,0.24)',
        border: '10rpx solid #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        boxSizing: 'border-box'
      }}
      >
      <View style={{ display: 'grid', justifyItems: 'center', gap: '6rpx' }}>
        <Text style={{ fontSize: '30rpx', color: '#ffffff', fontWeight: 900 }}>{props.signed ? '已' : '签'}</Text>
        <Text style={{ fontSize: '22rpx', color: '#ffffff', fontWeight: 800 }}>{props.signed ? '已打卡' : '打卡'}</Text>
      </View>
    </View>
  );
}

function OptionRow(props) {
  return (
    <View
      onClick={props.onClick}
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

export default function DailyQuestionPage() {
  const [signInRecord, setSignInRecord] = useState(() => buildDailyQuestionMockPayload().signInRecord);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedMap, setSubmittedMap] = useState<Record<string, boolean>>({});
  const [signed, setSigned] = useState(signInRecord.signed);

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

  const statusText = useMemo(() => {
    if (!submitted) {
      return selectedOption ? '待提交' : '未作答';
    }
    if (!hasOfficialAnswer) {
      return '待补答';
    }
    return isCorrect ? '答对' : '答错';
  }, [submitted, selectedOption, hasOfficialAnswer, isCorrect]);
  const answeredCount = useMemo(
    () => Object.values(submittedMap).filter(Boolean).length,
    [submittedMap]
  );

  function handleSelect(optionId: string) {
    if (submitted || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  }

  function handleSubmit() {
    if (!currentQuestion) return;
    if (!selectedOption) {
      Taro.showToast({ title: '先选一个答案', icon: 'none' });
      return;
    }
    setSubmittedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  }

  function handleSign() {
    if (signed) {
      Taro.showToast({ title: '今天已打卡', icon: 'none' });
      return;
    }
    setSigned(true);
    setSignInRecord((prev) => ({
      ...prev,
      signed: true,
      streakCount: (prev?.streakCount || 0) + 1
    }));
    Taro.showToast({ title: '今日已打卡', icon: 'success' });
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
          : '标准答案待补充 · 当前已记录你的选择'}
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
          : '这 10 道题来自你之前上传的 CSV，但该 CSV 当前没有 answer 和 explanation 字段内容，所以这里只能先记录作答，等你补齐答案后再开启真实判题。'}
      </Text>
    </View>
  ) : null;

  return (
    <View
      style={{
        ...pageStyle,
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        paddingBottom: '350rpx'
      }}
    >
      <View style={{ padding: '24rpx 24rpx 0' }}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18rpx' }}>
          <View onClick={goBackHome} style={{ display: 'flex', alignItems: 'center', minWidth: '96rpx', height: '60rpx' }}>
            <Text style={{ fontSize: '52rpx', color: ui.colors.text, lineHeight: 1, marginRight: '8rpx' }}>‹</Text>
            <Text style={{ fontSize: ui.type.note, color: ui.colors.textSubtle, fontWeight: 700 }}>返回</Text>
          </View>
          <Text style={{ fontSize: '42rpx', color: ui.colors.text, fontWeight: 900 }}>每日一练</Text>
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
              已上传 CSV 题组 · 10 道题
            </Text>
            <Text style={{ display: 'block', fontSize: ui.type.meta, color: ui.colors.textMuted }}>
              {currentQuestion?.tags?.join(' / ') || '医护方向'} · 标准答案待补充
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
          style={{ height: 'calc(100vh - 510rpx)' }}
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
          padding: '12rpx 0 calc(env(safe-area-inset-bottom) + 10rpx)',
          backgroundColor: '#ffffff',
          boxShadow: '0 -10rpx 28rpx rgba(15,23,42,0.06)',
          borderTop: '1rpx solid rgba(241,245,249,0.96)'
        }}
      >
        {analysisBlock}

        <View
          style={{
            position: 'relative',
            minHeight: '166rpx',
            paddingTop: '18rpx',
            backgroundColor: '#ffffff'
          }}
        >
          <CenterSignButton signed={signed} onClick={handleSign} />
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 32rpx'
            }}
          >
            <View style={{ display: 'flex', justifyContent: 'space-between', width: '250rpx' }}>
              <FooterAction
                icon="▦"
                label="题卡"
                meta={`${currentIndex + 1}/${questions.length}`}
                active
                onClick={() => Taro.showToast({ title: `第 ${currentIndex + 1} 题`, icon: 'none' })}
              />
              <FooterAction
                icon="◔"
                label="进度"
                meta={`${answeredCount} 已答`}
                onClick={() => Taro.showToast({ title: `已答 ${answeredCount} 题`, icon: 'none' })}
              />
            </View>

            <View style={{ width: '164rpx', flexShrink: 0 }} />

            <View style={{ display: 'flex', justifyContent: 'space-between', width: '250rpx' }}>
              <FooterAction
                icon="✓"
                label="提交"
                meta={selectedOption ? '可提交' : '先选项'}
                active={submitted || Boolean(selectedOption)}
                onClick={handleSubmit}
              />
              <FooterAction
                icon="✦"
                label="解析"
                meta={statusText}
                active={submitted}
                onClick={() => {
                  if (!submitted) {
                    Taro.showToast({ title: '先提交答案', icon: 'none' });
                    return;
                  }
                  Taro.pageScrollTo({ scrollTop: 1200, duration: 220 });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
