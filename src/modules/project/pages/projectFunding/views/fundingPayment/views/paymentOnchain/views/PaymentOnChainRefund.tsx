import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiHandCoins, PiWarning } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { currentSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { commaFormatted } from '@/utils'

import { RefundPolicyNote } from '../../../components/RefundPolicyNote'
import { TransactionFailed } from '../components'
import { ClaimRefundForm } from '../components/ClaimRefundForm'
import { DownloadRefundButton } from '../components/DownloadRefundButton'
import { onChainErrorAtom } from '../states/onChainErrror.ts'
import { extractValuesFromError } from '../utils/parseError'

export const PaymentOnChainRefund = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project } = useFundingFormAtom()

  const onChainError = useAtomValue(onChainErrorAtom)
  const refundFile = useAtomValue(currentSwapAtom)

  const errorMessage = useMemo(() => {
    if (!onChainError) return

    switch (onChainError.status) {
      case 'transaction.lockupFailed': {
        const values = extractValuesFromError(onChainError.failureReason || '')

        if (values.locked && values.expected) {
          if (values.locked < values.expected) {
            return `Amount received ${commaFormatted(values.locked)} sats was less than expected ${commaFormatted(
              values.expected,
            )} sats`
          }

          return `Amount received ${commaFormatted(values.locked)} sats was more than expected ${commaFormatted(
            values.expected,
          )} sats`
        }

        return 'Transaction amount was not enough to cover the invoice'
      }

      case 'invoice.failedToPay':
        return 'Failed to pay invoice'
      case 'swap.expired':
        return 'Transaction has expired no payment detected'
      default:
        return onChainError.failureReason || 'Transaction failed'
    }
  }, [onChainError])

  const handleRefundSuccess = () => {
    navigate(
      { pathname: getPath('fundingPaymentOnchainRefundInitiated', project.name), search: location.search },
      { replace: true },
    )
  }

  return (
    <VStack w="full" spacing={6}>
      <TransactionFailed error={errorMessage} />
      <Feedback variant={FeedBackVariant.NEUTRAL} icon={<PiHandCoins fontSize="24px" />}>
        <VStack w="full" alignItems={'start'}>
          <Body size="lg" medium>
            {t('Claim refund')}
          </Body>
          <ClaimRefundForm refundFile={refundFile} showUpload={!refundFile} onSuccess={handleRefundSuccess} />
        </VStack>
      </Feedback>

      <Feedback variant={FeedBackVariant.WARNING} icon={<PiWarning fontSize="24px" />}>
        <VStack alignItems="start">
          <Body size="lg" medium>
            {t('Do not close this window')}
          </Body>
          <Body size="sm">
            <strong>{t('Download and securely store your Refund File.')}</strong>{' '}
            {t(
              'If you did so, and you have determined that you do not wish to proceed with a refund at this moment, it is completely safe for you to close this window',
            )}
          </Body>
        </VStack>
      </Feedback>

      <VStack spacing={0}>
        <DownloadRefundButton width="310px" size="lg" variant="surface" colorScheme="primary1" />
        <RefundPolicyNote />
      </VStack>
    </VStack>
  )
}
