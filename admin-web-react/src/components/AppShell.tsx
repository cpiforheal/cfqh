import { useEffect, useState, type ReactNode } from 'react';
import { Button, Layout, Menu, Space, Tag, Tooltip, Typography } from 'antd';
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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SwapOutlined,
  TeamOutlined
} from '@ant-design/icons';
import type { AuthState, HealthPayload, MetaPayload } from '../api';
import { menuSections, moduleConfigMap, type ModuleKey } from '../config';
import { preloadModuleRoute } from '../routes';

const { Header, Sider, Content } = Layout;
const sidebarStorageKey = 'cfqh-react-admin-sidebar-collapsed';

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
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(sidebarStorageKey) === '1';
  });

  useEffect(() => {
    window.localStorage.setItem(sidebarStorageKey, collapsed ? '1' : '0');
  }, [collapsed]);

  const activeModule = moduleConfigMap[selectedKey as ModuleKey] || moduleConfigMap.overview;
  const compactLabel = activeModule.label.length > 2 ? activeModule.label.slice(0, 2) : activeModule.label;

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
      title: moduleConfigMap[itemKey].label,
      icon: menuIcons[moduleConfigMap[itemKey].iconKey],
      label: (
        <span
          className="app-shell-menu-label"
          onMouseEnter={() => handlePreload(itemKey)}
          onFocus={() => handlePreload(itemKey)}
        >
          {moduleConfigMap[itemKey].label}
        </span>
      )
    }))
  }));

  return (
    <Layout className="app-shell">
      <Sider
        collapsed={collapsed}
        trigger={null}
        collapsedWidth={92}
        width={272}
        className={`app-shell-sider${collapsed ? ' is-collapsed' : ''}`}
      >
        <div className="brand-block">
          <div className="brand-top">
            <div className={`brand-badge${collapsed ? ' is-compact' : ''}`}>{collapsed ? menuIcons[activeModule.iconKey] : 'React'}</div>
            <Tooltip title={collapsed ? '展开侧边栏' : '收起侧边栏'}>
              <Button
                type="text"
                className="sider-toggle"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed((value) => !value)}
              />
            </Tooltip>
          </div>
          <div className="brand-copy">
            <Typography.Title level={4} className="brand-title">
              乘帆后台
            </Typography.Title>
            <Typography.Paragraph className="brand-subtitle">
              ProTable 主控区验证版
            </Typography.Paragraph>
          </div>
          <div className="collapsed-current" aria-hidden={!collapsed}>
            <div className="collapsed-current-icon">{menuIcons[activeModule.iconKey]}</div>
            <Typography.Text className="collapsed-current-text">{compactLabel}</Typography.Text>
          </div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          inlineCollapsed={collapsed}
          className="app-shell-menu"
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
          <div className="app-shell-header-copy">
            <Typography.Text className="eyebrow">3200 后台 React 重写中</Typography.Text>
            <Typography.Title level={3} className="page-title">
              {activeModule.title}
            </Typography.Title>
          </div>
          <Space size="middle" wrap className="app-shell-header-actions">
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
