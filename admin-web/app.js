const NAV_ITEMS = [
  { key: 'overview', label: '总览', icon: 'grid' },
  { key: 'directions', label: '方向', icon: 'compass' },
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
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>'
};

const state = {
  theme: 'light',
  activeView: 'overview',
  loading: false,
  meta: null,
  health: null,
  currentData: null,
  error: '',
  viewUi: {}
};

const refs = {
  nav: document.getElementById('sidebar-nav'),
  topbarKicker: document.getElementById('topbar-kicker'),
  topbarBreadcrumb: document.getElementById('topbar-breadcrumb'),
  viewTitle: document.getElementById('view-title'),
  statusPill: document.getElementById('status-pill'),
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

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  refs.themeToggle.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon');
  refs.themeToggle.title = theme === 'dark' ? '切换为亮色主题' : '切换为暗色主题';
  refs.themeToggle.setAttribute('aria-label', refs.themeToggle.title);
  localStorage.setItem('admin-web-theme', theme);
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
      drafts: {}
    };
  }
  return state.viewUi[viewKey];
}

function getCollectionMeta(collectionKey) {
  return state.meta?.listOptions?.find((item) => item.key === collectionKey) || { key: collectionKey, label: collectionKey };
}

function getPrimaryLabel(item, collectionKey) {
  if (!item) return '未命名';
  if (collectionKey === 'directions') return item.name || item.slug || item._id || '未命名方向';
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
  hero: '首屏',
  chip: '角标',
  title: '标题',
  highlightTitle: '高亮标题',
  desc: '描述',
  secondaryNote: '补充说明',
  backgroundImageUrl: '背景图 URL',
  backgroundImageSeed: '背景图 Seed',
  imageUrl: '图片 URL',
  imageSeed: '图片 Seed',
  tags: '标签',
  primaryButton: '主按钮',
  text: '文案',
  url: '链接',
  openType: '打开方式',
  overviewStats: '统计数据',
  value: '值',
  label: '标签',
  note: '备注',
  quickLinks: '快捷入口',
  icon: '图标',
  advantages: '核心优势',
  directionsIntro: '方向介绍',
  featuredDirectionIds: '精选方向 ID',
  moreDirectionCard: '更多方向卡片',
  environmentSection: '环境区块',
  subtitle: '副标题',
  cards: '卡片',
  cta: '底部 CTA',
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

const TEXTAREA_FIELDS = new Set(['desc', 'intro', 'summary', 'subtitle', 'audience', 'footnote']);
const OBJECT_ARRAY_FIELDS = new Set([
  'overviewStats',
  'quickLinks',
  'advantages',
  'cards',
  'features',
  'stats',
  'values',
  'environmentImages'
]);
const ARRAY_TEMPLATES = {
  overviewStats: { value: '', label: '', note: '' },
  quickLinks: { label: '', desc: '', url: '', openType: 'navigate', icon: '' },
  advantages: { icon: '', title: '', desc: '' },
  cards: { label: '', imageUrl: '', imageSeed: '' },
  features: { title: '', desc: '' },
  stats: { value: '', label: '', note: '' },
  values: { title: '', desc: '' },
  environmentImages: { label: '', imageUrl: '', imageSeed: '' },
  tags: '',
  categories: '',
  suggestions: '',
  featuredDirectionIds: '',
  featuredSeriesIds: '',
  tabs: '',
  specialties: '',
  contents: ''
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

function humanizeLabel(key) {
  return FIELD_LABELS[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('_', ' ');
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

function isTextareaField(fieldKey, value) {
  return TEXTAREA_FIELDS.has(fieldKey) || (typeof value === 'string' && value.length > 60);
}

function isManagedField(fieldKey) {
  return ['createdAt', 'updatedAt', '_createdAt', '_updatedAt'].includes(fieldKey);
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

function renderPrimitiveInput(scope, path, fieldKey, value) {
  const label = humanizeLabel(fieldKey);
  const pathText = path.join('.');
  const selectOptions = getSelectOptions(fieldKey);

  if (selectOptions) {
    return `<label class="form-field">
      <span class="form-label">${escapeHtml(label)}</span>
      <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="${fieldKey === 'sort' ? 'number' : typeof value}">
        ${selectOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(value ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
      </select>
    </label>`;
  }

  if (typeof value === 'boolean') {
    return `<label class="form-field">
      <span class="form-label">${escapeHtml(label)}</span>
      <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="boolean">
        <option value="true"${value ? ' selected' : ''}>是</option>
        <option value="false"${!value ? ' selected' : ''}>否</option>
      </select>
    </label>`;
  }

  if (typeof value === 'number') {
    return `<label class="form-field">
      <span class="form-label">${escapeHtml(label)}</span>
      <input class="form-input" type="number" value="${escapeHtml(String(value))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="number" />
    </label>`;
  }

  if (isTextareaField(fieldKey, value)) {
    return `<label class="form-field form-field-wide">
      <span class="form-label">${escapeHtml(label)}</span>
      <textarea class="form-textarea" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text">${escapeHtml(String(value ?? ''))}</textarea>
    </label>`;
  }

  return `<label class="form-field">
    <span class="form-label">${escapeHtml(label)}</span>
    <input class="form-input" type="text" value="${escapeHtml(String(value ?? ''))}" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text" />
  </label>`;
}

function renderFormNode(scope, value, path = [], fieldKey = '') {
  if (Array.isArray(value)) {
    const label = humanizeLabel(fieldKey);
    const pathText = path.join('.');
    const objectItems = value.some((item) => item && typeof item === 'object' && !Array.isArray(item)) || OBJECT_ARRAY_FIELDS.has(fieldKey);
    return `<section class="form-block">
      <div class="form-block-head">
        <div>
          <h4>${escapeHtml(label)}</h4>
          <p>${escapeHtml(objectItems ? '数组项会以卡片方式展示，适合逐项维护。' : '适合维护标签、ID、目录等简单列表。')}</p>
        </div>
        <button class="system-action" type="button" data-action="append-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}">新增一项</button>
      </div>
      <div class="form-array-list">
        ${value.length ? value.map((item, index) => {
          const itemPath = [...path, index];
          const itemPathText = itemPath.join('.');
          if (objectItems) {
            const fields = Object.keys(item || {}).filter((key) => !isManagedField(key)).map((key) => renderFormNode(scope, item[key], [...itemPath, key], key)).join('');
            return `<article class="form-array-card">
              <div class="form-array-head">
                <strong>${escapeHtml(`${label} ${index + 1}`)}</strong>
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
    const label = fieldKey ? humanizeLabel(fieldKey) : '内容配置';
    const fields = Object.keys(value).filter((key) => !isManagedField(key)).map((key) => renderFormNode(scope, value[key], [...path, key], key)).join('');
    return `<section class="form-block">
      ${fieldKey ? `<div class="form-block-head"><div><h4>${escapeHtml(label)}</h4></div></div>` : ''}
      <div class="form-grid">${fields || '<div class="empty-state">当前对象还没有可编辑字段。</div>'}</div>
    </section>`;
  }

  return renderPrimitiveInput(scope, path, fieldKey, value);
}

function renderFriendlyEditor(scope, value) {
  if (!value) {
    return '<div class="empty-state">暂无可编辑内容。</div>';
  }

  return `<div class="friendly-editor">${renderFormNode(scope, value)}</div>`;
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

function renderSidebar() {
  refs.nav.innerHTML = NAV_ITEMS.map((item) => `<button class="nav-item${state.activeView === item.key ? ' active' : ''}" type="button" data-nav="${escapeHtml(item.key)}" aria-label="${escapeHtml(item.label)}">
    <span class="nav-icon">${icon(item.icon)}</span>
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

function renderLoading() {
  refs.content.innerHTML = `<section class="module-page"><article class="panel empty-panel"><div class="empty-state">正在加载当前模块数据...</div></article></section>`;
}

function renderError(message) {
  refs.content.innerHTML = `<section class="module-page"><article class="panel empty-panel"><div class="empty-state">${escapeHtml(message)}</div></article></section>`;
}

function renderOverview(data) {
  const totalPages = Object.keys(data.pages).length;
  const totalItems = Object.values(data.collections).reduce((sum, items) => sum + items.length, 0);
  const published = Object.values(data.collections).flat().filter((item) => item.status === 'published').length;
  const drafts = Object.values(data.collections).flat().filter((item) => item.status !== 'published').length;
  const todayUpdates = data.recentUpdates.filter((item) => isToday(item.updatedAt)).length;
  const mediaCount = (data.collections.mediaAssets || []).length;

  refs.content.innerHTML = `<section class="dashboard-page">
    <div class="stats-grid">
      <article class="stat-card tone-indigo">
        <div class="stat-card-head"><h2>页面配置</h2><span class="stat-card-icon">${icon('grid')}</span></div>
        <div class="stat-card-value">${escapeHtml(totalPages)}</div>
        <div class="stat-card-foot"><strong class="positive">已接入</strong><span>单页内容</span></div>
      </article>
      <article class="stat-card tone-green">
        <div class="stat-card-head"><h2>内容条目</h2><span class="stat-card-icon">${icon('compass')}</span></div>
        <div class="stat-card-value">${escapeHtml(totalItems)}</div>
        <div class="stat-card-foot"><strong class="positive">${escapeHtml(String(published))}</strong><span>已发布</span></div>
      </article>
      <article class="stat-card tone-sky">
        <div class="stat-card-head"><h2>媒体资源</h2><span class="stat-card-icon">${icon('image')}</span></div>
        <div class="stat-card-value">${escapeHtml(mediaCount)}</div>
        <div class="stat-card-foot"><strong>${escapeHtml(String(drafts))}</strong><span>待完善内容</span></div>
      </article>
      <article class="stat-card tone-violet">
        <div class="stat-card-head"><h2>今日更新</h2><span class="stat-card-icon">${icon('refresh')}</span></div>
        <div class="stat-card-value">${escapeHtml(todayUpdates)}</div>
        <div class="stat-card-foot"><strong class="positive">实时</strong><span>来自当前数据源</span></div>
      </article>
    </div>

    <div class="dashboard-main">
      <article class="panel trend-panel">
        <div class="panel-head">
          <div>
            <h3>页面配置状态</h3>
            <p>${escapeHtml(state.health?.mode === 'cloud' ? '当前为云端模式' : '当前为本地模式')}，这里展示各页面最后更新时间。</p>
          </div>
        </div>
        <div class="record-list compact-list overview-list">
          ${Object.entries(data.pages).map(([pageKey, pageData]) => `<button class="record-row" type="button" data-action="open-view" data-target-view="${escapeHtml(resolveViewFromPageKey(pageKey))}">
            <span class="record-row-main">
              <strong class="record-row-title">${escapeHtml(data.pageLabels[pageKey] || pageKey)}</strong>
              <span class="record-row-meta">最后更新 ${escapeHtml(formatDateTime(getUpdatedAt(pageData)))}</span>
            </span>
            <span class="record-pill">进入</span>
          </button>`).join('')}
        </div>
      </article>

      <article class="panel health-panel">
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
      <article class="panel updates-panel">
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

      <article class="panel system-panel">
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

function renderPageEditor(view, page) {
  if (!view.pageKey) return '';
  return `<article class="panel editor-panel">
    <div class="panel-head">
      <div>
        <h3>${escapeHtml(view.pageLabel)}</h3>
        <p>这里保存的是单页配置文档，保存后小程序端会重新读取。</p>
      </div>
      <div class="panel-actions">
        <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(view.pageKey)}">保存页面</button>
      </div>
    </div>
    <div class="editor-meta">
      <span class="meta-chip">字段 ${escapeHtml(String(Object.keys(page || {}).length))}</span>
      <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(page)))}</span>
      <span class="meta-chip">文档 ID ${escapeHtml(view.pageKey === 'site' ? 'default' : 'singleton')}</span>
    </div>
    ${renderFriendlyEditor(`page:${view.pageKey}`, page || {})}
    <div class="editor-actions">
      <button class="system-action" type="button" data-action="save-page" data-page-key="${escapeHtml(view.pageKey)}">保存当前页面</button>
      <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
    </div>
  </article>`;
}

function renderCollectionSection(collectionKey, items) {
  const collectionMeta = getCollectionMeta(collectionKey);
  const selected = getSelectedCollectionState(collectionKey, items);
  const editorLabel = selected.isDraft ? '新建条目' : selected.item ? `编辑 ${getPrimaryLabel(selected.item, collectionKey)}` : '暂无条目';

  return `<section class="collection-section">
    <div class="collection-grid">
      <article class="panel list-panel">
        <div class="panel-head">
          <div>
            <h3>${escapeHtml(collectionMeta.label)}</h3>
            <p>当前共 ${escapeHtml(String(items.length))} 条，可直接选中后编辑。</p>
          </div>
          <div class="panel-actions">
            <button class="system-action" type="button" data-action="new-item" data-collection-key="${escapeHtml(collectionKey)}">新建</button>
          </div>
        </div>
        <div class="record-list">
          ${items.length ? items.map((item) => `<button class="record-row${selected.itemId === item._id && !selected.isDraft ? ' active' : ''}" type="button" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">
            <span class="record-row-main">
              <strong class="record-row-title">${escapeHtml(getPrimaryLabel(item, collectionKey))}</strong>
              <span class="record-row-meta">${escapeHtml(getSecondaryLabel(item, collectionKey) || '暂无补充说明')}</span>
            </span>
            <span class="record-pill ${item.status === 'published' ? 'success' : ''}">${escapeHtml(item.status || 'draft')}</span>
          </button>`).join('') : '<div class="empty-state">当前集合还没有数据，点击右上角“新建”即可开始。</div>'}
        </div>
      </article>

      <article class="panel editor-panel">
        <div class="panel-head">
          <div>
            <h3>${escapeHtml(editorLabel)}</h3>
            <p>${selected.item ? '支持直接编辑 JSON 后保存，适合先快速打通内容链路。' : '先从左侧选择条目，或者新建一个内容条目。'}</p>
          </div>
          <div class="panel-actions">
            <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存条目</button>
            ${selected.item && !selected.isDraft ? `<button class="system-action danger-action" type="button" data-action="delete-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(selected.itemId)}">删除</button>` : ''}
          </div>
        </div>
        ${selected.item ? `<div class="editor-meta">
          <span class="meta-chip">ID ${escapeHtml(selected.itemId || '新建中')}</span>
          <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(selected.item)))}</span>
          <span class="meta-chip">集合 ${escapeHtml(collectionMeta.label)}</span>
        </div>
        ${renderFriendlyEditor(`collection:${collectionKey}`, selected.item)}
        <div class="editor-actions">
          <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存条目</button>
          <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
        </div>` : '<div class="empty-state">这里会显示所选条目的编辑内容。</div>'}
      </article>
    </div>
  </section>`;
}

function renderModule(view, data) {
  refs.content.innerHTML = `<section class="module-page">
    <article class="panel module-hero-panel">
      <div class="panel-head">
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
    ${renderPageEditor(view, data.page)}
    ${(view.collections || []).map((collection) => renderCollectionSection(collection.key, data.collections[collection.key] || [])).join('')}
  </section>`;
}

async function loadOverviewData() {
  const pageOptions = state.meta?.pageOptions || [];
  const listOptions = state.meta?.listOptions || [];

  const pageEntries = await Promise.all(pageOptions.map(async (page) => {
    const result = await request(`/api/page/${page.key}`);
    return [page.key, result.data || null];
  }));

  const collectionEntries = await Promise.all(listOptions.map(async (collection) => {
    const result = await request(`/api/collection/${collection.key}`);
    return [collection.key, Array.isArray(result.data) ? result.data : []];
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
    { label: '媒体资源', pageKey: 'materials', collectionKey: 'mediaAssets' }
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
    data.page = pageResult.data || {};
  }

  for (const collection of view.collections || []) {
    const result = await request(`/api/collection/${collection.key}`);
    data.collections[collection.key] = Array.isArray(result.data) ? result.data : [];
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

      if (action === 'save-page' && pageKey) {
        setStatus('正在保存页面...', 'loading');
        await savePage(pageKey);
        await renderActiveView(true);
        return;
      }

      if (action === 'select-item' && collectionKey) {
        const ui = getViewUi();
        ui.selectedIds[collectionKey] = itemId || '';
        delete ui.drafts[collectionKey];
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'new-item' && collectionKey) {
        setStatus('正在准备新条目...', 'loading');
        await createCollectionDraft(collectionKey);
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus('已生成新条目模板');
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
        return;
      }

      if (action === 'delete-item' && collectionKey && itemId) {
        const confirmed = window.confirm('确认删除这个条目吗？此操作无法撤销。');
        if (!confirmed) return;
        setStatus('正在删除条目...', 'loading');
        await deleteCollectionItem(collectionKey, itemId);
        await renderActiveView(true);
      }
    } catch (error) {
      setStatus(error.message || '操作失败', 'error');
      window.alert(error.message || '操作失败');
    }
  });

  function handleFormMutation(event) {
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
    }

    updateFormSource(scope, path, nextValue);
  }

  refs.content.addEventListener('input', handleFormMutation);
  refs.content.addEventListener('change', handleFormMutation);

  refs.themeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
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
  renderSidebar();
  bindGlobalActions();

  try {
    await hydrateMeta();
    await renderActiveView(true);
  } catch (error) {
    setTopbar(VIEW_CONFIG.overview);
    setStatus('CMS 服务不可用', 'error');
    renderError(error.message || '初始化失败');
  }
}

bootstrap();
