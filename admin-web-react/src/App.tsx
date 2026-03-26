import { Suspense, useEffect, useMemo, useState } from 'react';
import { App as AntApp, ConfigProvider, Result, Spin, theme } from 'antd';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { api } from './api';
import { AuthenticatedAppRoute, LoginPageRoute, preloadAuthenticatedApp, preloadLoginPage } from './routes';
import { scheduleIdleTask } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false
    }
  }
});

const themeStorageKey = 'cfqh-react-admin-theme-mode';

export type ThemeMode = 'light' | 'dark';

function LoadingScreen() {
  return (
    <div className="center-screen">
      <Spin size="large" />
    </div>
  );
}

function SuspendedRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

function AppRouter({ themeMode, onToggleTheme }: { themeMode: ThemeMode; onToggleTheme: () => void }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: () => api.getAuthStatus(),
    retry: false
  });
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth()
  });

  useEffect(() => {
    if (authQuery.isLoading || healthQuery.isLoading || authQuery.isError || !authQuery.data) {
      return undefined;
    }

    return authQuery.data.authenticated
      ? scheduleIdleTask(() => {
          void preloadAuthenticatedApp();
        })
      : scheduleIdleTask(() => {
          void preloadLoginPage();
          void preloadAuthenticatedApp();
        });
  }, [authQuery.data, authQuery.isError, authQuery.isLoading, healthQuery.isLoading]);

  const refreshSession = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['auth'] }),
      queryClient.invalidateQueries({ queryKey: ['meta'] }),
      queryClient.invalidateQueries({ queryKey: ['health'] })
    ]);
  };

  const handleLogout = async () => {
    await api.logout();
    await refreshSession();
    navigate('/');
  };

  if (authQuery.isLoading || healthQuery.isLoading) {
    return <LoadingScreen />;
  }

  if (authQuery.isError || !authQuery.data || !healthQuery.data) {
    return (
      <div className="center-screen">
        <Result status="error" title="后台状态读取失败" subTitle="请检查 3200 服务是否已启动，再刷新页面重试。" />
      </div>
    );
  }

  if (!authQuery.data.authenticated) {
    return (
      <SuspendedRoute>
        <LoginPageRoute auth={authQuery.data} health={healthQuery.data} onSuccess={refreshSession} themeMode={themeMode} onToggleTheme={onToggleTheme} />
      </SuspendedRoute>
    );
  }

  return (
    <SuspendedRoute>
      <AuthenticatedAppRoute
        auth={authQuery.data}
        health={healthQuery.data}
        onLogout={handleLogout}
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
      />
    </SuspendedRoute>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const storedMode = window.localStorage.getItem(themeStorageKey);
    if (storedMode === 'light' || storedMode === 'dark') {
      return storedMode;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem(themeStorageKey, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const themeConfig = useMemo(
    () => ({
      algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: themeMode === 'dark' ? '#7d9bdd' : '#5275b5',
        colorInfo: themeMode === 'dark' ? '#7d9bdd' : '#5275b5',
        colorSuccess: themeMode === 'dark' ? '#6ab392' : '#4f8a72',
        colorBgBase: themeMode === 'dark' ? '#0f1726' : '#eef3fa',
        colorBgContainer: themeMode === 'dark' ? 'rgba(24, 34, 53, 0.9)' : 'rgba(240, 246, 252, 0.9)',
        colorBgElevated: themeMode === 'dark' ? 'rgba(28, 39, 60, 0.96)' : 'rgba(246, 249, 253, 0.96)',
        colorText: themeMode === 'dark' ? '#e8eefc' : '#20304d',
        colorTextSecondary: themeMode === 'dark' ? '#9caecc' : '#667a9b',
        colorBorderSecondary: themeMode === 'dark' ? 'rgba(132, 155, 197, 0.18)' : 'rgba(111, 132, 171, 0.16)',
        borderRadius: 18,
        fontFamily: '"IBM Plex Sans", "PingFang SC", "Microsoft YaHei", sans-serif'
      },
      components: {
        Layout: {
          headerBg: 'transparent',
          bodyBg: 'transparent',
          siderBg: 'transparent'
        },
        Card: {
          colorBgContainer: themeMode === 'dark' ? 'rgba(27, 38, 57, 0.9)' : 'rgba(238, 244, 251, 0.88)'
        },
        Button: {
          defaultBg: themeMode === 'dark' ? 'rgba(32, 44, 67, 0.84)' : 'rgba(255, 255, 255, 0.74)',
          defaultBorderColor: themeMode === 'dark' ? 'rgba(132, 155, 197, 0.22)' : 'rgba(111, 132, 171, 0.22)',
          defaultColor: themeMode === 'dark' ? '#dbe6fb' : '#36527f',
          primaryShadow: themeMode === 'dark' ? '0 12px 24px rgba(59, 87, 140, 0.34)' : '0 12px 24px rgba(82, 117, 181, 0.18)'
        },
        Tag: {
          defaultBg: themeMode === 'dark' ? 'rgba(99, 128, 182, 0.18)' : 'rgba(108, 138, 187, 0.1)',
          defaultColor: themeMode === 'dark' ? '#d3e0fb' : '#486389'
        }
      }
    }),
    [themeMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <AntApp>
          <BrowserRouter basename="/react-admin">
            <AppRouter themeMode={themeMode} onToggleTheme={toggleTheme} />
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
