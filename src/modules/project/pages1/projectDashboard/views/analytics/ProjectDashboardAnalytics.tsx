import { Stack, VStack } from '@chakra-ui/react'

import { DashboardLayout } from '../../common'
import { HistoricalComponent, InsightsHeader, InsightsStatsComponent, TransactionMethodComponent } from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'
import { TransactionRegionComponent } from './components/TransactionRegionComponent'

export const ProjectDashboardAnalytics = () => {
  return (
    <DashboardLayout>
      <VStack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        pt={{ base: '10px', lg: '20px' }}
        pb={{ base: '80px', lg: '60px' }}
        px={{ base: 0, lg: 6 }}
        spacing={6}
      >
        <InsightsHeader />
        <InsightsStatsComponent />
        <HistoricalComponent />
        <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
          <TransactionMethodComponent flex={1} />
          <TransactionRegionComponent flex={1} />
        </Stack>
        <RewardSoldComponent />
      </VStack>
    </DashboardLayout>
  )
}
