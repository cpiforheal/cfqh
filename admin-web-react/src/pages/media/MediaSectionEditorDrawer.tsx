import { useEffect, useMemo } from 'react';
import { Button, Drawer, Form, Input, Select, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { defaultMaterialsPage, materialStageLabels, type MaterialSectionId, type MaterialsPageContent } from './types';

type MediaSectionEditorDrawerProps = {
  open: boolean;
  sectionId: MaterialSectionId | null;
  page: MaterialsPageContent;
  saving: boolean;
  canWrite: boolean;
  onClose: () => void;
  onSave: (payload: MaterialsPageContent) => Promise<void>;
};

type SectionValues = MaterialsPageContent;

const sectionTitleMap: Record<MaterialSectionId, string> = {
  header: '顶部信息',
  stageTabs: '阶段按钮',
  package: '主推套系卡',
  items: '资料列表',
  consultBar: '底部咨询条'
};

const sectionNoteMap: Record<MaterialSectionId, string> = {
  header: '这里对应商城页最上方。主标题和搜索提示尽量写得直白，让老师一看就知道学生会看到什么。',
  stageTabs: '前台阶段按钮就是这里的顺序。建议名称保持短，避免在手机端换行。',
  package: '这里先改主推区标题，再到下面的主推套系列表里改具体卡片内容。老师会更容易按“标题在上，主卡在下”的方式维护。',
  items: '这里先改资料列表的标题和右侧提示，再到下面资料表里逐张修改卡片内容。',
  consultBar: '这是商城最底部的引导区，适合放咨询老师的承接话术。'
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

export function MediaSectionEditorDrawer({
  open,
  sectionId,
  page,
  saving,
  canWrite,
  onClose,
  onSave
}: MediaSectionEditorDrawerProps) {
  const [form] = Form.useForm<SectionValues>();

  const initialValues = useMemo(() => ({ ...defaultMaterialsPage, ...page }), [page]);

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(initialValues as any);
  }, [form, initialValues, open, sectionId]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    const nextPage: MaterialsPageContent = {
      ...page,
      header: { ...page.header },
      directionTabs: [...page.directionTabs],
      stageTabs: [...page.stageTabs],
      mainSection: { ...page.mainSection },
      shelfSection: { ...page.shelfSection },
      consultBar: { ...page.consultBar }
    };

    if (sectionId === 'header') {
      nextPage.header = values.header;
    }

    if (sectionId === 'stageTabs') {
      nextPage.stageTabs = values.stageTabs.slice(0, 3);
    }

    if (sectionId === 'package') {
      nextPage.mainSection = values.mainSection;
    }

    if (sectionId === 'items') {
      nextPage.shelfSection = values.shelfSection;
    }

    if (sectionId === 'consultBar') {
      nextPage.consultBar = values.consultBar;
    }

    await onSave(nextPage);
  }

  function renderHeaderEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['header', 'title']} label="页面标题" rules={[{ required: true, message: '请填写页面标题' }]}>
          <Input placeholder="例如 精选资料" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['header', 'searchLabel']}
          label="搜索提示"
          rules={[{ required: true, message: '请填写搜索提示' }]}
        >
          <Input placeholder="例如 搜索资料" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderStageTabsEditor() {
    return (
      <Form.List name="stageTabs">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="阶段按钮"
              count={fields.length}
              max={3}
              onAdd={() => {
                const defaults = [
                  { key: 'foundation', label: materialStageLabels.foundation },
                  { key: 'reinforcement', label: materialStageLabels.reinforcement },
                  { key: 'sprint', label: materialStageLabels.sprint }
                ];
                add(defaults[Math.min(fields.length, defaults.length - 1)]);
              }}
              disabled={!canWrite}
            />
            {fields.map((field) => (
              <div className="home-editor-item" key={field.key}>
                <Form.Item name={[field.name, 'key']} label="阶段标识" rules={[{ required: true, message: '请选择阶段' }]}>
                  <Select
                    disabled={!canWrite}
                    options={[
                      { label: '基础阶段', value: 'foundation' },
                      { label: '强化阶段', value: 'reinforcement' },
                      { label: '冲刺阶段', value: 'sprint' }
                    ]}
                  />
                </Form.Item>
                <Form.Item name={[field.name, 'label']} label="显示名称" rules={[{ required: true, message: '请填写显示名称' }]}>
                  <Input placeholder="例如 基础阶段" disabled={!canWrite} />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这个阶段
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    );
  }

  function renderPackageSectionEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['mainSection', 'title']}
          label="主推区标题"
          rules={[{ required: true, message: '请填写主推区标题' }]}
        >
          <Input placeholder="例如 本阶段主推资料" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['mainSection', 'sideNote']}
          label="右侧提示"
          rules={[{ required: true, message: '请填写右侧提示' }]}
        >
          <Input placeholder="例如 老师优先推荐这一套" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderItemsSectionEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['shelfSection', 'title']}
          label="资料区标题"
          rules={[{ required: true, message: '请填写资料区标题' }]}
        >
          <Input placeholder="例如 免费精选资料" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['shelfSection', 'hint']} label="右侧提示" rules={[{ required: true, message: '请填写右侧提示' }]}>
          <Input placeholder="例如 更多" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderConsultBarEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['consultBar', 'title']}
          label="咨询标题"
          rules={[{ required: true, message: '请填写咨询标题' }]}
        >
          <Input placeholder="例如 不知道怎么选？" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['consultBar', 'desc']} label="咨询说明" rules={[{ required: true, message: '请填写咨询说明' }]}>
          <Input.TextArea rows={4} placeholder="例如 专业老师会帮你按当前阶段选资料" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['consultBar', 'buttonText']}
          label="按钮文案"
          rules={[{ required: true, message: '请填写按钮文案' }]}
        >
          <Input placeholder="例如 免费咨询" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  return (
    <Drawer
      title={sectionId ? sectionTitleMap[sectionId] : '编辑区块'}
      open={open}
      onClose={onClose}
      width={560}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSubmit} loading={saving} disabled={!canWrite}>
            保存这一区块
          </Button>
        </Space>
      }
    >
      {sectionId ? (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {sectionNoteMap[sectionId]}
          </Typography.Paragraph>
          <Form form={form} layout="vertical" initialValues={initialValues}>
            {sectionId === 'header' ? renderHeaderEditor() : null}
            {sectionId === 'stageTabs' ? renderStageTabsEditor() : null}
            {sectionId === 'package' ? renderPackageSectionEditor() : null}
            {sectionId === 'items' ? renderItemsSectionEditor() : null}
            {sectionId === 'consultBar' ? renderConsultBarEditor() : null}
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}
