import fallbackContent from '../data/contentFallback';
import { callCloudFunction } from './cloud';
import { ErrorHandler, ErrorType, AppError } from '../utils/errorHandler';

function getFallbackList(collection) {
  if (collection === 'directions') return fallbackContent.directions;
  if (collection === 'teachers') return fallbackContent.teachers;
  if (collection === 'success_cases') return fallbackContent.successCases;
  if (collection === 'material_series') return fallbackContent.materialSeries;
  if (collection === 'material_items') return fallbackContent.materialItems;
  if (collection === 'media_assets') return fallbackContent.mediaAssets;
  if (collection === 'admin_users') return [];
  return [];
}

export async function getAdminAuth() {
  try {
    const result = await callCloudFunction('adminAuth', {});

    if (!result || !result.ok) {
      throw new AppError(ErrorType.PERMISSION, '获取管理员权限失败');
    }

    return result;
  } catch (error) {
    console.error('[admin] 权限验证失败:', error);
    return { ok: false, isAdmin: false, bootstrapRequired: true };
  }
}

export async function seedInitialData(params) {
  try {
    const result = await callCloudFunction('seedInitialData', params || {});

    if (!result || !result.ok) {
      throw new AppError(ErrorType.CLOUD_FUNCTION, '初始化数据失败');
    }

    return result;
  } catch (error) {
    throw ErrorHandler.parseCloudError(error);
  }
}

export async function getAdminPage(pageKey) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'getPage',
      pageKey
    });

    if (result && result.ok) {
      return result.data;
    }

    throw new AppError(ErrorType.CLOUD_FUNCTION, '获取页面数据失败');
  } catch (error) {
    console.warn('[admin] 降级使用本地页面数据:', pageKey, error);

    if (pageKey === 'site') {
      return fallbackContent.site || null;
    }

    return fallbackContent.pages[pageKey] || null;
  }
}

export async function saveAdminPage(pageKey, content) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'savePage',
      pageKey,
      content
    });

    if (!result || !result.ok) {
      throw new AppError(ErrorType.CLOUD_FUNCTION, '保存页面失败');
    }

    return result;
  } catch (error) {
    throw ErrorHandler.parseCloudError(error);
  }
}

export async function getAdminList(collection) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'listCollection',
      collection
    });

    if (result && result.ok) {
      return result.data || [];
    }

    throw new AppError(ErrorType.CLOUD_FUNCTION, '获取列表数据失败');
  } catch (error) {
    console.warn('[admin] 降级使用本地列表数据:', collection, error);
    return getFallbackList(collection);
  }
}

export async function getAdminItem(collection, id) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'getItem',
      collection,
      id
    });

    if (result && result.ok) {
      return result.data;
    }

    throw new AppError(ErrorType.CLOUD_FUNCTION, '获取项目数据失败');
  } catch (error) {
    throw ErrorHandler.parseCloudError(error);
  }
}

export async function saveAdminItem(collection, item) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'saveItem',
      collection,
      item
    });

    if (!result || !result.ok) {
      throw new AppError(ErrorType.CLOUD_FUNCTION, '保存项目失败');
    }

    return result;
  } catch (error) {
    throw ErrorHandler.parseCloudError(error);
  }
}

export async function deleteAdminItem(collection, id) {
  try {
    const result = await callCloudFunction('adminContent', {
      action: 'deleteItem',
      collection,
      id
    });

    if (!result || !result.ok) {
      throw new AppError(ErrorType.CLOUD_FUNCTION, '删除项目失败');
    }

    return result;
  } catch (error) {
    throw ErrorHandler.parseCloudError(error);
  }
}

export function getEmptyPageContent(pageKey) {
  if (pageKey === 'site') {
    return JSON.parse(JSON.stringify(fallbackContent.site || {}));
  }

  return JSON.parse(JSON.stringify(fallbackContent.pages[pageKey] || {}));
}

export function getEmptyItemTemplate(collection) {
  if (collection === 'directions') {
    return {
      name: '',
      slug: '',
      category: '',
      isFeatured: false,
      featuredTag: '',
      homeTag: '',
      summary: '',
      audience: '',
      features: [],
      chips: [],
      iconType: 'grid',
      homeCard: {},
      coursesCard: {},
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'teachers') {
    return {
      name: '',
      role: '',
      tag: '',
      avatarUrl: '',
      avatarSeed: '',
      intro: '',
      specialties: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'success_cases') {
    return {
      title: '',
      subtitle: '',
      coverUrl: '',
      coverSeed: '',
      year: new Date().getFullYear(),
      category: '',
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'material_series') {
    return {
      name: '',
      slug: '',
      category: '',
      tag: '',
      accent: '#5b4dff',
      summary: '',
      shelfLabel: '',
      items: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'material_items') {
    return {
      seriesId: '',
      type: '',
      title: '',
      stage: '',
      subtitle: '',
      desc: '',
      contents: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'media_assets') {
    return {
      _id: '',
      title: '',
      category: '',
      url: '',
      thumbUrl: '',
      alt: '',
      tags: [],
      sort: 100,
      status: 'draft'
    };
  }

  if (collection === 'admin_users') {
    return {
      _id: '',
      name: '',
      role: 'editor',
      status: 'active'
    };
  }

  return {};
}
