import { Button, Popover, PopoverContent, PopoverTrigger, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { useMobileMode } from '@/utils/index.ts'

import { DashboardLayout } from '../../common'
import { HistoricalComponent, InsightsHeader, InsightsStatsComponent, TransactionMethodComponent } from './components'
import { RewardSoldComponent } from './components/RewardSoldComponent'
import { TransactionRegionComponent } from './components/TransactionRegionComponent'

export const ProjectDashboardAnalytics = () => {
  return (
    <DashboardLayout titleRightComponent={<AnalyticsInfoPopover />} desktopTitle={t('Analytics')}>
      <VStack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        pb={{ base: 28, lg: 10 }}
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

export const AnalyticsInfoPopover = () => {
  const isMobile = useMobileMode()

  return (
    <Popover trigger={isMobile ? 'click' : 'hover'}>
      <PopoverTrigger>
        <Button variant="ghost" _hover={{}} _active={{}} _focus={{}}>
          <PiInfo size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent background="utils.pbg" paddingX={2} paddingY={1} maxWidth="350px">
        <Body size="sm">
          {t(
            'The project views are tracked with SimpleAnalytics, a privacy-first analytics tool. Actual numbers are likely higher.',
          )}
        </Body>
      </PopoverContent>
    </Popover>
  )
}
