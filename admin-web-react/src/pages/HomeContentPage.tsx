import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { App, Button, Card, Result, Segmented, Space, Spin, Table, Tag, Typography, type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import { homeSectionModels, normalizeHomePage, subjectLabels } from './home/types';
import type { HomePageContent, HomeSectionId, HomeSubjectKey } from './home/types';

const HomeSectionEditorDrawer = lazy(() =>
  import('./home/HomeSectionEditorDrawer').then((module) => ({ default: module.HomeSectionEditorDrawer }))
);

type HomeContentPageProps = {
  auth: AuthState;
};

type HomeSectionRow = {
  id: HomeSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  mode: 'shared' | 'subject';
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
  priorityLabel: string;
};

function readSubjectKey(value: string | null): HomeSubjectKey {
  return value === 'medical' ? 'medical' : 'math';
}

function buildSectionRows(page: HomePageContent, subjectKey: HomeSubjectKey): HomeSectionRow[] {
  const subject = page.subjects[subjectKey];

  return homeSectionModels.map((section) => {
    if (section.id === 'header') {
      const ready = Boolean(page.header.title && page.header.subtitle);
      return {
        ...section,
        summary: `${page.header.title || '未填写标题'} / ${page.header.subtitle || '未填写副标题'}`,
        editFields: '主标题、副标题',
        statusLabel: ready ? '标题已完整' : '建议先补齐标题',
        statusTone: ready ? 'success' : 'warning',
        priorityLabel: '基础信息'
      };
    }

    if (section.id === 'dailyCard') {
      const ready = Boolean(subject.learningCard.title && subject.learningCard.actionText);
      return {
        ...section,
        summary: `${subject.learningCard.title || '未填写主卡标题'} / ${subject.learningCard.progressText || '未填写进度'}`,
        editFields: '卡片标题、进度、按钮文案、跳转页面',
        statusLabel: ready ? '学习主卡已成型' : '建议先补齐主卡',
        statusTone: ready ? 'success' : 'warning',
        priorityLabel: '优先修改'
      };
    }

    if (section.id === 'quickEntries') {
      const ready = subject.quickEntries.length >= 4 && subject.quickEntries.every((item) => item.label);
      return {
        ...section,
        summary: subject.quickEntries.length
          ? subject.quickEntries.slice(0, 4).map((item) => item.label).join(' / ')
          : '还没有配置四个快捷入口',
        editFields: '4 个入口标题、副标题、图标、跳转页面',
        statusLabel: ready ? '四个入口已完整' : `已配置 ${subject.quickEntries.length}/4`,
        statusTone: ready ? 'success' : 'warning',
        priorityLabel: '常用导航'
      };
    }

    if (section.id === 'resourceSection') {
      const ready = Boolean(page.header.resourceSectionTitle && page.header.resourceMoreText);
      return {
        ...section,
        summary: `${page.header.resourceSectionTitle || '未填写资源标题'} / ${page.header.resourceMoreText || '未填写右侧短文案'}`,
        editFields: '资源区标题、右上角短字',
        statusLabel: ready ? '资源标题栏已完整' : '建议补齐标题栏',
        statusTone: ready ? 'success' : 'warning',
        priorityLabel: '辅助说明'
      };
    }

    const ready = subject.resources.length >= 2 && subject.resources.every((item) => item.title);
    return {
      ...section,
        summary: subject.resources.length
          ? subject.resources.slice(0, 2).map((item) => item.title).join(' / ')
          : '还没有配置资源卡片',
      editFields: '2 张资源卡的标题、副标题、标签、辅助信息',
      statusLabel: ready ? '资源卡片已完整' : `已配置 ${subject.resources.length}/2`,
      statusTone: ready ? 'success' : 'warning',
      priorityLabel: '优先修改'
    };
  });
}

function countReadySections(sections: HomeSectionRow[]) {
  return sections.filter((item) => item.statusTone === 'success').length;
}

export function HomeContentPage({ auth }: HomeContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingSection, setEditingSection] = useState<HomeSectionId | null>(null);

  const subjectKey = readSubjectKey(searchParams.get('subject'));
  const requestedSection = searchParams.get('section') as HomeSectionId | null;

  const homePageQuery = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home')
  });

  const updateMutation = useMutation({
    mutationFn: (payload: HomePageContent) => api.updatePage('home', payload as unknown as Record<string, unknown>),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'home'] });
    }
  });

  const page = useMemo(() => normalizeHomePage(homePageQuery.data), [homePageQuery.data]);
  const subject = page.subjects[subjectKey];
  const sections = useMemo(() => buildSectionRows(page, subjectKey), [page, subjectKey]);
  const readySectionCount = useMemo(() => countReadySections(sections), [sections]);
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  useEffect(() => {
    if (!requestedSection) return;
    if (sections.some((item) => item.id === requestedSection)) {
      setEditingSection(requestedSection);
    }
  }, [requestedSection, sections]);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取首页内容配置。" />;
  }

  if (homePageQuery.isError) {
    return <Result status="error" title="首页内容读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSave(nextPage: HomePageContent) {
    await updateMutation.mutateAsync(nextPage);
    message.success('首页内容已保存');
    setEditingSection(null);
  }

  const columns: TableProps<HomeSectionRow>['columns'] = [
    {
      title: '前台顺序',
      dataIndex: 'step',
      width: 108,
    },
    {
      title: '前台区块',
      dataIndex: 'title',
      width: 280,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Space size={8} wrap>
            <Typography.Text strong>{record.title}</Typography.Text>
            <Tag color={record.priorityLabel === '优先修改' ? 'gold' : 'default'} bordered={false}>
              {record.priorityLabel}
            </Tag>
            {record.mode === 'shared' ? (
              <Tag bordered={false}>高数/医护共用</Tag>
            ) : (
              <Tag color="processing">{subjectLabels[subjectKey]}专属</Tag>
            )}
          </Space>
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
      title: '点编辑后可改',
      dataIndex: 'editFields',
      width: 280
    },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      width: 164,
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
            <Typography.Text className="eyebrow">首页内容主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              新老师从第一行往下改，就能自然维护首页
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              主表只回答三个问题: 这一块在前台哪里、学生现在会看到什么、点开后会改哪些字段。
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space wrap>
              <Segmented<HomeSubjectKey>
                value={subjectKey}
                options={[
                  { label: '高数首页', value: 'math' },
                  { label: '医护首页', value: 'medical' }
                ]}
                onChange={(value) => {
                  setSearchParams((current) => {
                    const next = new URLSearchParams(current);
                    next.set('subject', value);
                    return next;
                  });
                }}
              />
              <Tag color="processing">{`${subjectLabels[subjectKey]}首页`}</Tag>
            </Space>
            <Space wrap>
              <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
                {auth.permissions.canWrite ? '可直接保存' : '当前只读'}
              </Tag>
              <Tag>{`最近更新 ${lastUpdated}`}</Tag>
            </Space>
          </Space>
          <div className="page-location-strip">
            <Tag bordered={false} color="processing">{`当前位置 首页 / ${subjectLabels[subjectKey]}首页`}</Tag>
            <Typography.Text type="secondary">前台位置和主表顺序完全一致，老师只需要从上往下找。</Typography.Text>
          </div>
          <div className="home-workspace-compact-bar">
            <Typography.Text type="secondary">{`区块 ${homeSectionModels.length} 行`}</Typography.Text>
            <Typography.Text type="secondary">{`已成型 ${readySectionCount}/${homeSectionModels.length}`}</Typography.Text>
            <Typography.Text type="secondary">{`快捷入口 ${subject.quickEntries.length}/4`}</Typography.Text>
            <Typography.Text type="secondary">{`资源卡片 ${subject.resources.length}/2`}</Typography.Text>
          </div>
          <div className="workspace-guide-grid">
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">第一次进入先做什么</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                先看状态为黄色的行
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                黄色代表这块还没成型，通常先补标题区、今日学习主卡和四个快捷入口。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">老师如何理解 1:1 映射</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                每一行就是前台的一块
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                从第 1 行到最后一行，就是小程序首页从上到下的展示顺序，不需要来回找字段。
              </Typography.Paragraph>
            </div>
            <div className="workspace-guide-card">
              <Typography.Text className="workspace-guide-label">保存后会发生什么</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                保存的是当前学科首页
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                你现在切到哪一个首页视角，保存时就会更新对应首页的数据，不会误改另一套学科内容。
              </Typography.Paragraph>
            </div>
          </div>
        </Space>
      </Card>

      <Card
        className="home-workspace-card"
        title="首页区块总表"
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => setEditingSection(sections[0]?.id || null)}
          >
            从第一行开始编辑
          </Button>
        }
      >
        <Table<HomeSectionRow>
          rowKey="id"
          loading={homePageQuery.isLoading}
          columns={columns}
          dataSource={sections}
          pagination={false}
          scroll={{ x: 1180 }}
        />
      </Card>

      {editingSection ? (
        <Suspense
          fallback={
            <Card className="home-workspace-card">
              <div className="center-screen" style={{ minHeight: 280 }}>
                <Spin size="large" />
              </div>
            </Card>
          }
        >
          <HomeSectionEditorDrawer
            open
            sectionId={editingSection}
            page={page}
            subjectKey={subjectKey}
            saving={updateMutation.isPending}
            canWrite={auth.permissions.canWrite}
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
      ) : null}
    </Space>
  );
}

export default HomeContentPage;
