import { Box, Button, HStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Link, matchPath, matchRoutes, useLocation } from 'react-router-dom'

import { PathName } from '../../../constants'
import { colors } from '../../../styles'
import {
  FeedNavIcon,
  GrantsNavIcon,
  HomeNavIcon2,
  LeaderboardNavIcon,
} from '../../icons'

const routesForShowingLandingMenu = [
  `/`,
  `/${PathName.discover}`,
  `/${PathName.grants}`,
  `/${PathName.grants}/roundone`,
  `/${PathName.grants}/roundtwo`,
]

const LandingNavItems = [
  {
    name: 'Home',
    Icon: HomeNavIcon2,
    path: '/',
  },
  {
    name: 'Projects',
    Icon: FeedNavIcon,
    path: '/discover',
  },
  {
    name: 'Projects',
    Icon: LeaderboardNavIcon,
    path: '/discover',
  },
  {
    name: 'Grants',
    Icon: GrantsNavIcon,
    path: '/grants',
  },
]

export const LandingNavBar = () => {
  const location = useLocation()

  const routeMatchesForShowingLandingMenu = matchRoutes(
    routesForShowingLandingMenu.map((val) => ({ path: val })),
    location,
  )

  const shouldShowLandingNav = useMemo(
    () =>
      routeMatchesForShowingLandingMenu?.some((routeMatch) =>
        Boolean(routeMatch),
      ),
    [routeMatchesForShowingLandingMenu],
  )

  const handleScrollUp = (path: string) => {
    const currentRoute = routeMatchesForShowingLandingMenu?.find((routeMatch) =>
      Boolean(routeMatch),
    )

    if (currentRoute?.pathname === path) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.scrollingElement?.scrollTo({ top: 0 })
    }
  }

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
          spacing="25%"
          position="fixed"
          bottom="0px"
          paddingBottom="2px"
        >
          {LandingNavItems.map(({ name, path, Icon }) => {
            const isActive = Boolean(matchPath(path, location.pathname))
            return (
              <Button
                as={Link}
                to={path}
                key={name}
                variant="ghost"
                onClick={() => handleScrollUp(path)}
                _hover={{}}
                _focus={{}}
              >
                <Icon
                  boxSize={8}
                  color={isActive ? 'black' : colors.neutral500}
                />
              </Button>
            )
          })}
        </HStack>
      </>
    )
  }

  return null
}
