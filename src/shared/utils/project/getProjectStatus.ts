import { t } from 'i18next'
import { PiCheckCircle, PiEyeglasses, PiMinusCircle, PiNoteBlank, PiWarning, PiXCircle } from 'react-icons/pi'

import { ProjectState } from '@/modules/project/state/projectAtom'
import { lightModeColors } from '@/shared/styles'
import { ProjectWalletFragment, WalletStatus } from '@/types'
import { isActive, isClosed, isDraft, isInactive, isInReview } from '@/utils'

export enum ProjectStatusLabels {
  UNSTABLE_WALLET = 'Unstable Wallet',
  INACTIVE_WALLET = 'Inactive Wallet',
  RUNNING = 'Running',
  DRAFT = 'Draft',
  INACTIVE = 'Inactive Project',
  IN_REVIEW = 'In Review',
  CLOSED = 'Project Deactivated',
}

export const ProjectStatusColorScheme = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: 'warning',
  [ProjectStatusLabels.INACTIVE_WALLET]: 'error',
  [ProjectStatusLabels.RUNNING]: 'primary1',
  [ProjectStatusLabels.DRAFT]: 'neutral1',
  [ProjectStatusLabels.INACTIVE]: 'neutral1',
  [ProjectStatusLabels.IN_REVIEW]: 'neutral1',
  [ProjectStatusLabels.CLOSED]: 'error',
} as {
  [key in ProjectStatusLabels]: keyof typeof lightModeColors
}

export const ProjectStatusIcons = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: PiWarning,
  [ProjectStatusLabels.INACTIVE_WALLET]: PiMinusCircle,
  [ProjectStatusLabels.RUNNING]: PiCheckCircle,
  [ProjectStatusLabels.DRAFT]: PiNoteBlank,
  [ProjectStatusLabels.INACTIVE]: PiXCircle,
  [ProjectStatusLabels.IN_REVIEW]: PiEyeglasses,
  [ProjectStatusLabels.CLOSED]: PiMinusCircle,
}

export const ProjectStatusCreatorText = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: t(
    'Wallets are marked as unstable when a transaction fails due to a transaction failure, not enough inbound liquidity, or other. Consider making a small transaction to set your project back to active, or change your wallet.',
  ),
  [ProjectStatusLabels.INACTIVE_WALLET]: t(
    'Your wallet is not functional. Please change your wallet to receive contributions.  ',
  ),
  [ProjectStatusLabels.RUNNING]: t(
    'Your project is live and can receive contributions. Share your project to get more visibility.',
  ),
  [ProjectStatusLabels.DRAFT]: t(
    "Your project is not visible to the public and cannot receive contributions. Click Publish when you're ready to go live.",
  ),
  [ProjectStatusLabels.INACTIVE]: t(
    'Your project cannot receive contributions but is visible to the public. To reactivate your project go to Setting.',
  ),
  [ProjectStatusLabels.IN_REVIEW]: t(
    'Your project is in review and therefore cannot receive contributions, and is not visible by the public.',
  ),
  [ProjectStatusLabels.CLOSED]: t(
    'You project has been flagged for violating our Terms & Conditions. You should have received an email with further detail on how to proceed. Your project is currently not visible to the public.',
  ),
}

export const ProjectStatusTooltip = {
  [ProjectStatusLabels.UNSTABLE_WALLET]: t(
    'The last time someone tried to send funds to this wallet, there was a liquidity issue.',
  ),
  [ProjectStatusLabels.INACTIVE_WALLET]: t(
    'The last time someone tried to make a transaction to this project, the invoice generation failed.',
  ),
  [ProjectStatusLabels.RUNNING]: t('This project is live and wallet running smoothly.'),
  [ProjectStatusLabels.DRAFT]: t('This project has not been launched yet.'),
  [ProjectStatusLabels.INACTIVE]: t('This project has been deactivated by the project creator.'),
  [ProjectStatusLabels.IN_REVIEW]: t('Your project is in review and therefore cannot receive contributions'),
  [ProjectStatusLabels.CLOSED]: t('This project has been flagged for violating our Terms & Conditions.'),
}

export type GetProjectStatusProps = {
  project: Pick<ProjectState, 'status' | 'id' | 'name'>
  wallet: Pick<ProjectWalletFragment, 'state'>
}

export const getProjectStatus = ({ project, wallet }: GetProjectStatusProps) => {
  const getStatus = () => {
    if (isDraft(project.status)) {
      return ProjectStatusLabels.DRAFT
    }

    if (isInactive(project.status)) {
      return ProjectStatusLabels.INACTIVE
    }

    if (isInReview(project.status)) {
      return ProjectStatusLabels.IN_REVIEW
    }

    if (isClosed(project.status)) {
      return ProjectStatusLabels.CLOSED
    }

    if (wallet?.state.status === WalletStatus.Inactive) {
      return ProjectStatusLabels.INACTIVE_WALLET
    }

    if (wallet?.state.status === WalletStatus.Unstable) {
      return ProjectStatusLabels.UNSTABLE_WALLET
    }

    if (isActive(project.status)) {
      return ProjectStatusLabels.RUNNING
    }

    return ProjectStatusLabels.RUNNING
  }

  return getStatus()
}
