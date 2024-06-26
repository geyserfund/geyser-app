import { HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../components/typography'
import { commaFormatted } from '../../../../../utils'
import { useRefundedSwapData } from '../../../funding/state'
import { FeedbackCard } from '../../projectView/views/projectActivityPanel/screens/qr/views/onchain/components'

export const RefundSummary = () => {
  const { t } = useTranslation()
  const [refundedSwapData] = useRefundedSwapData()

  if (!refundedSwapData?.contributionInfo?.projectTitle) {
    return null
  }

  const { contributionInfo, fees, amount } = refundedSwapData

  return (
    <FeedbackCard w="full" noIcon noborder bgColor="neutral.50" title={t('Refund summary')}>
      {contributionInfo?.projectTitle && (
        <HStack w="full" justifyContent="space-between">
          <Body2 color="neutral.900">{t('Contribution to')}:</Body2>
          <Body1 color="neutral.700">{contributionInfo?.projectTitle}</Body1>
        </HStack>
      )}
      {contributionInfo?.reference && (
        <HStack w="full" justifyContent="space-between" flexWrap={'wrap'}>
          <Body2 color="neutral.900">{t('Reference')}:</Body2>
          <Body1 color="neutral.700">{contributionInfo?.reference}</Body1>
        </HStack>
      )}
      {amount && (
        <HStack w="full" justifyContent="space-between">
          <Body2 color="neutral.900">{t('Amount contributed')}:</Body2>
          <Body1 color="neutral.700">{commaFormatted(amount)}</Body1>
        </HStack>
      )}
      {fees && (
        <HStack w="full" justifyContent="space-between">
          <Body2 color="neutral.900">{t('Refund Transaction Fees')}:</Body2>
          <Body1 color="neutral.700">{commaFormatted(fees)} sats</Body1>
        </HStack>
      )}
      {amount && fees && (
        <HStack w="full" justifyContent="space-between">
          <Body2 color="neutral.900">{t('Total Refunded')}:</Body2>
          <Body1 color="neutral.700">{commaFormatted(amount - fees)} sats</Body1>
        </HStack>
      )}
    </FeedbackCard>
  )
}
