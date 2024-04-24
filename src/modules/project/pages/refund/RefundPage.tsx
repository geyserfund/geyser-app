import { Button, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Body2, H2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { currentSwapAtomId, swapAtom, SwapContributionInfo } from '../../funding/state'
import { RefundPolicyNote } from '../projectView/views/projectActivityPanel/screens/qr/components'
import { ClaimRefundForm } from '../projectView/views/projectActivityPanel/screens/qr/views/onchain/components/ClaimRefundForm'

export const RefundPage = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const [swapData] = useAtom(swapAtom)
  const [currentSwapId, setCurrentSwapId] = useAtom(currentSwapAtomId)

  const handleSuccess = () => {
    navigate(getPath('refundInitiated'))
  }

  const swapArray = Object.values(swapData).filter((swap) => swap.id)
  const hasRefundFile = swapArray.length > 0

  return (
    <HStack w="full" h="full" justifyContent="center" alignItems="center">
      <CardLayout maxWidth="700px" spacing="20px">
        <H2>{t('Refund')}</H2>

        {hasRefundFile && (
          <VStack w="full" alignItems="start">
            <Body1>
              {t('Refund File')}
              {swapArray.length > 1 ? 's' : ''}:
            </Body1>
            {swapArray.map((swapItem) => {
              const { datetime, amount, projectTitle } = swapItem.contributionInfo || ({} as SwapContributionInfo)

              if (!datetime && !amount && !projectTitle) {
                return null
              }

              const dateString = datetime ? DateTime.fromMillis(datetime).toFormat('YYYY-MM-DD') : 'N/A'
              const amountString = amount || 'N/A'
              const projectString = projectTitle || 'N/A'

              return (
                <Button
                  key={swapItem.id}
                  variant="secondary"
                  borderColor={currentSwapId === swapItem.id ? 'primary.400' : 'neutral.200'}
                  onClick={() => setCurrentSwapId(swapItem.id)}
                >{`Date: ${dateString}  Amount: ${amountString} Project: ${projectString}`}</Button>
              )
            })}
          </VStack>
        )}

        <ClaimRefundForm onSuccess={handleSuccess} showUpload={!hasRefundFile} />
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
