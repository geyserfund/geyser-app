import { useSubscription } from '@apollo/client'
import { DateTime } from 'luxon'
import { createContext, useCallback, useContext, useState } from 'react'

import { ACTIVITY_CREATION_SUBSCRIPTION } from '../graphql/subscriptions'
import {
  ActivityCreatedSubscription,
  ActivityCreatedSubscriptionInput,
  ActivityForLandingPageFragment,
} from '../types'
import { toInt } from '../utils'
import { useAuthContext } from './auth'

export interface ActivitySubscriptionState {
  activities: ActivityForLandingPageFragment[]
  clearActivity: () => void
}

const defaultActivitySubscriptionContext = {
  activities: [],
  addActivitiy() {},
  clearActivity() {},
}

export const ActivitySubscriptionContext =
  createContext<ActivitySubscriptionState>(defaultActivitySubscriptionContext)

export const ActivitySubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activities, setActivities] = useState<
    ActivityForLandingPageFragment[]
  >([])
  const { isLoggedIn, followedProjects } = useAuthContext()

  const skipSubscription = !isLoggedIn || !(followedProjects.length > 0)
  useSubscription<
    ActivityCreatedSubscription,
    ActivityCreatedSubscriptionInput
  >(ACTIVITY_CREATION_SUBSCRIPTION, {
    variables: {
      where: {
        projectIds: followedProjects.map((projects) => toInt(projects?.id)),
      },
    },
    skip: skipSubscription,
    onData(options) {
      const activityCreated = options.data.data?.activityCreated
      const currentDateTime = DateTime.now().toMillis() // @TODO this will have to come from the backend
      const newActivity = {
        createdAt: currentDateTime,
        id: `${currentDateTime}`,
        resource: activityCreated,
      } as ActivityForLandingPageFragment

      if (activityCreated) {
        setActivities((current) => [...current, newActivity])
      }
    },
  })

  const clearActivity = useCallback(() => {
    setActivities([])
  }, [])

  return (
    <ActivitySubscriptionContext.Provider value={{ activities, clearActivity }}>
      {children}
    </ActivitySubscriptionContext.Provider>
  )
}

export const useActivitySubsciptionContext = () =>
  useContext(ActivitySubscriptionContext)
