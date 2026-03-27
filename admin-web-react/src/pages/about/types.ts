export type AboutValueItem = {
  title: string;
  desc: string;
};

export type AboutEnvironmentItem = {
  label: string;
  imageUrl: string;
  imageSeed: string;
};

export type AboutPageContent = {
  _meta?: Record<string, unknown>;
  _updatedAt?: string;
  hero: {
    chip: string;
    title: string;
    desc: string;
    imageUrl: string;
    imageSeed: string;
  };
  introCard: {
    title: string;
    desc: string;
  };
  values: AboutValueItem[];
  environmentImages: AboutEnvironmentItem[];
  cta: {
    title: string;
    desc: string;
    buttonText: string;
    footnote: string;
  };
};

export type AboutSectionId = 'hero' | 'introCard' | 'values' | 'environmentImages' | 'cta';

export const defaultAboutPage: AboutPageContent = {
  hero: {
    chip: '机构概览',
    title: '关于我们',
    desc: '专注专转本备考服务，以高标准教研、精细化管理和沉浸式学习环境作为机构的长期基础。',
    imageUrl: '',
    imageSeed: 'campus'
  },
  introCard: {
    title: '淮安启航专转本',
    desc: '围绕方向规划、课程辅导、班级管理和日常答疑，帮助学员建立更稳定的备考节奏与执行路径。'
  },
  values: [
    {
      title: '品牌理念',
      desc: '坚持“严管厚爱，教书育人”，把教研质量、学习管理和答疑服务作为同等重要的基础能力。'
    },
    {
      title: '服务体系',
      desc: '围绕方向规划、课程辅导、阶段测评、专项提升和全程督学，形成完整的备考支持链路。'
    }
  ],
  environmentImages: [
    { label: '多媒体教室', imageUrl: '', imageSeed: 'campus1' },
    { label: '标准化宿舍', imageUrl: '', imageSeed: 'campus2' }
  ],
  cta: {
    title: '先了解机构，再定备考路线',
    desc: '如果你想先确认环境、管理方式、课程节奏和方向匹配，可以先预约一次机构沟通。',
    buttonText: '预约机构咨询',
    footnote: '环境了解 · 课程说明 · 方向建议'
  }
};

export const aboutSectionModels: Array<{
  id: AboutSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
}> = [
  {
    id: 'hero',
    step: '01',
    title: '顶部首屏',
    desc: '关于页最上方的标题、说明和首屏氛围词。',
    location: '页面最上方'
  },
  {
    id: 'introCard',
    step: '02',
    title: '机构介绍卡',
    desc: '老师最常改的机构简介卡，先说明机构是谁、在做什么。',
    location: '首屏下方第一张卡'
  },
  {
    id: 'values',
    step: '03',
    title: '理念与服务',
    desc: '展示机构理念和服务体系，建议控制在 2 到 3 条重点信息。',
    location: '机构介绍下方'
  },
  {
    id: 'environmentImages',
    step: '04',
    title: '环境图片区',
    desc: '让家长和学生看到真实环境，先写图片名称，再补图片链接。',
    location: '理念区下方'
  },
  {
    id: 'cta',
    step: '05',
    title: '底部咨询区',
    desc: '承接想进一步咨询的家长和学生。',
    location: '页面底部'
  }
];

function readObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function readString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function readValueItems(value: unknown, fallback: AboutValueItem[]) {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => readObject(item))
    .map((item) => ({
      title: readString(item.title),
      desc: readString(item.desc)
    }))
    .filter((item) => item.title || item.desc);
}

function readEnvironmentItems(value: unknown, fallback: AboutEnvironmentItem[]) {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => readObject(item))
    .map((item) => ({
      label: readString(item.label),
      imageUrl: readString(item.imageUrl),
      imageSeed: readString(item.imageSeed)
    }))
    .filter((item) => item.label || item.imageUrl || item.imageSeed);
}

export function normalizeAboutPage(raw: unknown): AboutPageContent {
  const source = readObject(raw);
  const hero = readObject(source.hero);
  const introCard = readObject(source.introCard);
  const cta = readObject(source.cta);

  return {
    ...defaultAboutPage,
    _meta: readObject(source._meta),
    _updatedAt: readString(source._updatedAt),
    hero: {
      chip: readString(hero.chip, defaultAboutPage.hero.chip),
      title: readString(hero.title, defaultAboutPage.hero.title),
      desc: readString(hero.desc, defaultAboutPage.hero.desc),
      imageUrl: readString(hero.imageUrl, defaultAboutPage.hero.imageUrl),
      imageSeed: readString(hero.imageSeed, defaultAboutPage.hero.imageSeed)
    },
    introCard: {
      title: readString(introCard.title, defaultAboutPage.introCard.title),
      desc: readString(introCard.desc, defaultAboutPage.introCard.desc)
    },
    values: readValueItems(source.values, defaultAboutPage.values),
    environmentImages: readEnvironmentItems(source.environmentImages, defaultAboutPage.environmentImages),
    cta: {
      title: readString(cta.title, defaultAboutPage.cta.title),
      desc: readString(cta.desc, defaultAboutPage.cta.desc),
      buttonText: readString(cta.buttonText, defaultAboutPage.cta.buttonText),
      footnote: readString(cta.footnote, defaultAboutPage.cta.footnote)
    }
  };
}
