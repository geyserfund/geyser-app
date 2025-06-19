import { Box, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { Body } from '@/shared/components/typography/Body.tsx'
import { TransactionFailedImageUrl } from '@/shared/constants/index.ts'

import { fiatFailureReasonAtom } from '../atom/fiatSwapStatusAtom.ts'

export const FiatSwapFailed = () => {
  const fiatSwapFailureReason = useAtomValue(fiatFailureReasonAtom)
  return (
    <VStack w="full" spacing={6}>
      <VStack spacing={2} w="full" maxWidth={'500px'}>
        <Box padding={5}>
          <Image
            maxHeight="150px"
            height="auto"
            width="auto"
            objectFit={'contain'}
            src={TransactionFailedImageUrl}
            alt={'Transaction failed image'}
          />
        </Box>
        <Body medium> {t('Payment failed')}</Body>
        <Body size="sm" textAlign={'center'}>
          {t('Your payment failed. Please try again or contact support if the issue persists.')}
        </Body>
        <Body size="sm" textAlign={'center'}>
          {fiatSwapFailureReason}
        </Body>
      </VStack>
    </VStack>
  )
}
