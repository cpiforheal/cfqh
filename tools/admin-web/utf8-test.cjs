const cloudbase = require('@cloudbase/node-sdk');
(async () => {
  const app = cloudbase.init({ env: process.env.CLOUDBASE_ENV_ID });
  const db = app.database();
  try { await db.createCollection('codex_utf8_test'); } catch (e) {}
  await db.collection('codex_utf8_test').doc('sample').set({ text: '中文测试ABC', note: '机构介绍' });
  const result = await db.collection('codex_utf8_test').doc('sample').get();
  console.log(JSON.stringify(result.data));
})();
