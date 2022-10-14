export const routerPathNames = {
  projectDiscovery: 'discover',
  grants: 'grants',
  entry: 'entry',
  notFound: 'not-found',
  notAuthorized: 'not-authorized',
  project: 'project',
  projects: 'projects',
  launchProject: 'launch',
  userProfile: 'profile',
  dashboard: 'dashboard',
  preview: 'preview',
};

// TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  projectDiscovery: () => `/${routerPathNames.projectDiscovery}`,
  grants: () => `/${routerPathNames.grants}`,
  notFound: () => `/${routerPathNames.notFound}`,
  notAuthorized: () => `/${routerPathNames.notAuthorized}`,
  project: (projectName: string) =>
    `/${routerPathNames.project}/${projectName}`,
  projectEntry: (projectName: string) =>
    `/${routerPathNames.projects}/${projectName}/entry`,
  launchProject: (projectName: string) =>
    `/${routerPathNames.launchProject}/${projectName}`,
  userProfile: (userID: string) => `/${routerPathNames.userProfile}/${userID}`,
};

type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route];

  return pathCallback(...params);
};
