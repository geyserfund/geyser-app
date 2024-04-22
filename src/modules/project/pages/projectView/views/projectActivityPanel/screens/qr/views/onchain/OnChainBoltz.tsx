import { useFundingStage, useRefundFileValue } from '../../../../../../../../funding/state'
import { SwapStatusUpdate, useTransactionStatusUpdate } from './hooks/useTransactionStatusUpdate'
import { useSetOnChainErrorAtom } from './states'
import {
  OnChainStatus,
  useGoToOnChainRefund,
  useOnChainStatusEffect,
  useOnChainStatusValue,
} from './states/onChainStatus'
import { OnChainProcessing } from './views/OnChainProcessing'
import { OnChainPrompt } from './views/OnChainPrompt'
import { OnChainQR } from './views/OnChainQR'
import { OnChainRefund } from './views/OnChainRefund'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  useOnChainStatusEffect()

  const onChainStatus = useOnChainStatusValue()
  const { id } = useRefundFileValue()

  const { setNextFundingStage } = useFundingStage()
  const setOnChainError = useSetOnChainErrorAtom()
  const goToOnChainRefund = useGoToOnChainRefund()

  const handleConfirmed = () => {
    setNextFundingStage()
  }

  const handleFailed = (value: SwapStatusUpdate) => {
    setOnChainError(value.error)
    goToOnChainRefund()
  }

  useTransactionStatusUpdate({
    handleConfirmed,
    handleFailed,
    swapId: id,
  })

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
