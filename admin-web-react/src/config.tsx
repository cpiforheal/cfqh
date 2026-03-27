export type ModuleKey =
  | 'overview'
  | 'home'
  | 'directions'
  | 'questionBank'
  | 'media'
  | 'learners'
  | 'about'
  | 'contact'
  | 'accounts';

export type ModuleIconKey =
  | 'dashboard'
  | 'home'
  | 'compass'
  | 'book'
  | 'appstore'
  | 'team'
  | 'profile'
  | 'contacts'
  | 'idcard';

export type ModuleConfig = {
  key: ModuleKey;
  label: string;
  title: string;
  subtitle: string;
  pageKey: string | null;
  collections: Array<{ key: string; label: string }>;
  iconKey: ModuleIconKey;
  mode: 'overview' | 'list' | 'page' | 'mixed';
};

export const moduleConfigs: ModuleConfig[] = [
  {
    key: 'overview',
    label: '工作台',
    title: '工作台',
    subtitle: '查看运行状态、模式切换和模块接入进度。',
    pageKey: null,
    collections: [],
    iconKey: 'dashboard',
    mode: 'overview'
  },
  {
    key: 'home',
    label: '首页内容',
    title: '首页内容',
    subtitle: '按小程序真实展示顺序维护首页内容，主表先看顺序与摘要，细字段收进抽屉。',
    pageKey: 'home',
    collections: [],
    iconKey: 'home',
    mode: 'list'
  },
  {
    key: 'directions',
    label: '帖子',
    title: '帖子',
    subtitle: '使用 ProTable 管理帖子列表，支持搜索、筛选、新建与编辑。',
    pageKey: 'courses',
    collections: [{ key: 'directions', label: '帖子列表' }],
    iconKey: 'compass',
    mode: 'list'
  },
  {
    key: 'questionBank',
    label: '题库',
    title: '题库',
    subtitle: '题库页骨架已接入，批量导入与复杂编辑暂保留旧后台。',
    pageKey: 'questionBank',
    collections: [
      { key: 'medicalQuestions', label: '题目列表' },
      { key: 'pastPapers', label: '试卷列表' },
      { key: 'questionImports', label: '导入记录' }
    ],
    iconKey: 'book',
    mode: 'mixed'
  },
  {
    key: 'media',
    label: '商城',
    title: '商城',
    subtitle: '按小程序商城真实顺序维护资料内容，老师可直接编辑顶部切换、主推套系和资料卡片。',
    pageKey: 'materials',
    collections: [
      { key: 'mediaAssets', label: '素材库' },
      { key: 'materialPackages', label: '资料套餐' },
      { key: 'materialItems', label: '资料列表' }
    ],
    iconKey: 'appstore',
    mode: 'mixed'
  },
  {
    key: 'learners',
    label: '我的',
    title: '我的',
    subtitle: '学习用户主控区已切到 ProTable，适合看用户、概况、做题与错题沉淀。',
    pageKey: null,
    collections: [
      { key: 'appUsers', label: '学习用户' },
      { key: 'studyProfiles', label: '学习概况' },
      { key: 'questionProgress', label: '做题状态' },
      { key: 'wrongBookItems', label: '错题队列' }
    ],
    iconKey: 'team',
    mode: 'list'
  },
  {
    key: 'about',
    label: '关于我们',
    title: '关于我们',
    subtitle: '关于页已迁入 React 主控区，老师可按页面顺序编辑首屏、介绍、理念、环境和咨询区。',
    pageKey: 'about',
    collections: [],
    iconKey: 'profile',
    mode: 'list'
  },
  {
    key: 'contact',
    label: '联系方式',
    title: '联系方式',
    subtitle: '站点设置已迁入 React 主控区，先改品牌与联系方式，再补地址和二维码。',
    pageKey: 'site',
    collections: [],
    iconKey: 'contacts',
    mode: 'list'
  },
  {
    key: 'accounts',
    label: '账号管理',
    title: '账号管理',
    subtitle: '账号管理已迁入 React 主控区，可直接新建老师账号、分配角色和启停状态。',
    pageKey: null,
    collections: [{ key: 'adminUsers', label: '账号列表' }],
    iconKey: 'idcard',
    mode: 'list'
  }
];

export const moduleConfigMap = Object.fromEntries(moduleConfigs.map((item) => [item.key, item])) as Record<
  ModuleKey,
  ModuleConfig
>;

export const menuSections: Array<{ key: string; label: string; items: ModuleKey[] }> = [
  { key: 'workspace', label: '工作台', items: ['overview'] },
  { key: 'content', label: '内容模块', items: ['home', 'directions', 'questionBank', 'media', 'about', 'contact'] },
  { key: 'insight', label: '学习与运营', items: ['learners'] },
  { key: 'settings', label: '系统设置', items: ['accounts'] }
];

export const learnerTabs = [
  { key: 'appUsers', label: '学习用户' },
  { key: 'studyProfiles', label: '学习概况' },
  { key: 'questionProgress', label: '做题状态' },
  { key: 'wrongBookItems', label: '错题队列' }
] as const;
