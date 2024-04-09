import { OnChainStatus, useOnchainStausValue } from './states/onChainStatus'
import { OnChainEmailAddress } from './views/onChainEmailAddress'
import { OnChainProcessing } from './views/OnChainProcessing'
import { OnChainPrompt } from './views/OnChainPrompt'
import { OnChainQR } from './views/OnChainQR'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  const onChainStatus = useOnchainStausValue()

  switch (onChainStatus) {
    case OnChainStatus.prompt:
      return <OnChainPrompt />
    case OnChainStatus.awaiting:
      return <OnChainQR onChainAddress={onChainAddress} />
    case OnChainStatus.processing:
      return (
        <>
          <OnChainProcessing />
          <OnChainEmailAddress />
        </>
      )
    default:
      return null
  }
}
