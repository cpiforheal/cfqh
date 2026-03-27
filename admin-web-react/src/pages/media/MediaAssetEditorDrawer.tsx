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
import { defaultMallAsset, materialDirectionLabels, materialStageLabels, type MallAssetRecord } from './types';
import { toMultilineText, toStringArray } from '../../utils';

type MediaAssetEditorDrawerProps = {
  open: boolean;
  record: MallAssetRecord | null;
  direction: MallAssetRecord['direction'];
  stage: MallAssetRecord['stage'];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: MallAssetRecord) => Promise<boolean>;
};

type MallAssetFormValues = {
  name: string;
  title: string;
  subTitle: string;
  description: string;
  assetType: string;
  coverUrl: string;
  coverKey: string;
  pdfUrl: string;
  pdfKey: string;
  pdfPageCount: number;
  pdfFileSize: number;
  previewEnabled: boolean;
  previewPageCount: number;
  tagsText: string;
  accentStart: string;
  accentEnd: string;
  sortOrder: number;
  status: MallAssetRecord['status'];
};

export function MediaAssetEditorDrawer({
  open,
  record,
  direction,
  stage,
  onOpenChange,
  onSubmit
}: MediaAssetEditorDrawerProps) {
  const [form] = Form.useForm<MallAssetFormValues>();

  const initialValues = useMemo(
    () => ({
      name: String(record?.name || defaultMallAsset.name),
      title: String(record?.title || defaultMallAsset.title),
      subTitle: String(record?.subTitle || defaultMallAsset.subTitle),
      description: String(record?.description || defaultMallAsset.description),
      assetType: String(record?.assetType || defaultMallAsset.assetType),
      coverUrl: String(record?.coverUrl || defaultMallAsset.coverUrl),
      coverKey: String(record?.coverKey || defaultMallAsset.coverKey),
      pdfUrl: String(record?.pdfUrl || defaultMallAsset.pdfUrl),
      pdfKey: String(record?.pdfKey || defaultMallAsset.pdfKey),
      pdfPageCount: Number(record?.pdfPageCount || defaultMallAsset.pdfPageCount),
      pdfFileSize: Number(record?.pdfFileSize || defaultMallAsset.pdfFileSize),
      previewEnabled: record?.previewEnabled ?? defaultMallAsset.previewEnabled,
      previewPageCount: Number(record?.previewPageCount || defaultMallAsset.previewPageCount),
      tagsText: toMultilineText(record?.tags || defaultMallAsset.tags),
      accentStart: String(record?.accentStart || defaultMallAsset.accentStart),
      accentEnd: String(record?.accentEnd || defaultMallAsset.accentEnd),
      sortOrder: Number(record?.sortOrder || defaultMallAsset.sortOrder),
      status: record?.status || defaultMallAsset.status
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
    <DrawerForm<MallAssetFormValues>
      title={record?._id ? '编辑资料资产' : '新增资料资产'}
      open={open}
      width={620}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
          ...(record || defaultMallAsset),
          direction,
          stage,
          name: values.name,
          title: values.title,
          subTitle: values.subTitle,
          description: values.description,
          assetType: values.assetType,
          coverUrl: values.coverUrl,
          coverKey: values.coverKey,
          pdfUrl: values.pdfUrl,
          pdfKey: values.pdfKey,
          pdfPageCount: values.pdfPageCount,
          pdfFileSize: values.pdfFileSize,
          previewEnabled: values.previewEnabled,
          previewPageCount: values.previewPageCount,
          tags: toStringArray(values.tagsText),
          accentStart: values.accentStart,
          accentEnd: values.accentEnd,
          sortOrder: values.sortOrder,
          status: values.status
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存资料资产' : '创建资料资产'
        }
      }}
    >
      <ProFormText
        name="title"
        label="资料标题"
        extra={`当前会归到 ${materialDirectionLabels[direction]} · ${materialStageLabels[stage]} 的资料库里`}
        rules={[{ required: true, message: '请填写资料标题' }]}
      />
      <ProFormText name="name" label="资料简称" />
      <ProFormText name="subTitle" label="资料副标题" rules={[{ required: true, message: '请填写资料副标题' }]} />
      <ProFormTextArea
        name="description"
        label="资料简介"
        fieldProps={{ rows: 4 }}
        rules={[{ required: true, message: '请填写资料简介' }]}
      />
      <ProFormSelect
        name="assetType"
        label="资料类型"
        options={[
          { label: 'PDF资料', value: 'PDF资料' },
          { label: '讲义', value: '讲义' },
          { label: '真题', value: '真题' },
          { label: '题集', value: '题集' },
          { label: '电子书', value: '电子书' }
        ]}
      />
      <ProFormText name="coverUrl" label="封面地址" />
      <ProFormText name="coverKey" label="腾讯云封面 Key" />
      <ProFormText name="pdfUrl" label="PDF 地址" />
      <ProFormText name="pdfKey" label="腾讯云 PDF Key" />
      <ProFormDigit name="pdfPageCount" label="PDF 页数" min={0} />
      <ProFormDigit name="pdfFileSize" label="文件大小（字节）" min={0} />
      <ProFormSwitch name="previewEnabled" label="是否允许预览" />
      <ProFormDigit name="previewPageCount" label="允许预览页数" min={0} />
      <ProFormTextArea name="tagsText" label="资料标签" extra="一行一个，方便后续做筛选和搜索。" fieldProps={{ rows: 4 }} />
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
          { label: '已下架', value: 'offline' },
          { label: '已归档', value: 'archived' }
        ]}
      />
    </DrawerForm>
  );
}
