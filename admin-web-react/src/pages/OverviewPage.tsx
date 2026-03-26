import { Card, Col, List, Row, Space, Statistic, Tag, Typography } from 'antd';
import type { AuthState, HealthPayload, MetaPayload } from '../api';
import { moduleConfigs } from '../config';

type OverviewPageProps = {
  auth: AuthState;
  meta: MetaPayload;
  health: HealthPayload;
};

export function OverviewPage({ auth, meta, health }: OverviewPageProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Typography.Text className="eyebrow">运行状态</Typography.Text>
        <Typography.Title level={2}>React 工作台已经接入 3200 后台</Typography.Title>
        <Typography.Paragraph type="secondary">
          当前策略是旧后台继续挂在根路径，React 版作为 `/react-admin/` 预览入口逐步替换各模块。
        </Typography.Paragraph>
        <Space wrap>
          <Tag color={health.cloudReady ? 'blue' : 'gold'}>{health.modeLabel}</Tag>
          <Tag color={auth.permissions.canWrite ? 'green' : 'default'}>
            {auth.permissions.canWrite ? '具备写入权限' : '只读权限'}
          </Tag>
          <Tag>{health.writeTargetLabel}</Tag>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="页面配置" value={meta.pageOptions.length} suffix="项" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="集合列表" value={meta.listOptions.length} suffix="项" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="预览地址" value={health.previewUrls.length} suffix="个" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="模块接入进度">
            <List
              dataSource={moduleConfigs.filter((item) => item.key !== 'overview')}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag key="mode" color={item.mode === 'list' ? 'processing' : 'default'}>
                      {item.mode === 'list' ? '主控区已接入' : '骨架页'}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta title={item.label} description={item.subtitle} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card title="当前账号">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Typography.Text type="secondary">成员</Typography.Text>
                <Typography.Title level={4} style={{ marginTop: 4 }}>
                  {String(meta.currentUser?.name || auth.user?.name || '未命名账号')}
                </Typography.Title>
              </div>
              <div>
                <Typography.Text type="secondary">角色</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 4 }}>
                  {String(meta.currentUser?.roleLabel || auth.user?.roleLabel || '未分配')}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">写入说明</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                  {health.writeNotice}
                </Typography.Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
