import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import {
  DrawerForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
import { defaultMaterialItem, materialDirectionLabels, materialStageLabels, type MaterialItemRecord } from './types';

type MediaItemEditorDrawerProps = {
  open: boolean;
  record: MaterialItemRecord | null;
  direction: MaterialItemRecord['direction'];
  stage: MaterialItemRecord['stage'];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: MaterialItemRecord) => Promise<boolean>;
};

type MaterialItemFormValues = {
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string;
  accentStart: string;
  accentEnd: string;
  sort: number;
  status: MaterialItemRecord['status'];
};

export function MediaItemEditorDrawer({
  open,
  record,
  direction,
  stage,
  onOpenChange,
  onSubmit
}: MediaItemEditorDrawerProps) {
  const [form] = Form.useForm<MaterialItemFormValues>();

  const initialValues = useMemo(
    () => ({
      type: String(record?.type || defaultMaterialItem.type),
      title: String(record?.title || defaultMaterialItem.title),
      subtitle: String(record?.subtitle || defaultMaterialItem.subtitle),
      desc: String(record?.desc || defaultMaterialItem.desc),
      details: String(record?.details || defaultMaterialItem.details),
      accentStart: String(record?.accentStart || defaultMaterialItem.accentStart),
      accentEnd: String(record?.accentEnd || defaultMaterialItem.accentEnd),
      sort: Number(record?.sort || defaultMaterialItem.sort),
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
    <DrawerForm<MaterialItemFormValues>
      title={record?._id ? '编辑资料卡片' : '新增资料卡片'}
      open={open}
      width={560}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
          ...(record || defaultMaterialItem),
          direction,
          stage,
          type: values.type,
          title: values.title,
          subtitle: values.subtitle,
          desc: values.desc,
          details: values.details,
          accentStart: values.accentStart,
          accentEnd: values.accentEnd,
          sort: values.sort,
          status: values.status
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存资料卡片' : '创建资料卡片'
        }
      }}
    >
      <ProFormText
        name="type"
        label="资料类型"
        extra={`当前会出现在 ${materialDirectionLabels[direction]} · ${materialStageLabels[stage]} 的资料列表里`}
        rules={[{ required: true, message: '请填写资料类型' }]}
      />
      <ProFormText name="title" label="资料标题" rules={[{ required: true, message: '请填写资料标题' }]} />
      <ProFormText name="subtitle" label="资料副标题" rules={[{ required: true, message: '请填写资料副标题' }]} />
      <ProFormTextArea
        name="desc"
        label="短简介"
        fieldProps={{ rows: 3 }}
        rules={[{ required: true, message: '请填写短简介' }]}
      />
      <ProFormTextArea
        name="details"
        label="展开说明"
        fieldProps={{ rows: 4 }}
        rules={[{ required: true, message: '请填写展开说明' }]}
      />
      <ProFormText name="accentStart" label="卡片渐变起始色" rules={[{ required: true, message: '请填写起始色' }]} />
      <ProFormText name="accentEnd" label="卡片渐变结束色" rules={[{ required: true, message: '请填写结束色' }]} />
      <ProFormDigit name="sort" label="排序" min={0} />
      <ProFormSelect
        name="status"
        label="状态"
        options={[
          { label: '草稿', value: 'draft' },
          { label: '已发布', value: 'published' }
        ]}
      />
    </DrawerForm>
  );
}
