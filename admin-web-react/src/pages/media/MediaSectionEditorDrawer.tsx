import { useEffect, useMemo } from 'react';
import { Alert, Button, Collapse, Drawer, Form, Input, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { defaultMaterialsPage, mediaSectionModels, type MaterialSectionId, type MaterialsPageContent } from './types';

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
  hero: '页面主标题',
  categories: '商品分类按钮',
  consultBar: '底部咨询浮条'
};

const sectionNoteMap: Record<MaterialSectionId, string> = {
  hero: '这里只改商城页大标题，也就是老师和学生进入商城后第一眼看到的那句主标题。',
  categories: '这里改的是主标题下面那一排分类按钮。按钮顺序就是前台从左到右的顺序，建议名称保持简短。',
  consultBar: '这是商城页底部的咨询浮条，适合放引导咨询的话术和按钮文案。'
};

const sectionFieldHintMap: Record<MaterialSectionId, string> = {
  hero: '会修改：商城大标题',
  categories: '会修改：分类按钮名称与顺序',
  consultBar: '会修改：咨询标题、说明、按钮字'
};

function buildSectionPreview(sectionId: MaterialSectionId, page: MaterialsPageContent) {
  if (sectionId === 'hero') {
    return page.heroSection.title || '未填写商城大标题';
  }

  if (sectionId === 'categories') {
    return page.categoryTabs.length ? page.categoryTabs.map((item) => item.label || '未命名分类').join(' / ') : '还没有配置商品分类按钮';
  }

  return `${page.consultBar.title || '未填写标题'} / ${page.consultBar.buttonText || '未填写按钮文案'}`;
}

function SectionListHeader({
  title,
  count,
  onAdd,
  disabled
}: {
  title: string;
  count: number;
  onAdd: () => void;
  disabled: boolean;
}) {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Typography.Text strong>
        {title} {count ? `(${count})` : ''}
      </Typography.Text>
      <Button type="dashed" icon={<PlusOutlined />} onClick={onAdd} disabled={disabled}>
        新增一个
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
  const sectionMeta = useMemo(() => mediaSectionModels.find((item) => item.id === sectionId) || null, [sectionId]);
  const sectionPreview = useMemo(() => (sectionId ? buildSectionPreview(sectionId, page) : ''), [page, sectionId]);

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
      heroSection: { ...page.heroSection },
      directionTabs: [...page.directionTabs],
      categoryTabs: [...page.categoryTabs],
      stageTabs: [...page.stageTabs],
      mainSection: { ...page.mainSection },
      shelfSection: { ...page.shelfSection },
      consultBar: { ...page.consultBar }
    };

    if (sectionId === 'hero') {
      nextPage.heroSection = {
        ...page.heroSection,
        title: values.heroSection.title
      };
    }

    if (sectionId === 'categories') {
      nextPage.categoryTabs = (values.categoryTabs || [])
        .map((item, index) => ({
          key: String(item?.key || '').trim() || `category_${index + 1}`,
          label: String(item?.label || '').trim()
        }))
        .filter((item) => item.label);
    }

    if (sectionId === 'consultBar') {
      nextPage.consultBar = values.consultBar;
    }

    await onSave(nextPage);
  }

  function renderHeroEditor() {
    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name={['heroSection', 'title']} label="商城大标题" rules={[{ required: true, message: '请填写商城大标题' }]}>
          <Input placeholder="例如 精选好课" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  function renderCategoryEditor() {
    return (
      <Form.List name="categoryTabs">
        {(fields, { add, remove }) => (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <SectionListHeader
              title="商品分类按钮"
              count={fields.length}
              onAdd={() => add({ key: `custom_${fields.length + 1}`, label: '' })}
              disabled={!canWrite}
            />
            {fields.map((field, index) => (
              <div className="home-editor-item" key={field.key}>
                <Form.Item
                  name={[field.name, 'label']}
                  label={`第 ${index + 1} 个按钮显示什么字`}
                  rules={[{ required: true, message: '请填写按钮名称' }]}
                >
                  <Input placeholder="例如 系统班" disabled={!canWrite} />
                </Form.Item>
                <Collapse
                  ghost
                  items={[
                    {
                      key: `advanced-${field.key}`,
                      label: '高级设置',
                      children: (
                        <Form.Item
                          name={[field.name, 'key']}
                          label="后台识别名"
                          extra="留空也可以，系统会自动生成。只有需要和旧数据或特殊逻辑对齐时再填写。"
                        >
                          <Input placeholder="例如 system_course" disabled={!canWrite} />
                        </Form.Item>
                      )
                    }
                  ]}
                />
                <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} disabled={!canWrite}>
                  删除这个按钮
                </Button>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
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
          <Input.TextArea rows={4} placeholder="例如 专业老师会帮你按当前基础推荐合适的资料和课程" disabled={!canWrite} />
        </Form.Item>
        <Form.Item
          name={['consultBar', 'buttonText']}
          label="按钮字"
          rules={[{ required: true, message: '请填写按钮字' }]}
        >
          <Input placeholder="例如 免费咨询" disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  return (
    <Drawer
      title={sectionMeta ? `编辑：${sectionMeta.title}` : '编辑区块'}
      open={open}
      onClose={onClose}
      width={560}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSubmit} loading={saving} disabled={!canWrite}>
            保存这一块
          </Button>
        </Space>
      }
    >
      {sectionId ? (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message={`你正在修改：${sectionMeta?.step || '当前区块'} ${sectionTitleMap[sectionId]}`}
            description={
              <Space direction="vertical" size={4}>
                <Typography.Text>{sectionNoteMap[sectionId]}</Typography.Text>
                <Typography.Text>{sectionFieldHintMap[sectionId]}</Typography.Text>
                <Typography.Text type="secondary">{`前台位置：${sectionMeta?.location || '当前区块'}`}</Typography.Text>
                <Typography.Text type="secondary">{`当前摘要：${sectionPreview}`}</Typography.Text>
              </Space>
            }
          />
          <Form form={form} layout="vertical" initialValues={initialValues}>
            {sectionId === 'hero' ? renderHeroEditor() : null}
            {sectionId === 'categories' ? renderCategoryEditor() : null}
            {sectionId === 'consultBar' ? renderConsultBarEditor() : null}
          </Form>
        </Space>
      ) : null}
    </Drawer>
  );
}
