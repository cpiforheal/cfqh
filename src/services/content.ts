import Taro from '@tarojs/taro';
import fallbackContent from '../data/contentFallback';
import { CMS_PREVIEW_BASE_URL, CMS_PREVIEW_ENABLED } from '../config/cms';
import { CLOUD_REQUIRE_REMOTE } from '../config/cloud';
import { callCloudFunction } from './cloud';
import { ErrorHandler, ErrorType, AppError } from '../utils/errorHandler';

// 缓存配置
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存
const CACHE_VERSION = '2026-03-18-home-sync-v1';
const CACHE_KEY_PREFIX = 'cms_content_';
const CACHE_META_KEY = 'cms_meta_';

function getCacheKey(pageKey) {
  return `${CACHE_KEY_PREFIX}${CACHE_VERSION}_${pageKey}`;
}

function getMetaKey(pageKey) {
  return `${CACHE_META_KEY}${CACHE_VERSION}_${pageKey}`;
}

function isPublished(item) {
  return !!item && (!item.status || item.status === 'published');
}

function sortPublished(items) {
  return (items || [])
    .filter(isPublished)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function withMeta(payload, source, extras = {}) {
  const baseMeta = payload?.__meta || {};
  return {
    ...payload,
    __meta: {
      ...baseMeta,
      ...extras,
      source
    }
  };
}

// 从 Storage 读取缓存
function getCachedContent(pageKey) {
  try {
    const cacheKey = getCacheKey(pageKey);
    const metaKey = getMetaKey(pageKey);

    const cached = Taro.getStorageSync(cacheKey);
    const meta = Taro.getStorageSync(metaKey);

    if (!cached || !meta) {
      return null;
    }

    const now = Date.now();
    const age = now - (meta.cachedAt || 0);

    // 检查是否过期
    if (age > CACHE_TTL) {
      console.log(`[cache] 缓存已过期: ${pageKey}, 年龄=${Math.round(age / 1000)}s`);
      return null;
    }

    console.log(`[cache] 命中缓存: ${pageKey}, 年龄=${Math.round(age / 1000)}s`);
    return cached;
  } catch (error) {
    console.warn('[cache] 读取缓存失败:', error);
    return null;
  }
}

// 保存到 Storage 缓存
function setCachedContent(pageKey, data) {
  try {
    const cacheKey = getCacheKey(pageKey);
    const metaKey = getMetaKey(pageKey);

    Taro.setStorageSync(cacheKey, data);
    Taro.setStorageSync(metaKey, {
      cachedAt: Date.now(),
      revision: data?.__meta?.revision || '',
      pageKey
    });

    console.log(`[cache] 已缓存: ${pageKey}`);
  } catch (error) {
    console.warn('[cache] 保存缓存失败:', error);
  }
}

// 清除指定页面缓存
export function clearContentCache(pageKey) {
  try {
    const cacheKey = getCacheKey(pageKey);
    const metaKey = getMetaKey(pageKey);

    Taro.removeStorageSync(cacheKey);
    Taro.removeStorageSync(metaKey);

    console.log(`[cache] 已清除缓存: ${pageKey}`);
  } catch (error) {
    console.warn('[cache] 清除缓存失败:', error);
  }
}

// 清除所有内容缓存
export function clearAllContentCache() {
  try {
    const info = Taro.getStorageInfoSync();
    const keys = info.keys || [];

    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX) || key.startsWith(CACHE_META_KEY)) {
        Taro.removeStorageSync(key);
      }
    });

    console.log('[cache] 已清除所有缓存');
  } catch (error) {
    console.warn('[cache] 清除所有缓存失败:', error);
  }
}

export function getFallbackPublicContent(pageKey) {
  const payload = {
    site: fallbackContent.site,
    page: fallbackContent.pages[pageKey] || null
  };

  if (pageKey === 'home' || pageKey === 'courses') {
    payload.directions = sortPublished(fallbackContent.directions);
  }

  if (pageKey === 'teachers') {
    payload.teachers = sortPublished(fallbackContent.teachers);
  }

  if (pageKey === 'success') {
    payload.successCases = sortPublished(fallbackContent.successCases);
  }

  if (pageKey === 'materials') {
    payload.materialSeries = sortPublished(fallbackContent.materialSeries);
    payload.materialItems = sortPublished(fallbackContent.materialItems);
  }

  return payload;
}

async function getLocalPreviewContent(pageKey) {
  if (!CMS_PREVIEW_ENABLED) {
    return null;
  }

  try {
    const response = await Taro.request({
      url: `${CMS_PREVIEW_BASE_URL}/api/public/${pageKey}`,
      method: 'GET',
      timeout: 1500
    });

    const result = response.data;
    if (result && result.ok && result.data) {
      console.log(`[content] 使用本地预览数据: ${pageKey}`);
      return withMeta(result.data, 'local-preview', {
        transport: 'http-preview'
      });
    }

    throw new AppError(ErrorType.CLOUD_FUNCTION, '本地 CMS 预览接口返回空数据');
  } catch (error) {
    console.warn(`[content] 本地预览失败: ${pageKey}`, error);
    return null;
  }
}

export async function getPublicContent(pageKey) {
  const fallback = getFallbackPublicContent(pageKey);

  // 1. 先尝试从缓存读取
  const cached = getCachedContent(pageKey);
  if (cached) {
    // 后台静默更新缓存
    refreshContentInBackground(pageKey).catch(() => {
      // 静默失败，不影响用户体验
    });

    return cached;
  }

  // 2. 缓存未命中，开始加载
  console.log(`[content] 缓存未命中，开始加载: ${pageKey}`);

  try {
    // 尝试本地预览
    const localPreview = await getLocalPreviewContent(pageKey);
    if (localPreview) {
      setCachedContent(pageKey, localPreview);
      return localPreview;
    }

    // 调用云函数，带重试机制
    const result = await ErrorHandler.retry(
      () => callCloudFunction('publicContent', { pageKey }),
      {
        maxRetries: 3,
        delay: 300,
        backoff: 2,
        onRetry: (attempt) => {
          console.log(`[content] 重试获取内容: ${pageKey}, 第 ${attempt} 次`);
        }
      }
    );

    if (result && result.ok && result.data) {
      console.log(`[content] 使用云端数据: ${pageKey}`);
      const cloudData = withMeta(result.data, 'cloud', {
        transport: 'cloud-function'
      });

      // 保存到缓存
      setCachedContent(pageKey, cloudData);

      return cloudData;
    }

    if (CLOUD_REQUIRE_REMOTE) {
      throw new AppError(
        ErrorType.CLOUD_FUNCTION,
        'publicContent 返回空数据'
      );
    }
  } catch (error) {
    if (CLOUD_REQUIRE_REMOTE) {
      throw ErrorHandler.parseCloudError(error);
    }

    console.warn(
      '[content] 降级使用本地数据:',
      pageKey,
      error && error.message ? error.message : error
    );
  }

  console.log(`[content] 使用降级数据: ${pageKey}`);
  return {
    ...fallback,
    __meta: {
      pageKey,
      source: 'fallback',
      transport: 'local-fallback',
      revision: `${pageKey}:fallback`,
      updatedAt: '',
      generatedAt: new Date().toISOString()
    }
  };
}

// 后台静默刷新缓存
async function refreshContentInBackground(pageKey) {
  try {
    console.log(`[content] 后台刷新: ${pageKey}`);

    // 尝试本地预览
    const localPreview = await getLocalPreviewContent(pageKey);
    if (localPreview) {
      setCachedContent(pageKey, localPreview);
      return;
    }

    // 调用云函数
    const result = await callCloudFunction('publicContent', { pageKey });

    if (result && result.ok && result.data) {
      const cloudData = withMeta(result.data, 'cloud', {
        transport: 'cloud-function'
      });

      setCachedContent(pageKey, cloudData);
      console.log(`[content] 后台刷新成功: ${pageKey}`);
    }
  } catch (error) {
    console.warn(`[content] 后台刷新失败: ${pageKey}`, error);
  }
}
