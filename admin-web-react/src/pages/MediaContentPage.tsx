import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  App,
  Button,
  Card,
  Popconfirm,
  Result,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type TableProps
} from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import {
  defaultMallAsset,
  defaultMallProduct,
  defaultMallProductItem,
  getMaterialCategoryLabel,
  materialDirectionLabels,
  materialStageLabels,
  normalizeMallAsset,
  normalizeMallEntitlement,
  normalizeMallProduct,
  normalizeMallProductItem,
  normalizeMaterialsPage,
  readMaterialDirection,
  sortBySortOrder,
  type MallAssetRecord,
  type MallProductItemRecord,
  type MallProductRecord,
  type MaterialSectionId
} from './media/types';

const MediaSectionEditorDrawer = lazy(() =>
  import('./media/MediaSectionEditorDrawer').then((module) => ({ default: module.MediaSectionEditorDrawer }))
);
const MediaPackageEditorDrawer = lazy(() =>
  import('./media/MediaPackageEditorDrawer').then((module) => ({ default: module.MediaPackageEditorDrawer }))
);
const MediaItemEditorDrawer = lazy(() =>
  import('./media/MediaItemEditorDrawer').then((module) => ({ default: module.MediaItemEditorDrawer }))
);
const MediaAssetEditorDrawer = lazy(() =>
  import('./media/MediaAssetEditorDrawer').then((module) => ({ default: module.MediaAssetEditorDrawer }))
);

type MediaContentPageProps = {
  auth: AuthState;
};

type MediaWorkspacePanel = 'products' | 'items' | 'assets' | 'entitlements';

type MediaFrontendRow = {
  id: string;
  step: string;
  title: string;
  location: string;
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
  actionLabel: string;
  actionType: 'section' | 'product' | 'createProduct';
  sectionId?: MaterialSectionId;
  productId?: string;
};

function isOnline(status: string) {
  return status === 'online';
}

function formatPrice(record: MallProductRecord) {
  if (record.isFree || Number(record.price || 0) <= 0) return '免费领取';
  const current = Number(record.price || 0);
  const original = Number(record.originPrice || 0);
  if (original > current && current > 0) {
    return `¥${current} / 原价 ¥${original}`;
  }
  return `¥${current}`;
}

function buildFrontendRows(
  page: ReturnType<typeof normalizeMaterialsPage>,
  visibleProducts: MallProductRecord[]
): MediaFrontendRow[] {
  const rows: MediaFrontendRow[] = [
    {
      id: 'hero',
      step: '第 1 行',
      title: '页面主标题',
      location: 'LOGO 和学科切换下方的大标题',
      summary: page.heroSection.title || '未填写商城大标题',
      editFields: '商城大标题',
      statusLabel: page.heroSection.title ? '已填写' : '待补充',
      statusTone: page.heroSection.title ? 'success' : 'warning',
      actionLabel: '编辑主标题',
      actionType: 'section',
      sectionId: 'hero'
    },
    {
      id: 'categories',
      step: '第 2 行',
      title: '商品分类按钮',
      location: '主标题下方的分类按钮行',
      summary: page.categoryTabs.length ? page.categoryTabs.map((item) => item.label).join(' / ') : '还没有配置分类按钮',
      editFields: '分类按钮名称与顺序',
      statusLabel: page.categoryTabs.length ? `已配置 ${page.categoryTabs.length} 个` : '待补充',
      statusTone: page.categoryTabs.length ? 'success' : 'warning',
      actionLabel: '编辑分类',
      actionType: 'section',
      sectionId: 'categories'
    }
  ];

  if (visibleProducts.length) {
    visibleProducts.forEach((product, index) => {
      const ready = Boolean(product.productName && product.productSubTitle && product.coverMark && product.coverLabel && product.buttonText);
      rows.push({
        id: `product-${product._id || index}`,
        step: `第 3.${index + 1} 张`,
        title: `商品卡 ${index + 1}`,
        location: `${getMaterialCategoryLabel(product.categoryKey)} · 商城商品列表`,
        summary: `${product.coverLabel || '未填封面底部字'} / ${product.productName || '未填写标题'} / ${
          product.productSubTitle || '未填写说明'
        } / ${product.salesLabel || '未填写销量字'}`,
        editFields: '封面大字、封面底部字、标题、说明、价格、销量字、按钮字',
        statusLabel: ready ? '商品卡已完整' : '建议补齐商品卡',
        statusTone: ready ? 'success' : 'warning',
        actionLabel: '编辑这张卡',
        actionType: 'product',
        productId: product._id
      });
    });
  } else {
    rows.push({
      id: 'product-empty',
      step: '第 3 块',
      title: '商品卡列表',
      location: '商城商品列表',
      summary: '当前学科下还没有商品卡',
      editFields: '先创建第一张商品卡',
      statusLabel: '待创建',
      statusTone: 'warning',
      actionLabel: '新建商品卡',
      actionType: 'createProduct'
    });
  }

  rows.push({
    id: 'consult-bar',
    step: '最后一块',
    title: '底部咨询浮条',
    location: '商城页底部深色咨询条',
    summary: `${page.consultBar.title || '未填写标题'} / ${page.consultBar.buttonText || '未填写按钮字'}`,
    editFields: '咨询标题、说明、按钮字',
    statusLabel: page.consultBar.title && page.consultBar.desc && page.consultBar.buttonText ? '已完整' : '待补充',
    statusTone: page.consultBar.title && page.consultBar.desc && page.consultBar.buttonText ? 'success' : 'warning',
    actionLabel: '编辑浮条',
    actionType: 'section',
    sectionId: 'consultBar'
  });

  return rows;
}

function formatEntitlementStatus(status: string) {
  if (status === 'expired') return { label: '已过期', color: 'warning' as const };
  if (status === 'revoked') return { label: '已撤销', color: 'error' as const };
  return { label: '生效中', color: 'success' as const };
}

function buildProductItemPayload(
  product: MallProductRecord,
  asset: MallAssetRecord,
  sortOrder: number,
  existing?: MallProductItemRecord | null
): MallProductItemRecord {
  return {
    ...(existing || defaultMallProductItem),
    productId: product._id || '',
    itemType: 'asset',
    itemId: asset._id || '',
    displayType: asset.assetType || existing?.displayType || '资料',
    displayName: asset.title || asset.name || existing?.displayName || '',
    displaySubTitle: asset.subTitle || existing?.displaySubTitle || '',
    displayDescription: asset.description || existing?.displayDescription || '',
    displayDetails: asset.description || existing?.displayDetails || '',
    direction: product.direction,
    previewEnabled: asset.previewEnabled,
    previewPageCount: asset.previewPageCount,
    accentStart: asset.accentStart,
    accentEnd: asset.accentEnd,
    sortOrder,
    status: product.status
  };
}

export function MediaContentPage({ auth }: MediaContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingSection, setEditingSection] = useState<MaterialSectionId | null>(null);
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MallProductRecord | null>(null);
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MallProductItemRecord | null>(null);
  const [assetDrawerOpen, setAssetDrawerOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<MallAssetRecord | null>(null);
  const [workspacePanel, setWorkspacePanel] = useState<MediaWorkspacePanel>('products');

  const direction = readMaterialDirection(searchParams.get('subject'));
  const requestedPanel = (searchParams.get('panel') as MediaWorkspacePanel | null) || null;
  const requestedSection = (searchParams.get('section') as MaterialSectionId | null) || null;

  const pageQuery = useQuery({
    queryKey: ['page', 'materials'],
    queryFn: () => api.getPage('materials')
  });

  const assetsQuery = useQuery({
    queryKey: ['collection', 'mallAssets'],
    queryFn: () => api.listCollection('mallAssets')
  });

  const productsQuery = useQuery({
    queryKey: ['collection', 'mallProducts'],
    queryFn: () => api.listCollection('mallProducts')
  });

  const productItemsQuery = useQuery({
    queryKey: ['collection', 'mallProductItems'],
    queryFn: () => api.listCollection('mallProductItems')
  });

  const entitlementsQuery = useQuery({
    queryKey: ['collection', 'mallEntitlements'],
    queryFn: () => api.listCollection('mallEntitlements')
  });

  const updatePageMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.updatePage('materials', payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'materials'] });
    }
  });

  const createAssetMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('mallAssets', payload)
  });
  const updateAssetMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('mallAssets', id, payload)
  });
  const deleteAssetMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('mallAssets', id)
  });

  const createProductMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('mallProducts', payload)
  });
  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('mallProducts', id, payload)
  });
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('mallProducts', id)
  });

  const createItemMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('mallProductItems', payload)
  });
  const updateItemMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('mallProductItems', id, payload)
  });
  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('mallProductItems', id)
  });

  const page = useMemo(() => normalizeMaterialsPage(pageQuery.data), [pageQuery.data]);
  const allAssets = useMemo(
    () => sortBySortOrder((assetsQuery.data || []).map((item) => normalizeMallAsset(item))),
    [assetsQuery.data]
  );
  const allProducts = useMemo(
    () => sortBySortOrder((productsQuery.data || []).map((item) => normalizeMallProduct(item))),
    [productsQuery.data]
  );
  const allProductItems = useMemo(
    () => sortBySortOrder((productItemsQuery.data || []).map((item) => normalizeMallProductItem(item))),
    [productItemsQuery.data]
  );
  const allEntitlements = useMemo(
    () => (entitlementsQuery.data || []).map((item) => normalizeMallEntitlement(item)),
    [entitlementsQuery.data]
  );
  const entitlementCount = allEntitlements.length;

  const currentAssets = useMemo(() => allAssets.filter((item) => item.direction === direction), [allAssets, direction]);
  const currentProducts = useMemo(() => allProducts.filter((item) => item.direction === direction), [allProducts, direction]);
  const visibleProducts = useMemo(() => {
    const onlineProducts = currentProducts.filter((item) => isOnline(item.status));
    return onlineProducts.length ? onlineProducts : currentProducts;
  }, [currentProducts]);
  const selectedProductId = searchParams.get('product') || visibleProducts[0]?._id || currentProducts[0]?._id || '';
  const selectedProduct =
    currentProducts.find((item) => item._id === selectedProductId) || visibleProducts[0] || currentProducts[0] || null;
  const currentProductItems = useMemo(
    () => allProductItems.filter((item) => item.productId === selectedProduct?._id),
    [allProductItems, selectedProduct]
  );
  const productItemCountByProductId = useMemo(() => {
    const output = new Map<string, number>();
    currentProducts.forEach((product) => {
      if (!product._id) return;
      const selectedCount = Array.isArray(product.selectedAssetIds) ? product.selectedAssetIds.filter(Boolean).length : 0;
      output.set(product._id, selectedCount);
    });
    allProductItems.forEach((item) => {
      if (!item.productId || output.has(item.productId)) return;
      output.set(item.productId, (output.get(item.productId) || 0) + 1);
    });
    return output;
  }, [allProductItems, currentProducts]);

  const frontRows = useMemo(() => buildFrontendRows(page, visibleProducts), [page, visibleProducts]);
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  useEffect(() => {
    if (!requestedPanel) return;
    if (['products', 'items', 'assets', 'entitlements'].includes(requestedPanel)) {
      setWorkspacePanel(requestedPanel);
    }
  }, [requestedPanel]);

  useEffect(() => {
    if (!requestedSection) return;
    if (frontRows.some((item) => item.sectionId === requestedSection)) {
      setEditingSection(requestedSection);
    }
  }, [frontRows, requestedSection]);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取商城内容配置。" />;
  }

  if (pageQuery.isError || assetsQuery.isError || productsQuery.isError || productItemsQuery.isError || entitlementsQuery.isError) {
    return <Result status="error" title="商城内容读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSavePage(nextPage: Record<string, unknown>) {
    await updatePageMutation.mutateAsync(nextPage);
    message.success('商城页面文案已保存');
    setEditingSection(null);
  }

  async function handleSaveAsset(nextAsset: MallAssetRecord) {
    if (editingAsset?._id) {
      await updateAssetMutation.mutateAsync({
        id: editingAsset._id,
        payload: nextAsset as unknown as Record<string, unknown>
      });
      message.success('资料资产已保存');
    } else {
      await createAssetMutation.mutateAsync(nextAsset as unknown as Record<string, unknown>);
      message.success('资料资产已创建');
    }
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallAssets'] });
    setAssetDrawerOpen(false);
    setEditingAsset(null);
    return true;
  }

  async function handleSaveProduct(nextProduct: MallProductRecord) {
    if (editingProduct?._id) {
      await updateProductMutation.mutateAsync({
        id: editingProduct._id,
        payload: nextProduct as unknown as Record<string, unknown>
      });
      return editingProduct._id || '';
    } else {
      const created = await createProductMutation.mutateAsync(nextProduct as unknown as Record<string, unknown>);
      if (created?._id) {
        setSearchParams((current) => {
          const next = new URLSearchParams(current);
          next.set('product', String(created._id));
          return next;
        });
      }
      return created?._id ? String(created._id) : '';
    }
    return '';
  }

  async function syncProductAssets(product: MallProductRecord, selectedAssetIds: string[]) {
    const productId = product._id || '';
    if (!productId) return;

    const normalizedIds = selectedAssetIds.filter(Boolean);
    const assetsById = new Map(allAssets.map((asset) => [asset._id || '', asset]));
    const existingItems = allProductItems.filter((item) => item.productId === productId && item.itemType === 'asset');
    const existingByAssetId = new Map(existingItems.map((item) => [item.itemId, item]));

    for (const item of existingItems) {
      if (item._id && !normalizedIds.includes(item.itemId)) {
        await deleteItemMutation.mutateAsync(item._id);
      }
    }

    for (const [index, assetId] of normalizedIds.entries()) {
      const asset = assetsById.get(assetId);
      if (!asset) continue;
      const existing = existingByAssetId.get(assetId);
      const payload = buildProductItemPayload(product, asset, (index + 1) * 10, existing);
      if (existing?._id) {
        await updateItemMutation.mutateAsync({
          id: existing._id,
          payload: payload as unknown as Record<string, unknown>
        });
      } else {
        await createItemMutation.mutateAsync(payload as unknown as Record<string, unknown>);
      }
    }
  }

  async function handleSaveProductBundle({
    product,
    selectedAssetIds
  }: {
    product: MallProductRecord;
    selectedAssetIds: string[];
  }) {
    const nextProductPayload = {
      ...product,
      selectedAssetIds: selectedAssetIds.filter(Boolean)
    };
    const productId = await handleSaveProduct(nextProductPayload);
    const nextProduct = { ...nextProductPayload, _id: productId || nextProductPayload._id };
    if (nextProduct._id) {
      await syncProductAssets(nextProduct, selectedAssetIds);
    }
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallProducts'] }),
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] }),
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallAssets'] })
    ]);
    setProductDrawerOpen(false);
    setEditingProduct(null);
    message.success(selectedAssetIds.length ? '商品卡和商品包内容已同步保存' : '商品卡已保存，当前还未关联资料资产');
    return true;
  }

  async function handleSaveItem(nextItem: MallProductItemRecord) {
    if (editingItem?._id) {
      await updateItemMutation.mutateAsync({
        id: editingItem._id,
        payload: nextItem as unknown as Record<string, unknown>
      });
      message.success('附属内容项已保存');
    } else {
      await createItemMutation.mutateAsync(nextItem as unknown as Record<string, unknown>);
      message.success('附属内容项已创建');
    }
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] });
    setItemDrawerOpen(false);
    setEditingItem(null);
    return true;
  }

  async function handleDeleteAsset(record: MallAssetRecord) {
    if (!record._id) return;
    const relatedItems = allProductItems.filter((item) => item.itemId === record._id);
    for (const item of relatedItems) {
      if (item._id) {
        await deleteItemMutation.mutateAsync(item._id);
      }
    }
    await deleteAssetMutation.mutateAsync(record._id);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallAssets'] }),
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] })
    ]);
    message.success('资料资产已删除');
  }

  async function handleDeleteProduct(record: MallProductRecord) {
    if (!record._id) return;
    const relatedItems = allProductItems.filter((item) => item.productId === record._id);
    for (const item of relatedItems) {
      if (item._id) {
        await deleteItemMutation.mutateAsync(item._id);
      }
    }
    await deleteProductMutation.mutateAsync(record._id);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallProducts'] }),
      queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] })
    ]);
    if (selectedProduct?._id === record._id) {
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        next.delete('product');
        return next;
      });
    }
    message.success('商品卡已删除');
  }

  async function handleDeleteItem(record: MallProductItemRecord) {
    if (!record._id) return;
    await deleteItemMutation.mutateAsync(record._id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] });
    message.success('附属内容项已删除');
  }

  function focusProduct(productId: string) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set('product', productId);
      return next;
    });
  }

  const sectionColumns: TableProps<MediaFrontendRow>['columns'] = [
    { title: '前台顺序', dataIndex: 'step', width: 110 },
    {
      title: '当前展示块',
      dataIndex: 'title',
      width: 250,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary">{record.location}</Typography.Text>
        </Space>
      )
    },
    { title: '老师现在看到', dataIndex: 'summary', ellipsis: true },
    { title: '点开后会改什么', dataIndex: 'editFields', width: 320 },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      width: 150,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 160,
      fixed: 'right',
      render: (_, record) => {
        if (record.actionType === 'section' && record.sectionId) {
          return <a onClick={() => setEditingSection(record.sectionId || null)}>{record.actionLabel}</a>;
        }

        if (record.actionType === 'product' && record.productId) {
          return (
            <a
              onClick={() => {
                const target = currentProducts.find((item) => item._id === record.productId) || null;
                setEditingProduct(target);
                setProductDrawerOpen(true);
              }}
            >
              {record.actionLabel}
            </a>
          );
        }

        return (
          <a
            onClick={() => {
              setEditingProduct(null);
              setProductDrawerOpen(true);
            }}
          >
            {record.actionLabel}
          </a>
        );
      }
    }
  ];

  const productColumns: TableProps<MallProductRecord>['columns'] = [
    {
      title: '商城商品卡',
      dataIndex: 'productName',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.productName || '未填写商品卡标题'}</Typography.Text>
          <Typography.Text type="secondary">
            {record.coverLabel || '未填封面底部字'} / {record.productSubTitle || '未填写说明'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: '分类 / 阶段',
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text>{getMaterialCategoryLabel(record.categoryKey)}</Typography.Text>
          <Typography.Text type="secondary">{materialStageLabels[record.stage] || record.stage}</Typography.Text>
        </Space>
      )
    },
    {
      title: '封面 / 价格 / 资产数',
      width: 260,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text>{`${record.coverMark || 'A'} / ${record.buttonText || '查看详情'}`}</Typography.Text>
          <Typography.Text type="secondary">{`${formatPrice(record)} ${record.salesLabel ? `/ ${record.salesLabel}` : ''}`}</Typography.Text>
          <Typography.Text type="secondary">{`已组合 ${productItemCountByProductId.get(record._id || '') || 0} 份资料资产`}</Typography.Text>
        </Space>
      )
    },
    {
      title: '状态',
      width: 160,
      render: (_, record) => (
        <Space wrap>
          <Tag color={record.status === 'online' ? 'success' : record.status === 'pending' ? 'warning' : 'default'}>
            {record.status === 'online' ? '已上架' : record.status === 'pending' ? '待审核' : record.status === 'offline' ? '已下架' : '草稿'}
          </Tag>
          {visibleProducts.some((item) => item._id === record._id) ? <Tag color="processing">前台可见</Tag> : null}
        </Space>
      )
    },
    {
      title: '操作',
      key: 'option',
      width: 170,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="manage"
          onClick={() => {
            if (record._id) {
              focusProduct(record._id);
            }
          }}
        >
          管理附属项
        </a>,
        <a
          key="edit"
          onClick={() => {
            setEditingProduct(record);
            setProductDrawerOpen(true);
          }}
        >
          编辑商品包
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这张商品卡吗？"
          onConfirm={() => handleDeleteProduct(record)}
          okButtonProps={{ danger: true }}
          disabled={!auth.permissions.canWrite}
        >
          <a style={{ color: '#cf1322' }}>删除</a>
        </Popconfirm>
      ]
    }
  ];

  const productItemColumns: TableProps<MallProductItemRecord>['columns'] = [
    { title: '排序', dataIndex: 'sortOrder', width: 90 },
    {
      title: '附属内容项',
      dataIndex: 'displayName',
      width: 320,
      render: (_, record) => {
        const asset = allAssets.find((item) => item._id === record.itemId);
        return (
          <Space direction="vertical" size={2}>
            <Typography.Text strong>{asset?.title || record.displayName || '未填写内容项标题'}</Typography.Text>
            <Typography.Text type="secondary">
              {asset?.assetType || record.displayType || '资料'} / {asset?.subTitle || record.displaySubTitle || '未填写副标题'}
            </Typography.Text>
            <Typography.Text type="secondary">关联资料：{asset?.title || '未关联'}</Typography.Text>
          </Space>
        );
      }
    },
    {
      title: '预览',
      width: 140,
      render: (_, record) => <Tag color={record.previewEnabled ? 'success' : 'default'}>{record.previewEnabled ? `预览 ${record.previewPageCount} 页` : '不允许预览'}</Tag>
    },
    {
      title: '说明',
      dataIndex: 'displayDescription',
      ellipsis: true
    },
    {
      title: '操作',
      key: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            focusProduct(record.productId);
            setEditingItem(record);
            setItemDrawerOpen(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这条附属内容项吗？"
          onConfirm={() => handleDeleteItem(record)}
          okButtonProps={{ danger: true }}
          disabled={!auth.permissions.canWrite}
        >
          <a style={{ color: '#cf1322' }}>删除</a>
        </Popconfirm>
      ]
    }
  ];

  const assetColumns: TableProps<MallAssetRecord>['columns'] = [
    {
      title: '资料资产',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title || '未填写资料标题'}</Typography.Text>
          <Typography.Text type="secondary">
            {record.assetType || '资料'} / {record.subTitle || '未填写副标题'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: '阶段 / 预览',
      width: 160,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text>{materialStageLabels[record.stage] || record.stage}</Typography.Text>
          <Typography.Text type="secondary">{record.previewEnabled ? `${record.previewPageCount} 页` : '关闭预览'}</Typography.Text>
        </Space>
      )
    },
    {
      title: '来源信息',
      dataIndex: 'pdfKey',
      ellipsis: true,
      render: (_, record) => record.pdfKey || record.pdfUrl || '还没接腾讯云 PDF'
    },
    {
      title: '状态',
      width: 120,
      render: (_, record) => (
        <Tag color={record.status === 'online' ? 'success' : record.status === 'pending' ? 'warning' : 'default'}>
          {record.status === 'online' ? '已上架' : record.status === 'pending' ? '待审核' : record.status === 'offline' ? '已下架' : record.status === 'archived' ? '已归档' : '草稿'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'option',
      width: 140,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setEditingAsset(record);
            setAssetDrawerOpen(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这份资料资产吗？"
          onConfirm={() => handleDeleteAsset(record)}
          okButtonProps={{ danger: true }}
          disabled={!auth.permissions.canWrite}
        >
          <a style={{ color: '#cf1322' }}>删除</a>
        </Popconfirm>
      ]
    }
  ];

  const entitlementColumns: TableProps<ReturnType<typeof normalizeMallEntitlement>>['columns'] = [
    {
      title: '领取用户',
      dataIndex: 'userId',
      width: 200,
      render: (value) => value || '匿名用户'
    },
    {
      title: '对应商品',
      width: 280,
      render: (_, record) => {
        const product = allProducts.find((item) => item._id === record.productId);
        return product?.productName || record.productId || '未找到商品';
      }
    },
    {
      title: '权益来源',
      width: 160,
      render: (_, record) => `${record.entitlementType} / ${record.sourceType}`
    },
    {
      title: '状态',
      width: 120,
      render: (_, record) => {
        const status = formatEntitlementStatus(record.status);
        return <Tag color={status.color}>{status.label}</Tag>;
      }
    },
    {
      title: '创建时间',
      width: 180,
      render: (_, record) => formatDateTime(record.createdAt)
    }
  ];

  const workspacePanelOptions = [
    { label: `商品卡 ${currentProducts.length}`, value: 'products' as const },
    { label: `附属项 ${currentProductItems.length}`, value: 'items' as const },
    { label: `资料资产 ${currentAssets.length}`, value: 'assets' as const },
    { label: `权益记录 ${entitlementCount}`, value: 'entitlements' as const }
  ];

  const workspaceAction = (() => {
    if (workspacePanel === 'products') {
      return (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!auth.permissions.canWrite}
          onClick={() => {
            setEditingProduct(null);
            setProductDrawerOpen(true);
          }}
        >
          新建商品卡
        </Button>
      );
    }

    if (workspacePanel === 'items') {
      return (
        <Space wrap>
          <Select
            style={{ minWidth: 260 }}
            placeholder="先选择要维护的商品卡"
            value={selectedProduct?._id}
            options={currentProducts.map((item) => ({
              label: item.productName || item._id || '未命名商品卡',
              value: item._id
            }))}
            onChange={(value) =>
              setSearchParams((current) => {
                const next = new URLSearchParams(current);
                next.set('product', String(value));
                return next;
              })
            }
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.permissions.canWrite || !selectedProduct?._id}
            onClick={() => {
              if (!selectedProduct?._id) {
                message.warning('请先选择一张商品卡。');
                return;
              }
              setEditingItem({
                ...defaultMallProductItem,
                direction,
                productId: selectedProduct._id
              });
              setItemDrawerOpen(true);
            }}
          >
            新增附属项
          </Button>
        </Space>
      );
    }

    if (workspacePanel === 'assets') {
      return (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={!auth.permissions.canWrite}
          onClick={() => {
            setEditingAsset({
              ...defaultMallAsset,
              direction
            });
            setAssetDrawerOpen(true);
          }}
        >
          新增资料资产
        </Button>
      );
    }

    return null;
  })();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">商城业务主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              这一页只按当前商城真实显示顺序来维护
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              除了 LOGO 和学科切换这种全局壳子，老师现在看到的每一行，都对应商城页里实际会出现的一块内容或一张商品卡。
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space wrap>
              <Segmented
                value={direction}
                options={[
                  { label: '高数商城', value: 'math' },
                  { label: '医护商城', value: 'medical' }
                ]}
                onChange={(value) =>
                  setSearchParams((current) => {
                    const next = new URLSearchParams(current);
                    next.set('subject', String(value));
                    next.delete('product');
                    return next;
                  })
                }
              />
            </Space>
            <Space wrap>
              <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
                {auth.permissions.canWrite ? '可直接保存' : '当前只读'}
              </Tag>
              <Tag>{`最近更新 ${lastUpdated}`}</Tag>
            </Space>
          </Space>
          <div className="page-location-strip">
            <Tag bordered={false} color="processing">{`当前位置 商城 / ${materialDirectionLabels[direction]}视角`}</Tag>
            <Typography.Text type="secondary">主表只看前台真实顺序，商品卡、资产和权益放到下面分段工作台。</Typography.Text>
          </div>

          <div className="home-workspace-compact-bar">
            <Typography.Text>当前维护：{materialDirectionLabels[direction]}</Typography.Text>
            <Typography.Text>前台可见商品卡：{visibleProducts.length}</Typography.Text>
            <Typography.Text>资料资产：{currentAssets.length}</Typography.Text>
            <Typography.Text>权益记录：{entitlementCount}</Typography.Text>
            <Typography.Text>建议顺序：先改标题分类，再改商品卡</Typography.Text>
          </div>

          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第一步</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 6, marginBottom: 6 }}>
                先改页面抬头和分类
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
                先把商城主标题和那一排分类按钮改对，老师再去改单张商品卡会更不容易迷路。
              </Typography.Paragraph>
              <Button type="link" style={{ paddingInline: 0 }} onClick={() => setEditingSection('hero')}>
                先从第 1 行开始
              </Button>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第二步</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 6, marginBottom: 6 }}>
                再逐张改前台商品卡
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
                商品卡里改的是学生会直接看到的标题、说明、价格、销量字和按钮字。
              </Typography.Paragraph>
              <Button type="link" style={{ paddingInline: 0 }} onClick={() => setWorkspacePanel('products')}>
                打开商品卡工作台
              </Button>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第三步</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 6, marginBottom: 6 }}>
                资料资产留在后面批量维护
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
                资料资产更像仓库，适合先准备 PDF、预览页数和云端 Key，再回到商品卡做关联。
              </Typography.Paragraph>
              <Button type="link" style={{ paddingInline: 0 }} onClick={() => setWorkspacePanel('assets')}>
                打开资料资产库
              </Button>
            </div>
          </div>
        </Space>
      </Card>

      <Card
        className="home-workspace-card"
        title="商城真实显示总表"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => setEditingSection('hero')}
          >
            从第 1 行开始修改
          </Button>
        }
      >
        <Table<MediaFrontendRow>
          rowKey="id"
          loading={pageQuery.isLoading || assetsQuery.isLoading || productsQuery.isLoading}
          columns={sectionColumns}
          dataSource={frontRows}
          pagination={false}
          scroll={{ x: 1040 }}
        />
      </Card>

      <Card
        className="home-workspace-card"
        title="商城业务工作台"
        extra={
          <Space wrap>
            <Segmented options={workspacePanelOptions} value={workspacePanel} onChange={(value) => setWorkspacePanel(value as MediaWorkspacePanel)} />
            {workspaceAction}
          </Space>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {workspacePanel === 'products' ? (
            <>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                这里管理的是商城主列表里直接展示的商品卡。老师在商品卡里可以直接挑选资料资产组成商品包，保存后前端会按同一组数据同步更新。
              </Typography.Paragraph>
              <Table<MallProductRecord>
                rowKey={(record) => record._id || `${record.direction}-${record.stage}-${record.sortOrder}`}
                loading={productsQuery.isLoading}
                columns={productColumns}
                dataSource={currentProducts}
                pagination={false}
                scroll={{ x: 1080 }}
                locale={{ emptyText: '当前学科还没有商品卡' }}
              />
            </>
          ) : null}

          {workspacePanel === 'items' ? (
            <>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                这里展示的是当前商品包里已经勾选的资料资产顺序。老师通常不需要单独改这一层，优先在“商品卡”里直接勾选资产就够了。
              </Typography.Paragraph>
              <Table<MallProductItemRecord>
                rowKey={(record) => record._id || `${record.productId}-${record.itemId}-${record.sortOrder}`}
                loading={productItemsQuery.isLoading}
                columns={productItemColumns}
                dataSource={currentProductItems}
                pagination={false}
                scroll={{ x: 1020 }}
                locale={{ emptyText: selectedProduct ? '当前商品卡下还没有附属内容项' : '请先创建或选择一张商品卡' }}
              />
            </>
          ) : null}

          {workspacePanel === 'assets' ? (
            <Table<MallAssetRecord>
              rowKey={(record) => record._id || `${record.direction}-${record.stage}-${record.sortOrder}-${record.title}`}
              loading={assetsQuery.isLoading}
              columns={assetColumns}
              dataSource={currentAssets}
              pagination={false}
              scroll={{ x: 1060 }}
              locale={{ emptyText: '当前学科还没有资料资产' }}
            />
          ) : null}

          {workspacePanel === 'entitlements' ? (
            <Table
              rowKey={(record) => record._id || `${record.userId}-${record.productId}-${record.createdAt || 'unknown'}`}
              loading={entitlementsQuery.isLoading}
              columns={entitlementColumns}
              dataSource={allEntitlements.slice(0, 10)}
              pagination={false}
              scroll={{ x: 940 }}
              locale={{ emptyText: '当前还没有用户权益记录' }}
            />
          ) : null}
        </Space>
      </Card>

      <Suspense
        fallback={
          <Card className="home-workspace-card">
            <div className="center-screen" style={{ minHeight: 240 }}>
              <Spin size="large" />
            </div>
          </Card>
        }
      >
        <MediaSectionEditorDrawer
          open={Boolean(editingSection)}
          sectionId={editingSection}
          page={page}
          saving={updatePageMutation.isPending}
          canWrite={auth.permissions.canWrite}
          onClose={() => {
            setEditingSection(null);
            setSearchParams((current) => {
              const next = new URLSearchParams(current);
              next.delete('section');
              return next;
            });
          }}
          onSave={async (payload) => handleSavePage(payload as unknown as Record<string, unknown>)}
        />
        <MediaPackageEditorDrawer
          open={productDrawerOpen}
          record={editingProduct}
          direction={direction}
          stage={editingProduct?.stage || selectedProduct?.stage || 'foundation'}
          assetOptions={currentAssets}
          selectedAssetIds={
            editingProduct?._id
              ? editingProduct.selectedAssetIds.length
                ? editingProduct.selectedAssetIds
                : allProductItems
                    .filter((item) => item.productId === editingProduct._id && item.itemType === 'asset')
                    .map((item) => item.itemId)
              : []
          }
          onOpenChange={(open) => {
            setProductDrawerOpen(open);
            if (!open) {
              setEditingProduct(null);
            }
          }}
          onSubmit={handleSaveProductBundle}
        />
        <MediaItemEditorDrawer
          open={itemDrawerOpen}
          record={editingItem}
          productId={editingItem?.productId || selectedProduct?._id || ''}
          direction={direction}
          assetOptions={currentAssets}
          onOpenChange={(open) => {
            setItemDrawerOpen(open);
            if (!open) {
              setEditingItem(null);
            }
          }}
          onSubmit={handleSaveItem}
        />
        <MediaAssetEditorDrawer
          open={assetDrawerOpen}
          record={editingAsset}
          direction={direction}
          stage={editingAsset?.stage || selectedProduct?.stage || 'foundation'}
          onOpenChange={(open) => {
            setAssetDrawerOpen(open);
            if (!open) {
              setEditingAsset(null);
            }
          }}
          onSubmit={handleSaveAsset}
        />
      </Suspense>
    </Space>
  );
}

export default MediaContentPage;
