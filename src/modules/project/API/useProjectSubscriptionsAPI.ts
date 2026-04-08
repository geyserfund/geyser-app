import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectRecurringContextQuery } from '@/types/index.ts'

import { useProjectAtom } from '../hooks/useProjectAtom'
import {
  initialSubscriptionLoadAtom,
  recurringContributionSupportAtom,
  subscriptionsAtom,
} from '../state/subscriptionAtom'

/**
 * Query project subscriptions for current Project context
 * @param load - Load subscriptions on mount
 */
export const useProjectSubscriptionsAPI = (load?: boolean) => {
  const setSubscriptions = useSetAtom(subscriptionsAtom)
  const setRecurringContributionSupport = useSetAtom(recurringContributionSupportAtom)
  const setInitialSubscriptionLoad = useSetAtom(initialSubscriptionLoadAtom)

  const { project, loading } = useProjectAtom()
  const queryVariables =
    project.id || project.name
      ? {
          where: {
            id: project.id ? Number(project.id) : undefined,
            name: project.name || undefined,
          },
        }
      : undefined

  const queryProjectSubscriptions = useProjectRecurringContextQuery({
    variables: queryVariables,
    skip: !load || loading || !queryVariables,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (queryProjectSubscriptions.data?.projectGet) {
      setSubscriptions(queryProjectSubscriptions.data.projectGet.subscriptionPlans ?? [])
      setRecurringContributionSupport(
        queryProjectSubscriptions.data.projectGet.recurringContributionSupport ?? undefined,
      )
      setInitialSubscriptionLoad(true)
    }
  }, [queryProjectSubscriptions.data, setInitialSubscriptionLoad, setRecurringContributionSupport, setSubscriptions])

  return {
    queryProjectSubscriptions: {
      execute: () => (queryVariables ? queryProjectSubscriptions.refetch(queryVariables) : Promise.resolve()),
      ...queryProjectSubscriptions,
    },
  }
}
