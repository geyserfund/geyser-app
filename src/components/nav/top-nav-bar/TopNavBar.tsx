import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Flex,
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
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { defaultUser } from '../../../defaults';
import { USER_PROFILE_QUERY } from '../../../graphql';
import { IUserProfile } from '../../../interfaces';
import { getPath, routerPathNames } from '../../../constants';

// TODO: Leverage strongly-typed constants for these.
const customTitleRoutes = [
  '/projects/:projectId',
  '/projects/:projectId/entry',
  '/entry/:entryId',
];

// TODO: Leverage strongly-typed constants for these.
const routesForHidingDropdownMenu = [
  '/projects/:projectId/entry',
  '/projects/:projectId/entry/:entryId',
  '/projects/:projectId/entry/:entryId/preview',
];

// TODO: Leverage strongly-typed constants for these.
const routesForHidingDashboardButton = ['/projects/:projectId/dashboard/'];

const routesForEnablingSignInButton = [
  getPath('index'),
  getPath('landingPage'),
  routerPathNames.projectDiscovery,
  routerPathNames.grants,
  routerPathNames.notFound,
  routerPathNames.notAuthorized,
  routerPathNames.userProfile,
  `/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/preview`,
];

const routesForEnablingProjectLaunchButton = ['/', '/discover', '/grants'];

/**
 * "Container" component for elements and appearance of
 * the top navigation bar.
 */
export const TopNavBar = () => {
  const isMobile = isMobileMode();
  const history = useHistory();

  const {
    isOpen: isLoginAlertModalOpen,
    onOpen: onLoginAlertModalOpen,
    onClose: onLoginAlertModalClose,
  } = useDisclosure();

  const {
    isLoggedIn,
    getUser,
    logout,
    isAuthModalOpen,
    loginOnOpen,
    loginOnClose,
    navigationContext,
  } = useContext(AuthContext);

  const params = useParams<{ userId: string }>();

  const [getUserData, { data }] = useLazyQuery(USER_PROFILE_QUERY);

  const { state } = useLocation<{
    loggedOut?: boolean;
    refresh?: boolean;
  }>();

  const routeMatchesForEnablingSignInButton =
    routesForEnablingSignInButton.map(useRouteMatch);

  const routeMatchesForHidingDropdownMenu =
    routesForHidingDropdownMenu.map(useRouteMatch);

  const routeMatchesForHidingDashboardButton =
    routesForHidingDashboardButton.map(useRouteMatch);

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
      getUser();
      customHistory.replace(customHistory.location.pathname, {});
    }
  }, [state]);

  // TODO: This should be abstracted to its own hook and reused here and
  // in pages/Profile.tsx
  const [userProfile, setUserProfile] = useState<IUserProfile>({
    ...defaultUser,
    contributions: [],
    ownerOf: [],
  });

  // TODO: This should be abstracted to its own hook and reused here and
  // in pages/Profile.tsx
  useEffect(() => {
    if (params.userId) {
      const variables = {
        where: {
          id: params.userId,
        },
      };
      getUserData({ variables });
    }
  }, [params]);

  // TODO: This should be abstracted to its own hook and reused here and
  // in pages/Profile.tsx
  useEffect(() => {
    if (data && data.user) {
      const user = data.user as IUserProfile;
      setUserProfile(user);
    }
  }, [data]);

  const handleProjectLaunchButtonPress = () => {
    history.push('/launch');
  };

  const handleDashboardButtonPress = () => {
    history.push(`${customHistory.location.pathname}/dashboard`);
  };

  /**
   * Logic:
   *  - Available to all not logged-in users.
   *  - Viewable in:
   *    - Landing + Discovery Grant Pages
   *    - Other's Project + Entry page
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
    return (
      routeMatchesForHidingDropdownMenu.some((routeMatch) => {
        return Boolean(routeMatch);
      }) === false
    );
  }, [routeMatchesForHidingDropdownMenu]);

  const isUserAProjectCreator: boolean = useMemo(() => {
    return userProfile.ownerOf.length > 0;
  }, [userProfile]);

  /**
   * Logic:
   *  - Available to a logged-in creator of a live or draft project.
   *  - Viewable almost everywhere. It does not appear when a
   *    creator is looking at another user's Project Page or Entry Page.
   *  - Hidden on Mobile -- it will be in the menu dropdown instead.
   */
  const shouldShowDashboardButton: boolean = useMemo(() => {
    return (
      isMobile === false &&
      isLoggedIn &&
      isUserAProjectCreator &&
      routeMatchesForHidingDashboardButton.some((routeMatch) => {
        return Boolean(routeMatch);
      }) === false &&
      navigationContext.projectOwnerId !== userProfile.id
    );
  }, [
    routeMatchesForHidingDashboardButton,
    isMobile,
    isLoggedIn,
    navigationContext,
  ]);

  const shouldShowDashboardButtonInsideDropdownMenu: boolean = useMemo(() => {
    return (
      isMobile === true &&
      isLoggedIn &&
      isUserAProjectCreator &&
      routeMatchesForHidingDashboardButton.some((routeMatch) => {
        return Boolean(routeMatch);
      }) === false &&
      navigationContext.projectOwnerId !== userProfile.id
    );
  }, [
    routeMatchesForHidingDashboardButton,
    isMobile,
    isLoggedIn,
    navigationContext,
  ]);

  /**
   * Logic:
   *  - Available to all logged-in users
   *  - Viewable in the profile page and in the menu.
   */
  const shouldShowProjectLaunchButton: boolean = useMemo(() => {
    return (
      isLoggedIn &&
      routesMatchesForEnablingProjectLaunchButton.some((routeMatch) => {
        return (routeMatch as match)?.isExact;
      })
    );
  }, [routesMatchesForEnablingProjectLaunchButton, isLoggedIn]);

  /**
   * Logic:
   *  - Shown for creators on the project creation flow pages.
   */
  const shouldShowCustomTitle: boolean = useMemo(() => {
    return routesMatchesForShowingCustomTitle.some((routeMatch) => {
      return (routeMatch as match)?.isExact;
    });
  }, [routesMatchesForShowingCustomTitle]);

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
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <NavBarLogo marginRight={isMobile ? 0 : 5} />

          {shouldShowCustomTitle ? (
            <Heading as={'h3'} isTruncated={isMobile} noOfLines={1}>
              {navigationContext.title}
            </Heading>
          ) : null}

          <HStack alignItems={'center'} spacing={2}>
            {shouldShowDashboardButton ? (
              <ButtonComponent
                variant={'solid'}
                fontSize="md"
                backgroundColor="brand.primary400"
                onClick={handleDashboardButtonPress}
              >
                Dashboard
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
                userProfile={userProfile}
                isUserAProjectCreator={isUserAProjectCreator}
                shouldShowDashboardMenuItem={
                  shouldShowDashboardButtonInsideDropdownMenu
                }
                shouldShowSignInMenuItem={
                  shouldShowSignInButtonInsideDropdownMenu
                }
                onDashboardSelected={handleDashboardButtonPress}
                onSignInSelected={loginOnOpen}
                onSignOutSelected={logout}
              />
            ) : null}
          </HStack>
        </Flex>
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
