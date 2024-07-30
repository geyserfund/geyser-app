import { getPath, PathName } from '@/shared/constants'

export const creatorProjectCreationRoutes = [
  getPath('launch'),
  getPath('launchProject', PathName.projectId),
  getPath('launchStartProject', PathName.projectId),
  getPath('launchProjectDetails', PathName.projectId),
  getPath('launchProjectStory', PathName.projectId),
  getPath('launchProjectRewards', PathName.projectId),
  getPath('launchProjectRewardsCreate', PathName.projectId),
  getPath('launchProjectRewardsEdit', PathName.projectId, PathName.rewardId),
  getPath('launchProjectWallet', PathName.projectId),
]

export const entryCreationRoutes = [
  getPath('projectEntryCreation', PathName.projectName),
  getPath('projectEntryDetails', PathName.projectName, PathName.entryId),
  getPath('projectEntryPreview', PathName.projectName, PathName.entryId),
]

export const ProjectPageDashboardInternalRoutes = [
  getPath('dashboardAnalytics', PathName.projectName),
  getPath('dashboardSales', PathName.projectName),
  getPath('dashboardAccounting', PathName.projectName),
  getPath('dashboardInfo', PathName.projectName),
  getPath('dashboardDetails', PathName.projectName),
  getPath('dashboardStory', PathName.projectName),
  getPath('dashboardWallet', PathName.projectName),
  getPath('dashboardNostr', PathName.projectName),
  getPath('dashboardSettings', PathName.projectName),
  getPath('dashboardAffiliates', PathName.projectName),
]

export const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectName),
  ...ProjectPageDashboardInternalRoutes,
]

export const projectBaseRoutes = [
  getPath('project', PathName.projectName),
  getPath('projectDraft', PathName.projectName),
  getPath('projectPosts', PathName.projectName),
  getPath('projectGoals', PathName.projectName),
  getPath('projectRewards', PathName.projectName),
  getPath('projectLeaderboard', PathName.projectName),
]

export const projectRoutes = [
  ...projectBaseRoutes,
  getPath('projectPostView', PathName.projectName, PathName.postId),
  getPath('projectRewardView', PathName.projectName, PathName.rewardId),
]

export const projectRewardCreatorRoutes = [
  getPath('projectRewardCreate', PathName.projectName),
  getPath('projectRewardEdit', PathName.projectName, PathName.rewardId),
]

export const projectPostCreatorRoutes = [
  getPath('projectPostCreate', PathName.projectName),
  getPath('projectPostEdit', PathName.projectName, PathName.postId),
]

export const ProjectPageRoutesWithNavBarForDesktop = [...projectBaseRoutes, ...projectDashboardRoutes]

export const ProjectPageRoutesWithNavBarForMobile = [
  ...projectBaseRoutes,
  getPath('projectDashboard', PathName.projectName),
]

export const projectCreatorRoutes = [
  ...projectDashboardRoutes,
  ...projectRewardCreatorRoutes,
  ...projectPostCreatorRoutes,
]

export const grantRoutes = [getPath('grants'), getPath('grants', PathName.grantId)]

export const landingRoutes = [getPath('index'), getPath('landingPage'), getPath('landingFeed')]

export const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]
