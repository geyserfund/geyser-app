import { useTranslation } from 'react-i18next'

import {
  CardLayout,
  CardLayoutProps,
} from '../../../../../../components/layouts'
import { H3 } from '../../../../../../components/typography'
import { FundingRegionsPieChart } from '../elements'
import { useStatsInsightsAtom } from '../insightsAtom'

export const TransactionRegionComponent = (props: CardLayoutProps) => {
  const { t } = useTranslation()

  const [{ regions }] = useStatsInsightsAtom()

  return (
    <CardLayout
      direction="column"
      padding={{ base: '0px', lg: '20px' }}
      w="full"
      alignItems="start"
      spacing="10px"
      mobileDense
      {...props}
    >
      <H3>{t('Funding regions')}</H3>
      <FundingRegionsPieChart data={regions} />
    </CardLayout>
  )
}
