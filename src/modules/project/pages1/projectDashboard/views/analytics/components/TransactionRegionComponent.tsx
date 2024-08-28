import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts'
import { H3 } from '@/shared/components/typography'

import { FundingRegionsPieChart } from '../elements'
import { useStatsInsightsAtom } from '../insightsAtom'

export const TransactionRegionComponent = (props: CardLayoutProps) => {
  const { t } = useTranslation()

  const [{ regions }] = useStatsInsightsAtom()

  return (
    <VStack w="full" alignItems={'start'}>
      <H3 size="xl" medium>
        {t('Funding by region')}
      </H3>
      <CardLayout padding={{ base: 3, lg: 6 }} w="full" {...props}>
        <FundingRegionsPieChart data={regions} />
      </CardLayout>
    </VStack>
  )
}
