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
  _deprecatedPathNameForProject = 'project',

  project = 'project',
  projectOverview = 'overview',
  projectInsights = 'insights',
  projectContributors = 'contributors',
  projectEntries = 'entries',
  projectRewards = 'rewards',
  projectMilestones = 'milestones',

  launchProject = 'launch',
  userProfile = 'profile',
  projectDashboard = 'dashboard',
  preview = 'preview',
  launchProjectDetails = 'details',
  launchProjectStory = 'story',
  node = 'node',
  discover = 'discover',
  dashboardDescription = 'description',
  dashboardContributors = 'contributors',
  dashboardDetails = 'details',
  dashboardWallet = 'wallet',
  dashboardStats = 'stats',
  dashboardSettings = 'settings',
  dashboardStory = 'story',
  dashboardShop = 'shop',
  badges = 'badges',
  about = 'about',
  projectId = ':projectId',
  userId = ':userId',
  entryId = ':entryId',
  grantId = ':grantId',
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

  grants: (grantId?: string) =>
    grantId ? `/${PathName.grants}/${grantId}` : `/${PathName.grants}`,
  grantsRoundOne: () => `/${PathName.grants}/${PathName.grantsRoundOne}`,
  grantsRoundTwo: () => `/${PathName.grants}/${PathName.grantsRoundTwo}`,

  notFound: () => `/${PathName.notFound}`,
  notAuthorized: () => `/${PathName.notAuthorized}`,
  _deprecatedPathForProject: (projectName: string) =>
    `/${PathName._deprecatedPathNameForProject}/${projectName}`,

  project: (projectName: string) => `/${PathName.project}/${projectName}`,
  projectOverview: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectOverview}`,
  projectInsights: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectInsights}`,
  projectContributors: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectContributors}`,
  projectEntries: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectEntries}`,
  projectRewards: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectRewards}`,
  projectMilestones: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.projectMilestones}`,

  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
  projectEntryCreation: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}`,
  projectEntryDetails: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}`,
  projectEntryPreview: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}/preview`,

  publicProjectLaunch: () => `/${PathName.launchProject}/start`,
  privateProjectLaunch: () => `/${PathName.launchProject}`,
  projectLaunch: (projectName: string, state: 'draft' | 'launch' = 'launch') =>
    `/${PathName.project}/${projectName}/?${state}`,
  launchProjectWithNode: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.node}`,
  launchProjectDetails: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectDetails}`,
  launchProjectStory: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.launchProjectStory}`,

  userProfile: (userID: string) => `/${PathName.userProfile}/${userID}`,

  projectDashboard: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}`,
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
  dashboardShop: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardShop}`,

  badges: () => `/${PathName.badges}`,

  about: () => `/${PathName.about}`,
}

export type PathsMap = typeof pathsMap

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route]

  return pathCallback(...params)
}
