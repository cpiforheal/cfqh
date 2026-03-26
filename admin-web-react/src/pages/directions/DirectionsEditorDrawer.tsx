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

  return (
    <DrawerForm<DirectionFormValues>
      title={mode === 'create' ? '新建帖子' : '编辑帖子'}
      open={open}
      onOpenChange={onOpenChange}
      width={560}
      form={form}
      drawerProps={{
        destroyOnClose: true
      }}
      onFinish={onSubmit}
      submitter={{
        searchConfig: {
          submitText: mode === 'create' ? '创建帖子' : '保存修改'
        }
      }}
    >
      <ProFormText name="name" label="帖子名称" rules={[{ required: true, message: '请填写帖子名称' }]} />
      <ProFormText name="slug" label="唯一标识" rules={[{ required: true, message: '请填写 slug' }]} />
      <ProFormText name="category" label="分类" />
      <ProFormSelect
        name="status"
        label="状态"
        options={[
          { label: '草稿', value: 'draft' },
          { label: '已发布', value: 'published' }
        ]}
      />
      <ProFormDigit name="sort" label="排序" min={0} />
      <ProFormSwitch name="isFeatured" label="精选推荐" />
      <ProFormText name="featuredTag" label="精选标签" />
      <ProFormText name="homeTag" label="首页标签" />
      <ProFormText name="iconType" label="图标类型" />
      <ProFormTextArea name="summary" label="摘要" fieldProps={{ rows: 3 }} />
      <ProFormTextArea name="audience" label="适合人群" fieldProps={{ rows: 3 }} />
      <ProFormTextArea
        name="featuresText"
        label="卖点列表"
        extra="一行一个，保存时会自动转成数组。"
        fieldProps={{ rows: 5 }}
      />
      <ProFormTextArea
        name="chipsText"
        label="标签 Chips"
        extra="可用换行、逗号或中文逗号分隔。"
        fieldProps={{ rows: 4 }}
      />
    </DrawerForm>
  );
}
