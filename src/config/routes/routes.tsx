import { Path } from '@react-pdf/renderer'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'

import ProjectView from '@/modules/project/pages1/projectView/ProjectView'

import App from '../../App'
import AppLayout from '../../AppLayout'
import { ProjectBody } from '../../modules/project/pages1/projectView'
// import { ProjectView } from '../../modules/project/pages1/projectView'
import { ExternalAuthSuccess, FailedAuth } from '../../pages/auth'
import { NotAuthorized, NotFoundPage, NotFoundProject } from '../../pages/fallback'
import { __production__, getPath, PathName } from '../../shared/constants'
import { ErrorBoundary } from './ErrorBoundary'
import { renderPrivateRoute } from './PrivateRoute'

// const Grants = () => import('../../pages/grants')
const ProjectLaunch = () => import('../../modules/project/pages/projectCreate')
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
    path: getPath('publicProjectLaunch'),
    async lazy() {
      const ProjectCreateStart = await ProjectLaunch().then((m) => m.ProjectCreateStart)
      return { Component: ProjectCreateStart }
    },
  },
  {
    path: `${getPath('publicProjectLaunch')}/:projectId`,
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
    path: `${getPath('privateProjectLaunch')}/:projectId`,
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
    path: getPath('launchProjectRewards', PathName.projectId),
    async lazy() {
      const ProjectCreateRewards = await ProjectLaunch().then((m) => m.ProjectCreateRewards)
      return {
        element: renderPrivateRoute(ProjectCreateRewards),
      }
    },
    // children: [
    //   {
    //     index: true,
    //     async lazy() {
    //       const ProjectCreateRewardMain = await ProjectLaunch().then((m) => m.ProjectCreateRewardMain)
    //       return { element: renderPrivateRoute(ProjectCreateRewardMain) }
    //     },
    //   },
    //   {
    //     path: 'new',
    //     async lazy() {
    //       const ProjectCreationCreateReward = await ProjectLaunch().then((m) => m.ProjectCreationCreateReward)
    //       return { element: renderPrivateRoute(ProjectCreationCreateReward) }
    //     },
    //   },
    //   {
    //     path: 'edit/:rewardId',
    //     async lazy() {
    //       const ProjectCreationEditReward = await ProjectLaunch().then((m) => m.ProjectCreationEditReward)
    //       return { element: renderPrivateRoute(ProjectCreationEditReward) }
    //     },
    //   },
    // ],
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
  // {
  //   path: getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
  //   async lazy() {
  //     const EntryPreview = await Entry().then((m) => m.EntryPreview)
  //     return { element: renderPrivateRoute(EntryPreview) }
  //   },
  // },
  // {
  //   path: getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
  //   async lazy() {
  //     const EntryCreateEdit = await Entry().then((m) => m.EntryCreateEdit)
  //     return { element: renderPrivateRoute(EntryCreateEdit) }
  //   },
  // },
  // {
  //   path: getPath('projectEntryCreation', PathName.projectId),
  //   async lazy() {
  //     const EntryCreateEdit = await Entry().then((m) => m.EntryCreateEdit)
  //     return { element: renderPrivateRoute(EntryCreateEdit) }
  //   },
  // },
  // {
  //   path: getPath('projectDashboard', PathName.projectId),
  //   async lazy() {
  //     const ProjectDashboardPage = await ProjectDashboard().then((m) => m.ProjectDashboardPage)
  //     return { element: renderPrivateRoute(ProjectDashboardPage) }
  //   },
  //   children: [
  //     {
  //       index: true,
  //       async lazy() {
  //         const ProjectDescription = await ProjectDashboard().then((m) => m.ProjectDescription)
  //         return { Component: ProjectDescription }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardDetails', PathName.projectId),
  //       async lazy() {
  //         const ProjectDetails = await ProjectDashboard().then((m) => m.ProjectDetails)
  //         return { Component: ProjectDetails }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardStory', PathName.projectId),
  //       async lazy() {
  //         const ProjectStory = await ProjectDashboard().then((m) => m.ProjectStory)
  //         return { Component: ProjectStory }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardStatus', PathName.projectId),
  //       async lazy() {
  //         const ProjectStatusSection = await ProjectDashboard().then((m) => m.ProjectStatusSection)
  //         return { Component: ProjectStatusSection }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardRewards', PathName.projectId),
  //       async lazy() {
  //         const ProjectRewardSection = await ProjectDashboard().then((m) => m.ProjectRewardSettings)
  //         return { Component: ProjectRewardSection }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardWallet', PathName.projectId),
  //       async lazy() {
  //         const ProjectWallet = await ProjectDashboard().then((m) => m.ProjectWallet)
  //         return { Component: ProjectWallet }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardSettings', PathName.projectId),
  //       async lazy() {
  //         const ProjectSettings = await ProjectDashboard().then((m) => m.ProjectSettings)
  //         return { Component: ProjectSettings }
  //       },
  //     },
  //     {
  //       path: getPath('dashboardNostr', PathName.projectId),
  //       async lazy() {
  //         const ProjectNostrSettings = await ProjectDashboard().then((m) => m.ProjectNostrSettings)
  //         return { Component: ProjectNostrSettings }
  //       },
  //     },
  // {
  //   path: getPath('dashboardAffiliates', PathName.projectId),
  //   async lazy() {
  //     const ProjectAffiliate = await ProjectDashboard().then((m) => m.ProjectAffiliate)
  //     return { Component: ProjectAffiliate }
  //   },
  // },
  //     {
  //       path: getPath('dashboardShop', PathName.projectId),
  //       async lazy() {
  //         const ProjectSettings = await ProjectDashboard().then((m) => m.ProjectSettings)
  //         return { Component: ProjectSettings }
  //       },
  //     },
  //   ],
  // },
  {
    path: getPath('project', PathName.projectName),
    element: <ProjectView />,
    // async lazy() {
    //   const ProjectView = await Project1().then((m) => m.ProjectView)
    //   return { Component: ProjectView }
    // },
    children: [
      {
        index: true,
        element: <ProjectBody />,
        // async lazy() {
        //   const ProjectBody = await Project1().then((m) => m.ProjectBody)
        //   return { Component: ProjectBody }
        // },
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
      // TODO:  Need to change routes to posts
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
      // TODO: Change this to have children and have a different route for each section.
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

      // {
      //   path: getPath('project', PathName.projectName),
      //   async lazy() {
      //     const ProjectCreatorViews = await Project().then((m) => m.ProjectCreatorViews)
      //     return { Component: ProjectCreatorViews }
      //   },
      //   children: [
      //     {
      //       path: getPath('projectInsights', PathName.projectName),
      //       async lazy() {
      //         const ProjectCreatorInsights = await Project().then((m) => m.ProjectCreatorInsights)
      //         return {
      //           element: renderPrivateRoute(ProjectCreatorInsights),
      //         }
      //       },
      //     },
      //     {
      //       path: getPath('projectContributors', PathName.projectName),
      //       async lazy() {
      //         const ProjectCreatorContributors = await Project().then((m) => m.ProjectCreatorContributors)
      //         return {
      //           element: renderPrivateRoute(ProjectCreatorContributors),
      //         }
      //       },
      //     },
      //     {
      //       path: getPath('projectManageRewards', PathName.projectName),
      //       async lazy() {
      //         const ProjectManageRewards = await Project().then((m) => m.ProjectManageRewards)
      //         return {
      //           element: renderPrivateRoute(ProjectManageRewards),
      //         }
      //       },
      //     },
      //     {
      //       path: getPath('projectCreateReward', PathName.projectName),
      //       async lazy() {
      //         const ProjectCreateReward = await Project().then((m) => m.ProjectCreateReward)
      //         return {
      //           element: renderPrivateRoute(ProjectCreateReward),
      //         }
      //       },
      //     },
      //     {
      //       path: getPath('projectEditReward', PathName.projectName, PathName.rewardId),
      //       async lazy() {
      //         const ProjectEditReward = await Project().then((m) => m.ProjectEditReward)
      //         return {
      //           element: renderPrivateRoute(ProjectEditReward),
      //         }
      //       },
      //     },
      //   ],
      // },
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
