import { useAtom, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { useProjectSubscriptionPlansLazyQuery } from '@/types'

import { useProjectAtom } from '../hooks/useProjectAtom'
import { initialSubscriptionLoadAtom, subscriptionsAtom } from '../state/subscriptionAtom'

/**
 * Query project subscriptions for current Project context
 * @param load - Load subscriptions on mount
 */
export const useProjectSubscriptionsAPI = (load?: boolean) => {
  const setSubscriptions = useSetAtom(subscriptionsAtom)

  const [initialSubscriptionLoad, setInitialSubscriptionLoad] = useAtom(initialSubscriptionLoadAtom)

  const { project, loading } = useProjectAtom()

  const [queryProjectSubscriptions, queryProjectSubscriptionsOptions] = useProjectSubscriptionPlansLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          projectId: project.id,
        },
      },
    },
    onCompleted(data) {
      if (data?.projectSubscriptionPlans) {
        setSubscriptions(data?.projectSubscriptionPlans)
        setInitialSubscriptionLoad(true)
      }
    },
  })

  useEffect(() => {
    if (project.id && !loading && load && !initialSubscriptionLoad) {
      queryProjectSubscriptions()
    }
  }, [project.id, load, loading, initialSubscriptionLoad, queryProjectSubscriptions])

  return {
    queryProjectSubscriptions: {
      execute: queryProjectSubscriptions,
      ...queryProjectSubscriptionsOptions,
    },
  }
}
