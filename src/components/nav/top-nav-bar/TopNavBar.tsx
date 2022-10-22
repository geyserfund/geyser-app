import React, { useContext, useEffect, useMemo } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { NavBarLogo } from '../NavBarLogo';
import { Box } from '@chakra-ui/layout';
import { TopNavBarMenu } from './TopNavBarMenu';
import { isMobileMode } from '../../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { AuthContext } from '../../../context';
import { useLocation, useHistory, useRouteMatch, match } from 'react-router';
import { customHistory } from '../../../config';
import { AuthModal } from '../../molecules';
import { ButtonComponent } from '../../ui';
import { getPath, routerPathNames } from '../../../constants';

const routesForHidingTopNav = [
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
];

const customTitleRoutes = [
  `/${routerPathNames.projects}/:projectId/`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.entry}/:entryId`,
];

const routesForHidingDropdownMenu = [
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
];

const routesForHidingMyProjectsButton = [
  `/${routerPathNames.project}/:projectId`,
  `/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.projectDashboard}`,
];

const routesForEnablingSignInButton = [
  getPath('index'),
  getPath('landingPage'),
  getPath('projectDiscovery'),
  getPath('grants'),
  getPath('notFound'),
  getPath('notAuthorized'),
  `/${routerPathNames.userProfile}/:userId`,
  `/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
];

const routesForEnablingProjectLaunchButton = [
  getPath('index'),
  getPath('landingPage'),
  getPath('grants'),
  getPath('projectDiscovery'),
];

/**
 * "Container" component for elements and appearance of
 * the top navigation bar.
 */
export const TopNavBar = () => {
  const isMobile = isMobileMode();
  const history = useHistory();

  const currentProjectRouteMatch: match<Record<string, any>> | null =
    useRouteMatch(`/${routerPathNames.projects}/:projectId/`);

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure();

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
  } = useContext(AuthContext);

  const { state } = useLocation<{
    loggedOut?: boolean;
    refresh?: boolean;
  }>();

  const routeMatchesForHidingTopNav = routesForHidingTopNav.map(useRouteMatch);

  const routeMatchesForEnablingSignInButton =
    routesForEnablingSignInButton.map(useRouteMatch);

  const routeMatchesForHidingDropdownMenu =
    routesForHidingDropdownMenu.map(useRouteMatch);

  const routeMatchesForHidingMyProjectsButton =
    routesForHidingMyProjectsButton.map(useRouteMatch);

  const routesMatchesForEnablingProjectLaunchButton =
    routesForEnablingProjectLaunchButton.map(useRouteMatch);

  const routesMatchesForShowingCustomTitle =
    customTitleRoutes.map(useRouteMatch);

  useEffect(() => {
    if (state && state.loggedOut) {
      logout();
      onLoginAlertModalOpen();

      customHistory.replace(customHistory.location.pathname, {});
    }

    if (state && state.refresh) {
      queryCurrentUser();
      customHistory.replace(customHistory.location.pathname, {});
    }
  }, [state]);

  const handleProjectLaunchButtonPress = () => {
    history.push(getPath('publicProjectLaunch'));
  };

  const handleMyProjectsButtonPress = () => {
    history.push(getPath('userProfile', user.id));
  };

  const handleProjectDashboardButtonPress = () => {
    const projectName = currentProjectRouteMatch?.params?.projectId;

    if (projectName) {
      history.push(getPath('projectDashboard', projectName));
    } else {
      history.push(getPath('landingPage'));
    }
  };

  const isViewingOwnProject: boolean = useMemo(() => {
    return (
      (history.location.pathname.startsWith(`/${routerPathNames.entry}`) ||
        history.location.pathname.startsWith(`/${routerPathNames.project}`) ||
        history.location.pathname.startsWith(`/${routerPathNames.projects}`)) &&
      navigationContext.projectOwnerId === user.id
    );
  }, [user.id, navigationContext.projectOwnerId, history.location.pathname]);

  const shouldTopNavBeHidden: boolean = useMemo(() => {
    return routeMatchesForHidingTopNav.some((routeMatch) => {
      return (routeMatch as match)?.isExact;
    });
  }, [routeMatchesForHidingTopNav]);

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
        return (routeMatch as match)?.isExact;
      })
    );
  }, [routeMatchesForEnablingSignInButton, isLoggedIn, isMobile]);

  const shouldShowSignInButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isLoggedIn === false &&
      isMobile === true &&
      routeMatchesForEnablingSignInButton.some((routeMatch) => {
        return (routeMatch as match)?.isExact;
      })
    );
  }, [routeMatchesForEnablingSignInButton, isLoggedIn, isMobile]);

  /**
   * Logic:
   *  - Available to all not logged-in users without a profile inside
   *  - Available to all logged-in users with profile inside
   *  - Viewable to all users at all times except when: Creating a Project + Entry
   */
  const shouldShowDropdownMenuButton: boolean = useMemo(() => {
    return routeMatchesForHidingDropdownMenu.every((routeMatch) => {
      return Boolean(routeMatch) === false;
    });
  }, [routeMatchesForHidingDropdownMenu]);

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
      isViewingOwnProject
    );
  }, [isMobile, isLoggedIn, isUserAProjectCreator, isViewingOwnProject]);

  const shouldShowDashboardButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject
    );
  }, [isMobile, isLoggedIn, isUserAProjectCreator, isViewingOwnProject]);

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
        return Boolean(routeMatch) === false;
      })
    );
  }, [
    routeMatchesForHidingMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
  ]);

  const shouldShowMyProjectsButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      isViewingOwnProject === false &&
      routeMatchesForHidingMyProjectsButton.every((routeMatch) => {
        return Boolean(routeMatch) === false;
      })
    );
  }, [
    routeMatchesForHidingMyProjectsButton,
    isMobile,
    isLoggedIn,
    isUserAProjectCreator,
    isViewingOwnProject,
  ]);

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
        return (routeMatch as match)?.isExact;
      })
    );
  }, [
    routesMatchesForEnablingProjectLaunchButton,
    isLoggedIn,
    isUserAProjectCreator,
  ]);

  /**
   * Logic:
   *  - Shown for creators on the project creation flow pages.
   */
  const shouldShowCustomTitle: boolean = useMemo(() => {
    return routesMatchesForShowingCustomTitle.some((routeMatch) => {
      return (routeMatch as match)?.isExact;
    });
  }, [routesMatchesForShowingCustomTitle]);

  if (shouldTopNavBeHidden) {
    return null;
  }

  return (
    <>
      <Box
        bg={useColorModeValue('brand.bgWhite', 'brand.bgDark')}
        px={4}
        borderBottom={'1px solid'}
        borderBottomColor={'brand.bgGrey3'}
        backdropFilter="blur(2px)"
        position="fixed"
        top={0}
        left={0}
        width="full"
        zIndex={1000}
      >
        <HStack
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          overflow="hidden"
        >
          <NavBarLogo marginRight={isMobile ? 0 : 5} />

          {shouldShowCustomTitle ? (
            <Heading as={'h3'} noOfLines={1} size="sm">
              {navigationContext.title}
            </Heading>
          ) : null}

          <HStack alignItems={'center'} spacing={2}>
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
                My Projects
              </ButtonComponent>
            ) : null}

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
          loginOnClose();
          onLoginAlertModalClose();
        }}
      />
    </>
  );
};
