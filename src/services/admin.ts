import fallbackContent from '../data/contentFallback';
import { callCloudFunction } from './cloud';

function getFallbackList(collection) {
  if (collection === 'directions') return fallbackContent.directions;
  if (collection === 'teachers') return fallbackContent.teachers;
  if (collection === 'success_cases') return fallbackContent.successCases;
  if (collection === 'material_series') return fallbackContent.materialSeries;
  if (collection === 'material_items') return fallbackContent.materialItems;
  if (collection === 'admin_users') return [];
  return [];
}

export async function getAdminAuth() {
  const result = await callCloudFunction('adminAuth', {});
  return result || { ok: false, isAdmin: false, bootstrapRequired: true };
}

export async function seedInitialData(params) {
  return callCloudFunction('seedInitialData', params || {});
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
  } catch (error) {
    console.warn('[admin] fallback page:', pageKey, error && error.message ? error.message : error);
  }

  return fallbackContent.pages[pageKey] || null;
}

export async function saveAdminPage(pageKey, content) {
  return callCloudFunction('adminContent', {
    action: 'savePage',
    pageKey,
    content
  });
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
  } catch (error) {
    console.warn('[admin] fallback list:', collection, error && error.message ? error.message : error);
  }

  return getFallbackList(collection);
}

export async function getAdminItem(collection, id) {
  const result = await callCloudFunction('adminContent', {
    action: 'getItem',
    collection,
    id
  });

  if (result && result.ok) {
    return result.data;
  }

  return null;
}

export async function saveAdminItem(collection, item) {
  return callCloudFunction('adminContent', {
    action: 'saveItem',
    collection,
    item
  });
}

export async function deleteAdminItem(collection, id) {
  return callCloudFunction('adminContent', {
    action: 'deleteItem',
    collection,
    id
  });
}

export function getEmptyPageContent(pageKey) {
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
