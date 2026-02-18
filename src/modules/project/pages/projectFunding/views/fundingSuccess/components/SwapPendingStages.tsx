import { Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { currentSwapAtom, RefundFileType } from '@/modules/project/funding/state/swapAtom.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import {
  SwapStatusUpdate,
  useTransactionStatusUpdate,
} from '../../fundingPayment/views/paymentOnchain/hooks/useTransactionStatusUpdate.ts'
import { getTransactionFromChainSwap } from '../../fundingPayment/views/paymentOnchain/refund/api'
import { onChainErrorAtom } from '../../fundingPayment/views/paymentOnchain/states/onChainErrror.ts'

type ContributionStage = 1 | 2 | 3

const shouldShowMempoolLink = (swapType?: RefundFileType) => swapType === RefundFileType.ON_CHAIN_TO_RSK

export const SwapPendingStages = ({ swapTargetLabel }: { swapTargetLabel: string }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { project } = useProjectAtom()

  const swap = useAtomValue(currentSwapAtom)
  const setOnChainError = useSetAtom(onChainErrorAtom)

  const [stage, setStage] = useState<ContributionStage>(1)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const swapId = swap?.id

  useEffect(() => {
    const fetchTransactionId = async () => {
      if (!swapId || !shouldShowMempoolLink(swap?.type)) return

      try {
        const transaction = await getTransactionFromChainSwap(swapId, 'userLock')
        setTransactionId(transaction.id)
      } catch (error) {
        console.error('Failed to fetch transaction ID:', error)
      }
    }

    fetchTransactionId()
  }, [swapId, swap?.type])

  useTransactionStatusUpdate({
    swapId,
    handleConfirmed() {
      setStage(2)
    },
    handleClaimed() {
      setStage(3)
    },
    handleFailed(update: SwapStatusUpdate) {
      if (swap?.type === RefundFileType.ON_CHAIN_TO_RSK) {
        setOnChainError(update)
        navigate({ pathname: getPath('fundingPaymentOnchainRefund', project.name), search: location.search })
        return
      }

      navigate({ pathname: getPath('fundingPaymentFailed', project.name), search: location.search })
    },
  })

  const stageText = useMemo(() => {
    switch (stage) {
      case 1:
        return t(
          'Transaction broadcast (step 1 of 3). Confirmation takes ~10 min. If stuck here for too long, please contact us at support@geyser.fund',
        )
      case 2:
        return t(
          'Swap to {{swapTargetLabel}} (step 2 of 3). Confirmation takes ~2 min. If stuck here for too long, please contact us at support@geyser.fund',
          { swapTargetLabel },
        )
      case 3:
        return t(
          'Transaction confirmed (step 3 of 3). Confirmation imminent. If stuck here for too long, please contact us at support@geyser.fund',
        )
      default:
        return ''
    }
  }, [stage, swapTargetLabel])

  const showMempool = shouldShowMempoolLink(swap?.type) && stage === 1 && Boolean(transactionId)

  if (!swapId) {
    return null
  }

  return (
    <VStack w="full" spacing={1} alignItems="start">
      <Body size="md" medium color="utils.text">
        {stageText}
      </Body>
      {showMempool && transactionId && (
        <Link
          href={`https://mempool.space/tx/${transactionId}`}
          isExternal
          color="primary1.11"
          fontWeight="bold"
          fontSize="md"
        >
          {t('View mempool')}
        </Link>
      )}
    </VStack>
  )
}
