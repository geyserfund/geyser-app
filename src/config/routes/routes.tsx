import { createBrowserRouter, Navigate, RouteObject } from 'react-router'

import { SignOut } from '@/modules/auth/pages/SignOut.tsx'
import { loadDiscoveryModule } from '@/modules/discovery/loader.ts'
import { ActivityDirection } from '@/modules/discovery/pages/activity/components/ActivityDirection'
import { loadHeroesPages } from '@/modules/discovery/pages/heroes/loader.ts'
import { loadLandingPages } from '@/modules/discovery/pages/landing/loader.ts'
import { loadLandingMainViewPages } from '@/modules/discovery/pages/landing/views/mainView/loader.ts'
import { MaintainancePage } from '@/modules/general/fallback/MaintainancePage.tsx'
import { loadGrantsModule } from '@/modules/grants/loader.ts'
import { loadGuardiansModule } from '@/modules/guardians/loader.ts'
import { loadProfileModule } from '@/modules/profile/loader.ts'
import { loadProfileSettingsModule } from '@/modules/profile/pages/profileSettings/loader.ts'
import { loadProjectModule } from '@/modules/project/loader.ts'
import { loadProjectCreationPages } from '@/modules/project/pages/projectCreation/loader.ts'
import { loadProjectDashboardPages } from '@/modules/project/pages/projectDashboard/loader.ts'
import { loadProjectFundingPages } from '@/modules/project/pages/projectFunding/loader.ts'
import { loadRefundPages } from '@/modules/project/pages/projectFunding/views/refund/loader.ts'
import { loadProjectViewPages } from '@/modules/project/pages/projectView/loader.ts'
import { loadWidgetModule } from '@/modules/widget/loader.ts'

import { App } from '../../App'
import { AppLayout } from '../../AppLayout'
import { ExternalAuthSuccess, FailedAuth } from '../../modules/auth'
import { NotAuthorized, NotFoundPage, NotFoundProject } from '../../modules/general/fallback'
import { __production__, getPath, PathName } from '../../shared/constants'
import { ErrorBoundary } from './components/ErrorBoundary'
import { renderPrivateRoute } from './components/PrivateRoute'

/** Toggle this to enable/disable maintenance mode - set to true to show maintenance page for all routes */
const MAINTENANCE_MODE = false

const Badges = () => import('../../modules/general/badges/BadgesPage')

export const platformRoutes: RouteObject[] = [
  {
    path: getPath('launchStart'),
    async lazy() {
      const LaunchStart = await loadProjectCreationPages().then((m) => m.LaunchStart)
      return { Component: LaunchStart }
    },
  },

  // TODO: Replace with ProjectCreateRules component after creating it
  {
    path: getPath('launchRules'),
    async lazy() {
      const ProjectCreateRules = await loadProjectCreationPages().then((m) => m.ProjectCreateStart)
      return { Component: ProjectCreateRules }
    },
  },

  {
    path: getPath('launch'),
    element: <Navigate to={getPath('launchStart')} />,
  },

  {
    path: getPath('launchProject', PathName.projectId),
    async lazy() {
      const ProjectCreationContainer = await loadProjectCreationPages().then((m) => m.ProjectCreationContainer)
      return {
        element: renderPrivateRoute(ProjectCreationContainer),
      }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ProjectCreationContentMain = await loadProjectCreationPages().then((m) => m.ProjectCreationContentMain)
          return { Component: ProjectCreationContentMain }
        },
      },
      {
        path: getPath('launchProject', PathName.projectId),
        async lazy() {
          const ProjectCreationContainerContentDesktop = await loadProjectCreationPages().then(
            (m) => m.ProjectCreationContainerContentDesktop,
          )
          return {
            Component: ProjectCreationContainerContentDesktop,
          }
        },
        children: [
          {
            path: getPath('launchProjectDetails', PathName.projectId),
            async lazy() {
              const LaunchProjectDetails = await loadProjectCreationPages().then((m) => m.LaunchProjectDetails)
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
              const LaunchFundingStrategy = await loadProjectCreationPages().then((m) => m.LaunchFundingStrategy)
              return { Component: LaunchFundingStrategy }
            },
          },
          {
            path: getPath('launchFundingGoal', PathName.projectId),
            async lazy() {
              const LaunchFundingGoal = await loadProjectCreationPages().then((m) => m.LaunchFundingGoal)
              return { Component: LaunchFundingGoal }
            },
          },
          // {
          //   path: getPath('launchProjectRewards', PathName.projectId),
          //   async lazy() {
          //     const LaunchProducts = await loadProjectCreationPages().then((m) => m.LaunchProducts)
          //     return { Component: LaunchProducts }
          //   },
          // },
          {
            path: getPath('launchProjectRewards', PathName.projectId),
            async lazy() {
              const ProjectCreateRewards = await loadProjectCreationPages().then((m) => m.ProjectCreateRewards)
              return { Component: ProjectCreateRewards }
            },
            children: [
              {
                index: true,
                async lazy() {
                  const ProjectCreateRewardMain = await loadProjectCreationPages().then(
                    (m) => m.ProjectCreateRewardMain,
                  )
                  return { Component: ProjectCreateRewardMain }
                },
              },
              {
                path: getPath('launchProjectRewardsCreate', PathName.projectId),
                async lazy() {
                  const ProjectCreationCreateReward = await loadProjectCreationPages().then(
                    (m) => m.ProjectCreationCreateReward,
                  )
                  return { Component: ProjectCreationCreateReward }
                },
              },
              {
                path: getPath('launchProjectRewardsEdit', PathName.projectId, PathName.rewardUUID),
                async lazy() {
                  const ProjectCreationEditReward = await loadProjectCreationPages().then(
                    (m) => m.ProjectCreationEditReward,
                  )
                  return { Component: ProjectCreationEditReward }
                },
              },
            ],
          },

          {
            path: getPath('launchStory', PathName.projectId),
            async lazy() {
              const LaunchStory = await loadProjectCreationPages().then((m) => m.LaunchStory)
              return { Component: LaunchStory }
            },
          },

          {
            path: getPath('launchAboutYou', PathName.projectId),
            async lazy() {
              const LaunchAboutYou = await loadProjectCreationPages().then((m) => m.LaunchAboutYou)
              return { Component: LaunchAboutYou }
            },
          },
          {
            path: getPath('launchPayment', PathName.projectId),
            async lazy() {
              const LaunchPayment = await loadProjectCreationPages().then((m) => m.LaunchPayment)
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
                  const LaunchPaymentWallet = await loadProjectCreationPages().then((m) => m.LaunchPaymentWallet)
                  return { Component: LaunchPaymentWallet }
                },
              },
              {
                path: getPath('launchPaymentAccountPassword', PathName.projectId),
                async lazy() {
                  const LaunchPaymentAccountPassword = await loadProjectCreationPages().then(
                    (m) => m.LaunchPaymentAccountPassword,
                  )
                  return { Component: LaunchPaymentAccountPassword }
                },
              },
              {
                path: getPath('launchPaymentTaxId', PathName.projectId),
                async lazy() {
                  const LaunchPaymentTaxId = await loadProjectCreationPages().then((m) => m.LaunchPaymentTaxId)
                  return { Component: LaunchPaymentTaxId }
                },
              },
            ],
          },

          {
            path: getPath('launchFinalize', PathName.projectId),
            async lazy() {
              const LaunchFinalize = await loadProjectCreationPages().then((m) => m.Launch)
              return { Component: LaunchFinalize }
            },
          },
        ],
      },
    ],
  },

  /*
    Deprecate for hero routes
  */
  {
    path: getPath('userProfile', PathName.userId),
    async lazy() {
      const ProfileMain = await loadProfileModule().then((m) => m.ProfileLayout)
      return { Component: ProfileMain }
    },
    children: [
      {
        index: true,
        async lazy() {
          const Profile = await loadProfileModule().then((m) => m.Profile)
          return { Component: Profile }
        },
      },
      {
        path: getPath('userProfileSettings', PathName.userId),
        async lazy() {
          const ProfileSettings = await loadProfileSettingsModule().then((m) => m.ProfileSettings)
          return { element: renderPrivateRoute(ProfileSettings) }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProfileSettingsMain = await loadProfileSettingsModule().then((m) => m.ProfileSettingsMain)
              return { Component: ProfileSettingsMain }
            },
          },
          {
            path: getPath('userProfileSettingsGeneral', PathName.userId),
            async lazy() {
              const ProfileSettingsGeneral = await loadProfileSettingsModule().then((m) => m.ProfileSettingsGeneral)
              return { Component: ProfileSettingsGeneral }
            },
          },
          {
            path: getPath('userProfileSettingsNotifications', PathName.userId),
            async lazy() {
              const ProfileSettingsNotifications = await loadProfileSettingsModule().then(
                (m) => m.ProfileSettingsNotifications,
              )
              return { Component: ProfileSettingsNotifications }
            },
          },
          {
            path: getPath('userProfileSettingsSubscriptions', PathName.userId),
            async lazy() {
              const ProfileSettingsSubscriptions = await loadProfileSettingsModule().then(
                (m) => m.ProfileSettingsSubscriptions,
              )
              return { Component: ProfileSettingsSubscriptions }
            },
          },
          {
            path: getPath('userProfileSettingsVerifications', PathName.userId),
            async lazy() {
              const ProfileSettingsVerifications = await loadProfileSettingsModule().then(
                (m) => m.ProfileSettingsVerifications,
              )
              return { Component: ProfileSettingsVerifications }
            },
          },
          {
            path: getPath('userProfileSettingsWallet', PathName.userId),
            async lazy() {
              const ProfileWalletSettings = await loadProfileSettingsModule().then((m) => m.ProfileWalletSettings)
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
      const ProfileMain = await loadProfileModule().then((m) => m.ProfileLayout)
      return { Component: ProfileMain }
    },
    children: [
      {
        index: true,
        async lazy() {
          const Profile = await loadProfileModule().then((m) => m.Profile)
          return { Component: Profile }
        },
      },
      {
        path: getPath('heroProfileSettings', PathName.heroId),
        async lazy() {
          const ProfileSettings = await loadProfileSettingsModule().then((m) => m.ProfileSettings)
          return { element: renderPrivateRoute(ProfileSettings) }
        },
        children: [
          {
            index: true,
            async lazy() {
              const ProfileSettingsMain = await loadProfileSettingsModule().then((m) => m.ProfileSettingsMain)
              return { Component: ProfileSettingsMain }
            },
          },
          {
            path: getPath('heroProfileSettingsGeneral', PathName.heroId),
            async lazy() {
              const ProfileSettingsGeneral = await loadProfileSettingsModule().then((m) => m.ProfileSettingsGeneral)
              return { Component: ProfileSettingsGeneral }
            },
          },
          {
            path: getPath('heroProfileSettingsNotifications', PathName.heroId),
            async lazy() {
              const ProfileSettingsNotifications = await loadProfileSettingsModule().then(
                (m) => m.ProfileSettingsNotifications,
              )
              return { Component: ProfileSettingsNotifications }
            },
          },
          {
            path: getPath('heroProfileSettingsSubscriptions', PathName.heroId),
            async lazy() {
              const ProfileSettingsSubscriptions = await loadProfileSettingsModule().then(
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
      const projectModule = await loadProjectModule()
      return { Component: projectModule.Project }
    },
    children: [
      {
        path: getPath('project', PathName.projectName),
        async lazy() {
          const projectModule = await loadProjectModule()
          return { Component: projectModule.ProjectView }
        },
        children: [
          {
            index: true,
            async lazy() {
              const projectModule = await loadProjectModule()
              return { Component: projectModule.ProjectBody }
            },
          },
          {
            path: getPath('projectDraft', PathName.projectName),
            async lazy() {
              const projectModule = await loadProjectModule()
              return { Component: projectModule.ProjectBody }
            },
          },
          {
            path: getPath('projectPreLaunch', PathName.projectName),
            async lazy() {
              const projectModule = await loadProjectModule()
              return { Component: projectModule.ProjectBody }
            },
          },
          {
            path: getPath('projectRewards', PathName.projectName),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.ProjectRewards }
            },
          },
          {
            path: getPath('projectRewardView', PathName.projectName, PathName.rewardUUID),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.RewardView }
            },
          },
          {
            path: getPath('projectPosts', PathName.projectName),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.ProjectPosts }
            },
          },
          {
            path: getPath('projectPostView', PathName.projectName, PathName.postId),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.PostView }
            },
          },
          {
            path: getPath('projectGoals', PathName.projectName),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.ProjectGoals }
            },
          },
          {
            path: getPath('projectGoalView', PathName.projectName, PathName.goalId),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.GoalView }
            },
          },
          {
            path: getPath('projectLeaderboard', PathName.projectName),
            async lazy() {
              const projectViewPages = await loadProjectViewPages()
              return { Component: projectViewPages.ProjectLeaderboard }
            },
          },

          /** PROJECT DASHBOARD ROUTES =========== START =========== */

          {
            path: getPath('projectPostCreate', PathName.projectName),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()

              return {
                element: renderPrivateRoute(projectDashboardPages.PostCreateEdit),
              }
            },
          },
          {
            path: getPath('projectPostEdit', PathName.projectName, PathName.postId),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()
              return {
                element: renderPrivateRoute(projectDashboardPages.PostCreateEdit),
              }
            },
          },
          {
            path: getPath('projectRewardCreate', PathName.projectName),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()
              return {
                element: renderPrivateRoute(projectDashboardPages.RewardCreate),
              }
            },
          },
          {
            path: getPath('projectRewardEdit', PathName.projectName, PathName.rewardUUID),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()
              return {
                element: renderPrivateRoute(projectDashboardPages.RewardEdit),
              }
            },
          },
          {
            path: getPath('projectStoryEdit', PathName.projectName),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()
              return { element: renderPrivateRoute(projectDashboardPages.ProjectDashboardStory) }
            },
          },
          {
            path: getPath('projectDashboard', PathName.projectName),
            async lazy() {
              const projectDashboardPages = await loadProjectDashboardPages()

              return { element: renderPrivateRoute(projectDashboardPages.ProjectDashboardLayout) }
            },
            children: [
              {
                index: true,
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardMobileLayout }
                },
              },
              {
                path: getPath('dashboardAccounting', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardAccounting }
                },
              },
              {
                path: getPath('dashboardAnalytics', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardAnalytics }
                },
              },
              {
                path: getPath('dashboardSales', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardSales }
                },
              },
              {
                path: getPath('dashboardInfo', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardInfo }
                },
              },
              {
                path: getPath('dashboardDetails', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardDetails }
                },
              },
              {
                path: getPath('dashboardWallet', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardWallet }
                },
              },
              {
                path: getPath('dashboardNostr', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardNostr }
                },
              },
              {
                path: getPath('dashboardNotifications', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardNotifications }
                },
              },
              {
                path: getPath('dashboardSettings', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardSettings }
                },
              },
              {
                path: getPath('dashboardPromote', PathName.projectName),
                async lazy() {
                  const projectDashboardPages = await loadProjectDashboardPages()
                  return { Component: projectDashboardPages.ProjectDashboardPromote }
                },
              },
              {
                path: getPath('dashboardRewards', PathName.projectName),
                async lazy() {
                  const ProjectDashboardRewards = await loadProjectDashboardPages().then(
                    (m) => m.ProjectDashboardRewards,
                  )
                  return { Component: ProjectDashboardRewards }
                },
              },
              {
                path: getPath('dashboardFundingGoal', PathName.projectName),
                async lazy() {
                  const ProjectDashboardGoals = await loadProjectDashboardPages().then((m) => m.ProjectDashboardGoals)
                  return { Component: ProjectDashboardGoals }
                },
              },
            ],
          },
          /** PROJECT DASHBOARD ROUTES =========== END =========== */
        ],
      },

      /** PROJECT FUNDING ROUTES =========== START =========== */
      {
        path: getPath('projectFunding', PathName.projectName),
        async lazy() {
          const ProjectFundingPage = await loadProjectFundingPages().then((m) => m.ProjectFunding)
          return { Component: ProjectFundingPage }
        },
        children: [
          {
            index: true,
            async lazy() {
              const FundingInit = await loadProjectFundingPages().then((m) => m.FundingInit)
              return { Component: FundingInit }
            },
          },
          {
            path: getPath('fundingDetails', PathName.projectName),
            async lazy() {
              const FundingDetails = await loadProjectFundingPages().then((m) => m.FundingDetails)
              return { Component: FundingDetails }
            },
          },
          {
            path: getPath('fundingGuardians', PathName.projectName),
            async lazy() {
              const FundingGuardians = await loadProjectFundingPages().then((m) => m.FundingGuardians)
              return { Component: FundingGuardians }
            },
          },
          {
            path: getPath('fundingLaunchPayment', PathName.projectName),
            async lazy() {
              const FundingLaunchPayment = await loadProjectFundingPages().then((m) => m.FundingLaunchPayment)
              return { Component: FundingLaunchPayment }
            },
          },
          {
            path: getPath('fundingStart', PathName.projectName),
            async lazy() {
              const Funding = await loadProjectFundingPages().then((m) => m.Funding)
              return { Component: Funding }
            },
            children: [
              {
                index: true,
                async lazy() {
                  const PaymentLoading = await loadProjectFundingPages().then((m) => m.PaymentLoading)
                  return { Component: PaymentLoading }
                },
              },
              {
                path: getPath('fundingSubscription', PathName.projectName),
                async lazy() {
                  const Subscription = await loadProjectFundingPages().then((m) => m.Subscription)
                  return { Component: Subscription }
                },
              },

              {
                path: getPath('fundingPayment', PathName.projectName),
                async lazy() {
                  const Payment = await loadProjectFundingPages().then((m) => m.Payment)
                  return { Component: Payment }
                },
                children: [
                  {
                    path: getPath('fundingPaymentFailed', PathName.projectName),
                    async lazy() {
                      const FundingFailed = await loadProjectFundingPages().then((m) => m.PaymentFailed)
                      return { Component: FundingFailed }
                    },
                  },
                  {
                    path: getPath('fundingPaymentLightning', PathName.projectName),
                    async lazy() {
                      const PaymentLightning = await loadProjectFundingPages().then((m) => m.PaymentLightning)
                      return { Component: PaymentLightning }
                    },
                  },
                  {
                    path: getPath('fundingPaymentCard', PathName.projectName),
                    async lazy() {
                      const PaymentCard = await loadProjectFundingPages().then((m) => m.PaymentCard)
                      return { Component: PaymentCard }
                    },
                  },
                  {
                    path: getPath('fundingPaymentFiatSwap', PathName.projectName),
                    async lazy() {
                      const PaymentFiatSwap = await loadProjectFundingPages().then((m) => m.PaymentFiatSwap)
                      return { Component: PaymentFiatSwap }
                    },
                  },
                  {
                    path: getPath('fundingPaymentOnchain', PathName.projectName),
                    async lazy() {
                      const PaymentOnchain = await loadProjectFundingPages().then((m) => m.PaymentOnchain)
                      return { Component: PaymentOnchain }
                    },
                    children: [
                      {
                        index: true,
                        async lazy() {
                          const PaymentOnchainPrompt = await loadProjectFundingPages().then(
                            (m) => m.PaymentOnchainPrompt,
                          )
                          return { Component: PaymentOnchainPrompt }
                        },
                      },
                      {
                        path: getPath('fundingPaymentOnchainQR', PathName.projectName),
                        async lazy() {
                          const PaymentOnchainQR = await loadProjectFundingPages().then((m) => m.PaymentOnchainQR)
                          return { Component: PaymentOnchainQR }
                        },
                      },
                      {
                        path: getPath('fundingPaymentOnchainProcessing', PathName.projectName),
                        async lazy() {
                          const PaymentOnchainProcessing = await loadProjectFundingPages().then(
                            (m) => m.PaymentOnchainProcessing,
                          )
                          return { Component: PaymentOnchainProcessing }
                        },
                      },
                      {
                        path: getPath('fundingPaymentOnchainRefund', PathName.projectName),
                        async lazy() {
                          const PaymentOnChainRefund = await loadProjectFundingPages().then(
                            (m) => m.PaymentOnChainRefund,
                          )
                          return { Component: PaymentOnChainRefund }
                        },
                      },
                      {
                        path: getPath('fundingPaymentOnchainRefundInitiated', PathName.projectName),
                        async lazy() {
                          const PaymentOnChainRefundInitiated = await loadProjectFundingPages().then(
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
              const FundingSuccess = await loadProjectFundingPages().then((m) => m.FundingSuccess)
              return { Component: FundingSuccess }
            },
          },
        ],
      },
      /** PROJECT FUNDING ROUTES =========== END =========== */
    ],
  },
  {
    path: getPath('refundInitiated'),
    async lazy() {
      const RefundInitiatedPage = await loadRefundPages().then((m) => m.RefundInitiatedPage)
      return { Component: RefundInitiatedPage }
    },
  },
  {
    path: getPath('refundFile'),
    async lazy() {
      const RefundPage = await loadRefundPages().then((m) => m.RefundFilePage)
      return { Component: RefundPage }
    },
  },
  {
    path: getPath('refund'),
    async lazy() {
      const RefundPage = await loadRefundPages().then((m) => m.RefundPage)
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
      const Discovery = await loadLandingMainViewPages().then((m) => m.Discovery)
      return { Component: Discovery }
    },
    children: [
      {
        path: getPath('discoveryLanding'),
        async lazy() {
          const Landing = await loadLandingMainViewPages().then((m) => m.Landing)
          return { Component: Landing }
        },
        children: [
          {
            index: true,
            async lazy() {
              const DefaultView = await loadLandingMainViewPages().then((m) => m.MainView)
              return { Component: DefaultView }
            },
          },
          {
            path: getPath('discoveryProjectCategory', PathName.categoryName),
            async lazy() {
              const MainView = await loadLandingMainViewPages().then((m) => m.MainView)
              return { Component: MainView }
            },
          },
          {
            path: getPath('discoveryProjectSubCategory', PathName.subCategoryName),
            async lazy() {
              const MainView = await loadLandingMainViewPages().then((m) => m.MainView)
              return { Component: MainView }
            },
          },
          {
            path: getPath('discoveryCampaigns'),
            async lazy() {
              const Campaigns = await loadLandingPages().then((m) => m.Campaigns)
              return { Component: Campaigns }
            },
          },
          {
            path: getPath('discoveryFundraisers'),
            async lazy() {
              const Fundraisers = await loadLandingPages().then((m) => m.Fundraisers)
              return { Component: Fundraisers }
            },
          },
          {
            path: getPath('discoveryProducts'),
            async lazy() {
              const Products = await loadLandingPages().then((m) => m.Products)
              return { Component: Products }
            },
          },
        ],
      },

      {
        path: getPath('discoveryMyProjects'),
        async lazy() {
          const MyProjects = await loadDiscoveryModule().then((m) => m.MyProjects)
          return {
            element: renderPrivateRoute(MyProjects),
          }
        },
      },

      {
        path: getPath('discoveryActivity'),
        async lazy() {
          const Activity = await loadDiscoveryModule().then((m) => m.Activity)
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
              const ProjectsIFollow = await loadDiscoveryModule().then((m) => m.ProjectsIFollow)
              return { element: renderPrivateRoute(ProjectsIFollow) }
            },
          },
          {
            path: getPath('discoveryActivityGlobal'),
            async lazy() {
              const GlobalFeed = await loadDiscoveryModule().then((m) => m.GlobalFeed)
              return { Component: GlobalFeed }
            },
          },
        ],
      },

      {
        path: getPath('discoveryLaunchpad'),
        element: <Navigate to={getPath('discoveryLanding')} />,
      },
      {
        path: getPath('hallOfFameProjects'),
        async lazy() {
          const ProjectLeaderboard = await loadHeroesPages().then((m) => m.ProjectLeaderboard)
          return { Component: ProjectLeaderboard }
        },
      },
      {
        path: getPath('discoveryHeroes'),
        children: [
          {
            index: true,
            async lazy() {
              const HallOfFamePage = await loadHeroesPages().then((m) => m.HeroesMainPage)
              return { Component: HallOfFamePage }
            },
          },
          {
            path: getPath('heroesAmbassador'),
            async lazy() {
              const Heroes = await loadHeroesPages().then((m) => m.HeroesIndividualPage)
              return { Component: Heroes }
            },
          },
          {
            path: getPath('heroesCreator'),
            async lazy() {
              const Heroes = await loadHeroesPages().then((m) => m.HeroesIndividualPage)
              return { Component: Heroes }
            },
          },
          {
            path: getPath('heroesContributor'),
            async lazy() {
              const Heroes = await loadHeroesPages().then((m) => m.HeroesIndividualPage)
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
          const Leaderboard = await loadDiscoveryModule().then((m) => m.Leaderboard)
          return { Component: Leaderboard }
        },
      },
      {
        path: getPath('discoveryGrants'),
        async lazy() {
          const grantsModule = await loadGrantsModule()
          return { Component: grantsModule.GrantsMainPage }
        },
      },
      {
        path: getPath('discoveryGrant', PathName.grantId),
        async lazy() {
          const grantsModule = await loadGrantsModule()
          return { Component: grantsModule.GrantPage }
        },
      },
      {
        path: getPath('discoveryGrant', PathName.grantId),
        async lazy() {
          const GrantPage = await loadGrantsModule().then((m) => m.GrantPage)
          return { Component: GrantPage }
        },
      },
    ],
  },

  {
    path: getPath('discoveryGrantApply', PathName.grantId),
    async lazy() {
      const GrantsApplyPage = await loadGrantsModule().then((m) => m.GrantsApplyPage)
      return { Component: GrantsApplyPage }
    },
  },

  {
    path: '/time2build',
    async lazy() {
      const GrantPage = await loadGrantsModule().then((m) => m.GrantPage)
      return { element: <GrantPage grantId={20} /> }
    },
  },

  {
    path: getPath('guardians'),
    async lazy() {
      const guardiansModule = await loadGuardiansModule()
      return { Component: guardiansModule.GuardiansLayout }
    },
    children: [
      {
        index: true,
        async lazy() {
          const guardiansModule = await loadGuardiansModule()
          return { Component: guardiansModule.GuardiansMainPage }
        },
      },
      {
        path: getPath('guardiansCharacter', PathName.characterId),
        element: <Navigate to={getPath('guardians')} />,
      },
    ],
  },

  {
    path: getPath('manifesto'),
    async lazy() {
      const guardiansModule = await loadGuardiansModule()
      return { Component: guardiansModule.Manifesto }
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
    children: MAINTENANCE_MODE
      ? [
          {
            path: '/',
            Component: MaintainancePage,
          },
          {
            path: '/*',
            Component: MaintainancePage,
          },
        ]
      : [
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
              const ContributionSummaryWidget = await loadWidgetModule().then((m) => m.ContributionSummaryWidget)
              return { Component: ContributionSummaryWidget }
            },
          },
        ],
  },
])

export default router
