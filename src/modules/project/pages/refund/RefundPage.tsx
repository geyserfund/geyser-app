import { HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { FaFileAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { Body1, Body2, H2 } from '../../../../components/typography'
import { CardLayout } from '../../../../shared/components/layouts'
import { getPath } from '../../../../shared/constants'
import { commaFormatted } from '../../../../utils'
import { currentSwapIdAtom, swapAtom, SwapContributionInfo, useRefundFileValue } from '../../funding/state'
import { RefundPolicyNote } from '../projectView/views/projectActivityPanel/screens/qr/components'
import { ClaimRefundForm } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/components/ClaimRefundForm'

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
      <CardLayout maxWidth="700px" spacing="20px" noMobileBorder>
        <H2>{t('Claim Refund')}</H2>

        {hasRefundFile && (
          <VStack w="full" alignItems="start" overflowX="hidden">
            <Body1>{t('Select refund file')}:</Body1>
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
                  <FaFileAlt />
                  <Body2>
                    {`${t('Datetime')}:  `}
                    <strong>{dateString} </strong>
                    {amountString && `${t('Amount')}:  `}
                    <strong>{amountString} </strong>
                    {`${t('Project')}:  `}
                    <strong>{projectString} </strong>
                  </Body2>
                </HStack>
              )
            })}
          </VStack>
        )}

        <ClaimRefundForm onSuccess={handleSuccess} showUpload={!hasRefundFile} refundFile={refundFile} />
        <CardLayout spacing="10px">
          <Body2>
            {t(
              'Here you can initiate refunds for failed contribution transactions. If your browser has stored Refund files locally, simply enter your Bitcoin on-chain address to proceed. If not, you will also need to upload the Refund file that you should have securely saved during the contribution process.',
            )}
          </Body2>
          <RefundPolicyNote />
        </CardLayout>
      </CardLayout>
    </HStack>
  )
}
