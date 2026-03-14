import os from 'os';
import { defineConfig } from '@tarojs/cli';

function resolveLanHost() {
  const interfaces = os.networkInterfaces();
  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address && address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '127.0.0.1';
}

const previewBaseUrl = process.env.TARO_APP_CMS_PREVIEW_BASE_URL || `http://${resolveLanHost()}:3200`;

export default defineConfig({
  env: {
    TARO_APP_CMS_PREVIEW_BASE_URL: previewBaseUrl
  },
  mini: {},
  h5: {}
});
