import { useMemo } from 'react'

import { UserProjectContributionsFragment } from '../../../../../../types'
import { useUserProfileAtomValue } from '../../../../state'
import { useProfileContributionQuery } from '../profileTabs/hooks/useProfileContributionQuery'
import { SummaryBody } from './SummaryBody'

export const Summary = () => {
  const userProfile = useUserProfileAtomValue()

  const { contributions, isLoading } = useProfileContributionQuery(userProfile.id)

  const totalFunded = useMemo(() => {
    return contributions.reduce((acc: number, c: UserProjectContributionsFragment) => {
      return acc + (c.funder?.amountFunded ?? 0)
    }, 0)
  }, [contributions])

  const projectsFunded = useMemo(() => {
    return contributions.length
  }, [contributions])

  return (
    <SummaryBody
      isLoading={isLoading}
      totalFunded={totalFunded}
      projectsFunded={projectsFunded}
      ranking={userProfile.ranking ? Number(userProfile.ranking) : undefined}
    />
  )
}
