import { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
import { toMultilineText } from '../../utils';
import type { DirectionFormValues, DirectionRecord } from './types';

type DirectionsEditorDrawerProps = {
  mode: 'create' | 'edit';
  open: boolean;
  record: DirectionRecord | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: DirectionFormValues) => Promise<boolean>;
};

export function DirectionsEditorDrawer({
  mode,
  open,
  record,
  onOpenChange,
  onSubmit
}: DirectionsEditorDrawerProps) {
  const [form] = Form.useForm<DirectionFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const initialValues = useMemo(
    () => ({
      name: String(record?.name || ''),
      slug: String(record?.slug || ''),
      category: String(record?.category || ''),
      status: String(record?.status || 'draft'),
      sort: Number(record?.sort || 100),
      isFeatured: Boolean(record?.isFeatured),
      featuredTag: String(record?.featuredTag || ''),
      homeTag: String(record?.homeTag || ''),
      summary: String(record?.summary || ''),
      audience: String(record?.audience || ''),
      iconType: String(record?.iconType || 'grid'),
      featuresText: toMultilineText(record?.features),
      chipsText: toMultilineText(record?.chips)
    }),
    [record]
  );

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
      return;
    }

    form.resetFields();
  }, [form, initialValues, open]);

  async function handleSave() {
    const values = await form.validateFields();
    setSubmitting(true);
    try {
      const ok = await onSubmit(values);
      if (ok) {
        onOpenChange(false);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer
      title={mode === 'create' ? '新建帖子' : '编辑帖子'}
      open={open}
      onClose={() => onOpenChange(false)}
      width={560}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={() => onOpenChange(false)}>取消</Button>
          <Button type="primary" loading={submitting} onClick={handleSave}>
            {mode === 'create' ? '创建帖子' : '保存修改'}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="name" label="帖子名称" rules={[{ required: true, message: '请填写帖子名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="slug" label="唯一标识" rules={[{ required: true, message: '请填写 slug' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="分类">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select
            options={[
              { label: '草稿', value: 'draft' },
              { label: '已发布', value: 'published' }
            ]}
          />
        </Form.Item>
        <Form.Item name="sort" label="排序">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="isFeatured" label="精选推荐" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="featuredTag" label="精选标签">
          <Input />
        </Form.Item>
        <Form.Item name="homeTag" label="首页标签">
          <Input />
        </Form.Item>
        <Form.Item name="iconType" label="图标类型">
          <Input />
        </Form.Item>
        <Form.Item name="summary" label="摘要">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="audience" label="适合人群">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="featuresText" label="卖点列表" extra="一行一个，保存时会自动转成数组。">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="chipsText" label="标签 Chips" extra="可用换行、逗号或中文逗号分隔。">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
