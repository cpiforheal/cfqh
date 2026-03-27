import { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
import { defaultMallProductItem, type MallAssetRecord, type MallProductItemRecord } from './types';

type MediaItemEditorDrawerProps = {
  open: boolean;
  record: MallProductItemRecord | null;
  productId: string;
  direction: MallProductItemRecord['direction'];
  assetOptions: MallAssetRecord[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: MallProductItemRecord) => Promise<boolean>;
};

type MallProductItemFormValues = {
  itemId: string;
  displayType: string;
  displayName: string;
  displaySubTitle: string;
  displayDescription: string;
  displayDetails: string;
  previewEnabled: boolean;
  previewPageCount: number;
  accentStart: string;
  accentEnd: string;
  sortOrder: number;
  status: MallProductItemRecord['status'];
};

export function MediaItemEditorDrawer({
  open,
  record,
  productId,
  direction,
  assetOptions,
  onOpenChange,
  onSubmit
}: MediaItemEditorDrawerProps) {
  const [form] = Form.useForm<MallProductItemFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = useMemo(
    () => ({
      itemId: String(record?.itemId || defaultMallProductItem.itemId),
      displayType: String(record?.displayType || defaultMallProductItem.displayType),
      displayName: String(record?.displayName || defaultMallProductItem.displayName),
      displaySubTitle: String(record?.displaySubTitle || defaultMallProductItem.displaySubTitle),
      displayDescription: String(record?.displayDescription || defaultMallProductItem.displayDescription),
      displayDetails: String(record?.displayDetails || defaultMallProductItem.displayDetails),
      previewEnabled: record?.previewEnabled ?? defaultMallProductItem.previewEnabled,
      previewPageCount: Number(record?.previewPageCount || defaultMallProductItem.previewPageCount),
      accentStart: String(record?.accentStart || defaultMallProductItem.accentStart),
      accentEnd: String(record?.accentEnd || defaultMallProductItem.accentEnd),
      sortOrder: Number(record?.sortOrder || defaultMallProductItem.sortOrder),
      status: record?.status || 'draft'
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
      const ok = await onSubmit({
        ...(record || defaultMallProductItem),
        productId,
        direction,
        itemId: values.itemId,
        displayType: values.displayType,
        displayName: values.displayName,
        displaySubTitle: values.displaySubTitle,
        displayDescription: values.displayDescription,
        displayDetails: values.displayDetails,
        previewEnabled: values.previewEnabled,
        previewPageCount: values.previewPageCount,
        accentStart: values.accentStart,
        accentEnd: values.accentEnd,
        sortOrder: values.sortOrder,
        status: values.status
      });
      if (ok) {
        onOpenChange(false);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Drawer
      title={record?._id ? '编辑商品附属内容项' : '新增商品附属内容项'}
      open={open}
      width={560}
      onClose={() => onOpenChange(false)}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={() => onOpenChange(false)}>取消</Button>
          <Button type="primary" loading={submitting} onClick={handleSave}>
            {record?._id ? '保存内容项' : '创建内容项'}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="itemId" label="这条内容项对应哪份资料" rules={[{ required: true, message: '请选择资料' }]}>
          <Select
            options={assetOptions.map((asset) => ({
              label: asset.title || asset.name || asset._id || '未命名资料',
              value: asset._id
            }))}
          />
        </Form.Item>
        <Form.Item
          name="displayType"
          label="封面底部类型字"
          extra="如果后续详情页或组合展示需要这条内容项，会显示这个类型字。"
          rules={[{ required: true, message: '请填写封面底部类型字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="displayName" label="内容项主标题" rules={[{ required: true, message: '请填写内容项主标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="displaySubTitle" label="内容项副标题" rules={[{ required: true, message: '请填写内容项副标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="displayDescription" label="内容项正文说明" rules={[{ required: true, message: '请填写卡片正文说明' }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="displayDetails"
          label="底部强调说明"
          extra="这类文案更偏详情或附属展示，不是当前商城主列表直接显示的商品卡。"
          rules={[{ required: true, message: '请填写底部强调说明' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="previewEnabled" label="是否允许预览" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="previewPageCount" label="预览页数">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="accentStart" label="封面渐变主色" rules={[{ required: true, message: '请填写起始色' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="accentEnd" label="封面渐变辅色" rules={[{ required: true, message: '请填写结束色' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sortOrder" label="排序" extra="数字越小，越靠前显示在资料列表顶部。">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select
            options={[
              { label: '草稿', value: 'draft' },
              { label: '待审核', value: 'pending' },
              { label: '已上架', value: 'online' },
              { label: '已下架', value: 'offline' }
            ]}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
