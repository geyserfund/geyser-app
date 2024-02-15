import { CardLayoutProps, LandingCardBase } from '../../../../../components/layouts'
import { ProjectStatusLabels } from '../../../../../components/ui'
import { getPath } from '../../../../../constants'
import { ProjectForProfilePageFragment, WalletStatus } from '../../../../../types'
import { isActive, isDraft, isInactive } from '../../../../../utils'

interface ProfileProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForProfilePageFragment
  showStatus?: boolean
  isMobile?: boolean
}

export const ProfileProjectCard = ({ project, isMobile, showStatus, ...rest }: ProfileProjectCardProps) => {
  if (!project.owners[0]) {
    return null
  }

  const getStatus = () => {
    if (project?.wallets[0] && project.wallets[0].state.status === WalletStatus.Inactive) {
      return ProjectStatusLabels.INACTIVE_WALLET
    }

    if (project?.wallets[0] && project.wallets[0].state.status === WalletStatus.Unstable) {
      return ProjectStatusLabels.UNSTABLE_WALLET
    }

    if (isActive(project.status)) {
      return ProjectStatusLabels.RUNNING
    }

    if (isDraft(project.status)) {
      return ProjectStatusLabels.DRAFT
    }

    if (isInactive(project.status)) {
      return ProjectStatusLabels.INACTIVE
    }

    return undefined
  }

  return (
    <LandingCardBase
      to={getPath('project', project.name)}
      projectStatus={showStatus ? getStatus() : undefined}
      isMobile={isMobile}
      imageSrc={`${project.thumbnailImage}`}
      title={project.title}
      user={project.owners[0].user}
      fundersCount={project.fundersCount || 0}
      amountFunded={project.balance}
      projectId={project.id}
      minHeight="125px"
      {...rest}
    />
  )
}
