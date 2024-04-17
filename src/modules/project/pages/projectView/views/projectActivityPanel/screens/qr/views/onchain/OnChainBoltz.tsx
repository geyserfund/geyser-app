import { OnChainStatus, useOnChainStatusValue } from './states/onChainStatus'
import { OnChainProcessing } from './views/OnChainProcessing'
import { OnChainPrompt } from './views/OnChainPrompt'
import { OnChainQR } from './views/OnChainQR'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  const onChainStatus = useOnChainStatusValue()

  switch (onChainStatus) {
    case OnChainStatus.prompt:
      return <OnChainPrompt />
    case OnChainStatus.awaiting:
      return <OnChainQR onChainAddress={onChainAddress} />
    case OnChainStatus.processing:
      return <OnChainProcessing />
    case OnChainStatus.refund:
      return <OnChainProcessing />
    default:
      return null
  }
}
