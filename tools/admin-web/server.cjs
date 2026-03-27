const http = require('http');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { URL } = require('url');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC_DIR = path.join(ROOT, 'admin-web');
const REACT_PUBLIC_DIR = path.join(ROOT, 'admin-web-react', 'dist');
const DATA_FILE = path.join(ROOT, 'database', 'local-admin-data.json');
const SEED_FILE = path.join(ROOT, 'database', 'seed-data.js');
const CLOUD_CONFIG_FILE = path.join(ROOT, 'src', 'config', 'cloud.ts');
const PORT = Number(process.env.ADMIN_WEB_PORT || 3200);
const seedData = require(path.join(ROOT, 'database', 'seed-data.js'));
const SESSION_COOKIE_NAME = 'cfqh_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const DEFAULT_JSON_BODY_LIMIT_BYTES = 5 * 1024 * 1024;
const CSV_BODY_LIMIT_BYTES = 10 * 1024 * 1024;
const QUESTION_BANK_FILE_BODY_LIMIT_BYTES = 16 * 1024 * 1024;
const sessionStore = new Map();
const ROLE_LABELS = {
  viewer: '查看者',
  editor: '编辑老师',
  publisher: '发布老师',
  admin: '管理员',
  owner: '系统所有者'
};
const ROLE_PERMISSIONS = {
  viewer: new Set(['cms.read']),
  editor: new Set(['cms.read', 'cms.write']),
  publisher: new Set(['cms.read', 'cms.write', 'cms.publish']),
  admin: new Set(['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset']),
  owner: new Set(['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset'])
};

const HOME_PAGE_FALLBACK = seedData.pages?.home || {};
const COURSES_PAGE_FALLBACK = seedData.pages?.courses || {};
const COURSES_CTA_FALLBACK = seedData.pages?.courses?.cta || {};
const SUCCESS_PAGE_FALLBACK = seedData.pages?.success || {};
const MATERIALS_PAGE_FALLBACK = seedData.pages?.materials || {};

function getNetworkHosts() {
  const hosts = new Set(['127.0.0.1']);
  const interfaces = os.networkInterfaces();

  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address && address.family === 'IPv4' && !address.internal) {
        hosts.add(address.address);
      }
    }
  }

  return [...hosts];
}

function getServiceUrls() {
  return getNetworkHosts().map((host) => `http://${host}:${PORT}`);
}

function getModeLabel(mode) {
  if (mode === 'cloud') return '云端模式';
  if (mode === 'local') return '本地模式';
  return '云端待配置';
}

function getWriteTarget(mode) {
  if (mode === 'cloud') return 'cloud';
  if (mode === 'local') return 'local';
  return 'unavailable';
}

function getWriteTargetLabel(writeTarget) {
  if (writeTarget === 'cloud') return '云端 CMS';
  if (writeTarget === 'local') return '本地 JSON';
  return '暂停写入';
}

function getWriteNotice(mode) {
  if (mode === 'cloud') {
    return '当前保存会直接写入云端 CMS，并可用于小程序联调。';
  }
  if (mode === 'local') {
    return '当前只连接本地 JSON 文件。为避免误以为已同步到生产环境，后台暂不开放正式登录写入。';
  }
  return '当前 3200 后台要求写入小程序云端数据库，请补齐云环境凭据后再开始正式维护。';
}

function buildRuntimeStatus(mode = store.getMode()) {
  const writeTarget = getWriteTarget(mode);
  return {
    mode,
    modeLabel: getModeLabel(mode),
    cloudReady: mode === 'cloud',
    writeTarget,
    writeTargetLabel: getWriteTargetLabel(writeTarget),
    writeEnabled: mode === 'cloud',
    authEnabled: mode === 'cloud',
    writeNotice: getWriteNotice(mode),
    collaboration: {
      pageConflictProtection: mode === 'cloud'
    }
  };
}

function isAllowedCorsOrigin(origin, req) {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    const requestHost = String(req.headers.host || '').split(':')[0].trim();
    const allowedHosts = new Set(['localhost', ...getNetworkHosts(), requestHost].filter(Boolean));
    return allowedHosts.has(parsed.hostname);
  } catch (error) {
    return false;
  }
}

function buildCorsHeaders(req) {
  const origin = String(req.headers.origin || '').trim();
  if (!origin || !isAllowedCorsOrigin(origin, req)) {
    return { Vary: 'Origin' };
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin'
  };
}

function normalizeHomeLearningCard(card, fallback) {
  const source = card || {};

  return {
    ...fallback,
    ...source,
    progressPercent: Number.isFinite(Number(source.progressPercent))
      ? Number(source.progressPercent)
      : Number(fallback.progressPercent || 0)
  };
}

function normalizeHomeQuickEntries(items, fallback) {
  if (!Array.isArray(items) || !items.length) {
    return fallback;
  }

  return items.slice(0, 4).map((item, index) => ({
    ...(fallback[index] || {}),
    ...(item || {})
  }));
}

function normalizeHomeResources(items, fallback) {
  if (!Array.isArray(items) || !items.length) {
    return fallback;
  }

  return items.slice(0, 2).map((item, index) => ({
    ...(fallback[index] || {}),
    ...(item || {})
  }));
}

function normalizeHomeSubject(subject, fallback) {
  const source = subject || {};

  return {
    learningCard: normalizeHomeLearningCard(source.learningCard, fallback.learningCard),
    quickEntries: normalizeHomeQuickEntries(source.quickEntries, fallback.quickEntries),
    resources: normalizeHomeResources(source.resources, fallback.resources)
  };
}

function normalizeHomePage(payload) {
  if (!payload) {
    return payload;
  }

  const hasCurrentShape = payload.header && payload.subjects && (payload.subjects.math || payload.subjects.medical);
  if (!hasCurrentShape) {
    return HOME_PAGE_FALLBACK;
  }

  return {
    ...HOME_PAGE_FALLBACK,
    ...payload,
    header: {
      ...(HOME_PAGE_FALLBACK.header || {}),
      ...(payload.header || {})
    },
    subjects: {
      math: normalizeHomeSubject(payload.subjects?.math, HOME_PAGE_FALLBACK.subjects?.math || {}),
      medical: normalizeHomeSubject(payload.subjects?.medical, HOME_PAGE_FALLBACK.subjects?.medical || {})
    }
  };
}

function normalizeCoursesCategories(categories) {
  const legacyCategories = ['全部方向', '医护大类', '高数专项', '更多筹备'];
  const isLegacyCategories =
    !Array.isArray(categories) ||
    categories.length < 3 ||
    legacyCategories.every((item, index) => categories?.[index] === item);

  return isLegacyCategories ? COURSES_PAGE_FALLBACK.categories : categories;
}

function normalizeCoursesSuggestions(suggestions) {
  const isLegacySuggestions =
    !Array.isArray(suggestions) ||
    !suggestions.length ||
    String(suggestions?.[0] || '').includes('护理/助产/临床背景');

  return isLegacySuggestions ? COURSES_PAGE_FALLBACK.suggestions : suggestions;
}

function normalizeCoursesMoreSection(section) {
  if (!section) {
    return COURSES_PAGE_FALLBACK.moreSection;
  }

  const isLegacySection =
    section.title === '更多专业方向' ||
    section.tag === '筹备中' ||
    String(section.desc || '').includes('教研团队正在组建中');

  return isLegacySection ? { ...section, ...COURSES_PAGE_FALLBACK.moreSection } : section;
}

function normalizeCoursesCta(cta) {
  if (!cta) {
    return COURSES_CTA_FALLBACK;
  }

  const isLegacyCta = !cta.title || !cta.desc || !cta.buttonText;
  return isLegacyCta ? { ...cta, ...COURSES_CTA_FALLBACK } : cta;
}

function normalizeCoursesPage(payload) {
  if (!payload) {
    return payload;
  }

  const legacyTitle = payload.title === '开设方向';
  const legacySubtitle = String(payload.subtitle || '').includes('精细化教研');

  return {
    ...payload,
    title: legacyTitle ? COURSES_PAGE_FALLBACK.title : payload.title,
    subtitle: legacySubtitle ? COURSES_PAGE_FALLBACK.subtitle : payload.subtitle,
    categories: normalizeCoursesCategories(payload.categories),
    suggestions: normalizeCoursesSuggestions(payload.suggestions),
    moreSection: normalizeCoursesMoreSection(payload.moreSection),
    cta: normalizeCoursesCta(payload.cta)
  };
}

function normalizeSuccessPage(payload) {
  if (!payload) {
    return payload;
  }

  const isLegacyPage = !payload.header || !Array.isArray(payload.directionTabs) || !Array.isArray(payload.pathTabs);
  if (isLegacyPage) {
    return SUCCESS_PAGE_FALLBACK;
  }

  return {
    ...payload,
    header: { ...(SUCCESS_PAGE_FALLBACK.header || {}), ...(payload.header || {}) },
    featuredSection: { ...(SUCCESS_PAGE_FALLBACK.featuredSection || {}), ...(payload.featuredSection || {}) },
    listSection: { ...(SUCCESS_PAGE_FALLBACK.listSection || {}), ...(payload.listSection || {}) },
    supportSection: {
      ...(SUCCESS_PAGE_FALLBACK.supportSection || {}),
      ...(payload.supportSection || {}),
      items: Array.isArray(payload.supportSection?.items) && payload.supportSection.items.length
        ? payload.supportSection.items
        : SUCCESS_PAGE_FALLBACK.supportSection?.items || []
    },
    ctaByDirection: {
      math: { ...(SUCCESS_PAGE_FALLBACK.ctaByDirection?.math || {}), ...(payload.ctaByDirection?.math || {}) },
      medical: { ...(SUCCESS_PAGE_FALLBACK.ctaByDirection?.medical || {}), ...(payload.ctaByDirection?.medical || {}) }
    }
  };
}

function normalizeMaterialsPage(payload) {
  if (!payload) {
    return payload;
  }

  const isLegacyPage = !payload.header || !Array.isArray(payload.directionTabs) || !Array.isArray(payload.stageTabs);
  if (isLegacyPage) {
    return MATERIALS_PAGE_FALLBACK;
  }

  return {
    ...payload,
    header: { ...(MATERIALS_PAGE_FALLBACK.header || {}), ...(payload.header || {}) },
    mainSection: { ...(MATERIALS_PAGE_FALLBACK.mainSection || {}), ...(payload.mainSection || {}) },
    shelfSection: { ...(MATERIALS_PAGE_FALLBACK.shelfSection || {}), ...(payload.shelfSection || {}) },
    consultBar: { ...(MATERIALS_PAGE_FALLBACK.consultBar || {}), ...(payload.consultBar || {}) }
  };
}

function normalizePagePayload(pageKey, payload) {
  if (!payload) {
    return payload;
  }

  if (pageKey === 'home') {
    return normalizeHomePage(payload);
  }

  if (pageKey === 'courses') {
    return normalizeCoursesPage(payload);
  }

  if (pageKey === 'success') {
    return normalizeSuccessPage(payload);
  }

  if (pageKey === 'materials') {
    return normalizeMaterialsPage(payload);
  }

  return payload;
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const output = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf('=');
    if (index <= 0) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    output[key] = value;
  }

  return output;
}

function readDefaultCloudEnvId() {
  if (!fs.existsSync(CLOUD_CONFIG_FILE)) {
    return '';
  }

  const source = fs.readFileSync(CLOUD_CONFIG_FILE, 'utf8');
  const matched = source.match(/export const CLOUD_ENV_ID = ['"]([^'"]+)['"]/);
  return matched ? matched[1] : '';
}

const localEnv = {
  ...parseEnvFile(path.join(ROOT, '.env.admin-web')),
  ...parseEnvFile(path.join(ROOT, '.env.local'))
};

const RUNTIME_ENV = {
  CLOUDBASE_ENV_ID: process.env.CLOUDBASE_ENV_ID || localEnv.CLOUDBASE_ENV_ID || readDefaultCloudEnvId(),
  CLOUDBASE_APIKEY: process.env.CLOUDBASE_APIKEY || localEnv.CLOUDBASE_APIKEY || '',
  TENCENTCLOUD_SECRETID: process.env.TENCENTCLOUD_SECRETID || localEnv.TENCENTCLOUD_SECRETID || '',
  TENCENTCLOUD_SECRETKEY: process.env.TENCENTCLOUD_SECRETKEY || localEnv.TENCENTCLOUD_SECRETKEY || ''
};

for (const [key, value] of Object.entries(RUNTIME_ENV)) {
  if (value && !process.env[key]) {
    process.env[key] = value;
  }
}

const CLOUD_ENV_ID = RUNTIME_ENV.CLOUDBASE_ENV_ID;

const pageOptions = [
  { key: 'site', label: '站点设置' },
  { key: 'home', label: '首页' },
  { key: 'questionBank', label: '医护题库' },
  { key: 'courses', label: '开设方向' },
  { key: 'teachers', label: '师资' },
  { key: 'success', label: '成果' },
  { key: 'about', label: '关于我们' },
  { key: 'materials', label: '教材资料' }
];

const listOptions = [
  { key: 'directions', label: '方向列表' },
  { key: 'medicalQuestions', label: '模拟卷题目' },
  { key: 'pastPapers', label: '模拟冲刺卷' },
  { key: 'questionImports', label: '纯文本导入' },
  { key: 'teachers', label: '师资列表' },
  { key: 'successCases', label: '成果案例' },
  { key: 'mallAssets', label: '资料资产' },
  { key: 'mallProducts', label: '商城商品' },
  { key: 'mallProductItems', label: '商品内容项' },
  { key: 'mallEntitlements', label: '用户权益' },
  { key: 'materialPackages', label: '主推套系包' },
  { key: 'materialItems', label: '货架资料卡' },
  { key: 'mediaAssets', label: '媒体资源' },
  { key: 'appUsers', label: '学习用户' },
  { key: 'studyProfiles', label: '学习概况' },
  { key: 'questionProgress', label: '做题状态' },
  { key: 'wrongBookItems', label: '错题队列' },
  { key: 'adminUsers', label: '角色成员' }
];

const PAGE_COLLECTIONS = {
  site: 'site_settings',
  home: 'page_home',
  questionBank: 'page_question_bank',
  courses: 'page_courses',
  teachers: 'page_teachers',
  success: 'page_success',
  about: 'page_about',
  materials: 'page_materials'
};

const PAGE_DOC_IDS = {
  site: 'default',
  home: 'singleton',
  questionBank: 'singleton',
  courses: 'singleton',
  teachers: 'singleton',
  success: 'singleton',
  about: 'singleton',
  materials: 'singleton'
};

const LIST_COLLECTIONS = {
  directions: 'directions',
  medicalQuestions: 'medical_questions',
  pastPapers: 'past_papers',
  questionImports: 'question_imports',
  teachers: 'teachers',
  successCases: 'success_cases',
  mallAssets: 'mall_assets',
  mallProducts: 'mall_products',
  mallProductItems: 'mall_product_items',
  mallEntitlements: 'mall_entitlements',
  materialPackages: 'material_packages',
  materialItems: 'material_items',
  mediaAssets: 'media_assets',
  appUsers: 'app_users',
  studyProfiles: 'study_profiles',
  questionProgress: 'question_progress',
  wrongBookItems: 'wrong_book_items',
  adminUsers: 'admin_users'
};

const LEARNER_LIST_COLLECTIONS = new Set(['appUsers', 'studyProfiles', 'questionProgress', 'wrongBookItems']);

function normalizeAdminRole(role) {
  const normalized = String(role || '').trim().toLowerCase();
  if (normalized === 'owner') return 'owner';
  if (normalized === 'admin') return 'admin';
  if (normalized === 'publisher') return 'publisher';
  if (normalized === 'viewer') return 'viewer';
  return 'editor';
}

function normalizeAdminStatus(status) {
  return String(status || '').trim().toLowerCase() === 'disabled' ? 'disabled' : 'active';
}

function normalizeLoginAccount(value) {
  return String(value || '').trim().toLowerCase();
}

function hashPassword(password = '') {
  return crypto.createHash('sha256').update(`cfqh-admin:${String(password)}`).digest('hex');
}

function sanitizeAdminUser(admin) {
  if (!admin) return null;
  return {
    _id: admin._id,
    name: admin.name || '',
    role: normalizeAdminRole(admin.role),
    roleLabel: ROLE_LABELS[normalizeAdminRole(admin.role)] || ROLE_LABELS.editor,
    status: normalizeAdminStatus(admin.status),
    loginAccount: normalizeLoginAccount(admin.loginAccount),
    hasPassword: Boolean(admin.passwordHash),
    authChannels: Array.isArray(admin.authChannels) ? admin.authChannels : [],
    lastLoginAt: admin.lastLoginAt || '',
    updatedAt: admin.updatedAt || '',
    createdAt: admin.createdAt || ''
  };
}

function maskOpenId(value = '') {
  const text = String(value || '').trim();
  if (!text) return '';
  if (text.length <= 8) return `${text.slice(0, 2)}***${text.slice(-2)}`;
  return `${text.slice(0, 4)}***${text.slice(-4)}`;
}

function isMissingCollectionError(error) {
  const message = String(error?.message || error || '').toLowerCase();
  return (
    message.includes('db or table not exist') ||
    message.includes('table not exist') ||
    message.includes('collection not exists') ||
    message.includes('collection does not exist') ||
    message.includes('集合不存在') ||
    message.includes('resource not found')
  );
}

function getCollectionOrder(collectionKey) {
  if (collectionKey === 'appUsers') {
    return { field: 'lastSeenAt', direction: 'desc' };
  }
  if (collectionKey === 'studyProfiles') {
    return { field: 'updatedAt', direction: 'desc' };
  }
  if (collectionKey === 'questionProgress' || collectionKey === 'wrongBookItems') {
    return { field: 'lastAnsweredAt', direction: 'desc' };
  }
  if (collectionKey === 'mallAssets') {
    return { field: 'updatedAt', direction: 'desc' };
  }
  if (collectionKey === 'mallEntitlements') {
    return { field: 'createdAt', direction: 'desc' };
  }
  if (collectionKey === 'mallProducts' || collectionKey === 'mallProductItems') {
    return { field: 'sortOrder', direction: 'asc' };
  }
  return { field: 'sort', direction: 'asc' };
}

function getRolePermissions(role) {
  return ROLE_PERMISSIONS[normalizeAdminRole(role)] || ROLE_PERMISSIONS.editor;
}

function getPermissionSummary(admin) {
  const permissions = getRolePermissions(admin?.role);
  return {
    canRead: permissions.has('cms.read'),
    canWrite: permissions.has('cms.write'),
    canPublish: permissions.has('cms.publish'),
    canManageUsers: permissions.has('cms.manageUsers'),
    canReset: permissions.has('cms.reset')
  };
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return Object.fromEntries(
    header
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf('=');
        if (index <= 0) return [item, ''];
        return [item.slice(0, index), decodeURIComponent(item.slice(index + 1))];
      })
  );
}

function createSessionCookie(sessionId, maxAgeMs = SESSION_TTL_MS) {
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}; Max-Age=${Math.floor(maxAgeMs / 1000)}; Path=/; HttpOnly; SameSite=Lax`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`;
}

function cleanupSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessionStore.entries()) {
    if (!session || session.expiresAt <= now) {
      sessionStore.delete(sessionId);
    }
  }
}

function createAdminSession(admin) {
  cleanupSessions();
  const sessionId = crypto.randomBytes(24).toString('hex');
  sessionStore.set(sessionId, {
    adminId: admin._id,
    role: normalizeAdminRole(admin.role),
    expiresAt: Date.now() + SESSION_TTL_MS
  });
  return sessionId;
}

async function listAdminUsers() {
  if (!LIST_COLLECTIONS.adminUsers) return [];
  if (store.getMode() === 'cloud') {
    await ensureAdminUsersCollection();
  }
  return store.listCollection('adminUsers');
}

async function findAdminByAccount(account) {
  const normalizedAccount = normalizeLoginAccount(account);
  if (!normalizedAccount) return null;
  const admins = await listAdminUsers();
  return admins.find((item) => normalizeLoginAccount(item.loginAccount) === normalizedAccount) || null;
}

async function getAdminById(adminId) {
  if (!adminId) return null;
  return store.getItem('adminUsers', adminId).catch(() => null);
}

async function getAuthenticatedAdmin(req) {
  cleanupSessions();
  const cookies = parseCookies(req);
  const sessionId = cookies[SESSION_COOKIE_NAME];
  if (!sessionId) return null;
  const session = sessionStore.get(sessionId);
  if (!session || session.expiresAt <= Date.now()) {
    sessionStore.delete(sessionId);
    return null;
  }

  const admin = await getAdminById(session.adminId);
  if (!admin || normalizeAdminStatus(admin.status) === 'disabled') {
    sessionStore.delete(sessionId);
    return null;
  }

  session.expiresAt = Date.now() + SESSION_TTL_MS;
  return admin;
}

async function getAuthState(req) {
  const runtime = buildRuntimeStatus();
  if (!runtime.cloudReady) {
    return {
      ...runtime,
      authenticated: false,
      bootstrapRequired: false,
      user: null,
      permissions: getPermissionSummary({ role: 'viewer' })
    };
  }

  const authenticatedAdmin = await getAuthenticatedAdmin(req);
  const webAdmins = await listAdminUsers();
  const bootstrapRequired = !webAdmins.some(
    (item) => normalizeAdminStatus(item.status) === 'active' && normalizeLoginAccount(item.loginAccount) && item.passwordHash
  );

  return {
    ...runtime,
    authenticated: Boolean(authenticatedAdmin),
    bootstrapRequired,
    user: sanitizeAdminUser(authenticatedAdmin),
    permissions: authenticatedAdmin ? getPermissionSummary(authenticatedAdmin) : getPermissionSummary({ role: 'viewer' })
  };
}

async function requirePermission(req, permission) {
  const admin = await getAuthenticatedAdmin(req);
  if (!admin) {
    const error = new Error('请先登录后台账号');
    error.statusCode = 401;
    throw error;
  }

  const permissions = getRolePermissions(admin.role);
  if (!permissions.has(permission)) {
    const error = new Error('当前账号暂无此操作权限');
    error.statusCode = 403;
    throw error;
  }

  return admin;
}

function prepareAdminUserPayload(payload = {}, existing = null) {
  const nextPayload = {
    ...payload,
    role: normalizeAdminRole(payload.role || existing?.role),
    status: normalizeAdminStatus(payload.status || existing?.status),
    loginAccount: normalizeLoginAccount(payload.loginAccount || existing?.loginAccount),
    authChannels: Array.isArray(payload.authChannels)
      ? Array.from(new Set(payload.authChannels.filter(Boolean)))
      : Array.isArray(existing?.authChannels)
        ? existing.authChannels
        : ['web']
  };

  if (!nextPayload.name) {
    nextPayload.name = existing?.name || '';
  }

  const rawPassword = String(payload.password || '').trim();
  if (rawPassword) {
    nextPayload.passwordHash = hashPassword(rawPassword);
  } else if (existing?.passwordHash) {
    nextPayload.passwordHash = existing.passwordHash;
  }

  delete nextPayload.password;
  return nextPayload;
}

function ensureCloudAuthReady() {
  if (store.getMode() !== 'cloud') {
    throw createCloudRequiredError();
  }
}

async function ensureBootstrapAllowed() {
  ensureCloudAuthReady();
  await ensureAdminUsersCollection();
  const admins = await listAdminUsers();
  const hasWebAdmin = admins.some(
    (item) => normalizeAdminStatus(item.status) === 'active' && normalizeLoginAccount(item.loginAccount) && item.passwordHash
  );
  if (hasWebAdmin) {
    const error = new Error('后台账号已初始化，请直接使用账号登录。');
    error.statusCode = 409;
    throw error;
  }
  return admins;
}

function sanitizeCollectionOutput(collectionKey, value) {
  if (collectionKey === 'adminUsers') {
    if (Array.isArray(value)) {
      return value.map((item) => sanitizeAdminUser(item));
    }
    return sanitizeAdminUser(value);
  }

  if (collectionKey === 'appUsers') {
    const sanitizeOne = (item) => ({
      ...item,
      openId: maskOpenId(item?.openId || '')
    });
    if (Array.isArray(value)) {
      return value.map((item) => sanitizeOne(item));
    }
    return sanitizeOne(value || {});
  }

  return value;
}

function getCollectionPermission(collectionKey, method) {
  if (collectionKey === 'adminUsers' || LEARNER_LIST_COLLECTIONS.has(collectionKey)) {
    return 'cms.manageUsers';
  }

  if (method === 'GET') {
    return 'cms.read';
  }

  return 'cms.write';
}

function loadSeed() {
  delete require.cache[SEED_FILE];
  const seed = require(SEED_FILE);
  return JSON.parse(JSON.stringify(seed));
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(stampSeedData(loadSeed()), null, 2), 'utf8');
  }
}

function readData() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    ...(res.__corsHeaders || {}),
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
  };

  if (!fs.existsSync(filePath)) {
    sendJson(res, 404, { ok: false, message: 'Not found' });
    return;
  }

  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
}

function resolveStaticPath(baseDir, requestedPath = '/') {
  const normalizedPath = requestedPath === '/' ? '/index.html' : requestedPath;
  const relativePath = normalizedPath.replace(/^\/+/, '');
  const targetPath = path.normalize(path.join(baseDir, relativePath));

  const relativeToBase = path.relative(baseDir, targetPath);
  if (relativeToBase.startsWith('..') || path.isAbsolute(relativeToBase)) {
    return null;
  }

  return targetPath;
}

function serveReactApp(res, pathname) {
  if (!fs.existsSync(REACT_PUBLIC_DIR)) {
    sendJson(res, 404, { ok: false, message: 'React 后台尚未构建，请先执行 npm run admin:web:build' });
    return;
  }

  const relativePath = pathname.replace(/^\/react-admin/, '') || '/';
  const targetPath = resolveStaticPath(REACT_PUBLIC_DIR, relativePath);
  if (!targetPath) {
    sendJson(res, 404, { ok: false, message: 'Not found' });
    return;
  }

  const hasExtension = path.extname(targetPath);
  const indexPath = path.join(REACT_PUBLIC_DIR, 'index.html');
  const shouldFallbackToIndex = !hasExtension && fs.existsSync(indexPath);

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    sendFile(res, targetPath);
    return;
  }

  if (shouldFallbackToIndex) {
    sendFile(res, indexPath);
    return;
  }

  sendJson(res, 404, { ok: false, message: 'Not found' });
}

function createPayloadTooLargeError(limitBytes) {
  const error = new Error(`请求体过大，请控制在 ${(limitBytes / 1024 / 1024).toFixed(0)}MB 内后重试。`);
  error.statusCode = 413;
  error.code = 'PAYLOAD_TOO_LARGE';
  return error;
}

function readBody(req, options = {}) {
  const limitBytes = Number(options.limitBytes || DEFAULT_JSON_BODY_LIMIT_BYTES);
  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;
    let settled = false;
    req.on('data', (chunk) => {
      if (settled) return;
      size += chunk.length;
      if (size > limitBytes) {
        settled = true;
        req.pause();
        req.removeAllListeners('data');
        req.resume();
        reject(createPayloadTooLargeError(limitBytes));
        return;
      }
      raw += chunk;
    });
    req.on('end', () => {
      if (settled) return;
      settled = true;
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('JSON 解析失败'));
      }
    });
    req.on('error', (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function stripId(payload) {
  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  const next = { ...payload };
  delete next._id;
  return next;
}

function stripPageMeta(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return payload;
  }

  const next = { ...payload };
  delete next._meta;
  return next;
}

function nowIso() {
  return new Date().toISOString();
}

function stampPagePayload(payload, existing = null, timestamp = nowIso()) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return payload;
  }

  return {
    ...payload,
    _createdAt: payload._createdAt || existing?._createdAt || timestamp,
    _updatedAt: timestamp
  };
}

function buildPageRevision(pageKey, payload) {
  const updatedAt = payload?._updatedAt || payload?.updatedAt || payload?._createdAt || payload?.createdAt || '';
  const timestamp = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return `${pageKey}:${Number.isFinite(timestamp) ? timestamp : Date.now()}`;
}

function buildAdminPageMeta(pageKey, payload, sourceMode = 'cloud') {
  return {
    pageKey,
    sourceMode,
    updatedAt: payload?._updatedAt || payload?.updatedAt || payload?._createdAt || payload?.createdAt || '',
    revision: buildPageRevision(pageKey, payload)
  };
}

function attachAdminPageMeta(pageKey, payload, sourceMode = 'cloud') {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return payload;
  }

  return {
    ...payload,
    _meta: buildAdminPageMeta(pageKey, payload, sourceMode)
  };
}

function createPageConflictError(pageKey, payload, sourceMode = 'cloud') {
  const error = new Error('当前页面已被其他老师更新，请先重新拉取后再保存。');
  error.statusCode = 409;
  error.code = 'PAGE_CONFLICT';
  error.data = buildAdminPageMeta(pageKey, payload, sourceMode);
  return error;
}

function createCloudRequiredError() {
  const error = new Error('当前 3200 后台已锁定云端 CMS 写入，请先完成云环境配置。');
  error.statusCode = 503;
  error.code = 'CLOUD_REQUIRED';
  error.data = {
    mode: store?.getMode?.() || 'unavailable'
  };
  return error;
}

const MATERIAL_STAGE_ALIASES = {
  foundation: 'foundation',
  reinforcement: 'reinforcement',
  sprint: 'sprint',
  '基础阶段': 'foundation',
  基础: 'foundation',
  '强化阶段': 'reinforcement',
  强化: 'reinforcement',
  '冲刺阶段': 'sprint',
  冲刺: 'sprint',
  '考前阶段': 'sprint',
  考前: 'sprint'
};

const MATERIAL_ITEM_THEME = {
  math: {
    accentStart: '#2f66ff',
    accentEnd: '#4f8dff'
  },
  medical: {
    accentStart: '#14b8a6',
    accentEnd: '#0f9f8f'
  }
};

function readMaterialDirectionFromRecord(item = {}) {
  if (item.direction === 'medical') return 'medical';
  if (item.direction === 'math') return 'math';
  const token = String(item.seriesId || item.slug || item.title || item.subtitle || '').toLowerCase();
  return token.includes('medical') || token.includes('医护') ? 'medical' : 'math';
}

function readMaterialStageFromRecord(item = {}) {
  const raw = String(item.stage || '').trim();
  return MATERIAL_STAGE_ALIASES[raw] || 'foundation';
}

function toStringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => String(item || '').trim()).filter(Boolean);
}

function normalizeMaterialPackageRecord(item = {}, index = 0) {
  const direction = readMaterialDirectionFromRecord(item);
  const stage = readMaterialStageFromRecord(item);
  return {
    _id: item._id || `material_package_${direction}_${stage}_${index + 1}`,
    direction,
    stage,
    badge: String(item.badge || item.tag || ''),
    title: String(item.title || item.name || ''),
    target: String(item.target || item.audience || item.subtitle || ''),
    solves: String(item.solves || item.desc || item.description || ''),
    features: toStringList(item.features || item.contents),
    contentItemIds: toStringList(item.contentItemIds),
    sort: Number(item.sort || (index + 1) * 10),
    status: item.status === 'published' ? 'published' : 'draft',
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function normalizeMaterialItemRecord(item = {}, index = 0) {
  const direction = readMaterialDirectionFromRecord(item);
  const stage = readMaterialStageFromRecord(item);
  const theme = MATERIAL_ITEM_THEME[direction] || MATERIAL_ITEM_THEME.math;
  const detailsFromContents = toStringList(item.contents).join(' / ');
  return {
    _id: item._id || `material_item_${direction}_${stage}_${index + 1}`,
    direction,
    stage,
    type: String(item.type || '资料'),
    title: String(item.title || item.name || ''),
    subtitle: String(item.subtitle || item.stage || ''),
    desc: String(item.desc || item.description || ''),
    details: String(item.details || detailsFromContents || item.desc || item.description || ''),
    accentStart: String(item.accentStart || theme.accentStart),
    accentEnd: String(item.accentEnd || theme.accentEnd),
    sort: Number(item.sort || (index + 1) * 10),
    status: item.status === 'published' ? 'published' : 'draft',
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function normalizeMallStatus(status, fallback = 'draft') {
  const value = String(status || '').trim().toLowerCase();
  if (value === 'pending') return 'pending';
  if (value === 'online' || value === 'published') return 'online';
  if (value === 'offline') return 'offline';
  if (value === 'archived') return 'archived';
  if (value === 'active') return 'active';
  if (value === 'expired') return 'expired';
  if (value === 'revoked') return 'revoked';
  return fallback;
}

function normalizeMallAssetRecord(item = {}, index = 0) {
  const direction = readMaterialDirectionFromRecord(item);
  const stage = readMaterialStageFromRecord(item);
  const assetType = String(item.assetType || item.categoryType || item.type || 'pdf');
  return {
    _id: item._id || `mall_asset_${direction}_${stage}_${index + 1}`,
    name: String(item.name || item.fileName || ''),
    title: String(item.title || item.name || ''),
    subTitle: String(item.subTitle || item.subtitle || ''),
    description: String(item.description || item.desc || ''),
    direction,
    stage,
    assetType,
    coverUrl: String(item.coverUrl || ''),
    coverKey: String(item.coverKey || ''),
    pdfUrl: String(item.pdfUrl || item.url || ''),
    pdfKey: String(item.pdfKey || ''),
    pdfPageCount: Number(item.pdfPageCount || item.pageCount || 0),
    pdfFileSize: Number(item.pdfFileSize || item.fileSize || 0),
    previewEnabled: item.previewEnabled === false ? false : true,
    previewPageCount: Number(item.previewPageCount || 0),
    tags: toStringList(item.tags),
    accentStart: String(item.accentStart || (MATERIAL_ITEM_THEME[direction] || MATERIAL_ITEM_THEME.math).accentStart),
    accentEnd: String(item.accentEnd || (MATERIAL_ITEM_THEME[direction] || MATERIAL_ITEM_THEME.math).accentEnd),
    sortOrder: Number(item.sortOrder || item.sort || (index + 1) * 10),
    status: normalizeMallStatus(item.status, 'draft'),
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function normalizeMallProductRecord(item = {}, index = 0) {
  const direction = readMaterialDirectionFromRecord(item);
  const stage = readMaterialStageFromRecord(item);
  return {
    _id: item._id || `mall_product_${direction}_${stage}_${index + 1}`,
    productName: String(item.productName || item.title || item.name || ''),
    productSubTitle: String(item.productSubTitle || item.target || item.subtitle || ''),
    productDescription: String(item.productDescription || item.solves || item.description || ''),
    productType: String(item.productType || 'asset_bundle'),
    direction,
    stage,
    badge: String(item.badge || item.tag || ''),
    coverUrl: String(item.coverUrl || ''),
    bannerUrl: String(item.bannerUrl || ''),
    price: Number(item.price || 0),
    originPrice: Number(item.originPrice || 0),
    isFree: item.isFree === true || Number(item.price || 0) <= 0,
    previewEnabled: item.previewEnabled === false ? false : true,
    highlights: toStringList(item.highlights || item.features),
    sortOrder: Number(item.sortOrder || item.sort || (index + 1) * 10),
    status: normalizeMallStatus(item.status, 'draft'),
    creatorId: String(item.creatorId || ''),
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function normalizeMallProductItemRecord(item = {}, index = 0) {
  const direction = readMaterialDirectionFromRecord(item);
  const theme = MATERIAL_ITEM_THEME[direction] || MATERIAL_ITEM_THEME.math;
  return {
    _id: item._id || `mall_product_item_${index + 1}`,
    productId: String(item.productId || ''),
    itemType: String(item.itemType || 'asset'),
    itemId: String(item.itemId || ''),
    displayType: String(item.displayType || item.type || '资料'),
    displayName: String(item.displayName || item.title || ''),
    displaySubTitle: String(item.displaySubTitle || item.subtitle || ''),
    displayDescription: String(item.displayDescription || item.desc || item.description || ''),
    displayDetails: String(item.displayDetails || item.details || ''),
    direction,
    previewEnabled: item.previewEnabled === false ? false : true,
    previewPageCount: Number(item.previewPageCount || 0),
    accentStart: String(item.accentStart || theme.accentStart),
    accentEnd: String(item.accentEnd || theme.accentEnd),
    sortOrder: Number(item.sortOrder || item.sort || (index + 1) * 10),
    status: normalizeMallStatus(item.status, 'draft'),
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function normalizeMallEntitlementRecord(item = {}, index = 0) {
  return {
    _id: item._id || `mall_entitlement_${index + 1}`,
    userId: String(item.userId || ''),
    productId: String(item.productId || ''),
    entitlementType: String(item.entitlementType || 'bundle'),
    sourceType: String(item.sourceType || 'admin_grant'),
    status: normalizeMallStatus(item.status, 'active'),
    claimedAt: item.claimedAt || '',
    expiredAt: item.expiredAt || '',
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || ''
  };
}

function isMallVisible(item) {
  const status = normalizeMallStatus(item?.status, 'draft');
  return status === 'online' || status === 'active';
}

function buildMaterialCompatFromMall(products = [], productItems = [], assets = []) {
  const visibleProducts = products
    .filter(isMallVisible)
    .sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0));
  const visibleItems = productItems
    .filter(isMallVisible)
    .sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0));
  const visibleAssets = assets.filter((item) => {
    const status = normalizeMallStatus(item?.status, 'draft');
    return status === 'online' || status === 'draft' || status === 'pending';
  });

  if (!visibleProducts.length) {
    return {
      materialPackages: [],
      materialItems: []
    };
  }

  const assetMap = new Map(visibleAssets.map((item) => [item._id, item]));
  const itemsByProduct = new Map();
  for (const item of visibleItems) {
    const current = itemsByProduct.get(item.productId) || [];
    current.push(item);
    itemsByProduct.set(item.productId, current);
  }

  const materialPackages = visibleProducts.map((product, index) => {
    const relatedItems = itemsByProduct.get(product._id) || [];
    return normalizeMaterialPackageRecord(
      {
        _id: product._id,
        direction: product.direction,
        stage: product.stage,
        badge: product.badge || (product.isFree ? '免费领取' : product.productType),
        title: product.productName,
        target: product.productSubTitle,
        solves: product.productDescription,
        features: product.highlights,
        contentItemIds: relatedItems.map((item) => item._id),
        sort: product.sortOrder || (index + 1) * 10,
        status: product.status === 'online' ? 'published' : 'draft',
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      },
      index
    );
  });

  const materialItems = visibleItems.map((item, index) => {
    const product = visibleProducts.find((entry) => entry._id === item.productId) || {};
    const asset = assetMap.get(item.itemId) || {};
    return normalizeMaterialItemRecord(
      {
        _id: item._id,
        direction: product.direction || asset.direction || item.direction,
        stage: product.stage || asset.stage || 'foundation',
        type: item.displayType || asset.assetType || '资料',
        title: item.displayName || asset.title || '',
        subtitle: item.displaySubTitle || asset.subTitle || '',
        desc: item.displayDescription || asset.description || '',
        details: item.displayDetails || asset.description || '',
        accentStart: item.accentStart || asset.accentStart,
        accentEnd: item.accentEnd || asset.accentEnd,
        sort: item.sortOrder || (index + 1) * 10,
        status: item.status === 'online' ? 'published' : 'draft',
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      },
      index
    );
  });

  return {
    materialPackages,
    materialItems
  };
}

function buildMallCompatFromLegacy(materialPackages = [], materialItems = []) {
  const normalizedPackages = materialPackages.map((item, index) => normalizeMaterialPackageRecord(item, index));
  const normalizedItems = materialItems.map((item, index) => normalizeMaterialItemRecord(item, index));

  const mallAssets = normalizedItems.map((item, index) =>
    normalizeMallAssetRecord(
      {
        _id: `legacy_asset_${item._id || index + 1}`,
        name: item.title,
        title: item.title,
        subTitle: item.subtitle,
        description: item.details || item.desc,
        direction: item.direction,
        stage: item.stage,
        assetType: item.type || '资料',
        accentStart: item.accentStart,
        accentEnd: item.accentEnd,
        previewEnabled: true,
        previewPageCount: 5,
        sortOrder: item.sort,
        status: item.status === 'published' ? 'online' : 'draft',
        updatedAt: item.updatedAt,
        createdAt: item.createdAt
      },
      index
    )
  );

  const assetIdByLegacyItemId = new Map(
    normalizedItems.map((item, index) => [item._id, mallAssets[index]?._id || `legacy_asset_${index + 1}`])
  );

  const mallProducts = normalizedPackages.map((item, index) =>
    normalizeMallProductRecord(
      {
        _id: `legacy_product_${item._id || index + 1}`,
        productName: item.title,
        productSubTitle: item.target,
        productDescription: item.solves,
        direction: item.direction,
        stage: item.stage,
        badge: item.badge,
        highlights: item.features,
        isFree: true,
        price: 0,
        sortOrder: item.sort,
        status: item.status === 'published' ? 'online' : 'draft',
        updatedAt: item.updatedAt,
        createdAt: item.createdAt
      },
      index
    )
  );

  const mallProductItems = [];
  normalizedPackages.forEach((pkg, packageIndex) => {
    const product = mallProducts[packageIndex];
    const linkedItems = (pkg.contentItemIds || []).length
      ? normalizedItems.filter((item) => pkg.contentItemIds.includes(item._id))
      : normalizedItems.filter((item) => item.direction === pkg.direction && item.stage === pkg.stage);

    linkedItems.forEach((item, itemIndex) => {
      mallProductItems.push(
        normalizeMallProductItemRecord({
          _id: `legacy_product_item_${pkg._id || packageIndex + 1}_${item._id || itemIndex + 1}`,
          productId: product?._id || '',
          itemType: 'asset',
          itemId: assetIdByLegacyItemId.get(item._id) || '',
          displayType: item.type,
          displayName: item.title,
          displaySubTitle: item.subtitle,
          displayDescription: item.desc,
          displayDetails: item.details,
          direction: item.direction,
          accentStart: item.accentStart,
          accentEnd: item.accentEnd,
          previewEnabled: true,
          previewPageCount: 5,
          sortOrder: item.sort || (itemIndex + 1) * 10,
          status: item.status === 'published' ? 'online' : 'draft',
          updatedAt: item.updatedAt,
          createdAt: item.createdAt
        })
      );
    });
  });

  return {
    mallAssets,
    mallProducts,
    mallProductItems
  };
}

function normalizeCollectionRecord(collectionKey, item, index = 0) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return item;
  }

  if (collectionKey === 'mallAssets') {
    return normalizeMallAssetRecord(item, index);
  }

  if (collectionKey === 'mallProducts') {
    return normalizeMallProductRecord(item, index);
  }

  if (collectionKey === 'mallProductItems') {
    return normalizeMallProductItemRecord(item, index);
  }

  if (collectionKey === 'mallEntitlements') {
    return normalizeMallEntitlementRecord(item, index);
  }

  if (collectionKey === 'materialPackages') {
    return normalizeMaterialPackageRecord(item, index);
  }

  if (collectionKey === 'materialItems') {
    return normalizeMaterialItemRecord(item, index);
  }

  return item;
}

function stampCollectionItem(payload, itemId, existing = null, timestamp = nowIso()) {
  const nextItem = { ...(payload || {}), _id: itemId || payload?._id || existing?._id };
  return {
    ...nextItem,
    createdAt: nextItem.createdAt || existing?.createdAt || timestamp,
    updatedAt: timestamp
  };
}

function stampSeedData(seed, timestamp = nowIso()) {
  const nextSeed = {
    ...seed,
    site: stampPagePayload(seed.site, null, timestamp),
    pages: Object.fromEntries(
      Object.entries(seed.pages || {}).map(([pageKey, pageValue]) => [
        pageKey,
        stampPagePayload(pageValue, null, timestamp)
      ])
    )
  };

  for (const collectionKey of Object.keys(LIST_COLLECTIONS)) {
    nextSeed[collectionKey] = (seed[collectionKey] || []).map((item) =>
      stampCollectionItem(item, item._id || makeId(collectionKey), null, timestamp)
    );
  }

  return nextSeed;
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

const QUESTION_BANK_FIELD_ALIASES = {
  questionId: ['questionid', 'question_id', 'id', '题目编号', '题号', '编号', '题目id', 'id号'],
  direction: ['direction', 'dir', '方向', '学科', '科目', '分类', '类别'],
  questionType: ['questiontype', 'question_type', 'type', '题型', '题目类型', '类型'],
  stem: ['stem', 'question', 'content', '题目', '题干', '内容', '问题', '题目内容'],
  optionA: ['optiona', 'option_a', 'a', '选项a', '选项1', '第一项'],
  optionB: ['optionb', 'option_b', 'b', '选项b', '选项2', '第二项'],
  optionC: ['optionc', 'option_c', 'c', '选项c', '选项3', '第三项'],
  optionD: ['optiond', 'option_d', 'd', '选项d', '选项4', '第四项'],
  optionE: ['optione', 'option_e', 'e', '选项e', '选项5', '第五项'],
  optionF: ['optionf', 'option_f', 'f', '选项f', '选项6', '第六项'],
  answer: ['answer', 'ans', 'correct', '答案', '正确答案', '标准答案'],
  explanation: ['explanation', 'explain', 'analysis', '解析', '解答', '答案解析', '题目解析'],
  year: ['year', '年份', '年', '考试年份'],
  paperId: ['paperid', 'paper_id', '试卷编号', '试卷id', '套卷编号', '试卷号'],
  paperTitle: ['papertitle', 'paper_title', '试卷标题', '试卷名称', '套卷名称', '卷名'],
  paperDescription: ['paperdescription', 'paper_description', '试卷说明', '试卷描述', '套卷说明', '卷说明'],
  tags: ['tags', 'tag', '标签', '知识点', '考点'],
  status: ['status', 'state', '状态', '发布状态']
};

const QUESTION_BANK_ANSWER_ALIASES = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '①': 'A',
  '②': 'B',
  '③': 'C',
  '④': 'D',
  '⑤': 'E',
  '⑥': 'F',
  对: 'T',
  错: 'F',
  正确: 'T',
  错误: 'F'
};

const QUESTION_BANK_TYPE_ALIASES = {
  single_choice: ['single_choice', 'single', '单选', '单选题', '选择题'],
  multiple_choice: ['multiple_choice', 'multiple', '多选', '多选题'],
  judge: ['judge', 'boolean', '判断', '判断题', '对错题']
};

const QUESTION_BANK_REQUIRED_HEADERS = [
  'questionId',
  'direction',
  'questionType',
  'stem',
  'status'
];

function normalizeCsvCell(value) {
  return String(value ?? '').replace(/^\uFEFF/, '').trim();
}

function parseCsv(text = '') {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === '"') {
        if (next === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }

    if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    if (char === '\r') {
      if (next === '\n') {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += char;
  }

  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function splitPipeValues(value) {
  return normalizeCsvCell(value)
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeLooseToken(value = '') {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_\-（）()【】\[\]：:]/g, '');
}

function getQuestionBankFieldKey(fieldName = '') {
  const token = normalizeLooseToken(fieldName);
  if (!token) return '';
  for (const [field, aliases] of Object.entries(QUESTION_BANK_FIELD_ALIASES)) {
    if (aliases.some((alias) => normalizeLooseToken(alias) === token)) {
      return field;
    }
  }
  return '';
}

function getQuestionBankType(value = '', options = []) {
  const normalized = normalizeLooseToken(value);
  if (normalized) {
    for (const [type, aliases] of Object.entries(QUESTION_BANK_TYPE_ALIASES)) {
      if (aliases.some((alias) => normalizeLooseToken(alias) === normalized)) {
        return type;
      }
    }
  }
  if (!options.length) {
    return 'judge';
  }
  return 'single_choice';
}

function normalizeQuestionBankAnswer(value = '') {
  const raw = String(value || '').trim();
  if (!raw) return '';

  const mappedDirect = QUESTION_BANK_ANSWER_ALIASES[raw];
  if (mappedDirect) {
    return mappedDirect;
  }

  const compact = raw
    .replace(/[，、;；\/\\]/g, '|')
    .replace(/\s+/g, '')
    .toUpperCase();

  if (/^[A-F|]+$/.test(compact)) {
    if (compact.includes('|')) {
      return compact;
    }
    if (compact.length > 1) {
      return compact.split('').join('|');
    }
    return compact;
  }

  const normalized = compact
    .split('|')
    .map((item) => QUESTION_BANK_ANSWER_ALIASES[item] || item)
    .filter(Boolean)
    .join('|');

  return normalized || compact;
}

function normalizeQuestionBankStatus(value = '', hasAnswer = false) {
  const raw = String(value || '').trim().toLowerCase();
  if (['published', 'publish', 'online', '上线', '发布'].includes(raw)) {
    return 'published';
  }
  if (['draft', '草稿', '待整理', '待发布'].includes(raw)) {
    return 'draft';
  }
  return hasAnswer ? 'published' : 'draft';
}

function splitQuestionBankTags(value = '') {
  return String(value || '')
    .split(/[\n,，|/、；;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeCsvCell(value = '') {
  const text = String(value ?? '');
  if (!/[",\n]/.test(text)) {
    return text;
  }
  return `"${text.replace(/"/g, '""')}"`;
}

function buildQuestionBankCsvText(records = []) {
  const lines = [QUESTION_BANK_CSV_HEADERS.join(',')];
  records.forEach((record) => {
    const row = QUESTION_BANK_CSV_HEADERS.map((header) => {
      const value = header === 'tags'
        ? (Array.isArray(record.tags) ? record.tags.join('|') : record.tags || '')
        : record[header] ?? '';
      return escapeCsvCell(value);
    });
    lines.push(row.join(','));
  });
  return lines.join('\n');
}

function detectQuestionBankImportFormat(fileName = '') {
  const ext = path.extname(String(fileName || '')).toLowerCase();
  if (ext === '.csv') return 'csv';
  if (ext === '.json') return 'json';
  if (ext === '.txt') return 'text';
  if (ext === '.doc' || ext === '.docx') return 'word';
  if (ext === '.pdf') return 'pdf';
  if (ext === '.xlsx') return 'excel';
  if (ext === '.xls') return 'excel_legacy';
  return 'text';
}

function getQuestionBankFormatLabel(format = '') {
  if (format === 'csv') return 'CSV';
  if (format === 'json') return 'JSON';
  if (format === 'text') return '纯文本';
  if (format === 'word') return 'Word';
  if (format === 'pdf') return 'PDF';
  if (format === 'excel' || format === 'excel_legacy') return 'Excel';
  return '文本';
}

function withTempFile(fileName = 'import.tmp', buffer = Buffer.alloc(0), handler) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cfqh-qbank-'));
  const safeName = path.basename(fileName || 'import.tmp');
  const filePath = path.join(tempDir, safeName);
  fs.writeFileSync(filePath, buffer);
  try {
    return handler(filePath);
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore temp cleanup failures.
    }
  }
}

function extractTextWithTextutil(buffer, fileName) {
  return withTempFile(fileName, buffer, (filePath) => execFileSync('/usr/bin/textutil', [
    '-convert',
    'txt',
    '-stdout',
    filePath
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
}

function extractPdfText(buffer, fileName) {
  return withTempFile(fileName, buffer, (filePath) => {
    let extracted = '';
    try {
      extracted = execFileSync('/usr/bin/mdls', [
        '-raw',
        '-name',
        'kMDItemTextContent',
        filePath
      ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    } catch (error) {
      extracted = '';
    }

    if (extracted && extracted !== '(null)' && extracted.length > 12) {
      return extracted;
    }

    try {
      const fallback = execFileSync('/usr/bin/strings', [
        '-n',
        '4',
        filePath
      ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      if (fallback.trim()) {
        return fallback;
      }
    } catch (error) {
      // Ignore and throw below.
    }

    throw new Error('当前 PDF 未提取到可识别文字，请优先上传文字版 PDF、Word 或可复制文本。');
  });
}

function parseQuestionBankJson(text = '') {
  const payload = JSON.parse(String(text || '').trim() || 'null');
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload && Array.isArray(payload.questions)) {
    return payload.questions;
  }
  throw new Error('JSON 里没有找到可识别的题目数组。');
}

function parseQuestionBankPlainText(text = '') {
  const lines = String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const questions = [];
  let current = null;

  const pushCurrent = () => {
    if (current?.stem) {
      questions.push(current);
    }
  };

  lines.forEach((line, index) => {
    const isQuestionStart = /^\d+[\.\、)\]]\s*/.test(line);
    if (isQuestionStart) {
      pushCurrent();
      current = {
        stem: line.replace(/^\d+[\.\、)\]]\s*/, '').trim(),
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        optionF: '',
        answer: '',
        explanation: ''
      };
      return;
    }

    if (!current) {
      current = {
        stem: index === 0 ? line : '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        optionF: '',
        answer: '',
        explanation: ''
      };
      if (index === 0) {
        return;
      }
    }

    const optionMatch = line.match(/^([A-Fa-f])[\.\、:：)\]]\s*(.+)$/);
    if (optionMatch) {
      const label = optionMatch[1].toUpperCase();
      current[`option${label}`] = optionMatch[2].trim();
      return;
    }

    if (/^答案[:：]/.test(line)) {
      current.answer = line.replace(/^答案[:：]\s*/, '').trim();
      return;
    }

    if (/^解析[:：]/.test(line)) {
      current.explanation = line.replace(/^解析[:：]\s*/, '').trim();
      return;
    }

    if (/^年份[:：]/.test(line)) {
      current.year = line.replace(/^年份[:：]\s*/, '').trim();
      return;
    }

    if (/^题型[:：]/.test(line)) {
      current.questionType = line.replace(/^题型[:：]\s*/, '').trim();
      return;
    }

    if (current.explanation) {
      current.explanation = `${current.explanation}\n${line}`.trim();
      return;
    }

    current.stem = `${current.stem}\n${line}`.trim();
  });

  pushCurrent();

  if (questions.length) {
    return questions;
  }

  return String(text || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ stem: line }));
}

function parseQuestionBankXlsx(buffer, fileName) {
  return withTempFile(fileName, buffer, (filePath) => {
    const script = `
import json, sys, zipfile, xml.etree.ElementTree as ET
ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
path = sys.argv[1]
def col_to_idx(ref):
    letters = ''.join(ch for ch in ref if ch.isalpha())
    num = 0
    for ch in letters:
        num = num * 26 + (ord(ch.upper()) - 64)
    return max(num - 1, 0)
with zipfile.ZipFile(path) as zf:
    shared = []
    if 'xl/sharedStrings.xml' in zf.namelist():
        root = ET.fromstring(zf.read('xl/sharedStrings.xml'))
        for si in root.findall('main:si', ns):
            text = ''.join(node.text or '' for node in si.iterfind('.//main:t', ns))
            shared.append(text)
    sheet_name = next((name for name in zf.namelist() if name.startswith('xl/worksheets/sheet') and name.endswith('.xml')), None)
    if not sheet_name:
        print('[]')
        sys.exit(0)
    root = ET.fromstring(zf.read(sheet_name))
    rows = []
    for row in root.findall('.//main:sheetData/main:row', ns):
        cells = []
        for cell in row.findall('main:c', ns):
            col_idx = col_to_idx(cell.attrib.get('r', 'A1'))
            while len(cells) < col_idx:
                cells.append('')
            cell_type = cell.attrib.get('t', '')
            value = ''
            if cell_type == 'inlineStr':
                value = ''.join(node.text or '' for node in cell.iterfind('.//main:t', ns))
            else:
                value_node = cell.find('main:v', ns)
                if value_node is not None and value_node.text is not None:
                    value = value_node.text
                    if cell_type == 's':
                        idx = int(value)
                        value = shared[idx] if 0 <= idx < len(shared) else ''
            cells.append(value)
        rows.append(cells)
    print(json.dumps(rows, ensure_ascii=False))
`;
    const raw = execFileSync('python3', ['-c', script, filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    const rows = JSON.parse(raw || '[]');
    if (!Array.isArray(rows) || !rows.length) {
      throw new Error('Excel 里没有识别到可导入内容。');
    }
    const headers = (rows[0] || []).map((item) => String(item || '').trim());
    return rows.slice(1)
      .filter((cells) => Array.isArray(cells) && cells.some((value) => String(value || '').trim()))
      .map((cells) => Object.fromEntries(headers.map((header, index) => [header || `col_${index}`, String(cells[index] || '').trim()])));
  });
}

function normalizeQuestionBankRecords(records = [], options = {}) {
  const preferredDirection = normalizeQuestionBankDirection(options.direction || 'medical');
  const directionLabel = preferredDirection === 'math' ? '高数' : '医护';
  const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const baseName = String(options.fileName || '').replace(/\.[^.]+$/, '').replace(/[^\w\u4e00-\u9fa5-]+/g, '_') || `${directionLabel}导入`;
  const paperId = `${preferredDirection}-${baseName}-${dateCode}`.slice(0, 64);
  const paperTitle = `${directionLabel}题库导入 ${new Date().toISOString().slice(0, 10)}`;

  const normalized = records.map((row, index) => {
    const draft = {};
    Object.entries(row || {}).forEach(([key, value]) => {
      const field = getQuestionBankFieldKey(key);
      if (!field) return;
      draft[field] = String(value ?? '').trim();
    });

    const optionsList = ['A', 'B', 'C', 'D', 'E', 'F']
      .map((label) => ({ label, value: String(draft[`option${label}`] || '').trim() }))
      .filter((item) => item.value);
    const answer = normalizeQuestionBankAnswer(draft.answer || '');
    const questionType = getQuestionBankType(draft.questionType || '', optionsList);
    const direction = normalizeQuestionBankDirection(draft.direction || preferredDirection, preferredDirection);
    const yearValue = String(draft.year || '').match(/\d{4}/)?.[0] || String(new Date().getFullYear());
    const generatedQuestionId = `${direction === 'math' ? 'M' : 'YH'}-${dateCode}-${String(index + 1).padStart(3, '0')}`;

    return {
      questionId: String(draft.questionId || generatedQuestionId).trim(),
      direction,
      questionType,
      stem: String(draft.stem || '').trim(),
      optionA: draft.optionA || '',
      optionB: draft.optionB || '',
      optionC: draft.optionC || '',
      optionD: draft.optionD || '',
      optionE: draft.optionE || '',
      optionF: draft.optionF || '',
      answer,
      explanation: String(draft.explanation || '').trim(),
      year: yearValue,
      paperId: String(draft.paperId || paperId).trim(),
      paperTitle: String(draft.paperTitle || paperTitle).trim(),
      paperDescription: String(draft.paperDescription || `${directionLabel}题库导入自动整理结果`).trim(),
      tags: splitQuestionBankTags(draft.tags || '').join('|'),
      status: normalizeQuestionBankStatus(draft.status || '', Boolean(answer))
    };
  }).filter((item) => item.stem);

  if (!normalized.length) {
    throw new Error('上传内容里没有识别到题目，请检查文件是否包含题干、选项或答案。');
  }

  return normalized;
}

function convertQuestionBankImportToCsv(payload = {}) {
  const fileName = String(payload.fileName || '');
  const format = detectQuestionBankImportFormat(fileName);
  const preferredDirection = normalizeQuestionBankDirection(payload.direction || 'medical');
  const textContent = String(payload.textContent || '');
  const base64 = String(payload.fileContentBase64 || '');
  let records = [];

  if (format === 'csv') {
    if (!textContent.trim()) {
      throw new Error('题库文件内容为空，请重新选择后再试。');
    }
    return {
      format,
      formatLabel: getQuestionBankFormatLabel(format),
      csvText: textContent
    };
  }

  if (format === 'json') {
    records = parseQuestionBankJson(textContent);
  } else if (format === 'text') {
    records = parseQuestionBankPlainText(textContent);
  } else if (format === 'word') {
    const extractedText = extractTextWithTextutil(Buffer.from(base64, 'base64'), fileName);
    records = parseQuestionBankPlainText(extractedText);
  } else if (format === 'pdf') {
    const extractedText = extractPdfText(Buffer.from(base64, 'base64'), fileName);
    records = parseQuestionBankPlainText(extractedText);
  } else if (format === 'excel') {
    records = parseQuestionBankXlsx(Buffer.from(base64, 'base64'), fileName);
  } else if (format === 'excel_legacy') {
    throw new Error('旧版 Excel (.xls) 暂未直接支持，请先另存为 .xlsx、Word 或 PDF 后再上传。');
  } else {
    records = parseQuestionBankPlainText(textContent);
  }

  const normalizedRecords = normalizeQuestionBankRecords(records, {
    direction: preferredDirection,
    fileName
  });

  return {
    format,
    formatLabel: getQuestionBankFormatLabel(format),
    csvText: buildQuestionBankCsvText(normalizedRecords)
  };
}

function normalizeQuestionBankDirection(value = '', fallback = 'medical') {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) {
    return fallback;
  }
  if (['medical', '医护', '护理', '医学', '综合'].includes(raw)) {
    return 'medical';
  }
  if (['math', '数学', '高数', '高等数学'].includes(raw)) {
    return 'math';
  }
  return fallback;
}

function buildPaperSummaryFromQuestions(questionRows = []) {
  const paperMap = new Map();

  questionRows.forEach(({ question }) => {
    const paperId = normalizeCsvCell(question.paperId);
    if (!paperId) {
      return;
    }

    const direction = normalizeQuestionBankDirection(question.direction || 'medical');
    const paperKey = `${direction}:${paperId}`;

    const existing = paperMap.get(paperKey) || {
      paperId,
      direction,
      title: '',
      description: '',
      year: Number(question.year) || new Date().getFullYear(),
      questionIds: []
    };

    existing.direction = direction;
    existing.title = normalizeCsvCell(question.paperTitle || existing.title);
    existing.description = normalizeCsvCell(question.paperDescription || existing.description);
    existing.year = Math.max(existing.year || 0, Number(question.year) || 0) || new Date().getFullYear();
    existing.questionIds.push(question.questionId);
    paperMap.set(paperKey, existing);
  });

  return Array.from(paperMap.values()).map((paper, index) => ({
    ...paper,
    title: paper.title || `${paper.year} ${paper.direction === 'math' ? '高数训练卷' : '医护模拟冲刺卷'} ${String.fromCharCode(65 + index)}`,
    description: paper.description || (paper.direction === 'math'
      ? '由系统自动整理，适合按章节、题型与难度快速复查。'
      : '由系统自动整理，适合按套热身与冲刺练习。'),
    questionIds: Array.from(new Set(paper.questionIds))
  }));
}

function parseQuestionBankCsv(csvText = '', options = {}) {
  const preferredDirection = normalizeQuestionBankDirection(options.direction || 'medical');
  const rows = parseCsv(csvText);
  const headerRow = (rows[0] || []).map((value) => normalizeCsvCell(value));
  const missingHeaders = QUESTION_BANK_REQUIRED_HEADERS.filter((header) => !headerRow.includes(header));

  if (!headerRow.length) {
    throw new Error('题库内容为空，请先准备题目后再上传');
  }

  if (missingHeaders.length) {
    throw new Error(`系统整理后的题库字段仍不完整：${missingHeaders.join('、')}`);
  }

  const normalizedRows = rows
    .slice(1)
    .map((cells, index) => ({
      lineNumber: index + 2,
      record: Object.fromEntries(headerRow.map((header, cellIndex) => [header, normalizeCsvCell(cells[cellIndex] || '')]))
    }))
    .filter(({ record }) => Object.values(record).some(Boolean));

  const seenQuestionIds = new Set();
  const validRows = [];
  const errors = [];

  for (const { lineNumber, record } of normalizedRows) {
    const rowErrors = [];
    const questionId = normalizeCsvCell(record.questionId);
    const direction = normalizeQuestionBankDirection(record.direction || preferredDirection, preferredDirection);
    const questionType = normalizeCsvCell(record.questionType);
    const stem = normalizeCsvCell(record.stem);
    const answer = normalizeCsvCell(record.answer).toUpperCase();
    const status = normalizeCsvCell(record.status || 'published') || 'published';
    const yearRaw = normalizeCsvCell(record.year);
    const paperId = normalizeCsvCell(record.paperId);
    const options = ['A', 'B', 'C', 'D', 'E', 'F']
      .map((label) => ({
        id: label,
        text: normalizeCsvCell(record[`option${label}`])
      }))
      .filter((item) => item.text);

    if (!questionId) {
      rowErrors.push('questionId 不能为空');
    }

    if (questionId && seenQuestionIds.has(`${direction}:${questionId}`)) {
      rowErrors.push('questionId 重复');
    }

    if (!['single_choice', 'multiple_choice', 'judge'].includes(questionType)) {
      rowErrors.push('questionType 仅支持 single_choice / multiple_choice / judge');
    }

    if (!stem) {
      rowErrors.push('stem 不能为空');
    }

    if (!paperId) {
      rowErrors.push('paperId 不能为空');
    }

    if (!['published', 'draft'].includes(status)) {
      rowErrors.push('status 仅支持 published / draft');
    }

    if (yearRaw && !/^\d{4}$/.test(yearRaw)) {
      rowErrors.push('year 需为四位年份');
    }

    if (questionType === 'single_choice') {
      if (options.length < 2) {
        rowErrors.push('单选题至少需要 2 个选项');
      }
      if (answer && !/^[A-F]$/.test(answer)) {
        rowErrors.push('单选题 answer 需为 A-F 中的单个选项');
      }
      if (answer && !options.some((item) => item.id === answer)) {
        rowErrors.push('单选题 answer 对应的选项不存在');
      }
    }

    if (questionType === 'multiple_choice') {
      const answers = splitPipeValues(answer.toUpperCase());
      if (options.length < 2) {
        rowErrors.push('多选题至少需要 2 个选项');
      }
      if (answer && !answers.length) {
        rowErrors.push('多选题 answer 需使用 A|C 这样的格式');
      }
      if (answers.some((item) => !/^[A-F]$/.test(item))) {
        rowErrors.push('多选题 answer 只能填写 A-F，并用 | 分隔');
      }
      if (new Set(answers).size !== answers.length) {
        rowErrors.push('多选题 answer 不能重复填写同一选项');
      }
      if (answers.some((item) => !options.some((option) => option.id === item))) {
        rowErrors.push('多选题 answer 中存在未定义选项');
      }
    }

    if (questionType === 'judge') {
      if (answer && !['T', 'F'].includes(answer)) {
        rowErrors.push('判断题 answer 仅支持 T 或 F');
      }
    }

    if (!answer && status === 'published') {
      rowErrors.push('answer 留空时 status 需为 draft');
    }

    if (rowErrors.length) {
      errors.push({
        lineNumber,
        questionId: questionId || '',
        message: rowErrors.join('；')
      });
      continue;
    }

    seenQuestionIds.add(`${direction}:${questionId}`);
    validRows.push({
      lineNumber,
      question: {
        questionId,
        direction,
        questionType,
        stem,
        options,
        answer,
        explanation: normalizeCsvCell(record.explanation),
        year: yearRaw ? Number(yearRaw) : new Date().getFullYear(),
        paperId,
        paperTitle: normalizeCsvCell(record.paperTitle),
        paperDescription: normalizeCsvCell(record.paperDescription),
        tags: splitPipeValues(record.tags),
        status
      }
    });
  }

  return {
    headers: headerRow,
    direction: preferredDirection,
    totalRows: normalizedRows.length,
    validRows,
    errors
  };
}

function buildQuestionBankCsvPreview(csvText = '', fileName = '', direction = 'medical', formatLabel = 'CSV') {
  const parsed = parseQuestionBankCsv(csvText, { direction });
  return {
    fileName,
    direction: parsed.direction,
    sourceFormat: formatLabel,
    expectedHeaders: QUESTION_BANK_CSV_HEADERS,
    totalRows: parsed.totalRows,
    validCount: parsed.validRows.length,
    invalidCount: parsed.errors.length,
    previewRows: parsed.validRows.slice(0, 6).map(({ lineNumber, question }) => ({
      lineNumber,
      questionId: question.questionId,
      paperId: question.paperId,
      questionType: question.questionType,
      stem: question.stem,
      optionsCount: question.options.length,
      year: question.year,
      status: question.status
    })),
    errors: parsed.errors.slice(0, 12)
  };
}

async function importQuestionBankCsv(csvText = '', fileName = '', direction = 'medical', formatLabel = 'CSV') {
  const parsed = parseQuestionBankCsv(csvText, { direction });
  if (parsed.errors.length) {
    const firstError = parsed.errors[0];
    throw new Error(`${formatLabel} 校验失败，共 ${parsed.errors.length} 行有问题。第 ${firstError.lineNumber} 行：${firstError.message}`);
  }

  const existingQuestions = await store.listCollection('medicalQuestions');
  const existingPapers = await store.listCollection('pastPapers');
  const existingMap = new Map(existingQuestions.map((item) => [`${normalizeQuestionBankDirection(item.direction || 'medical')}:${item.questionId}`, item]));
  const existingPaperMap = new Map(existingPapers.map((item) => [`${normalizeQuestionBankDirection(item.direction || 'medical')}:${item.paperId}`, item]));
  const maxSort = existingQuestions.reduce((max, item) => Math.max(max, Number(item.sort || 0)), 0);
  const maxPaperSort = existingPapers.reduce((max, item) => Math.max(max, Number(item.sort || 0)), 0);
  let createdCount = 0;
  let updatedCount = 0;
  let paperCreatedCount = 0;
  let paperUpdatedCount = 0;
  let nextSort = maxSort + 10;
  let nextPaperSort = maxPaperSort + 10;

  for (const { question } of parsed.validRows) {
    const existing = existingMap.get(`${normalizeQuestionBankDirection(question.direction || parsed.direction)}:${question.questionId}`);
    const payload = {
      ...question,
      sort: existing?.sort || nextSort
    };

    if (existing) {
      await store.updateItem('medicalQuestions', existing._id, payload);
      updatedCount += 1;
      continue;
    }

    await store.createItem('medicalQuestions', payload);
    nextSort += 10;
    createdCount += 1;
  }

  const paperSummaries = buildPaperSummaryFromQuestions(parsed.validRows);
  for (const paper of paperSummaries) {
    const existing = existingPaperMap.get(`${normalizeQuestionBankDirection(paper.direction || parsed.direction)}:${paper.paperId}`);
    const payload = {
      paperId: paper.paperId,
      title: paper.title,
      year: paper.year,
      direction: normalizeQuestionBankDirection(paper.direction || parsed.direction),
      description: paper.description,
      questionIds: paper.questionIds,
      sort: existing?.sort || nextPaperSort,
      status: 'published'
    };

    if (existing) {
      await store.updateItem('pastPapers', existing._id, payload);
      paperUpdatedCount += 1;
      continue;
    }

    await store.createItem('pastPapers', payload);
    nextPaperSort += 10;
    paperCreatedCount += 1;
  }

  const excerpt = csvText.length > 2400 ? `${csvText.slice(0, 2400)}\n...` : csvText;
  await store.createItem('questionImports', {
    title: fileName || `question_import_${new Date().toISOString().slice(0, 10)}`,
    direction: parsed.direction,
    sourceType: 'file',
    rawText: excerpt,
    note: `${formatLabel} 导入完成：共 ${parsed.totalRows} 行，新增 ${createdCount} 题，更新 ${updatedCount} 题；同步 ${paperSummaries.length} 套模拟卷，新增 ${paperCreatedCount} 套，更新 ${paperUpdatedCount} 套。`,
    sort: Date.now(),
    status: 'published'
  });

  return {
    fileName,
    direction: parsed.direction,
    totalRows: parsed.totalRows,
    createdCount,
    updatedCount,
    paperCount: paperSummaries.length,
    paperCreatedCount,
    paperUpdatedCount,
    importedCount: parsed.validRows.length
  };
}

function getEmptyTemplate(collectionKey) {
  if (collectionKey === 'directions') {
    return {
      _id: '',
      name: '',
      slug: '',
      category: '',
      isFeatured: false,
      featuredTag: '',
      homeTag: '',
      summary: '',
      audience: '',
      features: [],
      chips: [],
      iconType: 'grid',
      homeCard: {},
      coursesCard: {},
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'teachers') {
    return {
      _id: '',
      name: '',
      role: '',
      tag: '',
      avatarSeed: '',
      intro: '',
      specialties: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'successCases') {
    return {
      _id: '',
      direction: 'math',
      pathTags: [],
      studentName: '',
      studentAvatarText: '',
      scoreGain: '',
      scoreLabel: '',
      chips: [],
      startingLabel: '',
      startingScore: '',
      finalLabel: '',
      finalScore: '',
      quote: '',
      fitAudience: '',
      listTitle: '',
      listDesc: '',
      detailButtonText: '看详情',
      title: '',
      subtitle: '',
      coverSeed: '',
      year: new Date().getFullYear(),
      category: '',
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'mallAssets') {
    return {
      _id: '',
      name: '',
      title: '',
      subTitle: '',
      description: '',
      direction: 'math',
      stage: 'foundation',
      assetType: 'pdf',
      coverUrl: '',
      coverKey: '',
      pdfUrl: '',
      pdfKey: '',
      pdfPageCount: 0,
      pdfFileSize: 0,
      previewEnabled: true,
      previewPageCount: 5,
      tags: [],
      accentStart: '#2f66ff',
      accentEnd: '#4f8dff',
      sortOrder: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'mallProducts') {
    return {
      _id: '',
      productName: '',
      productSubTitle: '',
      productDescription: '',
      productType: 'asset_bundle',
      direction: 'math',
      stage: 'foundation',
      badge: '',
      coverUrl: '',
      bannerUrl: '',
      price: 0,
      originPrice: 0,
      isFree: true,
      previewEnabled: true,
      highlights: [],
      sortOrder: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'mallProductItems') {
    return {
      _id: '',
      productId: '',
      itemType: 'asset',
      itemId: '',
      displayType: '资料',
      displayName: '',
      displaySubTitle: '',
      displayDescription: '',
      displayDetails: '',
      direction: 'math',
      previewEnabled: true,
      previewPageCount: 5,
      accentStart: '#2f66ff',
      accentEnd: '#4f8dff',
      sortOrder: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'mallEntitlements') {
    return {
      _id: '',
      userId: '',
      productId: '',
      entitlementType: 'bundle',
      sourceType: 'admin_grant',
      status: 'active',
      claimedAt: '',
      expiredAt: ''
    };
  }

  if (collectionKey === 'materialPackages') {
    return {
      _id: '',
      direction: 'math',
      stage: 'foundation',
      badge: '',
      title: '',
      target: '',
      solves: '',
      features: [],
      contentItemIds: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'materialItems') {
    return {
      _id: '',
      direction: 'math',
      stage: 'foundation',
      type: '',
      title: '',
      subtitle: '',
      desc: '',
      details: '',
      accentStart: '#2f66ff',
      accentEnd: '#4f8dff',
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'mediaAssets') {
    return {
      _id: '',
      name: '',
      module: '',
      type: 'image',
      url: '',
      thumbUrl: '',
      alt: '',
      tags: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'adminUsers') {
    return {
      _id: '',
      name: '',
      role: 'editor',
      status: 'active',
      loginAccount: '',
      password: '',
      authChannels: ['web']
    };
  }

  if (collectionKey === 'medicalQuestions') {
    return {
      _id: '',
      questionId: '',
      direction: 'medical',
      questionType: 'single_choice',
      stem: '',
      options: [],
      answer: '',
      explanation: '',
      year: new Date().getFullYear(),
      paperId: '',
      tags: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'pastPapers') {
    return {
      _id: '',
      paperId: '',
      title: '',
      year: new Date().getFullYear(),
      direction: 'medical',
      description: '',
      questionIds: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'questionImports') {
    return {
      _id: '',
      title: '',
      direction: 'medical',
      sourceType: 'paper',
      rawText: '',
      note: '',
      sort: 100,
      status: 'draft'
    };
  }

  return {};
}

function normalizeDocResult(result) {
  if (!result) return null;
  if (Array.isArray(result.data)) {
    return result.data[0] || null;
  }
  return result.data || null;
}

function isPublished(item) {
  return !!item && (!item.status || item.status === 'published');
}

function sortPublished(items) {
  return (items || [])
    .filter(isPublished)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function collectPublicEntries(payload) {
  return [
    payload.site,
    payload.page,
    ...(payload.mallAssets || []),
    ...(payload.mallProducts || []),
    ...(payload.mallProductItems || []),
    ...(payload.mallEntitlements || []),
    ...(payload.directions || []),
    ...(payload.medicalQuestions || []),
    ...(payload.pastPapers || []),
    ...(payload.questionImports || []),
    ...(payload.teachers || []),
    ...(payload.successCases || []),
    ...(payload.materialPackages || []),
    ...(payload.materialItems || []),
    ...(payload.mediaAssets || [])
  ].filter(Boolean);
}

function getUpdatedAt(entry) {
  return entry?.updatedAt || entry?._updatedAt || entry?.createdAt || entry?._createdAt || '';
}

function buildPublicMeta(pageKey, payload) {
  const entries = collectPublicEntries(payload);
  const timestamps = entries
    .map((entry) => getUpdatedAt(entry))
    .filter(Boolean)
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value));
  const latestTimestamp = timestamps.length ? Math.max(...timestamps) : Date.now();
  const updatedAt = new Date(latestTimestamp).toISOString();

  return {
    pageKey,
    mode: store.getMode(),
    updatedAt,
    revision: `${pageKey}:${latestTimestamp}`,
    generatedAt: new Date().toISOString()
  };
}

async function buildPublicPayload(pageKey) {
  const payload = {
    site: await store.getPage('site'),
    page: await store.getPage(pageKey)
  };

  if (pageKey === 'home' || pageKey === 'courses') {
    payload.directions = sortPublished(await store.listCollection('directions'));
  }

  if (pageKey === 'teachers') {
    payload.teachers = sortPublished(await store.listCollection('teachers'));
  }

  if (pageKey === 'success') {
    payload.successCases = sortPublished(await store.listCollection('successCases'));
  }

  if (pageKey === 'materials') {
    payload.mallAssets = await store.listCollection('mallAssets').catch(() => []);
    payload.mallProducts = await store.listCollection('mallProducts').catch(() => []);
    payload.mallProductItems = await store.listCollection('mallProductItems').catch(() => []);
    payload.mallEntitlements = await store.listCollection('mallEntitlements').catch(() => []);

    const compat = buildMaterialCompatFromMall(payload.mallProducts, payload.mallProductItems, payload.mallAssets);
    payload.materialPackages = compat.materialPackages.length
      ? compat.materialPackages
      : sortPublished(await store.listCollection('materialPackages'));
    payload.materialItems = compat.materialItems.length
      ? compat.materialItems
      : sortPublished(await store.listCollection('materialItems'));
  }

  if (pageKey === 'questionBank') {
    payload.medicalQuestions = sortPublished(await store.listCollection('medicalQuestions'));
    payload.pastPapers = sortPublished(await store.listCollection('pastPapers'));
    payload.questionImports = sortPublished(await store.listCollection('questionImports'));
  }

  payload.__meta = buildPublicMeta(pageKey, payload);
  return payload;
}

class LocalStore {
  constructor() {
    ensureDataFile();
  }

  getMode() {
    return 'local';
  }

  getConfigSummary() {
    return {
      dataFile: DATA_FILE,
      expectedEnvId: CLOUD_ENV_ID || '',
      hint: '如需直连云数据库，请在 cfqh/.env.admin-web 中配置 CLOUDBASE_APIKEY 或腾讯云密钥'
    };
  }

  async getPage(pageKey) {
    const data = readData();
    const payload = pageKey === 'site' ? data.site : data.pages[pageKey] || null;
    return normalizePagePayload(pageKey, payload);
  }

  async savePage(pageKey, payload) {
    const data = readData();
    const existing = pageKey === 'site' ? data.site : data.pages[pageKey];
    const nextPage = stampPagePayload(payload, existing);
    if (pageKey === 'site') {
      data.site = nextPage;
    } else {
      data.pages[pageKey] = nextPage;
    }
    writeData(data);
    return nextPage;
  }

  async listCollection(collectionKey) {
    const data = readData();
    let items = data[collectionKey] || [];
    if (
      !items.length &&
      (collectionKey === 'mallAssets' || collectionKey === 'mallProducts' || collectionKey === 'mallProductItems')
    ) {
      const compat = buildMallCompatFromLegacy(data.materialPackages || [], data.materialItems || []);
      items = compat[collectionKey] || [];
    }
    const { field, direction } = getCollectionOrder(collectionKey);
    return [...items].sort((left, right) => {
      const leftValue = left?.[field] || '';
      const rightValue = right?.[field] || '';
      if (direction === 'desc') {
        return String(rightValue).localeCompare(String(leftValue));
      }
      return String(leftValue).localeCompare(String(rightValue));
    }).map((item, index) => normalizeCollectionRecord(collectionKey, item, index));
  }

  async getItem(collectionKey, itemId) {
    const data = readData();
    let item = (data[collectionKey] || []).find((entry) => entry._id === itemId) || null;
    if (
      !item &&
      (collectionKey === 'mallAssets' || collectionKey === 'mallProducts' || collectionKey === 'mallProductItems')
    ) {
      const compat = buildMallCompatFromLegacy(data.materialPackages || [], data.materialItems || []);
      item = (compat[collectionKey] || []).find((entry) => entry._id === itemId) || null;
    }
    return item ? normalizeCollectionRecord(collectionKey, item) : null;
  }

  async createItem(collectionKey, payload) {
    const data = readData();
    const nextItem = normalizeCollectionRecord(
      collectionKey,
      stampCollectionItem(payload, payload._id || makeId(collectionKey))
    );
    data[collectionKey] = [...(data[collectionKey] || []), nextItem];
    writeData(data);
    return nextItem;
  }

  async updateItem(collectionKey, itemId, payload) {
    const data = readData();
    const existing = (data[collectionKey] || []).find((entry) => entry._id === itemId) || null;
    const nextItem = normalizeCollectionRecord(collectionKey, stampCollectionItem(payload, itemId, existing));
    data[collectionKey] = (data[collectionKey] || []).map((entry) =>
      entry._id === itemId ? nextItem : entry
    );
    writeData(data);
    return nextItem;
  }

  async deleteItem(collectionKey, itemId) {
    const data = readData();
    data[collectionKey] = (data[collectionKey] || []).filter((entry) => entry._id !== itemId);
    writeData(data);
  }

  async resetSeed() {
    writeData(stampSeedData(loadSeed()));
  }

  async ensureCollection() {
    return true;
  }
}

class CloudRequiredStore extends LocalStore {
  getMode() {
    return 'unavailable';
  }

  getConfigSummary() {
    return {
      expectedEnvId: CLOUD_ENV_ID || '',
      hint: '当前 3200 后台仅允许写入小程序云端数据库，请补齐云环境凭据后再进行后台维护。',
      localFallbackFile: DATA_FILE
    };
  }

  async savePage() {
    throw createCloudRequiredError();
  }

  async createItem() {
    throw createCloudRequiredError();
  }

  async updateItem() {
    throw createCloudRequiredError();
  }

  async deleteItem() {
    throw createCloudRequiredError();
  }

  async resetSeed() {
    throw createCloudRequiredError();
  }
}

class CloudStore {
  constructor() {
    const cloudbase = require('@cloudbase/node-sdk');
    this.app = cloudbase.init({
      env: CLOUD_ENV_ID,
      accessKey: RUNTIME_ENV.CLOUDBASE_APIKEY || undefined,
      secretId: RUNTIME_ENV.TENCENTCLOUD_SECRETID || undefined,
      secretKey: RUNTIME_ENV.TENCENTCLOUD_SECRETKEY || undefined
    });
    this.db = this.app.database();
  }

  getMode() {
    return 'cloud';
  }

  getConfigSummary() {
    return {
      envId: CLOUD_ENV_ID,
      authMode: RUNTIME_ENV.CLOUDBASE_APIKEY
        ? 'apiKey'
        : RUNTIME_ENV.TENCENTCLOUD_SECRETID && RUNTIME_ENV.TENCENTCLOUD_SECRETKEY
          ? 'secret'
          : 'unknown'
    };
  }

  async getPage(pageKey) {
    const collection = PAGE_COLLECTIONS[pageKey];
    const docId = PAGE_DOC_IDS[pageKey];
    if (!collection || !docId) throw new Error('未知页面');
    const result = await this.db.collection(collection).doc(docId).get();
    return normalizePagePayload(pageKey, normalizeDocResult(result));
  }

  async savePage(pageKey, payload, expectedRevision = '') {
    const collection = PAGE_COLLECTIONS[pageKey];
    const docId = PAGE_DOC_IDS[pageKey];
    if (!collection || !docId) throw new Error('未知页面');
    const existing = await this.getPage(pageKey).catch(() => null);
    const currentRevision = existing ? buildPageRevision(pageKey, existing) : '';
    if (expectedRevision && currentRevision && expectedRevision !== currentRevision) {
      throw createPageConflictError(pageKey, existing, this.getMode());
    }
    const nextPage = stampPagePayload(stripPageMeta(payload), existing);
    await this.db.collection(collection).doc(docId).set(stripId(nextPage));
    return nextPage;
  }

  async listCollection(collectionKey) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const { field, direction } = getCollectionOrder(collectionKey);
    const batchSize = 100;
    const allItems = [];

    try {
      for (let offset = 0; offset < 5000; offset += batchSize) {
        const result = await this.db.collection(collection).orderBy(field, direction).skip(offset).limit(batchSize).get();
        const batch = result.data || [];
        allItems.push(...batch);
        if (batch.length < batchSize) {
          break;
        }
      }
    } catch (error) {
      if (isMissingCollectionError(error)) {
        if (LEARNER_LIST_COLLECTIONS.has(collectionKey)) {
          await this.ensureCollection(collectionKey).catch(() => false);
          return [];
        }
      }
      throw error;
    }

    if (
      !allItems.length &&
      (collectionKey === 'mallAssets' || collectionKey === 'mallProducts' || collectionKey === 'mallProductItems')
    ) {
      const legacyPackages = await this.listCollection('materialPackages').catch(() => []);
      const legacyItems = await this.listCollection('materialItems').catch(() => []);
      return buildMallCompatFromLegacy(legacyPackages, legacyItems)[collectionKey] || [];
    }

    return allItems.map((item, index) => normalizeCollectionRecord(collectionKey, item, index));
  }

  async getItem(collectionKey, itemId) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    try {
      const result = await this.db.collection(collection).doc(itemId).get();
      const normalized = normalizeCollectionRecord(collectionKey, normalizeDocResult(result));
      if (normalized) {
        return normalized;
      }
      if (collectionKey === 'mallAssets' || collectionKey === 'mallProducts' || collectionKey === 'mallProductItems') {
        const compat = await this.listCollection(collectionKey).catch(() => []);
        return compat.find((entry) => entry._id === itemId) || null;
      }
      return null;
    } catch (error) {
      if (isMissingCollectionError(error) && LEARNER_LIST_COLLECTIONS.has(collectionKey)) {
        await this.ensureCollection(collectionKey).catch(() => false);
        return null;
      }
      if (isMissingCollectionError(error) && (collectionKey === 'mallAssets' || collectionKey === 'mallProducts' || collectionKey === 'mallProductItems')) {
        const compat = await this.listCollection(collectionKey).catch(() => []);
        return compat.find((entry) => entry._id === itemId) || null;
      }
      throw error;
    }
  }

  async createItem(collectionKey, payload) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const itemId = payload._id || makeId(collectionKey);
    const nextItem = normalizeCollectionRecord(collectionKey, stampCollectionItem(payload, itemId));
    try {
      await this.db.collection(collection).doc(itemId).set(stripId(nextItem));
    } catch (error) {
      if (isMissingCollectionError(error)) {
        await this.ensureCollection(collectionKey);
        await this.db.collection(collection).doc(itemId).set(stripId(nextItem));
      } else {
        throw error;
      }
    }
    return nextItem;
  }

  async updateItem(collectionKey, itemId, payload) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const existing = await this.getItem(collectionKey, itemId).catch(() => null);
    const nextItem = normalizeCollectionRecord(collectionKey, stampCollectionItem(payload, itemId, existing));
    await this.db.collection(collection).doc(itemId).set(stripId(nextItem));
    return nextItem;
  }

  async deleteItem(collectionKey, itemId) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    try {
      await this.db.collection(collection).doc(itemId).remove();
    } catch (error) {
      if (isMissingCollectionError(error) && LEARNER_LIST_COLLECTIONS.has(collectionKey)) {
        return;
      }
      throw error;
    }
  }

  async ensureCollection(collectionKey) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) {
      throw new Error('未知集合');
    }

    try {
      await this.db.createCollection(collection);
      return true;
    } catch (error) {
      const message = String(error.message || '');
      const exists =
        message.includes('already exists') ||
        message.includes('集合已存在') ||
        message.includes('Collection already exists') ||
        message.includes('ResourceExist') ||
        message.includes('Table exist');

      if (exists) {
        return false;
      }

      throw error;
    }
  }

  async resetSeed() {
    const seed = stampSeedData(loadSeed());

    const collectionNames = [
      ...new Set([...Object.values(PAGE_COLLECTIONS), ...Object.values(LIST_COLLECTIONS)])
    ];

    for (const name of collectionNames) {
      try {
        await this.db.createCollection(name);
      } catch (error) {
        const message = String(error.message || '');
        const exists =
          message.includes('already exists') ||
          message.includes('集合已存在') ||
          message.includes('Collection already exists') ||
          message.includes('ResourceExist') ||
          message.includes('Table exist');

        if (!exists) {
          throw error;
        }
      }
    }

    await this.savePage('site', seed.site);

    for (const pageKey of Object.keys(PAGE_COLLECTIONS)) {
      if (pageKey === 'site') continue;
      await this.savePage(pageKey, seed.pages[pageKey]);
    }

    for (const [collectionKey, collectionName] of Object.entries(LIST_COLLECTIONS)) {
      const current = await this.listCollection(collectionKey);
      for (const item of current || []) {
        await this.db.collection(collectionName).doc(item._id).remove();
      }

      for (const item of seed[collectionKey] || []) {
        await this.createItem(collectionKey, item);
      }
    }
  }
}

function createStore() {
  if (!CLOUD_ENV_ID) {
    return new CloudRequiredStore();
  }

  if (!RUNTIME_ENV.CLOUDBASE_APIKEY && !(RUNTIME_ENV.TENCENTCLOUD_SECRETID && RUNTIME_ENV.TENCENTCLOUD_SECRETKEY)) {
    return new CloudRequiredStore();
  }

  return new CloudStore();
}

const store = createStore();

async function ensureAdminUsersCollection() {
  ensureCloudAuthReady();
  await store.ensureCollection('adminUsers');
}

async function handleApi(req, res, pathname) {
  const parts = pathname.split('/').filter(Boolean);

  if (pathname === '/api/health' && req.method === 'GET') {
    const runtime = buildRuntimeStatus();
    sendJson(res, 200, {
      ok: true,
      port: PORT,
      ...runtime,
      urls: getServiceUrls(),
      previewUrls: getServiceUrls().map((url) => `${url}/api/public/home`),
      config: store.getConfigSummary(),
      limits: {
        defaultJsonMb: DEFAULT_JSON_BODY_LIMIT_BYTES / 1024 / 1024,
        csvImportMb: CSV_BODY_LIMIT_BYTES / 1024 / 1024,
        questionBankFileMb: QUESTION_BANK_FILE_BODY_LIMIT_BYTES / 1024 / 1024
      }
    });
    return;
  }

  if (pathname === '/api/auth/status' && req.method === 'GET') {
    sendJson(res, 200, {
      ok: true,
      data: await getAuthState(req)
    });
    return;
  }

  if (pathname === '/api/auth/bootstrap' && req.method === 'POST') {
    await ensureBootstrapAllowed();
    const body = await readBody(req);
    const loginAccount = normalizeLoginAccount(body.loginAccount);
    const password = String(body.password || '').trim();
    const name = String(body.name || '').trim() || '系统管理员';

    if (!loginAccount) {
      sendJson(res, 400, { ok: false, message: '请填写登录账号' });
      return;
    }

    if (password.length < 6) {
      sendJson(res, 400, { ok: false, message: '登录密码至少 6 位' });
      return;
    }

    const created = await store.createItem('adminUsers', prepareAdminUserPayload({
      _id: makeId('admin'),
      name,
      role: 'owner',
      status: 'active',
      loginAccount,
      password,
      authChannels: ['web']
    }));
    const sessionId = createAdminSession(created);
    const sanitized = sanitizeAdminUser(created);

    await store.updateItem('adminUsers', created._id, {
      ...created,
      lastLoginAt: nowIso()
    });

    sendJson(
      res,
      200,
      {
        ok: true,
        data: {
          authenticated: true,
          bootstrapRequired: false,
          user: { ...sanitized, lastLoginAt: nowIso() },
          permissions: getPermissionSummary(created),
          mode: store.getMode(),
          cloudReady: true
        }
      },
      { 'Set-Cookie': createSessionCookie(sessionId) }
    );
    return;
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    ensureCloudAuthReady();
    const body = await readBody(req);
    const loginAccount = normalizeLoginAccount(body.loginAccount);
    const password = String(body.password || '').trim();
    const admin = await findAdminByAccount(loginAccount);

    const supportsWebLogin = (item) => {
      const channels = Array.isArray(item?.authChannels) ? item.authChannels : [];
      return !channels.length || channels.includes('web');
    };

    if (
      !admin ||
      normalizeAdminStatus(admin.status) === 'disabled' ||
      !supportsWebLogin(admin) ||
      !admin.passwordHash ||
      admin.passwordHash !== hashPassword(password)
    ) {
      sendJson(res, 401, { ok: false, message: '账号或密码不正确' });
      return;
    }

    const sessionId = createAdminSession(admin);
    const updated = await store.updateItem('adminUsers', admin._id, {
      ...admin,
      lastLoginAt: nowIso()
    });

    sendJson(
      res,
      200,
      {
        ok: true,
        data: {
          authenticated: true,
          bootstrapRequired: false,
          user: sanitizeAdminUser(updated),
          permissions: getPermissionSummary(updated),
          mode: store.getMode(),
          cloudReady: true
        }
      },
      { 'Set-Cookie': createSessionCookie(sessionId) }
    );
    return;
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const cookies = parseCookies(req);
    const sessionId = cookies[SESSION_COOKIE_NAME];
    if (sessionId) {
      sessionStore.delete(sessionId);
    }
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie() });
    return;
  }

  if (pathname === '/api/meta' && req.method === 'GET') {
    const admin = await requirePermission(req, 'cms.read');
    const permissions = getPermissionSummary(admin);
    sendJson(res, 200, {
      ok: true,
      pageOptions,
      listOptions: listOptions.filter((item) => {
        if (item.key === 'adminUsers' || LEARNER_LIST_COLLECTIONS.has(item.key)) {
          return permissions.canManageUsers;
        }
        return true;
      }),
      mode: store.getMode(),
      previewUrls: getServiceUrls().map((url) => `${url}/api/public/home`),
      currentUser: sanitizeAdminUser(admin),
      permissions
    });
    return;
  }

  if (parts[1] === 'public' && req.method === 'GET') {
    const pageKey = parts[2] || 'home';
    if (!PAGE_COLLECTIONS[pageKey]) {
      sendJson(res, 400, { ok: false, message: '未知页面' });
      return;
    }

    const payload = await buildPublicPayload(pageKey);
    sendJson(res, 200, { ok: true, data: payload, mode: store.getMode() });
    return;
  }

  if (pathname === '/api/seed/reset' && req.method === 'POST') {
    await requirePermission(req, 'cms.reset');
    await store.resetSeed();
    sendJson(res, 200, { ok: true, mode: store.getMode() });
    return;
  }

  if (parts[1] === 'template' && req.method === 'GET') {
    const collectionKey = parts[2];
    await requirePermission(req, getCollectionPermission(collectionKey, 'POST'));
    sendJson(res, 200, { ok: true, data: getEmptyTemplate(collectionKey) });
    return;
  }

  if (parts[1] === 'import' && (parts[2] === 'question-bank-csv' || parts[2] === 'question-bank-file') && req.method === 'POST') {
    const isGenericFileImport = parts[2] === 'question-bank-file';
    const body = await readBody(req, {
      limitBytes: isGenericFileImport ? QUESTION_BANK_FILE_BODY_LIMIT_BYTES : CSV_BODY_LIMIT_BYTES
    });
    const action = parts[3] || 'preview';
    const fileName = String(body.fileName || '');
    const direction = normalizeQuestionBankDirection(body.direction || 'medical');
    let csvText = String(body.csvText || '');
    let formatLabel = 'CSV';

    if (isGenericFileImport) {
      const converted = convertQuestionBankImportToCsv({
        fileName,
        direction,
        textContent: body.textContent || '',
        fileContentBase64: body.fileContentBase64 || ''
      });
      csvText = converted.csvText || '';
      formatLabel = converted.formatLabel || '题库文件';
    }

    if (!csvText.trim()) {
      sendJson(res, 400, { ok: false, message: isGenericFileImport ? '请先上传题库文件' : '请先上传 CSV 内容' });
      return;
    }

    if (action === 'preview') {
      await requirePermission(req, 'cms.write');
      const preview = buildQuestionBankCsvPreview(csvText, fileName, direction, formatLabel);
      sendJson(res, 200, { ok: true, data: preview });
      return;
    }

    if (action === 'commit') {
      await requirePermission(req, 'cms.publish');
      const summary = await importQuestionBankCsv(csvText, fileName, direction, formatLabel);
      sendJson(res, 200, { ok: true, data: summary });
      return;
    }
  }

  if (parts[1] === 'page') {
    const pageKey = parts[2];
    if (!pageKey) {
      sendJson(res, 400, { ok: false, message: '缺少 pageKey' });
      return;
    }

    if (req.method === 'GET') {
      await requirePermission(req, 'cms.read');
      const payload = await store.getPage(pageKey);
      sendJson(res, 200, { ok: true, data: attachAdminPageMeta(pageKey, payload || null, store.getMode()) });
      return;
    }

    if (req.method === 'PUT') {
      await requirePermission(req, 'cms.write');
      const body = await readBody(req);
      const expectedRevision = String(body?._meta?.revision || '').trim();
      const saved = await store.savePage(pageKey, body, expectedRevision);
      sendJson(res, 200, { ok: true, data: attachAdminPageMeta(pageKey, saved, store.getMode()) });
      return;
    }
  }

  if (parts[1] === 'collection') {
    const collectionKey = parts[2];
    const itemId = parts[3];
    const permission = getCollectionPermission(collectionKey, req.method);
    const admin = await requirePermission(req, permission);

    if (req.method === 'GET' && !itemId) {
      const items = await store.listCollection(collectionKey);
      sendJson(res, 200, { ok: true, data: sanitizeCollectionOutput(collectionKey, items) });
      return;
    }

    if (req.method === 'GET' && itemId) {
      const item = await store.getItem(collectionKey, itemId);
      sendJson(res, 200, { ok: true, data: sanitizeCollectionOutput(collectionKey, item) });
      return;
    }

    if (req.method === 'POST' && !itemId) {
      const body = await readBody(req);
      const payload = collectionKey === 'adminUsers' ? prepareAdminUserPayload(body) : body;

      if (collectionKey === 'adminUsers') {
        if (!payload.name) {
          sendJson(res, 400, { ok: false, message: '请填写老师姓名' });
          return;
        }
        if (!payload.loginAccount) {
          sendJson(res, 400, { ok: false, message: '请填写登录账号' });
          return;
        }
        if (!payload.passwordHash) {
          sendJson(res, 400, { ok: false, message: '请设置登录密码' });
          return;
        }

        const exists = await findAdminByAccount(payload.loginAccount);
        if (exists) {
          sendJson(res, 409, { ok: false, message: '该登录账号已存在' });
          return;
        }
      }

      const created = await store.createItem(collectionKey, payload);
      sendJson(res, 200, { ok: true, data: sanitizeCollectionOutput(collectionKey, created) });
      return;
    }

    if (req.method === 'PUT' && itemId) {
      const body = await readBody(req);
      if (collectionKey === 'adminUsers') {
        const existing = await store.getItem(collectionKey, itemId);
        if (!existing) {
          sendJson(res, 404, { ok: false, message: '未找到对应账号' });
          return;
        }

        const nextPayload = prepareAdminUserPayload(body, existing);
        if (!nextPayload.name) {
          sendJson(res, 400, { ok: false, message: '请填写老师姓名' });
          return;
        }
        if (!nextPayload.loginAccount) {
          sendJson(res, 400, { ok: false, message: '请填写登录账号' });
          return;
        }

        const sameAccount = await findAdminByAccount(nextPayload.loginAccount);
        if (sameAccount && sameAccount._id !== itemId) {
          sendJson(res, 409, { ok: false, message: '该登录账号已存在' });
          return;
        }

        const allAdmins = await listAdminUsers();
        const activeWebAdmins = allAdmins.filter(
          (item) =>
            item._id !== itemId &&
            normalizeAdminStatus(item.status) === 'active' &&
            normalizeLoginAccount(item.loginAccount) &&
            item.passwordHash
        );
        const nextIsActiveWebAdmin =
          normalizeAdminStatus(nextPayload.status) === 'active' &&
          normalizeLoginAccount(nextPayload.loginAccount) &&
          nextPayload.passwordHash;

        if (!nextIsActiveWebAdmin && activeWebAdmins.length === 0) {
          sendJson(res, 400, { ok: false, message: '至少保留一个可登录的后台管理员账号' });
          return;
        }

        if (admin._id === itemId && normalizeAdminStatus(nextPayload.status) === 'disabled') {
          sendJson(res, 400, { ok: false, message: '不能停用当前登录账号，请先使用其他管理员登录。' });
          return;
        }

        await store.updateItem(collectionKey, itemId, nextPayload);
      } else {
        await store.updateItem(collectionKey, itemId, body);
      }
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'DELETE' && itemId) {
      if (collectionKey === 'adminUsers') {
        if (admin._id === itemId) {
          sendJson(res, 400, { ok: false, message: '不能删除当前登录账号' });
          return;
        }
        const allAdmins = await listAdminUsers();
        const remainingAdmins = allAdmins.filter(
          (item) =>
            item._id !== itemId &&
            normalizeAdminStatus(item.status) === 'active' &&
            normalizeLoginAccount(item.loginAccount) &&
            item.passwordHash
        );
        if (remainingAdmins.length === 0) {
          sendJson(res, 400, { ok: false, message: '至少保留一个可登录的后台管理员账号' });
          return;
        }
      }

      await store.deleteItem(collectionKey, itemId);
      sendJson(res, 200, { ok: true });
      return;
    }
  }

  sendJson(res, 404, { ok: false, message: '未知接口' });
}

const server = http.createServer(async (req, res) => {
  res.__corsHeaders = buildCorsHeaders(req);
  if (req.method === 'OPTIONS') {
    if (req.headers.origin && !res.__corsHeaders['Access-Control-Allow-Origin']) {
      sendJson(res, 403, { ok: false, message: '当前来源未被允许访问后台接口' });
      return;
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (pathname.startsWith('/api/')) {
      await handleApi(req, res, pathname);
      return;
    }

    if (pathname === '/react-admin' || pathname.startsWith('/react-admin/')) {
      serveReactApp(res, pathname);
      return;
    }

    const safePath = pathname === '/' ? '/index.html' : pathname;
    sendFile(res, path.join(PUBLIC_DIR, safePath));
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      ok: false,
      message: error.message || '服务异常',
      code: error.code || '',
      data: error.data || null
    });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[admin-web] mode=${store.getMode()} ${getServiceUrls().join(' ')}`);
});
