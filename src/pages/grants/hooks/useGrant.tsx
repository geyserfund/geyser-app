import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANT } from '../../../graphql/queries/grant'
import { Grant } from '../../../types'

type ResponseData = {
  grant: Grant
}

export const useGrant = (id?: string | number) => {
  const variables = useMemo(
    () => (id ? { variables: { input: { where: { id } } } } : undefined),
    [id],
  )

  const { data, error, loading, refetch } = useQuery<ResponseData>(
    QUERY_GRANT,
    variables,
  )

  return {
    grant: data ? data.grant : null,
    error,
    loading,
    refetch,
  }
}
