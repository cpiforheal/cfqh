import { useEffect } from 'react';
import { initCloud } from './services/cloud';
import { getPublicContent } from './services/content';
import './app.css';

function App(props) {
  useEffect(() => {
    initCloud();

    // 预加载关键页面数据，提升用户体验
    preloadCriticalContent();
  }, []);

  return props?.children || null;
}

// 预加载高频访问的页面数据
async function preloadCriticalContent() {
  const criticalPages = ['home', 'courses', 'teachers'];

  console.log('[preload] 开始预加载关键数据...');

  try {
    // 并行预加载，不阻塞应用启动
    await Promise.all(
      criticalPages.map(pageKey =>
        getPublicContent(pageKey).catch(error => {
          console.warn(`[preload] 预加载失败: ${pageKey}`, error);
        })
      )
    );

    console.log('[preload] 关键数据预加载完成');
  } catch (error) {
    console.warn('[preload] 预加载过程出错:', error);
  }
}

export default App;
