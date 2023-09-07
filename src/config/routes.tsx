import loadable from '@loadable/component'
import { withSentryReactRouterV6Routing } from '@sentry/react'
import React, { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { __production__, getPath, PathName } from '../constants'
import { doesAssetNeedFallback } from '../helpers'
import { FailedAuth, TwitterSuccess } from '../pages/auth'
import BadgesPage from '../pages/badges/BadgesPage'
import { NotAuthorized, NotFoundPage } from '../pages/fallback'
import { PrivateRoute } from './PrivateRoute'

export const loadableWithFailSafe = (importer: any) => {
  const retryOrNotFound = async () => {
    try {
      return await importer()
    } catch (error: any) {
      if (doesAssetNeedFallback(error)) {
        return NotFoundPage
      }

      return null
    }
  }

  return loadable(retryOrNotFound)
}

// GRANTS

const Grants = () => import('../pages/grants')

const GrantsLandingPage = loadableWithFailSafe(() =>
  Grants().then((m) => m.GrantsLandingPage),
)

const GrantsRoundOne = loadableWithFailSafe(() =>
  Grants().then((m) => m.GrantsRoundOne),
)
const GrantsRoundTwo = loadableWithFailSafe(() =>
  Grants().then((m) => m.GrantsRoundTwo),
)
const GrantPage = loadableWithFailSafe(() => Grants().then((m) => m.GrantPage))

// PROJECT LAUNCH

const ProjectLaunch = () => import('../pages/projectCreate')

const ProjectCreateStart = loadableWithFailSafe(() =>
  ProjectLaunch().then((m) => m.ProjectCreateStart),
)
const ProjectCreateStory = loadableWithFailSafe(() =>
  ProjectLaunch().then((m) => m.ProjectCreateStory),
)
const ProjectCreationWalletConnectionPage = loadableWithFailSafe(() =>
  ProjectLaunch().then((m) => m.ProjectCreationWalletConnectionPage),
)
const ProjectAdditionalDetails = loadableWithFailSafe(() =>
  ProjectLaunch().then((m) => m.ProjectAdditionalDetails),
)
const ProjectCreate = loadableWithFailSafe(() =>
  ProjectLaunch().then((m) => m.ProjectCreate),
)

// ENTRY VIEW & EDIT

const Entry = () => import('../pages/entry')

const EntryCreateEdit = loadableWithFailSafe(() =>
  Entry().then((m) => m.EntryCreateEdit),
)
const EntryPreview = loadableWithFailSafe(() =>
  Entry().then((m) => m.EntryPreview),
)
const EntryPage = loadableWithFailSafe(() => Entry().then((m) => m.EntryPage))

// PROJECT DASHBOARD

const CreatorDashboard = () => import('../pages/projectDashboard')

const ProjectDashboardPage = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectDashboardPage),
)
const ProjectDescription = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectDescription),
)
const ProjectContributors = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectContributors),
)
const ProjectDetails = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectDetails),
)
const ProjectFundingSettings = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectWallet),
)
const ProjectStory = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectStory),
)
const ProjectStats = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectStats),
)
const ProjectSettings = loadableWithFailSafe(() =>
  CreatorDashboard().then((m) => m.ProjectSettings),
)

const ProjectView = loadableWithFailSafe(() => import('../pages/projectView'))

const Profile = loadableWithFailSafe(() => import('../pages/profile/Profile'))

// LANDING PAGE

const Landing = () => import('../pages/landing')

const MobileLeaderboard = loadableWithFailSafe(() =>
  Landing().then((m) => m.MobileLeaderboard),
)
const LandingPage = loadableWithFailSafe(() =>
  Landing().then((m) => m.LandingPage),
)
const LandingPageProjects = loadableWithFailSafe(() =>
  Landing().then((m) => m.LandingPageProjects),
)
const LandingFeed = loadableWithFailSafe(() =>
  Landing().then((m) => m.LandingFeed),
)

// ABOUT PAGE

const AboutPage = loadableWithFailSafe(() => import('../pages/about/About'))

type PlatformRoutes = {
  path: string
  element: () => JSX.Element
  authenticated?: boolean
  isIndex?: boolean
  nested?: PlatformRoutes[]
}

const SentryRoutes = __production__
  ? withSentryReactRouterV6Routing(Routes)
  : Routes

export const Router = () => {
  const platformRoutes = useMemo(
    () =>
      [
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
          element: ProjectCreateStart,
        },
        {
          path: `${getPath('publicProjectLaunch')}/:projectId`,
          element: ProjectCreateStart,
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
          path: getPath('launchProjectStory', PathName.projectId),
          element: ProjectCreateStory,
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
          path: getPath(
            'projectEntryPreview',
            PathName.projectId,
            PathName.entryId,
          ),
          element: EntryPreview,
          authenticated: true,
        },
        {
          path: getPath(
            'projectEntryDetails',
            PathName.projectId,
            PathName.entryId,
          ),
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
          element: ProjectDashboardPage,
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
              path: getPath('dashboardStory', PathName.projectId),
              element: ProjectStory,
            },
            {
              path: getPath('dashboardWallet', PathName.projectId),
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
            {
              path: getPath('dashboardShop', PathName.projectId),
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
        {
          path: getPath('about'),
          element: AboutPage,
        },
        {
          path: '/auth/twitter',
          element: TwitterSuccess,
        },
        {
          path: '/failed-authentication',
          element: FailedAuth,
        },
      ] as PlatformRoutes[],
    [],
  )

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
