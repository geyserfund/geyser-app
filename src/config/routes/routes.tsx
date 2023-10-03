import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { App } from '../../App'
import { __production__, getPath, PathName } from '../../constants'
import { FailedAuth, TwitterSuccess } from '../../pages/auth'
// import BadgesPage from '../pages/badges/BadgesPage'
import { NotAuthorized, NotFoundPage } from '../../pages/fallback'
import { renderPrivateRoute } from './PrivateRoute'

export const platformRoutes: RouteObject[] = [
  {
    path: '/grants',
    async lazy() {
      const { GrantsLandingPage } = await import('../../pages/grants')
      return { Component: GrantsLandingPage }
    },
  },
  {
    path: '/grants/:grantId',
    async lazy() {
      const { GrantPage } = await import('../../pages/grants')
      return { Component: GrantPage }
    },
  },
  {
    path: getPath('publicProjectLaunch'),
    async lazy() {
      const { ProjectCreateStart } = await import('../../pages/projectCreate')
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: `${getPath('publicProjectLaunch')}/:projectId`,
    async lazy() {
      const { ProjectCreateStart } = await import('../../pages/projectCreate')
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: getPath('launchProjectWithNode', PathName.projectId),
    // authenticated: true,
    async lazy() {
      const { ProjectCreationWalletConnectionPage } = await import(
        '../../pages/projectCreate'
      )
      return {
        element: renderPrivateRoute(ProjectCreationWalletConnectionPage),
      }
    },
  },
  {
    path: getPath('launchProjectDetails', PathName.projectId),
    async lazy() {
      const { ProjectAdditionalDetails } = await import(
        '../../pages/projectCreate'
      )
      return { Component: ProjectAdditionalDetails }
    },
  },
  {
    path: `${getPath('privateProjectLaunch')}/:projectId`,
    async lazy() {
      const { ProjectCreate } = await import('../../pages/projectCreate')
      return { element: renderPrivateRoute(ProjectCreate) }
    },
    // authenticated: true,
  },
  {
    path: getPath('launchProjectStory', PathName.projectId),
    async lazy() {
      const { ProjectCreateStory } = await import('../../pages/projectCreate')
      return { element: renderPrivateRoute(ProjectCreateStory) }
    },
    // authenticated: true,
  },
  {
    path: getPath('privateProjectLaunch'),
    async lazy() {
      const { ProjectCreate } = await import('../../pages/projectCreate')
      return { element: renderPrivateRoute(ProjectCreate) }
    },
    // authenticated: true,
  },
  {
    path: getPath('userProfile', PathName.userId),
    async lazy() {
      const { Profile } = await import('../../pages/profile/Profile')
      return { Component: Profile }
    },
  },
  {
    path: getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
    async lazy() {
      const { EntryPreview } = await import('../../pages/entry')
      return { element: renderPrivateRoute(EntryPreview) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
    async lazy() {
      const { EntryCreateEdit } = await import('../../pages/entry')
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectEntryCreation', PathName.projectId),
    async lazy() {
      const { EntryCreateEdit } = await import('../../pages/entry')
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectDashboard', PathName.projectId),
    async lazy() {
      const { ProjectDashboardPage } = await import(
        '../../pages/projectDashboard'
      )
      return { element: renderPrivateRoute(ProjectDashboardPage) }
    },
    // authenticated: true,
    children: [
      {
        index: true,
        async lazy() {
          const { ProjectDescription } = await import(
            '../../pages/projectDashboard'
          )
          return { Component: ProjectDescription }
        },
      },
      {
        path: getPath('dashboardDetails', PathName.projectId),
        async lazy() {
          const { ProjectDetails } = await import(
            '../../pages/projectDashboard'
          )
          return { Component: ProjectDetails }
        },
      },
      {
        path: getPath('dashboardStory', PathName.projectId),
        async lazy() {
          const { ProjectStory } = await import('../../pages/projectDashboard')
          return { Component: ProjectStory }
        },
      },
      {
        path: getPath('dashboardWallet', PathName.projectId),
        async lazy() {
          const { ProjectWallet } = await import('../../pages/projectDashboard')
          return { Component: ProjectWallet }
        },
      },
      {
        path: getPath('dashboardSettings', PathName.projectId),
        async lazy() {
          const { ProjectSettings } = await import(
            '../../pages/projectDashboard'
          )
          return { Component: ProjectSettings }
        },
      },
      {
        path: getPath('dashboardShop', PathName.projectId),
        async lazy() {
          const { ProjectSettings } = await import(
            '../../pages/projectDashboard'
          )
          return { Component: ProjectSettings }
        },
      },
    ],
  },
  {
    path: getPath('project', PathName.projectId),
    async lazy() {
      const { ProjectView } = await import('../../pages/projectView')
      return { Component: ProjectView }
    },
    children: [
      {
        path: getPath('project', PathName.projectId),
        async lazy() {
          const { ProjectBodyLayout } = await import('../../pages/projectView')
          return { Component: ProjectBodyLayout }
        },
        children: [
          {
            index: true,
            async lazy() {
              const { ProjectMainBody } = await import(
                '../../pages/projectView'
              )
              return { Component: ProjectMainBody }
            },
          },
          {
            path: getPath('projectRewards', PathName.projectId),
            async lazy() {
              const { MainBodyRewards } = await import(
                '../../pages/projectView'
              )
              return { Component: MainBodyRewards }
            },
          },
          {
            path: getPath('projectEntries', PathName.projectId),
            async lazy() {
              const { MainBodyEntries } = await import(
                '../../pages/projectView'
              )
              return { Component: MainBodyEntries }
            },
          },

          {
            path: getPath('projectMilestones', PathName.projectId),
            async lazy() {
              const { MainBodyMilestones } = await import(
                '../../pages/projectView'
              )
              return { Component: MainBodyMilestones }
            },
          },
        ],
      },
      {
        path: getPath('project', PathName.projectId),
        async lazy() {
          const { ProjectCreatorViews } = await import(
            '../../pages/projectView'
          )
          return { Component: ProjectCreatorViews }
        },
        children: [
          {
            path: getPath('projectOverview', PathName.projectId),
            async lazy() {
              const { ProjectCreatorOverview } = await import(
                '../../pages/projectView'
              )
              return {
                element: renderPrivateRoute(ProjectCreatorOverview),
              }
            },
          },
          {
            path: getPath('projectInsights', PathName.projectId),
            async lazy() {
              const { ProjectCreatorInsights } = await import(
                '../../pages/projectView'
              )
              return {
                element: renderPrivateRoute(ProjectCreatorInsights),
              }
            },
          },
          {
            path: getPath('projectContributors', PathName.projectId),
            async lazy() {
              const { ProjectCreatorContributors } = await import(
                '../../pages/projectView'
              )
              return { element: renderPrivateRoute(ProjectCreatorContributors) }
            },
          },
        ],
      },
    ],
  },
  {
    path: getPath('entry', PathName.entryId),
    async lazy() {
      const { EntryPage } = await import('../../pages/entry')
      return { Component: EntryPage }
    },
  },
  {
    path: getPath('notFound'),
    Component: NotFoundPage,
  },
  {
    path: getPath('notAuthorized'),
    Component: NotAuthorized,
  },
  {
    path: getPath('leaderboard'),
    async lazy() {
      const { MobileLeaderboard } = await import('../../pages/landing')
      return { Component: MobileLeaderboard }
    },
  },
  {
    path: getPath('badges'),
    async lazy() {
      const { BadgesPage } = await import('../../pages/badges/BadgesPage')
      return { Component: BadgesPage }
    },
  },
  {
    path: getPath('landingPage'),
    async lazy() {
      const { LandingPage } = await import('../../pages/landing')
      return { Component: LandingPage }
    },
    children: [
      {
        path: getPath('landingPage'),
        async lazy() {
          const { LandingPageProjects } = await import('../../pages/landing')
          return { Component: LandingPageProjects }
        },
        index: true,
      },
      {
        path: getPath('landingFeed'),
        async lazy() {
          const { LandingFeed } = await import('../../pages/landing')
          return { Component: LandingFeed }
        },
      },
    ],
  },
  {
    path: getPath('about'),
    async lazy() {
      const { About } = await import('../../pages/about/About')
      return { Component: About }
    },
  },
  {
    path: '/auth/twitter',
    Component: TwitterSuccess,
  },
  {
    path: '/failed-authentication',
    Component: FailedAuth,
  },
  {
    path: '*', // The default route if a random route is used
    element: <Navigate to="/" replace />,
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    // loader: rootLoader,
    children: platformRoutes,
  },
])
