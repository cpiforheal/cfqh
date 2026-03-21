const cloud = require('wx-server-sdk');
const seedData = require('./seed-data.js');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const PAGE_COLLECTIONS = {
  home: 'page_home',
  courses: 'page_courses',
  teachers: 'page_teachers',
  success: 'page_success',
  about: 'page_about',
  materials: 'page_materials'
};

const LIST_COLLECTIONS = {
  directions: 'directions',
  teachers: 'teachers',
  successCases: 'success_cases',
  materialPackages: 'material_packages',
  materialItems: 'material_items',
  mediaAssets: 'media_assets'
};

async function upsertDoc(collection, id, payload) {
  const ref = db.collection(collection).doc(id);
  const now = db.serverDate();
  const exists = await ref.get().then(() => true).catch(() => false);

  if (exists) {
    await ref.update({
      data: {
        ...payload,
        updatedAt: now
      }
    });
  } else {
    await ref.set({
      data: {
        ...payload,
        createdAt: now,
        updatedAt: now
      }
    });
  }
}

async function clearCollection(collection) {
  const snapshot = await db.collection(collection).limit(100).get().catch(() => ({ data: [] }));
  for (const item of snapshot.data || []) {
    await db.collection(collection).doc(item._id).remove();
  }
}

async function ensureBootstrapPermission() {
  const { OPENID } = cloud.getWXContext();
  const admins = await db.collection('admin_users').limit(1).get().catch(() => ({ data: [] }));
  const bootstrapRequired = !admins.data || admins.data.length === 0;

  if (bootstrapRequired) {
    await upsertDoc('admin_users', OPENID, {
      _id: OPENID,
      name: '绯荤粺鍒濆鍖栫鐞嗗憳',
      role: 'owner',
      status: 'active'
    });
    return { openid: OPENID, bootstrap: true };
  }

  const current = await db.collection('admin_users').doc(OPENID).get().catch(() => ({ data: null }));
  if (!current.data || current.data.status === 'disabled') {
    throw new Error('鏃犲垵濮嬪寲鏉冮檺');
  }

  return { openid: OPENID, bootstrap: false };
}

exports.main = async (event) => {
  const replace = !!event.replace;
  const permission = await ensureBootstrapPermission();

  await upsertDoc('site_settings', 'default', seedData.site);

  for (const [pageKey, collection] of Object.entries(PAGE_COLLECTIONS)) {
    await upsertDoc(collection, 'singleton', seedData.pages[pageKey]);
  }

  for (const [dataKey, collection] of Object.entries(LIST_COLLECTIONS)) {
    if (replace) {
      await clearCollection(collection);
    }

    for (const item of seedData[dataKey] || []) {
      await upsertDoc(collection, item._id || String(item.sort || Date.now()), item);
    }
  }

  return {
    ok: true,
    replace,
    bootstrap: permission.bootstrap,
    openid: permission.openid
  };
};
