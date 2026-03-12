const STATUS_OPTIONS = [
  { value: 'published', label: '已发布' },
  { value: 'active', label: '启用中' },
  { value: 'draft', label: '草稿' },
  { value: 'offline', label: '已下线' },
  { value: 'disabled', label: '停用' }
];

const FIELD_LABELS = {
  _id: '条目 ID',
  siteName: '站点名称',
  brandName: '品牌名称',
  intro: '简介',
  contactPhone: '联系电话',
  contactWechat: '微信号',
  contactQrcode: '二维码',
  address: '地址',
  serviceHours: '服务时间',
  title: '标题',
  subtitle: '副标题',
  desc: '描述',
  summary: '摘要',
  category: '分类',
  status: '状态',
  sort: '排序',
  name: '名称',
  slug: '标识',
  tag: '标签',
  role: '角色',
  year: '年份',
  type: '类型',
  stage: '阶段',
  imageSeed: '图片资源',
  backgroundImageSeed: '背景资源',
  coverSeed: '封面资源',
  avatarSeed: '头像资源',
  accent: '强调色'
};

const MODULES = [
  { key: 'dashboard', label: '控制台', icon: 'dashboard', type: 'dashboard', desc: '总览站点与内容数据。' },
  { key: 'site', label: '站点设置', icon: 'settings', type: 'page', pageKey: 'site', desc: '品牌、全局配置与公共信息。' },
  { key: 'home', label: '首页管理', icon: 'home', type: 'page', pageKey: 'home', desc: '首页主视觉、概览和入口内容。' },
  { key: 'directions', label: '开设方向', icon: 'layers', type: 'workspace', pageKey: 'courses', collections: ['directions'], desc: '方向条目与方向页配置。' },
  { key: 'teachers', label: '师资管理', icon: 'users', type: 'workspace', pageKey: 'teachers', collections: ['teachers'], desc: '师资条目与师资页配置。' },
  { key: 'success', label: '成果管理', icon: 'award', type: 'workspace', pageKey: 'success', collections: ['successCases'], desc: '成果案例与成果页配置。' },
  { key: 'about', label: '关于我们', icon: 'info', type: 'page', pageKey: 'about', desc: '机构介绍、理念和环境内容。' },
  { key: 'contacts', label: '联系方式', icon: 'phone', type: 'page', pageKey: 'site', sectionFilter: ['contact'], desc: '电话、微信、二维码与地址。' },
  { key: 'media', label: '媒体资源', icon: 'book', type: 'workspace', pageKey: 'materials', collections: ['materialSeries', 'materialItems'], desc: '资料页、套系和单品内容。' }
];

const NAV_GROUPS = [
  { label: '概览', items: ['dashboard'] },
  { label: '站点内容', items: ['site', 'home', 'about', 'contacts'] },
  { label: '内容管理', items: ['directions', 'teachers', 'success', 'media'] }
];

const PAGE_SECTIONS = {
  site: [
    { key: 'base', label: '基础信息', path: '$root', fields: ['siteName', 'brandName', 'intro'], note: '站点、品牌和机构简介。' },
    { key: 'contact', label: '联系信息', path: '$root', fields: ['contactPhone', 'contactWechat', 'contactQrcode', 'address', 'serviceHours'], note: '电话、微信、二维码、地址和服务时间。' }
  ],
  home: [
    { key: 'hero', label: 'Banner 主视觉', path: 'hero', note: '标题、导语、按钮和背景资源。' },
    { key: 'overviewStats', label: '概览统计', path: 'overviewStats', note: '首页统计数据。' },
    { key: 'quickLinks', label: '快捷入口', path: 'quickLinks', note: '首页快捷入口列表。' },
    { key: 'advantages', label: '学习优势', path: 'advantages', note: '优势模块内容。' },
    { key: 'directionsIntro', label: '方向导语', path: 'directionsIntro', note: '首页方向说明文案。' },
    { key: 'featuredDirectionIds', label: '重点方向引用', path: 'featuredDirectionIds', note: '首页重点展示方向。' },
    { key: 'moreDirectionCard', label: '更多方向卡', path: 'moreDirectionCard', note: '更多方向说明卡片。' },
    { key: 'environmentSection', label: '环境模块', path: 'environmentSection', note: '环境图文与图片卡片。' },
    { key: 'cta', label: '底部 CTA', path: 'cta', note: '咨询引导和按钮。' }
  ],
  courses: [
    { key: 'header', label: '页面头部', path: '$root', fields: ['title', 'subtitle'], note: '方向页标题和副标题。' },
    { key: 'categories', label: '分类标签', path: 'categories', note: '方向页顶部分类。' },
    { key: 'suggestions', label: '规划建议', path: 'suggestions', note: '建议和提示内容。' },
    { key: 'featuredDirectionIds', label: '重点方向', path: 'featuredDirectionIds', note: '重点展示方向引用。' },
    { key: 'moreSection', label: '更多方向说明', path: 'moreSection', note: '底部扩展说明。' }
  ],
  teachers: [
    { key: 'hero', label: '页面头部', path: 'hero', note: '标题、导语和展示图。' },
    { key: 'introCard', label: '介绍卡', path: 'introCard', note: '师资定位和介绍说明。' },
    { key: 'features', label: '团队优势', path: 'features', note: '团队优势列表。' },
    { key: 'cta', label: '底部 CTA', path: 'cta', note: '联系与咨询引导。' }
  ],
  success: [
    { key: 'hero', label: '页面头部', path: 'hero', note: '成果页主标题和导语。' },
    { key: 'stats', label: '统计卡', path: 'stats', note: '成果页统计信息。' },
    { key: 'cta', label: '底部 CTA', path: 'cta', note: '成果页底部引导。' }
  ],
  about: [
    { key: 'hero', label: '页面头部', path: 'hero', note: '机构页主标题、导语和头图。' },
    { key: 'introCard', label: '机构介绍', path: 'introCard', note: '机构介绍卡片。' },
    { key: 'values', label: '理念列表', path: 'values', note: '机构理念与特点。' },
    { key: 'environmentImages', label: '环境展示', path: 'environmentImages', note: '环境图片和资源。' },
    { key: 'cta', label: '底部 CTA', path: 'cta', note: '联系和了解更多。' }
  ],
  materials: [
    { key: 'hero', label: '页面头部', path: 'hero', note: '教材页标题与导语。' },
    { key: 'tabs', label: '分类标签', path: 'tabs', note: '资料页顶部分类。' },
    { key: 'overviewStats', label: '总览统计', path: 'overviewStats', note: '资料数量和分类信息。' },
    { key: 'featuredSeriesIds', label: '主推套系', path: 'featuredSeriesIds', note: '主推教材套系引用。' },
    { key: 'cta', label: '底部 CTA', path: 'cta', note: '咨询和订购引导。' }
  ]
};

const COLLECTION_META = {
  directions: { label: '方向列表', primary: 'name', columns: ['category', 'summary', 'sort', 'status'] },
  teachers: { label: '师资列表', primary: 'name', columns: ['role', 'tag', 'sort', 'status'] },
  successCases: { label: '成果案例', primary: 'title', columns: ['category', 'year', 'sort', 'status'] },
  materialSeries: { label: '教材套系', primary: 'name', columns: ['category', 'tag', 'sort', 'status'] },
  materialItems: { label: '教材单品', primary: 'title', columns: ['type', 'stage', 'sort', 'status'] }
};

const ICONS = {
  dashboard: '<path d="M3 3h8v8H3z"></path><path d="M13 3h8v5h-8z"></path><path d="M13 10h8v11h-8z"></path><path d="M3 13h8v8H3z"></path>',
  settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7Z"></path>',
  home: '<path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"></path><path d="m3 12 9 5 9-5"></path><path d="m3 16 9 5 9-5"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="4"></circle><path d="M20 8v6"></path><path d="M23 11h-6"></path>',
  award: '<circle cx="12" cy="8" r="5"></circle><path d="m8.2 13.9-1.4 7.1L12 18l5.2 3-1.4-7.1"></path>',
  info: '<circle cx="12" cy="12" r="9"></circle><path d="M12 10v6"></path><path d="M12 7h.01"></path>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.3 2.2a2 2 0 0 1-.6 1.7L7.5 9a16 16 0 0 0 7.5 7.5l1.3-1.3a2 2 0 0 1 1.7-.6l2.2.3a2 2 0 0 1 1.7 2Z"></path>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 0 4 23"></path><path d="M4 5.5V21"></path><path d="M8 7h8"></path><path d="M8 11h8"></path>',
  panel: '<path d="M3 5h18v14H3z"></path><path d="M9 5v14"></path><path d="m14 12 3-3"></path><path d="m14 12 3 3"></path>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.9 4.9 1.4 1.4"></path><path d="m17.7 17.7 1.4 1.4"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.9 19.1 1.4-1.4"></path><path d="m17.7 6.3 1.4-1.4"></path>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.4 6.4"></path><path d="M3 12A9 9 0 0 1 18.4 5.6"></path><path d="M3 16v-4h4"></path><path d="M21 8v4h-4"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  search: '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path>',
  filter: '<path d="M4 6h16"></path><path d="M7 12h10"></path><path d="M10 18h4"></path>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"></path><circle cx="12" cy="12" r="3"></circle>',
  trash: '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path>',
  upload: '<path d="M12 17V5"></path><path d="m7 10 5-5 5 5"></path><path d="M5 20h14"></path>',
  close: '<path d="m6 6 12 12"></path><path d="m18 6-12 12"></path>',
  up: '<path d="m12 5-5 5"></path><path d="m12 5 5 5"></path><path d="M12 19V5"></path>',
  down: '<path d="m12 19-5-5"></path><path d="m12 19 5-5"></path><path d="M12 5v14"></path>'
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const state = {
  theme: 'light',
  sidebarCollapsed: false,
  backendMode: 'local',
  backendConfig: {},
  activeModule: 'dashboard',
  activeTab: null,
  pageCache: {},
  collectionCache: {},
  dashboard: null,
  drawer: null,
  listSearch: '',
  listStatus: 'all',
  listSort: 'sort-asc',
  listPageSize: 10,
  listPage: 1,
  pageSearch: '',
  pageStatus: 'all',
  selectedIds: [],
  sessionWrites: 0
};

const refs = {
  app: document.getElementById('app'),
  sidebarNav: document.getElementById('sidebar-nav'),
  sidebarToggle: document.getElementById('sidebar-toggle'),
  envBadge: document.getElementById('env-badge'),
  envNote: document.getElementById('env-note'),
  themeToggle: document.getElementById('theme-toggle'),
  resetSeed: document.getElementById('reset-seed'),
  topbarKicker: document.getElementById('topbar-kicker'),
  topbarBreadcrumb: document.getElementById('topbar-breadcrumb'),
  viewTitle: document.getElementById('view-title'),
  viewSubtitle: document.getElementById('view-subtitle'),
  statusPill: document.getElementById('status-pill'),
  runtimeMode: document.getElementById('runtime-mode'),
  sessionCounter: document.getElementById('session-counter'),
  refreshView: document.getElementById('refresh-view'),
  content: document.getElementById('content'),
  drawer: document.getElementById('drawer'),
  drawerBackdrop: document.getElementById('drawer-backdrop'),
  drawerKicker: document.getElementById('drawer-kicker'),
  drawerTitle: document.getElementById('drawer-title'),
  drawerSubtitle: document.getElementById('drawer-subtitle'),
  drawerBody: document.getElementById('drawer-body'),
  drawerFootNote: document.getElementById('drawer-foot-note'),
  drawerClose: document.getElementById('drawer-close'),
  drawerDelete: document.getElementById('drawer-delete'),
  drawerCancel: document.getElementById('drawer-cancel'),
  drawerSave: document.getElementById('drawer-save')
};

function clone(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
function escapeHtml(value) { return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
function byPath(source, path) { return !path || path === '$root' ? source : path.split('.').reduce((acc, key) => acc == null ? undefined : acc[key], source); }
function setPath(target, path, value) { if (path === '$root') return value; const keys = path.split('.'); let cursor = target; keys.forEach((key, index) => { if (index === keys.length - 1) { cursor[key] = value; } else { cursor[key] = cursor[key] && typeof cursor[key] === 'object' ? cursor[key] : {}; cursor = cursor[key]; } }); return target; }
async function request(path, options = {}) { const response = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options }); const data = await response.json(); if (!response.ok || data.ok === false) throw new Error(data.message || '请求失败'); return data; }
function icon(name, className = '') { const body = ICONS[name] || ICONS.info; return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`; }
function preferredTheme() { const saved = localStorage.getItem('admin-theme'); if (saved === 'light' || saved === 'dark') return saved; return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
function isLiveStatus(status) { return ['published', 'active', 'online'].includes(String(status || '').toLowerCase()); }
function statusTone(status) { const value = String(status || '').toLowerCase(); if (['published', 'active', 'online'].includes(value)) return 'success'; if (value === 'draft') return 'warning'; if (['offline', 'disabled'].includes(value)) return 'muted'; return 'neutral'; }
function countValue(value) { if (Array.isArray(value)) return value.length; if (value && typeof value === 'object') return Object.keys(value).length; if (typeof value === 'string') return value.trim() ? 1 : 0; if (typeof value === 'number') return Number.isFinite(value) ? 1 : 0; if (typeof value === 'boolean') return value ? 1 : 0; return 0; }
function percent(value) { return `${Math.round(value * 100)}%`; }
function getModule(key) { return MODULES.find((item) => item.key === key) || MODULES[0]; }
function humanizeKey(key) { const last = String(key || '').split('.').pop(); return FIELD_LABELS[key] || FIELD_LABELS[last] || last.replace(/([A-Z])/g, ' $1').trim() || '字段'; }
function getCollectionMeta(key) { return COLLECTION_META[key] || { label: key, primary: 'title', columns: ['status', 'sort'] }; }
function collectionLabel(key) { return getCollectionMeta(key).label; }
function pageSections(pageKey) { return PAGE_SECTIONS[pageKey] || []; }
function tabsFor(module) { if (module.type === 'dashboard') return []; if (module.type === 'page') return [{ key: 'page', type: 'page', label: module.label, pageKey: module.pageKey }]; return [...module.collections.map((key) => ({ key: `collection:${key}`, type: 'collection', collectionKey: key, label: collectionLabel(key) })), { key: 'page', type: 'page', pageKey: module.pageKey, label: '页面配置' }]; }
function currentTab() { const tabs = tabsFor(getModule(state.activeModule)); return tabs.find((item) => item.key === state.activeTab) || tabs[0] || null; }
function formatShort(value, size = 42) { const text = String(value || ''); return text.length <= size ? text : `${text.slice(0, size)}...`; }
function isImageValue(value) { return typeof value === 'string' && /^(https?:\/\/|data:image\/)/i.test(value); }
function normalizeFieldValue(value) { return Array.isArray(value) || (value && typeof value === 'object') ? JSON.stringify(value, null, 2) : value ?? ''; }
function statusBadge(status) { const label = STATUS_OPTIONS.find((item) => item.value === status)?.label || status || '未设置'; return `<span class="badge tone-${statusTone(status)}">${escapeHtml(label)}</span>`; }
function completionBadge(ratio) { if (ratio >= 1) return '<span class="badge tone-success">完整</span>'; if (ratio <= 0) return '<span class="badge tone-muted">待补充</span>'; return '<span class="badge tone-warning">进行中</span>'; }
function collectAssets(source, base = '', bucket = []) { if (!source || typeof source !== 'object') return bucket; if (Array.isArray(source)) { source.forEach((item, index) => collectAssets(item, `${base}[${index}]`, bucket)); return bucket; } Object.entries(source).forEach(([key, value]) => { const path = base ? `${base}.${key}` : key; if (typeof value === 'string' && value && /(image|cover|avatar|qrcode|seed)/i.test(key)) { bucket.push({ key, path, value }); return; } if (value && typeof value === 'object') collectAssets(value, path, bucket); }); return bucket; }
function applyTheme(theme) { state.theme = theme; document.documentElement.setAttribute('data-theme', theme); refs.themeToggle.innerHTML = `${icon(theme === 'dark' ? 'sun' : 'moon')}<span>${theme === 'dark' ? '切换亮色' : '切换暗色'}</span>`; localStorage.setItem('admin-theme', theme); }
function toggleTheme() { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); }
function applySidebarCollapsed(collapsed) { state.sidebarCollapsed = collapsed; refs.app.classList.toggle('sidebar-collapsed', collapsed); refs.sidebarToggle.innerHTML = icon('panel'); refs.sidebarToggle.setAttribute('aria-label', collapsed ? '展开侧边栏' : '折叠侧边栏'); localStorage.setItem('admin-sidebar-collapsed', String(collapsed)); }
function toggleSidebar() { applySidebarCollapsed(!state.sidebarCollapsed); }
function setStatus(text, tone = 'neutral') { refs.statusPill.textContent = text; refs.statusPill.className = `status-pill ${tone}`; }
function updateRuntime() { refs.runtimeMode.textContent = state.backendMode === 'cloud' ? '云端模式' : '本地模式'; refs.sessionCounter.textContent = `会话改动 ${state.sessionWrites}`; refs.envBadge.textContent = state.backendMode === 'cloud' ? '云端直连' : '本地数据'; refs.envBadge.className = `env-badge ${state.backendMode === 'cloud' ? 'cloud' : 'local'}`; refs.envNote.textContent = state.backendMode === 'cloud' ? `当前直接写入云数据库${state.backendConfig.envId ? ` (${state.backendConfig.envId})` : ''}。` : `当前读写本地快照：${state.backendConfig.dataFile || 'database/local-admin-data.json'}`; }
function resetFilters() { state.listSearch = ''; state.listStatus = 'all'; state.listSort = 'sort-asc'; state.listPageSize = 10; state.listPage = 1; state.pageSearch = ''; state.pageStatus = 'all'; state.selectedIds = []; }
function addWrite() { state.sessionWrites += 1; updateRuntime(); }
async function fetchHealth() { const result = await request('/api/health'); state.backendMode = result.mode || 'local'; state.backendConfig = result.config || {}; updateRuntime(); }
async function fetchPage(pageKey, force = false) { if (!force && state.pageCache[pageKey]) return clone(state.pageCache[pageKey]); const result = await request(`/api/page/${pageKey}`); state.pageCache[pageKey] = result.data || {}; return clone(state.pageCache[pageKey]); }
async function fetchCollection(collectionKey, force = false) { if (!force && state.collectionCache[collectionKey]) return clone(state.collectionCache[collectionKey]); const result = await request(`/api/collection/${collectionKey}`); state.collectionCache[collectionKey] = Array.isArray(result.data) ? result.data : []; return clone(state.collectionCache[collectionKey]); }

function autoFields(source, includeKeys = null, prefix = '', depth = 0) {
  if (includeKeys) return includeKeys.map((key) => ({ path: key, label: humanizeKey(key) }));
  if (Array.isArray(source) || typeof source !== 'object' || !source) return [{ path: '$root', label: '内容', type: Array.isArray(source) || typeof source === 'object' ? 'json' : 'text', wide: true }];
  return Object.entries(source).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const primitiveObject = value && typeof value === 'object' && !Array.isArray(value) && depth < 1 && Object.values(value).every((item) => ['string', 'number', 'boolean'].includes(typeof item) || item == null);
    if (primitiveObject) return Object.keys(value).map((child) => ({ path: `${path}.${child}`, label: humanizeKey(`${key}.${child}`) }));
    const type = Array.isArray(value) || (value && typeof value === 'object') ? 'json' : typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'boolean' : String(value || '').length > 80 ? 'textarea' : 'text';
    return [{ path, label: humanizeKey(path), type, wide: type === 'textarea' || type === 'json' }];
  });
}

function sectionRows(module, pageData) {
  const sections = module.sectionFilter?.length ? pageSections(module.pageKey).filter((item) => module.sectionFilter.includes(item.key)) : pageSections(module.pageKey);
  return sections.map((section) => {
    const source = section.path === '$root' ? pageData : byPath(pageData, section.path);
    const fields = autoFields(source, section.fields || null);
    const filled = fields.reduce((sum, field) => sum + (countValue(field.path === '$root' ? source : byPath(source, field.path)) > 0 ? 1 : 0), 0);
    const ratio = fields.length ? filled / fields.length : 0;
    const summary = Array.isArray(source) ? `${source.length} 项` : source && typeof source === 'object' ? source.title || source.name || source.label || `${Object.keys(source).length} 个字段` : source || '未设置';
    return { section, source, fields, filled, total: fields.length || 1, ratio, summary, assets: collectAssets(source).length };
  });
}

function renderMetrics(items) { return items.map((item) => `<article class="metric-card"><div class="metric-label">${escapeHtml(item.label)}</div><div class="metric-value">${escapeHtml(item.value)}</div><div class="metric-meta">${escapeHtml(item.meta)}</div></article>`).join(''); }
function renderTabs(module) { const tabs = tabsFor(module); if (tabs.length <= 1) return ''; return `<div class="view-tabs">${tabs.map((tab) => `<button class="tab-button${tab.key === state.activeTab ? ' active' : ''}" type="button" data-action="switch-tab" data-tab="${escapeHtml(tab.key)}">${escapeHtml(tab.label)}</button>`).join('')}</div>`; }
function lineChart(items) { const width = 420, height = 180, pad = 24, max = Math.max(...items.map((item) => item.value), 1); const points = items.map((item, index) => ({ x: pad + index * (width - pad * 2) / Math.max(items.length - 1, 1), y: height - pad - item.value / max * (height - pad * 2) })); return `<div class="line-chart"><svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="M${pad} ${height - pad}H${width - pad}" class="chart-axis-line"></path><path d="M${pad} ${pad}V${height - pad}" class="chart-axis-line"></path><polyline points="${points.map((point) => `${point.x},${point.y}`).join(' ')}" class="chart-line"></polyline>${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" class="chart-point"></circle>`).join('')}</svg><div class="line-labels">${items.map((item) => `<div class="line-label"><strong>${escapeHtml(`${item.value}%`)}</strong><span>${escapeHtml(item.label)}</span></div>`).join('')}</div></div>`; }
function barChart(items) { const max = Math.max(...items.map((item) => item.value), 1); return `<div class="bar-chart">${items.map((item) => `<div class="bar-item"><div class="bar-track"><div class="bar-fill" style="height:${item.value / max * 100}%"></div></div><div class="bar-copy"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div></div>`).join('')}</div>`; }
function donutChart(items) { const colors = ['#2563eb', '#14b8a6', '#f59e0b', '#64748b']; const total = items.reduce((sum, item) => sum + item.value, 0) || 1; let start = 0; const gradient = items.map((item, index) => { const s = start; start += item.value / total * 360; return `${colors[index % colors.length]} ${s}deg ${start}deg`; }).join(', '); return `<div class="donut-layout"><div class="donut-ring" style="background:conic-gradient(${gradient})"><div class="donut-hole"><strong>${total}</strong><span>条内容</span></div></div><div class="donut-legend">${items.map((item, index) => `<div class="legend-item"><span class="legend-dot" style="background:${colors[index % colors.length]}"></span><div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div></div>`).join('')}</div></div>`; }

async function buildDashboard(force = false) {
  const pageKeys = [...new Set(MODULES.filter((item) => item.pageKey).map((item) => item.pageKey))];
  const collectionKeys = [...new Set(MODULES.flatMap((item) => item.collections || []))];
  await Promise.all([...pageKeys.map((key) => fetchPage(key, force)), ...collectionKeys.map((key) => fetchCollection(key, force))]);
  const pageStats = pageKeys.map((key) => { const data = state.pageCache[key] || {}; const rows = sectionRows({ pageKey: key }, data); const done = rows.filter((row) => row.ratio >= 1).length; return { key, label: MODULES.find((item) => item.pageKey === key)?.label || key, total: rows.length, done, ratio: rows.length ? done / rows.length : 0 }; });
  const collections = collectionKeys.map((key) => ({ key, label: collectionLabel(key), items: state.collectionCache[key] || [] }));
  const items = collections.flatMap((item) => item.items);
  const metrics = [
    { label: '开设方向', value: (state.collectionCache.directions || []).length, meta: '方向库总量' },
    { label: '师资数量', value: (state.collectionCache.teachers || []).length, meta: '师资条目总量' },
    { label: '成果数量', value: (state.collectionCache.successCases || []).length, meta: '成果案例总量' },
    { label: '已发布内容', value: items.filter((item) => isLiveStatus(item.status)).length, meta: '发布或启用中的内容' },
    { label: '待完善模块', value: pageStats.reduce((sum, item) => sum + Math.max(item.total - item.done, 0), 0), meta: '页面配置中仍待补充的模块' },
    { label: '会话更新', value: state.sessionWrites, meta: '当前会话的保存和发布动作' }
  ];
  const health = MODULES.filter((item) => item.key !== 'dashboard').map((module) => { const page = pageStats.find((entry) => entry.key === module.pageKey); const totalItems = (module.collections || []).reduce((sum, key) => sum + (state.collectionCache[key] || []).length, 0); const live = (module.collections || []).reduce((sum, key) => sum + (state.collectionCache[key] || []).filter((item) => isLiveStatus(item.status)).length, 0); return { module, page, totalItems, live, pending: page ? Math.max(page.total - page.done, 0) : 0 }; });
  return { metrics, line: pageStats.map((item) => ({ label: item.label, value: Math.round(item.ratio * 100) })), bar: collections.map((item) => ({ label: item.label, value: item.items.length })), donut: [{ label: '已发布', value: items.filter((item) => item.status === 'published').length }, { label: '启用中', value: items.filter((item) => item.status === 'active').length }, { label: '草稿', value: items.filter((item) => item.status === 'draft').length }, { label: '下线/停用', value: items.filter((item) => ['offline', 'disabled'].includes(String(item.status || '').toLowerCase())).length }], health };
}

function renderDashboard() { return `<section class="view-grid"><div class="metrics-grid">${renderMetrics(state.dashboard.metrics)}</div><div class="analytics-grid"><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Completion Trend</div><h3>页面完整度折线图</h3></div><span class="badge tone-info">Dashboard</span></div>${lineChart(state.dashboard.line)}</article><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Content Distribution</div><h3>内容分布柱状图</h3></div><span class="badge tone-info">Collections</span></div>${barChart(state.dashboard.bar)}</article><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Publish Status</div><h3>发布状态占比</h3></div><span class="badge tone-info">Status</span></div>${donutChart(state.dashboard.donut)}</article></div><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Module Health</div><h3>模块健康状态</h3></div><span class="badge tone-info">CMS</span></div><div class="table-shell"><table class="table"><thead><tr><th>模块</th><th>页面完整度</th><th>内容总量</th><th>已发布</th><th>待完善</th><th>操作</th></tr></thead><tbody>${state.dashboard.health.map((item) => `<tr><td><div class="cell-primary"><strong>${escapeHtml(item.module.label)}</strong><span>${escapeHtml(item.module.desc)}</span></div></td><td>${item.page ? `${percent(item.page.ratio)} · ${item.page.done}/${item.page.total}` : '无页面配置'}</td><td>${escapeHtml(item.totalItems)}</td><td>${escapeHtml(item.live)}</td><td>${escapeHtml(item.pending)}</td><td><button class="table-button primary" type="button" data-action="open-module" data-module="${escapeHtml(item.module.key)}">进入模块</button></td></tr>`).join('')}</tbody></table></div></article></section>`; }

function renderPageView(module) {
  const data = state.pageCache[module.pageKey] || {};
  const allRows = sectionRows(module, data);
  const rows = allRows.filter((row) => { const keyword = state.pageSearch.trim().toLowerCase(); const keywordOk = !keyword || [row.section.label, row.section.note, row.summary].filter(Boolean).some((value) => String(value).toLowerCase().includes(keyword)); const statusOk = state.pageStatus === 'all' || state.pageStatus === 'ready' && row.ratio >= 1 || state.pageStatus === 'pending' && row.ratio < 1; return keywordOk && statusOk; });
  const metrics = [{ label: '模块数量', value: allRows.length, meta: '当前页面可维护模块' }, { label: '已完成模块', value: allRows.filter((row) => row.ratio >= 1).length, meta: '字段已完整填写' }, { label: '待完善模块', value: allRows.filter((row) => row.ratio < 1).length, meta: '仍需要补充的模块' }, { label: '资源字段', value: collectAssets(data).length, meta: '图片、封面与二维码资源' }];
  const assets = collectAssets(data).slice(0, 8);
  return `<section class="view-grid">${renderTabs(module)}<div class="metrics-grid">${renderMetrics(metrics)}</div><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Section Table</div><h3>模块配置列表</h3></div><span class="badge tone-info">Page Config</span></div><form class="filter-bar" data-form="page-filter"><label class="filter-field"><span>搜索模块</span><input class="filter-input" name="search" value="${escapeHtml(state.pageSearch)}" placeholder="搜索模块名或摘要" /></label><label class="filter-field"><span>状态</span><select class="filter-input" name="status"><option value="all"${state.pageStatus === 'all' ? ' selected' : ''}>全部</option><option value="ready"${state.pageStatus === 'ready' ? ' selected' : ''}>已完整</option><option value="pending"${state.pageStatus === 'pending' ? ' selected' : ''}>待完善</option></select></label><div class="filter-actions"><button class="toolbar-button" type="button" data-action="clear-page-filter">重置</button><button class="toolbar-button primary" type="submit">${icon('search')}<span>查询</span></button></div></form><div class="table-shell"><table class="table"><thead><tr><th>模块</th><th>摘要</th><th>完整度</th><th>资源字段</th><th>操作</th></tr></thead><tbody>${rows.length ? rows.map((row) => `<tr><td><div class="cell-primary"><strong>${escapeHtml(row.section.label)}</strong><span>${escapeHtml(row.section.note || '')}</span></div></td><td>${escapeHtml(formatShort(row.summary, 56))}</td><td><div class="progress-cell">${completionBadge(row.ratio)}<span>${escapeHtml(`${row.filled}/${row.total} 字段`)}</span></div></td><td>${escapeHtml(`${row.assets} 个`)}</td><td><div class="row-actions"><button class="table-button" type="button" data-action="preview-section" data-section="${escapeHtml(row.section.key)}">预览</button><button class="table-button primary" type="button" data-action="edit-section" data-section="${escapeHtml(row.section.key)}">编辑</button></div></td></tr>`).join('') : `<tr><td colspan="5"><div class="empty-state compact">当前筛选条件下没有模块。</div></td></tr>`}</tbody></table></div></article><div class="split-grid"><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Structure</div><h3>字段分组</h3></div></div><div class="outline-list">${allRows.map((row) => `<div class="outline-item"><strong>${escapeHtml(row.section.label)}</strong><span>${escapeHtml(`${row.total} 个字段 · ${percent(row.ratio)}`)}</span></div>`).join('')}</div></article><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Assets</div><h3>资源预览</h3></div></div>${assets.length ? `<div class="asset-grid">${assets.map((asset) => `<article class="asset-card"><div class="asset-thumb">${isImageValue(asset.value) ? `<img src="${escapeHtml(asset.value)}" alt="${escapeHtml(asset.key)}" />` : `<div class="asset-placeholder">${escapeHtml(asset.key)}</div>`}</div><div class="asset-copy"><strong>${escapeHtml(asset.key)}</strong><span>${escapeHtml(asset.path)}</span></div></article>`).join('')}</div>` : '<div class="empty-state compact">当前页面未识别到图片资源字段。</div>'}</article></div></section>`;
}

function sortedItems(items) { const list = [...items]; if (state.listSort === 'sort-desc') return list.sort((a, b) => Number(b.sort || 0) - Number(a.sort || 0)); if (state.listSort === 'title-asc') return list.sort((a, b) => String(a.name || a.title || a._id).localeCompare(String(b.name || b.title || b._id), 'zh-CN')); if (state.listSort === 'title-desc') return list.sort((a, b) => String(b.name || b.title || b._id).localeCompare(String(a.name || a.title || a._id), 'zh-CN')); return list.sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0)); }

function renderCollectionView(module, tab) {
  const meta = getCollectionMeta(tab.collectionKey);
  const items = state.collectionCache[tab.collectionKey] || [];
  const filtered = sortedItems(items).filter((item) => { const keyword = state.listSearch.trim().toLowerCase(); const keywordOk = !keyword || [item.title, item.name, item.label, item.slug, item._id, item.category, item.role, item.tag, item.subtitle].filter(Boolean).some((value) => String(value).toLowerCase().includes(keyword)); const statusOk = state.listStatus === 'all' || String(item.status || 'draft').toLowerCase() === state.listStatus; return keywordOk && statusOk; });
  const totalPages = Math.max(Math.ceil(filtered.length / state.listPageSize), 1);
  if (state.listPage > totalPages) state.listPage = totalPages;
  const start = (state.listPage - 1) * state.listPageSize;
  const pageItems = filtered.slice(start, start + state.listPageSize);
  const visibleIds = pageItems.map((item) => item._id).filter(Boolean);
  const allSelected = visibleIds.length && visibleIds.every((id) => state.selectedIds.includes(id));
  const metrics = [{ label: '总条目数', value: items.length, meta: '当前集合的条目规模' }, { label: '已发布 / 启用', value: items.filter((item) => isLiveStatus(item.status)).length, meta: '可见或启用中的内容' }, { label: '待整理', value: items.filter((item) => !isLiveStatus(item.status)).length, meta: '草稿、下线或停用内容' }, { label: '最大排序值', value: items.reduce((max, item) => Math.max(max, Number(item.sort || 0)), 0), meta: '便于判断排序区间' }];
  return `<section class="view-grid">${renderTabs(module)}<div class="metrics-grid">${renderMetrics(metrics)}</div><article class="panel-card"><div class="section-head"><div><div class="section-kicker">Collection Table</div><h3>${escapeHtml(meta.label)}</h3></div><div class="head-actions"><button class="toolbar-button primary" type="button" data-action="new-item">${icon('plus')}<span>新增条目</span></button></div></div><form class="filter-bar" data-form="collection-filter"><label class="filter-field"><span>搜索</span><input class="filter-input" name="search" value="${escapeHtml(state.listSearch)}" placeholder="搜索名称、标题、ID、分类" /></label><label class="filter-field"><span>状态</span><select class="filter-input" name="status"><option value="all"${state.listStatus === 'all' ? ' selected' : ''}>全部状态</option>${STATUS_OPTIONS.map((item) => `<option value="${escapeHtml(item.value)}"${state.listStatus === item.value ? ' selected' : ''}>${escapeHtml(item.label)}</option>`).join('')}</select></label><label class="filter-field"><span>排序</span><select class="filter-input" name="sort"><option value="sort-asc"${state.listSort === 'sort-asc' ? ' selected' : ''}>排序升序</option><option value="sort-desc"${state.listSort === 'sort-desc' ? ' selected' : ''}>排序降序</option><option value="title-asc"${state.listSort === 'title-asc' ? ' selected' : ''}>名称 A-Z</option><option value="title-desc"${state.listSort === 'title-desc' ? ' selected' : ''}>名称 Z-A</option></select></label><label class="filter-field"><span>每页条数</span><select class="filter-input" name="pageSize">${PAGE_SIZE_OPTIONS.map((size) => `<option value="${size}"${state.listPageSize === size ? ' selected' : ''}>${size}</option>`).join('')}</select></label><div class="filter-actions"><button class="toolbar-button" type="button" data-action="clear-collection-filter">重置</button><button class="toolbar-button primary" type="submit">${icon('filter')}<span>应用筛选</span></button></div></form><div class="batch-bar${state.selectedIds.length ? ' active' : ''}"><span>已选择 ${state.selectedIds.length} 项</span><div class="row-actions"><button class="table-button" type="button" data-action="batch-publish"${state.selectedIds.length ? '' : ' disabled'}>批量发布</button><button class="table-button" type="button" data-action="batch-offline"${state.selectedIds.length ? '' : ' disabled'}>批量下线</button><button class="table-button danger" type="button" data-action="batch-delete"${state.selectedIds.length ? '' : ' disabled'}>批量删除</button></div></div><div class="table-shell"><table class="table"><thead><tr><th class="checkbox-col"><input type="checkbox" data-role="select-all"${allSelected ? ' checked' : ''} /></th><th>${escapeHtml(humanizeKey(meta.primary))}</th>${meta.columns.map((key) => `<th>${escapeHtml(humanizeKey(key))}</th>`).join('')}<th>操作</th></tr></thead><tbody>${pageItems.length ? pageItems.map((item) => `<tr><td class="checkbox-col"><input type="checkbox" data-role="select-row" data-id="${escapeHtml(item._id)}"${state.selectedIds.includes(item._id) ? ' checked' : ''} /></td><td><div class="cell-primary"><strong>${escapeHtml(item[meta.primary] || item.title || item.name || item._id || '未命名')}</strong><span>${escapeHtml(item._id || '-')} · ${escapeHtml(formatShort(item.subtitle || item.summary || item.desc || item.role || item.category || item.tag || '未填写摘要', 48))}</span></div></td>${meta.columns.map((key) => key === 'status' ? `<td>${statusBadge(item.status)}</td>` : `<td>${escapeHtml(formatShort(Array.isArray(item[key]) ? `${item[key].length} 项` : item[key] && typeof item[key] === 'object' ? `${Object.keys(item[key]).length} 键` : item[key] ?? '-', 32))}</td>`).join('')}<td><div class="row-actions"><button class="table-button" type="button" data-action="preview-item" data-id="${escapeHtml(item._id)}">预览</button><button class="table-button primary" type="button" data-action="edit-item" data-id="${escapeHtml(item._id)}">编辑</button><button class="table-button" type="button" data-action="toggle-status" data-id="${escapeHtml(item._id)}">${isLiveStatus(item.status) ? '下线' : '发布'}</button><button class="icon-table-button" type="button" data-action="move-item" data-id="${escapeHtml(item._id)}" data-direction="up" title="上移">${icon('up')}</button><button class="icon-table-button" type="button" data-action="move-item" data-id="${escapeHtml(item._id)}" data-direction="down" title="下移">${icon('down')}</button><button class="table-button danger" type="button" data-action="delete-item" data-id="${escapeHtml(item._id)}">删除</button></div></td></tr>`).join('') : `<tr><td colspan="${meta.columns.length + 3}"><div class="empty-state compact">当前筛选条件下没有数据。</div></td></tr>`}</tbody></table></div><div class="table-footer"><div class="table-summary">显示 ${filtered.length ? start + 1 : 0}-${Math.min(start + state.listPageSize, filtered.length)} / ${filtered.length} 条</div><div class="pagination"><button class="toolbar-button" type="button" data-action="page-change" data-page="${Math.max(state.listPage - 1, 1)}"${state.listPage <= 1 ? ' disabled' : ''}>上一页</button><span class="page-indicator">第 ${state.listPage} / ${totalPages} 页</span><button class="toolbar-button" type="button" data-action="page-change" data-page="${Math.min(state.listPage + 1, totalPages)}"${state.listPage >= totalPages ? ' disabled' : ''}>下一页</button></div></div></article></section>`;
}

function renderSidebar() { refs.sidebarNav.innerHTML = NAV_GROUPS.map((group) => `<section class="nav-group"><div class="nav-group-title">${escapeHtml(group.label)}</div><div class="nav-group-list">${group.items.map((key) => { const module = getModule(key); return `<button class="nav-item${module.key === state.activeModule ? ' active' : ''}" type="button" data-action="open-module" data-module="${escapeHtml(module.key)}" title="${escapeHtml(module.label)}"><span class="nav-icon">${icon(module.icon)}</span><span class="nav-copy"><strong>${escapeHtml(module.label)}</strong><small>${escapeHtml(module.desc)}</small></span></button>`; }).join('')}</div></section>`).join(''); }
function renderTopbar() { const module = getModule(state.activeModule); const tab = currentTab(); refs.topbarKicker.textContent = module.type === 'dashboard' ? 'Dashboard' : tab?.type === 'collection' ? 'Collection Workspace' : 'Page Workspace'; refs.viewTitle.textContent = module.label; refs.topbarBreadcrumb.textContent = [module.label, tab && tab.type === 'collection' ? collectionLabel(tab.collectionKey) : tab && tab.key !== 'page' ? tab.label : '总览'].join(' / '); refs.viewSubtitle.textContent = module.type === 'dashboard' ? '围绕内容数量、发布状态和模块完整度建立总控视图。' : tab?.type === 'collection' ? `${collectionLabel(tab.collectionKey)} 默认以表格方式管理，支持筛选、批量操作、排序和抽屉编辑。` : `${module.label} 以模块表格和抽屉表单维护，适合长期运营使用。`; refs.refreshView.innerHTML = `${icon('refresh')}<span>刷新当前视图</span>`; }
function renderView() { const module = getModule(state.activeModule); refs.content.innerHTML = module.type === 'dashboard' ? renderDashboard() : currentTab()?.type === 'collection' ? renderCollectionView(module, currentTab()) : renderPageView(module); }

function fieldType(field, value) { if (/(image|cover|avatar|qrcode|seed)/i.test(field.path)) return 'image'; if (field.type) return field.type; if (Array.isArray(value) || (value && typeof value === 'object')) return 'json'; if (typeof value === 'number') return 'number'; if (typeof value === 'boolean') return 'boolean'; return String(value || '').length > 80 ? 'textarea' : 'text'; }
function groupName(path, type) { const text = String(path).toLowerCase(); if (path === '_id' || text.endsWith('id')) return '系统信息'; if (/(phone|wechat|address|service)/.test(text)) return '联系信息'; if (/(status|sort)/.test(text) || type === 'boolean') return '发布设置'; if (/(image|cover|avatar|qrcode|seed|accent)/.test(text)) return '资源配置'; if (/(title|name|slug|role|tag|category|year|type|stage)/.test(text)) return '基础信息'; if (/(desc|summary|intro|subtitle|note|content|feature|chip|card|tab|stats|values|items)/.test(text) || type === 'textarea' || type === 'json') return '内容信息'; return '附加信息'; }
function fieldsForSource(source, presetFields = null) { return autoFields(source, presetFields).map((field) => { const value = field.path === '$root' ? source : byPath(source, field.path); const type = fieldType(field, value); return { ...field, type, group: groupName(field.path, type), wide: field.wide || type === 'textarea' || type === 'json', label: field.label || humanizeKey(field.path), value: normalizeFieldValue(value) }; }); }
function groupedFields(fields) { const order = ['基础信息', '内容信息', '资源配置', '联系信息', '发布设置', '系统信息', '附加信息']; return order.map((label) => ({ label, fields: fields.filter((field) => field.group === label) })).filter((group) => group.fields.length); }

function renderControl(field) {
  const attrs = `data-path="${escapeHtml(field.path)}" data-type="${escapeHtml(field.type)}"`;
  if (field.type === 'textarea' || field.type === 'json') return `<textarea class="form-textarea ${field.type === 'json' ? 'is-code' : ''}" ${attrs}>${escapeHtml(field.value)}</textarea>`;
  if (field.type === 'number') return `<input class="form-input" type="number" ${attrs} value="${escapeHtml(field.value)}" />`;
  if (field.type === 'boolean') return `<label class="switch"><input type="checkbox" ${attrs}${field.value === true || field.value === 'true' ? ' checked' : ''} /><span class="switch-slider"></span></label>`;
  if (field.type === 'image') return `<div class="image-field"><div class="image-input-row"><input class="form-input" type="text" ${attrs} value="${escapeHtml(field.value)}" /><label class="upload-button">${icon('upload')}<span>上传</span><input class="file-input" type="file" accept="image/*" data-upload-for="${escapeHtml(field.path)}" /></label></div><div class="image-preview" data-preview-for="${escapeHtml(field.path)}">${isImageValue(field.value) ? `<img src="${escapeHtml(field.value)}" alt="${escapeHtml(field.label)}" />` : '<div class="image-placeholder">资源字段</div>'}</div></div>`;
  return `<input class="form-input" type="text" ${attrs} value="${escapeHtml(field.value)}" />`;
}

function renderForm(fields) { return groupedFields(fields).map((group) => `<section class="form-group"><div class="section-head"><div><div class="section-kicker">Form Group</div><h3>${escapeHtml(group.label)}</h3></div></div><div class="form-grid">${group.fields.map((field) => `<label class="form-field${field.wide ? ' wide' : ''}"><span class="form-label"><strong>${escapeHtml(field.label)}</strong></span>${renderControl(field)}</label>`).join('')}</div></section>`).join(''); }
function renderPreview(fields, source) { return groupedFields(fields).map((group) => `<section class="preview-group"><div class="section-head"><div><div class="section-kicker">Preview</div><h3>${escapeHtml(group.label)}</h3></div></div><div class="preview-list">${group.fields.map((field) => { const value = field.path === '$root' ? source : byPath(source, field.path); const view = isImageValue(value) ? `<div class="preview-image"><img src="${escapeHtml(value)}" alt="${escapeHtml(field.label)}" /></div>` : Array.isArray(value) || (value && typeof value === 'object') ? `<pre class="preview-code">${escapeHtml(JSON.stringify(value, null, 2))}</pre>` : `<div>${escapeHtml(value == null || value === '' ? '未填写' : value)}</div>`; return `<div class="preview-item"><strong>${escapeHtml(field.label)}</strong>${view}</div>`; }).join('')}</div></section>`).join(''); }

function openDrawer(config) { state.drawer = config; refs.drawerKicker.textContent = config.kicker; refs.drawerTitle.textContent = config.title; refs.drawerSubtitle.textContent = config.subtitle; refs.drawerFootNote.textContent = config.mode === 'edit' ? '保存后会立即写入当前数据源。' : '当前为只读预览模式。'; refs.drawerDelete.classList.toggle('hidden', !config.deletable); refs.drawerSave.classList.toggle('hidden', config.mode !== 'edit'); refs.drawerBody.innerHTML = config.mode === 'edit' ? renderForm(config.fields) : renderPreview(config.fields, config.source); refs.drawer.classList.remove('hidden'); refs.drawer.setAttribute('aria-hidden', 'false'); }
function closeDrawer() { state.drawer = null; refs.drawer.classList.add('hidden'); refs.drawer.setAttribute('aria-hidden', 'true'); refs.drawerBody.innerHTML = ''; }
function drawerPageSection(moduleKey, sectionKey, mode) { const module = getModule(moduleKey); const data = state.pageCache[module.pageKey] || {}; const row = sectionRows(module, data).find((item) => item.section.key === sectionKey); if (!row) return; openDrawer({ mode, entity: 'page-section', moduleKey, pageKey: module.pageKey, section: row.section, source: clone(row.source), fields: fieldsForSource(row.source, row.section.fields || null), kicker: module.label, title: `${row.section.label}${mode === 'edit' ? ' · 编辑' : ' · 预览'}`, subtitle: row.section.note || '维护当前页面模块。' }); }
function drawerCollectionItem(collectionKey, item, mode) { openDrawer({ mode, entity: 'collection-item', collectionKey, source: clone(item), fields: fieldsForSource(item), deletable: mode === 'edit' && Boolean(item._id), kicker: collectionLabel(collectionKey), title: `${mode === 'edit' ? item._id ? '编辑条目' : '新增条目' : '条目预览'}`, subtitle: '通过标准表单维护条目内容，支持状态、排序和资源字段。' }); }
function parseValue(raw, type, original) { if (type === 'number') return raw === '' ? 0 : Number(raw); if (type === 'boolean') return Boolean(raw); if (type === 'json') { if (!String(raw).trim()) return Array.isArray(original) ? [] : {}; return JSON.parse(raw); } return raw; }
function collectDrawerData() { if (!state.drawer) return null; const source = clone(state.drawer.source); const rootField = state.drawer.fields.find((field) => field.path === '$root'); if (rootField) { const node = refs.drawerBody.querySelector('[data-path="$root"]'); return parseValue(node.value, rootField.type, source); } refs.drawerBody.querySelectorAll('[data-path]').forEach((node) => { const field = state.drawer.fields.find((item) => item.path === node.dataset.path); const original = field.path === '$root' ? source : byPath(source, field.path); const raw = field.type === 'boolean' ? node.checked : node.value; setPath(source, field.path, parseValue(raw, field.type, original)); }); return source; }

async function saveDrawer() {
  if (!state.drawer) return;
  try {
    if (state.drawer.entity === 'page-section') {
      const next = collectDrawerData();
      const page = clone(state.pageCache[state.drawer.pageKey] || {});
      if (state.drawer.section.path === '$root') Object.assign(page, next); else setPath(page, state.drawer.section.path, next);
      await request(`/api/page/${state.drawer.pageKey}`, { method: 'PUT', body: JSON.stringify(page) });
      state.pageCache[state.drawer.pageKey] = page;
      state.dashboard = null;
      addWrite();
      closeDrawer();
      renderView();
      setStatus('页面内容已保存', 'success');
      return;
    }
    if (state.drawer.entity === 'collection-item') {
      const payload = collectDrawerData();
      if (payload._id) await request(`/api/collection/${state.drawer.collectionKey}/${payload._id}`, { method: 'PUT', body: JSON.stringify(payload) }); else { const result = await request(`/api/collection/${state.drawer.collectionKey}`, { method: 'POST', body: JSON.stringify(payload) }); payload._id = result.data._id; }
      await fetchCollection(state.drawer.collectionKey, true);
      state.dashboard = null;
      addWrite();
      closeDrawer();
      renderView();
      setStatus('条目已保存', 'success');
    }
  } catch (error) { setStatus(error.message, 'error'); }
}

async function deleteDrawerItem() { if (!state.drawer || state.drawer.entity !== 'collection-item' || !state.drawer.source._id) return; if (!window.confirm('确认删除该条目？')) return; try { await request(`/api/collection/${state.drawer.collectionKey}/${state.drawer.source._id}`, { method: 'DELETE' }); await fetchCollection(state.drawer.collectionKey, true); state.dashboard = null; addWrite(); closeDrawer(); renderView(); setStatus('条目已删除', 'warning'); } catch (error) { setStatus(error.message, 'error'); } }
async function loadCurrent(force = false) { const module = getModule(state.activeModule); if (module.type === 'dashboard') { state.dashboard = await buildDashboard(force || !state.dashboard); return; } const tab = currentTab(); if (tab.type === 'page') await fetchPage(tab.pageKey, force); else await fetchCollection(tab.collectionKey, force); }
async function activateModule(moduleKey, tabKey = null, force = false) { const module = getModule(moduleKey); state.activeModule = module.key; state.activeTab = tabKey || tabsFor(module)[0]?.key || null; localStorage.setItem('admin-active-module', state.activeModule); localStorage.setItem('admin-active-tab', state.activeTab || ''); await loadCurrent(force); renderSidebar(); renderTopbar(); renderView(); }
async function refreshView() { try { await fetchHealth(); await loadCurrent(true); renderSidebar(); renderTopbar(); renderView(); setStatus('当前视图已刷新', 'success'); } catch (error) { setStatus(error.message, 'error'); } }
async function resetSeed() { if (!window.confirm('确认重置为初始数据？当前后台内容会被预置种子数据覆盖。')) return; try { await request('/api/seed/reset', { method: 'POST' }); state.pageCache = {}; state.collectionCache = {}; state.dashboard = null; state.selectedIds = []; addWrite(); await loadCurrent(true); renderSidebar(); renderTopbar(); renderView(); setStatus('已重置为初始数据', 'warning'); } catch (error) { setStatus(error.message, 'error'); } }
async function deleteItem(itemId) { const tab = currentTab(); if (!window.confirm('确认删除该条目？')) return; try { await request(`/api/collection/${tab.collectionKey}/${itemId}`, { method: 'DELETE' }); await fetchCollection(tab.collectionKey, true); state.selectedIds = state.selectedIds.filter((id) => id !== itemId); state.dashboard = null; addWrite(); renderView(); setStatus('条目已删除', 'warning'); } catch (error) { setStatus(error.message, 'error'); } }
async function toggleStatus(itemId) { const tab = currentTab(); const item = (state.collectionCache[tab.collectionKey] || []).find((entry) => entry._id === itemId); if (!item) return; try { await request(`/api/collection/${tab.collectionKey}/${itemId}`, { method: 'PUT', body: JSON.stringify({ ...item, status: isLiveStatus(item.status) ? 'offline' : 'published' }) }); await fetchCollection(tab.collectionKey, true); state.dashboard = null; addWrite(); renderView(); setStatus('状态已更新', 'success'); } catch (error) { setStatus(error.message, 'error'); } }
async function moveItem(itemId, direction) { const tab = currentTab(); const items = sortedItems(state.collectionCache[tab.collectionKey] || []); const index = items.findIndex((item) => item._id === itemId); const swap = direction === 'up' ? index - 1 : index + 1; if (index < 0 || swap < 0 || swap >= items.length) return; const current = { ...items[index] }; const target = { ...items[swap] }; const temp = Number(current.sort || 0); current.sort = Number(target.sort || 0); target.sort = temp; try { await Promise.all([request(`/api/collection/${tab.collectionKey}/${current._id}`, { method: 'PUT', body: JSON.stringify(current) }), request(`/api/collection/${tab.collectionKey}/${target._id}`, { method: 'PUT', body: JSON.stringify(target) })]); await fetchCollection(tab.collectionKey, true); state.dashboard = null; addWrite(); renderView(); setStatus('排序已更新', 'success'); } catch (error) { setStatus(error.message, 'error'); } }
async function batchAction(kind) { const tab = currentTab(); const ids = [...state.selectedIds]; if (!ids.length) return; if (kind === 'delete' && !window.confirm(`确认删除选中的 ${ids.length} 条内容？`)) return; try { if (kind === 'delete') await Promise.all(ids.map((id) => request(`/api/collection/${tab.collectionKey}/${id}`, { method: 'DELETE' }))); else { const items = state.collectionCache[tab.collectionKey] || []; await Promise.all(ids.map((id) => { const item = items.find((entry) => entry._id === id); return item ? request(`/api/collection/${tab.collectionKey}/${id}`, { method: 'PUT', body: JSON.stringify({ ...item, status: kind === 'publish' ? 'published' : 'offline' }) }) : Promise.resolve(); })); } await fetchCollection(tab.collectionKey, true); state.selectedIds = []; state.dashboard = null; addWrite(); renderView(); setStatus('批量操作已完成', 'success'); } catch (error) { setStatus(error.message, 'error'); } }

async function handleAction(button) {
  const action = button.dataset.action;
  if (action === 'open-module') { resetFilters(); await activateModule(button.dataset.module, null, false); return; }
  if (action === 'switch-tab') { resetFilters(); state.activeTab = button.dataset.tab; localStorage.setItem('admin-active-tab', state.activeTab); await loadCurrent(false); renderTopbar(); renderView(); return; }
  if (action === 'clear-page-filter') { state.pageSearch = ''; state.pageStatus = 'all'; renderView(); return; }
  if (action === 'clear-collection-filter') { state.listSearch = ''; state.listStatus = 'all'; state.listSort = 'sort-asc'; state.listPageSize = 10; state.listPage = 1; state.selectedIds = []; renderView(); return; }
  if (action === 'preview-section' || action === 'edit-section') { drawerPageSection(state.activeModule, button.dataset.section, action === 'edit-section' ? 'edit' : 'preview'); return; }
  if (action === 'new-item') { const tab = currentTab(); const result = await request(`/api/template/${tab.collectionKey}`); drawerCollectionItem(tab.collectionKey, result.data || {}, 'edit'); return; }
  if (action === 'preview-item' || action === 'edit-item') { const tab = currentTab(); const item = (state.collectionCache[tab.collectionKey] || []).find((entry) => entry._id === button.dataset.id); if (item) drawerCollectionItem(tab.collectionKey, item, action === 'edit-item' ? 'edit' : 'preview'); return; }
  if (action === 'delete-item') { await deleteItem(button.dataset.id); return; }
  if (action === 'toggle-status') { await toggleStatus(button.dataset.id); return; }
  if (action === 'move-item') { await moveItem(button.dataset.id, button.dataset.direction); return; }
  if (action === 'page-change') { state.listPage = Number(button.dataset.page || 1); renderView(); return; }
  if (action === 'batch-publish') { await batchAction('publish'); return; }
  if (action === 'batch-offline') { await batchAction('offline'); return; }
  if (action === 'batch-delete') { await batchAction('delete'); }
}

async function handleForm(form) { const data = new FormData(form); if (form.dataset.form === 'page-filter') { state.pageSearch = String(data.get('search') || '').trim(); state.pageStatus = String(data.get('status') || 'all'); renderView(); return; } if (form.dataset.form === 'collection-filter') { state.listSearch = String(data.get('search') || '').trim(); state.listStatus = String(data.get('status') || 'all'); state.listSort = String(data.get('sort') || 'sort-asc'); state.listPageSize = Number(data.get('pageSize') || 10); state.listPage = 1; state.selectedIds = []; renderView(); } }
function readUpload(input) { const file = input.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { const path = input.dataset.uploadFor; const target = refs.drawerBody.querySelector(`[data-path="${path}"]`); const preview = refs.drawerBody.querySelector(`[data-preview-for="${path}"]`); if (target) target.value = String(reader.result || ''); if (preview) preview.innerHTML = `<img src="${escapeHtml(String(reader.result || ''))}" alt="上传预览" />`; }; reader.readAsDataURL(file); }

refs.sidebarToggle.addEventListener('click', toggleSidebar);
refs.themeToggle.addEventListener('click', toggleTheme);
refs.resetSeed.addEventListener('click', () => { resetSeed().catch((error) => setStatus(error.message, 'error')); });
refs.refreshView.addEventListener('click', () => { refreshView().catch((error) => setStatus(error.message, 'error')); });
refs.content.addEventListener('click', (event) => { const button = event.target.closest('[data-action]'); if (button) handleAction(button).catch((error) => setStatus(error.message, 'error')); });
refs.content.addEventListener('submit', (event) => { const form = event.target.closest('[data-form]'); if (!form) return; event.preventDefault(); handleForm(form).catch((error) => setStatus(error.message, 'error')); });
refs.content.addEventListener('change', (event) => { const target = event.target; if (target.dataset.role === 'select-all') { const tab = currentTab(); const items = sortedItems((state.collectionCache[tab.collectionKey] || []).filter((item) => (state.listStatus === 'all' || String(item.status || 'draft').toLowerCase() === state.listStatus) && (!state.listSearch.trim() || [item.title, item.name, item.label, item.slug, item._id, item.category, item.role, item.tag, item.subtitle].filter(Boolean).some((value) => String(value).toLowerCase().includes(state.listSearch.trim().toLowerCase()))))); const pageItems = items.slice((state.listPage - 1) * state.listPageSize, state.listPage * state.listPageSize).map((item) => item._id).filter(Boolean); state.selectedIds = target.checked ? [...new Set([...state.selectedIds, ...pageItems])] : state.selectedIds.filter((id) => !pageItems.includes(id)); renderView(); return; } if (target.dataset.role === 'select-row') { state.selectedIds = target.checked ? [...new Set([...state.selectedIds, target.dataset.id])] : state.selectedIds.filter((id) => id !== target.dataset.id); renderView(); } });
refs.drawerBackdrop.addEventListener('click', closeDrawer);
refs.drawerClose.addEventListener('click', closeDrawer);
refs.drawerCancel.addEventListener('click', closeDrawer);
refs.drawerSave.addEventListener('click', saveDrawer);
refs.drawerDelete.addEventListener('click', deleteDrawerItem);
refs.drawerBody.addEventListener('change', (event) => { if (event.target.matches('[data-upload-for]')) readUpload(event.target); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && state.drawer) closeDrawer(); });

(async function bootstrap() {
  try {
    applyTheme(preferredTheme());
    applySidebarCollapsed(localStorage.getItem('admin-sidebar-collapsed') === 'true');
    refs.resetSeed.innerHTML = `${icon('trash')}<span>重置数据</span>`;
    refs.drawerClose.innerHTML = icon('close');
    await fetchHealth();
    const savedModule = localStorage.getItem('admin-active-module') || 'dashboard';
    const module = getModule(savedModule);
    const savedTab = localStorage.getItem('admin-active-tab') || tabsFor(module)[0]?.key || null;
    await activateModule(module.key, savedTab, true);
    setStatus('后台服务正常', 'success');
  } catch (error) {
    setStatus(error.message || '初始化失败', 'error');
  }
})();
