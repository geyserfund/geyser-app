import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { QUERY_GRANTS } from '../../../graphqlBase/queries/grant'
import { Grant, GrantStatusEnum } from '../../../types'
import { toInt } from '../../../utils'

type ResponseData = {
  grants: Grant[]
}

const CurrentFeaturedGrant = 'grant-round-009'

export const useGrants = () => {
  const { data, error, loading, refetch } = useQuery<ResponseData>(QUERY_GRANTS)

  const openGrants = useMemo(
    () => (data ? (data.grants.filter((grant) => grant.status !== GrantStatusEnum.Closed) as Grant[]) : []),
    [data],
  )

  const fundingOpenGrants = useMemo(
    () => (data ? (data.grants.filter((grant) => grant.status === GrantStatusEnum.FundingOpen) as Grant[]) : []),
    [data],
  )

  const applicationOpenGrants = useMemo(
    () => (data ? (data.grants.filter((grant) => grant.status === GrantStatusEnum.ApplicationsOpen) as Grant[]) : []),
    [data],
  )

  const latestGrant = useMemo(() => {
    if (data) {
      const grantsCopy = [...data.grants]
      grantsCopy.sort((a, b) => toInt(b.id) - toInt(a.id))
      if (grantsCopy[0]) {
        return grantsCopy[0]
      }

      return null
    }

    return null
  }, [data])

  const inactiveGrants = useMemo(
    () =>
      data
        ? data.grants
            .filter((grant) => grant.status === GrantStatusEnum.Closed)
            .sort((a, b) => {
              const statusA = a.statuses.find((s) => s.status === GrantStatusEnum.Closed) || { startAt: 0 }
              const statusB = b.statuses.find((s) => s.status === GrantStatusEnum.Closed) || { startAt: 0 }

              return statusB.startAt - statusA.startAt
            })
        : [],
    [data],
  )

  const featuredGrant = useMemo(
    () => (data ? data.grants.find((grant) => grant.name === CurrentFeaturedGrant) : null),
    [data],
  )

  return {
    grants: data ? data.grants : null,
    error,
    loading,
    refetch,
    openGrants,
    fundingOpenGrants,
    applicationOpenGrants,
    inactiveGrants,
    latestGrant,
    featuredGrant,
  }
}
