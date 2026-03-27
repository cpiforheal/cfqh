import { lazy, Suspense, useMemo, useState } from 'react';
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
  defaultMallProductItem,
  materialDirectionLabels,
  materialStageLabels,
  mediaSectionModels,
  normalizeMallAsset,
  normalizeMallEntitlement,
  normalizeMallProduct,
  normalizeMallProductItem,
  normalizeMaterialsPage,
  readMaterialDirection,
  readMaterialStage,
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

type MediaSectionRow = {
  id: MaterialSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
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

function buildSectionRows(
  page: ReturnType<typeof normalizeMaterialsPage>,
  featuredProduct: MallProductRecord | null,
  featuredItems: MallProductItemRecord[]
): MediaSectionRow[] {
  return mediaSectionModels.map((section) => {
    if (section.id === 'header') {
      const ready = Boolean(page.header.title && page.header.searchLabel);
      return {
        ...section,
        summary: `${page.header.title || '未填写标题'} / 搜索提示：${page.header.searchLabel || '未填写'}`,
        editFields: '页面标题、搜索提示',
        statusLabel: ready ? '顶部已完整' : '建议补齐顶部文案',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'stageTabs') {
      const ready = page.stageTabs.length >= 3 && page.stageTabs.every((item) => item.label);
      return {
        ...section,
        summary: page.stageTabs.map((item) => item.label).join(' / ') || '还没有配置阶段按钮',
        editFields: '3 个阶段按钮名称',
        statusLabel: ready ? '阶段按钮已完整' : `已配置 ${page.stageTabs.length}/3`,
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'package') {
      const ready = Boolean(
        page.mainSection.title &&
          page.mainSection.sideNote &&
          featuredProduct?.productName &&
          featuredProduct?.productSubTitle &&
          featuredProduct?.productDescription
      );
      return {
        ...section,
        summary: featuredProduct
          ? `${page.mainSection.title || '未填写区块标题'} / ${featuredProduct.productName}`
          : `${page.mainSection.title || '未填写区块标题'} / 当前学科阶段还没有主推商品`,
        editFields: '主推区标题、右侧提示、商品标题、简介、价格与状态',
        statusLabel: ready ? '主推商品已完整' : featuredProduct ? '建议补齐主推商品信息' : '建议先创建商品',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'items') {
      const ready =
        Boolean(page.shelfSection.title && page.shelfSection.hint) &&
        featuredItems.length > 0 &&
        featuredItems.every((item) => item.displayName && item.displaySubTitle);
      return {
        ...section,
        summary: featuredItems.length
          ? `${page.shelfSection.title || '未填写内容区标题'} / ${featuredItems.length} 个内容项`
          : `${page.shelfSection.title || '未填写内容区标题'} / 当前商品还没有挂内容项`,
        editFields: '内容区标题、右侧提示、内容项标题、副标题、预览说明',
        statusLabel: ready ? `内容项 ${featuredItems.length} 个` : '建议先补 1 个内容项',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    const ready = Boolean(page.consultBar.title && page.consultBar.desc && page.consultBar.buttonText);
    return {
      ...section,
      summary: `${page.consultBar.title || '未填写标题'} / ${page.consultBar.buttonText || '未填写按钮'}`,
      editFields: '咨询标题、说明、按钮文案',
      statusLabel: ready ? '咨询条已完整' : '建议补齐咨询文案',
      statusTone: ready ? 'success' : 'warning'
    };
  });
}

function formatEntitlementStatus(status: string) {
  if (status === 'expired') return { label: '已过期', color: 'warning' as const };
  if (status === 'revoked') return { label: '已撤销', color: 'error' as const };
  return { label: '生效中', color: 'success' as const };
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

  const direction = readMaterialDirection(searchParams.get('subject'));
  const stage = readMaterialStage(searchParams.get('stage'));

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

  const currentAssets = useMemo(
    () => allAssets.filter((item) => item.direction === direction && item.stage === stage),
    [allAssets, direction, stage]
  );
  const currentProducts = useMemo(
    () => allProducts.filter((item) => item.direction === direction && item.stage === stage),
    [allProducts, direction, stage]
  );
  const onlineProducts = useMemo(
    () => currentProducts.filter((item) => isOnline(item.status)),
    [currentProducts]
  );
  const featuredProduct = onlineProducts[0] || currentProducts[0] || null;
  const selectedProductId = searchParams.get('product') || featuredProduct?._id || '';
  const selectedProduct =
    currentProducts.find((item) => item._id === selectedProductId) || featuredProduct || currentProducts[0] || null;
  const currentProductItems = useMemo(
    () => allProductItems.filter((item) => item.productId === selectedProduct?._id),
    [allProductItems, selectedProduct]
  );

  const sections = useMemo(
    () => buildSectionRows(page, featuredProduct, currentProductItems),
    [page, featuredProduct, currentProductItems]
  );
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

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
      message.success('商品已保存');
    } else {
      const created = await createProductMutation.mutateAsync(nextProduct as unknown as Record<string, unknown>);
      if (created?._id) {
        setSearchParams((current) => {
          const next = new URLSearchParams(current);
          next.set('product', String(created._id));
          return next;
        });
      }
      message.success('商品已创建');
    }
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProducts'] });
    setProductDrawerOpen(false);
    setEditingProduct(null);
    return true;
  }

  async function handleSaveItem(nextItem: MallProductItemRecord) {
    if (editingItem?._id) {
      await updateItemMutation.mutateAsync({
        id: editingItem._id,
        payload: nextItem as unknown as Record<string, unknown>
      });
      message.success('商品内容项已保存');
    } else {
      await createItemMutation.mutateAsync(nextItem as unknown as Record<string, unknown>);
      message.success('商品内容项已创建');
    }
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] });
    setItemDrawerOpen(false);
    setEditingItem(null);
    return true;
  }

  async function handleDeleteAsset(record: MallAssetRecord) {
    if (!record._id) return;
    await deleteAssetMutation.mutateAsync(record._id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallAssets'] });
    message.success('资料资产已删除');
  }

  async function handleDeleteProduct(record: MallProductRecord) {
    if (!record._id) return;
    await deleteProductMutation.mutateAsync(record._id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProducts'] });
    if (selectedProduct?._id === record._id) {
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        next.delete('product');
        return next;
      });
    }
    message.success('商品已删除');
  }

  async function handleDeleteItem(record: MallProductItemRecord) {
    if (!record._id) return;
    await deleteItemMutation.mutateAsync(record._id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'mallProductItems'] });
    message.success('商品内容项已删除');
  }

  const sectionColumns: TableProps<MediaSectionRow>['columns'] = [
    { title: '前台顺序', dataIndex: 'step', width: 108 },
    {
      title: '前台区块',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary">{record.desc}</Typography.Text>
        </Space>
      )
    },
    { title: '前台位置', dataIndex: 'location', width: 180 },
    { title: '老师当前会看到', dataIndex: 'summary', ellipsis: true },
    { title: '点开后会改什么', dataIndex: 'editFields', width: 260 },
    {
      title: '完成状态',
      dataIndex: 'statusLabel',
      width: 170,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => [
        record.id === 'package' ? (
          <a key="package-section" onClick={() => setEditingSection('package')}>
            编辑区块
          </a>
        ) : null,
        record.id === 'package' ? (
          <a
            key="package-card"
            onClick={() => {
              setEditingProduct(featuredProduct);
              setProductDrawerOpen(true);
            }}
          >
            {featuredProduct ? '编辑主推商品' : '新建商品'}
          </a>
        ) : null,
        record.id === 'items' ? (
          <a key="items-section" onClick={() => setEditingSection('items')}>
            编辑区块
          </a>
        ) : null,
        record.id === 'items' ? (
          <a
            key="items-card"
            onClick={() => {
              if (!selectedProduct?._id) {
                message.warning('请先创建或选择一个商品，再添加商品内容项。');
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
            新增内容项
          </a>
        ) : null,
        record.id !== 'package' && record.id !== 'items' ? (
          <a key="edit" onClick={() => setEditingSection(record.id)}>
            编辑
          </a>
        ) : null
      ]
    }
  ];

  const productColumns: TableProps<MallProductRecord>['columns'] = [
    {
      title: '商品',
      dataIndex: 'productName',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.productName || '未填写商品标题'}</Typography.Text>
          <Typography.Text type="secondary">
            {record.badge || '未填写角标'} / {record.productSubTitle || '未填写适合对象'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: '类型 / 价格',
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text>{record.productType}</Typography.Text>
          <Typography.Text type="secondary">{formatPrice(record)}</Typography.Text>
        </Space>
      )
    },
    {
      title: '摘要',
      dataIndex: 'productDescription',
      ellipsis: true
    },
    {
      title: '状态',
      width: 140,
      render: (_, record) => (
        <Space wrap>
          <Tag color={record.status === 'online' ? 'success' : record.status === 'pending' ? 'warning' : 'default'}>
            {record.status === 'online' ? '已上架' : record.status === 'pending' ? '待审核' : record.status === 'offline' ? '已下架' : '草稿'}
          </Tag>
          {featuredProduct?._id === record._id ? <Tag color="processing">当前主推</Tag> : null}
        </Space>
      )
    },
    {
      title: '操作',
      key: 'option',
      width: 180,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="manage"
          onClick={() =>
            setSearchParams((current) => {
              const next = new URLSearchParams(current);
              next.set('product', record._id || '');
              return next;
            })
          }
        >
          管理内容
        </a>,
        <a
          key="edit"
          onClick={() => {
            setEditingProduct(record);
            setProductDrawerOpen(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这个商品吗？"
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
    {
      title: '排序',
      dataIndex: 'sortOrder',
      width: 90
    },
    {
      title: '商品内容项',
      dataIndex: 'displayName',
      width: 320,
      render: (_, record) => {
        const asset = allAssets.find((item) => item._id === record.itemId);
        return (
          <Space direction="vertical" size={2}>
            <Typography.Text strong>{record.displayName || '未填写内容标题'}</Typography.Text>
            <Typography.Text type="secondary">
              {record.displayType || '资料'} / {record.displaySubTitle || '未填写副标题'}
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
      title: '简介',
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
            setEditingItem(record);
            setItemDrawerOpen(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这个内容项吗？"
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
      title: '预览',
      width: 140,
      render: (_, record) => <Tag color={record.previewEnabled ? 'success' : 'default'}>{record.previewEnabled ? `${record.previewPageCount} 页` : '关闭'}</Tag>
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

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">商城业务主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先选学科和阶段，再按“区块、商品、内容项、资料资产”顺序维护
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              小程序前端展示先保持不变，3200 后台先把商城底层换成资料资产、商品、内容项和权益四层结构。
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
              <Segmented
                value={stage}
                options={page.stageTabs.map((item) => ({ label: item.label, value: item.key }))}
                onChange={(value) =>
                  setSearchParams((current) => {
                    const next = new URLSearchParams(current);
                    next.set('stage', String(value));
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

          <Space wrap size="middle">
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">你当前正在维护</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {materialDirectionLabels[direction]} · {materialStageLabels[stage]}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">主推商品数</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {currentProducts.length}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">资料资产数</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {currentAssets.length}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">权益记录</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {entitlementCount}
              </Typography.Title>
            </div>
            <div className="home-workspace-tip">
              <Typography.Text strong>老师操作顺序</Typography.Text>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                先建资料资产，再建商品，然后给商品挂内容项。前台会优先展示当前阶段排序最靠前且已上架的商品。
              </Typography.Paragraph>
            </div>
          </Space>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            理解方式很简单：前台主卡来自“商品”，下面的资料卡来自“商品内容项”，而真正的 PDF 和封面沉淀在“资料资产库”。
          </Typography.Paragraph>
        </Space>
      </Card>

      <Card
        className="home-workspace-card"
        title="商城关键区块"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => setEditingSection('header')}
          >
            从顶部开始编辑
          </Button>
        }
      >
        <Table<MediaSectionRow>
          rowKey="id"
          loading={pageQuery.isLoading || assetsQuery.isLoading || productsQuery.isLoading || productItemsQuery.isLoading}
          columns={sectionColumns}
          dataSource={sections}
          pagination={false}
          scroll={{ x: 1120 }}
        />
      </Card>

      <Card
        className="home-workspace-card"
        title="当前阶段商品"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => {
              setEditingProduct(null);
              setProductDrawerOpen(true);
            }}
          />
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            小程序主卡会优先取当前学科和阶段中“排序最靠前且已上架”的商品。需要精简时，只保留 1 个在架商品最稳妥。
          </Typography.Paragraph>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => {
              setEditingProduct(null);
              setProductDrawerOpen(true);
            }}
          >
            新建商品
          </Button>
          <Table<MallProductRecord>
            rowKey={(record) => record._id || `${record.direction}-${record.stage}-${record.sortOrder}`}
            loading={productsQuery.isLoading}
            columns={productColumns}
            dataSource={currentProducts}
            pagination={false}
            scroll={{ x: 1080 }}
            locale={{ emptyText: '当前学科和阶段还没有商品' }}
          />
        </Space>
      </Card>

      <Card
        className="home-workspace-card"
        title="当前商品内容项"
        extra={
          <Space wrap>
            <Select
              style={{ minWidth: 260 }}
              placeholder="先选择要维护的商品"
              value={selectedProduct?._id}
              options={currentProducts.map((item) => ({
                label: item.productName || item._id || '未命名商品',
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
                  message.warning('请先选择一个商品。');
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
              新增内容项
            </Button>
          </Space>
        }
      >
        <Table<MallProductItemRecord>
          rowKey={(record) => record._id || `${record.productId}-${record.itemId}-${record.sortOrder}`}
          loading={productItemsQuery.isLoading}
          columns={productItemColumns}
          dataSource={currentProductItems}
          pagination={false}
          scroll={{ x: 1020 }}
          locale={{ emptyText: selectedProduct ? '当前商品还没有内容项' : '请先创建或选择一个商品' }}
        />
      </Card>

      <Card
        className="home-workspace-card"
        title="资料资产库"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => {
              setEditingAsset({
                ...defaultMallAsset,
                direction,
                stage
              });
              setAssetDrawerOpen(true);
            }}
          >
            新增资料资产
          </Button>
        }
      >
        <Table<MallAssetRecord>
          rowKey={(record) => record._id || `${record.direction}-${record.stage}-${record.sortOrder}-${record.title}`}
          loading={assetsQuery.isLoading}
          columns={assetColumns}
          dataSource={currentAssets}
          pagination={false}
          scroll={{ x: 1060 }}
          locale={{ emptyText: '当前学科和阶段还没有资料资产' }}
        />
      </Card>

      <Card className="home-workspace-card" title="最近权益记录">
        <Table
          rowKey={(record) => record._id || `${record.userId}-${record.productId}-${record.createdAt || 'unknown'}`}
          loading={entitlementsQuery.isLoading}
          columns={entitlementColumns}
          dataSource={allEntitlements.slice(0, 10)}
          pagination={false}
          scroll={{ x: 940 }}
          locale={{ emptyText: '当前还没有用户权益记录' }}
        />
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
          onClose={() => setEditingSection(null)}
          onSave={async (payload) => handleSavePage(payload as unknown as Record<string, unknown>)}
        />
        <MediaPackageEditorDrawer
          open={productDrawerOpen}
          record={editingProduct}
          direction={direction}
          stage={stage}
          onOpenChange={(open) => {
            setProductDrawerOpen(open);
            if (!open) {
              setEditingProduct(null);
            }
          }}
          onSubmit={handleSaveProduct}
        />
        <MediaItemEditorDrawer
          open={itemDrawerOpen}
          record={editingItem}
          productId={selectedProduct?._id || editingItem?.productId || ''}
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
          stage={stage}
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
