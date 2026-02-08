import { Getter } from 'jotai'

import { getPath, PathName } from '@/shared/constants'

import { currentRouteAtom } from './state/routesAtom'

/** Get the functions you can pass into a derived atom definition */
export const routeMatchForAtom =
  (
    /** arrray of route patterns you'd like to match with the current route */
    routes: string[],
  ) =>
  (get: Getter) => {
    const matchRoute = get(currentRouteAtom)
    if (!matchRoute) return false
    return routes.some((route) => route === matchRoute.path)
  }

export const projectCreationRoutesThatNeedStory = [
  getPath('launchPayment', PathName.projectId),
  getPath('launchPaymentWallet', PathName.projectId),
  getPath('launchPaymentTaxId', PathName.projectId),
  getPath('launchPaymentAccountPassword', PathName.projectId),
  getPath('launchPaymentSeedWords', PathName.projectId),
  getPath('launchAboutYou', PathName.projectId),
  getPath('launchFinalize', PathName.projectId),
]

export const privateCreatorProjectCreationRoutes = [
  getPath('launch'),
  getPath('launchProject', PathName.projectId),
  getPath('launchProjectDetails', PathName.projectId),
  getPath('launchProjectRewards', PathName.projectId),
  getPath('launchProjectRewardsCreate', PathName.projectId),
  getPath('launchProjectRewardsEdit', PathName.projectId, PathName.rewardUUID),
  getPath('launchProjectFunding', PathName.projectId),
  getPath('launchFundingStrategy', PathName.projectId),
  getPath('launchFundingGoal', PathName.projectId),
  getPath('launchStory', PathName.projectId),
  ...projectCreationRoutesThatNeedStory,
]

export const allCreatorProjectCreationRoutes = [getPath('launchStart'), ...privateCreatorProjectCreationRoutes]

export const ProjectPageDashboardInternalRoutes = [
  getPath('dashboardAnalytics', PathName.projectName),
  getPath('dashboardSales', PathName.projectName),
  getPath('dashboardAccounting', PathName.projectName),
  getPath('dashboardInfo', PathName.projectName),
  getPath('dashboardDetails', PathName.projectName),
  getPath('dashboardWallet', PathName.projectName),
  getPath('dashboardNostr', PathName.projectName),
  getPath('dashboardSettings', PathName.projectName),
  getPath('dashboardNotifications', PathName.projectName),
  getPath('dashboardPromote', PathName.projectName),
  getPath('dashboardRewards', PathName.projectName),
  getPath('dashboardFundingGoal', PathName.projectName),
]

export const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectName),
  ...ProjectPageDashboardInternalRoutes,
]

export const projectBaseRoutes = [
  getPath('project', PathName.projectName),
  getPath('projectDraft', PathName.projectName),
  getPath('projectPreLaunch', PathName.projectName),
  getPath('projectPosts', PathName.projectName),
  getPath('projectGoals', PathName.projectName),
  getPath('projectRewards', PathName.projectName),
  getPath('projectLeaderboard', PathName.projectName),
]

export const projectRoutes = [
  ...projectBaseRoutes,
  getPath('projectPostView', PathName.projectName, PathName.postId),
  getPath('projectRewardView', PathName.projectName, PathName.rewardUUID),
]

export const projectRewardCreatorRoutes = [
  getPath('projectRewardCreate', PathName.projectName),
  getPath('projectRewardEdit', PathName.projectName, PathName.rewardUUID),
]

export const projectPostCreatorRoutes = [
  getPath('projectPostCreate', PathName.projectName),
  getPath('projectPostEdit', PathName.projectName, PathName.postId),
]

export const projectStoryCreatorRoutes = [getPath('projectStoryEdit', PathName.projectName)]

export const projectFundingPaymentLightingRoutes = [getPath('fundingPaymentLightning', PathName.projectName)]
export const projectFundingPaymentCreditCardRoutes = [getPath('fundingPaymentCreditCard', PathName.projectName)]
export const projectFundingPaymentApplePayRoutes = [getPath('fundingPaymentApplePay', PathName.projectName)]

/** Routes after onchain payment went into refund processing */
export const projectFundingOnchainRefundRoutes = [
  getPath('fundingPaymentOnchainRefund', PathName.projectName),
  getPath('fundingPaymentOnchainRefundInitiated', PathName.projectName),
]

/** Routes after onchain payment went into processing */
export const projectFundingPaymentOnchainStartedRoutes = [
  getPath('fundingPaymentOnchainProcessing', PathName.projectName),
  ...projectFundingOnchainRefundRoutes,
]

/** Routes before onchain payment went into processing */
export const projectFundingPaymentOnchainInitialRoutes = [
  getPath('fundingPaymentOnchain', PathName.projectName),
  getPath('fundingPaymentOnchainQR', PathName.projectName),
]

/** All onchain funding payment routes */
export const projectFundingPaymentOnchainRoutes = [
  ...projectFundingPaymentOnchainInitialRoutes,
  ...projectFundingPaymentOnchainStartedRoutes,
]

export const projectFundingPaymentFiatSwapRoutes = [getPath('fundingPaymentFiatSwap', PathName.projectName)]

export const projectFundingPaymentCreatedRoutes = [
  getPath('fundingPayment', PathName.projectName),
  ...projectFundingPaymentLightingRoutes,
  ...projectFundingPaymentFiatSwapRoutes,
  ...projectFundingPaymentCreditCardRoutes,
  ...projectFundingPaymentApplePayRoutes,
  ...projectFundingPaymentOnchainInitialRoutes,
]

export const projectFundingRoutes = [
  getPath('projectFunding', PathName.projectName),
  getPath('fundingDetails', PathName.projectName),
  getPath('fundingGuardians', PathName.projectName),
  getPath('fundingStart', PathName.projectName),
  getPath('fundingPayment', PathName.projectName),
  getPath('fundingPaymentFailed', PathName.projectName),
  getPath('fundingSuccess', PathName.projectName),
  getPath('fundingAwaitingSuccess', PathName.projectName),
  ...projectFundingPaymentCreatedRoutes,
  ...projectFundingPaymentOnchainRoutes,
  ...projectFundingPaymentFiatSwapRoutes,
  ...projectFundingPaymentCreditCardRoutes,
  ...projectFundingPaymentApplePayRoutes,
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
  ...projectStoryCreatorRoutes,
]

export const grantRoutes = [getPath('grants'), getPath('grants', PathName.grantId)]

export const landingRoutes = [getPath('index'), getPath('landingPage'), getPath('landingFeed')]

export const discoveryRoutes = [
  getPath('discoveryLanding'),
  getPath('discoveryProjectCategory', PathName.categoryName),
  getPath('discoveryProjectSubCategory', PathName.subCategoryName),
  getPath('discoveryMyProjects'),
  getPath('discoveryProducts'),
  getPath('discoveryCampaigns'),
  getPath('discoveryAllOrNothing'),
  getPath('discoveryCampaignsAlmostFunded'),
  getPath('discoveryCampaignsAlmostOver'),
  getPath('discoveryCampaignsLatest'),
  getPath('discoveryCampaignsInYourRegion'),
  getPath('discoveryFundraisers'),
  getPath('discoveryFundraisersLatest'),
  getPath('discoveryFundraisersInYourRegion'),
  getPath('discoveryFundraisersCategory', PathName.categoryName),
  getPath('discoveryFundraisersSubCategory', PathName.subCategoryName),
  getPath('discoveryActivity'),
  getPath('discoveryActivityFollowed'),
  getPath('discoveryActivityGlobal'),
  getPath('discoveryLeaderboard'),
  getPath('discoveryLaunchpad'),
  getPath('discoveryGrants'),
  getPath('discoveryGrant', PathName.grantId),
  // getPath('discoveryGrantApply', PathName.grantId),
  getPath('hallOfFameProjects'),
  getPath('discoveryHeroes'),
  getPath('heroesCreator'),
  getPath('heroesAmbassador'),
  getPath('heroesContributor'),
]

export const profileSettingsRoutes = [
  getPath('userProfileSettings', PathName.userId),
  getPath('userProfileSettingsGeneral', PathName.userId),
  getPath('userProfileSettingsNotifications', PathName.userId),
]

export const heroProfileSettingsRoutes = [
  getPath('heroProfileSettings', PathName.heroId),
  getPath('heroProfileSettingsGeneral', PathName.heroId),
  getPath('heroProfileSettingsNotifications', PathName.heroId),
]

export const profileRoutes = [getPath('userProfile', PathName.userId), ...profileSettingsRoutes]
export const heroProfileRoutes = [getPath('heroProfile', PathName.heroId), ...heroProfileSettingsRoutes]

export const guardiansRoutes = [
  getPath('guardians'),
  getPath('guardiansCharacter', PathName.characterId),
  getPath('manifesto'),
]

export const guardianCharacterRoutes = [getPath('guardiansCharacter', PathName.characterId)]

export const manifestoRoutes = [getPath('manifesto')]

export const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]
