// TODO: These definitions are currently a WIP.
// (Getting them started as part of the changes for
// https://geyserteam.atlassian.net/browse/GT-207.)

const pathsMap = {
  index: () => '/',
  landingPage: () => '/',
  projectDiscovery: () => '/project-discovery',
  grants: () => '/grants',
  projects: () => '/projects',
  project: (projectName: string) => `/project/${projectName}`,
  projectEntry: (projectName: string) => `/projects/${projectName}/entry`,
  launchProject: (projectName: string) => `/launch/${projectName}`,
  userProfile: (userID: string) => `/launch/${userID}`,
};

type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCallback: (...args: any[]) => string = pathsMap[route];

  return pathCallback(...params);
};
