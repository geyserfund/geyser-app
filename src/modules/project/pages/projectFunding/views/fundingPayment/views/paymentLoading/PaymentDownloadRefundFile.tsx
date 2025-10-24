import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

export const PaymentDownloadRefundFile = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <VStack w="full" spacing={4}>
      <Body size="lg" bold alignSelf="start">
        {t('Download Refund File')}
      </Body>
    </VStack>
  )
}
