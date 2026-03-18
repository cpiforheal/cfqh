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

const PAGE_DOC_IDS = {
  site: 'default',
  home: 'singleton',
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
  'material_series',
  'material_items',
  'media_assets',
  'admin_users'
]);

async function ensureAdmin() {
  const { OPENID } = cloud.getWXContext();

  try {
    const result = await db.collection('admin_users').doc(OPENID).get();

    if (!result.data || result.data.status === 'disabled') {
      throw new Error('无后台权限');
    }

    console.log(`[adminContent] 管理员验证通过: ${OPENID}, 角色=${result.data.role}`);
    return result.data;
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
  return data;
}

exports.main = async (event) => {
  const startTime = Date.now();
  const action = event.action;

  try {
    await ensureAdmin();

    console.log(`[adminContent] 开始处理: action=${action}`);

    if (action === 'getPage') {
      const pageKey = event.pageKey;
      const collection = PAGE_COLLECTIONS[pageKey];
      if (!collection) throw new Error('未知页面');

      const data = await getDocument(collection, PAGE_DOC_IDS[pageKey]);
      const duration = Date.now() - startTime;
      console.log(`[adminContent] getPage 完成: pageKey=${pageKey}, 耗时=${duration}ms`);
      return { ok: true, data };
    }

    if (action === 'savePage') {
      const pageKey = event.pageKey;
      const collection = PAGE_COLLECTIONS[pageKey];
      if (!collection) throw new Error('未知页面');

      const payload = stripManagedFields(event.content);
      const now = db.serverDate();
      const docRef = db.collection(collection).doc(PAGE_DOC_IDS[pageKey]);
      const exists = await docRef.get().then(() => true).catch(() => false);

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

      const duration = Date.now() - startTime;
      console.log(`[adminContent] savePage 完成: pageKey=${pageKey}, 耗时=${duration}ms`);
      return { ok: true };
    }

    if (action === 'listCollection') {
      const collection = event.collection;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');

      const result = await db.collection(collection).orderBy('sort', 'asc').limit(100).get();
      const duration = Date.now() - startTime;
      console.log(`[adminContent] listCollection 完成: collection=${collection}, 数量=${result.data?.length || 0}, 耗时=${duration}ms`);
      return { ok: true, data: result.data || [] };
    }

    if (action === 'getItem') {
      const collection = event.collection;
      const id = event.id;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');
      if (!id) throw new Error('缺少 id');

      const data = await getDocument(collection, id);
      const duration = Date.now() - startTime;
      console.log(`[adminContent] getItem 完成: collection=${collection}, id=${id}, 耗时=${duration}ms`);
      return { ok: true, data };
    }

    if (action === 'saveItem') {
      const collection = event.collection;
      const item = event.item;
      if (!ALLOWED_COLLECTIONS.has(collection)) throw new Error('不支持的集合');
      if (!item || typeof item !== 'object') throw new Error('缺少数据');

      const payload = stripManagedFields(item);
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
      error: error.message || '操作失败'
    };
  }
};
