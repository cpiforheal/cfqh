export type MaterialDirectionKey = 'math' | 'medical';
export type MaterialStageKey = 'foundation' | 'reinforcement' | 'sprint';
export type MaterialSectionId =
  | 'header'
  | 'directionTabs'
  | 'stageTabs'
  | 'mainSection'
  | 'package'
  | 'shelfSection'
  | 'items'
  | 'consultBar';

export type MaterialsPageContent = {
  header: {
    title: string;
    searchLabel: string;
  };
  directionTabs: Array<{
    key: MaterialDirectionKey;
    label: string;
    icon: string;
  }>;
  stageTabs: Array<{
    key: MaterialStageKey;
    label: string;
  }>;
  mainSection: {
    title: string;
    sideNote: string;
  };
  shelfSection: {
    title: string;
    hint: string;
  };
  consultBar: {
    title: string;
    desc: string;
    buttonText: string;
  };
  _createdAt?: string;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type MaterialPackageRecord = {
  _id?: string;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  badge: string;
  title: string;
  target: string;
  solves: string;
  features: string[];
  sort: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type MaterialItemRecord = {
  _id?: string;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string;
  accentStart: string;
  accentEnd: string;
  sort: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type MediaSectionModel = {
  id: MaterialSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
};

export const materialDirectionLabels: Record<MaterialDirectionKey, string> = {
  math: '高数资料',
  medical: '医护资料'
};

export const materialStageLabels: Record<MaterialStageKey, string> = {
  foundation: '基础阶段',
  reinforcement: '强化阶段',
  sprint: '冲刺阶段'
};

export const materialThemeMeta: Record<
  MaterialDirectionKey,
  {
    accent: string;
    accentSoft: string;
    accentLine: string;
    surface: string;
    deep: string;
  }
> = {
  math: {
    accent: '#5b80ff',
    accentSoft: '#eef3ff',
    accentLine: 'rgba(91, 128, 255, 0.18)',
    surface: 'linear-gradient(180deg, rgba(237, 243, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
    deep: '#2349b6'
  },
  medical: {
    accent: '#16a394',
    accentSoft: '#ecfcf8',
    accentLine: 'rgba(22, 163, 148, 0.18)',
    surface: 'linear-gradient(180deg, rgba(236, 252, 248, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
    deep: '#0f7f74'
  }
};

export const mediaSectionModels: MediaSectionModel[] = [
  {
    id: 'header',
    step: '第 1 行',
    title: '顶部标题区',
    desc: '对应商城页最上方的主标题和右侧搜索提示。',
    location: '标题 / 搜索提示'
  },
  {
    id: 'directionTabs',
    step: '第 2 行',
    title: '学科切换',
    desc: '对应商城页顶部的高数 / 医护切换，老师只需维护显示名称。',
    location: '学科名称'
  },
  {
    id: 'stageTabs',
    step: '第 3 行',
    title: '阶段筛选',
    desc: '对应商城页的阶段按钮，从左到右就是前台展示顺序。',
    location: '阶段名称'
  },
  {
    id: 'mainSection',
    step: '第 4 行',
    title: '主推区标题',
    desc: '对应主推套系大卡片上方的标题和提示语，老师可以直接告诉学生“下面这块是什么”。',
    location: '区块标题 / 辅助提示'
  },
  {
    id: 'package',
    step: '第 5 块',
    title: '主推套系卡',
    desc: '对应当前学科和阶段下方的大卡片，老师优先在这里说明“适合谁、解决什么问题”。',
    location: '角标 / 标题 / 适合人群 / 解决问题 / 卖点'
  },
  {
    id: 'shelfSection',
    step: '第 6 行',
    title: '资料区标题',
    desc: '对应资料列表上方的小标题和右侧提示语。',
    location: '列表标题 / 提示语'
  },
  {
    id: 'items',
    step: '第 7 块',
    title: '资料卡片',
    desc: '对应下方资料卡片列表，从上到下就是前台展示顺序。',
    location: '类型 / 标题 / 副标题 / 简介 / 颜色'
  },
  {
    id: 'consultBar',
    step: '第 8 块',
    title: '底部咨询条',
    desc: '对应最底部的咨询提示，适合放老师想引导咨询的话术。',
    location: '标题 / 说明 / 按钮文案'
  }
];

export const defaultMaterialsPage: MaterialsPageContent = {
  header: {
    title: '教材资料库',
    searchLabel: '搜索资料'
  },
  directionTabs: [
    { key: 'math', label: '高等数学', icon: 'grid' },
    { key: 'medical', label: '医护综合', icon: 'medical' }
  ],
  stageTabs: [
    { key: 'foundation', label: '基础阶段' },
    { key: 'reinforcement', label: '强化阶段' },
    { key: 'sprint', label: '冲刺阶段' }
  ],
  mainSection: {
    title: '核心主推套系',
    sideNote: '最适合当前阶段'
  },
  shelfSection: {
    title: '套系包含以下资料：',
    hint: '按顺序往下看'
  },
  consultBar: {
    title: '不知道怎么选？',
    desc: '专业老师为您 1 对 1 定制资料方案',
    buttonText: '免费咨询'
  }
};

export const defaultMaterialPackage: MaterialPackageRecord = {
  direction: 'math',
  stage: 'foundation',
  badge: '零基础首选',
  title: '高数全程通关尊享包',
  target: '基础薄弱、需要从零系统搭起知识框架的同学',
  solves: '解决知识点散、不会规划、做题没方向的问题',
  features: ['名师主编', '阶段训练', '考前模拟'],
  sort: 100,
  status: 'draft'
};

export const defaultMaterialItem: MaterialItemRecord = {
  direction: 'math',
  stage: 'foundation',
  type: '核心教材',
  title: '高数全程通关主教材',
  subtitle: '从零搭好知识框架',
  desc: '名师主编，概念讲透',
  details: '从极限、导数到积分逐章搭建知识主线，适合第一轮系统梳理。',
  accentStart: '#5b80ff',
  accentEnd: '#86a2ff',
  sort: 100,
  status: 'draft'
};

export function readMaterialDirection(value: string | null): MaterialDirectionKey {
  return value === 'medical' ? 'medical' : 'math';
}

export function readMaterialStage(value: string | null): MaterialStageKey {
  if (value === 'reinforcement' || value === 'sprint') {
    return value;
  }
  return 'foundation';
}

export function normalizeMaterialsPage(value: unknown): MaterialsPageContent {
  const page = (value || {}) as Partial<MaterialsPageContent>;
  return {
    ...defaultMaterialsPage,
    ...page,
    header: { ...defaultMaterialsPage.header, ...(page.header || {}) },
    directionTabs:
      Array.isArray(page.directionTabs) && page.directionTabs.length
        ? page.directionTabs
            .map((item) => ({
              key: readMaterialDirection(String(item?.key || 'math')),
              label: String(item?.label || ''),
              icon: String(item?.icon || 'grid')
            }))
            .slice(0, 2)
        : defaultMaterialsPage.directionTabs,
    stageTabs:
      Array.isArray(page.stageTabs) && page.stageTabs.length
        ? page.stageTabs
            .map((item) => ({
              key: readMaterialStage(String(item?.key || 'foundation')),
              label: String(item?.label || '')
            }))
            .slice(0, 3)
        : defaultMaterialsPage.stageTabs,
    mainSection: { ...defaultMaterialsPage.mainSection, ...(page.mainSection || {}) },
    shelfSection: { ...defaultMaterialsPage.shelfSection, ...(page.shelfSection || {}) },
    consultBar: { ...defaultMaterialsPage.consultBar, ...(page.consultBar || {}) }
  };
}

export function normalizeMaterialPackage(value: Record<string, unknown> | null | undefined): MaterialPackageRecord {
  return {
    ...defaultMaterialPackage,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    badge: String(value?.badge || defaultMaterialPackage.badge),
    title: String(value?.title || defaultMaterialPackage.title),
    target: String(value?.target || defaultMaterialPackage.target),
    solves: String(value?.solves || defaultMaterialPackage.solves),
    features: Array.isArray(value?.features) ? value.features.map((item) => String(item)).filter(Boolean) : defaultMaterialPackage.features,
    sort: Number(value?.sort || defaultMaterialPackage.sort),
    status: value?.status === 'published' ? 'published' : 'draft',
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined,
    _createdAt: value?._createdAt ? String(value._createdAt) : undefined,
    _updatedAt: value?._updatedAt ? String(value._updatedAt) : undefined
  };
}

export function normalizeMaterialItem(value: Record<string, unknown> | null | undefined): MaterialItemRecord {
  return {
    ...defaultMaterialItem,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    type: String(value?.type || defaultMaterialItem.type),
    title: String(value?.title || defaultMaterialItem.title),
    subtitle: String(value?.subtitle || defaultMaterialItem.subtitle),
    desc: String(value?.desc || defaultMaterialItem.desc),
    details: String(value?.details || defaultMaterialItem.details),
    accentStart: String(value?.accentStart || defaultMaterialItem.accentStart),
    accentEnd: String(value?.accentEnd || defaultMaterialItem.accentEnd),
    sort: Number(value?.sort || defaultMaterialItem.sort),
    status: value?.status === 'published' ? 'published' : 'draft',
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined,
    _createdAt: value?._createdAt ? String(value._createdAt) : undefined,
    _updatedAt: value?._updatedAt ? String(value._updatedAt) : undefined
  };
}

export function sortBySort<T extends { sort?: number }>(items: T[]) {
  return [...items].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
}
