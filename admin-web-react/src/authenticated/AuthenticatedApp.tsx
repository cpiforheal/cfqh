import { Suspense } from 'react';
import { Result, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { AuthState, HealthPayload } from '../api';
import { api } from '../api';
import { AppShell } from '../components/AppShell';
import { moduleConfigMap, moduleConfigs, type ModuleKey } from '../config';
import {
  AboutContentPageRoute,
  AccountsPageRoute,
  DirectionsPageRoute,
  HomeContentPageRoute,
  LearnersPageRoute,
  ContactContentPageRoute,
  MediaContentPageRoute,
  OverviewPageRoute,
  PageWorkbenchRoute,
  QuestionBankPageRoute
} from '../routes';
import type { ThemeMode } from '../App';

type AuthenticatedAppProps = {
  auth: AuthState;
  health: HealthPayload;
  onLogout: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
};

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

export function AuthenticatedApp({ auth, health, onLogout, themeMode, onToggleTheme }: AuthenticatedAppProps) {
  const location = useLocation();
  const metaQuery = useQuery({
    queryKey: ['meta'],
    queryFn: () => api.getMeta(),
    retry: false
  });

  if (metaQuery.isLoading || !metaQuery.data) {
    return <LoadingScreen />;
  }

  if (metaQuery.isError) {
    return (
      <div className="center-screen">
        <Result status="error" title="后台元信息读取失败" subTitle="请刷新重试，或检查当前账号是否仍具备读取权限。" />
      </div>
    );
  }

  const currentKey = (location.pathname.replace(/^\/+/, '') || 'overview') as ModuleKey;
  const fallbackView = moduleConfigMap[currentKey] || moduleConfigMap.overview;

  return (
    <AppShell auth={auth} meta={metaQuery.data} health={health} onLogout={onLogout} themeMode={themeMode} onToggleTheme={onToggleTheme}>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route
          path="/overview"
          element={
            <SuspendedRoute>
              <OverviewPageRoute auth={auth} meta={metaQuery.data} health={health} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <SuspendedRoute>
              <HomeContentPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/directions"
          element={
            <SuspendedRoute>
              <DirectionsPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/questionBank"
          element={
            <SuspendedRoute>
              <QuestionBankPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/learners"
          element={
            <SuspendedRoute>
              <LearnersPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/media"
          element={
            <SuspendedRoute>
              <MediaContentPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <SuspendedRoute>
              <AboutContentPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <SuspendedRoute>
              <ContactContentPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <SuspendedRoute>
              <AccountsPageRoute auth={auth} />
            </SuspendedRoute>
          }
        />
        {moduleConfigs
          .filter((item) => !['overview', 'home', 'directions', 'questionBank', 'learners', 'media', 'about', 'contact', 'accounts'].includes(item.key))
          .map((item) => (
            <Route
              key={item.key}
              path={`/${item.key}`}
              element={
                <SuspendedRoute>
                  <PageWorkbenchRoute auth={auth} view={item} />
                </SuspendedRoute>
              }
            />
          ))}
        <Route
          path="*"
          element={
            <SuspendedRoute>
              <PageWorkbenchRoute auth={auth} view={fallbackView} />
            </SuspendedRoute>
          }
        />
      </Routes>
    </AppShell>
  );
}
