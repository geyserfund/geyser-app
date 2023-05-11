import loadable from '@loadable/component'
import { withSentryReactRouterV6Routing } from '@sentry/react'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { __production__, getPath, PathName } from '../constants'
import { FailedAuth, TwitterSuccess } from '../pages/auth'
import { PrivateRoute } from './PrivateRoute'

const GrantsLandingPage = loadable(
  () => import('../pages/grants/grantsLanding/GrantsLandingPage'),
)
const GrantsRoundOne = loadable(
  () => import('../pages/grants/grantsPage/GrantsRoundOne'),
)
const GrantsRoundTwo = loadable(
  () => import('../pages/grants/grantsPage/GrantsRoundTwo'),
)
const GrantPage = loadable(() => import('../pages/grants/grantsPage/GrantPage'))

const PublicProjectLaunchPage = loadable(
  () => import('../pages/publicProjectLaunch'),
)
const ProjectCreationWalletConnectionPage = loadable(
  () =>
    import(
      '../pages/creation/projectCreate/ProjectCreationWalletConnectionPage'
    ),
)
const ProjectAdditionalDetails = loadable(
  () => import('../pages/creation/projectCreate/ProjectAdditionalDetails'),
)
const ProjectCreate = loadable(
  () => import('../pages/creation/projectCreate/ProjectCreate'),
)

const Profile = loadable(() => import('../pages/profile/Profile'))

const EntryCreateEdit = loadable(
  () => import('../pages/creation/entry/editor/EntryCreateEdit'),
)
const EntryPreview = loadable(
  () => import('../pages/creation/entry/EntryPreview'),
)
const EntryPage = loadable(() => import('../pages/entry/EntryPage'))

const ProjectDashboard = loadable(() =>
  import('../pages/projectDashboard').then((m) => m.default.ProjectDashboard),
)
const ProjectDescription = loadable(() =>
  import('../pages/projectDashboard').then((m) => m.default.ProjectDescription),
)
const ProjectContributors = loadable(() =>
  import('../pages/projectDashboard').then(
    (m) => m.default.ProjectContributors,
  ),
)
const ProjectDetails = loadable(() =>
  import('../pages/projectDashboard').then((m) => m.default.ProjectDetails),
)
const ProjectFundingSettings = loadable(() =>
  import('../pages/projectDashboard').then(
    (m) => m.default.ProjectFundingSettings,
  ),
)
const ProjectStats = loadable(() =>
  import('../pages/projectDashboard').then((m) => m.default.ProjectStats),
)
const ProjectSettings = loadable(() =>
  import('../pages/projectDashboard').then((m) => m.default.ProjectSettings),
)

const ProjectView = loadable(() => import('../pages/projectView'))
const NotFoundPage = loadable(() => import('../pages/notFound'))
const NotAuthorized = loadable(() => import('../pages/notAuthorized'))
const MobileLeaderboard = loadable(
  () => import('../pages/landing/projectLeaderboard/MobileLeaderboard'),
)
const BadgesPage = loadable(() => import('../pages/badges/BadgesPage'))
const LandingPage = loadable(() => import('../pages/landing/LandingPage'))
const LandingPageProjects = loadable(() => import('../pages/landing/projects'))
const LandingFeed = loadable(() => import('../pages/landing/feed'))

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
    path: '/grants/:grantId',
    element: GrantPage,
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
    path: getPath('launchProjectDetails', PathName.projectId),
    element: ProjectAdditionalDetails,
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
    element: Profile,
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
        path: getPath('dashboardDetails', PathName.projectId),
        element: ProjectDetails,
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
    path: getPath('leaderboard'),
    element: MobileLeaderboard,
  },
  {
    path: getPath('badges'),
    element: BadgesPage,
  },
  {
    path: getPath('landingPage'),
    element: LandingPage,
    nested: [
      {
        path: getPath('landingPage'),
        element: LandingPageProjects,
        isIndex: true,
      },
      {
        path: getPath('landingFeed'),
        element: LandingFeed,
      },
    ],
  },
] as PlatformRoutes[]

const SentryRoutes = __production__
  ? withSentryReactRouterV6Routing(Routes)
  : Routes

export const Router = () => {
  const renderRoutes = (routes: PlatformRoutes[]) => {
    return [
      ...routes.map(
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
            return (
              <Route
                index
                key={path}
                element={
                  <React.Suspense fallback={null}>
                    {renderElement}
                  </React.Suspense>
                }
              />
            )
          }

          return (
            <Route
              key={path}
              path={path}
              element={
                <React.Suspense fallback={null}>{renderElement}</React.Suspense>
              }
            >
              {nested?.length && renderRoutes(nested)}
            </Route>
          )
        },
      ),
      // The default route if a random route is used
      <Route key="*" path="*" element={<Navigate to="/" replace />} />,
    ]
  }

  return <SentryRoutes>{renderRoutes(platformRoutes)}</SentryRoutes>
}
