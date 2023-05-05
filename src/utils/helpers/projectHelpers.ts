import {
  GEYSER_FEE,
  noFeeProjects,
  WalletConnectDetails,
} from '../../constants'
import { ProjectFragment } from '../../types'

type PickProject = Pick<ProjectFragment, 'name' | 'balance' | 'wallets'>

export const getProjectBalance = (project: PickProject) => {
  if (noFeeProjects.includes(project.name) || hasOwnNode(project)) {
    return project.balance
  }

  return Math.round(project.balance * (1 - GEYSER_FEE))
}

export const hasOwnNode = (project: PickProject) => {
  const currentWallet = project.wallets && project.wallets[0]
  const { connectionDetails } = currentWallet || {}

  if (!connectionDetails) {
    return false
  }

  return (
    connectionDetails.__typename !==
    WalletConnectDetails.LightningAddressConnectionDetails
  )
}
