import { atom, useAtomValue } from 'jotai'

import { routeMatchForAtom } from '../../../config/routes/routesAtom'
import { getPath, PathName } from '../../../constants'

const entryCreationRoutes = [
  getPath('projectEntryCreation', PathName.projectId),
  getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
  getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
]

const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectId),
  getPath('dashboardContributors', PathName.projectId),
  getPath('dashboardDetails', PathName.projectId),
  getPath('dashboardWallet', PathName.projectId),
  getPath('dashboardSettings', PathName.projectId),
  getPath('dashboardStats', PathName.projectId),
  getPath('dashboardStory', PathName.projectId),
]
const projectRoutes = [
  getPath('project', PathName.projectId),
  getPath('projectContributors', PathName.projectId),
  getPath('projectInsights', PathName.projectId),
  getPath('projectOverview', PathName.projectId),
  getPath('projectEntries', PathName.projectId),
  getPath('projectMilestones', PathName.projectId),
  getPath('projectRewards', PathName.projectId),
]

const grantRoutes = [getPath('grants'), getPath('grants', PathName.grantId)]

const landingRoutes = [
  getPath('index'),
  getPath('landingPage'),
  getPath('landingFeed'),
]

const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]

const routesForHidingTopNav = entryCreationRoutes
const routesForHidingTopNavAtom = atom(routeMatchForAtom(routesForHidingTopNav))

const routesForShowingProjectButton = projectDashboardRoutes
const routesForShowingProjectButtonAtom = atom(
  routeMatchForAtom(routesForShowingProjectButton),
)

const routesForHidingMyProjectsButton = [
  getPath('userProfile', PathName.userId),
  ...projectRoutes,
  ...entryCreationRoutes,
  ...projectDashboardRoutes,
]
const routesForHidingMyProjectsButtonAtom = atom(
  routeMatchForAtom(routesForHidingMyProjectsButton),
)

const routesForLeftSideMenuButton = projectRoutes
const routesForLeftSideMenuButtonAtom = atom(
  routeMatchForAtom(routesForLeftSideMenuButton),
)

const routesForTransparentBackground = [
  getPath('index'),
  getPath('landingFeed'),
]
const routesForTransparentBackgroundAtom = atom(
  routeMatchForAtom(routesForTransparentBackground),
)

const routesForShowingNavItems = [`/`, getPath('landingFeed'), ...grantRoutes]
const routesForShowingNavItemsAtom = atom(
  routeMatchForAtom(routesForShowingNavItems),
)

const routesForCustomTitle = [
  ...projectRoutes,
  ...projectDashboardRoutes,
  // `/${PathName.project}/:projectId/${PathName.entry}`,
  getPath('entry', PathName.entryId),
]
const routesForCustomTitleAtom = atom(routeMatchForAtom(routesForCustomTitle))

const routesToShowProjectLaunchButton = [...landingRoutes, ...grantRoutes]
const routesToShowProjectLaunchButtonAtom = atom(
  routeMatchForAtom(routesToShowProjectLaunchButton),
)

const routesForHidingDashboardButton = [...projectDashboardRoutes]
const routesForHidingDashboardButtonAtom = atom(
  routeMatchForAtom(routesForHidingDashboardButton),
)

const routesForHidingDropdownMenu = entryCreationRoutes
const routesForHidingDropdownMenuAtom = atom(
  routeMatchForAtom(routesForHidingDropdownMenu),
)

const routesToShowSignInButton = [
  ...projectRoutes,
  ...entryCreationRoutes,
  ...landingRoutes,
  ...fallBackRoutes,
  ...grantRoutes,
  `/${PathName.userProfile}/:userId`,
  `/${PathName.entry}/:entryId`,
]
const routesToShowSignInButtonAtom = atom(
  routeMatchForAtom(routesToShowSignInButton),
)

export const useRouteMatchesForTopNavBar = () => {
  const hideTopNavBar = useAtomValue(routesForHidingTopNavAtom)
  const showProjectButton = useAtomValue(routesForShowingProjectButtonAtom)
  const hideMyProjectsButton = useAtomValue(routesForHidingMyProjectsButtonAtom)
  const showLeftSideMenuButton = useAtomValue(routesForLeftSideMenuButtonAtom)
  const showNavItems = useAtomValue(routesForShowingNavItemsAtom)
  const showCustomTitle = useAtomValue(routesForCustomTitleAtom)
  const showProjectLaunchButton = useAtomValue(
    routesToShowProjectLaunchButtonAtom,
  )
  const showTransparentBackground = useAtomValue(
    routesForTransparentBackgroundAtom,
  )
  const hideDashboardButton = useAtomValue(routesForHidingDashboardButtonAtom)
  const hideDropdownMenu = useAtomValue(routesForHidingDropdownMenuAtom)
  const showSignInButton = useAtomValue(routesToShowSignInButtonAtom)

  return {
    hideTopNavBar,
    showProjectButton,
    hideMyProjectsButton,
    showLeftSideMenuButton,
    showTransparentBackground,
    showNavItems,
    showCustomTitle,
    showProjectLaunchButton,
    hideDashboardButton,
    hideDropdownMenu,
    showSignInButton,
  }
}
