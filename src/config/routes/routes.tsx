import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import { SignOut } from '@/modules/auth/pages/SignOut.tsx'
import { ActivityDirection } from '@/modules/discovery/pages/activity/components/ActivityDirection.tsx'

import { App } from '../../App'
import { AppLayout } from '../../AppLayout'
import { ExternalAuthSuccess, FailedAuth } from '../../modules/auth'
import { NotAuthorized, NotFoundPage, NotFoundProject } from '../../modules/general/fallback'
import { __production__, getPath, PathName } from '../../shared/constants'
import { ErrorBoundary } from './components/ErrorBoundary'
import { renderPrivateRoute } from './components/PrivateRoute'

const Grants = () => import('../../modules/grants')

const ProjectLaunch = () => import('../../modules/project/pages1/projectCreation')

const Project = () => import('../../modules/project')

const ProjectDashboard = () => import('../../modules/project/pages1/projectDashboard')

const ProjectFunding = () => import('../../modules/project/pages1/projectFunding')

const CreatorReward = () => import('../../modules/project/pages1/projectView/views/rewards/views')

const CreatorPost = () => import('../../modules/project/pages1/projectView/views/posts/views')

const Discovery = () => import('../../modules/discovery')

const Guardians = () => import('../../modules/guardians')

const HallOfFame = () => import('../../modules/discovery/pages/heroes')

const Widgets = () => import('../../modules/widget')

const Refund = () => import('../../modules/project/pages1/projectFunding/views/refund')

const ProfilePage = () => import('../../modules/profile')

const ProfileSettingsIndex = () => import('../../modules/profile/pages/profileSettings')

const Badges = () => import('../../modules/general/badges/BadgesPage')

export const platformRoutes: RouteObject[] = [
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
          const LaunchProjectDetails = await ProjectLaunch().then((m) => m.LaunchProjectDetails)
          return { Component: LaunchProjectDetails }
        },
      },
      {
        path: getPath('launchProjectFunding', PathName.projectId),
        element: <Navigate to={PathName.launchFundingStrategy} />,
      },
      {
        path: getPath('launchFundingStrategy', PathName.projectId),
        async lazy() {
          const LaunchFundingStrategy = await ProjectLaunch().then((m) => m.LaunchFundingStrategy)
          return { Component: LaunchFundingStrategy }
        },
      },
      {
        path: getPath('launchFundingGoal', PathName.projectId),
        async lazy() {
          const LaunchFundingGoal = await ProjectLaunch().then((m) => m.LaunchFundingGoal)
          return { Component: LaunchFundingGoal }
        },
      },
      // {
      //   path: getPath('launchProjectRewards', PathName.projectId),
      //   async lazy() {
      //     const LaunchProducts = await ProjectLaunch().then((m) => m.LaunchProducts)
      //     return { Component: LaunchProducts }
      //   },
      // },
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
            path: getPath('launchProjectRewardsEdit', PathName.projectId, PathName.rewardUUID),
            async lazy() {
              const ProjectCreationEditReward = await ProjectLaunch().then((m) => m.ProjectCreationEditReward)
              return { Component: ProjectCreationEditReward }
            },
          },
        ],
      },

      {
        path: getPath('launchStory', PathName.projectId),
        async lazy() {
          const LaunchStory = await ProjectLaunch().then((m) => m.LaunchStory)
          return { Component: LaunchStory }
        },
      },

      {
        path: getPath('launchAboutYou', PathName.projectId),
        async lazy() {
          const LaunchAboutYou = await ProjectLaunch().then((m) => m.LaunchAboutYou)
          return { Component: LaunchAboutYou }
        },
      },
      {
        path: getPath('launchPayment', PathName.projectId),
        async lazy() {
          const LaunchPayment = await ProjectLaunch().then((m) => m.LaunchPayment)
          return { Component: LaunchPayment }
        },
        children: [
          // TODO remove and add this logic to LaunchPayment component
          {
            index: true,
            element: <Navigate to={PathName.launchPaymentWallet} />,
          },
          {
            path: getPath('launchPaymentWallet', PathName.projectId),
            async lazy() {
              const LaunchPaymentWallet = await ProjectLaunch().then((m) => m.LaunchPaymentWallet)
              return { Component: LaunchPaymentWallet }
            },
          },
          {
            path: getPath('launchPaymentAccountPassword', PathName.projectId),
            async lazy() {
              const LaunchPaymentAccountPassword = await ProjectLaunch().then((m) => m.LaunchPaymentAccountPassword)
              return { Component: LaunchPaymentAccountPassword }
            },
          },
          {
            path: getPath('launchPaymentTaxId', PathName.projectId),
            async lazy() {
              const LaunchPaymentTaxId = await ProjectLaunch().then((m) => m.LaunchPaymentTaxId)
              return { Component: LaunchPaymentTaxId }
            },
          },
        ],
      },

      {
        path: getPath('launchSummary', PathName.projectId),
        async lazy() {
          const LaunchSummary = await ProjectLaunch().then((m) => m.LaunchSummary)
          return { Component: LaunchSummary }
        },
      },

      {
        path: getPath('launchProjectStrategy', PathName.projectId),
        async lazy() {
          const ProjectCreateStrategy = await ProjectLaunch().then((m) => m.ProjectCreateStrategy)
          return { Component: ProjectCreateStrategy }
        },
      },
      // {
      //   path: getPath('launchProjectWallet', PathName.projectId),
      //   async lazy() {
      //     const ProjectCreationWalletConnectionPage = await ProjectLaunch().then(
      //       (m) => m.ProjectCreationWalletConnectionPage,
      //     )
      //     return { Component: ProjectCreationWalletConnectionPage }
      //   },
      // },
    ],
  },

  /*
    Deprecate for hero routes
  */
  {
    path: getPath('userProfile', PathName.userId),
    async lazy() {
      const ProfileMain = await ProfilePage().then((m) => m.ProfileMain)
      return { Component: ProfileMain }
    },
    children: [
      {
        index: true,
        async lazy() {
          const Profile = await ProfilePage().then((m) => m.Profile)
          return { Component: Profile }
        },
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
              const ProfileSettingsNotifications = await ProfileSettingsIndex().then(
                (m) => m.ProfileSettingsNotifications,
              )
              return { Component: ProfileSettingsNotifications }
            },
          },
          {
            path: getPath('userProfileSettingsSubscriptions', PathName.userId),
            async lazy() {
              const ProfileSettingsSubscriptions = await ProfileSettingsIndex().then(
                (m) => m.ProfileSettingsSubscriptions,
              )
              return { Component: ProfileSettingsSubscriptions }
            },
          },
          {
            path: getPath('userProfileSettingsVerifications', PathName.userId),
            async lazy() {
              const ProfileSettingsVerifications = await ProfileSettingsIndex().then(
                (m) => m.ProfileSettingsVerifications,
              )
              return { Component: ProfileSettingsVerifications }
            },
          },
          {
            path: getPath('userProfileSettingsWallet', PathName.userId),
            async lazy() {
              const ProfileWalletSettings = await ProfileSettingsIndex().then((m) => m.ProfileWalletSettings)
              return { Component: ProfileWalletSettings }
            },
          },
        ],
      },
    ],
  },

  {
    path: getPath('heroProfile', PathName.heroId),
    async lazy() {
      const ProfileMain = await ProfilePage().then((m) => m.ProfileMain)
      return { Component: ProfileMain }
    },
    children: [
      {
        index: true,
        async lazy() {
          const Profile = await ProfilePage().then((m) => m.Profile)
          return { Component: Profile }
        },
      },
      {
        path: getPath('heroProfileSettings', PathName.heroId),
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
            path: getPath('heroProfileSettingsGeneral', PathName.heroId),
            async lazy() {
              const ProfileSettingsGeneral = await ProfileSettingsIndex().then((m) => m.ProfileSettingsGeneral)
              return { Component: ProfileSettingsGeneral }
            },
          },
          {
            path: getPath('heroProfileSettingsNotifications', PathName.heroId),
            async lazy() {
              const ProfileSettingsNotifications = await ProfileSettingsIndex().then(
                (m) => m.ProfileSettingsNotifications,
              )
              return { Component: ProfileSettingsNotifications }
            },
          },
          {
            path: getPath('heroProfileSettingsSubscriptions', PathName.heroId),
            async lazy() {
              const ProfileSettingsSubscriptions = await ProfileSettingsIndex().then(
                (m) => m.ProfileSettingsSubscriptions,
              )
              return { Component: ProfileSettingsSubscriptions }
            },
          },
        ],
      },
    ],
  },

  {
    path: getPath('project', PathName.projectName),
    async lazy() {
      const ProjectPage = await Project().then((m) => m.Project)
      return { Component: ProjectPage }
    },
    children: [
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
            path: getPath('projectPreLaunch', PathName.projectName),
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
            path: getPath('projectRewardView', PathName.projectName, PathName.rewardUUID),
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
            path: getPath('projectRewardEdit', PathName.projectName, PathName.rewardUUID),
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
            path: getPath('projectGoalView', PathName.projectName, PathName.goalId),
            async lazy() {
              const GoalView = await Project().then((m) => m.GoalView)
              return { Component: GoalView }
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
            path: getPath('projectStoryEdit', PathName.projectName),
            async lazy() {
              const ProjectDashboardStory = await ProjectDashboard().then((m) => m.ProjectDashboardStory)
              return { element: renderPrivateRoute(ProjectDashboardStory) }
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
                path: getPath('dashboardPromote', PathName.projectName),
                async lazy() {
                  const ProjectDashboardPromote = await ProjectDashboard().then((m) => m.ProjectDashboardPromote)
                  return { Component: ProjectDashboardPromote }
                },
              },
            ],
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
            path: getPath('fundingLaunchPayment', PathName.projectName),
            async lazy() {
              const FundingLaunchPayment = await ProjectFunding().then((m) => m.FundingLaunchPayment)
              return { Component: FundingLaunchPayment }
            },
          },
          {
            path: getPath('fundingStart', PathName.projectName),
            async lazy() {
              const Funding = await ProjectFunding().then((m) => m.Funding)
              return { Component: Funding }
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
                path: getPath('fundingSubscription', PathName.projectName),
                async lazy() {
                  const Subscription = await ProjectFunding().then((m) => m.Subscription)
                  return { Component: Subscription }
                },
              },

              {
                path: getPath('fundingPayment', PathName.projectName),
                async lazy() {
                  const Payment = await ProjectFunding().then((m) => m.Payment)
                  return { Component: Payment }
                },
                children: [
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
                    path: getPath('fundingPaymentCard', PathName.projectName),
                    async lazy() {
                      const PaymentCard = await ProjectFunding().then((m) => m.PaymentCard)
                      return { Component: PaymentCard }
                    },
                  },
                  {
                    path: getPath('fundingPaymentFiatSwap', PathName.projectName),
                    async lazy() {
                      const PaymentFiatSwap = await ProjectFunding().then((m) => m.PaymentFiatSwap)
                      return { Component: PaymentFiatSwap }
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
                          const PaymentOnchainProcessing = await ProjectFunding().then(
                            (m) => m.PaymentOnchainProcessing,
                          )
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
            ],
          },
          {
            path: getPath('fundingCallback', PathName.projectName),
            Component: ExternalAuthSuccess,
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

  /** Not-Found Pages */

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
    path: getPath('badges'),
    async lazy() {
      const BadgesPage = await Badges().then((m) => m.BadgesPage)
      return { Component: BadgesPage }
    },
  },

  {
    path: getPath('discoveryLanding'),
    async lazy() {
      const Platform = await Discovery().then((m) => m.Discovery)
      return { Component: Platform }
    },
    children: [
      {
        index: true,
        async lazy() {
          const Landing = await Discovery().then((m) => m.Landing)
          return { Component: Landing }
        },
      },
      {
        path: getPath('discoveryMyProjects'),
        async lazy() {
          const MyProjects = await Discovery().then((m) => m.MyProjects)
          return {
            element: renderPrivateRoute(MyProjects),
          }
        },
      },
      {
        path: getPath('discoveryProducts'),
        async lazy() {
          const Products = await Discovery().then((m) => m.Products)
          return { Component: Products }
        },
      },
      {
        path: getPath('discoveryActivity'),
        async lazy() {
          const Activity = await Discovery().then((m) => m.Activity)
          return { Component: Activity }
        },
        children: [
          {
            index: true,
            element: <ActivityDirection />,
          },
          {
            path: getPath('discoveryActivityFollowed'),
            async lazy() {
              const ProjectsIFollow = await Discovery().then((m) => m.ProjectsIFollow)
              return { element: renderPrivateRoute(ProjectsIFollow) }
            },
          },
          {
            path: getPath('discoveryActivityGlobal'),
            async lazy() {
              const GlobalFeed = await Discovery().then((m) => m.GlobalFeed)
              return { Component: GlobalFeed }
            },
          },
        ],
      },

      {
        path: getPath('discoveryLaunchpad'),
        async lazy() {
          const LaunchpadPage = await Discovery().then((m) => m.Launchpad)
          return { Component: LaunchpadPage }
        },
      },
      {
        path: getPath('hallOfFameProjects'),
        async lazy() {
          const ProjectLeaderboard = await HallOfFame().then((m) => m.ProjectLeaderboard)
          return { Component: ProjectLeaderboard }
        },
      },
      {
        path: getPath('discoveryHeroes'),
        children: [
          {
            index: true,
            async lazy() {
              const HallOfFamePage = await HallOfFame().then((m) => m.HeroesMainPage)
              return { Component: HallOfFamePage }
            },
          },
          {
            path: getPath('heroesAmbassador'),
            async lazy() {
              const Heroes = await HallOfFame().then((m) => m.HeroesIndividualPage)
              return { Component: Heroes }
            },
          },
          {
            path: getPath('heroesCreator'),
            async lazy() {
              const Heroes = await HallOfFame().then((m) => m.HeroesIndividualPage)
              return { Component: Heroes }
            },
          },
          {
            path: getPath('heroesContributor'),
            async lazy() {
              const Heroes = await HallOfFame().then((m) => m.HeroesIndividualPage)
              return { Component: Heroes }
            },
          },
        ],
      },

      /*
        Deprecate for hero routes, currently redirecting to new hero routes
      */
      {
        path: getPath('discoveryHallOfFame'),
        element: <Navigate to={getPath('discoveryHeroes')} />,
      },
      {
        path: getPath('hallOfFameHeroesAmbassador'),
        element: <Navigate to={getPath('heroesAmbassador')} />,
      },
      {
        path: getPath('hallOfFameHeroesCreator'),
        element: <Navigate to={getPath('heroesCreator')} />,
      },
      {
        path: getPath('hallOfFameHeroesContributor'),
        element: <Navigate to={getPath('heroesContributor')} />,
      },
      /*
        End of deprecate for hero routes
      */

      {
        path: getPath('discoveryLeaderboard'),
        async lazy() {
          const Leaderboard = await Discovery().then((m) => m.Leaderboard)
          return { Component: Leaderboard }
        },
      },
      {
        path: getPath('discoveryGrants'),
        async lazy() {
          const GrantsPage = await Grants().then((m) => m.Grants)
          return { Component: GrantsPage }
        },
      },
      {
        path: getPath('discoveryGrant', PathName.grantId),
        async lazy() {
          const GrantPage = await Grants().then((m) => m.GrantPage)
          return { Component: GrantPage }
        },
      },
    ],
  },

  {
    path: getPath('guardians'),
    async lazy() {
      const GuardiansPage = await Guardians().then((m) => m.Guardians)
      return { Component: GuardiansPage }
    },
    children: [
      {
        index: true,
        async lazy() {
          const GuardiansMainPage = await Guardians().then((m) => m.GuardiansMainPage)
          return { Component: GuardiansMainPage }
        },
      },
      {
        path: getPath('guardiansCharacter', PathName.characterId),
        async lazy() {
          return { element: <Navigate to={getPath('guardians')} /> }
        },
      },
    ],
  },

  {
    path: getPath('manifesto'),
    async lazy() {
      const Manifesto = await Guardians().then((m) => m.Manifesto)
      return { Component: Manifesto }
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
    path: getPath('fundingFailedCallback'),
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
      {
        path: getPath('logout'),
        Component: SignOut,
      },
      /** Widgets */
      {
        path: getPath('contributionWidget', PathName.projectName),
        async lazy() {
          const ContributionSummaryWidget = await Widgets().then((m) => m.ContributionSummaryWidget)
          return { Component: ContributionSummaryWidget }
        },
      },
    ],
  },
])

export default router
