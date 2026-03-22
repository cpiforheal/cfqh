// 基础类型
export type Status = 'draft' | 'published' | 'deleted';
export type OpenType = 'navigate' | 'switchTab' | 'redirectTo' | 'reLaunch';

// 站点设置
export interface SiteSettings {
  _id: string;
  siteName: string;
  brandName: string;
  contactPhone: string;
  contactWechat: string;
  contactQrcode: string;
  contactQrcodeUrl: string;
  address: string;
  serviceHours: string;
  intro: string;
}

// 按钮配置
export interface ButtonConfig {
  text: string;
  url: string;
  openType: OpenType;
}

// 统计数据
export interface StatItem {
  value: string;
  label: string;
  note: string;
}

// 快捷链接
export interface QuickLink {
  label: string;
  desc: string;
  url: string;
  openType: OpenType;
  icon: string;
}

// 优势卡片
export interface AdvantageCard {
  icon: string;
  title: string;
  desc: string;
}

// 图片配置
export interface ImageConfig {
  label: string;
  imageUrl: string;
  imageSeed: string;
}

// Hero 区域
export interface HeroSection {
  chip: string;
  title: string;
  highlightTitle?: string;
  desc: string;
  tags?: string[];
  primaryButton?: ButtonConfig;
  secondaryNote?: string;
  backgroundImageUrl?: string;
  backgroundImageSeed?: string;
  imageUrl?: string;
  imageSeed?: string;
}

// CTA 区域
export interface CtaSection {
  title: string;
  desc: string;
  buttonText: string;
  footnote: string;
}

// 介绍卡片
export interface IntroCard {
  title: string;
  desc: string;
}

// 特性列表
export interface FeatureItem {
  title: string;
  desc: string;
}

// 价值观
export interface ValueItem {
  title: string;
  desc: string;
}

// 环境区域
export interface EnvironmentSection {
  title: string;
  subtitle: string;
  cards: ImageConfig[];
}

// 更多区域
export interface MoreSection {
  title: string;
  tag: string;
  desc: string;
}

// 题库子页卡片
export interface QuestionBankCard {
  title: string;
  desc: string;
  buttonText: string;
  note: string;
}

// 题库页配置
export interface QuestionBankPage {
  hero: HeroSection;
  dailyQuestionCard: QuestionBankCard;
  pastPapersCard: QuestionBankCard;
  wrongBookCard: QuestionBankCard;
  importGuide: {
    title: string;
    desc: string;
    templateText: string;
  };
}

// 首页配置
export interface HomePage {
  hero: HeroSection;
  overviewStats: StatItem[];
  quickLinks: QuickLink[];
  advantages: AdvantageCard[];
  directionsIntro: string;
  featuredDirectionIds: string[];
  moreDirectionCard: MoreSection;
  environmentSection: EnvironmentSection;
  cta: CtaSection;
}

// 方向页配置
export interface CoursesPage {
  title: string;
  subtitle: string;
  categories: string[];
  suggestions: string[];
  featuredDirectionIds: string[];
  moreSection: MoreSection;
}

// 师资页配置
export interface TeachersPage {
  hero: HeroSection;
  introCard: IntroCard;
  features: FeatureItem[];
  cta: CtaSection;
}

// 成果页配置
export interface SuccessPage {
  header: {
    title: string;
    subtitle: string;
  };
  directionTabs: Array<{
    key: string;
    label: string;
  }>;
  pathTabs: Array<{
    key: string;
    label: string;
  }>;
  featuredSection: {
    title: string;
  };
  listSection: {
    title: string;
    loadMoreText: string;
  };
  supportSection: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      desc: string;
    }>;
  };
  ctaByDirection: {
    math: CtaSection;
    medical: CtaSection;
  };
}

// 关于页配置
export interface AboutPage {
  hero: HeroSection;
  introCard: IntroCard;
  values: ValueItem[];
  environmentImages: ImageConfig[];
  cta: CtaSection;
}

// 教材页配置
export interface MaterialsPage {
  header: {
    title: string;
    searchLabel: string;
  };
  directionTabs: Array<{
    key: string;
    label: string;
    icon: string;
  }>;
  stageTabs: Array<{
    key: string;
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
}

// 页面配置集合
export interface Pages {
  home: HomePage;
  questionBank: QuestionBankPage;
  courses: CoursesPage;
  teachers: TeachersPage;
  success: SuccessPage;
  about: AboutPage;
  materials: MaterialsPage;
}

// 方向卡片样式
export interface DirectionCardStyle {
  tag?: string;
  tagColor?: string;
  tagBackground?: string;
  headerBackground?: string;
  iconColor?: string;
  style?: 'dark' | 'light';
  accent?: string;
  background?: string;
}

// 方向数据
export interface Direction {
  _id: string;
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  featuredTag: string;
  homeTag: string;
  summary: string;
  audience: string;
  features: string[];
  chips: string[];
  iconType: string;
  homeCard: DirectionCardStyle;
  coursesCard: DirectionCardStyle;
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 教师数据
export interface Teacher {
  _id: string;
  name: string;
  role: string;
  tag: string;
  avatarUrl: string;
  avatarSeed: string;
  intro: string;
  specialties: string[];
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 成功案例
export interface SuccessCase {
  _id: string;
  direction: string;
  pathTags: string[];
  studentName: string;
  studentAvatarText: string;
  scoreGain: string;
  scoreLabel: string;
  chips: string[];
  startingLabel: string;
  startingScore: string;
  finalLabel: string;
  finalScore: string;
  quote: string;
  fitAudience: string;
  listTitle: string;
  listDesc: string;
  detailButtonText: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  coverSeed: string;
  year: number;
  category: string;
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 主推套系包
export interface MaterialPackage {
  _id: string;
  direction: string;
  stage: string;
  badge: string;
  title: string;
  target: string;
  solves: string;
  features: string[];
  contentItemIds: string[];
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 教材项目
export interface MaterialItem {
  _id: string;
  direction: string;
  stage: string;
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string;
  accentStart: string;
  accentEnd: string;
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 媒体资源
export interface MediaAsset {
  _id: string;
  title: string;
  category: string;
  url: string;
  thumbUrl: string;
  alt: string;
  tags: string[];
  sort: number;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
}

// 管理员用户
export interface AdminUser {
  _id: string;
  name: string;
  role: 'admin' | 'editor';
  status: 'active' | 'disabled';
  createdAt?: string;
  updatedAt?: string;
}

// 内容元数据
export interface ContentMeta {
  pageKey: string;
  source: 'cloud' | 'local-preview' | 'fallback';
  transport: 'cloud-function' | 'http-preview' | 'local-fallback';
  revision: string;
  updatedAt: string;
  generatedAt: string;
}

// 公开内容响应
export interface PublicContentResponse {
  site: SiteSettings;
  page: HomePage | CoursesPage | TeachersPage | SuccessPage | AboutPage | MaterialsPage | null;
  directions?: Direction[];
  teachers?: Teacher[];
  successCases?: SuccessCase[];
  materialPackages?: MaterialPackage[];
  materialItems?: MaterialItem[];
  __meta: ContentMeta;
}

// 云函数响应
export interface CloudFunctionResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 管理员认证响应
export interface AdminAuthResponse {
  ok: boolean;
  isAdmin: boolean;
  bootstrapRequired: boolean;
  openid: string;
  admin?: AdminUser | null;
}
