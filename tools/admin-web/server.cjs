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
const seedData = require(path.join(ROOT, 'database', 'seed-data.js'));

const HOME_PORTAL_LINKS = [
  { label: '机构介绍', desc: '看品牌介绍', url: '/pages/about/index', openType: 'navigate', icon: 'building' },
  { label: '每日一题', desc: '在学每日打卡', url: '/pages/question-bank/daily-question/index', openType: 'navigate', icon: 'daily' },
  { label: '模拟题', desc: '考前整卷冲刺', url: '/pages/question-bank/past-papers/index', openType: 'navigate', icon: 'paper' },
  { label: '错题本', desc: '回看薄弱题', url: '/pages/question-bank/wrong-book/index', openType: 'navigate', icon: 'wrongbook' }
];
const HOME_HERO_FALLBACK = seedData.pages?.home?.hero || {};
const HOME_STATS_FALLBACK = seedData.pages?.home?.overviewStats || [];
const HOME_ADVANTAGES_FALLBACK = seedData.pages?.home?.advantages || [];
const HOME_CTA_FALLBACK = seedData.pages?.home?.cta || {};
const HOME_ENVIRONMENT_FALLBACK = seedData.pages?.home?.environmentSection || { cards: [] };

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

function normalizeHomeHero(hero) {
  if (!hero) return HOME_HERO_FALLBACK;

  const isLegacyHero =
    hero.chip === '江苏省专转本权威培训品牌' ||
    hero.title === '乘帆启航' ||
    hero.highlightTitle === '专注江苏专转本医护与高数精细化教研' ||
    hero.primaryButton?.text === '了解机构实力';

  if (!isLegacyHero) {
    return hero;
  }

  return {
    ...hero,
    ...HOME_HERO_FALLBACK,
    backgroundImageUrl: hero.backgroundImageUrl,
    backgroundImageSeed: hero.backgroundImageSeed || HOME_HERO_FALLBACK.backgroundImageSeed
  };
}

function normalizeHomeOverviewStats(stats) {
  const isLegacyStats =
    Array.isArray(stats) &&
    stats.length === 3 &&
    stats[0]?.value === '核心' &&
    stats[1]?.value === '精品' &&
    stats[2]?.value === '高';

  return isLegacyStats ? HOME_STATS_FALLBACK : stats;
}

function normalizeHomeQuickLinks(quickLinks) {
  if (!Array.isArray(quickLinks) || !quickLinks.length) {
    return HOME_PORTAL_LINKS;
  }

  const normalizedLinks = quickLinks.slice(0, 4).map((item, index) => ({
    ...HOME_PORTAL_LINKS[index],
    ...item
  }));
  const labels = normalizedLinks.map((item) => String(item?.label || '').trim());
  const joinedLabels = labels.join('|');
  const legacyLabelSets = [
    '热门方向|每日一题|模拟题|错题本',
    '热门方向|每日一题|历年真题|错题本',
    '机构介绍|开设方向|师资团队|办学成果'
  ];
  const shouldResetToPortalDefault =
    normalizedLinks.length < 4 ||
    legacyLabelSets.includes(joinedLabels) ||
    labels.includes('热门方向') ||
    labels.includes('历年真题');

  return shouldResetToPortalDefault ? HOME_PORTAL_LINKS : normalizedLinks;
}

function normalizeHomeAdvantages(advantages) {
  if (!Array.isArray(advantages) || !advantages.length) {
    return HOME_ADVANTAGES_FALLBACK;
  }

  const legacyTitles = ['全职教研团队', '独立校区管理', '精细化教研', '督学管理'];
  return advantages.some((item) => legacyTitles.includes(item?.title || ''))
    ? HOME_ADVANTAGES_FALLBACK
    : advantages;
}

function normalizeHomeCta(cta) {
  if (!cta) {
    return HOME_CTA_FALLBACK;
  }

  const isLegacyCta =
    !cta.desc ||
    cta.buttonText === '查看上岸学员案例' ||
    cta.title === '还在纠结如何开始备考？';

  return isLegacyCta ? { ...cta, ...HOME_CTA_FALLBACK } : cta;
}

function normalizeHomeEnvironmentSection(section) {
  if (!section || !Array.isArray(section.cards) || !section.cards.length) {
    return HOME_ENVIRONMENT_FALLBACK;
  }

  return {
    ...section,
    cards: section.cards.slice(0, 2).map((item, index) => ({
      ...(HOME_ENVIRONMENT_FALLBACK.cards?.[index] || {}),
      ...item
    }))
  };
}

function normalizePagePayload(pageKey, payload) {
  if (!payload || pageKey !== 'home') {
    return payload;
  }

  return {
    ...payload,
    hero: normalizeHomeHero(payload.hero),
    overviewStats: normalizeHomeOverviewStats(payload.overviewStats),
    quickLinks: normalizeHomeQuickLinks(payload.quickLinks),
    advantages: normalizeHomeAdvantages(payload.advantages),
    environmentSection: normalizeHomeEnvironmentSection(payload.environmentSection),
    cta: normalizeHomeCta(payload.cta)
  };
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
  { key: 'materialSeries', label: '教材套系' },
  { key: 'materialItems', label: '教材单品' },
  { key: 'mediaAssets', label: '媒体资源' }
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

function buildPaperSummaryFromQuestions(questionRows = []) {
  const paperMap = new Map();

  questionRows.forEach(({ question }) => {
    const paperId = normalizeCsvCell(question.paperId);
    if (!paperId) {
      return;
    }

    const existing = paperMap.get(paperId) || {
      paperId,
      title: '',
      description: '',
      year: Number(question.year) || new Date().getFullYear(),
      questionIds: []
    };

    existing.title = normalizeCsvCell(question.paperTitle || existing.title);
    existing.description = normalizeCsvCell(question.paperDescription || existing.description);
    existing.year = Math.max(existing.year || 0, Number(question.year) || 0) || new Date().getFullYear();
    existing.questionIds.push(question.questionId);
    paperMap.set(paperId, existing);
  });

  return Array.from(paperMap.values()).map((paper, index) => ({
    ...paper,
    title: paper.title || `${paper.year} 医护模拟冲刺卷 ${String.fromCharCode(65 + index)}`,
    description: paper.description || '由 CSV 自动整理，适合按套热身与冲刺练习。',
    questionIds: Array.from(new Set(paper.questionIds))
  }));
}

function parseQuestionBankCsv(csvText = '') {
  const rows = parseCsv(csvText);
  const headerRow = (rows[0] || []).map((value) => normalizeCsvCell(value));
  const missingHeaders = QUESTION_BANK_REQUIRED_HEADERS.filter((header) => !headerRow.includes(header));

  if (!headerRow.length) {
    throw new Error('CSV 为空，请先填写表头和题目内容');
  }

  if (missingHeaders.length) {
    throw new Error(`CSV 缺少必要字段：${missingHeaders.join('、')}`);
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
    const direction = normalizeCsvCell(record.direction || 'medical') || 'medical';
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

    if (questionId && seenQuestionIds.has(questionId)) {
      rowErrors.push('questionId 重复');
    }

    if (direction !== 'medical') {
      rowErrors.push('direction 当前只支持 medical');
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

    seenQuestionIds.add(questionId);
    validRows.push({
      lineNumber,
      question: {
        questionId,
        direction: 'medical',
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
    totalRows: normalizedRows.length,
    validRows,
    errors
  };
}

function buildQuestionBankCsvPreview(csvText = '', fileName = '') {
  const parsed = parseQuestionBankCsv(csvText);
  return {
    fileName,
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

async function importQuestionBankCsv(csvText = '', fileName = '') {
  const parsed = parseQuestionBankCsv(csvText);
  if (parsed.errors.length) {
    const firstError = parsed.errors[0];
    throw new Error(`CSV 校验失败，共 ${parsed.errors.length} 行有问题。第 ${firstError.lineNumber} 行：${firstError.message}`);
  }

  const existingQuestions = await store.listCollection('medicalQuestions');
  const existingPapers = await store.listCollection('pastPapers');
  const existingMap = new Map(existingQuestions.map((item) => [item.questionId, item]));
  const existingPaperMap = new Map(existingPapers.map((item) => [item.paperId, item]));
  const maxSort = existingQuestions.reduce((max, item) => Math.max(max, Number(item.sort || 0)), 0);
  const maxPaperSort = existingPapers.reduce((max, item) => Math.max(max, Number(item.sort || 0)), 0);
  let createdCount = 0;
  let updatedCount = 0;
  let paperCreatedCount = 0;
  let paperUpdatedCount = 0;
  let nextSort = maxSort + 10;
  let nextPaperSort = maxPaperSort + 10;

  for (const { question } of parsed.validRows) {
    const existing = existingMap.get(question.questionId);
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
    const existing = existingPaperMap.get(paper.paperId);
    const payload = {
      paperId: paper.paperId,
      title: paper.title,
      year: paper.year,
      direction: 'medical',
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
    title: fileName || `csv_import_${new Date().toISOString().slice(0, 10)}`,
    direction: 'medical',
    sourceType: 'file',
    rawText: excerpt,
    note: `CSV 导入完成：共 ${parsed.totalRows} 行，新增 ${createdCount} 题，更新 ${updatedCount} 题；同步 ${paperSummaries.length} 套模拟卷，新增 ${paperCreatedCount} 套，更新 ${paperUpdatedCount} 套。`,
    sort: Date.now(),
    status: 'published'
  });

  return {
    fileName,
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
    ...(payload.directions || []),
    ...(payload.medicalQuestions || []),
    ...(payload.pastPapers || []),
    ...(payload.questionImports || []),
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
    return normalizePagePayload(pageKey, normalizeDocResult(result));
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
    const batchSize = 100;
    const allItems = [];

    for (let offset = 0; offset < 5000; offset += batchSize) {
      const result = await this.db.collection(collection).orderBy('sort', 'asc').skip(offset).limit(batchSize).get();
      const batch = result.data || [];
      allItems.push(...batch);
      if (batch.length < batchSize) {
        break;
      }
    }

    return allItems;
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

  if (parts[1] === 'import' && parts[2] === 'question-bank-csv' && req.method === 'POST') {
    const body = await readBody(req);
    const action = parts[3] || 'preview';
    const csvText = String(body.csvText || '');
    const fileName = String(body.fileName || '');

    if (!csvText.trim()) {
      sendJson(res, 400, { ok: false, message: '请先上传 CSV 内容' });
      return;
    }

    if (action === 'preview') {
      const preview = buildQuestionBankCsvPreview(csvText, fileName);
      sendJson(res, 200, { ok: true, data: preview });
      return;
    }

    if (action === 'commit') {
      const summary = await importQuestionBankCsv(csvText, fileName);
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
