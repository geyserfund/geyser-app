export enum PathName {
  projectDiscovery = 'discover',
  landingFeed = 'feed',
  leaderboard = 'leaderboard',
  grants = 'grants',
  grantsRoundOne = 'roundone',
  grantsRoundTwo = 'roundtwo',
  entry = 'entry',
  notFound = 'not-found',
  notAuthorized = 'not-authorized',
  projectNotFound = 'project-not-found',
  _deprecatedPathNameForProject = 'project',

  project = 'project',
  projectDraft = 'draft',
  projectInsights = 'insights',
  projectContributors = 'contributors',
  projectPost = 'posts',
  projectEntries = 'entries',
  projectRewards = 'rewards',
  projectGoals = 'goals',
  projectManageRewards = 'manage-rewards',
  projectCreateReward = 'create-reward',
  projectEditReward = 'edit-reward',

  refund = 'refund',
  refundInitiated = 'initiated',

  launchProject = 'launch',

  userProfile = 'profile',
  userProfileSettings = 'settings',

  projectDashboard = 'dashboard',
  preview = 'preview',
  launchProjectDetails = 'details',
  launchProjectStory = 'story',
  launchProjectRewards = 'rewards',
  launchProjectRewardsNew = 'rewards/new',
  launchProjectRewardsEdit = 'rewards/edit',
  node = 'node',
  discover = 'discover',
  dashboardDescription = 'description',
  dashboardContributors = 'contributors',
  dashboardDetails = 'details',
  dashboardWallet = 'wallet',
  dashboardStats = 'stats',
  dashboardSettings = 'settings',
  dashboardStory = 'story',
  dashboardStatus = 'status',
  dashboardRewards = 'rewards',
  dashboardShop = 'shop',
  dashboardNostr = 'nostr',

  badges = 'badges',
  about = 'about',
  projectId = ':projectId',
  rewardId = ':rewardId',
  userId = ':userId',
  entryId = ':entryId',
  grantId = ':grantId',

  legalTerms = 'terms-and-conditions',
  legalPrivacy = 'privacy-policy',
}

// @TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  landingFeed: () => `/${PathName.landingFeed}`,
  leaderboard: () => `/${PathName.leaderboard}`,
  projectDiscovery: () => `/${PathName.projectDiscovery}`,

  grants: (grantId?: string) => (grantId ? `/${PathName.grants}/${grantId}` : `/${PathName.grants}`),
  grantsRoundOne: () => `/${PathName.grants}/${PathName.grantsRoundOne}`,
  grantsRoundTwo: () => `/${PathName.grants}/${PathName.grantsRoundTwo}`,

  notFound: () => `/${PathName.notFound}`,
  notAuthorized: () => `/${PathName.notAuthorized}`,
  projectNotFound: () => `/${PathName.projectNotFound}`,
  _deprecatedPathForProject: (projectName: string) => `/${PathName._deprecatedPathNameForProject}/${projectName}`,

  refundInitiated: () => `/${PathName.refund}/${PathName.refundInitiated}`,
  refund: () => `/${PathName.refund}`,

  project: (projectName: string) => `/${PathName.project}/${projectName}`,
  projectDraft: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectDraft}`,
  projectInsights: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectInsights}`,
  projectContributors: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectContributors}`,
  projectEntries: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectEntries}`,
  projectRewards: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectRewards}`,
  projectGoals: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectGoals}`,
  projectManageRewards: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.projectManageRewards}`,
  projectCreateReward: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectManageRewards}/${PathName.projectCreateReward}`,
  projectEditReward: (projectName: string, rewardId: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectManageRewards}/${PathName.projectEditReward}/${rewardId}`,

  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
  entryRewards: (entryID: string) => `/${PathName.entry}/${entryID}/${PathName.projectRewards}`,
  projectEntryCreation: (projectName: string) => `/${PathName.project}/${projectName}/${PathName.entry}`,
  projectEntryDetails: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}`,
  projectEntryPreview: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}/preview`,

  publicProjectLaunch: () => `/${PathName.launchProject}/start`,
  privateProjectLaunch: () => `/${PathName.launchProject}`,
  projectLaunch: (projectName: string, state: 'draft' | 'launch' = 'launch') =>
    `/${PathName.project}/${projectName}/?${state}`,

  launchProject: (projectID: string) => `/${PathName.launchProject}/${projectID}`,
  launchProjectWithNode: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.node}`,
  launchProjectDetails: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectDetails}`,
  launchProjectStory: (projectID: string) => `/${PathName.launchProject}/${projectID}/${PathName.launchProjectStory}`,
  launchProjectRewards: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}`,
  launchProjectRewardsNew: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/new`,
  launchProjectRewardsEdit: (projectID: string, rewardID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectRewards}/edit/${rewardID}`,

  userProfile: (userID: string) => `/${PathName.userProfile}/${userID}`,
  userProfileSettings: (userID: string) => `/${PathName.userProfile}/${userID}/${PathName.userProfileSettings}`,

  projectDashboard: (projectID: string) => `/${PathName.project}/${projectID}/${PathName.projectDashboard}`,
  dashboardDescription: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardDescription}`,
  dashboardContributors: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardContributors}`,
  dashboardDetails: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardDetails}`,
  dashboardWallet: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardWallet}`,
  dashboardStats: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardStats}`,
  dashboardSettings: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
  dashboardStory: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardStory}`,
  dashboardStatus: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardStatus}`,
  dashboardRewards: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardRewards}`,
  dashboardShop: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardShop}`,
  dashboardNostr: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardNostr}`,

  badges: () => `/${PathName.badges}`,

  about: () => `/${PathName.about}`,
  legalTerms: () => `/${PathName.legalTerms}`,
  legalPrivacy: () => `/${PathName.legalPrivacy}`,
}

export type PathsMap = typeof pathsMap

export const getPath = <TRoute extends keyof PathsMap>(route: TRoute, ...params: Parameters<PathsMap[TRoute]>) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route]

  return pathCallback(...params)
}
