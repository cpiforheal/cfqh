const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const COLLECTIONS = {
  users: 'app_users',
  practiceRecords: 'practice_records',
  signInRecords: 'sign_in_records',
  favoriteRecords: 'favorite_records',
  learningRecords: 'learning_records',
  wrongBookItems: 'wrong_book_items',
  studyProfiles: 'study_profiles'
};

function nowIso() {
  return new Date().toISOString();
}

function createUserId() {
  return `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function ok(data = {}) {
  return { ok: true, data };
}

function fail(message, extras = {}) {
  return { ok: false, message, ...extras };
}

function sanitizeText(value, fallback = '') {
  return String(value || fallback).trim();
}

function getDateText(value = nowIso()) {
  return sanitizeText(value, nowIso()).slice(0, 10);
}

function buildProfileDocId(userId, direction) {
  return `${userId}_${sanitizeText(direction, 'medical')}`;
}

function buildWrongBookDocId(userId, direction, questionId) {
  return `${userId}_${sanitizeText(direction, 'medical')}_${sanitizeText(questionId)}`;
}

function deriveReviewStatus(latestRecord, wrongAttempts) {
  if (!wrongAttempts) {
    return '已掌握';
  }
  if (latestRecord?.isCorrect) {
    return '已掌握';
  }
  if (getDateText(latestRecord?.answeredAt) === getDateText()) {
    return '今日新增';
  }
  return '待复习';
}

function buildWrongBookSummary(items = []) {
  return {
    totalWrong: items.length,
    pendingReview: items.filter((item) => item.reviewStatus !== '已掌握').length,
    todayUpdated: items.filter((item) => item.reviewStatus === '今日新增').length
  };
}

async function refreshWrongBookItem(userId, direction, questionId) {
  const recordsResult = await db
    .collection(COLLECTIONS.practiceRecords)
    .where({
      userId,
      direction,
      questionId
    })
    .orderBy('answeredAt', 'desc')
    .limit(100)
    .get()
    .catch(() => ({ data: [] }));

  const records = recordsResult.data || [];
  const wrongAttempts = records.filter((item) => !item.isCorrect).length;
  const docId = buildWrongBookDocId(userId, direction, questionId);

  if (!records.length || !wrongAttempts) {
    await db.collection(COLLECTIONS.wrongBookItems).doc(docId).remove().catch(() => null);
    return null;
  }

  const latestRecord = records[0];
  const payload = {
    _id: docId,
    userId,
    direction,
    questionId,
    wrongAttempts,
    totalAttempts: records.length,
    reviewStatus: deriveReviewStatus(latestRecord, wrongAttempts),
    latestRecord,
    lastAnsweredAt: sanitizeText(latestRecord?.answeredAt, nowIso()),
    firstWrongAt: sanitizeText(
      records.filter((item) => !item.isCorrect).slice(-1)[0]?.answeredAt,
      sanitizeText(latestRecord?.answeredAt, nowIso())
    ),
    updatedAt: nowIso()
  };

  await db.collection(COLLECTIONS.wrongBookItems).doc(docId).set({ data: payload });
  return payload;
}

async function refreshStudyProfile(userId, direction = 'medical') {
  const [wrongBookResult, practiceResult] = await Promise.all([
    db
      .collection(COLLECTIONS.wrongBookItems)
      .where({ userId, direction })
      .orderBy('lastAnsweredAt', 'desc')
      .limit(500)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.practiceRecords)
      .where({ userId, direction })
      .orderBy('answeredAt', 'desc')
      .limit(1)
      .get()
      .catch(() => ({ data: [] }))
  ]);

  const wrongBookItems = wrongBookResult.data || [];
  const summary = buildWrongBookSummary(wrongBookItems);
  const latestPractice = (practiceResult.data || [])[0] || null;
  const payload = {
    _id: buildProfileDocId(userId, direction),
    userId,
    direction,
    totalWrong: summary.totalWrong,
    pendingReview: summary.pendingReview,
    todayUpdated: summary.todayUpdated,
    wrongBookCount: wrongBookItems.length,
    lastAnsweredAt: sanitizeText(latestPractice?.answeredAt, ''),
    updatedAt: nowIso()
  };

  await db.collection(COLLECTIONS.studyProfiles).doc(payload._id).set({ data: payload });
  return payload;
}

async function ensureUserRecord(OPENID) {
  const userRef = db.collection(COLLECTIONS.users).doc(OPENID);
  const existing = await userRef.get().catch(() => ({ data: null }));

  if (existing.data?.userId) {
    const nextPayload = {
      ...existing.data,
      lastSeenAt: nowIso(),
      updatedAt: nowIso()
    };
    await userRef.update({
      data: {
        lastSeenAt: nextPayload.lastSeenAt,
        updatedAt: nextPayload.updatedAt
      }
    }).catch(() => null);
    return nextPayload;
  }

  const createdAt = nowIso();
  const nextUser = {
    _id: OPENID,
    openId: OPENID,
    userId: createUserId(),
    nickname: '学习用户',
    createdAt,
    updatedAt: createdAt,
    lastSeenAt: createdAt,
    status: 'active'
  };

  await userRef.set({ data: nextUser });
  return nextUser;
}

async function getSnapshot(userId, direction = 'medical') {
  const [practiceResult, signInResult, favoriteResult, learningResult, wrongBookResult, profileResult] = await Promise.all([
    db
      .collection(COLLECTIONS.practiceRecords)
      .where({ userId })
      .orderBy('answeredAt', 'desc')
      .limit(200)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.signInRecords)
      .where({ userId })
      .orderBy('date', 'desc')
      .limit(60)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.favoriteRecords)
      .where({ userId })
      .orderBy('updatedAt', 'desc')
      .limit(200)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.learningRecords)
      .where({ userId })
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.wrongBookItems)
      .where({ userId, direction })
      .orderBy('lastAnsweredAt', 'desc')
      .limit(200)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.studyProfiles)
      .doc(buildProfileDocId(userId, direction))
      .get()
      .catch(() => ({ data: null }))
  ]);

  const wrongBookItems = wrongBookResult.data || [];
  const studyProfile = profileResult.data?.userId ? profileResult.data : await refreshStudyProfile(userId, direction);

  return {
    practiceRecords: (practiceResult.data || []).filter((item) => !item.direction || item.direction === direction),
    signInRecords: signInResult.data || [],
    favoriteRecords: favoriteResult.data || [],
    learningRecords: learningResult.data || [],
    wrongBookItems,
    studyProfile
  };
}

async function getDailyLearningState(userId, direction = 'medical') {
  const today = getDateText();
  const [signInResult, latestDailyPracticeResult, profileResult] = await Promise.all([
    db
      .collection(COLLECTIONS.signInRecords)
      .doc(`${userId}_${today}`)
      .get()
      .catch(() => ({ data: null })),
    db
      .collection(COLLECTIONS.practiceRecords)
      .where({
        userId,
        direction,
        source: 'daily'
      })
      .orderBy('answeredAt', 'desc')
      .limit(1)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.studyProfiles)
      .doc(buildProfileDocId(userId, direction))
      .get()
      .catch(() => ({ data: null }))
  ]);

  return {
    signInRecord: signInResult.data?.userId
      ? signInResult.data
      : {
          userId,
          date: today,
          signed: false,
          streakCount: 0
        },
    latestDailyPractice: (latestDailyPracticeResult.data || [])[0] || null,
    studyProfile: profileResult.data?.userId ? profileResult.data : await refreshStudyProfile(userId, direction)
  };
}

async function getWrongBookState(userId, direction = 'medical') {
  const [itemsResult, profileResult] = await Promise.all([
    db
      .collection(COLLECTIONS.wrongBookItems)
      .where({ userId, direction })
      .orderBy('lastAnsweredAt', 'asc')
      .limit(500)
      .get()
      .catch(() => ({ data: [] })),
    db
      .collection(COLLECTIONS.studyProfiles)
      .doc(buildProfileDocId(userId, direction))
      .get()
      .catch(() => ({ data: null }))
  ]);

  const items = (itemsResult.data || []).sort((a, b) => {
    const order = { '待复习': 0, '今日新增': 1, '已掌握': 2 };
    const statusDiff = (order[a.reviewStatus] ?? 9) - (order[b.reviewStatus] ?? 9);
    if (statusDiff !== 0) {
      return statusDiff;
    }
    return new Date(a.lastAnsweredAt).getTime() - new Date(b.lastAnsweredAt).getTime();
  });

  const studyProfile = profileResult.data?.userId ? profileResult.data : await refreshStudyProfile(userId, direction);

  return {
    summary: buildWrongBookSummary(items),
    items,
    studyProfile
  };
}

async function savePracticeRecord(userId, record = {}) {
  const direction = sanitizeText(record.direction, 'medical');
  const payload = {
    userId,
    questionId: sanitizeText(record.questionId),
    answer: sanitizeText(record.answer),
    isCorrect: Boolean(record.isCorrect),
    answeredAt: sanitizeText(record.answeredAt, nowIso()),
    source: sanitizeText(record.source, 'daily'),
    direction,
    createdAt: nowIso()
  };

  if (!payload.questionId) {
    return fail('缺少题目编号');
  }

  await db.collection(COLLECTIONS.practiceRecords).add({ data: payload });
  const wrongBookItem = await refreshWrongBookItem(userId, direction, payload.questionId);
  const studyProfile = await refreshStudyProfile(userId, direction);
  return ok({
    ...payload,
    wrongBookItem,
    studyProfile
  });
}

async function saveSignInRecord(userId, record = {}) {
  const date = sanitizeText(record.date, nowIso().slice(0, 10));
  const payload = {
    userId,
    date,
    signed: true,
    streakCount: Number(record.streakCount) || 1,
    updatedAt: nowIso()
  };
  const docId = `${userId}_${date}`;

  await db.collection(COLLECTIONS.signInRecords).doc(docId).set({
    data: {
      _id: docId,
      ...payload,
      createdAt: payload.updatedAt
    }
  });

  return ok(payload);
}

async function toggleFavoriteRecord(userId, record = {}) {
  const targetType = sanitizeText(record.targetType, 'question');
  const targetId = sanitizeText(record.targetId);
  if (!targetId) {
    return fail('缺少收藏目标');
  }

  const docId = `${userId}_${targetType}_${targetId}`;
  const payload = {
    _id: docId,
    userId,
    targetType,
    targetId,
    title: sanitizeText(record.title),
    active: record.active !== false,
    createdAt: sanitizeText(record.createdAt, nowIso()),
    updatedAt: sanitizeText(record.updatedAt, nowIso())
  };

  await db.collection(COLLECTIONS.favoriteRecords).doc(docId).set({ data: payload });
  return ok(payload);
}

async function appendLearningRecord(userId, event = {}) {
  const payload = {
    userId,
    eventType: sanitizeText(event.eventType, 'view_daily_question'),
    pageKey: sanitizeText(event.pageKey, 'questionBank'),
    direction: sanitizeText(event.direction, 'medical'),
    questionId: sanitizeText(event.questionId),
    detail: typeof event.detail === 'object' && event.detail ? event.detail : {},
    createdAt: sanitizeText(event.createdAt, nowIso())
  };

  await db.collection(COLLECTIONS.learningRecords).add({ data: payload });
  return ok(payload);
}

exports.main = async (event = {}) => {
  const { OPENID } = cloud.getWXContext();
  if (!OPENID) {
    return fail('未获取到用户身份');
  }

  const action = sanitizeText(event.action);
  const user = await ensureUserRecord(OPENID);

  if (action === 'ensureUser') {
    return ok({
      userId: user.userId,
      nickname: user.nickname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  if (action === 'getSnapshot') {
    const snapshot = await getSnapshot(user.userId, sanitizeText(event.direction, 'medical'));
    return ok({
      userId: user.userId,
      ...snapshot
    });
  }

  if (action === 'getDailyLearningState') {
    const state = await getDailyLearningState(user.userId, sanitizeText(event.direction, 'medical'));
    return ok({
      userId: user.userId,
      ...state
    });
  }

  if (action === 'getWrongBookState') {
    const state = await getWrongBookState(user.userId, sanitizeText(event.direction, 'medical'));
    return ok({
      userId: user.userId,
      ...state
    });
  }

  if (action === 'savePractice') {
    return savePracticeRecord(user.userId, event.record);
  }

  if (action === 'signIn') {
    return saveSignInRecord(user.userId, event.record);
  }

  if (action === 'toggleFavorite') {
    return toggleFavoriteRecord(user.userId, event.record);
  }

  if (action === 'appendLearningEvent') {
    return appendLearningRecord(user.userId, event.event);
  }

  return fail('不支持的操作');
};
