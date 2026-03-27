import { useEffect, useMemo } from 'react';
import { Alert, Button, Drawer, Form, Input, InputNumber, Select, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { defaultHomePage, homeSectionModels, quickEntryKindOptions, subjectLabels, type HomePageContent, type HomeSectionId, type HomeSubjectKey, type LinkOpenType } from './types';

type HomeSectionEditorDrawerProps = {
  open: boolean;
  sectionId: HomeSectionId | null;
  page: HomePageContent;
  subjectKey: HomeSubjectKey;
  saving: boolean;
  canWrite: boolean;
  onClose: () => void;
  onSave: (payload: HomePageContent) => Promise<void>;
};

type SectionValues = {
  header: HomePageContent['header'];
  learningCard: HomePageContent['subjects'][HomeSubjectKey]['learningCard'];
  quickEntries: HomePageContent['subjects'][HomeSubjectKey]['quickEntries'];
  resources: HomePageContent['subjects'][HomeSubjectKey]['resources'];
};

const openTypeOptions: Array<{ label: string; value: LinkOpenType }> = [
  { label: '普通页面跳转 navigate', value: 'navigate' },
  { label: '底部 Tab 切换 switchTab', value: 'switchTab' },
  { label: '关闭当前页重定向 redirectTo', value: 'redirectTo' },
  { label: '重启页面 reLaunch', value: 'reLaunch' }
];

const sectionTitleMap: Record<HomeSectionId, string> = {
  header: '顶部标题区',
  dailyCard: '今日学习主卡',
  quickEntries: '四个快捷入口',
  resourceSection: '资源区标题栏',
  resources: '资源卡片'
};

const sectionNoteMap: Record<HomeSectionId, string> = {
  header: '这一块就是首页最上面的标题和副标题，建议用老师平时会说的话来写，不用写得太技术化。',
  dailyCard: '这一块就是学生最先看到、最可能点进去的学习主卡，按钮文案越直接越好。',
  quickEntries: '四个入口从左到右和小程序完全一致。老师想改哪一个入口，就改对应序号。',
  resourceSection: '这里只改资源区标题那一行，不包含下面的资源卡片内容。',
  resources: '资源卡片从上到下就是前台展示顺序。老师通常只需要维护第 1 张和第 2 张。'
};

const sectionFieldHintMap: Record<HomeSectionId, string> = {
  header: '会修改：主标题、副标题',
  dailyCard: '会修改：卡片标题、进度、按钮文案、跳转页面',
  quickEntries: '会修改：4 个入口的名称、副标题、图标和跳转页面',
  resourceSection: '会修改：资源区标题、右上角短字',
  resources: '会修改：2 张资源卡的标题、副标题、标签、辅助信息'
};

function SectionListHeader({
  title,
  count,
  max,
  onAdd,
  disabled
}: {
  title: string;
  count: number;
  max: number;
  onAdd: () => void;
  disabled: boolean;
}) {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Typography.Text strong>
        {title} {count ? `(${count}/${max})` : ''}
      </Typography.Text>
      <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} disabled={disabled || count >= max}>
        新增一项
      </Button>
    </Space>
  );
}

function buildInitialValues(page: HomePageContent, subjectKey: HomeSubjectKey): SectionValues {
  const subject = page.subjects[subjectKey];

  return {
    header: page.header,
    learningCard: subject.learningCard,
    quickEntries: subject.quickEntries,
    resources: subject.resources
  };
}

function buildSectionPreview(sectionId: HomeSectionId, page: HomePageContent, subjectKey: HomeSubjectKey) {
  const subject = page.subjects[subjectKey];

  if (sectionId === 'header') {
    return `${page.header.title || '未填写标题'} / ${page.header.subtitle || '未填写副标题'}`;
  }

  if (sectionId === 'dailyCard') {
    return `${subject.learningCard.title || '未填写主卡标题'} / ${subject.learningCard.actionText || '未填写按钮文案'}`;
  }

  if (sectionId === 'quickEntries') {
    return subject.quickEntries.length
      ? subject.quickEntries.map((item, index) => `${index + 1}. ${item.label || '未命名入口'}`).join(' / ')
      : '还没有配置入口';
  }

  if (sectionId === 'resourceSection') {
    return `${page.header.resourceSectionTitle || '未填写资源区标题'} / ${page.header.resourceMoreText || '未填写右上角短字'}`;
  }

  return subject.resources.length
    ? subject.resources.map((item, index) => `${index + 1}. ${item.title || '未命名资源卡'}`).join(' / ')
    : '还没有配置资源卡';
}

export function HomeSectionEditorDrawer({
  open,
  sectionId,
  page,
  subjectKey,
  saving,
  canWrite,
  onClose,
  onSave
}: HomeSectionEditorDrawerProps) {
  const [form] = Form.useForm<SectionValues>();

  const initialValues = useMemo(() => buildInitialValues(page, subjectKey), [page, subjectKey]);
  const sectionMeta = useMemo(() => homeSectionModels.find((item) => item.id === sectionId) || null, [sectionId]);
  const sectionPreview = useMemo(
    () => (sectionId ? buildSectionPreview(sectionId, page, subjectKey) : ''),
    [page, sectionId, subjectKey]
  );

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(initialValues);
  }, [form, initialValues, open, sectionId]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    const nextPage: HomePageContent = {
      ...page,
      header: page.header,
      subjects: {
        ...page.subjects,
        [subjectKey]: {
          ...page.subjects[subjectKey]
        }
      }
    };

    if (sectionId === 'header') {
      nextPage.header = {
        ...page.header,
        title: values.header.title,
        subtitle: values.header.subtitle
      };
    }

    if (sectionId === 'resourceSection') {
      nextPage.header = {
        ...page.header,
        resourceSectionTitle: values.header.resourceSectionTitle,
        resourceMoreText: values.header.resourceMoreText
      };
    }

    if (sectionId === 'dailyCard') {
      nextPage.subjects[subjectKey] = {
        ...page.subjects[subjectKey],
        learningCard: {
          ...page.subjects[subjectKey].learningCard,
          ...values.learningCard
        }
      };
    }

    if (sectionId === 'quickEntries') {
      nextPage.subjects[subjectKey] = {
        ...page.subjects[subjectKey],
        quickEntries: values.quickEntries.slice(0, 4)
      };
    }

    if (sectionId === 'resources') {
      nextPage.subjects[subjectKey] = {
        ...page.subjects[subjectKey],
        resources: values.resources.slice(0, 2)
      };
    }

    await onSave(nextPage);
  }

  function renderHeaderEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['header', 'title']} label="顶部主标题" rules={[{ required: true, message: '请填写顶部主标题' }]}>
          <Input placeholder="例如 今日学习" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['header', 'subtitle']} label="顶部副标题" rules={[{ required: true, message: '请填写顶部副标题' }]}>
          <Input placeholder="例如 先做题，再沉淀进度" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderDailyCardEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['learningCard', 'title']} label="主卡标题" rules={[{ required: true, message: '请填写主卡标题' }]}>
          <Input placeholder={`例如 今日${subjectLabels[subjectKey]}学习`} disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'subtitle']} label="主卡说明" rules={[{ required: true, message: '请填写主卡说明' }]}>
          <Input placeholder="例如 保持题感，稳定推进" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'streakText']} label="右上角提示" rules={[{ required: true, message: '请填写右上角提示' }]}>
          <Input placeholder="例如 连续 9 天" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'taskLabel']} label="任务标题" rules={[{ required: true, message: '请填写任务标题' }]}>
          <Input placeholder="例如 每日刷题任务" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'progressText']} label="右侧进度数字" rules={[{ required: true, message: '请填写进度数字' }]}>
          <Input placeholder="例如 15 / 30" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'progressPercent']} label="进度条百分比" rules={[{ required: true, message: '请填写进度百分比' }]}>
          <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="0 - 100" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'actionText']} label="主按钮文案" rules={[{ required: true, message: '请填写按钮文案' }]}>
          <Input placeholder="例如 开始练题" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'actionUrl']} label="按钮点击后去哪里" rules={[{ required: true, message: '请填写按钮跳转地址' }]}>
          <Input placeholder="/pages/question-bank/daily-question/index" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['learningCard', 'actionOpenType']} label="页面打开方式">
          <Select options={openTypeOptions} disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderQuickEntriesEditor() {
    return (
      <Form.List name="quickEntries">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="快捷入口"
              count={fields.length}
              max={4}
              onAdd={() =>
                add({
                  ...defaultHomePage.subjects[subjectKey].quickEntries[Math.min(fields.length, 3)]
                })
              }
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>{`第 ${index + 1} 个入口`}</Typography.Text>
                <Form.Item name={[field.name, 'label']} label="入口标题" rules={[{ required: true, message: '请填写入口标题' }]}>
                  <Input placeholder="例如 每日一题" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'note']} label="入口副标题" rules={[{ required: true, message: '请填写入口副标题' }]}>
                  <Input placeholder="例如 保持手感" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'kind']} label="图标类型" rules={[{ required: true, message: '请选择图标类型' }]}>
                  <Select options={quickEntryKindOptions} disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'accent']} label="图标主色（可选）">
                  <Input placeholder="#ffb6c1" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'bg']} label="图标底色（可选）">
                  <Input placeholder="#fff7f9" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'url']} label="点击后去哪里" rules={[{ required: true, message: '请填写跳转地址' }]}>
                  <Input placeholder="/pages/question-bank/daily-question/index" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'openType']} label="页面打开方式">
                  <Select options={openTypeOptions} disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这个入口
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderResourceSectionEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['header', 'resourceSectionTitle']}
          label="资源区标题"
          rules={[{ required: true, message: '请填写资源区标题' }]}
        >
          <Input placeholder="例如 免费精选资源" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['header', 'resourceMoreText']}
          label="右上角短字"
          rules={[{ required: true, message: '请填写右侧短文案' }]}
        >
          <Input placeholder="例如 更多" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderResourcesEditor() {
    return (
      <Form.List name="resources">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="资源卡片"
              count={fields.length}
              max={2}
              onAdd={() =>
                add({
                  ...defaultHomePage.subjects[subjectKey].resources[Math.min(fields.length, 1)]
                })
              }
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>{`第 ${index + 1} 张资源卡`}</Typography.Text>
                <Form.Item name={[field.name, 'type']} label="左侧资源标识" rules={[{ required: true, message: '请选择资源标识' }]}>
                  <Select
                    options={[
                      { label: 'V 视频资源', value: 'V' },
                      { label: 'P PDF 资料', value: 'P' }
                    ]}
                    disabled={!canWrite}
                  />
                </Form.Item>
                <Form.Item name={[field.name, 'title']} label="资源标题" rules={[{ required: true, message: '请填写资源标题' }]}>
                  <Input placeholder="例如 2026 高数核心考点串讲" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'subtitle']} label="资源副标题" rules={[{ required: true, message: '请填写资源副标题' }]}>
                  <Input placeholder="例如 名师带练 · 快速入门" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'chip']} label="左下角标签" rules={[{ required: true, message: '请填写标签文案' }]}>
                  <Input placeholder="例如 免费观看" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'meta']} label="右侧辅助信息" rules={[{ required: true, message: '请填写辅助信息' }]}>
                  <Input placeholder="例如 1.2w 人已学" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这张资源卡
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderContent() {
    if (!sectionId) return null;
    if (sectionId === 'header') return renderHeaderEditor();
    if (sectionId === 'dailyCard') return renderDailyCardEditor();
    if (sectionId === 'quickEntries') return renderQuickEntriesEditor();
    if (sectionId === 'resourceSection') return renderResourceSectionEditor();
    return renderResourcesEditor();
  }

  return (
    <Drawer
      title={`${sectionTitleMap[sectionId || 'header']}${sectionId && (sectionId === 'header' || sectionId === 'resourceSection') ? '' : ` · ${subjectLabels[subjectKey]}`}`}
      open={open}
      width={560}
      onClose={onClose}
      destroyOnClose={false}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
          <Button type="primary" onClick={() => void handleSubmit()} loading={saving} disabled={!canWrite}>
            保存这一块
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {sectionId && sectionMeta ? (
          <Alert
            type="info"
            showIcon
            message={`${sectionMeta.step} · ${sectionMeta.title}${sectionMeta.mode === 'subject' ? ` · ${subjectLabels[subjectKey]}` : ''}`}
            description={
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Text type="secondary">{sectionNoteMap[sectionId]}</Typography.Text>
                <Typography.Text type="secondary">{sectionFieldHintMap[sectionId]}</Typography.Text>
                <Typography.Text strong>{`当前摘要：${sectionPreview}`}</Typography.Text>
              </Space>
            }
          />
        ) : null}
        <Form form={form} layout="vertical" initialValues={initialValues} disabled={!canWrite}>
          {renderContent()}
        </Form>
      </Space>
    </Drawer>
  );
}
