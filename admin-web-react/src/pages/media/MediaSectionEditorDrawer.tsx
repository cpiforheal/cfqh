import { useEffect, useMemo } from 'react';
import { Button, Drawer, Form, Input, Select, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  defaultMaterialsPage,
  materialDirectionLabels,
  materialStageLabels,
  type MaterialSectionId,
  type MaterialsPageContent
} from './types';

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

const sectionTitleMap: Record<Exclude<MaterialSectionId, 'package' | 'items'>, string> = {
  header: '顶部标题区',
  directionTabs: '学科切换',
  stageTabs: '阶段筛选',
  mainSection: '主推区标题',
  shelfSection: '资料区标题',
  consultBar: '底部咨询条'
};

const sectionNoteMap: Record<Exclude<MaterialSectionId, 'package' | 'items'>, string> = {
  header: '这里对应商城页最上方。主标题建议尽量直白，老师一看就知道学生看到的是什么。',
  directionTabs: '这里只维护展示名称，不需要老师去碰技术字段。高数和医护的顺序会直接映射到前台。',
  stageTabs: '前台阶段按钮就是这里的顺序。建议名称保持短，避免移动端换行。',
  mainSection: '这里是主推套系上方的过渡说明。建议直接告诉学生“下面推荐的是什么”，老师改起来也最不容易迷路。',
  shelfSection: '这一行只是资料列表的标题和提示，不承载资料内容本身。',
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
    if (!sectionId || sectionId === 'package' || sectionId === 'items') return;
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

    if (sectionId === 'directionTabs') {
      nextPage.directionTabs = values.directionTabs.slice(0, 2);
    }

    if (sectionId === 'stageTabs') {
      nextPage.stageTabs = values.stageTabs.slice(0, 3);
    }

    if (sectionId === 'mainSection') {
      nextPage.mainSection = values.mainSection;
    }

    if (sectionId === 'shelfSection') {
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

  function renderDirectionTabsEditor() {
    return (
      <Form.List name="directionTabs">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="学科切换"
              count={fields.length}
              max={2}
              onAdd={() =>
                add({
                  key: fields.length === 0 ? 'math' : 'medical',
                  label: fields.length === 0 ? materialDirectionLabels.math : materialDirectionLabels.medical,
                  icon: fields.length === 0 ? 'grid' : 'medical'
                })
              }
              disabled={!canWrite}
            />
            {fields.map((field) => (
              <div className="home-editor-item" key={field.key}>
                <Form.Item name={[field.name, 'key']} label="学科标识" rules={[{ required: true, message: '请选择学科' }]}>
                  <Select
                    disabled={!canWrite}
                    options={[
                      { label: '高数', value: 'math' },
                      { label: '医护', value: 'medical' }
                    ]}
                  />
                </Form.Item>
                <Form.Item name={[field.name, 'label']} label="显示名称" rules={[{ required: true, message: '请填写显示名称' }]}>
                  <Input placeholder="例如 高数资料" disabled={!canWrite} />
                </Form.Item>
                <Form.Item name={[field.name, 'icon']} label="图标标识">
                  <Select
                    disabled={!canWrite}
                    options={[
                      { label: '九宫格', value: 'grid' },
                      { label: '医护', value: 'medical' }
                    ]}
                  />
                </Form.Item>
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这个学科
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
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

  function renderMainSectionEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['mainSection', 'title']}
          label="主推区标题"
          rules={[{ required: true, message: '请填写主推区标题' }]}
        >
          <Input placeholder="例如 本阶段主推资料包" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['mainSection', 'sideNote']}
          label="右侧提示"
          rules={[{ required: true, message: '请填写右侧提示' }]}
        >
          <Input placeholder="例如 先看这一套" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderShelfSectionEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item
          name={['shelfSection', 'title']}
          label="资料区标题"
          rules={[{ required: true, message: '请填写资料区标题' }]}
        >
          <Input placeholder="例如 本阶段资料一览" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name={['shelfSection', 'hint']} label="右侧提示" rules={[{ required: true, message: '请填写右侧提示' }]}>
          <Input placeholder="例如 从上到下查看" disabled={!canWrite} />
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
      title={sectionId && sectionId !== 'package' && sectionId !== 'items' ? sectionTitleMap[sectionId] : '编辑区块'}
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
      {sectionId && sectionId !== 'package' && sectionId !== 'items' ? (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {sectionNoteMap[sectionId]}
          </Typography.Paragraph>
          <Form form={form} layout="vertical" initialValues={initialValues}>
            {sectionId === 'header' ? renderHeaderEditor() : null}
            {sectionId === 'directionTabs' ? renderDirectionTabsEditor() : null}
            {sectionId === 'stageTabs' ? renderStageTabsEditor() : null}
            {sectionId === 'mainSection' ? renderMainSectionEditor() : null}
            {sectionId === 'shelfSection' ? renderShelfSectionEditor() : null}
            {sectionId === 'consultBar' ? renderConsultBarEditor() : null}
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}
