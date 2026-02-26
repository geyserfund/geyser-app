import { Box, Button, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'

import { RefundProcessedImageUrl } from '../constant.ts'

type LightningPayoutProcessedProps = {
  isRefund?: boolean
  invoiceId?: string
  onClose: () => void
}

/** LightningPayoutProcessed: Success screen for Lightning (off-chain) payout completion */
export const LightningPayoutProcessed: React.FC<LightningPayoutProcessedProps> = ({
  isRefund = false,
  invoiceId,
  onClose,
}) => {
  return (
    <VStack w="full" spacing={6} alignItems="center">
      {/* Header */}
      <Body size="lg" medium textAlign="center">
        {t('Payout sent')}
      </Body>

      {/* Illustration Placeholder */}
      <Box w="300px" h="300px">
        <Image src={RefundProcessedImageUrl} alt={'Get refund'} width="100%" height="100%" objectFit="cover" />
      </Box>

      {/* Success Message */}
      <Body size="md" textAlign="center" color="neutral1.12">
        {t('Payout has been sent.')} {t('You should be receiving it shortly.')}
      </Body>
      {invoiceId && (
        <Body size="sm" textAlign="center" color="neutral1.10">
          {t('Payout Invoice Id:')} {invoiceId}
        </Body>
      )}

      {/* Action Button */}
      <Button w="full" maxW="300px" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
        {isRefund ? t('Close') : t('Go back to my project')}
      </Button>
    </VStack>
  )
}
