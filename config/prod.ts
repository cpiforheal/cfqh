import { defineConfig } from '@tarojs/cli';

export default defineConfig({
  env: {
    TARO_APP_CMS_PREVIEW_BASE_URL: process.env.TARO_APP_CMS_PREVIEW_BASE_URL || ''
  },
  mini: {},
  h5: {}
});
