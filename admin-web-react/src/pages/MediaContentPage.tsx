import { lazy, Suspense, useMemo, useState } from 'react';
import {
  App,
  Button,
  Card,
  Col,
  Empty,
  List,
  Popconfirm,
  Progress,
  Result,
  Row,
  Segmented,
  Space,
  Spin,
  Tag,
  Typography
} from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import {
  defaultMaterialItem,
  defaultMaterialPackage,
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

type MediaSectionCard = {
  id: MaterialSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  summary: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
  teacherTip: string;
};

function buildSectionCards(
  page: ReturnType<typeof normalizeMaterialsPage>,
  currentPackage: MaterialPackageRecord | null,
  currentItems: MaterialItemRecord[]
): MediaSectionCard[] {
  return mediaSectionModels.map((section) => {
    if (section.id === 'header') {
      const ready = Boolean(page.header.title && page.header.searchLabel);
      return {
        ...section,
        summary: `${page.header.title || '未填写标题'} / ${page.header.searchLabel || '未填写搜索提示'}`,
        statusLabel: ready ? '顶部已完整' : '建议补齐顶部文案',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '先把这里想成学生进商城第一眼。老师想让学生知道这是“课、资料、套系”哪一种，就直接写在主标题里。'
      };
    }

    if (section.id === 'directionTabs') {
      const ready = page.directionTabs.length >= 2 && page.directionTabs.every((item) => item.label);
      return {
        ...section,
        summary: page.directionTabs.map((item) => item.label).join(' / ') || '还没有配置学科切换',
        statusLabel: ready ? '学科切换已完整' : `已配置 ${page.directionTabs.length}/2`,
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '老师不需要理解技术字段，只要改显示名称就行，顺序会直接映射到前台。'
      };
    }

    if (section.id === 'stageTabs') {
      const ready = page.stageTabs.length >= 3 && page.stageTabs.every((item) => item.label);
      return {
        ...section,
        summary: page.stageTabs.map((item) => item.label).join(' / ') || '还没有配置阶段按钮',
        statusLabel: ready ? '阶段按钮已完整' : `已配置 ${page.stageTabs.length}/3`,
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '阶段按钮建议保持短句，学生在手机上切换时更容易一眼看懂。'
      };
    }

    if (section.id === 'mainSection') {
      const ready = Boolean(page.mainSection.title && page.mainSection.sideNote);
      return {
        ...section,
        summary: `${page.mainSection.title || '未填写标题'} / ${page.mainSection.sideNote || '未填写提示'}`,
        statusLabel: ready ? '主推区标题已完整' : '建议补齐主推区标题',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '这一行最好像路标一样，直接告诉老师和学生“接下来这张大卡是做什么的”，改动成本最低、反馈也最直观。'
      };
    }

    if (section.id === 'package') {
      const ready = Boolean(currentPackage?.title && currentPackage?.target && currentPackage?.solves);
      return {
        ...section,
        summary: currentPackage ? `${currentPackage.title} / ${currentPackage.badge}` : '当前学科阶段还没有主推套系',
        statusLabel: ready ? '主推套系已完整' : currentPackage ? '建议补齐主卡信息' : '建议先创建当前主卡',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '这一块最好先回答两个问题：适合谁，解决什么问题。这样老师和学生都更容易判断要不要点进去。'
      };
    }

    if (section.id === 'shelfSection') {
      const ready = Boolean(page.shelfSection.title && page.shelfSection.hint);
      return {
        ...section,
        summary: `${page.shelfSection.title || '未填写标题'} / ${page.shelfSection.hint || '未填写提示'}`,
        statusLabel: ready ? '资料区标题已完整' : '建议补齐资料区文案',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '这里仅仅是过渡说明，告诉老师和学生“下面这部分是什么”，不用塞太多信息。'
      };
    }

    if (section.id === 'items') {
      const ready = currentItems.length > 0 && currentItems.every((item) => item.title && item.subtitle);
      return {
        ...section,
        summary: currentItems.length ? currentItems.slice(0, 3).map((item) => item.title).join(' / ') : '当前阶段还没有资料卡片',
        statusLabel: ready ? `资料卡片 ${currentItems.length} 张` : '建议先补一张资料卡片',
        statusTone: ready ? 'success' : 'warning',
        teacherTip: '老师改哪一张资料卡，就在当前列表直接改对应顺序，不需要去找另外一个集合或隐藏字段。'
      };
    }

    const ready = Boolean(page.consultBar.title && page.consultBar.desc && page.consultBar.buttonText);
    return {
      ...section,
      summary: `${page.consultBar.title || '未填写标题'} / ${page.consultBar.buttonText || '未填写按钮'}`,
      statusLabel: ready ? '咨询条已完整' : '建议补齐咨询文案',
      statusTone: ready ? 'success' : 'warning',
      teacherTip: '这里适合放最后承接动作，尤其是老师希望用户咨询、领资料或联系顾问的时候。'
    };
  });
}

function countReadySections(sections: MediaSectionCard[]) {
  return sections.filter((item) => item.statusTone === 'success').length;
}

export function MediaContentPage({ auth }: MediaContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [focusedSection, setFocusedSection] = useState<MaterialSectionId>('header');
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
  const sections = useMemo(() => buildSectionCards(page, currentPackage, currentItems), [page, currentPackage, currentItems]);
  const focusedSectionCard = sections.find((item) => item.id === focusedSection) || sections[0];
  const readySectionCount = useMemo(() => countReadySections(sections), [sections]);
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

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">商城内容主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              从学科切换到资料卡片，和小程序商城页一一对应
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              老师先选当前学科和阶段，再沿着页面顺序往下改。看到哪一块，就在右侧直接改哪一块，不需要来回找集合和字段。
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
            title="商城页 1:1 映射预览"
            extra={<Typography.Text type="secondary">点击任一区块，右侧会同步定位</Typography.Text>}
            className="media-preview-panel"
          >
            {pageQuery.isLoading || packagesQuery.isLoading || itemsQuery.isLoading ? (
              <div className="center-screen" style={{ minHeight: 520 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div className="media-mobile-shell">
                <div className="media-mobile-topbar">
                  <span>10:22</span>
                  <span>商城</span>
                  <span>◌◌◌</span>
                </div>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-header ${focusedSection === 'header' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('header')}
                >
                  <div>
                    <strong>{page.header.title}</strong>
                    <span>老师看到的标题改这里，学生前台也按这里显示</span>
                  </div>
                  <em>{page.header.searchLabel}</em>
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-subjects ${focusedSection === 'directionTabs' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('directionTabs')}
                >
                  {page.directionTabs.map((item) => (
                    <span key={item.key} className={item.key === direction ? 'is-active' : ''} style={item.key === direction ? { color: '#fff', background: palette.accent } : undefined}>
                      {item.label}
                    </span>
                  ))}
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-stages ${focusedSection === 'stageTabs' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('stageTabs')}
                >
                  {page.stageTabs.map((item) => (
                    <span
                      key={item.key}
                      className={item.key === stage ? 'is-active' : ''}
                      style={item.key === stage ? { borderColor: palette.accent, color: palette.deep, background: palette.accentSoft } : undefined}
                    >
                      {item.label}
                    </span>
                  ))}
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-shelf-head ${focusedSection === 'mainSection' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('mainSection')}
                >
                  <strong>{page.mainSection.title}</strong>
                  <span>{page.mainSection.sideNote}</span>
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-package ${focusedSection === 'package' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('package')}
                  style={{ background: palette.surface }}
                >
                  {currentPackage ? (
                    <>
                      <div className="media-mobile-package-head">
                        <span className="media-mobile-badge" style={{ color: palette.deep, background: palette.accentSoft }}>
                          {currentPackage.badge}
                        </span>
                        <em>{page.mainSection.sideNote}</em>
                      </div>
                      <strong>{currentPackage.title}</strong>
                      <p>{currentPackage.target}</p>
                      <small>{currentPackage.solves}</small>
                      <div className="media-mobile-feature-list">
                        {currentPackage.features.map((item) => (
                          <span key={item} style={{ borderColor: palette.accentLine, color: palette.deep }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前阶段还没有主推套系" />
                  )}
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-shelf-head ${focusedSection === 'shelfSection' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('shelfSection')}
                >
                  <strong>{page.shelfSection.title}</strong>
                  <span>{page.shelfSection.hint}</span>
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-items ${focusedSection === 'items' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('items')}
                >
                  {currentItems.length ? (
                    currentItems.slice(0, 3).map((item) => (
                      <div key={item._id || `${item.title}-${item.sort}`} className="media-mobile-item-card">
                        <div className="media-mobile-item-thumb" style={{ background: `linear-gradient(135deg, ${item.accentStart} 0%, ${item.accentEnd} 100%)` }}>
                          <span>{item.type.slice(0, 1) || '资'}</span>
                          <small>{item.type}</small>
                        </div>
                        <div className="media-mobile-item-copy">
                          <strong>{item.title}</strong>
                          <span>{item.subtitle}</span>
                          <small>{item.desc}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前阶段还没有资料卡片" />
                  )}
                </button>

                <button
                  type="button"
                  className={`media-mobile-section media-mobile-consult ${focusedSection === 'consultBar' ? 'is-focused' : ''}`}
                  onClick={() => setFocusedSection('consultBar')}
                >
                  <div>
                    <strong>{page.consultBar.title}</strong>
                    <span>{page.consultBar.desc}</span>
                  </div>
                  <em>{page.consultBar.buttonText}</em>
                </button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} xl={13}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card className="home-workspace-card">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Typography.Text className="eyebrow">当前完成度</Typography.Text>
                  <Typography.Title level={4} style={{ marginTop: 6, marginBottom: 8 }}>
                    {materialDirectionLabels[direction]} · {materialStageLabels[stage]}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    这一组页面内容已经拆成老师更容易理解的 8 个区块。完成度越高，说明商城页从上到下越完整。
                  </Typography.Paragraph>
                </div>

                <Progress percent={Math.round((readySectionCount / sections.length) * 100)} strokeColor={palette.accent} />

                <Space wrap size="large">
                  <div className="home-workspace-summary">
                    <Typography.Text type="secondary">已完成区块</Typography.Text>
                    <Typography.Title level={3} style={{ margin: 0 }}>
                      {readySectionCount}/{sections.length}
                    </Typography.Title>
                  </div>
                  <div className="home-workspace-tip">
                    <Typography.Text strong>老师操作建议</Typography.Text>
                    <Typography.Paragraph style={{ marginBottom: 0 }}>
                      先补主推套系，再补资料卡片。这样老师在前台预览时，最容易看出当前学科阶段是不是已经成型。
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Space>
            </Card>

            <Card title="当前页面任务卡" className="home-workspace-card">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={`home-section-card ${focusedSection === section.id ? 'is-focused' : ''}`}
                    onClick={() => setFocusedSection(section.id)}
                  >
                    <Space direction="vertical" size={6} style={{ width: '100%', textAlign: 'left' }}>
                      <Space wrap>
                        <Tag color="blue">{section.step}</Tag>
                        <Tag color={section.statusTone === 'success' ? 'success' : 'warning'}>{section.statusLabel}</Tag>
                      </Space>
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {section.title}
                      </Typography.Title>
                      <Typography.Text type="secondary">{section.summary}</Typography.Text>
                      <Typography.Text type="secondary">{section.location}</Typography.Text>
                    </Space>
                  </button>
                ))}
              </Space>
            </Card>

            <Card
              title={`正在查看：${focusedSectionCard?.title || '商城区块'}`}
              extra={
                focusedSection === 'package' ? (
                  <Button
                    type="primary"
                    icon={currentPackage ? <EditOutlined /> : <PlusOutlined />}
                    onClick={() => {
                      setEditingPackage(currentPackage);
                      setPackageDrawerOpen(true);
                    }}
                    disabled={!auth.permissions.canWrite}
                  >
                    {currentPackage ? '编辑当前主卡' : '创建当前主卡'}
                  </Button>
                ) : focusedSection === 'items' ? (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setEditingItem({
                        ...defaultMaterialItem,
                        direction,
                        stage
                      });
                      setItemDrawerOpen(true);
                    }}
                    disabled={!auth.permissions.canWrite}
                  >
                    新增资料卡片
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setEditingSection(focusedSection)}
                    disabled={!auth.permissions.canWrite}
                  >
                    编辑这一区块
                  </Button>
                )
              }
              className="home-workspace-card"
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Typography.Paragraph style={{ marginBottom: 0 }}>{focusedSectionCard?.desc}</Typography.Paragraph>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {focusedSectionCard?.teacherTip}
                </Typography.Paragraph>

                {focusedSection === 'package' ? (
                  currentPackage ? (
                    <div className="media-detail-card">
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Tag color="processing">{currentPackage.badge}</Tag>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {currentPackage.title}
                        </Typography.Title>
                        <Typography.Text type="secondary">{currentPackage.target}</Typography.Text>
                        <Typography.Paragraph style={{ marginBottom: 0 }}>{currentPackage.solves}</Typography.Paragraph>
                        <Space wrap>
                          {currentPackage.features.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </Space>
                      </Space>
                    </div>
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前学科和阶段还没有主推套系" />
                  )
                ) : null}

                {focusedSection === 'items' ? (
                  currentItems.length ? (
                    <List
                      dataSource={currentItems}
                      renderItem={(item, index) => (
                        <List.Item
                          actions={[
                            <a
                              key="edit"
                              onClick={() => {
                                setEditingItem(item);
                                setItemDrawerOpen(true);
                              }}
                            >
                              编辑
                            </a>,
                            <Popconfirm
                              key="delete"
                              title="确定删除这张资料卡片吗？"
                              onConfirm={() => handleDeleteItem(item)}
                              okButtonProps={{ danger: true }}
                              disabled={!auth.permissions.canWrite}
                            >
                              <a style={{ color: '#cf1322' }}>删除</a>
                            </Popconfirm>
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <Space wrap>
                                <Typography.Text strong>{`${index + 1}. ${item.title}`}</Typography.Text>
                                <Tag>{item.type}</Tag>
                                <Tag bordered={false}>{`排序 ${item.sort}`}</Tag>
                              </Space>
                            }
                            description={
                              <Space direction="vertical" size={2}>
                                <Typography.Text type="secondary">{item.subtitle}</Typography.Text>
                                <Typography.Text type="secondary">{item.desc}</Typography.Text>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前学科和阶段还没有资料卡片" />
                  )
                ) : null}
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      <Suspense fallback={null}>
        <MediaSectionEditorDrawer
          open={Boolean(editingSection) && editingSection !== 'package' && editingSection !== 'items'}
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
