import { useTranslation } from 'react-i18next'

import { H3 } from '../../../../../../../../../components/typography'
import { CardLayout, CardLayoutProps } from '../../../../../../../../../shared/components/layouts'
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
      <H3>{t('Funding received by region')}</H3>
      <FundingRegionsPieChart data={regions} />
    </CardLayout>
  )
}
