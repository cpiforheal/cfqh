import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import {
  DrawerForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
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

  return (
    <DrawerForm<MallProductItemFormValues>
      title={record?._id ? '编辑商品内容项' : '新增商品内容项'}
      open={open}
      width={560}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
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
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存内容项' : '创建内容项'
        }
      }}
    >
      <ProFormSelect
        name="itemId"
        label="对应哪份资料资产"
        rules={[{ required: true, message: '请选择资料资产' }]}
        options={assetOptions.map((asset) => ({
          label: asset.title || asset.name || asset._id || '未命名资料',
          value: asset._id
        }))}
      />
      <ProFormText name="displayType" label="卡片左侧标签" rules={[{ required: true, message: '请填写左侧标签' }]} />
      <ProFormText name="displayName" label="卡片标题" rules={[{ required: true, message: '请填写标题' }]} />
      <ProFormText name="displaySubTitle" label="卡片副标题" rules={[{ required: true, message: '请填写副标题' }]} />
      <ProFormTextArea
        name="displayDescription"
        label="卡片简介"
        fieldProps={{ rows: 3 }}
        rules={[{ required: true, message: '请填写短简介' }]}
      />
      <ProFormTextArea
        name="displayDetails"
        label="按钮右侧说明"
        fieldProps={{ rows: 4 }}
        rules={[{ required: true, message: '请填写展开说明' }]}
      />
      <ProFormSwitch name="previewEnabled" label="是否允许预览" />
      <ProFormDigit name="previewPageCount" label="预览页数" min={0} />
      <ProFormText name="accentStart" label="卡片主色" rules={[{ required: true, message: '请填写起始色' }]} />
      <ProFormText name="accentEnd" label="卡片辅色" rules={[{ required: true, message: '请填写结束色' }]} />
      <ProFormDigit name="sortOrder" label="排序" min={0} />
      <ProFormSelect
        name="status"
        label="状态"
        options={[
          { label: '草稿', value: 'draft' },
          { label: '待审核', value: 'pending' },
          { label: '已上架', value: 'online' },
          { label: '已下架', value: 'offline' }
        ]}
      />
    </DrawerForm>
  );
}
