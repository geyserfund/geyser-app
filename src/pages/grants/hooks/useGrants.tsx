import { useMemo } from 'react'

import { Grant, GrantStatusEnum, useGrantsQuery } from '../../../types'
import { toInt } from '../../../utils'

const CurrentFeaturedGrant = 'grant-round-009'

export const useGrants = () => {
  const { data, error, loading, refetch } = useGrantsQuery()

  const activeGrants = useMemo(
    () => (data ? (data.grants.filter((grant) => grant.status !== GrantStatusEnum.Closed) as Grant[]) : []),
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
              const statusA = a.statuses.find((s) => s.status === GrantStatusEnum.Closed) || { endAt: 0 }
              const statusB = b.statuses.find((s) => s.status === GrantStatusEnum.Closed) || { endAt: 0 }

              return statusB.endAt - statusA.endAt
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
    activeGrants,
    inactiveGrants,
    latestGrant,
    featuredGrant,
  }
}
