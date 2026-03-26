import { lazy, Suspense, useMemo, useState } from 'react';
import { App, Button, Card, Progress, Result, Segmented, Space, Spin, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
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
  statusLabel: string;
  statusTone: 'success' | 'warning';
  teacherTip: string;
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
        statusLabel: ready ? '标题已完整' : '建议先补齐标题',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '学生先看到这里。先把主标题写直白，再用一句副标题说明今天适合做什么。'
      };
    }

    if (section.id === 'dailyCard') {
      const ready = Boolean(subject.learningCard.title && subject.learningCard.actionText);
      return {
        ...section,
        summary: `${subject.learningCard.title || '未填写主卡标题'} / ${subject.learningCard.progressText || '未填写进度'}`,
        statusLabel: ready ? '学习主卡已成型' : '建议先补齐主卡',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '这里放老师最希望学生今天立刻去做的任务，按钮文案尽量直接用动作词。'
      };
    }

    if (section.id === 'quickEntries') {
      const ready = subject.quickEntries.length >= 4 && subject.quickEntries.every((item) => item.label);
      return {
        ...section,
        summary: subject.quickEntries.length
          ? subject.quickEntries.slice(0, 4).map((item) => item.label).join(' / ')
          : '还没有配置四个快捷入口',
        statusLabel: ready ? '四个入口已完整' : `已配置 ${subject.quickEntries.length}/4`,
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '入口名称建议都是学生一看就懂的词，老师改哪一个，就直接改对应这一行。'
      };
    }

    if (section.id === 'resourceSection') {
      const ready = Boolean(page.header.resourceSectionTitle && page.header.resourceMoreText);
      return {
        ...section,
        summary: `${page.header.resourceSectionTitle || '未填写资源标题'} / ${page.header.resourceMoreText || '未填写右侧短文案'}`,
        statusLabel: ready ? '资源标题栏已完整' : '建议补齐标题栏',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '这里最好保持很短，让老师知道这一行只是资源区标题，不需要承载太多信息。'
      };
    }

    const ready = subject.resources.length >= 2 && subject.resources.every((item) => item.title);
    return {
      ...section,
      summary: subject.resources.length
        ? subject.resources.slice(0, 2).map((item) => item.title).join(' / ')
        : '还没有配置资源卡片',
      statusLabel: ready ? '资源卡片已完整' : `已配置 ${subject.resources.length}/2`,
      statusTone: ready ? 'success' : 'warning',
      teacherTip: '资源区从上到下就是前台展示顺序。老师想改哪一张卡，就在这张表里直接点编辑。'
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
  const completionPercent = Math.round((readySectionCount / homeSectionModels.length) * 100);
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

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

  const columns: ProColumns<HomeSectionRow>[] = [
    {
      title: '顺序',
      dataIndex: 'step',
      width: 108,
      search: false
    },
    {
      title: '区块',
      dataIndex: 'title',
      width: 280,
      search: false,
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
      search: false
    },
    {
      title: '当前内容摘要',
      dataIndex: 'summary',
      ellipsis: true,
      search: false
    },
    {
      title: '适用范围',
      dataIndex: 'mode',
      width: 140,
      search: false,
      render: (_, record) =>
        record.mode === 'shared' ? <Tag bordered={false}>高数/医护共用</Tag> : <Tag color="processing">{subjectLabels[subjectKey]}专属</Tag>
    },
    {
      title: '完成状态',
      dataIndex: 'statusLabel',
      width: 164,
      search: false,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '老师提示',
      dataIndex: 'teacherTip',
      width: 300,
      ellipsis: true,
      search: false
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      fixed: 'right',
      valueType: 'option',
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
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">首页内容主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              直接按小程序顺序编辑，不再来回找字段
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              老师先选学科，再从第 1 行一路往下编辑。每一行都对应前台同一位置，主视图只保留顺序、状态、摘要和操作。
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle" style={{ justifyContent: 'space-between', width: '100%' }}>
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
            <Space wrap>
              <Tag color="processing">表格主控区</Tag>
              <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
                {auth.permissions.canWrite ? '可直接保存' : '当前为只读'}
              </Tag>
              <Tag>{`最近更新 ${lastUpdated}`}</Tag>
            </Space>
          </Space>

          <Progress percent={completionPercent} showInfo={false} />

          <Space wrap size="large">
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">当前学科</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {subjectLabels[subjectKey]}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">已成型区块</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {readySectionCount}/{homeSectionModels.length}
              </Typography.Title>
            </div>
            <div className="home-workspace-summary">
              <Typography.Text type="secondary">快捷入口数</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {subject.quickEntries.length}/4
              </Typography.Title>
            </div>
            <div className="home-workspace-tip">
              <Typography.Text strong>老师友好说明</Typography.Text>
              <Typography.Paragraph style={{ marginBottom: 0 }}>
                优先补“今日学习主卡”和“资源卡片”两行，这两块最容易和学生端看到的变化形成直接对应。
              </Typography.Paragraph>
            </div>
          </Space>
        </Space>
      </Card>

      <ProTable<HomeSectionRow>
        rowKey="id"
        loading={homePageQuery.isLoading}
        columns={columns}
        dataSource={sections}
        search={false}
        pagination={false}
        options={false}
        cardBordered={false}
        scroll={{ x: 1320 }}
        headerTitle="首页区块清单"
        toolBarRender={() => [
          <Button
            key="edit-first"
            type="primary"
            icon={<EditOutlined />}
            disabled={!auth.permissions.canWrite}
            onClick={() => setEditingSection(sections[0]?.id || null)}
          >
            从第一行开始编辑
          </Button>
        ]}
      />

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
            onClose={() => setEditingSection(null)}
            onSave={handleSave}
          />
        </Suspense>
      ) : null}
    </Space>
  );
}

export default HomeContentPage;
