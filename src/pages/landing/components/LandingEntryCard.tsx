import { useNavigate } from 'react-router-dom'

import { CardLayoutProps, LandingCardBase } from '../../../shared/components/layouts'
import { getPath } from '../../../shared/constants'
import { EntryForLandingPageFragment } from '../../../types'
import { toSmallImageUrl } from '../../../utils'

interface LandingEntryCardProps extends CardLayoutProps {
  entry: EntryForLandingPageFragment
  isMobile?: boolean
}

export const LandingEntryCard = ({ entry, isMobile, ...rest }: LandingEntryCardProps) => {
  const navigate = useNavigate()

  const projectName = entry.project?.name

  if (!entry.project) {
    return null
  }

  return (
    <LandingCardBase
      isMobile={isMobile}
      onClick={() => projectName && navigate(getPath('projectPostView', projectName, entry.id))}
      imageSrc={toSmallImageUrl(`${entry.image}`)}
      title={entry.title}
      user={entry.creator}
      fundersCount={entry.entryFundersCount}
      amountFunded={entry.amountFunded}
      project={entry.project}
      {...rest}
    />
  )
}
