import { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Form, Input, InputNumber, Select, Space, Switch } from 'antd';
import {
  defaultMallProduct,
  materialCategoryOptions,
  materialDirectionLabels,
  materialStageLabels,
  type MallProductRecord
} from './types';
import { toMultilineText, toStringArray } from '../../utils';

type MediaPackageEditorDrawerProps = {
  open: boolean;
  record: MallProductRecord | null;
  direction: MallProductRecord['direction'];
  stage: MallProductRecord['stage'];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: MallProductRecord) => Promise<boolean>;
};

type MallProductFormValues = {
  categoryKey: string;
  badge: string;
  coverMark: string;
  coverLabel: string;
  productName: string;
  productSubTitle: string;
  productDescription: string;
  salesLabel: string;
  buttonText: string;
  highlightsText: string;
  productType: string;
  price: number;
  originPrice: number;
  isFree: boolean;
  previewEnabled: boolean;
  stage: MallProductRecord['stage'];
  sortOrder: number;
  status: MallProductRecord['status'];
};

export function MediaPackageEditorDrawer({
  open,
  record,
  direction,
  stage,
  onOpenChange,
  onSubmit
}: MediaPackageEditorDrawerProps) {
  const [form] = Form.useForm<MallProductFormValues>();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = useMemo(
    () => ({
      categoryKey: String(record?.categoryKey || defaultMallProduct.categoryKey),
      badge: String(record?.badge || defaultMallProduct.badge),
      coverMark: String(record?.coverMark || defaultMallProduct.coverMark),
      coverLabel: String(record?.coverLabel || defaultMallProduct.coverLabel),
      productName: String(record?.productName || defaultMallProduct.productName),
      productSubTitle: String(record?.productSubTitle || defaultMallProduct.productSubTitle),
      productDescription: String(record?.productDescription || defaultMallProduct.productDescription),
      salesLabel: String(record?.salesLabel || defaultMallProduct.salesLabel),
      buttonText: String(record?.buttonText || defaultMallProduct.buttonText),
      highlightsText: toMultilineText(record?.highlights || defaultMallProduct.highlights),
      productType: String(record?.productType || defaultMallProduct.productType),
      price: Number(record?.price || defaultMallProduct.price),
      originPrice: Number(record?.originPrice || defaultMallProduct.originPrice),
      isFree: record?.isFree ?? defaultMallProduct.isFree,
      previewEnabled: record?.previewEnabled ?? defaultMallProduct.previewEnabled,
      stage: record?.stage || stage,
      sortOrder: Number(record?.sortOrder || defaultMallProduct.sortOrder),
      status: record?.status || 'draft'
    }),
    [record, stage]
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
        ...(record || defaultMallProduct),
        direction,
        stage: values.stage,
        categoryKey: values.categoryKey,
        badge: values.badge,
        coverMark: values.coverMark,
        coverLabel: values.coverLabel,
        productName: values.productName,
        productSubTitle: values.productSubTitle,
        productDescription: values.productDescription,
        salesLabel: values.salesLabel,
        buttonText: values.buttonText,
        highlights: toStringArray(values.highlightsText),
        productType: values.productType,
        price: values.isFree ? 0 : values.price,
        originPrice: values.isFree ? 0 : values.originPrice,
        isFree: values.isFree,
        previewEnabled: values.previewEnabled,
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
      title={record?._id ? '编辑商城商品卡' : '新建商城商品卡'}
      open={open}
      width={560}
      onClose={() => onOpenChange(false)}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={() => onOpenChange(false)}>取消</Button>
          <Button type="primary" loading={submitting} onClick={handleSave}>
            {record?._id ? '保存商品卡' : '创建商品卡'}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="categoryKey"
          label="这张卡属于哪个分类按钮"
          extra={`当前维护的是 ${materialDirectionLabels[direction]}。前台点不同分类按钮时，会按这里的归属筛选卡片。`}
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select options={materialCategoryOptions.map((item) => ({ label: item.label, value: item.key }))} />
        </Form.Item>
        <Form.Item
          name="coverMark"
          label="左侧封面大字"
          extra="会显示在卡片左侧封面中央，例如 A、B、V。"
          rules={[{ required: true, message: '请填写左侧封面大字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="coverLabel"
          label="左侧封面底部类型字"
          extra="会显示在封面底部，例如 视频课程、实体书籍、资料包。"
          rules={[{ required: true, message: '请填写左侧封面底部类型字' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="productName" label="卡片主标题" rules={[{ required: true, message: '请填写卡片主标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="productSubTitle" label="卡片说明" rules={[{ required: true, message: '请填写卡片说明' }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="salesLabel" label="右侧销量字" extra="例如 2.8k 人已购。没有时可以留空。">
          <Input />
        </Form.Item>
        <Form.Item name="buttonText" label="右下角按钮字" rules={[{ required: true, message: '请填写按钮字' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="badge" label="辅助小标签" extra="这个字段不是当前商城卡片主视觉重点，可选填。">
          <Input />
        </Form.Item>
        <Form.Item name="productDescription" label="补充说明" extra="这类补充文案更适合商品详情或内部备注使用，当前列表页不强依赖。">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="highlightsText" label="亮点标签" extra="一行一个。当前商城主列表不会强依赖这些标签，但后续详情页可继续使用。">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="productType" label="商品类型">
          <Select
            options={[
              { label: '资料包', value: 'asset_bundle' },
              { label: '系统课', value: 'system_course' },
              { label: '冲刺营', value: 'sprint_camp' },
              { label: '纸质教材', value: 'paper_book' },
              { label: '单资料', value: 'single_asset' }
            ]}
          />
        </Form.Item>
        <Form.Item
          name="stage"
          label="所属备考阶段"
          extra="这是后台业务字段，方便后续做分组或权益管理。当前商城列表主视图不直接按它展示。"
        >
          <Select
            options={[
              { label: materialStageLabels.foundation, value: 'foundation' },
              { label: materialStageLabels.reinforcement, value: 'reinforcement' },
              { label: materialStageLabels.sprint, value: 'sprint' }
            ]}
          />
        </Form.Item>
        <Form.Item name="isFree" label="是否免费领取" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="previewEnabled" label="是否允许预览" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="price" label="现价">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="originPrice" label="原价">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="sortOrder" label="排序" extra="数字越小越靠前。分类筛选后，前台仍按这个排序显示。">
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
