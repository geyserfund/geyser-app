import { ProjectStatusLabels } from '../../components/ui'
import { ProjectStatus, Wallet, WalletStatus } from '../../types'
import { isActive, isDraft, isInactive } from '../validations'

export const getProjectStatus = (project: { status?: ProjectStatus | null; wallets: Pick<Wallet, 'state'>[] }) => {
  if (isDraft(project.status)) {
    return ProjectStatusLabels.DRAFT
  }

  if (isInactive(project.status)) {
    return ProjectStatusLabels.INACTIVE
  }

  if (project?.wallets[0] && project.wallets[0].state.status === WalletStatus.Inactive) {
    return ProjectStatusLabels.INACTIVE_WALLET
  }

  if (project?.wallets[0] && project.wallets[0].state.status === WalletStatus.Unstable) {
    return ProjectStatusLabels.UNSTABLE_WALLET
  }

  if (isActive(project.status)) {
    return ProjectStatusLabels.RUNNING
  }

  return undefined
}
