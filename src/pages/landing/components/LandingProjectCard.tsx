import { useNavigate } from 'react-router-dom'

import { CardLayoutProps, LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { Project } from '../../../types'
import { toSmallImageUrl } from '../../../utils'

interface LandingProjectCardProps extends CardLayoutProps {
  project: Project
  isMobile?: boolean
}

export const LandingProjectCard = ({
  project,
  isMobile,
  ...rest
}: LandingProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <LandingCardBase
      isMobile={isMobile}
      onClick={() => navigate(getPath('project', project.name))}
      imageSrc={toSmallImageUrl(`${project.thumbnailImage}`)}
      title={project.title}
      user={project.owners[0].user}
      fundersCount={project.fundersCount || 0}
      amountFunded={project.balance}
      projectId={project.id}
      {...rest}
    />
  )
}
