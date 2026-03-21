const cloudbase = require('@cloudbase/node-sdk');
const seed = require('../../database/seed-data.js');

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
  materialPackages: 'material_packages',
  materialItems: 'material_items',
  mediaAssets: 'media_assets'
};

function stripId(payload) {
  const next = { ...payload };
  delete next._id;
  return next;
}

async function main() {
  const app = cloudbase.init({
    env: process.env.CLOUDBASE_ENV_ID,
    accessKey: process.env.CLOUDBASE_APIKEY || undefined
  });
  const db = app.database();

  const collections = [...new Set([...Object.values(PAGE_COLLECTIONS), ...Object.values(LIST_COLLECTIONS)])];
  for (const name of collections) {
    try { await db.createCollection(name); } catch (e) {}
  }

  await db.collection(PAGE_COLLECTIONS.site).doc(PAGE_DOC_IDS.site).set(stripId(seed.site));

  for (const [key, collection] of Object.entries(PAGE_COLLECTIONS)) {
    if (key === 'site') continue;
    await db.collection(collection).doc(PAGE_DOC_IDS[key]).set(stripId(seed.pages[key]));
  }

  for (const [seedKey, collection] of Object.entries(LIST_COLLECTIONS)) {
    const current = await db.collection(collection).limit(100).get();
    for (const item of current.data || []) {
      await db.collection(collection).doc(item._id).remove();
    }
    for (const item of seed[seedKey] || []) {
      await db.collection(collection).doc(item._id).set(stripId(item));
    }
  }

  const home = await db.collection('page_home').doc('singleton').get();
  const directions = await db.collection('directions').limit(10).get();
  console.log(JSON.stringify({
    heroChip: home.data?.[0]?.hero?.chip || home.data?.hero?.chip,
    firstDirection: directions.data?.[0]?.name,
    directionCount: (directions.data || []).length
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
