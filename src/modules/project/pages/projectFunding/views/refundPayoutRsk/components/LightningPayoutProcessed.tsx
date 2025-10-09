import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

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
      <CardLayout
        w="full"
        maxW="300px"
        h="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="neutral1.3"
        borderColor="neutral1.6"
      >
        <Body size="md" color="neutral1.11">
          {t('Illustration')}
        </Body>
      </CardLayout>

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
