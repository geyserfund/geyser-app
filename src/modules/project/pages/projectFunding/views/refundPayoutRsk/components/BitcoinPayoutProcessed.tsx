import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getMempoolSpaceUrl } from '@/shared/utils/external/mempool.ts'

import { TransactionClaimedImageUrl } from '../constant.ts'
import { PayoutStepLayout } from './PayoutStepLayout.tsx'

type BitcoinPayoutProcessedProps = {
  isRefund?: boolean
  onClose: () => void
  refundTxId?: string
}

/** BitcoinPayoutProcessed: Success screen for Bitcoin on-chain payout completion */
export const BitcoinPayoutProcessed: React.FC<BitcoinPayoutProcessedProps> = ({
  isRefund = false,
  onClose,
  refundTxId,
}) => {
  return (
    <PayoutStepLayout
      illustration={
        <Box w="300px" h="300px">
          <Image src={TransactionClaimedImageUrl} alt={'Get refund'} width="100%" height="100%" objectFit="cover" />
        </Box>
      }
      content={
        <VStack spacing={4} alignItems="center" w="full">
          {refundTxId && (
            <Body size="sm" textAlign="center" color="neutral1.10" lineHeight="1.5">
              {t('You can track the on-chain transaction')}{' '}
              <Body as="span" textDecoration="underline" cursor="pointer" color="primary1.9">
                <Link href={getMempoolSpaceUrl(refundTxId)} isExternal>
                  {t('here')}
                </Link>
              </Body>
              .
            </Body>
          )}
        </VStack>
      }
      action={
        <Button w="full" size="lg" colorScheme="neutral1" variant="outline" onClick={onClose}>
          {isRefund ? t('Close') : t('Go back to my project')}
        </Button>
      }
    />
  )
}
