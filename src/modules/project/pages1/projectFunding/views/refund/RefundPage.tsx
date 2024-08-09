import { Divider, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { FaFileAlt } from 'react-icons/fa'
import { PiFile, PiHandCoins } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { Body1, Body2, H2 } from '../../../../../../components/typography'
import { CardLayout } from '../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../shared/constants'
import { commaFormatted } from '../../../../../../utils'
import { currentSwapIdAtom, swapAtom, SwapContributionInfo, useRefundFileValue } from '../../../../funding/state'
import { RefundPolicyNote } from '../fundingPayment/components/RefundPolicyNote'
import { ClaimRefundForm } from '../fundingPayment/views/paymentOnchain/components/ClaimRefundForm'

export const RefundPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [swapData] = useAtom(swapAtom)
  const [currentSwapId, setCurrentSwapId] = useAtom(currentSwapIdAtom)
  const refundFile = useRefundFileValue()

  const handleSuccess = () => {
    navigate(getPath('refundInitiated'))
  }

  const swapArray = Object.values(swapData).filter((swap) => swap.id)
  const hasRefundFile = swapArray.length > 0

  return (
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

          <ClaimRefundForm onSuccess={handleSuccess} showUpload={!hasRefundFile} refundFile={refundFile} />
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
  )
}
