import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  App,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Modal,
  Result,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
  type TablePaginationConfig
} from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import type { DirectionFormValues, DirectionRecord } from './directions/types';
import {
  compactSearchParams,
  formatDateTime,
  matchesKeyword,
  normalizeKeyword,
  paginate,
  scheduleIdleTask,
  stableRowKey,
  toStringArray
} from '../utils';

const DirectionsEditorDrawer = lazy(() =>
  import('./directions/DirectionsEditorDrawer').then((module) => ({ default: module.DirectionsEditorDrawer }))
);
const RecordPreviewDrawer = lazy(() =>
  import('../components/RecordPreviewDrawer').then((module) => ({ default: module.RecordPreviewDrawer }))
);

type DirectionsPageProps = {
  auth: AuthState;
};

type SortState = {
  field: string;
  order: SortOrder;
};

const featuredOptions = [
  { label: '全部', value: '' },
  { label: '精选', value: 'true' },
  { label: '普通', value: 'false' }
];

function preloadDirectionsEditorDrawer() {
  return import('./directions/DirectionsEditorDrawer');
}

function preloadRecordPreviewDrawer() {
  return import('../components/RecordPreviewDrawer');
}

export function DirectionsPage({ auth }: DirectionsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [filterForm] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editingRecord, setEditingRecord] = useState<DirectionRecord | null>(null);
  const [detailRecord, setDetailRecord] = useState<DirectionRecord | null>(null);
  const [sortState, setSortState] = useState<SortState>({ field: 'sort', order: 'ascend' });

  const keyword = searchParams.get('keyword') || '';
  const status = searchParams.get('status') || '';
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') || '';
  const current = Math.max(1, Number(searchParams.get('page') || 1));
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') || 10));

  const pageQuery = useQuery({
    queryKey: ['page', 'courses'],
    queryFn: () => api.getPage('courses')
  });

  const directionsQuery = useQuery({
    queryKey: ['collection', 'directions'],
    queryFn: () => api.listCollection('directions')
  });

  const createMutation = useMutation({
    mutationFn: (payload: DirectionRecord) => api.createCollectionItem('directions', payload)
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DirectionRecord }) =>
      api.updateCollectionItem('directions', id, payload)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('directions', id)
  });

  const categories = useMemo(() => {
    const items = Array.isArray(directionsQuery.data) ? directionsQuery.data : [];
    return [...new Set(items.map((item) => String(item.category || '')).filter(Boolean))];
  }, [directionsQuery.data]);

  useEffect(() => {
    filterForm.setFieldsValue({
      keyword,
      status,
      category,
      featured
    });
  }, [category, featured, filterForm, keyword, status]);

  useEffect(() => {
    return scheduleIdleTask(() => {
      void queryClient.prefetchQuery({
        queryKey: ['template', 'directions'],
        queryFn: () => api.getCollectionTemplate('directions'),
        staleTime: 5 * 60_000
      });
    });
  }, [queryClient]);

  const filteredItems = useMemo(() => {
    const items = directionsQuery.data || [];
    const keywordValue = normalizeKeyword(keyword);
    return items
      .filter((item) => matchesKeyword(item, keywordValue, ['name', 'slug', 'category', 'summary', 'audience']))
      .filter((item) => (!status ? true : String(item.status || '') === status))
      .filter((item) => (!category ? true : String(item.category || '') === category))
      .filter((item) => {
        if (!featured) return true;
        return String(Boolean(item.isFeatured)) === featured;
      })
      .sort((left, right) => {
        const multiplier = sortState.order === 'descend' ? -1 : 1;
        if (sortState.field === 'updatedAt') {
          const leftTime = new Date(String(left.updatedAt || left._updatedAt || left.createdAt || 0)).getTime();
          const rightTime = new Date(String(right.updatedAt || right._updatedAt || right.createdAt || 0)).getTime();
          return (leftTime - rightTime) * multiplier;
        }
        return (Number(left.sort || 0) - Number(right.sort || 0)) * multiplier;
      });
  }, [category, directionsQuery.data, featured, keyword, sortState.field, sortState.order, status]);

  const pagedItems = useMemo(() => paginate(filteredItems, current, pageSize), [current, filteredItems, pageSize]);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取帖子模块内容。" />;
  }

  if (pageQuery.isError || directionsQuery.isError) {
    return <Result status="error" title="帖子数据读取失败" subTitle="请稍后刷新重试，或检查当前云端数据服务是否可用。" />;
  }

  const columns: TableColumnsType<DirectionRecord> = [
    {
      title: '名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 240,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{String(record.name || '未命名帖子')}</Typography.Text>
          <Typography.Text type="secondary">{String(record.slug || record._id || '')}</Typography.Text>
        </Space>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 140
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (_, record) =>
        String(record.status || '') === 'published' ? <Tag color="success">已发布</Tag> : <Tag>草稿</Tag>
    },
    {
      title: '精选',
      dataIndex: 'featured',
      width: 120,
      render: (_, record) =>
        record.isFeatured ? <Tag color="gold">精选推荐</Tag> : <Tag bordered={false}>普通</Tag>
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
      sorter: true,
      sortOrder: sortState.field === 'sort' ? sortState.order : null
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
      sorter: true,
      sortOrder: sortState.field === 'updatedAt' ? sortState.order : null,
      render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt || record._createdAt)
    },
    {
      title: '操作',
      key: 'option',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space size={12}>
          <Button
            type="link"
            size="small"
            onMouseEnter={() => {
              void preloadRecordPreviewDrawer();
            }}
            onFocus={() => {
              void preloadRecordPreviewDrawer();
            }}
            onClick={() => {
              void preloadRecordPreviewDrawer();
              setDetailRecord(record);
            }}
          >
            查看
          </Button>
          {auth.permissions.canWrite ? (
            <Button
              type="link"
              size="small"
              onMouseEnter={() => {
                void preloadDirectionsEditorDrawer();
              }}
              onFocus={() => {
                void preloadDirectionsEditorDrawer();
              }}
              onClick={() => {
                void preloadDirectionsEditorDrawer();
                setDrawerMode('edit');
                setEditingRecord(record);
                setDrawerOpen(true);
              }}
            >
              编辑
            </Button>
          ) : null}
          {auth.permissions.canWrite ? (
            <Button
              type="link"
              size="small"
              onClick={async () => {
                const payload = {
                  ...record,
                  _id: '',
                  name: `${String(record.name || '未命名帖子')}（复制）`,
                  status: 'draft'
                };
                await api.createCollectionItem('directions', payload);
                message.success('已复制为新的草稿帖子');
                await refreshDirectionsTable();
              }}
            >
              复制
            </Button>
          ) : null}
          {auth.permissions.canWrite ? (
            <Button type="link" danger size="small" onClick={() => handleDelete(record)}>
              删除
            </Button>
          ) : null}
        </Space>
      )
    }
  ];

  async function openCreateDrawer() {
    void preloadDirectionsEditorDrawer();
    const template = await queryClient.fetchQuery({
      queryKey: ['template', 'directions'],
      queryFn: () => api.getCollectionTemplate('directions'),
      staleTime: 5 * 60_000
    });
    setDrawerMode('create');
    setEditingRecord(template);
    setDrawerOpen(true);
  }

  async function refreshDirectionsTable() {
    await directionsQuery.refetch();
  }

  async function handleDelete(record: DirectionRecord) {
    const itemId = String(record._id || '');
    if (!itemId) return;

    Modal.confirm({
      title: `删除 ${String(record.name || '这条帖子')}？`,
      content: '删除后不可恢复，建议先确认该内容不再被首页或页面引用。',
      okButtonProps: { danger: true },
      okText: '确认删除',
      cancelText: '取消',
      onOk: async () => {
        await deleteMutation.mutateAsync(itemId);
        message.success('帖子已删除');
        await refreshDirectionsTable();
      }
    });
  }

  async function handleSubmit(values: DirectionFormValues) {
    const base = editingRecord || {};
    const payload: DirectionRecord = {
      ...base,
      ...values,
      features: toStringArray(values.featuresText),
      chips: toStringArray(values.chipsText)
    };
    delete payload.featuresText;
    delete payload.chipsText;

    if (drawerMode === 'create') {
      payload._id = '';
      await createMutation.mutateAsync(payload);
      message.success('帖子已创建');
    } else {
      const itemId = String(base._id || '');
      await updateMutation.mutateAsync({ id: itemId, payload });
      message.success('帖子已保存');
    }

    setDrawerOpen(false);
    setEditingRecord(null);
    await refreshDirectionsTable();
    return true;
  }

  function applyFilters(values: Record<string, unknown>) {
    setSearchParams(
      compactSearchParams(searchParams, {
        keyword: String(values.keyword || ''),
        status: String(values.status || ''),
        category: String(values.category || ''),
        featured: String(values.featured || ''),
        page: 1
      })
    );
  }

  function handleTableChange(pagination: TablePaginationConfig, _: unknown, sorter: unknown) {
    const nextPage = pagination.current || 1;
    const nextPageSize = pagination.pageSize || pageSize;
    setSearchParams(compactSearchParams(searchParams, { page: nextPage, pageSize: nextPageSize }));

    const singleSorter = Array.isArray(sorter) ? null : (sorter as { field?: string | number; order?: SortOrder } | null);

    if (singleSorter?.field && singleSorter.order) {
      setSortState({
        field: String(singleSorter.field),
        order: singleSorter.order
      });
    } else if (singleSorter?.field) {
      setSortState({ field: 'sort', order: 'ascend' });
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Typography.Text className="eyebrow">页面摘要</Typography.Text>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0 }}>
            帖子主控区已可直接检索和维护
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            页面级配置仍在旧后台，这里优先承接列表筛选、查看、新建和编辑。
          </Typography.Paragraph>
          <Space wrap>
            <Tag color="processing">{pageQuery.data?._meta ? `页面版本 ${String((pageQuery.data._meta as Record<string, unknown>).revision || '-')}` : '页面摘要可用'}</Tag>
            <Tag>{`最近更新 ${formatDateTime((pageQuery.data?._meta as Record<string, unknown> | undefined)?.updatedAt)}`}</Tag>
            <Button href="/" target="_blank">
              去旧后台编辑页面配置
            </Button>
          </Space>
        </Space>
      </Card>

      <Card
        title="帖子主控区"
        extra={
          auth.permissions.canWrite ? (
            <Button
              type="primary"
              onMouseEnter={() => {
                void preloadDirectionsEditorDrawer();
              }}
              onFocus={() => {
                void preloadDirectionsEditorDrawer();
              }}
              onClick={openCreateDrawer}
            >
              新建帖子
            </Button>
          ) : null
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form form={filterForm} layout="inline" onFinish={applyFilters}>
            <Form.Item name="keyword" style={{ minWidth: 220 }}>
              <Input allowClear placeholder="搜索名称、分类、摘要" />
            </Form.Item>
            <Form.Item name="status" style={{ minWidth: 120 }}>
              <Select
                allowClear
                placeholder="全部状态"
                options={[
                  { label: '草稿', value: 'draft' },
                  { label: '已发布', value: 'published' }
                ]}
              />
            </Form.Item>
            <Form.Item name="category" style={{ minWidth: 140 }}>
              <Select
                allowClear
                placeholder="全部分类"
                options={categories.map((item) => ({ label: item, value: item }))}
              />
            </Form.Item>
            <Form.Item name="featured" style={{ minWidth: 120 }}>
              <Select allowClear placeholder="全部推荐" options={featuredOptions} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  筛选
                </Button>
                <Button
                  onClick={() => {
                    filterForm.resetFields();
                    setSearchParams(new URLSearchParams());
                  }}
                >
                  重置
                </Button>
                <Button
                  onClick={async () => {
                    await refreshDirectionsTable();
                  }}
                >
                  刷新
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <Table<DirectionRecord>
            rowKey={(record) => stableRowKey(record, ['_id', 'slug', 'name'])}
            columns={columns}
            dataSource={pagedItems}
            loading={directionsQuery.isFetching}
            scroll={{ x: 1100 }}
            onChange={handleTableChange}
            pagination={{
              current,
              pageSize,
              total: filteredItems.length,
              showSizeChanger: true
            }}
          />
        </Space>
      </Card>

      {detailRecord ? (
        <Suspense
          fallback={
            <Drawer open title={String(detailRecord?.name || '帖子详情')} width={520} onClose={() => setDetailRecord(null)}>
              <div className="center-screen" style={{ minHeight: 220 }}>
                <Spin size="large" />
              </div>
            </Drawer>
          }
        >
          <RecordPreviewDrawer
            open
            width={520}
            title={String(detailRecord?.name || '帖子详情')}
            description="用于核对完整字段，复杂样式配置仍建议回旧后台精修。"
            record={detailRecord}
            onClose={() => setDetailRecord(null)}
          />
        </Suspense>
      ) : null}

      {drawerOpen ? (
        <Suspense
          fallback={
            <Drawer open title={drawerMode === 'create' ? '新建帖子' : '编辑帖子'} width={560}>
              <div className="center-screen" style={{ minHeight: 320 }}>
                <Spin size="large" />
              </div>
            </Drawer>
          }
        >
          <DirectionsEditorDrawer
            mode={drawerMode}
            open={drawerOpen}
            record={editingRecord}
            onOpenChange={(open) => {
              setDrawerOpen(open);
              if (!open) {
                setEditingRecord(null);
              }
            }}
            onSubmit={handleSubmit}
          />
        </Suspense>
      ) : null}
    </Space>
  );
}
