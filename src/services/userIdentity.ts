import Taro from '@tarojs/taro';
import type { PracticeSource, QuestionDirection, PracticeRecord, SignInRecord } from '../data/questionBankMock';
import {
  GUEST_USER_ID,
  buildWrongBookPayloadFromData,
  getTodayDateText
} from '../data/questionBankMock';
import { callCloudFunction } from './cloud';

const SESSION_STORAGE_KEY = 'cfqh:user-session:v1';
const PRACTICE_STORAGE_KEY = 'cfqh:practice-records:v1';
const SIGN_IN_STORAGE_KEY = 'cfqh:sign-in-records:v1';
const FAVORITE_STORAGE_KEY = 'cfqh:favorite-records:v1';
const LEARNING_STORAGE_KEY = 'cfqh:learning-records:v1';

type SessionMode = 'guest' | 'user';

export interface AppUserSession {
  mode: SessionMode;
  userId: string;
  nickname: string;
  authProvider: 'guest' | 'wechat-cloud' | 'local-fallback';
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteRecord {
  userId: string;
  targetType: 'question' | 'paper' | 'article';
  targetId: string;
  title?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearningRecord {
  userId: string;
  eventType:
    | 'view_daily_question'
    | 'submit_daily_question'
    | 'view_wrong_book'
    | 'open_wrong_book_retry'
    | 'sign_in'
    | 'favorite';
  pageKey: string;
  direction?: QuestionDirection;
  questionId?: string;
  createdAt: string;
  detail?: Record<string, any>;
}

export interface UserLearningSnapshot {
  practiceRecords: PracticeRecord[];
  signInRecords: SignInRecord[];
  favoriteRecords: FavoriteRecord[];
  learningRecords: LearningRecord[];
}

export interface StudyProfile {
  userId: string;
  direction: QuestionDirection;
  totalWrong: number;
  pendingReview: number;
  todayUpdated: number;
  wrongBookCount: number;
  lastAnsweredAt: string;
  updatedAt: string;
}

export interface WrongBookStateItem {
  questionId: string;
  reviewStatus: '待复习' | '已掌握' | '今日新增';
  wrongAttempts: number;
  totalAttempts?: number;
  latestRecord: PracticeRecord;
  updatedAt?: string;
}

export interface WrongBookLearningState {
  summary: {
    totalWrong: number;
    pendingReview: number;
    todayUpdated: number;
  };
  items: WrongBookStateItem[];
  studyProfile: StudyProfile | null;
}

export interface DailyLearningState {
  signInRecord: SignInRecord;
  latestDailyPractice: PracticeRecord | null;
  studyProfile: StudyProfile | null;
}

let sessionCache: AppUserSession | null = null;
const sessionListeners = new Set<(session: AppUserSession) => void>();

function getTimestamp() {
  return new Date().toISOString();
}

function createGuestSession(): AppUserSession {
  const now = getTimestamp();
  const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return {
    mode: 'guest',
    userId: `${GUEST_USER_ID}-${seed}`,
    nickname: '访客同学',
    authProvider: 'guest',
    createdAt: now,
    updatedAt: now
  };
}

function createLocalFallbackSession(): AppUserSession {
  const now = getTimestamp();
  const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return {
    mode: 'user',
    userId: `local-${seed}`,
    nickname: '学习用户',
    authProvider: 'local-fallback',
    createdAt: now,
    updatedAt: now
  };
}

function readStorage<T>(key: string, fallbackValue: T): T {
  try {
    const value = Taro.getStorageSync(key);
    return value || fallbackValue;
  } catch (error) {
    console.warn('[identity] 读取本地缓存失败', key, error);
    return fallbackValue;
  }
}

function writeStorage(key: string, value: any) {
  try {
    Taro.setStorageSync(key, value);
  } catch (error) {
    console.warn('[identity] 写入本地缓存失败', key, error);
  }
}

function emitSessionChange(session: AppUserSession) {
  sessionListeners.forEach((listener) => {
    try {
      listener(session);
    } catch (error) {
      console.warn('[identity] session listener error', error);
    }
  });
}

export function hydrateUserSession() {
  if (sessionCache) {
    return sessionCache;
  }

  const stored = readStorage<AppUserSession | null>(SESSION_STORAGE_KEY, null);
  sessionCache = stored?.userId ? stored : createGuestSession();
  writeStorage(SESSION_STORAGE_KEY, sessionCache);
  return sessionCache;
}

export function getUserSession() {
  return hydrateUserSession();
}

export function subscribeUserSession(listener: (session: AppUserSession) => void) {
  sessionListeners.add(listener);
  return () => {
    sessionListeners.delete(listener);
  };
}

function setUserSession(nextSession: AppUserSession) {
  sessionCache = {
    ...nextSession,
    updatedAt: getTimestamp()
  };
  writeStorage(SESSION_STORAGE_KEY, sessionCache);
  emitSessionChange(sessionCache);
  return sessionCache;
}

function getLocalPracticeRecords() {
  return readStorage<PracticeRecord[]>(PRACTICE_STORAGE_KEY, []);
}

function setLocalPracticeRecords(records: PracticeRecord[]) {
  writeStorage(PRACTICE_STORAGE_KEY, records);
}

function getLocalSignInRecords() {
  return readStorage<SignInRecord[]>(SIGN_IN_STORAGE_KEY, []);
}

function setLocalSignInRecords(records: SignInRecord[]) {
  writeStorage(SIGN_IN_STORAGE_KEY, records);
}

function getLocalFavoriteRecords() {
  return readStorage<FavoriteRecord[]>(FAVORITE_STORAGE_KEY, []);
}

function setLocalFavoriteRecords(records: FavoriteRecord[]) {
  writeStorage(FAVORITE_STORAGE_KEY, records);
}

function getLocalLearningRecords() {
  return readStorage<LearningRecord[]>(LEARNING_STORAGE_KEY, []);
}

function setLocalLearningRecords(records: LearningRecord[]) {
  writeStorage(LEARNING_STORAGE_KEY, records);
}

function withUserFilter<T extends { userId: string }>(records: T[], userId: string) {
  return records.filter((item) => item.userId === userId);
}

function buildLocalStudyProfile(userId: string, direction: QuestionDirection): StudyProfile {
  const payload = buildWrongBookPayloadFromData({
    userId,
    practiceRecordsInput: withUserFilter(getLocalPracticeRecords(), userId).filter(
      (item) => !item.direction || item.direction === direction
    )
  });
  const sortedRecords = withUserFilter(getLocalPracticeRecords(), userId)
    .filter((item) => !item.direction || item.direction === direction)
    .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime());

  return {
    userId,
    direction,
    totalWrong: payload.summary.totalWrong,
    pendingReview: payload.summary.pendingReview,
    todayUpdated: payload.summary.todayUpdated,
    wrongBookCount: payload.items.length,
    lastAnsweredAt: sortedRecords[0]?.answeredAt || '',
    updatedAt: getTimestamp()
  };
}

export async function ensureAuthenticatedUser(options?: {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
}) {
  const currentSession = getUserSession();
  if (currentSession.mode === 'user') {
    return currentSession;
  }

  try {
    Taro.showLoading({
      title: options?.title || '正在启用学习档案',
      mask: true
    });
    const result = await callCloudFunction('appUser', { action: 'ensureUser' });
    if (result?.ok && result.data?.userId) {
      const nextSession = setUserSession({
        mode: 'user',
        userId: String(result.data.userId),
        nickname: String(result.data.nickname || '学习用户'),
        authProvider: 'wechat-cloud',
        createdAt: String(result.data.createdAt || getTimestamp()),
        updatedAt: String(result.data.updatedAt || getTimestamp())
      });
      Taro.hideLoading();
      Taro.showToast({ title: '已开启学习进度同步', icon: 'success' });
      return nextSession;
    }
    throw new Error(result?.message || '登录失败');
  } catch (error) {
    console.warn('[identity] 云端轻登录失败，已回退本地身份', error);
    const fallbackSession = setUserSession(createLocalFallbackSession());
    Taro.hideLoading();
    Taro.showToast({ title: '当前使用本机学习档案', icon: 'none' });
    return fallbackSession;
  }
}

export async function getUserLearningSnapshot(userId = getUserSession().userId, direction: QuestionDirection = 'medical') {
  const guestSnapshot: UserLearningSnapshot = {
    practiceRecords: withUserFilter(getLocalPracticeRecords(), userId).filter(
      (item) => !item.direction || item.direction === direction
    ),
    signInRecords: withUserFilter(getLocalSignInRecords(), userId),
    favoriteRecords: withUserFilter(getLocalFavoriteRecords(), userId),
    learningRecords: withUserFilter(getLocalLearningRecords(), userId)
  };

  const currentSession = getUserSession();
  if (
    currentSession.userId !== userId ||
    currentSession.mode !== 'user' ||
    currentSession.authProvider === 'local-fallback'
  ) {
    return guestSnapshot;
  }

  try {
    const result = await callCloudFunction('appUser', {
      action: 'getSnapshot',
      direction
    });
    if (result?.ok && result.data) {
      return {
        practiceRecords: Array.isArray(result.data.practiceRecords) ? result.data.practiceRecords : [],
        signInRecords: Array.isArray(result.data.signInRecords) ? result.data.signInRecords : [],
        favoriteRecords: Array.isArray(result.data.favoriteRecords) ? result.data.favoriteRecords : [],
        learningRecords: Array.isArray(result.data.learningRecords) ? result.data.learningRecords : []
      };
    }
  } catch (error) {
    console.warn('[identity] 获取云端学习快照失败，使用本地快照', error);
  }

  return guestSnapshot;
}

export async function getDailyLearningState(
  direction: QuestionDirection = 'medical',
  userId = getUserSession().userId
): Promise<DailyLearningState> {
  const currentSession = getUserSession();
  const localSignInRecord =
    withUserFilter(getLocalSignInRecords(), userId).find((item) => item.date === getTodayDateText()) || {
      userId,
      date: getTodayDateText(),
      signed: false,
      streakCount: 0
    };
  const localLatestDailyPractice =
    withUserFilter(getLocalPracticeRecords(), userId)
      .filter((item) => item.source === 'daily' && (!item.direction || item.direction === direction))
      .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime())[0] || null;
  const localState: DailyLearningState = {
    signInRecord: localSignInRecord,
    latestDailyPractice: localLatestDailyPractice,
    studyProfile: buildLocalStudyProfile(userId, direction)
  };

  if (
    currentSession.userId !== userId ||
    currentSession.mode !== 'user' ||
    currentSession.authProvider === 'local-fallback'
  ) {
    return localState;
  }

  try {
    const result = await callCloudFunction('appUser', {
      action: 'getDailyLearningState',
      direction
    });
    if (result?.ok && result.data) {
      return {
        signInRecord: result.data.signInRecord || localSignInRecord,
        latestDailyPractice: result.data.latestDailyPractice || null,
        studyProfile: result.data.studyProfile || localState.studyProfile
      };
    }
  } catch (error) {
    console.warn('[identity] 获取每日学习状态失败，使用本地状态', error);
  }

  return localState;
}

export async function getWrongBookLearningState(
  direction: QuestionDirection = 'medical',
  userId = getUserSession().userId
): Promise<WrongBookLearningState> {
  const currentSession = getUserSession();
  const localPayload = buildWrongBookPayloadFromData({
    userId,
    practiceRecordsInput: withUserFilter(getLocalPracticeRecords(), userId).filter(
      (item) => !item.direction || item.direction === direction
    )
  });
  const localState: WrongBookLearningState = {
    summary: localPayload.summary,
    items: localPayload.items.map((item) => ({
      questionId: item.question.id,
      reviewStatus: item.reviewStatus,
      wrongAttempts: item.wrongAttempts,
      latestRecord: item.latestRecord,
      updatedAt: item.latestRecord.answeredAt
    })),
    studyProfile: buildLocalStudyProfile(userId, direction)
  };

  if (
    currentSession.userId !== userId ||
    currentSession.mode !== 'user' ||
    currentSession.authProvider === 'local-fallback'
  ) {
    return localState;
  }

  try {
    const result = await callCloudFunction('appUser', {
      action: 'getWrongBookState',
      direction
    });
    if (result?.ok && result.data) {
      return {
        summary: result.data.summary || localState.summary,
        items: Array.isArray(result.data.items) ? result.data.items : localState.items,
        studyProfile: result.data.studyProfile || localState.studyProfile
      };
    }
  } catch (error) {
    console.warn('[identity] 获取错题本聚合状态失败，使用本地状态', error);
  }

  return localState;
}

export async function recordPracticeAction(input: {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  source: PracticeSource;
  direction?: QuestionDirection;
}) {
  const currentSession = getUserSession();
  const record: PracticeRecord = {
    userId: currentSession.userId,
    questionId: input.questionId,
    answer: input.answer,
    isCorrect: input.isCorrect,
    answeredAt: getTimestamp(),
    source: input.source,
    direction: input.direction || 'medical'
  };

  const nextLocalRecords = [...getLocalPracticeRecords(), record];
  setLocalPracticeRecords(nextLocalRecords);

  if (currentSession.mode === 'user' && currentSession.authProvider !== 'local-fallback') {
    try {
      await callCloudFunction('appUser', {
        action: 'savePractice',
        record
      });
    } catch (error) {
      console.warn('[identity] 保存练习记录到云端失败', error);
    }
  }

  return record;
}

export async function recordSignInAction() {
  const currentSession = getUserSession();
  const today = getTodayDateText();
  const signInRecords = getLocalSignInRecords();
  const lastRecord = withUserFilter(signInRecords, currentSession.userId)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-1)[0];
  const existingIndex = signInRecords.findIndex(
    (item) => item.userId === currentSession.userId && item.date === today
  );
  const signInRecord: SignInRecord = {
    userId: currentSession.userId,
    date: today,
    signed: true,
    streakCount: existingIndex >= 0
      ? signInRecords[existingIndex].streakCount
      : Math.max(1, Number(lastRecord?.streakCount || 0) + 1)
  };

  const nextRecords = [...signInRecords];
  if (existingIndex >= 0) {
    nextRecords[existingIndex] = signInRecord;
  } else {
    nextRecords.push(signInRecord);
  }
  setLocalSignInRecords(nextRecords);

  if (currentSession.mode === 'user' && currentSession.authProvider !== 'local-fallback') {
    try {
      await callCloudFunction('appUser', {
        action: 'signIn',
        record: signInRecord
      });
    } catch (error) {
      console.warn('[identity] 保存签到记录到云端失败', error);
    }
  }

  return signInRecord;
}

export async function toggleFavoriteAction(input: {
  targetType: FavoriteRecord['targetType'];
  targetId: string;
  title?: string;
  active?: boolean;
}) {
  const currentSession = getUserSession();
  const now = getTimestamp();
  const favorites = getLocalFavoriteRecords();
  const recordId = `${currentSession.userId}_${input.targetType}_${input.targetId}`;
  const existing = favorites.find(
    (item) => `${item.userId}_${item.targetType}_${item.targetId}` === recordId
  );
  const nextRecord: FavoriteRecord = {
    userId: currentSession.userId,
    targetType: input.targetType,
    targetId: input.targetId,
    title: input.title || existing?.title || '',
    active: input.active ?? !existing?.active,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };

  const nextFavorites = favorites.filter(
    (item) => `${item.userId}_${item.targetType}_${item.targetId}` !== recordId
  );
  nextFavorites.push(nextRecord);
  setLocalFavoriteRecords(nextFavorites);

  if (currentSession.mode === 'user' && currentSession.authProvider !== 'local-fallback') {
    try {
      await callCloudFunction('appUser', {
        action: 'toggleFavorite',
        record: nextRecord
      });
    } catch (error) {
      console.warn('[identity] 收藏同步失败', error);
    }
  }

  return nextRecord;
}

export async function appendLearningEvent(input: Omit<LearningRecord, 'userId' | 'createdAt'>) {
  const currentSession = getUserSession();
  if (currentSession.mode !== 'user') {
    return null;
  }

  const event: LearningRecord = {
    userId: currentSession.userId,
    createdAt: getTimestamp(),
    ...input
  };

  const nextRecords = [...getLocalLearningRecords(), event];
  setLocalLearningRecords(nextRecords);

  if (currentSession.authProvider !== 'local-fallback') {
    try {
      await callCloudFunction('appUser', {
        action: 'appendLearningEvent',
        event
      });
    } catch (error) {
      console.warn('[identity] 学习记录同步失败', error);
    }
  }

  return event;
}
