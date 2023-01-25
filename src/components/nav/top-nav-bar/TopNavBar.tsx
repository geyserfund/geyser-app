import { useDisclosure } from '@chakra-ui/hooks'
import { Box } from '@chakra-ui/layout'
import {
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useContext, useEffect, useMemo } from 'react'
import {
  Link,
  matchPath,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom'

import { getPath, routerPathNames } from '../../../constants'
import { AuthContext } from '../../../context'
import { useMobileMode } from '../../../utils'
import { AuthModal } from '../../molecules'
import { ButtonComponent } from '../../ui'
import { NavBarLogo } from '../NavBarLogo'
import { TopNavBarMenu } from './TopNavBarMenu'

const navItems = [
  {
    name: 'Projects',
    to: '/discover',
  },
  {
    name: 'Grants',
    to: '/grants',
    new: true,
  },
  {
    name: 'About',
    to: 'https://geyser.notion.site/Geyser-2dd9468a27e84531bcbcbe89c24d7f09',
  },
]

const routesForHidingTopNav = [
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
]

const routesForShowingProjectButton = [
  `/${routerPathNames.project}/:projectId/${routerPathNames.projectDashboard}`,
]

const customTitleRoutes = [
  `/${routerPathNames.project}/:projectId/`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.projectDashboard}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.entry}/:entryId`,
]
const navItemsRoutes = [
  `/`,
  `/${routerPathNames.discover}`,
  `/${routerPathNames.grants}`,
  `/${routerPathNames.grants}/roundtwo`,
  `/${routerPathNames.grants}/roundone`,
]

const routesForHidingDashboardButton = [
  `/${routerPathNames.project}/:projectId/${routerPathNames.projectDashboard}`,
]

const routesForHidingDropdownMenu = [
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
]

const routesForHidingMyProjectsButton = [
  `/${routerPathNames._deprecatedPathNameForProject}/:projectId`,
  `/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.projectDashboard}`,
  `/${routerPathNames.userProfile}/:userId`,
]

const routesForEnablingSignInButton = [
  getPath('index'),
  getPath('landingPage'),
  getPath('projectDiscovery'),
  getPath('grants'),
  getPath('notFound'),
  getPath('notAuthorized'),
  `/${routerPathNames.userProfile}/:userId`,
  `/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.project}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
]

const routesForEnablingProjectLaunchButton = [
  getPath('index'),
  getPath('landingPage'),
  getPath('grants'),
  getPath('projectDiscovery'),
]

/**
 * "Container" component for elements and appearance of
 * the top navigation bar.
 */
export const TopNavBar = () => {
  const isMobile = useMobileMode()
  const navigate = useNavigate()
  const location = useLocation()

  const currentPathName = location.pathname

  const currentProjectRouteMatch = matchPath(
    `/${routerPathNames.project}/:projectId/`,
    currentPathName,
  )

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure()

  const {
    user,
    isLoggedIn,
    queryCurrentUser,
    logout,
    isUserAProjectCreator,
    isAuthModalOpen,
    loginOnOpen,
    loginOnClose,
    navigationContext,
  } = useContext(AuthContext)

  const {
    state,
  }: {
    state: {
      loggedOut?: boolean
      refresh?: boolean
    }
  } = useLocation()

  const routeMatchesForHidingTopNav = routesForHidingTopNav.map(useMatch)

  const routeMatchesForProjectButton =
    routesForShowingProjectButton.map(useMatch)

  const routeMatchesForEnablingSignInButton =
    routesForEnablingSignInButton.map(useMatch)

  const routeMatchesForHidingDashboardButton =
    routesForHidingDashboardButton.map(useMatch)

  const routeMatchesForHidingDropdownMenu =
    routesForHidingDropdownMenu.map(useMatch)

  const routeMatchesForHidingMyProjectsButton =
    routesForHidingMyProjectsButton.map(useMatch)

  const routesMatchesForEnablingProjectLaunchButton =
    routesForEnablingProjectLaunchButton.map(useMatch)

  const routesMatchesForShowingCustomTitle = customTitleRoutes.map(useMatch)
  const routesMatchesForShowingNavItems = navItemsRoutes.map(useMatch)

  useEffect(() => {
    if (state && state.loggedOut) {
      logout()
      onLoginAlertModalOpen()

      navigate(location.pathname, { state: {} })
    }

    if (state && state.refresh) {
      queryCurrentUser()
      navigate(location.pathname, { state: {} })
    }
  }, [state])

  const handleProjectLaunchButtonPress = () => {
    navigate(getPath('publicProjectLaunch'))
  }

  const handleMyProjectsButtonPress = () => {
    navigate(getPath('userProfile', user.id))
  }

  const handleMyProjectButtonPress = () => {
    navigate(getPath('project', user.ownerOf[0]?.project?.name))
  }

  const handleProjectButtonPress = () => {
    const projectName =
      currentProjectRouteMatch?.params?.projectId ||
      navigationContext.projectName
    navigate(getPath('project', projectName))
  }

  const handleProjectDashboardButtonPress = () => {
    if (userHasOnlyOneProject) {
      navigate(getPath('projectDashboard', user.ownerOf[0]?.project?.name))
      return
    }

    const projectName =
      currentProjectRouteMatch?.params?.projectId ||
      navigationContext.projectName

    if (projectName) {
      navigate(getPath('projectDashboard', projectName))
    } else {
      navigate(getPath('landingPage'))
    }
  }

  const isViewingOwnProject: boolean = useMemo(() => {
    return (
      (currentPathName.startsWith(`/${routerPathNames.entry}`) ||
        currentPathName.startsWith(
          `/${routerPathNames._deprecatedPathNameForProject}`,
        ) ||
        currentPathName.startsWith(`/${routerPathNames.project}`)) &&
      navigationContext.projectOwnerIDs.includes(Number(user.id))
    )
  }, [user.id, navigationContext.projectOwnerIDs, currentPathName])

  const userHasOnlyOneProject: boolean = useMemo(
    () => user && user.ownerOf && user.ownerOf.length === 1,
    [user],
  )

  const shouldTopNavBeHidden: boolean = useMemo(() => {
    return routeMatchesForHidingTopNav.some((routeMatch) => Boolean(routeMatch))
  }, [routeMatchesForHidingTopNav])

  const shouldShowProjectButton: boolean = useMemo(() => {
    return (
      !isMobile &&
      routeMatchesForProjectButton.some((routeMatch) => {
        return Boolean(routeMatch)
      }) &&
      Boolean(navigationContext)
    )
  }, [routeMatchesForProjectButton, isMobile, navigationContext])
  /**
   * Logic:
   *  - Available to all not logged-in users.
   *  - Viewable on:
   *    - Landing Page
   *    - Discovery Page
   *    - Grant Pages
   *    - Other Users's Project and Entry pages
   *  - Hidden on Mobile -- it will be in the menu dropdown instead.
   */
  const shouldShowSignInButton: boolean = useMemo(() => {
    return (
      isLoggedIn === false &&
      isMobile === false &&
      routeMatchesForEnablingSignInButton.some((routeMatch) => {
        return Boolean(routeMatch)
      })
    )
  }, [routeMatchesForEnablingSignInButton, isLoggedIn, isMobile])

  const shouldShowSignInButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isLoggedIn === false &&
      isMobile === true &&
      routeMatchesForEnablingSignInButton.some((routeMatch) => {
        return Boolean(routeMatch)
      })
    )
  }, [routeMatchesForEnablingSignInButton, isLoggedIn, isMobile])

  /**
   * Logic:
   *  - Available to all not logged-in users without a profile inside
   *  - Available to all logged-in users with profile inside
   *  - Viewable to all users at all times except when: Creating a Project + Entry
   */
  const shouldShowDropdownMenuButton: boolean = useMemo(() => {
    return routeMatchesForHidingDropdownMenu.every((routeMatch) => {
      return Boolean(routeMatch) === false
    })
  }, [routeMatchesForHidingDropdownMenu])

  /**
   * Logic:
   *  - Available to:
   *    - a logged-in creator of a live or draft project.
   *  - Viewable:
   *    - Almost everywhere.
   *    - It does not appear when:
   *      - A creator is looking at another user's Project Page or Entry Page.
   *    - Hidden on Mobile -- it will be in the menu dropdown instead.
   */
  const shouldShowDashboardButton: boolean = useMemo(() => {
    return (
      isMobile === false &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject &&
      !routeMatchesForHidingDashboardButton.some((routeMatch) => {
        return Boolean(routeMatch)
      })
    )
  }, [
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    routeMatchesForHidingDashboardButton,
  ])

  const shouldShowDashboardButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      (isViewingOwnProject || userHasOnlyOneProject) &&
      !routeMatchesForHidingDashboardButton.some((routeMatch) => {
        return Boolean(routeMatch)
      })
    )
  }, [
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
    routeMatchesForHidingDashboardButton,
  ])

  /**
   * Logic:
   *  - Available to:
   *    - a logged-in creator of a live or draft project.
   *  - Viewable:
   *    - Almost everywhere.
   *    - It does not appear when:
   *      - a creator is looking at another user's Project Page or Entry Page.
   *      - a creator is looking their own Project Page or Entry Page.
   *        - The "Dashboard" button will show for them instead.
   *    - Hidden on Mobile -- it will be in the menu dropdown instead.
   */

  const shouldShowMyProjectsButton: boolean = useMemo(() => {
    return (
      isMobile === false &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject === false &&
      routeMatchesForHidingMyProjectsButton.every((routeMatch) => {
        return Boolean(routeMatch) === false
      }) &&
      !userHasOnlyOneProject
    )
  }, [
    routeMatchesForHidingMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
  ])

  const shouldShowMyProjectButton: boolean = useMemo(() => {
    return (
      isMobile === false &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject === false &&
      routeMatchesForHidingMyProjectsButton.every((routeMatch) => {
        return Boolean(routeMatch) === false
      }) &&
      userHasOnlyOneProject
    )
  }, [
    routeMatchesForHidingMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
  ])

  const shouldShowMyProjectsButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject === false &&
      routeMatchesForHidingMyProjectsButton.every((routeMatch) => {
        return Boolean(routeMatch) === false
      }) &&
      !userHasOnlyOneProject
    )
  }, [
    routeMatchesForHidingMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
    userHasOnlyOneProject,
  ])

  /**
   * Logic:
   *  - Available to:
   *    - All non-logged-in users.
   *    - All logged-in users who aren't yet project creators.
   *  - Viewable on:
   *    - The Landing, Discovery, and Grant Pages.
   */
  const shouldShowProjectLaunchButton: boolean = useMemo(() => {
    return (
      (isLoggedIn === false ||
        (isLoggedIn && isUserAProjectCreator === false)) &&
      routesMatchesForEnablingProjectLaunchButton.some((routeMatch) => {
        return Boolean(routeMatch)
      })
    )
  }, [
    routesMatchesForEnablingProjectLaunchButton,
    isLoggedIn,
    isUserAProjectCreator,
  ])

  /**
   * Logic:
   *  - Shown for creators on the project creation flow pages.
   */
  const shouldShowCustomTitle: boolean = useMemo(() => {
    return (
      routesMatchesForShowingCustomTitle.some((routeMatch) => {
        return Boolean(routeMatch)
      }) && Boolean(navigationContext)
    )
  }, [routesMatchesForShowingCustomTitle, navigationContext])

  const shouldShowNavItems: boolean = useMemo(() => {
    if (isMobile) {
      return false
    }

    return routesMatchesForShowingNavItems.some((routeMatch) => {
      return Boolean(routeMatch)
    })
  }, [routesMatchesForShowingNavItems, isMobile])

  if (shouldTopNavBeHidden) {
    return null
  }

  return (
    <>
      <Box
        bg={'brand.bgGrey4'}
        px={4}
        backdropFilter="blur(2px)"
        position="fixed"
        top={0}
        left={0}
        width="full"
        zIndex={1000}
        borderBottom="2px solid"
        borderBottomColor="brand.neutral100"
      >
        <HStack
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          overflow="hidden"
        >
          <NavBarLogo marginRight={isMobile ? 0 : 5} />

          {shouldShowCustomTitle ? (
            <Link to={navigationContext.projectPath}>
              <Heading as={'h3'} noOfLines={1} size="sm">
                {navigationContext.projectTitle}
              </Heading>
            </Link>
          ) : null}

          <HStack alignItems={'center'} spacing={2}>
            {shouldShowNavItems ? (
              <Box display={'flex'} alignItems="center" gap={4} mr={4}>
                {navItems.map((item, idx) => (
                  <>
                    {item.name === 'About' ? (
                      <a key={idx} href={item.to}>
                        <Text
                          fontWeight={'500'}
                          textDecoration="none"
                          fontSize="16px"
                          color={'brand.neutral700'}
                        >
                          {item.name}
                        </Text>
                      </a>
                    ) : (
                      <Link key={idx} to={item.to}>
                        <Box position="relative" padding="5px 7px">
                          <Text
                            fontWeight={'500'}
                            textDecoration="none"
                            fontSize="16px"
                            color={'brand.neutral700'}
                          >
                            {item.name}
                          </Text>
                          {item.new && (
                            <Box
                              rounded="full"
                              position="absolute"
                              height="15px"
                              width="15px"
                              backgroundColor="brand.primary"
                              right="-4px"
                              top="-2px"
                              zIndex={-1}
                            />
                          )}
                        </Box>
                      </Link>
                    )}
                  </>
                ))}
              </Box>
            ) : null}
            {shouldShowDashboardButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleProjectDashboardButtonPress}
              >
                Dashboard
              </ButtonComponent>
            ) : null}

            {shouldShowMyProjectsButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleMyProjectsButtonPress}
              >
                View my projects
              </ButtonComponent>
            ) : null}

            {shouldShowMyProjectButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleMyProjectButtonPress}
              >
                View my project
              </ButtonComponent>
            ) : null}

            {shouldShowProjectButton && (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleProjectButtonPress}
              >
                Project
              </ButtonComponent>
            )}

            {shouldShowProjectLaunchButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleProjectLaunchButtonPress}
              >
                Launch Your Project
              </ButtonComponent>
            ) : null}

            {shouldShowSignInButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="white"
                borderWidth={1}
                borderColor={'brand.neutral200'}
                onClick={loginOnOpen}
              >
                Connect
              </ButtonComponent>
            ) : null}

            {shouldShowDropdownMenuButton ? (
              <TopNavBarMenu
                shouldShowDashboardMenuItem={
                  shouldShowDashboardButtonInsideDropdownMenu
                }
                shouldShowMyProjectsMenuItem={
                  shouldShowMyProjectsButtonInsideDropdownMenu
                }
                shouldShowSignInMenuItem={
                  shouldShowSignInButtonInsideDropdownMenu
                }
                onDashboardSelected={handleProjectDashboardButtonPress}
                onMyProjectsSelected={handleMyProjectsButtonPress}
                onSignInSelected={loginOnOpen}
                onSignOutSelected={logout}
              />
            ) : null}
          </HStack>
        </HStack>
      </Box>

      <Modal isOpen={isLoginAlertModalOpen} onClose={onLoginAlertModalClose}>
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" padding="20px 15px">
          <ModalHeader>
            <Text fontSize="16px" fontWeight="normal">
              You have been logged out
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Please log back in with your profile, or press continue if you
              want to stay anonymous.
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              paddingTop="20px"
            >
              <ButtonComponent width="50%" mx={1} primary onClick={loginOnOpen}>
                Log In
              </ButtonComponent>
              <ButtonComponent
                width="50%"
                mx={1}
                onClick={onLoginAlertModalClose}
              >
                Continue
              </ButtonComponent>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          loginOnClose()
          onLoginAlertModalClose()
        }}
      />
    </>
  )
}
