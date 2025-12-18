import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'

export const useRefetchQueriesOnContributionStatusChange = () => {
  const client = useApolloClient()

  const refetchQueries = useCallback(() => {
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

  return { refetchQueries }
}
