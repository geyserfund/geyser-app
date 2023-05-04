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
  const currentProject = project.wallets && project.wallets[0]
  const { connectionDetails } = currentProject || {}

  if (!connectionDetails) {
    return false
  }

  switch (connectionDetails.__typename) {
    case WalletConnectDetails.LightningAddressConnectionDetails:
      return false
    default:
      return true
  }
}
