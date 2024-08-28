import { useTranslation } from 'react-i18next'

import { getUSD } from '../common/helpers'
import { AccordionListItem } from './AccordionListItem'

export const OrderAmounts = ({
  amount,
  quote,
  affiliateFee,
}: {
  amount: number
  quote?: number
  affiliateFee?: number | null
}) => {
  const { t } = useTranslation()

  const items = []

  if (affiliateFee && affiliateFee !== null) {
    items.push({ label: `${t('Affiliate fee')} (sats)`, value: affiliateFee })
  }

  items.push({ label: `${t('Total')} (sats)`, value: amount })

  if (quote) {
    items.push({ label: t('Total'), value: getUSD(amount, quote) })

    items.push({ label: t('Bitcoin Price'), value: `$${quote}` })
  }

  return <AccordionListItem items={items} />
}
