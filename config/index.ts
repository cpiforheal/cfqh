import path from 'path';
import { defineConfig } from '@tarojs/cli';

export default defineConfig({
  projectName: 'cfqh-weapp',
  date: '2026-03-07',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['taro-plugin-tailwind'],
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true
      },
      pxtransform: {
        enable: true,
        config: {}
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static'
  }
});
