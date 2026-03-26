import { lazy, Suspense, useMemo, useState, type ReactNode } from 'react';
import {
  App,
  Button,
  Card,
  Col,
  Empty,
  Progress,
  Result,
  Row,
  Segmented,
  Space,
  Spin,
  Statistic,
  Tag,
  Typography
} from 'antd';
import {
  AppstoreOutlined,
  EditOutlined,
  FileTextOutlined,
  ProfileOutlined,
  ReadOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import {
  homeSectionModels,
  normalizeHomePage,
  subjectLabels,
  subjectThemeMeta
} from './home/types';
import type { HomePageContent, HomeQuickEntryKind, HomeSectionId, HomeSubjectKey } from './home/types';

const HomeSectionEditorDrawer = lazy(() =>
  import('./home/HomeSectionEditorDrawer').then((module) => ({ default: module.HomeSectionEditorDrawer }))
);

type HomeContentPageProps = {
  auth: AuthState;
};

type HomeSectionCard = {
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

const quickEntryIconMap: Record<HomeQuickEntryKind, ReactNode> = {
  practice: <ReadOutlined />,
  daily: <ProfileOutlined />,
  mock: <FileTextOutlined />,
  wrong: <AppstoreOutlined />
};

function readSubjectKey(value: string | null): HomeSubjectKey {
  return value === 'medical' ? 'medical' : 'math';
}

function buildSectionCards(page: HomePageContent, subjectKey: HomeSubjectKey): HomeSectionCard[] {
  const subject = page.subjects[subjectKey];

  return homeSectionModels.map((section) => {
    if (section.id === 'header') {
      const ready = Boolean(page.header.title && page.header.subtitle);
      return {
        ...section,
        summary: `${page.header.title || '未填写标题'} / ${page.header.subtitle || '未填写副标题'}`,
        statusLabel: ready ? '标题已完整' : '建议先补齐标题',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '学生先看到这里。先把主标题写得足够直白，再用一句副标题说明今天适合做什么。'
      };
    }

    if (section.id === 'dailyCard') {
      const ready = Boolean(subject.learningCard.title && subject.learningCard.actionText);
      return {
        ...section,
        summary: `${subject.learningCard.title || '未填写主卡标题'} · ${subject.learningCard.progressText || '未填写进度'}`,
        statusLabel: ready ? '学习主卡已成型' : '建议先补齐主卡',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '把老师最希望学生今天立刻去做的任务放在这里，按钮文案尽量是动作词。'
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
        teacherTip: '入口名称建议都是学生一看就知道会进去做什么的词，不要让老师去猜字段归属。'
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
      summary: subject.resources.length ? subject.resources.slice(0, 2).map((item) => item.title).join(' / ') : '还没有配置资源卡片',
      statusLabel: ready ? '资源卡片已完整' : `已配置 ${subject.resources.length}/2`,
      statusTone: ready ? 'success' : 'warning',
      teacherTip: '资源区从上到下就是前台展示顺序。老师想改哪一张卡，就在这里直接改对应序号。'
    };
  });
}

function countReadySections(sections: HomeSectionCard[]) {
  return sections.filter((item) => item.statusTone === 'success').length;
}

export function HomeContentPage({ auth }: HomeContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedSection, setFocusedSection] = useState<HomeSectionId>('header');
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
  const palette = subjectThemeMeta[subjectKey];
  const sections = useMemo(() => buildSectionCards(page, subjectKey), [page, subjectKey]);
  const readySectionCount = useMemo(() => countReadySections(sections), [sections]);
  const focusedSectionCard = sections.find((item) => item.id === focusedSection) || sections[0];
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

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">首页内容主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              从上到下和小程序首页一一对应
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              老师先选学科，再顺着页面往下看。左边看到哪一块，右边就改哪一块；新增和修改都不需要四处找字段。
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
              <Tag color="processing">真实前台顺序</Tag>
              <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
                {auth.permissions.canWrite ? '可直接保存' : '当前为只读'}
              </Tag>
              <Tag>{`最近更新 ${lastUpdated}`}</Tag>
            </Space>
          </Space>
        </Space>
      </Card>

      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} xl={11}>
          <Card
            title="小程序 1:1 映射预览"
            extra={<Typography.Text type="secondary">点击任一区块，右侧会同步定位</Typography.Text>}
            className="home-preview-panel"
          >
            {homePageQuery.isLoading ? (
              <div className="center-screen" style={{ minHeight: 520 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div className="home-mobile-shell">
                <div className="home-mobile-topbar">
                  <span>10:22</span>
                  <span>首页</span>
                  <span>◌◌◌</span>
                </div>

                <button
                  type="button"
                  className={`home-mobile-section home-mobile-nav ${focusedSection === 'header' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('header')}
                >
                  <span className="home-mobile-nav-title">{page.header.title}</span>
                  <span className="home-mobile-nav-subtitle">{page.header.subtitle}</span>
                </button>

                <button
                  type="button"
                  className={`home-mobile-section home-mobile-daily-card ${focusedSection === 'dailyCard' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('dailyCard')}
                >
                  <div className="home-mobile-daily-top">
                    <div>
                      <strong>{subject.learningCard.title}</strong>
                      <span>{subject.learningCard.subtitle}</span>
                    </div>
                    <span className="home-mobile-streak" style={{ color: palette.chipText, background: palette.accentSoft }}>
                      {subject.learningCard.streakText}
                    </span>
                  </div>
                  <div className="home-mobile-task">
                    <div className="home-mobile-task-head">
                      <span>{subject.learningCard.taskLabel}</span>
                      <strong>{subject.learningCard.progressText}</strong>
                    </div>
                    <Progress
                      percent={subject.learningCard.progressPercent}
                      showInfo={false}
                      strokeColor={palette.accent}
                      trailColor="rgba(209, 218, 233, 0.92)"
                      size={{ height: 10 }}
                    />
                  </div>
                  <span className="home-mobile-primary-action" style={{ background: palette.accent }}>
                    {subject.learningCard.actionText}
                  </span>
                </button>

                <button
                  type="button"
                  className={`home-mobile-section home-mobile-quick-grid ${focusedSection === 'quickEntries' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('quickEntries')}
                >
                  {subject.quickEntries.slice(0, 4).map((item, index) => (
                    <div key={`${item.label}-${index}`} className="home-mobile-quick-card">
                      <span className="home-mobile-quick-icon" style={{ color: item.accent, background: item.bg }}>
                        {quickEntryIconMap[item.kind]}
                      </span>
                      <strong>{item.label}</strong>
                      <span>{item.note}</span>
                    </div>
                  ))}
                </button>

                <button
                  type="button"
                  className={`home-mobile-section home-mobile-resource-head ${focusedSection === 'resourceSection' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('resourceSection')}
                >
                  <strong>{page.header.resourceSectionTitle}</strong>
                  <span>
                    {page.header.resourceMoreText}
                    <RightOutlined />
                  </span>
                </button>

                <button
                  type="button"
                  className={`home-mobile-section home-mobile-resource-list ${focusedSection === 'resources' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('resources')}
                >
                  {subject.resources.slice(0, 2).map((item, index) => (
                    <div key={`${item.title}-${index}`} className="home-mobile-resource-card">
                      <div className="home-mobile-resource-thumb">
                        <span>{item.type}</span>
                        <small>{item.type === 'V' ? '公开课' : 'PDF资料'}</small>
                      </div>
                      <div className="home-mobile-resource-copy">
                        <strong>{item.title}</strong>
                        <span>{item.subtitle}</span>
                        <div className="home-mobile-resource-meta">
                          <Tag color="default" bordered={false}>
                            {item.chip}
                          </Tag>
                          <span>{item.meta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} xl={13}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card className="home-workspace-card">
                  <Statistic title="当前学科" value={subjectLabels[subjectKey]} />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="home-workspace-card">
                  <Statistic title="已成型区块" value={readySectionCount} suffix={`/ ${homeSectionModels.length}`} />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="home-workspace-card">
                  <Statistic title="快捷入口数" value={subject.quickEntries.length} suffix="/ 4" />
                </Card>
              </Col>
            </Row>

            <Card title="当前聚焦区块" className="home-workspace-card">
              {focusedSectionCard ? (
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Space wrap>
                    <Tag color="processing">{focusedSectionCard.step}</Tag>
                    <Tag color={focusedSectionCard.statusTone === 'success' ? 'success' : 'warning'}>
                      {focusedSectionCard.statusLabel}
                    </Tag>
                    <Tag bordered={false}>{focusedSectionCard.mode === 'shared' ? '高数/医护共用' : `${subjectLabels[subjectKey]}专属`}</Tag>
                  </Space>
                  <div>
                    <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                      {focusedSectionCard.title}
                    </Typography.Title>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
                      {focusedSectionCard.desc}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">前台位置：{focusedSectionCard.location}</Typography.Text>
                  </div>
                  <div className="home-workspace-summary">
                    <Typography.Text strong>当前内容</Typography.Text>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>{focusedSectionCard.summary}</Typography.Paragraph>
                  </div>
                  <div className="home-workspace-tip">
                    <Typography.Text strong>新手老师提示</Typography.Text>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>{focusedSectionCard.teacherTip}</Typography.Paragraph>
                  </div>
                  <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => setEditingSection(focusedSectionCard.id)}
                    disabled={!auth.permissions.canWrite}
                  >
                    编辑这个区块
                  </Button>
                </Space>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有读取到区块信息" />
              )}
            </Card>
          </Space>
        </Col>
      </Row>

      <Card title="首页区块清单" extra={<Typography.Text type="secondary">顺序与前台保持一致</Typography.Text>} className="home-workspace-card">
        <div className="home-section-grid">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`home-section-card ${focusedSection === section.id ? 'is-focused' : ''}`}
              onMouseEnter={() => setFocusedSection(section.id)}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space wrap>
                  <Tag color="processing">{section.step}</Tag>
                  <Tag color={section.statusTone === 'success' ? 'success' : 'warning'}>{section.statusLabel}</Tag>
                  <Tag bordered={false}>{section.mode === 'shared' ? '共用区块' : `${subjectLabels[subjectKey]}区块`}</Tag>
                </Space>
                <div>
                  <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                    {section.title}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
                    {section.desc}
                  </Typography.Paragraph>
                  <Typography.Text type="secondary">前台位置：{section.location}</Typography.Text>
                </div>
                <div className="home-workspace-summary">
                  <Typography.Text strong>当前内容</Typography.Text>
                  <Typography.Paragraph style={{ marginBottom: 0 }}>{section.summary}</Typography.Paragraph>
                </div>
                <div className="home-workspace-tip">
                  <Typography.Text strong>老师友好说明</Typography.Text>
                  <Typography.Paragraph style={{ marginBottom: 0 }}>{section.teacherTip}</Typography.Paragraph>
                </div>
                <Space wrap>
                  <Button onClick={() => setFocusedSection(section.id)}>定位到左侧预览</Button>
                  <Button icon={<EditOutlined />} type="primary" onClick={() => setEditingSection(section.id)} disabled={!auth.permissions.canWrite}>
                    编辑这个区块
                  </Button>
                </Space>
              </Space>
            </div>
          ))}
        </div>
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
            onClose={() => setEditingSection(null)}
            onSave={handleSave}
          />
        </Suspense>
      ) : null}
    </Space>
  );
}

export default HomeContentPage;
