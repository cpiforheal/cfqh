const runtimeEnv =
  typeof process !== 'undefined' && process && process.env
    ? process.env
    : {};

export const CMS_PREVIEW_ENABLED = runtimeEnv.NODE_ENV !== 'production';

export const CMS_PREVIEW_BASE_URL = runtimeEnv.TARO_APP_CMS_PREVIEW_BASE_URL || 'http://127.0.0.1:3200';

export const CMS_LIVE_RELOAD_INTERVAL = 3000;
