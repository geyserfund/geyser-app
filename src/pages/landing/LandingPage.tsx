import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { dimensions } from '../../constants'
import { GradientBanner } from './components'
import { TabBar } from './components/TabBar'
import { Filters } from './filters'
import { ProjectsView } from './projectsView'

export const LandingPage = () => {
  return (
    <Box
      marginTop={`-${dimensions.topNavBar.desktop.height}px`}
      position="relative"
      width="full"
      height="full"
    >
      <GradientBanner />
      <HStack
        marginTop="50px"
        width="100%"
        justifyContent="center"
        alignItems="start"
        spacing="80px"
      >
        <Filters />

        <VStack flex={1} maxWidth="800px">
          <TabBar />
          <ProjectsView />
        </VStack>

        <VStack>
          <Text>Project leaderboard</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
