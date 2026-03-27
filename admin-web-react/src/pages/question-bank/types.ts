import { toMultilineText, toStringArray } from '../../utils';

export type QuestionDirection = 'medical' | 'math';
export type QuestionBankSectionId = 'hero' | 'dailyQuestionCard' | 'pastPapersCard' | 'wrongBookCard' | 'importGuide';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer';
export type PublishStatus = 'draft' | 'published';
export type ImportSourceType = 'paper' | 'file' | 'manual' | 'text';

export type QuestionOption = {
  id: string;
  text: string;
};

export type QuestionBankCard = {
  title: string;
  desc: string;
  buttonText: string;
  note: string;
};

export type WrongBookCardConfig = QuestionBankCard & {
  stats: {
    pendingLabel: string;
    todayLabel: string;
    totalLabel: string;
  };
  taskSection: {
    eyebrow: string;
    reasonLabel: string;
    estimateLabel: string;
    sourceLabel: string;
    lastAnsweredLabel: string;
    answerLabel: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  queueSection: {
    title: string;
    sortHint: string;
    pendingLabel: string;
    todayLabel: string;
    masteredLabel: string;
    emptyTitle: string;
    emptyDesc: string;
  };
};

export type QuestionBankPageContent = {
  _meta?: Record<string, unknown>;
  _updatedAt?: string;
  hero: {
    chip: string;
    title: string;
    desc: string;
  };
  dailyQuestionCard: QuestionBankCard;
  pastPapersCard: QuestionBankCard;
  wrongBookCard: WrongBookCardConfig;
  importGuide: {
    title: string;
    desc: string;
    templateText: string;
  };
};

export type MedicalQuestionRecord = {
  _id?: string;
  questionId: string;
  direction: QuestionDirection;
  questionType: QuestionType;
  stem: string;
  options: QuestionOption[];
  answer: string;
  explanation: string;
  year: number;
  paperId: string;
  tags: string[];
  sort: number;
  status: PublishStatus;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type PastPaperRecord = {
  _id?: string;
  paperId: string;
  title: string;
  year: number;
  direction: QuestionDirection;
  description: string;
  questionIds: string[];
  sort: number;
  status: PublishStatus;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type QuestionImportRecord = {
  _id?: string;
  title: string;
  direction: QuestionDirection;
  sourceType: ImportSourceType;
  rawText: string;
  note: string;
  sort: number;
  status: PublishStatus;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type QuestionBankSectionModel = {
  id: QuestionBankSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
};

export const questionDirectionLabels: Record<QuestionDirection, string> = {
  math: '高数',
  medical: '医护'
};

export const questionTypeLabels: Record<QuestionType, string> = {
  single_choice: '单选题',
  multiple_choice: '多选题',
  true_false: '判断题',
  short_answer: '简答题'
};

export const publishStatusLabels: Record<PublishStatus, string> = {
  draft: '草稿',
  published: '已发布'
};

export const importSourceTypeLabels: Record<ImportSourceType, string> = {
  file: '文件导入',
  manual: '手动整理',
  paper: '整卷整理',
  text: '纯文本'
};

export const questionTypeOptions = Object.entries(questionTypeLabels).map(([value, label]) => ({
  label,
  value: value as QuestionType
}));

export const publishStatusOptions = Object.entries(publishStatusLabels).map(([value, label]) => ({
  label,
  value: value as PublishStatus
}));

export const importSourceTypeOptions = Object.entries(importSourceTypeLabels).map(([value, label]) => ({
  label,
  value: value as ImportSourceType
}));

export const questionBankSectionModels: QuestionBankSectionModel[] = [
  {
    id: 'hero',
    step: '第 1 行',
    title: '题库页顶部说明',
    desc: '对应题库入口页最上方的短标签、标题和说明。',
    location: '顶部标题区'
  },
  {
    id: 'dailyQuestionCard',
    step: '第 2 块',
    title: '每日一题卡',
    desc: '对应老师最常改的每日一题入口卡片。',
    location: '入口列表第 1 张卡'
  },
  {
    id: 'pastPapersCard',
    step: '第 3 块',
    title: '模拟题卡',
    desc: '对应模拟试卷入口卡，并承接 CSV 导入逻辑。',
    location: '入口列表第 2 张卡'
  },
  {
    id: 'wrongBookCard',
    step: '第 4 块',
    title: '错题本卡',
    desc: '对应错题本入口和错题页里的一组老师语言文案。',
    location: '入口列表第 3 张卡'
  },
  {
    id: 'importGuide',
    step: '第 5 块',
    title: '导入说明区',
    desc: '对应老师导入题目时的说明文案和文本模板。',
    location: '导入说明区'
  }
];

export const defaultQuestionBankPage: QuestionBankPageContent = {
  hero: {
    chip: '医护轻题库',
    title: '题库入口配置',
    desc: '这里集中维护每日一题、模拟题与错题本的页面文案，模拟题支持 CSV 热更新。'
  },
  dailyQuestionCard: {
    title: '每日一题',
    desc: '固定练习题组，适合每天保持手感与做题节奏。',
    buttonText: '进入每日一题',
    note: '固定题源'
  },
  pastPapersCard: {
    title: '模拟题',
    desc: '按套练模拟卷，支持通过 CSV 持续热更新题目内容。',
    buttonText: '进入模拟题',
    note: '支持 CSV 热更新'
  },
  wrongBookCard: {
    title: '错题本',
    desc: '先做现在最该回炉的一题，再顺着复习队列往下推进。',
    buttonText: '回看错题',
    note: '进入页面先看主任务卡，做完再处理下方队列。',
    stats: {
      pendingLabel: '待复习',
      todayLabel: '今日新增',
      totalLabel: '累计错题'
    },
    taskSection: {
      eyebrow: '当前优先任务',
      reasonLabel: '为什么先做',
      estimateLabel: '预计耗时',
      sourceLabel: '题目来源',
      lastAnsweredLabel: '上次作答',
      answerLabel: '我的答案',
      primaryButtonText: '立即重练',
      secondaryButtonText: '查看解析'
    },
    queueSection: {
      title: '待复习队列',
      sortHint: '按优先级排序',
      pendingLabel: '待复习',
      todayLabel: '今日新增',
      masteredLabel: '已掌握',
      emptyTitle: '今天的错题复习已经清空',
      emptyDesc: '先把新的练习做完，系统会把需要回炉的题继续排进这里。'
    }
  },
  importGuide: {
    title: '纯文本导入',
    desc: '支持直接粘贴原始题文、整卷文本或错题整理，后续再做结构化处理。',
    templateText: 'questionId,paperId,year,questionType,stem,options,answer,explanation,status\n2025_medical_001,medical_paper_2025,2025,single_choice,下列哪项正确?,A. 选项一 | B. 选项二 | C. 选项三 | D. 选项四,A,解析内容,published'
  }
};

export const defaultMedicalQuestion: MedicalQuestionRecord = {
  questionId: '',
  direction: 'medical',
  questionType: 'single_choice',
  stem: '',
  options: [],
  answer: '',
  explanation: '',
  year: new Date().getFullYear(),
  paperId: '',
  tags: [],
  sort: 100,
  status: 'draft'
};

export const defaultPastPaper: PastPaperRecord = {
  paperId: '',
  title: '',
  year: new Date().getFullYear(),
  direction: 'medical',
  description: '',
  questionIds: [],
  sort: 100,
  status: 'draft'
};

export const defaultQuestionImport: QuestionImportRecord = {
  title: '',
  direction: 'medical',
  sourceType: 'paper',
  rawText: '',
  note: '',
  sort: 100,
  status: 'draft'
};

function readObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function readNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readQuestionDirection(value: unknown, fallback: QuestionDirection = 'medical'): QuestionDirection {
  return value === 'math' ? 'math' : fallback;
}

function readQuestionType(value: unknown, fallback: QuestionType = 'single_choice'): QuestionType {
  if (value === 'multiple_choice' || value === 'true_false' || value === 'short_answer' || value === 'single_choice') {
    return value;
  }
  return fallback;
}

function readPublishStatus(value: unknown, fallback: PublishStatus = 'draft'): PublishStatus {
  return value === 'published' ? 'published' : fallback;
}

function readImportSourceType(value: unknown, fallback: ImportSourceType = 'paper'): ImportSourceType {
  if (value === 'file' || value === 'manual' || value === 'text' || value === 'paper') {
    return value;
  }
  return fallback;
}

function readQuestionOptions(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') {
        return { id: '', text: item };
      }
      const next = readObject(item);
      return {
        id: readString(next.id),
        text: readString(next.text)
      };
    })
    .map((item, index) => ({
      id: item.id || String.fromCharCode(65 + index),
      text: item.text
    }))
    .filter((item) => item.text);
}

export function normalizeQuestionDirection(value: unknown): QuestionDirection {
  return readQuestionDirection(value, 'medical');
}

export function normalizeQuestionBankPage(raw: unknown): QuestionBankPageContent {
  const source = readObject(raw);
  const hero = readObject(source.hero);
  const dailyQuestionCard = readObject(source.dailyQuestionCard);
  const pastPapersCard = readObject(source.pastPapersCard);
  const wrongBookCard = readObject(source.wrongBookCard);
  const importGuide = readObject(source.importGuide);
  const wrongBookStats = readObject(wrongBookCard.stats);
  const taskSection = readObject(wrongBookCard.taskSection);
  const queueSection = readObject(wrongBookCard.queueSection);

  return {
    ...defaultQuestionBankPage,
    _meta: readObject(source._meta),
    _updatedAt: readString(source._updatedAt),
    hero: {
      chip: readString(hero.chip, defaultQuestionBankPage.hero.chip),
      title: readString(hero.title, defaultQuestionBankPage.hero.title),
      desc: readString(hero.desc, defaultQuestionBankPage.hero.desc)
    },
    dailyQuestionCard: {
      title: readString(dailyQuestionCard.title, defaultQuestionBankPage.dailyQuestionCard.title),
      desc: readString(dailyQuestionCard.desc, defaultQuestionBankPage.dailyQuestionCard.desc),
      buttonText: readString(dailyQuestionCard.buttonText, defaultQuestionBankPage.dailyQuestionCard.buttonText),
      note: readString(dailyQuestionCard.note, defaultQuestionBankPage.dailyQuestionCard.note)
    },
    pastPapersCard: {
      title: readString(pastPapersCard.title, defaultQuestionBankPage.pastPapersCard.title),
      desc: readString(pastPapersCard.desc, defaultQuestionBankPage.pastPapersCard.desc),
      buttonText: readString(pastPapersCard.buttonText, defaultQuestionBankPage.pastPapersCard.buttonText),
      note: readString(pastPapersCard.note, defaultQuestionBankPage.pastPapersCard.note)
    },
    wrongBookCard: {
      title: readString(wrongBookCard.title, defaultQuestionBankPage.wrongBookCard.title),
      desc: readString(wrongBookCard.desc, defaultQuestionBankPage.wrongBookCard.desc),
      buttonText: readString(wrongBookCard.buttonText, defaultQuestionBankPage.wrongBookCard.buttonText),
      note: readString(wrongBookCard.note, defaultQuestionBankPage.wrongBookCard.note),
      stats: {
        pendingLabel: readString(wrongBookStats.pendingLabel, defaultQuestionBankPage.wrongBookCard.stats.pendingLabel),
        todayLabel: readString(wrongBookStats.todayLabel, defaultQuestionBankPage.wrongBookCard.stats.todayLabel),
        totalLabel: readString(wrongBookStats.totalLabel, defaultQuestionBankPage.wrongBookCard.stats.totalLabel)
      },
      taskSection: {
        eyebrow: readString(taskSection.eyebrow, defaultQuestionBankPage.wrongBookCard.taskSection.eyebrow),
        reasonLabel: readString(taskSection.reasonLabel, defaultQuestionBankPage.wrongBookCard.taskSection.reasonLabel),
        estimateLabel: readString(taskSection.estimateLabel, defaultQuestionBankPage.wrongBookCard.taskSection.estimateLabel),
        sourceLabel: readString(taskSection.sourceLabel, defaultQuestionBankPage.wrongBookCard.taskSection.sourceLabel),
        lastAnsweredLabel: readString(taskSection.lastAnsweredLabel, defaultQuestionBankPage.wrongBookCard.taskSection.lastAnsweredLabel),
        answerLabel: readString(taskSection.answerLabel, defaultQuestionBankPage.wrongBookCard.taskSection.answerLabel),
        primaryButtonText: readString(
          taskSection.primaryButtonText,
          defaultQuestionBankPage.wrongBookCard.taskSection.primaryButtonText
        ),
        secondaryButtonText: readString(
          taskSection.secondaryButtonText,
          defaultQuestionBankPage.wrongBookCard.taskSection.secondaryButtonText
        )
      },
      queueSection: {
        title: readString(queueSection.title, defaultQuestionBankPage.wrongBookCard.queueSection.title),
        sortHint: readString(queueSection.sortHint, defaultQuestionBankPage.wrongBookCard.queueSection.sortHint),
        pendingLabel: readString(queueSection.pendingLabel, defaultQuestionBankPage.wrongBookCard.queueSection.pendingLabel),
        todayLabel: readString(queueSection.todayLabel, defaultQuestionBankPage.wrongBookCard.queueSection.todayLabel),
        masteredLabel: readString(queueSection.masteredLabel, defaultQuestionBankPage.wrongBookCard.queueSection.masteredLabel),
        emptyTitle: readString(queueSection.emptyTitle, defaultQuestionBankPage.wrongBookCard.queueSection.emptyTitle),
        emptyDesc: readString(queueSection.emptyDesc, defaultQuestionBankPage.wrongBookCard.queueSection.emptyDesc)
      }
    },
    importGuide: {
      title: readString(importGuide.title, defaultQuestionBankPage.importGuide.title),
      desc: readString(importGuide.desc, defaultQuestionBankPage.importGuide.desc),
      templateText: readString(importGuide.templateText, defaultQuestionBankPage.importGuide.templateText)
    }
  };
}

export function normalizeMedicalQuestion(raw: unknown): MedicalQuestionRecord {
  const source = readObject(raw);
  return {
    ...defaultMedicalQuestion,
    _id: readString(source._id),
    _updatedAt: readString(source._updatedAt),
    _meta: readObject(source._meta),
    questionId: readString(source.questionId),
    direction: readQuestionDirection(source.direction, defaultMedicalQuestion.direction),
    questionType: readQuestionType(source.questionType, defaultMedicalQuestion.questionType),
    stem: readString(source.stem),
    options: readQuestionOptions(source.options),
    answer: readString(source.answer),
    explanation: readString(source.explanation),
    year: readNumber(source.year, defaultMedicalQuestion.year),
    paperId: readString(source.paperId),
    tags: toStringArray(source.tags),
    sort: readNumber(source.sort, defaultMedicalQuestion.sort),
    status: readPublishStatus(source.status, defaultMedicalQuestion.status)
  };
}

export function normalizePastPaper(raw: unknown): PastPaperRecord {
  const source = readObject(raw);
  return {
    ...defaultPastPaper,
    _id: readString(source._id),
    _updatedAt: readString(source._updatedAt),
    _meta: readObject(source._meta),
    paperId: readString(source.paperId),
    title: readString(source.title),
    year: readNumber(source.year, defaultPastPaper.year),
    direction: readQuestionDirection(source.direction, defaultPastPaper.direction),
    description: readString(source.description),
    questionIds: toStringArray(source.questionIds),
    sort: readNumber(source.sort, defaultPastPaper.sort),
    status: readPublishStatus(source.status, defaultPastPaper.status)
  };
}

export function normalizeQuestionImport(raw: unknown): QuestionImportRecord {
  const source = readObject(raw);
  return {
    ...defaultQuestionImport,
    _id: readString(source._id),
    _updatedAt: readString(source._updatedAt),
    _meta: readObject(source._meta),
    title: readString(source.title),
    direction: readQuestionDirection(source.direction, defaultQuestionImport.direction),
    sourceType: readImportSourceType(source.sourceType, defaultQuestionImport.sourceType),
    rawText: readString(source.rawText),
    note: readString(source.note),
    sort: readNumber(source.sort, defaultQuestionImport.sort),
    status: readPublishStatus(source.status, defaultQuestionImport.status)
  };
}

export function parseQuestionOptionsText(value: unknown) {
  const lines = String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    const matched = line.match(/^([A-Za-z])(?:[\.\、\s]+)(.*)$/);
    return {
      id: (matched?.[1] || String.fromCharCode(65 + index)).toUpperCase(),
      text: (matched?.[2] || line).trim()
    };
  });
}

export function toQuestionOptionsText(options: QuestionOption[]) {
  return options.map((item) => `${item.id}. ${item.text}`).join('\n');
}

export function toQuestionIdsText(questionIds: string[]) {
  return toMultilineText(questionIds);
}

export function toTagsText(tags: string[]) {
  return toMultilineText(tags);
}
