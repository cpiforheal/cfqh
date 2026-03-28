import { Card, Col, List, Result, Row, Space, Statistic, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import type { AuthState, HealthPayload, MetaPayload } from '../api';
import { api } from '../api';
import { moduleConfigs, overviewQuickTasks } from '../config';
import { formatDateTime } from '../utils';

type OverviewPageProps = {
  auth: AuthState;
  meta: MetaPayload;
  health: HealthPayload;
};

type RecentItem = {
  key: string;
  label: string;
  summary: string;
  updatedAt: string;
  path: string;
};

function readUpdatedAt(payload: Record<string, unknown> | null | undefined) {
  if (!payload) return '';
  const meta = payload._meta as Record<string, unknown> | undefined;
  return String(meta?.updatedAt || payload._updatedAt || '');
}

function buildRecentItems(pageResults: Array<Record<string, unknown> | null | undefined>): RecentItem[] {
  const candidates: RecentItem[] = [
    {
      key: 'home',
      label: '首页内容',
      summary: '首页主卡、快捷入口和资源卡',
      updatedAt: readUpdatedAt(pageResults[0]),
      path: '/home'
    },
    {
      key: 'materials',
      label: '商城',
      summary: '商品卡、资产和底部咨询条',
      updatedAt: readUpdatedAt(pageResults[1]),
      path: '/media'
    },
    {
      key: 'about',
      label: '关于我们',
      summary: '品牌介绍、理念与环境图',
      updatedAt: readUpdatedAt(pageResults[2]),
      path: '/about'
    },
    {
      key: 'site',
      label: '联系方式',
      summary: '品牌名、电话、微信和地址',
      updatedAt: readUpdatedAt(pageResults[3]),
      path: '/contact'
    }
  ];

  return candidates
    .filter((item) => item.updatedAt)
    .sort((a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)));
}

export function OverviewPage({ auth, meta, health }: OverviewPageProps) {
  const pageQueries = useQueries({
    queries: ['home', 'materials', 'about', 'site'].map((pageKey) => ({
      queryKey: ['page', pageKey],
      queryFn: () => api.getPage(pageKey)
    }))
  });

  if (!auth.permissions.canRead) {
    return <Result status="403" title="暂无查看权限" subTitle="当前账号无法查看后台工作台。" />;
  }

  const pagePayloads = pageQueries.map((query) => query.data);
  const recentItems = buildRecentItems(pagePayloads);
  const pendingSections = moduleConfigs.filter((item) => item.key !== 'overview').length;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="hero-card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text className="eyebrow">老师常用入口</Typography.Text>
            <Typography.Title level={2} style={{ marginTop: 0, marginBottom: 8 }}>
              先点最常改的内容，不用先理解整个系统
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              这页先回答三件事：我该先点哪里、最近改到了哪、当前环境能不能直接保存。
            </Typography.Paragraph>
          </div>
          <div className="workspace-status-row">
            <Tag color={health.cloudReady ? 'processing' : 'warning'}>{health.modeLabel}</Tag>
            <Tag color={auth.permissions.canWrite ? 'success' : 'default'}>
              {auth.permissions.canWrite ? '当前可直接保存' : '当前只读'}
            </Tag>
            <Tag>{health.writeTargetLabel}</Tag>
          </div>
          <div className="overview-task-grid">
            {overviewQuickTasks.map((task) => (
              <Link key={task.path} to={task.path} className="overview-task-card-link">
                <Card className={`overview-task-card${task.tone === 'primary' ? ' is-primary' : ''}`} bordered={false}>
                  <Typography.Text className="workspace-guide-label">老师常改</Typography.Text>
                  <Typography.Title level={5} style={{ marginTop: 8, marginBottom: 6 }}>
                    {task.title}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    {task.desc}
                  </Typography.Paragraph>
                </Card>
              </Link>
            ))}
          </div>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="已接入主控区" value={pendingSections} suffix="个模块" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="页面配置" value={meta.pageOptions.length} suffix="项" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="可预览地址" value={health.previewUrls.length} suffix="个" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="最近修改" extra={<Tag bordered={false}>按页面查看</Tag>}>
            <List
              dataSource={recentItems}
              locale={{ emptyText: '还没有读取到最近修改记录' }}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link key="open" to={item.path}>
                      继续编辑
                    </Link>
                  ]}
                >
                  <List.Item.Meta
                    title={item.label}
                    description={
                      <Space direction="vertical" size={2}>
                        <Typography.Text type="secondary">{item.summary}</Typography.Text>
                        <Typography.Text type="secondary">{`最近更新 ${formatDateTime(item.updatedAt)}`}</Typography.Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card title="当前账号与环境">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Typography.Text type="secondary">当前成员</Typography.Text>
                <Typography.Title level={4} style={{ marginTop: 4, marginBottom: 0 }}>
                  {String(meta.currentUser?.name || auth.user?.name || '未命名账号')}
                </Typography.Title>
              </div>
              <div>
                <Typography.Text type="secondary">角色</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                  {String(meta.currentUser?.roleLabel || auth.user?.roleLabel || '未分配')}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">写入说明</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                  {health.writeNotice}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">建议顺序</Typography.Text>
                <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                  先改首页和商城，再看关于我们与联系方式，最后处理用户和账号类列表。
                </Typography.Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
