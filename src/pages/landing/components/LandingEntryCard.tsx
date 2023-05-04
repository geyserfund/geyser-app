import { useNavigate } from 'react-router-dom'

import { CardLayoutProps, LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { EntryForLandingPageFragment } from '../../../types'
import { toSmallImageUrl } from '../../../utils'

interface LandingEntryCardProps extends CardLayoutProps {
  entry: EntryForLandingPageFragment
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
      isMobile={isMobile}
      onClick={() => navigate(getPath('entry', entry.id))}
      imageSrc={toSmallImageUrl(`${entry.image}`)}
      title={entry.title}
      user={entry.creator}
      fundersCount={entry.entryFundersCount}
      amountFunded={entry.amountFunded}
      projectId={entry.project?.id}
      {...rest}
    />
  )
}
