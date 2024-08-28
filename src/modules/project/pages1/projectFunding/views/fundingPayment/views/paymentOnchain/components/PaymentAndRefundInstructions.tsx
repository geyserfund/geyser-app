import { Button, Divider, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { PiDownloadSimple, PiWarning } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { useMobileMode } from '@/utils'

import { RefundPolicyNote } from '../../../components/RefundPolicyNote'
import { useDownloadRefund } from '../hooks/useDownloadRefund'

export const PaymentAndRefundInstructions = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING} icon={<PiWarning fontSize={'24px'} />}>
        <VStack w="full" alignItems="start">
          <Body size="lg" medium>
            {t('Payment & refund instructions')}
          </Body>
          <Body size="sm">
            <Trans
              i18nKey={
                '<0>Send the exact payment amount in Satoshis</0> to ensure successful processing and avoid payment being rejected.'
              }
            >
              <strong>{'Send the exact payment amount in Satoshis'}</strong>
              {' to ensure successful processing and avoid payment being rejected.'}
            </Trans>
          </Body>
          <Divider />
          <Body size="sm">
            <Trans
              i18nKey={
                '<0>Set the transaction fee to medium or high</0> and adjust the fee rate in satoshis per byte (sat/B) to ensure your swap processes within 24 hours.'
              }
            >
              <strong>{'Set the transaction fee to medium or high'}</strong>
              {' and adjust the fee rate in satoshis per byte (sat/B) to ensure your swap processes within 24 hours.'}
            </Trans>
          </Body>
          <Divider />
          <Body size="sm">
            <Trans
              i18nKey={'<0>Download and securely store your Refund File;</0> if in doubt, re-download to ensure its'}
            >
              <strong>{'Download and securely store your Refund File;'}</strong>
              {' if in doubt, re-download to ensure its'}
            </Trans>
          </Body>
        </VStack>
      </Feedback>
      <VStack w="full">
        <Button
          size="lg"
          variant="surface"
          colorScheme="primary1"
          minWidth="310px"
          rightIcon={<PiDownloadSimple />}
          onClick={handleClick}
        >
          {t('Download refund file')}
        </Button>
        <RefundPolicyNote />
      </VStack>
    </>
  )
}
