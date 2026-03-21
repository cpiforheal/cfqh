const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const ROLE_PERMISSIONS = {
  viewer: ['cms.read'],
  editor: ['cms.read', 'cms.write'],
  publisher: ['cms.read', 'cms.write', 'cms.publish'],
  admin: ['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset'],
  owner: ['cms.read', 'cms.write', 'cms.publish', 'cms.manageUsers', 'cms.reset']
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

function buildPermissionSummary(role) {
  const permissions = new Set(ROLE_PERMISSIONS[normalizeRole(role)] || ROLE_PERMISSIONS.editor);
  return {
    canRead: permissions.has('cms.read'),
    canWrite: permissions.has('cms.write'),
    canPublish: permissions.has('cms.publish'),
    canManageUsers: permissions.has('cms.manageUsers'),
    canReset: permissions.has('cms.reset')
  };
}

function sanitizeAdmin(admin) {
  if (!admin) return null;
  return {
    _id: admin._id,
    name: admin.name || '',
    role: normalizeRole(admin.role),
    status: normalizeStatus(admin.status),
    updatedAt: admin.updatedAt || '',
    createdAt: admin.createdAt || ''
  };
}

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
  const isAdmin = !!admin && normalizeStatus(admin.status) !== 'disabled';
  const role = normalizeRole(admin?.role);

  return {
    ok: true,
    isAdmin,
    bootstrapRequired: false,
    openid: OPENID,
    admin: isAdmin ? sanitizeAdmin(admin) : null,
    permissions: isAdmin ? buildPermissionSummary(role) : buildPermissionSummary('viewer')
  };
};
