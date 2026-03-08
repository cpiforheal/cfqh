import fallbackContent from '../data/contentFallback';
import { CLOUD_REQUIRE_REMOTE } from '../config/cloud';
import { callCloudFunction } from './cloud';

function sortPublished(items) {
  return (items || [])
    .filter((item) => item && item.status !== 'deleted' && item.status !== 'archived')
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

export async function getPublicContent(pageKey) {
  const fallback = getFallbackPublicContent(pageKey);

  try {
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
