import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getRootstockBlockscoutUrl } from '@/shared/utils/external/mempool.ts'
import { commaFormatted } from '@/utils/index.ts'

import { RefundProcessedImageUrl } from '../constant.ts'
import { PayoutStepLayout } from './PayoutStepLayout.tsx'

type RootstockPayoutProcessedProps = {
  hideAction?: boolean
  isRefund?: boolean
  onClose: () => void
  txId?: string
  /** Amount actually sent after any gas dust reservation, in sats */
  amountSentSats?: number
  gasDeducted?: boolean
}

/** RootstockPayoutProcessed: Success screen while waiting for Rootstock confirmations */
export const RootstockPayoutProcessed: React.FC<RootstockPayoutProcessedProps> = ({
  hideAction = false,
  isRefund = false,
  onClose,
  txId,
  amountSentSats,
  gasDeducted,
}) => {
  return (
    <PayoutStepLayout
      illustration={
        <Box w="300px" h="300px">
          <Image src={RefundProcessedImageUrl} alt={'Rootstock payout'} width="100%" height="100%" objectFit="cover" />
        </Box>
      }
      content={
        <VStack w="full" spacing={4} alignItems="center">
          <Body size="lg" medium textAlign="center">
            {t('Payout submitted')}
          </Body>

          <Body size="md" textAlign="center" color="neutral1.12">
            {t('Your Rootstock transfer has been broadcast. Waiting for network confirmations.')}
          </Body>

          {gasDeducted && typeof amountSentSats === 'number' && (
            <Body size="sm" textAlign="center" color="neutral1.10">
              {t('Network fees were reserved from your balance. Amount sent')}: {commaFormatted(amountSentSats)} sats.
            </Body>
          )}

          {txId && (
            <Body size="sm" textAlign="center" color="neutral1.10" lineHeight="1.5">
              {t('You can track the transaction')}{' '}
              <Body as="span" textDecoration="underline" cursor="pointer" color="primary1.9">
                <Link href={getRootstockBlockscoutUrl(txId)} isExternal>
                  {t('here')}
                </Link>
              </Body>
              .
            </Body>
          )}
        </VStack>
      }
      action={
        hideAction ? undefined : (
          <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
            {isRefund ? t('Close') : t('Go back to my project')}
          </Button>
        )
      }
    />
  )
}
