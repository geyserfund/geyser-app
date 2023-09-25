import { Stack, VStack } from '@chakra-ui/react'

import {
  ContributorsComponent,
  LearnComponent,
  OverviewHeader,
  StatsComponent,
} from './components'

export const ProjectCreatorOverview = () => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt="20px"
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing="40px"
    >
      <VStack w="full" spacing="20px">
        <OverviewHeader />
        <StatsComponent />
        <ContributorsComponent />
        {/* <ActivityComponent /> */}
      </VStack>
      <VStack
        maxWidth={{ base: '100%', lg: '350px' }}
        width="100%"
        alignItems="start"
      >
        <LearnComponent />
      </VStack>
    </Stack>
  )
}
