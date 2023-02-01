import { Route, Routes } from 'react-router-dom'

import { getPath, PathName } from '../constants'
import { FailedAuth, TwitterSuccess } from '../pages/auth'
import { EntryCreateEdit } from '../pages/creation/entry/editor/EntryCreateEdit'
import { EntryPreview } from '../pages/creation/entry/EntryPreview'
import {
  MilestoneAndRewards,
  ProjectCreate,
  ProjectCreationWalletConnectionPage,
} from '../pages/creation/projectCreate'
import { EntryPage } from '../pages/entry/EntryPage'
import { GrantsLandingPage } from '../pages/grants/GrantsLandingPage'
import { GrantsRoundOne } from '../pages/grants/GrantsRoundOne'
import { GrantsRoundTwo } from '../pages/grants/GrantsRoundTwo'
import { LandingPage } from '../pages/landing'
import { NotAuthorized } from '../pages/notAuthorized'
import { NotFoundPage } from '../pages/notFound'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { ProjectContributors } from '../pages/projectDashboard'
import {
  MilestoneSettings,
  ProjectDashboard,
  ProjectDashboardEntries,
  ProjectDescription,
  ProjectFundingSettings,
  ProjectSettings,
  ProjectStats,
  RewardSettings,
} from '../pages/projectDashboard'
import { ProjectDiscoveryPage } from '../pages/projectDiscovery'
import { ProjectView } from '../pages/projectView'
import { PublicProjectLaunchPage } from '../pages/publicProjectLaunch'
import { PrivateRoute } from './PrivateRoute'

type PlatformRoutes = {
  path: string
  element: () => JSX.Element
  authenticated?: boolean
  isIndex?: boolean
  nested?: PlatformRoutes[]
}

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
    path: `/${PathName.launchProject}/:projectId/${PathName.node}`,
    element: ProjectCreationWalletConnectionPage,
    authenticated: true,
  },
  {
    path: `/${PathName.launchProject}/:projectId/${PathName.milestonesAndRewards}`,
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
    path: `/${PathName.userProfile}/:userId`,
    element: ProfilePage,
    authenticated: true,
  },
  {
    path: `/${PathName.project}/:projectId/${PathName.entry}/:entryId/${PathName.preview}`,
    element: EntryPreview,
    authenticated: true,
  },
  {
    path: `/${PathName.project}/:projectId/${PathName.entry}/:entryId`,
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: `/${PathName.project}/:projectId/${PathName.entry}`,
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: `/${PathName.project}/:projectId/${PathName.projectDashboard}`,
    element: ProjectDashboard,
    authenticated: true,
    nested: [
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardDescription}`,
        element: ProjectDescription,
        isIndex: true,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardContributors}`,
        element: ProjectContributors,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardFunds}`,
        element: ProjectFundingSettings,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardEntries}`,
        element: ProjectDashboardEntries,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardRewards}`,
        element: RewardSettings,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardMilestones}`,
        element: MilestoneSettings,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardStats}`,
        element: ProjectStats,
      },
      {
        path: `/${PathName.project}/:projectId/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
        element: ProjectSettings,
      },
    ],
  },
  {
    path: `/${PathName.project}/:projectId`,
    element: ProjectView,
  },
  {
    path: `/${PathName.entry}/:entryId`,
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
] as PlatformRoutes[]

export const Router = () => {
  const renderRoutes = (routes: PlatformRoutes[]) => {
    return routes.map(
      ({ path, element: Element, authenticated, nested, isIndex }) => {
        const renderElement = authenticated ? (
          <PrivateRoute>
            <Element />
          </PrivateRoute>
        ) : (
          <Element />
        )
        // index routes cannot have children routes
        if (isIndex) {
          return <Route index key={path} element={renderElement} />
        }

        return (
          <Route key={path} path={path} element={renderElement}>
            {nested?.length && renderRoutes(nested)}
          </Route>
        )
      },
    )
  }

  return <Routes>{renderRoutes(platformRoutes)}</Routes>
}
