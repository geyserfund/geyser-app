import { useMemo } from 'react'

import { UserProjectContributionsFragment } from '../../../../../types'
import { ProfileContributions } from '../views/ProfileContributions'
import { useProfileContributionQuery } from './useProfileContributionQuery'

export type ProjectInsideUserContributionsFragment = UserProjectContributionsFragment['project']
export type FunderInsideUserContributionsFragment = UserProjectContributionsFragment['funder']

export const useProfileContributions = (userId: number) => {
  const { isLoading, contributions } = useProfileContributionQuery(userId)

  const numberOfContributions = contributions.reduce((acc, contribution) => {
    return acc + (contribution.funder?.fundingTxs.length || 0)
  }, 0)

  const renderComponent = useMemo(
    () => <ProfileContributions contributions={contributions} isLoading={isLoading} />,
    [contributions, isLoading],
  )

  return {
    title: 'Contributions',
    sub: numberOfContributions,
    isLoading,
    renderComponent,
  }
}
