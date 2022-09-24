import React, { useContext, useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ButtonComponent } from '../ui';
import { Logo } from './Logo';
import { Box, HStack } from '@chakra-ui/layout';
import { NavMenu } from './NavMenu';
import { isDarkMode, isMobileMode, isMediumScreen } from '../../utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { AuthModal } from '../molecules';
import { Avatar } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from '../../context';
import { getRandomOrb } from '../../utils';
import { useLocation, useHistory, useRouteMatch } from 'react-router';
import { customHistory } from '../../config';

const useStyles = createUseStyles({
  userInfo: {
    marginRight: '12px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
});

interface INavBar {
  showBorder: boolean;
  skipRoutes?: string[];
}

const customTitleRoutes = [
  '/projects/:projectId',
  '/projects/:projectId/entry',
  '/entry/:entryId',
];

export const NavBar = ({ showBorder, skipRoutes }: INavBar) => {
  const classes = useStyles();
  const isMobile = isMobileMode();
  const isMedium = isMediumScreen();
  const isDark = isDarkMode();

  const {
    user,
    getUser,
    logout,
    loginIsOpen,
    loginOnOpen,
    loginOnClose,
    navTitle,
  } = useContext(AuthContext);

  const { pathname, state } = useLocation<{
    loggedOut?: boolean;
    refresh?: boolean;
  }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  useEffect(() => {
    if (state && state.loggedOut) {
      logout();
      onOpen();
      customHistory.replace(customHistory.location.pathname, {});
    }

    if (state && state.refresh) {
      getUser();
      customHistory.replace(customHistory.location.pathname, {});
    }
  }, [state]);

  const routeMatch = customTitleRoutes
    .map((route) => useRouteMatch(route))
    .find((val) => val?.isExact)?.isExact;

  const handleLaunch = () => {
    history.push('/launch');
  };

  const handleProfileClick = () => {
    history.push(`/profile/${user.id}`);
  };

  if (skipRoutes) {
    let skip = false;
    skipRoutes.map((route: string) => {
      const match = useRouteMatch(route);
      if (match?.isExact) {
        skip = true;
      }
    });
    if (skip) {
      return null;
    }
  }

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        background={isDark ? 'brand.bgHeavyDarkMode' : 'rgba(252,252,252,0.9)'}
        borderBottom={
          showBorder
            ? '1px solid rgba(0,0,0,0)'
            : '1px solid rgba(233,233,233,0.9)'
        }
        boxSizing="border-box"
        position="fixed"
        backdropFilter="blur(2px)"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          margin={isMobile ? '9.5px 10px' : '9.5px 40px'}
        >
          <HStack spacing="25px" justifyContent="center" alignItems="center">
            <Logo mr={isMobile ? 0 : 5} />
          </HStack>
          {isMobile ? (
            <>
              {user.id ? (
                <ButtonComponent
                  className={classes.userInfo}
                  leftIcon={
                    <Avatar
                      left="-20px"
                      size="sm"
                      name={user.username}
                      src={
                        user.imageUrl ? user.imageUrl : getRandomOrb(user.id)
                      }
                    />
                  }
                  standard
                  onClick={handleProfileClick}
                  border={
                    history.location.pathname === `/profile/${user.id}`
                      ? '3px solid #20ECC7'
                      : '3px solid rgba(0, 0, 0, 0)'
                  }
                >
                  {user.username}
                </ButtonComponent>
              ) : (
                <ButtonComponent
                  standard
                  circular
                  marginRight="12px"
                  onClick={loginOnOpen}
                >
                  Connect
                </ButtonComponent>
              )}
              <NavMenu user={user} logout={logout} />
            </>
          ) : (
            <>
              {routeMatch && (
                <Box display="flex" alignItems="center">
                  <Text
                    fontSize="18px"
                    fontWeight={600}
                    color="brand.neutral900"
                  >
                    {navTitle}
                  </Text>
                </Box>
              )}
              <Box>
                {!['/', '/home', '/index', '/launch'].includes(
                  history.location.pathname,
                ) && (
                  <ButtonComponent
                    leftIcon={<AddIcon />}
                    primary
                    marginRight="12px"
                    onClick={handleLaunch}
                  >
                    Launch
                  </ButtonComponent>
                )}
                {user.id ? (
                  <ButtonComponent
                    border={
                      history.location.pathname === `/profile/${user.id}`
                        ? '3px solid #20ECC7'
                        : '3px solid rgba(0, 0, 0, 0)'
                    }
                    className={classes.userInfo}
                    leftIcon={
                      <Avatar
                        left="-20px"
                        size="sm"
                        name={user.username}
                        src={user.imageUrl}
                      />
                    }
                    standard
                    onClick={handleProfileClick}
                  >
                    {user.username}
                  </ButtonComponent>
                ) : (
                  <ButtonComponent marginRight="12px" onClick={loginOnOpen}>
                    Connect
                  </ButtonComponent>
                )}
                <NavMenu user={user} logout={logout} />
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
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
              <ButtonComponent width="50%" mx={1} onClick={onClose}>
                Continue
              </ButtonComponent>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AuthModal
        isOpen={loginIsOpen}
        onClose={() => {
          loginOnClose();
          onClose();
        }}
      />
    </>
  );
};
