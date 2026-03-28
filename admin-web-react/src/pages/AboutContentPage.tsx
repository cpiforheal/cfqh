import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { App, Card, Result, Space, Spin, Table, Tag, Typography, type TableProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import { aboutSectionModels, normalizeAboutPage, type AboutPageContent, type AboutSectionId } from './about/types';

const AboutSectionEditorDrawer = lazy(() =>
  import('./about/AboutSectionEditorDrawer').then((module) => ({ default: module.AboutSectionEditorDrawer }))
);

type AboutContentPageProps = {
  auth: AuthState;
};

type AboutSectionRow = {
  id: AboutSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
};

function buildSectionRows(page: AboutPageContent): AboutSectionRow[] {
  return aboutSectionModels.map((section) => {
    if (section.id === 'hero') {
      const ready = Boolean(page.hero.title && page.hero.desc);
      return {
        ...section,
        summary: `${page.hero.title || '未填写标题'} / ${page.hero.desc || '未填写说明'}`,
        editFields: '短标签、标题、说明、首图链接',
        statusLabel: ready ? '首屏已完整' : '建议先补齐首屏',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'introCard') {
      const ready = Boolean(page.introCard.title && page.introCard.desc);
      return {
        ...section,
        summary: `${page.introCard.title || '未填写机构名'} / ${page.introCard.desc || '未填写介绍'}`,
        editFields: '机构名称、机构介绍',
        statusLabel: ready ? '机构介绍已完整' : '建议先补机构介绍',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'values') {
      const ready = page.values.length >= 2 && page.values.every((item) => item.title && item.desc);
      return {
        ...section,
        summary: page.values.length ? page.values.map((item) => item.title).join(' / ') : '还没有配置理念卡',
        editFields: '理念标题、理念说明',
        statusLabel: ready ? `理念卡 ${page.values.length} 条` : `已配置 ${page.values.length} 条`,
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'environmentImages') {
      const ready = page.environmentImages.length >= 2 && page.environmentImages.every((item) => item.label);
      return {
        ...section,
        summary: page.environmentImages.length
          ? page.environmentImages.map((item) => item.label).join(' / ')
          : '还没有配置环境图',
        editFields: '图片名称、图片链接、占位种子',
        statusLabel: ready ? `环境图 ${page.environmentImages.length} 张` : `已配置 ${page.environmentImages.length} 张`,
        statusTone: ready ? 'success' : 'warning'
      };
    }

    const ready = Boolean(page.cta.title && page.cta.desc && page.cta.buttonText);
    return {
      ...section,
      summary: `${page.cta.title || '未填写标题'} / ${page.cta.buttonText || '未填写按钮'}`,
      editFields: '咨询标题、说明、按钮文案、底部短句',
      statusLabel: ready ? '咨询区已完整' : '建议补齐咨询区',
      statusTone: ready ? 'success' : 'warning'
    };
  });
}

export function AboutContentPage({ auth }: AboutContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingSection, setEditingSection] = useState<AboutSectionId | null>(null);
  const requestedSection = searchParams.get('section') as AboutSectionId | null;

  const aboutQuery = useQuery({
    queryKey: ['page', 'about'],
    queryFn: () => api.getPage('about')
  });

  const updateMutation = useMutation({
    mutationFn: (payload: AboutPageContent) => api.updatePage('about', payload as unknown as Record<string, unknown>),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'about'] });
    }
  });

  const page = useMemo(() => normalizeAboutPage(aboutQuery.data), [aboutQuery.data]);
  const rows = useMemo(() => buildSectionRows(page), [page]);
  const readyCount = rows.filter((item) => item.statusTone === 'success').length;
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  useEffect(() => {
    if (!requestedSection) return;
    if (rows.some((item) => item.id === requestedSection)) {
      setEditingSection(requestedSection);
    }
  }, [requestedSection, rows]);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取关于我们页面配置。" />;
  }

  if (aboutQuery.isError) {
    return <Result status="error" title="关于我们读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSave(nextPage: AboutPageContent) {
    await updateMutation.mutateAsync(nextPage);
    message.success('关于我们已保存');
    setEditingSection(null);
  }

  const columns: TableProps<AboutSectionRow>['columns'] = [
    {
      title: '顺序',
      dataIndex: 'step',
      width: 96,
    },
    {
      title: '区块',
      dataIndex: 'title',
      width: 260,
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
      width: 160,
    },
    {
      title: '当前内容摘要',
      dataIndex: 'summary',
      ellipsis: true
    },
    {
      title: '点编辑后可改',
      dataIndex: 'editFields',
      width: 240
    },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      width: 160,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <a key="edit" onClick={() => setEditingSection(record.id)}>
          编辑
        </a>
      ]
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">关于我们主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              新老师先顺着页面顺序看，再点开抽屉细改
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              表格只保留前台位置、当前摘要和可修改范围，让老师不用先理解数据结构也能上手。
            </Typography.Paragraph>
          </div>

          <Space wrap>
            <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
              {auth.permissions.canWrite ? '可直接保存' : '当前只读'}
            </Tag>
            <Tag>{`已成型 ${readyCount}/${rows.length}`}</Tag>
            <Tag>{`最近更新 ${lastUpdated}`}</Tag>
          </Space>
          <div className="page-location-strip">
            <Tag bordered={false} color="processing">当前位置 关于我们 / 页面区块总表</Tag>
            <Typography.Text type="secondary">每一行都对应关于页从上到下的一块，点编辑后再看细字段。</Typography.Text>
          </div>
          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">建议修改顺序</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                先首屏，再机构介绍，再底部咨询
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                这样第一次维护时，最容易先把学生最先看到和最后承接的两块内容补齐。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">1:1 映射方式</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                每一行就是关于页的一块
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                从第 1 行到第 5 行，就是学生在关于页从上往下看到的顺序。
              </Typography.Paragraph>
            </div>
          </div>
        </Space>
      </Card>

      {aboutQuery.isLoading ? (
        <div className="center-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="home-workspace-card">
          <Table<AboutSectionRow>
            rowKey="id"
            columns={columns}
            dataSource={rows}
            scroll={{ x: 1200 }}
            pagination={false}
            title={() => '关于页区块总表'}
          />
        </Card>
      )}

      <Suspense fallback={null}>
        <AboutSectionEditorDrawer
          open={Boolean(editingSection)}
          sectionId={editingSection}
          page={page}
          canWrite={auth.permissions.canWrite}
          saving={updateMutation.isPending}
          onClose={() => {
            setEditingSection(null);
            setSearchParams((current) => {
              const next = new URLSearchParams(current);
              next.delete('section');
              return next;
            });
          }}
          onSave={handleSave}
        />
      </Suspense>
    </Space>
  );
}
