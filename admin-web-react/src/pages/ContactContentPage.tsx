import { lazy, Suspense, useMemo, useState } from 'react';
import { App, Card, Result, Space, Spin, Tag, Typography } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AuthState } from '../api';
import { api } from '../api';
import { formatDateTime } from '../utils';
import { contactSectionModels, normalizeSitePage, type ContactSectionId, type SitePageContent } from './contact/types';

const ContactSectionEditorDrawer = lazy(() =>
  import('./contact/ContactSectionEditorDrawer').then((module) => ({ default: module.ContactSectionEditorDrawer }))
);

type ContactContentPageProps = {
  auth: AuthState;
};

type ContactSectionRow = {
  id: ContactSectionId;
  step: string;
  title: string;
  desc: string;
  location: string;
  summary: string;
  editFields: string;
  statusLabel: string;
  statusTone: 'success' | 'warning';
};

function buildSectionRows(page: SitePageContent): ContactSectionRow[] {
  return contactSectionModels.map((section) => {
    if (section.id === 'brand') {
      const ready = Boolean(page.siteName && page.brandName && page.intro);
      return {
        ...section,
        summary: `${page.siteName || '未填写站点名'} / ${page.brandName || '未填写品牌名'}`,
        editFields: '站点名称、品牌名称、机构简介',
        statusLabel: ready ? '品牌信息已完整' : '建议先补品牌基础信息',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    if (section.id === 'contact') {
      const ready = Boolean(page.contactPhone && page.contactWechat && page.serviceHours);
      return {
        ...section,
        summary: `${page.contactPhone || '未填写电话'} / ${page.contactWechat || '未填写微信'} / ${page.serviceHours || '未填写服务时间'}`,
        editFields: '电话、微信、服务时间',
        statusLabel: ready ? '联系方式已完整' : '建议补齐联系方式',
        statusTone: ready ? 'success' : 'warning'
      };
    }

    const ready = Boolean(page.address);
    return {
      ...section,
      summary: `${page.address || '未填写地址'} / ${page.contactQrcode || '未填写二维码说明'}`,
      editFields: '地址、二维码说明、二维码链接',
      statusLabel: ready ? '地址区已完整' : '建议补齐地址信息',
      statusTone: ready ? 'success' : 'warning'
    };
  });
}

export function ContactContentPage({ auth }: ContactContentPageProps) {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [editingSection, setEditingSection] = useState<ContactSectionId | null>(null);

  const siteQuery = useQuery({
    queryKey: ['page', 'site'],
    queryFn: () => api.getPage('site')
  });

  const updateMutation = useMutation({
    mutationFn: (payload: SitePageContent) => api.updatePage('site', payload as unknown as Record<string, unknown>),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['page', 'site'] });
    }
  });

  const page = useMemo(() => normalizeSitePage(siteQuery.data), [siteQuery.data]);
  const rows = useMemo(() => buildSectionRows(page), [page]);
  const readyCount = rows.filter((item) => item.statusTone === 'success').length;
  const lastUpdated = formatDateTime(page._meta?.updatedAt || page._updatedAt);

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法读取站点设置。" />;
  }

  if (siteQuery.isError) {
    return <Result status="error" title="站点设置读取失败" subTitle="请稍后刷新重试，或检查当前数据服务是否正常。" />;
  }

  async function handleSave(nextPage: SitePageContent) {
    await updateMutation.mutateAsync(nextPage);
    message.success('站点设置已保存');
    setEditingSection(null);
  }

  const columns: ProColumns<ContactSectionRow>[] = [
    {
      title: '顺序',
      dataIndex: 'step',
      width: 96,
      search: false
    },
    {
      title: '区块',
      dataIndex: 'title',
      width: 260,
      search: false,
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary">{record.desc}</Typography.Text>
        </Space>
      )
    },
    {
      title: '前台位置',
      dataIndex: 'location',
      width: 190,
      search: false
    },
    {
      title: '当前内容摘要',
      dataIndex: 'summary',
      ellipsis: true,
      search: false
    },
    {
      title: '点编辑后可改',
      dataIndex: 'editFields',
      width: 220,
      search: false
    },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      width: 160,
      search: false,
      render: (_, record) => <Tag color={record.statusTone === 'success' ? 'success' : 'warning'}>{record.statusLabel}</Tag>
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <a key="edit" onClick={() => setEditingSection(record.id)}>
          编辑
        </a>
      ]
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">站点设置主控区</Typography.Text>
            <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>
              先保公共联系信息，再补地址和二维码
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              这里维护的是多个页面共用的公共信息，所以主表只保留老师最容易找到的重点条目。
            </Typography.Paragraph>
          </div>

          <Space wrap>
            <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
              {auth.permissions.canWrite ? '可直接保存' : '当前只读'}
            </Tag>
            <Tag>{`已成型 ${readyCount}/${rows.length}`}</Tag>
            <Tag>{`最近更新 ${lastUpdated}`}</Tag>
          </Space>
        </Space>
      </Card>

      {siteQuery.isLoading ? (
        <div className="center-screen">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="home-workspace-card">
          <ProTable<ContactSectionRow>
            rowKey="id"
            search={false}
            options={{ density: false, fullScreen: false, reload: false, setting: false }}
            pagination={false}
            columns={columns}
            dataSource={rows}
            scroll={{ x: 1180 }}
            toolbar={{
              title: '站点信息总表'
            }}
          />
        </Card>
      )}

      <Suspense fallback={null}>
        <ContactSectionEditorDrawer
          open={Boolean(editingSection)}
          sectionId={editingSection}
          page={page}
          canWrite={auth.permissions.canWrite}
          saving={updateMutation.isPending}
          onClose={() => setEditingSection(null)}
          onSave={handleSave}
        />
      </Suspense>
    </Space>
  );
}
