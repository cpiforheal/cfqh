const NAV_ITEMS = [
  { key: 'overview', label: '总览', icon: 'grid' },
  { key: 'directions', label: '方向', icon: 'compass' },
  { key: 'questionBank', label: '题库', icon: 'search' },
  { key: 'teachers', label: '师资', icon: 'users' },
  { key: 'results', label: '成果', icon: 'award' },
  { key: 'about', label: '关于', icon: 'info' },
  { key: 'contact', label: '联系', icon: 'phone' },
  { key: 'media', label: '媒体', icon: 'image' },
  { key: 'accounts', label: '角色管理', icon: 'users' }
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
      { key: 'materialPackages', label: '主推套系包' },
      { key: 'materialItems', label: '货架资料卡' }
    ]
  },
  accounts: {
    key: 'accounts',
    kicker: '权限',
    breadcrumb: '角色管理',
    title: '角色管理',
    subtitle: '用表格维护老师登录账号、角色权限和启停状态，所有数据都直接同步到小程序云端数据库。',
    pageKey: null,
    pageLabel: '',
    collections: [{ key: 'adminUsers', label: '角色成员' }]
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
  trash: '<path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>'
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
  refs.app.dataset.auth = locked ? 'locked' : 'ready';
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
    ? '当前 3200 后台只在云端 CMS 模式下开放账号登录。请先配置 CloudBase 环境变量，再刷新页面。'
    : bootstrapRequired
      ? '首次启用后台，请先创建一个可登录的管理员账号。账号信息只会写入小程序云端数据库。'
      : '请输入云端后台账号和密码。登录成功后才会进入内容管理工作台。';
  const title = !cloudReady ? 'Cloud CMS required' : bootstrapRequired ? 'Create admin account' : 'Welcome back!';
  const subtitle = !cloudReady ? 'Please connect your cloud environment' : bootstrapRequired ? 'Set up the first admin for your CMS' : 'Please enter your details';
  renderLockedSidebar();
  refs.topbarKicker.textContent = '权限';
  refs.topbarBreadcrumb.textContent = '登录后台';
  refs.viewTitle.textContent = bootstrapRequired ? '创建管理员' : '老师登录';
  setStatus(cloudReady ? (bootstrapRequired ? '等待创建首个管理员' : '等待老师登录') : '等待连接云端 CMS', cloudReady ? 'ok' : 'warn');

  refs.content.innerHTML = `<section class="auth-shell">
    <div class="auth-visual">
      <div class="auth-brand">
        <div class="auth-brand-mark">启</div>
        <div class="auth-brand-copy">
          <strong>CareerCompass</strong>
        </div>
      </div>
      <div class="auth-hero">
        <div class="auth-hero-copy">
          <h2>乘帆起航</h2>
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
        <div class="auth-visual-footer">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact</span>
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
            <span>未检测到可用的 CloudBase 云环境配置。</span>
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
              <span>${bootstrapRequired ? 'Admin email or account' : 'Email'}</span>
              <input name="loginAccount" type="text" placeholder="${bootstrapRequired ? 'you@example.com' : 'you@example.com'}" autocomplete="username" />
            </label>
            <label class="auth-field auth-field-password">
              <span>Password</span>
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
                <span>Remember for 30 days</span>
              </label>
              <button class="auth-text-action" type="button" data-action="forgot-password">Forgot password?</button>
            </div>
            <button class="auth-submit" type="submit">${bootstrapRequired ? 'Create admin' : 'Log In'}</button>
            <div class="auth-form-footer">
              <span>${escapeHtml(bootstrapRequired ? 'The first admin will enter the CMS with owner permission.' : 'Need access? Contact the system admin to create or reset your account.')}</span>
            </div>
          </form>
        `}
      </div>
    </div>
  </section>`;
  initAuthVisualMotion();
  syncModalState();
}

function initAuthVisualMotion() {
  if (typeof authVisualCleanup === 'function') {
    authVisualCleanup();
    authVisualCleanup = null;
  }
  const shell = refs.content.querySelector('.auth-shell');
  const scene = refs.content.querySelector('[data-auth-scene]');
  if (!shell || !scene) return;

  const passwordInput = refs.content.querySelector('.auth-form input[name="password"]');
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

  window.addEventListener('mousemove', handlePointerMove);
  scene.addEventListener('mouseleave', handlePointerLeave);
  if (passwordInput) {
    passwordInput.addEventListener('focus', handlePasswordFocus);
    passwordInput.addEventListener('blur', handlePasswordBlur);
  }

  authVisualCleanup = () => {
    window.removeEventListener('mousemove', handlePointerMove);
    scene.removeEventListener('mouseleave', handlePointerLeave);
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
  state.auth.user = result.data?.admin || null;
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
  if (collectionKey === 'adminUsers') return item.name || item.loginAccount || item._id || '未命名账号';
  if (collectionKey === 'directions') return item.name || item.slug || item._id || '未命名方向';
  if (collectionKey === 'medicalQuestions') return item.stem || item.questionId || item._id || '未命名题目';
  if (collectionKey === 'pastPapers') return item.title || item.paperId || item._id || '未命名试卷';
  if (collectionKey === 'questionImports') return item.title || item.sourceType || item._id || '未命名导入';
  if (collectionKey === 'teachers') return item.name || item.role || item._id || '未命名老师';
  if (collectionKey === 'successCases') return item.title || item.subtitle || item._id || '未命名案例';
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
  if (collectionKey === 'successCases') return [item.category, item.year].filter(Boolean).join(' / ');
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
  importGuide: '导入说明',
  templateText: '模板文本',
  questionId: '题目编号',
  loginAccount: '后台登录账号',
  password: '登录密码',
  hasPassword: '已设置密码',
  authChannels: '登录方式',
  lastLoginAt: '最近登录时间',
  direction: '方向',
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
  'features',
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
  options: { id: '', text: '' },
  tags: '',
  categories: '',
  suggestions: '',
  featuredDirectionIds: '',
  contentItemIds: '',
  specialties: '',
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
      desc: '这里维护的是成果页当前真实会显示的结果首屏、结果证明数据和底部咨询承接区。'
    },
    sections: [
      {
        title: '结果首屏',
        desc: '对应成果页顶部的大标题、说明和首屏标签。',
        keys: ['hero']
      },
      {
        title: '结果证明数据',
        desc: '对应成果页首屏里的 3 张结果证明数据卡。',
        keys: ['stats']
      }
    ],
    secondarySections: [
      {
        title: '底部咨询承接区',
        desc: '对应成果页最下方的咨询承接卡片。',
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
    hero: '结果首屏',
    'hero.chip': '首屏小角标',
    'hero.title': '结果首屏主标题',
    'hero.desc': '结果首屏说明',
    stats: '结果证明数据',
    'stats.*': '结果证明卡',
    'stats.*.value': '证明数值',
    'stats.*.label': '证明标签',
    'stats.*.note': '补充说明',
    cta: '底部咨询承接区',
    'cta.title': '承接区标题',
    'cta.desc': '承接区说明',
    'cta.buttonText': '承接按钮文案'
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
    'wrongBookCard.note': '补充提示'
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
    title: '上岸故事标题',
    subtitle: '上岸故事说明',
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
  const inputPlaceholder = isImageUrlField ? '直接粘贴图床链接' : '';
  const isDirectionScope = scope === 'collection:directions' || scope === 'page:courses';
  const useWideField = isImageUrlField || isDirectionScope;

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
  'adminUsers',
  'directions',
  'medicalQuestions',
  'pastPapers',
  'questionImports',
  'teachers',
  'successCases',
  'mediaAssets',
  'materialPackages',
  'materialItems'
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
  materialPackages: [
    {
      key: 'title',
      label: '套系标题',
      render: (item) => `<strong class="data-table-title">${escapeHtml(item.title || '未命名套系包')}</strong><span class="data-table-sub">${escapeHtml(item.badge || item._id || '')}</span>`
    },
    { key: 'direction', label: '方向', render: (item) => escapeHtml(item.direction || '-') },
    { key: 'stage', label: '阶段', render: (item) => escapeHtml(item.stage || '-') },
    { key: 'features', label: '卖点数', render: (item) => escapeHtml(String((item.features || []).length || 0)) },
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
        id: 'hero',
        title: '结果首屏',
        desc: '对应成果页顶部的大标题、说明和首屏标签。',
        meta: page.hero?.title || page.hero?.desc || '首屏标题 / 说明',
        location: '首屏标题 / 首屏说明 / 首屏标签',
        keys: ['hero']
      },
      {
        id: 'stats',
        title: '结果证明数据',
        desc: '对应成果页首屏里的 3 张结果证明数据卡。',
        meta: `${(page.stats || []).length} 项结果证明`,
        location: '数据数值 / 数据标签 / 补充说明',
        keys: ['stats']
      },
      {
        id: 'successCases',
        title: '上岸案例条目',
        desc: '对应成果页里的代表案例和后续案例时间线。',
        meta: `${(state.currentData?.collections?.successCases || []).length} 个成果案例`,
        location: '案例标题 / 案例说明 / 上岸年份 / 案例分类 / 封面图片',
        keys: [],
        linkOnly: true,
        targetView: 'results',
        targetCollectionKey: 'successCases',
        actionLabel: '去案例列表修改',
        statusText: '已跳转到成果案例列表，请修改上岸故事条目。'
      },
      {
        id: 'cta',
        title: '底部咨询承接区',
        desc: '对应成果页最下方的咨询承接卡片。',
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

function renderPageWorkflowGuide(pageKey, rows = []) {
  if (pageKey !== 'materials' || !rows.length) {
    return '';
  }

  const cards = [
    {
      title: '先改页面顶部',
      desc: '如果你只是想先让页面顺眼一点，先点“第 1 步 · 页面顶部”。',
      meta: '标题 / 方向切换 / 阶段按钮'
    },
    {
      title: '再改主推大卡',
      desc: '主推套系是学生最容易停下来阅读的地方，优先改这里。',
      meta: '角标 / 主标题 / 卖点 / 适合人群'
    },
    {
      title: '最后补货架和咨询',
      desc: '资料卡和底部咨询条放在最后改，节奏更清楚，也不容易乱。',
      meta: '资料卡 / 咨询按钮'
    }
  ];

  return `<div class="page-workflow-guide workspace-enter" style="--enter-delay: 140ms;">
    <div class="page-workflow-guide-head">
      <strong>推荐修改顺序</strong>
      <span>不用把所有词条一次看完，按这个顺序改就能快速完成一张页面。</span>
    </div>
    <div class="page-workflow-guide-grid">
      ${cards.map((card) => `<div class="page-workflow-guide-card">
        <strong>${escapeHtml(card.title)}</strong>
        <p>${escapeHtml(card.desc)}</p>
        <em>${escapeHtml(card.meta)}</em>
      </div>`).join('')}
    </div>
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
          ${renderPageWorkflowGuide(view.pageKey, rows)}
          ${renderPageSectionNavCards(view.pageKey, rows, selectedSectionId, 'open-page-section-editor')}
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
  refs.statusPill.textContent = message;
  refs.statusPill.dataset.tone = tone;
}

function isCloudWriteReady() {
  return state.health?.mode === 'cloud' && state.health?.writeTarget === 'cloud';
}

function getCloudConnectionLabel() {
  return isCloudWriteReady() ? '已锁定云端 CMS 写入' : '云端 CMS 未就绪';
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
  const writeSourceLabel = isCloudWriteReady() ? '云端 CMS' : '未就绪';
  const writeSourceNote = isCloudWriteReady()
    ? '当前写入已锁定到小程序云端数据库。'
    : '云环境未完成，当前后台已暂停生产写入。';
  const conflictGuardLabel = state.health?.collaboration?.pageConflictProtection ? '已启用' : '待补齐';

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
            <p>${escapeHtml(writeSourceNote)} 这里展示各页面最后更新时间。</p>
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
  if (collectionKey === 'adminUsers') {
    return renderAdminUsersSection(collectionKey, items);
  }

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
  if (!state.auth?.authenticated) {
    renderAuthScreen();
    return;
  }
  applyAuthShell(false);
  ensureActiveViewAvailable();
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
    setStatus(getCloudConnectionLabel(), isCloudWriteReady() ? 'ok' : 'warn');
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

  refs.content.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-auth-form]');
    if (!form) return;
    event.preventDefault();
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

      if (action === 'toggle-password') {
        const field = button.closest('.auth-password-input');
        const input = field?.querySelector('input[name="password"]');
        if (!input) return;
        const nextType = input.type === 'password' ? 'text' : 'password';
        input.type = nextType;
        button.setAttribute('aria-pressed', nextType === 'text' ? 'true' : 'false');
        field.classList.toggle('is-visible', nextType === 'text');
        return;
      }

      if (action === 'forgot-password') {
        setStatus('请联系系统管理员重置后台密码。', 'warn');
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

    const roleFilter = event.target.closest('[data-role-filter]');
    if (roleFilter) {
      const ui = getViewUi();
      const collectionKey = roleFilter.dataset.roleFilter;
      ui.roleFilters[collectionKey] = roleFilter.value || 'all';
      renderModule(VIEW_CONFIG[state.activeView], state.currentData);
      return;
    }

    const accountStatusFilter = event.target.closest('[data-account-status-filter]');
    if (accountStatusFilter) {
      const ui = getViewUi();
      const collectionKey = accountStatusFilter.dataset.accountStatusFilter;
      ui.statusFilters[collectionKey] = accountStatusFilter.value || 'all';
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

    if (event.target.closest('#topbar-search')) {
      window.alert('当前版本先聚焦内容编辑，搜索入口下一轮再补。');
      return;
    }

    if (event.target.closest('#topbar-alerts')) {
      window.alert('当前版本没有独立通知中心，但最近更新已接入总览页。');
    }
  });
}

async function bootstrap() {
  applyTheme('light');
  applySidebarCollapsed(preferredSidebarCollapsed());
  renderSessionControl();
  bindGlobalActions();

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
