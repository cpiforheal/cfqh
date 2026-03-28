import { useEffect, useMemo } from 'react';
import { Alert, Button, Drawer, Form, Input, Space, Typography } from 'antd';
import { contactSectionModels, type ContactSectionId, type SitePageContent } from './types';

type ContactSectionEditorDrawerProps = {
  open: boolean;
  sectionId: ContactSectionId | null;
  page: SitePageContent;
  canWrite: boolean;
  saving: boolean;
  onClose: () => void;
  onSave: (payload: SitePageContent) => Promise<void>;
};

const sectionNoteMap: Record<ContactSectionId, string> = {
  brand: '这一块先维护品牌叫什么、对外怎么介绍，属于多个页面都会复用的公共信息。',
  contact: '这里优先改电话、微信和服务时间，老师找起来最直接。',
  address: '地址和二维码放在最后改，避免一开始就被细节打断。'
};

const sectionFieldHintMap: Record<ContactSectionId, string> = {
  brand: '会修改：站点名、品牌名、机构简介',
  contact: '会修改：联系电话、微信号、服务时间',
  address: '会修改：地址、二维码文案、二维码链接'
};

type SiteFormValues = Omit<SitePageContent, '_id' | '_meta' | '_updatedAt'>;

function buildPreview(sectionId: ContactSectionId, page: SitePageContent) {
  if (sectionId === 'brand') {
    return `${page.brandName || '未填写品牌名'} / ${page.intro || '未填写机构简介'}`;
  }
  if (sectionId === 'contact') {
    return `${page.contactPhone || '未填写电话'} / ${page.contactWechat || '未填写微信'} / ${page.serviceHours || '未填写服务时间'}`;
  }
  return `${page.address || '未填写地址'} / ${page.contactQrcode || '未填写二维码说明'}`;
}

export function ContactSectionEditorDrawer({
  open,
  sectionId,
  page,
  canWrite,
  saving,
  onClose,
  onSave
}: ContactSectionEditorDrawerProps) {
  const [form] = Form.useForm<SiteFormValues>();

  const sectionMeta = useMemo(() => contactSectionModels.find((item) => item.id === sectionId) || null, [sectionId]);
  const preview = useMemo(() => (sectionId ? buildPreview(sectionId, page) : ''), [page, sectionId]);

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue({
      siteName: page.siteName,
      brandName: page.brandName,
      contactPhone: page.contactPhone,
      contactWechat: page.contactWechat,
      contactQrcode: page.contactQrcode,
      contactQrcodeUrl: page.contactQrcodeUrl,
      address: page.address,
      serviceHours: page.serviceHours,
      intro: page.intro
    });
  }, [form, open, page]);

  async function handleSubmit() {
    if (!sectionId) return;
    const values = await form.validateFields();
    await onSave({
      ...page,
      ...values
    });
  }

  function renderEditor() {
    if (sectionId === 'brand') {
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form.Item name="siteName" label="站点名称" rules={[{ required: true, message: '请填写站点名称' }]}>
            <Input placeholder="例如 启航专转本" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name="brandName" label="品牌名称" rules={[{ required: true, message: '请填写品牌名称' }]}>
            <Input placeholder="例如 淮安启航专转本" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name="intro" label="机构简介" rules={[{ required: true, message: '请填写机构简介' }]}>
            <Input.TextArea rows={4} placeholder="一句话说明机构擅长帮助哪类学生" disabled={!canWrite} />
          </Form.Item>
        </Space>
      );
    }

    if (sectionId === 'contact') {
      return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form.Item name="contactPhone" label="联系电话" rules={[{ required: true, message: '请填写联系电话' }]}>
            <Input placeholder="例如 400-000-0000" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name="contactWechat" label="微信号" rules={[{ required: true, message: '请填写微信号' }]}>
            <Input placeholder="例如 qihang-zhuanzhuanben" disabled={!canWrite} />
          </Form.Item>
          <Form.Item name="serviceHours" label="服务时间" rules={[{ required: true, message: '请填写服务时间' }]}>
            <Input placeholder="例如 09:00-21:00" disabled={!canWrite} />
          </Form.Item>
        </Space>
      );
    }

    return (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form.Item name="address" label="机构地址" rules={[{ required: true, message: '请填写机构地址' }]}>
          <Input.TextArea rows={3} placeholder="例如 江苏省淮安市..." disabled={!canWrite} />
        </Form.Item>
        <Form.Item name="contactQrcode" label="二维码说明">
          <Input placeholder="例如 微信咨询二维码" disabled={!canWrite} />
        </Form.Item>
        <Form.Item name="contactQrcodeUrl" label="二维码链接">
          <Input placeholder="https://..." disabled={!canWrite} />
        </Form.Item>
      </Space>
    );
  }

  return (
    <Drawer
      title={sectionMeta ? `编辑：${sectionMeta.title}` : '编辑站点设置'}
      width={560}
      open={open}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" loading={saving} onClick={handleSubmit} disabled={!canWrite}>
            保存
          </Button>
        </Space>
      }
    >
      {sectionId ? (
        <Form form={form} layout="vertical" disabled={!canWrite}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Alert
              type="info"
              showIcon
              message={sectionNoteMap[sectionId]}
              description={
                <Space direction="vertical" size={4}>
                  <Typography.Text strong>{`前台位置：${sectionMeta?.location || '当前区块'}`}</Typography.Text>
                  <Typography.Text>{sectionFieldHintMap[sectionId]}</Typography.Text>
                  <Typography.Text type="secondary">{`当前摘要：${preview}`}</Typography.Text>
                </Space>
              }
            />
            {renderEditor()}
          </Space>
        </Form>
      ) : null}
    </Drawer>
  );
}
