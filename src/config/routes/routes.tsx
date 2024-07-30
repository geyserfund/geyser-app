import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import App from '../../App'
import AppLayout from '../../AppLayout'
// import { ProjectView } from '../../modules/project/pages1/projectView'
import { ExternalAuthSuccess, FailedAuth } from '../../pages/auth'
import { NotAuthorized, NotFoundPage, NotFoundProject } from '../../pages/fallback'
import { __production__, getPath, PathName } from '../../shared/constants'
import { ErrorBoundary } from './components/ErrorBoundary'
import { renderPrivateRoute } from './components/PrivateRoute'

// const Grants = () => import('../../pages/grants')
const ProjectLaunch = () => import('../../modules/project/pages1/projectCreation')
// const Entry = () => import('../../pages/entry')
// const ProjectDashboard = () => import('../../modules/project/pages/projectDashboard')

const ProjectDashboard1 = () => import('../../modules/project/pages1/projectDashboard')

const Project1 = () => import('../../modules/project/pages1/projectView')

const CreatorReward = () => import('../../modules/project/pages1/projectView/views/rewards/views')

const CreatorPost = () => import('../../modules/project/pages1/projectView/views/posts/views')

const Refund = () => import('../../modules/project/pages/refund')
const ProfilePage = () => import('../../modules/profile/pages/profilePage/Profile')
const ProfileSettingsPage = () => import('../../modules/profile/pages/profileSettings/ProfileSettings')
const Badges = () => import('../../pages/badges/BadgesPage')
const Landing = () => import('../../pages/landing')

export const platformRoutes: RouteObject[] = [
  // {
  //   path: '/grants',
  //   async lazy() {
  //     const GrantsLandingPage = await Grants().then((m) => m.GrantsLandingPage)
  //     return { Component: GrantsLandingPage }
  //   },
  // },
  // {
  //   path: '/grants/:grantId',
  //   async lazy() {
  //     const GrantPage = await Grants().then((m) => m.GrantPage)
  //     return { Component: GrantPage }
  //   },
  // },

  {
    path: getPath('launchStart'),
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch().then((m) => m.ProjectCreateStart)
      return { Component: ProjectCreateStart }
    },
  },

  {
    path: getPath('launch'),
    async lazy() {
      const ProjectCreationContainer = await ProjectLaunch().then((m) => m.ProjectCreationContainer)
      return {
        element: renderPrivateRoute(ProjectCreationContainer),
      }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProjectCreateInfo = await ProjectLaunch().then((m) => m.ProjectCreateInfo)
          return { Component: ProjectCreateInfo }
        },
      },
      {
        path: getPath('launchStartProject', PathName.projectId),
        async lazy() {
          const ProjectCreateStart = await ProjectLaunch().then((m) => m.ProjectCreateStart)
          return { Component: ProjectCreateStart }
        },
      },
      {
        path: getPath('launchProject', PathName.projectId),
        async lazy() {
          const ProjectCreateInfo = await ProjectLaunch().then((m) => m.ProjectCreateInfo)
          return { Component: ProjectCreateInfo }
        },
      },
      {
        path: getPath('launchProjectDetails', PathName.projectId),
        async lazy() {
          const ProjectDetails = await ProjectLaunch().then((m) => m.ProjectDetails)
          return { Component: ProjectDetails }
        },
      },
      {
        path: getPath('launchProjectStory', PathName.projectId),
        async lazy() {
          const ProjectCreateStory = await ProjectLaunch().then((m) => m.ProjectCreateStory)
          return { Component: ProjectCreateStory }
        },
      },
      {
        path: getPath('launchProjectRewards', PathName.projectId),
        async lazy() {
          const ProjectCreateRewards = await ProjectLaunch().then((m) => m.ProjectCreateRewards)
          return { Component: ProjectCreateRewards }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProjectCreateRewardMain = await ProjectLaunch().then((m) => m.ProjectCreateRewardMain)
              return { Component: ProjectCreateRewardMain }
            },
          },
          {
            path: getPath('launchProjectRewardsCreate', PathName.projectId),
            async lazy() {
              const ProjectCreationCreateReward = await ProjectLaunch().then((m) => m.ProjectCreationCreateReward)
              return { Component: ProjectCreationCreateReward }
            },
          },
          {
            path: getPath('launchProjectRewardsEdit', PathName.projectId, PathName.rewardId),
            async lazy() {
              const ProjectCreationEditReward = await ProjectLaunch().then((m) => m.ProjectCreationEditReward)
              return { Component: ProjectCreationEditReward }
            },
          },
        ],
      },
      {
        path: getPath('launchProjectWallet', PathName.projectId),
        async lazy() {
          const ProjectCreationWalletConnectionPage = await ProjectLaunch().then(
            (m) => m.ProjectCreationWalletConnectionPage,
          )
          return { Component: ProjectCreationWalletConnectionPage }
        },
      },
    ],
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
    path: getPath('project', PathName.projectName),
    async lazy() {
      const ProjectView = await Project1().then((m) => m.ProjectView)
      return { Component: ProjectView }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProjectBody = await Project1().then((m) => m.ProjectBody)
          return { Component: ProjectBody }
        },
      },
      {
        path: getPath('projectDraft', PathName.projectName),
        async lazy() {
          const ProjectBody = await Project1().then((m) => m.ProjectBody)
          return { Component: ProjectBody }
        },
      },
      {
        path: getPath('projectRewards', PathName.projectName),
        async lazy() {
          const ProjectRewards = await Project1().then((m) => m.ProjectRewards)
          return { Component: ProjectRewards }
        },
      },
      {
        path: getPath('projectRewardView', PathName.projectName, PathName.rewardId),
        async lazy() {
          const RewardView = await Project1().then((m) => m.RewardView)
          return { Component: RewardView }
        },
      },
      {
        path: getPath('projectRewardCreate', PathName.projectName),
        async lazy() {
          const CreateReward = await CreatorReward().then((m) => m.RewardCreate)
          return {
            element: renderPrivateRoute(CreateReward),
          }
        },
      },
      {
        path: getPath('projectRewardEdit', PathName.projectName, PathName.rewardId),
        async lazy() {
          const EditReward = await CreatorReward().then((m) => m.RewardEdit)
          return {
            element: renderPrivateRoute(EditReward),
          }
        },
      },
      {
        path: getPath('projectPosts', PathName.projectName),
        async lazy() {
          const ProjectPosts = await Project1().then((m) => m.ProjectPosts)
          return { Component: ProjectPosts }
        },
      },
      {
        path: getPath('projectPostView', PathName.projectName, PathName.postId),
        async lazy() {
          const PostView = await Project1().then((m) => m.PostView)
          return { Component: PostView }
        },
      },
      {
        path: getPath('projectPostCreate', PathName.projectName),
        async lazy() {
          const PostCreateEdit = await CreatorPost().then((m) => m.PostCreateEdit)
          return {
            element: renderPrivateRoute(PostCreateEdit),
          }
        },
      },
      {
        path: getPath('projectPostEdit', PathName.projectName, PathName.postId),
        async lazy() {
          const PostCreateEdit = await CreatorPost().then((m) => m.PostCreateEdit)
          return {
            element: renderPrivateRoute(PostCreateEdit),
          }
        },
      },

      {
        path: getPath('projectGoals', PathName.projectName),
        async lazy() {
          const ProjectGoals = await Project1().then((m) => m.ProjectGoals)
          return { Component: ProjectGoals }
        },
      },
      {
        path: getPath('projectLeaderboard', PathName.projectName),
        async lazy() {
          const ProjectLeaderboard = await Project1().then((m) => m.ProjectLeaderboard)
          return { Component: ProjectLeaderboard }
        },
      },
      {
        path: getPath('projectDashboard', PathName.projectName),
        async lazy() {
          const ProjectDashboard = await ProjectDashboard1().then((m) => m.ProjectDashboard)
          return { element: renderPrivateRoute(ProjectDashboard) }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProjectDashboardMain = await ProjectDashboard1().then((m) => m.ProjectDashboardMain)
              return { Component: ProjectDashboardMain }
            },
          },
          {
            path: getPath('dashboardAccounting', PathName.projectName),
            async lazy() {
              const ProjectDashboardAccounting = await ProjectDashboard1().then((m) => m.ProjectDashboardAccounting)
              return { Component: ProjectDashboardAccounting }
            },
          },
          {
            path: getPath('dashboardAnalytics', PathName.projectName),
            async lazy() {
              const ProjectDashboardAnalytics = await ProjectDashboard1().then((m) => m.ProjectDashboardAnalytics)
              return { Component: ProjectDashboardAnalytics }
            },
          },
          {
            path: getPath('dashboardSales', PathName.projectName),
            async lazy() {
              const ProjectDashboardSales = await ProjectDashboard1().then((m) => m.ProjectDashboardSales)
              return { Component: ProjectDashboardSales }
            },
          },
          {
            path: getPath('dashboardInfo', PathName.projectName),
            async lazy() {
              const ProjectDashboardInfo = await ProjectDashboard1().then((m) => m.ProjectDashboardInfo)
              return { Component: ProjectDashboardInfo }
            },
          },
          {
            path: getPath('dashboardDetails', PathName.projectName),
            async lazy() {
              const ProjectDashboardDetails = await ProjectDashboard1().then((m) => m.ProjectDashboardDetails)
              return { Component: ProjectDashboardDetails }
            },
          },
          {
            path: getPath('dashboardStory', PathName.projectName),
            async lazy() {
              const ProjectDashboardStory = await ProjectDashboard1().then((m) => m.ProjectDashboardStory)
              return { Component: ProjectDashboardStory }
            },
          },
          {
            path: getPath('dashboardWallet', PathName.projectName),
            async lazy() {
              const ProjectDashboardWallet = await ProjectDashboard1().then((m) => m.ProjectDashboardWallet)
              return { Component: ProjectDashboardWallet }
            },
          },
          {
            path: getPath('dashboardNostr', PathName.projectName),
            async lazy() {
              const ProjectDashboardNostr = await ProjectDashboard1().then((m) => m.ProjectDashboardNostr)
              return { Component: ProjectDashboardNostr }
            },
          },
          {
            path: getPath('dashboardSettings', PathName.projectName),
            async lazy() {
              const ProjectDashboardSettings = await ProjectDashboard1().then((m) => m.ProjectDashboardSettings)
              return { Component: ProjectDashboardSettings }
            },
          },
          {
            path: getPath('dashboardAffiliates', PathName.projectName),
            async lazy() {
              const ProjectDashboardAffiliates = await ProjectDashboard1().then((m) => m.ProjectDashboardAffiliates)
              return { Component: ProjectDashboardAffiliates }
            },
          },
        ],
      },
    ],
  },
  {
    path: getPath('refundInitiated'),
    async lazy() {
      const RefundInitiatedPage = await Refund().then((m) => m.RefundInitiatedPage)
      return { Component: RefundInitiatedPage }
    },
  },
  {
    path: getPath('refund'),
    async lazy() {
      const RefundPage = await Refund().then((m) => m.RefundPage)
      return { Component: RefundPage }
    },
  },
  // {
  //   path: getPath('entry', PathName.entryId),
  //   async lazy() {
  //     const EntryPage = await Entry().then((m) => m.EntryPage)
  //     return { Component: EntryPage }
  //   },
  //   children: [
  //     {
  //       index: true,
  //       path: getPath('entry', PathName.entryId),
  //       async lazy() {
  //         const EntryContainer = await Entry().then((m) => m.EntryContainer)
  //         return { Component: EntryContainer }
  //       },
  //     },
  //     {
  //       path: getPath('entryRewards', PathName.entryId),
  //       async lazy() {
  //         const EntryRewards = await Entry().then((m) => m.EntryRewards)
  //         return { Component: EntryRewards }
  //       },
  //     },
  //   ],
  // },

  {
    path: getPath('notFound'),
    Component: NotFoundPage,
  },
  {
    path: getPath('notAuthorized'),
    Component: NotAuthorized,
  },
  {
    path: getPath('projectNotFound'),
    Component: NotFoundProject,
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

export default router
