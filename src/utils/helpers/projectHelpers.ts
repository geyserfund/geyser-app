import { WalletConnectDetails } from '../../constants'
import { ProjectFragment } from '../../types'

type PickProject = Pick<ProjectFragment, 'name' | 'balance' | 'wallets'>

export const hasOwnNode = (project: PickProject) => {
  const currentWallet = project.wallets && project.wallets[0]
  const { connectionDetails } = currentWallet || {}

  if (!connectionDetails) {
    return false
  }

  return connectionDetails.__typename !== WalletConnectDetails.LightningAddressConnectionDetails
}
