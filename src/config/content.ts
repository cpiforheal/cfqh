export const pageCollectionMap = {
  site: 'site_settings',
  home: 'page_home',
  questionBank: 'page_question_bank',
  courses: 'page_courses',
  teachers: 'page_teachers',
  success: 'page_success',
  about: 'page_about',
  materials: 'page_materials'
};

export const pageDocumentIdMap = {
  site: 'default',
  home: 'singleton',
  questionBank: 'singleton',
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
  materialPackages: 'material_packages',
  materialItems: 'material_items',
  mediaAssets: 'media_assets',
  adminUsers: 'admin_users'
};

export const adminPageOptions = [
  { key: 'site', label: '站点设置' },
  { key: 'home', label: '首页' },
  { key: 'questionBank', label: '题库页' },
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
  { key: 'materialPackages', label: '主推套系包', collection: 'material_packages' },
  { key: 'materialItems', label: '货架资料卡', collection: 'material_items' },
  { key: 'mediaAssets', label: '媒体资源', collection: 'media_assets' },
  { key: 'adminUsers', label: '管理员', collection: 'admin_users' },
  { key: 'questionBankImport', label: '题库数据导入', collection: 'question_bank_import' }
];
