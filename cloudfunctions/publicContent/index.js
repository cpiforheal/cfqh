const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const PAGE_COLLECTIONS = {
  site: 'site_settings',
  home: 'page_home',
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
    ...(payload.teachers || []),
    ...(payload.successCases || []),
    ...(payload.materialSeries || []),
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
    const result = await db.collection(collection).orderBy('sort', 'asc').limit(100).get();
    return (result.data || []).filter(isPublished);
  } catch (error) {
    return [];
  }
}

exports.main = async (event) => {
  const pageKey = event.pageKey || 'home';
  const payload = {
    site: await getSingleton('site_settings', 'default'),
    page: await getSingleton(PAGE_COLLECTIONS[pageKey], 'singleton')
  };

  if (pageKey === 'home' || pageKey === 'courses') {
    payload.directions = await listCollection('directions');
  }

  if (pageKey === 'teachers') {
    payload.teachers = await listCollection('teachers');
  }

  if (pageKey === 'success') {
    payload.successCases = await listCollection('success_cases');
  }

  if (pageKey === 'materials') {
    payload.materialSeries = await listCollection('material_series');
    payload.materialItems = await listCollection('material_items');
  }

  payload.__meta = buildPublicMeta(pageKey, payload);

  return {
    ok: true,
    data: payload
  };
};
