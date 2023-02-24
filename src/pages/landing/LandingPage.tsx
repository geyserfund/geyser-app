import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { dimensions } from '../../constants'
import { useFilterStates } from '../../hooks/state'
import { useMobileMode } from '../../utils'
import { GradientBanner } from './components'
import { TabBar } from './components/TabBar'
import { Filters } from './filters'
import { ProjectsView } from './projectsView'

export const LandingPage = () => {
  const isMobile = useMobileMode()
  const [filters, updateFilter] = useFilterStates()
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
        paddingX={{ base: '10px', lg: '20px' }}
      >
        {!isMobile && (
          <Filters
            {...{ filters, updateFilter }}
            flex={1}
            width="full"
            minWidth="220px"
            maxWidth="320px"
          />
        )}

        <VStack
          flex={2}
          maxWidth="800px"
          minWidth={{ base: '100%', md: '400px', xl: '800px' }}
          paddingBottom="40px"
        >
          <TabBar />
          <ProjectsView {...{ filters, updateFilter }} />
        </VStack>

        {!isMobile && (
          <VStack
            flex={1}
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
