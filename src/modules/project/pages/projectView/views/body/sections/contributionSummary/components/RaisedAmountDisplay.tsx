import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { ReactNode } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'

type RaisedAmountDisplayProps = {
  amount: ReactNode
  usdAmount: ReactNode
}

export const RaisedAmountDisplay = ({ amount, usdAmount }: RaisedAmountDisplayProps) => (
  <VStack display="flex" justifyContent="center" alignItems="start" spacing={0}>
    <Body size="2xl" bold dark lineHeight={1} sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {amount}
    </Body>
    <Body size="md" light display="inline">
      <Body as="span" dark medium sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {usdAmount}
      </Body>{' '}
      {t('raised')}
    </Body>
  </VStack>
)
