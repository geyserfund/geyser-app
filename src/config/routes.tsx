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
  ProjectDashboard,
  ProjectDescription,
  ProjectFundingSettings,
  ProjectSettings,
  ProjectStats,
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
    path: getPath('launchProjectWithNode', PathName.projectId),
    element: ProjectCreationWalletConnectionPage,
    authenticated: true,
  },
  {
    path: getPath('launchProjectWithMilestonesAndRewards', PathName.projectId),
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
    path: getPath('userProfile', PathName.userId),
    element: ProfilePage,
    authenticated: true,
  },
  {
    path: getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
    element: EntryPreview,
    authenticated: true,
  },
  {
    path: getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: getPath('projectEntryCreation', PathName.projectId),
    element: EntryCreateEdit,
    authenticated: true,
  },
  {
    path: getPath('projectDashboard', PathName.projectId),
    element: ProjectDashboard,
    authenticated: true,
    nested: [
      {
        path: getPath('dashboardDescription', PathName.projectId),
        element: ProjectDescription,
        isIndex: true,
      },
      {
        path: getPath('dashboardContributors', PathName.projectId),
        element: ProjectContributors,
      },
      {
        path: getPath('dashboardFunding', PathName.projectId),
        element: ProjectFundingSettings,
      },
      {
        path: getPath('dashboardStats', PathName.projectId),
        element: ProjectStats,
      },
      {
        path: getPath('dashboardSettings', PathName.projectId),
        element: ProjectSettings,
      },
    ],
  },
  {
    path: getPath('project', PathName.projectId),
    element: ProjectView,
  },
  {
    path: getPath('entry', PathName.entryId),
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
