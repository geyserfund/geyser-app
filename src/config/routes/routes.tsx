import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import App from '../../App'
import AppLayout from '../../AppLayout'
// import { ProjectView } from '../../modules/project/pages1/projectView'
import { ExternalAuthSuccess, FailedAuth } from '../../pages/auth'
import { NotAuthorized, NotFoundPage, NotFoundProject } from '../../pages/fallback'
import { __production__, getPath, PathName } from '../../shared/constants'
import { ErrorBoundary } from './components/ErrorBoundary'
import { renderPrivateRoute } from './components/PrivateRoute'

const Grants = () => import('../../pages/grants')
const Grants1 = () => import('modules/grants/pages/Grants')
const ProjectLaunch = () => import('../../modules/project/pages1/projectCreation')
// const Entry = () => import('../../pages/entry')
// const ProjectDashboard = () => import('../../modules/project/pages/projectDashboard')

const Project = () => import('../../modules/project/pages1/projectView')

const ProjectDashboard = () => import('../../modules/project/pages1/projectDashboard')

const ProjectFunding = () => import('../../modules/project/pages1/projectFunding')

const Leaderboard = () => import('../../modules/leaderboard/pages/Leaderboard')

const CreatorReward = () => import('../../modules/project/pages1/projectView/views/rewards/views')

const CreatorPost = () => import('../../modules/project/pages1/projectView/views/posts/views')

const Refund = () => import('../../modules/project/pages1/projectFunding/views/refund')
const ProfilePage = () => import('../../modules/profile/pages/profilePage/Profile')
const ProfileSettingsIndex = () => import('../../modules/profile/pages/profileSettings')
const Badges = () => import('../../pages/badges/BadgesPage')
const Landing = () => import('../../pages/landing')

export const platformRoutes: RouteObject[] = [
  {
    path: '/grants',
    async lazy() {
      const GrantsLandingPage = await Grants().then((m) => m.GrantsLandingPage)
      return { Component: GrantsLandingPage }
    },
  },
  {
    path: '/grants1',
    async lazy() {
      const GrantsPage = await Grants1().then((m) => m.Grants)
      return { Component: GrantsPage }
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
      const ProfileSettings = await ProfileSettingsIndex().then((m) => m.ProfileSettings)
      return { element: renderPrivateRoute(ProfileSettings) }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProfileSettingsMain = await ProfileSettingsIndex().then((m) => m.ProfileSettingsMain)
          return { Component: ProfileSettingsMain }
        },
      },
      {
        path: getPath('userProfileSettingsGeneral', PathName.userId),
        async lazy() {
          const ProfileSettingsGeneral = await ProfileSettingsIndex().then((m) => m.ProfileSettingsGeneral)
          return { Component: ProfileSettingsGeneral }
        },
      },
      {
        path: getPath('userProfileSettingsNotifications', PathName.userId),
        async lazy() {
          const ProfileSettingsNotifications = await ProfileSettingsIndex().then((m) => m.ProfileSettingsNotifications)
          return { Component: ProfileSettingsNotifications }
        },
      },
    ],
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
      const ProjectView = await Project().then((m) => m.ProjectView)
      return { Component: ProjectView }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProjectBody = await Project().then((m) => m.ProjectBody)
          return { Component: ProjectBody }
        },
      },
      {
        path: getPath('projectDraft', PathName.projectName),
        async lazy() {
          const ProjectBody = await Project().then((m) => m.ProjectBody)
          return { Component: ProjectBody }
        },
      },
      {
        path: getPath('projectRewards', PathName.projectName),
        async lazy() {
          const ProjectRewards = await Project().then((m) => m.ProjectRewards)
          return { Component: ProjectRewards }
        },
      },
      {
        path: getPath('projectRewardView', PathName.projectName, PathName.rewardId),
        async lazy() {
          const RewardView = await Project().then((m) => m.RewardView)
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
          const ProjectPosts = await Project().then((m) => m.ProjectPosts)
          return { Component: ProjectPosts }
        },
      },
      {
        path: getPath('projectPostView', PathName.projectName, PathName.postId),
        async lazy() {
          const PostView = await Project().then((m) => m.PostView)
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
          const ProjectGoals = await Project().then((m) => m.ProjectGoals)
          return { Component: ProjectGoals }
        },
      },
      {
        path: getPath('projectLeaderboard', PathName.projectName),
        async lazy() {
          const ProjectLeaderboard = await Project().then((m) => m.ProjectLeaderboard)
          return { Component: ProjectLeaderboard }
        },
      },
      {
        path: getPath('projectDashboard', PathName.projectName),
        async lazy() {
          const ProjectDashboardPage = await ProjectDashboard().then((m) => m.ProjectDashboard)
          return { element: renderPrivateRoute(ProjectDashboardPage) }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProjectDashboardMain = await ProjectDashboard().then((m) => m.ProjectDashboardMain)
              return { Component: ProjectDashboardMain }
            },
          },
          {
            path: getPath('dashboardAccounting', PathName.projectName),
            async lazy() {
              const ProjectDashboardAccounting = await ProjectDashboard().then((m) => m.ProjectDashboardAccounting)
              return { Component: ProjectDashboardAccounting }
            },
          },
          {
            path: getPath('dashboardAnalytics', PathName.projectName),
            async lazy() {
              const ProjectDashboardAnalytics = await ProjectDashboard().then((m) => m.ProjectDashboardAnalytics)
              return { Component: ProjectDashboardAnalytics }
            },
          },
          {
            path: getPath('dashboardSales', PathName.projectName),
            async lazy() {
              const ProjectDashboardSales = await ProjectDashboard().then((m) => m.ProjectDashboardSales)
              return { Component: ProjectDashboardSales }
            },
          },
          {
            path: getPath('dashboardInfo', PathName.projectName),
            async lazy() {
              const ProjectDashboardInfo = await ProjectDashboard().then((m) => m.ProjectDashboardInfo)
              return { Component: ProjectDashboardInfo }
            },
          },
          {
            path: getPath('dashboardDetails', PathName.projectName),
            async lazy() {
              const ProjectDashboardDetails = await ProjectDashboard().then((m) => m.ProjectDashboardDetails)
              return { Component: ProjectDashboardDetails }
            },
          },
          {
            path: getPath('dashboardStory', PathName.projectName),
            async lazy() {
              const ProjectDashboardStory = await ProjectDashboard().then((m) => m.ProjectDashboardStory)
              return { Component: ProjectDashboardStory }
            },
          },
          {
            path: getPath('dashboardWallet', PathName.projectName),
            async lazy() {
              const ProjectDashboardWallet = await ProjectDashboard().then((m) => m.ProjectDashboardWallet)
              return { Component: ProjectDashboardWallet }
            },
          },
          {
            path: getPath('dashboardNostr', PathName.projectName),
            async lazy() {
              const ProjectDashboardNostr = await ProjectDashboard().then((m) => m.ProjectDashboardNostr)
              return { Component: ProjectDashboardNostr }
            },
          },
          {
            path: getPath('dashboardNotifications', PathName.projectName),
            async lazy() {
              const ProjectDashboardNotifications = await ProjectDashboard().then(
                (m) => m.ProjectDashboardNotifications,
              )
              return { Component: ProjectDashboardNotifications }
            },
          },
          {
            path: getPath('dashboardSettings', PathName.projectName),
            async lazy() {
              const ProjectDashboardSettings = await ProjectDashboard().then((m) => m.ProjectDashboardSettings)
              return { Component: ProjectDashboardSettings }
            },
          },
          {
            path: getPath('dashboardAffiliates', PathName.projectName),
            async lazy() {
              const ProjectDashboardAffiliates = await ProjectDashboard().then((m) => m.ProjectDashboardAffiliates)
              return { Component: ProjectDashboardAffiliates }
            },
          },
        ],
      },
      {
        path: getPath('projectFunding', PathName.projectName),
        async lazy() {
          const ProjectFundingPage = await ProjectFunding().then((m) => m.ProjectFunding)
          return { Component: ProjectFundingPage }
        },
        children: [
          {
            index: true,
            async lazy() {
              const FundingInit = await ProjectFunding().then((m) => m.FundingInit)
              return { Component: FundingInit }
            },
          },
          {
            path: getPath('fundingDetails', PathName.projectName),
            async lazy() {
              const FundingDetails = await ProjectFunding().then((m) => m.FundingDetails)
              return { Component: FundingDetails }
            },
          },
          {
            path: getPath('fundingPayment', PathName.projectName),
            async lazy() {
              const FundingPayment = await ProjectFunding().then((m) => m.FundingPayment)
              return { Component: FundingPayment }
            },
            children: [
              {
                index: true,
                async lazy() {
                  const PaymentLoading = await ProjectFunding().then((m) => m.PaymentLoading)
                  return { Component: PaymentLoading }
                },
              },
              {
                path: getPath('fundingPaymentFailed', PathName.projectName),
                async lazy() {
                  const FundingFailed = await ProjectFunding().then((m) => m.PaymentFailed)
                  return { Component: FundingFailed }
                },
              },
              {
                path: getPath('fundingPaymentLightning', PathName.projectName),
                async lazy() {
                  const PaymentLightning = await ProjectFunding().then((m) => m.PaymentLightning)
                  return { Component: PaymentLightning }
                },
              },
              {
                path: getPath('fundingPaymentOnchain', PathName.projectName),
                async lazy() {
                  const PaymentOnchain = await ProjectFunding().then((m) => m.PaymentOnchain)
                  return { Component: PaymentOnchain }
                },
                children: [
                  {
                    index: true,
                    async lazy() {
                      const PaymentOnchainPrompt = await ProjectFunding().then((m) => m.PaymentOnchainPrompt)
                      return { Component: PaymentOnchainPrompt }
                    },
                  },
                  {
                    path: getPath('fundingPaymentOnchainQR', PathName.projectName),
                    async lazy() {
                      const PaymentOnchainQR = await ProjectFunding().then((m) => m.PaymentOnchainQR)
                      return { Component: PaymentOnchainQR }
                    },
                  },
                  {
                    path: getPath('fundingPaymentOnchainProcessing', PathName.projectName),
                    async lazy() {
                      const PaymentOnchainProcessing = await ProjectFunding().then((m) => m.PaymentOnchainProcessing)
                      return { Component: PaymentOnchainProcessing }
                    },
                  },
                  {
                    path: getPath('fundingPaymentOnchainRefund', PathName.projectName),
                    async lazy() {
                      const PaymentOnChainRefund = await ProjectFunding().then((m) => m.PaymentOnChainRefund)
                      return { Component: PaymentOnChainRefund }
                    },
                  },
                  {
                    path: getPath('fundingPaymentOnchainRefundInitiated', PathName.projectName),
                    async lazy() {
                      const PaymentOnChainRefundInitiated = await ProjectFunding().then(
                        (m) => m.PaymentOnChainRefundInitiated,
                      )
                      return { Component: PaymentOnChainRefundInitiated }
                    },
                  },
                ],
              },
            ],
          },
          {
            path: getPath('fundingSuccess', PathName.projectName),
            async lazy() {
              const FundingSuccess = await ProjectFunding().then((m) => m.FundingSuccess)
              return { Component: FundingSuccess }
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
      const LeaderboardPage = await Leaderboard().then((m) => m.Leaderboard)
      return { Component: LeaderboardPage }
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
