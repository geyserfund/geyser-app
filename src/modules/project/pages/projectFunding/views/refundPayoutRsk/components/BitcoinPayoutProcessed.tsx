import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type BitcoinPayoutProcessedProps = {
  isRefund?: boolean
  onClose: () => void
  refundTxId: string
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutProcessed: React.FC<BitcoinPayoutProcessedProps> = ({
  isRefund = false,
  onClose,
  refundTxId,
}) => {
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
      <VStack spacing={4} alignItems="center" w="full">
        <Body size="md" textAlign="center" color="neutral1.12">
          {t('Your payout has been successfully processed on-chain.')}
        </Body>

        <Body size="sm" textAlign="center" color="neutral1.10" lineHeight="1.5">
          {t(
            'On-chain transactions usually confirm within one hour, but can take longer depending on the current activity on the Bitcoin network. You can track the on-chain transaction',
          )}{' '}
          <Body as="span" textDecoration="underline" cursor="pointer" color="primary1.9">
            <Link href={`https://mempool.space/tx/${refundTxId}`} isExternal>
              {t('here')}
            </Link>
          </Body>
          .
        </Body>

        <Body size="sm" textAlign="center" color="neutral1.10">
          {t('You can safely close this modal.')}
        </Body>
      </VStack>

      {/* Action Button */}
      <Button w="full" maxW="300px" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
        {isRefund ? t('Close') : t('Go back to my project')}
      </Button>
    </VStack>
  )
}
