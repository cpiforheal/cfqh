import { useQuery } from '@tanstack/react-query';
import { Button, Card, Descriptions, Empty, Result, Space, Spin, Tag, Typography } from 'antd';
import type { AuthState } from '../api';
import { api } from '../api';
import type { ModuleConfig } from '../config';
import { formatDateTime, safeObjectEntries } from '../utils';

type PageWorkbenchProps = {
  auth: AuthState;
  view: ModuleConfig;
};

export function PageWorkbench({ auth, view }: PageWorkbenchProps) {
  const pageQuery = useQuery({
    queryKey: ['page', view.pageKey],
    queryFn: () => api.getPage(String(view.pageKey)),
    enabled: Boolean(view.pageKey)
  });

  if (view.key === 'accounts' && !auth.permissions.canManageUsers) {
    return (
      <Result
        status="403"
        title="当前账号暂无账号管理权限"
        subTitle="账号模块需要管理用户权限才能进入。"
      />
    );
  }

  const pageMeta = pageQuery.data?._meta as Record<string, unknown> | undefined;
  const summaryFields = safeObjectEntries(pageQuery.data).filter(([key]) => !key.startsWith('_')).slice(0, 6);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Typography.Text className="eyebrow">骨架工作台</Typography.Text>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          {view.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary">{view.subtitle}</Typography.Paragraph>
        <Space wrap>
          <Tag color="gold">详细编辑仍在旧后台</Tag>
          {view.pageKey ? <Tag>页面键 {view.pageKey}</Tag> : null}
          {view.collections.map((item) => (
            <Tag key={item.key}>{item.label}</Tag>
          ))}
          <Button href="/" target="_blank">
            去旧后台继续维护
          </Button>
        </Space>
      </Card>

      <Card title="页面摘要">
        {view.pageKey ? (
          pageQuery.isLoading ? (
            <Spin />
          ) : pageQuery.data ? (
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="最近更新">{formatDateTime(pageMeta?.updatedAt)}</Descriptions.Item>
              <Descriptions.Item label="版本号">{String(pageMeta?.revision || '-')}</Descriptions.Item>
              <Descriptions.Item label="可见字段">
                {summaryFields.length ? (
                  <Space wrap>
                    {summaryFields.map(([key]) => (
                      <Tag key={key}>{key}</Tag>
                    ))}
                  </Space>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前页面暂无可摘要字段" />
                )}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂未读到页面内容" />
          )
        ) : (
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            这个模块本阶段先提供入口与权限摘要，不直接在 React 版内维护。
          </Typography.Paragraph>
        )}
      </Card>

      <Card title="迁移说明">
        <Space direction="vertical" size="small">
          <Typography.Text>React 版已接入当前模块的导航和摘要能力。</Typography.Text>
          <Typography.Text>复杂表单、批量导入和页面精修还保留在旧后台，避免第一阶段迁移过重。</Typography.Text>
          <Typography.Text>等你确认验证版流程顺手后，我们再把这个模块继续迁成正式 ProTable 或分段编辑器。</Typography.Text>
        </Space>
      </Card>
    </Space>
  );
}
