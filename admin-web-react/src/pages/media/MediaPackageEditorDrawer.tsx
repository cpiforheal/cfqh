import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { DrawerForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { defaultMaterialPackage, materialDirectionLabels, materialStageLabels, type MaterialPackageRecord } from './types';
import { toMultilineText, toStringArray } from '../../utils';

type MediaPackageEditorDrawerProps = {
  open: boolean;
  record: MaterialPackageRecord | null;
  direction: MaterialPackageRecord['direction'];
  stage: MaterialPackageRecord['stage'];
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: MaterialPackageRecord) => Promise<boolean>;
};

type MaterialPackageFormValues = {
  badge: string;
  title: string;
  target: string;
  solves: string;
  featuresText: string;
  sort: number;
  status: MaterialPackageRecord['status'];
};

export function MediaPackageEditorDrawer({
  open,
  record,
  direction,
  stage,
  onOpenChange,
  onSubmit
}: MediaPackageEditorDrawerProps) {
  const [form] = Form.useForm<MaterialPackageFormValues>();

  const initialValues = useMemo(
    () => ({
      badge: String(record?.badge || defaultMaterialPackage.badge),
      title: String(record?.title || defaultMaterialPackage.title),
      target: String(record?.target || defaultMaterialPackage.target),
      solves: String(record?.solves || defaultMaterialPackage.solves),
      featuresText: toMultilineText(record?.features || defaultMaterialPackage.features),
      sort: Number(record?.sort || defaultMaterialPackage.sort),
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
    <DrawerForm<MaterialPackageFormValues>
      title={record?._id ? '编辑当前主推套系' : '新建当前主推套系'}
      open={open}
      width={560}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
          ...(record || defaultMaterialPackage),
          direction,
          stage,
          badge: values.badge,
          title: values.title,
          target: values.target,
          solves: values.solves,
          features: toStringArray(values.featuresText),
          sort: values.sort,
          status: values.status
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存主推套系' : '创建主推套系'
        }
      }}
    >
      <ProFormText
        name="badge"
        label="左上角角标"
        extra={`当前会出现在 ${materialDirectionLabels[direction]} · ${materialStageLabels[stage]} 这张主卡上`}
        rules={[{ required: true, message: '请填写角标' }]}
      />
      <ProFormText name="title" label="套系标题" rules={[{ required: true, message: '请填写套系标题' }]} />
      <ProFormTextArea
        name="target"
        label="适合哪些老师/学生"
        rules={[{ required: true, message: '请填写适合对象' }]}
        fieldProps={{ rows: 3 }}
      />
      <ProFormTextArea
        name="solves"
        label="主要解决什么问题"
        rules={[{ required: true, message: '请填写解决问题说明' }]}
        fieldProps={{ rows: 3 }}
      />
      <ProFormTextArea
        name="featuresText"
        label="卖点列表"
        extra="一行一个，前台会按列表顺序展示。"
        fieldProps={{ rows: 5 }}
      />
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
