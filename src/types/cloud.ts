// 云函数名称
export type CloudFunctionName =
  | 'publicContent'
  | 'adminAuth'
  | 'adminContent'
  | 'seedInitialData';

// 云函数请求参数
export interface PublicContentParams {
  pageKey: string;
}

export interface AdminContentParams {
  action: 'getPage' | 'savePage' | 'listCollection' | 'getItem' | 'saveItem' | 'deleteItem';
  pageKey?: string;
  content?: any;
  collection?: string;
  id?: string;
  item?: any;
}

export interface SeedInitialDataParams {
  force?: boolean;
}

// 集合名称
export type CollectionName =
  | 'directions'
  | 'teachers'
  | 'success_cases'
  | 'material_series'
  | 'material_items'
  | 'media_assets'
  | 'admin_users';

// 页面集合映射
export type PageCollectionKey =
  | 'site'
  | 'home'
  | 'courses'
  | 'teachers'
  | 'success'
  | 'about'
  | 'materials';

// 云开发配置
export interface CloudConfig {
  env?: string;
  traceUser?: boolean;
}

// 云函数调用选项
export interface CloudCallOptions {
  name: CloudFunctionName;
  data?: any;
  timeout?: number;
}

// 云函数错误
export interface CloudError {
  errCode: number;
  errMsg: string;
}

// 云函数响应包装
export interface CloudResponse<T = any> {
  result: T;
  errMsg?: string;
}