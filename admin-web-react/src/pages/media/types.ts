export type MaterialDirectionKey = 'math' | 'medical';
export type MaterialStageKey = 'foundation' | 'reinforcement' | 'sprint';
export type MaterialSectionId = 'hero' | 'categories' | 'consultBar';
export type MaterialCategoryKey = string;

export type MaterialsPageContent = {
  header: {
    title: string;
    searchLabel: string;
  };
  heroSection: {
    title: string;
  };
  directionTabs: Array<{
    key: MaterialDirectionKey;
    label: string;
    icon: string;
  }>;
  categoryTabs: Array<{
    key: MaterialCategoryKey;
    label: string;
  }>;
  stageTabs: Array<{
    key: MaterialStageKey;
    label: string;
  }>;
  mainSection: {
    title: string;
    sideNote: string;
  };
  shelfSection: {
    title: string;
    hint: string;
  };
  consultBar: {
    title: string;
    desc: string;
    buttonText: string;
  };
  _createdAt?: string;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type MaterialPackageRecord = {
  _id?: string;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  badge: string;
  title: string;
  target: string;
  solves: string;
  features: string[];
  sort: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type MaterialItemRecord = {
  _id?: string;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string;
  accentStart: string;
  accentEnd: string;
  sort: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type MallAssetStatus = 'draft' | 'pending' | 'online' | 'offline' | 'archived';
export type MallProductStatus = 'draft' | 'pending' | 'online' | 'offline';
export type MallEntitlementStatus = 'active' | 'expired' | 'revoked';

export type MallAssetRecord = {
  _id?: string;
  name: string;
  title: string;
  subTitle: string;
  description: string;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  assetType: string;
  coverUrl: string;
  coverKey: string;
  pdfUrl: string;
  pdfKey: string;
  pdfPageCount: number;
  pdfFileSize: number;
  previewEnabled: boolean;
  previewPageCount: number;
  tags: string[];
  accentStart: string;
  accentEnd: string;
  sortOrder: number;
  status: MallAssetStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type MallProductRecord = {
  _id?: string;
  productName: string;
  productSubTitle: string;
  productDescription: string;
  productType: string;
  categoryKey: MaterialCategoryKey;
  direction: MaterialDirectionKey;
  stage: MaterialStageKey;
  badge: string;
  coverUrl: string;
  bannerUrl: string;
  coverMark: string;
  coverLabel: string;
  price: number;
  originPrice: number;
  isFree: boolean;
  salesLabel: string;
  buttonText: string;
  previewEnabled: boolean;
  highlights: string[];
  sortOrder: number;
  status: MallProductStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type MallProductItemRecord = {
  _id?: string;
  productId: string;
  itemType: string;
  itemId: string;
  displayType: string;
  displayName: string;
  displaySubTitle: string;
  displayDescription: string;
  displayDetails: string;
  direction: MaterialDirectionKey;
  previewEnabled: boolean;
  previewPageCount: number;
  accentStart: string;
  accentEnd: string;
  sortOrder: number;
  status: MallProductStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type MallEntitlementRecord = {
  _id?: string;
  userId: string;
  productId: string;
  entitlementType: string;
  sourceType: string;
  status: MallEntitlementStatus;
  claimedAt?: string;
  expiredAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type MediaSectionModel = {
  id: MaterialSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
};

export const materialDirectionLabels: Record<MaterialDirectionKey, string> = {
  math: '高数资料',
  medical: '医护资料'
};

export const materialStageLabels: Record<MaterialStageKey, string> = {
  foundation: '基础阶段',
  reinforcement: '强化阶段',
  sprint: '冲刺阶段'
};

export const materialCategoryOptions: Array<{ key: MaterialCategoryKey; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'system_course', label: '系统班' },
  { key: 'sprint_camp', label: '冲刺营' },
  { key: 'paper_book', label: '纸质教材' },
  { key: 'resource_pack', label: '资料包' }
];

export const materialCategoryLabelMap = materialCategoryOptions.reduce<Record<string, string>>((output, item) => {
  output[item.key] = item.label;
  return output;
}, {});

export const materialThemeMeta: Record<
  MaterialDirectionKey,
  {
    accent: string;
    accentSoft: string;
    accentLine: string;
    surface: string;
    deep: string;
  }
> = {
  math: {
    accent: '#5b80ff',
    accentSoft: '#eef3ff',
    accentLine: 'rgba(91, 128, 255, 0.18)',
    surface: 'linear-gradient(180deg, rgba(237, 243, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
    deep: '#2349b6'
  },
  medical: {
    accent: '#16a394',
    accentSoft: '#ecfcf8',
    accentLine: 'rgba(22, 163, 148, 0.18)',
    surface: 'linear-gradient(180deg, rgba(236, 252, 248, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
    deep: '#0f7f74'
  }
};

export const mediaSectionModels: MediaSectionModel[] = [
  {
    id: 'hero',
    step: '第 1 行',
    title: '页面主标题',
    desc: '对应商城页 LOGO 和学科切换下方那行大标题。',
    location: '精选好课这类主标题'
  },
  {
    id: 'categories',
    step: '第 2 行',
    title: '商品分类按钮',
    desc: '对应主标题下方那一排圆角分类按钮，从左到右就是前台顺序。',
    location: '全部 / 系统班 / 冲刺营 / 纸质教材 / 资料包'
  },
  {
    id: 'consultBar',
    step: '最后一块',
    title: '底部咨询浮条',
    desc: '对应商城页最底部深色咨询条，适合放引导咨询的话术。没有这块时可直接留空。',
    location: '标题 / 说明 / 按钮字'
  }
];

export const defaultMaterialsPage: MaterialsPageContent = {
  header: {
    title: '教材资料库',
    searchLabel: '搜索资料'
  },
  heroSection: {
    title: '精选好课'
  },
  directionTabs: [
    { key: 'math', label: '高等数学', icon: 'grid' },
    { key: 'medical', label: '医护综合', icon: 'medical' }
  ],
  categoryTabs: materialCategoryOptions,
  stageTabs: [
    { key: 'foundation', label: '基础阶段' },
    { key: 'reinforcement', label: '强化阶段' },
    { key: 'sprint', label: '冲刺阶段' }
  ],
  mainSection: {
    title: '核心主推套系',
    sideNote: '最适合当前阶段'
  },
  shelfSection: {
    title: '套系包含以下资料：',
    hint: '按顺序往下看'
  },
  consultBar: {
    title: '不知道怎么选？',
    desc: '专业老师为您 1 对 1 定制资料方案',
    buttonText: '免费咨询'
  }
};

export const defaultMaterialPackage: MaterialPackageRecord = {
  direction: 'math',
  stage: 'foundation',
  badge: '零基础首选',
  title: '高数全程通关尊享包',
  target: '基础薄弱、需要从零系统搭起知识框架的同学',
  solves: '解决知识点散、不会规划、做题没方向的问题',
  features: ['名师主编', '阶段训练', '考前模拟'],
  sort: 100,
  status: 'draft'
};

export const defaultMaterialItem: MaterialItemRecord = {
  direction: 'math',
  stage: 'foundation',
  type: '核心教材',
  title: '高数全程通关主教材',
  subtitle: '从零搭好知识框架',
  desc: '名师主编，概念讲透',
  details: '从极限、导数到积分逐章搭建知识主线，适合第一轮系统梳理。',
  accentStart: '#5b80ff',
  accentEnd: '#86a2ff',
  sort: 100,
  status: 'draft'
};

export const defaultMallAsset: MallAssetRecord = {
  name: '',
  title: '',
  subTitle: '',
  description: '',
  direction: 'math',
  stage: 'foundation',
  assetType: 'PDF资料',
  coverUrl: '',
  coverKey: '',
  pdfUrl: '',
  pdfKey: '',
  pdfPageCount: 0,
  pdfFileSize: 0,
  previewEnabled: true,
  previewPageCount: 5,
  tags: [],
  accentStart: '#5b80ff',
  accentEnd: '#86a2ff',
  sortOrder: 100,
  status: 'draft'
};

export const defaultMallProduct: MallProductRecord = {
  productName: '',
  productSubTitle: '',
  productDescription: '',
  productType: 'asset_bundle',
  categoryKey: 'all',
  direction: 'math',
  stage: 'foundation',
  badge: '',
  coverUrl: '',
  bannerUrl: '',
  coverMark: 'A',
  coverLabel: '资料包',
  price: 0,
  originPrice: 0,
  isFree: true,
  salesLabel: '',
  buttonText: '查看详情',
  previewEnabled: true,
  highlights: [],
  sortOrder: 100,
  status: 'draft'
};

export const defaultMallProductItem: MallProductItemRecord = {
  productId: '',
  itemType: 'asset',
  itemId: '',
  displayType: '资料',
  displayName: '',
  displaySubTitle: '',
  displayDescription: '',
  displayDetails: '',
  direction: 'math',
  previewEnabled: true,
  previewPageCount: 5,
  accentStart: '#5b80ff',
  accentEnd: '#86a2ff',
  sortOrder: 100,
  status: 'draft'
};

export function readMaterialDirection(value: string | null): MaterialDirectionKey {
  return value === 'medical' ? 'medical' : 'math';
}

export function readMaterialStage(value: string | null): MaterialStageKey {
  if (value === 'reinforcement' || value === 'sprint') {
    return value;
  }
  return 'foundation';
}

export function inferMaterialCategoryKey(value: unknown, fallback = 'all'): MaterialCategoryKey {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  if (materialCategoryOptions.some((item) => item.key === raw)) {
    return raw;
  }

  const normalized = raw.toLowerCase();
  if (normalized.includes('system') || normalized.includes('course') || normalized.includes('系统班')) return 'system_course';
  if (normalized.includes('sprint') || normalized.includes('camp') || normalized.includes('冲刺')) return 'sprint_camp';
  if (normalized.includes('book') || normalized.includes('paper') || normalized.includes('教材') || normalized.includes('书')) return 'paper_book';
  if (normalized.includes('asset') || normalized.includes('resource') || normalized.includes('资料')) return 'resource_pack';
  return fallback;
}

export function getMaterialCategoryLabel(categoryKey: MaterialCategoryKey) {
  return materialCategoryLabelMap[categoryKey] || categoryKey || '未分类';
}

export function normalizeMaterialsPage(value: unknown): MaterialsPageContent {
  const page = (value || {}) as Partial<MaterialsPageContent>;
  return {
    ...defaultMaterialsPage,
    ...page,
    header: { ...defaultMaterialsPage.header, ...(page.header || {}) },
    heroSection: { ...defaultMaterialsPage.heroSection, ...(page.heroSection || {}) },
    directionTabs:
      Array.isArray(page.directionTabs) && page.directionTabs.length
        ? page.directionTabs
            .map((item) => ({
              key: readMaterialDirection(String(item?.key || 'math')),
              label: String(item?.label || ''),
              icon: String(item?.icon || 'grid')
            }))
            .slice(0, 2)
        : defaultMaterialsPage.directionTabs,
    categoryTabs:
      Array.isArray(page.categoryTabs) && page.categoryTabs.length
        ? page.categoryTabs
            .map((item) => ({
              key: String(item?.key || ''),
              label: String(item?.label || '')
            }))
            .filter((item) => item.key && item.label)
        : defaultMaterialsPage.categoryTabs,
    stageTabs:
      Array.isArray(page.stageTabs) && page.stageTabs.length
        ? page.stageTabs
            .map((item) => ({
              key: readMaterialStage(String(item?.key || 'foundation')),
              label: String(item?.label || '')
            }))
            .slice(0, 3)
        : defaultMaterialsPage.stageTabs,
    mainSection: { ...defaultMaterialsPage.mainSection, ...(page.mainSection || {}) },
    shelfSection: { ...defaultMaterialsPage.shelfSection, ...(page.shelfSection || {}) },
    consultBar: { ...defaultMaterialsPage.consultBar, ...(page.consultBar || {}) }
  };
}

export function normalizeMaterialPackage(value: Record<string, unknown> | null | undefined): MaterialPackageRecord {
  return {
    ...defaultMaterialPackage,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    badge: String(value?.badge || defaultMaterialPackage.badge),
    title: String(value?.title || defaultMaterialPackage.title),
    target: String(value?.target || defaultMaterialPackage.target),
    solves: String(value?.solves || defaultMaterialPackage.solves),
    features: Array.isArray(value?.features) ? value.features.map((item) => String(item)).filter(Boolean) : defaultMaterialPackage.features,
    sort: Number(value?.sort || defaultMaterialPackage.sort),
    status: value?.status === 'published' ? 'published' : 'draft',
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined,
    _createdAt: value?._createdAt ? String(value._createdAt) : undefined,
    _updatedAt: value?._updatedAt ? String(value._updatedAt) : undefined
  };
}

export function normalizeMaterialItem(value: Record<string, unknown> | null | undefined): MaterialItemRecord {
  return {
    ...defaultMaterialItem,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    type: String(value?.type || defaultMaterialItem.type),
    title: String(value?.title || defaultMaterialItem.title),
    subtitle: String(value?.subtitle || defaultMaterialItem.subtitle),
    desc: String(value?.desc || defaultMaterialItem.desc),
    details: String(value?.details || defaultMaterialItem.details),
    accentStart: String(value?.accentStart || defaultMaterialItem.accentStart),
    accentEnd: String(value?.accentEnd || defaultMaterialItem.accentEnd),
    sort: Number(value?.sort || defaultMaterialItem.sort),
    status: value?.status === 'published' ? 'published' : 'draft',
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined,
    _createdAt: value?._createdAt ? String(value._createdAt) : undefined,
    _updatedAt: value?._updatedAt ? String(value._updatedAt) : undefined
  };
}

export function sortBySort<T extends { sort?: number }>(items: T[]) {
  return [...items].sort((left, right) => Number(left.sort || 0) - Number(right.sort || 0));
}

export function sortBySortOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((left, right) => Number(left.sortOrder || 0) - Number(right.sortOrder || 0));
}

function readMallStatus(value: unknown, fallback: MallProductStatus | MallAssetStatus = 'draft') {
  const raw = String(value || '').trim().toLowerCase();
  if (raw === 'pending') return 'pending';
  if (raw === 'online') return 'online';
  if (raw === 'offline') return 'offline';
  if (raw === 'archived') return 'archived';
  return fallback;
}

export function normalizeMallAsset(value: Record<string, unknown> | null | undefined): MallAssetRecord {
  return {
    ...defaultMallAsset,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    name: String(value?.name || defaultMallAsset.name),
    title: String(value?.title || defaultMallAsset.title),
    subTitle: String(value?.subTitle || value?.subtitle || defaultMallAsset.subTitle),
    description: String(value?.description || value?.desc || defaultMallAsset.description),
    assetType: String(value?.assetType || value?.type || defaultMallAsset.assetType),
    coverUrl: String(value?.coverUrl || defaultMallAsset.coverUrl),
    coverKey: String(value?.coverKey || defaultMallAsset.coverKey),
    pdfUrl: String(value?.pdfUrl || defaultMallAsset.pdfUrl),
    pdfKey: String(value?.pdfKey || defaultMallAsset.pdfKey),
    pdfPageCount: Number(value?.pdfPageCount || defaultMallAsset.pdfPageCount),
    pdfFileSize: Number(value?.pdfFileSize || defaultMallAsset.pdfFileSize),
    previewEnabled: value?.previewEnabled === false ? false : defaultMallAsset.previewEnabled,
    previewPageCount: Number(value?.previewPageCount || defaultMallAsset.previewPageCount),
    tags: Array.isArray(value?.tags) ? value.tags.map((item) => String(item)).filter(Boolean) : defaultMallAsset.tags,
    accentStart: String(value?.accentStart || defaultMallAsset.accentStart),
    accentEnd: String(value?.accentEnd || defaultMallAsset.accentEnd),
    sortOrder: Number(value?.sortOrder || value?.sort || defaultMallAsset.sortOrder),
    status: readMallStatus(value?.status, 'draft') as MallAssetStatus,
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined
  };
}

export function normalizeMallProduct(value: Record<string, unknown> | null | undefined): MallProductRecord {
  return {
    ...defaultMallProduct,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    direction: readMaterialDirection(String(value?.direction || 'math')),
    stage: readMaterialStage(String(value?.stage || 'foundation')),
    productName: String(value?.productName || value?.title || defaultMallProduct.productName),
    productSubTitle: String(value?.productSubTitle || value?.target || defaultMallProduct.productSubTitle),
    productDescription: String(value?.productDescription || value?.solves || defaultMallProduct.productDescription),
    productType: String(value?.productType || defaultMallProduct.productType),
    categoryKey: inferMaterialCategoryKey(value?.categoryKey || value?.productType || value?.title, defaultMallProduct.categoryKey),
    badge: String(value?.badge || defaultMallProduct.badge),
    coverUrl: String(value?.coverUrl || defaultMallProduct.coverUrl),
    bannerUrl: String(value?.bannerUrl || defaultMallProduct.bannerUrl),
    coverMark: String(value?.coverMark || defaultMallProduct.coverMark),
    coverLabel: String(value?.coverLabel || defaultMallProduct.coverLabel),
    price: Number(value?.price || defaultMallProduct.price),
    originPrice: Number(value?.originPrice || defaultMallProduct.originPrice),
    isFree: value?.isFree === true || Number(value?.price || 0) <= 0,
    salesLabel: String(value?.salesLabel || defaultMallProduct.salesLabel),
    buttonText: String(value?.buttonText || defaultMallProduct.buttonText),
    previewEnabled: value?.previewEnabled === false ? false : defaultMallProduct.previewEnabled,
    highlights: Array.isArray(value?.highlights) ? value.highlights.map((item) => String(item)).filter(Boolean) : defaultMallProduct.highlights,
    sortOrder: Number(value?.sortOrder || value?.sort || defaultMallProduct.sortOrder),
    status: readMallStatus(value?.status, 'draft') as MallProductStatus,
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined
  };
}

export function normalizeMallProductItem(value: Record<string, unknown> | null | undefined): MallProductItemRecord {
  return {
    ...defaultMallProductItem,
    ...(value || {}),
    _id: value?._id ? String(value._id) : undefined,
    productId: String(value?.productId || defaultMallProductItem.productId),
    itemType: String(value?.itemType || defaultMallProductItem.itemType),
    itemId: String(value?.itemId || defaultMallProductItem.itemId),
    displayType: String(value?.displayType || value?.type || defaultMallProductItem.displayType),
    displayName: String(value?.displayName || value?.title || defaultMallProductItem.displayName),
    displaySubTitle: String(value?.displaySubTitle || value?.subtitle || defaultMallProductItem.displaySubTitle),
    displayDescription: String(value?.displayDescription || value?.desc || defaultMallProductItem.displayDescription),
    displayDetails: String(value?.displayDetails || value?.details || defaultMallProductItem.displayDetails),
    direction: readMaterialDirection(String(value?.direction || 'math')),
    previewEnabled: value?.previewEnabled === false ? false : defaultMallProductItem.previewEnabled,
    previewPageCount: Number(value?.previewPageCount || defaultMallProductItem.previewPageCount),
    accentStart: String(value?.accentStart || defaultMallProductItem.accentStart),
    accentEnd: String(value?.accentEnd || defaultMallProductItem.accentEnd),
    sortOrder: Number(value?.sortOrder || value?.sort || defaultMallProductItem.sortOrder),
    status: readMallStatus(value?.status, 'draft') as MallProductStatus,
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined
  };
}

export function normalizeMallEntitlement(value: Record<string, unknown> | null | undefined): MallEntitlementRecord {
  const status = String(value?.status || '').trim().toLowerCase();
  return {
    _id: value?._id ? String(value._id) : undefined,
    userId: String(value?.userId || ''),
    productId: String(value?.productId || ''),
    entitlementType: String(value?.entitlementType || 'bundle'),
    sourceType: String(value?.sourceType || 'admin_grant'),
    status: status === 'expired' || status === 'revoked' ? (status as MallEntitlementStatus) : 'active',
    claimedAt: value?.claimedAt ? String(value.claimedAt) : undefined,
    expiredAt: value?.expiredAt ? String(value.expiredAt) : undefined,
    createdAt: value?.createdAt ? String(value.createdAt) : undefined,
    updatedAt: value?.updatedAt ? String(value.updatedAt) : undefined
  };
}
