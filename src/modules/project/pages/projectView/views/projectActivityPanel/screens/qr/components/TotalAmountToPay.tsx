import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../../../components/typography'
import { useBTCConverter } from '../../../../../../../../../helpers'
import { Satoshis } from '../../../../../../../../../types'
import { commaFormatted } from '../../../../../../../../../utils'
import { useFundingContext } from '../../../../../../../context'

/** Only to be used inside the funding context, after the fund mutation is initiated */
export const TotalAmountToPay = () => {
  const { t } = useTranslation()
  const { getUSDAmount } = useBTCConverter()

  const { project, fundingTx } = useFundingContext()

  if (!project || !project.name) return null

  return (
    <HStack w="full" justifyContent="center">
      <Body1 color="neutral.900" semiBold>
        {' '}
        {t('Pay')}:{' '}
      </Body1>
      <HStack>
        <Body1 color="neutral.900" xBold>
          {`${commaFormatted(fundingTx.amount)} sats`}
        </Body1>
        <Body1 color="neutral.700">{`($${commaFormatted(
          parseFloat(getUSDAmount(fundingTx.amount as Satoshis).toFixed(2)),
        )})`}</Body1>
      </HStack>
    </HStack>
  )
}
