import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFundingTxAtom } from '@/modules/project/funding/state'
import { Body } from '@/shared/components/typography'

import { useBTCConverter } from '../../../../../../../helpers'
import { Satoshis } from '../../../../../../../types'
import { commaFormatted } from '../../../../../../../utils'

/** Only to be used inside the funding context, after the fund mutation is initiated */
export const TotalAmountToPay = () => {
  const { t } = useTranslation()
  const { getUSDAmount } = useBTCConverter()

  const { fundingTx } = useFundingTxAtom()

  return (
    <HStack w="full" justifyContent="center">
      <Body light>{t(' Total to pay')}: </Body>

      <Body>
        {`${commaFormatted(fundingTx.amount)} `}

        <Body as="span" light>
          sats
        </Body>
      </Body>
      <Body light>{`($${commaFormatted(parseFloat(getUSDAmount(fundingTx.amount as Satoshis).toFixed(2)))})`}</Body>
    </HStack>
  )
}
