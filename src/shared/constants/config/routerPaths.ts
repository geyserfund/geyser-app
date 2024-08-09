export enum PathName {
  projectDiscovery = 'discover',
  landingFeed = 'feed',
  leaderboard = 'leaderboard',
  grants = 'grants',
  grantsRoundOne = 'roundone',
  grantsRoundTwo = 'roundtwo',
  myProjects = 'my-projects',
  activiy = 'activity',

  entry = 'entry',

  notFound = 'not-found',
  notAuthorized = 'not-authorized',
  projectNotFound = 'project-not-found',
  _deprecatedPathNameForProject = 'project',

  project = 'project',
  projectDraft = 'draft',
  projectInsights = 'insights',
  projectContributors = 'contributors',
  projectPosts = 'posts',
  projectEntries = 'entries',
  projectRewards = 'rewards',
  projectGoals = 'goals',
  projectLeaderboard = 'leaderboard',
  projectManageRewards = 'manage-rewards',
  projectCreateReward = 'create-reward',
  projectEditReward = 'edit-reward',

  refund = 'refund',
  refundInitiated = 'initiated',

  launchStart = 'start',
  launchProject = 'launch',
  launchProjectDetails = 'details',
  launchProjectStory = 'story',
  launchProjectRewards = 'rewards',
  launchProjectRewardsNew = 'rewards/new',
  launchProjectRewardsEdit = 'rewards/edit',

  userProfile = 'profile',
  userProfileSettings = 'settings',

  preview = 'preview',

  node = 'node',
  discover = 'discover',

  projectDashboard = 'dashboard',
  dashboardAnalytics = 'analytics',
  dashboardSales = 'sales',
  dashboardAccounting = 'accounting',
  dashboardInfo = 'description',
  dashboardDetails = 'details',
  dashboardWallet = 'wallet',
  dashboardSettings = 'settings',
  dashboardStory = 'story',
  dashboardStatus = 'status',
  dashboardNostr = 'nostr',
  dashboardAffiliates = 'affiliate',

  projectFunding = 'funding',
  fundingDetails = 'details',
  fundingPayment = 'payment',
  fundingPaymentFailed = 'failed',
  fundingPaymentLightning = 'lightning',
  fundingPaymentOnchain = 'onchain',
  fundingPaymentOnchainQR = 'qr',
  fundingPaymentOnchainProcessing = 'processing',
  fundingPaymentOnchainRefund = 'refund',
  fundingPaymentOnchainRefundInitiated = 'initiated',
  fundingSuccess = 'success',

  badges = 'badges',
  about = 'about',
  projectId = ':projectId',
  projectName = ':projectName',
  rewardId = ':rewardId',
  userId = ':userId',
  entryId = ':entryId',
  postId = ':postId',
  grantId = ':grantId',

  legalTerms = 'T&C',
  legalPrivacy = 'Privacy',
}

// @TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

export const AboutGeyserOrigin = 'https://about.geyser.fund'

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  landingFeed: () => `/${PathName.landingFeed}`,
  leaderboard: () => `/${PathName.leaderboard}`,
  projectDiscovery: () => `/${PathName.projectDiscovery}`,

  platformLanding: () => '/',
  platformLeaderboard: () => `/${PathName.leaderboard}`,
  platformMyProjects: () => `/${PathName.myProjects}`,
  platformActivity: () => `/${PathName.activiy}`,
  platformGrants: () => `/${PathName.grants}`,

  grants: (grantId?: string) => (grantId ? `/${PathName.grants}/${grantId}` : `/${PathName.grants}`),
  grantsRoundOne: () => `/${PathName.grants}/${PathName.grantsRoundOne}`,
  grantsRoundTwo: () => `/${PathName.grants}/${PathName.grantsRoundTwo}`,

  notFound: () => `/${PathName.notFound}`,
  notAuthorized: () => `/${PathName.notAuthorized}`,
  projectNotFound: () => `/${PathName.projectNotFound}`,
  _deprecatedPathForProject: (projectName: string) => `/${PathName._deprecatedPathNameForProject}/${projectName}`,

  /** Project base routes */

  project: (projectName: string) => `/${PathName.project}/${projectName}`,
  projectDraft: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDraft}`,
  projectGoals: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectGoals}`,
  projectRewards: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectRewards}`,
  projectPosts: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectPosts}`,
  projectLeaderboard: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectLeaderboard}`,
  projectDashboard: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDashboard}`,

  /** Project Rewards internal routes */

  projectRewardCreate: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectRewards}/create`,
  projectRewardEdit: (projectName: string, rewardId: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectRewards}/edit/${rewardId}`,
  projectRewardView: (projectName: string, rewardId: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectRewards}/view/${rewardId}`,

  /** Project Post internal  routes */

  projectPostCreate: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectPosts}/create`,
  projectPostEdit: (projectName: string, postId: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectPosts}/edit/${postId}`,
  projectPostView: (projectName: string, postId: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectPosts}/view/${postId}`,

  /** Project Dasboard internal routes */

  dashboardAnalytics: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardAnalytics}`,
  dashboardSales: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardSales}`,
  dashboardAccounting: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardAccounting}`,
  dashboardInfo: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardInfo}`,
  dashboardDetails: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardDetails}`,
  dashboardStory: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardStory}`,
  dashboardWallet: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardWallet}`,
  dashboardNostr: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardNostr}`,
  dashboardSettings: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
  dashboardAffiliates: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardAffiliates}`,

  /** Project Funding Routes */

  projectFunding: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectFunding}`,
  fundingDetails: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingDetails}`,
  fundingPayment: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}`,
  fundingPaymentFailed: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentFailed} `,
  fundingPaymentLightning: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentLightning}`,
  fundingPaymentOnchain: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}`,
  fundingPaymentOnchainQR: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainQR}`,
  fundingPaymentOnchainProcessing: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainProcessing}`,
  fundingPaymentOnchainRefund: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainRefund}`,
  fundingPaymentOnchainRefundInitiated: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainRefund}/${PathName.fundingPaymentOnchainRefundInitiated}`,
  fundingSuccess: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingSuccess}`,

  /** Refund Routes */

  refund: () => `/${PathName.refund}`,
  refundInitiated: () => `/${PathName.refund}/${PathName.refundInitiated}`,

  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
  entryRewards: (entryID: string) => `/${PathName.entry}/${entryID}/${PathName.projectRewards}`,
  projectEntryCreation: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.entry}`,
  projectEntryDetails: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}`,
  projectEntryPreview: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}/preview`,

  /** Project creation Routes */

  launchStart: () => `/${PathName.launchProject}/${PathName.launchStart}`,
  launch: () => `/${PathName.launchProject}`,
  launchStartProject: (projectID: string) => `/${PathName.launchProject}/${PathName.launchStart}/${projectID}`,
  launchProject: (projectID: string) => `/${PathName.launchProject}/${projectID}`,
  launchProjectDetails: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectDetails}`,
  launchProjectStory: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchProjectStory}`,
  launchProjectRewards: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}`,
  launchProjectRewardsCreate: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/create`,
  launchProjectRewardsEdit: (projectID: string, rewardID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/edit/${rewardID}`,
  launchProjectWallet: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.node}`,

  projectLaunch: (projectName: string, state: 'draft' | 'launch' = 'launch') =>
    `/${PathName.project}/${projectName}/?${state}`,

  /** User Profile Routes */

  userProfile: (userID: string) => `/${PathName.userProfile}/${userID}`,
  userProfileSettings: (userID: string) => `/${PathName.userProfile}/${userID}/${PathName.userProfileSettings}`,

  badges: () => `/${PathName.badges}`,

  about: () => `${AboutGeyserOrigin}`,
  legalTerms: () => `${AboutGeyserOrigin}/${PathName.legalTerms}`,
  legalPrivacy: () => `${AboutGeyserOrigin}/${PathName.legalPrivacy}`,
}

export type PathsMap = typeof pathsMap

export const getPath = <TRoute extends keyof PathsMap>(route: TRoute, ...params: Parameters<PathsMap[TRoute]>) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route]

  return pathCallback(...params)
}
