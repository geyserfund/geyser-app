import { OnChainStatus, useOnchainStausValue } from './states/onChainStatus'
import { OnChainPrompt } from './views/OnChainPrompt'
import { OnChainQR } from './views/OnChainQR'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  const onChainStatus = useOnchainStausValue()

  switch (onChainStatus) {
    case OnChainStatus.prompt:
      return <OnChainPrompt />
    case OnChainStatus.awaiting:
      return <OnChainQR onChainAddress={onChainAddress} />
    default:
      return null
  }
}
