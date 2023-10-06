import { Stack, VStack } from '@chakra-ui/react'

import { MobileDivider } from '../../../../grants/components'
import {
  HistoricalComponent,
  InsightsHeader,
  InsightsStatsComponent,
  TransactionMethodComponent,
} from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'
import { TransactionRegionComponent } from './components/TransactionRegionComponent'

export const ProjectCreatorInsights = () => {
  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt="20px"
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <InsightsHeader />
      <InsightsStatsComponent />
      <MobileDivider />
      <HistoricalComponent />
      <MobileDivider />
      <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
        <TransactionMethodComponent flex={1} />
        <MobileDivider />
        <TransactionRegionComponent flex={1} />
      </Stack>
      <MobileDivider />
      <RewardSoldComponent />
    </VStack>
  )
}
