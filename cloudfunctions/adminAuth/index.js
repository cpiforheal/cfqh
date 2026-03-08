const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const { OPENID } = cloud.getWXContext();

  const admins = await db.collection('admin_users').limit(1).get().catch(() => ({ data: [] }));
  const bootstrapRequired = !admins.data || admins.data.length === 0;

  if (bootstrapRequired) {
    return {
      ok: true,
      isAdmin: false,
      bootstrapRequired: true,
      openid: OPENID
    };
  }

  const result = await db.collection('admin_users').doc(OPENID).get().catch(() => ({ data: null }));
  const admin = result.data;
  const isAdmin = !!admin && admin.status !== 'disabled';

  return {
    ok: true,
    isAdmin,
    bootstrapRequired: false,
    openid: OPENID,
    admin: isAdmin ? admin : null
  };
};
