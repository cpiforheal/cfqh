import { lazy, Suspense, useMemo, useState } from 'react';
import { App, Button, Card, Popconfirm, Result, Segmented, Space, Spin, Table, Tag, Typography, type TableProps } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import {
  defaultMaterialItem,
  materialDirectionLabels,
  materialStageLabels,
  materialThemeMeta,
  mediaSectionModels,
  normalizeMaterialItem,
  normalizeMaterialPackage,
  normalizeMaterialsPage,
  readMaterialDirection,
  readMaterialStage,
  sortBySort,
  type MaterialItemRecord,
  type MaterialPackageRecord,
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

function buildSectionRows(
  page: ReturnType<typeof normalizeMaterialsPage>,
  currentPackage: MaterialPackageRecord | null,
  currentItems: MaterialItemRecord[]
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
      const ready = Boolean(page.mainSection.title && page.mainSection.sideNote && currentPackage?.title && currentPackage?.target && currentPackage?.solves);
      return {
        ...section,
        summary: currentPackage
          ? `${page.mainSection.title || '未填写区块标题'} / ${currentPackage.title}`
          : `${page.mainSection.title || '未填写区块标题'} / 当前学科阶段还没有主推套系`,
        editFields: '主推区标题、右侧提示、主卡标题、适合对象、卖点',
        statusLabel: ready ? '主推套系已完整' : currentPackage ? '建议补齐主卡信息' : '建议先创建当前主卡',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'items') {
      const ready = Boolean(page.shelfSection.title && page.shelfSection.hint) && currentItems.length > 0 && currentItems.every((item) => item.title && item.subtitle);
      return {
        ...section,
        summary: currentItems.length
          ? `${page.shelfSection.title || '未填写资料区标题'} / ${currentItems.length} 张资料卡`
          : `${page.shelfSection.title || '未填写资料区标题'} / 当前阶段还没有资料卡片`,
        editFields: '资料区标题、右侧提示、资料卡标题、副标题、简介',
        statusLabel: ready ? `资料卡片 ${currentItems.length} 张` : '建议先补一张资料卡片',
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

function countReadySections(sections: MediaSectionRow[]) {
  return sections.filter((item) => item.statusTone === 'success').length;
}

export function MediaContentPage({ auth }: MediaContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingSection, setEditingSection] = useState<MaterialSectionId | null>(null);
  const [packageDrawerOpen, setPackageDrawerOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<MaterialPackageRecord | null>(null);
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaterialItemRecord | null>(null);

  const direction = readMaterialDirection(searchParams.get('subject'));
  const stage = readMaterialStage(searchParams.get('stage'));

  const pageQuery = useQuery({
    queryKey: ['page', 'materials'],
    queryFn: () => api.getPage('materials')
  });

  const packagesQuery = useQuery({
    queryKey: ['collection', 'materialPackages'],
    queryFn: () => api.listCollection('materialPackages')
  });

  const itemsQuery = useQuery({
    queryKey: ['collection', 'materialItems'],
    queryFn: () => api.listCollection('materialItems')
  });

  const updatePageMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.updatePage('materials', payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'materials'] });
    }
  });

  const createPackageMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('materialPackages', payload)
  });

  const updatePackageMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('materialPackages', id, payload)
  });

  const createItemMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => api.createCollectionItem('materialItems', payload)
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      api.updateCollectionItem('materialItems', id, payload)
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => api.deleteCollectionItem('materialItems', id)
  });

  const page = useMemo(() => normalizeMaterialsPage(pageQuery.data), [pageQuery.data]);
  const allPackages = useMemo(
    () => sortBySort((packagesQuery.data || []).map((item) => normalizeMaterialPackage(item))),
    [packagesQuery.data]
  );
  const allItems = useMemo(
    () => sortBySort((itemsQuery.data || []).map((item) => normalizeMaterialItem(item))),
    [itemsQuery.data]
  );
  const currentPackage = useMemo(
    () => allPackages.find((item) => item.direction === direction && item.stage === stage) || null,
    [allPackages, direction, stage]
  );
  const currentItems = useMemo(
    () => allItems.filter((item) => item.direction === direction && item.stage === stage),
    [allItems, direction, stage]
  );
  const sections = useMemo(() => buildSectionRows(page, currentPackage, currentItems), [page, currentPackage, currentItems]);
  const readySectionCount = useMemo(() => countReadySections(sections), [sections]);
  const completionPercent = Math.round((readySectionCount / sections.length) * 100);
  const palette = materialThemeMeta[direction];
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取商城内容配置。" />;
  }

  if (pageQuery.isError || packagesQuery.isError || itemsQuery.isError) {
    return <Result status="error" title="商城内容读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSavePage(nextPage: Record<string, unknown>) {
    await updatePageMutation.mutateAsync(nextPage);
    message.success('商城页面文案已保存');
    setEditingSection(null);
  }

  async function handleSavePackage(nextPackage: MaterialPackageRecord) {
    if (editingPackage?._id) {
      await updatePackageMutation.mutateAsync({
        id: editingPackage._id,
        payload: nextPackage as unknown as Record<string, unknown>
      });
      message.success('主推套系已保存');
    } else {
      await createPackageMutation.mutateAsync(nextPackage as unknown as Record<string, unknown>);
      message.success('主推套系已创建');
    }

    await queryClient.invalidateQueries({ queryKey: ['collection', 'materialPackages'] });
    setPackageDrawerOpen(false);
    setEditingPackage(null);
    return true;
  }

  async function handleSaveItem(nextItem: MaterialItemRecord) {
    if (editingItem?._id) {
      await updateItemMutation.mutateAsync({
        id: editingItem._id,
        payload: nextItem as unknown as Record<string, unknown>
      });
      message.success('资料卡片已保存');
    } else {
      await createItemMutation.mutateAsync(nextItem as unknown as Record<string, unknown>);
      message.success('资料卡片已创建');
    }

    await queryClient.invalidateQueries({ queryKey: ['collection', 'materialItems'] });
    setItemDrawerOpen(false);
    setEditingItem(null);
    return true;
  }

  async function handleDeleteItem(record: MaterialItemRecord) {
    if (!record._id) return;
    await deleteItemMutation.mutateAsync(record._id);
    await queryClient.invalidateQueries({ queryKey: ['collection', 'materialItems'] });
    message.success('资料卡片已删除');
  }

  const sectionColumns: TableProps<MediaSectionRow>['columns'] = [
    {
      title: '前台顺序',
      dataIndex: 'step',
      width: 108,
    },
    {
      title: '前台区块',
      dataIndex: 'title',
      width: 340,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary">{record.desc}</Typography.Text>
        </Space>
      )
    },
    {
      title: '前台位置',
      dataIndex: 'location',
      width: 180,
    },
    {
      title: '老师当前会看到',
      dataIndex: 'summary',
      ellipsis: true
    },
    {
      title: '点开后会改什么',
      dataIndex: 'editFields',
      width: 260
    },
    {
      title: '完成状态',
      dataIndex: 'statusLabel',
      width: 170,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 210,
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
              setEditingPackage(currentPackage);
              setPackageDrawerOpen(true);
            }}
          >
            {currentPackage ? '编辑主卡' : '新建主卡'}
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
              setEditingItem({
                ...defaultMaterialItem,
                direction,
                stage
              });
              setItemDrawerOpen(true);
            }}
          >
            新增资料
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

  const packageColumns: TableProps<MaterialPackageRecord>['columns'] = [
    {
      title: '主推套系',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title || '未填写套系标题'}</Typography.Text>
          <Typography.Text type="secondary">
            {record.badge || '未填写角标'} / {record.target || '未填写适合对象'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: '解决问题',
      dataIndex: 'solves',
      ellipsis: true
    },
    {
      title: '卖点',
      dataIndex: 'features',
      width: 240,
      render: (_, record) => (
        <Space wrap>
          {(record.features || []).length ? (record.features || []).map((item) => <Tag key={item}>{item}</Tag>) : <Tag bordered={false}>未填写</Tag>}
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (_, record) => <Tag color={record.status === 'published' ? 'success' : 'default'}>{record.status === 'published' ? '已发布' : '草稿'}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setEditingPackage(record);
            setPackageDrawerOpen(true);
          }}
        >
          编辑
        </a>
      ]
    }
  ];

  const itemColumns: TableProps<MaterialItemRecord>['columns'] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 90,
      sorter: (a, b) => Number(a.sort || 0) - Number(b.sort || 0)
    },
    {
      title: '资料卡片',
      dataIndex: 'title',
      width: 320,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title || '未填写资料标题'}</Typography.Text>
          <Typography.Text type="secondary">
            {record.type || '未填写类型'} / {record.subtitle || '未填写资料副标题'}
          </Typography.Text>
        </Space>
      )
    },
    {
      title: '简介',
      dataIndex: 'desc',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (_, record) => <Tag color={record.status === 'published' ? 'success' : 'default'}>{record.status === 'published' ? '已发布' : '草稿'}</Tag>
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
            setEditingItem(record);
            setItemDrawerOpen(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除这张资料卡片吗？"
          onConfirm={() => handleDeleteItem(record)}
          okButtonProps={{ danger: true }}
          disabled={!auth.permissions.canWrite}
        >
          <a style={{ color: '#cf1322' }}>删除</a>
        </Popconfirm>
      ]
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">商城内容主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先选学科和阶段，再从上到下维护商城
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              这张主表只保留老师真正会改的关键条目，复杂字段都收进二级抽屉里。
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
              <Typography.Title level={3} style={{ margin: 0, color: palette.deep }}>
                {materialDirectionLabels[direction]} · {materialStageLabels[stage]}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">已成型区块</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {readySectionCount}/{sections.length}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">资料卡片</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {currentItems.length}
              </Typography.Title>
            </div>
            <div className="home-workspace-tip">
              <Typography.Text strong>老师操作建议</Typography.Text>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                先改顶部信息和阶段按钮，再补主推套系与资料列表。
              </Typography.Paragraph>
            </div>
          </Space>

          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第一次进入先做什么</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                先改第 3 块主推套系卡
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                主推套系是老师最常改、也最容易看出变化的地方，先把主卡标题和适合对象补齐最有效。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">老师如何理解 1:1 映射</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                每一行对应商城一块真实内容
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                先改区块表，再改下面的主卡表和资料卡表，就能按学生在手机里看到的顺序自然维护。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">保存范围提醒</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                保存只影响当前学科和阶段
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                现在是 {materialDirectionLabels[direction]} 的 {materialStageLabels[stage]}，保存后只会更新这一套商城内容。
              </Typography.Paragraph>
            </div>
          </div>

          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: 'rgba(210, 220, 234, 0.42)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${completionPercent}%`,
                height: '100%',
                borderRadius: 999,
                background: `linear-gradient(90deg, ${palette.accent} 0%, ${palette.deep} 100%)`
              }}
            />
          </div>
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
          loading={pageQuery.isLoading || packagesQuery.isLoading || itemsQuery.isLoading}
          columns={sectionColumns}
          dataSource={sections}
          pagination={false}
          scroll={{ x: 1080 }}
        />
      </Card>

      <Card
        className="home-workspace-card"
        title="当前主推套系"
        extra={
          <Button
            type="primary"
            icon={currentPackage ? <EditOutlined /> : <PlusOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => {
              setEditingPackage(currentPackage);
              setPackageDrawerOpen(true);
            }}
          >
            {currentPackage ? '编辑当前主卡' : '创建当前主卡'}
          </Button>
        }
      >
        <Table<MaterialPackageRecord>
          rowKey={(record) => record._id || `${record.direction}-${record.stage}`}
          loading={packagesQuery.isLoading}
          columns={packageColumns}
          dataSource={currentPackage ? [currentPackage] : []}
          pagination={false}
          scroll={{ x: 980 }}
          locale={{ emptyText: '当前学科和阶段还没有主推套系' }}
        />
      </Card>

      <Card
        className="home-workspace-card"
        title="当前资料卡片"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => {
              setEditingItem({
                ...defaultMaterialItem,
                direction,
                stage
              });
              setItemDrawerOpen(true);
            }}
          >
            新增资料卡片
          </Button>
        }
      >
        <Table<MaterialItemRecord>
          rowKey={(record) => record._id || `${record.direction}-${record.stage}-${record.sort}-${record.title}`}
          loading={itemsQuery.isLoading}
          columns={itemColumns}
          dataSource={currentItems}
          pagination={false}
          scroll={{ x: 980 }}
          locale={{ emptyText: '当前学科和阶段还没有资料卡片' }}
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
          open={packageDrawerOpen}
          record={editingPackage}
          direction={direction}
          stage={stage}
          onOpenChange={(open) => {
            setPackageDrawerOpen(open);
            if (!open) {
              setEditingPackage(null);
            }
          }}
          onSubmit={handleSavePackage}
        />
        <MediaItemEditorDrawer
          open={itemDrawerOpen}
          record={editingItem}
          direction={direction}
          stage={stage}
          onOpenChange={(open) => {
            setItemDrawerOpen(open);
            if (!open) {
              setEditingItem(null);
            }
          }}
          onSubmit={handleSaveItem}
        />
      </Suspense>
    </Space>
  );
}

export default MediaContentPage;
