import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { commaFormatted } from '../../../../../../../utils'
import { useRefundedSwapData } from '../../../../../funding/state'

export const RefundSummary = () => {
  const { t } = useTranslation()
  const [refundedSwapData] = useRefundedSwapData()

  if (!refundedSwapData?.contributionInfo?.projectTitle) {
    return null
  }

  const { contributionInfo, fees, amount } = refundedSwapData

  return (
    <VStack w="full" alignItems="start">
      <Body size="lg" medium paddingBottom={4}>
        {t('Refund summary')}
      </Body>
      {contributionInfo?.projectTitle && (
        <HStack w="full" justifyContent="space-between">
          <Body>{t('Contribution to')}:</Body>
          <Body size="sm" light>
            {contributionInfo?.projectTitle}
          </Body>
        </HStack>
      )}
      {contributionInfo?.reference && (
        <HStack w="full" justifyContent="space-between" flexWrap={'wrap'}>
          <Body>{t('Reference')}:</Body>
          <Body size="sm" light>
            {contributionInfo?.reference}
          </Body>
        </HStack>
      )}
      {amount && (
        <HStack w="full" justifyContent="space-between">
          <Body>{t('Amount contributed')}:</Body>
          <Body size="sm" light>
            {commaFormatted(amount)}
          </Body>
        </HStack>
      )}
      {fees && (
        <HStack w="full" justifyContent="space-between">
          <Body>{t('Refund Transaction Fees')}:</Body>
          <Body size="sm" light>
            {commaFormatted(fees)} sats
          </Body>
        </HStack>
      )}
      {amount && fees && (
        <HStack w="full" justifyContent="space-between">
          <Body>{t('Total Refunded')}:</Body>
          <Body size="sm" light>
            {commaFormatted(amount - fees)} sats
          </Body>
        </HStack>
      )}
    </VStack>
  )
}
