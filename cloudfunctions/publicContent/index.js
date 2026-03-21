const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 内存缓存配置
const memoryCache = {
  data: {},
  timestamps: {}
};

const CACHE_TTL = 60000; // 1分钟缓存

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

function isPublished(item) {
  return !!item && (!item.status || item.status === 'published');
}

function getUpdatedAt(entry) {
  return entry?.updatedAt || entry?._updatedAt || entry?.createdAt || entry?._createdAt || '';
}

function buildPublicMeta(pageKey, payload) {
  const entries = [
    payload.site,
    payload.page,
    ...(payload.directions || []),
    ...(payload.medicalQuestions || []),
    ...(payload.pastPapers || []),
    ...(payload.questionImports || []),
    ...(payload.teachers || []),
    ...(payload.successCases || []),
    ...(payload.materialPackages || []),
    ...(payload.materialItems || [])
  ].filter(Boolean);

  const timestamps = entries
    .map((entry) => getUpdatedAt(entry))
    .filter(Boolean)
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value));

  const latestTimestamp = timestamps.length ? Math.max(...timestamps) : Date.now();

  return {
    pageKey,
    mode: 'cloud-function',
    updatedAt: new Date(latestTimestamp).toISOString(),
    revision: `${pageKey}:${latestTimestamp}`,
    generatedAt: new Date().toISOString()
  };
}

async function getSingleton(collection, id) {
  try {
    const result = await db.collection(collection).doc(id).get();
    return result.data || null;
  } catch (error) {
    return null;
  }
}

async function listCollection(collection) {
  try {
    console.time(`query-${collection}`);

    // 优化：在数据库层面过滤 status，减少数据传输
    // 注意：需要为 sort + status 创建复合索引以提升性能
    const result = await db.collection(collection)
      .where({
        status: db.command.in(['published', db.command.exists(false)])
      })
      .orderBy('sort', 'asc')
      .limit(50) // 降低限制，减少数据传输
      .get();

    console.timeEnd(`query-${collection}`);
    console.log(`[${collection}] 查询返回 ${result.data?.length || 0} 条记录`);

    return result.data || [];
  } catch (error) {
    console.error(`[${collection}] 查询失败:`, error);
    return [];
  }
}

exports.main = async (event) => {
  const startTime = Date.now();
  const pageKey = event.pageKey || 'home';
  const action = event.action;

  // 处理清除缓存请求
  if (action === 'clearCache') {
    const cacheKey = `public:${pageKey}`;
    delete memoryCache.data[cacheKey];
    delete memoryCache.timestamps[cacheKey];
    console.log(`[publicContent] 缓存已清除: ${pageKey}`);
    return { ok: true, message: '缓存已清除' };
  }

  try {
    console.log(`[publicContent] 开始处理请求: pageKey=${pageKey}`);

    // 检查内存缓存
    const cacheKey = `public:${pageKey}`;
    const now = Date.now();

    if (memoryCache.data[cacheKey] &&
        memoryCache.timestamps[cacheKey] &&
        now - memoryCache.timestamps[cacheKey] < CACHE_TTL) {
      const age = now - memoryCache.timestamps[cacheKey];
      console.log(`[publicContent] 缓存命中: pageKey=${pageKey}, 年龄=${age}ms`);

      return {
        ok: true,
        data: memoryCache.data[cacheKey],
        cached: true,
        cacheAge: age
      };
    }

    // 缓存未命中，查询数据库
    console.log(`[publicContent] 缓存未命中，查询数据库: pageKey=${pageKey}`);

    const payload = {
      site: await getSingleton('site_settings', 'default'),
      page: await getSingleton(PAGE_COLLECTIONS[pageKey], 'singleton')
    };

    // 并行查询相关集合，提升性能
    const queries = [];

    if (pageKey === 'home' || pageKey === 'courses') {
      queries.push(
        listCollection('directions').then(data => ({ key: 'directions', data }))
      );
    }

    if (pageKey === 'teachers') {
      queries.push(
        listCollection('teachers').then(data => ({ key: 'teachers', data }))
      );
    }

    if (pageKey === 'success') {
      queries.push(
        listCollection('success_cases').then(data => ({ key: 'successCases', data }))
      );
    }

    if (pageKey === 'materials') {
      queries.push(
        listCollection('material_packages').then(data => ({ key: 'materialPackages', data })),
        listCollection('material_items').then(data => ({ key: 'materialItems', data }))
      );
    }

    if (pageKey === 'questionBank') {
      queries.push(
        listCollection('medical_questions').then(data => ({ key: 'medicalQuestions', data })),
        listCollection('past_papers').then(data => ({ key: 'pastPapers', data })),
        listCollection('question_imports').then(data => ({ key: 'questionImports', data }))
      );
    }

    // 等待所有查询完成
    const results = await Promise.all(queries);
    results.forEach(({ key, data }) => {
      payload[key] = data;
    });

    payload.__meta = buildPublicMeta(pageKey, payload);

    // 保存到内存缓存
    memoryCache.data[cacheKey] = payload;
    memoryCache.timestamps[cacheKey] = now;

    const duration = Date.now() - startTime;
    console.log(`[publicContent] 请求完成: pageKey=${pageKey}, 耗时=${duration}ms, 已缓存`);

    return {
      ok: true,
      data: payload
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[publicContent] 请求失败: pageKey=${pageKey}, 耗时=${duration}ms`, error);

    return {
      ok: false,
      error: error.message || '查询内容失败',
      data: null
    };
  }
};
