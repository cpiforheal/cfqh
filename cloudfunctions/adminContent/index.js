const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

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

const ALLOWED_COLLECTIONS = new Set([
  'directions',
  'teachers',
  'success_cases',
  'material_packages',
  'material_items',
  'media_assets',
  'admin_users'
]);

const ROLE_PERMISSIONS = {
  viewer: new Set(['cms.read']),
  editor: new Set(['cms.read', 'cms.write']),
  publisher: new Set(['cms.read', 'cms.write', 'cms.publish']),
  admin: new Set(['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset']),
  owner: new Set(['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset'])
};

const HOME_PORTAL_LINKS = [
  { label: '机构介绍', desc: '看品牌介绍', url: '/pages/about/index', openType: 'navigate', icon: 'building' },
  { label: '每日一题', desc: '在学每日打卡', url: '/pages/question-bank/daily-question/index', openType: 'navigate', icon: 'daily' },
  { label: '模拟题', desc: '考前整卷冲刺', url: '/pages/question-bank/past-papers/index', openType: 'navigate', icon: 'paper' },
  { label: '错题本', desc: '回看薄弱题', url: '/pages/question-bank/wrong-book/index', openType: 'navigate', icon: 'wrongbook' }
];
const HOME_HERO_FALLBACK = {
  chip: '护理 / 助产 / 医护背景同学',
  title: '想冲江苏专转本？',
  highlightTitle: '先判断方向，再安排课程',
  desc: '新同学先看适合方向和课程安排，在学同学再进入每日一题、模拟题和错题本。',
  tags: ['92.3% 上岸率', '1:8 小班跟进', '独立校区学习'],
  primaryButton: {
    text: '了解课程安排',
    url: '/pages/courses/index',
    openType: 'switchTab'
  },
  secondaryNote: '先选方向，再做训练',
  backgroundImageSeed: 'university'
};
const HOME_STATS_FALLBACK = [
  { value: '92.3%', label: '上岸率', note: '2025届实际数据' },
  { value: '1:8', label: '师生比', note: '小班精细化' },
  { value: '365天', label: '全年答疑', note: '全职坐班' }
];
const HOME_ADVANTAGES_FALLBACK = [
  { icon: 'team', title: '答疑有人盯', desc: '第一次来了解也能先把基础、目标院校和卡点问清楚，问题当天就有人跟进。' },
  { icon: 'building', title: '备考节奏更稳', desc: '课程、督学和住宿安排放在同一节奏里，适合想集中投入、少走弯路的同学。' }
];
const HOME_ENVIRONMENT_FALLBACK = {
  cards: [
    { label: '多媒体教室', imageSeed: 'classroom1' },
    { label: '标准化宿舍', imageSeed: 'dorm1' }
  ]
};
const HOME_CTA_FALLBACK = {
  title: '先聊清楚，再决定报哪条线',
  desc: '把当前专业、目标院校和备考时间说明白，我们会先帮你判断适合的方向，再给课程安排建议。',
  buttonText: '预约咨询',
  footnote: ''
};
const COURSES_PAGE_FALLBACK = {
  title: '先判断适合哪条备考线',
  subtitle: '第一次了解专转本培训，先看自己更接近医护大类还是高数专项，再决定课程安排和备考节奏。',
  categories: ['我是医护背景', '我数学薄弱', '我想先做评估'],
  suggestions: [
    '护理、助产、临床等专业，优先看医护大类方向。',
    '理工、经管类且高数薄弱，优先看高数专项突破。',
    '如果暂时拿不准方向，先做 1 对 1 学情评估。'
  ],
  moreSection: {
    title: '更多方向补充',
    tag: '持续完善',
    desc: '经管、计算机等方向内容会逐步补充；如果你暂时不确定，也可以先做方向判断。'
  },
  cta: {
    title: '拿不准该选哪条线？',
    desc: '把当前专业、基础和目标院校告诉我们，我们会先帮你判断适合的方向，再给课程安排建议。',
    buttonText: '先做方向判断',
    footnote: '方向判断 · 课程安排 · 学情评估'
  }
};
const MATERIALS_PAGE_FALLBACK = {
  header: {
    title: '教材资料库',
    searchLabel: '搜索资料'
  },
  directionTabs: [
    { key: 'math', label: '高等数学', icon: 'grid' },
    { key: 'medical', label: '医护综合', icon: 'medical' }
  ],
  stageTabs: [
    { key: 'foundation', label: '基础阶段' },
    { key: 'reinforcement', label: '强化阶段' },
    { key: 'sprint', label: '冲刺阶段' }
  ],
  mainSection: {
    title: '核心主推套系',
    sideNote: '最适合当前阶段'
  },
  shelfSection: {
    title: '套系包含以下资料：',
    hint: '左右滑动查看'
  },
  consultBar: {
    title: '不知道怎么选？',
    desc: '专业老师为您1对1定制资料方案',
    buttonText: '免费咨询'
  }
};

function normalizeRole(role) {
  const normalized = String(role || '').trim().toLowerCase();
  if (normalized === 'viewer') return 'viewer';
  if (normalized === 'publisher') return 'publisher';
  if (normalized === 'admin') return 'admin';
  if (normalized === 'owner') return 'owner';
  return 'editor';
}

function normalizeStatus(status) {
  return String(status || '').trim().toLowerCase() === 'disabled' ? 'disabled' : 'active';
}

function getPermissions(role) {
  return ROLE_PERMISSIONS[normalizeRole(role)] || ROLE_PERMISSIONS.editor;
}

function sanitizeAdminUser(admin) {
  if (!admin) return null;
  return {
    _id: admin._id,
    name: admin.name || '',
    role: normalizeRole(admin.role),
    status: normalizeStatus(admin.status),
    loginAccount: String(admin.loginAccount || '').trim().toLowerCase(),
    authChannels: Array.isArray(admin.authChannels) ? admin.authChannels : [],
    updatedAt: admin.updatedAt || '',
    createdAt: admin.createdAt || ''
  };
}

function getActionPermission(action, collection) {
  if (action === 'getPage' || action === 'listCollection' || action === 'getItem') {
    if (collection === 'admin_users') return 'cms.manageUsers';
    return 'cms.read';
  }

  if (action === 'savePage' || action === 'saveItem') {
    if (collection === 'admin_users') return 'cms.manageUsers';
    return 'cms.write';
  }

  if (action === 'deleteItem') {
    if (collection === 'admin_users') return 'cms.manageUsers';
    return 'cms.write';
  }

  return 'cms.read';
}

async function ensureAdmin(requiredPermission = 'cms.read', collection = '') {
  const { OPENID } = cloud.getWXContext();

  try {
    const result = await db.collection('admin_users').doc(OPENID).get();
    const admin = result.data;

    if (!admin || normalizeStatus(admin.status) === 'disabled') {
      throw new Error('无后台权限');
    }

    const permissions = getPermissions(admin.role);
    if (!permissions.has(requiredPermission)) {
      throw new Error('当前账号暂无此操作权限');
    }

    console.log(`[adminContent] 管理员验证通过: ${OPENID}, 角色=${admin.role}, 权限=${requiredPermission}`);
    return admin;
  } catch (error) {
    console.error(`[adminContent] 管理员验证失败: ${OPENID}`, error);
    throw new Error('无后台权限');
  }
}

async function getDocument(collection, id) {
  try {
    const result = await db.collection(collection).doc(id).get();
    return result.data || null;
  } catch (error) {
    return null;
  }
}

function stripManagedFields(payload) {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const data = { ...payload };
  delete data.createdAt;
  delete data.updatedAt;
  delete data._meta;
  return data;
}

function hashPassword(password = '') {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(`cfqh-admin:${String(password)}`).digest('hex');
}

function prepareAdminUserPayload(payload = {}, existing = null) {
  const nextPayload = {
    ...payload,
    role: normalizeRole(payload.role || existing?.role),
    status: normalizeStatus(payload.status || existing?.status),
    loginAccount: String(payload.loginAccount || existing?.loginAccount || '').trim().toLowerCase(),
    authChannels: Array.isArray(payload.authChannels)
      ? Array.from(new Set(payload.authChannels.filter(Boolean)))
      : Array.isArray(existing?.authChannels)
        ? existing.authChannels
        : ['web']
  };

  const password = String(payload.password || '').trim();
  if (password) {
    nextPayload.passwordHash = hashPassword(password);
  } else if (existing?.passwordHash) {
    nextPayload.passwordHash = existing.passwordHash;
  }

  delete nextPayload.password;
  return nextPayload;
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

function normalizeHomeEnvironmentSection(section) {
  if (!section || !Array.isArray(section.cards) || !section.cards.length) {
    return HOME_ENVIRONMENT_FALLBACK;
  }

  return {
    ...section,
    cards: section.cards.slice(0, 2).map((item, index) => ({
      ...(HOME_ENVIRONMENT_FALLBACK.cards[index] || {}),
      ...item
    }))
  };
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
    return COURSES_PAGE_FALLBACK.cta;
  }

  const isLegacyCta = !cta.title || !cta.desc || !cta.buttonText;
  return isLegacyCta ? { ...cta, ...COURSES_PAGE_FALLBACK.cta } : cta;
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
    header: { ...MATERIALS_PAGE_FALLBACK.header, ...(payload.header || {}) },
    mainSection: { ...MATERIALS_PAGE_FALLBACK.mainSection, ...(payload.mainSection || {}) },
    shelfSection: { ...MATERIALS_PAGE_FALLBACK.shelfSection, ...(payload.shelfSection || {}) },
    consultBar: { ...MATERIALS_PAGE_FALLBACK.consultBar, ...(payload.consultBar || {}) }
  };
}

function normalizePagePayload(pageKey, payload) {
  if (!payload) {
    return payload;
  }

  if (pageKey === 'home') {
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

  if (pageKey === 'courses') {
    return normalizeCoursesPage(payload);
  }

  if (pageKey === 'materials') {
    return normalizeMaterialsPage(payload);
  }

  return payload;
}

function getPageUpdatedAt(payload) {
  return payload?.updatedAt || payload?.createdAt || '';
}

function buildPageRevision(pageKey, payload) {
  const updatedAt = getPageUpdatedAt(payload);
  const timestamp = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return `${pageKey}:${Number.isFinite(timestamp) ? timestamp : Date.now()}`;
}

function attachPageMeta(pageKey, payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return payload;
  }

  return {
    ...payload,
    _meta: {
      pageKey,
      updatedAt: getPageUpdatedAt(payload),
      revision: buildPageRevision(pageKey, payload),
      sourceMode: 'cloud'
    }
  };
}

exports.main = async (event) => {
  const startTime = Date.now();
  const action = event.action;
  const collection = event.collection || '';

  try {
    await ensureAdmin(getActionPermission(action, collection), collection);

    console.log(`[adminContent] 开始处理: action=${action}`);

    if (action === 'getPage') {
      const pageKey = event.pageKey;
      const collection = PAGE_COLLECTIONS[pageKey];
      if (!collection) throw new Error('未知页面');

      const data = normalizePagePayload(pageKey, await getDocument(collection, PAGE_DOC_IDS[pageKey]));
      const duration = Date.now() - startTime;
      console.log(`[adminContent] getPage 完成: pageKey=${pageKey}, 耗时=${duration}ms`);
      return { ok: true, data: attachPageMeta(pageKey, data) };
    }

    if (action === 'savePage') {
      const pageKey = event.pageKey;
      const collection = PAGE_COLLECTIONS[pageKey];
      if (!collection) throw new Error('未知页面');

      const payload = stripManagedFields(event.content);
      const now = db.serverDate();
      const docRef = db.collection(collection).doc(PAGE_DOC_IDS[pageKey]);
      const existingDoc = await getDocument(collection, PAGE_DOC_IDS[pageKey]);
      const existing = normalizePagePayload(pageKey, existingDoc);
      const expectedRevision = String(event.revision || event.content?._meta?.revision || '').trim();
      const latestRevision = existing ? buildPageRevision(pageKey, existing) : '';

      if (expectedRevision && latestRevision && expectedRevision !== latestRevision) {
        const duration = Date.now() - startTime;
        console.warn(`[adminContent] savePage 冲突: pageKey=${pageKey}, 耗时=${duration}ms`);
        return {
          ok: false,
          code: 'PAGE_CONFLICT',
          message: '当前页面已被其他老师更新，请先重新拉取后再保存。',
          data: {
            pageKey,
            revision: latestRevision,
            updatedAt: getPageUpdatedAt(existing),
            sourceMode: 'cloud'
          }
        };
      }

      const exists = Boolean(existingDoc);

      if (exists) {
        await docRef.update({
          data: {
            ...payload,
            updatedAt: now
          }
        });
      } else {
        await docRef.set({
          data: {
            ...payload,
            createdAt: now,
            updatedAt: now
          }
        });
      }

      const saved = normalizePagePayload(pageKey, await getDocument(collection, PAGE_DOC_IDS[pageKey]));
      const duration = Date.now() - startTime;
      console.log(`[adminContent] savePage 完成: pageKey=${pageKey}, 耗时=${duration}ms`);
      return { ok: true, data: attachPageMeta(pageKey, saved) };
    }

    if (action === 'listCollection') {
      const collection = event.collection;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');

      const result = await db.collection(collection).orderBy('sort', 'asc').limit(100).get();
      const duration = Date.now() - startTime;
      console.log(`[adminContent] listCollection 完成: collection=${collection}, 数量=${result.data?.length || 0}, 耗时=${duration}ms`);
      return {
        ok: true,
        data: collection === 'admin_users' ? (result.data || []).map((item) => sanitizeAdminUser(item)) : result.data || []
      };
    }

    if (action === 'getItem') {
      const collection = event.collection;
      const id = event.id;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');
      if (!id) throw new Error('缺少 id');

      const data = await getDocument(collection, id);
      const duration = Date.now() - startTime;
      console.log(`[adminContent] getItem 完成: collection=${collection}, id=${id}, 耗时=${duration}ms`);
      return { ok: true, data: collection === 'admin_users' ? sanitizeAdminUser(data) : data };
    }

    if (action === 'saveItem') {
      const collection = event.collection;
      const item = event.item;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');
      if (!item || typeof item !== 'object') throw new Error('缺少数据');

      const payload = collection === 'admin_users'
        ? prepareAdminUserPayload(stripManagedFields(item), item._id ? await getDocument(collection, item._id).catch(() => null) : null)
        : stripManagedFields(item);
      const itemId = payload._id;
      const now = db.serverDate();

      if (itemId) {
        const docRef = db.collection(collection).doc(itemId);
        const exists = await docRef.get().then(() => true).catch(() => false);

        if (exists) {
          const nextPayload = { ...payload };
          delete nextPayload._id;
          await docRef.update({
            data: {
              ...nextPayload,
              updatedAt: now
            }
          });
        } else {
          await docRef.set({
            data: {
              ...payload,
              createdAt: now,
              updatedAt: now
            }
          });
        }

        const duration = Date.now() - startTime;
        console.log(`[adminContent] saveItem 完成: collection=${collection}, id=${itemId}, 耗时=${duration}ms`);
        return { ok: true, id: itemId };
      }

      const addPayload = {
        ...payload,
        createdAt: now,
        updatedAt: now
      };

      const addResult = await db.collection(collection).add({ data: addPayload });
      const duration = Date.now() - startTime;
      console.log(`[adminContent] saveItem 完成: collection=${collection}, 新增id=${addResult._id}, 耗时=${duration}ms`);
      return { ok: true, id: addResult._id };
    }

    if (action === 'deleteItem') {
      const collection = event.collection;
      const id = event.id;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');
      if (!id) throw new Error('缺少 id');

      await db.collection(collection).doc(id).update({
        data: {
          status: 'deleted',
          updatedAt: db.serverDate()
        }
      });

      const duration = Date.now() - startTime;
      console.log(`[adminContent] deleteItem 完成: collection=${collection}, id=${id}, 耗时=${duration}ms`);
      return { ok: true };
    }

    throw new Error('不支持的操作');
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[adminContent] 请求失败: action=${action}, 耗时=${duration}ms`, error);

    return {
      ok: false,
      message: error.message || '操作失败',
      error: error.message || '操作失败',
      code: error.code || '',
      data: error.data || null
    };
  }
};
