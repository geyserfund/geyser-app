import { Box, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { TransactionProcessingUrl } from '@/shared/constants/index.ts'

export const FiatSwapProcessing = () => {
  return (
    <VStack w="full" spacing={6}>
      <VStack spacing={2} w="full" maxWidth={'500px'}>
        <Box padding={5}>
          <Image maxHeight="150px" height="auto" width="auto" objectFit={'contain'} src={TransactionProcessingUrl} />
        </Box>
        <Body medium> {t('Processing your payment')}</Body>
        <Body size="sm" textAlign={'center'}>
          {t(
            'Our payment provider is processing your payment. You will be directed to the success screen as soon as your payment is processed.',
          )}
        </Body>
      </VStack>
    </VStack>
  )
}
