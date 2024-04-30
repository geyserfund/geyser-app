import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANT, QUERY_GRANT_WITH_FUNDERS } from '../../../graphql/queries/grant'
import { Grant } from '../../../types'

type ResponseData = {
  grant: Grant
}

export const useGrant = (id?: string | number, isGrantWithFunders?: boolean) => {
  const variables = useMemo(() => (id ? { variables: { input: { where: { id } } } } : undefined), [id])

  const query = isGrantWithFunders ? QUERY_GRANT_WITH_FUNDERS : QUERY_GRANT

  const { data, error, loading, refetch } = useQuery<ResponseData>(query, variables)

  return {
    grant: data ? data.grant : null,
    error,
    loading,
    refetch,
  }
}
