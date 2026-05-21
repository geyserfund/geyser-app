import { HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { bitcoinQuoteAtom } from '@/shared/state/btcRateAtom'
import type { BitcoinQuote } from '@/types/index.ts'

import { commaFormatted, convertAmount } from '../../../../../../../utils'

/** Only to be used inside the funding context, after the fund mutation is initiated */
export const TotalAmountToPay = ({
  amountDueSats,
  bitcoinQuote,
}: {
  amountDueSats: number
  bitcoinQuote?: BitcoinQuote | null
}) => {
  const { t } = useTranslation()

  const fallbackBitcoinQuote = useAtomValue(bitcoinQuoteAtom)

  const totalUsdCent = convertAmount.satsToUsdCents({
    sats: amountDueSats,
    bitcoinQuote: bitcoinQuote || fallbackBitcoinQuote,
  })

  return (
    <HStack w="full" justifyContent="center" sx={{ fontVariantNumeric: 'tabular-nums' }}>
      <Body light>{` ${t('Total to pay')}: `}</Body>

      <Body>
        {`${commaFormatted(amountDueSats)} `}

        <Body as="span" light>
          sats
        </Body>
      </Body>
      <Body light>
        {`($${(totalUsdCent / 100).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })})`}
      </Body>
    </HStack>
  )
}
