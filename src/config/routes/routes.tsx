import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { App } from '../../App'
import { AppLayout } from '../../AppLayout'
import { __production__, getPath, PathName } from '../../constants'
import { ExternalAuthSuccess, FailedAuth } from '../../pages/auth'
import { NotAuthorized, NotFoundPage } from '../../pages/fallback'
import { PrivacyPolicy, TermsAndConditions } from '../../pages/legal'
import { ErrorBoundary } from './ErrorBoundary'
import { renderPrivateRoute } from './PrivateRoute'

const Grants = () => import('../../pages/grants')
const ProjectLaunch = () => import('../../pages/projectCreate')
const Entry = () => import('../../pages/entry')
const ProjectDashboard = () => import('../../pages/projectDashboard')
const Project = () => import('../../pages/projectView')
const ProfilePage = () => import('../../modules/profile/pages/profilePage/Profile')
const ProfileSettingsPage = () => import('../../modules/profile/pages/profileSettings/ProfileSettings')
const Badges = () => import('../../pages/badges/BadgesPage')
const Landing = () => import('../../pages/landing')
const AboutPage = () => import('../../pages/about/About')

export const platformRoutes: RouteObject[] = [
  {
    path: '/grants',
    async lazy() {
      const GrantsLandingPage = await Grants().then((m) => m.GrantsLandingPage)
      return { Component: GrantsLandingPage }
    },
  },
  {
    path: '/grants/:grantId',
    async lazy() {
      const GrantPage = await Grants().then((m) => m.GrantPage)
      return { Component: GrantPage }
    },
  },
  {
    path: getPath('publicProjectLaunch'),
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch().then((m) => m.ProjectCreateStart)
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: `${getPath('publicProjectLaunch')}/${PathName.projectId}`,
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch().then((m) => m.ProjectCreateStart)
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: getPath('launchProjectWithNode', PathName.projectId),
    async lazy() {
      const ProjectCreationWalletConnectionPage = await ProjectLaunch().then(
        (m) => m.ProjectCreationWalletConnectionPage,
      )
      return {
        element: renderPrivateRoute(ProjectCreationWalletConnectionPage),
      }
    },
  },
  {
    path: getPath('launchProjectDetails', PathName.projectId),
    async lazy() {
      const ProjectAdditionalDetails = await ProjectLaunch().then((m) => m.ProjectAdditionalDetails)
      return { Component: ProjectAdditionalDetails }
    },
  },
  {
    path: `${getPath('privateProjectLaunch')}/${PathName.projectId}`,
    async lazy() {
      const ProjectCreate = await ProjectLaunch().then((m) => m.ProjectCreate)
      return { element: renderPrivateRoute(ProjectCreate) }
    },
  },
  {
    path: getPath('launchProjectStory', PathName.projectId),
    async lazy() {
      const ProjectCreateStory = await ProjectLaunch().then((m) => m.ProjectCreateStory)
      return { element: renderPrivateRoute(ProjectCreateStory) }
    },
  },
  {
    path: getPath('privateProjectLaunch'),
    async lazy() {
      const ProjectCreate = await ProjectLaunch().then((m) => m.ProjectCreate)
      return { element: renderPrivateRoute(ProjectCreate) }
    },
  },
  {
    path: getPath('userProfileSettings', PathName.userId),
    async lazy() {
      const ProfileSettings = await ProfileSettingsPage().then((m) => m.ProfileSettings)
      return { element: renderPrivateRoute(ProfileSettings) }
    },
  },
  {
    path: getPath('userProfile', PathName.userId),
    async lazy() {
      const Profile = await ProfilePage().then((m) => m.Profile)
      return { Component: Profile }
    },
  },

  {
    path: getPath('projectDashboard', PathName.projectName),
    async lazy() {
      const ProjectDashboardPage = await ProjectDashboard().then((m) => m.ProjectDashboardPage)
      return { element: renderPrivateRoute(ProjectDashboardPage) }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProjectDescription = await ProjectDashboard().then((m) => m.ProjectDescription)
          return { Component: ProjectDescription }
        },
      },
      {
        path: getPath('dashboardDetails', PathName.projectName),
        async lazy() {
          const ProjectDetails = await ProjectDashboard().then((m) => m.ProjectDetails)
          return { Component: ProjectDetails }
        },
      },
      {
        path: getPath('dashboardStory', PathName.projectName),
        async lazy() {
          const ProjectStory = await ProjectDashboard().then((m) => m.ProjectStory)
          return { Component: ProjectStory }
        },
      },
      {
        path: getPath('dashboardStatus', PathName.projectName),
        async lazy() {
          const ProjectStatusSection = await ProjectDashboard().then((m) => m.ProjectStatusSection)
          return { Component: ProjectStatusSection }
        },
      },
      {
        path: getPath('dashboardRewards', PathName.projectName),
        async lazy() {
          const ProjectRewardSection = await ProjectDashboard().then((m) => m.ProjectRewardSettings)
          return { Component: ProjectRewardSection }
        },
      },
      {
        path: getPath('dashboardWallet', PathName.projectName),
        async lazy() {
          const ProjectWallet = await ProjectDashboard().then((m) => m.ProjectWallet)
          return { Component: ProjectWallet }
        },
      },
      {
        path: getPath('dashboardSettings', PathName.projectName),
        async lazy() {
          const ProjectSettings = await ProjectDashboard().then((m) => m.ProjectSettings)
          return { Component: ProjectSettings }
        },
      },
      {
        path: getPath('dashboardNostr', PathName.projectName),
        async lazy() {
          const ProjectNostrSettings = await ProjectDashboard().then((m) => m.ProjectNostrSettings)
          return { Component: ProjectNostrSettings }
        },
      },
      {
        path: getPath('dashboardShop', PathName.projectName),
        async lazy() {
          const ProjectSettings = await ProjectDashboard().then((m) => m.ProjectSettings)
          return { Component: ProjectSettings }
        },
      },
    ],
  },
  {
    path: getPath('project', PathName.projectName),
    async lazy() {
      const ProjectView = await Project().then((m) => m.ProjectView)
      return { Component: ProjectView }
    },
    children: [
      {
        path: getPath('project', PathName.projectName),
        async lazy() {
          const ProjectBodyLayout = await Project().then((m) => m.ProjectBodyLayout)
          return { Component: ProjectBodyLayout }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProjectMainBody = await Project().then((m) => m.ProjectMainBody)
              return { Component: ProjectMainBody }
            },
          },
          {
            path: getPath('projectRewards', PathName.projectName),
            async lazy() {
              const MainBodyRewards = await Project().then((m) => m.MainBodyRewards)
              return { Component: MainBodyRewards }
            },
          },
          {
            path: getPath('projectEntries', PathName.projectName),
            async lazy() {
              const MainBodyEntries = await Project().then((m) => m.MainBodyEntries)
              return { Component: MainBodyEntries }
            },
          },

          {
            path: getPath('projectMilestones', PathName.projectName),
            async lazy() {
              const MainBodyMilestones = await Project().then((m) => m.MainBodyMilestones)
              return { Component: MainBodyMilestones }
            },
          },
        ],
      },
      {
        path: getPath('project', PathName.projectName),
        async lazy() {
          const ProjectCreatorViews = await Project().then((m) => m.ProjectCreatorViews)
          return { Component: ProjectCreatorViews }
        },
        children: [
          {
            path: getPath('projectInsights', PathName.projectName),
            async lazy() {
              const ProjectCreatorInsights = await Project().then((m) => m.ProjectCreatorInsights)
              return {
                element: renderPrivateRoute(ProjectCreatorInsights),
              }
            },
          },
          {
            path: getPath('projectContributors', PathName.projectName),
            async lazy() {
              const ProjectCreatorContributors = await Project().then((m) => m.ProjectCreatorContributors)
              return {
                element: renderPrivateRoute(ProjectCreatorContributors),
              }
            },
          },
          {
            path: getPath('projectManageRewards', PathName.projectName),
            async lazy() {
              const ProjectManageRewards = await Project().then((m) => m.ProjectManageRewards)
              return {
                element: renderPrivateRoute(ProjectManageRewards),
              }
            },
          },
          {
            path: getPath('projectCreateReward', PathName.projectName),
            async lazy() {
              const ProjectCreateReward = await Project().then((m) => m.ProjectCreateReward)
              return {
                element: renderPrivateRoute(ProjectCreateReward),
              }
            },
          },
          {
            path: getPath('projectEditReward', PathName.projectName, PathName.rewardId),
            async lazy() {
              const ProjectEditReward = await Project().then((m) => m.ProjectEditReward)
              return {
                element: renderPrivateRoute(ProjectEditReward),
              }
            },
          },
        ],
      },
    ],
  },
  {
    path: getPath('projectEntryPreview', PathName.projectName, PathName.entryId),
    async lazy() {
      const EntryPreview = await Entry().then((m) => m.EntryPreview)
      return { element: renderPrivateRoute(EntryPreview) }
    },
  },
  {
    path: getPath('projectEntryDetails', PathName.projectName, PathName.entryId),
    async lazy() {
      const EntryCreateEdit = await Entry().then((m) => m.EntryCreateEdit)
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
  },
  {
    path: getPath('projectEntryCreation', PathName.projectName),
    async lazy() {
      const EntryCreateEdit = await Entry().then((m) => m.EntryCreateEdit)
      return { element: renderPrivateRoute(EntryCreateEdit) }
    },
  },

  {
    path: getPath('entry', PathName.projectName, PathName.entryId),
    async lazy() {
      const EntryPage = await Entry().then((m) => m.EntryPage)
      return { Component: EntryPage }
    },
    children: [
      {
        index: true,
        path: getPath('entry', PathName.projectName, PathName.entryId),
        async lazy() {
          const EntryContainer = await Entry().then((m) => m.EntryContainer)
          return { Component: EntryContainer }
        },
      },
      {
        path: getPath('entryRewards', PathName.projectName, PathName.entryId),
        async lazy() {
          const EntryRewards = await Entry().then((m) => m.EntryRewards)
          return { Component: EntryRewards }
        },
      },
    ],
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
      const MobileLeaderboard = await Landing().then((m) => m.MobileLeaderboard)
      return { Component: MobileLeaderboard }
    },
  },
  {
    path: getPath('badges'),
    async lazy() {
      const BadgesPage = await Badges().then((m) => m.BadgesPage)
      return { Component: BadgesPage }
    },
  },
  {
    path: getPath('landingPage'),
    async lazy() {
      const LandingPage = await Landing().then((m) => m.LandingPage)
      return { Component: LandingPage }
    },
    children: [
      {
        path: getPath('landingPage'),
        async lazy() {
          const LandingPageProjects = await Landing().then((m) => m.LandingPageProjects)
          return { Component: LandingPageProjects }
        },
        index: true,
      },
      {
        path: getPath('landingFeed'),
        async lazy() {
          const LandingFeed = await Landing().then((m) => m.LandingFeed)
          return { Component: LandingFeed }
        },
      },
    ],
  },
  {
    path: getPath('about'),
    async lazy() {
      const About = await AboutPage().then((m) => m.About)
      return { Component: About }
    },
  },
  {
    path: '/auth/twitter',
    Component: ExternalAuthSuccess,
  },
  {
    path: '/auth/github',
    Component: ExternalAuthSuccess,
  },
  {
    path: '/auth/facebook',
    Component: ExternalAuthSuccess,
  },
  {
    path: '/auth/google',
    Component: ExternalAuthSuccess,
  },
  {
    path: '/failed-authentication',
    Component: FailedAuth,
  },
  {
    path: getPath('legalTerms'),
    Component: TermsAndConditions,
  },
  {
    path: getPath('legalPrivacy'),
    Component: PrivacyPolicy,
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
    children: [
      {
        path: '/',
        Component: AppLayout,
        children: platformRoutes,
        ErrorBoundary,
        // ,
      },
    ],
  },
])
