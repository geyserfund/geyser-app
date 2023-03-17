import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANTS } from '../../../graphql/queries/grant'
import { Grant, GrantStatusEnum } from '../../../types'

type ResponseData = {
  grants: Grant[]
}

export const useGrants = () => {
  const { data, error, loading, refetch } = useQuery<ResponseData>(QUERY_GRANTS)

  const activeGrant = useMemo(
    () =>
      data
        ? (data.grants
            .filter((grant) => grant.status !== GrantStatusEnum.Closed)
            .at(0) as Grant)
        : null,
    [data],
  )

  const inactiveGrants = useMemo(
    () =>
      data
        ? data.grants.filter((grant) => grant.status === GrantStatusEnum.Closed)
        : [],
    [data],
  )

  return {
    grants: data ? data.grants : null,
    error,
    loading,
    refetch,
    activeGrant,
    inactiveGrants,
  }
}
