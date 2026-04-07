import { useLazyQuery } from '@apollo/client'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { ProjectRecurringContextQuery, QUERY_PROJECT_RECURRING_CONTEXT } from '../recurring/graphql'
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

  const [initialSubscriptionLoad, setInitialSubscriptionLoad] = useAtom(initialSubscriptionLoadAtom)

  const { project, loading } = useProjectAtom()

  const [queryProjectSubscriptions, queryProjectSubscriptionsOptions] = useLazyQuery<ProjectRecurringContextQuery>(
    QUERY_PROJECT_RECURRING_CONTEXT,
    {
      fetchPolicy: 'network-only',
      onCompleted(data) {
        if (data?.projectGet) {
          setSubscriptions(data.projectGet.subscriptionPlans ?? [])
          setRecurringContributionSupport(data.projectGet.recurringContributionSupport ?? undefined)
          setInitialSubscriptionLoad(true)
        }
      },
    },
  )

  useEffect(() => {
    if (project.id && !loading && load && !initialSubscriptionLoad) {
      queryProjectSubscriptions({
        variables: {
          where: {
            id: Number(project.id),
          },
        },
      })
    }
  }, [project.id, load, loading, initialSubscriptionLoad, queryProjectSubscriptions])

  return {
    queryProjectSubscriptions: {
      execute: queryProjectSubscriptions,
      ...queryProjectSubscriptionsOptions,
    },
  }
}
