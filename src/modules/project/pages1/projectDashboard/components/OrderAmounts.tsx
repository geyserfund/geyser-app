import { useTranslation } from 'react-i18next'

import { getUSD } from '../common/helpers'
import { AccordionListItem } from './AccordionListItem'

export const OrderAmounts = ({ amount, quote }: { amount: number; quote?: number }) => {
  const { t } = useTranslation()

  const items = []

  items.push({ label: `${t('Total')} (sats)`, value: amount })

  if (quote) {
    items.push({ label: t('Total'), value: getUSD(amount, quote) })

    items.push({ label: t('Bitcoin Price'), value: `$${quote}` })
  }

  return <AccordionListItem items={items} />
}
