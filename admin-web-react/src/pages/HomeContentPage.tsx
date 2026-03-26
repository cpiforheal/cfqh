import { lazy, Suspense, useMemo, useState } from 'react';
import { App, Button, Card, Col, Empty, Result, Row, Space, Spin, Statistic, Tag, Timeline, Typography } from 'antd';
import { EditOutlined, LinkOutlined, PushpinOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import type { DirectionOption, HomePageContent, HomeSectionId, HomeSectionModel } from './home/types';

const HomeSectionEditorDrawer = lazy(() =>
  import('./home/HomeSectionEditorDrawer').then((module) => ({ default: module.HomeSectionEditorDrawer }))
);

type HomeContentPageProps = {
  auth: AuthState;
};

const defaultHomePage: HomePageContent = {
  hero: {
    chip: '',
    title: '',
    highlightTitle: '',
    desc: '',
    tags: [],
    primaryButton: {
      text: '',
      url: '',
      openType: 'navigate'
    },
    secondaryNote: '',
    backgroundImageSeed: ''
  },
  overviewStats: [],
  quickLinks: [],
  advantages: [],
  featuredDirectionIds: [],
  environmentSection: {
    title: '',
    subtitle: '',
    cards: []
  },
  cta: {
    title: '',
    desc: '',
    buttonText: '',
    footnote: ''
  }
};

function normalizeHomePage(data: Record<string, unknown> | null | undefined): HomePageContent {
  const source = (data || {}) as Record<string, unknown>;
  const hero = ((source.hero as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const primaryButton = ((hero.primaryButton as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const environmentSection = ((source.environmentSection as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;
  const cta = ((source.cta as Record<string, unknown> | undefined) || {}) as Record<string, unknown>;

  return {
    ...defaultHomePage,
    ...source,
    hero: {
      ...defaultHomePage.hero,
      chip: String(hero.chip || ''),
      title: String(hero.title || ''),
      highlightTitle: String(hero.highlightTitle || ''),
      desc: String(hero.desc || ''),
      tags: Array.isArray(hero.tags) ? hero.tags.map((item) => String(item)).filter(Boolean) : [],
      primaryButton: {
        text: String(primaryButton.text || ''),
        url: String(primaryButton.url || ''),
        openType: (String(primaryButton.openType || 'navigate') as HomePageContent['hero']['primaryButton']['openType']) || 'navigate'
      },
      secondaryNote: String(hero.secondaryNote || ''),
      backgroundImageSeed: String(hero.backgroundImageSeed || '')
    },
    overviewStats: Array.isArray(source.overviewStats)
      ? source.overviewStats.map((item) => ({
          value: String((item as Record<string, unknown>)?.value || ''),
          label: String((item as Record<string, unknown>)?.label || ''),
          note: String((item as Record<string, unknown>)?.note || '')
        }))
      : [],
    quickLinks: Array.isArray(source.quickLinks)
      ? source.quickLinks.map((item) => ({
          label: String((item as Record<string, unknown>)?.label || ''),
          desc: String((item as Record<string, unknown>)?.desc || ''),
          url: String((item as Record<string, unknown>)?.url || ''),
          openType: (String((item as Record<string, unknown>)?.openType || 'navigate') as HomePageContent['quickLinks'][number]['openType']) || 'navigate',
          icon: String((item as Record<string, unknown>)?.icon || '')
        }))
      : [],
    advantages: Array.isArray(source.advantages)
      ? source.advantages.map((item) => ({
          icon: String((item as Record<string, unknown>)?.icon || ''),
          title: String((item as Record<string, unknown>)?.title || ''),
          desc: String((item as Record<string, unknown>)?.desc || '')
        }))
      : [],
    featuredDirectionIds: Array.isArray(source.featuredDirectionIds)
      ? source.featuredDirectionIds.map((item) => String(item)).filter(Boolean)
      : [],
    environmentSection: {
      title: String(environmentSection.title || ''),
      subtitle: String(environmentSection.subtitle || ''),
      cards: Array.isArray(environmentSection.cards)
        ? environmentSection.cards.map((item) => ({
            label: String((item as Record<string, unknown>)?.label || ''),
            imageUrl: String((item as Record<string, unknown>)?.imageUrl || ''),
            imageSeed: String((item as Record<string, unknown>)?.imageSeed || '')
          }))
        : []
    },
    cta: {
      title: String(cta.title || ''),
      desc: String(cta.desc || ''),
      buttonText: String(cta.buttonText || ''),
      footnote: String(cta.footnote || '')
    },
    _createdAt: String(source._createdAt || ''),
    _updatedAt: String(source._updatedAt || ''),
    _meta: (source._meta as Record<string, unknown> | undefined) || undefined
  };
}

function normalizeDirections(data: Array<Record<string, unknown>> | undefined): DirectionOption[] {
  return (data || []).map((item) => ({
    id: String(item._id || ''),
    name: String(item.name || item.slug || '未命名方向'),
    category: String(item.category || ''),
    summary: String(item.summary || ''),
    audience: String(item.audience || ''),
    isFeatured: Boolean(item.isFeatured)
  }));
}

function buildSectionModels(page: HomePageContent, directions: DirectionOption[]): HomeSectionModel[] {
  const directionMap = new Map(directions.map((item) => [item.id, item]));
  const featuredDirections = page.featuredDirectionIds.map((id) => directionMap.get(id)).filter(Boolean) as DirectionOption[];

  return [
    {
      id: 'hero',
      step: '第 1 屏',
      title: '首页大屏主视觉',
      desc: '学生进入首页第一眼看到的大标题、亮点标签和首个按钮。',
      impact: '建议先把“适合谁”和“点进去会看到什么”写清楚。',
      location: '顶部小角标 / 两行主标题 / 首屏说明 / 首个按钮',
      summary: page.hero.title || page.hero.chip || '还没有配置首屏主视觉',
      statusLabel: page.hero.title && page.hero.primaryButton.text ? '首屏已成型' : '建议优先补齐',
      statusTone: page.hero.title && page.hero.primaryButton.text ? 'success' : 'warning'
    },
    {
      id: 'stats',
      step: '首屏下方',
      title: '首屏数据卡',
      desc: '三张数据卡负责在几秒内建立信任感。',
      impact: '建议只保留最强、最稳、最容易理解的数据。',
      location: '数值 / 标签 / 一句补充说明',
      summary: page.overviewStats.length
        ? page.overviewStats.slice(0, 3).map((item) => item.label).filter(Boolean).join(' / ')
        : '还没有配置数据卡',
      statusLabel: page.overviewStats.length >= 3 ? '数据卡完整' : `已配置 ${page.overviewStats.length}/3`,
      statusTone: page.overviewStats.length >= 3 ? 'success' : 'warning'
    },
    {
      id: 'quickLinks',
      step: '首屏入口',
      title: '首页四个功能入口',
      desc: '让老师快速决定学生下一步点击哪里。',
      impact: '入口标题建议控制在 2 到 4 个字，说明文案保持一句话。',
      location: '入口标题 / 说明 / 跳转地址 / 图标',
      summary: page.quickLinks.length
        ? page.quickLinks.slice(0, 4).map((item) => item.label).filter(Boolean).join(' / ')
        : '还没有配置功能入口',
      statusLabel: page.quickLinks.length >= 4 ? '入口已完整' : `已配置 ${page.quickLinks.length}/4`,
      statusTone: page.quickLinks.length >= 4 ? 'success' : 'warning'
    },
    {
      id: 'directions',
      step: '中段推荐',
      title: '热门方向',
      desc: '这里只决定首页推荐哪两张方向卡，卡片正文来自帖子模块。',
      impact: '适合把老师当前最想主推的两个方向固定在首页中段。',
      location: '方向卡片排序 / 推荐顺序',
      summary: featuredDirections.length ? featuredDirections.map((item) => item.name).join(' / ') : '还没有选中热门方向',
      statusLabel: featuredDirections.length >= 2 ? '方向推荐已完整' : `已选择 ${featuredDirections.length}/2`,
      statusTone: featuredDirections.length >= 2 ? 'success' : 'warning',
      linkedModule: {
        label: '帖子模块',
        target: '/directions',
        note: '方向卡详细文案、亮点和按钮，需要去帖子模块继续修改。'
      }
    },
    {
      id: 'advantages',
      step: '方向下方',
      title: '学习支持',
      desc: '解释学生为什么值得继续了解，是非常适合老师写“口语化卖点”的区域。',
      impact: '建议每张卡只说一个优势，像面对面讲解一样自然。',
      location: '卡片标题 / 一句说明 / 图标',
      summary: page.advantages.length
        ? page.advantages.slice(0, 4).map((item) => item.title).filter(Boolean).join(' / ')
        : '还没有配置学习支持',
      statusLabel: page.advantages.length >= 4 ? '学习支持完整' : `已配置 ${page.advantages.length}/4`,
      statusTone: page.advantages.length >= 4 ? 'success' : 'warning'
    },
    {
      id: 'environment',
      step: '咨询区上方',
      title: '校区环境',
      desc: '承接老师关于“环境怎么样”的介绍，让页面更具体。',
      impact: '图片名称建议直接写老师自己也会脱口而出的地点名。',
      location: '环境图名称 / 图片地址 / 环境区标题',
      summary: page.environmentSection.cards.length
        ? page.environmentSection.cards.slice(0, 2).map((item) => item.label).filter(Boolean).join(' / ')
        : '还没有配置环境图片',
      statusLabel: page.environmentSection.cards.length >= 2 ? '环境图完整' : `已配置 ${page.environmentSection.cards.length}/2`,
      statusTone: page.environmentSection.cards.length >= 2 ? 'success' : 'warning',
      linkedModule: {
        label: '联系方式模块',
        target: '/contact',
        note: '底部环境区附近展示的地址、电话和微信来自联系方式模块。'
      }
    },
    {
      id: 'cta',
      step: '页面底部',
      title: '底部咨询区',
      desc: '页面最后的承接位，决定学生愿不愿意留下咨询动作。',
      impact: '建议说清楚“点了以后会得到什么帮助”，而不是只写预约咨询。',
      location: '咨询区标题 / 说明 / 按钮文案 / 补充提示',
      summary: page.cta.title || page.cta.buttonText || '还没有配置咨询区',
      statusLabel: page.cta.title && page.cta.buttonText ? '咨询区已成型' : '建议补齐咨询话术',
      statusTone: page.cta.title && page.cta.buttonText ? 'success' : 'warning',
      linkedModule: {
        label: '联系方式模块',
        target: '/contact',
        note: '电话、微信、校区地址等公共联系方式，依然由联系方式模块统一维护。'
      }
    }
  ];
}

function countReadySections(sections: HomeSectionModel[]) {
  return sections.filter((item) => item.statusTone === 'success').length;
}

export function HomeContentPage({ auth }: HomeContentPageProps) {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [focusedSection, setFocusedSection] = useState<HomeSectionId>('hero');
  const [editingSection, setEditingSection] = useState<HomeSectionId | null>(null);

  const homePageQuery = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => api.getPage('home')
  });

  const directionsQuery = useQuery({
    queryKey: ['collection', 'directions'],
    queryFn: () => api.listCollection('directions')
  });

  const updateMutation = useMutation({
    mutationFn: (payload: HomePageContent) => api.updatePage('home', payload as unknown as Record<string, unknown>),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'home'] });
    }
  });

  const page = useMemo(() => normalizeHomePage(homePageQuery.data), [homePageQuery.data]);
  const directions = useMemo(() => normalizeDirections(directionsQuery.data), [directionsQuery.data]);
  const featuredDirections = useMemo(() => {
    const directionMap = new Map(directions.map((item) => [item.id, item]));
    return page.featuredDirectionIds.map((id) => directionMap.get(id)).filter(Boolean) as DirectionOption[];
  }, [directions, page.featuredDirectionIds]);
  const sections = useMemo(() => buildSectionModels(page, directions), [directions, page]);
  const readySectionCount = useMemo(() => countReadySections(sections), [sections]);
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取首页内容配置。" />;
  }

  if (homePageQuery.isError || directionsQuery.isError) {
    return <Result status="error" title="首页内容读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSaveSection(patch: Partial<HomePageContent>) {
    const payload = {
      ...(homePageQuery.data || {}),
      ...page,
      ...patch
    } as HomePageContent;

    await updateMutation.mutateAsync(payload);
    message.success('首页区块已保存');
    setEditingSection(null);
  }

  function handleNavigateToLinkedModule(target: '/directions' | '/contact') {
    navigate(target);
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Typography.Text className="eyebrow">首页内容主控区</Typography.Text>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          按小程序真实展示顺序维护首页
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          这版主控区围绕“老师一眼能看懂前台哪里对应后台哪里”来设计。左侧是首页可视化预览，右侧是分区任务卡，看到哪一块就改哪一块，不需要先理解字段名。
        </Typography.Paragraph>
        <Space wrap style={{ marginTop: 16 }}>
          <Tag color="processing">1:1 区块映射</Tag>
          <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
            {auth.permissions.canWrite ? '可直接保存首页内容' : '当前为只读模式'}
          </Tag>
          <Tag>{`最近更新 ${lastUpdated}`}</Tag>
        </Space>
      </Card>

      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} xl={10}>
          <Card title="手机端映射预览" className="home-preview-panel">
            {homePageQuery.isLoading ? (
              <div className="center-screen" style={{ minHeight: 420 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div className="home-mobile-shell">
                <div className="home-mobile-status-bar">
                  <span>首页内容预览</span>
                  <span>小程序第 1 页</span>
                </div>
                <button
                  type="button"
                  className={`home-mobile-block ${focusedSection === 'hero' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('hero')}
                >
                  <span className="home-mobile-step">第 1 屏</span>
                  <span className="home-mobile-chip">{page.hero.chip || '顶部小角标'}</span>
                  <span className="home-mobile-title">{page.hero.title || '首页第一行标题'}</span>
                  <span className="home-mobile-title is-highlight">{page.hero.highlightTitle || '首页第二行标题'}</span>
                  <span className="home-mobile-desc">{page.hero.desc || '首屏说明会出现在这里。'}</span>
                  <div className="home-mobile-tags">
                    {(page.hero.tags.length ? page.hero.tags : ['标签 1', '标签 2', '标签 3']).slice(0, 3).map((item) => (
                      <span key={item} className="home-mobile-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="home-mobile-button">{page.hero.primaryButton.text || '主按钮文案'}</span>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block home-mobile-block-grid ${focusedSection === 'stats' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('stats')}
                >
                  <span className="home-mobile-block-title">首屏数据卡</span>
                  <div className="home-mobile-stats">
                    {(page.overviewStats.length ? page.overviewStats : [{ value: '--', label: '数据卡' }, { value: '--', label: '数据卡' }, { value: '--', label: '数据卡' }]).slice(0, 3).map((item, index) => (
                      <div key={`${item.label}-${index}`} className="home-mobile-stat-card">
                        <strong>{item.value || '--'}</strong>
                        <span>{item.label || '数据标签'}</span>
                      </div>
                    ))}
                  </div>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block home-mobile-block-grid ${focusedSection === 'quickLinks' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('quickLinks')}
                >
                  <span className="home-mobile-block-title">首页四个功能入口</span>
                  <div className="home-mobile-links">
                    {(page.quickLinks.length
                      ? page.quickLinks
                      : [
                          { label: '功能入口', desc: '入口说明', url: '', openType: 'navigate', icon: 'icon' },
                          { label: '功能入口', desc: '入口说明', url: '', openType: 'navigate', icon: 'icon' },
                          { label: '功能入口', desc: '入口说明', url: '', openType: 'navigate', icon: 'icon' },
                          { label: '功能入口', desc: '入口说明', url: '', openType: 'navigate', icon: 'icon' }
                        ]
                    )
                      .slice(0, 4)
                      .map((item, index) => (
                        <div key={`${item.label}-${index}`} className="home-mobile-link-card">
                          <span className="home-mobile-link-icon">{item.icon || 'icon'}</span>
                          <strong>{item.label || '入口标题'}</strong>
                          <span>{item.desc || '入口说明'}</span>
                        </div>
                      ))}
                  </div>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block ${focusedSection === 'directions' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('directions')}
                >
                  <span className="home-mobile-block-title">热门方向</span>
                  <div className="home-mobile-directions">
                    {(featuredDirections.length ? featuredDirections : [{ id: 'placeholder-1', name: '热门方向 A', category: '', summary: '', audience: '', isFeatured: false }, { id: 'placeholder-2', name: '热门方向 B', category: '', summary: '', audience: '', isFeatured: false }]).slice(0, 2).map((item) => (
                      <div key={item.id} className="home-mobile-direction-card">
                        <strong>{item.name}</strong>
                        <span>{item.category || '方向分类'}</span>
                      </div>
                    ))}
                  </div>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block ${focusedSection === 'advantages' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('advantages')}
                >
                  <span className="home-mobile-block-title">学习支持</span>
                  <div className="home-mobile-advantage-list">
                    {(page.advantages.length
                      ? page.advantages
                      : [{ title: '学习支持 1', desc: '' }, { title: '学习支持 2', desc: '' }, { title: '学习支持 3', desc: '' }, { title: '学习支持 4', desc: '' }]
                    )
                      .slice(0, 4)
                      .map((item, index) => (
                        <div key={`${item.title}-${index}`} className="home-mobile-advantage-card">
                          <strong>{item.title}</strong>
                          <span>{item.desc || '一句说明'}</span>
                        </div>
                      ))}
                  </div>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block home-mobile-block-grid ${focusedSection === 'environment' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('environment')}
                >
                  <span className="home-mobile-block-title">校区环境</span>
                  <div className="home-mobile-environment">
                    {(page.environmentSection.cards.length
                      ? page.environmentSection.cards
                      : [{ label: '环境图 1', imageUrl: '', imageSeed: '' }, { label: '环境图 2', imageUrl: '', imageSeed: '' }]
                    )
                      .slice(0, 2)
                      .map((item, index) => (
                        <div key={`${item.label}-${index}`} className="home-mobile-environment-card">
                          <span>{item.label || '环境图片'}</span>
                        </div>
                      ))}
                  </div>
                </button>

                <button
                  type="button"
                  className={`home-mobile-block ${focusedSection === 'cta' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('cta')}
                >
                  <span className="home-mobile-block-title">底部咨询区</span>
                  <strong className="home-mobile-cta-title">{page.cta.title || '咨询区标题'}</strong>
                  <span className="home-mobile-desc">{page.cta.desc || '咨询区说明会出现在这里。'}</span>
                  <span className="home-mobile-button is-secondary">{page.cta.buttonText || '咨询按钮文案'}</span>
                </button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="已成型区块" value={readySectionCount} suffix="/ 7" />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="已选热门方向" value={page.featuredDirectionIds.length} suffix="/ 2" />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic title="当前页面版本" value={Number(page._meta?.revision || 0)} />
                </Card>
              </Col>
            </Row>

            <Card title="老师友好操作建议">
              <Timeline
                items={[
                  {
                    color: 'blue',
                    children: '先改首页大屏主视觉，确保学生第一次打开首页就知道自己适不适合继续看。'
                  },
                  {
                    color: 'blue',
                    children: '再检查四个功能入口和热门方向，把老师最常带学生点击的路径放在前面。'
                  },
                  {
                    color: 'blue',
                    children: '最后补校区环境和底部咨询区，确保页面前后承接完整。'
                  }
                ]}
              />
            </Card>

            <Card title="当前聚焦区块">
              {sections
                .filter((item) => item.id === focusedSection)
                .map((item) => (
                  <Space key={item.id} direction="vertical" size="small" style={{ width: '100%' }}>
                    <Space wrap>
                      <Tag color="processing">{item.step}</Tag>
                      <Tag color={item.statusTone === 'success' ? 'success' : 'warning'}>{item.statusLabel}</Tag>
                    </Space>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      {item.title}
                    </Typography.Title>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                      {item.desc}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>{item.impact}</Typography.Paragraph>
                    <Typography.Text type="secondary">前台映射位置：{item.location}</Typography.Text>
                    <Typography.Text>当前内容：{item.summary}</Typography.Text>
                    <Space wrap>
                      <Button icon={<EditOutlined />} type="primary" onClick={() => setEditingSection(item.id)} disabled={!auth.permissions.canWrite}>
                        编辑这个区块
                      </Button>
                      {item.linkedModule ? (
                        <Button icon={<LinkOutlined />} onClick={() => handleNavigateToLinkedModule(item.linkedModule!.target)}>
                          去{item.linkedModule.label}
                        </Button>
                      ) : null}
                    </Space>
                    {item.linkedModule ? (
                      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {item.linkedModule.note}
                      </Typography.Paragraph>
                    ) : null}
                  </Space>
                ))}
            </Card>
          </Space>
        </Col>
      </Row>

      <Card title="首页区块清单" extra={<Typography.Text type="secondary">从上到下与小程序首页显示顺序保持一致</Typography.Text>}>
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
                  <Tag bordered={false}>{section.location}</Tag>
                </Space>
                <div>
                  <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
                    {section.title}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
                    {section.desc}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ marginBottom: 8 }}>{section.impact}</Typography.Paragraph>
                  <Typography.Text>当前内容：{section.summary}</Typography.Text>
                </div>
                <Space wrap>
                  <Button icon={<PushpinOutlined />} onClick={() => setFocusedSection(section.id)}>
                    定位到预览
                  </Button>
                  <Button icon={<EditOutlined />} type="primary" onClick={() => setEditingSection(section.id)} disabled={!auth.permissions.canWrite}>
                    编辑
                  </Button>
                  {section.linkedModule ? (
                    <Button icon={<LinkOutlined />} onClick={() => handleNavigateToLinkedModule(section.linkedModule!.target)}>
                      去{section.linkedModule.label}
                    </Button>
                  ) : null}
                </Space>
                {section.linkedModule ? (
                  <Typography.Text type="secondary">{section.linkedModule.note}</Typography.Text>
                ) : null}
              </Space>
            </div>
          ))}
        </div>
      </Card>

      {editingSection ? (
        <Suspense
          fallback={
            <Card>
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
            directions={directions}
            saving={updateMutation.isPending}
            canWrite={auth.permissions.canWrite}
            onClose={() => setEditingSection(null)}
            onSave={handleSaveSection}
          />
        </Suspense>
      ) : null}

      {!homePageQuery.isLoading && !sections.length ? (
        <Empty description="暂未读取到首页内容" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : null}
    </Space>
  );
}
