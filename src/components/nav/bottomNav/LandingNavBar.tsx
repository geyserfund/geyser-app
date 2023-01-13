import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { Link, match, useRouteMatch } from 'react-router-dom';
import { colors, fonts, routerPathNames } from '../../../constants';

const routesForShowingLandingMenu = [
  `/`,
  `/${routerPathNames.discover}`,
  `/${routerPathNames.grants}`,
];

const LandingNavItems = [
  {
    name: 'Home',
    Icon: BiHomeAlt,
    path: '/',
  },
  {
    name: 'Projects',
    Icon: RiLightbulbFlashLine,
    path: '/discover',
  },
  {
    name: 'Grants',
    Icon: FaHandHoldingUsd,
    path: '/grants',
  },
];

export const LandingNavBar = () => {
  const routeMatchesForShowingLandingMenu =
    routesForShowingLandingMenu.map(useRouteMatch);
  const shouldShowLandingNav: boolean = useMemo(() => {
    return routeMatchesForShowingLandingMenu.some((routeMatch) => {
      return (routeMatch as match)?.isExact;
    });
  }, [routeMatchesForShowingLandingMenu]);

  const handleScrollUp = () => {
    document.scrollingElement?.scrollTo({ top: 0 });
  };

  if (shouldShowLandingNav) {
    return (
      <>
        <Box height="60px" width="100%"></Box>
        <HStack
          backgroundColor="brand.neutral50"
          width="100%"
          height="60px"
          borderTop="2px solid"
          borderTopColor="brand.neutral200"
          paddingX="15%"
          justifyContent="center"
          alignItems="center"
          spacing="40px"
          position="fixed"
          bottom="0px"
        >
          {LandingNavItems.map(({ name, path, Icon }) => {
            const isActive = useRouteMatch(path)?.isExact;
            console.log('checking isActive', useRouteMatch(path));
            return (
              <Link key={name} to={path} onClick={handleScrollUp}>
                <VStack spacing="0px">
                  <Icon
                    fontSize="20px"
                    color={isActive ? 'black' : colors.neutral500}
                  />
                  <Text
                    fontFamily={fonts.mono}
                    color={isActive ? 'black' : colors.neutral600}
                  >
                    {name}
                  </Text>
                </VStack>
              </Link>
            );
          })}
        </HStack>
      </>
    );
  }

  return null;
};
