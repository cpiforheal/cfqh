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

export type AdminSearchEntry = {
  key: string;
  label: string;
  hint: string;
  path: string;
  group: string;
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
    subtitle: '使用轻量表格工作台管理帖子列表，支持搜索、筛选、新建与编辑。',
    pageKey: 'courses',
    collections: [{ key: 'directions', label: '帖子列表' }],
    iconKey: 'compass',
    mode: 'list'
  },
  {
    key: 'questionBank',
    label: '题库',
    title: '题库',
    subtitle: '题库已迁入 React 主控区，可维护入口文案、题目、模拟卷和 CSV 导入记录。',
    pageKey: 'questionBank',
    collections: [
      { key: 'medicalQuestions', label: '题目列表' },
      { key: 'pastPapers', label: '试卷列表' },
      { key: 'questionImports', label: '导入记录' }
    ],
    iconKey: 'book',
    mode: 'list'
  },
  {
    key: 'media',
    label: '商城',
    title: '商城',
    subtitle: '按小程序商城真实顺序维护区块、商品、内容项和资料资产，小程序前端 UI 暂时保持不变。',
    pageKey: 'materials',
    collections: [
      { key: 'mallAssets', label: '资料资产' },
      { key: 'mallProducts', label: '商城商品' },
      { key: 'mallProductItems', label: '商品内容项' },
      { key: 'mallEntitlements', label: '用户权益' }
    ],
    iconKey: 'appstore',
    mode: 'mixed'
  },
  {
    key: 'learners',
    label: '我的',
    title: '我的',
    subtitle: '学习用户主控区已切到轻量表格工作台，适合看用户、概况、做题与错题沉淀。',
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
  { key: 'workspace', label: '开始使用', items: ['overview'] },
  { key: 'portal', label: '首页与门户', items: ['home', 'about', 'contact'] },
  { key: 'learning', label: '课程与题库', items: ['directions', 'questionBank'] },
  { key: 'commerce', label: '商城与资料', items: ['media'] },
  { key: 'operations', label: '学习与账号', items: ['learners', 'accounts'] }
];

export const adminSearchEntries: AdminSearchEntry[] = [
  { key: 'module-overview', label: '工作台', hint: '查看常用任务、最近修改和当前环境', path: '/overview', group: '开始使用' },
  { key: 'module-home', label: '首页内容', hint: '按首页从上到下维护区块', path: '/home', group: '首页与门户' },
  { key: 'home-daily', label: '首页 · 今日学习主卡', hint: '修改首页首屏主卡文案和按钮', path: '/home?section=dailyCard', group: '首页与门户' },
  { key: 'home-entries', label: '首页 · 四个快捷入口', hint: '修改首页四个功能入口', path: '/home?section=quickEntries', group: '首页与门户' },
  { key: 'home-resources', label: '首页 · 资源卡片', hint: '修改首页底部两张资源卡', path: '/home?section=resources', group: '首页与门户' },
  { key: 'module-about', label: '关于我们', hint: '维护机构介绍、理念和环境图', path: '/about', group: '首页与门户' },
  { key: 'about-hero', label: '关于我们 · 首屏', hint: '先改最上面的标题和说明', path: '/about?section=hero', group: '首页与门户' },
  { key: 'module-contact', label: '联系方式', hint: '维护品牌名、电话、微信和地址', path: '/contact', group: '首页与门户' },
  { key: 'contact-phone', label: '联系方式 · 电话微信', hint: '优先修改电话、微信和服务时间', path: '/contact?section=contact', group: '首页与门户' },
  { key: 'module-directions', label: '帖子', hint: '管理帖子列表与详情', path: '/directions', group: '课程与题库' },
  { key: 'module-question-bank', label: '题库', hint: '维护题目、模拟卷和导入记录', path: '/questionBank', group: '课程与题库' },
  { key: 'module-media', label: '商城', hint: '按前台顺序维护商品卡、资产和权益', path: '/media', group: '商城与资料' },
  { key: 'media-products', label: '商城 · 商品卡', hint: '新增或编辑前台商品卡', path: '/media?panel=products', group: '商城与资料' },
  { key: 'media-assets', label: '商城 · 资料资产', hint: '先上传和整理商城资产', path: '/media?panel=assets', group: '商城与资料' },
  { key: 'media-entitlements', label: '商城 · 用户权益', hint: '查看谁已经获得资料权限', path: '/media?panel=entitlements', group: '商城与资料' },
  { key: 'module-learners', label: '我的', hint: '查看学习用户、做题状态和错题沉淀', path: '/learners', group: '学习与账号' },
  { key: 'module-accounts', label: '账号管理', hint: '新建老师账号并分配角色', path: '/accounts', group: '学习与账号' }
];

export const overviewQuickTasks: Array<{ title: string; desc: string; path: string; tone?: 'primary' | 'default' }> = [
  { title: '先改首页主卡', desc: '最容易被学生看见的入口', path: '/home?section=dailyCard', tone: 'primary' },
  { title: '补齐商城商品卡', desc: '从资产组合成前台商品', path: '/media?panel=products', tone: 'primary' },
  { title: '更新电话和微信', desc: '多个页面会共用这一组信息', path: '/contact?section=contact' },
  { title: '查看学习用户', desc: '快速看近期用户状态', path: '/learners' },
  { title: '维护关于我们首屏', desc: '先补品牌介绍和机构定位', path: '/about?section=hero' },
  { title: '新建老师账号', desc: '添加后台新成员和角色', path: '/accounts' }
];

export const learnerTabs = [
  { key: 'appUsers', label: '学习用户' },
  { key: 'studyProfiles', label: '学习概况' },
  { key: 'questionProgress', label: '做题状态' },
  { key: 'wrongBookItems', label: '错题队列' }
] as const;
