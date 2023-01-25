import { Route, Routes } from 'react-router-dom';

import { getPath, routerPathNames } from '../constants';
import { FailedAuth, TwitterSuccess } from '../pages/auth';
import { EntryCreateEdit } from '../pages/creation/entry/editor/EntryCreateEdit';
import { EntryPreview } from '../pages/creation/entry/EntryPreview';
import {
  MilestoneAndRewards,
  ProjectCreate,
  ProjectCreationWalletConnectionPage,
} from '../pages/creation/projectCreate';
import { EntryPage } from '../pages/entry/EntryPage';
import { GrantsLandingPage } from '../pages/grants/GrantsLandingPage';
import { GrantsRoundOne } from '../pages/grants/GrantsRoundOne';
import { GrantsRoundTwo } from '../pages/grants/GrantsRoundTwo';
import { LandingPage } from '../pages/landing';
import { NotAuthorized } from '../pages/notAuthorized';
import { NotFoundPage } from '../pages/notFound';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { ProjectDashboard } from '../pages/projectDashboard';
import { ProjectDiscoveryPage } from '../pages/projectDiscovery';
import { ProjectView } from '../pages/projectView';
import { PublicProjectLaunchPage } from '../pages/publicProjectLaunch';
import { PrivateRoute } from './PrivateRoute';

type PlatformRoutes = {
  path: string;
  element: () => JSX.Element;
  authenticated?: boolean;
};

const platformRoutes = [
  {
    path: '/auth/twitter',
    element: TwitterSuccess,
  },
  {
    path: '/failed-authentication',
    element: FailedAuth,
  },
  {
    path: '/grants/roundone',
    element: GrantsRoundOne,
  },
  {
    path: '/grants/roundtwo',
    element: GrantsRoundTwo,
  },
  {
    path: '/grants',
    element: GrantsLandingPage,
  },
  {
    path: getPath('publicProjectLaunch'),
    element: PublicProjectLaunchPage,
  },
  {
    path: `/${routerPathNames.launchProject}/:projectId/${routerPathNames.node}`,
    element: ProjectCreationWalletConnectionPage,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.launchProject}/:projectId/${routerPathNames.milestonesAndRewards}`,
    element: MilestoneAndRewards,
  },
  {
    path: `${getPath('privateProjectLaunch')}/:projectId`,
    element: ProjectCreate,
    authenticated: true,
  },
  {
    path: getPath('privateProjectLaunch'),
    element: ProjectCreate,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.userProfile}/:userId`,
    element: ProfilePage,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
    element: EntryPreview,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId`,
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.project}/:projectId/${routerPathNames.projectDashboard}`,
    element: ProjectDashboard,
    authenticated: true,
  },
  {
    path: `/${routerPathNames.project}/:projectId`,
    element: ProjectView,
  },
  {
    path: `/${routerPathNames.entry}/:entryId`,
    element: EntryPage,
  },
  {
    path: getPath('notFound'),
    element: NotFoundPage,
  },
  {
    path: getPath('notAuthorized'),
    element: NotAuthorized,
  },
  {
    path: getPath('projectDiscovery'),
    element: ProjectDiscoveryPage,
  },
  {
    path: getPath('index'),
    element: LandingPage,
  },
  {
    path: getPath('landingPage'),
    element: LandingPage,
  },
] as PlatformRoutes[];

export const Router = () => (
  <Routes>
    {platformRoutes.map(({ path, element: Element, authenticated }) => {
      if (authenticated) {
        return (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute>
                <Element />
              </PrivateRoute>
            }
          />
        );
      }

      return <Route key={path} path={path} element={<Element />} />;
    })}
  </Routes>
);
