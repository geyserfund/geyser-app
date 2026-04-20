import { useMutation } from '@apollo/client'
import { Button, HStack, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ReactNode, useMemo, useState } from 'react'

import { AccountKeys } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { SwapData } from '@/modules/project/funding/state/swapAtom.ts'
import { MUTATION_PAYMENT_SWAP_REFUND_TX_BROADCAST } from '@/modules/project/graphql/mutation/TxBroadcastMutation.ts'
import { useRefund } from '@/modules/project/pages/projectFunding/views/fundingPayment/views/paymentOnchain/hooks/useRefund.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useNotification } from '@/utils/index.ts'

import { BitcoinPayoutForm } from '../../refundPayoutRsk/components/BitcoinPayoutForm.tsx'
import { BitcoinPayoutProcessed } from '../../refundPayoutRsk/components/BitcoinPayoutProcessed.tsx'
import { PayoutProgressSidebar, PayoutProgressStep } from '../../refundPayoutRsk/components/PayoutProgressSidebar.tsx'
import {
  BitcoinPayoutFormData,
  usePayoutWithBitcoinForm,
} from '../../refundPayoutRsk/hooks/usePayoutWithBitcoinForm.ts'

type PaymentAttemptRefundModalProps = {
  isOpen: boolean
  onClose: () => void
  amount: number
  paymentId?: string | bigint
  paymentUuid?: string
  refundFile?: SwapData
  onCompleted?: () => void | Promise<void>
}

type PaymentAttemptRefundStage = 'setup' | 'processing' | 'completed'

const getPaymentAttemptRefundSteps = (stage: PaymentAttemptRefundStage): PayoutProgressStep[] => [
  {
    title: t('Enter refund address'),
    description: t('Enter the Bitcoin address where you want to receive your refund.'),
    status: stage === 'setup' ? 'current' : 'complete',
  },
  {
    title: t('Process refund'),
    description: t('We prepare and broadcast your refund transaction.'),
    status: stage === 'processing' ? 'current' : stage === 'completed' ? 'complete' : 'upcoming',
  },
  {
    title: t('Refund sent'),
    description: t('Your on-chain refund has been submitted successfully.'),
    status: stage === 'completed' ? 'complete' : 'upcoming',
  },
]

export const PaymentAttemptRefundModal = ({
  isOpen,
  onClose,
  amount,
  paymentId,
  paymentUuid,
  refundFile,
  onCompleted,
}: PaymentAttemptRefundModalProps) => {
  const toast = useNotification()
  const { initiateRefundToGetRefundTx } = useRefund()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [refundTxId, setRefundTxId] = useState<string>()
  const [paymentSwapRefundTxBroadcast] = useMutation(MUTATION_PAYMENT_SWAP_REFUND_TX_BROADCAST)
  const normalizedPaymentId = typeof paymentId === 'bigint' ? paymentId.toString() : paymentId

  const refundFileAccountKeys = refundFile?.privateKey
    ? ({
        derivationPath: '',
        address: refundFile.address,
        privateKey: refundFile.privateKey,
        publicKey: refundFile.publicKey,
      } as AccountKeys)
    : undefined

  const bitcoinForm = usePayoutWithBitcoinForm(async (data: BitcoinPayoutFormData, accountKeys: AccountKeys) => {
    if (!refundFile || !data.bitcoinAddress || !normalizedPaymentId) {
      return
    }

    const nextRefundFile: SwapData = {
      ...refundFile,
      privateKey: refundFile.privateKey || accountKeys.privateKey,
      publicKey: refundFile.publicKey || accountKeys.publicKey,
      address: refundFile.address || accountKeys.address,
    }

    setIsSubmitting(true)

    try {
      const signedTxHex = await initiateRefundToGetRefundTx(data.bitcoinAddress, nextRefundFile)

      if (!signedTxHex) {
        return
      }

      const { data: broadcastData } = await paymentSwapRefundTxBroadcast({
        variables: {
          input: {
            paymentId: normalizedPaymentId,
            signedTxHex,
          },
        },
      })

      if (!broadcastData?.paymentSwapRefundTxBroadcast.success) {
        throw new Error('Failed to broadcast refund transaction')
      }

      setRefundTxId(broadcastData.paymentSwapRefundTxBroadcast.txHash || nextRefundFile.refundTx)
      setIsProcessed(true)
    } catch (error) {
      toast.error({
        title: t('Something went wrong'),
        description: t('Please try again'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }, refundFileAccountKeys)

  const progressSteps = useMemo<PayoutProgressStep[]>(() => {
    if (isProcessed) {
      return getPaymentAttemptRefundSteps('completed')
    }

    if (isSubmitting) {
      return getPaymentAttemptRefundSteps('processing')
    }

    return getPaymentAttemptRefundSteps('setup')
  }, [isProcessed, isSubmitting])

  const handleClose = () => {
    setIsSubmitting(false)
    setIsProcessed(false)
    setRefundTxId(undefined)
    bitcoinForm.form.reset({
      bitcoinAddress: '',
      accountPassword: '',
    })
    onClose()
  }

  const handleCompleted = async () => {
    try {
      await onCompleted?.()
    } catch (error) {
      toast.error({
        title: t('Something went wrong'),
        description: t('Please refresh the page and try again.'),
      })
    } finally {
      handleClose()
    }
  }

  function renderModalContent(params: {
    title?: ReactNode
    subtitle?: ReactNode
    description?: ReactNode
    content: ReactNode
    footer?: ReactNode
  }) {
    const { title, subtitle, description, content, footer } = params

    return (
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={6} align="stretch" w="full">
        <PayoutProgressSidebar amount={amount} steps={progressSteps} label={t('Pending refund')} />
        <VStack flex={1} spacing={4} align="stretch" minH="100%">
          {(title || subtitle || description) && (
            <VStack spacing={2} align="stretch">
              {title && (
                <Body as="h2" size="2xl" bold color="neutral1.12">
                  {title}
                </Body>
              )}
              {subtitle && (
                <Body size="md" bold color="neutral1.12">
                  {subtitle}
                </Body>
              )}
              {description && (
                <Body size="md" color="neutral1.10">
                  {description}
                </Body>
              )}
            </VStack>
          )}
          <VStack flex={1} spacing={4} align="stretch">
            {content}
          </VStack>
          {footer}
        </VStack>
      </Stack>
    )
  }

  if (isProcessed) {
    return (
      <Modal isOpen={isOpen} onClose={handleCompleted} size="4xl" contentProps={{ maxW: '980px' }}>
        {renderModalContent({
          title: t('Refund Processed (On-Chain)'),
          content: <BitcoinPayoutProcessed isRefund={true} refundTxId={refundTxId} onClose={handleCompleted} />,
        })}
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" bodyProps={{ gap: 4 }} contentProps={{ maxW: '980px' }}>
      {renderModalContent({
        title: t('Enter your refund address'),
        subtitle: paymentUuid ? (
          <HStack spacing={2} align="center">
            <Body size="md" color="neutral1.12">
              <Body as="span" bold color="neutral1.12">
                {t('Payment ID')}:
              </Body>{' '}
              {paymentUuid}
            </Body>
          </HStack>
        ) : undefined,
        description: t(
          'Enter the Bitcoin address where you want to receive your refund and authorize the transaction.',
        ),
        content: (
          <>
            <BitcoinPayoutForm
              form={bitcoinForm.form}
              satsAmount={amount}
              disablePassword={Boolean(refundFile?.privateKey)}
              disableBitcoinAddress={false}
              showBitcoinAddress={true}
            />
          </>
        ),
        footer: (
          <Button
            w="full"
            size="lg"
            colorScheme="primary1"
            variant="solid"
            isLoading={isSubmitting}
            isDisabled={!refundFile || !normalizedPaymentId || !bitcoinForm.enableSubmit}
            onClick={bitcoinForm.handleSubmit}
          >
            {t('Initiate refund')}
          </Button>
        ),
      })}
    </Modal>
  )
}
