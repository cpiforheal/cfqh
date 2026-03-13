import Taro from '@tarojs/taro';
import fallbackContent from '../data/contentFallback';
import { CMS_PREVIEW_BASE_URL, CMS_PREVIEW_ENABLED } from '../config/cms';
import { CLOUD_REQUIRE_REMOTE } from '../config/cloud';
import { callCloudFunction } from './cloud';

function isPublished(item) {
  return !!item && (!item.status || item.status === 'published');
}

function sortPublished(items) {
  return (items || [])
    .filter(isPublished)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
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

  const response = await Taro.request({
    url: `${CMS_PREVIEW_BASE_URL}/api/public/${pageKey}`,
    method: 'GET',
    timeout: 1500
  });

  const result = response.data;
  if (result && result.ok && result.data) {
    return {
      ...result.data,
      __meta: {
        source: 'local-preview'
      }
    };
  }

  throw new Error('本地 CMS 预览接口返回空数据');
}

export async function getPublicContent(pageKey) {
  const fallback = getFallbackPublicContent(pageKey);

  try {
    const localPreview = await getLocalPreviewContent(pageKey).catch(() => null);
    if (localPreview) {
      return localPreview;
    }

    const result = await callCloudFunction('publicContent', { pageKey });

    if (result && result.ok && result.data) {
      return {
        ...result.data,
        __meta: {
          source: 'cloud'
        }
      };
    }

    if (CLOUD_REQUIRE_REMOTE) {
      throw new Error('publicContent 返回空数据');
    }
  } catch (error) {
    if (CLOUD_REQUIRE_REMOTE) {
      throw error;
    }

    console.warn('[content] fallback to local content:', pageKey, error && error.message ? error.message : error);
  }

  return {
    ...fallback,
    __meta: {
      source: 'fallback'
    }
  };
}
