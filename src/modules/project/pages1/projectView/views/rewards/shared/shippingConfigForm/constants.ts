import { t } from 'i18next'

import { ProjectShippingConfigType } from '@/types/index.ts'

export const ProjectShippingConfigTypeOptions = [
  {
    label: t('Flat Rate'),
    description: t('One fee, regardless of quantity'),
    value: ProjectShippingConfigType.Flat,
    info: [
      t(
        "Best for small, lightweight items where shipping cost doesn't change with quantity. eg: stickers, keychains, etc.",
      ),
      t('Calculation: If 1 item = $10,   then 2+ items = $10'),
    ],
  },
  {
    label: t('Per Unit'),
    description: t('Multiply fee by number of items'),
    value: ProjectShippingConfigType.PerUnit,
    info: [
      t('Ideal when each item adds to the shipping cost. eg: laptops, books, etc.'),
      t('Calculation: If 1 item = $10,   then 2+ items = $20'),
    ],
  },
  {
    label: t('Incremental'),
    description: t('Base fee + extra charge per additional item'),
    value: ProjectShippingConfigType.Incremental,
    info: [
      t(
        'Great for items where shipping a few costs the same, but bulk adds extra fees. Set a base price, then add a small fee per item to balance the cost. eg: small electronics, apparel, etc.',
      ),
      t('Calculation: If 1 item = $10, increment rate = $2, then 2 items = $10 + (1×2) = $12'),
    ],
  },
]
