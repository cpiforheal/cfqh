import {
  buildDailyQuestionMockPayload,
  buildPastPapersMockPayload,
  buildWrongBookMockPayload
} from '../data/questionBankMock';

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

export function getDailyQuestionPageData(userId = 'guest-medical') {
  return requestQuestionPayload(
    'dailyQuestion',
    { direction: 'medical', userId },
    () => buildDailyQuestionMockPayload(userId)
  );
}

export function getPastPapersPageData() {
  return requestQuestionPayload('pastPapers', { direction: 'medical' }, () => buildPastPapersMockPayload());
}

export function getWrongBookPageData(userId = 'guest-medical') {
  return requestQuestionPayload(
    'wrongBook',
    { direction: 'medical', userId },
    () => buildWrongBookMockPayload(userId)
  );
}
