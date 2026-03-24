const NAV_ITEMS = [
  { key: 'overview', label: '首页', icon: 'grid' },
  { key: 'directions', label: '课程方向', icon: 'compass' },
  { key: 'questionBank', label: '题库管理', icon: 'search' },
  { key: 'teachers', label: '师资团队', icon: 'users' },
  { key: 'results', label: '学员成果', icon: 'award' },
  { key: 'about', label: '关于我们', icon: 'info' },
  { key: 'contact', label: '联系方式', icon: 'phone' },
  { key: 'media', label: '素材资源', icon: 'image' },
  { key: 'accounts', label: '账号管理', icon: 'users' }
];

const VIEW_CONFIG = {
  overview: {
    key: 'overview',
    kicker: '工作台',
    breadcrumb: '首页',
    title: '工作台',
    subtitle: '查看内容更新状态，快速进入常用功能。'
  },
  home: {
    key: 'home',
    kicker: '页面',
    breadcrumb: '首页内容',
    title: '首页内容',
    subtitle: '编辑小程序首页展示的标题、数据卡、功能入口和咨询区。', 
    pageKey: 'home',
    pageLabel: '首页',
    collections: []
  },
  directions: {
    key: 'directions',
    kicker: '页面',
    breadcrumb: '课程方向',
    title: '课程方向',
    subtitle: '管理开设的课程方向，设置首页推荐和方向卡片内容。',
    pageKey: 'courses',
    pageLabel: '课程方向页',
    collections: [{ key: 'directions', label: '方向列表' }]
  },
  questionBank: {
    key: 'questionBank',
    kicker: '页面',
    breadcrumb: '题库管理',
    title: '题库管理',
    subtitle: '管理题库页面内容，支持批量导入题目和试卷。',
    pageKey: 'questionBank',
    pageLabel: '题库页面',
    collections: [
      { key: 'medicalQuestions', label: '题目列表' },
      { key: 'pastPapers', label: '试卷列表' },
      { key: 'questionImports', label: '导入记录' }
    ]
  },
  teachers: {
    key: 'teachers',
    kicker: '页面',
    breadcrumb: '师资团队',
    title: '师资团队',
    subtitle: '管理老师信息，设置师资页面展示内容。',
    pageKey: 'teachers',
    pageLabel: '师资页面',
    collections: [{ key: 'teachers', label: '老师列表' }]
  },
  results: {
    key: 'results',
    kicker: '页面',
    breadcrumb: '学员成果',
    title: '学员成果',
    subtitle: '管理学员上岸案例，展示教学成果。',
    pageKey: 'success',
    pageLabel: '成果页面',
    collections: [{ key: 'successCases', label: '案例列表' }]
  },
  about: {
    key: 'about',
    kicker: '页面',
    breadcrumb: '关于我们',
    title: '关于我们',
    subtitle: '编辑机构介绍、教学理念和联系方式。',
    pageKey: 'about',
    pageLabel: '关于页面',
    collections: []
  },
  contact: {
    key: 'contact',
    kicker: '设置',
    breadcrumb: '联系方式',
    title: '联系方式',
    subtitle: '设置机构名称、电话、微信、地址等联系信息。',
    pageKey: 'site',
    pageLabel: '站点设置',
    collections: []
  },
  media: {
    key: 'media',
    kicker: '页面',
    breadcrumb: '教材资料',
    title: '教材资料',
    subtitle: '管理教材资料页面，上传和整理学习资源。',
    pageKey: 'materials',
    pageLabel: '资料页面',
    collections: [
      { key: 'mediaAssets', label: '素材库' },
      { key: 'materialPackages', label: '资料套餐' },
      { key: 'materialItems', label: '资料列表' }
    ]
  },
  accounts: {
    key: 'accounts',
    kicker: '设置',
    breadcrumb: '账号管理',
    title: '账号管理',
    subtitle: '管理后台登录账号，设置角色权限。',
    pageKey: null,
    pageLabel: '',
    collections: [{ key: 'adminUsers', label: '账号列表' }]
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
  eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"></path><circle cx="12" cy="12" r="2.8"></circle>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.9-4"></path><path d="M4 4v4h4"></path><path d="M4 13a8 8 0 0 0 14.9 4"></path><path d="M20 20v-4h-4"></path>',
  chevronLeft: '<path d="m15 18-6-6 6-6"></path>',
  chevronRight: '<path d="m9 18 6-6-6-6"></path>',
  close: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>',
  edit: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
  trash: '<path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  help: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path>'
};

const state = {
  theme: 'light',
  activeView: 'overview',
  loading: false,
  sidebarCollapsed: false,
  auth: {
    loading: true,
    authenticated: false,
    bootstrapRequired: false,
    cloudReady: true,
    mode: 'unavailable',
    modeLabel: '待检测',
    writeNotice: '',
    user: null,
    permissions: null
  },
  meta: null,
  health: null,
  currentData: null,
  error: '',
  viewUi: {}
};

const refs = {
  bootSplash: document.getElementById('boot-splash'),
  authRoot: document.getElementById('auth-root'),
  app: document.getElementById('app'),
  nav: document.getElementById('sidebar-nav'),
  topbarKicker: document.getElementById('topbar-kicker'),
  topbarBreadcrumb: document.getElementById('topbar-breadcrumb'),
  viewTitle: document.getElementById('view-title'),
  statusPill: document.getElementById('status-pill'),
  topbarStatus: document.querySelector('.topbar-status'),
  sidebarCollapse: document.getElementById('sidebar-collapse'),
  themeToggle: document.getElementById('theme-toggle'),
  sidebarLogout: document.getElementById('sidebar-logout'),
  topbarSearch: document.getElementById('topbar-search'),
  topbarAlerts: document.getElementById('topbar-alerts'),
  refreshView: document.getElementById('refresh-view'),
  toolbarActions: document.querySelector('.toolbar-actions'),
  content: document.getElementById('content')
};

let authVisualCleanup = null;
let bootSplashDismissed = false;
const CACHE_TTL = 5 * 60 * 1000;
const TABLE_RENDER_BATCH = 24;
const dataCache = {
  entries: new Map(),
  pending: new Map(),
  get(key) {
    const cached = this.entries.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      this.entries.delete(key);
      return null;
    }
    return cached;
  },
  set(key, value, version = '') {
    this.entries.set(key, {
      value,
      version,
      timestamp: Date.now()
    });
    return value;
  },
  invalidate(key) {
    this.entries.delete(key);
  },
  invalidatePrefix(prefix) {
    for (const key of this.entries.keys()) {
      if (key.startsWith(prefix)) {
        this.entries.delete(key);
      }
    }
  },
  clear() {
    this.entries.clear();
  }
};
const performanceMonitor = {
  marks: {},
  start(key) {
    this.marks[key] = performance.now();
  },
  end(key) {
    const startedAt = this.marks[key];
    if (!startedAt) return 0;
    const duration = performance.now() - startedAt;
    delete this.marks[key];
    console.log(`[perf] ${key}: ${duration.toFixed(2)}ms`);
    return duration;
  }
};

function getPageCacheVersion(pageData) {
  if (!pageData) return 'page:empty';
  return pageData._meta?.revision || `${getUpdatedAt(pageData)}:${Object.keys(pageData || {}).length}`;
}

function getCollectionCacheVersion(items = []) {
  const latestUpdatedAt = (items || [])
    .map((item) => getUpdatedAt(item))
    .filter(Boolean)
    .sort()
    .pop() || '';
  return `${items.length}:${latestUpdatedAt}`;
}

function withPendingCache(key, loader) {
  if (dataCache.pending.has(key)) {
    return dataCache.pending.get(key);
  }
  const task = Promise.resolve()
    .then(loader)
    .finally(() => dataCache.pending.delete(key));
  dataCache.pending.set(key, task);
  return task;
}

const preloadManager = {
  queue: new Set(),
  timer: null,
  isRunning: false,
  add(viewKey) {
    if (!viewKey || !VIEW_CONFIG[viewKey] || viewKey === state.activeView) return;
    this.queue.add(viewKey);
  },
  schedule(delay = 180) {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.timer = null;
      this.execute().catch((error) => {
        console.warn('[preload] 预加载任务异常:', error);
      });
    }, delay);
  },
  async execute() {
    if (this.isRunning || !this.queue.size || !state.meta) return;
    this.isRunning = true;
    const queue = [...this.queue];
    this.queue.clear();

    for (const viewKey of queue) {
      try {
        if (viewKey === 'overview') {
          if (!dataCache.get('overview')?.value) {
            await loadOverviewData();
          }
        } else {
          const view = VIEW_CONFIG[viewKey];
          if (view && !dataCache.get(`module:${viewKey}`)?.value) {
            await loadModuleData(view);
          }
        }
      } catch (error) {
        console.warn(`[preload] ${viewKey} 预加载失败:`, error);
      }

      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }

    this.isRunning = false;
    if (this.queue.size) {
      this.schedule(120);
    }
  },
  preloadView(viewKey, delay = 120) {
    this.add(viewKey);
    this.schedule(delay);
  },
  preloadAdjacent(currentViewKey) {
    const visibleItems = getVisibleNavItems();
    const currentIndex = visibleItems.findIndex((item) => item.key === currentViewKey);
    if (currentIndex === -1) return;

    [visibleItems[currentIndex - 1], visibleItems[currentIndex + 1]]
      .filter(Boolean)
      .forEach((item) => this.add(item.key));

    this.schedule(260);
  }
};

function getVisibleRowCount(collectionKey) {
  const ui = getViewUi();
  ui.visibleCounts = ui.visibleCounts || {};
  return ui.visibleCounts[collectionKey] || TABLE_RENDER_BATCH;
}

function increaseVisibleRowCount(collectionKey) {
  const ui = getViewUi();
  ui.visibleCounts = ui.visibleCounts || {};
  ui.visibleCounts[collectionKey] = getVisibleRowCount(collectionKey) + TABLE_RENDER_BATCH;
}

function resetVisibleRowCount(collectionKey) {
  const ui = getViewUi();
  ui.visibleCounts = ui.visibleCounts || {};
  ui.visibleCounts[collectionKey] = TABLE_RENDER_BATCH;
}

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
  return 'light';
}

function preferredSidebarCollapsed() {
  return localStorage.getItem('admin-web-sidebar') === 'collapsed';
}

function applyTheme(theme) {
  state.theme = 'light';
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.removeItem('admin-web-theme');
  if (refs.themeToggle) {
    refs.themeToggle.textContent = '亮色主题';
    refs.themeToggle.title = '当前固定为亮色主题';
    refs.themeToggle.setAttribute('aria-label', refs.themeToggle.title);
  }
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

function dismissBootSplash() {
  if (bootSplashDismissed || !refs.bootSplash) return;
  bootSplashDismissed = true;
  refs.bootSplash.dataset.state = 'exit';
  window.setTimeout(() => {
    refs.bootSplash?.classList.add('is-hidden');
  }, 320);
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
      const error = new Error(payload.message || `请求失败: ${response.status}`);
      error.statusCode = response.status;
      error.code = payload.code || '';
      error.data = payload.data || null;
      if (response.status === 401) {
        state.auth.authenticated = false;
        state.auth.user = null;
        state.auth.permissions = null;
      }
      throw error;
    }
    return payload;
  });
}

function applyAuthShell(locked) {
  document.body.dataset.screen = locked ? 'auth' : 'app';
  refs.app.dataset.auth = locked ? 'locked' : 'ready';
  if (locked) {
    document.body.classList.remove('modal-open');
  } else if (refs.authRoot) {
    refs.authRoot.innerHTML = '';
  }
}

function isPrimaryAdminAccount() {
  const loginAccount = String(state.auth?.user?.loginAccount || '').trim().toLowerCase();
  return loginAccount === 'admin' || state.auth?.user?.role === 'owner';
}

function getVisibleNavItems() {
  const permissions = state.auth?.permissions || {};
  return NAV_ITEMS.filter((item) => {
    if (item.key === 'accounts') {
      return Boolean(permissions.canManageUsers) && isPrimaryAdminAccount();
    }
    if (item.key === 'overview') {
      return Boolean(permissions.canRead);
    }
    return Boolean(permissions.canRead);
  });
}

function renderLockedSidebar() {
  refs.nav.innerHTML = `<button class="nav-item active nav-item-locked" type="button" aria-label="登录后台" disabled>
    <span class="nav-label">登录后台</span>
  </button>`;
}

function ensureActiveViewAvailable() {
  const visibleItems = getVisibleNavItems();
  if (visibleItems.some((item) => item.key === state.activeView)) {
    return;
  }
  state.activeView = visibleItems[0]?.key || 'overview';
}

function getPermissionLabel() {
  if (state.auth?.user?.roleLabel) return state.auth.user.roleLabel;
  const role = state.auth?.user?.role || '';
  if (role === 'owner') return '系统所有者';
  if (role === 'admin') return '管理员';
  if (role === 'publisher') return '发布老师';
  if (role === 'viewer') return '查看者';
  return '编辑老师';
}

function renderAuthScreen(message = '') {
  applyAuthShell(true);
  if (typeof authVisualCleanup === 'function') {
    authVisualCleanup();
    authVisualCleanup = null;
  }
  const { bootstrapRequired, cloudReady } = state.auth;
  const helper = !cloudReady
    ? (state.auth.writeNotice || '当前后台还没有接上可写数据源，请先检查云环境配置。')
    : bootstrapRequired
      ? '首次使用，请先创建管理员账号。'
      : '请输入账号和密码登录。';
  const title = !cloudReady ? '暂未连接' : bootstrapRequired ? '创建管理员' : '欢迎回来';
  const subtitle = !cloudReady ? `${state.auth.modeLabel || '云环境未就绪'}，暂不可进入正式工作台` : bootstrapRequired ? '设置第一个管理员账号' : '请输入登录信息';
  renderLockedSidebar();
  refs.topbarKicker.textContent = '登录';
  refs.topbarBreadcrumb.textContent = '后台登录';
  refs.viewTitle.textContent = bootstrapRequired ? '创建管理员' : '老师登录';
  setStatus(cloudReady ? (bootstrapRequired ? '等待创建管理员' : '等待登录') : '正在连接系统...', cloudReady ? 'ok' : 'warn');
  refs.content.innerHTML = '';
  refs.authRoot.innerHTML = `<section class="auth-shell">
    <div class="auth-visual" data-auth-visual>
      <div class="auth-brand">
        <div class="auth-brand-mark">启</div>
        <div class="auth-brand-copy">
          <strong>CareerCompass</strong>
        </div>
      </div>
      <div class="auth-hero">
        <div class="auth-hero-copy">
          <h2>乘帆启航</h2>
        </div>
        <div class="auth-scene" aria-hidden="true" data-auth-scene>
          <div class="auth-figure auth-figure-a" data-auth-figure>
            <span class="eye-row">
              <i class="eye"><span class="eye-pupil"></span></i>
              <i class="eye"><span class="eye-pupil"></span></i>
            </span>
          </div>
          <div class="auth-figure auth-figure-b" data-auth-figure>
            <span class="eye-row">
              <i class="eye"><span class="eye-pupil"></span></i>
              <i class="eye"><span class="eye-pupil"></span></i>
            </span>
          </div>
          <div class="auth-figure auth-figure-c" data-auth-figure>
            <span class="eye-row">
              <i class="eye"><span class="eye-pupil"></span></i>
              <i class="eye"><span class="eye-pupil"></span></i>
            </span>
          </div>
          <div class="auth-figure auth-figure-d" data-auth-figure>
            <span class="eye-row">
              <i class="eye"><span class="eye-pupil"></span></i>
              <i class="eye"><span class="eye-pupil"></span></i>
            </span>
            <b></b>
          </div>
        </div>
      </div>
    </div>
    <div class="auth-panel">
      <div class="auth-panel-inner">
        <div class="auth-heading">
          <div class="auth-heading-dot"></div>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        ${!cloudReady || bootstrapRequired ? `<div class="auth-note">${escapeHtml(helper)}</div>` : ''}
        ${message ? `<div class="auth-feedback error">${escapeHtml(message)}</div>` : ''}
        ${!cloudReady ? `
          <div class="auth-disabled-card">
            <strong>当前状态</strong>
            <span>${escapeHtml(state.auth.writeNotice || '未检测到可用的 CloudBase 云环境配置。')}</span>
          </div>
        ` : `
          <form class="auth-form" data-auth-form="${bootstrapRequired ? 'bootstrap' : 'login'}">
            ${bootstrapRequired ? `
              <label class="auth-field">
                <span>老师姓名</span>
                <input name="name" type="text" placeholder="例如：陈老师" autocomplete="name" />
              </label>
            ` : ''}
            <label class="auth-field">
              <span>${bootstrapRequired ? '管理员账号' : '用户名'}</span>
              <input name="loginAccount" type="text" placeholder="请输入用户名" autocomplete="username" />
            </label>
            <label class="auth-field auth-field-password">
              <span>密码</span>
              <div class="auth-password-input">
                <input name="password" type="password" placeholder="••••••••" autocomplete="${bootstrapRequired ? 'new-password' : 'current-password'}" />
                <button class="auth-password-toggle" type="button" data-action="toggle-password" aria-label="显示或隐藏密码" aria-pressed="false">
                  ${icon('eye')}
                </button>
              </div>
            </label>
            <div class="auth-form-meta">
              <label class="auth-check">
                <input type="checkbox" name="remember" ${bootstrapRequired ? '' : 'checked'} />
                <span>记住我30天</span>
              </label>
              <button class="auth-text-action" type="button" data-action="forgot-password">忘记密码？请联系管理员</button>
            </div>
            <button class="auth-submit" type="submit">${bootstrapRequired ? '创建管理员并进入系统' : '开始畅游！'}</button>
            <div class="auth-form-footer">
              <span>${escapeHtml(bootstrapRequired ? '首个管理员创建成功后，将直接以系统所有者身份进入工作台。' : 'Need access? Contact the system admin to create or reset your account.')}</span>
            </div>
          </form>
        `}
      </div>
    </div>
  </section>`;
  dismissBootSplash();
  initAuthVisualMotion();
  syncModalState();
}

function initAuthVisualMotion() {
  if (typeof authVisualCleanup === 'function') {
    authVisualCleanup();
    authVisualCleanup = null;
  }
  const shell = refs.authRoot?.querySelector('.auth-shell');
  const scene = refs.authRoot?.querySelector('[data-auth-scene]');
  const visual = refs.authRoot?.querySelector('[data-auth-visual]');
  if (!shell || !scene || !visual) return;

  const passwordInput = refs.authRoot.querySelector('.auth-form input[name="password"]');
  const eyeRows = Array.from(scene.querySelectorAll('.eye-row'));
  const maxOffset = 7.5;

  const resetEyes = () => {
    eyeRows.forEach((row) => {
      row.style.setProperty('--eye-offset-x', '0px');
      row.style.setProperty('--eye-offset-y', '0px');
    });
  };

  const handlePointerMove = (event) => {
    if (shell.classList.contains('is-password-focus')) return;
    eyeRows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.max(Math.hypot(deltaX, deltaY), 1);
      const offsetX = Math.max(-maxOffset, Math.min(maxOffset, (deltaX / distance) * maxOffset));
      const offsetY = Math.max(-maxOffset, Math.min(maxOffset, (deltaY / distance) * maxOffset));
      row.style.setProperty('--eye-offset-x', `${offsetX.toFixed(2)}px`);
      row.style.setProperty('--eye-offset-y', `${offsetY.toFixed(2)}px`);
    });
  };

  const handlePointerLeave = () => {
    if (!shell.classList.contains('is-password-focus')) {
      resetEyes();
    }
  };

  const handlePasswordFocus = () => {
    shell.classList.add('is-password-focus');
    resetEyes();
  };

  const handlePasswordBlur = () => {
    shell.classList.remove('is-password-focus');
    resetEyes();
  };

  visual.addEventListener('mousemove', handlePointerMove);
  visual.addEventListener('mouseleave', handlePointerLeave);
  if (passwordInput) {
    passwordInput.addEventListener('focus', handlePasswordFocus);
    passwordInput.addEventListener('blur', handlePasswordBlur);
  }

  authVisualCleanup = () => {
    visual.removeEventListener('mousemove', handlePointerMove);
    visual.removeEventListener('mouseleave', handlePointerLeave);
    if (passwordInput) {
      passwordInput.removeEventListener('focus', handlePasswordFocus);
      passwordInput.removeEventListener('blur', handlePasswordBlur);
    }
  };
}

function renderSessionControl() {
  if (!refs.toolbarActions) return;
  const user = state.auth?.user;
  if (state.auth?.authenticated && typeof authVisualCleanup === 'function') {
    authVisualCleanup();
    authVisualCleanup = null;
  }
  if (!state.auth?.authenticated || !user) {
    if (refs.sidebarLogout) {
      refs.sidebarLogout.classList.add('is-hidden');
      refs.sidebarLogout.innerHTML = `${icon('logout')}<span>退出登录</span>`;
    }
    refs.toolbarActions.innerHTML = '';
  } else {
    if (refs.sidebarLogout) {
      refs.sidebarLogout.classList.remove('is-hidden');
      refs.sidebarLogout.innerHTML = `${icon('logout')}<span>退出 ${escapeHtml(user.name || user.loginAccount || '当前账号')}</span>`;
    }
    refs.toolbarActions.innerHTML = `
      <div class="topbar-session">
        <div class="topbar-session-copy">
          <strong>${escapeHtml(user.name || user.loginAccount || '后台老师')}</strong>
          <span>${escapeHtml(getPermissionLabel())}</span>
        </div>
        <button class="topbar-session-action" type="button" data-action="logout">退出登录</button>
      </div>
      <button id="help-button" class="topbar-icon-button" type="button" aria-label="帮助" title="查看帮助文档">${icon('help')}</button>
      <button id="refresh-view" class="topbar-icon-button" type="button" aria-label="刷新"></button>
    `;
  }
  refs.topbarSearch = document.getElementById('topbar-search');
  refs.topbarAlerts = document.getElementById('topbar-alerts');
  refs.refreshView = document.getElementById('refresh-view');
  if (refs.topbarSearch) {
    refs.topbarSearch.innerHTML = icon('search');
  }
  if (refs.topbarAlerts) {
    refs.topbarAlerts.innerHTML = `${icon('bell')}<span class="topbar-dot" aria-hidden="true"></span>`;
  }
  if (refs.refreshView) {
    refs.refreshView.innerHTML = icon('refresh');
  }
}

async function loadAuthState() {
  state.auth.loading = true;
  const result = await request('/api/auth/status');
  state.auth.loading = false;
  state.auth.authenticated = Boolean(result.data?.authenticated);
  state.auth.bootstrapRequired = Boolean(result.data?.bootstrapRequired);
  state.auth.cloudReady = result.data?.cloudReady !== false;
  state.auth.mode = result.data?.mode || 'unavailable';
  state.auth.modeLabel = result.data?.modeLabel || '待检测';
  state.auth.writeNotice = result.data?.writeNotice || '';
  state.auth.user = result.data?.user || null;
  state.auth.permissions = result.data?.permissions || null;
  ensureActiveViewAvailable();
  return state.auth;
}

async function submitLogin(formData) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      loginAccount: String(formData.get('loginAccount') || '').trim(),
      password: String(formData.get('password') || '')
    })
  });
}

async function submitBootstrap(formData) {
  return request('/api/auth/bootstrap', {
    method: 'POST',
    body: JSON.stringify({
      name: String(formData.get('name') || '').trim(),
      loginAccount: String(formData.get('loginAccount') || '').trim(),
      password: String(formData.get('password') || '')
    })
  });
}

async function logoutCurrentUser() {
  await request('/api/auth/logout', { method: 'POST' });
  await loadAuthState();
  renderSessionControl();
  renderAuthScreen('已退出当前后台账号。');
}

async function handleAuthFormSubmit(form) {
  const mode = form.dataset.authForm;
  const formData = new FormData(form);
  try {
    setStatus(mode === 'bootstrap' ? '正在创建管理员...' : '正在登录后台...', 'loading');
    if (mode === 'bootstrap') {
      await submitBootstrap(formData);
    } else {
      await submitLogin(formData);
    }
    await loadAuthState();
    renderSessionControl();
    if (state.auth.authenticated) {
      applyAuthShell(false);
      await hydrateMeta();
      await renderActiveView(true);
      setStatus(mode === 'bootstrap' ? '管理员已创建并登录' : '登录成功');
      finishBootAnimation();
    } else {
      renderAuthScreen('登录未完成，请检查账号状态。');
    }
  } catch (error) {
    renderAuthScreen(error.message || '登录失败，请稍后重试。');
    setStatus(error.message || '登录失败', 'error');
  }
}

function handleAuthAction(button) {
  const { action } = button.dataset;
  if (action === 'toggle-password') {
    const field = button.closest('.auth-password-input');
    const input = field?.querySelector('input[name="password"]');
    if (!input) return true;
    const nextType = input.type === 'password' ? 'text' : 'password';
    input.type = nextType;
    button.setAttribute('aria-pressed', nextType === 'text' ? 'true' : 'false');
    field.classList.toggle('is-visible', nextType === 'text');
    return true;
  }

  if (action === 'forgot-password') {
    setStatus('请联系系统管理员重置后台密码。', 'warn');
    return true;
  }

  return false;
}

function getViewUi(viewKey = state.activeView) {
  if (!state.viewUi[viewKey]) {
    state.viewUi[viewKey] = {
      selectedIds: {},
      drafts: {},
      filters: {},
      roleFilters: {},
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

const QUESTION_BANK_UPLOAD_ACCEPT = [
  '.pdf',
  '.doc',
  '.docx',
  '.xlsx',
  '.csv',
  '.json',
  '.txt',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/plain',
  'application/json'
].join(',');

const QUESTION_BANK_DIRECTIONS = [
  { key: 'medical', label: '医护', shortLabel: '医护', heroTitle: '医护题库工作台', summary: '适合护理、医学基础与医护综合练习整理。' },
  { key: 'math', label: '高数', shortLabel: '高数', heroTitle: '高数题库工作台', summary: '适合高等数学、公式训练与题型归档整理。' }
];

const QUESTION_BANK_IMPORT_GUIDES = {
  excel: {
    label: 'Excel 表格',
    hint: '最省心的方式，题号、题目、选项、答案分列放好，系统会自动识别方向和题型。',
    sample: '题号 | 题目内容 | 选项A | 选项B | 选项C | 选项D | 答案 | 解析'
  },
  word: {
    label: 'Word 文档',
    hint: '老师最常发来的题目清单，按“题目 + 选项 + 答案 + 解析”排版即可。',
    sample: '1. 患者出现发热症状，首先考虑（  ）\nA. 发热\nB. 咳嗽\n答案：A\n解析：根据临床表现...'
  },
  pdf: {
    label: 'PDF 讲义',
    hint: '文字版 PDF 可直接上传，系统会尽量提取题目并整理成可编辑题库。',
    sample: '适合已经排版好的讲义、整卷或往年真题 PDF。'
  },
  text: {
    label: '纯文本',
    hint: '复制讲义、群消息或文档内容也可以，系统会按题号、选项、答案自动整理。',
    sample: '1. 题目内容\\nA. 选项A\\nB. 选项B\\n答案：A\\n解析：……'
  }
};

function normalizeQuestionBankDirection(value = 'medical') {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return 'medical';
  if (['medical', '医护', '护理', '医学', '综合'].includes(raw)) return 'medical';
  if (['math', '数学', '高数', '高等数学'].includes(raw)) return 'math';
  return 'medical';
}

function getQuestionBankDirectionMeta(direction = 'medical') {
  return QUESTION_BANK_DIRECTIONS.find((item) => item.key === normalizeQuestionBankDirection(direction)) || QUESTION_BANK_DIRECTIONS[0];
}

function getQuestionBankWorkspaceUi() {
  const ui = getViewUi('questionBank');
  if (!ui.questionDirection) {
    ui.questionDirection = 'medical';
  }
  if (!ui.questionImportGuide || !QUESTION_BANK_IMPORT_GUIDES[ui.questionImportGuide]) {
    ui.questionImportGuide = 'excel';
  }
  return ui;
}

function getQuestionBankActiveDirection() {
  return normalizeQuestionBankDirection(getQuestionBankWorkspaceUi().questionDirection || 'medical');
}

function getQuestionBankDirectionItems(items = [], direction = getQuestionBankActiveDirection()) {
  const normalizedDirection = normalizeQuestionBankDirection(direction);
  return (items || []).filter((item) => normalizeQuestionBankDirection(item.direction || 'medical') === normalizedDirection);
}

function getQuestionBankWorkspaceData(collections = {}, direction = getQuestionBankActiveDirection()) {
  return {
    medicalQuestions: getQuestionBankDirectionItems(collections.medicalQuestions || [], direction),
    pastPapers: getQuestionBankDirectionItems(collections.pastPapers || [], direction),
    questionImports: getQuestionBankDirectionItems(collections.questionImports || [], direction)
  };
}

function getQuestionBankStats(collections = {}, direction = getQuestionBankActiveDirection()) {
  const scoped = getQuestionBankWorkspaceData(collections, direction);
  return {
    questionCount: scoped.medicalQuestions.length,
    publishedQuestionCount: scoped.medicalQuestions.filter((item) => (item.status || 'draft') === 'published').length,
    paperCount: scoped.pastPapers.length,
    importCount: scoped.questionImports.length,
    draftImportCount: scoped.questionImports.filter((item) => (item.status || 'draft') !== 'published').length
  };
}

function getQuestionBankImportUi() {
  const ui = getQuestionBankWorkspaceUi();
  const direction = getQuestionBankActiveDirection();
  if (!ui.fileImportByDirection) {
    ui.fileImportByDirection = {};
  }
  if (!ui.fileImportByDirection[direction]) {
    ui.fileImportByDirection[direction] = {
      fileName: '',
      filePayload: null,
      preview: null,
      lastSummary: null,
      isSubmitting: false
    };
  }
  return ui.fileImportByDirection[direction];
}

function resetQuestionBankImportUi(options = {}) {
  const { keepLastSummary = true } = options;
  const ui = getQuestionBankImportUi();
  ui.fileName = '';
  ui.filePayload = null;
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
    reader.onerror = () => reject(new Error('读取题库文件失败，请重新选择。'));
    reader.readAsText(file, 'utf-8');
  });
}

function readBinaryFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const [, base64 = ''] = result.split(',');
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('读取题库文件失败，请重新选择。'));
    reader.readAsDataURL(file);
  });
}

function isQuestionBankBinaryFile(file) {
  return /\.(pdf|doc|docx|xlsx|xls)$/i.test(file?.name || '');
}

async function buildQuestionBankFilePayload(file) {
  if (!file) return null;
  const payload = {
    fileName: file.name,
    direction: getQuestionBankActiveDirection()
  };

  if (isQuestionBankBinaryFile(file)) {
    payload.fileContentBase64 = await readBinaryFileAsBase64(file);
    payload.textContent = '';
    return payload;
  }

  const textContent = await readTextFile(file);
  if (!textContent.trim()) {
    throw new Error('题库文件内容为空，请检查后再上传。');
  }
  payload.textContent = textContent;
  payload.fileContentBase64 = '';
  return payload;
}

async function previewQuestionBankImportFile(file) {
  if (!file) return;
  const payload = await buildQuestionBankFilePayload(file);
  setStatus('正在识别并整理题库文件...', 'loading');
  const result = await request('/api/import/question-bank-file/preview', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const ui = getQuestionBankWorkspaceUi();
  const importUi = getQuestionBankImportUi();
  importUi.fileName = file.name;
  importUi.filePayload = payload;
  importUi.preview = result.data || null;
  ui.openEditors.questionBankCsvImport = true;

  renderModule(VIEW_CONFIG[state.activeView], state.currentData);
  const invalidCount = Number(result.data?.invalidCount || 0);
  if (invalidCount > 0) {
    setStatus(`文件已载入，发现 ${invalidCount} 行需要修正。`, 'error');
    return;
  }

  setStatus(`题库文件已整理完成，共 ${result.data?.validCount || 0} 行可导入。`);
}

async function commitQuestionBankImport() {
  const ui = getQuestionBankWorkspaceUi();
  const importUi = getQuestionBankImportUi();
  if (!importUi.filePayload || !importUi.preview) {
    throw new Error('请先选择题库文件并完成预览。');
  }
  if (Number(importUi.preview.invalidCount || 0) > 0) {
    throw new Error('当前文件仍有错误，请先修正后再导入。');
  }

  importUi.isSubmitting = true;
  renderModule(VIEW_CONFIG[state.activeView], state.currentData);
  setStatus('正在导入题库文件...', 'loading');

  try {
    const result = await request('/api/import/question-bank-file/commit', {
      method: 'POST',
      body: JSON.stringify(importUi.filePayload)
    });
    importUi.lastSummary = result.data || null;
    resetQuestionBankImportUi();
    ui.openEditors.questionBankCsvImport = false;
    await renderActiveView(true);
    setStatus(`题库导入完成，新增 ${result.data?.createdCount || 0} 题，更新 ${result.data?.updatedCount || 0} 题。`);
  } catch (error) {
    importUi.isSubmitting = false;
    renderModule(VIEW_CONFIG[state.activeView], state.currentData);
    throw error;
  }
}

function getCollectionMeta(collectionKey) {
  return state.meta?.listOptions?.find((item) => item.key === collectionKey) || { key: collectionKey, label: collectionKey };
}

function normalizeFieldList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') return item.label || item.name || item.title || item.id || '';
        return '';
      })
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[\n,，|/、]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getPrimaryLabel(item, collectionKey) {
  if (!item) return '未命名';
  if (collectionKey === 'adminUsers') return item.name || item.loginAccount || item._id || '未命名账号';
  if (collectionKey === 'directions') return item.name || item.slug || item._id || '未命名方向';
  if (collectionKey === 'medicalQuestions') return item.stem || item.questionId || item._id || '未命名题目';
  if (collectionKey === 'pastPapers') return item.title || item.paperId || item._id || '未命名试卷';
  if (collectionKey === 'questionImports') return item.title || item.sourceType || item._id || '未命名导入';
  if (collectionKey === 'teachers') return item.name || item.role || item._id || '未命名老师';
  if (collectionKey === 'successCases') return item.studentName || item.listTitle || item.title || item._id || '未命名案例';
  if (collectionKey === 'materialPackages') return item.title || item.badge || item._id || '未命名套系包';
  if (collectionKey === 'materialItems') return item.title || item.subtitle || item._id || '未命名单品';
  if (collectionKey === 'mediaAssets') return item.name || item.alt || item.url || item._id || '未命名资源';
  return item.title || item.name || item.label || item._id || '未命名条目';
}

function getSecondaryLabel(item, collectionKey) {
  if (!item) return '';
  if (collectionKey === 'adminUsers') return [item.roleLabel || item.role, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'directions') return [item.category, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'medicalQuestions') return [item.direction, item.questionType, item.year, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'pastPapers') return [item.direction, item.year, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'questionImports') return [item.direction, item.sourceType, item.status].filter(Boolean).join(' / ');
  if (collectionKey === 'teachers') return [item.role, item.tag].filter(Boolean).join(' / ');
  if (collectionKey === 'successCases') return [item.direction, ...normalizeFieldList(item.pathTags).slice(0, 2), item.year].filter(Boolean).join(' / ');
  if (collectionKey === 'materialPackages') return [item.direction, item.stage].filter(Boolean).join(' / ');
  if (collectionKey === 'materialItems') return [item.direction, item.stage, item.type].filter(Boolean).join(' / ');
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
  _id: '内容编号',
  siteName: '站点名称',
  brandName: '品牌名称',
  contactPhone: '联系电话',
  contactWechat: '微信号',
  contactQrcode: '二维码链接',
  contactQrcodeUrl: '二维码图片地址',
  address: '地址',
  serviceHours: '服务时间',
  intro: '机构简介',
  hero: '首页大屏主视觉',
  chip: '首页大屏小角标',
  title: '标题',
  highlightTitle: '主标题第二行',
  desc: '说明',
  secondaryNote: '补充说明',
  backgroundImageUrl: '背景图地址',
  backgroundImageSeed: '背景图备用标识',
  imageUrl: '图片地址',
  imageSeed: '图片备用标识',
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
  featuredDirectionIds: '热门方向卡片',
  moreDirectionCard: '更多方向卡片',
  environmentSection: '校区环境（咨询区上方）',
  subtitle: '副标题',
  cards: '卡片',
  cta: '底部咨询区（环境下方）',
  buttonText: '按钮文案',
  footnote: '底部说明',
  categories: '分类',
  suggestions: '建议',
  pathTabs: '路径筛选标签',
  featuredSection: '首推案例区',
  listSection: '案例列表区',
  loadMoreText: '加载更多文案',
  supportSection: '深色支持区',
  ctaByDirection: '分方向 CTA',
  header: '顶部标题区',
  searchLabel: '搜索按钮提示',
  directionTabs: '顶部方向切换',
  stageTabs: '阶段切换按钮',
  mainSection: '主推套系区',
  sideNote: '右侧提示',
  shelfSection: '资料货架区',
  hint: '滑动提示',
  consultBar: '底部咨询条',
  introCard: '介绍卡片',
  features: '优势项',
  stats: '成果统计',
  values: '理念内容',
  environmentImages: '环境图片',
  details: '详细介绍',
  accentStart: '封面渐变起始色',
  accentEnd: '封面渐变结束色',
  questionBank: '题库配置',
  dailyQuestionCard: '每日一题页',
  pastPapersCard: '模拟题页',
  wrongBookCard: '错题本页',
  taskSection: '主任务区',
  queueSection: '复习队列区',
  pendingLabel: '待复习标签',
  todayLabel: '今日新增标签',
  totalLabel: '累计错题标签',
  eyebrow: '主任务标题',
  reasonLabel: '优先原因标题',
  estimateLabel: '预计耗时标题',
  sourceLabel: '来源标题',
  lastAnsweredLabel: '上次作答标题',
  answerLabel: '我的答案标题',
  primaryButtonText: '主按钮文案',
  secondaryButtonText: '次按钮文案',
  sortHint: '排序提示',
  masteredLabel: '已掌握标签',
  emptyTitle: '空状态标题',
  emptyDesc: '空状态说明',
  importGuide: '导入说明',
  templateText: '模板文本',
  questionId: '题目编号',
  loginAccount: '后台登录账号',
  password: '登录密码',
  hasPassword: '已设置密码',
  authChannels: '登录方式',
  lastLoginAt: '最近登录时间',
  direction: '方向',
  pathTags: '路径标签',
  studentName: '学生姓名',
  studentAvatarText: '头像文字',
  scoreGain: '提分标签',
  scoreLabel: '成绩标签',
  startingLabel: '起点说明',
  startingScore: '起点成绩',
  finalLabel: '结果说明',
  finalScore: '最终成绩',
  quote: '案例原话',
  fitAudience: '适合参考人群',
  listTitle: '列表标题',
  listDesc: '列表说明',
  detailButtonText: '详情按钮文案',
  startingLabel: '起点说明',
  startingScore: '起点成绩',
  finalLabel: '结果说明',
  finalScore: '最终成绩',
  quote: '案例原话',
  fitAudience: '适合参考人群',
  listTitle: '列表标题',
  listDesc: '列表说明',
  questionType: '题型',
  stem: '题干',
  options: '选项',
  answer: '答案',
  explanation: '解析',
  paperId: '所属试卷',
  questionIds: '题目编号列表',
  sourceType: '来源类型',
  rawText: '纯文本内容',
  name: '名称',
  slug: '内容标识',
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
  avatarUrl: '头像图片地址',
  avatarSeed: '头像备用图标识',
  specialties: '擅长',
  coverUrl: '封面图片地址',
  coverSeed: '封面备用图标识',
  year: '年份',
  accent: '主题色',
  badge: '角标文案',
  target: '适合人群',
  solves: '解决问题',
  contentItemIds: '套系包含资料',
  items: '条目',
  type: '类型',
  stage: '阶段',
  module: '所属模块',
  thumbUrl: '缩略图地址',
  alt: '替代文本'
};

const TEXTAREA_FIELDS = new Set(['desc', 'intro', 'summary', 'subtitle', 'audience', 'footnote', 'stem', 'explanation', 'rawText', 'templateText']);
const LINE_LIST_FIELDS = new Set([
  'tags',
  'chips',
  'categories',
  'suggestions',
  'pathTags',
  'features',
  'featuredDirectionIds',
  'contentItemIds',
  'specialties',
  'questionIds'
]);
const OBJECT_ARRAY_FIELDS = new Set([
  'overviewStats',
  'quickLinks',
  'advantages',
  'cards',
  'stats',
  'values',
  'environmentImages',
  'directionTabs',
  'stageTabs',
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
  directionTabs: { key: '', label: '', icon: '' },
  stageTabs: { key: '', label: '' },
  pathTabs: { key: '', label: '' },
  options: { id: '', text: '' },
  tags: '',
  categories: '',
  suggestions: '',
  pathTags: '',
  featuredDirectionIds: '',
  contentItemIds: '',
  specialties: '',
  questionIds: ''
};
const QUESTION_BANK_COLLECTION_SCOPES = new Set([
  'collection:medicalQuestions',
  'collection:pastPapers',
  'collection:questionImports'
]);
const STRUCTURED_FIELD_DEFAULTS = {
  'page:questionBank': {
    wrongBookCard: {
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
    }
  },
  'collection:medicalQuestions': {
    questionId: '',
    direction: 'medical',
    questionType: 'single_choice',
    year: new Date().getFullYear(),
    paperId: '',
    status: 'draft',
    sort: 100,
    stem: '',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' }
    ],
    answer: '',
    explanation: '',
    tags: []
  },
  'collection:pastPapers': {
    paperId: '',
    title: '',
    year: new Date().getFullYear(),
    direction: 'medical',
    status: 'draft',
    sort: 100,
    description: '',
    questionIds: []
  },
  'collection:questionImports': {
    title: '',
    direction: 'medical',
    sourceType: 'paper',
    status: 'draft',
    sort: 100,
    rawText: '',
    note: ''
  }
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
    { value: 'math', label: '高等数学' },
    { value: 'medical', label: '医护综合' }
  ],
  stage: [
    { value: 'foundation', label: '基础阶段' },
    { value: 'reinforcement', label: '强化阶段' },
    { value: 'sprint', label: '冲刺阶段' }
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
  type: [
    { value: 'image', label: '图片' },
    { value: 'video', label: '视频' },
    { value: 'file', label: '文件' }
  ]
};

const SCOPED_SELECT_FIELD_OPTIONS = {
  'collection:adminUsers': {
    role: [
      { value: 'viewer', label: '查看老师' },
      { value: 'editor', label: '编辑老师' },
      { value: 'publisher', label: '发布老师' },
      { value: 'admin', label: '管理员' }
    ],
    status: [
      { value: 'active', label: '可登录' },
      { value: 'disabled', label: '已停用' }
    ]
  }
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

const PAGE_SPECIFIC_HIDDEN_PATHS = {
  'page:teachers': new Set(['hero.imageUrl', 'hero.imageSeed'])
};

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
        desc: '对应四个入口下方的热门方向大卡片，按所选方向顺序展示。',
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
        keys: ['intro']
      },
      {
        title: '展示资源',
        desc: '对应师资卡片里的头像资源。',
        keys: ['avatarUrl', 'avatarSeed']
      }
    ]
  },
  'collection:materialPackages': {
    hero: {
      title: '资料套系信息',
      desc: '先确定套系标题、方向和适用阶段，再填写适合谁、解决什么问题以及套系里包含哪些资料。'
    },
    sections: [
      {
        title: '套系基础信息',
        desc: '对应教材页主推套系卡最先展示的标题、角标、方向与阶段。',
        keys: ['title', 'badge', 'direction', 'stage', 'status', 'sort']
      },
      {
        title: '适用人群与解决问题',
        desc: '建议直接按“适合谁 / 解决什么问题”去写，老师第一次接手也更容易理解。',
        keys: ['target', 'solves']
      },
      {
        title: '套系内容',
        desc: '卖点支持一行一条填写，套系包含资料可直接按名称选择，不需要手动填 ID。',
        keys: ['features', 'contentItemIds']
      }
    ]
  },
  'collection:materialItems': {
    hero: {
      title: '资料单项信息',
      desc: '这里对应教材页里的单张资料卡，先改标题、副标题和类型，再补说明和封面色。'
    },
    sections: [
      {
        title: '卡片基础信息',
        desc: '决定资料卡最先看到的标题、类型、方向与阶段。',
        keys: ['title', 'subtitle', 'type', 'direction', 'stage', 'status', 'sort']
      },
      {
        title: '文案说明',
        desc: '短说明适合卡片摘要，详细介绍适合继续展开后的补充内容。',
        keys: ['desc', 'details']
      },
      {
        title: '封面视觉',
        desc: '两种颜色会组成资料卡封面渐变，建议保持同色系搭配。',
        keys: ['accentStart', 'accentEnd']
      }
    ]
  },
  'collection:mediaAssets': {
    hero: {
      title: '素材资源信息',
      desc: '先维护资源名称、使用模块和链接地址，标签与缩略图放到后面，减少第一次上手时的理解压力。'
    },
    sections: [
      {
        title: '资源基础信息',
        desc: '先明确素材叫什么、会被哪个页面模块使用、当前是否发布。',
        keys: ['name', 'module', 'type', 'status', 'sort']
      },
      {
        title: '资源链接',
        desc: '主链接是实际资源地址，缩略图可选填，替代文本建议写成老师一眼能看懂的说明。',
        keys: ['url', 'thumbUrl', 'alt']
      },
      {
        title: '标签',
        desc: '一行一条填写，适合按页面、用途或主题给素材做归类。',
        keys: ['tags']
      }
    ]
  },
  'collection:adminUsers': {
    hero: {
      title: '后台账号信息',
      desc: '这里维护老师的登录账号、角色权限和启停状态。密码留空时会保留原密码。'
    },
    sections: [
      {
        title: '账号身份',
        desc: '对应老师在后台登录时使用的姓名和账号。',
        keys: ['name', 'loginAccount']
      },
      {
        title: '角色权限',
        desc: '决定这个老师进入 CMS 后能看、能改、能发布哪些内容。',
        keys: ['role', 'status']
      },
      {
        title: '登录安全',
        desc: '新建账号时请输入登录密码；编辑已有账号时留空表示不改密码。',
        keys: ['password']
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
        desc: '对应页面中间两张重点方向大卡片，按所选方向顺序展示。',
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
      desc: '这里维护的是师资页当前真实会显示的首屏标题说明、带学方式说明、老师协作亮点和底部咨询承接区。代表老师头像和下方老师条目来自“师资列表”。'
    },
    sections: [
      {
        title: '代表老师首屏',
        desc: '对应师资页顶部的大标题、说明和信任标签。',
        keys: ['hero']
      },
      {
        title: '带学方式说明',
        desc: '对应师资页首屏下方的说明卡，解释主讲、答疑和督学如何协同。',
        keys: ['introCard']
      },
      {
        title: '老师协作亮点',
        desc: '对应师资页中部的三张协作亮点卡片。',
        keys: ['features']
      }
    ],
    secondarySections: [
      {
        title: '底部咨询承接区',
        desc: '对应师资页最下方的咨询承接卡片。',
        keys: ['cta']
      }
    ],
    foldLabel: '师资页补充区块'
  },
  'page:success': {
    hero: {
      title: '成果页主配置',
      desc: '这里维护的是成果页首屏标题、方向切换、路径筛选、案例区、深色支持区和分方向 CTA。'
    },
    sections: [
      {
        title: '首屏标题区',
        desc: '对应成果页顶部的大标题和副标题。',
        keys: ['header']
      },
      {
        title: '切换与筛选',
        desc: '对应高数/医护切换和下方路径筛选标签。',
        keys: ['directionTabs', 'pathTabs']
      },
      {
        title: '案例区标题',
        desc: '对应首推案例区和案例列表区标题。',
        keys: ['featuredSection', 'listSection']
      }
    ],
    secondarySections: [
      {
        title: '深色支持区与 CTA',
        desc: '对应底部深色支持模块和高数/医护分方向 CTA。',
        keys: ['supportSection', 'ctaByDirection']
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
      desc: '这里维护的是资料页顶部切换、主推套系、资料货架和底部咨询条，页面会按方向和阶段切换实时对应。'
    },
    sections: [
      {
        title: '顶部区',
        desc: '对应资料页标题、搜索按钮、方向切换和阶段切换。',
        keys: ['header', 'directionTabs', 'stageTabs']
      },
      {
        title: '主推套系区',
        desc: '对应“核心主推套系”和右侧提示。',
        keys: ['mainSection']
      }
    ],
    secondarySections: [
      {
        title: '资料货架与咨询条',
        desc: '对应资料货架标题、滑动提示和底部咨询条。',
        keys: ['shelfSection', 'consultBar']
      }
    ],
    foldLabel: '资料页补充区块'
  },
  'page:questionBank': {
    hero: {
      title: '题库页主配置',
      desc: '这里维护的是三个题库子页面当前真实会显示的页面文案，错题本已经拆成状态概览、主任务和复习队列三层。'
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
        desc: '对应小程序错题本里的顶部状态概览、当前优先任务和下方复习队列。',
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
      desc: '先维护试卷标题、年份、方向和状态，再补题目编号列表和摘要说明。'
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

function mergeStructuredDefaults(currentValue, defaultValue) {
  if (currentValue === undefined && defaultValue === undefined) {
    return undefined;
  }

  if (defaultValue === undefined) {
    return cloneValue(currentValue);
  }

  if (currentValue === undefined) {
    return cloneValue(defaultValue);
  }

  if (Array.isArray(defaultValue) || Array.isArray(currentValue)) {
    return cloneValue(currentValue);
  }

  if (
    defaultValue &&
    typeof defaultValue === 'object' &&
    currentValue &&
    typeof currentValue === 'object'
  ) {
    const merged = { ...cloneValue(defaultValue), ...cloneValue(currentValue) };
    Object.keys(defaultValue).forEach((childKey) => {
      merged[childKey] = mergeStructuredDefaults(currentValue[childKey], defaultValue[childKey]);
    });
    return merged;
  }

  return cloneValue(currentValue);
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

function shouldJoinIndexedCharacters(fieldKey, value) {
  if (!Array.isArray(value) || !fieldKey) return false;
  if (LINE_LIST_FIELDS.has(fieldKey) || OBJECT_ARRAY_FIELDS.has(fieldKey)) return false;
  return value.length > 1 && value.every((item) => typeof item === 'string' && item.length <= 1);
}

function normalizeCmsValue(value, fieldKey = '') {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeCmsValue(item));
  }

  if (isIndexedObject(value)) {
    const normalized = Object.keys(value)
      .sort((left, right) => Number(left) - Number(right))
      .map((key) => normalizeCmsValue(value[key], key));
    return shouldJoinIndexedCharacters(fieldKey, normalized) ? normalized.join('') : normalized;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, itemValue]) => [key, normalizeCmsValue(itemValue, key)]));
  }

  return value;
}

function normalizeMediaAssetItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return item;
  const nextItem = { ...item };
  if (!nextItem.name && nextItem.title) nextItem.name = nextItem.title;
  if (!nextItem.module && nextItem.category) nextItem.module = nextItem.category;
  if (!nextItem.type) nextItem.type = 'image';
  delete nextItem.title;
  delete nextItem.category;
  return nextItem;
}

function normalizeCollectionItem(collectionKey, item) {
  const normalized = normalizeCmsValue(item);
  if (collectionKey === 'mediaAssets') {
    return normalizeMediaAssetItem(normalized);
  }
  return normalized;
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
    'hero.backgroundImageUrl': '首页大屏背景图地址',
    'hero.tags': '首页大屏标签',
    'hero.primaryButton': '首页大屏按钮',
    'hero.primaryButton.text': '首页大屏按钮文案',
    'hero.primaryButton.url': '首页大屏按钮打开页面',
    'hero.primaryButton.openType': '首页大屏按钮跳转方式',
    overviewStats: '首屏数据卡',
    'overviewStats.*': '数据卡',
    'overviewStats.*.value': '数据卡数值',
    'overviewStats.*.label': '数据卡标签',
    quickLinks: '首页四个功能入口',
    'quickLinks.*': '功能入口',
    'quickLinks.*.label': '入口标题',
    'quickLinks.*.url': '入口打开页面',
    'quickLinks.*.openType': '入口跳转方式',
    'quickLinks.*.icon': '入口图标标识',
    featuredDirectionIds: '热门方向卡片',
    advantages: '学习支持',
    'advantages.*': '学习支持卡片',
    'advantages.*.icon': '卡片图标标识',
    'advantages.*.title': '卡片标题',
    'advantages.*.desc': '卡片说明',
    environmentSection: '校区环境',
    'environmentSection.cards': '环境图片',
    'environmentSection.cards.*': '环境图片',
    'environmentSection.cards.*.label': '图片名称',
    'environmentSection.cards.*.imageUrl': '图片地址',
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
    featuredDirectionIds: '两张重点方向卡片',
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
    hero: '代表老师首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '代表老师首屏主标题',
    'hero.desc': '代表老师首屏说明',
    introCard: '带学方式说明',
    'introCard.title': '说明卡标题',
    'introCard.desc': '说明卡说明',
    features: '老师协作亮点',
    'features.*': '协作亮点卡',
    'features.*.title': '亮点标题',
    'features.*.desc': '亮点说明',
    cta: '底部咨询承接区',
    'cta.title': '承接区标题',
    'cta.desc': '承接区说明',
    'cta.buttonText': '承接按钮文案'
  },
  'page:success': {
    header: '首屏标题区',
    'header.title': '页面标题',
    'header.subtitle': '页面副标题',
    directionTabs: '方向切换',
    'directionTabs.*': '方向按钮',
    'directionTabs.*.key': '方向标识',
    'directionTabs.*.label': '方向名称',
    pathTabs: '路径筛选标签',
    'pathTabs.*': '路径标签',
    'pathTabs.*.key': '标签标识',
    'pathTabs.*.label': '标签名称',
    featuredSection: '首推案例区',
    'featuredSection.title': '区块标题',
    listSection: '案例列表区',
    'listSection.title': '列表标题',
    'listSection.loadMoreText': '加载更多文案',
    supportSection: '深色支持区',
    'supportSection.title': '区块标题',
    'supportSection.subtitle': '区块说明',
    'supportSection.items': '支持项',
    'supportSection.items.*': '支持卡片',
    'supportSection.items.*.icon': '图标标识',
    'supportSection.items.*.title': '标题',
    'supportSection.items.*.desc': '说明',
    ctaByDirection: '分方向 CTA',
    'ctaByDirection.math': '高数 CTA',
    'ctaByDirection.math.title': '标题',
    'ctaByDirection.math.desc': '说明',
    'ctaByDirection.math.buttonText': '按钮文案',
    'ctaByDirection.math.footnote': '补充说明',
    'ctaByDirection.medical': '医护 CTA',
    'ctaByDirection.medical.title': '标题',
    'ctaByDirection.medical.desc': '说明',
    'ctaByDirection.medical.buttonText': '按钮文案',
    'ctaByDirection.medical.footnote': '补充说明'
  },
  'page:about': {
    hero: '关于页首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '关于页主标题',
    'hero.desc': '关于页说明',
    'hero.imageUrl': '首屏配图地址',
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
    'environmentImages.*.imageUrl': '图片地址',
    cta: '底部咨询区',
    'cta.title': '咨询区标题',
    'cta.desc': '咨询区说明',
    'cta.buttonText': '咨询按钮文案'
  },
  'page:materials': {
    header: '顶部标题区',
    'header.title': '页面标题',
    'header.searchLabel': '搜索按钮提示',
    directionTabs: '顶部方向切换',
    'directionTabs.*': '方向切换项',
    'directionTabs.*.key': '切换标识',
    'directionTabs.*.label': '切换名称',
    'directionTabs.*.icon': '切换图标',
    stageTabs: '阶段切换按钮',
    'stageTabs.*': '阶段按钮',
    'stageTabs.*.key': '阶段标识',
    'stageTabs.*.label': '阶段名称',
    mainSection: '主推套系区',
    'mainSection.title': '区块标题',
    'mainSection.sideNote': '右侧提示',
    shelfSection: '资料货架区',
    'shelfSection.title': '货架标题',
    'shelfSection.hint': '滑动提示',
    consultBar: '底部咨询条',
    'consultBar.title': '咨询标题',
    'consultBar.desc': '咨询说明',
    'consultBar.buttonText': '咨询按钮文案'
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
    'wrongBookCard.note': '补充提示',
    'wrongBookCard.stats': '顶部统计标签',
    'wrongBookCard.stats.pendingLabel': '待复习标签',
    'wrongBookCard.stats.todayLabel': '今日新增标签',
    'wrongBookCard.stats.totalLabel': '累计错题标签',
    'wrongBookCard.taskSection': '主任务区',
    'wrongBookCard.taskSection.eyebrow': '主任务标题',
    'wrongBookCard.taskSection.reasonLabel': '优先原因标题',
    'wrongBookCard.taskSection.estimateLabel': '预计耗时标题',
    'wrongBookCard.taskSection.sourceLabel': '来源标题',
    'wrongBookCard.taskSection.lastAnsweredLabel': '上次作答标题',
    'wrongBookCard.taskSection.answerLabel': '我的答案标题',
    'wrongBookCard.taskSection.primaryButtonText': '主按钮文案',
    'wrongBookCard.taskSection.secondaryButtonText': '次按钮文案',
    'wrongBookCard.queueSection': '复习队列区',
    'wrongBookCard.queueSection.title': '列表标题',
    'wrongBookCard.queueSection.sortHint': '排序提示',
    'wrongBookCard.queueSection.pendingLabel': '待复习状态文案',
    'wrongBookCard.queueSection.todayLabel': '今日新增状态文案',
    'wrongBookCard.queueSection.masteredLabel': '已掌握状态文案',
    'wrongBookCard.queueSection.emptyTitle': '空状态标题',
    'wrongBookCard.queueSection.emptyDesc': '空状态说明'
  },
  'collection:directions': {
    name: '方向名称',
    slug: '方向标识',
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
    avatarUrl: '头像图片地址',
    avatarSeed: '头像备用图标识',
    intro: '卡片简介',
    specialties: '擅长标签',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:successCases': {
    direction: '所属方向',
    pathTags: '路径标签',
    studentName: '学生姓名',
    studentAvatarText: '头像文字',
    scoreGain: '提分标签',
    scoreLabel: '成绩标签',
    chips: '案例标签',
    startingLabel: '起点说明',
    startingScore: '起点成绩',
    finalLabel: '结果说明',
    finalScore: '最终成绩',
    quote: '案例原话',
    fitAudience: '适合参考人群',
    listTitle: '列表标题',
    listDesc: '列表说明',
    detailButtonText: '详情按钮文案',
    title: '兼容标题',
    subtitle: '兼容副标题',
    coverUrl: '封面图片地址',
    coverSeed: '封面备用图标识',
    year: '上岸年份',
    category: '案例分类',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:materialPackages': {
    direction: '所属方向',
    stage: '所属阶段',
    badge: '角标文案',
    title: '套系标题',
    target: '适合人群',
    solves: '解决问题',
    features: '套系卖点',
    contentItemIds: '套系包含资料',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:materialItems': {
    direction: '所属方向',
    stage: '所属阶段',
    type: '资料类型',
    title: '资料标题',
    subtitle: '资料副标题',
    desc: '资料说明',
    details: '详细介绍',
    accentStart: '封面渐变起始色',
    accentEnd: '封面渐变结束色',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:medicalQuestions': {
    questionId: '题目编号',
    direction: '所属方向',
    questionType: '题型',
    stem: '题干',
    options: '选项',
    'options.*': '选项',
    'options.*.id': '选项标识',
    'options.*.text': '选项内容',
    answer: '答案',
    explanation: '解析',
    paperId: '所属试卷',
    tags: '题目标签',
    status: '发布状态'
  },
  'collection:pastPapers': {
    paperId: '试卷编号',
    title: '试卷标题',
    description: '试卷说明',
    year: '年份',
    direction: '所属方向',
    questionIds: '题目编号列表',
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
    name: '资源名称',
    title: '旧版资源名称',
    module: '使用模块',
    category: '旧版资源分类',
    type: '资源类型',
    url: '资源地址',
    thumbUrl: '缩略图地址',
    alt: '替代文本',
    tags: '资源标签',
    sort: '排序值',
    status: '发布状态'
  },
  'collection:adminUsers': {
    name: '老师姓名',
    loginAccount: '后台登录账号',
    password: '登录密码',
    role: '账号角色',
    status: '账号状态',
    lastLoginAt: '最近登录时间'
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

function getSelectOptions(scope, fieldKey) {
  const scopedOptions = SCOPED_SELECT_FIELD_OPTIONS[scope]?.[fieldKey];
  if (scopedOptions) return scopedOptions;
  return SELECT_FIELD_OPTIONS[fieldKey] || null;
}

function buildReferenceOptions(items, getLabel, getMeta) {
  return [
    { value: '', label: '请选择' },
    ...items.map((item) => {
      const label = getLabel(item);
      const meta = getMeta ? getMeta(item) : '';
      return {
        value: item._id || '',
        label: meta ? `${label} · ${meta}` : label
      };
    })
  ];
}

function getReferenceOptions(scope, path) {
  const normalizedPath = normalizeEditorPath(path);
  const collections = state.currentData?.collections || {};

  if ((scope === 'page:home' || scope === 'page:courses') && normalizedPath === 'featuredDirectionIds') {
    return buildReferenceOptions(
      collections.directions || [],
      (item) => item.name || item._id || '未命名方向',
      (item) => [item.category, item.status === 'draft' ? '草稿' : ''].filter(Boolean).join(' / ')
    );
  }

  if (scope === 'collection:materialPackages' && normalizedPath === 'contentItemIds') {
    return buildReferenceOptions(
      collections.materialItems || [],
      (item) => item.title || item._id || '未命名资料卡',
      (item) => [item.direction, item.stage, item.type].filter(Boolean).join(' / ')
    );
  }

  if (scope === 'collection:medicalQuestions' && normalizedPath === 'paperId') {
    return buildReferenceOptions(
      collections.pastPapers || [],
      (item) => item.title || item.paperId || item._id || '未命名套卷',
      (item) => [item.year, item.direction].filter(Boolean).join(' / ')
    );
  }

  return null;
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
      if (collectionKey === 'adminUsers') {
        return {
          role: 'editor',
          status: 'active',
          password: '',
          ...ui.drafts[collectionKey]
        };
      }
      return ui.drafts[collectionKey];
    }

    const selectedId = ui.selectedIds[collectionKey];
    const selectedItem = (state.currentData?.collections?.[collectionKey] || []).find((item) => item._id === selectedId) || null;
    if (collectionKey === 'adminUsers' && selectedItem) {
      return {
        role: 'editor',
        status: 'active',
        password: '',
        ...selectedItem
      };
    }
    return selectedItem;
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

  if (normalizedPath === '_meta' || normalizedPath.startsWith('_meta.')) {
    return true;
  }

  if (scope === 'collection:adminUsers') {
    return ['passwordHash', 'hasPassword', 'authChannels', 'roleLabel', 'lastLoginAt'].includes(String(path[path.length - 1] || ''));
  }

  if (isHomePageScope(scope)) {
    return HOME_EDITOR_HIDDEN_PATHS.has(normalizedPath);
  }

  if (isQuestionBankPageScope(scope)) {
    return QUESTION_BANK_EDITOR_HIDDEN_PATHS.has(normalizedPath);
  }

  if (PAGE_SPECIFIC_HIDDEN_PATHS[scope]?.has(normalizedPath)) {
    return true;
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
  const selectOptions = getSelectOptions(scope, fieldKey);
  const referenceOptions = getReferenceOptions(scope, path);
  const isImageUrlField = /(?:image|background|avatar|cover|thumb)Url$/i.test(fieldKey);
  const isMediaAssetScope = scope === 'collection:mediaAssets';
  const inputPlaceholder = fieldKey === 'avatarUrl'
    ? '例如：https://your-cdn.com/teachers/teacher-01.jpg'
    : isMediaAssetScope && fieldKey === 'url'
      ? '例如：https://your-cdn.com/materials/banner-01.png'
      : isMediaAssetScope && fieldKey === 'thumbUrl'
        ? '例如：https://your-cdn.com/materials/banner-01-thumb.png'
        : isMediaAssetScope && fieldKey === 'module'
          ? '例如：首页主视觉 / 教材资料 / 成果案例'
    : isImageUrlField
      ? '直接粘贴图床链接'
      : '';
  const isDirectionScope = scope === 'collection:directions' || scope === 'page:courses';
  const useWideField = isImageUrlField || isDirectionScope || (isMediaAssetScope && ['url', 'thumbUrl', 'module'].includes(fieldKey));

  if (referenceOptions) {
    return `<label class="form-field form-field-wide">
      <span class="form-label">${escapeHtml(label)}</span>
      <span class="form-hint">按名称选择，系统会自动关联对应内容。</span>
      <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-form-kind="text">
        ${referenceOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(value ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
      </select>
    </label>`;
  }

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
    const referenceOptions = getReferenceOptions(scope, path);
    const arrayRule = getArrayEditorRule(scope, path);
    const visibleItems = arrayRule?.visibleItems ? value.slice(0, arrayRule.visibleItems) : value;
    const canAppend = arrayRule?.maxItems ? value.length < arrayRule.maxItems : true;

    if (!objectItems && referenceOptions) {
      return `<section class="form-block">
        <div class="form-block-head">
          <div>
            <h4>${escapeHtml(label)}</h4>
            <p>按名称选择即可，系统会自动保存关联关系，不需要手动填写 ID。</p>
          </div>
          ${canAppend ? `<button class="system-action" type="button" data-action="append-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}">新增一项</button>` : ''}
        </div>
        <div class="form-array-list">
          ${visibleItems.length ? visibleItems.map((item, index) => {
            const itemPath = [...path, index];
            const itemPathText = itemPath.join('.');
            return `<div class="form-array-row">
              <select class="form-select" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(itemPathText)}" data-form-kind="text">
                ${referenceOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(item ?? '') === String(option.value) ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
              </select>
              <button class="system-action danger-action" type="button" data-action="remove-array-item" data-form-scope="${escapeHtml(scope)}" data-form-path="${escapeHtml(pathText)}" data-index="${index}">删除</button>
            </div>`;
          }).join('') : '<div class="empty-state">当前还没有已选条目，点击右上角可以新增。</div>'}
        </div>
      </section>`;
    }

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

function getStructuredFieldValue(scope, value, key) {
  const defaultValue = STRUCTURED_FIELD_DEFAULTS[scope]?.[key];
  if (Object.prototype.hasOwnProperty.call(value || {}, key)) {
    return mergeStructuredDefaults(value[key], defaultValue);
  }

  if (Object.prototype.hasOwnProperty.call(STRUCTURED_FIELD_DEFAULTS[scope] || {}, key)) {
    return cloneValue(defaultValue);
  }

  return undefined;
}

function renderFieldsForKeys(scope, value, keys) {
  const forceRenderMissingKeys = QUESTION_BANK_COLLECTION_SCOPES.has(scope);
  return keys
    .filter((key) =>
      !isManagedField(key) &&
      !shouldHideField(scope, [key]) &&
      (forceRenderMissingKeys || Object.prototype.hasOwnProperty.call(value || {}, key))
    )
    .map((key) => renderFormNode(scope, getStructuredFieldValue(scope, value, key), [key], key))
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
  'adminUsers',
  'directions',
  'medicalQuestions',
  'pastPapers',
  'questionImports',
  'successCases'
]);

const TABLE_COLUMNS = {
  adminUsers: [
    {
      key: 'name',
      label: '角色成员',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.name || item.loginAccount || '未命名账号')}</strong><span class="data-table-sub">${escapeHtml(item.loginAccount || item._id || '')}</span>`
    },
    {
      key: 'role',
      label: '角色权限',
      render: (item) => escapeHtml(item.roleLabel || item.role || '-')
    },
    {
      key: 'status',
      label: '账号状态',
      render: (item) => `<span class="record-pill${item.status === 'active' ? ' success' : ''}">${escapeHtml(item.status === 'active' ? '可登录' : '已停用')}</span>`
    },
    {
      key: 'lastLoginAt',
      label: '最近登录',
      render: (item) => escapeHtml(formatDateTime(item.lastLoginAt))
    },
    {
      key: 'action',
      label: '操作',
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="adminUsers" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
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
    { key: 'questionIds', label: '题目数', render: (item) => escapeHtml(String(normalizeFieldList(item.questionIds).length || 0)) },
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
    { key: 'specialties', label: '擅长', render: (item) => escapeHtml(normalizeFieldList(item.specialties).slice(0, 2).join(' / ') || '-') },
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
      key: 'studentName',
      label: '案例对象',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.studentName || item.title || '未命名案例')}</strong><span class="data-table-sub">${escapeHtml(item.listTitle || item.subtitle || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'pathTags', label: '路径', render: (item) => escapeHtml(normalizeFieldList(item.pathTags).join(' / ') || '-') },
    { key: 'finalScore', label: '结果', render: (item) => escapeHtml(item.finalScore || item.scoreGain || '-') },
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
  materialPackages: [
    {
      key: 'title',
      label: '套系标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名套系包')}</strong><span class="data-table-sub">${escapeHtml(item.badge || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'stage', label: '阶段', render: (item) => escapeHtml(item.stage || '-') },
    { key: 'features', label: '卖点数', render: (item) => escapeHtml(String(normalizeFieldList(item.features).length || 0)) },
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
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="materialPackages" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ],
  materialItems: [
    {
      key: 'title',
      label: '资料标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名资料卡')}</strong><span class="data-table-sub">${escapeHtml(item.subtitle || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'stage', label: '阶段', render: (item) => escapeHtml(item.stage || '-') },
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
      render: (item) => `<button class="row-action" type="button" data-action="select-item" data-collection-key="materialItems" data-item-id="${escapeHtml(item._id || '')}">编辑</button>`
    }
  ]
};

const STATUS_FILTER_OPTIONS = [
  { key: 'all', label: '全部' },
  { key: 'published', label: '已发布' },
  { key: 'draft', label: '草稿' }
];

const ADMIN_STATUS_FILTER_OPTIONS = [
  { key: 'all', label: '全部状态' },
  { key: 'active', label: '可登录' },
  { key: 'disabled', label: '已停用' }
];

const ADMIN_ROLE_FILTER_OPTIONS = [
  { key: 'all', label: '全部角色' },
  { key: 'admin', label: '管理员' },
  { key: 'publisher', label: '发布老师' },
  { key: 'editor', label: '编辑老师' },
  { key: 'viewer', label: '查看老师' }
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
      ...(Array.isArray(item.features) ? item.features : []),
      ...(Array.isArray(item.contentItemIds) ? item.contentItemIds : []),
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
      item.badge,
      item.target,
      item.solves,
      item.details,
      item.year,
      ...stringLists
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(keyword);
  });
}

function getAdminUserFilterState() {
  const ui = getViewUi();
  return {
    keyword: ui.filters.adminUsers || '',
    status: ui.statusFilters.adminUsers || 'all',
    role: ui.roleFilters.adminUsers || 'all'
  };
}

function getFilteredAdminUsers(items = []) {
  const filterState = getAdminUserFilterState();
  const keyword = filterState.keyword.trim().toLowerCase();

  return items.filter((item) => {
    const statusMatched = filterState.status === 'all' ? true : (item.status || 'active') === filterState.status;
    const roleMatched = filterState.role === 'all' ? true : (item.role || 'editor') === filterState.role;
    if (!statusMatched || !roleMatched) return false;
    if (!keyword) return true;

    const haystack = [
      item._id,
      item.name,
      item.loginAccount,
      item.roleLabel,
      item.role,
      item.status
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

function renderAdminUsersSection(collectionKey, items) {
  const collectionMeta = getCollectionMeta(collectionKey);
  const filteredItems = getFilteredAdminUsers(items);
  const selected = getSelectedCollectionState(collectionKey, filteredItems.length ? filteredItems : items);
  const filterState = getAdminUserFilterState();
  const ui = getViewUi();
  const isEditorOpen = Boolean(ui.openEditors[collectionKey]);
  const totalCount = items.length;
  const activeCount = items.filter((item) => (item.status || 'active') === 'active').length;
  const adminCount = items.filter((item) => (item.role || 'editor') === 'admin').length;
  const lastLoginCount = items.filter((item) => item.lastLoginAt).length;

  return `<section class="collection-section workspace-motion-scope role-management-scope">
    <div class="table-layout table-layout-single">
      <article class="panel table-panel table-panel-focus workspace-panel-enter account-table-panel">
        <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
          <div>
            <h3>${escapeHtml(collectionMeta.label)}</h3>
            <p>给老师分配登录账号、角色和启停状态。右侧固定编辑入口，保存后会直接同步到小程序云端数据库。</p>
          </div>
          <div class="panel-actions">
            <button class="system-action" type="button" data-action="reload-view">刷新列表</button>
            <button class="system-action" type="button" data-action="new-item" data-collection-key="${escapeHtml(collectionKey)}">新增账号</button>
          </div>
        </div>
        <div class="table-toolbar workspace-enter account-toolbar" style="--enter-delay: 60ms;">
          <div class="account-toolbar-main">
            <label class="table-search">
              ${icon('search')}
              <input type="text" value="${escapeHtml(filterState.keyword)}" placeholder="搜索老师姓名、登录账号或角色" data-list-filter="${escapeHtml(collectionKey)}" />
            </label>
            <div class="account-filter-stack">
              <label class="account-filter">
                <span>角色</span>
                <select class="form-select account-filter-select" data-role-filter="${escapeHtml(collectionKey)}">
                  ${ADMIN_ROLE_FILTER_OPTIONS.map((option) => `<option value="${escapeHtml(option.key)}"${filterState.role === option.key ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
                </select>
              </label>
              <label class="account-filter">
                <span>状态</span>
                <select class="form-select account-filter-select" data-account-status-filter="${escapeHtml(collectionKey)}">
                  ${ADMIN_STATUS_FILTER_OPTIONS.map((option) => `<option value="${escapeHtml(option.key)}"${filterState.status === option.key ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div class="editor-meta workspace-enter account-summary-chips" style="--enter-delay: 120ms;">
          <span class="meta-chip">账号总数 ${escapeHtml(String(totalCount))}</span>
          <span class="meta-chip">可登录 ${escapeHtml(String(activeCount))}</span>
          <span class="meta-chip">管理员 ${escapeHtml(String(adminCount))}</span>
          <span class="meta-chip">有登录记录 ${escapeHtml(String(lastLoginCount))}</span>
        </div>
        <div class="table-shell workspace-enter" style="--enter-delay: 180ms;">
          ${filteredItems.length ? `<table class="data-table data-table-admin-users">
            <thead>
              <tr>
                <th>角色成员</th>
                <th>角色权限</th>
                <th>登录状态</th>
                <th>最近登录</th>
                <th class="account-actions-sticky">操作</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map((item, index) => {
                const isActive = isEditorOpen && selected.itemId === item._id && !selected.isDraft;
                const roleKey = escapeHtml(item.role || 'editor');
                const statusText = item.status === 'disabled' ? '已停用' : '可登录';
                const lastLogin = item.lastLoginAt ? formatDateTime(item.lastLoginAt) : '未登录过';
                const lastLoginHint = item.lastLoginAt ? formatRelative(item.lastLoginAt) : '账号创建后尚未登录';
                return `<tr class="workspace-row-enter${isActive ? ' active' : ''}" style="--enter-delay: ${220 + index * 24}ms;" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">
                  <td>
                    <div class="account-user-cell">
                      <strong class="data-table-title">${escapeHtml(item.name || item.loginAccount || '未命名账号')}</strong>
                      <span class="data-table-sub">登录账号：${escapeHtml(item.loginAccount || '-')}</span>
                      <span class="data-table-minor">云端 ID：${escapeHtml(item._id || '-')}</span>
                    </div>
                  </td>
                  <td><span class="record-pill account-role-pill role-${roleKey}">${escapeHtml(item.roleLabel || item.role || '编辑老师')}</span></td>
                  <td><span class="record-pill account-status-pill${item.status !== 'disabled' ? ' success' : ''}">${escapeHtml(statusText)}</span></td>
                  <td>
                    <strong class="data-table-title">${escapeHtml(lastLogin)}</strong>
                    <span class="data-table-sub">${escapeHtml(lastLoginHint)}</span>
                  </td>
                  <td class="account-actions-sticky">
                    <button class="row-action row-action-wide" type="button" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">编辑</button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>` : '<div class="empty-state">当前筛选下没有账号，试试清空条件或新增一位老师账号。</div>'}
        </div>
      </article>
      ${renderCollectionEditor(collectionKey, selected, collectionMeta)}
    </div>
  </section>`;
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
          <span>${escapeHtml(activeRow?.meta || page.subtitle || pageLabel)}</span>
        </div>
        <div class="directions-enter-modal-item" style="--enter-delay: 60ms;">
          <div class="workspace-compact-summary editor-subsection-summary">
            <strong>${escapeHtml(selectedSectionId ? `当前区块：${activeRow?.title || pageLabel}` : '页面配置总览')}</strong>
            <span>${escapeHtml(`${rows.length} 个区块`)}</span>
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
        meta: page.pastPapersCard?.title || page.pastPapersCard?.desc || '批量导入提示',
        location: '页面标题 / 页面说明 / 补充提示',
        keys: ['pastPapersCard']
      },
      {
        id: 'wrongBookCard',
        title: '错题本页',
        desc: '对应小程序“错题本”的顶部状态概览、当前优先任务和下方复习队列。',
        meta: page.wrongBookCard?.taskSection?.eyebrow || page.wrongBookCard?.queueSection?.title || page.wrongBookCard?.title || '复习任务文案',
        location: '页面标题 / 统计标签 / 主任务按钮 / 队列状态文案',
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
    const directionNameMap = Object.fromEntries(
      ((state.currentData?.collections?.directions || [])).map((item) => [item._id, item.name || item._id])
    );
    const featuredNames = (page.featuredDirectionIds || []).map((id) => directionNameMap[id]).filter(Boolean);
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
        meta: featuredNames.slice(0, 2).join(' / ') || `${(page.featuredDirectionIds || []).length} 张热门方向卡片`,
        location: '热门方向卡片',
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
        location: '图片名称 / 图片地址',
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
        location: '两张重点方向卡片',
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
        title: '代表老师首屏',
        desc: '对应师资页顶部的大标题、说明和信任标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'introCard',
        title: '带学方式说明',
        desc: '对应师资页首屏下方的说明卡，解释主讲、答疑和督学如何一起带学。',
        meta: page.introCard?.title || page.introCard?.desc || '说明卡标题 / 说明',
        location: '说明卡标题 / 说明卡说明',
        keys: ['introCard']
      },
      {
        id: 'features',
        title: '老师协作亮点',
        desc: '对应师资页中部的协作亮点卡片。',
        meta: `${(page.features || []).length} 项协作亮点`,
        location: '亮点标题 / 亮点说明',
        keys: ['features']
      },
      {
        id: 'teacherCollection',
        title: '代表老师与其余老师条目',
        desc: '对应师资页里每一位老师的头像、姓名、身份、标签、简介和擅长方向。系统会按排序取第一位作为顶部代表老师，其余老师在下方纵向展示。',
        meta: `${(state.currentData?.collections?.teachers || []).length} 位老师`,
        location: '老师头像 / 姓名 / 身份 / 标签 / 简介 / 擅长方向 / 排序',
        keys: [],
        linkOnly: true,
        targetView: 'teachers',
        targetCollectionKey: 'teachers',
        actionLabel: '去师资列表修改',
        statusText: '已跳转到师资列表，请修改老师条目。'
      },
      {
        id: 'cta',
        title: '底部咨询承接区',
        desc: '对应师资页最下方的咨询承接卡片。',
        meta: page.cta?.title || page.cta?.buttonText || '咨询区标题 / 按钮',
        location: '咨询区标题 / 咨询区说明 / 咨询按钮文案',
        keys: ['cta']
      }
    ];
  }

  if (pageKey === 'success') {
    return [
      {
        id: 'header',
        title: '首屏标题区',
        desc: '对应成果页顶部的大标题和副标题。',
        meta: page.header?.title || page.header?.subtitle || '首屏标题 / 副标题',
        location: '页面标题 / 页面副标题',
        keys: ['header']
      },
      {
        id: 'directionTabs',
        title: '方向切换',
        desc: '对应高数和医护两个切换按钮，切换后案例和 CTA 都会同步变化。',
        meta: `${(page.directionTabs || []).length} 个方向按钮`,
        location: '方向按钮名称',
        keys: ['directionTabs']
      },
      {
        id: 'pathTabs',
        title: '路径筛选标签',
        desc: '对应基础薄弱、跨专业考、时间紧张、冲刺逆袭这些筛选标签。',
        meta: `${(page.pathTabs || []).length} 个路径标签`,
        location: '标签名称 / 标签顺序',
        keys: ['pathTabs']
      },
      {
        id: 'featuredSection',
        title: '首推案例区',
        desc: '对应“与你相似的首推案例”标题。',
        meta: page.featuredSection?.title || '首推案例标题',
        location: '区块标题',
        keys: ['featuredSection']
      },
      {
        id: 'successCases',
        title: '案例条目',
        desc: '对应首推案例卡和下方案例列表，切换方向和路径后都会从这里筛选内容。',
        meta: `${(state.currentData?.collections?.successCases || []).length} 个成果案例`,
        location: '学生姓名 / 路径标签 / 起点成绩 / 最终成绩 / 原话 / 适合人群',
        keys: [],
        linkOnly: true,
        targetView: 'results',
        targetCollectionKey: 'successCases',
        actionLabel: '去案例列表修改',
        statusText: '已跳转到成果案例列表，请修改上岸故事条目。'
      },
      {
        id: 'listSection',
        title: '案例列表区',
        desc: '对应“更多相似路径”和加载更多按钮。',
        meta: page.listSection?.title || page.listSection?.loadMoreText || '列表标题 / 加载更多',
        location: '列表标题 / 加载更多文案',
        keys: ['listSection']
      },
      {
        id: 'supportSection',
        title: '深色支持区',
        desc: '对应底部深色模块里的标题、说明和支持项。',
        meta: page.supportSection?.title || `${(page.supportSection?.items || []).length} 项支持`,
        location: '区块标题 / 区块说明 / 支持项',
        keys: ['supportSection']
      },
      {
        id: 'ctaByDirection',
        title: '分方向 CTA',
        desc: '对应高数和医护切换后的 CTA 文案同步变化。',
        meta: page.ctaByDirection?.math?.buttonText || page.ctaByDirection?.medical?.buttonText || '分方向 CTA',
        location: '高数 CTA / 医护 CTA',
        keys: ['ctaByDirection']
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
        location: '图片标题 / 图片地址',
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
    return [
      {
        id: 'topSetup',
        title: '第 1 步 · 页面顶部',
        desc: '先改标题、顶部方向切换和阶段按钮，学生最先看到的是这里。',
        meta: page.header?.title || `${(page.directionTabs || []).length} 个方向按钮 / ${(page.stageTabs || []).length} 个阶段按钮`,
        location: '页面标题 / 搜索按钮 / 方向切换 / 阶段按钮',
        keys: ['header', 'directionTabs', 'stageTabs']
      },
      {
        id: 'mainSection',
        title: '第 2 步 · 主推区标题',
        desc: '这里决定主推区的阅读重点，先把区块标题和右侧提示改清楚。',
        meta: page.mainSection?.title || page.mainSection?.sideNote || '区块标题 / 右侧提示',
        location: '区块标题 / 右侧提示',
        keys: ['mainSection']
      },
      {
        id: 'materialPackages',
        title: '第 3 步 · 主推套系内容',
        desc: '这里改大卡里的角标、标题、卖点、适合人群和解决问题，是最核心的转化内容。',
        meta: `${(state.currentData?.collections?.materialPackages || []).length} 个套系包`,
        location: '角标 / 套系标题 / 卖点 / 适合人群 / 解决问题 / 包含资料',
        keys: [],
        linkOnly: true,
        targetView: 'media',
        targetCollectionKey: 'materialPackages',
        actionLabel: '去主推套系包修改',
        statusText: '已跳转到主推套系包列表。'
      },
      {
        id: 'materialItems',
        title: '第 4 步 · 资料货架',
        desc: '先改货架标题和滑动提示，再去修改每张资料卡的标题、副标题、说明和封面色。',
        meta: `${(state.currentData?.collections?.materialItems || []).length} 张资料卡`,
        location: '货架标题 / 滑动提示 / 资料标题 / 副标题 / 资料说明 / 渐变色',
        keys: ['shelfSection'],
        linkedSources: [
          {
            label: '资料卡内容',
            desc: '每张横向资料卡的标题、副标题、说明和封面渐变色，都在“货架资料卡”列表里修改。',
            actionLabel: '去货架资料卡修改',
            targetView: 'media',
            targetCollectionKey: 'materialItems',
            statusText: '已跳转到货架资料卡列表。'
          }
        ]
      },
      {
        id: 'consultBar',
        title: '第 5 步 · 底部咨询条',
        desc: '最后再改底部咨询承接区，告诉学生下一步该怎么联系老师。',
        meta: page.consultBar?.title || page.consultBar?.buttonText || '咨询标题 / 按钮',
        location: '咨询标题 / 咨询说明 / 按钮文案',
        keys: ['consultBar']
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
        <span>${escapeHtml(section.meta || '暂无字段')}</span>
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
      <span>${escapeHtml(section.meta || '编辑区块')}</span>
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
      <span class="page-section-nav-kicker">区块</span>
      <strong>${escapeHtml(row.title)}</strong>
      <p>${escapeHtml(row.linkOnly ? '关联内容' : '直接编辑')}</p>
      <div class="page-section-nav-meta">
        <span>${escapeHtml(row.meta || '待完善')}</span>
        <em>${escapeHtml(getSectionLocationText(`page:${pageKey}`, row))}</em>
      </div>
      ${row.linkOnly ? `<div class="page-section-nav-meta"><span>${escapeHtml(row.actionLabel || '去修改')}</span><em>${escapeHtml('关联工作区')}</em></div>` : ''}
    </button>`).join('')}
  </div>`;
}

function renderPageSectionRowsList(pageKey, rows, selectedSectionId, actionName) {
  if (!rows.length) return '';

  return `<div class="record-list compact-list page-workspace-row-list workspace-enter" style="--enter-delay: 150ms;">
    ${rows.map((row, index) => `<button class="record-row workspace-row-enter${row.id === selectedSectionId ? ' active' : ''}" type="button" style="--enter-delay: ${180 + index * 24}ms;" data-action="${escapeHtml(getPageSectionAction(row, actionName))}" data-page-key="${escapeHtml(pageKey)}" data-section-id="${escapeHtml(row.id)}" ${row.linkOnly ? getLinkedWorkspaceDataset(row) : ''}>
      <span class="record-row-main">
        <strong class="record-row-title">${escapeHtml(row.title)}</strong>
        <span class="record-row-meta">${escapeHtml(row.meta || getSectionLocationText(`page:${pageKey}`, row) || '编辑')}</span>
      </span>
      <span class="record-pill">${escapeHtml(getPageSectionActionLabel(row))}</span>
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
      <span>${escapeHtml(activeField?.meta || section.title)}</span>
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
              <span class="data-table-sub">${escapeHtml(row.meta || '详情')}</span>
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
        <span>${escapeHtml(activeField.meta || section.title)}</span>
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

function renderWorkbenchCardAction(card) {
  if (!card) return '';
  if (card.href) {
    return `<a class="teacher-guide-link" href="${escapeHtml(card.href)}">${escapeHtml(card.actionLabel || '前往')}</a>`;
  }
  if (!card.action) {
    return '';
  }

  const attrs = Object.entries(card.action)
    .map(([key, value]) => `data-${escapeHtml(key)}="${escapeHtml(String(value))}"`)
    .join(' ');

  return `<button class="teacher-guide-link" type="button" ${attrs}>${escapeHtml(card.actionLabel || '前往')}</button>`;
}

function getViewWorkbenchGuide(view, data = {}) {
  const counts = Object.fromEntries((view.collections || []).map((collection) => [collection.key, (data.collections?.[collection.key] || []).length]));

  if (view.key === 'home') {
    return {
      title: '首页按页面阅读顺序维护',
      desc: '先改老师最常看到的首屏，再补方向和咨询区，不用一开始就研究所有字段名。',
      note: '首页内容已经拆成前端区块任务，你只需要按页面顺序点卡片进入编辑。',
      checklist: ['先改首屏主标题与按钮', '再检查热门方向和学习支持', '最后确认底部咨询区'],
      cards: [
        {
          step: '第 1 步',
          title: '首页首屏主视觉',
          desc: '先改大标题、说明、标签和首个按钮，学生一进来先看到这里。',
          meta: '标题 / 标签 / 说明 / 主按钮',
          actionLabel: '打开首屏区块',
          action: { action: 'open-page-section-editor', 'page-key': view.pageKey, 'section-id': 'hero' }
        },
        {
          step: '第 2 步',
          title: '热门方向与功能入口',
          desc: '把最常用的功能入口和推荐方向改清楚，首页就会顺很多。',
          meta: '功能入口 / 热门方向 / 学习支持',
          actionLabel: '打开功能入口',
          action: { action: 'open-page-section-editor', 'page-key': view.pageKey, 'section-id': 'quickLinks' }
        },
        {
          step: '第 3 步',
          title: '底部咨询与环境',
          desc: '最后补联系方式、校区环境和咨询承接，避免用户看到断层。',
          meta: '环境图片区 / 底部咨询区',
          actionLabel: '打开咨询区块',
          action: { action: 'open-page-section-editor', 'page-key': view.pageKey, 'section-id': 'cta' }
        }
      ]
    };
  }

  if (view.key === 'teachers') {
    return {
      title: '师资页先改代表老师，再补老师列表',
      desc: '新接手的老师最容易在“首屏说明”和“老师条目排序”这里迷路，这里已经按展示顺序排好了。',
      note: '师资页顶部文案来自页面配置，具体每位老师的头像、身份和简介在下方老师列表维护。',
      checklist: ['先改代表老师首屏', '再维护老师头像与简介', '最后确认底部咨询区'],
      cards: [
        {
          step: '第 1 步',
          title: '页面首屏说明',
          desc: '先把师资页的大标题、说明和带学方式说清楚。',
          meta: '首屏标题 / 说明卡 / 协作亮点',
          actionLabel: '打开页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '老师列表',
          desc: `下方 ${counts.teachers || 0} 位老师会直接影响前端展示顺序，第一位会作为代表老师展示。`,
          meta: '头像 / 姓名 / 身份 / 标签 / 排序',
          actionLabel: '跳到老师列表',
          href: '#cms-section-teachers'
        },
        {
          step: '第 3 步',
          title: '确认咨询承接',
          desc: '最后检查底部咨询区，确保老师介绍页有明确下一步。',
          meta: '咨询标题 / 说明 / 按钮',
          actionLabel: '回到页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        }
      ]
    };
  }

  if (view.key === 'results') {
    return {
      title: '成果页按“切换逻辑 -> 案例 -> CTA”维护',
      desc: '成果页最怕先改案例后忘记切换标签，所以先处理方向和路径，再改案例内容。',
      note: '方向按钮、路径标签和 CTA 文案在页面配置里；具体案例条目在下方列表。',
      checklist: ['先确认高数 / 医护切换', '再补首推案例和列表案例', '最后校对 CTA 文案'],
      cards: [
        {
          step: '第 1 步',
          title: '方向与路径切换',
          desc: '先看顶部切换是否清楚，避免学生点进去读不懂。',
          meta: '方向按钮 / 路径标签 / 首推区标题',
          actionLabel: '打开页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '案例列表',
          desc: `下方 ${counts.successCases || 0} 条成果案例会影响首推卡和更多案例列表。`,
          meta: '学生信息 / 分数结果 / 路径标签 / 原话',
          actionLabel: '跳到案例列表',
          href: '#cms-section-successCases'
        },
        {
          step: '第 3 步',
          title: '底部支持与 CTA',
          desc: '最后确认深色支持区和分方向 CTA，保证转化链路完整。',
          meta: '支持区 / 分方向 CTA',
          actionLabel: '继续编辑页面',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        }
      ]
    };
  }

  if (view.key === 'media') {
    return {
      title: '教材资料按 5 步任务流维护',
      desc: '这里延续文档里的教师工作台思路，不再要求老师先理解套餐、素材、资料卡三套字段结构。',
      note: '先处理页面大结构，再去下方维护素材库、主推套系和资料卡，页面和集合不会再重复展示。',
      checklist: ['先改页面顶部与主推区', '再维护套系和资料卡', '最后检查素材与咨询承接'],
      cards: [
        {
          step: '第 1 步',
          title: '页面顶部与主推区',
          desc: '先改教材页顶部标题、方向切换和主推区标题，统一页面第一印象。',
          meta: '顶部标题 / 方向切换 / 主推区说明',
          actionLabel: '打开页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '主推套系与资料卡',
          desc: `下方 ${counts.materialPackages || 0} 个套系和 ${counts.materialItems || 0} 张资料卡决定老师实际推荐内容。`,
          meta: '套系卖点 / 资料卡标题 / 适合谁 / 解决什么问题',
          actionLabel: '跳到资料套餐',
          href: '#cms-section-materialPackages'
        },
        {
          step: '第 3 步',
          title: '素材资源',
          desc: `素材库里的 ${counts.mediaAssets || 0} 条资源建议最后改，避免一开始就被链接和缩略图打断。`,
          meta: '资源名称 / 使用模块 / 链接 / 缩略图',
          actionLabel: '跳到素材库',
          href: '#cms-section-mediaAssets'
        }
      ]
    };
  }

  if (view.key === 'questionBank') {
    return {
      title: '题库管理先校验来源，再导入题目',
      desc: '题库页最容易让新老师紧张的是批量导入，这里把顺序拆开，先上传文件，再看系统整理结果。',
      note: '页面说明和导入入口在当前页顶部，题目、试卷和导入记录在下方三块列表中分别维护。',
      checklist: ['先确认题库页说明', '再上传题库文件', '最后检查题目、试卷和导入记录'],
      cards: [
        {
          step: '第 1 步',
          title: '题库页说明',
          desc: '先检查题库页标题、说明和入口，不要一上来就导入数据。',
          meta: '页面说明 / 分类入口 / 教师提示',
          actionLabel: '打开页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '题库文件导入',
          desc: '先预览再导入，确认可导入行数和错误行后再提交。',
          meta: '预览校验 / 错误行 / 套卷归档',
          actionLabel: '打开导入工具',
          action: { action: 'open-question-bank-import' }
        },
        {
          step: '第 3 步',
          title: '题目与试卷复查',
          desc: `导入后再检查 ${counts.medicalQuestions || 0} 道题和 ${counts.pastPapers || 0} 套试卷是否归档正确。`,
          meta: '题目 / 试卷 / 导入记录',
          actionLabel: '跳到题目列表',
          href: '#cms-section-medicalQuestions'
        }
      ]
    };
  }

  if (view.key === 'accounts') {
    return {
      title: '账号管理先建账号，再分角色',
      desc: '老师最容易搞混的是“能不能看”“能不能改”“能不能发布”，这里直接按创建顺序整理。',
      note: '账号列表是独立维护区，保存后会直接影响对应老师登录后的可见范围。',
      checklist: ['先创建账号与姓名', '再分配角色权限', '最后检查启停状态'],
      cards: [
        {
          step: '第 1 步',
          title: '新增老师账号',
          desc: '先补姓名、登录账号和默认密码，保证老师能进系统。',
          meta: '姓名 / 账号 / 密码',
          actionLabel: '跳到账号列表',
          href: '#cms-section-adminUsers'
        },
        {
          step: '第 2 步',
          title: '分配角色权限',
          desc: '根据老师职责选择“查看 / 编辑 / 发布”，不要一开始全部给满权限。',
          meta: '角色 / 权限范围 / 状态',
          actionLabel: '继续管理账号',
          href: '#cms-section-adminUsers'
        },
        {
          step: '第 3 步',
          title: '启停与复查',
          desc: '最后检查是否启用、是否需要重置密码，以及老师是否能正常登录。',
          meta: '状态 / 更新时间 / 登录可用性',
          actionLabel: '查看账号列表',
          href: '#cms-section-adminUsers'
        }
      ]
    };
  }

  if (view.key === 'directions') {
    return {
      title: '课程方向先改总控，再看方向条目',
      desc: '方向页同时有页面配置和方向条目，建议先改总控，再整理每个方向的文案与排序。',
      note: '这张表里第一行是页面总控，其余都是方向条目；首页推荐也会受这里的排序和精选状态影响。',
      checklist: ['先看页面总控', '再整理方向摘要与排序', '最后检查首页精选状态'],
      cards: [
        {
          step: '第 1 步',
          title: '页面总控',
          desc: '先调整判断首屏和两张重点方向卡的承接逻辑。',
          meta: '判断首屏 / 重点方向卡 / 咨询区',
          actionLabel: '打开页面配置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '方向条目',
          desc: `当前共有 ${counts.directions || 0} 个方向条目，排序和首页精选会直接影响学生看到的顺序。`,
          meta: '名称 / 分类 / 摘要 / 排序 / 首页精选',
          actionLabel: '在下方表中编辑',
          href: '#cms-section-directions'
        },
        {
          step: '第 3 步',
          title: '复查首页推荐',
          desc: '最后确认首页推荐池和方向页排序是否一致，避免前端与后台判断不一致。',
          meta: '首页精选 / featuredDirectionIds',
          actionLabel: '继续检查方向表',
          href: '#cms-section-directions'
        }
      ]
    };
  }

  if (view.key === 'about') {
    return {
      title: '关于页按“机构介绍 -> 环境 -> 咨询”维护',
      desc: '关于页不需要一次改完所有字段，先把机构故事讲清楚，再补环境和咨询承接。',
      note: '联系方式来自站点设置，关于页这里只负责页面结构和展示语气。',
      checklist: ['先改首屏和介绍卡', '再补理念与环境图', '最后确认底部咨询区'],
      cards: [
        {
          step: '第 1 步',
          title: '机构首屏与介绍',
          desc: '先调整机构标题、说明和介绍卡内容。',
          meta: '首屏标题 / 介绍卡 / 理念',
          actionLabel: '打开首屏区块',
          action: { action: 'open-page-section-editor', 'page-key': view.pageKey, 'section-id': 'hero' }
        },
        {
          step: '第 2 步',
          title: '环境图片区',
          desc: '再补校区环境图，让家长和学生看到真实空间。',
          meta: '环境图片 / 图片标题',
          actionLabel: '打开环境图片区',
          action: { action: 'open-page-section-editor', 'page-key': view.pageKey, 'section-id': 'environmentImages' }
        },
        {
          step: '第 3 步',
          title: '站点联系信息',
          desc: '关于页底部联系方式来自站点设置，需要单独维护公共电话、微信和地址。',
          meta: '品牌 / 电话 / 微信 / 地址',
          actionLabel: '打开站点设置',
          action: { action: 'open-view', 'target-view': 'contact' }
        }
      ]
    };
  }

  if (view.key === 'contact') {
    return {
      title: '站点设置先保品牌与联系方式，再补二维码',
      desc: '这是多个页面共用的公共信息区，先改核心联系信息，再补充二维码和简介。',
      note: '这里的电话、微信、地址会被关于页、底部咨询区等多个位置复用。',
      checklist: ['先核对品牌名和联系电话', '再补服务时间与微信', '最后检查二维码和地址'],
      cards: [
        {
          step: '第 1 步',
          title: '品牌与联系',
          desc: '先维护品牌名、电话、微信和服务时间，这些字段复用最广。',
          meta: '品牌 / 电话 / 微信 / 服务时间',
          actionLabel: '打开站点设置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        },
        {
          step: '第 2 步',
          title: '二维码与地址',
          desc: '再补二维码、地址和机构简介，避免首屏信息过载。',
          meta: '二维码 / 地址 / 简介',
          actionLabel: '继续编辑设置',
          action: { action: 'open-page-editor', 'page-key': view.pageKey }
        }
      ]
    };
  }

  return null;
}

function renderTeacherWorkbenchGuide(view, data = {}) {
  const guide = getViewWorkbenchGuide(view, data);
  if (!guide?.cards?.length) {
    return '';
  }

  return `<article class="panel teacher-guide-panel workspace-panel-enter" style="--enter-delay: 80ms;">
    <div class="teacher-guide-head">
      <div>
        <h3>${escapeHtml(guide.title)}</h3>
      </div>
    </div>
    <div class="teacher-guide-grid">
      ${guide.cards.map((card, index) => `<article class="teacher-guide-card workspace-enter" style="--enter-delay: ${100 + index * 22}ms;">
        <span class="teacher-guide-step">${escapeHtml(card.step || `步骤 ${index + 1}`)}</span>
        <strong>${escapeHtml(card.title)}</strong>
        <div class="teacher-guide-meta">${escapeHtml(card.meta || '点击继续')}</div>
        ${renderWorkbenchCardAction(card)}
      </article>`).join('')}
    </div>
  </article>`;
}

function getCollectionWorkbenchGuide(collectionKey, items = []) {
  const count = items.length;
  const commonNote = `当前共 ${count} 条，建议先找一条真实会展示到前端的内容试改，再批量调整。`;

  const guides = {
    teachers: {
      title: '老师列表怎么改最稳',
      desc: '先把头像、姓名、身份做准，再补简介和擅长方向，最后调整排序。',
      note: commonNote,
      cards: [
        { title: '先改卡片第一眼信息', meta: '头像 / 姓名 / 身份 / 标签' },
        { title: '再补老师简介', meta: '简介 / 擅长方向 / 补充说明' },
        { title: '最后调排序和状态', meta: '排序 / 发布状态' }
      ]
    },
    successCases: {
      title: '案例列表按真实阅读顺序维护',
      desc: '先让学生知道“是谁、从哪到哪”，再补原话和适合人群。',
      note: commonNote,
      cards: [
        { title: '案例对象与结果', meta: '学生姓名 / 起点 / 结果 / 年份' },
        { title: '路径标签与适配人群', meta: '路径标签 / 适合谁 / 方向' },
        { title: '原话与状态', meta: '原话 / 排序 / 发布状态' }
      ]
    },
    mediaAssets: {
      title: '素材库先保证“能辨认、能使用”',
      desc: '素材资源页最怕只剩链接，所以先填能看懂的名称和使用模块，再补链接与缩略图。',
      note: commonNote,
      cards: [
        { title: '资源名称先写清楚', meta: '资源名称 / 使用模块 / 类型' },
        { title: '再填主链接', meta: '资源地址 / 缩略图 / 替代说明' },
        { title: '最后检查可复用性', meta: '是否能被老师再次找到' }
      ]
    },
    materialPackages: {
      title: '主推套系先讲清适合谁',
      desc: '先把标题和卖点写明白，再补适合人群、解决问题和包含资料。',
      note: commonNote,
      cards: [
        { title: '先写标题与角标', meta: '角标 / 套系标题 / 副标题' },
        { title: '再写卖点与适合人群', meta: '卖点 / 适合谁 / 解决什么问题' },
        { title: '最后补包含资料', meta: '资料项 / 状态 / 排序' }
      ]
    },
    materialItems: {
      title: '资料卡先保标题、副标题和类型',
      desc: '每张卡只要先让老师一眼看懂是什么资料，页面就会整洁很多。',
      note: commonNote,
      cards: [
        { title: '先写卡片标题', meta: '标题 / 副标题 / 资料类型' },
        { title: '再补说明与封面色', meta: '说明 / 渐变色 / 标签' },
        { title: '最后检查跳转链接', meta: '按钮文案 / 资源地址' }
      ]
    },
    medicalQuestions: {
      title: '题目列表先检查题干和答案',
      desc: '题目编辑最容易出错的是答案格式和套卷归属，先看这两项。',
      note: commonNote,
      cards: [
        { title: '先校对题干和题型', meta: '题干 / 题型 / 年份' },
        { title: '再核对答案与解析', meta: '答案 / 选项 / 解析' },
        { title: '最后确认试卷归属', meta: 'paperId / 状态 / 更新时间' }
      ]
    },
    pastPapers: {
      title: '试卷列表先看标题和题目归档',
      desc: '试卷页重点不是写很多文案，而是确认题目有没有被正确归到这一套卷里。',
      note: commonNote,
      cards: [
        { title: '先看试卷标题', meta: '试卷标题 / paperId / 年份' },
        { title: '再看题目数量', meta: '题目数 / 方向' },
        { title: '最后看状态', meta: '发布状态 / 更新时间' }
      ]
    },
    questionImports: {
      title: '导入记录只做追溯，不用重复编辑',
      desc: '这块主要用来回看导入结果和原始来源，确认是否需要重新导入。',
      note: commonNote,
      cards: [
        { title: '先看导入来源', meta: '来源类型 / 原始文本' },
        { title: '再看方向与状态', meta: '方向 / 状态' },
        { title: '最后结合时间判断', meta: '更新时间 / 是否需要重导' }
      ]
    },
    adminUsers: {
      title: '账号列表先保证能登录，再谈权限',
      desc: '先创建并核对账号信息，再分配角色，最后再看启停。',
      note: commonNote,
      cards: [
        { title: '先看姓名和账号', meta: '姓名 / 登录账号' },
        { title: '再分配角色', meta: '查看老师 / 编辑老师 / 发布老师' },
        { title: '最后检查状态', meta: '启用状态 / 更新时间' }
      ]
    },
    directions: {
      title: '方向条目先看摘要，再看首页精选',
      desc: '先让方向名称和摘要清楚，再决定是否放首页推荐。',
      note: commonNote,
      cards: [
        { title: '先写方向名称与分类', meta: '名称 / 分类 / 摘要' },
        { title: '再补适合人群', meta: '适合谁 / 亮点 / 标签' },
        { title: '最后看推荐与排序', meta: '首页精选 / 排序 / 状态' }
      ]
    }
  };

  return guides[collectionKey] || null;
}

function renderCollectionWorkbenchGuide(collectionKey, items = []) {
  const guide = getCollectionWorkbenchGuide(collectionKey, items);
  if (!guide?.cards?.length) {
    return '';
  }

  return `<div class="collection-guide-strip workspace-enter" style="--enter-delay: 30ms;">
    <div class="collection-guide-head">
      <strong>${escapeHtml(guide.title)}</strong>
    </div>
    <div class="collection-guide-grid">
      ${guide.cards.map((card) => `<div class="collection-guide-card">
        <strong>${escapeHtml(card.title)}</strong>
        <span>${escapeHtml(card.meta)}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

function renderQuestionBankPagePanel(view, page) {
  if (!view.pageKey || !page) return '';

  const ui = getQuestionBankWorkspaceUi();
  const rows = getPageSectionRows(view.pageKey, page);
  const importUi = getQuestionBankImportUi();
  const preview = importUi.preview;
  const lastSummary = importUi.lastSummary;
  const directionMeta = getQuestionBankDirectionMeta(ui.questionDirection);
  const stats = getQuestionBankStats(state.currentData?.collections || {}, directionMeta.key);
  const guide = QUESTION_BANK_IMPORT_GUIDES[ui.questionImportGuide] || QUESTION_BANK_IMPORT_GUIDES.excel;
  const activeSectionId =
    Object.entries(ui.openEditors || {}).find(([key, open]) => open && key.startsWith(`page:${view.pageKey}:section:`))?.[0]?.split(':').pop() ||
    ui.selectedIds[`page-section:${view.pageKey}`] ||
    rows[0]?.id ||
    '';

  return `<section class="collection-section workspace-motion-scope" id="cms-section-questionBankPage">
    <div class="table-layout table-layout-single">
      <article class="panel table-panel table-panel-focus workspace-panel-enter question-bank-workbench-panel">
        <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
          <div>
            <h3>${escapeHtml(directionMeta.heroTitle)}</h3>
          </div>
          <div class="panel-actions">
            <button class="system-action" type="button" data-action="reload-view">刷新题库</button>
            <button class="system-action" type="button" data-action="open-page-section-editor" data-page-key="${escapeHtml(view.pageKey)}" data-section-id="${escapeHtml(activeSectionId || rows[0]?.id || '')}">编辑入口文案</button>
          </div>
        </div>
        <div class="question-bank-direction-bar workspace-enter" style="--enter-delay: 20ms;">
          <div class="question-bank-direction-switch">
            ${QUESTION_BANK_DIRECTIONS.map((item) => `<button class="segment${directionMeta.key === item.key ? ' active' : ''}" type="button" data-action="set-question-bank-direction" data-direction-key="${escapeHtml(item.key)}">${escapeHtml(item.label)}</button>`).join('')}
          </div>
          <div class="question-bank-direction-copy">
            <strong>${escapeHtml(directionMeta.summary)}</strong>
            <span>${escapeHtml('主控区先做导入清洗，再到下方题目、套卷和导入记录复查。')}</span>
          </div>
        </div>
        <div class="question-bank-stat-grid workspace-enter" style="--enter-delay: 36ms;">
          <article class="question-bank-stat-card">
            <span>题目总数</span>
            <strong>${escapeHtml(String(stats.questionCount))}</strong>
            <em>${escapeHtml(`${stats.publishedQuestionCount} 条已发布`)}</em>
          </article>
          <article class="question-bank-stat-card">
            <span>套卷数量</span>
            <strong>${escapeHtml(String(stats.paperCount))}</strong>
            <em>${escapeHtml(`当前方向 ${directionMeta.shortLabel}`)}</em>
          </article>
          <article class="question-bank-stat-card">
            <span>导入记录</span>
            <strong>${escapeHtml(String(stats.importCount))}</strong>
            <em>${escapeHtml(`${stats.draftImportCount} 条待整理`)}</em>
          </article>
          <article class="question-bank-stat-card">
            <span>入口文案区</span>
            <strong>${escapeHtml(String(rows.length))}</strong>
            <em>${escapeHtml(activeSectionId ? `当前焦点 ${rows.find((item) => item.id === activeSectionId)?.title || '题库配置'}` : '题库配置')}</em>
          </article>
        </div>
        <div class="question-bank-workbench-grid workspace-enter" style="--enter-delay: 56ms;">
          <article class="question-bank-hub-card question-bank-hub-card-highlight">
            <div class="question-bank-hub-head">
              <div>
                <strong>导入与清洗</strong>
                <span>${escapeHtml(preview
                  ? `${preview.fileName || '当前文件'} 已完成预览`
                  : lastSummary
                    ? `上次导入 ${lastSummary.importedCount || 0} 题，联动 ${lastSummary.paperCount || 0} 套题卷`
                    : '先预览，再导入，最后再复查题目归档')}</span>
              </div>
              <button class="system-action" type="button" data-action="open-question-bank-import">${preview ? '查看预览' : '开始导入'}</button>
            </div>
            <div class="question-bank-guide-tabs">
              ${Object.entries(QUESTION_BANK_IMPORT_GUIDES).map(([key, item]) => `<button class="question-bank-guide-tab${ui.questionImportGuide === key ? ' active' : ''}" type="button" data-action="set-question-bank-import-guide" data-guide-key="${escapeHtml(key)}">${escapeHtml(item.label)}</button>`).join('')}
            </div>
            <div class="question-bank-guide-panel">
              <strong>${escapeHtml(guide.label)}</strong>
              <span>${escapeHtml(guide.hint)}</span>
              <pre>${escapeHtml(guide.sample)}</pre>
            </div>
            <div class="question-bank-action-row">
              <button class="system-action" type="button" data-action="open-question-bank-import">上传题库文件</button>
              <button class="system-action" type="button" data-action="new-item" data-collection-key="questionImports">新建清洗记录</button>
            </div>
          </article>
          <article class="question-bank-hub-card">
            <div class="question-bank-hub-head">
              <div>
                <strong>入口文案与模块承接</strong>
                <span>每日一题、模拟题、错题本三块入口文案集中在这里收口。</span>
              </div>
            </div>
            <div class="record-list compact-list question-bank-config-list">
              ${rows.map((row, index) => `<button class="record-row workspace-row-enter${row.id === activeSectionId ? ' active' : ''}" style="--enter-delay: ${70 + index * 10}ms;" type="button" data-action="open-page-section-editor" data-page-key="${escapeHtml(view.pageKey)}" data-section-id="${escapeHtml(row.id)}">
                <span class="record-row-main">
                  <strong class="record-row-title">${escapeHtml(row.title)}</strong>
                  <span class="record-row-meta">${escapeHtml(row.desc || '待完善')}</span>
                </span>
                <span class="record-pill">${escapeHtml(row.meta || '点击编辑')}</span>
              </button>`).join('')}
            </div>
          </article>
          <article class="question-bank-hub-card">
            <div class="question-bank-hub-head">
              <div>
                <strong>当前导入状态</strong>
                <span>${escapeHtml(preview
                  ? `${preview.totalRows || 0} 行中 ${preview.validCount || 0} 行可导入`
                  : '还没有待导入文件时，可以先整理题目、套卷或导入记录。')}</span>
              </div>
            </div>
            <div class="question-bank-status-stack">
              <div class="workspace-compact-summary question-bank-toolkit-summary">
                <strong>${escapeHtml(preview ? (preview.fileName || '当前文件') : '等待上传题库文件')}</strong>
                <span>${escapeHtml(preview ? `${preview.validCount}/${preview.totalRows} 行可导入` : '系统会自动识别题型、方向和试卷归属')}</span>
                <em>${escapeHtml(preview
                  ? (preview.invalidCount ? `仍有 ${preview.invalidCount} 行待修正` : '当前预览通过，可直接导入')
                  : lastSummary
                    ? `上次导入 ${lastSummary.importedCount || 0} 题`
                    : '支持 Word、PDF、Excel、文本和 JSON')}</em>
              </div>
              <div class="question-bank-inline-metrics">
                <span class="meta-chip">方向 ${escapeHtml(directionMeta.shortLabel)}</span>
                <span class="meta-chip">${escapeHtml(preview?.sourceFormat || '自动识别格式')}</span>
                <span class="meta-chip${preview?.invalidCount ? ' danger' : ' success'}">${escapeHtml(preview ? `待修正 ${preview.invalidCount || 0}` : '未预览')}</span>
              </div>
            </div>
          </article>
          <article class="question-bank-hub-card">
            <div class="question-bank-hub-head">
              <div>
                <strong>复查入口</strong>
                <span>题库完成清洗后，顺着下面三块列表往下查就行。</span>
              </div>
            </div>
            <div class="question-bank-review-links">
              <a class="teacher-guide-link" href="#cms-section-medicalQuestions">查看题目列表</a>
              <a class="teacher-guide-link" href="#cms-section-pastPapers">查看套卷列表</a>
              <a class="teacher-guide-link" href="#cms-section-questionImports">查看导入记录</a>
            </div>
            <div class="question-bank-action-row">
              <button class="system-action" type="button" data-action="new-item" data-collection-key="medicalQuestions">新建题目</button>
              <button class="system-action" type="button" data-action="new-item" data-collection-key="pastPapers">新建套卷</button>
            </div>
          </article>
        </div>
        <input class="question-bank-file-input" type="file" accept="${escapeHtml(QUESTION_BANK_UPLOAD_ACCEPT)}" data-question-bank-file-input hidden />
      </article>
      ${renderQuestionBankImportOverlay()}
      ${renderPageSectionOverlay(view.pageKey, view.pageLabel, page, rows)}
    </div>
  </section>`;
}

function renderQuestionBankImportOverlay() {
  const ui = getQuestionBankWorkspaceUi();
  if (!ui.openEditors.questionBankCsvImport) {
    return '';
  }

  const importUi = getQuestionBankImportUi();
  const preview = importUi.preview;
  const directionMeta = getQuestionBankDirectionMeta(ui.questionDirection);
  const guide = QUESTION_BANK_IMPORT_GUIDES[ui.questionImportGuide] || QUESTION_BANK_IMPORT_GUIDES.excel;
  const canCommit = Boolean(preview && Number(preview.validCount || 0) > 0 && Number(preview.invalidCount || 0) === 0 && !importUi.isSubmitting);
  const summaryText = preview
    ? `${preview.fileName || '当前文件'} 共 ${preview.totalRows} 行，${preview.validCount} 行可导入，${preview.invalidCount} 行待修正。`
    : `先选择 ${directionMeta.shortLabel}题库文件，系统会自动识别内容并整理成可导入题库。`;
  const latestText = importUi.lastSummary
    ? `上次导入 ${importUi.lastSummary.importedCount || 0} 题，新增 ${importUi.lastSummary.createdCount || 0} 题，更新 ${importUi.lastSummary.updatedCount || 0} 题；联动 ${importUi.lastSummary.paperCount || 0} 套题卷。`
    : '系统会自动覆盖同题号内容，并按试卷编号同步整理套卷。';

  return `<div class="editor-overlay is-visible directions-editor-overlay question-bank-import-overlay" data-editor-question-bank-import="true">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭导入弹层" data-action="close-question-bank-import"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>题库文件导入</h3>
          <p>上传老师手上的题目文件，系统会先识别、整理，再同步到题目和套卷。</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="pick-question-bank-import-file">${preview ? '重新选择文件' : '选择文件'}</button>
          <button class="topbar-icon-button editor-close-button" type="button" aria-label="关闭导入弹层" data-action="close-question-bank-import">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">方向 ${escapeHtml(directionMeta.shortLabel)}</span>
          <span class="meta-chip">${escapeHtml(preview?.sourceFormat || '自动识别格式')}</span>
          <span class="meta-chip">${escapeHtml(latestText)}</span>
        </div>
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(preview ? (preview.fileName || '当前文件') : '等待上传题库文件')}</strong>
          <span>${escapeHtml(summaryText)}</span>
        </div>
        <div class="question-bank-import-stack directions-enter-modal-item" style="--enter-delay: 60ms;">
          <article class="question-bank-import-card">
            <div class="question-bank-import-head">
              <div>
                <strong>推荐整理方式</strong>
                <span>支持 Word、PDF、Excel、纯文本和 JSON。系统会自动识别题目、选项、答案和解析。</span>
              </div>
              <button class="system-action" type="button" data-action="pick-question-bank-import-file">上传文件</button>
            </div>
            <pre class="question-bank-import-code">${escapeHtml(guide.sample)}</pre>
            <div class="question-bank-import-tips">
              <span>题目内容、选项、答案、解析越完整，导入越稳</span>
              <span>系统会自动识别医护 / 高数方向</span>
              <span>同一试卷会自动整理成一套题卷</span>
              <span>没有题号时系统会自动补编号</span>
              <span>文字版 PDF 与 Word 文档识别效果最好</span>
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
            </div>` : '<div class="empty-state compact">当前文件没有发现格式错误，可以直接导入。</div>'}
            ${preview.previewRows?.length ? `<div class="question-bank-preview-table">
              <table class="data-table data-table-compact">
                <thead>
                  <tr>
                    <th>行号</th>
                    <th>题目编号</th>
                    <th>试卷编号</th>
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
            <div class="empty-state">选择文件后，这里会显示导入总量、错误行和题目预览。</div>
          </article>`}
        </div>
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 80ms;">
          <button class="system-action" type="button" data-action="pick-question-bank-import-file">${preview ? '更换文件' : '选择文件'}</button>
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
  const prefersRowList = view.pageKey === 'home';

  return `<section class="module-page workspace-motion-scope page-workspace-scope">
    ${renderEnvironmentBanner(view.pageLabel || view.title)}
    <article class="panel module-hero-panel module-hero-compact workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(view.title)}</h3>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新模块</button>
        </div>
      </div>
      ${renderModuleSummary(view, data)}
    </article>
    ${renderTeacherWorkbenchGuide(view, data)}

    <section class="collection-section">
      <div class="table-layout table-layout-single">
        <article class="panel table-panel table-panel-focus workspace-panel-enter">
          <div class="panel-head workspace-enter" style="--enter-delay: 60ms;">
            <div>
              <h3>${escapeHtml(`${view.pageLabel || view.title}工作区`)}</h3>
            </div>
          </div>
          <div class="workspace-compact-summary workspace-enter" style="--enter-delay: 120ms;">
            <strong>${escapeHtml(selectedSectionId ? `当前焦点：${rows.find((item) => item.id === selectedSectionId)?.title || view.pageLabel || '页面配置'}` : `${view.pageLabel || '页面配置'}总览`)}</strong>
            <span>${escapeHtml(`${rows.length} 个核心区块`)}</span>
            <em>${escapeHtml(`当前页面字段 ${Object.keys(data.page || {}).length} 个`)}</em>
          </div>
          ${prefersRowList ? renderPageSectionRowsList(view.pageKey, rows, selectedSectionId, 'open-page-section-editor') : renderPageSectionNavCards(view.pageKey, rows, selectedSectionId, 'open-page-section-editor')}
          ${view.pageKey === 'materials' ? '' : renderPageSectionsTable(view.pageKey, rows, selectedSectionId, 'open-page-section-editor')}
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
    ${renderEnvironmentBanner(view.title)}
    ${renderTeacherWorkbenchGuide(view, data)}
    <section class="collection-section">
      <div class="table-layout table-layout-single">
        <article class="panel table-panel table-panel-focus directions-panel-enter" id="cms-section-directions">
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
          ${renderCollectionWorkbenchGuide('directions', directions)}
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
  const visibleCount = getVisibleRowCount(collectionKey);
  const visibleItems = filteredItems.slice(0, visibleCount);
  const selected = getSelectedCollectionState(collectionKey, filteredItems.length ? filteredItems : items);
  const filterState = getCollectionFilterState(collectionKey);
  const ui = getViewUi();
  const isEditorOpen = Boolean(ui.openEditors[collectionKey]);
  const columns = TABLE_COLUMNS[collectionKey] || [];
  const publishedCount = (items || []).filter((item) => item.status === 'published').length;

  return `<section class="collection-section workspace-motion-scope" id="cms-section-${escapeHtml(collectionKey)}">
    <div class="table-layout table-layout-single">
      <article class="panel table-panel table-panel-focus workspace-panel-enter">
        <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
          <div>
            <h3>${escapeHtml(collectionMeta.label)}</h3>
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
          <span class="meta-chip">当前展示 ${escapeHtml(String(Math.min(filteredItems.length, visibleItems.length)))} / ${escapeHtml(String(filteredItems.length))}</span>
        </div>
        ${renderCollectionWorkbenchGuide(collectionKey, items)}
        <div class="table-shell workspace-enter" style="--enter-delay: 180ms;">
          ${filteredItems.length ? `<table class="data-table data-table-compact">
            <thead>
              <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${visibleItems.map((item, index) => `<tr class="workspace-row-enter${isEditorOpen && selected.itemId === item._id && !selected.isDraft ? ' active' : ''}" style="--enter-delay: ${220 + index * 18}ms;" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">
                ${columns.map((column) => `<td>${column.render(item)}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
          ${filteredItems.length > visibleItems.length ? `<div class="table-load-more">
            <button class="system-action" type="button" data-action="load-more-rows" data-collection-key="${escapeHtml(collectionKey)}">继续加载 ${escapeHtml(String(Math.min(TABLE_RENDER_BATCH, filteredItems.length - visibleItems.length)))} 条</button>
            <span>剩余 ${escapeHtml(String(filteredItems.length - visibleItems.length))} 条</span>
          </div>` : ''}` : '<div class="empty-state">当前筛选下没有数据，试试切换状态或新建一条内容。</div>'}
        </div>
      </article>
      ${renderCollectionEditor(collectionKey, selected, collectionMeta)}
    </div>
  </section>`;
}

function renderSidebar() {
  const visibleItems = getVisibleNavItems();
  refs.nav.innerHTML = visibleItems.map((item) => `<button class="nav-item${state.activeView === item.key ? ' active' : ''}" type="button" data-nav="${escapeHtml(item.key)}" aria-label="${escapeHtml(item.label)}">
    <span class="nav-label">${escapeHtml(item.label)}</span>
  </button>`).join('');
}

function setTopbar(view) {
  refs.topbarKicker.textContent = view.kicker;
  refs.topbarBreadcrumb.textContent = view.breadcrumb;
  refs.viewTitle.textContent = view.title;
}

function setStatus(message, tone = 'ok') {
  // 优化错误提示，使用更友好的语言
  const friendlyMessages = {
    '请求失败: 500': '服务器开小差了，请稍后重试',
    '请求失败: 404': '找不到相关内容，请检查链接是否正确',
    '请求失败: 403': '抱歉，您没有权限执行此操作',
    '请求失败: 401': '登录已过期，请重新登录',
    '请求失败: 400': '输入信息有误，请检查后重试',
    '网络错误': '网络连接不稳定，请检查网络后重试',
    '加载失败': '内容加载失败，请刷新页面重试',
    '保存失败': '保存失败，请检查网络后重试',
    '删除失败': '删除失败，请稍后重试',
    '登录失败': '登录失败，请检查账号密码是否正确',
    '数据同步失败': '数据同步失败，请检查网络连接',
    '题库文件预览失败': '题库文件预览失败，请检查文件格式',
    'JSON 更新失败': '数据格式有误，请检查输入内容',
    '操作失败': '操作失败，请稍后重试'
  };

  // 查找友好的错误提示
  let friendlyMessage = message;
  for (const [original, friendly] of Object.entries(friendlyMessages)) {
    if (message.includes(original)) {
      friendlyMessage = friendly;
      break;
    }
  }

  // 添加解决建议
  if (tone === 'error' || tone === 'warn') {
    const suggestions = {
      '网络': '💡 建议：检查网络连接，或稍后重试',
      '权限': '💡 建议：联系管理员获取相应权限',
      '登录': '💡 建议：尝试重新登录，或联系管理员',
      '保存': '💡 建议：检查网络连接，确保数据已填写完整',
      '加载': '💡 建议：刷新页面重试，或联系技术支持',
      '格式': '💡 建议：检查输入格式是否正确',
      '服务器': '💡 建议：服务器可能正在维护，请稍后重试'
    };

    for (const [keyword, suggestion] of Object.entries(suggestions)) {
      if (friendlyMessage.includes(keyword)) {
        friendlyMessage += '\n' + suggestion;
        break;
      }
    }
  }

  refs.statusPill.textContent = friendlyMessage;
  refs.statusPill.dataset.tone = tone;
  
  // 如果是错误提示，添加点击查看详情的功能
  if (tone === 'error' && message !== friendlyMessage) {
    refs.statusPill.title = `原始信息：${message}`;
    refs.statusPill.style.cursor = 'pointer';
    refs.statusPill.onclick = () => {
      window.alert(`详细信息：${message}\n\n如果问题持续存在，请联系技术支持。`);
    };
  } else {
    refs.statusPill.title = '';
    refs.statusPill.style.cursor = '';
    refs.statusPill.onclick = null;
  }
}

function isCloudWriteReady() {
  return state.health?.mode === 'cloud' && state.health?.writeTarget === 'cloud';
}

function getCloudConnectionLabel() {
  return isCloudWriteReady() ? '已锁定云端 CMS 写入' : '云端 CMS 未就绪';
}

function getEnvironmentBannerInfo(contextLabel = '当前工作区') {
  const health = state.health || {};
  const mode = health.mode || state.auth?.mode || 'unavailable';
  const modeLabel = health.modeLabel || state.auth?.modeLabel || '待检测';
  const writeTarget = health.writeTarget || 'unavailable';
  const writeTargetLabel = health.writeTargetLabel || (writeTarget === 'cloud' ? '云端 CMS' : writeTarget === 'local' ? '本地 JSON' : '暂停写入');
  const conflictGuard = Boolean(health.collaboration?.pageConflictProtection);
  const previewUrl = state.meta?.previewUrls?.[0] || health.previewUrls?.[0] || '';
  const envId = health.config?.envId || health.config?.expectedEnvId || '';
  const operatorName = state.auth?.user?.name || state.auth?.user?.loginAccount || '';

  let tone = 'warn';
  let title = '当前后台连接状态待确认';

  if (mode === 'cloud' && writeTarget === 'cloud') {
    tone = 'success';
    title = '当前正在维护云端正式内容';
  } else if (mode === 'local' || writeTarget === 'local') {
    tone = 'warn';
    title = '当前只连接到本地数据文件';
  } else if (mode === 'unavailable' || writeTarget === 'unavailable') {
    tone = 'danger';
    title = '当前后台未连上可写的数据源';
  }

  const chips = [
    `数据源 ${modeLabel}`,
    `写入目标 ${writeTargetLabel}`,
    `冲突保护 ${conflictGuard ? '已启用' : '未启用'}`,
    envId ? `环境 ${envId}` : '',
    operatorName ? `当前账号 ${operatorName}` : '',
    previewUrl ? `预览 ${previewUrl.replace(/^https?:\/\//, '')}` : ''
  ].filter(Boolean);

  return { tone, title, chips };
}

function renderEnvironmentBanner(contextLabel = '当前工作区') {
  const info = getEnvironmentBannerInfo(contextLabel);
  return `<article class="environment-banner environment-banner-${escapeHtml(info.tone)} workspace-panel-enter" style="--enter-delay: 0ms;">
    <div class="environment-banner-main">
      <div class="environment-banner-icon">${icon('info')}</div>
      <div class="environment-banner-copy">
        <strong>${escapeHtml(info.title)}</strong>
      </div>
    </div>
    <div class="environment-banner-side">
      <div class="environment-banner-chips">
        ${info.chips.map((chip) => `<span class="meta-chip">${escapeHtml(chip)}</span>`).join('')}
      </div>
    </div>
  </article>`;
}

function isPageConflictError(error) {
  return error?.statusCode === 409 || error?.code === 'PAGE_CONFLICT';
}

function getSaveSuccessMessage(label = '内容') {
  return isCloudWriteReady()
    ? `${label}已保存并同步到云端 CMS`
    : `${label}暂未写入，请先完成云环境配置`;
}

function hasOpenEditor(viewKey = state.activeView) {
  const ui = getViewUi(viewKey);
  return Object.values(ui.openEditors || {}).some(Boolean);
}

function syncModalState() {
  const hasOpen = hasOpenEditor();
  document.body.classList.toggle('modal-open', hasOpen);
  if (hasOpen) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        applyResponsiveModalLayout();
      });
    });
  }
}

function renderLoading(view = VIEW_CONFIG[state.activeView]) {
  const isOverview = view?.key === 'overview';
  const skeletonCards = isOverview
    ? `<div class="skeleton-stats-grid">
        ${Array.from({ length: 4 }).map(() => `<div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-value"></div><div class="skeleton skeleton-text short"></div></div>`).join('')}
      </div>`
    : `<div class="skeleton-summary-row">
        <div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text"></div></div>
        <div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text short"></div></div>
      </div>`;

  refs.content.innerHTML = `<section class="module-page">
    <article class="panel empty-panel skeleton-shell">
      ${skeletonCards}
      <div class="skeleton-table">
        ${Array.from({ length: 5 }).map(() => `<div class="skeleton-row">
          <div class="skeleton skeleton-cell long"></div>
          <div class="skeleton skeleton-cell"></div>
          <div class="skeleton skeleton-cell short"></div>
        </div>`).join('')}
      </div>
    </article>
  </section>`;
  dismissBootSplash();
  syncModalState();
}

function renderError(message) {
  refs.content.innerHTML = `<section class="module-page"><article class="panel empty-panel"><div class="empty-state">${escapeHtml(message)}</div></article></section>`;
  dismissBootSplash();
  syncModalState();
}

function renderOverview(data) {
  const totalPages = Object.keys(data.pages).length;
  const totalItems = Object.values(data.collections).reduce((sum, items) => sum + items.length, 0);
  const published = Object.values(data.collections).flat().filter((item) => item.status === 'published').length;
  const drafts = Object.values(data.collections).flat().filter((item) => item.status !== 'published').length;
  const todayUpdates = data.recentUpdates.filter((item) => isToday(item.updatedAt)).length;
  const mediaCount = (data.collections.mediaAssets || []).length;
  const writeSourceLabel = isCloudWriteReady() ? '云端 CMS' : '未就绪';
  const conflictGuardLabel = state.health?.collaboration?.pageConflictProtection ? '已启用' : '待补齐';
  const operatorName = state.auth?.user?.name || state.auth?.user?.loginAccount || '老师';
  const quickActions = [
    {
      label: '首页内容',
      desc: '先看首页有没有需要更新的文案和入口',
      view: 'home',
      icon: '🏠'
    },
    {
      label: '教材资料',
      desc: '按步骤维护套餐、资料和素材',
      view: 'media',
      icon: '🧰'
    },
    {
      label: '师资团队',
      desc: '维护老师介绍和头像展示',
      view: 'teachers',
      icon: '👨‍🏫'
    },
    {
      label: '题库管理',
      desc: '导入题目、检查试卷和导入记录',
      view: 'questionBank',
      icon: '📚'
    }
  ];
  const kickoffCards = [
    {
      label: '先改首页',
      meta: '首页内容 / 首屏 / CTA',
      view: 'home'
    },
    {
      label: '再改教材资料',
      meta: '教材资料 / 套系 / 素材',
      view: 'media'
    },
    {
      label: '最后检查师资与题库',
      meta: '师资团队 / 题库管理',
      view: 'teachers'
    }
  ];

  refs.content.innerHTML = `<section class="dashboard-page workspace-motion-scope">
    ${renderEnvironmentBanner('总览工作台')}
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

    <div class="dashboard-intro-grid">
      <div class="dashboard-intro-stack">
        <article class="welcome-section workspace-panel-enter" style="--enter-delay: 165ms;">
          <div class="welcome-content">
            <h2>👋 欢迎回来，${escapeHtml(operatorName)}</h2>
          </div>
          <div class="welcome-meta">
            <span class="welcome-chip">写入源 ${escapeHtml(writeSourceLabel)}</span>
            <span class="welcome-chip">今日更新 ${escapeHtml(String(todayUpdates))} 项</span>
            <span class="welcome-chip">冲突保护 ${escapeHtml(conflictGuardLabel)}</span>
          </div>
        </article>

        <article class="quick-actions panel workspace-panel-enter" style="--enter-delay: 175ms;">
          <div class="panel-head">
            <div>
              <h3>🚀 常用操作</h3>
            </div>
          </div>
          <div class="action-grid">
            ${quickActions.map((item) => `<button class="action-card" type="button" data-action="open-view" data-target-view="${escapeHtml(item.view)}">
              <span class="action-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
              <span class="action-label">${escapeHtml(item.label)}</span>
              <span class="action-desc">${escapeHtml(item.desc)}</span>
            </button>`).join('')}
          </div>
        </article>
      </div>
    </div>

    <article class="panel teacher-kickoff-panel workspace-panel-enter" style="--enter-delay: 210ms;">
      <div class="panel-head">
        <div>
          <h3>新手老师建议顺序</h3>
        </div>
      </div>
      <div class="teacher-kickoff-grid">
        ${kickoffCards.map((card, index) => `<button class="teacher-kickoff-card workspace-enter" style="--enter-delay: ${220 + index * 28}ms;" type="button" data-action="open-view" data-target-view="${escapeHtml(card.view)}">
          <span class="teacher-guide-step">步骤 ${escapeHtml(String(index + 1))}</span>
          <strong>${escapeHtml(card.label)}</strong>
          <em>${escapeHtml(card.meta)}</em>
        </button>`).join('')}
      </div>
    </article>

    <div class="dashboard-main">
      <article class="panel trend-panel workspace-panel-enter" style="--enter-delay: 180ms;">
        <div class="panel-head">
          <div>
            <h3>页面配置状态</h3>
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
      <!-- 最近操作区域 -->
      <article class="panel operations-panel workspace-panel-enter" style="--enter-delay: 280ms;">
        <div class="panel-head">
          <div>
            <h3>🕒 最近操作</h3>
            <p>你的操作历史记录，方便快速回溯。</p>
          </div>
        </div>
        <div class="operations-list">
          ${getRecentOperations(5).length ? getRecentOperations(5).map((op) => `<div class="operation-item">
            <div class="operation-icon">${getOperationIcon(op.operation)}</div>
            <div class="operation-content">
              <strong>${escapeHtml(op.operation)}</strong>
              <span class="operation-details">${escapeHtml(op.details)}</span>
              <span class="operation-time">${formatOperationTime(op.timestamp)}</span>
            </div>
          </div>`).join('') : '<div class="empty-state">暂无操作记录，开始使用系统后会自动记录。</div>'}
        </div>
      </article>

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
            <span>生产写源</span>
            <div class="system-value"><strong>${escapeHtml(writeSourceLabel)}</strong><em>${escapeHtml(state.health?.config?.envId || '未配置 env')}</em></div>
            <div class="system-track"><span class="tone-violet" style="width:${isCloudWriteReady() ? 100 : 28}%"></span></div>
          </div>
          <div class="system-card">
            <span>集合数量</span>
            <div class="system-value"><strong>${escapeHtml(String(Object.keys(data.collections).length))}</strong><em>collections</em></div>
            <div class="system-track"><span class="tone-green" style="width:${Math.min(100, Object.keys(data.collections).length * 14)}%"></span></div>
          </div>
          <div class="system-card">
            <span>冲突保护</span>
            <div class="system-value"><strong>${escapeHtml(conflictGuardLabel)}</strong><em>页面保存 revision</em></div>
            <div class="system-track"><span class="tone-sky" style="width:${state.health?.collaboration?.pageConflictProtection ? 100 : 35}%"></span></div>
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

  return `<article class="panel page-config-row-card workspace-panel-enter" id="cms-page-config-${escapeHtml(view.pageKey)}" style="--enter-delay: 120ms;">
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
    ${renderEnvironmentBanner(view.title)}
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
    ${renderTeacherWorkbenchGuide(view, data)}
    ${view.key === 'questionBank' ? renderQuestionBankPagePanel(view, data.page) : ''}
    ${(view.collections || []).map((collection) => renderCollectionSection(collection.key, data.collections[collection.key] || [])).join('')}
    ${view.key !== 'questionBank' && view.pageKey ? renderPageConfigLauncher(view, data.page) : ''}
    ${view.key !== 'questionBank' && view.pageKey ? renderPageEditorOverlay(view.pageKey, view.pageLabel, data.page) : ''}
  </section>`;
}

function renderQuestionBankModule(view, data) {
  const direction = getQuestionBankActiveDirection();
  const scopedCollections = getQuestionBankWorkspaceData(data.collections || {}, direction);

  return `<section class="module-page workspace-motion-scope">
    ${renderEnvironmentBanner(view.title)}
    <article class="panel module-hero-panel module-hero-compact workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(view.title)}</h3>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="reload-view">刷新模块</button>
        </div>
      </div>
      ${renderModuleSummary(view, { ...data, collections: scopedCollections })}
    </article>
    ${renderQuestionBankPagePanel(view, data.page)}
    <div class="question-bank-collection-stack">
      ${renderCollectionSection('medicalQuestions', scopedCollections.medicalQuestions)}
      ${renderCollectionSection('pastPapers', scopedCollections.pastPapers)}
      ${renderCollectionSection('questionImports', scopedCollections.questionImports)}
    </div>
  </section>`;
}

function renderCollectionSection(collectionKey, items) {
  if (TABLE_COLLECTIONS.has(collectionKey)) {
    return renderTableCollectionSection(collectionKey, items);
  }

  const collectionMeta = getCollectionMeta(collectionKey);
  const selected = getSelectedCollectionState(collectionKey, items);

  return `<section class="collection-section workspace-motion-scope" id="cms-section-${escapeHtml(collectionKey)}">
    <article class="panel list-panel workspace-panel-enter">
      <div class="panel-head workspace-enter" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(collectionMeta.label)}</h3>
          <p>主区先看 row 概览，详细字段统一收进弹出表单里，避免把主控区拉得太长。</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="new-item" data-collection-key="${escapeHtml(collectionKey)}">新建</button>
        </div>
      </div>
      ${renderCollectionWorkbenchGuide(collectionKey, items)}
      <div class="record-list">
        ${items.length ? items.map((item, index) => `<div class="record-row workspace-row-enter${selected.itemId === item._id && !selected.isDraft ? ' active' : ''}" style="--enter-delay: ${120 + index * 26}ms;">
          <button class="record-row-main-button" type="button" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">
            <span class="record-row-main">
              <strong class="record-row-title">${escapeHtml(getPrimaryLabel(item, collectionKey))}</strong>
              <span class="record-row-meta">${escapeHtml(getSecondaryLabel(item, collectionKey) || '暂无补充说明')}</span>
            </span>
          </button>
          <div class="record-row-side">
            <span class="record-pill ${item.status === 'published' ? 'success' : ''}">${escapeHtml(item.status || 'draft')}</span>
            <button class="row-action" type="button" data-action="select-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(item._id || '')}">编辑</button>
          </div>
        </div>`).join('') : '<div class="empty-state">当前集合还没有数据，点击右上角“新建”即可开始。</div>'}
      </div>
    </article>
    ${renderCollectionEditor(collectionKey, selected, collectionMeta)}
  </section>`;
}

function renderCollectionEditorOverlay(collectionKey, collectionLabel, selected) {
  const ui = getViewUi();
  const isOpen = Boolean(ui.openEditors[collectionKey]);

  if (!isOpen || !selected.item) {
    return '';
  }

  const editorLabel = selected.isDraft ? `新建${collectionLabel}` : `编辑 ${getPrimaryLabel(selected.item, collectionKey)}`;

  return `<div class="editor-overlay is-visible directions-editor-overlay" data-editor-collection="${escapeHtml(collectionKey)}">
    <button class="editor-overlay-backdrop" type="button" aria-label="关闭编辑弹层" data-action="close-editor" data-collection-key="${escapeHtml(collectionKey)}"></button>
    <article class="panel editor-panel editor-modal-shell editor-modal-shell-directions directions-enter-modal">
      <div class="panel-head editor-modal-head directions-enter-modal-item" style="--enter-delay: 0ms;">
        <div>
          <h3>${escapeHtml(editorLabel)}</h3>
          <p>修改完成后点击保存，或按 ESC 关闭。</p>
        </div>
        <div class="panel-actions">
          <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存</button>
          <button class="topbar-icon-button editor-close-button" type="button" data-action="close-editor" data-editor-key="${escapeHtml(collectionKey)}" aria-label="关闭编辑器">${icon('close')}</button>
        </div>
      </div>
      <div class="editor-modal-body">
        <div class="editor-meta directions-enter-modal-item" style="--enter-delay: 20ms;">
          <span class="meta-chip">ID ${escapeHtml(selected.itemId || '新建中')}</span>
          <span class="meta-chip">更新时间 ${escapeHtml(formatDateTime(getUpdatedAt(selected.item)))}</span>
          <span class="meta-chip">集合 ${escapeHtml(collectionLabel)}</span>
        </div>
        <div class="drawer-focus-bar directions-enter-modal-item" style="--enter-delay: 40ms;">
          <strong>${escapeHtml(getPrimaryLabel(selected.item, collectionKey))}</strong>
          <span>${escapeHtml(getSecondaryLabel(selected.item, collectionKey) || '已进入明细编辑')}</span>
        </div>
        <div class="directions-enter-modal-item" style="--enter-delay: 60ms;">
          ${renderFriendlyEditor(`collection:${collectionKey}`, selected.item)}
        </div>
        <div class="editor-actions directions-enter-modal-item" style="--enter-delay: 80ms;">
          <button class="system-action" type="button" data-action="save-item" data-collection-key="${escapeHtml(collectionKey)}">保存</button>
          <button class="system-action" type="button" data-action="reload-view">重新拉取</button>
          ${selected.item && !selected.isDraft ? `<button class="system-action danger-action" type="button" data-action="delete-item" data-collection-key="${escapeHtml(collectionKey)}" data-item-id="${escapeHtml(selected.itemId)}">删除</button>` : ''}
          <button class="system-action" type="button" data-action="close-editor" data-editor-key="${escapeHtml(collectionKey)}">关闭</button>
        </div>
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

  if (view.key === 'questionBank') {
    refs.content.innerHTML = renderQuestionBankModule(view, data);
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
    ${renderEnvironmentBanner(view.title)}
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
    ${renderTeacherWorkbenchGuide(view, data)}
    ${view.pageKey ? renderPageConfigLauncher(view, data.page) : ''}
    ${(view.collections || []).map((collection) => renderCollectionSection(collection.key, data.collections[collection.key] || [])).join('')}
    ${view.pageKey ? renderPageEditorOverlay(view.pageKey, view.pageLabel, data.page) : ''}
  </section>`;
  syncModalState();
}

async function loadOverviewData() {
  const cached = dataCache.get('overview');
  if (cached?.value) {
    return cached.value;
  }

  return withPendingCache('overview', async () => {
    const pageOptions = state.meta?.pageOptions || [];
    const listOptions = state.meta?.listOptions || [];

    const pageEntries = await Promise.all(pageOptions.map(async (page) => {
      const cacheKey = `page:${page.key}`;
      const pageCached = dataCache.get(cacheKey);
      if (pageCached?.value) {
        return [page.key, pageCached.value];
      }
      const result = await request(`/api/page/${page.key}`);
      const value = normalizeCmsValue(result.data || null);
      dataCache.set(cacheKey, value, getPageCacheVersion(value));
      return [page.key, value];
    }));

    const collectionEntries = await Promise.all(listOptions.map(async (collection) => {
      const cacheKey = `collection:${collection.key}`;
      const collectionCached = dataCache.get(cacheKey);
      if (collectionCached?.value) {
        return [collection.key, collectionCached.value];
      }
      const result = await request(`/api/collection/${collection.key}`);
      const value = Array.isArray(result.data) ? result.data.map((item) => normalizeCollectionItem(collection.key, item)) : [];
      dataCache.set(cacheKey, value, getCollectionCacheVersion(value));
      return [collection.key, value];
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

    return dataCache.set('overview', { pages, collections, pageLabels, recentUpdates, healthRows });
  });
}

async function loadModuleData(view) {
  const moduleCacheKey = `module:${view.key}`;
  const cached = dataCache.get(moduleCacheKey);
  if (cached?.value) {
    return cached.value;
  }

  return withPendingCache(moduleCacheKey, async () => {
    const data = {
      page: null,
      collections: {}
    };

    if (view.pageKey) {
      const pageCacheKey = `page:${view.pageKey}`;
      const pageCached = dataCache.get(pageCacheKey);
      if (pageCached?.value) {
        data.page = pageCached.value;
      } else {
        const pageResult = await request(`/api/page/${view.pageKey}`);
        data.page = normalizeCmsValue(pageResult.data || {});
        dataCache.set(pageCacheKey, data.page, getPageCacheVersion(data.page));
      }
    }

    for (const collection of view.collections || []) {
      const collectionCacheKey = `collection:${collection.key}`;
      const collectionCached = dataCache.get(collectionCacheKey);
      if (collectionCached?.value) {
        data.collections[collection.key] = collectionCached.value;
      } else {
        const result = await request(`/api/collection/${collection.key}`);
        const items = Array.isArray(result.data) ? result.data.map((item) => normalizeCollectionItem(collection.key, item)) : [];
        data.collections[collection.key] = items;
        dataCache.set(collectionCacheKey, items, getCollectionCacheVersion(items));
      }
    }

    return dataCache.set(moduleCacheKey, data);
  });
}

function schedulePreloadForView(viewKey) {
  preloadManager.preloadAdjacent(viewKey);
}

async function renderActiveView(force = false) {
  if (!state.auth?.authenticated) {
    renderAuthScreen();
    return;
  }
  applyAuthShell(false);
  ensureActiveViewAvailable();
  const view = VIEW_CONFIG[state.activeView];
  if (!view) return;
  if (force) {
    dataCache.invalidate('overview');
    dataCache.invalidate(`module:${state.activeView}`);
  }
  setTopbar(view);
  renderSidebar();
  renderLoading(view);
  state.loading = true;
  state.error = '';
  setStatus('正在同步数据...', 'loading');
  performanceMonitor.start(`switch:${state.activeView}`);

  try {
    state.currentData = state.activeView === 'overview' ? await loadOverviewData() : await loadModuleData(view);
    if (state.activeView === 'overview') {
      renderOverview(state.currentData);
    } else {
      renderModule(view, state.currentData);
    }
    setStatus(getCloudConnectionLabel(), isCloudWriteReady() ? 'ok' : 'warn');
    schedulePreloadForView(state.activeView);
  } catch (error) {
    if (error.statusCode === 401) {
      await loadAuthState();
      renderSessionControl();
      renderAuthScreen('登录状态已失效，请重新登录。');
      setStatus('请先登录后台账号', 'error');
      return;
    }
    state.error = error.message || '加载失败';
    renderError(state.error);
    setStatus('数据同步失败', 'error');
  } finally {
    state.loading = false;
    performanceMonitor.end(`switch:${state.activeView}`);
  }
}

async function savePage(pageKey) {
  const payload = cloneValue(getFormSource(`page:${pageKey}`));
  if (!payload) throw new Error('未找到页面编辑数据');
  await request(`/api/page/${pageKey}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  dataCache.invalidate(`page:${pageKey}`);
  dataCache.invalidate(`module:${resolveViewFromPageKey(pageKey)}`);
  dataCache.invalidate('overview');
}

async function saveCollectionItem(collectionKey) {
  let payload = cloneValue(getFormSource(`collection:${collectionKey}`));
  if (!payload) throw new Error('未找到条目编辑数据');
  if (collectionKey === 'mediaAssets') {
    payload = normalizeMediaAssetItem(payload);
  }
  const ui = getViewUi();
  const itemId = payload._id || ui.selectedIds[collectionKey] || '';

  if (itemId) {
    await request(`/api/collection/${collectionKey}/${encodeURIComponent(itemId)}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    ui.selectedIds[collectionKey] = itemId;
    delete ui.drafts[collectionKey];
    resetVisibleRowCount(collectionKey);
    dataCache.invalidate(`collection:${collectionKey}`);
    dataCache.invalidate(`module:${state.activeView}`);
    dataCache.invalidate('overview');
    return;
  }

  const created = await request(`/api/collection/${collectionKey}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  ui.selectedIds[collectionKey] = created.data?._id || '';
  delete ui.drafts[collectionKey];
  resetVisibleRowCount(collectionKey);
  dataCache.invalidate(`collection:${collectionKey}`);
  dataCache.invalidate(`module:${state.activeView}`);
  dataCache.invalidate('overview');
}

async function deleteCollectionItem(collectionKey, itemId) {
  if (!itemId) throw new Error('缺少条目 ID');
  await request(`/api/collection/${collectionKey}/${encodeURIComponent(itemId)}`, {
    method: 'DELETE'
  });
  const ui = getViewUi();
  delete ui.selectedIds[collectionKey];
  delete ui.drafts[collectionKey];
  resetVisibleRowCount(collectionKey);
  dataCache.invalidate(`collection:${collectionKey}`);
  dataCache.invalidate(`module:${state.activeView}`);
  dataCache.invalidate('overview');
}

async function createCollectionDraft(collectionKey) {
  const result = await request(`/api/template/${collectionKey}`);
  const ui = getViewUi();
  const nextDraft = normalizeCollectionItem(collectionKey, result.data || {});
  if (QUESTION_BANK_COLLECTION_SCOPES.has(`collection:${collectionKey}`)) {
    nextDraft.direction = getQuestionBankActiveDirection();
  }
  ui.drafts[collectionKey] = nextDraft;
  delete ui.selectedIds[collectionKey];
}

async function hydrateMeta() {
  const [meta, health] = await Promise.all([request('/api/meta'), request('/api/health')]);
  state.meta = meta;
  state.health = health;
  if (meta.currentUser) {
    state.auth.user = meta.currentUser;
  }
  if (meta.permissions) {
    state.auth.permissions = meta.permissions;
  }
}

async function switchView(viewKey) {
  if (!VIEW_CONFIG[viewKey]) return;
  if (!getVisibleNavItems().some((item) => item.key === viewKey)) return;
  state.activeView = viewKey;
  await renderActiveView(false);
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

function getViewportSize() {
  const viewport = window.visualViewport;
  return {
    width: Math.round(viewport?.width || window.innerWidth || document.documentElement.clientWidth || 1280),
    height: Math.round(viewport?.height || window.innerHeight || document.documentElement.clientHeight || 720)
  };
}

function getResponsiveModalMetrics() {
  const viewport = getViewportSize();
  const edge = viewport.width <= 720 ? 12 : viewport.width <= 1080 ? 20 : 32;
  const preferredWidth = viewport.width <= 720
    ? viewport.width - edge * 2
    : viewport.width <= 1280
      ? Math.min(760, viewport.width - edge * 2)
      : Math.min(820, Math.round(viewport.width * 0.68));
  const modalWidth = Math.max(320, preferredWidth);
  const modalMaxHeight = Math.max(360, viewport.height - edge * 2);

  return {
    modalWidth,
    modalMaxHeight
  };
}

function applyResponsiveModalLayout() {
  if (!hasOpenEditor()) return;
  const { modalWidth, modalMaxHeight } = getResponsiveModalMetrics();
  document.querySelectorAll('.editor-modal-shell').forEach((shell) => {
    shell.style.setProperty('--modal-responsive-width', `${modalWidth}px`);
    shell.style.setProperty('--modal-responsive-max-height', `${modalMaxHeight}px`);
  });
}

function bindResponsiveModalLayout() {
  const sync = () => {
    applyResponsiveModalLayout();
  };
  window.addEventListener('resize', sync);
  window.addEventListener('orientationchange', sync);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', sync);
    window.visualViewport.addEventListener('scroll', sync);
  }
}

function bindGlobalActions() {
  bindResponsiveModalLayout();

  refs.nav.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-nav]');
    if (!button || state.loading) return;
    await switchView(button.dataset.nav);
  });

  refs.nav.addEventListener('mouseover', (event) => {
    const button = event.target.closest('[data-nav]');
    if (!button) return;
    preloadManager.preloadView(button.dataset.nav, 90);
  });

  refs.nav.addEventListener('focusin', (event) => {
    const button = event.target.closest('[data-nav]');
    if (!button) return;
    preloadManager.preloadView(button.dataset.nav, 90);
  });

  refs.authRoot?.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-auth-form]');
    if (!form) return;
    event.preventDefault();
    await handleAuthFormSubmit(form);
  });

  refs.authRoot?.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    if (handleAuthAction(button)) {
      return;
    }
  });

  refs.content.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-auth-form]');
    if (!form) return;
    event.preventDefault();
    await handleAuthFormSubmit(form);
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
        const currentView = VIEW_CONFIG[state.activeView];
        if (currentView?.pageKey) {
          dataCache.invalidate(`page:${currentView.pageKey}`);
        }
        for (const collection of currentView?.collections || []) {
          dataCache.invalidate(`collection:${collection.key}`);
          resetVisibleRowCount(collection.key);
        }
        dataCache.invalidate(`module:${state.activeView}`);
        dataCache.invalidate('overview');
        await renderActiveView(true);
        return;
      }

      if (action === 'dismiss-onboarding') {
        localStorage.setItem('admin-web-onboarding-dismissed', 'true');
        if (state.activeView === 'overview') {
          renderOverview(state.currentData);
        }
        setStatus('已更新工作台');
        return;
      }

      if (handleAuthAction(button)) {
        return;
      }

      if (action === 'open-question-bank-import') {
        const ui = getViewUi('questionBank');
        ui.openEditors.questionBankCsvImport = true;
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'set-question-bank-direction') {
        const ui = getQuestionBankWorkspaceUi();
        const nextDirection = normalizeQuestionBankDirection(button.dataset.directionKey || 'medical');
        if (ui.questionDirection === nextDirection) {
          return;
        }
        ui.questionDirection = nextDirection;
        ['medicalQuestions', 'pastPapers', 'questionImports'].forEach((key) => {
          ui.openEditors[key] = false;
          delete ui.selectedIds[key];
          delete ui.drafts[key];
          resetVisibleRowCount(key);
        });
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus(`已切换到${getQuestionBankDirectionMeta(nextDirection).label}题库工作台`);
        return;
      }

      if (action === 'set-question-bank-import-guide') {
        const ui = getQuestionBankWorkspaceUi();
        ui.questionImportGuide = button.dataset.guideKey || 'excel';
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
        const input = refs.content.querySelector('[data-question-bank-file-input]');
        if (!input) {
          throw new Error('未找到题库文件上传入口，请刷新后重试。');
        }
        input.value = '';
        input.click();
        return;
      }

      if (action === 'clear-question-bank-import') {
        resetQuestionBankImportUi();
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        setStatus('已清空当前题库文件预览。');
        return;
      }

      if (action === 'commit-question-bank-import') {
        await commitQuestionBankImport();
        return;
      }

      if (action === 'save-page' && pageKey) {
        try {
          setStatus('正在保存页面...', 'loading');
          await savePage(pageKey);
          await renderActiveView(true);
          setStatus(getSaveSuccessMessage('页面'), isCloudWriteReady() ? 'ok' : 'warn');
        } catch (error) {
          if (isPageConflictError(error)) {
            const latestUpdatedAt = error?.data?.updatedAt ? formatDateTime(error.data.updatedAt) : '刚刚';
            setStatus('页面已被其他老师更新，请先重新拉取。', 'warn');
            window.alert(`${error.message || '当前页面已被其他老师更新，请先重新拉取后再保存。'}\n\n最新更新时间：${latestUpdatedAt}\n建议先刷新页面，再确认最新内容后继续编辑。`);
            return;
          }
          throw error;
        }
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
        resetVisibleRowCount(collectionKey);
        renderModule(VIEW_CONFIG[state.activeView], state.currentData);
        return;
      }

      if (action === 'load-more-rows' && collectionKey) {
        increaseVisibleRowCount(collectionKey);
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
        setStatus('条目已从云端 CMS 删除');
      }
    } catch (error) {
      setStatus(error.message || '操作失败', 'error');
      window.alert(error.message || '操作失败');
    }
  });

  refs.content.addEventListener('mouseover', (event) => {
    const target = event.target.closest('[data-target-view]');
    if (!target) return;
    preloadManager.preloadView(target.dataset.targetView, 110);
  });

  refs.content.addEventListener('focusin', (event) => {
    const target = event.target.closest('[data-target-view]');
    if (!target) return;
    preloadManager.preloadView(target.dataset.targetView, 110);
  });

  function handleFormMutation(event) {
    const fileInput = event.target.closest('[data-question-bank-file-input]');
    if (fileInput) {
      const [file] = Array.from(fileInput.files || []);
      previewQuestionBankImportFile(file).catch((error) => {
        setStatus(error.message || '题库文件预览失败', 'error');
        window.alert(error.message || '题库文件预览失败');
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
      resetVisibleRowCount(collectionKey);
      renderModule(VIEW_CONFIG[state.activeView], state.currentData);
      return;
    }

    const roleFilter = event.target.closest('[data-role-filter]');
    if (roleFilter) {
      const ui = getViewUi();
      const collectionKey = roleFilter.dataset.roleFilter;
      ui.roleFilters[collectionKey] = roleFilter.value || 'all';
      resetVisibleRowCount(collectionKey);
      renderModule(VIEW_CONFIG[state.activeView], state.currentData);
      return;
    }

    const accountStatusFilter = event.target.closest('[data-account-status-filter]');
    if (accountStatusFilter) {
      const ui = getViewUi();
      const collectionKey = accountStatusFilter.dataset.accountStatusFilter;
      ui.statusFilters[collectionKey] = accountStatusFilter.value || 'all';
      resetVisibleRowCount(collectionKey);
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

  refs.sidebarCollapse.addEventListener('click', () => {
    applySidebarCollapsed(!state.sidebarCollapsed);
  });

  refs.toolbarActions.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (button?.dataset.action === 'logout') {
      await logoutCurrentUser();
      return;
    }
  });

  document.addEventListener('click', async (event) => {
    const logoutButton = event.target.closest('[data-action="logout"]');
    if (logoutButton && !logoutButton.closest('.toolbar-actions')) {
      await logoutCurrentUser();
      return;
    }

    if (event.target.closest('#refresh-view')) {
      if (!state.auth.authenticated) {
        await loadAuthState();
        renderSessionControl();
        renderAuthScreen();
        return;
      }
      await renderActiveView(true);
      return;
    }

    if (event.target.closest('#help-button')) {
      showHelpModal();
      return;
    }

    if (event.target.closest('#topbar-search')) {
      window.alert('当前版本先聚焦内容编辑，搜索入口下一轮再补。');
      return;
    }

    if (event.target.closest('#topbar-alerts')) {
      window.alert('当前版本没有独立通知中心，但最近更新已接入总览页。');
    }
  });
}

// 帮助文档弹窗功能
function showHelpModal() {
  const currentView = VIEW_CONFIG[state.activeView];
  const viewTitle = currentView?.title || '当前页面';
  
  const helpContent = getHelpContent(state.activeView);
  
  const modal = document.createElement('div');
  modal.className = 'help-modal-overlay';
  modal.innerHTML = `
    <div class="help-modal">
      <div class="help-modal-header">
        <h2>📖 ${escapeHtml(viewTitle)}帮助</h2>
        <button class="help-modal-close" onclick="this.closest('.help-modal-overlay').remove()">×</button>
      </div>
      <div class="help-modal-body">
        ${helpContent}
      </div>
      <div class="help-modal-footer">
        <button class="system-action" onclick="this.closest('.help-modal-overlay').remove()">我知道了</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // ESC键关闭
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

function getHelpContent(viewKey) {
  const helpData = {
    overview: {
      title: '工作台',
      sections: [
        {
          title: '工作台',
          content: `
            <ul>
              <li><strong>页面配置</strong>：查看各页面状态与更新时间</li>
              <li><strong>常用操作</strong>：进入首页、教材、师资和题库</li>
              <li><strong>最近更新</strong>：查看最新变更记录</li>
              <li><strong>运行概况</strong>：查看当前系统状态</li>
            </ul>
          `
        }
      ]
    },
    home: {
      title: '首页内容',
      sections: [
        {
          title: '📝 主要功能',
          content: `
            <ul>
              <li><strong>首页大屏</strong>：编辑首页顶部的标题、说明和按钮</li>
              <li><strong>数据卡</strong>：配置首屏展示的3个数据统计卡</li>
              <li><strong>功能入口</strong>：设置4个快捷功能入口</li>
              <li><strong>热门方向</strong>：选择推荐的课程方向</li>
              <li><strong>学习支持</strong>：编辑学习支持卡片内容</li>
            </ul>
          `
        },
        {
          title: '⚠️ 注意事项',
          content: `
            <ul>
              <li>数据卡最多只能配置3个</li>
              <li>功能入口最多只能配置4个</li>
              <li>热门方向需要先在方向管理中创建</li>
              <li>修改后记得点击保存按钮</li>
            </ul>
          `
        }
      ]
    },
    directions: {
      title: '课程方向',
      sections: [
        {
          title: '📚 主要功能',
          content: `
            <ul>
              <li><strong>方向管理</strong>：创建和编辑课程方向</li>
              <li><strong>首页推荐</strong>：设置哪些方向在首页展示</li>
              <li><strong>方向卡片</strong>：配置方向的展示样式</li>
              <li><strong>排序管理</strong>：调整方向的显示顺序</li>
            </ul>
          `
        },
        {
          title: '🔧 操作说明',
          content: `
            <ul>
              <li>点击"新建方向"创建新的课程方向</li>
              <li>点击表格行可以编辑方向详情</li>
              <li>使用"首页精选"标记推荐方向</li>
              <li>通过排序值控制显示顺序</li>
            </ul>
          `
        }
      ]
    },
    questionBank: {
      title: '题库管理',
      sections: [
        {
          title: '❓ 主要功能',
          content: `
            <ul>
              <li><strong>题目管理</strong>：创建、编辑和删除题目</li>
              <li><strong>试卷管理</strong>：组织题目成套卷</li>
              <li><strong>文件导入</strong>：批量导入题目数据</li>
              <li><strong>导入记录</strong>：查看导入历史</li>
            </ul>
          `
        },
        {
          title: '📤 文件导入说明',
          content: `
            <ul>
              <li>支持 Word、PDF、Excel、纯文本、JSON 等常见资料格式</li>
              <li>单选答案示例：A</li>
              <li>多选答案示例：A|C|D</li>
              <li>判断答案示例：T / F</li>
              <li>同一套卷的题目会自动归为一套试卷</li>
            </ul>
          `
        }
      ]
    },
    teachers: {
      title: '师资团队',
      sections: [
        {
          title: '👨‍🏫 主要功能',
          content: `
            <ul>
              <li><strong>老师管理</strong>：添加和编辑老师信息</li>
              <li><strong>头像设置</strong>：上传老师头像</li>
              <li><strong>擅长标签</strong>：标注老师的专业领域</li>
              <li><strong>排序控制</strong>：调整老师展示顺序</li>
            </ul>
          `
        },
        {
          title: '📋 字段说明',
          content: `
            <ul>
              <li><strong>姓名</strong>：老师的真实姓名</li>
              <li><strong>角色</strong>：如主讲老师、辅导老师等</li>
              <li><strong>标签</strong>：简短的身份标识</li>
              <li><strong>简介</strong>：老师的详细介绍</li>
              <li><strong>擅长</strong>：专业领域标签</li>
            </ul>
          `
        }
      ]
    },
    results: {
      title: '学员成果',
      sections: [
        {
          title: '🏆 主要功能',
          content: `
            <ul>
              <li><strong>案例管理</strong>：添加和编辑学员成功案例</li>
              <li><strong>路径标签</strong>：标注学员的学习路径</li>
              <li><strong>成绩展示</strong>：展示学员的提分效果</li>
              <li><strong>案例筛选</strong>：按方向和路径筛选案例</li>
            </ul>
          `
        },
        {
          title: '✨ 案例要素',
          content: `
            <ul>
              <li><strong>学生姓名</strong>：案例主人公</li>
              <li><strong>起点/终点</strong>：展示提分效果</li>
              <li><strong>案例原话</strong>：学员的真实评价</li>
              <li><strong>适合人群</strong>：哪些学员适合参考</li>
            </ul>
          `
        }
      ]
    },
    about: {
      title: '关于我们',
      sections: [
        {
          title: '🏢 主要功能',
          content: `
            <ul>
              <li><strong>机构介绍</strong>：编辑机构的基本信息</li>
              <li><strong>教学理念</strong>：展示机构的教学理念</li>
              <li><strong>环境展示</strong>：上传校区环境图片</li>
              <li><strong>联系方式</strong>：设置联系信息</li>
            </ul>
          `
        }
      ]
    },
    contact: {
      title: '联系方式',
      sections: [
        {
          title: '📞 主要功能',
          content: `
            <ul>
              <li><strong>品牌信息</strong>：设置机构名称和品牌</li>
              <li><strong>联系电话</strong>：设置咨询电话</li>
              <li><strong>微信咨询</strong>：设置微信号</li>
              <li><strong>地址信息</strong>：设置校区地址</li>
              <li><strong>服务时间</strong>：设置咨询服务时间</li>
            </ul>
          `
        }
      ]
    },
    media: {
      title: '教材资料',
      sections: [
        {
          title: '📚 主要功能',
          content: `
            <ul>
              <li><strong>资料管理</strong>：上传和管理学习资料</li>
              <li><strong>套系包</strong>：组织资料成套系</li>
              <li><strong>素材库</strong>：管理图片、视频等素材</li>
              <li><strong>方向分类</strong>：按方向和阶段分类</li>
            </ul>
          `
        }
      ]
    },
    accounts: {
      title: '账号管理',
      sections: [
        {
          title: '👥 主要功能',
          content: `
            <ul>
              <li><strong>账号创建</strong>：为老师创建登录账号</li>
              <li><strong>角色分配</strong>：设置账号的权限角色</li>
              <li><strong>状态管理</strong>：启用或停用账号</li>
              <li><strong>密码管理</strong>：重置账号密码</li>
            </ul>
          `
        },
        {
          title: '🔐 角色权限',
          content: `
            <ul>
              <li><strong>管理员</strong>：拥有所有权限</li>
              <li><strong>发布老师</strong>：可以发布内容</li>
              <li><strong>编辑老师</strong>：可以编辑内容</li>
              <li><strong>查看老师</strong>：只能查看内容</li>
            </ul>
          `
        }
      ]
    }
  };

  const help = helpData[viewKey] || {
    title: '帮助',
    sections: [
      {
        title: '📖 使用帮助',
        content: '<p>暂无该页面的详细帮助文档。</p>'
      }
    ]
  };

  return help.sections.map(section => `
    <div class="help-section">
      <h3>${section.title}</h3>
      ${section.content}
    </div>
  `).join('');
}

// 操作记录功能
const operationHistory = [];
const MAX_HISTORY_SIZE = 50;

function recordOperation(operation, details = '') {
  const record = {
    id: Date.now(),
    operation,
    details,
    timestamp: new Date().toISOString(),
    view: state.activeView
  };
  
  operationHistory.unshift(record);
  
  // 限制历史记录数量
  if (operationHistory.length > MAX_HISTORY_SIZE) {
    operationHistory.pop();
  }
  
  // 保存到本地存储
  try {
    localStorage.setItem('admin-web-operations', JSON.stringify(operationHistory.slice(0, 10)));
  } catch (e) {
    // 忽略存储错误
  }
}

function loadOperationHistory() {
  try {
    const saved = localStorage.getItem('admin-web-operations');
    if (saved) {
      const parsed = JSON.parse(saved);
      operationHistory.push(...parsed);
    }
  } catch (e) {
    // 忽略加载错误
  }
}

function getRecentOperations(limit = 5) {
  return operationHistory.slice(0, limit);
}

function formatOperationTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  
  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`;
  return `${Math.floor(diff / day)} 天前`;
}

function getOperationIcon(operation) {
  const iconMap = {
    '登录': '🔐',
    '退出': '🚪',
    '保存': '💾',
    '删除': '🗑️',
    '新建': '➕',
    '编辑': '✏️',
    '导入': '📤',
    '导出': '📥',
    '刷新': '🔄',
    '搜索': '🔍',
    '上传': '⬆️',
    '下载': '⬇️',
    '复制': '📋',
    '粘贴': '📌',
    '撤销': '↩️',
    '重做': '↪️'
  };
  
  // 查找匹配的图标
  for (const [key, icon] of Object.entries(iconMap)) {
    if (operation.includes(key)) {
      return icon;
    }
  }
  
  return '📝'; // 默认图标
}

async function bootstrap() {
  applyTheme('light');
  applySidebarCollapsed(preferredSidebarCollapsed());
  renderSessionControl();
  bindGlobalActions();
  loadOperationHistory();

  try {
    await loadAuthState();
    renderSessionControl();
    if (!state.auth.cloudReady || !state.auth.authenticated) {
      setTopbar(VIEW_CONFIG.overview);
      setStatus(state.auth.cloudReady ? '请先登录后台账号' : '请先连接云端 CMS', state.auth.cloudReady ? 'loading' : 'error');
      renderAuthScreen();
      finishBootAnimation();
      return;
    }
    await hydrateMeta();
    await renderActiveView(true);
    finishBootAnimation();
  } catch (error) {
    if (error.statusCode === 401) {
      await loadAuthState();
      renderSessionControl();
      renderAuthScreen('请先登录后台账号。');
      finishBootAnimation();
      return;
    }
    setTopbar(VIEW_CONFIG.overview);
    setStatus('CMS 服务不可用', 'error');
    renderError(error.message || '初始化失败');
    finishBootAnimation();
  }
}

bootstrap();
