import {
  GEYSER_FEE,
  noFeeProjects,
  WalletConnectDetails,
} from '../../constants'
import { Project } from '../../types'

export const getProjectBalance = (project: Project) => {
  if (noFeeProjects.includes(project.name) || hasOwnNode(project)) {
    return project.balance
  }

  return Math.round(project.balance * (1 - GEYSER_FEE))
}

export const hasOwnNode = (project: Project) => {
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
