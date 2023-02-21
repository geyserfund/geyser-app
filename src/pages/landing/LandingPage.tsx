import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { dimensions } from '../../constants'
import { GradientBanner } from './components'
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
      <HStack width="100%" justifyContent="center" spacing="80px">
        <VStack>
          <Text>Filters</Text>
        </VStack>

        <VStack flex={1} maxWidth="800px">
          <ProjectsView />
        </VStack>

        <VStack>
          <Text>Project leaderboard</Text>
        </VStack>
      </HStack>
    </Box>
  )
}
