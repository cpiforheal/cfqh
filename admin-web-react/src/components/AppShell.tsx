import type { ReactNode } from 'react';
import { Button, Layout, Menu, Space, Tag, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  BookOutlined,
  CompassOutlined,
  ContactsOutlined,
  DashboardOutlined,
  HomeOutlined,
  IdcardOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SwapOutlined,
  TeamOutlined
} from '@ant-design/icons';
import type { AuthState, HealthPayload, MetaPayload } from '../api';
import { menuSections, moduleConfigMap } from '../config';
import { preloadModuleRoute } from '../routes';

const { Header, Sider, Content } = Layout;

type AppShellProps = {
  auth: AuthState;
  meta: MetaPayload;
  health: HealthPayload;
  onLogout: () => void;
  children: React.ReactNode;
};

const menuIcons: Record<string, ReactNode> = {
  dashboard: <DashboardOutlined />,
  home: <HomeOutlined />,
  compass: <CompassOutlined />,
  book: <BookOutlined />,
  appstore: <AppstoreOutlined />,
  team: <TeamOutlined />,
  profile: <ProfileOutlined />,
  contacts: <ContactsOutlined />,
  idcard: <IdcardOutlined />
};

export function AppShell({ auth, meta, health, onLogout, children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname.replace(/^\/+/, '') || 'overview';
  const handlePreload = (moduleKey: string) => {
    if (moduleKey in moduleConfigMap) {
      void preloadModuleRoute(moduleKey as keyof typeof moduleConfigMap);
    }
  };

  const menuItems: MenuProps['items'] = menuSections.map((section) => ({
    type: 'group',
    label: section.label,
    key: section.key,
    children: section.items.map((itemKey) => ({
      key: itemKey,
      icon: menuIcons[moduleConfigMap[itemKey].iconKey],
      label: (
        <span onMouseEnter={() => handlePreload(itemKey)} onFocus={() => handlePreload(itemKey)}>
          {moduleConfigMap[itemKey].label}
        </span>
      )
    }))
  }));

  return (
    <Layout className="app-shell">
      <Sider breakpoint="lg" collapsedWidth={84} width={264} className="app-shell-sider">
        <div className="brand-block">
          <div className="brand-badge">React</div>
          <Typography.Title level={4} className="brand-title">
            乘帆后台
          </Typography.Title>
          <Typography.Paragraph className="brand-subtitle">
            ProTable 主控区验证版
          </Typography.Paragraph>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(`/${key}`)}
        />
        <div className="sider-footer">
          <Tag color={health.cloudReady ? 'blue' : 'gold'}>{health.modeLabel}</Tag>
          <Typography.Text className="sider-footer-text">{health.writeTargetLabel}</Typography.Text>
        </div>
      </Sider>
      <Layout>
        <Header className="app-shell-header">
          <div>
            <Typography.Text className="eyebrow">3200 后台 React 重写中</Typography.Text>
            <Typography.Title level={3} className="page-title">
              {moduleConfigMap[selectedKey as keyof typeof moduleConfigMap]?.title || '工作台'}
            </Typography.Title>
          </div>
          <Space size="middle" wrap>
            <Tag color="processing">{String(meta.currentUser?.name || auth.user?.name || '未命名账号')}</Tag>
            <Tag>{String(meta.currentUser?.roleLabel || '未分配角色')}</Tag>
            <Button icon={<SwapOutlined />} href="/" target="_blank">
              旧后台
            </Button>
            <Button icon={<LogoutOutlined />} onClick={onLogout}>
              退出登录
            </Button>
          </Space>
        </Header>
        <Content className="app-shell-content">{children}</Content>
        <div className="app-shell-footer">
          <Space size="middle" wrap>
            <Link to="/overview">工作台</Link>
            <Typography.Text type="secondary">{health.writeNotice}</Typography.Text>
          </Space>
        </div>
      </Layout>
    </Layout>
  );
}
