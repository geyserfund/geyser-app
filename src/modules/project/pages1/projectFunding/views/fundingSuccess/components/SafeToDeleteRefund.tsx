import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { historyRouteAtom } from '@/config/routes'
import { Body } from '@/shared/components/typography'
import { PathName } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

export const SafeToDeleteRefund = () => {
  const historyRoutes = useAtomValue(historyRouteAtom)

  const isComingFromOnChain = historyRoutes[historyRoutes.length - 1]?.includes(PathName.fundingPaymentOnchain)

  if (!isComingFromOnChain) {
    return null
  }

  return (
    <Feedback variant={FeedBackVariant.INFO}>
      <VStack alignItems={'start'}>
        <Body size="lg" medium>
          {t('Safe to delete refund file')}
        </Body>
        <Body size="sm">
          {t('The Refund File is safe to delete, as your transaction has been successfully processed.')}
        </Body>
      </VStack>
    </Feedback>
  )
}
