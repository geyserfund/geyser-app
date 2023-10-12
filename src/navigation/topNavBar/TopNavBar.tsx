import { useDisclosure } from '@chakra-ui/hooks'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Link,
  Location,
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { SideNavIcon } from '../../components/icons'
import { AuthModal } from '../../components/molecules'
import { NavBarLogo } from '../../components/nav/NavBarLogo'
import { platformRoutes } from '../../config'
import { useSetMatchRoutes } from '../../config/routes/routesAtom'
import { getPath, ID, PathName } from '../../constants'
import { useAuthContext, useNavContext } from '../../context'
import { useLayoutAnimation, useScrollDirection } from '../../hooks'
import { useProjectSideNavAtom } from '../../pages/projectView/projectNavigation/sideNav'
import { useMobileMode } from '../../utils'
import { useProfileSideNavAtom } from '../profileRightSideNav'
import { TopNavBarMenu } from '../topNarBarMenu/TopNavBarMenu'
import { ProjectTitle } from './components/ProjectTitle'
import { useRouteMatchesForTopNavBar } from './topNavBarAtom'

const navItems = [
  {
    name: 'Projects',
    to: '/',
    disableFor: ['/'],
  },
  {
    name: 'Grants',
    to: getPath('grants'),
    disableFor: [getPath('grants')],
    new: false,
  },
  {
    name: 'About',
    to: getPath('about'),
  },
]

/**
 * "Container" component for elements and appearance of
 * the top navigation bar.
 */
export const TopNavBar = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()
  const navigate = useNavigate()

  const location: Location & {
    state: {
      loggedOut?: boolean
      refresh?: boolean
    }
  } = useLocation()

  const { state } = location

  const matchRoutesData = matchRoutes(platformRoutes, location)
  const setMatchRoutes = useSetMatchRoutes()
  const changeProfileSideNavAtom = useProfileSideNavAtom()[1]

  useEffect(() => {
    if (matchRoutesData) {
      setMatchRoutes(matchRoutesData)
    }
  }, [matchRoutesData, setMatchRoutes])

  const [_, changeProjectSideNavOpen] = useProjectSideNavAtom()

  const currentPathName = location.pathname

  const currentProjectRouteMatch = matchPath(
    `/${PathName.project}/:projectId/`,
    currentPathName,
  )

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure()

  const { navData } = useNavContext()

  const {
    user,
    isLoggedIn,
    queryCurrentUser,
    logout,
    isUserAProjectCreator,
    isAuthModalOpen,
    loginOnOpen,
    loginOnClose,
  } = useAuthContext()

  const {
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
  } = useRouteMatchesForTopNavBar()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      currentProjectRouteMatch?.params?.projectId || navData.projectName
    navigate(getPath('project', projectName))
  }

  const isViewingOwnProject: boolean = useMemo(() => {
    return (
      (currentPathName.startsWith(`/${PathName.entry}`) ||
        currentPathName.startsWith(
          `/${PathName._deprecatedPathNameForProject}`,
        ) ||
        currentPathName.startsWith(`/${PathName.project}`)) &&
      navData.projectOwnerIDs.includes(Number(user.id))
    )
  }, [user.id, navData.projectOwnerIDs, currentPathName])

  const userHasOnlyOneProject: boolean = useMemo(
    () => user && user.ownerOf && user.ownerOf.length === 1,
    [user],
  )

  const shouldShowProjectButton: boolean = useMemo(() => {
    return !isMobile && showProjectButton && Boolean(navData)
  }, [showProjectButton, isMobile, navData])
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
    return isLoggedIn === false && isMobile === false && showSignInButton
  }, [showSignInButton, isLoggedIn, isMobile])

  /**
   * Logic:
   *  - Available to all not logged-in users without a profile inside
   *  - Available to all logged-in users with profile inside
   *  - Viewable to all users at all times except when: Creating a Project + Entry
   */
  const shouldShowDropdownMenuButton = !hideDropdownMenu

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
      hideMyProjectsButton === false &&
      !userHasOnlyOneProject
    )
  }, [
    hideMyProjectsButton,
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
      hideMyProjectsButton === false &&
      userHasOnlyOneProject
    )
  }, [
    hideMyProjectsButton,
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
      showProjectLaunchButton
    )
  }, [showProjectLaunchButton, isLoggedIn, isUserAProjectCreator])

  /**
   * Logic:
   *  - Shown for creators on the project creation flow pages.
   */
  const shouldShowCustomTitle: boolean = useMemo(() => {
    return showCustomTitle && Boolean(navData)
  }, [showCustomTitle, navData])

  const shouldShowNavItems: boolean = useMemo(() => {
    return showNavItems && isMobile === false
  }, [showNavItems, isMobile])

  const { scrollTop } = useScrollDirection({
    elementId: isMobile ? '' : ID.root,
    initialValue: true,
  })
  const showHaveTransparentBackground: boolean = useMemo(() => {
    return scrollTop <= 50 && showTransparentBackground
  }, [showTransparentBackground, scrollTop])

  const shouldShowLeftSideMenuButton: boolean = useMemo(() => {
    return showLeftSideMenuButton && isMobile === true
  }, [showLeftSideMenuButton, isMobile])

  const className = useLayoutAnimation()

  if (hideTopNavBar) {
    return null
  }

  return (
    <>
      <Box
        bg={showHaveTransparentBackground ? 'transparent' : 'neutral.0'}
        px={{ base: '10px', lg: '20px' }}
        position="fixed"
        width="full"
        top={0}
        left={0}
        zIndex={1000}
        borderBottom="2px solid"
        borderBottomColor={
          showHaveTransparentBackground ? 'transparent' : 'neutral.100'
        }
        transition="background 0.5s ease-out"
      >
        <HStack
          className={className}
          paddingY="10px"
          alignItems="center"
          justifyContent="start"
          position="relative"
        >
          {shouldShowLeftSideMenuButton ? (
            <IconButton
              aria-label="left-side-menu-button"
              icon={<SideNavIcon />}
              onClick={changeProjectSideNavOpen}
              size="sm"
              variant="ghost"
            />
          ) : (
            <NavBarLogo
              small={isMobile && shouldShowCustomTitle}
              marginRight={isMobile ? 0 : 5}
              color={showHaveTransparentBackground ? 'primary.900' : undefined}
              flexGrow={0}
              textAlign="left"
            />
          )}
          {shouldShowCustomTitle ? <ProjectTitle /> : <Box flexGrow={1} />}

          <HStack alignItems={'center'} spacing={2} flexGrow={0}>
            {shouldShowNavItems ? (
              <Box display={'flex'} alignItems="center" gap={4} mr={4}>
                {navItems.map((item) => {
                  if (item.name === 'About') {
                    return (
                      <a key={item.to} href={item.to}>
                        <Text
                          fontWeight={'500'}
                          textDecoration="none"
                          fontSize="16px"
                          color={'neutral.700'}
                        >
                          {t(item.name)}
                        </Text>
                      </a>
                    )
                  }

                  if (item.disableFor?.includes(location.pathname)) {
                    return null
                  }

                  return (
                    <Link key={item.to} to={item.to}>
                      <Box position="relative" padding="5px 7px">
                        <Text
                          fontWeight={'500'}
                          textDecoration="none"
                          fontSize="16px"
                          color={'neutral.700'}
                        >
                          {t(item.name)}
                        </Text>
                        {item.new && (
                          <Box
                            rounded="full"
                            position="absolute"
                            height="15px"
                            width="15px"
                            backgroundColor="primary.400"
                            right="-4px"
                            top="-2px"
                            zIndex={-1}
                          />
                        )}
                      </Box>
                    </Link>
                  )
                })}
              </Box>
            ) : null}

            {shouldShowMyProjectsButton ? (
              <Button
                variant={'primary'}
                size="sm"
                onClick={handleMyProjectsButtonPress}
              >
                {t('View my projects')}
              </Button>
            ) : null}

            {shouldShowMyProjectButton ? (
              <Button
                variant={'primary'}
                size="sm"
                onClick={handleMyProjectButtonPress}
              >
                {t('View my project')}
              </Button>
            ) : null}

            {shouldShowProjectButton && (
              <Button
                variant={'primary'}
                size="sm"
                onClick={handleProjectButtonPress}
              >
                {t('Project')}
              </Button>
            )}

            {shouldShowProjectLaunchButton ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleProjectLaunchButtonPress}
              >
                {t('Launch Your Project')}
              </Button>
            ) : null}

            {shouldShowSignInButton ? (
              <Button
                size="sm"
                variant="secondary"
                borderWidth={1}
                onClick={loginOnOpen}
              >
                {t('Login')}
              </Button>
            ) : null}

            {shouldShowDropdownMenuButton ? (
              !isMobile ? (
                <TopNavBarMenu />
              ) : (
                <Button
                  padding="5px 8px"
                  aria-label="options"
                  transition="all 0.2s"
                  maxHeight="32px"
                  borderRadius="md"
                  data-testid="topnavbar-dropdown-menu"
                  color="neutral.1000"
                  backgroundColor="neutral.0"
                  _hover={{ backgroundColor: 'neutral.100' }}
                  border={'1px'}
                  borderColor="neutral.200"
                  onClick={changeProfileSideNavAtom}
                >
                  {isLoggedIn ? (
                    <Avatar
                      height="22px"
                      width="22px"
                      src={user.imageUrl || ''}
                    />
                  ) : (
                    <HamburgerIcon color="neutral.500" fontSize="22px" />
                  )}
                </Button>
              )
            ) : null}
          </HStack>
        </HStack>
      </Box>

      <Modal isOpen={isLoginAlertModalOpen} onClose={onLoginAlertModalClose}>
        <ModalOverlay />
        <ModalContent display="flex" alignItems="center" padding="20px 15px">
          <ModalHeader>
            <Text fontSize="16px" fontWeight="normal">
              {t('You have been logged out')}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {t(
                'Please log back in with your profile, or press continue if want to stay anonymous.',
              )}
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              paddingTop="20px"
            >
              <Button
                variant="primary"
                width="50%"
                mx={1}
                onClick={loginOnOpen}
              >
                {t('Login')}
              </Button>
              <Button
                variant="primaryNeutral"
                width="50%"
                mx={1}
                onClick={onLoginAlertModalClose}
              >
                {t('Continue')}
              </Button>
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
