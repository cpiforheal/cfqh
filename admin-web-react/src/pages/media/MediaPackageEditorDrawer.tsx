import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { DrawerForm, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
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

  return (
    <DrawerForm<MallProductFormValues>
      title={record?._id ? '编辑商城商品卡' : '新建商城商品卡'}
      open={open}
      width={560}
      form={form}
      onOpenChange={onOpenChange}
      drawerProps={{ destroyOnClose: true }}
      onFinish={async (values) =>
        onSubmit({
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
        })
      }
      submitter={{
        searchConfig: {
          submitText: record?._id ? '保存商品卡' : '创建商品卡'
        }
      }}
    >
      <ProFormSelect
        name="categoryKey"
        label="这张卡属于哪个分类按钮"
        extra={`当前维护的是 ${materialDirectionLabels[direction]}。前台点不同分类按钮时，会按这里的归属筛选卡片。`}
        options={materialCategoryOptions.map((item) => ({ label: item.label, value: item.key }))}
        rules={[{ required: true, message: '请选择分类' }]}
      />
      <ProFormText
        name="coverMark"
        label="左侧封面大字"
        extra="会显示在卡片左侧封面中央，例如 A、B、V。"
        rules={[{ required: true, message: '请填写左侧封面大字' }]}
      />
      <ProFormText
        name="coverLabel"
        label="左侧封面底部类型字"
        extra="会显示在封面底部，例如 视频课程、实体书籍、资料包。"
        rules={[{ required: true, message: '请填写左侧封面底部类型字' }]}
      />
      <ProFormText name="productName" label="卡片主标题" rules={[{ required: true, message: '请填写卡片主标题' }]} />
      <ProFormTextArea
        name="productSubTitle"
        label="卡片说明"
        fieldProps={{ rows: 3 }}
        rules={[{ required: true, message: '请填写卡片说明' }]}
      />
      <ProFormText
        name="salesLabel"
        label="右侧销量字"
        extra="例如 2.8k 人已购。没有时可以留空。"
      />
      <ProFormText
        name="buttonText"
        label="右下角按钮字"
        initialValue="查看详情"
        rules={[{ required: true, message: '请填写按钮字' }]}
      />
      <ProFormText name="badge" label="辅助小标签" extra="这个字段不是当前商城卡片主视觉重点，可选填。" />
      <ProFormTextArea
        name="productDescription"
        label="补充说明"
        extra="这类补充文案更适合商品详情或内部备注使用，当前列表页不强依赖。"
        fieldProps={{ rows: 3 }}
      />
      <ProFormTextArea
        name="highlightsText"
        label="亮点标签"
        extra="一行一个。当前商城主列表不会强依赖这些标签，但后续详情页可继续使用。"
        fieldProps={{ rows: 5 }}
      />
      <ProFormSelect
        name="productType"
        label="商品类型"
        options={[
          { label: '资料包', value: 'asset_bundle' },
          { label: '系统课', value: 'system_course' },
          { label: '冲刺营', value: 'sprint_camp' },
          { label: '纸质教材', value: 'paper_book' },
          { label: '单资料', value: 'single_asset' }
        ]}
      />
      <ProFormSelect
        name="stage"
        label="所属备考阶段"
        extra="这是后台业务字段，方便后续做分组或权益管理。当前商城列表主视图不直接按它展示。"
        options={[
          { label: materialStageLabels.foundation, value: 'foundation' },
          { label: materialStageLabels.reinforcement, value: 'reinforcement' },
          { label: materialStageLabels.sprint, value: 'sprint' }
        ]}
      />
      <ProFormSwitch name="isFree" label="是否免费领取" />
      <ProFormSwitch name="previewEnabled" label="是否允许预览" />
      <ProFormDigit name="price" label="现价" min={0} />
      <ProFormDigit name="originPrice" label="原价" min={0} />
      <ProFormDigit name="sortOrder" label="排序" min={0} extra="数字越小越靠前。分类筛选后，前台仍按这个排序显示。" />
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
