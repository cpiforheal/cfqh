import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { DrawerForm, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { defaultMallProduct, materialDirectionLabels, materialStageLabels, type MallProductRecord } from './types';
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
  badge: string;
  productName: string;
  productSubTitle: string;
  productDescription: string;
  highlightsText: string;
  productType: string;
  price: number;
  originPrice: number;
  isFree: boolean;
  previewEnabled: boolean;
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

  const initialValues = useMemo(
    () => ({
      badge: String(record?.badge || defaultMallProduct.badge),
      productName: String(record?.productName || defaultMallProduct.productName),
      productSubTitle: String(record?.productSubTitle || defaultMallProduct.productSubTitle),
      productDescription: String(record?.productDescription || defaultMallProduct.productDescription),
      highlightsText: toMultilineText(record?.highlights || defaultMallProduct.highlights),
      productType: String(record?.productType || defaultMallProduct.productType),
      price: Number(record?.price || defaultMallProduct.price),
      originPrice: Number(record?.originPrice || defaultMallProduct.originPrice),
      isFree: record?.isFree ?? defaultMallProduct.isFree,
      previewEnabled: record?.previewEnabled ?? defaultMallProduct.previewEnabled,
      sortOrder: Number(record?.sortOrder || defaultMallProduct.sortOrder),
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
    <DrawerForm<MallProductFormValues>
      title={record?._id ? '编辑当前主推商品' : '新建当前主推商品'}
      open={open}
      width={560}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
          ...(record || defaultMallProduct),
          direction,
          stage,
          badge: values.badge,
          productName: values.productName,
          productSubTitle: values.productSubTitle,
          productDescription: values.productDescription,
          highlights: toStringArray(values.highlightsText),
          productType: values.productType,
          price: values.isFree ? 0 : values.price,
          originPrice: values.isFree ? 0 : values.originPrice,
          isFree: values.isFree,
          previewEnabled: values.previewEnabled,
          sortOrder: values.sortOrder,
          status: values.status
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存主推商品' : '创建主推商品'
        }
      }}
    >
      <ProFormText
        name="badge"
        label="主卡角标"
        extra={`当前会出现在 ${materialDirectionLabels[direction]} · ${materialStageLabels[stage]} 这张主卡上`}
        rules={[{ required: true, message: '请填写角标' }]}
      />
      <ProFormText name="productName" label="商品标题" rules={[{ required: true, message: '请填写商品标题' }]} />
      <ProFormTextArea
        name="productSubTitle"
        label="适合谁看"
        rules={[{ required: true, message: '请填写适合对象' }]}
        fieldProps={{ rows: 3 }}
      />
      <ProFormTextArea
        name="productDescription"
        label="商品简介"
        rules={[{ required: true, message: '请填写商品简介' }]}
        fieldProps={{ rows: 3 }}
      />
      <ProFormTextArea
        name="highlightsText"
        label="主卡亮点"
        extra="一行一个，前台会按填写顺序展示。"
        fieldProps={{ rows: 5 }}
      />
      <ProFormSelect
        name="productType"
        label="商品类型"
        options={[
          { label: '单资料', value: 'single_asset' },
          { label: '资料包', value: 'asset_bundle' },
          { label: '书课包', value: 'course_bundle' }
        ]}
      />
      <ProFormSwitch name="isFree" label="是否免费领取" />
      <ProFormSwitch name="previewEnabled" label="是否允许预览" />
      <ProFormDigit name="price" label="现价" min={0} />
      <ProFormDigit name="originPrice" label="原价" min={0} />
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
