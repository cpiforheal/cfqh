import { useEffect, useMemo, useRef, useState } from 'react';
import {
  App,
  Button,
  Card,
  Drawer,
  Form,
  Modal,
  Result,
  Space,
  Tag,
  Typography
} from 'antd';
import {
  DrawerForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable
} from '@ant-design/pro-components';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import {
  compactSearchParams,
  formatDateTime,
  matchesKeyword,
  normalizeKeyword,
  paginate,
  scheduleIdleTask,
  stableRowKey,
  stringifyRecord,
  toMultilineText,
  toStringArray
} from '../utils';

type DirectionsPageProps = {
  auth: AuthState;
};

type DirectionRecord = Record<string, unknown>;

type DirectionFormValues = {
  name: string;
  slug: string;
  category: string;
  status: string;
  sort: number;
  isFeatured: boolean;
  featuredTag: string;
  homeTag: string;
  summary: string;
  audience: string;
  iconType: string;
  featuresText: string;
  chipsText: string;
};

const featuredOptions = [
  { label: '全部', value: '' },
  { label: '精选', value: 'true' },
  { label: '普通', value: 'false' }
];

export function DirectionsPage({ auth }: DirectionsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [editingRecord, setEditingRecord] = useState<DirectionRecord | null>(null);
  const [detailRecord, setDetailRecord] = useState<DirectionRecord | null>(null);
  const [form] = Form.useForm<DirectionFormValues>();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

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
    formRef.current?.setFieldsValue({
      keyword,
      status,
      category,
      featured
    });
  }, [category, featured, keyword, status]);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const base = editingRecord || {};
    form.setFieldsValue({
      name: String(base.name || ''),
      slug: String(base.slug || ''),
      category: String(base.category || ''),
      status: String(base.status || 'draft'),
      sort: Number(base.sort || 100),
      isFeatured: Boolean(base.isFeatured),
      featuredTag: String(base.featuredTag || ''),
      homeTag: String(base.homeTag || ''),
      summary: String(base.summary || ''),
      audience: String(base.audience || ''),
      iconType: String(base.iconType || 'grid'),
      featuresText: toMultilineText(base.features),
      chipsText: toMultilineText(base.chips)
    });
  }, [drawerOpen, editingRecord, form]);

  useEffect(() => {
    return scheduleIdleTask(() => {
      void queryClient.prefetchQuery({
        queryKey: ['template', 'directions'],
        queryFn: () => api.getCollectionTemplate('directions'),
        staleTime: 5 * 60_000
      });
    });
  }, [queryClient]);

  useEffect(() => {
    if (directionsQuery.data) {
      actionRef.current?.reload();
    }
  }, [directionsQuery.data]);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取帖子模块内容。" />;
  }

  if (pageQuery.isError || directionsQuery.isError) {
    return <Result status="error" title="帖子数据读取失败" subTitle="请稍后刷新重试，或检查当前云端数据服务是否可用。" />;
  }

  const columns: ProColumns<DirectionRecord>[] = [
    {
      title: '关键词',
      dataIndex: 'keyword',
      valueType: 'text',
      hideInTable: true
    },
    {
      title: '名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 240,
      search: false,
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
      valueType: 'select',
      width: 140,
      fieldProps: {
        options: categories.map((item) => ({ label: item, value: item }))
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      valueEnum: {
        draft: { text: '草稿', status: 'Default' },
        published: { text: '已发布', status: 'Success' }
      }
    },
    {
      title: '精选',
      dataIndex: 'featured',
      width: 120,
      valueType: 'select',
      search: {
        transform: (value) => ({ featured: value })
      },
      fieldProps: {
        options: featuredOptions
      },
      render: (_, record) =>
        record.isFeatured ? <Tag color="gold">精选推荐</Tag> : <Tag bordered={false}>普通</Tag>
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
      search: false,
      sorter: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180,
      search: false,
      render: (_, record) => formatDateTime(record.updatedAt || record._updatedAt || record.createdAt || record._createdAt)
    },
    {
      title: '操作',
      key: 'option',
      width: 220,
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => [
        <a key="view" onClick={() => setDetailRecord(record)}>
          查看
        </a>,
        auth.permissions.canWrite ? (
          <a
            key="edit"
            onClick={() => {
              setDrawerMode('edit');
              setEditingRecord(record);
              setDrawerOpen(true);
            }}
          >
            编辑
          </a>
        ) : null,
        auth.permissions.canWrite ? (
          <a
            key="copy"
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
          </a>
        ) : null,
        auth.permissions.canWrite ? (
          <a
            key="delete"
            onClick={() => handleDelete(record)}
            style={{ color: '#cf1322' }}
          >
            删除
          </a>
        ) : null
      ].filter(Boolean)
    }
  ];

  async function openCreateDrawer() {
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
    actionRef.current?.reload();
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
    form.resetFields();
    await refreshDirectionsTable();
    return true;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Typography.Text className="eyebrow">页面摘要</Typography.Text>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            帖子页面已切到 ProTable 主控区
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            页面级配置仍保留在旧后台，这一版先把列表维护、筛选、查看、新建、编辑、删除完整迁过来。
          </Typography.Paragraph>
          <Space wrap>
            <Tag color="processing">{pageQuery.data?._meta ? `页面版本 ${String((pageQuery.data._meta as Record<string, unknown>).revision || '-')}` : '页面摘要可用'}</Tag>
            <Tag>最近更新 {formatDateTime((pageQuery.data?._meta as Record<string, unknown> | undefined)?.updatedAt)}</Tag>
            <Button href="/" target="_blank">
              去旧后台编辑页面配置
            </Button>
          </Space>
        </Space>
      </Card>

      <ProTable<DirectionRecord>
        rowKey={(record) => stableRowKey(record, ['_id', 'slug', 'name'])}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        columns={columns}
        params={{ keyword, status, category, featured, current, pageSize }}
        loading={directionsQuery.isFetching}
        columnsState={{
          persistenceKey: 'cfqh-react-directions-columns',
          persistenceType: 'localStorage'
        }}
        options={{
          density: true,
          fullScreen: true,
          reload: async (_event, action) => {
            await directionsQuery.refetch();
            action?.reload();
          },
          setting: true
        }}
        scroll={{ x: 1100 }}
        search={{ labelWidth: 'auto', defaultCollapsed: false }}
        pagination={{
          current,
          pageSize,
          showSizeChanger: true,
          onChange: (page, size) => {
            setSearchParams(compactSearchParams(searchParams, { page, pageSize: size }));
          }
        }}
        toolbar={{
          title: '帖子主控区',
          actions: auth.permissions.canWrite
            ? [
                <Button key="create" type="primary" onClick={openCreateDrawer}>
                  新建帖子
                </Button>
              ]
            : []
        }}
        beforeSearchSubmit={(values) => {
          setSearchParams(
            compactSearchParams(searchParams, {
              keyword: String(values.keyword || ''),
              status: String(values.status || ''),
              category: String(values.category || ''),
              featured: String(values.featured || ''),
              page: 1
            })
          );
          return values;
        }}
        onReset={() => {
          setSearchParams(new URLSearchParams());
        }}
        request={async (params, sort) => {
          const tableCurrent = Math.max(1, Number(params.current || current));
          const tablePageSize = Math.max(1, Number(params.pageSize || pageSize));
          const items = directionsQuery.data || [];
          const keywordValue = normalizeKeyword(params.keyword);
          const nextItems = items
            .filter((item) => matchesKeyword(item, keywordValue, ['name', 'slug', 'category', 'summary', 'audience']))
            .filter((item) => (!params.status ? true : String(item.status || '') === String(params.status)))
            .filter((item) => (!params.category ? true : String(item.category || '') === String(params.category)))
            .filter((item) => {
              if (!params.featured) return true;
              return String(Boolean(item.isFeatured)) === String(params.featured);
            })
            .sort((left, right) => {
              const sorter = Object.entries(sort || {}).find(([, value]) => value);
              if (!sorter) {
                return Number(left.sort || 0) - Number(right.sort || 0);
              }
              const [field, order] = sorter;
              const multiplier = order === 'descend' ? -1 : 1;
              return (Number(left[field] || 0) - Number(right[field] || 0)) * multiplier;
            });

          return {
            success: true,
            total: nextItems.length,
            data: paginate(nextItems, tableCurrent, tablePageSize)
          };
        }}
      />

      <Drawer
        open={Boolean(detailRecord)}
        onClose={() => setDetailRecord(null)}
        title={String(detailRecord?.name || '帖子详情')}
        width={520}
      >
        <Typography.Paragraph type="secondary">用于核对完整字段，复杂样式配置仍建议回旧后台精修。</Typography.Paragraph>
        <pre className="json-preview">{stringifyRecord(detailRecord)}</pre>
      </Drawer>

      <DrawerForm<DirectionFormValues>
        title={drawerMode === 'create' ? '新建帖子' : '编辑帖子'}
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) {
            setEditingRecord(null);
            form.resetFields();
          }
        }}
        width={560}
        form={form}
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: drawerMode === 'create' ? '创建帖子' : '保存修改'
          }
        }}
      >
        <ProFormText name="name" label="帖子名称" rules={[{ required: true, message: '请填写帖子名称' }]} />
        <ProFormText name="slug" label="唯一标识" rules={[{ required: true, message: '请填写 slug' }]} />
        <ProFormText name="category" label="分类" />
        <ProFormSelect
          name="status"
          label="状态"
          options={[
            { label: '草稿', value: 'draft' },
            { label: '已发布', value: 'published' }
          ]}
        />
        <ProFormDigit name="sort" label="排序" min={0} />
        <ProFormSwitch name="isFeatured" label="精选推荐" />
        <ProFormText name="featuredTag" label="精选标签" />
        <ProFormText name="homeTag" label="首页标签" />
        <ProFormText name="iconType" label="图标类型" />
        <ProFormTextArea name="summary" label="摘要" fieldProps={{ rows: 3 }} />
        <ProFormTextArea name="audience" label="适合人群" fieldProps={{ rows: 3 }} />
        <ProFormTextArea
          name="featuresText"
          label="卖点列表"
          extra="一行一个，保存时会自动转成数组。"
          fieldProps={{ rows: 5 }}
        />
        <ProFormTextArea
          name="chipsText"
          label="标签 Chips"
          extra="可用换行、逗号或中文逗号分隔。"
          fieldProps={{ rows: 4 }}
        />
      </DrawerForm>
    </Space>
  );
}
