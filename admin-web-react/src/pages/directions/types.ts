export type DirectionRecord = Record<string, unknown>;

export type DirectionFormValues = {
  name: string;
  slug: string;
  category: string;
  status: string;
  sort: number;
  isFeatured: boolean;
  featuredTag: string;
  homeTag: string;
  summary: string;
  audience: string;
  iconType: string;
  featuresText: string;
  chipsText: string;
};
