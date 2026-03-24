import Taro from '@tarojs/taro';
import {
  GUEST_USER_ID,
  buildDailyQuestionPayloadFromData,
  buildPastPapersMockPayload,
  getMedicalQuestionById
} from '../data/questionBankMock';
import fallbackContent from '../data/contentFallback';
import { CMS_PREVIEW_BASE_URL, CMS_PREVIEW_ENABLED } from '../config/cms';
import { callCloudFunction } from './cloud';
import { getPublicContent } from './content';
import { getDailyLearningState, getWrongBookLearningState } from './userIdentity';

function withMeta(payload, source, extras = {}) {
  return {
    ...payload,
    __meta: {
      source,
      transport: 'fixed-local',
      generatedAt: new Date().toISOString(),
      ...extras
    }
  };
}

async function requestQuestionPayload(action, params, fallbackFactory) {
  const payload = await fallbackFactory();
  return withMeta(payload, 'fixed-question-bank', {
    action,
    params,
    transport: 'fixed-local'
  });
}

function normalizeQuestionItem(item = {}) {
  const id = String(item.questionId || item.id || item._id || '').trim();
  if (!id) return null;

  return {
    id,
    direction: 'medical' as const,
    questionType: 'single_choice' as const,
    stem: String(item.stem || '').trim(),
    options: Array.isArray(item.options)
      ? item.options
          .map((option) => ({
            id: String(option?.id || '').trim(),
            text: String(option?.text || '').trim()
          }))
          .filter((option) => option.id && option.text)
      : [],
    answer: String(item.answer || '').trim(),
    explanation: String(item.explanation || '').trim(),
    year: Number(item.year) || new Date().getFullYear(),
    paperId: String(item.paperId || '').trim(),
    tags: Array.isArray(item.tags)
      ? item.tags.map((tag) => String(tag || '').trim()).filter(Boolean)
      : [],
    status: item.status === 'draft' ? 'draft' : 'published'
  };
}

function buildDerivedPapers(questionItems = []) {
  const paperMap = new Map();

  questionItems.forEach((item) => {
    const paperId = String(item.paperId || '').trim();
    if (!paperId) return;

    const current = paperMap.get(paperId) || {
      id: paperId,
      title: '',
      year: Number(item.year) || new Date().getFullYear(),
      direction: 'medical' as const,
      description: '',
      questionIds: [],
      status: 'published' as const
    };

    current.year = Math.max(current.year || 0, Number(item.year) || 0) || new Date().getFullYear();
    current.questionIds.push(item.id);
    paperMap.set(paperId, current);
  });

  return Array.from(paperMap.values())
    .map((paper, index) => ({
      ...paper,
      title: paper.title || `${paper.year} 医护模拟冲刺卷 ${String.fromCharCode(65 + index)}`,
      description: paper.description || '由后台题库自动整理，适合按套热身与冲刺练习。',
      questionIds: Array.from(new Set(paper.questionIds))
    }))
    .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id));
}

function normalizePaperItem(item = {}) {
  const id = String(item.paperId || item.id || item._id || '').trim();
  if (!id) return null;

  return {
    id,
    title: String(item.title || '').trim(),
    year: Number(item.year) || new Date().getFullYear(),
    direction: 'medical' as const,
    description: String(item.description || '').trim(),
    questionIds: Array.isArray(item.questionIds)
      ? item.questionIds.map((questionId) => String(questionId || '').trim()).filter(Boolean)
      : [],
    status: item.status === 'draft' ? 'draft' : 'published'
  };
}

function normalizePastPapersPayload(payload) {
  const questions = Array.isArray(payload?.medicalQuestions)
    ? payload.medicalQuestions.map(normalizeQuestionItem).filter(Boolean)
    : [];
  const questionsById = questions.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {});

  const explicitPapers = Array.isArray(payload?.pastPapers)
    ? payload.pastPapers.map(normalizePaperItem).filter(Boolean)
    : [];
  const explicitPaperIds = new Set(explicitPapers.map((paper) => paper.id));
  const derivedPapers = buildDerivedPapers(questions).filter((paper) => !explicitPaperIds.has(paper.id));
  const papers = [...explicitPapers, ...derivedPapers]
    .map((paper) => ({
      ...paper,
      title: paper.title || `${paper.year} 医护模拟冲刺卷`,
      description: paper.description || '适合考前整套热身与节奏校准。',
      questionIds: paper.questionIds.filter((questionId) => !!questionsById[questionId])
    }))
    .filter((paper) => paper.questionIds.length)
    .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id));

  if (!papers.length || !Object.keys(questionsById).length) {
    return null;
  }

  return {
    direction: 'medical' as const,
    papers,
    questionsById
  };
}

function normalizeQuestionBankCard(card = {}, fallbackCard = {}) {
  return {
    title: String(card?.title || fallbackCard?.title || '').trim(),
    desc: String(card?.desc || fallbackCard?.desc || '').trim(),
    buttonText: String(card?.buttonText || fallbackCard?.buttonText || '').trim(),
    note: String(card?.note || fallbackCard?.note || '').trim()
  };
}

function normalizeWrongBookStats(stats = {}, fallbackStats = {}) {
  return {
    pendingLabel: String(stats?.pendingLabel || fallbackStats?.pendingLabel || '').trim(),
    todayLabel: String(stats?.todayLabel || fallbackStats?.todayLabel || '').trim(),
    totalLabel: String(stats?.totalLabel || fallbackStats?.totalLabel || '').trim()
  };
}

function normalizeWrongBookTaskSection(section = {}, fallbackSection = {}) {
  return {
    eyebrow: String(section?.eyebrow || fallbackSection?.eyebrow || '').trim(),
    reasonLabel: String(section?.reasonLabel || fallbackSection?.reasonLabel || '').trim(),
    estimateLabel: String(section?.estimateLabel || fallbackSection?.estimateLabel || '').trim(),
    sourceLabel: String(section?.sourceLabel || fallbackSection?.sourceLabel || '').trim(),
    lastAnsweredLabel: String(section?.lastAnsweredLabel || fallbackSection?.lastAnsweredLabel || '').trim(),
    answerLabel: String(section?.answerLabel || fallbackSection?.answerLabel || '').trim(),
    primaryButtonText: String(section?.primaryButtonText || fallbackSection?.primaryButtonText || '').trim(),
    secondaryButtonText: String(section?.secondaryButtonText || fallbackSection?.secondaryButtonText || '').trim()
  };
}

function normalizeWrongBookQueueSection(section = {}, fallbackSection = {}) {
  return {
    title: String(section?.title || fallbackSection?.title || '').trim(),
    sortHint: String(section?.sortHint || fallbackSection?.sortHint || '').trim(),
    pendingLabel: String(section?.pendingLabel || fallbackSection?.pendingLabel || '').trim(),
    todayLabel: String(section?.todayLabel || fallbackSection?.todayLabel || '').trim(),
    masteredLabel: String(section?.masteredLabel || fallbackSection?.masteredLabel || '').trim(),
    emptyTitle: String(section?.emptyTitle || fallbackSection?.emptyTitle || '').trim(),
    emptyDesc: String(section?.emptyDesc || fallbackSection?.emptyDesc || '').trim()
  };
}

function normalizeWrongBookCard(card = {}, fallbackCard = {}) {
  const baseCard = normalizeQuestionBankCard(card, fallbackCard);

  return {
    ...baseCard,
    stats: normalizeWrongBookStats(card?.stats, fallbackCard?.stats),
    taskSection: normalizeWrongBookTaskSection(card?.taskSection, fallbackCard?.taskSection),
    queueSection: normalizeWrongBookQueueSection(card?.queueSection, fallbackCard?.queueSection)
  };
}

function normalizeQuestionBankPage(page = {}) {
  const fallbackPage = fallbackContent.pages.questionBank || {};

  return {
    ...fallbackPage,
    ...page,
    dailyQuestionCard: normalizeQuestionBankCard(page?.dailyQuestionCard, fallbackPage.dailyQuestionCard),
    pastPapersCard: normalizeQuestionBankCard(page?.pastPapersCard, fallbackPage.pastPapersCard),
    wrongBookCard: normalizeWrongBookCard(page?.wrongBookCard, fallbackPage.wrongBookCard)
  };
}

async function getQuestionBankPreviewPayload() {
  if (!CMS_PREVIEW_ENABLED) {
    return null;
  }

  try {
    const response = await Taro.request({
      url: `${CMS_PREVIEW_BASE_URL}/api/public/questionBank`,
      method: 'GET',
      timeout: 1500
    });
    const result = response.data;
    if (result?.ok && result.data) {
      return normalizePastPapersPayload(result.data);
    }
  } catch (error) {
    console.warn('[questionBank] 本地预览题库获取失败', error);
  }

  return null;
}

async function getQuestionBankCloudPayload() {
  try {
    const result = await callCloudFunction('publicContent', { pageKey: 'questionBank' });
    if (result?.ok && result.data) {
      return normalizePastPapersPayload(result.data);
    }
  } catch (error) {
    console.warn('[questionBank] 云端题库获取失败', error);
  }

  return null;
}

export async function getQuestionBankPageConfig() {
  try {
    const payload = await getPublicContent('questionBank');
    return normalizeQuestionBankPage(payload?.page || {});
  } catch (error) {
    console.warn('[questionBank] 题库页配置获取失败', error);
    return normalizeQuestionBankPage();
  }
}

export async function getDailyQuestionPageData(userId = GUEST_USER_ID) {
  const learningState = await getDailyLearningState('medical', userId);
  return requestQuestionPayload(
    'dailyQuestion',
    { direction: 'medical', userId },
    () =>
      buildDailyQuestionPayloadFromData({
        userId,
        practiceRecordsInput: learningState.latestDailyPractice ? [learningState.latestDailyPractice] : [],
        signInRecordsInput: [learningState.signInRecord]
      })
  );
}

export async function getPastPapersPageData() {
  const previewPayload = await getQuestionBankPreviewPayload();
  if (previewPayload) {
    return withMeta(previewPayload, 'local-preview', {
      action: 'pastPapers',
      transport: 'http-preview'
    });
  }

  const cloudPayload = await getQuestionBankCloudPayload();
  if (cloudPayload) {
    return withMeta(cloudPayload, 'cloud-question-bank', {
      action: 'pastPapers',
      transport: 'cloud-function'
    });
  }

  return requestQuestionPayload('pastPapers', { direction: 'medical' }, () => buildPastPapersMockPayload());
}

export async function getWrongBookPageData(userId = GUEST_USER_ID) {
  const learningState = await getWrongBookLearningState('medical', userId);
  return requestQuestionPayload(
    'wrongBook',
    { direction: 'medical', userId },
    () => ({
      direction: 'medical' as const,
      summary: learningState.summary,
      items: learningState.items
        .map((item) => {
          const question = getMedicalQuestionById(item.questionId);
          if (!question || !item.latestRecord) {
            return null;
          }

          return {
            question,
            latestRecord: item.latestRecord,
            reviewStatus: item.reviewStatus,
            wrongAttempts: item.wrongAttempts
          };
        })
        .filter(Boolean)
    })
  );
}
