import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { dimensions } from '../../constants'
import { useMobileMode } from '../../utils'
import { GradientBanner } from './components'
import { TabBar } from './components/TabBar'
import { Filters } from './filters'
import { ProjectsView } from './projectsView'

export const LandingPage = () => {
  const isMobile = useMobileMode()
  return (
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
        marginTop="50px"
        width="100%"
        justifyContent="center"
        alignItems="start"
        spacing={{ base: '30px', xl: '50px' }}
        paddingX="30px"
      >
        {!isMobile && (
          <Filters width="full" minWidth="220px" maxWidth="320px" />
        )}

        <VStack
          flex={1}
          maxWidth="800px"
          minWidth={{ base: '100%', md: '400px' }}
        >
          <TabBar />
          <ProjectsView />
        </VStack>

        {!isMobile && (
          <VStack
            width="full"
            minWidth="220px"
            maxWidth="320px"
            border="1px solid black"
          >
            <Text>Project leaderboard</Text>
          </VStack>
        )}
      </HStack>
    </Box>
  )
}
