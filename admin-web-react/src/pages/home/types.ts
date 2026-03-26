export type LinkOpenType = 'navigate' | 'switchTab' | 'redirectTo' | 'reLaunch';

export type DirectionOption = {
  id: string;
  name: string;
  category: string;
  summary: string;
  audience: string;
  isFeatured: boolean;
};

export type HomeSectionId = 'hero' | 'stats' | 'quickLinks' | 'directions' | 'advantages' | 'environment' | 'cta';

export type HomeHero = {
  chip: string;
  title: string;
  highlightTitle: string;
  desc: string;
  tags: string[];
  primaryButton: {
    text: string;
    url: string;
    openType: LinkOpenType;
  };
  secondaryNote: string;
  backgroundImageSeed: string;
};

export type HomeStat = {
  value: string;
  label: string;
  note: string;
};

export type HomeQuickLink = {
  label: string;
  desc: string;
  url: string;
  openType: LinkOpenType;
  icon: string;
};

export type HomeAdvantage = {
  icon: string;
  title: string;
  desc: string;
};

export type HomeEnvironmentCard = {
  label: string;
  imageUrl: string;
  imageSeed: string;
};

export type HomeEnvironmentSection = {
  title: string;
  subtitle: string;
  cards: HomeEnvironmentCard[];
};

export type HomeCta = {
  title: string;
  desc: string;
  buttonText: string;
  footnote: string;
};

export type HomePageContent = {
  hero: HomeHero;
  overviewStats: HomeStat[];
  quickLinks: HomeQuickLink[];
  advantages: HomeAdvantage[];
  featuredDirectionIds: string[];
  environmentSection: HomeEnvironmentSection;
  cta: HomeCta;
  _createdAt?: string;
  _updatedAt?: string;
  _meta?: Record<string, unknown>;
};

export type HomeSectionModel = {
  id: HomeSectionId;
  step: string;
  title: string;
  desc: string;
  impact: string;
  location: string;
  summary: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
  linkedModule?: {
    label: string;
    target: '/directions' | '/contact';
    note: string;
  };
};
