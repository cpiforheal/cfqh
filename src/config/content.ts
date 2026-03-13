export const pageCollectionMap = {
  site: 'site_settings',
  home: 'page_home',
  courses: 'page_courses',
  teachers: 'page_teachers',
  success: 'page_success',
  about: 'page_about',
  materials: 'page_materials'
};

export const pageDocumentIdMap = {
  site: 'default',
  home: 'singleton',
  courses: 'singleton',
  teachers: 'singleton',
  success: 'singleton',
  about: 'singleton',
  materials: 'singleton'
};

export const listCollectionMap = {
  directions: 'directions',
  teachers: 'teachers',
  successCases: 'success_cases',
  materialSeries: 'material_series',
  materialItems: 'material_items',
  mediaAssets: 'media_assets',
  adminUsers: 'admin_users'
};

export const adminPageOptions = [
  { key: 'site', label: '站点设置' },
  { key: 'home', label: '首页' },
  { key: 'courses', label: '开设方向' },
  { key: 'teachers', label: '师资' },
  { key: 'success', label: '成果' },
  { key: 'about', label: '关于我们' },
  { key: 'materials', label: '教材资料' }
];

export const adminListOptions = [
  { key: 'directions', label: '方向列表', collection: 'directions' },
  { key: 'teachers', label: '师资列表', collection: 'teachers' },
  { key: 'successCases', label: '成果案例', collection: 'success_cases' },
  { key: 'materialSeries', label: '教材套系', collection: 'material_series' },
  { key: 'materialItems', label: '教材单品', collection: 'material_items' },
  { key: 'mediaAssets', label: '媒体资源', collection: 'media_assets' },
  { key: 'adminUsers', label: '管理员', collection: 'admin_users' }
];
