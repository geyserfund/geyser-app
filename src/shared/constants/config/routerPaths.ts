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
  launchpad = 'launchpad',
  activityGlobal = 'global',
  activityFollowed = 'followed',

  projectCategory = 'category',
  projectSubCategory = 'subcategory',
  allOrNothing = 'allornothing',
  campaigns = 'campaigns',
  fundraisers = 'fundraisers',

  manifesto = 'manifesto',

  merch = 'project/geyser/rewards',

  entry = 'entry',

  notFound = 'not-found',
  notAuthorized = 'not-authorized',
  projectNotFound = 'project-not-found',
  _deprecatedPathNameForProject = 'project',

  project = 'project',
  projectDraft = 'draft',
  projectPreLaunch = 'prelaunch',
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

  widget = 'widget',
  contributionWidget = 'contribution',

  refund = 'refund',
  refundFile = 'file',
  refundInitiated = 'initiated',

  launchStart = 'start',
  launchRules = 'rules',

  launchProject = 'launch',

  launchProjectDetails = 'details',
  launchProjectFunding = 'funding',
  launchFundingStrategy = 'strategy',
  launchFundingGoal = 'goal',
  launchStory = 'story',
  launchProjectRewards = 'rewards',
  launchProjectRewardsNew = 'rewards/new',
  launchProjectRewardsEdit = 'rewards/edit',
  launchProjectStrategy = 'strategy',
  launchAboutYou = 'about-you',
  launchPayment = 'payment',
  launchPaymentWallet = 'wallet',
  launchPaymentAccountPassword = 'account-password',
  launchPaymentTaxId = 'tax-id',
  launchFinalize = 'finalize',

  userProfile = 'user',
  userSettings = 'settings',
  userSettingsGeneral = 'general',
  userSettingsNotifications = 'notifications',
  userSettingsSubscriptions = 'subscriptions',
  userSettingsVerifications = 'verifications',
  userSettingsWallet = 'wallet',

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
  dashboardRewards = 'rewards',
  dashboardFundingGoal = 'goal',

  projectFunding = 'funding',
  fundingDetails = 'details',
  fundingSubscription = 'subscription',
  fundingPayment = 'payment',
  fundingLaunchPayment = 'launch',
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
  categoryName = ':category',
  subCategoryName = ':subcategory',
  rewardId = ':rewardId',
  rewardUUID = ':rewardUUID',
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

  logout: () => '/logout',

  landingPage: () => '/',
  landingFeed: () => `/${PathName.landingFeed}`,
  leaderboard: () => `/${PathName.leaderboard}`,
  projectDiscovery: () => `/${PathName.projectDiscovery}`,

  /** Discovery Routes */
  discoveryLanding: () => '/',
  discoveryCampaigns: () => `/${PathName.campaigns}`,
  discoveryFundraisers: () => `/${PathName.fundraisers}`,
  discoveryProducts: () => `/${PathName.products}`,
  discoveryAllOrNothing: () => `/${PathName.allOrNothing}`,
  discoveryProjectCategory: (category: string) => `/${PathName.projectCategory}/${category}`,
  discoveryProjectSubCategory: (subCategory: string) => `/${PathName.projectSubCategory}/${subCategory}`,
  discoveryLeaderboard: () => `/${PathName.leaderboard}`,
  discoveryMyProjects: () => `/${PathName.myProjects}`,
  discoveryActivity: () => `/${PathName.activity}`,
  discoveryActivityGlobal: () => `/${PathName.activity}/${PathName.activityGlobal}`,
  discoveryActivityFollowed: () => `/${PathName.activity}/${PathName.activityFollowed}`,
  discoveryGrants: () => `/${PathName.grants}`,
  discoveryGrant: (grantId: string) => `/${PathName.grants}/${grantId}`,
  discoveryMerch: () => `/${PathName.merch}`,
  discoveryLaunchpad: () => `/${PathName.launchpad}`,

  guardians: () => `/${PathName.guardians}`,
  guardiansCharacter: (characterId: string) => `/${PathName.guardians}/${characterId}`,

  manifesto: () => `/${PathName.manifesto}`,

  discoveryHallOfFame: () => `/${PathName.hallOfFame}`,
  hallOfFameProjects: () => `/${PathName.hallOfFame}/${PathName.projects}`,
  hallOfFameHeroesAmbassador: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.ambassador}`,
  hallOfFameHeroesCreator: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.creator}`,
  hallOfFameHeroesContributor: () => `/${PathName.hallOfFame}/${PathName.projects}/${PathName.contributor}`,

  discoveryHeroes: () => `/${PathName.heroes}`,
  heroesAmbassador: () => `/${PathName.heroes}/${PathName.ambassador}`,
  heroesCreator: () => `/${PathName.heroes}/${PathName.creator}`,
  heroesContributor: () => `/${PathName.heroes}/${PathName.contributor}`,

  /** Grants Routes */

  grants: (grantId?: string) => (grantId ? `/${PathName.grants}/${grantId}` : `/${PathName.grants}`),
  grantsRoundOne: () => `/${PathName.grants}/${PathName.grantsRoundOne}`,
  grantsRoundTwo: () => `/${PathName.grants}/${PathName.grantsRoundTwo}`,

  /** Not Found Routes */

  notFound: () => `/${PathName.notFound}`,
  notAuthorized: () => `/${PathName.notAuthorized}`,
  projectNotFound: () => `/${PathName.projectNotFound}`,
  _deprecatedPathForProject: (projectName: string) => `/${PathName._deprecatedPathNameForProject}/${projectName}`,

  /** Project base routes */

  project: (projectName: string) => `/${PathName.project}/${projectName}`,
  projectDraft: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDraft}`,
  projectPreLaunch: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectPreLaunch}`,
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
  projectRewardEdit: (projectName: string, rewardUUID: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectRewards}/edit/${rewardUUID}`,
  projectRewardView: (projectName: string, rewardUUID: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectRewards}/view/${rewardUUID}`,

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
  dashboardRewards: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardRewards}`,
  dashboardFundingGoal: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectDashboard}/${PathName.dashboardFundingGoal}`,

  /** Project Funding Routes */

  projectFunding: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectFunding}`,
  fundingDetails: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingDetails}`,

  fundingLaunchPayment: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectFunding}/${PathName.fundingLaunchPayment}`,

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
  refundFile: () => `/${PathName.refund}/${PathName.refundFile}`,
  refundInitiated: () => `/${PathName.refund}/${PathName.refundInitiated}`,

  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
  entryRewards: (entryID: string) => `/${PathName.entry}/${entryID}/${PathName.projectRewards}`,
  projectEntryCreation: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.entry}`,
  projectEntryDetails: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}`,
  projectEntryPreview: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}/preview`,

  /** Project creation Routes */

  // Non Creation Flow path routes ( Splash pages before creation flow )

  launchStart: () => `/${PathName.launchProject}/${PathName.launchStart}`,
  launchRules: () => `/${PathName.launchProject}/${PathName.launchRules}`,

  // Creation  flow path routes

  launch: () => `/${PathName.launchProject}`,
  launchProject: (projectID?: string) => `/${PathName.launchProject}/${projectID || 'new'}`,

  launchProjectDetails: (projectID?: string) =>
    `/${PathName.launchProject}/${projectID || 'new'}/${PathName.launchProjectDetails}`,
  launchProjectFunding: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectFunding}`,
  launchFundingStrategy: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectFunding}/${PathName.launchFundingStrategy}`,
  launchFundingGoal: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectFunding}/${PathName.launchFundingGoal}`,
  launchProjectRewards: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}`,
  launchProjectRewardsCreate: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/create`,
  launchProjectRewardsEdit: (projectID: string, rewardUUID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/edit/${rewardUUID}`,
  launchStory: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchStory}`,
  launchAboutYou: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchAboutYou}`,

  launchPayment: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchPayment}`,
  launchPaymentWallet: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchPayment}/${PathName.launchPaymentWallet}`,
  launchPaymentAccountPassword: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchPayment}/${PathName.launchPaymentAccountPassword}`,
  launchPaymentTaxId: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchPayment}/${PathName.launchPaymentTaxId}`,
  launchFinalize: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchFinalize}`,

  launchProjectStrategy: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectStrategy}`,

  projectLaunch: (projectName: string) => `/${PathName.project}/${projectName}/?launch`,
  projectLaunchDraft: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDraft}/?draft`,
  projectLaunchPreLaunch: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectPreLaunch}/?prelaunch`,

  /** Project Widget Routes */
  contributionWidget: (projectName: string) =>
    `/${PathName.widget}/${PathName.project}/${projectName}/${PathName.contributionWidget}`,

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
  userProfileSettingsWallet: (userId: string) =>
    `/${PathName.userProfile}/${userId}/${PathName.userSettings}/${PathName.userSettingsWallet}`,

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

export const getPathWithGeyserPromotionsHero = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const link = getPath(route, ...params)
  return `${link}?hero=geyserpromotion`
}
