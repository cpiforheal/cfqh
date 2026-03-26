export type LinkOpenType = 'navigate' | 'switchTab' | 'redirectTo' | 'reLaunch';
export type HomeSubjectKey = 'math' | 'medical';
export type HomeSectionId = 'header' | 'dailyCard' | 'quickEntries' | 'resourceSection' | 'resources';
export type HomeQuickEntryKind = 'practice' | 'daily' | 'mock' | 'wrong';

export type HomePageHeader = {
  title: string;
  subtitle: string;
  resourceSectionTitle: string;
  resourceMoreText: string;
};

export type HomeLearningCard = {
  title: string;
  subtitle: string;
  streakText: string;
  taskLabel: string;
  progressText: string;
  progressPercent: number;
  actionText: string;
  actionUrl: string;
  actionOpenType: LinkOpenType;
};

export type HomeQuickEntry = {
  label: string;
  note: string;
  url: string;
  openType: LinkOpenType;
  kind: HomeQuickEntryKind;
  accent: string;
  bg: string;
};

export type HomeResourceItem = {
  type: string;
  title: string;
  subtitle: string;
  chip: string;
  meta: string;
};

export type HomeSubjectContent = {
  learningCard: HomeLearningCard;
  quickEntries: HomeQuickEntry[];
  resources: HomeResourceItem[];
};

export type HomePageContent = {
  header: HomePageHeader;
  subjects: Record<HomeSubjectKey, HomeSubjectContent>;
  _createdAt?: string;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type HomeSectionModel = {
  id: HomeSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  mode: 'shared' | 'subject';
};

export const subjectLabels: Record<HomeSubjectKey, string> = {
  math: '高数',
  medical: '医护'
};

export const subjectThemeMeta: Record<HomeSubjectKey, { accent: string; accentSoft: string; accentLine: string; chipText: string }> = {
  math: {
    accent: '#ffb6c1',
    accentSoft: '#fff7f9',
    accentLine: 'rgba(255, 182, 193, 0.28)',
    chipText: '#b96c7d'
  },
  medical: {
    accent: '#059669',
    accentSoft: '#ecfdf5',
    accentLine: 'rgba(5, 150, 105, 0.22)',
    chipText: '#047857'
  }
};

export const homeSectionModels: HomeSectionModel[] = [
  {
    id: 'header',
    step: '第 1 行',
    title: '顶部标题区',
    desc: '对应小程序里“今日学习”和下面那句副标题。',
    location: '主标题 / 副标题',
    mode: 'shared'
  },
  {
    id: 'dailyCard',
    step: '第 2 块',
    title: '今日学习主卡',
    desc: '对应当前学科的大卡片，包括连续天数、任务标题、进度和按钮。',
    location: '卡片标题 / 任务进度 / 按钮',
    mode: 'subject'
  },
  {
    id: 'quickEntries',
    step: '第 3 块',
    title: '四个快捷入口',
    desc: '对应主卡下方四个入口卡片，老师一眼就能知道学生下一步点哪里。',
    location: '入口标题 / 副标题 / 图标 / 跳转',
    mode: 'subject'
  },
  {
    id: 'resourceSection',
    step: '第 4 行',
    title: '资源区标题栏',
    desc: '对应“免费精选资源”和右侧“更多”。',
    location: '区块标题 / 右侧短文案',
    mode: 'shared'
  },
  {
    id: 'resources',
    step: '第 5 块',
    title: '资源卡片',
    desc: '对应下方两张资源卡片，从上到下与前台展示完全一致。',
    location: '卡片标题 / 副标题 / 标签 / 右侧信息',
    mode: 'subject'
  }
];

export const quickEntryKindOptions: Array<{ label: string; value: HomeQuickEntryKind }> = [
  { label: '题库练习图标', value: 'practice' },
  { label: '每日一题图标', value: 'daily' },
  { label: '模拟考试图标', value: 'mock' },
  { label: '错题本图标', value: 'wrong' }
];

export const defaultHomePage: HomePageContent = {
  header: {
    title: '今日学习',
    subtitle: '先做题，再沉淀进度',
    resourceSectionTitle: '免费精选资源',
    resourceMoreText: '更多'
  },
  subjects: {
    math: {
      learningCard: {
        title: '今日高数学习',
        subtitle: '保持题感，稳定推进',
        streakText: '连续 9 天',
        taskLabel: '每日刷题任务',
        progressText: '15 / 30',
        progressPercent: 50,
        actionText: '开始练题',
        actionUrl: '/pages/question-bank/daily-question/index',
        actionOpenType: 'navigate'
      },
      quickEntries: [
        {
          label: '题库练习',
          note: '快速上手',
          url: '/pages/question-bank/daily-question/index',
          openType: 'navigate',
          kind: 'practice',
          accent: '#ffb6c1',
          bg: '#fff7f9'
        },
        {
          label: '每日一题',
          note: '保持手感',
          url: '/pages/question-bank/daily-question/index',
          openType: 'navigate',
          kind: 'daily',
          accent: '#ffb6c1',
          bg: '#fff7f9'
        },
        {
          label: '模拟考试',
          note: '整卷热身',
          url: '/pages/question-bank/past-papers/index',
          openType: 'navigate',
          kind: 'mock',
          accent: '#0ea5e9',
          bg: '#e0f2fe'
        },
        {
          label: '错题本',
          note: '回炉复盘',
          url: '/pages/question-bank/wrong-book/index',
          openType: 'navigate',
          kind: 'wrong',
          accent: '#f43f5e',
          bg: '#ffe4e6'
        }
      ],
      resources: [
        {
          type: 'V',
          title: '2026 高数核心考点串讲',
          subtitle: '名师带练 · 快速入门',
          chip: '免费观看',
          meta: '1.2w 人已学'
        },
        {
          type: 'P',
          title: '高数历年真题与解析合集',
          subtitle: '官方正版 · 独家整理',
          chip: '免费领取',
          meta: '真题速刷'
        }
      ]
    },
    medical: {
      learningCard: {
        title: '今日医护学习',
        subtitle: '保持专注，稳步提升',
        streakText: '连续 12 天',
        taskLabel: '核心考点背诵',
        progressText: '8 / 20',
        progressPercent: 40,
        actionText: '开始背诵',
        actionUrl: '/pages/question-bank/daily-question/index',
        actionOpenType: 'navigate'
      },
      quickEntries: [
        {
          label: '题库练习',
          note: '快速上手',
          url: '/pages/question-bank/daily-question/index',
          openType: 'navigate',
          kind: 'practice',
          accent: '#059669',
          bg: '#ecfdf5'
        },
        {
          label: '每日一题',
          note: '保持手感',
          url: '/pages/question-bank/daily-question/index',
          openType: 'navigate',
          kind: 'daily',
          accent: '#059669',
          bg: '#ecfdf5'
        },
        {
          label: '模拟考试',
          note: '整卷热身',
          url: '/pages/question-bank/past-papers/index',
          openType: 'navigate',
          kind: 'mock',
          accent: '#0ea5e9',
          bg: '#e0f2fe'
        },
        {
          label: '错题本',
          note: '回炉复盘',
          url: '/pages/question-bank/wrong-book/index',
          openType: 'navigate',
          kind: 'wrong',
          accent: '#f43f5e',
          bg: '#ffe4e6'
        }
      ],
      resources: [
        {
          type: 'V',
          title: '医护综合：解剖学核心考点串讲',
          subtitle: '名师带练 · 快速入门',
          chip: '免费观看',
          meta: '8.5k 人已学'
        },
        {
          type: 'P',
          title: '生理学必背 100 句口诀总结',
          subtitle: '官方正版 · 独家整理',
          chip: '免费领取',
          meta: '考前必背'
        }
      ]
    }
  }
};

function normalizeOpenType(value: string): LinkOpenType {
  return value === 'navigate' || value === 'switchTab' || value === 'redirectTo' || value === 'reLaunch' ? value : 'navigate';
}

function normalizeProgressPercent(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(0, Math.min(100, numeric));
}

function normalizeSubject(subjectKey: HomeSubjectKey, subject: Record<string, unknown> | undefined): HomeSubjectContent {
  const fallback = defaultHomePage.subjects[subjectKey];
  const source = subject || {};
  const learningCard = ((source.learningCard as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const quickEntries = Array.isArray(source.quickEntries) ? source.quickEntries : [];
  const resources = Array.isArray(source.resources) ? source.resources : [];

  return {
    learningCard: {
      ...fallback.learningCard,
      ...learningCard,
      actionOpenType: normalizeOpenType(String(learningCard.actionOpenType || fallback.learningCard.actionOpenType)),
      progressPercent: normalizeProgressPercent(learningCard.progressPercent, fallback.learningCard.progressPercent)
    },
    quickEntries: (quickEntries.length ? quickEntries : fallback.quickEntries).slice(0, 4).map((item, index) => ({
      ...(fallback.quickEntries[index] || fallback.quickEntries[0]),
      ...((item || {}) as Record<string, unknown>),
      openType: normalizeOpenType(String(((item || {}) as Record<string, unknown>).openType || (fallback.quickEntries[index] || fallback.quickEntries[0]).openType))
    })) as HomeQuickEntry[],
    resources: (resources.length ? resources : fallback.resources).slice(0, 2).map((item, index) => ({
      ...(fallback.resources[index] || fallback.resources[0]),
      ...((item || {}) as Record<string, unknown>)
    })) as HomeResourceItem[]
  };
}

export function normalizeHomePage(data: Record<string, unknown> | null | undefined): HomePageContent {
  const source = (data || {}) as Record<string, unknown>;
  const header = ((source.header as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const subjects = ((source.subjects as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;

  return {
    header: {
      ...defaultHomePage.header,
      title: String(header.title || defaultHomePage.header.title),
      subtitle: String(header.subtitle || defaultHomePage.header.subtitle),
      resourceSectionTitle: String(header.resourceSectionTitle || defaultHomePage.header.resourceSectionTitle),
      resourceMoreText: String(header.resourceMoreText || defaultHomePage.header.resourceMoreText)
    },
    subjects: {
      math: normalizeSubject('math', subjects.math as Record<string, unknown> | undefined),
      medical: normalizeSubject('medical', subjects.medical as Record<string, unknown> | undefined)
    },
    _createdAt: String(source._createdAt || ''),
    _updatedAt: String(source._updatedAt || ''),
    _meta: (source._meta as Record<string, unknown> | undefined) || undefined
  };
}
