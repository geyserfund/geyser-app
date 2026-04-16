import { Box, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { matchPath, Outlet, useLocation, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { getPath, PathName } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles'

import { DiscoveryBottomNav } from '../navigation/discoveryNav/DiscoveryBottomNav'

const LANDING_LAYOUT_PATTERNS = [
  { path: getPath('discoveryLanding'), end: true },
  { path: `${getPath('discoveryProjects')}/*`, end: false },
  { path: getPath('discoveryProjectCategory', PathName.categoryName), end: true },
  { path: getPath('discoveryProjectSubCategory', PathName.subCategoryName), end: true },
  { path: `${getPath('discoveryAllOrNothing')}/*`, end: false },
  { path: `${getPath('discoveryCampaigns')}/*`, end: false },
  { path: `${getPath('discoveryFundraisers')}/*`, end: false },
  { path: `${getPath('discoveryProducts')}/*`, end: false },
] as const

export const Discovery = () => {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuthContext()

  const usesLandingLayout = LANDING_LAYOUT_PATTERNS.some((pattern) => matchPath(pattern, pathname))
  const creatorRoute = getPath('discoveryCreator')
  const isCreatorRoute = pathname === creatorRoute || pathname.startsWith(`${creatorRoute}/`)
  const usesFullWidthLayout = usesLandingLayout || isCreatorRoute

  useEffect(() => {
    if (!usesLandingLayout || !user.heroId || searchParams.get('hero')) {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.set('hero', user.heroId)
    setSearchParams(nextSearchParams, { replace: true })
  }, [usesLandingLayout, user.heroId, searchParams, setSearchParams])

  return (
    <>
      {/* <DiscoverySideNav /> */}
      <VStack w="full" h="full">
        {usesFullWidthLayout ? (
          <Outlet />
        ) : (
          <Box
            w="100%"
            maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
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
