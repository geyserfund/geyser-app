import { HStack, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { StickToTop } from '../../components/layouts'
import { dimensions, ID } from '../../constants'
import {
  ActivitySubscriptionProvider,
  FilterProvider,
  useAuthContext,
} from '../../context'
import { useMobileMode } from '../../utils'
import { GradientBanner } from './components'
import { TabBar } from './components/TabBar'
import { Filters } from './filters'
import { ProjectLeaderboard } from './projectLeaderboard'

export const LandingPage = () => {
  const isMobile = useMobileMode()
  const { isLoggedIn } = useAuthContext()

  return (
    <FilterProvider isLoggedIn={isLoggedIn}>
      <ActivitySubscriptionProvider>
        <VStack
          marginTop={`-${dimensions.topNavBar.desktop.height}px`}
          position="relative"
          width="100%"
          minHeight="100%"
          height="auto"
          overflowX="hidden"
          spacing={{ base: '30px', md: '50px' }}
        >
          <GradientBanner />
          <HStack
            width="100%"
            justifyContent="center"
            alignItems="start"
            spacing={{ base: '30px', xl: '3%' }}
            paddingX={{ base: '10px', lg: '20px' }}
          >
            {!isMobile && (
              <VStack
                id={ID.landing.filters.wrapper}
                flex={1}
                width="full"
                minWidth="220px"
                maxWidth="320px"
              >
                <StickToTop
                  id={ID.landing.filters.body}
                  scrollContainerId={ID.root}
                  wrapperId={ID.landing.filters.wrapper}
                  width="100%"
                  offset={dimensions.topNavBar.desktop.height + 20}
                  bias={20}
                  buffer={10}
                >
                  <Filters />
                </StickToTop>
              </VStack>
            )}

            <VStack
              flex={2}
              maxWidth="800px"
              minWidth={{ base: '100%', md: '400px', xl: '800px' }}
              paddingBottom="40px"
            >
              {!isMobile && <TabBar />}
              <Outlet />
            </VStack>

            {!isMobile && (
              <VStack
                id={ID.landing.leaderboard.wrapper}
                flex={1}
                width="full"
                minWidth="220px"
                maxWidth="320px"
              >
                <StickToTop
                  id={ID.landing.leaderboard.body}
                  scrollContainerId={ID.root}
                  wrapperId={ID.landing.leaderboard.wrapper}
                  width="100%"
                  offset={dimensions.topNavBar.desktop.height + 20}
                  bias={20}
                  buffer={10}
                >
                  <ProjectLeaderboard
                    maxHeight={`${
                      window.innerHeight -
                      dimensions.topNavBar.desktop.height -
                      40
                    }px`}
                    overflowY="auto"
                  />
                </StickToTop>
              </VStack>
            )}
          </HStack>
        </VStack>
      </ActivitySubscriptionProvider>
    </FilterProvider>
  )
}

export default LandingPage
