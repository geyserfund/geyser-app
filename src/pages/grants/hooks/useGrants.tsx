import { useQuery } from '@apollo/client'

import { QUERY_GRANTS } from '../../../graphql/queries/grant'
import { Grant } from '../../../types'

type ResponseData = {
  grants: Grant[]
}

export const useGrants = () => {
  const { data, error, loading, refetch } = useQuery<ResponseData>(QUERY_GRANTS)

  return {
    grants: data ? data.grants : null,
    error,
    loading,
    refetch,
  }
}
