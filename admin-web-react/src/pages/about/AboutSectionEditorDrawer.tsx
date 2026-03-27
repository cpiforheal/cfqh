import { useEffect, useMemo } from 'react';
import { Alert, Button, Drawer, Form, Input, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  aboutSectionModels,
  defaultAboutPage,
  type AboutEnvironmentItem,
  type AboutPageContent,
  type AboutSectionId,
  type AboutValueItem
} from './types';

type AboutSectionEditorDrawerProps = {
  open: boolean;
  sectionId: AboutSectionId | null;
  page: AboutPageContent;
  canWrite: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (payload: AboutPageContent) => Promise<void>;
};

type AboutFormValues = {
  hero: AboutPageContent['hero'];
  introCard: AboutPageContent['introCard'];
  values: AboutValueItem[];
  environmentImages: AboutEnvironmentItem[];
  cta: AboutPageContent['cta'];
};

const sectionNoteMap: Record<AboutSectionId, string> = {
  hero: '这一块对应关于页最上方的主标题区。老师只需要先把标题和说明写自然，再决定是否补图片链接。',
  introCard: '这是机构介绍卡，建议先说机构是谁、主要提供什么支持。',
  values: '这里建议只放最重要的 2 到 3 条理念，不要一次堆太多。',
  environmentImages: '先给每张环境图起一个老师能识别的名字，图片链接可以后补。',
  cta: '底部咨询区的按钮文案尽量直接，让学生知道点下去能得到什么。'
};

const sectionFieldHintMap: Record<AboutSectionId, string> = {
  hero: '会修改：顶部短标签、标题、说明、首图链接',
  introCard: '会修改：机构卡标题、简介',
  values: '会修改：理念标题、理念说明',
  environmentImages: '会修改：图片名称、图片链接、占位种子',
  cta: '会修改：咨询标题、说明、按钮文案、底部短句'
};

function buildPreview(sectionId: AboutSectionId, page: AboutPageContent) {
  if (sectionId === 'hero') {
    return `${page.hero.title || '未填写标题'} / ${page.hero.desc || '未填写说明'}`;
  }
  if (sectionId === 'introCard') {
    return `${page.introCard.title || '未填写机构名'} / ${page.introCard.desc || '未填写介绍'}`;
  }
  if (sectionId === 'values') {
    return page.values.length ? page.values.map((item) => item.title || '未命名理念').join(' / ') : '还没有配置理念卡';
  }
  if (sectionId === 'environmentImages') {
    return page.environmentImages.length
      ? page.environmentImages.map((item) => item.label || '未命名环境图').join(' / ')
      : '还没有配置环境图';
  }
  return `${page.cta.title || '未填写标题'} / ${page.cta.buttonText || '未填写按钮文案'}`;
}

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

export function AboutSectionEditorDrawer({
  open,
  sectionId,
  page,
  canWrite,
  saving,
  onClose,
  onSave
}: AboutSectionEditorDrawerProps) {
  const [form] = Form.useForm<AboutFormValues>();

  const sectionMeta = useMemo(() => aboutSectionModels.find((item) => item.id === sectionId) || null, [sectionId]);
  const preview = useMemo(() => (sectionId ? buildPreview(sectionId, page) : ''), [page, sectionId]);

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      hero: page.hero,
      introCard: page.introCard,
      values: page.values,
      environmentImages: page.environmentImages,
      cta: page.cta
    });
  }, [form, open, page]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    const nextPage: AboutPageContent = {
      ...page,
      hero: page.hero,
      introCard: page.introCard,
      values: page.values,
      environmentImages: page.environmentImages,
      cta: page.cta
    };

    if (sectionId === 'hero') {
      nextPage.hero = values.hero;
    }
    if (sectionId === 'introCard') {
      nextPage.introCard = values.introCard;
    }
    if (sectionId === 'values') {
      nextPage.values = values.values.slice(0, 3);
    }
    if (sectionId === 'environmentImages') {
      nextPage.environmentImages = values.environmentImages.slice(0, 4);
    }
    if (sectionId === 'cta') {
      nextPage.cta = values.cta;
    }

    await onSave(nextPage);
  }

  function renderHeroEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['hero', 'chip']} label="顶部短标签" rules={[{ required: true, message: '请填写顶部短标签' }]}>
          <Input placeholder="例如 机构概览" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['hero', 'title']} label="顶部主标题" rules={[{ required: true, message: '请填写顶部主标题' }]}>
          <Input placeholder="例如 关于我们" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['hero', 'desc']} label="顶部说明" rules={[{ required: true, message: '请填写顶部说明' }]}>
          <Input.TextArea rows={4} placeholder="用老师平时会说的话说明机构气质与定位" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['hero', 'imageUrl']} label="首图链接（可选）">
          <Input placeholder="https://..." disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['hero', 'imageSeed']} label="占位种子（可选）">
          <Input placeholder="campus" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderIntroEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['introCard', 'title']} label="机构名称" rules={[{ required: true, message: '请填写机构名称' }]}>
          <Input placeholder="例如 淮安启航专转本" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['introCard', 'desc']} label="机构介绍" rules={[{ required: true, message: '请填写机构介绍' }]}>
          <Input.TextArea rows={4} placeholder="说明机构主要在做什么、如何帮助学生" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderValuesEditor() {
    return (
      <Form.List name="values">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="理念与服务卡"
              count={fields.length}
              max={3}
              onAdd={() => add({ ...defaultAboutPage.values[Math.min(fields.length, defaultAboutPage.values.length - 1)] })}
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>{`第 ${index + 1} 条`}</Typography.Text>
                <Form.Item name={[field.name, 'title']} label="标题" rules={[{ required: true, message: '请填写标题' }]}>
                  <Input placeholder="例如 品牌理念" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'desc']} label="说明" rules={[{ required: true, message: '请填写说明' }]}>
                  <Input.TextArea rows={3} placeholder="讲清这一条对学生意味着什么" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这一条
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderEnvironmentEditor() {
    return (
      <Form.List name="environmentImages">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="环境图片区"
              count={fields.length}
              max={4}
              onAdd={() =>
                add({ ...defaultAboutPage.environmentImages[Math.min(fields.length, defaultAboutPage.environmentImages.length - 1)] })
              }
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Typography.Text strong>{`第 ${index + 1} 张环境图`}</Typography.Text>
                <Form.Item name={[field.name, 'label']} label="图片名称" rules={[{ required: true, message: '请填写图片名称' }]}>
                  <Input placeholder="例如 多媒体教室" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'imageUrl']} label="图片链接">
                  <Input placeholder="https://..." disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'imageSeed']} label="占位种子（可选）">
                  <Input placeholder="campus1" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这张图
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderCtaEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['cta', 'title']} label="咨询区标题" rules={[{ required: true, message: '请填写咨询区标题' }]}>
          <Input placeholder="例如 先了解机构，再定备考路线" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'desc']} label="咨询区说明" rules={[{ required: true, message: '请填写咨询区说明' }]}>
          <Input.TextArea rows={4} placeholder="说明学生点咨询后能获得什么帮助" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'buttonText']} label="按钮文案" rules={[{ required: true, message: '请填写按钮文案' }]}>
          <Input placeholder="例如 预约机构咨询" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['cta', 'footnote']} label="底部短句">
          <Input placeholder="例如 环境了解 · 课程说明 · 方向建议" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderEditor() {
    if (sectionId === 'hero') return renderHeroEditor();
    if (sectionId === 'introCard') return renderIntroEditor();
    if (sectionId === 'values') return renderValuesEditor();
    if (sectionId === 'environmentImages') return renderEnvironmentEditor();
    if (sectionId === 'cta') return renderCtaEditor();
    return null;
  }

  return (
    <Drawer
      title={sectionMeta ? `编辑：${sectionMeta.title}` : '编辑关于页区块'}
      width={560}
      open={open}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" loading={saving} onClick={handleSubmit} disabled={!canWrite}>
            保存
          </Button>
        </Space>
      }
    >
      {sectionId ? (
        <Form form={form} layout="vertical" disabled={!canWrite}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              type="info"
              showIcon
              message={sectionNoteMap[sectionId]}
              description={
                <Space direction="vertical" size={4}>
                  <Typography.Text>{sectionFieldHintMap[sectionId]}</Typography.Text>
                  <Typography.Text type="secondary">{`当前摘要：${preview}`}</Typography.Text>
                </Space>
              }
            />
            {renderEditor()}
          </Space>
        </Form>
      ) : null}
    </Drawer>
  );
}
