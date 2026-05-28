import { Button, Divider, HStack, Input, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiFile, PiHandCoins, PiKey } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { currentSwapAtom, RefundFileType, SwapData } from '@/modules/project/funding/state/swapAtom.ts'
import {
  decryptSwapRecoveryMetadata,
  hasSwapRecoveryMetadata,
  parseRecoveryKey,
} from '@/modules/project/funding/utils/recoveryKey.ts'
import { PaymentAttemptRefundModal } from '@/modules/project/pages/projectFunding/views/refund/components/PaymentAttemptRefundModal.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import {
  PaymentStatus,
  PaymentType,
  ProjectFundingStrategy,
  usePaymentRecoveryByContributionLazyQuery,
} from '@/types/index.ts'
import { useNotification } from '@/utils'

import { getPath } from '../../../../../../../shared/constants'
import { commaFormatted } from '../../../../../../../utils'
import { currentSwapIdAtom, swapAtom, SwapContributionInfo } from '../../../../../funding/state'
import { RefundPolicyNote } from '../../fundingPayment/components/RefundPolicyNote'
import { ClaimRefundForm } from '../../fundingPayment/views/paymentOnchain/components/ClaimRefundForm'
import { RefundFileInput } from '../../fundingPayment/views/paymentOnchain/components/RefundFileInput.tsx'
import { RefundRsk } from '../../refundPayoutRsk/RefundRsk.tsx'

export const RefundFilePage = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const navigate = useNavigate()

  const [swapData] = useAtom(swapAtom)
  const [currentSwapId, setCurrentSwapId] = useAtom(currentSwapIdAtom)
  const [currentSwapData, setCurrentSwapData] = useAtom(currentSwapAtom)

  const [recoveryKey, setRecoveryKey] = useState('')
  const [recoveryError, setRecoveryError] = useState('')
  const [isRecovering, setIsRecovering] = useState(false)
  const [recoveredPayment, setRecoveredPayment] = useState<{
    amount: number
    fundingStrategy?: ProjectFundingStrategy | null
    recoveryCode: string
    paymentId: string
    paymentUuid: string
    swapId: string
  }>()

  const transactionFailedRefund = useModal()
  const pledgeRefund = useModal()
  const paymentAttemptRefund = useModal()

  const [fetchPaymentRecovery] = usePaymentRecoveryByContributionLazyQuery({
    fetchPolicy: 'network-only',
  })

  const handleSuccess = () => {
    transactionFailedRefund.onClose()
    paymentAttemptRefund.onClose()
    navigate(getPath('refundInitiated'))
  }

  const swapArray = Object.values(swapData).filter((swap) => swap.id)
  const hasRefundFile = swapArray.length > 0
  const currentRecoveredPayment = recoveredPayment?.swapId === currentSwapId ? recoveredPayment : undefined

  const handleContinue = () => {
    if (currentRecoveredPayment?.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
      paymentAttemptRefund.onOpen()
      return
    }

    if (currentSwapData?.type === RefundFileType.ON_CHAIN_TO_LIGHTNING) {
      transactionFailedRefund.onOpen()
    } else {
      pledgeRefund.onOpen()
    }
  }

  const handleRecoverWithKey = async () => {
    setRecoveryError('')
    setIsRecovering(true)

    try {
      const { contributionUuid, recoveryCode } = parseRecoveryKey(recoveryKey)
      const { data } = await fetchPaymentRecovery({
        variables: {
          input: {
            contributionUuid,
          },
        },
      })

      const recoveryData = data?.paymentRecoveryByContribution

      if (!recoveryData?.payments.length) {
        throw new Error(t('No recoverable payment found for this recovery key.'))
      }

      const payment =
        recoveryData.payments.find((item) => item.status === PaymentStatus.Refundable) ||
        recoveryData.payments.find((item) => item.status === PaymentStatus.Paid) ||
        recoveryData.payments[0]

      if (!payment) {
        throw new Error(t('No recoverable payment found for this recovery key.'))
      }

      const swapMetadata = JSON.parse(payment.swapMetadata) as Record<string, unknown>

      if (!hasSwapRecoveryMetadata(swapMetadata)) {
        throw new Error(t('This contribution does not have recovery-key metadata.'))
      }

      const accountKeys = await decryptSwapRecoveryMetadata(swapMetadata, recoveryCode)
      const { contribution } = recoveryData
      const { project } = recoveryData
      const createdAtMillis =
        typeof contribution.createdAt === 'number'
          ? contribution.createdAt
          : DateTime.fromJSDate(new Date(contribution.createdAt)).toMillis()

      const refundFile = {
        ...swapMetadata,
        id: ((swapMetadata as Record<string, unknown>).id as string | undefined) || payment.swapId,
        amount: payment.amount,
        privateKey: accountKeys.privateKey,
        publicKey: accountKeys.publicKey,
        address: accountKeys.address,
        contributionInfo: {
          projectId: Number(project.id),
          projectTitle: project.title,
          reference: contribution.uuid,
          bitcoinQuote: contribution.bitcoinQuote,
          datetime: createdAtMillis,
          contributionId: Number(contribution.id),
        },
        type:
          payment.paymentType === PaymentType.LightningToRskSwap
            ? RefundFileType.LIGHTNING_TO_RSK
            : RefundFileType.ON_CHAIN_TO_RSK,
      } as unknown as SwapData

      setCurrentSwapId(refundFile.id)
      setCurrentSwapData(refundFile, refundFile.id)
      setRecoveredPayment({
        amount: payment.amount,
        fundingStrategy: project.fundingStrategy,
        recoveryCode,
        paymentId: `${payment.id}`,
        paymentUuid: payment.uuid,
        swapId: refundFile.id,
      })
      toast.success({
        title: t('Recovery key added'),
        description: t('You can now continue to claim your refund.'),
      })
    } catch (error: any) {
      setRecoveryError(error?.message || t('Unable to recover refund details from this key.'))
    } finally {
      setIsRecovering(false)
    }
  }

  return (
    <>
      <HStack w="full" h="full" justifyContent="center" alignItems="center">
        <VStack maxWidth="700px" w="full" spacing={6}>
          <CardLayout w="full" spacing="20px" noMobileBorder>
            <HStack>
              <PiHandCoins fontSize="30px" />
              <H2>{t('Claim Refund')}</H2>
            </HStack>

            {hasRefundFile && (
              <VStack w="full" alignItems="start" overflowX="hidden">
                <Body>{t('Select refund file')}:</Body>
                {swapArray.map((swapItem) => {
                  const { amount } = swapItem
                  const { datetime, projectTitle } = swapItem.contributionInfo || ({} as SwapContributionInfo)

                  if (!datetime && !amount && !projectTitle) {
                    return null
                  }

                  const dateString = datetime
                    ? DateTime.fromMillis(datetime).toLocal().toFormat('HH:mm,  dd LLL, yyyy')
                    : 'N/A'
                  const amountString = amount ? `${commaFormatted(amount)} sats` : ''
                  const projectString = projectTitle || 'N/A'

                  return (
                    <HStack
                      key={swapItem.id}
                      border="2px solid"
                      borderRadius="8px"
                      padding="5px 10px"
                      borderColor={currentSwapId === swapItem.id ? 'primary.400' : 'neutral.200'}
                      onClick={() => setCurrentSwapId(swapItem.id)}
                      display="flex"
                      flexWrap={'wrap'}
                      _hover={{ cursor: 'pointer' }}
                    >
                      <PiFile />
                      <Body size="sm">
                        {`${t('Datetime')}:  `}
                        <strong>{dateString} </strong>
                        {amountString && `${t('Amount')}:  `}
                        <strong>{amountString} </strong>
                        {`${t('Project')}:  `}
                        <strong>{projectString} </strong>
                      </Body>
                    </HStack>
                  )
                })}
              </VStack>
            )}

            <VStack w="full" alignItems="start" spacing={3}>
              <HStack>
                <PiKey />
                <Body medium>{t('Use recovery key')}</Body>
              </HStack>
              <Body size="sm" color="neutral1.11">
                {t('Paste the recovery key you saved during funding to restore your refund details.')}
              </Body>
              <HStack w="full" alignItems="stretch" flexDirection={{ base: 'column', md: 'row' }}>
                <Input
                  value={recoveryKey}
                  onChange={(event) => setRecoveryKey(event.target.value)}
                  placeholder={t('Contribution UUID-recovery code')}
                  borderColor="neutral1.6"
                />
                <Button
                  colorScheme="primary1"
                  variant="outline"
                  onClick={handleRecoverWithKey}
                  isLoading={isRecovering}
                  isDisabled={!recoveryKey.trim()}
                  minW={{ base: 'full', md: '150px' }}
                >
                  {t('Add key')}
                </Button>
              </HStack>
              {recoveryError && (
                <Feedback variant={FeedBackVariant.ERROR} w="full">
                  <Body size="sm">{recoveryError}</Body>
                </Feedback>
              )}
            </VStack>

            <Divider />

            <RefundFileInput name="refundFile" label={t('Upload refund file')} />

            <Button
              colorScheme="primary1"
              onClick={handleContinue}
              size="lg"
              w="full"
              variant="solid"
              isDisabled={!currentSwapId}
            >
              Continue
            </Button>
          </CardLayout>

          <Feedback variant={FeedBackVariant.INFO}>
            <VStack w="full" alignItems="start">
              <Body size="lg" medium>
                {t('What is this?')}
              </Body>
              <Body size="sm">
                {t(
                  'Here you can initiate refunds for failed contribution transactions. If your browser has stored Refund files locally, simply enter your Bitcoin on-chain address to proceed. If not, you will also need to upload the Refund file that you should have securely saved during the contribution process.',
                )}
              </Body>
              <Divider />
              <RefundPolicyNote />
            </VStack>
          </Feedback>
        </VStack>
      </HStack>

      <Modal {...transactionFailedRefund} title={t('Claim Refund')}>
        <ClaimRefundForm onSuccess={handleSuccess} showUpload={false} />
      </Modal>
      <RefundRsk
        {...pledgeRefund}
        contributionUUID={currentSwapData?.contributionInfo?.reference || ''}
        rskAddress={currentSwapData?.address}
        privateKey={currentSwapData?.privateKey}
        publicKey={currentSwapData?.publicKey}
        anonymousRecoveryCode={currentRecoveredPayment?.recoveryCode}
      />
      <PaymentAttemptRefundModal
        {...paymentAttemptRefund}
        amount={currentRecoveredPayment?.amount || currentSwapData?.amount || 0}
        paymentId={currentRecoveredPayment?.paymentId}
        paymentUuid={currentRecoveredPayment?.paymentUuid}
        refundFile={currentSwapData}
        onCompleted={handleSuccess}
      />
    </>
  )
}
