import { Box, HStack, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { dimensions } from '../../constants'
import { FilterProvider } from '../../context'
import { useMobileMode } from '../../utils'
import { GradientBanner } from './components'
import { TabBar } from './components/TabBar'
import { Filters } from './filters'
import { ProjectLeaderboard } from './projectLeaderboard'

export const LandingPage = () => {
  const isMobile = useMobileMode()
  return (
    <FilterProvider>
      <Box
        marginTop={`-${dimensions.topNavBar.desktop.height}px`}
        position="relative"
        width="100%"
        minHeight="100%"
        height="auto"
        overflowX="hidden"
      >
        <GradientBanner />
        <HStack
          marginTop={{ base: '30px', md: '50px' }}
          width="100%"
          justifyContent="center"
          alignItems="start"
          spacing={{ base: '30px', xl: '3%' }}
          paddingX={{ base: '10px', lg: '20px' }}
        >
          {!isMobile && (
            <Filters flex={1} width="full" minWidth="220px" maxWidth="320px" />
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
            <ProjectLeaderboard flex={1} minWidth="220px" maxWidth="320px" />
          )}
        </HStack>
      </Box>
    </FilterProvider>
  )
}
