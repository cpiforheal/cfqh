export type SitePageContent = {
  _id?: string;
  _meta?: Record<string, unknown>;
  _updatedAt?: string;
  siteName: string;
  brandName: string;
  contactPhone: string;
  contactWechat: string;
  contactQrcode: string;
  contactQrcodeUrl: string;
  address: string;
  serviceHours: string;
  intro: string;
};

export type ContactSectionId = 'brand' | 'contact' | 'address';

export const defaultSitePage: SitePageContent = {
  _id: 'default',
  siteName: '启航专转本',
  brandName: '淮安启航专转本',
  contactPhone: '400-000-0000',
  contactWechat: 'qihang-zhuanzhuanben',
  contactQrcode: '',
  contactQrcodeUrl: '',
  address: '江苏省淮安市',
  serviceHours: '09:00-21:00',
  intro: '专注江苏专转本备考服务。'
};

export const contactSectionModels: Array<{
  id: ContactSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
}> = [
  {
    id: 'brand',
    step: '01',
    title: '品牌基础信息',
    desc: '多个页面都会复用的品牌名和基础简介。',
    location: '公共信息区'
  },
  {
    id: 'contact',
    step: '02',
    title: '核心联系方式',
    desc: '老师最常改的电话、微信和服务时间。',
    location: '关于页底部 / 咨询区'
  },
  {
    id: 'address',
    step: '03',
    title: '地址与二维码',
    desc: '补充线下地址和二维码，方便家长进一步联系。',
    location: '关于页底部 / 公共联系区'
  }
];

function readObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

export function normalizeSitePage(raw: unknown): SitePageContent {
  const source = readObject(raw);
  return {
    ...defaultSitePage,
    _id: readString(source._id, defaultSitePage._id),
    _meta: readObject(source._meta),
    _updatedAt: readString(source._updatedAt),
    siteName: readString(source.siteName, defaultSitePage.siteName),
    brandName: readString(source.brandName, defaultSitePage.brandName),
    contactPhone: readString(source.contactPhone, defaultSitePage.contactPhone),
    contactWechat: readString(source.contactWechat, defaultSitePage.contactWechat),
    contactQrcode: readString(source.contactQrcode, defaultSitePage.contactQrcode),
    contactQrcodeUrl: readString(source.contactQrcodeUrl, defaultSitePage.contactQrcodeUrl),
    address: readString(source.address, defaultSitePage.address),
    serviceHours: readString(source.serviceHours, defaultSitePage.serviceHours),
    intro: readString(source.intro, defaultSitePage.intro)
  };
}
