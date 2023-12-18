import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { App } from '../../App'
import Loader from '../../components/ui/Loader'
import { __production__, getPath, PathName } from '../../constants'
import { doesAssetNeedRefresh } from '../../helpers'
import { FailedAuth, TwitterSuccess } from '../../pages/auth'
// import BadgesPage from '../pages/badges/BadgesPage'
import { NotAuthorized, NotFoundPage } from '../../pages/fallback'
import { renderPrivateRoute } from './PrivateRoute'

const handleError = (error: any) => {
  if (doesAssetNeedRefresh(error)) {
    window.location.reload()
    return Loader
  }

  return NotFoundPage
}

const Grants = () => import('../../pages/grants')
const ProjectLaunch = () => import('../../pages/projectCreate')
const Entry = () => import('../../pages/entry')
const ProjectDashboard = () => import('../../pages/projectDashboard')
const Project = () => import('../../pages/projectView')
const ProfilePage = () => import('../../pages/profile/Profile')
const Badges = () => import('../../pages/badges/BadgesPage')
const Landing = () => import('../../pages/landing')
const AboutPage = () => import('../../pages/about/About')

export const platformRoutes: RouteObject[] = [
  {
    path: '/grants',
    async lazy() {
      const GrantsLandingPage = await Grants()
        .then((m) => m.GrantsLandingPage)
        .catch(handleError)
      return { Component: GrantsLandingPage }
    },
  },
  {
    path: '/grants/:grantId',
    async lazy() {
      const GrantPage = await Grants()
        .then((m) => m.GrantPage)
        .catch(handleError)
      return { Component: GrantPage }
    },
  },
  {
    path: getPath('publicProjectLaunch'),
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch()
        .then((m) => m.ProjectCreateStart)
        .catch(handleError)
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: `${getPath('publicProjectLaunch')}/:projectId`,
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch()
        .then((m) => m.ProjectCreateStart)
        .catch(handleError)
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: getPath('launchProjectWithNode', PathName.projectId),
    // authenticated: true,
    async lazy() {
      const ProjectCreationWalletConnectionPage = await ProjectLaunch()
        .then((m) => m.ProjectCreationWalletConnectionPage)
        .catch(handleError)
      return {
        element: renderPrivateRoute(ProjectCreationWalletConnectionPage),
      }
    },
  },
  {
    path: getPath('launchProjectDetails', PathName.projectId),
    async lazy() {
      const ProjectAdditionalDetails = await ProjectLaunch()
        .then((m) => m.ProjectAdditionalDetails)
        .catch(handleError)
      return { Component: ProjectAdditionalDetails }
    },
  },
  {
    path: `${getPath('privateProjectLaunch')}/:projectId`,
    async lazy() {
      const ProjectCreate = await ProjectLaunch()
        .then((m) => m.ProjectCreate)
        .catch(handleError)
      return { element: renderPrivateRoute(ProjectCreate) }
    },
    // authenticated: true,
  },
  {
    path: getPath('launchProjectStory', PathName.projectId),
    async lazy() {
      const ProjectCreateStory = await ProjectLaunch()
        .then((m) => m.ProjectCreateStory)
        .catch(handleError)
      return { element: renderPrivateRoute(ProjectCreateStory) }
    },
    // authenticated: true,
  },
  {
    path: getPath('privateProjectLaunch'),
    async lazy() {
      const ProjectCreate = await ProjectLaunch()
        .then((m) => m.ProjectCreate)
        .catch(handleError)
      return { element: renderPrivateRoute(ProjectCreate) }
    },
    // authenticated: true,
  },
  {
    path: getPath('userProfile', PathName.userId),
    async lazy() {
      const Profile = await ProfilePage()
        .then((m) => m.Profile)
        .catch(handleError)
      return { Component: Profile }
    },
  },
  {
    path: getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
    async lazy() {
      const EntryPreview = await Entry()
        .then((m) => m.EntryPreview)
        .catch(handleError)
      return { element: renderPrivateRoute(EntryPreview) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
    async lazy() {
      const EntryCreateEdit = await Entry()
        .then((m) => m.EntryCreateEdit)
        .catch(handleError)
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectEntryCreation', PathName.projectId),
    async lazy() {
      const EntryCreateEdit = await Entry()
        .then((m) => m.EntryCreateEdit)
        .catch(handleError)
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
    // authenticated: true,
  },
  {
    path: getPath('projectDashboard', PathName.projectId),
    async lazy() {
      const ProjectDashboardPage = await ProjectDashboard()
        .then((m) => m.ProjectDashboardPage)
        .catch(handleError)
      return { element: renderPrivateRoute(ProjectDashboardPage) }
    },
    // authenticated: true,
    children: [
      {
        index: true,
        async lazy() {
          const ProjectDescription = await ProjectDashboard()
            .then((m) => m.ProjectDescription)
            .catch(handleError)
          return { Component: ProjectDescription }
        },
      },
      {
        path: getPath('dashboardDetails', PathName.projectId),
        async lazy() {
          const ProjectDetails = await ProjectDashboard()
            .then((m) => m.ProjectDetails)
            .catch(handleError)
          return { Component: ProjectDetails }
        },
      },
      {
        path: getPath('dashboardStory', PathName.projectId),
        async lazy() {
          const ProjectStory = await ProjectDashboard()
            .then((m) => m.ProjectStory)
            .catch(handleError)
          return { Component: ProjectStory }
        },
      },
      {
        path: getPath('dashboardWallet', PathName.projectId),
        async lazy() {
          const ProjectWallet = await ProjectDashboard()
            .then((m) => m.ProjectWallet)
            .catch(handleError)
          return { Component: ProjectWallet }
        },
      },
      {
        path: getPath('dashboardSettings', PathName.projectId),
        async lazy() {
          const ProjectSettings = await ProjectDashboard()
            .then((m) => m.ProjectSettings)
            .catch(handleError)
          return { Component: ProjectSettings }
        },
      },
      {
        path: getPath('dashboardShop', PathName.projectId),
        async lazy() {
          const ProjectSettings = await ProjectDashboard()
            .then((m) => m.ProjectSettings)
            .catch(handleError)
          return { Component: ProjectSettings }
        },
      },
    ],
  },
  {
    path: getPath('project', PathName.projectId),
    async lazy() {
      const ProjectView = await Project()
        .then((m) => m.ProjectView)
        .catch(handleError)
      return { Component: ProjectView }
    },
    children: [
      {
        path: getPath('project', PathName.projectId),
        async lazy() {
          const ProjectBodyLayout = await Project()
            .then((m) => m.ProjectBodyLayout)
            .catch(handleError)
          return { Component: ProjectBodyLayout }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProjectMainBody = await Project()
                .then((m) => m.ProjectMainBody)
                .catch(handleError)
              return { Component: ProjectMainBody }
            },
          },
          {
            path: getPath('projectRewards', PathName.projectId),
            async lazy() {
              const MainBodyRewards = await Project()
                .then((m) => m.MainBodyRewards)
                .catch(handleError)
              return { Component: MainBodyRewards }
            },
          },
          {
            path: getPath('projectProducts', PathName.projectId),
            async lazy() {
              const MainBodyProducts = await Project()
                .then((m) => m.MainBodyProducts)
                .catch(handleError)
              return { Component: MainBodyProducts }
            },
          },
          {
            path: getPath('projectEntries', PathName.projectId),
            async lazy() {
              const MainBodyEntries = await Project()
                .then((m) => m.MainBodyEntries)
                .catch(handleError)
              return { Component: MainBodyEntries }
            },
          },

          {
            path: getPath('projectMilestones', PathName.projectId),
            async lazy() {
              const MainBodyMilestones = await Project()
                .then((m) => m.MainBodyMilestones)
                .catch(handleError)
              return { Component: MainBodyMilestones }
            },
          },
        ],
      },
      {
        path: getPath('project', PathName.projectId),
        async lazy() {
          const ProjectCreatorViews = await Project()
            .then((m) => m.ProjectCreatorViews)
            .catch(handleError)
          return { Component: ProjectCreatorViews }
        },
        children: [
          {
            path: getPath('projectOverview', PathName.projectId),
            async lazy() {
              const ProjectCreatorOverview = await Project()
                .then((m) => m.ProjectCreatorOverview)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectCreatorOverview),
              }
            },
          },
          {
            path: getPath('projectInsights', PathName.projectId),
            async lazy() {
              const ProjectCreatorInsights = await Project()
                .then((m) => m.ProjectCreatorInsights)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectCreatorInsights),
              }
            },
          },
          {
            path: getPath('projectRewardsAndBundles', PathName.projectId),
            async lazy() {
              const ProjectRewardsAndBundles = await Project()
                .then((m) => m.ProjectRewardsAndBundles)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectRewardsAndBundles),
              }
            },
          },
          {
            path: getPath('projectCreateReward', PathName.projectId),
            async lazy() {
              const ProjectCreateReward = await Project()
                .then((m) => m.ProjectCreateReward)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectCreateReward),
              }
            },
          },
          {
            path: getPath('projectCreateRewardBundle', PathName.projectId),
            async lazy() {
              const ProjectCreateRewardBundle = await Project()
                .then((m) => m.ProjectCreateRewardBundle)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectCreateRewardBundle),
              }
            },
          },
          {
            path: getPath('projectEditReward', PathName.projectId),
            async lazy() {
              const ProjectEditReward = await Project()
                .then((m) => m.ProjectEditReward)
                .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectEditReward),
              }
            },
          },
          {
            path: getPath('projectEditRewardBundle', PathName.projectId),
            async lazy() {
              const ProjectEditRewardBundle = await Project()
                  .then((m) => m.ProjectEditRewardBundle)
                  .catch(handleError)
              return {
                element: renderPrivateRoute(ProjectEditRewardBundle),
              }
            },
          },
          {
            path: getPath('projectContributors', PathName.projectId),
            async lazy() {
              const ProjectCreatorContributors = await Project()
                .then((m) => m.ProjectCreatorContributors)
                .catch(handleError)
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
      const EntryPage = await Entry()
        .then((m) => m.EntryPage)
        .catch(handleError)
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
      const MobileLeaderboard = await Landing()
        .then((m) => m.MobileLeaderboard)
        .catch(handleError)
      return { Component: MobileLeaderboard }
    },
  },
  {
    path: getPath('badges'),
    async lazy() {
      const BadgesPage = await Badges()
        .then((m) => m.BadgesPage)
        .catch(handleError)
      return { Component: BadgesPage }
    },
  },
  {
    path: getPath('landingPage'),
    async lazy() {
      const LandingPage = await Landing()
        .then((m) => m.LandingPage)
        .catch(handleError)
      return { Component: LandingPage }
    },
    children: [
      {
        path: getPath('landingPage'),
        async lazy() {
          const LandingPageProjects = await Landing()
            .then((m) => m.LandingPageProjects)
            .catch(handleError)
          return { Component: LandingPageProjects }
        },
        index: true,
      },
      {
        path: getPath('landingFeed'),
        async lazy() {
          const LandingFeed = await Landing()
            .then((m) => m.LandingFeed)
            .catch(handleError)
          return { Component: LandingFeed }
        },
      },
    ],
  },
  {
    path: getPath('about'),
    async lazy() {
      const About = await AboutPage()
        .then((m) => m.About)
        .catch(handleError)
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
    children: platformRoutes,
  },
])
