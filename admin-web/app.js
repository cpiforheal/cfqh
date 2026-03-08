const state = {
  mode: 'page',
  currentPageKey: 'home',
  currentCollection: 'directions',
  currentItemId: '',
  pageOptions: [],
  listOptions: []
};

const refs = {
  pageNav: document.getElementById('page-nav'),
  listNav: document.getElementById('list-nav'),
  status: document.getElementById('status'),
  panelTitle: document.getElementById('panel-title'),
  pagePanel: document.getElementById('page-panel'),
  listPanel: document.getElementById('list-panel'),
  pageEditor: document.getElementById('page-editor'),
  itemEditor: document.getElementById('item-editor'),
  itemList: document.getElementById('item-list'),
  savePage: document.getElementById('save-page'),
  newItem: document.getElementById('new-item'),
  saveItem: document.getElementById('save-item'),
  deleteItem: document.getElementById('delete-item'),
  resetSeed: document.getElementById('reset-seed')
};

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await response.json();
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || '请求失败');
  }
  return data;
}

function setStatus(text) {
  refs.status.textContent = text;
}

function createNavButton(item, active, onClick) {
  const button = document.createElement('button');
  button.className = `nav-item${active ? ' active' : ''}`;
  button.textContent = item.label;
  button.onclick = onClick;
  return button;
}

function renderNav() {
  refs.pageNav.innerHTML = '';
  refs.listNav.innerHTML = '';

  state.pageOptions.forEach((item) => {
    refs.pageNav.appendChild(
      createNavButton(item, state.mode === 'page' && state.currentPageKey === item.key, () => loadPage(item.key))
    );
  });

  state.listOptions.forEach((item) => {
    refs.listNav.appendChild(
      createNavButton(item, state.mode === 'list' && state.currentCollection === item.key, () => loadCollection(item.key))
    );
  });
}

async function loadMeta() {
  const result = await request('/api/meta');
  state.pageOptions = result.pageOptions;
  state.listOptions = result.listOptions;
  renderNav();
}

async function loadPage(pageKey) {
  state.mode = 'page';
  state.currentPageKey = pageKey;
  renderNav();
  refs.pagePanel.classList.remove('hidden');
  refs.listPanel.classList.add('hidden');
  const result = await request(`/api/page/${pageKey}`);
  refs.panelTitle.textContent = `${state.pageOptions.find((item) => item.key === pageKey)?.label || pageKey} 编辑`;
  refs.pageEditor.value = JSON.stringify(result.data || {}, null, 2);
  setStatus('单页编辑');
}

function pickItemTitle(item) {
  return item.title || item.name || item.label || item._id || '未命名';
}

function renderItems(items) {
  refs.itemList.innerHTML = '';
  items.forEach((item) => {
    const node = document.createElement('div');
    node.className = `item-card${state.currentItemId === item._id ? ' active' : ''}`;
    node.innerHTML = `
      <div class="item-card-title">${pickItemTitle(item)}</div>
      <div class="item-card-meta">${item.status || 'draft'} · sort ${item.sort || 0}</div>
    `;
    node.onclick = () => loadItem(state.currentCollection, item._id);
    refs.itemList.appendChild(node);
  });
}

async function loadCollection(collectionKey) {
  state.mode = 'list';
  state.currentCollection = collectionKey;
  state.currentItemId = '';
  renderNav();
  refs.pagePanel.classList.add('hidden');
  refs.listPanel.classList.remove('hidden');
  const result = await request(`/api/collection/${collectionKey}`);
  refs.panelTitle.textContent = `${state.listOptions.find((item) => item.key === collectionKey)?.label || collectionKey} 编辑`;
  renderItems(result.data || []);
  refs.itemEditor.value = '';
  setStatus('列表编辑');
}

async function loadItem(collectionKey, itemId) {
  const result = await request(`/api/collection/${collectionKey}/${itemId}`);
  state.currentItemId = itemId;
  renderNav();
  const listResult = await request(`/api/collection/${collectionKey}`);
  renderItems(listResult.data || []);
  refs.itemEditor.value = JSON.stringify(result.data || {}, null, 2);
}

async function createItem() {
  const result = await request(`/api/template/${state.currentCollection}`);
  state.currentItemId = '';
  refs.itemEditor.value = JSON.stringify(result.data || {}, null, 2);
  setStatus('新增条目');
}

async function saveCurrentPage() {
  const value = JSON.parse(refs.pageEditor.value || '{}');
  await request(`/api/page/${state.currentPageKey}`, {
    method: 'PUT',
    body: JSON.stringify(value)
  });
  setStatus('页面已保存');
}

async function saveCurrentItem() {
  const value = JSON.parse(refs.itemEditor.value || '{}');
  if (state.currentItemId) {
    await request(`/api/collection/${state.currentCollection}/${state.currentItemId}`, {
      method: 'PUT',
      body: JSON.stringify(value)
    });
  } else {
    const result = await request(`/api/collection/${state.currentCollection}`, {
      method: 'POST',
      body: JSON.stringify(value)
    });
    state.currentItemId = result.data._id;
  }
  await loadCollection(state.currentCollection);
  if (state.currentItemId) {
    await loadItem(state.currentCollection, state.currentItemId);
  }
  setStatus('条目已保存');
}

async function deleteCurrentItem() {
  if (!state.currentItemId) return;
  await request(`/api/collection/${state.currentCollection}/${state.currentItemId}`, { method: 'DELETE' });
  state.currentItemId = '';
  await loadCollection(state.currentCollection);
  setStatus('条目已删除');
}

async function resetSeed() {
  if (!window.confirm('确认重置为初始数据？当前本地后台数据会被覆盖。')) return;
  await request('/api/seed/reset', { method: 'POST' });
  await loadPage(state.currentPageKey);
  setStatus('已重置为初始数据');
}

refs.savePage.onclick = () => saveCurrentPage().catch((error) => setStatus(error.message));
refs.newItem.onclick = () => createItem().catch((error) => setStatus(error.message));
refs.saveItem.onclick = () => saveCurrentItem().catch((error) => setStatus(error.message));
refs.deleteItem.onclick = () => deleteCurrentItem().catch((error) => setStatus(error.message));
refs.resetSeed.onclick = () => resetSeed().catch((error) => setStatus(error.message));

(async function bootstrap() {
  try {
    await loadMeta();
    await loadPage(state.currentPageKey);
    setStatus('服务正常');
  } catch (error) {
    setStatus(error.message || '初始化失败');
  }
})();
