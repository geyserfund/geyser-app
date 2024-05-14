import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANT } from '../../../graphql/queries/grant'
import { Grant } from '../../../types'

type ResponseData = {
  grant: Grant
}

export const useGrant = (id?: string | number) => {
  const variables = useMemo(() => {
    if (!id) return undefined
    if (id === 'bcegrants') {
      return { variables: { input: { where: { id: 8 } } } }
    }

    return { variables: { input: { where: { id } } } }
  }, [id])

  const { data, error, loading, refetch } = useQuery<ResponseData>(QUERY_GRANT, variables)

  return {
    grant: data ? data.grant : null,
    error,
    loading,
    refetch,
  }
}
