import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveManualChunk(id: string) {
  if (!id.includes('node_modules')) {
    return undefined;
  }

  const normalizedId = id.split('node_modules/')[1] || id;

  if (
    normalizedId.startsWith('react/') ||
    normalizedId.startsWith('react-dom/') ||
    normalizedId.startsWith('react-router/') ||
    normalizedId.startsWith('react-router-dom/') ||
    normalizedId.startsWith('scheduler/')
  ) {
    return 'react-vendor';
  }

  if (normalizedId.startsWith('@tanstack/')) {
    return 'react-query';
  }

  if (normalizedId.startsWith('dayjs/')) {
    return 'dayjs-vendor';
  }

  if (
    normalizedId.startsWith('@ant-design/pro-') ||
    normalizedId.startsWith('@ant-design/pro-components/') ||
    normalizedId.startsWith('@ant-design/pro-provider/')
  ) {
    return 'pro-components';
  }

  if (
    normalizedId.startsWith('antd/') ||
    normalizedId.startsWith('@ant-design/') ||
    normalizedId.startsWith('@rc-component/') ||
    normalizedId.startsWith('rc-')
  ) {
    return 'antd-vendor';
  }

  return undefined;
}

export default defineConfig({
  base: '/react-admin/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: resolveManualChunk
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3200',
        changeOrigin: true
      }
    }
  }
});
