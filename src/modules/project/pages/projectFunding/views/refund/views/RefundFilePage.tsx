import { Button, Divider, HStack, VStack } from '@chakra-ui/react'
import { useAtom, useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { PiFile, PiHandCoins } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { currentSwapAtom, RefundFileType } from '@/modules/project/funding/state/swapAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { getPath } from '../../../../../../../shared/constants'
import { commaFormatted } from '../../../../../../../utils'
import { currentSwapIdAtom, swapAtom, SwapContributionInfo } from '../../../../../funding/state'
import { RefundPolicyNote } from '../../fundingPayment/components/RefundPolicyNote'
import { ClaimRefundForm } from '../../fundingPayment/views/paymentOnchain/components/ClaimRefundForm'
import { RefundFileInput } from '../../fundingPayment/views/paymentOnchain/components/RefundFileInput.tsx'
import { RefundRsk } from '../../refundPayoutRsk/RefundRsk.tsx'

export const RefundFilePage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [swapData] = useAtom(swapAtom)
  const [currentSwapId, setCurrentSwapId] = useAtom(currentSwapIdAtom)
  const currentSwapData = useAtomValue(currentSwapAtom)

  const transactionFailedRefund = useModal()
  const pledgeRefund = useModal()

  const handleSuccess = () => {
    transactionFailedRefund.onClose()
    navigate(getPath('refundInitiated'))
  }

  const swapArray = Object.values(swapData).filter((swap) => swap.id)
  const hasRefundFile = swapArray.length > 0

  const handleContinue = () => {
    if (currentSwapData?.type === RefundFileType.ON_CHAIN_TO_LIGHTNING) {
      transactionFailedRefund.onOpen()
    } else {
      pledgeRefund.onOpen()
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
      />
    </>
  )
}
