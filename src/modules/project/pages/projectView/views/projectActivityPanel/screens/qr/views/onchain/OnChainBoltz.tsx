import { useFundingStage, useRefundFileAdd, useRefundFileValue } from '../../../../../../../../funding/state'
import { SwapStatusUpdate, useTransactionStatusUpdate } from './hooks/useTransactionStatusUpdate'
import { OnChainErrorStatuses, useSetOnChainErrorAtom } from './states'
import {
  OnChainStatus,
  useGoToOnChainRefund,
  useOnChainStatusEffect,
  useOnChainStatusValue,
} from './states/onChainStatus'
import { extractValuesFromError } from './utils/parseError'
import { OnChainProcessing } from './views/OnChainProcessing'
import { OnChainPrompt } from './views/OnChainPrompt'
import { OnChainQR } from './views/OnChainQR'
import { OnChainRefund } from './views/OnChainRefund'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  useOnChainStatusEffect()

  const onChainStatus = useOnChainStatusValue()
  const refundFile = useRefundFileValue()
  const addRefundFile = useRefundFileAdd()

  const { setNextFundingStage } = useFundingStage()
  const setOnChainError = useSetOnChainErrorAtom()
  const goToOnChainRefund = useGoToOnChainRefund()

  const handleConfirmed = () => {
    setNextFundingStage()
  }

  const handleFailed = (value: SwapStatusUpdate) => {
    setOnChainError(value)

    if (value.status === OnChainErrorStatuses.LOCKUP_FAILED && refundFile) {
      const values = extractValuesFromError(value.failureReason || '')
      if (values.locked) {
        const newRefundFile = {
          ...refundFile,
          contributionInfo: { ...refundFile?.contributionInfo, amount: values.locked },
        }
        addRefundFile(newRefundFile)
      }
    }

    goToOnChainRefund()
  }

  useTransactionStatusUpdate({
    handleConfirmed,
    handleFailed,
    swapId: refundFile?.id,
  })

  if (!refundFile) {
    return null
  }

  switch (onChainStatus) {
    case OnChainStatus.prompt:
      return <OnChainPrompt />
    case OnChainStatus.awaiting:
      return <OnChainQR onChainAddress={onChainAddress} />
    case OnChainStatus.processing:
      return <OnChainProcessing />
    case OnChainStatus.refund:
      return <OnChainRefund />
    default:
      return null
  }
}
