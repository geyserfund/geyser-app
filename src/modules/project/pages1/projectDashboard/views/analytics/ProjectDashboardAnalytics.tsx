import { Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { DashboardLayout } from '../../common'
import { HistoricalComponent, InsightsHeader, InsightsStatsComponent, TransactionMethodComponent } from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'
import { TransactionRegionComponent } from './components/TransactionRegionComponent'

export const ProjectDashboardAnalytics = () => {
  return (
    <DashboardLayout desktopTitle={t('Analytics')}>
      <VStack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        pb={{ base: '80px', lg: '60px' }}
        px={{ base: 0, lg: 6 }}
        spacing={6}
        marginTop="-48px"
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
