export enum PathName {
  projectDiscovery = 'discover',
  grants = 'grants',
  entry = 'blog',
  notFound = 'not-found',
  notAuthorized = 'not-authorized',
  _deprecatedPathNameForProject = 'project',
  project = 'project',
  launchProject = 'launch',
  userProfile = 'profile',
  projectDashboard = 'dashboard',
  preview = 'preview',
  milestonesAndRewards = 'milestones',
  node = 'node',
  discover = 'discover',
  dashboardDescription = 'description',
  dashboardContributors = 'contributors',
  dashboardFunds = 'funds',
  dashboardStats = 'stats',
  dashboardSettings = 'settings',
  projectId = ':projectId',
  userId = ':userId',
  entryId = ':entryId',
}

// TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  projectDiscovery: () => `/${PathName.projectDiscovery}`,
  grants: () => `/${PathName.grants}`,
  notFound: () => `/${PathName.notFound}`,
  notAuthorized: () => `/${PathName.notAuthorized}`,
  _deprecatedPathForProject: (projectName: string) =>
    `/${PathName._deprecatedPathNameForProject}/${projectName}`,

  project: (projectName: string) => `/${PathName.project}/${projectName}`,
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
  launchProjectWithMilestonesAndRewards: (projectID: string) =>
    `/${PathName.launchProject}/${projectID}/${PathName.milestonesAndRewards}`,
  userProfile: (userID: string) => `/${PathName.userProfile}/${userID}`,
  projectDashboard: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}`,
  dashboardDescription: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardDescription}`,
  dashboardContributors: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardContributors}`,
  dashboardFunding: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardFunds}`,
  dashboardStats: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardStats}`,
  dashboardSettings: (projectID: string) =>
    `/${PathName.project}/${projectID}/${PathName.projectDashboard}/${PathName.dashboardSettings}`,
  entry: (entryID: string) => `/${PathName.entry}/${entryID}`,
}

type PathsMap = typeof pathsMap

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route]

  return pathCallback(...params)
}
