const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { URL } = require('url');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC_DIR = path.join(ROOT, 'admin-web');
const DATA_FILE = path.join(ROOT, 'database', 'local-admin-data.json');
const SEED_FILE = path.join(ROOT, 'database', 'seed-data.js');
const CLOUD_CONFIG_FILE = path.join(ROOT, 'src', 'config', 'cloud.ts');
const PORT = Number(process.env.ADMIN_WEB_PORT || 3200);

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
  { key: 'courses', label: '开设方向' },
  { key: 'teachers', label: '师资' },
  { key: 'success', label: '成果' },
  { key: 'about', label: '关于我们' },
  { key: 'materials', label: '教材资料' }
];

const listOptions = [
  { key: 'directions', label: '方向列表' },
  { key: 'teachers', label: '师资列表' },
  { key: 'successCases', label: '成果案例' },
  { key: 'materialSeries', label: '教材套系' },
  { key: 'materialItems', label: '教材单品' },
  { key: 'mediaAssets', label: '媒体资源' }
];

const PAGE_COLLECTIONS = {
  site: 'site_settings',
  home: 'page_home',
  courses: 'page_courses',
  teachers: 'page_teachers',
  success: 'page_success',
  about: 'page_about',
  materials: 'page_materials'
};

const PAGE_DOC_IDS = {
  site: 'default',
  home: 'singleton',
  courses: 'singleton',
  teachers: 'singleton',
  success: 'singleton',
  about: 'singleton',
  materials: 'singleton'
};

const LIST_COLLECTIONS = {
  directions: 'directions',
  teachers: 'teachers',
  successCases: 'success_cases',
  materialSeries: 'material_series',
  materialItems: 'material_items',
  mediaAssets: 'media_assets'
};

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

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
  };

  if (!fs.existsSync(filePath)) {
    sendJson(res, 404, { ok: false, message: 'Not found' });
    return;
  }

  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'text/plain; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
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
    req.on('error', reject);
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
      title: '',
      subtitle: '',
      coverSeed: '',
      year: new Date().getFullYear(),
      category: '',
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'materialSeries') {
    return {
      _id: '',
      name: '',
      slug: '',
      category: '',
      tag: '',
      accent: '#5b4dff',
      summary: '',
      shelfLabel: '',
      items: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collectionKey === 'materialItems') {
    return {
      _id: '',
      seriesId: '',
      type: '',
      title: '',
      stage: '',
      subtitle: '',
      desc: '',
      contents: [],
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
    ...(payload.directions || []),
    ...(payload.teachers || []),
    ...(payload.successCases || []),
    ...(payload.materialSeries || []),
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
    payload.materialSeries = sortPublished(await store.listCollection('materialSeries'));
    payload.materialItems = sortPublished(await store.listCollection('materialItems'));
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
    return pageKey === 'site' ? data.site : data.pages[pageKey] || null;
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
    return data[collectionKey] || [];
  }

  async getItem(collectionKey, itemId) {
    const data = readData();
    return (data[collectionKey] || []).find((entry) => entry._id === itemId) || null;
  }

  async createItem(collectionKey, payload) {
    const data = readData();
    const nextItem = stampCollectionItem(payload, payload._id || makeId(collectionKey));
    data[collectionKey] = [...(data[collectionKey] || []), nextItem];
    writeData(data);
    return nextItem;
  }

  async updateItem(collectionKey, itemId, payload) {
    const data = readData();
    const existing = (data[collectionKey] || []).find((entry) => entry._id === itemId) || null;
    const nextItem = stampCollectionItem(payload, itemId, existing);
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
}

class CloudStore {
  constructor() {
    const cloudbase = require('@cloudbase/node-sdk');
    this.app = cloudbase.init({
      env: CLOUD_ENV_ID,
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
    return normalizeDocResult(result);
  }

  async savePage(pageKey, payload) {
    const collection = PAGE_COLLECTIONS[pageKey];
    const docId = PAGE_DOC_IDS[pageKey];
    if (!collection || !docId) throw new Error('未知页面');
    const existing = await this.getPage(pageKey).catch(() => null);
    const nextPage = stampPagePayload(payload, existing);
    await this.db.collection(collection).doc(docId).set(stripId(nextPage));
    return nextPage;
  }

  async listCollection(collectionKey) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const result = await this.db.collection(collection).orderBy('sort', 'asc').limit(100).get();
    return result.data || [];
  }

  async getItem(collectionKey, itemId) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const result = await this.db.collection(collection).doc(itemId).get();
    return normalizeDocResult(result);
  }

  async createItem(collectionKey, payload) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const itemId = payload._id || makeId(collectionKey);
    const nextItem = stampCollectionItem(payload, itemId);
    await this.db.collection(collection).doc(itemId).set(stripId(nextItem));
    return nextItem;
  }

  async updateItem(collectionKey, itemId, payload) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    const existing = await this.getItem(collectionKey, itemId).catch(() => null);
    const nextItem = stampCollectionItem(payload, itemId, existing);
    await this.db.collection(collection).doc(itemId).set(stripId(nextItem));
    return nextItem;
  }

  async deleteItem(collectionKey, itemId) {
    const collection = LIST_COLLECTIONS[collectionKey];
    if (!collection) throw new Error('未知集合');
    await this.db.collection(collection).doc(itemId).remove();
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
      const current = await this.db.collection(collectionName).limit(100).get();
      for (const item of current.data || []) {
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
    return new LocalStore();
  }

  if (!RUNTIME_ENV.CLOUDBASE_APIKEY && !(RUNTIME_ENV.TENCENTCLOUD_SECRETID && RUNTIME_ENV.TENCENTCLOUD_SECRETKEY)) {
    return new LocalStore();
  }

  return new CloudStore();
}

const store = createStore();

async function handleApi(req, res, pathname) {
  const parts = pathname.split('/').filter(Boolean);

  if (pathname === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, {
      ok: true,
      port: PORT,
      mode: store.getMode(),
      urls: getServiceUrls(),
      config: store.getConfigSummary()
    });
    return;
  }

  if (pathname === '/api/meta' && req.method === 'GET') {
    sendJson(res, 200, {
      ok: true,
      pageOptions,
      listOptions,
      mode: store.getMode(),
      previewUrls: getServiceUrls().map((url) => `${url}/api/public/home`)
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
    await store.resetSeed();
    sendJson(res, 200, { ok: true, mode: store.getMode() });
    return;
  }

  if (parts[1] === 'template' && req.method === 'GET') {
    const collectionKey = parts[2];
    sendJson(res, 200, { ok: true, data: getEmptyTemplate(collectionKey) });
    return;
  }

  if (parts[1] === 'page') {
    const pageKey = parts[2];
    if (!pageKey) {
      sendJson(res, 400, { ok: false, message: '缺少 pageKey' });
      return;
    }

    if (req.method === 'GET') {
      const payload = await store.getPage(pageKey);
      sendJson(res, 200, { ok: true, data: payload || null });
      return;
    }

    if (req.method === 'PUT') {
      const body = await readBody(req);
      await store.savePage(pageKey, body);
      sendJson(res, 200, { ok: true });
      return;
    }
  }

  if (parts[1] === 'collection') {
    const collectionKey = parts[2];
    const itemId = parts[3];

    if (req.method === 'GET' && !itemId) {
      const items = await store.listCollection(collectionKey);
      sendJson(res, 200, { ok: true, data: items });
      return;
    }

    if (req.method === 'GET' && itemId) {
      const item = await store.getItem(collectionKey, itemId);
      sendJson(res, 200, { ok: true, data: item });
      return;
    }

    if (req.method === 'POST' && !itemId) {
      const body = await readBody(req);
      const created = await store.createItem(collectionKey, body);
      sendJson(res, 200, { ok: true, data: created });
      return;
    }

    if (req.method === 'PUT' && itemId) {
      const body = await readBody(req);
      await store.updateItem(collectionKey, itemId, body);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'DELETE' && itemId) {
      await store.deleteItem(collectionKey, itemId);
      sendJson(res, 200, { ok: true });
      return;
    }
  }

  sendJson(res, 404, { ok: false, message: '未知接口' });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
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

    const safePath = pathname === '/' ? '/index.html' : pathname;
    sendFile(res, path.join(PUBLIC_DIR, safePath));
  } catch (error) {
    sendJson(res, 500, { ok: false, message: error.message || '服务异常' });
  }
});

if (store.getMode() === 'local') {
  ensureDataFile();
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[admin-web] mode=${store.getMode()} ${getServiceUrls().join(' ')}`);
});
