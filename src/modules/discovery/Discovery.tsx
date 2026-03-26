import { Box, VStack } from '@chakra-ui/react'
import { matchPath, Outlet, useLocation } from 'react-router'

import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath, PathName } from '@/shared/constants'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'

const LANDING_LAYOUT_PATTERNS = [
  { path: getPath('discoveryLanding'), end: true },
  { path: getPath('discoveryProjectCategory', PathName.categoryName), end: true },
  { path: getPath('discoveryProjectSubCategory', PathName.subCategoryName), end: true },
  { path: `${getPath('discoveryAllOrNothing')}/*`, end: false },
  { path: `${getPath('discoveryCampaigns')}/*`, end: false },
  { path: `${getPath('discoveryFundraisers')}/*`, end: false },
  { path: `${getPath('discoveryProducts')}/*`, end: false },
] as const

export const Discovery = () => {
  const { pathname } = useLocation()

  const usesLandingLayout = LANDING_LAYOUT_PATTERNS.some((pattern) => matchPath(pattern, pathname))

  return (
    <>
      {/* <DiscoverySideNav /> */}
      <VStack w="full" h="full">
        {usesLandingLayout ? (
          <Outlet />
        ) : (
          <Box
            w="100%"
            maxWidth={`${dimensions.maxWidth + 24 * 2}`}
            position="relative"
            paddingX={standardPadding}
            paddingBottom={{ base: 28, lg: 10 }}
          >
            <Outlet />
            <UserExternalLinksComponent />
          </Box>
        )}
      </VStack>

      <DiscoveryBottomNav />
    </>
  )
}
