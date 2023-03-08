import { useNavigate } from 'react-router-dom'

import { CardLayoutProps, LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { Entry } from '../../../types'
import { toSmallImageUrl } from '../../../utils'

interface LandingEntryCardProps extends CardLayoutProps {
  entry: Entry
  isMobile?: boolean
}

export const LandingEntryCard = ({
  entry,
  isMobile,
  ...rest
}: LandingEntryCardProps) => {
  const navigate = useNavigate()

  return (
    <LandingCardBase
      onClick={() => navigate(getPath('entry', entry.id))}
      imageSrc={toSmallImageUrl(`${entry.image}`)}
      title={entry.title}
      user={entry.creator}
      fundersCount={entry.fundersCount}
      amountFunded={entry.amountFunded}
      projectId={entry.project?.id}
      {...rest}
    />
  )
}
