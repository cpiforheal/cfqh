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
    subtitle: '按小程序真实展示顺序维护首页内容，支持 1:1 可视化映射与分区编辑。',
    pageKey: 'home',
    collections: [],
    iconKey: 'home',
    mode: 'page'
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
    subtitle: '商城页骨架已接入，批量内容维护暂保留旧后台。',
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
    subtitle: '关于页先用摘要工作台承接，详细编辑仍可走旧后台。',
    pageKey: 'about',
    collections: [],
    iconKey: 'profile',
    mode: 'page'
  },
  {
    key: 'contact',
    label: '联系方式',
    title: '联系方式',
    subtitle: '站点信息页先用摘要工作台承接，详细编辑仍可走旧后台。',
    pageKey: 'site',
    collections: [],
    iconKey: 'contacts',
    mode: 'page'
  },
  {
    key: 'accounts',
    label: '账号管理',
    title: '账号管理',
    subtitle: '账号管理将在下一阶段整体迁入，目前先提供权限状态与旧后台入口。',
    pageKey: null,
    collections: [{ key: 'adminUsers', label: '账号列表' }],
    iconKey: 'idcard',
    mode: 'mixed'
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
