import DownloadRefundFilePrompt from './components/DownloadRefundFilePrompt'
import { OnChainStatus, useOnchainStausValue } from './states/onChainStatus'

export const OnchainBoltz = ({ onChainAddress }: { onChainAddress: string }) => {
  const onChainStatus = useOnchainStausValue()

  switch (onChainStatus) {
    case OnChainStatus.prompt:
      return <DownloadRefundFilePrompt />
    default:
      return null
  }
}
