import { Suspense, useEffect, useMemo } from 'react';
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

function AppRouter() {
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
        <LoginPageRoute auth={authQuery.data} health={healthQuery.data} onSuccess={refreshSession} />
      </SuspendedRoute>
    );
  }

  return (
    <SuspendedRoute>
      <AuthenticatedAppRoute auth={authQuery.data} health={healthQuery.data} onLogout={handleLogout} />
    </SuspendedRoute>
  );
}

export default function App() {
  const themeConfig = useMemo(
    () => ({
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#5275b5',
        colorInfo: '#5275b5',
        colorSuccess: '#4f8a72',
        colorBgBase: '#f4f7fb',
        colorBgContainer: 'rgba(255, 255, 255, 0.88)',
        colorText: '#20304d',
        colorTextSecondary: '#667a9b',
        colorBorderSecondary: 'rgba(111, 132, 171, 0.16)',
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
          colorBgContainer: 'rgba(255, 255, 255, 0.84)'
        },
        Button: {
          defaultBg: 'rgba(255, 255, 255, 0.74)',
          defaultBorderColor: 'rgba(111, 132, 171, 0.22)',
          defaultColor: '#36527f',
          primaryShadow: '0 12px 24px rgba(82, 117, 181, 0.18)'
        },
        Tag: {
          defaultBg: 'rgba(108, 138, 187, 0.1)',
          defaultColor: '#486389'
        }
      }
    }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <AntApp>
          <BrowserRouter basename="/react-admin">
            <AppRouter />
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
