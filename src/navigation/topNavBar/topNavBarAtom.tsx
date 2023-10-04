import { atom, useAtomValue } from 'jotai'

import {
  entryCreationRoutes,
  fallBackRoutes,
  grantRoutes,
  landingRoutes,
  projectDashboardRoutes,
  projectRoutes,
  routeMatchForAtom,
} from '../../config/routes/routesAtom'
import { getPath, PathName } from '../../constants'

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
    hideDropdownMenu,
    showSignInButton,
  }
}
