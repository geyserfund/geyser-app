import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'

export const useRefetchQueries = () => {
  const client = useApolloClient()

  const refetchQueriesOnPledgeRefund = useCallback(() => {
    client.refetchQueries({
      include: [
        'ProjectPageBody',
        'ProjectPageContributionsGet',
        'ProjectLeaderboardContributorsGet',
        'ProjectUserContributor',
        'ProjectContributor',
      ],
    })
  }, [client])

  const refetchQueriesOnPayoutSuccess = useCallback(() => {
    client.refetchQueries({
      include: [
        'ProjectPageBody',
        'ProjectPageContributionsGet',
        'ProjectLeaderboardContributorsGet',
        'ProjectUserContributor',
        'ProjectContributor',
      ],
    })
  }, [client])

  return { refetchQueriesOnPledgeRefund, refetchQueriesOnPayoutSuccess }
}
