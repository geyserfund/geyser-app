import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'

import { REFUND_PROCESSED_IMAGE_URL } from '../constant.ts'

type LightningPayoutProcessedProps = {
  isRefund?: boolean
  onClose: () => void
}

/** LightningPayoutProcessed: Success screen for Lightning (off-chain) payout completion */
export const LightningPayoutProcessed: React.FC<LightningPayoutProcessedProps> = ({ isRefund = false, onClose }) => {
  return (
    <VStack w="full" spacing={6} alignItems="center">
      {/* Header */}
      <Body size="lg" medium textAlign="center">
        {t('Payout Processed')}
      </Body>

      {/* Illustration Placeholder */}
      <Box w="300px" h="300px">
        <Image src={REFUND_PROCESSED_IMAGE_URL} alt={'Get refund'} width="100%" height="100%" objectFit="cover" />
      </Box>

      {/* Success Message */}
      <Body size="md" textAlign="center" color="neutral1.12">
        {t('Your payout has been successfully processed.')}
      </Body>

      {/* Action Button */}
      <Button w="full" maxW="300px" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
        {isRefund ? t('Close') : t('Go back to my project')}
      </Button>
    </VStack>
  )
}
