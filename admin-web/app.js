const NAV_ITEMS = [
  { key: 'overview', label: '总览', icon: 'grid' },
  { key: 'directions', label: '方向', icon: 'compass' },
  { key: 'questionBank', label: '题库', icon: 'search' },
  { key: 'teachers', label: '师资', icon: 'users' },
  { key: 'results', label: '成果', icon: 'award' },
  { key: 'about', label: '关于', icon: 'info' },
  { key: 'contact', label: '联系', icon: 'phone' },
  { key: 'media', label: '媒体', icon: 'image' }
];

const VIEW_CONFIG = {
  overview: {
    key: 'overview',
    kicker: 'CMS',
    breadcrumb: 'Dashboard',
    title: '总览',
    subtitle: '实时查看当前 CMS 内容状态与最近更新。'
  },
  home: {
    key: 'home',
    kicker: '内容',
    breadcrumb: '首页配置',
    title: '首页配置',
    subtitle: '维护首页 Hero、优势、环境与 CTA 等内容。', 
    pageKey: 'home',
    pageLabel: '首页页面',
    collections: []
  },
  directions: {
    key: 'directions',
    kicker: '内容',
    breadcrumb: '开设方向',
    title: '方向管理',
    subtitle: '维护方向页配置与方向列表。',
    pageKey: 'courses',
    pageLabel: '开设方向页面',
    collections: [{ key: 'directions', label: '方向列表' }]
  },
  questionBank: {
    key: 'questionBank',
    kicker: '内容',
    breadcrumb: '医护题库',
    title: '题库管理',
    subtitle: '维护三个题库子页面当前真实显示的标题与说明，并通过 CSV 热更新模拟题题目与套卷。',
    pageKey: 'questionBank',
    pageLabel: '题库页面',
    collections: [
      { key: 'medicalQuestions', label: '模拟题题目' },
      { key: 'pastPapers', label: '模拟题套卷' },
      { key: 'questionImports', label: '纯文本导入' }
    ]
  },
  teachers: {
    key: 'teachers',
    kicker: '内容',
    breadcrumb: '师资团队',
    title: '师资管理',
    subtitle: '维护师资页配置与教师条目。',
    pageKey: 'teachers',
    pageLabel: '师资页面',
    collections: [{ key: 'teachers', label: '师资列表' }]
  },
  results: {
    key: 'results',
    kicker: '内容',
    breadcrumb: '办学成果',
    title: '成果管理',
    subtitle: '维护成果页配置与成果案例。',
    pageKey: 'success',
    pageLabel: '成果页面',
    collections: [{ key: 'successCases', label: '成果案例' }]
  },
  about: {
    key: 'about',
    kicker: '内容',
    breadcrumb: '关于我们',
    title: '关于我们',
    subtitle: '维护机构介绍、理念与环境展示内容。',
    pageKey: 'about',
    pageLabel: '关于我们页面',
    collections: []
  },
  contact: {
    key: 'contact',
    kicker: '内容',
    breadcrumb: '联系方式',
    title: '站点设置',
    subtitle: '维护机构名称、电话、微信、地址等公共信息。',
    pageKey: 'site',
    pageLabel: '站点设置',
    collections: []
  },
  media: {
    key: 'media',
    kicker: '内容',
    breadcrumb: '媒体资源',
    title: '资源中心',
    subtitle: '维护教材资料页面、媒体资源和资料条目。',
    pageKey: 'materials',
    pageLabel: '教材资料页面',
    collections: [
      { key: 'mediaAssets', label: '媒体资源' },
      { key: 'materialSeries', label: '教材套系' },
      { key: 'materialItems', label: '教材单品' }
    ]
  }
};

const ICONS = {
  grid: '<rect x="4" y="4" width="6" height="6" rx="1.5"></rect><rect x="14" y="4" width="6" height="6" rx="1.5"></rect><rect x="4" y="14" width="6" height="6" rx="1.5"></rect><rect x="14" y="14" width="6" height="6" rx="1.5"></rect>',
  compass: '<circle cx="12" cy="12" r="8"></circle><path d="m14.8 9.2-2.2 5.6-5.6 2.2 2.2-5.6 5.6-2.2Z"></path>',
  users: '<path d="M16 19a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4"></path><circle cx="10" cy="7" r="3"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>',
  award: '<circle cx="12" cy="8" r="4"></circle><path d="m8.5 12.5-1.3 7 4.8-2.6 4.8 2.6-1.3-7"></path>',
  info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 10v6"></path><path d="M12 7h.01"></path>',
  phone: '<path d="M21 16.2v3a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 10.7 18a18.1 18.1 0 0 1-5.7-5.7A18.5 18.5 0 0 1 1.8 4.2 2 2 0 0 1 3.8 2h3a2 2 0 0 1 2 1.7l.3 2.3a2 2 0 0 1-.6 1.6L7.2 9a14 14 0 0 0 7.8 7.8l1.2-1.3a2 2 0 0 1 1.6-.6l2.3.3a2 2 0 0 1 1.7 2Z"></path>',
  image: '<rect x="4" y="4" width="16" height="16" rx="2"></rect><circle cx="9" cy="9" r="1.5"></circle><path d="m20 15-4.2-4.2a1 1 0 0 0-1.4 0L8 17"></path>',
  search: '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path>',
  bell: '<path d="M15 17h5l-1.3-1.3a2 2 0 0 1-.7-1.5V11a6 6 0 0 0-12 0v3.2a2 2 0 0 1-.7 1.5L4 17h5"></path><path d="M10 17a2 2 0 0 0 4 0"></path>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.9-4"></path><path d="M4 4v4h4"></path><path d="M4 13a8 8 0 0 0 14.9 4"></path><path d="M20 20v-4h-4"></path>',
  chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
  chevronRight: '<path d="m9 18 6-6-6-6"></path>',
  close: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>',
  edit: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  trash: '<path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>'
};

const state = {
  theme: 'light',
  activeView: 'overview',
  loading: false,
  sidebarCollapsed: false,
  meta: null,
  health: null,
  currentData: null,
  error: '',
  viewUi: {}
};

const refs = {
  app: document.getElementById('app'),
  nav: document.getElementById('sidebar-nav'),
  topbarKicker: document.getElementById('topbar-kicker'),
  topbarBreadcrumb: document.getElementById('topbar-breadcrumb'),
  viewTitle: document.getElementById('view-title'),
  statusPill: document.getElementById('status-pill'),
  sidebarCollapse: document.getElementById('sidebar-collapse'),
  themeToggle: document.getElementById('theme-toggle'),
  topbarSearch: document.getElementById('topbar-search'),
  topbarAlerts: document.getElementById('topbar-alerts'),
  refreshView: document.getElementById('refresh-view'),
  content: document.getElementById('content')
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function icon(name, className = '') {
  const body = ICONS[name] || ICONS.grid;
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function preferredTheme() {
  const saved = localStorage.getItem('admin-web-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function preferredSidebarCollapsed() {
  return localStorage.getItem('admin-web-sidebar') === 'collapsed';
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  refs.themeToggle.textContent = theme === 'dark' ? '切换亮色' : '切换暗色';
  refs.themeToggle.title = theme === 'dark' ? '切换为亮色主题' : '切换为暗色主题';
  refs.themeToggle.setAttribute('aria-label', refs.themeToggle.title);
  localStorage.setItem('admin-web-theme', theme);
}

function applySidebarCollapsed(collapsed) {
  state.sidebarCollapsed = collapsed;
  refs.app.dataset.sidebar = collapsed ? 'collapsed' : 'expanded';
  refs.sidebarCollapse.innerHTML = icon(collapsed ? 'chevronRight' : 'chevronLeft');
  refs.sidebarCollapse.title = collapsed ? '展开侧边栏' : '收起侧边栏';
  refs.sidebarCollapse.setAttribute('aria-label', refs.sidebarCollapse.title);
  localStorage.setItem('admin-web-sidebar', collapsed ? 'collapsed' : 'expanded');
}

function finishBootAnimation() {
  if (refs.app.dataset.boot === 'ready') return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      refs.app.dataset.boot = 'ready';
    });
  });
}

function formatDateTime(value) {
  if (!value) return '未记录';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function formatRelative(value) {
  if (!value) return '未更新';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '未更新';
  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  return `${Math.floor(diff / day)} 天前`;
}

function isToday(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
}

function request(path, options = {}) {
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  }).then(async (response) => {
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
      throw new Error(payload.message || `请求失败: ${response.status}`);
    }
    return payload;
  });
}

function getViewUi(viewKey = state.activeView) {
  if (!state.viewUi[viewKey]) {
    state.viewUi[viewKey] = {
      selectedIds: {},
      drafts: {},
      filters: {},
      statusFilters: {},
      openEditors: {}
    };
  }
  return state.viewUi[viewKey];
}

const QUESTION_BANK_CSV_HEADERS = [
  'questionId',
  'direction',
  'questionType',
  'stem',
  'optionA',
  'optionB',
  'optionC',
  'optionD',
  'optionE',
  'optionF',
  'answer',
  'explanation',
  'year',
  'paperId',
  'paperTitle',
  'paperDescription',
  'tags',
  'status'
];

function getQuestionBankImportUi() {
  const ui = getViewUi('questionBank');
  if (!ui.csvImport) {
    ui.csvImport = {
      fileName: '',
      csvText: '',
      preview: null,
      lastSummary: null,
      isSubmitting: false
    };
  }
  return ui.csvImport;
}

function resetQuestionBankImportUi(options = {}) {
  const { keepLastSummary = true } = options;
  const ui = getQuestionBankImportUi();
  ui.fileName = '';
  ui.csvText = '';
  ui.preview = null;
  ui.isSubmitting = false;
  if (!keepLastSummary) {
    ui.lastSummary = null;
  }
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('读取 CSV 失败，请重新选择文件。'));
    reader.readAsText(file, 'utf-8');
  });
}

async function previewQuestionBankCsvFile(file) {
  if (!file) return;
  if (!/\.csv$/i.test(file.name || '')) {
    throw new Error('当前只支持导入 .csv 文件。');
  }

  const csvText = await readTextFile(file);
  if (!csvText.trim()) {
    throw new Error('CSV 内容为空，请检查文件后再上传。');
  }

  setStatus('正在校验题库 CSV...', 'loading');
  const result = await request('/api/import/question-bank-csv/preview', {
    method: 'POST',
    body: JSON.stringify({
      fileName: file.name,
      csvText
    })
  });

  const ui = getViewUi('questionBank');
  const importUi = getQuestionBankImportUi();
  importUi.fileName = file.name;
  importUi.csvText = csvText;
  importUi.preview = result.data || null;
  ui.openEditors.questionBankCsvImport = true;

  renderModule(VIEW_CONFIG[state.activeView], state.currentData);
  const invalidCount = Number(result.data?.invalidCount || 0);
  if (invalidCount > 0) {
    setStatus(`CSV 已载入，发现 ${invalidCount} 行需要修正。`, 'error');
    return;
  }

  setStatus(`CSV 校验通过，共 ${result.data?.validCount || 0} 行可导入。`);
}

async function commitQuestionBankCsvImport() {
  const ui = getViewUi('questionBank');
  const importUi = getQuestionBankImportUi();
  if (!importUi.csvText || !importUi.preview) {
    throw new Error('请先选择 CSV 并完成预览校验。');
  }
  if (Number(importUi.preview.invalidCount || 0) > 0) {
    throw new Error('当前 CSV 仍有错误，请先修正后再导入。');
  }

  importUi.isSubmitting = true;
  renderModule(VIEW_CONFIG[state.activeView], state.currentData);
  setStatus('正在导入题库 CSV...', 'loading');

  try {
    const result = await request('/api/import/question-bank-csv/commit', {
      method: 'POST',
      body: JSON.stringify({
        fileName: importUi.fileName,
        csvText: importUi.csvText
      })
    });
    importUi.lastSummary = result.data || null;
    resetQuestionBankImportUi();
    ui.openEditors.questionBankCsvImport = false;
    await renderActiveView(true);
    setStatus(`CSV 导入完成，新增 ${result.data?.createdCount || 0} 题，更新 ${result.data?.updatedCount || 0} 题。`);
  } catch (error) {
    importUi.isSubmitting = false;
    renderModule(VIEW_CONFIG[state.activeView], state.currentData);
    throw error;
  }
}

function getCollectionMeta(collectionKey) {
  return state.meta?.listOptions?.find((item) => item.key === collectionKey) || { key: collectionKey, label: collectionKey };
}

function getPrimaryLabel(item, collectionKey) {
  if (!item) return '未命名';
  if (collectionKey === 'directions') return item.name || item.slug || item._id || '未命名方向';
  if (collectionKey === 'medicalQuestions') return item.stem || item.questionId || item._id || '未命名题目';
  if (collectionKey === 'pastPapers') return item.title || item.paperId || item._id || '未命名试卷';
  if (collectionKey === 'questionImports') return item.title || item.sourceType || item._id || '未命名导入';
  if (collectionKey === 'teachers') return item.name || item.role || item._id || '未命名老师';
  if (collectionKey === 'successCases') return item.title || item.subtitle || item._id || '未命名案例';
  if (collectionKey === 'materialSeries') return item.name || item.slug || item._id || '未命名套系';
  if (collectionKey === 'materialItems') return item.title || item.subtitle || item._id || '未命名单品';
  if (collectionKey === 'mediaAssets') return item.name || item.alt || item.url || item._id || '未命名资源';
  return item.title || item.name || item.label || item._id || '未命名条目';
}

function getSecondaryLabel(item, collectionKey) {
  if (!item) return '';
  if (collectionKey === 'directions') return [item.category, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'medicalQuestions') return [item.direction, item.questionType, item.year, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'pastPapers') return [item.direction, item.year, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'questionImports') return [item.direction, item.sourceType, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'teachers') return [item.role, item.tag].filter(Boolean).join(' / ');
  if (collectionKey === 'successCases') return [item.category, item.year].filter(Boolean).join(' / ');
  if (collectionKey === 'materialSeries') return [item.category, item.tag].filter(Boolean).join(' / ');
  if (collectionKey === 'materialItems') return [item.type, item.stage].filter(Boolean).join(' / ');
  if (collectionKey === 'mediaAssets') return [item.module, item.type, item.status].filter(Boolean).join(' / ');
  return [item.status, item.updatedAt || item._updatedAt].filter(Boolean).join(' / ');
}

function getUpdatedAt(entry) {
  return entry?.updatedAt || entry?._updatedAt || entry?.createdAt || entry?._createdAt || '';
}

function resolveViewFromPageKey(pageKey) {
  if (pageKey === 'site') return 'contact';
  if (pageKey === 'courses') return 'directions';
  if (pageKey === 'success') return 'results';
  if (pageKey === 'materials') return 'media';
  return pageKey;
}

const FIELD_LABELS = {
  _id: 'ID',
  siteName: '站点名称',
  brandName: '品牌名称',
  contactPhone: '联系电话',
  contactWechat: '微信号',
  contactQrcode: '二维码链接',
  contactQrcodeUrl: '二维码图片 URL',
  address: '地址',
  serviceHours: '服务时间',
  intro: '机构简介',
  hero: '首页大屏主视觉',
  chip: '首页大屏小角标',
  title: '标题',
  highlightTitle: '主标题第二行',
  desc: '说明',
  secondaryNote: '补充说明',
  backgroundImageUrl: '背景图 URL',
  backgroundImageSeed: '背景图 Seed',
  imageUrl: '图片 URL',
  imageSeed: '图片 Seed',
  tags: '首页大屏标签',
  primaryButton: '首页大屏按钮',
  text: '文案',
  url: '链接',
  openType: '打开方式',
  overviewStats: '首屏数据卡（3项）',
  value: '值',
  label: '标签',
  note: '备注',
  quickLinks: '首页四个功能入口',
  icon: '图标',
  advantages: '学习支持（热门方向下方）',
  directionsIntro: '方向介绍',
  featuredDirectionIds: '热门方向展示 ID',
  moreDirectionCard: '更多方向卡片',
  environmentSection: '校区环境（咨询区上方）',
  subtitle: '副标题',
  cards: '卡片',
  cta: '底部咨询区（环境下方）',
  buttonText: '按钮文案',
  footnote: '底部说明',
  categories: '分类',
  suggestions: '建议',
  featuredSeriesIds: '精选套系 ID',
  introCard: '介绍卡片',
  features: '优势项',
  stats: '成果统计',
  values: '理念内容',
  environmentImages: '环境图片',
  tabs: '分类标签',
  questionBank: '题库配置',
  dailyQuestionCard: '每日一题页',
  pastPapersCard: '模拟题页',
  wrongBookCard: '错题本页',
  importGuide: '导入说明',
  templateText: '模板文本',
  questionId: '题目 ID',
  direction: '方向',
  questionType: '题型',
  stem: '题干',
  options: '选项',
  answer: '答案',
  explanation: '解析',
  paperId: '试卷 ID',
  questionIds: '题目 ID 列表',
  sourceType: '来源类型',
  rawText: '纯文本内容',
  name: '名称',
  slug: 'Slug',
  category: '分类',
  isFeatured: '首页精选',
  featuredTag: '精选标签',
  homeTag: '首页标签',
  summary: '摘要',
  audience: '适合人群',
  chips: '标签组',
  iconType: '图标类型',
  homeCard: '首页卡片',
  coursesCard: '方向卡片',
  sort: '排序',
  status: '状态',
  role: '角色',
  tag: '标签',
  tagColor: '标签颜色',
  tagBackground: '标签背景色',
  headerBackground: '头部背景色',
  iconColor: '图标颜色',
  background: '背景',
  iconBg: '图标背景',
  style: '样式',
  avatarUrl: '头像 URL',
  avatarSeed: '头像 Seed',
  specialties: '擅长',
  coverUrl: '封面 URL',
  coverSeed: '封面 Seed',
  year: '年份',
  accent: '主题色',
  shelfLabel: '书架标签',
  items: '条目',
  seriesId: '套系 ID',
  type: '类型',
  stage: '阶段',
  contents: '目录',
  module: '所属模块',
  thumbUrl: '缩略图 URL',
  alt: '替代文本'
};

const TEXTAREA_FIELDS = new Set(['desc', 'intro', 'summary', 'subtitle', 'audience', 'footnote', 'stem', 'explanation', 'rawText', 'templateText']);
const LINE_LIST_FIELDS = new Set([
  'tags',
  'chips',
  'categories',
  'suggestions',
  'features',
  'featuredDirectionIds',
  'featuredSeriesIds',
  'tabs',
  'specialties',
  'contents',
  'questionIds'
]);
const OBJECT_ARRAY_FIELDS = new Set([
  'overviewStats',
  'quickLinks',
  'advantages',
  'cards',
  'features',
  'stats',
  'values',
  'environmentImages',
  'options'
]);
const ARRAY_TEMPLATES = {
  overviewStats: { value: '', label: '', note: '' },
  quickLinks: { label: '', desc: '', url: '', openType: 'navigate', icon: '' },
  advantages: { icon: '', title: '', desc: '' },
  cards: { label: '', imageUrl: '' },
  features: { title: '', desc: '' },
  stats: { value: '', label: '', note: '' },
  values: { title: '', desc: '' },
  environmentImages: { label: '', imageUrl: '', imageSeed: '' },
  options: { id: '', text: '' },
  tags: '',
  categories: '',
  suggestions: '',
  featuredDirectionIds: '',
  featuredSeriesIds: '',
  tabs: '',
  specialties: '',
  contents: '',
  questionIds: ''
};
const SELECT_FIELD_OPTIONS = {
  status: [
    { value: 'published', label: '已发布' },
    { value: 'draft', label: '草稿' },
    { value: 'archived', label: '归档' },
    { value: 'deleted', label: '已删除' }
  ],
  openType: [
    { value: 'navigate', label: '页面跳转' },
    { value: 'switchTab', label: 'Tab 切换' },
    { value: 'reLaunch', label: '重新进入' }
  ],
  direction: [
    { value: 'medical', label: '医护' }
  ],
  questionType: [
    { value: 'single_choice', label: '单选题' },
    { value: 'multiple_choice', label: '多选题' },
    { value: 'judge', label: '判断题' },
    { value: 'case_analysis', label: '案例题' }
  ],
  sourceType: [
    { value: 'daily', label: '每日一题' },
    { value: 'paper', label: '模拟题' },
    { value: 'wrongbook', label: '错题整理' },
    { value: 'file', label: '文件导入' }
  ],
  role: [
    { value: 'owner', label: 'Owner' },
    { value: 'editor', label: 'Editor' }
  ],
  type: [
    { value: 'image', label: '图片' },
    { value: 'video', label: '视频' },
    { value: 'file', label: '文件' }
  ]
};

const COMPANION_FIELDS = {
  backgroundImageSeed: 'backgroundImageUrl',
  imageSeed: 'imageUrl',
  avatarSeed: 'avatarUrl',
  coverSeed: 'coverUrl'
};

const HOME_EDITOR_HIDDEN_PATHS = new Set([
  'hero.secondaryNote',
  'hero.backgroundImageSeed',
  'overviewStats.*.note',
  'quickLinks.*.desc',
  'directionsIntro',
  'moreDirectionCard',
  'environmentSection.title',
  'environmentSection.subtitle',
  'environmentSection.cards.*.imageSeed',
  'cta.footnote'
]);

const QUESTION_BANK_EDITOR_HIDDEN_PATHS = new Set([
  'hero',
  'importGuide',
  'dailyQuestionCard.buttonText',
  'pastPapersCard.buttonText',
  'wrongBookCard.buttonText'
]);

const HOME_EDITOR_ARRAY_RULES = {
  overviewStats: { visibleItems: 3, maxItems: 3 },
  quickLinks: { visibleItems: 4, maxItems: 4 },
  advantages: { visibleItems: 4, maxItems: 4 },
  'environmentSection.cards': { visibleItems: 2, maxItems: 2 }
};

const COURSES_EDITOR_ARRAY_RULES = {
  categories: { visibleItems: 3, maxItems: 3 },
  suggestions: { visibleItems: 3, maxItems: 3 },
  featuredDirectionIds: { visibleItems: 2, maxItems: 2 }
};

const EDITOR_LAYOUTS = {
  'page:home': {
    hero: {
      title: '首页主配置',
      desc: '这里的条目已经按首页真实顺序拆开：首页大屏主视觉、首屏数据卡、四个功能入口、热门方向、学习支持、校区环境、底部咨询区。'
    },
    sections: [
      {
        title: '首页大屏主视觉',
        desc: '对应首页最上方第一屏的大标题区，包括小角标、两行主标题、说明、标签和首个按钮。',
        keys: ['hero']
      },
      {
        title: '首屏数据卡',
        desc: '对应首屏下面的 3 个数字卡片。',
        keys: ['overviewStats']
      },
      {
        title: '首页四个功能入口',
        desc: '对应“机构介绍 / 每日一题 / 模拟题 / 错题本”这 4 个入口。',
        keys: ['quickLinks']
      },
      {
        title: '热门方向',
        desc: '对应四个入口下方的热门方向大卡片，目前通过方向 ID 控制。',
        keys: ['featuredDirectionIds']
      },
      {
        title: '学习支持',
        desc: '对应热门方向下方的 4 张学习支持卡片，最后一张会以更轻的学情评估样式展示。',
        keys: ['advantages']
      }
    ],
    secondarySections: [
      {
        title: '校区环境',
        desc: '对应底部咨询区上方的环境图片区块。',
        keys: ['environmentSection']
      },
      {
        title: '底部咨询区',
        desc: '对应页面最下方的蓝色咨询转化卡片。',
        keys: ['cta']
      },
    ],
    foldLabel: '更多首页区块'
  },
  'page:site': {
    hero: {
      title: '站点公共信息',
      desc: '先看品牌与联系方式，二维码、地址和简介放到补充区块，避免视觉拥挤。'
    },
    sections: [
      {
        title: '品牌与联系',
        desc: '对应关于我们页“联系方式”卡片中的品牌名、电话、微信和服务时间。',
        keys: ['siteName', 'brandName', 'contactPhone', 'contactWechat', 'serviceHours']
      }
    ],
    secondarySections: [
      {
        title: '补充信息',
        desc: '对应关于我们页联系方式卡片下半部分的二维码、地址和机构简介。',
        keys: ['contactQrcode', 'contactQrcodeUrl', 'address', 'intro']
      }
    ],
    foldLabel: '站点补充区块'
  },
  'collection:directions': {
    hero: {
      title: '方向核心信息',
      desc: '先处理名称、分类、状态和摘要，这些是最影响展示与定位的字段。'
    },
    sections: [
      {
        title: '核心字段',
        desc: '对应首页热门方向卡和方向页列表卡最核心的名称、分类与简介。',
        keys: ['name', 'category', 'status', 'sort', 'isFeatured', 'summary']
      },
      {
        title: '内容表达',
        desc: '对应方向卡里的适合人群与文案重点。',
        keys: ['audience']
      }
    ],
    jsonFields: ['features', 'chips', 'slug', 'tags', 'featuredTag', 'homeTag', 'homeCard', 'coursesCard'],
    jsonLabel: '补充字段 JSON',
    foldLabel: '补充字段（JSON）'
  },
  'collection:teachers': {
    hero: {
      title: '师资核心信息',
      desc: '先改姓名、角色、擅长与简介，次要资源字段先收起来，避免编辑时分散注意力。'
    },
    sections: [
      {
        title: '核心字段',
        desc: '对应师资页老师卡片最直接展示的姓名、身份、标签和排序。',
        keys: ['name', 'role', 'tag', 'status', 'sort', 'specialties']
      },
      {
        title: '内容表达',
        desc: '对应老师卡片里的简介和补充文案。',
        keys: ['summary', 'desc', 'subtitle']
      },
      {
        title: '展示资源',
        desc: '对应师资卡片里的头像资源。',
        keys: ['avatarUrl', 'avatarSeed']
      }
    ]
  },
  'page:courses': {
    hero: {
      title: '方向页主配置',
      desc: '这里维护的是开设方向页当前真实会显示的判断首屏、两张重点方向卡片和咨询承接区，保存后会直接对应前端页面。'
    },
    sections: [
      {
        title: '方向判断首屏',
        desc: '对应方向页最上方的主标题、说明、判断标签和 3 条判断提示。',
        keys: ['title', 'subtitle', 'categories', 'suggestions']
      },
      {
        title: '两张重点方向卡片',
        desc: '对应页面中间两张重点方向大卡片，当前通过方向 ID 控制展示顺序。',
        keys: ['featuredDirectionIds']
      }
    ],
    secondarySections: [
      {
        title: '底部咨询承接区',
        desc: '对应方向页最下方的咨询承接卡片。',
        keys: ['cta']
      },
      {
        title: '底部补充说明',
        desc: '对应方向页咨询区下方的轻量补充说明。',
        keys: ['moreSection']
      }
    ],
    foldLabel: '更多方向页区块'
  },
  'page:teachers': {
    hero: {
      title: '师资页主配置',
      desc: '首屏、介绍卡片和优势项先放在主区，CTA 收到补充区块里，查看更顺。'
    },
    sections: [
      {
        title: '页面主信息',
        desc: '对应师资页首屏、介绍卡和核心优势区。',
        keys: ['hero', 'introCard', 'features']
      }
    ],
    secondarySections: [
      {
        title: '底部 CTA',
        desc: '对应师资页底部咨询引导区。',
        keys: ['cta']
      }
    ],
    foldLabel: '师资页补充区块'
  },
  'page:success': {
    hero: {
      title: '成果页主配置',
      desc: '先聚焦首屏和统计数据，CTA 放到二级区块，避免字段之间互相挤压。'
    },
    sections: [
      {
        title: '页面主信息',
        desc: '对应成果页首屏和顶部成果数据卡。',
        keys: ['hero', 'stats']
      }
    ],
    secondarySections: [
      {
        title: '底部 CTA',
        desc: '对应成果页底部咨询引导区。',
        keys: ['cta']
      }
    ],
    foldLabel: '成果页补充区块'
  },
  'page:about': {
    hero: {
      title: '关于页主配置',
      desc: '主区保留首屏、介绍和理念内容，环境图片与 CTA 放入补充区块，避免一屏塞太满。'
    },
    sections: [
      {
        title: '页面主信息',
        desc: '对应关于页首屏、介绍卡和机构理念卡片。',
        keys: ['hero', 'introCard', 'values']
      }
    ],
    secondarySections: [
      {
        title: '环境展示',
        desc: '对应关于页校区环境图片区。',
        keys: ['environmentImages']
      },
      {
        title: '底部 CTA',
        desc: '对应关于页底部咨询引导区。',
        keys: ['cta']
      }
    ],
    foldLabel: '关于页补充区块'
  },
  'page:materials': {
    hero: {
      title: '资料页主配置',
      desc: '先看首屏、标签和总览统计，精选套系与 CTA 放到二级区块里，层次会清楚很多。'
    },
    sections: [
      {
        title: '页面主信息',
        desc: '对应资料页首屏、顶部分类标签和总览统计卡。',
        keys: ['hero', 'tabs', 'overviewStats']
      }
    ],
    secondarySections: [
      {
        title: '推荐与 CTA',
        desc: '对应资料页精选套系推荐和底部咨询区。',
        keys: ['featuredSeriesIds', 'cta']
      }
    ],
    foldLabel: '资料页补充区块'
  },
  'page:questionBank': {
    hero: {
      title: '题库页主配置',
      desc: '这里维护的是三个题库子页面当前真实会显示的首屏文案，改完保存后会直接对应到小程序页面。'
    },
    sections: [
      {
        title: '每日一题页',
        desc: '对应小程序每日一题入口打开后的页面标题和说明。',
        keys: ['dailyQuestionCard']
      },
      {
        title: '模拟题页',
        desc: '对应小程序模拟题入口打开后的页面标题和说明。',
        keys: ['pastPapersCard']
      },
      {
        title: '错题本页',
        desc: '对应小程序错题本入口打开后的页面标题和说明。',
        keys: ['wrongBookCard']
      }
    ]
  },
  'collection:medicalQuestions': {
    hero: {
      title: '模拟题题目',
      desc: '这里维护模拟题里的题目明细，先看题号、题型和所属试卷，再补题干、答案与解析。'
    },
    sections: [
      {
        title: '核心字段',
        desc: '对应模拟题题目最基础的题号、题型、年份和所属试卷。',
        keys: ['questionId', 'direction', 'questionType', 'year', 'paperId', 'status', 'sort']
      },
      {
        title: '题干与答案',
        desc: '对应小程序做题页里的题干、选项、答案和解析。',
        keys: ['stem', 'options', 'answer', 'explanation']
      },
      {
        title: '标签',
        desc: '对应题目补充标签。',
        keys: ['tags']
      }
    ]
  },
  'collection:pastPapers': {
    hero: {
      title: '模拟题套卷',
      desc: '先维护套卷标题、年份、方向和状态，再补题目 ID 列表和摘要说明。'
    },
    sections: [
      {
        title: '核心字段',
        desc: '对应模拟题列表页里展示的试卷标题、年份和方向。',
        keys: ['paperId', 'title', 'year', 'direction', 'status', 'sort']
      },
      {
        title: '试卷内容',
        desc: '对应试卷说明和题目列表归属。',
        keys: ['description', 'questionIds']
      }
    ]
  },
  'collection:questionImports': {
    hero: {
      title: '纯文本导入',
      desc: '支持直接粘贴原始题文、整卷文本或错题整理，先保存原文，后续再做结构化处理。'
    },
    sections: [
      {
        title: '导入信息',
        desc: '对应纯文本导入记录的标题、来源和状态。',
        keys: ['title', 'direction', 'sourceType', 'status', 'sort']
      },
      {
        title: '原始文本',
        desc: '对应待解析的原始题文内容。',
        keys: ['rawText']
      },
      {
        title: '补充说明',
        desc: '对应导入记录备注。',
        keys: ['note']
      }
    ]
  }
};

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function blankLike(value) {
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).map((key) => [key, blankLike(value[key])]));
  }
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  return '';
}

function isIndexedObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => /^\d+$/.test(key));
}

function normalizeCmsValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeCmsValue(item));
  }

  if (isIndexedObject(value)) {
    return Object.keys(value)
      .sort((left, right) => Number(left) - Number(right))
      .map((key) => normalizeCmsValue(value[key]));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, itemValue]) => [key, normalizeCmsValue(itemValue)]));
  }

  return value;
}

function humanizeLabel(key) {
  return FIELD_LABELS[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('_', ' ');
}

const SCOPED_FIELD_LABELS = {
  'page:home': {
    hero: '首页大屏主视觉',
    'hero.chip': '首页大屏小角标',
    'hero.title': '首页大屏第一行标题',
    'hero.highlightTitle': '首页大屏第二行标题',
    'hero.desc': '首页大屏说明',
    'hero.backgroundImageUrl': '首页大屏背景图 URL',
    'hero.tags': '首页大屏标签',
    'hero.primaryButton': '首页大屏按钮',
    'hero.primaryButton.text': '首页大屏按钮文案',
    'hero.primaryButton.url': '首页大屏按钮跳转地址',
    'hero.primaryButton.openType': '首页大屏按钮跳转方式',
    overviewStats: '首屏数据卡',
    'overviewStats.*': '数据卡',
    'overviewStats.*.value': '数据卡数值',
    'overviewStats.*.label': '数据卡标签',
    quickLinks: '首页四个功能入口',
    'quickLinks.*': '功能入口',
    'quickLinks.*.label': '入口标题',
    'quickLinks.*.url': '入口跳转地址',
    'quickLinks.*.openType': '入口跳转方式',
    'quickLinks.*.icon': '入口图标标识',
    featuredDirectionIds: '热门方向展示 ID',
    advantages: '学习支持',
    'advantages.*': '学习支持卡片',
    'advantages.*.icon': '卡片图标标识',
    'advantages.*.title': '卡片标题',
    'advantages.*.desc': '卡片说明',
    environmentSection: '校区环境',
    'environmentSection.cards': '环境图片',
    'environmentSection.cards.*': '环境图片',
    'environmentSection.cards.*.label': '图片名称',
    'environmentSection.cards.*.imageUrl': '图片 URL',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:site': {
    siteName: '小程序站点名称',
    brandName: '品牌名称',
    contactPhone: '前端联系电话',
    contactWechat: '前端微信咨询号',
    contactQrcode: '联系二维码链接',
    contactQrcodeUrl: '联系二维码图片',
    address: '校区地址',
    serviceHours: '咨询服务时间',
    intro: '机构简介'
  },
  'page:courses': {
    title: '判断首屏主标题',
    subtitle: '判断首屏说明',
    categories: '判断标签',
    suggestions: '判断提示',
    featuredDirectionIds: '两张重点方向卡片 ID',
    moreSection: '底部补充说明',
    'moreSection.title': '补充区标题',
    'moreSection.tag': '补充区标签',
    'moreSection.desc': '补充区说明',
    cta: '底部咨询承接区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案',
    'cta.footnote': '咨询补充提示'
  },
  'page:teachers': {
    hero: '师资页首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '师资页主标题',
    'hero.desc': '师资页说明',
    'hero.imageUrl': '首屏配图 URL',
    introCard: '介绍卡片',
    'introCard.title': '介绍卡标题',
    'introCard.desc': '介绍卡说明',
    features: '核心优势',
    'features.*': '优势卡片',
    'features.*.title': '优势标题',
    'features.*.desc': '优势说明',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:success': {
    hero: '成果页首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '成果页主标题',
    'hero.desc': '成果页说明',
    stats: '成果数据卡',
    'stats.*': '成果数据卡',
    'stats.*.value': '数据值',
    'stats.*.label': '数据标签',
    'stats.*.note': '补充说明',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:about': {
    hero: '关于页首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '关于页主标题',
    'hero.desc': '关于页说明',
    'hero.imageUrl': '首屏配图 URL',
    introCard: '介绍卡片',
    'introCard.title': '介绍卡标题',
    'introCard.desc': '介绍卡说明',
    values: '机构理念卡片',
    'values.*': '理念卡片',
    'values.*.title': '理念标题',
    'values.*.desc': '理念说明',
    environmentImages: '校区环境图片',
    'environmentImages.*': '环境图片',
    'environmentImages.*.label': '图片名称',
    'environmentImages.*.imageUrl': '图片 URL',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:materials': {
    hero: '资料页首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '资料页主标题',
    'hero.desc': '资料页说明',
    'hero.imageUrl': '首屏配图 URL',
    tabs: '顶部资料分类标签',
    overviewStats: '总览统计卡',
    'overviewStats.*': '统计卡',
    'overviewStats.*.value': '统计值',
    'overviewStats.*.label': '统计标签',
    'overviewStats.*.note': '统计说明',
    featuredSeriesIds: '精选资料套系 ID',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:questionBank': {
    dailyQuestionCard: '每日一题页',
    'dailyQuestionCard.title': '页面标题',
    'dailyQuestionCard.desc': '页面说明',
    'dailyQuestionCard.note': '补充提示',
    pastPapersCard: '模拟题页',
    'pastPapersCard.title': '页面标题',
    'pastPapersCard.desc': '页面说明',
    'pastPapersCard.note': '补充提示',
    wrongBookCard: '错题本页',
    'wrongBookCard.title': '页面标题',
    'wrongBookCard.desc': '页面说明',
    'wrongBookCard.note': '补充提示'
  },
  'collection:directions': {
    name: '方向名称',
    slug: '方向 Slug',
    category: '方向分类',
    isFeatured: '是否进入首页推荐',
    featuredTag: '首页精选标签',
    homeTag: '首页卡片角标',
    summary: '方向简介',
    audience: '适合人群',
    features: '核心重点',
    chips: '辅助标签',
    iconType: '方向图标',
    homeCard: '首页卡片样式',
    'homeCard.tag': '首页卡标签文案',
    'homeCard.tagColor': '首页卡标签颜色',
    'homeCard.tagBackground': '首页卡标签背景',
    'homeCard.headerBackground': '首页卡头部背景',
    'homeCard.iconColor': '首页卡图标颜色',
    coursesCard: '方向页卡片样式',
    'coursesCard.style': '卡片明暗样式',
    'coursesCard.tag': '卡片标签文案',
    'coursesCard.accent': '卡片强调色',
    'coursesCard.background': '卡片背景值',
    'coursesCard.iconBg': '卡片图标背景',
    'coursesCard.iconType': '卡片图标',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:teachers': {
    name: '老师姓名',
    role: '老师身份',
    tag: '老师标签',
    avatarUrl: '头像图片 URL',
    avatarSeed: '头像 Seed',
    intro: '卡片简介',
    specialties: '擅长标签',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:successCases': {
    title: '上岸故事标题',
    subtitle: '上岸故事说明',
    coverUrl: '封面图片 URL',
    coverSeed: '封面 Seed',
    year: '上岸年份',
    category: '案例分类',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:materialSeries': {
    name: '套系名称',
    slug: '套系 Slug',
    category: '套系分类',
    tag: '套系标签',
    accent: '套系强调色',
    summary: '套系简介',
    shelfLabel: '书架标签',
    items: '套系标签组',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:materialItems': {
    seriesId: '所属套系 ID',
    type: '资料类型',
    title: '资料标题',
    subtitle: '资料副标题',
    stage: '适用阶段',
    desc: '资料说明',
    contents: '目录标签',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:medicalQuestions': {
    questionId: '题目 ID',
    direction: '所属方向',
    questionType: '题型',
    stem: '题干',
    options: '选项',
    'options.*': '选项',
    'options.*.id': '选项标识',
    'options.*.text': '选项内容',
    answer: '答案',
    explanation: '解析',
    paperId: '所属试卷 ID',
    tags: '题目标签',
    status: '发布状态'
  },
  'collection:pastPapers': {
    paperId: '试卷 ID',
    title: '试卷标题',
    description: '试卷说明',
    year: '年份',
    direction: '所属方向',
    questionIds: '题目 ID 列表',
    status: '发布状态'
  },
  'collection:questionImports': {
    title: '导入名称',
    direction: '所属方向',
    sourceType: '导入来源',
    rawText: '原始文本',
    note: '补充说明',
    status: '发布状态'
  },
  'collection:mediaAssets': {
    title: '资源名称',
    category: '资源分类',
    module: '使用模块',
    type: '资源类型',
    url: '资源地址',
    thumbUrl: '缩略图地址',
    alt: '替代文本',
    tags: '资源标签',
    sort: '排序值',
    status: '发布状态'
  }
};

function getScopedFieldLabel(scope, path, fieldKey) {
  const normalizedPath = normalizeEditorPath(path);
  const scopedLabels = SCOPED_FIELD_LABELS[scope] || null;
  if (scopedLabels) {
    return scopedLabels[normalizedPath] || humanizeLabel(fieldKey);
  }
  return humanizeLabel(fieldKey);
}

function getArrayItemTitle(scope, path, fieldKey, index) {
  const itemPath = [...path, index];
  return `${getScopedFieldLabel(scope, itemPath, fieldKey)} ${index + 1}`;
}

function parsePath(pathText) {
  return (pathText || '').split('.').filter(Boolean).map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
}

function getValueAtPath(source, path) {
  return path.reduce((current, key) => (current == null ? undefined : current[key]), source);
}

function updateAtPath(source, path, updater) {
  if (!path.length) {
    return updater(source);
  }

  const [head, ...rest] = path;
  const current = source == null ? (typeof head === 'number' ? [] : {}) : source;
  const next = Array.isArray(current) ? [...current] : { ...current };
  next[head] = updateAtPath(next[head], rest, updater);
  return next;
}

function removeArrayItem(source, path, index) {
  return updateAtPath(source, path, (current) => {
    const next = Array.isArray(current) ? [...current] : [];
    next.splice(index, 1);
    return next;
  });
}

function appendArrayItem(source, path, item) {
  return updateAtPath(source, path, (current) => {
    const next = Array.isArray(current) ? [...current] : [];
    next.push(cloneValue(item));
    return next;
  });
}

function getSelectOptions(fieldKey) {
  return SELECT_FIELD_OPTIONS[fieldKey] || null;
}

function getEditorLayout(scope) {
  return EDITOR_LAYOUTS[scope] || null;
}

function getCompanionFieldKeys(value) {
  return Object.keys(COMPANION_FIELDS).flatMap((seedKey) => {
    const urlKey = COMPANION_FIELDS[seedKey];
    if (Object.prototype.hasOwnProperty.call(value || {}, seedKey) && !Object.prototype.hasOwnProperty.call(value || {}, urlKey)) {
      return [urlKey];
    }
    return [];
  });
}

function isTextareaField(fieldKey, value) {
  return TEXTAREA_FIELDS.has(fieldKey) || (typeof value === 'string' && value.length > 60);
}

function isHexColor(value) {
  return typeof value === 'string' && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value.trim());
}

function normalizeHexColor(value) {
  if (!isHexColor(value)) return '#4f46e5';
  const normalized = value.trim();
  if (normalized.length === 4) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }
  return normalized;
}

function isManagedField(fieldKey) {
  return ['_id', 'createdAt', 'updatedAt', '_createdAt', '_updatedAt'].includes(fieldKey);
}

function getFormSource(scope) {
  if (scope.startsWith('page:')) {
    return state.currentData?.page || {};
  }

  if (scope.startsWith('collection:')) {
    const collectionKey = scope.split(':')[1];
    const ui = getViewUi();
    if (ui.drafts[collectionKey]) {
      return ui.drafts[collectionKey];
    }

    const selectedId = ui.selectedIds[collectionKey];
    return (state.currentData?.collections?.[collectionKey] || []).find((item) => item._id === selectedId) || null;
  }

  return null;
}

function setFormSource(scope, nextValue) {
  if (scope.startsWith('page:')) {
    state.currentData.page = nextValue;
    return;
  }

  if (scope.startsWith('collection:')) {
    const collectionKey = scope.split(':')[1];
    const ui = getViewUi();
    if (ui.drafts[collectionKey]) {
      ui.drafts[collectionKey] = nextValue;
      return;
    }

    state.currentData.collections[collectionKey] = (state.currentData.collections[collectionKey] || []).map((item) =>
      item._id === nextValue._id ? nextValue : item
    );
  }
}

function updateFormSource(scope, path, nextValue) {
  const source = getFormSource(scope);
  const updated = updateAtPath(source || {}, path, () => nextValue);
  setFormSource(scope, updated);
}

function updateJsonSubset(scope, keys, rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    throw new Error('JSON 格式不正确');
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON 内容必须是对象');
  }

  const source = { ...(getFormSource(scope) || {}) };
  for (const key of keys) {
    delete source[key];
  }
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      source[key] = parsed[key];
    }
  }
  setFormSource(scope, source);
}

function guessArrayItemTemplate(path, items) {
  const fieldKey = String(path[path.length - 1] || '');
  if (Object.prototype.hasOwnProperty.call(ARRAY_TEMPLATES, fieldKey)) {
    return cloneValue(ARRAY_TEMPLATES[fieldKey]);
  }
  const sample = Array.isArray(items) && items.length ? items[0] : undefined;
  if (sample !== undefined) {
    return blankLike(sample);
  }
  return OBJECT_ARRAY_FIELDS.has(fieldKey) ? {} : '';
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getTextareaRows(fieldKey, value) {
  if (Array.isArray(value)) {
    return clamp((value || []).length + 2, 5, 12);
  }

  const text = String(value ?? '');
  const estimatedRows = Math.ceil(text.length / 22);
  if (LINE_LIST_FIELDS.has(fieldKey)) {
    return clamp(estimatedRows + 1, 5, 12);
  }
  return clamp(estimatedRows + 1, 4, 10);
}

function getFriendlyEditorClass(scope) {
  if (scope === 'collection:directions') return ' friendly-editor-directions';
  if (scope === 'page:courses') return ' friendly-editor-courses';
  if (scope.startsWith('page:')) return ' friendly-editor-pages';
  return '';
}

function normalizeEditorPath(path) {
  return (path || []).map((segment) => (typeof segment === 'number' ? '*' : String(segment))).join('.');
}

function isHomePageScope(scope) {
  return scope === 'page:home';
}

function isQuestionBankPageScope(scope) {
  return scope === 'page:questionBank';
}

function usesDirectSectionEditor(pageKey) {
  return true;
}

function shouldHideField(scope, path) {
  const normalizedPath = normalizeEditorPath(path);

  if (isHomePageScope(scope)) {
    return HOME_EDITOR_HIDDEN_PATHS.has(normalizedPath);
  }

  if (isQuestionBankPageScope(scope)) {
    return QUESTION_BANK_EDITOR_HIDDEN_PATHS.has(normalizedPath);
  }

  return false;
}

function getArrayEditorRule(scope, path) {
  const normalizedPath = normalizeEditorPath(path);

  if (isHomePageScope(scope)) {
    return HOME_EDITOR_ARRAY_RULES[normalizedPath] || null;
  }

  if (scope === 'page:courses') {
    return COURSES_EDITOR_ARRAY_RULES[normalizedPath] || null;
  }

  return null;
}

function renderPrimitiveInput(scope, path, fieldKey, value) {
  const label = getScopedFieldLabel(scope, path, fieldKey);
  const pathText = path.join('.');
  const selectOptions = getSelectOptions(fieldKey);
  const isImageUrlField = /(?:image|background|avatar|cover|thumb)Url$/i.test(fieldKey);
  const inputPlaceholder = isImageUrlField ? '直接粘贴图床链接' : '';
  const isDirectionScope = scope === 'collection:directions' || scope === 'page:courses';
  const useWideField = isImageUrlField || isDirectionScope;

  if (selectOptions) {
    return `<label class="form-field${useWideField ? ' form-field-wide' : ''}">
      <span class="form-label">${escapeHtml(label)}</span>
      <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="${fieldKey === 'sort' ? 'number' : typeof value}">
        ${selectOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(value ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
      </select>
    </label>`;
  }

  if (typeof value === 'boolean') {
    return `<label class="form-field${useWideField ? ' form-field-wide' : ''}">
      <span class="form-label">${escapeHtml(label)}</span>
      <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="boolean">
        <option value="true"${value ? ' selected' : ''}>是</option>
        <option value="false"${!value ? ' selected' : ''}>否</option>
      </select>
    </label>`;
  }

  if (typeof value === 'number') {
    return `<label class="form-field${useWideField ? ' form-field-wide' : ''}">
      <span class="form-label">${escapeHtml(label)}</span>
      <input class="form-input" type="number" value="${escapeHtml(String(value))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="number" />
    </label>`;
  }

  if (isHexColor(value)) {
    return `<label class="form-field${useWideField ? ' form-field-wide' : ''}">
      <span class="form-label">${escapeHtml(label)}</span>
      <div class="color-field">
        <input class="color-swatch" type="color" value="${escapeHtml(normalizeHexColor(value))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text" />
        <input class="form-input" type="text" value="${escapeHtml(String(value))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text" />
      </div>
    </label>`;
  }

  if (isTextareaField(fieldKey, value)) {
    return `<label class="form-field form-field-wide">
      <span class="form-label">${escapeHtml(label)}</span>
      <textarea class="form-textarea" rows="${getTextareaRows(fieldKey, value)}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text">${escapeHtml(String(value ?? ''))}</textarea>
    </label>`;
  }

  return `<label class="form-field${useWideField ? ' form-field-wide' : ''}">
    <span class="form-label">${escapeHtml(label)}</span>
    ${isImageUrlField ? '<span class="form-hint">支持直接粘贴图床链接。</span>' : ''}
    <input class="form-input" type="text" value="${escapeHtml(String(value ?? ''))}" placeholder="${escapeHtml(inputPlaceholder)}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text" />
  </label>`;
}

function renderLineListInput(scope, path, fieldKey, value) {
  const label = getScopedFieldLabel(scope, path, fieldKey);
  const pathText = path.join('.');
  return `<label class="form-field form-field-wide">
    <span class="form-label">${escapeHtml(label)}</span>
    <span class="form-hint">一行一项，适合成组文案、标签或目录。</span>
    <textarea class="form-textarea form-textarea-compact" rows="${getTextareaRows(fieldKey, value)}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="line-list">${escapeHtml((value || []).join('\n'))}</textarea>
  </label>`;
}

function renderFormNode(scope, value, path = [], fieldKey = '') {
  if (isIndexedObject(value)) {
    return renderFormNode(scope, normalizeCmsValue(value), path, fieldKey);
  }

  if (Array.isArray(value)) {
    const label = getScopedFieldLabel(scope, path, fieldKey);
    const pathText = path.join('.');
    const objectItems = value.some((item) => item && typeof item === 'object' && !Array.isArray(item)) || OBJECT_ARRAY_FIELDS.has(fieldKey);
    const stringItems = value.every((item) => item == null || typeof item === 'string');
    const arrayRule = getArrayEditorRule(scope, path);
    const visibleItems = arrayRule?.visibleItems ? value.slice(0, arrayRule.visibleItems) : value;
    const canAppend = arrayRule?.maxItems ? value.length < arrayRule.maxItems : true;

    if (!objectItems && (LINE_LIST_FIELDS.has(fieldKey) || stringItems)) {
      return renderLineListInput(scope, path, fieldKey, value);
    }

    return `<section class="form-block">
      <div class="form-block-head">
        <div>
          <h4>${escapeHtml(label)}</h4>
          <p>${escapeHtml(objectItems ? '数组项会以卡片方式展示，适合逐项维护。' : '适合维护标签、ID、目录等简单列表。')}</p>
        </div>
        ${canAppend ? `<button class="system-action" type="button" data-action="append-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}">新增一项</button>` : ''}
      </div>
      <div class="form-array-list">
        ${visibleItems.length ? visibleItems.map((item, index) => {
          const itemPath = [...path, index];
          const itemPathText = itemPath.join('.');
          if (objectItems) {
            const fields = Object.keys(item || {})
              .filter((key) => !isManagedField(key) && !shouldHideField(scope, [...itemPath, key]))
              .map((key) => renderFormNode(scope, item[key], [...itemPath, key], key))
              .join('');
            return `<article class="form-array-card">
              <div class="form-array-head">
                <strong>${escapeHtml(getArrayItemTitle(scope, path, fieldKey, index))}</strong>
                <button class="system-action danger-action" type="button" data-action="remove-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-index="${index}">删除</button>
              </div>
              <div class="form-grid">${fields || '<div class="empty-state">当前对象还没有字段。</div>'}</div>
            </article>`;
          }

          return `<div class="form-array-row">
            <input class="form-input" type="text" value="${escapeHtml(String(item ?? ''))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(itemPathText)}" data-form-kind="text" />
            <button class="system-action danger-action" type="button" data-action="remove-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-index="${index}">删除</button>
          </div>`;
        }).join('') : '<div class="empty-state">当前数组还是空的，点击右上角可以新增。</div>'}
      </div>
    </section>`;
  }

  if (value && typeof value === 'object') {
    const label = fieldKey ? getScopedFieldLabel(scope, path, fieldKey) : '内容配置';
    const objectKeys = [...new Set([...Object.keys(value), ...getCompanionFieldKeys(value)])];
    const fields = objectKeys
      .filter((key) => !isManagedField(key) && !shouldHideField(scope, [...path, key]))
      .map((key) => renderFormNode(scope, value[key] ?? '', [...path, key], key))
      .join('');
    return `<section class="form-block">
      ${fieldKey ? `<div class="form-block-head"><div><h4>${escapeHtml(label)}</h4></div></div>` : ''}
      <div class="form-grid">${fields || '<div class="empty-state">当前对象还没有可编辑字段。</div>'}</div>
    </section>`;
  }

  return renderPrimitiveInput(scope, path, fieldKey, value);
}

function renderFieldsForKeys(scope, value, keys) {
  return keys
    .filter((key) => Object.prototype.hasOwnProperty.call(value || {}, key) && !isManagedField(key) && !shouldHideField(scope, [key]))
    .map((key) => renderFormNode(scope, value[key], [key], key))
    .join('');
}

function pickKeys(source, keys) {
  return Object.fromEntries(keys.filter((key) => Object.prototype.hasOwnProperty.call(source || {}, key)).map((key) => [key, source[key]]));
}

function renderJsonSubsetEditor(scope, value, keys, label) {
  const subset = pickKeys(value, keys);
  if (!Object.keys(subset).length) return '';
  return `<section class="form-section form-section-secondary">
    <div class="form-section-head">
      <h4>${escapeHtml(label)}</h4>
    </div>
    <textarea class="json-editor" data-json-scope="${escapeHtml(scope)}" data-json-keys="${escapeHtml(keys.join(','))}">${escapeHtml(JSON.stringify(subset, null, 2))}</textarea>
  </section>`;
}

function renderStructuredEditor(scope, value, layout) {
  const primaryKeys = new Set(layout.sections.flatMap((section) => section.keys));
  const secondarySections = layout.secondarySections || [];
  const secondaryKeys = new Set(secondarySections.flatMap((section) => section.keys));
  const jsonKeys = new Set(layout.jsonFields || []);
  const renderedKeys = new Set([...primaryKeys, ...secondaryKeys, ...jsonKeys]);
  const remainderKeys = Object.keys(value || {}).filter(
    (key) => !isManagedField(key) && !renderedKeys.has(key) && !shouldHideField(scope, [key])
  );
  const secondaryMarkup = secondarySections.map((section) => {
    const fields = renderFieldsForKeys(scope, value, section.keys);
    if (!fields) return '';
    return `<section class="form-section form-section-secondary">
      <div class="form-section-head">
        <h4>${escapeHtml(section.title)}</h4>
      </div>
      <div class="form-grid">${fields}</div>
    </section>`;
  }).join('');
  const jsonMarkup = layout.jsonFields?.length
    ? renderJsonSubsetEditor(scope, value, layout.jsonFields, layout.jsonLabel || '原始 JSON')
    : '';
  const remainderMarkup = remainderKeys.length
    ? `<section class="form-section form-section-secondary">
      <div class="form-section-head">
        <h4>补充字段</h4>
      </div>
      <div class="form-grid">${remainderKeys.map((key) => renderFormNode(scope, value[key], [key], key)).join('')}</div>
    </section>`
    : '';

  return `<div class="friendly-editor${getFriendlyEditorClass(scope)}">
    <section class="editor-focus-hero">
      <strong>${escapeHtml(layout.hero.title)}</strong>
      <p>${escapeHtml(layout.hero.desc)}</p>
    </section>
    ${layout.sections.map((section) => {
      const fields = renderFieldsForKeys(scope, value, section.keys);
      if (!fields) return '';
      return `<section class="form-section">
        <div class="form-section-head">
          <h4>${escapeHtml(section.title)}</h4>
          ${section.desc ? `<p>${escapeHtml(section.desc)}</p>` : ''}
        </div>
        <div class="form-grid">${fields}</div>
      </section>`;
    }).join('')}
    ${secondaryMarkup || jsonMarkup || remainderMarkup ? `<details class="form-fold">
      <summary class="form-fold-toggle">${escapeHtml(layout.foldLabel || '更多字段')}</summary>
      <div class="form-fold-body">
        ${secondaryMarkup}
        ${jsonMarkup}
        ${remainderMarkup}
      </div>
    </details>` : ''}
  </div>`;
}

function renderFriendlyEditor(scope, value) {
  if (!value) {
    return '<div class="empty-state">暂无可编辑内容。</div>';
  }

  const layout = getEditorLayout(scope);
  if (layout && value && typeof value === 'object' && !Array.isArray(value)) {
    return renderStructuredEditor(scope, value, layout);
  }

  return `<div class="friendly-editor${getFriendlyEditorClass(scope)}">${renderFormNode(scope, value)}</div>`;
}

function getSelectedCollectionState(collectionKey, items) {
  const ui = getViewUi();
  const draft = ui.drafts[collectionKey];
  if (draft) {
    return { item: draft, isDraft: true, itemId: '' };
  }

  const selectedId = ui.selectedIds[collectionKey] || items[0]?._id || '';
  if (!ui.selectedIds[collectionKey] && selectedId) {
    ui.selectedIds[collectionKey] = selectedId;
  }

  const item = items.find((entry) => entry._id === selectedId) || items[0] || null;
  if (!item) {
    return { item: null, isDraft: false, itemId: '' };
  }

  return { item, isDraft: false, itemId: item._id || '' };
}

const TABLE_COLLECTIONS = new Set([
  'directions',
  'medicalQuestions',
  'pastPapers',
  'questionImports',
  'teachers',
  'successCases',
  'mediaAssets',
  'materialSeries',
  'materialItems'
]);

const TABLE_COLUMNS = {
  directions: [
    {
      key: 'name',
      label: '方向名称',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.name || '未命名方向')}</strong><span class="data-table-sub">${escapeHtml(item.slug || item._id || '')}</span>`
    },
    { key: 'category', label: '分类', render: (item) => escapeHtml(item.category || '-') },
    {
      key: 'featured',
      label: '首页精选',
      render: (item) => `<span class="record-pill${item.isFeatured ? ' success' : ''}">${escapeHtml(item.isFeatured ? '是' : '否')}</span>`
    },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="directions" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  medicalQuestions: [
    {
      key: 'stem',
      label: '题目摘要',
      render: (item) => `<strong class="data-table-title">${escapeHtml(summarizeText(item.stem || item.questionId || '未命名题目', 40))}</strong><span class="data-table-sub">${escapeHtml(item.questionId || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'questionType', label: '题型', render: (item) => escapeHtml(item.questionType || '-') },
    { key: 'year', label: '年份', render: (item) => escapeHtml(String(item.year ?? '-')) },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="medicalQuestions" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  pastPapers: [
    {
      key: 'title',
      label: '试卷标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名试卷')}</strong><span class="data-table-sub">${escapeHtml(item.paperId || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'year', label: '年份', render: (item) => escapeHtml(String(item.year ?? '-')) },
    { key: 'questionIds', label: '题目数', render: (item) => escapeHtml(String((item.questionIds || []).length || 0)) },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="pastPapers" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  questionImports: [
    {
      key: 'title',
      label: '导入条目',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名导入')}</strong><span class="data-table-sub">${escapeHtml(summarizeText(item.rawText || item.sourceType || item._id || '', 40))}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'sourceType', label: '来源', render: (item) => escapeHtml(item.sourceType || '-') },
    { key: 'rawText', label: '文本长度', render: (item) => escapeHtml(`${String(item.rawText || '').length} 字`) },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="questionImports" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  teachers: [
    {
      key: 'name',
      label: '姓名',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.name || '未命名老师')}</strong><span class="data-table-sub">${escapeHtml(item.tag || item._id || '')}</span>`
    },
    { key: 'role', label: '角色', render: (item) => escapeHtml(item.role || '-') },
    { key: 'specialties', label: '擅长', render: (item) => escapeHtml((item.specialties || []).slice(0, 2).join(' / ') || '-') },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="teachers" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  successCases: [
    {
      key: 'title',
      label: '案例标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名案例')}</strong><span class="data-table-sub">${escapeHtml(item.subtitle || item._id || '')}</span>`
    },
    { key: 'category', label: '分类', render: (item) => escapeHtml(item.category || '-') },
    { key: 'year', label: '年份', render: (item) => escapeHtml(String(item.year ?? '-')) },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="successCases" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  mediaAssets: [
    {
      key: 'name',
      label: '资源名称',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.name || item.alt || '未命名资源')}</strong><span class="data-table-sub">${escapeHtml(item.url || item.thumbUrl || item._id || '')}</span>`
    },
    { key: 'module', label: '模块', render: (item) => escapeHtml(item.module || '-') },
    { key: 'type', label: '类型', render: (item) => escapeHtml(item.type || '-') },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="mediaAssets" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  materialSeries: [
    {
      key: 'name',
      label: '套系名称',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.name || '未命名套系')}</strong><span class="data-table-sub">${escapeHtml(item.shelfLabel || item.slug || item._id || '')}</span>`
    },
    { key: 'category', label: '分类', render: (item) => escapeHtml(item.category || '-') },
    { key: 'tag', label: '标签', render: (item) => escapeHtml(item.tag || '-') },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="materialSeries" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  materialItems: [
    {
      key: 'title',
      label: '单品标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名单品')}</strong><span class="data-table-sub">${escapeHtml(item.subtitle || item.seriesId || item._id || '')}</span>`
    },
    { key: 'type', label: '类型', render: (item) => escapeHtml(item.type || '-') },
    { key: 'stage', label: '阶段', render: (item) => escapeHtml(item.stage || '-') },
    {
      key: 'status',
      label: '状态',
      render: (item) => `<span class="record-pill${item.status === 'published' ? ' success' : ''}">${escapeHtml(item.status || 'draft')}</span>`
    },
    { key: 'sort', label: '排序', render: (item) => escapeHtml(String(item.sort ?? '-')) },
    { key: 'updatedAt', label: '更新时间', render: (item) => escapeHtml(formatDateTime(getUpdatedAt(item))) },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="materialItems" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ]
};

const STATUS_FILTER_OPTIONS = [
  { key: 'all', label: '全部' },
  { key: 'published', label: '已发布' },
  { key: 'draft', label: '草稿' }
];

function getCollectionFilterState(collectionKey) {
  const ui = getViewUi();
  return {
    keyword: ui.filters[collectionKey] || '',
    status: ui.statusFilters[collectionKey] || 'all'
  };
}

function getFilteredCollectionItems(collectionKey, items) {
  const filterState = getCollectionFilterState(collectionKey);
  const keyword = filterState.keyword.trim().toLowerCase();

  return (items || []).filter((item) => {
    const statusMatched = filterState.status === 'all' ? true : (item.status || 'draft') === filterState.status;
    if (!statusMatched) return false;
    if (!keyword) return true;

    const stringLists = [
      ...(Array.isArray(item.specialties) ? item.specialties : []),
      ...(Array.isArray(item.tags) ? item.tags : []),
      ...(Array.isArray(item.chips) ? item.chips : []),
      ...(Array.isArray(item.contents) ? item.contents : []),
      ...(Array.isArray(item.questionIds) ? item.questionIds : [])
    ];
    const haystack = [
      item._id,
      item.questionId,
      item.direction,
      item.questionType,
      item.paperId,
      item.sourceType,
      item.stem,
      item.explanation,
      item.rawText,
      item.name,
      item.title,
      item.subtitle,
      item.slug,
      item.category,
      item.role,
      item.tag,
      item.summary,
      item.audience,
      item.module,
      item.type,
      item.stage,
      item.alt,
      item.url,
      item.thumbUrl,
      item.seriesId,
      item.shelfLabel,
      item.year,
      ...stringLists
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(keyword);
  });
}

function renderCollectionEditor(collectionKey, selected, collectionMeta) {
  const ui = getViewUi();
  const isOpen = Boolean(ui.openEditors[collectionKey]);
  if (!isOpen || !selected.item) {
    return '';
  }

  const editorLabel = selected.isDraft ? '新建条目' : selected.item ? `编辑 ${getPrimaryLabel(selected.item, collectionKey)}` : '暂无条目';

  return `<div class="editor-overlay is-visible directions-editor-overlay" data-editor-collection="${escapeHtml(collectionKey)}">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭编辑弹层" data-action="close-editor" data-collection-key="${escapeHtml(collectionKey)}"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(editorLabel)}</h3>
          <p>${selected.item ? '主区保持不动，重点字段会在这个浮层里集中编辑。' : '先从主区表格选中一条 row，再在这里改细节。'}</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存条目</button>
          ${selected.item && !selected.isDraft ? `<button class="system-action danger-action" type="button" data-action="delete-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(selected.itemId)}">删除</button>` : ''}
          <button class="topbar-icon-button editor-close-button" type="button" aria-label="关闭编辑弹层" data-action="close-editor" data-collection-key="${escapeHtml(collectionKey)}">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">ID ${escapeHtml(selected.itemId || '新建中')}</span>
          <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(selected.item)))}</span>
          <span class="meta-chip">集合 ${escapeHtml(collectionMeta.label)}</span>
        </div>
        ${collectionKey === 'directions' ? renderEditorInsightCards(getDirectionEditorInsightCards(selected.item)) : ''}
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(getPrimaryLabel(selected.item, collectionKey))}</strong>
          <span>${escapeHtml(getSecondaryLabel(selected.item, collectionKey) || '已进入明细编辑')}</span>
        </div>
        ${renderFriendlyEditor(`collection:${collectionKey}`, selected.item)}
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 80ms;">
          <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存条目</button>
          <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
        </div>
      </div>
    </article>
  </div>`;
}

function renderPageEditorOverlay(pageKey, pageLabel, page) {
  const ui = getViewUi();
  const scopeKey = `page:${pageKey}`;
  if (!ui.openEditors[scopeKey] || !page) {
    return '';
  }

  const rows = getPageSectionRows(pageKey, page);
  const selectedSectionId = ui.selectedIds[`page-section:${pageKey}`] || rows[0]?.id || '';
  const activeRow = rows.find((row) => row.id === selectedSectionId) || rows[0] || null;

  return `<div class="editor-overlay is-visible directions-editor-overlay" data-editor-page="${escapeHtml(pageKey)}">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭编辑弹层" data-action="close-page-editor" data-page-key="${escapeHtml(pageKey)}"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(pageLabel)}</h3>
          <p>页面总配置会保持在当前工作区之上，用浮层集中修改，不打断主控区浏览。</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(pageKey)}">保存页面</button>
          <button class="topbar-icon-button editor-close-button" type="button" aria-label="关闭编辑弹层" data-action="close-page-editor" data-page-key="${escapeHtml(pageKey)}">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">文档 ID ${escapeHtml(pageKey === 'site' ? 'default' : 'singleton')}</span>
          <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(page)))}</span>
          <span class="meta-chip">页面配置</span>
        </div>
        ${pageKey === 'courses' ? renderEditorInsightCards(getCoursesPageInsightCards(page)) : ''}
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(activeRow?.title || page.title || pageLabel)}</strong>
          <span>${escapeHtml(activeRow?.desc || page.subtitle || `正在编辑${pageLabel}`)}</span>
        </div>
        <div class="directions-enter-modal-item" style="--enter-delay: 60ms;">
          <div class="workspace-compact-summary editor-subsection-summary">
            <strong>${escapeHtml(selectedSectionId ? `当前区块：${activeRow?.title || pageLabel}` : '页面配置总览')}</strong>
            <span>区块名称、字段名称和前端展示位置已经统一，点区块卡片或表格 row 就会直接看到真实生效表单。</span>
            <em>${escapeHtml(`当前页面 ${rows.length} 个区块`)}</em>
          </div>
          ${renderPageSectionNavCards(pageKey, rows, selectedSectionId, 'select-page-editor-section')}
          ${renderPageSectionsTable(pageKey, rows, selectedSectionId, 'select-page-editor-section')}
        </div>
        ${activeRow ? renderPageSectionFieldWorkbench(pageKey, page, activeRow) : ''}
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 100ms;">
          <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(pageKey)}">保存页面</button>
          <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
        </div>
      </div>
    </article>
  </div>`;
}

function getPageSectionEditorKey(pageKey, sectionId) {
  return `page:${pageKey}:section:${sectionId}`;
}

function summarizeText(value, limit = 36) {
  const text = String(value || '').trim();
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

function getSectionLocationText(scope, row) {
  if (row?.location) return row.location;
  return (row?.keys || []).map((key) => getScopedFieldLabel(scope, [key], key)).join(' / ');
}

function getPageSectionAction(row, fallbackAction) {
  if (row?.linkOnly && row?.targetView) {
    return 'open-linked-workspace';
  }
  return fallbackAction;
}

function getPageSectionActionLabel(row) {
  if (row?.linkOnly && row?.actionLabel) {
    return row.actionLabel;
  }
  if (row?.linkOnly) {
    return '去修改';
  }
  return '编辑';
}

function getLinkedWorkspaceDataset(source = {}) {
  return [
    source.targetView ? `data-target-view="${escapeHtml(source.targetView)}"` : '',
    source.targetCollectionKey ? `data-target-collection-key="${escapeHtml(source.targetCollectionKey)}"` : '',
    source.targetPageKey ? `data-target-page-key="${escapeHtml(source.targetPageKey)}"` : '',
    source.targetSectionId ? `data-target-section-id="${escapeHtml(source.targetSectionId)}"` : '',
    source.targetItemId ? `data-target-item-id="${escapeHtml(source.targetItemId)}"` : '',
    source.statusText ? `data-link-status="${escapeHtml(source.statusText)}"` : ''
  ]
    .filter(Boolean)
    .join(' ');
}

function renderLinkedSourceCards(linkedSources = []) {
  if (!linkedSources.length) return '';

  return `<div class="record-list compact-list editor-subsection-linked">
    ${linkedSources.map((source, index) => `<button class="record-row workspace-row-enter" style="--enter-delay: ${50 + index * 10}ms;" type="button" data-action="open-linked-workspace" ${getLinkedWorkspaceDataset(source)}>
      <span class="record-row-main">
        <strong class="record-row-title">${escapeHtml(source.label || '关联内容')}</strong>
        <span class="record-row-meta">${escapeHtml(source.desc || '该区块还有关联内容需要到其它工作区维护。')}</span>
      </span>
      <span class="record-pill">${escapeHtml(source.actionLabel || '去修改')}</span>
    </button>`).join('')}
  </div>`;
}

function getPageSectionRows(pageKey, page = {}) {
  if (pageKey === 'questionBank') {
    return [
      {
        id: 'dailyQuestionCard',
        title: '每日一题页',
        desc: '对应小程序“每日一题”页面首屏标题和说明。',
        meta: page.dailyQuestionCard?.title || page.dailyQuestionCard?.desc || '固定题源提示',
        location: '页面标题 / 页面说明 / 补充提示',
        keys: ['dailyQuestionCard']
      },
      {
        id: 'pastPapersCard',
        title: '模拟题页',
        desc: '对应小程序“模拟题”页面首屏标题和说明。',
        meta: page.pastPapersCard?.title || page.pastPapersCard?.desc || 'CSV 热更新提示',
        location: '页面标题 / 页面说明 / 补充提示',
        keys: ['pastPapersCard']
      },
      {
        id: 'wrongBookCard',
        title: '错题本页',
        desc: '对应小程序“错题本”页面首屏标题和说明。',
        meta: page.wrongBookCard?.title || page.wrongBookCard?.desc || '复盘说明',
        location: '页面标题 / 页面说明 / 补充提示',
        keys: ['wrongBookCard']
      },
      {
        id: 'pastPapersData',
        title: '模拟题套卷数据',
        desc: '对应模拟题页里每一套卷的标题、年份、说明和状态。',
        meta: `${(state.currentData?.collections?.pastPapers || []).length} 套模拟题套卷`,
        location: '模拟题套卷标题 / 年份 / 说明 / 状态',
        keys: [],
        linkOnly: true,
        targetView: 'questionBank',
        targetCollectionKey: 'pastPapers',
        actionLabel: '去套卷列表修改',
        statusText: '已跳转到模拟题套卷列表。'
      },
      {
        id: 'medicalQuestionsData',
        title: '模拟题题目数据',
        desc: '对应模拟题套卷里的具体题目、答案、解析和题型。',
        meta: `${(state.currentData?.collections?.medicalQuestions || []).length} 道模拟题题目`,
        location: '题目内容 / 选项 / 答案 / 解析 / 题型',
        keys: [],
        linkOnly: true,
        targetView: 'questionBank',
        targetCollectionKey: 'medicalQuestions',
        actionLabel: '去题目列表修改',
        statusText: '已跳转到模拟题题目列表。'
      }
    ];
  }

  if (pageKey === 'home') {
    const statCount = Math.min((page.overviewStats || []).length, 3);
    const quickLinkCount = Math.min((page.quickLinks || []).length, 4);
    const advantageCount = Math.min((page.advantages || []).length, 4);
    const environmentCount = Math.min((page.environmentSection?.cards || []).length, 2);
    return [
      {
        id: 'hero',
        title: '首页大屏主视觉',
        desc: '对应首页最上方第一屏的大标题、说明、标签和首个按钮。',
        meta: page.hero?.title || page.hero?.chip || '标题 / 标签 / 按钮',
        location: '首页大屏小角标 / 两行主标题 / 首页大屏说明 / 首页大屏按钮',
        keys: ['hero']
      },
      {
        id: 'stats',
        title: '首屏数据卡',
        desc: '对应首页首屏下方的 3 个数字信息卡。',
        meta: (page.overviewStats || []).slice(0, 3).map((item) => item?.label).filter(Boolean).join(' / ') || `${statCount} 项数据卡`,
        location: '数据卡数值 / 数据卡标签',
        keys: ['overviewStats']
      },
      {
        id: 'quickLinks',
        title: '首页四个功能入口',
        desc: '对应首页首屏下方的 4 个功能入口。',
        meta: (page.quickLinks || []).slice(0, 4).map((item) => item?.label).filter(Boolean).join(' / ') || `${quickLinkCount} 个功能入口`,
        location: '入口标题 / 跳转地址 / 跳转方式 / 图标标识',
        keys: ['quickLinks']
      },
      {
        id: 'directions',
        title: '热门方向',
        desc: '对应首页“热门方向”区块里展示的方向卡片。',
        meta: (page.featuredDirectionIds || []).slice(0, 2).join(' / ') || `${(page.featuredDirectionIds || []).length} 个方向 ID`,
        location: '热门方向展示 ID',
        keys: ['featuredDirectionIds'],
        linkedSources: [
          {
            label: '方向卡片文案与亮点',
            desc: '两张热门方向卡的标题、摘要、适合人群、亮点和按钮内容来自“方向管理”里的方向条目。',
            actionLabel: '去方向管理修改',
            targetView: 'directions',
            targetCollectionKey: 'directions',
            statusText: '已跳转到方向管理，请在方向条目里修改热门方向卡片内容。'
          }
        ]
      },
      {
        id: 'advantages',
        title: '学习支持',
        desc: '对应热门方向下方的 4 张学习支持卡片，最后一张会以更轻的学情评估样式展示。',
        meta: (page.advantages || []).slice(0, 4).map((item) => item?.title).filter(Boolean).join(' / ') || `${advantageCount} 项学习支持`,
        location: '卡片标题 / 卡片说明 / 图标标识',
        keys: ['advantages']
      },
      {
        id: 'environment',
        title: '校区环境',
        desc: '对应底部咨询区上方的校区环境图片区。',
        meta:
          (page.environmentSection?.cards || [])
            .slice(0, 2)
            .map((item) => item?.label)
            .filter(Boolean)
            .join(' / ') || `${environmentCount} 张环境图片`,
        location: '图片名称 / 图片 URL',
        keys: ['environmentSection'],
        linkedSources: [
          {
            label: '地址与到校信息',
            desc: '校区环境下方补充的地址、咨询时间等公共信息来自“站点设置”。',
            actionLabel: '去站点设置修改',
            targetView: 'contact',
            targetPageKey: 'site',
            statusText: '已跳转到站点设置，请修改地址、电话、微信和服务时间。'
          }
        ]
      },
      {
        id: 'cta',
        title: '底部咨询区',
        desc: '对应页面最下方的咨询转化区。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询按钮文案',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta'],
        linkedSources: [
          {
            label: '咨询联系方式',
            desc: '底部咨询区里展示的电话、微信、地址和服务时间来自“站点设置”。',
            actionLabel: '去站点设置修改',
            targetView: 'contact',
            targetPageKey: 'site',
            statusText: '已跳转到站点设置，请修改底部咨询区使用的公共联系信息。'
          }
        ]
      }
    ];
  }

  if (pageKey === 'courses') {
    const directionNameMap = Object.fromEntries(
      ((state.currentData?.collections?.directions || [])).map((item) => [item._id, item.name || item._id])
    );
    const featuredNames = (page.featuredDirectionIds || []).map((id) => directionNameMap[id]).filter(Boolean);

    return [
      {
        id: 'hero',
        title: '方向判断首屏',
        desc: '对应方向页最上方的主标题、说明、判断标签和 3 条判断提示。',
        meta: page.title || page.subtitle || '判断主标题 / 判断说明',
        location: '判断首屏主标题 / 判断首屏说明 / 判断标签 / 判断提示',
        keys: ['title', 'subtitle', 'categories', 'suggestions']
      },
      {
        id: 'featuredDirections',
        title: '两张重点方向卡片',
        desc: '对应页面中间两张重点方向大卡片。',
        meta: featuredNames.slice(0, 2).join(' / ') || `${(page.featuredDirectionIds || []).length} 张重点方向卡片`,
        location: '两张重点方向卡片 ID',
        keys: ['featuredDirectionIds'],
        linkedSources: [
          {
            label: '方向卡片内容',
            desc: '两张重点方向卡片的标题、摘要、适合人群、亮点和标签来自“方向管理”里的方向条目。',
            actionLabel: '去方向管理修改',
            targetView: 'directions',
            targetCollectionKey: 'directions',
            statusText: '已跳转到方向管理，请在方向条目里修改重点方向卡内容。'
          }
        ]
      },
      {
        id: 'cta',
        title: '底部咨询承接区',
        desc: '对应方向页两张重点方向卡片下方的咨询承接卡片。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 咨询按钮文案',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      },
      {
        id: 'moreSection',
        title: '底部补充说明',
        desc: '对应方向页最下方的轻量补充说明。',
        meta: page.moreSection?.title || page.moreSection?.desc || '补充区标题 / 补充区说明',
        location: '补充区标题 / 补充区标签 / 补充区说明',
        keys: ['moreSection']
      }
    ];
  }

  if (pageKey === 'teachers') {
    return [
      {
        id: 'hero',
        title: '师资页首屏',
        desc: '对应师资页顶部标题、说明和标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'introCard',
        title: '师资介绍卡',
        desc: '对应师资页首屏下方的介绍卡片。',
        meta: page.introCard?.title || page.introCard?.desc || '介绍卡标题 / 说明',
        location: '介绍卡标题 / 介绍卡说明',
        keys: ['introCard']
      },
      {
        id: 'features',
        title: '师资页优势点',
        desc: '对应师资页中部的优势标签和补充说明。',
        meta: `${(page.features || []).length} 项优势点`,
        location: '优势标题 / 优势说明 / 图标标识',
        keys: ['features']
      },
      {
        id: 'teacherCollection',
        title: '老师卡片条目',
        desc: '对应师资页里每一位老师的头像、姓名、头衔、标签和简介。',
        meta: `${(state.currentData?.collections?.teachers || []).length} 位老师`,
        location: '老师头像 / 姓名 / 头衔 / 标签 / 简介',
        keys: [],
        linkOnly: true,
        targetView: 'teachers',
        targetCollectionKey: 'teachers',
        actionLabel: '去师资列表修改',
        statusText: '已跳转到师资列表，请修改老师卡片条目。'
      },
      {
        id: 'cta',
        title: '师资页底部咨询区',
        desc: '对应师资页最下方的咨询承接区。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 按钮',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      }
    ];
  }

  if (pageKey === 'success') {
    return [
      {
        id: 'hero',
        title: '成果页首屏',
        desc: '对应成果页顶部标题、说明和标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'stats',
        title: '成果页数据卡',
        desc: '对应成果页顶部的数据卡与成果摘要。',
        meta: `${(page.stats || []).length} 项成果数据`,
        location: '数据数值 / 数据标签 / 补充说明',
        keys: ['stats']
      },
      {
        id: 'successCases',
        title: '上岸案例条目',
        desc: '对应成果页案例卡片里的标题、年份、学校、简介和标签。',
        meta: `${(state.currentData?.collections?.successCases || []).length} 个成果案例`,
        location: '案例标题 / 学校 / 年份 / 摘要 / 标签',
        keys: [],
        linkOnly: true,
        targetView: 'results',
        targetCollectionKey: 'successCases',
        actionLabel: '去案例列表修改',
        statusText: '已跳转到成果案例列表，请修改上岸故事条目。'
      },
      {
        id: 'cta',
        title: '成果页底部咨询区',
        desc: '对应成果页最下方的咨询承接区。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 按钮',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      }
    ];
  }

  if (pageKey === 'about') {
    return [
      {
        id: 'hero',
        title: '关于页首屏',
        desc: '对应关于页顶部标题、说明和标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'introCard',
        title: '机构介绍卡',
        desc: '对应关于页的机构介绍卡片。',
        meta: page.introCard?.title || page.introCard?.desc || '介绍卡标题 / 说明',
        location: '介绍卡标题 / 介绍卡说明',
        keys: ['introCard']
      },
      {
        id: 'values',
        title: '机构理念',
        desc: '对应关于页理念卡片。',
        meta: `${(page.values || []).length} 项机构理念`,
        location: '理念标题 / 理念说明 / 图标标识',
        keys: ['values']
      },
      {
        id: 'environmentImages',
        title: '环境图片区',
        desc: '对应关于页的校区环境图片。',
        meta: `${(page.environmentImages || []).length} 张环境图片`,
        location: '图片标题 / 图片 URL',
        keys: ['environmentImages']
      },
      {
        id: 'contactInfo',
        title: '联系方式与地址',
        desc: '关于页下方联系方式卡片里的品牌名、电话、微信、地址、服务时间和二维码来自“站点设置”。',
        meta: state.currentData?.pages?.site?.brandName || state.currentData?.pages?.site?.contactPhone || '品牌 / 电话 / 微信 / 地址',
        location: '品牌名 / 电话 / 微信 / 地址 / 服务时间 / 二维码',
        keys: [],
        linkOnly: true,
        targetView: 'contact',
        targetPageKey: 'site',
        actionLabel: '去站点设置修改',
        statusText: '已跳转到站点设置，请修改关于页联系方式与地址信息。'
      },
      {
        id: 'cta',
        title: '关于页底部咨询区',
        desc: '对应关于页最下方的咨询承接区。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 按钮',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      }
    ];
  }

  if (pageKey === 'materials') {
    const seriesMap = Object.fromEntries(((state.currentData?.collections?.materialSeries || [])).map((item) => [item._id, item.name || item._id]));
    const featuredSeriesNames = (page.featuredSeriesIds || []).map((id) => seriesMap[id]).filter(Boolean);

    return [
      {
        id: 'hero',
        title: '资料页首屏',
        desc: '对应资料页顶部标题、说明和标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'tabs',
        title: '顶部分类标签',
        desc: '对应资料页顶部分类 tab。',
        meta: `${(page.tabs || []).length} 个分类标签`,
        location: '标签名称 / 标签说明',
        keys: ['tabs']
      },
      {
        id: 'overviewStats',
        title: '资料页数据卡',
        desc: '对应资料页顶部统计信息卡。',
        meta: `${(page.overviewStats || []).length} 项统计数据`,
        location: '数据数值 / 数据标签 / 补充说明',
        keys: ['overviewStats']
      },
      {
        id: 'featuredSeriesIds',
        title: '精选资料套系',
        desc: '对应资料页首页展示的精选资料套系。',
        meta: featuredSeriesNames.join(' / ') || `${(page.featuredSeriesIds || []).length} 个精选套系`,
        location: '精选套系 ID',
        keys: ['featuredSeriesIds'],
        linkedSources: [
          {
            label: '套系内容详情',
            desc: '精选套系卡片里的名称、摘要、标签和封面来自“教材套系”列表。',
            actionLabel: '去教材套系修改',
            targetView: 'media',
            targetCollectionKey: 'materialSeries',
            statusText: '已跳转到教材套系列表，请修改精选资料套系内容。'
          }
        ]
      },
      {
        id: 'materialSeries',
        title: '教材套系列表',
        desc: '对应资料页里的每个资料套系卡片。',
        meta: `${(state.currentData?.collections?.materialSeries || []).length} 个资料套系`,
        location: '套系名称 / 摘要 / 标签 / 封面',
        keys: [],
        linkOnly: true,
        targetView: 'media',
        targetCollectionKey: 'materialSeries',
        actionLabel: '去教材套系修改',
        statusText: '已跳转到教材套系列表。'
      },
      {
        id: 'materialItems',
        title: '教材单品条目',
        desc: '对应资料页套系下方的具体资料单品。',
        meta: `${(state.currentData?.collections?.materialItems || []).length} 个资料单品`,
        location: '资料标题 / 类型 / 阶段 / 下载或跳转信息',
        keys: [],
        linkOnly: true,
        targetView: 'media',
        targetCollectionKey: 'materialItems',
        actionLabel: '去教材单品修改',
        statusText: '已跳转到教材单品列表。'
      },
      {
        id: 'cta',
        title: '资料页底部咨询区',
        desc: '对应资料页最下方的咨询承接区。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 按钮',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      }
    ];
  }

  const layout = getEditorLayout(`page:${pageKey}`);
  if (!layout) {
    return Object.keys(page || {})
      .filter((key) => !isManagedField(key))
      .map((key, index) => ({
        id: `field-${index + 1}`,
        title: humanizeLabel(key),
        desc: summarizeFieldPreview(key, page[key]),
        meta: summarizeFieldMeta(key, page[key]),
        keys: [key]
      }));
  }

  const baseSections = [...(layout.sections || []), ...(layout.secondarySections || [])];
  const renderedKeys = new Set(baseSections.flatMap((section) => section.keys || []));
  const rows = baseSections.map((section, index) => {
    const sectionKeys = section.keys || [];
    const primaryKey = sectionKeys.find((key) => Object.prototype.hasOwnProperty.call(page || {}, key));
    const labelPreview = sectionKeys.map((key) => humanizeLabel(key)).slice(0, 2).join(' / ');

    return {
      id: section.id || `section-${index + 1}`,
      title: section.title || `区块 ${index + 1}`,
      desc: section.desc || '点击查看区块字段',
      meta: primaryKey ? summarizeFieldPreview(primaryKey, page[primaryKey]) : `${sectionKeys.length} 组字段${labelPreview ? ` · ${labelPreview}` : ''}`,
      location: sectionKeys.map((key) => getScopedFieldLabel(`page:${pageKey}`, [key], key)).join(' / '),
      keys: sectionKeys
    };
  });

  const remainderKeys = Object.keys(page || {}).filter((key) => !isManagedField(key) && !renderedKeys.has(key));
  if (remainderKeys.length) {
    rows.push({
      id: 'extra',
      title: '补充字段',
      desc: '未归入主分组的内容',
      meta: `${remainderKeys.length} 组字段`,
      location: remainderKeys.map((key) => getScopedFieldLabel(`page:${pageKey}`, [key], key)).join(' / '),
      keys: remainderKeys
    });
  }

  return rows;
}

function summarizeFieldPreview(fieldKey, value) {
  if (Array.isArray(value)) {
    if (!value.length) return '暂未配置';
    if (typeof value[0] === 'string') {
      return summarizeText(value.slice(0, 2).join(' / '), 34) || `${value.length} 项内容`;
    }
    const first = value[0] || {};
    return summarizeText(first.title || first.label || first.name || first.value || humanizeLabel(fieldKey), 34) || `${value.length} 项内容`;
  }

  if (value && typeof value === 'object') {
    return summarizeText(value.title || value.label || value.name || value.chip || value.text || value.desc, 34) || '点击查看对象字段';
  }

  if (typeof value === 'string') {
    return summarizeText(value, 34) || '暂未配置';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value ? '已开启' : '未开启';
  }

  return '暂未配置';
}

function summarizeFieldMeta(fieldKey, value) {
  if (Array.isArray(value)) {
    return `${value.length} 项`;
  }

  if (value && typeof value === 'object') {
    return `${Object.keys(value).length} 个子字段`;
  }

  if (typeof value === 'string') {
    return value ? `${value.length} 字` : '空内容';
  }

  if (typeof value === 'number') {
    return '数字字段';
  }

  if (typeof value === 'boolean') {
    return '开关字段';
  }

  return humanizeLabel(fieldKey);
}

function getHomeSectionFieldRows(section, page = {}) {
  return (section.keys || []).map((key) => {
    const value = page[key];
    return {
      id: key,
      title: humanizeLabel(key),
      desc: summarizeFieldPreview(key, value),
      meta: summarizeFieldMeta(key, value)
    };
  });
}

function renderDirectSectionEditor(pageKey, page, section) {
  const fields = renderFieldsForKeys(`page:${pageKey}`, page, section.keys);
  if (!fields) {
    return `<div class="editor-subsection-shell directions-enter-modal-item" style="--enter-delay: 40ms;">
      <div class="workspace-compact-summary editor-subsection-summary">
        <strong>${escapeHtml(section.title)}</strong>
        <span>当前区块没有可编辑字段。</span>
        <em>${escapeHtml(`区块字段 ${section.keys.length} 组`)}</em>
      </div>
      ${renderLinkedSourceCards(section.linkedSources || [])}
      <div class="friendly-editor friendly-editor-pages">
        <div class="empty-state">当前区块暂无可编辑内容。</div>
      </div>
    </div>`;
  }

  return `<div class="editor-subsection-shell directions-enter-modal-item" style="--enter-delay: 40ms;">
    <div class="workspace-compact-summary editor-subsection-summary">
      <strong>${escapeHtml(section.title)}</strong>
      <span>${escapeHtml(section.desc || '这里展示的就是当前真实生效的字段，改完直接保存即可。')}</span>
      <em>${escapeHtml(`区块字段 ${section.keys.length} 组`)}</em>
    </div>
    ${renderLinkedSourceCards(section.linkedSources || [])}
    <div class="friendly-editor friendly-editor-pages">
      ${fields}
    </div>
  </div>`;
}

function renderPageSectionNavCards(pageKey, rows, selectedSectionId, actionName) {
  if (!rows.length) return '';

  return `<div class="page-section-nav-grid directions-enter-modal-item" style="--enter-delay: 50ms;">
    ${rows.map((row, index) => `<button class="page-section-nav-card${row.id === selectedSectionId ? ' active' : ''}" type="button" style="--enter-delay: ${70 + index * 16}ms;" data-action="${escapeHtml(getPageSectionAction(row, actionName))}" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(row.id)}" ${row.linkOnly ? getLinkedWorkspaceDataset(row) : ''}>
      <span class="page-section-nav-kicker">前端区块</span>
      <strong>${escapeHtml(row.title)}</strong>
      <p>${escapeHtml(row.desc || '点击查看对应表单')}</p>
      <div class="page-section-nav-meta">
        <span>${escapeHtml(row.meta || '待完善')}</span>
        <em>${escapeHtml(getSectionLocationText(`page:${pageKey}`, row))}</em>
      </div>
      ${row.linkOnly ? `<div class="page-section-nav-meta"><span>${escapeHtml(row.actionLabel || '去修改')}</span><em>${escapeHtml('该区块内容来自其它工作区')}</em></div>` : ''}
    </button>`).join('')}
  </div>`;
}

function renderPageSectionFieldWorkbench(pageKey, page, section) {
  if (usesDirectSectionEditor(pageKey)) {
    return renderDirectSectionEditor(pageKey, page, section);
  }

  const ui = getViewUi();
  const rows = getHomeSectionFieldRows(section, page);
  const stateKey = `page-field:${pageKey}:${section.id}`;
  const activeFieldId = ui.selectedIds[stateKey] || rows[0]?.id || '';
  const activeField = rows.find((row) => row.id === activeFieldId);

  return `<div class="editor-subsection-shell directions-enter-modal-item" style="--enter-delay: 40ms;">
    <div class="workspace-compact-summary editor-subsection-summary">
      <strong>${escapeHtml(activeField ? `当前字段：${activeField.title}` : '字段总览')}</strong>
      <span>${escapeHtml('先点一条字段 row，再在下面修改对应表单。')}</span>
      <em>${escapeHtml(`当前区块 ${rows.length} 条字段 row`)}</em>
    </div>
    <div class="table-shell editor-subsection-table">
      <table class="data-table data-table-compact">
        <thead>
          <tr>
            <th>字段</th>
            <th>预览</th>
            <th>补充信息</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => `<tr class="${row.id === activeFieldId ? 'active' : ''}" style="--enter-delay: ${60 + index * 14}ms;" data-action="open-page-section-field" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(section.id)}" data-field-id="${escapeHtml(row.id)}">
            <td><strong class="data-table-title">${escapeHtml(row.title)}</strong></td>
            <td>
              <strong class="data-table-title">${escapeHtml(row.desc || '暂未配置')}</strong>
              <span class="data-table-sub">${escapeHtml(row.meta || '点击查看明细')}</span>
            </td>
            <td><span class="table-inline-summary">${escapeHtml(section.title)}</span></td>
            <td><button class="row-action" type="button" data-action="open-page-section-field" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(section.id)}" data-field-id="${escapeHtml(row.id)}">展开</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${activeField ? `<div class="editor-subsection-form directions-enter-modal-item" style="--enter-delay: 70ms;">
      <div class="drawer-focus-bar">
        <strong>${escapeHtml(activeField.title)}</strong>
        <span>${escapeHtml(activeField.desc || '正在编辑当前字段')}</span>
      </div>
      <div class="friendly-editor friendly-editor-pages">
        ${renderFormNode(`page:${pageKey}`, page[activeField.id], [activeField.id], activeField.id)}
      </div>
    </div>` : ''}
  </div>`;
}

function renderPageSectionsTable(pageKey, rows, selectedSectionId, actionName) {
  return `<div class="table-shell workspace-enter" style="--enter-delay: 180ms;">
    <table class="data-table data-table-compact">
      <thead>
        <tr>
          <th>区块</th>
          <th>预览</th>
          <th>补充信息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, index) => `<tr class="workspace-row-enter ${row.id === selectedSectionId ? ' active' : ''}" style="--enter-delay: ${220 + index * 34}ms;" data-action="${escapeHtml(getPageSectionAction(row, actionName))}" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(row.id)}" ${row.linkOnly ? getLinkedWorkspaceDataset(row) : ''}>
          <td><strong class="data-table-title">${escapeHtml(row.title)}</strong></td>
          <td>
            <strong class="data-table-title">${escapeHtml(row.desc || '待完善')}</strong>
            <span class="data-table-sub">${escapeHtml(row.meta || '点击进入编辑')}</span>
          </td>
          <td><span class="table-inline-summary">${escapeHtml(getSectionLocationText(`page:${pageKey}`, row))}</span></td>
          <td><button class="row-action" type="button" data-action="${escapeHtml(getPageSectionAction(row, actionName))}" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(row.id)}" ${row.linkOnly ? getLinkedWorkspaceDataset(row) : ''}>${escapeHtml(getPageSectionActionLabel(row))}</button></td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function renderQuestionBankPagePanel(view, page) {
  if (!view.pageKey || !page) return '';

  const ui = getViewUi();
  const rows = getPageSectionRows(view.pageKey, page);
  const importUi = getQuestionBankImportUi();
  const preview = importUi.preview;
  const lastSummary = importUi.lastSummary;
  const activeSectionId =
    Object.entries(ui.openEditors || {}).find(([key, open]) => open && key.startsWith(`page:${view.pageKey}:section:`))?.[0]?.split(':').pop() ||
    ui.selectedIds[`page-section:${view.pageKey}`] ||
    rows[0]?.id ||
    '';

  return `<section class="collection-section workspace-motion-scope">
    <div class="table-layout table-layout-single">
      <article class="panel table-panel table-panel-focus workspace-panel-enter">
        <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
          <div>
            <h3>${escapeHtml(`${view.pageLabel || view.title}摘要`)}</h3>
            <p>主控区只保留简洁 row，先看入口摘要，再点开对应二级字段表单。</p>
          </div>
        </div>
        <div class="workspace-compact-summary workspace-enter" style="--enter-delay: 20ms;">
          <strong>${escapeHtml(activeSectionId ? `当前焦点：${rows.find((item) => item.id === activeSectionId)?.title || '题库配置'}` : '题库配置总览')}</strong>
          <span>${escapeHtml(`当前整理成 ${rows.length} 条配置 row，点击任一 row 直接进入编辑。`)}</span>
          <em>${escapeHtml(`页面字段 ${Object.keys(page || {}).length} 个`)}</em>
        </div>
        <div class="record-list compact-list workspace-enter" style="--enter-delay: 30ms;">
          ${rows.map((row, index) => `<button class="record-row workspace-row-enter${row.id === activeSectionId ? ' active' : ''}" style="--enter-delay: ${40 + index * 10}ms;" type="button" data-action="open-page-section-editor" data-page-key="${escapeHtml(view.pageKey)}" data-section-id="${escapeHtml(row.id)}">
            <span class="record-row-main">
              <strong class="record-row-title">${escapeHtml(row.title)}</strong>
              <span class="record-row-meta">${escapeHtml(row.desc || '待完善')}</span>
            </span>
            <span class="record-pill">${escapeHtml(row.meta || '点击编辑')}</span>
          </button>`).join('')}
        </div>
        <div class="workspace-compact-summary workspace-enter question-bank-toolkit-summary" style="--enter-delay: 80ms;">
          <strong>模拟题 CSV 导入</strong>
          <span>按约定字段上传模拟题题目，系统会同步校验并更新对应套卷，不影响每日一题固定题源。</span>
          <em>${escapeHtml(preview
            ? `${preview.fileName || '当前文件'} · ${preview.validCount}/${preview.totalRows} 行可导入`
            : lastSummary
              ? `上次导入 ${lastSummary.importedCount || 0} 题，联动 ${lastSummary.paperCount || 0} 套题卷`
              : '支持按 questionId 覆盖更新，并按 paperId 自动归档到套卷')}</em>
        </div>
        <div class="record-list compact-list workspace-enter question-bank-toolkit-list" style="--enter-delay: 100ms;">
          <button class="record-row workspace-row-enter question-bank-import-row${ui.openEditors.questionBankCsvImport ? ' active' : ''}" style="--enter-delay: 110ms;" type="button" data-action="open-question-bank-import">
            <span class="record-row-main">
              <strong class="record-row-title">CSV 模拟题导入</strong>
              <span class="record-row-meta">${escapeHtml(preview
                ? `已载入 ${preview.fileName || 'CSV 文件'}，${preview.invalidCount ? `还有 ${preview.invalidCount} 行待修正` : '校验通过，可直接导入'}`
                : '上传 questionId / paperId / paperTitle / stem... 这套字段，系统会自动识别并预览。')}</span>
            </span>
            <span class="record-pill">${escapeHtml(preview ? '查看预览' : '上传 CSV')}</span>
          </button>
        </div>
        <input class="question-bank-file-input" type="file" accept=".csv,text/csv" data-question-bank-csv-input hidden />
      </article>
      ${renderQuestionBankImportOverlay()}
      ${renderPageSectionOverlay(view.pageKey, view.pageLabel, page, rows)}
    </div>
  </section>`;
}

function renderQuestionBankImportOverlay() {
  const ui = getViewUi('questionBank');
  if (!ui.openEditors.questionBankCsvImport) {
    return '';
  }

  const importUi = getQuestionBankImportUi();
  const preview = importUi.preview;
  const canCommit = Boolean(preview && Number(preview.validCount || 0) > 0 && Number(preview.invalidCount || 0) === 0 && !importUi.isSubmitting);
  const summaryText = preview
    ? `${preview.fileName || '当前 CSV'} 共 ${preview.totalRows} 行，${preview.validCount} 行可导入，${preview.invalidCount} 行待修正。`
    : '先选择 CSV 文件，系统会先校验字段、答案格式、题号重复与试卷归属，再允许导入。';
  const latestText = importUi.lastSummary
    ? `上次导入 ${importUi.lastSummary.importedCount || 0} 题，新增 ${importUi.lastSummary.createdCount || 0} 题，更新 ${importUi.lastSummary.updatedCount || 0} 题；联动 ${importUi.lastSummary.paperCount || 0} 套题卷。`
    : '当前支持 questionId 覆盖更新，并按 paperId 自动同步模拟题套卷。';

  return `<div class="editor-overlay is-visible directions-editor-overlay question-bank-import-overlay" data-editor-question-bank-import="true">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭导入弹层" data-action="close-question-bank-import"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>CSV 模拟题导入</h3>
          <p>先按标准表头上传模拟题题目，系统会先预览，再同步到对应套卷。</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="pick-question-bank-import-file">${preview ? '重新选择 CSV' : '选择 CSV'}</button>
          <button class="topbar-icon-button editor-close-button" type="button" aria-label="关闭导入弹层" data-action="close-question-bank-import">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">方向 medical</span>
          <span class="meta-chip">表头 ${escapeHtml(String(QUESTION_BANK_CSV_HEADERS.length))} 列</span>
          <span class="meta-chip">${escapeHtml(latestText)}</span>
        </div>
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(preview ? (preview.fileName || '当前文件') : '等待上传 CSV')}</strong>
          <span>${escapeHtml(summaryText)}</span>
        </div>
        <div class="question-bank-import-stack directions-enter-modal-item" style="--enter-delay: 60ms;">
          <article class="question-bank-import-card">
            <div class="question-bank-import-head">
              <div>
                <strong>字段约束</strong>
                <span>表头请严格使用下面这一行，paperTitle 和 paperDescription 可选，但建议一起维护。</span>
              </div>
              <button class="system-action" type="button" data-action="pick-question-bank-import-file">上传 CSV</button>
            </div>
            <pre class="question-bank-import-code">${escapeHtml(QUESTION_BANK_CSV_HEADERS.join(','))}</pre>
            <div class="question-bank-import-tips">
              <span>单选答案示例：A</span>
              <span>多选答案示例：A|C|D</span>
              <span>判断答案示例：T / F</span>
              <span>答案可留空，但 status 请用 draft</span>
              <span>同一 paperId 会自动归并成一套题卷</span>
            </div>
          </article>
          ${preview ? `<article class="question-bank-import-card">
            <div class="question-bank-import-head">
              <div>
                <strong>预览结果</strong>
                <span>先看总量和问题行，再决定是否正式导入。</span>
              </div>
            </div>
            <div class="question-bank-import-metrics">
              <span class="meta-chip">总行数 ${escapeHtml(String(preview.totalRows || 0))}</span>
              <span class="meta-chip success">可导入 ${escapeHtml(String(preview.validCount || 0))}</span>
              <span class="meta-chip${preview.invalidCount ? ' danger' : ''}">待修正 ${escapeHtml(String(preview.invalidCount || 0))}</span>
            </div>
            ${preview.errors?.length ? `<div class="question-bank-import-errors">
              ${preview.errors.map((error) => `<div class="question-bank-import-error">
                <strong>第 ${escapeHtml(String(error.lineNumber || '-'))} 行</strong>
                <span>${escapeHtml(error.message || '格式错误')}</span>
              </div>`).join('')}
            </div>` : '<div class="empty-state compact">当前 CSV 没有发现格式错误，可以直接导入。</div>'}
            ${preview.previewRows?.length ? `<div class="question-bank-preview-table">
              <table class="data-table data-table-compact">
                <thead>
                  <tr>
                    <th>行号</th>
                    <th>题目 ID</th>
                    <th>试卷 ID</th>
                    <th>题型</th>
                    <th>题干预览</th>
                    <th>年份</th>
                  </tr>
                </thead>
                <tbody>
                  ${preview.previewRows.map((row) => `<tr>
                    <td>${escapeHtml(String(row.lineNumber || '-'))}</td>
                    <td>${escapeHtml(row.questionId || '-')}</td>
                    <td>${escapeHtml(row.paperId || '-')}</td>
                    <td>${escapeHtml(row.questionType || '-')}</td>
                    <td><span class="table-inline-summary">${escapeHtml(summarizeText(row.stem, 44) || '-')}</span></td>
                    <td>${escapeHtml(String(row.year || '-'))}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>` : ''}
          </article>` : `<article class="question-bank-import-card question-bank-import-empty">
            <div class="empty-state">选择 CSV 后，这里会显示导入总量、错误行和题目预览。</div>
          </article>`}
        </div>
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 80ms;">
          <button class="system-action" type="button" data-action="pick-question-bank-import-file">${preview ? '更换文件' : '选择 CSV'}</button>
          <button class="system-action" type="button" data-action="clear-question-bank-import">清空预览</button>
          <button class="system-action${canCommit ? '' : ' is-disabled'}" type="button" data-action="commit-question-bank-import" ${canCommit ? '' : 'disabled'}>
            ${importUi.isSubmitting ? '导入中...' : '确认导入'}
          </button>
          <button class="system-action" type="button" data-action="close-question-bank-import">关闭</button>
        </div>
      </div>
    </article>
  </div>`;
}

function renderPageWorkspace(view, data) {
  const rows = getPageSectionRows(view.pageKey, data.page || {});
  const ui = getViewUi();
  const selectedSectionId = ui.selectedIds[`page-section:${view.pageKey}`] || rows[0]?.id || '';

  return `<section class="module-page workspace-motion-scope page-workspace-scope">
    <article class="panel module-hero-panel module-hero-compact workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(view.title)}</h3>
          <p>${escapeHtml('页面配置拆成 row 工作区，先看每个区块摘要，再点开对应浮层编辑。')}</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新模块</button>
        </div>
      </div>
      ${renderModuleSummary(view, data)}
    </article>

    <section class="collection-section">
      <div class="table-layout table-layout-single">
        <article class="panel table-panel table-panel-focus workspace-panel-enter">
          <div class="panel-head workspace-enter" style="--enter-delay: 60ms;">
            <div>
              <h3>${escapeHtml(`${view.pageLabel || view.title}工作区`)}</h3>
              <p>主区先按前端区块列出摘要，你可以直接按页面从上到下定位并进入真实生效表单。</p>
            </div>
          </div>
          <div class="workspace-compact-summary workspace-enter" style="--enter-delay: 120ms;">
            <strong>${escapeHtml(selectedSectionId ? `当前焦点：${rows.find((item) => item.id === selectedSectionId)?.title || view.pageLabel || '页面配置'}` : `${view.pageLabel || '页面配置'}总览`)}</strong>
            <span>${escapeHtml(`共 ${rows.length} 个核心区块，字段名称和前端展示位置已统一，建议按从上到下逐块维护。`)}</span>
            <em>${escapeHtml(`当前页面字段 ${Object.keys(data.page || {}).length} 个`)}</em>
          </div>
          ${renderPageSectionNavCards(view.pageKey, rows, selectedSectionId, 'open-page-section-editor')}
          ${renderPageSectionsTable(view.pageKey, rows, selectedSectionId, 'open-page-section-editor')}
        </article>
        ${renderPageSectionOverlay(view.pageKey, view.pageLabel, data.page, rows)}
      </div>
    </section>
  </section>`;
}

function renderPageSectionOverlay(pageKey, pageLabel, page, rows = getPageSectionRows(pageKey, page || {})) {
  const ui = getViewUi();
  const activeRow = rows.find((row) => ui.openEditors[getPageSectionEditorKey(pageKey, row.id)]);
  if (!activeRow || !page) {
    return '';
  }

  return `<div class="editor-overlay is-visible directions-editor-overlay" data-editor-page-section="${escapeHtml(activeRow.id)}">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭编辑弹层" data-action="close-page-section-editor" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(activeRow.id)}"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(`${pageLabel} · ${activeRow.title}`)}</h3>
          <p>${escapeHtml(activeRow.desc || '当前只展开这一组字段，改完保存即可，不会干扰其它区块。')}</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(pageKey)}">保存页面</button>
          <button class="topbar-icon-button editor-close-button" type="button" aria-label="关闭编辑弹层" data-action="close-page-section-editor" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(activeRow.id)}">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">区块 ${escapeHtml(activeRow.title)}</span>
          <span class="meta-chip">字段 ${escapeHtml(String(activeRow.keys.length))} 组</span>
          <span class="meta-chip">前端位置 ${escapeHtml(getSectionLocationText(`page:${pageKey}`, activeRow))}</span>
          ${activeRow.linkedSources?.length ? `<span class="meta-chip">关联来源 ${escapeHtml(String(activeRow.linkedSources.length))} 处</span>` : ''}
          <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(page)))}</span>
        </div>
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(activeRow.desc || activeRow.title)}</strong>
          <span>${escapeHtml(activeRow.meta || '正在编辑当前区块')}</span>
        </div>
        ${renderPageSectionFieldWorkbench(pageKey, page, activeRow)}
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 80ms;">
          <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(pageKey)}">保存页面</button>
          <button class="system-action" type="button" data-action="close-page-section-editor" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(activeRow.id)}">返回工作区</button>
        </div>
      </div>
    </article>
  </div>`;
}

function renderWorkspaceMetricStack(primary, secondary, tone = 'neutral') {
  return `<div class="metric-stack tone-${escapeHtml(tone)}">
    <strong>${escapeHtml(primary || '-')}</strong>
    <span>${escapeHtml(secondary || '')}</span>
  </div>`;
}

function getSortedDirections(items = state.currentData?.collections?.directions || []) {
  return [...items].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
}

function getDirectionNameMap(items = state.currentData?.collections?.directions || []) {
  return Object.fromEntries(getSortedDirections(items).map((item) => [item._id, item.name || item._id]));
}

function getFeaturedDirectionNames(page = state.currentData?.page || {}, items = state.currentData?.collections?.directions || []) {
  const directionNameMap = getDirectionNameMap(items);
  return (page.featuredDirectionIds || []).map((id) => directionNameMap[id]).filter(Boolean);
}

function renderWorkspaceStatCards(cards = []) {
  return `<div class="workspace-stat-grid">${cards.map((card) => `<article class="workspace-stat-card">
    <span>${escapeHtml(card.label)}</span>
    <strong>${escapeHtml(card.value)}</strong>
    <em>${escapeHtml(card.note)}</em>
  </article>`).join('')}</div>`;
}

function renderEditorInsightCards(cards = []) {
  return cards.length ? `<div class="editor-insight-grid">${cards.map((card) => `<article class="editor-insight-card">
    <span>${escapeHtml(card.label)}</span>
    <strong>${escapeHtml(card.value)}</strong>
    <em>${escapeHtml(card.note || '')}</em>
  </article>`).join('')}</div>` : '';
}

function getDirectionEditorInsightCards(item) {
  const directions = [...(state.currentData?.collections?.directions || [])].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
  const page = state.currentData?.page || {};
  const sortRank = directions.findIndex((entry) => entry._id === item._id) + 1;
  const featuredRank = (page.featuredDirectionIds || []).indexOf(item._id) + 1;

  return [
    {
      label: '当前状态',
      value: item.status || 'draft',
      note: item.isFeatured ? '已进入首页推荐池' : '当前不在首页推荐池'
    },
    {
      label: '列表顺位',
      value: sortRank > 0 ? String(sortRank) : '-',
      note: `排序值 ${item.sort ?? '-'}`
    },
    {
      label: '推荐顺位',
      value: featuredRank > 0 ? `第 ${featuredRank} 位` : '未推荐',
      note: item.category || '未设置分类'
    }
  ];
}

function getCoursesPageInsightCards(page) {
  const directions = state.currentData?.collections?.directions || [];
  const featuredNames = (page.featuredDirectionIds || [])
    .map((id) => directions.find((item) => item._id === id)?.name)
    .filter(Boolean);

  return [
    {
      label: '判断标签',
      value: String((page.categories || []).length),
      note: (page.categories || []).slice(0, 2).join(' / ') || '尚未设置'
    },
    {
      label: '判断提示',
      value: String((page.suggestions || []).length),
      note: page.suggestions?.[0] || '尚未设置'
    },
    {
      label: '重点方向',
      value: String((page.featuredDirectionIds || []).length),
      note: featuredNames.slice(0, 2).join(' / ') || '尚未设置'
    },
    {
      label: '咨询承接',
      value: page.cta?.buttonText ? '已配置' : '未配置',
      note: page.cta?.title || page.cta?.buttonText || '尚未设置'
    }
  ];
}

function getDirectionsWorkspaceRows(view, data) {
  const page = data.page || {};
  const items = [...(data.collections.directions || [])].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
  const directionNameMap = Object.fromEntries(items.map((item) => [item._id, item.name || item._id]));
  const featuredNames = (page.featuredDirectionIds || []).map((id) => directionNameMap[id]).filter(Boolean);
  return [
    {
      kind: 'page',
      rowId: `page:${view.pageKey}`,
      title: page.title || view.pageLabel,
      sub: page.subtitle || '判断首屏、两张重点方向卡片与咨询承接区',
      metaPrimary: `${(page.categories || []).length} 个判断标签`,
      metaSecondary: `${(page.featuredDirectionIds || []).length} 张重点方向卡片 · ${(page.suggestions || []).length} 条判断提示`,
      placementPrimary: `${(page.featuredDirectionIds || []).length} 张重点方向卡片`,
      placementSecondary: featuredNames.slice(0, 2).join(' / ') || '尚未设置重点方向',
      priorityLabel: '总控台',
      priorityTone: 'page',
      status: '页面配置',
      updatedAt: getUpdatedAt(page),
      pageKey: view.pageKey
    },
    ...items.map((item, index) => {
      const featuredRank = (page.featuredDirectionIds || []).indexOf(item._id);
      const sortRank = index + 1;
      return {
        kind: 'item',
        rowId: item._id || '',
        item,
        title: item.name || '未命名方向',
        sub: item.summary || item.slug || '',
        metaPrimary: item.category || '-',
        metaSecondary: `${item.isFeatured ? `首页精选 · 第 ${featuredRank + 1} 位` : '普通条目'} · 排序 ${item.sort ?? '-'}`,
        placementPrimary: item.isFeatured ? `首页第 ${featuredRank + 1} 位` : '未上首页',
        placementSecondary: `列表第 ${sortRank} 位 · 排序 ${item.sort ?? '-'}`,
        priorityLabel: item.isFeatured ? '高优先级' : sortRank <= 2 ? '前排' : '常规',
        priorityTone: item.isFeatured ? 'featured' : sortRank <= 2 ? 'top' : 'normal',
        sortRank,
        featuredRank,
        status: item.status || 'draft',
        updatedAt: getUpdatedAt(item)
      };
    })
  ];
}

function getDirectionsWorkspaceState(view, data) {
  const ui = getViewUi();
  const filterState = getCollectionFilterState('directions');
  const rows = getDirectionsWorkspaceRows(view, data);
  const keyword = filterState.keyword.trim().toLowerCase();
  const filteredRows = rows.filter((row) => {
    if (row.kind === 'page') {
      if (!keyword) return true;
      return [row.title, row.sub, row.metaPrimary, row.metaSecondary].filter(Boolean).join(' ').toLowerCase().includes(keyword);
    }

    const statusMatched = filterState.status === 'all' ? true : row.status === filterState.status;
    if (!statusMatched) return false;
    if (!keyword) return true;
    return [row.title, row.sub, row.metaPrimary, row.metaSecondary, row.item?.slug].filter(Boolean).join(' ').toLowerCase().includes(keyword);
  });
  const pageOpen = Boolean(ui.openEditors[`page:${view.pageKey}`]);
  const selectedItem = getSelectedCollectionState('directions', data.collections.directions || []);

  return {
    filterState,
    rows,
    filteredRows,
    pageOpen,
    selectedItem,
    activeRow: pageOpen
      ? rows.find((row) => row.kind === 'page') || null
      : rows.find((row) => row.kind === 'item' && row.rowId === selectedItem.itemId) || null
  };
}

function renderDirectionsWorkspace(view, data) {
  const { filterState, rows, filteredRows, pageOpen, selectedItem, activeRow } = getDirectionsWorkspaceState(view, data);
  const directions = data.collections.directions || [];
  const publishedCount = directions.filter((item) => item.status === 'published').length;
  const featuredCount = directions.filter((item) => item.isFeatured).length;
  const nextSort = directions.length ? Math.max(...directions.map((item) => Number(item.sort || 0))) + 10 : 10;
  const categoryCount = (data.page?.categories || []).length;
  const activeSummary = activeRow
    ? (activeRow.kind === 'page'
      ? `页面总控，含 ${categoryCount} 个判断标签和 ${(data.page?.featuredDirectionIds || []).length} 张重点方向卡片。`
      : `${activeRow.item?.category || '未分组'}，排序 ${activeRow.item?.sort || '-'}，${activeRow.item?.isFeatured ? '已推荐到首页。' : '未推荐到首页。'}`)
    : `共 ${rows.length} 行，已发布 ${publishedCount} 条，首页推荐 ${featuredCount} 条。`;

  return `<section class="module-page workspace-motion-scope directions-motion-scope">
    <section class="collection-section">
      <div class="table-layout table-layout-single">
        <article class="panel table-panel table-panel-focus directions-panel-enter">
          <div class="panel-head workspace-enter directions-enter" style="--enter-delay: 0ms;">
            <div>
              <h3>方向工作区</h3>
              <p>页面配置和方向条目在同一张表里，先定位 row，再点编辑。</p>
            </div>
            <div class="panel-actions">
              <button class="system-action" type="button" data-action="reload-view">刷新</button>
              <button class="system-action" type="button" data-action="new-item" data-collection-key="directions">新建方向</button>
            </div>
          </div>
          <div class="table-toolbar workspace-enter directions-enter" style="--enter-delay: 60ms;">
            <label class="table-search">
              ${icon('search')}
              <input type="text" value="${escapeHtml(filterState.keyword)}" placeholder="搜索页面配置或方向条目" data-list-filter="directions" />
            </label>
            <div class="table-filters">
              ${STATUS_FILTER_OPTIONS.map((option) => `<button class="segment${filterState.status === option.key ? ' active' : ''}" type="button" data-action="set-status-filter" data-collection-key="directions" data-status-key="${escapeHtml(option.key)}">${escapeHtml(option.label)}</button>`).join('')}
            </div>
          </div>
          <div class="workspace-compact-summary workspace-enter directions-enter" style="--enter-delay: 120ms;">
            <strong>${escapeHtml(activeRow ? `当前焦点：${activeRow.kind === 'page' ? '页面配置' : activeRow.title}` : '方向总览')}</strong>
            <span>${escapeHtml(activeSummary)}</span>
            <em>当前展示 ${escapeHtml(String(filteredRows.length))} / ${escapeHtml(String(rows.length))} 行，建议新排序 ${escapeHtml(String(nextSort))}</em>
          </div>
          <div class="table-shell workspace-enter directions-enter" style="--enter-delay: 180ms;">
            ${filteredRows.length ? `<table class="data-table data-table-compact">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>关键信息</th>
                  <th>位置 / 推荐</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${filteredRows.map((row, index) => {
                  const isActive = row.kind === 'page'
                    ? pageOpen
                    : (!selectedItem.isDraft && selectedItem.itemId === row.rowId && Boolean(getViewUi().openEditors.directions));
                  return `<tr class="workspace-row-enter directions-row-enter ${isActive ? ' active' : ''}${row.kind === 'page' ? ' row-page-config' : ''}${row.priorityTone === 'featured' ? ' row-featured' : ''}${row.priorityTone === 'top' ? ' row-top' : ''}" style="--enter-delay: ${220 + index * 34}ms;">
                    <td><span class="row-kind-badge${row.kind === 'page' ? ' page' : ''}">${escapeHtml(row.kind === 'page' ? '页面配置' : '方向条目')}</span></td>
                    <td>
                      <strong class="data-table-title">${escapeHtml(row.title)}</strong>
                      <span class="data-table-sub">${escapeHtml(row.sub || '')}</span>
                      <span class="data-table-minor">${escapeHtml(row.metaPrimary || '')}</span>
                    </td>
                    <td>
                      <strong class="data-table-title">${escapeHtml(row.placementPrimary || row.priorityLabel || '-')}</strong>
                      <span class="data-table-sub">${escapeHtml(row.placementSecondary || row.metaSecondary || '')}</span>
                    </td>
                    <td><span class="record-pill${row.status === 'published' ? ' success' : ''}">${escapeHtml(row.status)}</span></td>
                    <td>${row.kind === 'page'
                      ? `<button class="row-action" type="button" data-action="open-page-editor" data-page-key="${escapeHtml(row.pageKey)}">编辑</button>`
                      : `<button class="row-action" type="button" data-action="select-item" data-collection-key="directions" data-item-id="${escapeHtml(row.rowId)}">编辑</button>`}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>` : '<div class="empty-state">当前筛选下没有数据，试试切换状态或新建一条内容。</div>'}
          </div>
        </article>
        ${renderCollectionEditor('directions', selectedItem, getCollectionMeta('directions'))}
        ${renderPageEditorOverlay(view.pageKey, view.pageLabel, data.page)}
      </div>
    </section>
  </section>`;
}

function renderTableCollectionSection(collectionKey, items) {
  const collectionMeta = getCollectionMeta(collectionKey);
  const filteredItems = getFilteredCollectionItems(collectionKey, items);
  const selected = getSelectedCollectionState(collectionKey, filteredItems.length ? filteredItems : items);
  const filterState = getCollectionFilterState(collectionKey);
  const ui = getViewUi();
  const isEditorOpen = Boolean(ui.openEditors[collectionKey]);
  const columns = TABLE_COLUMNS[collectionKey] || [];
  const publishedCount = (items || []).filter((item) => item.status === 'published').length;

  return `<section class="collection-section workspace-motion-scope">
    <div class="table-layout table-layout-single">
      <article class="panel table-panel table-panel-focus workspace-panel-enter">
        <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
          <div>
            <h3>${escapeHtml(collectionMeta.label)}</h3>
            <p>主区只保留 row 和关键列，先找到记录，再去右侧改细节。</p>
          </div>
          <div class="panel-actions">
            <button class="system-action" type="button" data-action="new-item" data-collection-key="${escapeHtml(collectionKey)}">新建</button>
          </div>
        </div>
        <div class="table-toolbar workspace-enter" style="--enter-delay: 60ms;">
          <label class="table-search">
            ${icon('search')}
            <input type="text" value="${escapeHtml(filterState.keyword)}" placeholder="搜索重点字段" data-list-filter="${escapeHtml(collectionKey)}" />
          </label>
          <div class="table-filters">
            ${STATUS_FILTER_OPTIONS.map((option) => `<button class="segment${filterState.status === option.key ? ' active' : ''}" type="button" data-action="set-status-filter" data-collection-key="${escapeHtml(collectionKey)}" data-status-key="${escapeHtml(option.key)}">${escapeHtml(option.label)}</button>`).join('')}
          </div>
        </div>
        <div class="editor-meta workspace-enter" style="--enter-delay: 120ms;">
          <span class="meta-chip">共 ${escapeHtml(String(items.length))} 条</span>
          <span class="meta-chip">已发布 ${escapeHtml(String(publishedCount))}</span>
          <span class="meta-chip">当前展示 ${escapeHtml(String(filteredItems.length))}</span>
        </div>
        <div class="table-shell workspace-enter" style="--enter-delay: 180ms;">
          ${filteredItems.length ? `<table class="data-table">
            <thead>
              <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${filteredItems.map((item, index) => `<tr class="workspace-row-enter${isEditorOpen && selected.itemId === item._id && !selected.isDraft ? ' active' : ''}" style="--enter-delay: ${220 + index * 28}ms;" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">
                ${columns.map((column) => `<td>${column.render(item)}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>` : '<div class="empty-state">当前筛选下没有数据，试试切换状态或新建一条内容。</div>'}
        </div>
      </article>
      ${renderCollectionEditor(collectionKey, selected, collectionMeta)}
    </div>
  </section>`;
}

function renderSidebar() {
  refs.nav.innerHTML = NAV_ITEMS.map((item) => `<button class="nav-item${state.activeView === item.key ? ' active' : ''}" type="button" data-nav="${escapeHtml(item.key)}" aria-label="${escapeHtml(item.label)}">
    <span class="nav-label">${escapeHtml(item.label)}</span>
  </button>`).join('');
}

function setTopbar(view) {
  refs.topbarKicker.textContent = view.kicker;
  refs.topbarBreadcrumb.textContent = view.breadcrumb;
  refs.viewTitle.textContent = view.title;
}

function setStatus(message, tone = 'ok') {
  refs.statusPill.textContent = message;
  refs.statusPill.dataset.tone = tone;
}

function getSaveSuccessMessage(label = '内容') {
  const target = state.health?.mode === 'cloud' ? '云端' : '本地';
  return `${label}已保存并同步到${target}`;
}

function hasOpenEditor(viewKey = state.activeView) {
  const ui = getViewUi(viewKey);
  return Object.values(ui.openEditors || {}).some(Boolean);
}

function syncModalState() {
  document.body.classList.toggle('modal-open', hasOpenEditor());
}

function renderLoading() {
  refs.content.innerHTML = `<section class="module-page"><article class="panel empty-panel"><div class="empty-state">正在加载当前模块数据...</div></article></section>`;
  syncModalState();
}

function renderError(message) {
  refs.content.innerHTML = `<section class="module-page"><article class="panel empty-panel"><div class="empty-state">${escapeHtml(message)}</div></article></section>`;
  syncModalState();
}

function renderOverview(data) {
  const totalPages = Object.keys(data.pages).length;
  const totalItems = Object.values(data.collections).reduce((sum, items) => sum + items.length, 0);
  const published = Object.values(data.collections).flat().filter((item) => item.status === 'published').length;
  const drafts = Object.values(data.collections).flat().filter((item) => item.status !== 'published').length;
  const todayUpdates = data.recentUpdates.filter((item) => isToday(item.updatedAt)).length;
  const mediaCount = (data.collections.mediaAssets || []).length;

  refs.content.innerHTML = `<section class="dashboard-page workspace-motion-scope">
    <div class="stats-grid">
      <article class="stat-card tone-indigo workspace-enter" style="--enter-delay: 0ms;">
        <div class="stat-card-head"><h2>页面配置</h2><span class="stat-card-icon">${icon('grid')}</span></div>
        <div class="stat-card-value">${escapeHtml(totalPages)}</div>
        <div class="stat-card-foot"><strong class="positive">已接入</strong><span>单页内容</span></div>
      </article>
      <article class="stat-card tone-green workspace-enter" style="--enter-delay: 50ms;">
        <div class="stat-card-head"><h2>内容条目</h2><span class="stat-card-icon">${icon('compass')}</span></div>
        <div class="stat-card-value">${escapeHtml(totalItems)}</div>
        <div class="stat-card-foot"><strong class="positive">${escapeHtml(String(published))}</strong><span>已发布</span></div>
      </article>
      <article class="stat-card tone-sky workspace-enter" style="--enter-delay: 100ms;">
        <div class="stat-card-head"><h2>媒体资源</h2><span class="stat-card-icon">${icon('image')}</span></div>
        <div class="stat-card-value">${escapeHtml(mediaCount)}</div>
        <div class="stat-card-foot"><strong>${escapeHtml(String(drafts))}</strong><span>待完善内容</span></div>
      </article>
      <article class="stat-card tone-violet workspace-enter" style="--enter-delay: 150ms;">
        <div class="stat-card-head"><h2>今日更新</h2><span class="stat-card-icon">${icon('refresh')}</span></div>
        <div class="stat-card-value">${escapeHtml(todayUpdates)}</div>
        <div class="stat-card-foot"><strong class="positive">实时</strong><span>来自当前数据源</span></div>
      </article>
    </div>

    <div class="dashboard-main">
      <article class="panel trend-panel workspace-panel-enter" style="--enter-delay: 180ms;">
        <div class="panel-head">
          <div>
            <h3>页面配置状态</h3>
            <p>${escapeHtml(state.health?.mode === 'cloud' ? '当前为云端模式' : '当前为本地模式')}，这里展示各页面最后更新时间。</p>
          </div>
        </div>
        <div class="record-list compact-list overview-list">
          ${Object.entries(data.pages).map(([pageKey, pageData], index) => `<button class="record-row workspace-row-enter" style="--enter-delay: ${230 + index * 26}ms;" type="button" data-action="open-view" data-target-view="${escapeHtml(resolveViewFromPageKey(pageKey))}">
            <span class="record-row-main">
              <strong class="record-row-title">${escapeHtml(data.pageLabels[pageKey] || pageKey)}</strong>
              <span class="record-row-meta">最后更新 ${escapeHtml(formatDateTime(getUpdatedAt(pageData)))}</span>
            </span>
            <span class="record-pill">进入</span>
          </button>`).join('')}
        </div>
      </article>

      <article class="panel health-panel workspace-panel-enter" style="--enter-delay: 240ms;">
        <div class="panel-head">
          <div>
            <h3>模块健康度</h3>
            <p>根据条目数量与发布状态给出一个轻量健康参考。</p>
          </div>
        </div>
        <div class="health-list">
          ${data.healthRows.map((item) => `<div class="health-item">
            <span class="health-label">${escapeHtml(item.label)}</span>
            <div class="health-track"><span class="health-fill tone-${escapeHtml(item.tone)}" style="width:${item.value}%"></span></div>
            <strong class="health-value">${escapeHtml(`${item.value}%`)}</strong>
          </div>`).join('')}
        </div>
      </article>
    </div>

    <div class="dashboard-bottom">
      <article class="panel updates-panel workspace-panel-enter" style="--enter-delay: 300ms;">
        <div class="panel-head">
          <div>
            <h3>最近更新</h3>
            <p>按更新时间排序的页面与内容条目。</p>
          </div>
        </div>
        <div class="timeline">
          ${data.recentUpdates.slice(0, 8).map((item) => `<div class="timeline-item">
            <span class="timeline-marker"></span>
            <div class="timeline-copy">
              <strong>${escapeHtml(item.title)}</strong>
              <div class="timeline-meta">
                <span class="timeline-tag">${escapeHtml(item.module)}</span>
                <span>${escapeHtml(formatRelative(item.updatedAt))}</span>
                <span>${escapeHtml(formatDateTime(item.updatedAt))}</span>
              </div>
            </div>
          </div>`).join('') || '<div class="empty-state">还没有可展示的更新记录。</div>'}
        </div>
      </article>

      <article class="panel system-panel workspace-panel-enter" style="--enter-delay: 360ms;">
        <div class="panel-head">
          <div>
            <h3>运行概况</h3>
          </div>
        </div>
        <div class="system-grid">
          <div class="system-card">
            <span>数据源模式</span>
            <div class="system-value"><strong>${escapeHtml(state.health?.mode || 'unknown')}</strong><em>${escapeHtml(String(state.health?.port || ''))}</em></div>
            <div class="system-track"><span class="tone-violet" style="width:${state.health?.mode === 'cloud' ? 100 : 72}%"></span></div>
          </div>
          <div class="system-card">
            <span>集合数量</span>
            <div class="system-value"><strong>${escapeHtml(String(Object.keys(data.collections).length))}</strong><em>collections</em></div>
            <div class="system-track"><span class="tone-green" style="width:${Math.min(100, Object.keys(data.collections).length * 14)}%"></span></div>
          </div>
        </div>
        <div class="system-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新总览</button>
          <button class="system-action" type="button" data-action="open-view" data-target-view="contact">站点设置</button>
        </div>
      </article>
    </div>
  </section>`;
  syncModalState();
}

function renderModuleSummary(view, data) {
  const cards = [];
  if (view.pageKey && data.page) {
    cards.push({ title: '页面主配置', value: Object.keys(data.page || {}).length, note: view.pageLabel });
  }
  for (const collection of view.collections || []) {
    const items = data.collections[collection.key] || [];
    cards.push({ title: collection.label, value: items.length, note: `${items.filter((item) => item.status === 'published').length} 已发布` });
  }
  if (!cards.length) {
    cards.push({ title: '配置字段', value: Object.keys(data.page || {}).length, note: '当前页面配置' });
  }
  return `<div class="module-summary">${cards.map((card) => `<article class="summary-card"><span>${escapeHtml(card.title)}</span><strong>${escapeHtml(String(card.value))}</strong><em>${escapeHtml(card.note)}</em></article>`).join('')}</div>`;
}

function renderPageConfigLauncher(view, page) {
  if (!view.pageKey || !page) return '';

  const primaryText = page.title || page.siteName || page.hero?.title || view.pageLabel;
  const secondaryText =
    page.subtitle ||
    page.brandName ||
    page.hero?.desc ||
    `${Object.keys(page || {}).length} 个一级字段`;

  return `<article class="panel page-config-row-card workspace-panel-enter" style="--enter-delay: 120ms;">
    <div class="panel-head workspace-enter" style="--enter-delay: 150ms;">
      <div>
        <h3>${escapeHtml(view.pageLabel || '页面配置')}</h3>
        <p>主区只保留摘要信息，点击右侧按钮进入独立浮层编辑，避免二级表单在这里被压缩。</p>
      </div>
      <div class="panel-actions">
        <button class="system-action" type="button" data-action="open-page-editor" data-page-key="${escapeHtml(view.pageKey)}">打开页面配置</button>
      </div>
    </div>
    <button class="page-config-row" type="button" data-action="open-page-editor" data-page-key="${escapeHtml(view.pageKey)}">
      <span class="page-config-row-main">
        <strong>${escapeHtml(primaryText || view.pageLabel)}</strong>
        <em>${escapeHtml(secondaryText || '点击查看详细字段')}</em>
      </span>
      <span class="page-config-row-meta">
        <span class="meta-chip">字段 ${escapeHtml(String(Object.keys(page || {}).length))}</span>
        <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(page)))}</span>
        <span class="page-config-row-action">进入编辑</span>
      </span>
    </button>
  </article>`;
}

function renderTableFirstModule(view, data) {
  return `<section class="module-page workspace-motion-scope">
    <article class="panel module-hero-panel module-hero-compact workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(view.title)}</h3>
          <p>${escapeHtml('主控区先聚焦 row 和关键列，表单在浮层里处理细节，避免焦点分散。')}</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新模块</button>
        </div>
      </div>
      ${renderModuleSummary(view, data)}
    </article>
    ${view.key === 'questionBank' ? renderQuestionBankPagePanel(view, data.page) : ''}
    ${(view.collections || []).map((collection) => renderCollectionSection(collection.key, data.collections[collection.key] || [])).join('')}
    ${view.key !== 'questionBank' && view.pageKey ? renderPageConfigLauncher(view, data.page) : ''}
    ${view.key !== 'questionBank' && view.pageKey ? renderPageEditorOverlay(view.pageKey, view.pageLabel, data.page) : ''}
  </section>`;
}

function renderCollectionSection(collectionKey, items) {
  if (TABLE_COLLECTIONS.has(collectionKey)) {
    return renderTableCollectionSection(collectionKey, items);
  }

  const collectionMeta = getCollectionMeta(collectionKey);
  const selected = getSelectedCollectionState(collectionKey, items);
  const ui = getViewUi();
  const keyword = (ui.filters[collectionKey] || '').toLowerCase();
  const statusFilter = ui.statusFilters[collectionKey] || 'all';

  // 过滤数据
  const filteredItems = items.filter(item => {
    // 状态过滤
    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }

    // 关键词搜索
    if (keyword) {
      const searchText = [
        getPrimaryLabel(item, collectionKey),
        getSecondaryLabel(item, collectionKey),
        item._id,
        item.slug,
        item.category
      ].filter(Boolean).join(' ').toLowerCase();

      return searchText.includes(keyword);
    }

    return true;
  });

  const editorLabel = selected.isDraft ? '新建条目' : selected.item ? `编辑 ${getPrimaryLabel(selected.item, collectionKey)}` : '暂无条目';
  const publishedCount = items.filter(item => item.status === 'published').length;

  return `<section class=”collection-section workspace-motion-scope”>
    <div class=”table-layout table-layout-single”>
      <article class=”panel table-panel table-panel-focus workspace-panel-enter”>
        <div class=”panel-head workspace-enter” style=”--enter-delay: 0ms;”>
          <div>
            <h3>${escapeHtml(collectionMeta.label)}</h3>
            <p>表格展示关键信息，点击行编辑详细内容。</p>
          </div>
          <div class=”panel-actions”>
            <button class=”system-action” type=”button” data-action=”reload-view”>刷新</button>
            <button class=”system-action” type=”button” data-action=”new-item” data-collection-key=”${escapeHtml(collectionKey)}”>新建</button>
          </div>
        </div>
        <div class=”table-toolbar workspace-enter” style=”--enter-delay: 40ms;”>
          <label class=”table-search”>
            ${icon('search')}
            <input type=”text” value=”${escapeHtml(keyword)}” placeholder=”搜索${collectionMeta.label}” data-list-filter=”${escapeHtml(collectionKey)}” />
          </label>
          <div class=”table-filters”>
            ${STATUS_FILTER_OPTIONS.map((option) => `<button class=”segment${statusFilter === option.key ? ' active' : ''}” type=”button” data-action=”set-status-filter” data-collection-key=”${escapeHtml(collectionKey)}” data-status-key=”${escapeHtml(option.key)}”>${escapeHtml(option.label)}</button>`).join('')}
          </div>
        </div>
        <div class=”workspace-compact-summary workspace-enter” style=”--enter-delay: 80ms;”>
          <strong>${escapeHtml(selected.item ? `当前编辑：${getPrimaryLabel(selected.item, collectionKey)}` : collectionMeta.label)}</strong>
          <span>共 ${items.length} 条记录，已发布 ${publishedCount} 条${filteredItems.length !== items.length ? `，当前显示 ${filteredItems.length} 条` : ''}</span>
          <em>${selected.item ? `ID: ${selected.itemId}` : '点击表格行进入编辑'}</em>
        </div>
        <div class=”table-shell workspace-enter” style=”--enter-delay: 120ms;”>
          ${filteredItems.length ? `<table class=”data-table data-table-compact”>
            <thead>
              <tr>
                <th style=”width: 40px;”>
                  <input type=”checkbox” class=”table-checkbox” data-action=”toggle-all-items” data-collection-key=”${escapeHtml(collectionKey)}” />
                </th>
                <th>名称</th>
                <th>详情</th>
                <th style=”width: 100px;”>状态</th>
                <th style=”width: 120px;”>操作</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map((item, index) => {
                const isActive = selected.itemId === item._id && !selected.isDraft;
                return `<tr class=”workspace-row-enter${isActive ? ' active' : ''}” style=”--enter-delay: ${160 + index * 20}ms;”>
                  <td>
                    <input type=”checkbox” class=”table-checkbox” data-item-id=”${escapeHtml(item._id || '')}” />
                  </td>
                  <td>
                    <div class=”table-cell-content”>
                      <span class=”status-dot status-${item.status === 'published' ? 'published' : 'draft'}”></span>
                      <strong class=”data-table-title”>${escapeHtml(getPrimaryLabel(item, collectionKey))}</strong>
                    </div>
                  </td>
                  <td>
                    <span class=”data-table-sub”>${escapeHtml(getSecondaryLabel(item, collectionKey) || '-')}</span>
                  </td>
                  <td>
                    <span class=”record-pill${item.status === 'published' ? ' success' : ''}”>${escapeHtml(item.status || 'draft')}</span>
                  </td>
                  <td>
                    <div class=”table-actions”>
                      <button class=”row-action” type=”button” data-action=”select-item” data-collection-key=”${escapeHtml(collectionKey)}” data-item-id=”${escapeHtml(item._id || '')}” title=”编辑”>${icon('edit')}</button>
                      <button class=”row-action” type=”button” data-action=”duplicate-item” data-collection-key=”${escapeHtml(collectionKey)}” data-item-id=”${escapeHtml(item._id || '')}” title=”复制”>${icon('copy')}</button>
                      <button class=”row-action danger” type=”button” data-action=”delete-item” data-collection-key=”${escapeHtml(collectionKey)}” data-item-id=”${escapeHtml(item._id || '')}” title=”删除”>${icon('trash')}</button>
                    </div>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>` : '<div class=”empty-state”>当前筛选条件下没有数据，试试调整搜索或状态过滤。</div>'}
        </div>
      </article>
      ${renderCollectionEditorOverlay(collectionKey, collectionMeta.label, selected)}
    </div>
  </section>`;
}

function renderCollectionEditorOverlay(collectionKey, collectionLabel, selected) {
  const ui = getViewUi();
  const isOpen = Boolean(ui.openEditors[collectionKey]);

  if (!isOpen || !selected.item) {
    return '';
  }

  const editorLabel = selected.isDraft ? `新建${collectionLabel}` : `编辑 ${getPrimaryLabel(selected.item, collectionKey)}`;

  return `<div class="editor-overlay editor-overlay-open">
    <article class="editor-modal directions-enter-modal">
      <div class="editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h2>${escapeHtml(editorLabel)}</h2>
          <p>修改完成后点击保存，或按 ESC 关闭。</p>
        </div>
        <button class="editor-close" type="button" data-action="close-editor" data-editor-key="${escapeHtml(collectionKey)}" aria-label="关闭编辑器">${icon('close')}</button>
      </div>
      <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
        <span class="meta-chip">ID ${escapeHtml(selected.itemId || '新建中')}</span>
        <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(selected.item)))}</span>
        <span class="meta-chip">集合 ${escapeHtml(collectionLabel)}</span>
      </div>
      <div class="editor-body directions-enter-modal-item" style="--enter-delay: 40ms;">
        ${renderFriendlyEditor(`collection:${collectionKey}`, selected.item)}
      </div>
      <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 60ms;">
        <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存</button>
        <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
        ${selected.item && !selected.isDraft ? `<button class="system-action danger-action" type="button" data-action="delete-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(selected.itemId)}">删除</button>` : ''}
        <button class="system-action" type="button" data-action="close-editor" data-editor-key="${escapeHtml(collectionKey)}">关闭</button>
      </div>
    </article>
  </div>`;
}

function renderModule(view, data) {
  if (view.key === 'directions') {
    refs.content.innerHTML = renderDirectionsWorkspace(view, data);
    syncModalState();
    return;
  }

  if (view.collections?.length && view.collections.every((collection) => TABLE_COLLECTIONS.has(collection.key))) {
    refs.content.innerHTML = renderTableFirstModule(view, data);
    syncModalState();
    return;
  }

  if (!view.collections?.length) {
    refs.content.innerHTML = renderPageWorkspace(view, data);
    syncModalState();
    return;
  }

  refs.content.innerHTML = `<section class="module-page workspace-motion-scope">
    <article class="panel module-hero-panel workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(view.title)}</h3>
          <p>${escapeHtml(view.subtitle)}</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新模块</button>
        </div>
      </div>
      ${renderModuleSummary(view, data)}
    </article>
    ${view.pageKey ? renderPageConfigLauncher(view, data.page) : ''}
    ${(view.collections || []).map((collection) => renderCollectionSection(collection.key, data.collections[collection.key] || [])).join('')}
    ${view.pageKey ? renderPageEditorOverlay(view.pageKey, view.pageLabel, data.page) : ''}
  </section>`;
  syncModalState();
}

async function loadOverviewData() {
  const pageOptions = state.meta?.pageOptions || [];
  const listOptions = state.meta?.listOptions || [];

  const pageEntries = await Promise.all(pageOptions.map(async (page) => {
    const result = await request(`/api/page/${page.key}`);
    return [page.key, normalizeCmsValue(result.data || null)];
  }));

  const collectionEntries = await Promise.all(listOptions.map(async (collection) => {
    const result = await request(`/api/collection/${collection.key}`);
    return [collection.key, Array.isArray(result.data) ? result.data.map((item) => normalizeCmsValue(item)) : []];
  }));

  const pages = Object.fromEntries(pageEntries);
  const collections = Object.fromEntries(collectionEntries);
  const pageLabels = Object.fromEntries(pageOptions.map((item) => [item.key, item.label]));

  const recentUpdates = [
    ...Object.entries(pages).map(([key, value]) => ({
      title: pageLabels[key] || key,
      module: '页面配置',
      updatedAt: getUpdatedAt(value)
    })),
    ...Object.entries(collections).flatMap(([key, items]) => items.map((item) => ({
      title: getPrimaryLabel(item, key),
      module: getCollectionMeta(key).label,
      updatedAt: getUpdatedAt(item)
    })))
  ]
    .filter((item) => item.updatedAt)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const healthMap = [
    { label: '首页配置', pageKey: 'home', collectionKey: null },
    { label: '师资团队', pageKey: 'teachers', collectionKey: 'teachers' },
    { label: '开设方向', pageKey: 'courses', collectionKey: 'directions' },
    { label: '媒体资源', pageKey: 'materials', collectionKey: 'mediaAssets' },
    { label: '模拟题题目', pageKey: 'questionBank', collectionKey: 'medicalQuestions' }
  ];

  const healthRows = healthMap.map((item) => {
    const pageReady = pages[item.pageKey] ? 45 : 0;
    const entries = item.collectionKey ? collections[item.collectionKey] || [] : [];
    const publishedRatio = entries.length ? Math.round((entries.filter((entry) => entry.status === 'published').length / entries.length) * 55) : item.collectionKey ? 10 : 55;
    const value = Math.min(100, pageReady + publishedRatio);
    return {
      label: item.label,
      value,
      tone: value >= 80 ? 'green' : 'amber'
    };
  });

  return { pages, collections, pageLabels, recentUpdates, healthRows };
}

async function loadModuleData(view) {
  const data = {
    page: null,
    collections: {}
  };

  if (view.pageKey) {
    const pageResult = await request(`/api/page/${view.pageKey}`);
    data.page = normalizeCmsValue(pageResult.data || {});
  }

  for (const collection of view.collections || []) {
    const result = await request(`/api/collection/${collection.key}`);
    data.collections[collection.key] = Array.isArray(result.data) ? result.data.map((item) => normalizeCmsValue(item)) : [];
  }

  return data;
}

async function renderActiveView(force = false) {
  const view = VIEW_CONFIG[state.activeView];
  if (!view) return;
  setTopbar(view);
  renderSidebar();
  renderLoading();
  state.loading = true;
  state.error = '';
  setStatus('正在同步数据...', 'loading');

  try {
    state.currentData = state.activeView === 'overview' ? await loadOverviewData() : await loadModuleData(view);
    if (state.activeView === 'overview') {
      renderOverview(state.currentData);
    } else {
      renderModule(view, state.currentData);
    }
    setStatus(state.health?.mode === 'cloud' ? '已连接云端 CMS' : '本地 CMS 已连接');
  } catch (error) {
    state.error = error.message || '加载失败';
    renderError(state.error);
    setStatus('数据同步失败', 'error');
  } finally {
    state.loading = false;
  }
}

async function savePage(pageKey) {
  const payload = cloneValue(getFormSource(`page:${pageKey}`));
  if (!payload) throw new Error('未找到页面编辑数据');
  await request(`/api/page/${pageKey}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

async function saveCollectionItem(collectionKey) {
  const payload = cloneValue(getFormSource(`collection:${collectionKey}`));
  if (!payload) throw new Error('未找到条目编辑数据');
  const ui = getViewUi();
  const itemId = payload._id || ui.selectedIds[collectionKey] || '';

  if (itemId) {
    await request(`/api/collection/${collectionKey}/${encodeURIComponent(itemId)}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    ui.selectedIds[collectionKey] = itemId;
    delete ui.drafts[collectionKey];
    return;
  }

  const created = await request(`/api/collection/${collectionKey}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  ui.selectedIds[collectionKey] = created.data?._id || '';
  delete ui.drafts[collectionKey];
}

async function deleteCollectionItem(collectionKey, itemId) {
  if (!itemId) throw new Error('缺少条目 ID');
  await request(`/api/collection/${collectionKey}/${encodeURIComponent(itemId)}`, {
    method: 'DELETE'
  });
  const ui = getViewUi();
  delete ui.selectedIds[collectionKey];
  delete ui.drafts[collectionKey];
}

async function createCollectionDraft(collectionKey) {
  const result = await request(`/api/template/${collectionKey}`);
  const ui = getViewUi();
  ui.drafts[collectionKey] = result.data || {};
  delete ui.selectedIds[collectionKey];
}

async function hydrateMeta() {
  const [meta, health] = await Promise.all([request('/api/meta'), request('/api/health')]);
  state.meta = meta;
  state.health = health;
}

async function switchView(viewKey) {
  if (!VIEW_CONFIG[viewKey]) return;
  state.activeView = viewKey;
  await renderActiveView(true);
}

function closeCurrentEditor() {
  const ui = getViewUi();
  const openCollectionKey = Object.entries(ui.openEditors || {}).find(([, open]) => open)?.[0];
  if (!openCollectionKey) return false;
  ui.openEditors[openCollectionKey] = false;
  if (!openCollectionKey.startsWith('page:')) {
    delete ui.drafts[openCollectionKey];
  }
  renderModule(VIEW_CONFIG[state.activeView], state.currentData);
  return true;
}

function bindGlobalActions() {
  refs.nav.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-nav]');
    if (!button || state.loading) return;
    await switchView(button.dataset.nav);
  });

  refs.content.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const { action, targetView, collectionKey, itemId, pageKey } = button.dataset;

    try {
      if (action === 'open-view' && targetView) {
        await switchView(targetView);
        return;
      }

      if (action === 'reload-view') {
        await renderActiveView(true);
        return;
      }

      if (action === 'open-question-bank-import') {
        const ui = getViewUi('questionBank');
        ui.openEditors.questionBankCsvImport = true;
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'close-question-bank-import') {
        const ui = getViewUi('questionBank');
        ui.openEditors.questionBankCsvImport = false;
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'pick-question-bank-import-file') {
        const input = refs.content.querySelector('[data-question-bank-csv-input]');
        if (!input) {
          throw new Error('未找到 CSV 上传入口，请刷新后重试。');
        }
        input.value = '';
        input.click();
        return;
      }

      if (action === 'clear-question-bank-import') {
        resetQuestionBankImportUi();
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus('已清空当前 CSV 预览。');
        return;
      }

      if (action === 'commit-question-bank-import') {
        await commitQuestionBankCsvImport();
        return;
      }

      if (action === 'save-page' && pageKey) {
        setStatus('正在保存页面...', 'loading');
        await savePage(pageKey);
        await renderActiveView(true);
        setStatus(getSaveSuccessMessage('页面'));
        return;
      }

      if (action === 'open-page-editor' && pageKey) {
        const ui = getViewUi();
        ui.openEditors[`page:${pageKey}`] = true;
        const activeView = VIEW_CONFIG[state.activeView];
        for (const collection of activeView?.collections || []) {
          ui.openEditors[collection.key] = false;
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'select-page-editor-section' && pageKey) {
        const ui = getViewUi();
        const sectionId = button.dataset.sectionId || '';
        if (sectionId) {
          ui.selectedIds[`page-section:${pageKey}`] = sectionId;
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'open-page-section-editor' && pageKey) {
        const ui = getViewUi();
        const sectionId = button.dataset.sectionId || '';
        const nextEditorKey = sectionId ? getPageSectionEditorKey(pageKey, sectionId) : '';
        if (sectionId && ui.openEditors[nextEditorKey]) {
          return;
        }
        Object.keys(ui.openEditors || {}).forEach((key) => {
          if (key.startsWith(`page:${pageKey}:section:`)) {
            ui.openEditors[key] = false;
          }
        });
        ui.openEditors[`page:${pageKey}`] = false;
        if (sectionId) {
          ui.selectedIds[`page-section:${pageKey}`] = sectionId;
          ui.openEditors[getPageSectionEditorKey(pageKey, sectionId)] = true;
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'open-page-section-field' && pageKey) {
        const ui = getViewUi();
        const sectionId = button.dataset.sectionId || '';
        const fieldId = button.dataset.fieldId || '';
        if (sectionId && fieldId) {
          const fieldStateKey = `page-field:${pageKey}:${sectionId}`;
          if (ui.selectedIds[fieldStateKey] === fieldId) {
            return;
          }
          ui.selectedIds[`page-field:${pageKey}:${sectionId}`] = fieldId;
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'open-linked-workspace' && targetView) {
        await switchView(targetView);
        const targetUi = getViewUi(targetView);
        const targetCollectionKey = button.dataset.targetCollectionKey || '';
        const targetPageKey = button.dataset.targetPageKey || '';
        const targetSectionId = button.dataset.targetSectionId || '';
        const targetItemId = button.dataset.targetItemId || '';

        if (targetCollectionKey && targetItemId) {
          targetUi.selectedIds[targetCollectionKey] = targetItemId;
          targetUi.openEditors[targetCollectionKey] = true;
        }

        if (targetPageKey && targetSectionId) {
          targetUi.selectedIds[`page-section:${targetPageKey}`] = targetSectionId;
          targetUi.openEditors[getPageSectionEditorKey(targetPageKey, targetSectionId)] = true;
        }

        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus(button.dataset.linkStatus || '已跳转到对应工作区。');
        return;
      }

      if (action === 'select-item' && collectionKey) {
        const ui = getViewUi();
        if (ui.selectedIds[collectionKey] === (itemId || '') && ui.openEditors[collectionKey] && !ui.drafts[collectionKey]) {
          return;
        }
        ui.selectedIds[collectionKey] = itemId || '';
        ui.openEditors[collectionKey] = true;
        const activeView = VIEW_CONFIG[state.activeView];
        if (activeView?.pageKey) {
          ui.openEditors[`page:${activeView.pageKey}`] = false;
        }
        delete ui.drafts[collectionKey];
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'new-item' && collectionKey) {
        setStatus('正在准备新条目...', 'loading');
        await createCollectionDraft(collectionKey);
        const ui = getViewUi();
        ui.openEditors[collectionKey] = true;
        const activeView = VIEW_CONFIG[state.activeView];
        if (activeView?.pageKey) {
          ui.openEditors[`page:${activeView.pageKey}`] = false;
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus('已生成新条目模板');
        return;
      }

      if (action === 'close-editor') {
        const ui = getViewUi();
        const editorKey = button.dataset.editorKey || collectionKey;
        if (editorKey) {
          ui.openEditors[editorKey] = false;
          delete ui.drafts[editorKey];
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'close-page-editor' && pageKey) {
        const ui = getViewUi();
        ui.openEditors[`page:${pageKey}`] = false;
        Object.keys(ui.selectedIds || {}).forEach((key) => {
          if (key.startsWith(`page-field:${pageKey}:`)) {
            delete ui.selectedIds[key];
          }
        });
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'close-page-section-editor' && pageKey) {
        const ui = getViewUi();
        const sectionId = button.dataset.sectionId || '';
        if (sectionId) {
          ui.openEditors[getPageSectionEditorKey(pageKey, sectionId)] = false;
          delete ui.selectedIds[`page-field:${pageKey}:${sectionId}`];
        } else {
          Object.keys(ui.openEditors || {}).forEach((key) => {
            if (key.startsWith(`page:${pageKey}:section:`)) {
              ui.openEditors[key] = false;
            }
          });
          Object.keys(ui.selectedIds || {}).forEach((key) => {
            if (key.startsWith(`page-field:${pageKey}:`)) {
              delete ui.selectedIds[key];
            }
          });
        }
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'set-status-filter' && collectionKey) {
        const ui = getViewUi();
        ui.statusFilters[collectionKey] = button.dataset.statusKey || 'all';
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'append-array-item') {
        const scope = button.dataset.formScope;
        const path = parsePath(button.dataset.formPath);
        const currentItems = getValueAtPath(getFormSource(scope) || {}, path);
        const nextItem = guessArrayItemTemplate(path, currentItems);
        const nextValue = appendArrayItem(getFormSource(scope) || {}, path, nextItem);
        setFormSource(scope, nextValue);
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'remove-array-item') {
        const scope = button.dataset.formScope;
        const path = parsePath(button.dataset.formPath);
        const index = Number(button.dataset.index || 0);
        const nextValue = removeArrayItem(getFormSource(scope) || {}, path, index);
        setFormSource(scope, nextValue);
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'save-item' && collectionKey) {
        setStatus('正在保存条目...', 'loading');
        await saveCollectionItem(collectionKey);
        await renderActiveView(true);
        setStatus(getSaveSuccessMessage('条目'));
        return;
      }

      if (action === 'delete-item' && collectionKey && itemId) {
        const confirmed = window.confirm('确认删除这个条目吗？此操作无法撤销。');
        if (!confirmed) return;
        setStatus('正在删除条目...', 'loading');
        await deleteCollectionItem(collectionKey, itemId);
        await renderActiveView(true);
        setStatus(state.health?.mode === 'cloud' ? '条目已从云端删除' : '条目已删除');
      }
    } catch (error) {
      setStatus(error.message || '操作失败', 'error');
      window.alert(error.message || '操作失败');
    }
  });

  function handleFormMutation(event) {
    const csvInput = event.target.closest('[data-question-bank-csv-input]');
    if (csvInput) {
      const [file] = Array.from(csvInput.files || []);
      previewQuestionBankCsvFile(file).catch((error) => {
        setStatus(error.message || 'CSV 预览失败', 'error');
        window.alert(error.message || 'CSV 预览失败');
      });
      return;
    }

    const jsonEditor = event.target.closest('[data-json-scope]');
    if (jsonEditor) {
      try {
        updateJsonSubset(
          jsonEditor.dataset.jsonScope,
          (jsonEditor.dataset.jsonKeys || '').split(',').filter(Boolean),
          jsonEditor.value
        );
      } catch (error) {
        setStatus(error.message || 'JSON 更新失败', 'error');
      }
      return;
    }

    const listFilter = event.target.closest('[data-list-filter]');
    if (listFilter) {
      const ui = getViewUi();
      const collectionKey = listFilter.dataset.listFilter;
      ui.filters[collectionKey] = listFilter.value || '';
      renderModule(VIEW_CONFIG[state.activeView], state.currentData);
      return;
    }

    const input = event.target.closest('[data-form-path]');
    if (!input) return;

    const scope = input.dataset.formScope;
    const path = parsePath(input.dataset.formPath);
    const kind = input.dataset.formKind || 'text';
    let nextValue = input.value;

    if (kind === 'number') {
      nextValue = nextValue === '' ? '' : Number(nextValue);
    } else if (kind === 'boolean') {
      nextValue = nextValue === 'true';
    } else if (kind === 'line-list') {
      nextValue = nextValue
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    updateFormSource(scope, path, nextValue);
  }

  refs.content.addEventListener('input', handleFormMutation);
  refs.content.addEventListener('change', handleFormMutation);

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!hasOpenEditor()) return;
    const closed = closeCurrentEditor();
    if (closed) {
      event.preventDefault();
    }
  });

  refs.themeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  refs.sidebarCollapse.addEventListener('click', () => {
    applySidebarCollapsed(!state.sidebarCollapsed);
  });

  refs.refreshView.addEventListener('click', async () => {
    await renderActiveView(true);
  });

  refs.topbarSearch.addEventListener('click', () => {
    window.alert('当前版本先聚焦内容编辑，搜索入口下一轮再补。');
  });

  refs.topbarAlerts.addEventListener('click', () => {
    window.alert('当前版本没有独立通知中心，但最近更新已接入总览页。');
  });
}

async function bootstrap() {
  refs.topbarSearch.innerHTML = icon('search');
  refs.topbarAlerts.innerHTML = `${icon('bell')}<span class="topbar-dot" aria-hidden="true"></span>`;
  refs.refreshView.innerHTML = icon('refresh');
  applyTheme(preferredTheme());
  applySidebarCollapsed(preferredSidebarCollapsed());
  renderSidebar();
  bindGlobalActions();

  try {
    await hydrateMeta();
    await renderActiveView(true);
    finishBootAnimation();
  } catch (error) {
    setTopbar(VIEW_CONFIG.overview);
    setStatus('CMS 服务不可用', 'error');
    renderError(error.message || '初始化失败');
    finishBootAnimation();
  }
}

bootstrap();
