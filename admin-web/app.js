const NAV_ITEMS = [
  { key: 'overview', label: '总览', icon: 'grid', active: true },
  { key: 'directions', label: '方向', icon: 'compass', active: false },
  { key: 'teachers', label: '师资', icon: 'users', active: false },
  { key: 'results', label: '成果', icon: 'award', active: false },
  { key: 'about', label: '关于', icon: 'info', active: false },
  { key: 'contact', label: '联系', icon: 'phone', active: false },
  { key: 'media', label: '媒体', icon: 'image', active: false }
];

const DASHBOARD_CARDS = [
  { title: '内容总数', value: '1,284', delta: '+12%', note: '较上周', tone: 'indigo', icon: 'grid' },
  { title: '已发布 / 草稿', value: '1,042', extra: '/ 242', delta: '', note: '', tone: 'green', icon: 'compass' },
  { title: '媒体资源', value: '3,492', delta: '+5%', note: '较上周', tone: 'sky', icon: 'image' },
  { title: '今日更新', value: '24', delta: '-2%', note: '较上周', tone: 'violet', icon: 'refresh' }
];

const TREND_SERIES = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  visits: [2400, 1500, 9900, 4100, 4800, 3900, 4300],
  updates: [4100, 3200, 2100, 2800, 1900, 2300, 3400],
  ticks: [0, 2500, 5000, 7500, 10000]
};

const HEALTH_ROWS = [
  { label: '首页配置', value: 100, tone: 'green' },
  { label: '师资团队', value: 85, tone: 'amber' },
  { label: '开设方向', value: 98, tone: 'green' },
  { label: '媒体资源', value: 92, tone: 'green' }
];

const RECENT_UPDATES = [
  { title: '更新了"2024秋季招生简章"', module: '首页配置', user: 'Admin', time: '10分钟前' },
  { title: '新增了 31 位特聘教授信息', module: '师资团队', user: 'Editor_Li', time: '2小时前' },
  { title: '修改了联系方式电话', module: '联系', user: 'Admin', time: '5小时前' },
  { title: '上传了校园环境宣传图组', module: '媒体资源', user: 'Admin', time: '昨天 14:30' }
];

const SYSTEM_OVERVIEW = [
  { label: '存储空间', value: '45', suffix: '/ 100 GB', width: 45, tone: 'violet' },
  { label: '数据库负载', value: '12', suffix: '%', width: 12, tone: 'green' }
];

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
  theme: 'light'
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
  const saved = localStorage.getItem('admin-mock-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  refs.themeToggle.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon');
  refs.themeToggle.title = theme === 'dark' ? '切换为亮色主题' : '切换为暗色主题';
  refs.themeToggle.setAttribute('aria-label', refs.themeToggle.title);
  localStorage.setItem('admin-mock-theme', theme);
}

function buildChartPoints(values, width, height, padX, padY, maxValue) {
  const stepX = (width - padX * 2) / Math.max(values.length - 1, 1);
  return values.map((value, index) => {
    const x = padX + index * stepX;
    const y = height - padY - (value / maxValue) * (height - padY * 2);
    return { x, y };
  });
}

function smoothPath(points) {
  if (!points.length) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

function areaPath(points, height, bottomY) {
  if (!points.length) return '';
  return `${smoothPath(points)} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
}

function renderChart() {
  const width = 1004;
  const height = 246;
  const padX = 48;
  const padY = 24;
  const maxValue = 10000;
  const baseline = height - padY;
  const visitPoints = buildChartPoints(TREND_SERIES.visits, width, height, padX, padY, maxValue);
  const updatePoints = buildChartPoints(TREND_SERIES.updates, width, height, padX, padY, maxValue);

  return `<div class="chart-card-shell">
    <div class="chart-y-axis">
      ${TREND_SERIES.ticks.slice().reverse().map((tick) => `<span>${tick}</span>`).join('')}
    </div>
    <div class="chart-stage">
      <svg class="trend-svg" viewBox="0 0 ${width} ${height}" aria-label="访问与更新趋势图">
        <defs>
          <linearGradient id="visit-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#20a4ee" stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color="#20a4ee" stop-opacity="0"></stop>
          </linearGradient>
          <linearGradient id="update-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6267ff" stop-opacity="0.18"></stop>
            <stop offset="100%" stop-color="#6267ff" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${TREND_SERIES.ticks.slice().reverse().map((tick) => {
          const y = height - padY - (tick / maxValue) * (height - padY * 2);
          return `<line x1="${padX}" y1="${y}" x2="${width - padX}" y2="${y}" class="trend-grid-line"></line>`;
        }).join('')}
        <path d="${areaPath(visitPoints, height, baseline)}" class="trend-area trend-area-visit"></path>
        <path d="${areaPath(updatePoints, height, baseline)}" class="trend-area trend-area-update"></path>
        <path d="${smoothPath(visitPoints)}" class="trend-line trend-line-visit"></path>
        <path d="${smoothPath(updatePoints)}" class="trend-line trend-line-update"></path>
      </svg>
      <div class="chart-x-labels">${TREND_SERIES.labels.map((label) => `<span>${escapeHtml(label)}</span>`).join('')}</div>
    </div>
  </div>`;
}

function renderSidebar() {
  refs.nav.innerHTML = NAV_ITEMS.map((item) => `<button class="nav-item${item.active ? ' active' : ''}" type="button" data-nav="${escapeHtml(item.key)}" aria-label="${escapeHtml(item.label)}">
    <span class="nav-icon">${icon(item.icon)}</span>
    <span class="nav-label">${escapeHtml(item.label)}</span>
  </button>`).join('');
}

function renderDashboard() {
  refs.content.innerHTML = `<section class="dashboard-page">
    <div class="stats-grid">
      ${DASHBOARD_CARDS.map((card) => `<article class="stat-card tone-${escapeHtml(card.tone)}">
        <div class="stat-card-head">
          <h2>${escapeHtml(card.title)}</h2>
          <span class="stat-card-icon">${icon(card.icon)}</span>
        </div>
        <div class="stat-card-value">${escapeHtml(card.value)}${card.extra ? `<span class="stat-card-extra">${escapeHtml(card.extra)}</span>` : ''}</div>
        <div class="stat-card-foot">${card.delta ? `<strong class="${card.delta.startsWith('-') ? 'negative' : 'positive'}">${escapeHtml(card.delta)}</strong>` : '<strong>&nbsp;</strong>'}<span>${escapeHtml(card.note)}</span></div>
      </article>`).join('')}
    </div>

    <div class="dashboard-main">
      <article class="panel trend-panel">
        <div class="panel-head">
          <div>
            <h3>访问与更新趋势</h3>
            <p>过去 7 天的门户访问量与内容更新频次</p>
          </div>
          <div class="segment-control" aria-label="时间范围">
            <button class="segment active" type="button">7天</button>
            <button class="segment" type="button">30天</button>
          </div>
        </div>
        ${renderChart()}
      </article>

      <article class="panel health-panel">
        <div class="panel-head">
          <div>
            <h3>模块健康度</h3>
            <p>各内容模块的信息完整度</p>
          </div>
        </div>
        <div class="health-list">
          ${HEALTH_ROWS.map((item) => `<div class="health-item">
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
            <p>团队协作动态</p>
          </div>
          <button class="panel-link" type="button">查看全部</button>
        </div>
        <div class="timeline">
          ${RECENT_UPDATES.map((item) => `<div class="timeline-item">
            <span class="timeline-marker"></span>
            <div class="timeline-copy">
              <strong>${escapeHtml(item.title)}</strong>
              <div class="timeline-meta">
                <span class="timeline-tag">${escapeHtml(item.module)}</span>
                <span>${escapeHtml(item.user)}</span>
                <span>${escapeHtml(item.time)}</span>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </article>

      <article class="panel system-panel">
        <div class="panel-head">
          <div>
            <h3>运行概况</h3>
          </div>
        </div>
        <div class="system-grid">
          ${SYSTEM_OVERVIEW.map((item) => `<div class="system-card">
            <span>${escapeHtml(item.label)}</span>
            <div class="system-value"><strong>${escapeHtml(item.value)}</strong><em>${escapeHtml(item.suffix)}</em></div>
            <div class="system-track"><span class="tone-${escapeHtml(item.tone)}" style="width:${item.width}%"></span></div>
          </div>`).join('')}
        </div>
        <div class="system-actions">
          <button class="system-action" type="button">清理缓存</button>
          <button class="system-action" type="button">备份数据</button>
        </div>
      </article>
    </div>
  </section>`;
}

function bootstrap() {
  refs.topbarKicker.textContent = 'CMS';
  refs.topbarBreadcrumb.textContent = 'Dashboard';
  refs.viewTitle.textContent = '总览';
  refs.statusPill.textContent = '系统运行正常';
  refs.topbarSearch.innerHTML = icon('search');
  refs.topbarAlerts.innerHTML = `${icon('bell')}<span class="topbar-dot" aria-hidden="true"></span>`;
  refs.refreshView.innerHTML = icon('refresh');
  renderSidebar();
  renderDashboard();
  applyTheme(preferredTheme());
}

refs.nav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-nav]');
  if (!button) return;
  refs.nav.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
});

refs.themeToggle.addEventListener('click', () => {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
});

bootstrap();
