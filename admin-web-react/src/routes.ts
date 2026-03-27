import { lazy } from 'react';
import type { ModuleKey } from './config';

const loadLoginPage = () => import('./pages/LoginPage').then((module) => ({ default: module.LoginPage }));
const loadAuthenticatedApp = () =>
  import('./authenticated/AuthenticatedApp').then((module) => ({ default: module.AuthenticatedApp }));
const loadDirectionsPage = () =>
  import('./pages/DirectionsPage').then((module) => ({ default: module.DirectionsPage }));
const loadHomeContentPage = () =>
  import('./pages/HomeContentPage').then((module) => ({ default: module.HomeContentPage }));
const loadMediaContentPage = () =>
  import('./pages/MediaContentPage').then((module) => ({ default: module.MediaContentPage }));
const loadLearnersPage = () =>
  import('./pages/LearnersPage').then((module) => ({ default: module.LearnersPage }));
const loadAboutContentPage = () =>
  import('./pages/AboutContentPage').then((module) => ({ default: module.AboutContentPage }));
const loadContactContentPage = () =>
  import('./pages/ContactContentPage').then((module) => ({ default: module.ContactContentPage }));
const loadAccountsPage = () =>
  import('./pages/AccountsPage').then((module) => ({ default: module.AccountsPage }));
const loadOverviewPage = () =>
  import('./pages/OverviewPage').then((module) => ({ default: module.OverviewPage }));
const loadPageWorkbench = () =>
  import('./pages/PageWorkbench').then((module) => ({ default: module.PageWorkbench }));

export const LoginPageRoute = lazy(loadLoginPage);
export const AuthenticatedAppRoute = lazy(loadAuthenticatedApp);
export const DirectionsPageRoute = lazy(loadDirectionsPage);
export const HomeContentPageRoute = lazy(loadHomeContentPage);
export const MediaContentPageRoute = lazy(loadMediaContentPage);
export const LearnersPageRoute = lazy(loadLearnersPage);
export const AboutContentPageRoute = lazy(loadAboutContentPage);
export const ContactContentPageRoute = lazy(loadContactContentPage);
export const AccountsPageRoute = lazy(loadAccountsPage);
export const OverviewPageRoute = lazy(loadOverviewPage);
export const PageWorkbenchRoute = lazy(loadPageWorkbench);

export function preloadLoginPage() {
  return loadLoginPage();
}

export function preloadAuthenticatedApp() {
  return loadAuthenticatedApp();
}

export function preloadModuleRoute(moduleKey: ModuleKey) {
  switch (moduleKey) {
    case 'directions':
      return loadDirectionsPage();
    case 'home':
      return loadHomeContentPage();
    case 'learners':
      return loadLearnersPage();
    case 'about':
      return loadAboutContentPage();
    case 'contact':
      return loadContactContentPage();
    case 'accounts':
      return loadAccountsPage();
    case 'media':
      return loadMediaContentPage();
    case 'overview':
      return loadOverviewPage();
    default:
      return loadPageWorkbench();
  }
}
