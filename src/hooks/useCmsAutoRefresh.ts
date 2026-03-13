import { useEffect, useRef } from 'react';
import { useDidHide, useDidShow } from '@tarojs/taro';
import { CMS_LIVE_RELOAD_INTERVAL, CMS_PREVIEW_ENABLED } from '../config/cms';

export function useCmsAutoRefresh(loadContent: () => void) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadRef = useRef(loadContent);

  useEffect(() => {
    loadRef.current = loadContent;
  }, [loadContent]);

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function start() {
    if (!CMS_PREVIEW_ENABLED) {
      return;
    }

    stop();
    timerRef.current = setInterval(() => {
      loadRef.current();
    }, CMS_LIVE_RELOAD_INTERVAL);
  }

  useEffect(() => {
    start();
    return stop;
  }, []);

  useDidShow(() => {
    loadRef.current();
    start();
  });

  useDidHide(() => {
    stop();
  });
}
