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
  dashboardFunds = 'funds',
  dashboardStats = 'stats',
  dashboardSettings = 'settings',
  badges = 'badges',
  projectId = ':projectId',
  userId = ':userId',
  entryId = ':entryId',
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
  projectLaunch: (projectName: string, state: 'draft' | 'launch' = 'launch') =>
    `/${PathName.project}/${projectName}/?${state}`,
  projectEntryCreation: (projectName: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}`,
  projectEntryDetails: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}`,
  projectEntryPreview: (projectName: string, entryID: string) =>
    `/${PathName.project}/${projectName}/${PathName.entry}/${entryID}/preview`,
  publicProjectLaunch: () => `/${PathName.launchProject}/start`,
  privateProjectLaunch: () => `/${PathName.launchProject}`,
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
  dashboardFunding: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardFunds}`,
  dashboardStats: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardStats}`,
  dashboardSettings: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
  badges: () => `/${PathName.badges}`,
}

type PathsMap = typeof pathsMap

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route]

  return pathCallback(...params)
}
