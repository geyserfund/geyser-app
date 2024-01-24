import { useTranslation } from 'react-i18next'

import { AccordionListItem } from './AccordionListItem'
import { getUSD } from './helpers'

export const OrderAmounts = ({
  amount,
  quote,
}: {
  amount: number
  quote?: number
}) => {
  const { t } = useTranslation()

  const items = []

  if (quote) {
    items.push({ label: t('Total'), value: getUSD(amount, quote) })
    items.push({ label: t('Total (Sats)'), value: amount })
    items.push({ label: t('Bitcoin Price'), value: `$${quote}` })
  } else {
    items.push({ label: t('Total (Sats)'), value: amount })
  }

  return <AccordionListItem items={items} />
}
