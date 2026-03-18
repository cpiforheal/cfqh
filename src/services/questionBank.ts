import Taro from '@tarojs/taro';
import {
  buildDailyQuestionMockPayload,
  buildPastPapersMockPayload,
  buildWrongBookMockPayload
} from '../data/questionBankMock';
import { CMS_PREVIEW_BASE_URL, CMS_PREVIEW_ENABLED } from '../config/cms';
import { callCloudFunction } from './cloud';

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
  return withMeta(fallbackFactory(), 'fixed-question-bank', {
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

export function getDailyQuestionPageData(userId = 'guest-medical') {
  return requestQuestionPayload(
    'dailyQuestion',
    { direction: 'medical', userId },
    () => buildDailyQuestionMockPayload(userId)
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

export function getWrongBookPageData(userId = 'guest-medical') {
  return requestQuestionPayload(
    'wrongBook',
    { direction: 'medical', userId },
    () => buildWrongBookMockPayload(userId)
  );
}
