import { useEffect, useState, type ReactNode } from 'react';
import { Button, Layout, Menu, Select, Space, Tag, Tooltip, Typography } from 'antd';
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
  MoonOutlined,
  ProfileOutlined,
  SunOutlined,
  SwapOutlined,
  TeamOutlined
} from '@ant-design/icons';
import type { AuthState, HealthPayload, MetaPayload } from '../api';
import { adminSearchEntries, menuSections, moduleConfigMap, type ModuleKey } from '../config';
import { preloadModuleRoute } from '../routes';
import type { ThemeMode } from '../App';

const { Header, Sider, Content } = Layout;
const sidebarStorageKey = 'cfqh-react-admin-sidebar-collapsed';

type AppShellProps = {
  auth: AuthState;
  meta: MetaPayload;
  health: HealthPayload;
  onLogout: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
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

export function AppShell({ auth, meta, health, onLogout, themeMode, onToggleTheme, children }: AppShellProps) {
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
  const currentUserName = String(meta.currentUser?.name || auth.user?.name || '未命名账号');
  const currentUserRole = String(meta.currentUser?.roleLabel || auth.user?.roleLabel || '未分配角色');
  const activeMenuSection = menuSections.find((section) => section.items.includes(activeModule.key));

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

  const searchOptions = adminSearchEntries.map((entry) => ({
    value: entry.path,
    label: (
      <div className="admin-search-option">
        <Typography.Text strong>{entry.label}</Typography.Text>
        <Typography.Text type="secondary">{`${entry.group} · ${entry.hint}`}</Typography.Text>
      </div>
    )
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
              轻量工作台验证版
            </Typography.Paragraph>
          </div>
          <div className="collapsed-current" aria-hidden={!collapsed}>
            <div className="collapsed-current-icon">{menuIcons[activeModule.iconKey]}</div>
            <Typography.Text className="collapsed-current-text">{compactLabel}</Typography.Text>
          </div>
        </div>
        <Menu
          theme={themeMode === 'dark' ? 'dark' : 'light'}
          mode="inline"
          inlineCollapsed={collapsed}
          className="app-shell-menu"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(`/${key}`)}
        />
        <div className="sider-footer">
          <Tag bordered={false} color={health.cloudReady ? 'processing' : 'warning'}>
            {health.modeLabel}
          </Tag>
          <Typography.Text className="sider-footer-text">{health.writeTargetLabel}</Typography.Text>
        </div>
      </Sider>
      <Layout className="app-shell-main">
        <Header className="app-shell-header">
          <div className="app-shell-header-copy">
            <Typography.Text className="eyebrow">
              {activeMenuSection ? `${activeMenuSection.label} · 3200 React 后台` : '3200 React 后台'}
            </Typography.Text>
            <Typography.Title level={3} className="page-title">
              {activeModule.title}
            </Typography.Title>
            <Typography.Paragraph className="app-shell-header-meta">{activeModule.subtitle}</Typography.Paragraph>
            <div className="app-shell-location-row">
              <Tag bordered={false} color="default">
                {`当前页 ${activeModule.label}`}
              </Tag>
              <Typography.Text type="secondary">
                {activeModule.mode === 'list' || activeModule.mode === 'mixed'
                  ? '主表先看顺序和摘要，细字段收进抽屉'
                  : '先从任务入口进入，再按老师常用顺序操作'}
              </Typography.Text>
            </div>
          </div>
          <Space size="small" wrap className="app-shell-header-actions">
            <Select
              showSearch
              allowClear
              placeholder="搜索页面或常用操作"
              optionFilterProp="label"
              className="admin-header-search"
              popupMatchSelectWidth={360}
              options={searchOptions}
              onSelect={(value) => navigate(String(value))}
              filterOption={(input, option) => {
                if (!option) return false;
                const plain = adminSearchEntries.find((entry) => entry.path === option.value);
                const haystack = `${plain?.label || ''} ${plain?.hint || ''} ${plain?.group || ''}`.toLowerCase();
                return haystack.includes(input.toLowerCase());
              }}
            />
            <div className="header-user-chip">
              <Typography.Text strong className="header-user-name">
                {currentUserName}
              </Typography.Text>
              <Typography.Text className="header-user-role">{currentUserRole}</Typography.Text>
            </div>
            <Tooltip title={themeMode === 'dark' ? '切换到明亮模式' : '切换到暗色模式'}>
              <Button
                icon={themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
                onClick={onToggleTheme}
                className="theme-toggle"
              >
                {themeMode === 'dark' ? '明亮' : '暗色'}
              </Button>
            </Tooltip>
            <Button icon={<SwapOutlined />} href="/" target="_blank">
              旧后台
            </Button>
            <Button icon={<LogoutOutlined />} onClick={onLogout}>
              退出登录
            </Button>
          </Space>
        </Header>
        <Content className="app-shell-content">
          <div className="app-shell-content-inner">{children}</div>
        </Content>
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
