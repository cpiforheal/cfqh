export type QuestionDirection = 'medical';
export type QuestionType = 'single_choice';
export type PracticeSource = 'daily' | 'paper' | 'wrongbook';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface MedicalQuestion {
  id: string;
  direction: QuestionDirection;
  questionType: QuestionType;
  stem: string;
  options: QuestionOption[];
  answer: string;
  explanation: string;
  year: number;
  paperId: string;
  tags: string[];
  status: 'published' | 'draft';
}

export interface DailyQuestionAssignment {
  date: string;
  questionId: string;
  direction: QuestionDirection;
  status: 'active' | 'archived';
}

export interface PastPaper {
  id: string;
  title: string;
  year: number;
  direction: QuestionDirection;
  description: string;
  questionIds: string[];
  status: 'published' | 'draft';
}

export interface PracticeRecord {
  userId: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  answeredAt: string;
  source: PracticeSource;
  direction?: QuestionDirection;
}

export interface SignInRecord {
  userId: string;
  date: string;
  signed: boolean;
  streakCount: number;
}

export interface WrongBookItem {
  question: MedicalQuestion;
  latestRecord: PracticeRecord;
  reviewStatus: '待复习' | '已掌握' | '今日新增';
  wrongAttempts: number;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = formatDate(new Date());

export const GUEST_USER_ID = 'guest-preview';
export const DEMO_USER_ID = 'demo-medical';

export const medicalQuestions: MedicalQuestion[] = [
  {
    id: 'medical_q_2025_001',
    direction: 'medical',
    questionType: 'single_choice',
    stem: '成人心肺复苏按压时，胸外按压的频率通常应保持在以下哪一范围？',
    options: [
      { id: 'A', text: '60-80 次/分' },
      { id: 'B', text: '80-90 次/分' },
      { id: 'C', text: '100-120 次/分' },
      { id: 'D', text: '130-150 次/分' }
    ],
    answer: 'C',
    explanation:
      '成人心肺复苏胸外按压应保持 100-120 次/分，同时保证按压深度与回弹质量，避免频率过慢或过快影响灌注。',
    year: 2025,
    paperId: 'medical_paper_2025_a',
    tags: ['基础护理', '急救', '高频考点'],
    status: 'published'
  },
  {
    id: 'medical_q_2025_002',
    direction: 'medical',
    questionType: 'single_choice',
    stem: '无菌操作过程中，如无菌手套外面接触到非无菌物品，最合适的处理方式是？',
    options: [
      { id: 'A', text: '继续完成操作，结束后再更换手套' },
      { id: 'B', text: '立即更换无菌手套后继续操作' },
      { id: 'C', text: '用酒精擦拭后继续使用' },
      { id: 'D', text: '只要接触时间短即可忽略' }
    ],
    answer: 'B',
    explanation:
      '无菌手套一旦污染，应立即更换，不能通过擦拭或继续使用来替代标准无菌操作要求。',
    year: 2025,
    paperId: 'medical_paper_2025_a',
    tags: ['无菌技术', '护理操作'],
    status: 'published'
  },
  {
    id: 'medical_q_2024_001',
    direction: 'medical',
    questionType: 'single_choice',
    stem: '患者静脉输液过程中突发寒战、高热，应首先考虑的常见输液反应是？',
    options: [
      { id: 'A', text: '发热反应' },
      { id: 'B', text: '空气栓塞' },
      { id: 'C', text: '静脉炎' },
      { id: 'D', text: '肺水肿' }
    ],
    answer: 'A',
    explanation:
      '输液中出现寒战、高热等症状，优先考虑发热反应，应立即停止输液并按规范处理。',
    year: 2024,
    paperId: 'medical_paper_2024_a',
    tags: ['静脉输液', '护理基础'],
    status: 'published'
  },
  {
    id: 'medical_q_2023_001',
    direction: 'medical',
    questionType: 'single_choice',
    stem: '关于压疮预防，下列措施中更符合护理原则的是？',
    options: [
      { id: 'A', text: '每 8 小时翻身一次' },
      { id: 'B', text: '保持受压部位长期干燥但无需观察皮肤' },
      { id: 'C', text: '定时翻身并评估皮肤受压情况' },
      { id: 'D', text: '出现皮肤发红后再开始护理' }
    ],
    answer: 'C',
    explanation:
      '压疮预防强调风险评估、定时翻身和皮肤观察，需主动干预而不是等问题出现后再处理。',
    year: 2023,
    paperId: 'medical_paper_2023_a',
    tags: ['基础护理', '压疮预防'],
    status: 'published'
  }
];

export const dailyQuestionAssignments: DailyQuestionAssignment[] = [
  {
    date: today,
    questionId: 'medical_q_2025_001',
    direction: 'medical',
    status: 'active'
  }
];

export const pastPapers: PastPaper[] = [
  {
    id: 'medical_paper_2025_a',
    title: '2025 医护模拟冲刺卷 A',
    year: 2025,
    direction: 'medical',
    description: '按正式考试节奏设计，适合考前整套热身与节奏校准。',
    questionIds: ['medical_q_2025_001', 'medical_q_2025_002'],
    status: 'published'
  },
  {
    id: 'medical_paper_2024_a',
    title: '2024 医护模拟冲刺卷 B',
    year: 2024,
    direction: 'medical',
    description: '偏重护理基础与高频操作，适合冲刺阶段查漏补缺。',
    questionIds: ['medical_q_2024_001'],
    status: 'published'
  },
  {
    id: 'medical_paper_2023_a',
    title: '2023 医护模拟冲刺卷 C',
    year: 2023,
    direction: 'medical',
    description: '适合作为二刷小套卷，快速巩固题感与答题顺序。',
    questionIds: ['medical_q_2023_001'],
    status: 'published'
  }
];

export const practiceRecords: PracticeRecord[] = [
  {
    userId: DEMO_USER_ID,
    questionId: 'medical_q_2025_001',
    answer: 'D',
    isCorrect: false,
    answeredAt: '2026-03-16T19:10:00+08:00',
    source: 'paper',
    direction: 'medical'
  },
  {
    userId: DEMO_USER_ID,
    questionId: 'medical_q_2024_001',
    answer: 'B',
    isCorrect: false,
    answeredAt: `${today}T08:20:00+08:00`,
    source: 'paper',
    direction: 'medical'
  },
  {
    userId: DEMO_USER_ID,
    questionId: 'medical_q_2023_001',
    answer: 'A',
    isCorrect: false,
    answeredAt: '2026-03-18T21:10:00+08:00',
    source: 'paper',
    direction: 'medical'
  },
  {
    userId: DEMO_USER_ID,
    questionId: 'medical_q_2023_001',
    answer: 'C',
    isCorrect: true,
    answeredAt: `${today}T09:35:00+08:00`,
    source: 'wrongbook',
    direction: 'medical'
  },
  {
    userId: DEMO_USER_ID,
    questionId: 'medical_q_2025_002',
    answer: 'A',
    isCorrect: false,
    answeredAt: `${today}T11:10:00+08:00`,
    source: 'daily',
    direction: 'medical'
  }
];

export const signInRecords: SignInRecord[] = [
  {
    userId: DEMO_USER_ID,
    date: today,
    signed: true,
    streakCount: 6
  }
];

export function getMedicalQuestionById(questionId: string) {
  return medicalQuestions.find((item) => item.id === questionId) || null;
}

export function getTodayDateText() {
  return today;
}

function getStableDailyQuestionAssignment() {
  const activeQuestions = medicalQuestions.filter((item) => item.status === 'published');
  if (!activeQuestions.length) {
    return dailyQuestionAssignments[0];
  }

  const seed = today.replaceAll('-', '');
  const numericSeed = Number(seed) || activeQuestions.length;
  const questionIndex = numericSeed % activeQuestions.length;
  const question = activeQuestions[questionIndex];

  return {
    date: today,
    questionId: question.id,
    direction: 'medical' as QuestionDirection,
    status: 'active' as const
  };
}

export function buildDailyQuestionPayloadFromData({
  userId = GUEST_USER_ID,
  practiceRecordsInput = practiceRecords,
  signInRecordsInput = signInRecords
}: {
  userId?: string;
  practiceRecordsInput?: PracticeRecord[];
  signInRecordsInput?: SignInRecord[];
} = {}) {
  const assignment = getStableDailyQuestionAssignment();
  const question = getMedicalQuestionById(assignment.questionId);
  const signInRecord = signInRecordsInput.find((item) => item.userId === userId && item.date === today) || {
    userId,
    date: today,
    signed: false,
    streakCount: 0
  };
  const latestRecord =
    [...practiceRecordsInput]
      .filter((item) => item.userId === userId && item.questionId === assignment.questionId)
      .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime())[0] || null;

  return {
    direction: 'medical' as QuestionDirection,
    dailyQuestion: assignment,
    question,
    signInRecord,
    latestRecord
  };
}

export function buildDailyQuestionMockPayload(userId = GUEST_USER_ID) {
  return buildDailyQuestionPayloadFromData({ userId });
}

export function buildPastPapersMockPayload() {
  const questionMap = medicalQuestions.reduce<Record<string, MedicalQuestion>>((result, item) => {
    result[item.id] = item;
    return result;
  }, {});

  return {
    direction: 'medical' as QuestionDirection,
    papers: pastPapers,
    questionsById: questionMap
  };
}

export function buildWrongBookPayloadFromData({
  userId = GUEST_USER_ID,
  practiceRecordsInput = practiceRecords
}: {
  userId?: string;
  practiceRecordsInput?: PracticeRecord[];
} = {}) {
  const recordsByQuestion = practiceRecordsInput
    .filter((item) => item.userId === userId)
    .reduce<Record<string, PracticeRecord[]>>((result, item) => {
      if (!result[item.questionId]) {
        result[item.questionId] = [];
      }

      result[item.questionId].push(item);
      return result;
    }, {});

  const items: WrongBookItem[] = Object.values(recordsByQuestion)
    .map((records) => {
      const sortedRecords = [...records].sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime());
      const latestRecord = sortedRecords[0];
      const question = getMedicalQuestionById(latestRecord?.questionId);
      const wrongAttempts = sortedRecords.filter((record) => !record.isCorrect).length;

      if (!question || !latestRecord || !wrongAttempts) {
        return null;
      }

      const reviewStatus = latestRecord.isCorrect
        ? '已掌握'
        : latestRecord.answeredAt.startsWith(today)
          ? '今日新增'
          : '待复习';

      return {
        question,
        latestRecord,
        reviewStatus,
        wrongAttempts
      };
    })
    .filter((item): item is WrongBookItem => Boolean(item))
    .sort((a, b) => {
      const order = { '待复习': 0, '今日新增': 1, '已掌握': 2 };
      const statusDiff = order[a.reviewStatus] - order[b.reviewStatus];
      if (statusDiff !== 0) {
        return statusDiff;
      }

      return new Date(a.latestRecord.answeredAt).getTime() - new Date(b.latestRecord.answeredAt).getTime();
    });

  return {
    direction: 'medical' as QuestionDirection,
    summary: {
      totalWrong: items.length,
      pendingReview: items.filter((item) => item.reviewStatus !== '已掌握').length,
      todayUpdated: items.filter((item) => item.reviewStatus === '今日新增').length
    },
    items
  };
}

export function buildWrongBookMockPayload(userId = GUEST_USER_ID) {
  return buildWrongBookPayloadFromData({ userId });
}
