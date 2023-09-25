import { Stack, VStack } from '@chakra-ui/react'

import {
  HistoricalComponent,
  InsightsHeader,
  InsightsStatsComponent,
} from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'

export const ProjectCreatorInsights = () => {
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
        <InsightsHeader />
        <InsightsStatsComponent />
        <HistoricalComponent />
        <RewardSoldComponent />
        {/* <StatsComponent />
        <ContributorsComponent /> */}
        {/* <ActivityComponent /> */}
      </VStack>
    </Stack>
  )
}
