export enum PathName {
  projectDiscovery = 'discover',
  landingFeed = 'feed',
  leaderboard = 'leaderboard',
  hallOfFame = 'halloffame',
  guardians = 'guardians',
  projects = 'projects',
  heroes = 'heroes',
  ambassador = 'ambassador',
  creator = 'creator',
  contributor = 'contributor',
  grants = 'grants',
  grantsRoundOne = 'roundone',
  grantsRoundTwo = 'roundtwo',
  myProjects = 'my-projects',
  activity = 'activity',
  products = 'products',
  activityGlobal = 'global',
  activityFollowed = 'followed',

  manifesto = 'manifesto',

  merch = 'project/geyser/rewards',

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
  projectStoryEdit = 'story',

  refund = 'refund',
  refundInitiated = 'initiated',

  launchStart = 'start',
  launchProject = 'launch',
  launchProjectDetails = 'details',
  launchProjectStory = 'story',
  launchProjectRewards = 'rewards',
  launchProjectRewardsNew = 'rewards/new',
  launchProjectRewardsEdit = 'rewards/edit',

  userProfile = 'user',
  userSettings = 'settings',
  userSettingsGeneral = 'general',
  userSettingsNotifications = 'notifications',
  userSettingsSubscriptions = 'subscriptions',
  userSettingsVerifications = 'verifications',

  heroProfile = 'hero',
  heroSettings = 'settings',
  heroSettingsGeneral = 'general',
  heroSettingsNotifications = 'notifications',
  heroSettingsSubscriptions = 'subscriptions',

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
  dashboardNotifications = 'notifications',
  dashboardSettings = 'settings',
  dashboardStatus = 'status',
  dashboardNostr = 'nostr',
  dashboardPromote = 'promote',

  projectFunding = 'funding',
  fundingDetails = 'details',
  fundingSubscription = 'subscription',
  fundingPayment = 'payment',
  fundingStart = 'start',
  fundingPaymentFailed = 'failed',
  fundingPaymentLightning = 'lightning',
  fundingPaymentOnchain = 'onchain',
  fundingPaymentCard = 'card',
  fundingPaymentFiatSwap = 'fiat-swap',
  fundingPaymentOnchainQR = 'qr',
  fundingPaymentOnchainProcessing = 'processing',
  fundingPaymentOnchainRefund = 'refund',
  fundingPaymentOnchainRefundInitiated = 'initiated',
  fundingCallback = 'callback',
  fundingSuccess = 'success',
  fundingFailedCallback = 'failed-callback',
  badges = 'badges',
  about = 'about',
  projectId = ':projectId',
  projectName = ':projectName',
  rewardId = ':rewardId',
  userId = ':userId',
  heroId = ':heroId',
  entryId = ':entryId',
  postId = ':postId',
  goalId = ':goalId',
  grantId = ':grantId',
  characterId = ':characterId',
  legalTerms = 'T&C',
  legalPrivacy = 'Privacy',
}

export const AboutGeyserOrigin = 'https://about.geyser.fund'

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  landingFeed: () => `/${PathName.landingFeed}`,
  leaderboard: () => `/${PathName.leaderboard}`,
  projectDiscovery: () => `/${PathName.projectDiscovery}`,

  discoveryLanding: () => '/',
  discoveryLeaderboard: () => `/${PathName.leaderboard}`,
  discoveryMyProjects: () => `/${PathName.myProjects}`,
  discoveryProducts: () => `/${PathName.products}`,
  discoveryActivity: () => `/${PathName.activity}`,
  discoveryActivityGlobal: () => `/${PathName.activity}/${PathName.activityGlobal}`,
  discoveryActivityFollowed: () => `/${PathName.activity}/${PathName.activityFollowed}`,
  discoveryGrants: () => `/${PathName.grants}`,
  discoveryGrant: (grantId: string) => `/${PathName.grants}/${grantId}`,
  discoveryMerch: () => `/${PathName.merch}`,

  guardians: () => `/${PathName.guardians}`,
  guardiansCharacter: (characterId: string) => `/${PathName.guardians}/${characterId}`,

  manifesto: () => `/${PathName.manifesto}`,

  discoveryHallOfFame: () => `/${PathName.hallOfFame}`,
  hallOfFameProjects: () => `/${PathName.hallOfFame}/${PathName.projects}`,
  hallOfFameHeroesAmbassador: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.ambassador}`,
  hallOfFameHeroesCreator: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.creator}`,
  hallOfFameHeroesContributor: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.contributor}`,

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
  projectGoalView: (projectName: string, goalId: string | number) =>
    `/${PathName.project}/${projectName}/${PathName.projectGoals}/${goalId}`,
  projectRewards: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectRewards}`,
  projectPosts: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectPosts}`,
  projectLeaderboard: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectLeaderboard}`,
  projectDashboard: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDashboard}`,
  projectStoryEdit: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectStoryEdit}`,

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
  dashboardWallet: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardWallet}`,
  dashboardNostr: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardNostr}`,
  dashboardNotifications: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardNotifications}`,
  dashboardSettings: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
  dashboardPromote: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardPromote}`,

  /** Project Funding Routes */

  projectFunding: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectFunding}`,
  fundingDetails: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingDetails}`,

  fundingStart: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}`,

  fundingSubscription: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingSubscription}`,

  fundingPayment: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}`,
  fundingPaymentFailed: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentFailed} `,
  fundingPaymentLightning: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentLightning}`,
  fundingPaymentCard: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentCard}`,
  fundingPaymentFiatSwap: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentFiatSwap}`,
  fundingPaymentOnchain: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}`,
  fundingPaymentOnchainQR: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainQR}`,
  fundingPaymentOnchainProcessing: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainProcessing}`,
  fundingPaymentOnchainRefund: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainRefund}`,
  fundingPaymentOnchainRefundInitiated: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingStart}/${PathName.fundingPayment}/${PathName.fundingPaymentOnchain}/${PathName.fundingPaymentOnchainRefund}/${PathName.fundingPaymentOnchainRefundInitiated}`,
  fundingCallback: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingCallback}`,
  fundingSuccess: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingSuccess}`,
  fundingFailedCallback: () => `/${PathName.fundingFailedCallback}`,

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

  projectLaunch: (projectName: string) => `/${PathName.project}/${projectName}/?launch`,
  projectLaunchDraft: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDraft}/?draft`,

  /** User Profile Routes */
  userProfile: (userId: string) => `/${PathName.userProfile}/${userId}`,
  userProfileSettings: (userId: string) => `/${PathName.userProfile}/${userId}/${PathName.userSettings}`,
  userProfileSettingsGeneral: (userId: string) =>
    `/${PathName.userProfile}/${userId}/${PathName.userSettings}/${PathName.userSettingsGeneral}`,
  userProfileSettingsNotifications: (userId: string) =>
    `/${PathName.userProfile}/${userId}/${PathName.userSettings}/${PathName.userSettingsNotifications}`,
  userProfileSettingsSubscriptions: (userId: string) =>
    `/${PathName.userProfile}/${userId}/${PathName.userSettings}/${PathName.userSettingsSubscriptions}`,
  userProfileSettingsVerifications: (userId: string) =>
    `/${PathName.userProfile}/${userId}/${PathName.userSettings}/${PathName.userSettingsVerifications}`,

  heroProfile: (heroId: string) => `/${PathName.heroProfile}/${heroId}`,
  heroProfileSettings: (heroId: string) => `/${PathName.heroProfile}/${heroId}/${PathName.heroSettings}`,
  heroProfileSettingsGeneral: (heroId: string) =>
    `/${PathName.heroProfile}/${heroId}/${PathName.heroSettings}/${PathName.heroSettingsGeneral}`,
  heroProfileSettingsNotifications: (heroId: string) =>
    `/${PathName.heroProfile}/${heroId}/${PathName.heroSettings}/${PathName.heroSettingsNotifications}`,
  heroProfileSettingsSubscriptions: (heroId: string) =>
    `/${PathName.heroProfile}/${heroId}/${PathName.heroSettings}/${PathName.heroSettingsSubscriptions}`,

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

export const getPathWithGeyserHero = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const link = getPath(route, ...params)
  return `${link}?hero=geyser`
}
